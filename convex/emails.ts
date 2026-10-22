// Signup approval email — Convex can't send email itself, so this action
// delegates to the /api/signup-notify Pages Function (which holds the
// RESEND_API_KEY secret). APPROVAL_KEY authenticates that server-to-server
// call. The email link itself carries a single-use per-player token, never
// APPROVAL_KEY.
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { APPROVAL_TOKEN_TTL_MS, randomHex, sha256Hex } from "./security";

const NOTIFY_URL = "https://sats-quest.antoniosmith.xyz/api/signup-notify";

export const notifySignup = internalAction({
  args: { playerId: v.id("players"), name: v.string() },
  handler: async (ctx, args) => {
    const key = process.env.APPROVAL_KEY;
    if (!key) {
      console.error("APPROVAL_KEY not configured — signup approval email skipped");
      return;
    }
    const token = randomHex(32);
    const tokenHash = await sha256Hex(token);
    const issued = await ctx.runMutation(internal.auth.issueApprovalToken, {
      playerId: args.playerId,
      tokenHash,
      expiresAt: Date.now() + APPROVAL_TOKEN_TTL_MS,
    });
    if (!issued.ok) {
      console.error("Could not store approval token — signup email skipped");
      return;
    }
    let res: Response;
    try {
      res = await fetch(NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: args.playerId,
          name: args.name,
          key,
          token,
        }),
      });
    } catch (e) {
      console.error("signup-notify request error:", e);
      // Throw so the scheduler retries. issueApprovalToken replaces the hash,
      // so the retried email is the one that stays valid.
      throw e;
    }
    if (!res.ok) {
      console.error("signup-notify failed:", res.status, await res.text());
      throw new Error("signup-notify failed: " + res.status);
    }
  },
});
