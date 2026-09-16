// Auth functions — PINs are handled as SHA-256 hashes computed client-side.
// The server only ever sees/stores the hash; a legacy plaintext `pin` value in
// the database is transparently upgraded to a hash on next successful login.
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

const AVATARS = ['🦊','🐱','🐶','🦁','🐼','🐨','🦄','🐸','🐙','🦋','🐢','🦖','🐧','🦜','🐝','🦉','🐯','🐲','🐵'];

const NAME_RE = /^[\p{L}][\p{L} .'-]{0,23}$/u;
const HASH_RE = /^[0-9a-f]{64}$/;

function validName(name: string): boolean {
  return NAME_RE.test(name);
}

// Find a player by name. New rows are indexed by nameLower; legacy rows may
// only have `name`, so fall back to a (tiny-table) scan when the index misses.
async function findPlayerByName(ctx: any, nameLower: string) {
  const byIndex = await ctx.db
    .query("players")
    .withIndex("by_name", (q: any) => q.eq("nameLower", nameLower))
    .unique();
  if (byIndex) return byIndex;
  const all = await ctx.db.query("players").collect();
  return all.find((p: any) => p.name?.toLowerCase() === nameLower) ?? null;
}

// Remove a player and every row attached to them.
async function deletePlayerData(ctx: any, playerId: any) {
  for (const table of ["progress", "answers", "achievements"]) {
    const rows = await ctx.db
      .query(table)
      .withIndex("by_player", (q: any) => q.eq("playerId", playerId))
      .collect();
    for (const row of rows) await ctx.db.delete(row._id);
  }
  await ctx.db.delete(playerId);
}

export const signUp = mutation({
  args: { name: v.string(), pinHash: v.string() },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    if (!validName(name)) {
      return { error: "Names can use letters, spaces, hyphens and apostrophes (max 24 characters)." };
    }
    if (!HASH_RE.test(args.pinHash)) {
      return { error: "Invalid passcode format." };
    }
    const nameLower = name.toLowerCase();
    const existing = await findPlayerByName(ctx, nameLower);
    if (existing) return { error: "Name already taken!" };

    const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    const today = new Date().toISOString().split('T')[0];

    const playerId = await ctx.db.insert("players", {
      name,
      nameLower,
      pinHash: args.pinHash,
      avatar,
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: today,
      createdAt: Date.now(),
      theme: 'default',
      status: "pending",
    });

    for (const world of ['reading', 'writing', 'math']) {
      await ctx.db.insert("progress", {
        playerId,
        world,
        currentLevel: 1,
        xpInWorld: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        bestStreak: 0,
      });
    }

    // Notify the site owner for approval — async so email hiccups never block signup.
    await ctx.scheduler.runAfter(0, internal.emails.notifySignup, {
      playerId,
      name,
    });

    return { pending: true, name };
  },
});

// Called by the /api/approve Pages Function after it verifies the shared key.
// The key check is repeated here so the public mutation can't be driven directly.
export const moderateSignup = mutation({
  args: {
    playerId: v.id("players"),
    key: v.string(),
    action: v.union(v.literal("approve"), v.literal("deny")),
  },
  handler: async (ctx, args) => {
    const expected = process.env.APPROVAL_KEY;
    if (!expected || args.key !== expected) {
      return { error: "Invalid approval key." };
    }
    const player = await ctx.db.get(args.playerId);
    if (!player) return { error: "Player not found — maybe already removed." };
    if (player.status !== "pending") {
      return { ok: true, name: player.name, action: "already-" + (player.status ?? "approved") };
    }

    if (args.action === "approve") {
      await ctx.db.patch(player._id, { status: "approved" });
      return { ok: true, name: player.name, action: "approved" };
    }

    // deny — remove the pending account and all of its rows
    await deletePlayerData(ctx, player._id);
    return { ok: true, name: player.name, action: "denied" };
  },
});

