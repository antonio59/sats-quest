// SATs Quest - Question Seeder
// Run: npx convex run seedQuestions questions

import { mutation } from "./_generated/server";
import { v } from "convex/values";

const SATS_QUESTIONS = [
  // ========== READING - Level 1-3 (Easy) ==========
  { world: "reading", level: 1, type: "multiple-choice", question: "Which word is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctIndex: 1, explanation: "Joyful means feeling or showing great pleasure or happiness - it's a synonym for happy.", tags: ["synonyms", "vocabulary"] },
  { world: "reading", level: 1, type: "multiple-choice", question: "What is the opposite of 'fast'?", options: ["Quick", "Slow", "Rapid", "Speedy"], correctIndex: 1, explanation: "Slow is the opposite of fast.", tags: ["antonyms", "vocabulary"] },
  { world: "reading", level: 1, type: "multiple-choice", question: "Which is a noun?", options: ["Run", "Blue", "Cat", "Jump"], correctIndex: 2, explanation: "Cat is a noun - a person, place, or thing.", tags: ["grammar", "nouns"] },
  { world: "reading", level: 2, type: "multiple-choice", question: "Find the adjective: 'The big dog barked loudly.'", options: ["dog", "big", "barked", "loudly"], correctIndex: 1, explanation: "'Big' describes the dog, so it's an adjective.", tags: ["grammar", "adjectives"] },
  { world: "reading", level: 2, type: "multiple-choice", question: "Which sentence uses a comma correctly?", options: ["The cat sat, on the mat.", "The cat, sat on the mat.", "The cat sat on the mat.", "The cat sat on, the mat."], correctIndex: 2, explanation: "No comma needed here - it's a simple sentence.", tags: ["punctuation", "grammar"] },
  { world: "reading", level: 3, type: "multiple-choice", question: "What does 'estimate' mean?", options: ["Guess exactly", "Make a rough guess", "Know for sure", "Forget"], correctIndex: 1, explanation: "To estimate means to make an approximate or rough calculation.", tags: ["vocabulary", "word-meaning"] },

  // ========== READING - Level 4-6 (Medium) ==========
  { world: "reading", level: 4, type: "multiple-choice", question: "Which word rhymes with 'boat'?", options: ["Goat", "Bit", "Hot", "Cat"], correctIndex: 0, explanation: "Goat rhymes with boat - they both end with the 'oat' sound.", tags: ["phonics", "rhyming"] },
  { world: "reading", level: 4, type: "multiple-choice", question: "What type of word is 'quickly'?", options: ["Noun", "Verb", "Adverb", "Adjective"], correctIndex: 2, explanation: "'Quickly' describes how something is done - it's an adverb.", tags: ["grammar", "adverbs"] },
  { world: "reading", level: 5, type: "multiple-choice", question: "Which sentence has the correct use of 'their'?", options: ["Their going to the park.", "They're going to the park.", "There going to the park.", "Theyre going to the park."], correctIndex: 1, explanation: "'They're' is a contraction of 'they are'.", tags: ["grammar", "spelling"] },
  { world: "reading", level: 5, type: "multiple-choice", question: "Find the main verb: 'She was quickly reading her book.'", options: ["was", "quickly", "reading", "book"], correctIndex: 2, explanation: "'Reading' is the main action in the sentence.", tags: ["grammar", "verbs"] },
  { world: "reading", level: 6, type: "multiple-choice", question: "What does 'determine' mean in this sentence: 'She was determined to win.'", options: ["Want to", "Try to", "Decide firmly to", "Hope to"], correctIndex: 2, explanation: "Determined means having made a firm decision to do something.", tags: ["vocabulary", "word-meaning"] },

  // ========== READING - Level 7-10 (Hard) ==========
  { world: "reading", level: 7, type: "multiple-choice", question: "Which word is a homophone of 'their'?", options: ["There", "They're", "Both A and B", "None"], correctIndex: 2, explanation: "'There' and 'they're' are both homophones of 'their'.", tags: ["homophones", "spelling"] },
  { world: "reading", level: 7, type: "multiple-choice", question: "What does the prefix 'un-' mean in 'unhappy'?", options: ["Again", "Not", "Under", "Above"], correctIndex: 1, explanation: "The prefix 'un-' means 'not', so unhappy means not happy.", tags: ["prefixes", "word-structure"] },
  { world: "reading", level: 8, type: "multiple-choice", question: "Which word has the suffix '-ment'?", options: ["Happy", "Play", "Implement", "Start"], correctIndex: 2, explanation: "'Implement' ends with '-ment' which creates a noun meaning the result of an action.", tags: ["suffixes", "word-structure"] },
  { world: "reading", level: 9, type: "multiple-choice", question: "What does 'consequence' mean?", options: ["A question", "A result or effect", "A beginning", "A story"], correctIndex: 1, explanation: "A consequence is something that happens as a result of an action.", tags: ["vocabulary", "SATs"] },
  { world: "reading", level: 10, type: "multiple-choice", question: "Which sentence uses subjunctive mood?", options: ["If I was rich.", "If I were rich.", "I wish I am rich.", "I am rich."], correctIndex: 1, explanation: "'If I were' is the subjunctive mood for unreal conditions.", tags: ["grammar", "advanced"] },

  // ========== WRITING/GRAMMAR - Level 1-3 ==========
  { world: "writing", level: 1, type: "multiple-choice", question: "Which is a complete sentence?", options: ["The cat", "The cat sleeps", "Is sleeping", "Playing"], correctIndex: 1, explanation: "A complete sentence has a subject and verb - 'The cat sleeps' is complete.", tags: ["sentence-structure"] },
  { world: "writing", level: 1, type: "multiple-choice", question: "What letter sound does 'ch' make in 'chin'?", options: ["k", "s", "ch", "sh"], correctIndex: 2, explanation: "In 'chin', 'ch' makes the 'ch' sound.", tags: ["phonics", "phonic-rules"] },
  { world: "writing", level: 2, type: "multiple-choice", question: "Capital letters are used for:", options: ["Common nouns", "Days of the week", "Small words", "Numbers"], correctIndex: 1, explanation: "Days of the week (Monday, Tuesday, etc.) always start with capital letters.", tags: ["capitalization"] },
  { world: "writing", level: 2, type: "multiple-choice", question: "Which word is a verb?", options: ["Table", "Run", "Blue", "Tree"], correctIndex: 1, explanation: "Run is an action word - it's a verb.", tags: ["grammar", "verbs"] },
  { world: "writing", level: 3, type: "multiple-choice", question: "Add the correct punctuation: 'What time is it'", options: ["What time is it?", "What time is it!", "What time is it.", "What time is it..."], correctIndex: 0, explanation: "It's a question, so it needs a question mark.", tags: ["punctuation"] },

  // ========== WRITING/GRAMMAR - Level 4-6 ==========
  { world: "writing", level: 4, type: "multiple-choice", question: "Which is the correct plural?", options: ["Childs", "Childrens", "Children", "Childes"], correctIndex: 2, explanation: "Children is the plural of child.", tags: ["spelling", "plurals"] },
  { world: "writing", level: 4, type: "multiple-choice", question: "What is the present tense of 'ate'?", options: ["Eat", "Eating", "Ate", "Eaten"], correctIndex: 0, explanation: "Eat is the present tense of ate.", tags: ["tenses", "verbs"] },
  { world: "writing", level: 5, type: "multiple-choice", question: "Choose the correct possessive: 'The ___ toy was broken.'", options: ["boys", "boy's", "boys'", "boy"], correctIndex: 1, explanation: " boy's shows possession by one boy.", tags: ["possessives", "grammar"] },
  { world: "writing", level: 5, type: "multiple-choice", question: "Which word is a conjunction?", options: ["And", "Big", "Run", "Cat"], correctIndex: 0, explanation: "And connects words or clauses - it's a conjunction.", tags: ["grammar", "conjunctions"] },
  { world: "writing", level: 6, type: "multiple-choice", question: "What is the past participle of 'go'?", options: ["Go", "Going", "Went", "Gone"], correctIndex: 3, explanation: "Gone is the past participle of go.", tags: ["verbs", "tenses"] },

  // ========== WRITING/GRAMMAR - Level 7-10 ==========
  { world: "writing", level: 7, type: "multiple-choice", question: "Which sentence uses 'who' correctly?", options: ["Who wants ice cream?", "Whose wants ice cream?", "Who's wants ice cream?", "Whos wants ice cream?"], correctIndex: 0, explanation: "Who is used to ask about people.", tags: ["who-vs-whos"] },
  { world: "writing", level: 7, type: "multiple-choice", question: "What does the suffix '-ous' mean?", options: ["Without", "Full of", "Like", "Opposite of"], correctIndex: 1, explanation: "-ous means 'full of' - like 'famous' means full of fame.", tags: ["suffixes", "word-meaning"] },
  { world: "writing", level: 8, type: "multiple-choice", question: "Which is a compound sentence?", options: ["The cat slept.", "The cat slept because it was tired.", "The tired cat.", "Sleeping cat."], correctIndex: 1, explanation: "A compound sentence has two complete clauses joined by 'because'.", tags: ["compound-sentences"] },
  { world: "writing", level: 9, type: "multiple-choice", question: "Choose the correct form: 'Neither the teacher ___ the students were ready.'", options: ["or", "nor", "and", "but"], correctIndex: 1, explanation: "Neither is always followed by nor.", tags: ["grammar", "pair-words"] },
  { world: "writing", level: 10, type: "multiple-choice", question: "Which sentence uses a semicolon correctly?", options: ["I like apples; they are tasty.", "I like; apples they are tasty.", "I like apples; and they are tasty.", "I like apples;."], correctIndex: 0, explanation: "A semicolon connects two related complete sentences.", tags: ["punctuation", "advanced"] },

  // ========== MATH - Level 1-3 ==========
  { world: "math", level: 1, type: "multiple-choice", question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctIndex: 2, explanation: "5 + 3 = 8", tags: ["addition", "basic-math"] },
  { world: "math", level: 1, type: "multiple-choice", question: "What is 10 - 4?", options: ["4", "5", "6", "7"], correctIndex: 2, explanation: "10 - 4 = 6", tags: ["subtraction", "basic-math"] },
  { world: "math", level: 2, type: "multiple-choice", question: "What is 7 × 2?", options: ["12", "14", "16", "18"], correctIndex: 1, explanation: "7 × 2 = 14", tags: ["multiplication", "times-tables"] },
  { world: "math", level: 2, type: "multiple-choice", question: "What is 15 + 8?", options: ["22", "23", "24", "25"], correctIndex: 1, explanation: "15 + 8 = 23", tags: ["addition"] },
  { world: "math", level: 3, type: "multiple-choice", question: "What is 48 ÷ 6?", options: ["6", "7", "8", "9"], correctIndex: 2, explanation: "48 ÷ 6 = 8", tags: ["division"] },

  // ========== MATH - Level 4-6 ==========
  { world: "math", level: 4, type: "multiple-choice", question: "What is 234 + 156?", options: ["380", "390", "400", "410"], correctIndex: 1, explanation: "234 + 156 = 390", tags: ["addition", "column-addition"] },
  { world: "math", level: 4, type: "multiple-choice", question: "What is 8 × 7?", options: ["54", "56", "58", "60"], correctIndex: 1, explanation: "8 × 7 = 56", tags: ["multiplication", "times-tables"] },
  { world: "math", level: 5, type: "multiple-choice", question: "What is 1/2 + 1/4?", options: ["2/6", "3/4", "1/6", "2/4"], correctIndex: 1, explanation: "1/2 + 1/4 = 2/4 + 1/4 = 3/4", tags: ["fractions"] },
  { world: "math", level: 5, type: "multiple-choice", question: "What is 1000 - 347?", options: ["653", "647", "643", "657"], correctIndex: 0, explanation: "1000 - 347 = 653", tags: ["subtraction"] },
  { world: "math", level: 6, type: "multiple-choice", question: "What is 25% of 200?", options: ["25", "50", "75", "100"], correctIndex: 1, explanation: "25% = 1/4, so 1/4 of 200 = 50", tags: ["percentages"] },

  // ========== MATH - Level 7-10 ==========
  { world: "math", level: 7, type: "multiple-choice", question: "What is 3.5 × 100?", options: ["35", "350", "3500", "0.35"], correctIndex: 1, explanation: "Multiplying by 100 moves the decimal 2 places: 3.5 × 100 = 350", tags: ["decimals", "place-value"] },
  { world: "math", level: 7, type: "multiple-choice", question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctIndex: 2, explanation: "8 × 8 = 64, so √64 = 8", tags: ["square-numbers"] },
  { world: "math", level: 8, type: "multiple-choice", question: "What is 3/5 as a percentage?", options: ["30%", "50%", "60%", "70%"], correctIndex: 2, explanation: "3/5 = 0.6 = 60%", tags: ["fractions", "percentages"] },
  { world: "math", level: 8, type: "multiple-choice", question: "If x + 5 = 12, what is x?", options: ["5", "6", "7", "8"], correctIndex: 2, explanation: "x = 12 - 5 = 7", tags: ["algebra", "equations"] },
  { world: "math", level: 9, type: "multiple-choice", question: "What is 2 to the power of 5?", options: ["10", "25", "32", "64"], correctIndex: 2, explanation: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32", tags: ["powers"] },
  { world: "math", level: 10, type: "multiple-choice", question: "What is the area of a rectangle with width 5cm and height 8cm?", options: ["13cm²", "26cm²", "40cm²", "80cm²"], correctIndex: 2, explanation: "Area = width × height = 5 × 8 = 40cm²", tags: ["geometry", "area"] },

  // ========== MORE READING (SATs style) ==========
  { world: "reading", level: 3, type: "multiple-choice", question: "Which word is a verb in past tense?", options: ["Walk", "Walking", "Walked", "Will walk"], correctIndex: 2, explanation: "Walked is past tense.", tags: ["tenses", "verbs"] },
  { world: "reading", level: 4, type: "multiple-choice", question: "What does 'immediately' mean?", options: ["Later", "At once", "Sometimes", "Never"], correctIndex: 1, explanation: "Immediately means at once or right away.", tags: ["adverbs", "vocabulary"] },
  { world: "reading", level: 5, type: "multiple-choice", question: "Which is the correct spelling?", options: ["Recieve", "Receive", "Receeve", "Recive"], correctIndex: 1, explanation: "The correct spelling is 'receive' (i before e except after c).", tags: ["spelling", "common-exceptions"] },

  // ========== MORE WRITING ==========
  { world: "writing", level: 3, type: "multiple-choice", question: "Which word completes: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correctIndex: 1, explanation: "Third person singular takes 'goes'.", tags: ["verbs", "subject-verb"] },
  { world: "writing", level: 4, type: "multiple-choice", question: "What type of word is 'because'?", options: ["Noun", "Verb", "Conjunction", "Adjective"], correctIndex: 2, explanation: "Because connects clauses - it's a conjunction.", tags: ["conjunctions"] },
  { world: "writing", level: 5, type: "multiple-choice", question: "Choose the correct homophone: 'The dog wagged ___ tail.'", options: ["its", "it's", "is", "it"], correctIndex: 0, explanation: "Its (no apostrophe) shows possession.", tags: ["homophones", "possessives"] },

  // ========== MORE MATH ==========
  { world: "math", level: 3, type: "multiple-choice", question: "What is double 24?", options: ["44", "46", "48", "52"], correctIndex: 2, explanation: "Double 24 = 24 × 2 = 48", tags: ["multiplication"] },
  { world: "math", level: 4, type: "multiple-choice", question: "What is half of 86?", options: ["42", "43", "44", "45"], correctIndex: 1, explanation: "Half of 86 = 86 ÷ 2 = 43", tags: ["division"] },
  { world: "math", level: 5, type: "multiple-choice", question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correctIndex: 1, explanation: "A hexagon has 6 sides.", tags: ["shapes"] },
  { world: "math", level: 6, type: "multiple-choice", question: "What is 0.75 as a fraction?", options: ["3/4", "2/3", "1/2", "4/5"], correctIndex: 0, explanation: "0.75 = 75/100 = 3/4", tags: ["fractions", "decimals"] },
];

export const seedQuestions = mutation({
  args: {},
  handler: async (ctx) => {
    let count = 0;
    for (const q of SATS_QUESTIONS) {
      await ctx.db.insert("questions", q);
      count++;
    }
    return { inserted: count };
  },
});