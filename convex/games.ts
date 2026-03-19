// Game functions — questions, answers, progress
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get a question for a world/level
export const getQuestion = query({
  args: {
    world: v.string(),
    level: v.number(),
    excludeIds: v.optional(v.array(v.id("questions"))),
  },
  handler: async (ctx, args) => {
    const level = Math.min(10, Math.max(1, args.level));
    // Try exact level first, then adjacent levels
    for (const l of [level, level - 1, level + 1, level - 2, level + 2]) {
      if (l < 1 || l > 10) continue;
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
  },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) return { error: "Question not found" };

    const correct = args.selectedIndex === question.correctIndex;
    const xpGain = correct ? (question.level * 10) + Math.max(0, 50 - Math.floor(args.timeMs / 1000)) : 2;

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

    // Update player XP and level
    const player = await ctx.db.get(args.playerId);
    if (player) {
      const newXp = player.xp + xpGain;
      const newLevel = Math.floor(newXp / 500) + 1;
      await ctx.db.patch(args.playerId, { xp: newXp, level: newLevel });
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
      const newLevel = accuracy > 0.8 && newAnswered > 5
        ? Math.min(10, progress.currentLevel + 1)
        : progress.currentLevel;

      await ctx.db.patch(progress._id, {
        xpInWorld: progress.xpInWorld + xpGain,
        questionsAnswered: newAnswered,
        correctAnswers: newCorrect,
        currentLevel: newLevel,
      });
    }

    return {
      correct,
      xpGain,
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