// Owner-only account removal, gated by the same APPROVAL_KEY. Works on any
// player (unlike moderateSignup which only touches pending rows).
export const adminRemovePlayer = mutation({
  args: { playerId: v.id("players"), key: v.string() },
  handler: async (ctx, args) => {
    const expected = process.env.APPROVAL_KEY;
    if (!expected || args.key !== expected) {
      return { error: "Invalid approval key." };
    }
    const player = await ctx.db.get(args.playerId);
    if (!player) return { error: "Player not found." };
    await deletePlayerData(ctx, player._id);
    return { ok: true, name: player.name };
  },
});

export const logIn = mutation({
  args: {
    name: v.string(),
    pinHash: v.string(),
    // Legacy accounts stored a plaintext 6-digit PIN. The client still sends it
    // once so the server can verify-and-upgrade those rows to hashed storage.
    pin: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    if (!validName(name)) return { error: "No player found!" };
    const player = await findPlayerByName(ctx, name.toLowerCase());
    if (!player) return { error: "No player found!" };

    // Throttle brute-force attempts on the 6-digit PIN: 5 failures → lock for
    // 60s, doubling each further lockout (capped at 1 hour).
    const now = Date.now();
    if (player.lockedUntil && player.lockedUntil > now) {
      const wait = Math.ceil((player.lockedUntil - now) / 1000);
      return { error: `Too many tries — wait ${wait}s and try again!` };
    }

    if (player.pinHash === args.pinHash) {
      // good — hashed login
    } else if (
      // Legacy plaintext row: `pin` holds the raw 6-digit code, `pinHash` is
      // absent. Verify against the raw PIN, then upgrade to hashed storage and
      // drop the plaintext field (patching a field to undefined removes it).
      player.pin && /^\d{6}$/.test(player.pin) && args.pin === player.pin
    ) {
      if (HASH_RE.test(args.pinHash)) {
        await ctx.db.patch(player._id, {
          pinHash: args.pinHash,
          pin: undefined,
          nameLower: name.toLowerCase(),
        });
      }
    } else if (
      // Transitional row: pinHash still literally contains a plaintext PIN.
      !player.pin && /^\d{6}$/.test(player.pinHash ?? "") && args.pin === player.pinHash
    ) {
      if (HASH_RE.test(args.pinHash)) {
        await ctx.db.patch(player._id, {
          pinHash: args.pinHash,
          nameLower: player.nameLower ?? name.toLowerCase(),
        });
      }
    } else {
      const fails = (player.failedLogins ?? 0) + 1;
      const patch: Record<string, number> = { failedLogins: fails };
      if (fails >= 5) {
        const lockMs = Math.min(60_000 * Math.pow(2, Math.floor(fails / 5) - 1), 3_600_000);
        patch.lockedUntil = now + lockMs;
      }
      await ctx.db.patch(player._id, patch);
      return { error: "Wrong passcode!" };
    }

    // Correct PIN but the account is still awaiting owner approval.
    if (player.status === "pending") {
      return { error: "Almost there! A grown-up needs to approve your account first 📬" };
    }

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = player.streak;
    if (player.lastActiveDate === yesterday) newStreak++;
    else if (player.lastActiveDate !== today) newStreak = 1;

    await ctx.db.patch(player._id, {
      lastActiveDate: today,
      streak: newStreak,
      failedLogins: 0,
      lockedUntil: 0,
      ...(player.nameLower ? {} : { nameLower: name.toLowerCase() }),
    });

    return {
      playerId: player._id,
      name: player.name,
      avatar: player.avatar,
      xp: player.xp,
      level: player.level,
      streak: newStreak,
      theme: player.theme,
    };
  },
});

export const getPlayer = query({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    const p = await ctx.db.get(args.playerId);
    if (!p) return null;
    // Never return the credential hash to the client.
    return {
      playerId: p._id,
      name: p.name,
      avatar: p.avatar,
      xp: p.xp,
      level: p.level,
      streak: p.streak,
      theme: p.theme,
    };
  },
});

// The profile picker needs name + avatar only — never expose ids or hashes here.
export const getAllPlayers = query({
  args: {},
  handler: async (ctx) => {
    const players = await ctx.db.query("players").collect();
    return players.map(p => ({ name: p.name, avatar: p.avatar, status: p.status ?? "approved" }));
  },
});
