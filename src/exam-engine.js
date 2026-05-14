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
    let pool;

    if (world === 'full') {
      pool = [...(bank.reading || []), ...(bank.writing || []), ...(bank.math || [])];
    } else {
      pool = bank[world] || [];
    }

    // Shuffle and pick
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  function getExamConfig(world) {
    return EXAMS[world] || EXAMS.reading;
  }

  function getAllExams() {
    return EXAMS;
  }

  return { selectQuestions, getExamConfig, getAllExams };
})();
