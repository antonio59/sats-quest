import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Players
  players: defineTable({
    name: v.string(),
    pin: v.string(),           // 6-digit passcode
    avatar: v.string(),
    xp: v.number(),
    level: v.number(),
    streak: v.number(),
    lastActiveDate: v.string(), // YYYY-MM-DD
    createdAt: v.number(),
    theme: v.string(),         // unlockable visual theme
  }).index("by_name", ["name"]),

  // Questions bank
  questions: defineTable({
    world: v.string(),         // "reading", "writing", "math"
    level: v.number(),         // difficulty 1-10
    type: v.string(),          // "multiple-choice", "grid-in"
    question: v.string(),
    passage: v.optional(v.string()),  // for reading comprehension
    options: v.array(v.string()),
    correctIndex: v.number(),
    explanation: v.string(),
    tags: v.array(v.string()), // ["algebra", "vocabulary", "grammar", etc.]
  })
    .index("by_world_level", ["world", "level"]),

  // Player answers
  answers: defineTable({
    playerId: v.id("players"),
    questionId: v.id("questions"),
    world: v.string(),
    selectedIndex: v.number(),
    correct: v.boolean(),
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

  // Daily challenges
  dailyChallenges: defineTable({
    date: v.string(),          // YYYY-MM-DD
    questionIds: v.array(v.id("questions")),
    world: v.string(),
  }).index("by_date", ["date"]),
});
