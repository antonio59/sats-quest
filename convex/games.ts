// Game functions — answer recording, progress sync, review data.
// Questions live in the client's bundled bank; the server stores a snapshot
// with each answer so review works offline of any server-side question table.
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const MAX_LEVEL = 5;
const XP_PER_LEVEL = 400;
const WORLDS = new Set(["reading", "writing", "math"]);

const answerArgs = {
  playerId: v.id("players"),
  questionRef: v.string(),
  world: v.string(),
  question: v.string(),
  options: v.array(v.string()),
  correctIndex: v.union(v.number(), v.array(v.number())),
  selectedIndex: v.number(),
  selectedText: v.optional(v.string()),
  questionType: v.optional(v.string()),
  correct: v.boolean(),
  explanation: v.string(),
  level: v.number(),
  timeMs: v.number(),
  streak: v.optional(v.number()),
};

// Record one answered question. All untrusted input is range-checked and the
// XP award is computed server-side from the question level — never trusted.
export const recordAnswer = mutation({
  args: answerArgs,
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return { error: "Player not found" };
    if (!WORLDS.has(args.world)) return { error: "Unknown world" };
    if (args.question.length > 2000 || args.explanation.length > 2000) {
      return { error: "Question data too large" };
    }
    if (args.options.length > 10 || args.options.some(o => o.length > 500)) {
      return { error: "Invalid options" };
    }
    const level = Math.min(MAX_LEVEL, Math.max(1, Math.floor(args.level || 1)));
    const selectedIndex = Math.floor(args.selectedIndex);
    if (selectedIndex < -1 || selectedIndex >= 20) return { error: "Bad selection" };
    const timeMs = Math.min(3_600_000, Math.max(0, Math.floor(args.timeMs || 0)));
    const streak = Math.min(365, Math.max(0, Math.floor(args.streak || 0)));

    // Correctness is re-derived server-side only for indexed types
    // (multiple-choice / true-false). Free-text and multi-select verdicts are
    // graded client-side (normalised accepted-answer matching / set compare)
    // and trusted — for those, selectedIndex is just a 0/-1 sentinel.
    const indexed = (args.questionType ?? 'multiple-choice') === 'multiple-choice'
      || args.questionType === 'true-false';
    const correct = indexed && !Array.isArray(args.correctIndex) && args.options.length > 1
      ? selectedIndex === args.correctIndex
      : !!args.correct;

    const baseXp = correct ? level * 15 + Math.max(0, 60 - Math.floor(timeMs / 1000)) : 2;
    const streakBonus = correct ? Math.min(streak * 5, 50) : 0;
    const xpGain = baseXp + streakBonus;

    await ctx.db.insert("answers", {
      playerId: args.playerId,
      questionRef: args.questionRef.slice(0, 120),
      world: args.world,
      question: args.question,
      options: args.options,
      correctIndex: args.correctIndex,
      selectedIndex,
      selectedText: args.selectedText?.slice(0, 200),
      correct,
      explanation: args.explanation,
      timeMs,
      answeredAt: Date.now(),
    });

    const newXp = player.xp + xpGain;
    const newLevel = Math.min(MAX_LEVEL, Math.floor(newXp / XP_PER_LEVEL) + 1);
    await ctx.db.patch(args.playerId, {
      xp: newXp,
      level: newLevel,
      totalXp: (player.totalXp ?? player.xp) + xpGain,
      totalCorrect: (player.totalCorrect ?? 0) + (correct ? 1 : 0),
    });

    const progress = await ctx.db
      .query("progress")
      .withIndex("by_player_world", q => q.eq("playerId", args.playerId).eq("world", args.world))
      .unique();

    if (progress) {
      const newCorrect = progress.correctAnswers + (correct ? 1 : 0);
      const newAnswered = progress.questionsAnswered + 1;
      const accuracy = newCorrect / newAnswered;
      const newWorldLevel = accuracy > 0.75 && newAnswered > 5
        ? Math.min(MAX_LEVEL, progress.currentLevel + 1)
        : progress.currentLevel;
      await ctx.db.patch(progress._id, {
        xpInWorld: progress.xpInWorld + xpGain,
        questionsAnswered: newAnswered,
        correctAnswers: newCorrect,
        currentLevel: newWorldLevel,
        bestStreak: Math.max(progress.bestStreak || 0, streak),
      });
    }

    return { correct, xpGain, streakBonus };
  },
});

