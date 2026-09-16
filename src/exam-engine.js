// SAT Quest — Exam Simulation Engine
window.ExamEngine = (function() {
  const EXAMS = {
    reading: {
      name: 'Reading Comprehension',
      icon: '📖',
      questions: 15,
      timeMinutes: 30,     // ~60 min for 50 marks, scaled down
      description: 'Fiction & non-fiction passages, inference, vocabulary, summarising',
    },
    writing: {
      name: 'Grammar & Spelling',
      icon: '✍️',
      questions: 20,
      timeMinutes: 20,     // ~45 min for 50 marks, scaled down
      description: 'Punctuation, word classes, tenses, spelling rules',
    },
    math: {
      name: 'Mathematics',
      icon: '🔢',
      questions: 20,
      timeMinutes: 30,     // Arithmetic + reasoning combined
      description: 'Number, fractions, algebra, geometry, statistics',
    },
    full: {
      name: 'Full Mock SATs',
      icon: '📝',
      questions: 30,
      timeMinutes: 45,     // Combined exam
      description: 'Questions from all 3 worlds — the full experience',
    }
  };

  function selectQuestions(world, count) {
    const bank = window.QuestionBank;
    const pool = (world === 'full'
      ? [...(bank.reading || []), ...(bank.writing || []), ...(bank.math || [])]
      : (bank[world] || [])).slice();

    // Sample an even spread across levels, then order easy → hard like a
    // real SATs paper (marks build in difficulty through the paper).
    const picked = [];
    const perLevel = Math.ceil(count / 5);
    for (let lvl = 1; lvl <= 5; lvl++) {
      const atLevel = pool.filter(q => q.level === lvl).sort(() => Math.random() - 0.5);
      picked.push(...atLevel.slice(0, perLevel));
    }
    return picked
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .sort((a, b) => a.level - b.level);
  }

  function getExamConfig(world) {
    return EXAMS[world] || EXAMS.reading;
  }

  function getAllExams() {
    return EXAMS;
  }

  return { selectQuestions, getExamConfig, getAllExams };
})();
