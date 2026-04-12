// Game functions — questions, answers, progress
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const MAX_LEVEL = 5;
const XP_PER_LEVEL = 400; // Faster level progression

// Get a question for a world/level
export const getQuestion = query({
  args: {
    world: v.string(),
    level: v.number(),
    excludeIds: v.optional(v.array(v.id("questions"))),
  },
  handler: async (ctx, args) => {
    const level = Math.min(MAX_LEVEL, Math.max(1, args.level));
    // Try exact level first, then adjacent levels
    for (const l of [level, level - 1, level + 1, level - 2, level + 2]) {
      if (l < 1 || l > MAX_LEVEL) continue;
      const questions = await ctx.db
        .query("questions")
        .withIndex("by_world_level", q => q.eq("world", args.world).eq("level", l))
        .collect();
      const filtered = args.excludeIds
        ? questions.filter(q => !args.excludeIds.includes(q._id))
        : questions;
      if (filtered.length > 0) {
        const q = filtered[Math.floor(Math.random() * filtered.length)];
        return { id: q._id, question: q.question, passage: q.passage, options: q.options, world: q.world, level: q.level, type: q.type };
      }
    }
    return null;
  },
});

// Submit an answer
export const submitAnswer = mutation({
  args: {
    playerId: v.id("players"),
    questionId: v.id("questions"),
    selectedIndex: v.number(),
    timeMs: v.number(),
    streak: v.optional(v.number()), // Current streak when answering
  },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) return { error: "Question not found" };

    const correct = args.selectedIndex === question.correctIndex;
    
    // XP calculation with streak bonus
    let baseXp = correct ? (question.level * 15) + Math.max(0, 60 - Math.floor(args.timeMs / 1000)) : 2;
    
    // Streak bonus: +5 XP per streak level (10+ streak = +50 XP bonus!)
    const streakBonus = correct && args.streak ? Math.min(args.streak * 5, 50) : 0;
    const xpGain = baseXp + streakBonus;

    // Save answer
    await ctx.db.insert("answers", {
      playerId: args.playerId,
      questionId: args.questionId,
      world: question.world,
      selectedIndex: args.selectedIndex,
      correct,
      timeMs: args.timeMs,
      answeredAt: Date.now(),
    });

    // Update player XP and level (faster progression)
    const player = await ctx.db.get(args.playerId);
    if (player) {
      const newXp = player.xp + xpGain;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      await ctx.db.patch(args.playerId, { xp: newXp, level: Math.min(newLevel, MAX_LEVEL) });
    }

    // Update world progress
    const progress = await ctx.db
      .query("progress")
      .withIndex("by_player_world", q => q.eq("playerId", args.playerId).eq("world", question.world))
      .unique();

    if (progress) {
      const newCorrect = progress.correctAnswers + (correct ? 1 : 0);
      const newAnswered = progress.questionsAnswered + 1;
      const accuracy = newCorrect / newAnswered;
      const newLevel = accuracy > 0.75 && newAnswered > 5
        ? Math.min(MAX_LEVEL, progress.currentLevel + 1)
        : progress.currentLevel;
      
      // Update best streak if current is higher
      const newBestStreak = args.streak 
        ? Math.max(progress.bestStreak || 0, args.streak) 
        : progress.bestStreak || 0;

      await ctx.db.patch(progress._id, {
        xpInWorld: progress.xpInWorld + xpGain,
        questionsAnswered: newAnswered,
        correctAnswers: newCorrect,
        currentLevel: newLevel,
        bestStreak: newBestStreak,
      });
    }

    return {
      correct,
      xpGain,
      streakBonus,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
    };
  },
});

// Get player progress for all worlds
export const getProgress = query({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    const progressList = await ctx.db
      .query("progress")
      .withIndex("by_player", q => q.eq("playerId", args.playerId))
      .collect();

    const result = {};
    for (const p of progressList) {
      result[p.world] = {
        level: p.currentLevel,
        xp: p.xpInWorld,
        answered: p.questionsAnswered,
        correct: p.correctAnswers,
        bestStreak: p.bestStreak || 0,
        accuracy: p.questionsAnswered > 0 ? Math.round((p.correctAnswers / p.questionsAnswered) * 100) : 0,
      };
    }
    return result;
  },
});

// Get recent answers for review
export const getRecentAnswers = query({
  args: { playerId: v.id("players"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_player", q => q.eq("playerId", args.playerId))
      .order("desc")
      .take(limit);

    const result = [];
    for (const a of answers) {
      const q = await ctx.db.get(a.questionId);
      result.push({
        question: q?.question ?? '',
        options: q?.options ?? [],
        correctIndex: q?.correctIndex ?? 0,
        selectedIndex: a.selectedIndex,
        correct: a.correct,
        explanation: q?.explanation ?? '',
        world: a.world,
      });
    }
    return result;
  },
});

// Daily challenge
export const getDailyChallenge = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0];
    const challenge = await ctx.db
      .query("dailyChallenges")
      .withIndex("by_date", q => q.eq("date", today))
      .first();
    
    if (!challenge) return null;
    
    // Get the questions for today
    const questions = [];
    for (const qId of challenge.questionIds) {
      const q = await ctx.db.get(qId);
      if (q) questions.push({ id: q._id, question: q.question, passage: q.passage, options: q.options, world: q.world, level: q.level });
    }
    
    return { date: challenge.date, world: challenge.world, questions };
  },
});

// Record daily challenge completion
export const completeDailyChallenge = mutation({
  args: { playerId: v.id("players"), score: v.number(), total: v.number() },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already completed today
    const existing = await ctx.db.query("answers")
      .filter(q => q.field("playerId").eq(args.playerId))
      .first();
    
    if (existing) return { alreadyCompleted: true, bonus: 0 };
    
    // Award bonus XP for completing daily
    const accuracy = args.score / args.total;
    const bonusXp = Math.floor(args.total * 10 * accuracy);
    
    // Update player XP
    const player = await ctx.db.get(args.playerId);
    if (player) {
      await ctx.db.patch(args.playerId, { xp: player.xp + bonusXp });
    }
    
    return { alreadyCompleted: false, bonus: bonusXp };
  },
});

// Seed questions (admin)
export const seedQuestions = mutation({
  args: { questions: v.array(v.object({
    world: v.string(),
    level: v.number(),
    type: v.string(),
    question: v.string(),
    passage: v.optional(v.string()),
    options: v.array(v.string()),
    correctIndex: v.number(),
    explanation: v.string(),
    tags: v.array(v.string()),
  }))},
  handler: async (ctx, args) => {
    let count = 0;
    for (const q of args.questions) {
      await ctx.db.insert("questions", q);
      count++;
    }
    return { inserted: count };
  },
});

// Migrate progress from localStorage
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
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_player_world", q => q.eq("playerId", args.playerId).eq("world", args.world))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        currentLevel: Math.max(existing.currentLevel, args.currentLevel),
        xpInWorld: Math.max(existing.xpInWorld, args.xpInWorld),
        questionsAnswered: Math.max(existing.questionsAnswered, args.questionsAnswered),
        correctAnswers: Math.max(existing.correctAnswers, args.correctAnswers),
        bestStreak: Math.max(existing.bestStreak || 0, args.bestStreak),
      });
    } else {
      await ctx.db.insert("progress", args);
    }
    return { success: true };
  },
});
