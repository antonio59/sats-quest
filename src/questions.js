// SAT Quest — Question Bank
// Placeholder — will be replaced by sub-agent with 30+ questions
window.QuestionBank = {
  reading: [
    {
      world: "reading", level: 1, type: "multiple-choice",
      question: "The word 'illuminate' in line 3 most likely means to:",
      passage: "The scientist's discovery seemed to illuminate the entire field, casting new light on questions that had puzzled researchers for decades.",
      options: ["A) Light up or clarify", "B) Confuse or mislead", "C) Destroy or eliminate", "D) Decorate or beautify"],
      correctIndex: 0,
      explanation: "'Illuminate' literally means to light up, but here it's used figuratively to mean 'clarify' or 'make clear.' The context of 'casting new light' is a big clue!",
      tags: ["vocabulary", "context-clues"]
    },
    {
      world: "reading", level: 3, type: "multiple-choice",
      question: "The author's tone in the passage is best described as:",
      passage: "Despite the overwhelming evidence that the program had failed, its supporters continued to champion it with an almost religious fervor, dismissing each criticism as the work of those who simply didn't understand.",
      options: ["A) Enthusiastic and supportive", "B) Skeptical and critical", "C) Neutral and objective", "D) Confused and uncertain"],
      correctIndex: 1,
      explanation: "Words like 'despite,' 'almost religious fervor,' and 'dismissing each criticism' reveal the author views the supporters' behavior negatively — that's a skeptical, critical tone.",
      tags: ["tone", "author-purpose"]
    },
    {
      world: "reading", level: 5, type: "multiple-choice",
      question: "Based on the passage, which statement would the author most likely agree with?",
      passage: "The traditional classroom model, designed for the industrial age, treats students like products on an assembly line — uniform inputs expecting uniform outputs. Yet we know that learning is deeply personal, shaped by individual curiosity, background, and pace.",
      options: [
        "A) Standardized education is the most efficient approach",
        "B) Education should be personalized to individual needs",
        "C) Industrial methods work well in schools",
        "D) All students learn at the same pace"
      ],
      correctIndex: 1,
      explanation: "The author directly contrasts the 'assembly line' approach with the idea that learning is 'deeply personal.' They'd clearly agree with personalized education.",
      tags: ["inference", "main-idea"]
    },
  ],
  writing: [
    {
      world: "writing", level: 1, type: "multiple-choice",
      question: "Which version of the underlined sentence is correct?",
      options: [
        "A) The team, along with their coach, are celebrating.",
        "B) The team, along with their coach, is celebrating.",
        "C) The team along with their coach are celebrating.",
        "D) The team along with their coach is celebrating."
      ],
      correctIndex: 1,
      explanation: "'The team' is the subject (singular), and 'along with their coach' is a parenthetical phrase set off by commas. The verb must agree with 'team' → 'is celebrating.'",
      tags: ["subject-verb-agreement", "grammar"]
    },
    {
      world: "writing", level: 3, type: "multiple-choice",
      question: "Which choice most effectively combines the sentences?",
      options: [
        "A) The experiment was successful. It confirmed the hypothesis.",
        "B) The experiment was successful and it confirmed the hypothesis.",
        "C) The successful experiment confirmed the hypothesis.",
        "D) Confirming the hypothesis, the experiment was successful."
      ],
      correctIndex: 2,
      explanation: "Option C is the most concise and clear. It eliminates redundancy by making 'successful' modify 'experiment' directly, leading straight to the result.",
      tags: ["sentence-combining", "conciseness"]
    },
    {
      world: "writing", level: 5, type: "multiple-choice",
      question: "The writer wants to add a sentence that emphasizes the long-term impact of the policy. Which choice best accomplishes this?",
      options: [
        "A) The policy was implemented in 2015.",
        "B) A decade later, the effects of the policy are still being felt across every sector of the economy.",
        "C) Many people had opinions about the policy.",
        "D) The policy changed some things."
      ],
      correctIndex: 1,
      explanation: "Option B emphasizes long-term impact through specific time ('a decade later'), scope ('every sector'), and ongoing effect ('still being felt'). The other options are too vague or factual.",
      tags: ["rhetoric", "purpose"]
    },
  ],
  math: [
    {
      world: "math", level: 1, type: "multiple-choice",
      question: "If 3x + 7 = 22, what is the value of x?",
      options: ["A) 3", "B) 5", "C) 7", "D) 15"],
      correctIndex: 1,
      explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5. Always isolate the variable step by step!",
      tags: ["algebra", "linear-equations"]
    },
    {
      world: "math", level: 3, type: "multiple-choice",
      question: "A store sells apples at $0.75 each. If you buy 4 or more, you get a 20% discount on the total. How much do 5 apples cost?",
      options: ["A) $2.50", "B) $3.00", "C) $3.75", "D) $4.00"],
      correctIndex: 1,
      explanation: "5 × $0.75 = $3.75 (full price). With 20% discount: $3.75 × 0.80 = $3.00. Always calculate the full price first, then apply the discount!",
      tags: ["arithmetic", "percentages"]
    },
    {
      world: "math", level: 5, type: "multiple-choice",
      question: "The function f(x) = 2x² - 5x + 3. What is f(3)?",
      options: ["A) 0", "B) 6", "C) 12", "D) 18"],
      correctIndex: 1,
      explanation: "f(3) = 2(3)² - 5(3) + 3 = 2(9) - 15 + 3 = 18 - 15 + 3 = 6. Substitute carefully and follow order of operations!",
      tags: ["algebra", "functions"]
    },
    {
      world: "math", level: 7, type: "multiple-choice",
      question: "In a group of 60 students, 40% play soccer, 25% play basketball, and the rest play neither. How many play neither?",
      options: ["A) 15", "B) 21", "C) 24", "D) 35"],
      correctIndex: 1,
      explanation: "Soccer: 60 × 0.40 = 24. Basketball: 60 × 0.25 = 15. Neither: 60 - 24 - 15 = 21. Convert percentages to numbers, then subtract from the total.",
      tags: ["arithmetic", "percentages", "word-problems"]
    },
  ]
};