// Get player progress for all worlds
export const getProgress = query({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return null;
    const progressList = await ctx.db
      .query("progress")
      .withIndex("by_player", q => q.eq("playerId", args.playerId))
      .collect();

    const result: Record<string, {
      level: number; xp: number; answered: number; correct: number;
      bestStreak: number; accuracy: number;
    }> = {};
    for (const p of progressList) {
      result[p.world] = {
        level: p.currentLevel,
        xp: p.xpInWorld,
        answered: p.questionsAnswered,
        correct: p.correctAnswers,
        bestStreak: p.bestStreak || 0,
        accuracy: p.questionsAnswered > 0
          ? Math.round((p.correctAnswers / p.questionsAnswered) * 100)
          : 0,
      };
    }
    return result;
  },
});

// Recent answers for the review screen — read from stored snapshots.
export const getRecentAnswers = query({
  args: { playerId: v.id("players"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = Math.min(50, Math.max(1, args.limit ?? 10));
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_player", q => q.eq("playerId", args.playerId))
      .order("desc")
      .take(limit);

    return answers.map(a => ({
      question: a.question,
      options: a.options,
      correctIndex: a.correctIndex,
      selectedIndex: a.selectedIndex,
      selectedText: a.selectedText,
      correct: a.correct,
      explanation: a.explanation,
      world: a.world,
    }));
  },
});

// One-off sync when a local-only player creates a cloud account. Values are
// merged with max() semantics so the server can only ever move forward.
export const migrateProgress = mutation({
  args: {
    playerId: v.id("players"),
    world: v.string(),
    currentLevel: v.number(),
    xpInWorld: v.number(),
    questionsAnswered: v.number(),
    correctAnswers: v.number(),
    bestStreak: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return { error: "Player not found" };
    if (!WORLDS.has(args.world)) return { error: "Unknown world" };

    const clamp = (n: number, lo: number, hi: number) =>
      Math.min(hi, Math.max(lo, Math.floor(n || 0)));
    const safe = {
      playerId: args.playerId,
      world: args.world,
      currentLevel: clamp(args.currentLevel, 1, MAX_LEVEL),
      xpInWorld: clamp(args.xpInWorld, 0, 1_000_000),
      questionsAnswered: clamp(args.questionsAnswered, 0, 1_000_000),
      correctAnswers: clamp(args.correctAnswers, 0, 1_000_000),
      bestStreak: clamp(args.bestStreak, 0, 365),
    };

    const existing = await ctx.db
      .query("progress")
      .withIndex("by_player_world", q => q.eq("playerId", args.playerId).eq("world", args.world))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        currentLevel: Math.max(existing.currentLevel, safe.currentLevel),
        xpInWorld: Math.max(existing.xpInWorld, safe.xpInWorld),
        questionsAnswered: Math.max(existing.questionsAnswered, safe.questionsAnswered),
        correctAnswers: Math.max(existing.correctAnswers, safe.correctAnswers),
        bestStreak: Math.max(existing.bestStreak || 0, safe.bestStreak),
      });
    } else {
      await ctx.db.insert("progress", safe);
    }
    return { success: true };
  },
});

// Bulk-import a player's locally stored answer history (max 50 rows).
export const migrateAnswers = mutation({
  args: {
    playerId: v.id("players"),
    answers: v.array(v.object({
      question: v.string(),
      questionRef: v.string(),
      world: v.string(),
      options: v.array(v.string()),
      correctIndex: v.union(v.number(), v.array(v.number())),
      selectedIndex: v.number(),
      correct: v.boolean(),
      explanation: v.string(),
      timeMs: v.number(),
      answeredAt: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return { error: "Player not found" };
    let count = 0;
    for (const a of args.answers.slice(0, 50)) {
      if (!WORLDS.has(a.world)) continue;
      await ctx.db.insert("answers", {
        playerId: args.playerId,
        questionRef: a.questionRef.slice(0, 120),
        world: a.world,
        question: a.question.slice(0, 2000),
        options: a.options.slice(0, 10).map(o => o.slice(0, 500)),
        correctIndex: a.correctIndex,
        selectedIndex: Math.max(-1, Math.min(19, Math.floor(a.selectedIndex))),
        correct: !!a.correct,
        explanation: a.explanation.slice(0, 2000),
        timeMs: Math.min(3_600_000, Math.max(0, Math.floor(a.timeMs || 0))),
        answeredAt: a.answeredAt,
      });
      count++;
    }
    return { inserted: count };
  },
});
