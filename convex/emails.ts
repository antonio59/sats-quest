// Signup approval email — Convex can't send email itself, so this action
// delegates to the /api/signup-notify Pages Function (which holds the
// RESEND_API_KEY secret). APPROVAL_KEY authenticates the call so strangers
// can't trigger owner emails at will.
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

const NOTIFY_URL = "https://sats-quest.antoniosmith.xyz/api/signup-notify";

export const notifySignup = internalAction({
  args: { playerId: v.id("players"), name: v.string() },
  handler: async (_ctx, args) => {
    const key = process.env.APPROVAL_KEY;
    if (!key) {
      console.error("APPROVAL_KEY not configured — signup approval email skipped");
      return;
    }
    try {
      const res = await fetch(NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: args.playerId, name: args.name, key }),
      });
      if (!res.ok) {
        console.error("signup-notify failed:", res.status, await res.text());
      }
    } catch (e) {
      console.error("signup-notify request error:", e);
    }
  },
});
