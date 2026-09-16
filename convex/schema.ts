import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Players — PINs are stored only as SHA-256 hashes (pinHash), never plaintext.
  // nameLower/pinHash/pin are optional ONLY to accommodate legacy rows created
  // before hashing existed; those fields are backfilled on next login.
  players: defineTable({
    name: v.string(),
    nameLower: v.optional(v.string()), // normalised name for uniqueness/login lookups
    pinHash: v.optional(v.string()),   // hex SHA-256 of the 6-digit passcode
    pin: v.optional(v.string()),       // LEGACY plaintext PIN — removed on upgrade
    avatar: v.string(),
    xp: v.number(),
    level: v.number(),            // 1-5
    streak: v.number(),
    lastActiveDate: v.string(),   // YYYY-MM-DD
    createdAt: v.number(),
    theme: v.string(),
    totalXp: v.optional(v.number()),
    totalCorrect: v.optional(v.number()),
    failedLogins: v.optional(v.number()),
    lockedUntil: v.optional(v.number()),
  }).index("by_name", ["nameLower"]),

  // Player answers — stores a snapshot of the question so review works without
  // a server-side question bank (the canonical bank ships with the client).
  answers: defineTable({
    playerId: v.id("players"),
    questionRef: v.string(),      // client-side stable hash of the question
    world: v.string(),
    question: v.string(),
    options: v.array(v.string()),
    correctIndex: v.union(v.number(), v.array(v.number())),
    selectedIndex: v.number(),    // -1 = incorrect free-text/multi-select submit
    selectedText: v.optional(v.string()), // typed answer / chosen labels for free-text & multi-select
    correct: v.boolean(),
    explanation: v.string(),
    timeMs: v.number(),
    answeredAt: v.number(),
  })
    .index("by_player", ["playerId"])
    .index("by_player_world", ["playerId", "world"]),

  // Progress per world
  progress: defineTable({
    playerId: v.id("players"),
    world: v.string(),
    currentLevel: v.number(),
    xpInWorld: v.number(),
    questionsAnswered: v.number(),
    correctAnswers: v.number(),
    bestStreak: v.number(),
  })
    .index("by_player", ["playerId"])
    .index("by_player_world", ["playerId", "world"]),

  // Achievements / badges
  achievements: defineTable({
    playerId: v.id("players"),
    badgeId: v.string(),
    earnedAt: v.number(),
  }).index("by_player", ["playerId"]),
});
