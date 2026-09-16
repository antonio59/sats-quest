// SAT Quest — Question Bank (merging point)
// Individual world banks loaded via questions-reading.js, questions-grammar.js, questions-maths.js
window.QuestionBank = {
  reading: [],
  writing: [],
  math: [],
};
if (window.ReadingQuestions) window.QuestionBank.reading.push(...window.ReadingQuestions);
if (window.GrammarQuestions) window.QuestionBank.writing.push(...window.GrammarQuestions);
if (window.MathsQuestions) window.QuestionBank.math.push(...window.MathsQuestions);
