// Auth functions
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const AVATARS = ['🦊','🐱','🐶','🦁','🐼','🐨','🦄','🐸','🐙','🦋','🐢','🦖','🐧','🦜','🐝','🦉','🐯','🐲','🐵'];

export const signUp = mutation({
  args: { name: v.string(), pin: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("players").withIndex("by_name", q => q.eq("name", args.name.trim())).unique();
    if (existing) return { error: "Name already taken!" };

    const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    const today = new Date().toISOString().split('T')[0];
    const now = Date.now();

    const playerId = await ctx.db.insert("players", {
      name: args.name.trim(),
      pin: args.pin,
      avatar,
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: today,
      createdAt: now,
      theme: 'default',
    });

    // Init progress for all worlds
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

    return { playerId, avatar, name: args.name.trim() };
  },
});

export const logIn = mutation({
  args: { name: v.string(), pin: v.string() },
  handler: async (ctx, args) => {
    const player = await ctx.db.query("players").withIndex("by_name", q => q.eq("name", args.name.trim())).unique();
    if (!player) return { error: "No player found!" };
    if (player.pin !== args.pin) return { error: "Wrong PIN! Hint: it's your birthday (MMDDYYYY)." };

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = player.streak;
    if (player.lastActiveDate === yesterday) newStreak++;
    else if (player.lastActiveDate !== today) newStreak = 1;

    await ctx.db.patch(player._id, { lastActiveDate: today, streak: newStreak });

    return { playerId: player._id, name: player.name, avatar: player.avatar, xp: player.xp, level: player.level, streak: newStreak, theme: player.theme };
  },
});

export const getPlayer = query({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.playerId);
  },
});

export const getAllPlayers = query({
  args: {},
  handler: async (ctx) => {
    const players = await ctx.db.query("players").collect();
    return players.map(p => ({ id: p._id, name: p.name, avatar: p.avatar }));
  },
});
