// SAT Quest — Mini Games
// Mini-games that feel like games, not worksheets
window.SATMiniGames = {
  'word-scramble': {
    name: 'Word Scramble 🔤',
    icon: '🔤',
    description: 'Unscramble SAT vocabulary words',
    levels: [
      {
        words: [
          { scrambled: 'NPLIAETU', answer: 'PLAINTUE', hint: 'A flat area of land' },
          { scrambled: 'LRAIYL', answer: 'LYRICAL', hint: 'Expressing emotion like a song' },
          { scrambled: 'GRANLUO', answer: 'GUARANL', hint: '...' },
        ]
      }
    ]
  },
  'speed-math': {
    name: 'Speed Math ⚡',
    icon: '⚡',
    description: 'Race against the clock',
    levels: [
      {
        problems: [
          { question: '15 × 12', answer: 180 },
          { question: '23 × 7', answer: 161 },
          { question: '144 ÷ 12', answer: 12 },
          { question: '45 + 67', answer: 112 },
          { question: '200 - 87', answer: 113 },
        ]
      }
    ]
  },
  'boss-battle': {
    name: 'Boss Battle 👾',
    icon: '👾',
    description: 'Harder questions for bonus XP',
    levels: [
      {
        questions: [
          {
            question: 'If f(x) = 3x² - 2x + 1, what is f(-2)?',
            options: ['A) 13', 'B) 17', 'C) 21', 'D) 9'],
            correctIndex: 1,
            explanation: 'f(-2) = 3(4) - 2(-2) + 1 = 12 + 4 + 1 = 17'
          },
          {
            question: 'Which sentence contains a dangling modifier?',
            options: [
              'A) Running quickly, the finish line approached.',
              'B) The dog chased the ball across the yard.',
              'C) She carefully placed the vase on the table.',
              'D) After lunch, they went for a walk.'
            ],
            correctIndex: 0,
            explanation: '"Running quickly" modifies the finish line, but finish lines don\'t run — that\'s a dangling modifier!'
          }
        ]
      }
    ]
  }
};
