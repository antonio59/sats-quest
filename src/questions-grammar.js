/**
 * SAT Quest - KS2 SATs Grammar, Punctuation & Spelling Question Bank
 * UK Key Stage 2 (Year 6) GPS Questions
 * Topics: Word classes, tenses, voice, clauses, punctuation, spelling
 */

window.GrammarQuestions = [
  // ============== WORD CLASSES ==============
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which word in this sentence is a noun? 'The elephant walked slowly across the savannah.'",
    options: ["A) walked", "B) slowly", "C) elephant", "D) across"],
    correctIndex: 2,
    explanation: "A noun is a naming word for a person, place, or thing. 'Elephant' is the name of an animal.",
    tags: ["word-classes", "nouns"]
  },
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which word is a verb in this sentence? 'The children played happily in the park.'",
    options: ["A) children", "B) happily", "C) played", "D) park"],
    correctIndex: 2,
    explanation: "A verb is a doing or being word. 'Played' tells us what action the children did.",
    tags: ["word-classes", "verbs"]
  },
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which word is an adjective?",
    options: ["A) quickly", "B) beautiful", "C) under", "D) happiness"],
    correctIndex: 1,
    explanation: "An adjective describes a noun. 'Beautiful' describes what something looks like.",
    tags: ["word-classes", "adjectives"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is an adverb in this sentence? 'She sang beautifully at the concert.'",
    options: ["A) sang", "B) she", "C) beautifully", "D) concert"],
    correctIndex: 2,
    explanation: "An adverb describes how, when, or where something happens. 'Beautifully' tells us how she sang.",
    tags: ["word-classes", "adverbs"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is a preposition?",
    options: ["A) happy", "B) jumped", "C) under", "D) quickly"],
    correctIndex: 2,
    explanation: "A preposition shows the position or relationship between things. 'Under' tells us where something is.",
    tags: ["word-classes", "prepositions"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is a pronoun?",
    options: ["A) table", "B) they", "C) happy", "D) because"],
    correctIndex: 1,
    explanation: "A pronoun replaces a noun. 'They' can replace a group of people or things (e.g., 'The children → they').",
    tags: ["word-classes", "pronouns"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is a conjunction?",
    options: ["A) and", "B) table", "C) quickly", "D) the"],
    correctIndex: 0,
    explanation: "A conjunction joins words, phrases, or clauses together. 'And' is a coordinating conjunction.",
    tags: ["word-classes", "conjunctions"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is a determiner?",
    options: ["A) happy", "B) the", "C) jumped", "D) because"],
    correctIndex: 1,
    explanation: "A determiner goes before a noun to specify which one. 'The' is a definite article (a type of determiner).",
    tags: ["word-classes", "determiners"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Identify the adverb in this sentence: 'The train arrived early at the station.'",
    options: ["A) train", "B) arrived", "C) early", "D) station"],
    correctIndex: 2,
    explanation: "'Early' is an adverb of time, telling us when the train arrived.",
    tags: ["word-classes", "adverbs"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence contains a possessive pronoun?",
    options: [
      "A) She went to the shop.",
      "B) The book is mine.",
      "C) They are playing outside.",
      "D) We saw a film yesterday."
    ],
    correctIndex: 1,
    explanation: "'Mine' is a possessive pronoun. It shows ownership without needing a noun after it (unlike 'my book').",
    tags: ["word-classes", "pronouns"]
  },

  // ============== VERB TENSES ==============
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which sentence is written in the past tense?",
    options: [
      "A) I am eating my dinner.",
      "B) I will eat my dinner.",
      "C) I ate my dinner.",
      "D) I eat my dinner."
    ],
    correctIndex: 2,
    explanation: "'Ate' is the past tense of 'eat'. It tells us the action has already happened.",
    tags: ["verb-tenses", "past-tense"]
  },
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which sentence is in the future tense?",
    options: [
      "A) She walks to school.",
      "B) She walked to school.",
      "C) She will walk to school.",
      "D) She is walking to school."
    ],
    correctIndex: 2,
    explanation: "'Will walk' tells us the action is going to happen later, in the future.",
    tags: ["verb-tenses", "future-tense"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence uses the present progressive tense?",
    options: [
      "A) I play football.",
      "B) I am playing football.",
      "C) I played football.",
      "D) I have played football."
    ],
    correctIndex: 1,
    explanation: "The present progressive uses 'am/is/are + verb-ing' to show something happening right now.",
    tags: ["verb-tenses", "progressive", "present-tense"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence uses the past progressive tense?",
    options: [
      "A) She was singing in the choir.",
      "B) She sings in the choir.",
      "C) She has sung in the choir.",
      "D) She sang in the choir."
    ],
    correctIndex: 0,
    explanation: "The past progressive uses 'was/were + verb-ing' to show something was happening over a period in the past.",
    tags: ["verb-tenses", "progressive", "past-tense"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses the present perfect tense?",
    options: [
      "A) I eat the cake.",
      "B) I am eating the cake.",
      "C) I have eaten the cake.",
      "D) I ate the cake."
    ],
    correctIndex: 2,
    explanation: "The present perfect uses 'have/has + past participle' to show something happened at an unspecified time before now.",
    tags: ["verb-tenses", "perfect", "present-tense"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses the past perfect tense?",
    options: [
      "A) They left before I arrived.",
      "B) They had left before I arrived.",
      "C) They have left before I arrived.",
      "D) They were leaving before I arrived."
    ],
    correctIndex: 1,
    explanation: "The past perfect uses 'had + past participle' to show one past action happened before another past action.",
    tags: ["verb-tenses", "perfect", "past-tense"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which verb is in the past progressive tense?",
    options: ["A) is running", "B) was running", "C) has run", "D) runs"],
    correctIndex: 1,
    explanation: "'Was running' uses 'was + verb-ing' which is the past progressive structure.",
    tags: ["verb-tenses", "progressive", "past-tense"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses the future perfect tense?",
    options: [
      "A) By tomorrow, I will finish my homework.",
      "B) By tomorrow, I will have finished my homework.",
      "C) By tomorrow, I will be finishing my homework.",
      "D) By tomorrow, I finish my homework."
    ],
    correctIndex: 1,
    explanation: "The future perfect uses 'will have + past participle' to show something will be completed before a specific time in the future.",
    tags: ["verb-tenses", "perfect", "future-tense"]
  },

  // ============== ACTIVE AND PASSIVE VOICE ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence is written in the active voice?",
    options: [
      "A) The ball was kicked by the boy.",
      "B) The cake was eaten by the dog.",
      "C) The boy kicked the ball.",
      "D) The letter was written by Sarah."
    ],
    correctIndex: 2,
    explanation: "In active voice, the subject (the boy) does the action (kicked). The subject comes first and is doing the verb.",
    tags: ["active-passive", "active-voice"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence is written in the passive voice?",
    options: [
      "A) The chef cooked the meal.",
      "B) The dog chased the cat.",
      "C) The window was broken by the ball.",
      "D) Sarah wrote a letter."
    ],
    correctIndex: 2,
    explanation: "In passive voice, the object (the window) comes first and has the action done to it. It often includes 'was/were + past participle + by'.",
    tags: ["active-passive", "passive-voice"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Change this to passive voice: 'The teacher marked the tests.'",
    options: [
      "A) The teacher was marking the tests.",
      "B) The tests were marked by the teacher.",
      "C) The tests marked the teacher.",
      "D) The teacher has marked the tests."
    ],
    correctIndex: 1,
    explanation: "In passive voice, the object (the tests) becomes the subject, and we use 'were + past participle (marked) + by the teacher'.",
    tags: ["active-passive", "passive-voice"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Change this to active voice: 'The treasure was found by the pirates.'",
    options: [
      "A) The pirates found the treasure.",
      "B) The pirates were finding the treasure.",
      "C) The treasure found the pirates.",
      "D) The pirates had found the treasure."
    ],
    correctIndex: 0,
    explanation: "In active voice, the doer (the pirates) becomes the subject and does the action (found) to the object (the treasure).",
    tags: ["active-passive", "active-voice"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence is in the passive voice?",
    options: [
      "A) Lightning struck the tree.",
      "B) The audience applauded the singer.",
      "C) The ancient ruins were discovered by archaeologists.",
      "D) The storm damaged the roof."
    ],
    correctIndex: 2,
    explanation: "'Were discovered' is a passive construction. The ruins didn't do the discovering—they were discovered by someone else.",
    tags: ["active-passive", "passive-voice"]
  },

  // ============== SUBJUNCTIVE FORM ==============
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses the subjunctive form correctly?",
    options: [
      "A) If I was you, I would study harder.",
      "B) If I were you, I would study harder.",
      "C) If I am you, I would study harder.",
      "D) If I be you, I would study harder."
    ],
    correctIndex: 1,
    explanation: "The subjunctive uses 'were' instead of 'was' after 'if' when talking about imaginary or hypothetical situations.",
    tags: ["subjunctive"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses the subjunctive form?",
    options: [
      "A) I suggest that he goes to bed early.",
      "B) I suggest that he go to bed early.",
      "C) I suggest that he went to bed early.",
      "D) I suggest that he is going to bed early."
    ],
    correctIndex: 1,
    explanation: "After verbs like 'suggest', 'demand', or 'insist', we use the subjunctive form: the base form of the verb without 'to' (he go, not he goes).",
    tags: ["subjunctive"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence shows the subjunctive mood?",
    options: [
      "A) She wishes she was taller.",
      "B) She wishes she were taller.",
      "C) She wishes she is taller.",
      "D) She wishes she had been taller."
    ],
    correctIndex: 1,
    explanation: "After 'wish', we use 'were' (not 'was') to show something is not true or is hypothetical. This is the subjunctive mood.",
    tags: ["subjunctive"]
  },

  // ============== RELATIVE CLAUSES ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which relative pronoun fits best? 'The girl _____ won the race is my sister.'",
    options: ["A) which", "B) where", "C) who", "D) when"],
    correctIndex: 2,
    explanation: "'Who' is used for people. The girl is a person, so we use 'who'.",
    tags: ["relative-clauses", "relative-pronouns"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which relative pronoun fits best? 'The book _____ I am reading is exciting.'",
    options: ["A) who", "B) which", "C) where", "D) whose"],
    correctIndex: 1,
    explanation: "'Which' is used for things and animals. A book is a thing, so we use 'which'.",
    tags: ["relative-clauses", "relative-pronouns"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which relative pronoun fits best? 'This is the house _____ I was born.'",
    options: ["A) who", "B) which", "C) where", "D) that"],
    correctIndex: 2,
    explanation: "'Where' is used for places. The house is a place, so we use 'where' to mean 'in which'.",
    tags: ["relative-clauses", "relative-pronouns"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which relative pronoun fits best? 'Monday is the day _____ we go swimming.'",
    options: ["A) who", "B) which", "C) when", "D) whose"],
    correctIndex: 2,
    explanation: "'When' is used for times. Monday is a time/day, so we use 'when' to mean 'on which'.",
    tags: ["relative-clauses", "relative-pronouns"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which relative pronoun fits best? 'The man _____ car was stolen reported it to the police.'",
    options: ["A) who", "B) which", "C) where", "D) whose"],
    correctIndex: 3,
    explanation: "'Whose' shows possession. It tells us the car belongs to the man.",
    tags: ["relative-clauses", "relative-pronouns"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence contains a relative clause?",
    options: [
      "A) The dog barked loudly.",
      "B) The dog, which was brown, barked loudly.",
      "C) The brown dog barked loudly.",
      "D) The dog barked loudly at the cat."
    ],
    correctIndex: 1,
    explanation: "A relative clause adds extra information and starts with a relative pronoun like 'which', 'who', 'where', or 'that'. 'Which was brown' is the relative clause.",
    tags: ["relative-clauses"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence correctly uses 'that' as a relative pronoun?",
    options: [
      "A) The girl that book is red is my friend.",
      "B) The cake that I baked was delicious.",
      "C) The park that we played was fun.",
      "D) The day that we go is Monday."
    ],
    correctIndex: 1,
    explanation: "'That' can replace 'which' for things. 'That I baked' is a defining relative clause telling us which cake.",
    tags: ["relative-clauses", "relative-pronouns"]
  },

  // ============== FRONTED ADVERBIALS ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence uses a fronted adverbial?",
    options: [
      "A) I went to the park yesterday.",
      "B) Yesterday, I went to the park.",
      "C) I went to the park and played football.",
      "D) I happily went to the park."
    ],
    correctIndex: 1,
    explanation: "A fronted adverbial comes at the start of a sentence, before the main clause. 'Yesterday' is moved to the front, followed by a comma.",
    tags: ["fronted-adverbials"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence uses a fronted adverbial?",
    options: [
      "A) She walked slowly down the street.",
      "B) Slowly, she walked down the street.",
      "C) She walked down the street slowly.",
      "D) She slowly walked down the street."
    ],
    correctIndex: 1,
    explanation: "'Slowly' at the start of the sentence is a fronted adverbial of manner. Notice the comma after it.",
    tags: ["fronted-adverbials"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence correctly punctuates a fronted adverbial?",
    options: [
      "A) In the morning I ate my breakfast.",
      "B) In the morning, I ate my breakfast.",
      "C) In the morning; I ate my breakfast.",
      "D) In the morning: I ate my breakfast."
    ],
    correctIndex: 1,
    explanation: "Fronted adverbials are followed by a comma to separate them from the main clause.",
    tags: ["fronted-adverbials", "punctuation"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which is a fronted adverbial of place?",
    options: [
      "A) Yesterday, we went swimming.",
      "B) Carefully, she opened the box.",
      "C) Under the bridge, the troll lived.",
      "D) Because it was raining, we stayed inside."
    ],
    correctIndex: 2,
    explanation: "'Under the bridge' tells us where something happened (place), and it's at the front of the sentence.",
    tags: ["fronted-adverbials"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses a fronted adverbial to show frequency?",
    options: [
      "A) Every Saturday, I play football with my friends.",
      "B) Yesterday, I played football with my friends.",
      "C) At the park, I play football with my friends.",
      "D) Excitedly, I play football with my friends."
    ],
    correctIndex: 0,
    explanation: "'Every Saturday' tells us how often something happens (frequency) and is placed at the front of the sentence.",
    tags: ["fronted-adverbials"]
  },

  // ============== PUNCTUATION: COLONS, SEMICOLONS, DASHES ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence uses a colon correctly?",
    options: [
      "A) I need to buy: milk, eggs, and bread.",
      "B) I have one rule: always be kind.",
      "C) She went to: the shop.",
      "D) The colours are: red, blue and green."
    ],
    correctIndex: 1,
    explanation: "A colon introduces a list, explanation, or rule that follows a complete sentence. 'I have one rule' is a complete sentence before the colon.",
    tags: ["punctuation", "colons"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses a semicolon correctly?",
    options: [
      "A) I like apples; and oranges.",
      "B) I have a big test tomorrow; I can't go out tonight.",
      "C) She went to the shop; bought milk.",
      "D) The colours are; red, blue and green."
    ],
    correctIndex: 1,
    explanation: "A semicolon joins two closely related sentences (independent clauses). Both parts could stand alone as sentences.",
    tags: ["punctuation", "semicolons"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses a dash correctly?",
    options: [
      "A) I went to the shop - bought some milk.",
      "B) My brother - who is older than me - lives in London.",
      "C) She likes - running and swimming.",
      "D) The - cat sat on the mat."
    ],
    correctIndex: 1,
    explanation: "Dashes (parenthetical dashes) can be used like brackets to add extra information. The sentence makes sense without the dashed part.",
    tags: ["punctuation", "dashes"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence uses a hyphen correctly?",
    options: [
      "A) The well known singer performed last night.",
      "B) The well-known singer performed last night.",
      "C) The well - known singer performed last night.",
      "D) The-well-known singer performed last night."
    ],
    correctIndex: 1,
    explanation: "Hyphens join words together to make compound adjectives before a noun. 'Well-known' describes the singer.",
    tags: ["punctuation", "hyphens"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses bullet points correctly?",
    options: [
      "A) I need: milk, eggs and, bread.",
      "B) I need: • milk • eggs • bread",
      "C) I need - milk - eggs - bread",
      "D) I need; milk, eggs, bread."
    ],
    correctIndex: 1,
    explanation: "Bullet points are used to list items clearly. Each item starts on a new line with a bullet point.",
    tags: ["punctuation", "bullet-points"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses an ellipsis correctly?",
    options: [
      "A) I went to the shop...and bought milk.",
      "B) She paused... then continued speaking.",
      "C) The colours are...red, blue and green.",
      "D) I need...milk, eggs and bread."
    ],
    correctIndex: 1,
    explanation: "An ellipsis (...) shows a pause, hesitation, or trailing off in speech or thought. It creates suspense or shows something is unfinished.",
    tags: ["punctuation", "ellipsis"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses a colon to introduce a list?",
    options: [
      "A) For the picnic we need: sandwiches, juice, and fruit.",
      "B) For the picnic we need sandwiches: juice, and fruit.",
      "C) For the: picnic we need sandwiches, juice, and fruit.",
      "D) For the picnic: we need sandwiches, juice, and fruit."
    ],
    correctIndex: 0,
    explanation: "A colon introduces a list after a complete sentence. 'For the picnic we need' makes sense on its own before the list begins.",
    tags: ["punctuation", "colons"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence correctly uses a semicolon in a list?",
    options: [
      "A) I visited London, England, Paris, France and Rome, Italy.",
      "B) I visited London, England; Paris, France; and Rome, Italy.",
      "C) I visited London; England, Paris; France and Rome; Italy.",
      "D) I visited London England, Paris France, and Rome Italy."
    ],
    correctIndex: 1,
    explanation: "Semicolons separate items in a list when the items themselves contain commas. This makes the list clearer.",
    tags: ["punctuation", "semicolons"]
  },

  // ============== SPELLING: SILENT LETTERS ==============
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which word has a silent letter?",
    options: ["A) cat", "B) dog", "C) knight", "D) hat"],
    correctIndex: 2,
    explanation: "In 'knight', the 'k' is silent. We pronounce it as 'nite'. The 'k' used to be pronounced hundreds of years ago!",
    tags: ["spelling", "silent-letters"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) nife", "B) knife", "C) kniffe", "D) niffe"],
    correctIndex: 1,
    explanation: "'Knife' has a silent 'k' at the beginning. The 'k' was pronounced in Old English but became silent over time.",
    tags: ["spelling", "silent-letters"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word has a silent 'w'?",
    options: ["A) water", "B) window", "C) write", "D) wind"],
    correctIndex: 2,
    explanation: "In 'write', the 'w' is silent. We pronounce it as 'rite'. Other examples: wrist, wrap, wreck.",
    tags: ["spelling", "silent-letters"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word has a silent 'b'?",
    options: ["A) ball", "B) about", "C) lamb", "D) baby"],
    correctIndex: 2,
    explanation: "In 'lamb', the 'b' is silent. We pronounce it as 'lam'. Other examples: comb, thumb, climb, bomb.",
    tags: ["spelling", "silent-letters"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word has a silent 'g'?",
    options: ["A) go", "B) gnome", "C) bag", "D) big"],
    correctIndex: 1,
    explanation: "In 'gnome', the 'g' is silent. We pronounce it as 'nome'. Other examples: gnaw, sign, design.",
    tags: ["spelling", "silent-letters"]
  },

  // ============== SPELLING: PREFIXES ==============
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "What does the prefix 'un-' mean?",
    options: ["A) again", "B) not", "C) before", "D) after"],
    correctIndex: 1,
    explanation: "The prefix 'un-' means 'not'. For example: unhappy = not happy, unable = not able.",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word uses the prefix 'dis-' correctly?",
    options: ["A) disregular", "B) dislarge", "C) disappear", "D) disgood"],
    correctIndex: 2,
    explanation: "'Dis-' means 'not' or 'opposite of'. 'Disappear' means the opposite of appear - to vanish.",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "What does the prefix 're-' mean?",
    options: ["A) not", "B) again", "C) before", "D) after"],
    correctIndex: 1,
    explanation: "The prefix 're-' means 'again'. For example: rewrite = write again, return = turn back again.",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word uses the prefix 'mis-' correctly?",
    options: ["A) misgood", "B) misplace", "C) mislarge", "D) misregular"],
    correctIndex: 1,
    explanation: "'Mis-' means 'wrongly' or 'badly'. 'Misplace' means to put something in the wrong place.",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word uses the prefix 'over-' correctly?",
    options: ["A) overgood", "B) overplace", "C) overcook", "D) overregular"],
    correctIndex: 2,
    explanation: "'Over-' means 'too much'. 'Overcook' means to cook something too much.",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word uses the prefix 'pre-' correctly?",
    options: ["A) pregood", "B) preview", "C) preplace", "D) preregular"],
    correctIndex: 1,
    explanation: "'Pre-' means 'before'. 'Preview' means to view something before it is shown to everyone.",
    tags: ["spelling", "prefixes"]
  },

  // ============== SPELLING: SUFFIXES ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which suffix turns a noun into an adjective meaning 'full of'?",
    options: ["A) -less", "B) -ful", "C) -ness", "D) -ly"],
    correctIndex: 1,
    explanation: "The suffix '-ful' means 'full of'. For example: beautiful = full of beauty, careful = full of care.",
    tags: ["spelling", "suffixes"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word uses the suffix '-less' correctly?",
    options: ["A) care + less = careless", "B) hope + less = hopeless", "C) Both A and B", "D) Neither"],
    correctIndex: 2,
    explanation: "The suffix '-less' means 'without'. Both 'careless' (without care) and 'hopeless' (without hope) are correct.",
    tags: ["spelling", "suffixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which suffix turns an adjective into a noun?",
    options: ["A) -ful", "B) -ly", "C) -ness", "D) -less"],
    correctIndex: 2,
    explanation: "The suffix '-ness' turns adjectives into nouns. For example: happy → happiness, kind → kindness.",
    tags: ["spelling", "suffixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which suffix turns an adjective into an adverb?",
    options: ["A) -ful", "B) -ly", "C) -ness", "D) -less"],
    correctIndex: 1,
    explanation: "The suffix '-ly' often turns adjectives into adverbs. For example: quick → quickly, happy → happily.",
    tags: ["spelling", "suffixes"]
  },

  // ============== SPELLING: -TION / -SION / -CIAN ==============
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which ending is correct? 'The _____ of the movie was exciting.'",
    options: ["A) acttion", "B) action", "C) acsion", "D) actian"],
    correctIndex: 1,
    explanation: "The ending '-tion' is used after most verbs. 'Action' comes from 'act' + '-tion'.",
    tags: ["spelling", "tion-sion-cian"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) decition", "B) decision", "C) decisian", "D) decishun"],
    correctIndex: 1,
    explanation: "After 'de' + 'cide', we use '-sion' (not -tion). 'Decision' is the noun form of 'decide'.",
    tags: ["spelling", "tion-sion-cian"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which ending is used for a person who does a job?",
    options: ["A) -tion", "B) -sion", "C) -cian", "D) -shun"],
    correctIndex: 2,
    explanation: "The ending '-cian' is used for people with specific jobs or skills. For example: musician, magician, electrician.",
    tags: ["spelling", "tion-sion-cian"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) musition", "B) musician", "C) musision", "D) musicion"],
    correctIndex: 1,
    explanation: "Jobs ending in '-ic' usually take '-cian'. A 'musician' is someone who plays music.",
    tags: ["spelling", "tion-sion-cian"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word uses '-sion'?",
    options: ["A) nation", "B) television", "C) action", "D) education"],
    correctIndex: 1,
    explanation: "'Television' uses '-sion'. We use '-sion' after certain letters or when the root word ends in 'de' or 'se'.",
    tags: ["spelling", "tion-sion-cian"]
  },

  // ============== SPELLING: -ABLE / -IBLE ==============
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) comfortible", "B) comfortable", "C) comfortabel", "D) comforteble"],
    correctIndex: 1,
    explanation: "Most words use '-able'. 'Comfortable' means able to be comforted - we can add '-able' to the complete word 'comfort'.",
    tags: ["spelling", "able-ible"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word uses '-ible'?",
    options: ["A) readible", "B) readable", "C) terrible", "D) enjoyible"],
    correctIndex: 2,
    explanation: "'-Ible' is less common and usually follows Latin roots. 'Terrible' comes from Latin 'terrere' (to frighten).",
    tags: ["spelling", "able-ible"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) visable", "B) visible", "C) visibel", "D) visable"],
    correctIndex: 1,
    explanation: "'Visible' uses '-ible' because it comes from Latin. It means 'able to be seen'.",
    tags: ["spelling", "able-ible"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) incredible", "B) incredable", "C) incredibel", "D) incredeble"],
    correctIndex: 0,
    explanation: "'Incredible' uses '-ible'. The root 'cred' comes from Latin, and words with Latin roots often use '-ible'.",
    tags: ["spelling", "able-ible"]
  },

  // ============== SPELLING: DOUBLE CONSONANTS ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word has a double consonant?",
    options: ["A) hopping", "B) hoping", "C) both", "D) neither"],
    correctIndex: 0,
    explanation: "'Hopping' has a double 'p'. We double the consonant when adding '-ing' to a short vowel word with one syllable (hop → hopping).",
    tags: ["spelling", "double-consonants"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) running", "B) runing", "C) runnung", "D) runnning"],
    correctIndex: 0,
    explanation: "'Running' has a double 'n'. We double the final consonant 'n' before adding '-ing' to 'run'.",
    tags: ["spelling", "double-consonants"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) stoping", "B) stoppping", "C) stopping", "D) stoppng"],
    correctIndex: 2,
    explanation: "'Stopping' has a double 'p'. We double the final consonant before adding '-ing' because 'stop' has a short vowel sound.",
    tags: ["spelling", "double-consonants"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) begining", "B) beginning", "C) beginnin", "D) beggining"],
    correctIndex: 1,
    explanation: "'Beginning' has a double 'n'. We double the 'n' before adding '-ing' because the stress is on the second syllable.",
    tags: ["spelling", "double-consonants"]
  },

  // ============== SPELLING: HOMOPHONES ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word means 'a place'?",
    options: ["A) there", "B) their", "C) they're", "D) thier"],
    correctIndex: 0,
    explanation: "'There' refers to a place. 'Their' shows possession, and 'they're' is short for 'they are'.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word shows possession (belonging to them)?",
    options: ["A) there", "B) their", "C) they're", "D) thier"],
    correctIndex: 1,
    explanation: "'Their' shows that something belongs to them. 'There' is a place, and 'they're' means 'they are'.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word means 'you are'?",
    options: ["A) your", "B) you're", "C) yore", "D) yor"],
    correctIndex: 1,
    explanation: "'You're' is a contraction of 'you are'. 'Your' shows possession (belonging to you).",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence uses 'its' correctly?",
    options: [
      "A) The dog wagged it's tail.",
      "B) The dog wagged its tail.",
      "C) The dog wagged its' tail.",
      "D) The dog wagged it tail."
    ],
    correctIndex: 1,
    explanation: "'Its' (no apostrophe) shows possession for things. 'It's' (with apostrophe) means 'it is'.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word means 'to receive'?",
    options: ["A) accept", "B) except", "C) axcept", "D) exsept"],
    correctIndex: 0,
    explanation: "'Accept' means to receive or agree to something. 'Except' means excluding or apart from.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word means 'to influence'?",
    options: ["A) effect", "B) affect", "C) affekt", "D) efekt"],
    correctIndex: 1,
    explanation: "'Affect' is usually a verb meaning to influence. 'Effect' is usually a noun meaning the result.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word means 'to go before'?",
    options: ["A) proceed", "B) precede", "C) preceed", "D) proseed"],
    correctIndex: 1,
    explanation: "'Precede' means to go before. 'Proceed' means to continue or move forward.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is a type of tree?",
    options: ["A) beach", "B) beech", "C) beache", "D) bech"],
    correctIndex: 1,
    explanation: "'Beech' is a type of tree. 'Beach' is the sandy area by the sea.",
    tags: ["spelling", "homophones"]
  },

  // ============== SPELLING: COMMONLY MISSPELLED WORDS ==============
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) becuase", "B) because", "C) becouse", "D) becaus"],
    correctIndex: 1,
    explanation: "'Because' is spelled B-E-C-A-U-S-E. Remember: Big Elephants Can Always Understand Small Elephants!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) freind", "B) friend", "C) frend", "D) friend"],
    correctIndex: 1,
    explanation: "'Friend' is spelled F-R-I-E-N-D. The 'i' comes before the 'e' in this word.",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) wierd", "B) weird", "C) weerd", "D) werd"],
    correctIndex: 1,
    explanation: "'Weird' is spelled W-E-I-R-D. It's an exception to the 'i before e' rule - it's weird!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) seperate", "B) separate", "C) seperete", "D) separete"],
    correctIndex: 1,
    explanation: "'Separate' is spelled S-E-P-A-R-A-T-E. Remember: There's 'a rat' in the middle!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) neccessary", "B) necessary", "C) necesary", "D) neccesary"],
    correctIndex: 1,
    explanation: "'Necessary' is spelled N-E-C-E-S-S-A-R-Y. Remember: One collar (c) and two sleeves (s-s)!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) accomodate", "B) accommodate", "C) acommodate", "D) accomoddate"],
    correctIndex: 1,
    explanation: "'Accommodate' is spelled A-C-C-O-M-M-O-D-A-T-E. Remember: Two c's and two m's!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) occurrance", "B) occurrence", "C) occurence", "D) occurance"],
    correctIndex: 1,
    explanation: "'Occurrence' is spelled O-C-C-U-R-R-E-N-C-E. Remember: Two c's, two r's, and '-ence' at the end!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) embarass", "B) embarrass", "C) embaras", "D) embarasss"],
    correctIndex: 1,
    explanation: "'Embarrass' is spelled E-M-B-A-R-R-A-S-S. Remember: Two r's and two s's!",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) definately", "B) definitely", "C) definetly", "D) definatly"],
    correctIndex: 1,
    explanation: "'Definitely' is spelled D-E-F-I-N-I-T-E-L-Y. Remember: It contains the word 'finite'.",
    tags: ["spelling", "commonly-misspelled"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which word is spelled correctly?",
    options: ["A) supercede", "B) superseed", "C) supersede", "D) superceed"],
    correctIndex: 2,
    explanation: "'Supersede' is spelled S-U-P-E-R-S-E-D-E. It's one of the few words where 'sede' is used instead of 'cede'.",
    tags: ["spelling", "commonly-misspelled"]
  },

  // ============================================
  // EXPANDED CONTENT — NEW QUESTIONS
  // ============================================

  // --- Level 1 (New) ---
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which of these is a verb?",
    options: ["A) jump", "B) red", "C) book", "D) slowly"],
    correctIndex: 0,
    explanation: "That's right! A verb is an action or doing word. 'Jump' is something you can do.",
    tags: ["grammar", "word-classes", "verbs"]
  },
  {
    world: "writing",
    level: 1,
    type: "true-false",
    question: "The word 'cat' is a noun.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "That's right! A noun is a person, place, or thing. A 'cat' is a thing (an animal). Simple as that!",
    tags: ["grammar", "word-classes", "nouns"]
  },
  {
    world: "writing",
    level: 1,
    type: "multiple-choice",
    question: "Which punctuation mark should be at the end of this sentence: 'What is your name'",
    options: ["A) .", "B) ?", "C) !", "D) ,"],
    correctIndex: 1,
    explanation: "That's right! When you ask a question, you need to put a question mark at the end.",
    tags: ["punctuation", "question-marks"]
  },

  // --- Level 2 (New) ---
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which of these is a noun?",
    options: ["A) run", "B) happy", "C) ball", "D) quickly"],
    correctIndex: 2,
    explanation: "That's correct! A noun is a person, place, or thing. A 'ball' is a thing. 'Run' is a verb, 'happy' is an adjective, and 'quickly' is an adverb.",
    tags: ["grammar", "word-classes", "nouns"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which sentence is in the past tense?",
    options: ["A) I am playing football.", "B) I played football yesterday.", "C) I will play football tomorrow.", "D) I play football every day."],
    correctIndex: 1,
    explanation: "Correct! The past tense tells us about something that has already happened. The '-ed' at the end of 'played' shows that it happened in the past.",
    tags: ["grammar", "verb-tenses", "past-tense"]
  },
  {
    world: "writing",
    level: 2,
    type: "true-false",
    question: "The word 'redo' means to do something again.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "That's correct! The prefix 're-' means 'again', so 'redo' means to do something again. Well done!",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is a pronoun that could replace 'the boy'?",
    options: ["A) He", "B) She", "C) It", "D) They"],
    correctIndex: 0,
    explanation: "Exactly! 'He' is the pronoun used to refer to a male person, so it's the perfect replacement for 'the boy'.",
    tags: ["grammar", "word-classes", "pronouns"]
  },
  {
    world: "writing",
    level: 2,
    type: "multiple-choice",
    question: "Which word is the adjective in the sentence: 'The big dog barked'?",
    options: ["A) The", "B) big", "C) dog", "D) barked"],
    correctIndex: 1,
    explanation: "Yes! 'Big' is the adjective because it's describing the noun, 'dog'. It tells us what the dog is like.",
    tags: ["grammar", "word-classes", "adjectives"]
  },

  // --- Level 3 (New) ---
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Where should a comma be added in this sentence? 'I need to buy apples oranges and bananas.'",
    options: ["A) After 'apples'", "B) After 'oranges'", "C) After 'buy'", "D) After 'and'"],
    correctIndex: 0,
    explanation: "Perfect! When you have a list of three or more things, you need to put a comma after each item except the last one. So it should be 'apples, oranges and bananas'. Keep up the great work!",
    tags: ["punctuation", "commas", "lists"]
  },
  {
    world: "writing",
    level: 3,
    type: "true-false",
    question: "The word 'unhappy' has a prefix.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "You're right! The prefix 'un-' has been added to the word 'happy' to change its meaning to the opposite.",
    tags: ["spelling", "prefixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is a preposition in this sentence: 'The cat is sleeping on the mat.'",
    options: ["A) sleeping", "B) on", "C) the", "D) mat"],
    correctIndex: 1,
    explanation: "That's it! A preposition is a word that shows the relationship between a noun or pronoun and another word in the sentence. 'On' tells us where the cat is in relation to the mat.",
    tags: ["grammar", "word-classes", "prepositions"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which of these is an adjective?",
    options: ["A) slowly", "B) house", "C) green", "D) eat"],
    correctIndex: 2,
    explanation: "That's correct! An adjective is a word that describes a noun. 'Green' can describe a noun, for example, 'a green car'.",
    tags: ["grammar", "word-classes", "adjectives"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word is an adverb in this sentence: 'The boy ran quickly to school.'",
    options: ["A) boy", "B) ran", "C) quickly", "D) school"],
    correctIndex: 2,
    explanation: "That's it! An adverb is a word that describes a verb, an adjective, or another adverb. 'Quickly' tells us how the boy ran.",
    tags: ["grammar", "word-classes", "adverbs"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which word has the suffix '-able' or '-ible' spelled correctly?",
    options: ["A) visable", "B) comfortable", "C) responseable", "D) adoreable"],
    correctIndex: 1,
    explanation: "You've got it! 'Comfortable' is spelled correctly. It can be tricky to know whether to use '-able' or '-ible', so well done for spotting the correct one!",
    tags: ["spelling", "suffixes"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence is in the future tense?",
    options: ["A) I am reading a book.", "B) I read a book yesterday.", "C) I will read a book tomorrow.", "D) I have read that book."],
    correctIndex: 2,
    explanation: "That's right! The future tense tells us about something that is going to happen. The word 'will' shows that this action will happen in the future.",
    tags: ["grammar", "verb-tenses", "future-tense"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which of these words is a determiner?",
    options: ["A) an", "B) run", "C) under", "D) happily"],
    correctIndex: 0,
    explanation: "That's correct! 'An' is a determiner (a type of article) that we use before a noun that starts with a vowel sound, like 'an apple'.",
    tags: ["grammar", "word-classes", "determiners"]
  },
  {
    world: "writing",
    level: 3,
    type: "text-input",
    question: "Correct the spelling of the underlined word: My favourite subject is sciense.",
    options: ["science"],
    correctIndex: 0,
    explanation: "Great spelling! 'Science' is one of those words you just have to remember. The 'c' is silent!",
    tags: ["spelling", "commonly-misspelled-words", "silent-letters"]
  },
  {
    world: "writing",
    level: 3,
    type: "multiple-choice",
    question: "Which sentence is in the present tense?",
    options: ["A) She walked to school.", "B) She is walking to school.", "C) She will walk to school.", "D) She had walked to school."],
    correctIndex: 1,
    explanation: "That's the one! 'Is walking' is the present progressive tense, which describes an action happening right now. It's a form of the present tense.",
    tags: ["grammar", "verb-tenses", "present-tense"]
  },

  // --- Level 4 (New) ---
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses the subjunctive mood correctly?",
    options: ["A) If I was you, I would practice more.", "B) I wish I was a bit taller.", "C) If I were the captain, I would choose a different strategy.", "D) He behaves as if he was the king."],
    correctIndex: 2,
    explanation: "Well done! The subjunctive mood is used for hypothetical situations. We use 'were' instead of 'was' after 'if' or 'I wish'. For example, 'If I were a millionaire...'",
    tags: ["grammar", "subjunctive-mood", "verb-moods"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses a fronted adverbial correctly?",
    options: ["A) Suddenly, the lights went out.", "B) The lights, suddenly went out.", "C) The lights went out suddenly.", "D) Went out the lights suddenly."],
    correctIndex: 0,
    explanation: "Fantastic! A fronted adverbial is a word or phrase at the beginning of a sentence to describe the action that follows. 'Suddenly,' is the fronted adverbial here, and it needs a comma after it.",
    tags: ["grammar", "fronted-adverbials", "punctuation", "commas"]
  },
  {
    world: "writing",
    level: 4,
    type: "true-false",
    question: "Is the apostrophe used correctly in this sentence? The childrens' toys were scattered all over the floor.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "That's right, it's false! 'Children' is already a plural noun, so we just add an apostrophe and 's' to show possession: 'the children's toys'. You have a keen eye for punctuation!",
    tags: ["punctuation", "apostrophes", "possession"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Identify the determiner in the following sentence: 'She bought that book yesterday.'",
    options: ["A) She", "B) bought", "C) that", "D) book"],
    correctIndex: 2,
    explanation: "You've spotted it! 'That' is a determiner, which is a word that comes before a noun to show which person or thing we are talking about. Other examples are 'a', 'the', 'these', and 'some'.",
    tags: ["grammar", "word-classes", "determiners"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses a colon correctly?",
    options: ["A) I need to buy: milk, bread, and eggs.", "B) She loves to play: tennis, football, and netball.", "C) You have two choices: finish your homework now or do it later.", "D) He visited: Paris, Rome, and Madrid."],
    correctIndex: 2,
    explanation: "Excellent! A colon is used to introduce a list or an explanation. In this case, it introduces the two choices. Well done!",
    tags: ["punctuation", "colons"]
  },
  {
    world: "writing",
    level: 4,
    type: "text-input",
    question: "Correct the spelling of the underlined word: The magician performed an amazing ilusion.",
    options: ["illusion"],
    correctIndex: 0,
    explanation: "Fantastic spelling! An 'illusion' is something that deceives the eye or mind. You've mastered this tricky word!",
    tags: ["spelling", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 4,
    type: "true-false",
    question: "The following sentence is in the future progressive tense: 'I will be travelling to Spain next week.'",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Absolutely! The future progressive tense is used to describe an action that will be in progress at a specific time in the future. It's formed with 'will be' + the present participle (-ing verb).",
    tags: ["grammar", "verb-tenses", "future-progressive"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses brackets correctly?",
    options: ["A) The (dog) was barking loudly.", "B) He finally answered (after taking five minutes to think) that he didn't know.", "C) I went to the shop (to buy some milk).", "D) She is (very) excited about the party."],
    correctIndex: 1,
    explanation: "Spot on! Brackets are used to add extra information or a comment that is separate from the main sentence. The information inside the brackets can be removed without changing the meaning of the sentence.",
    tags: ["punctuation", "brackets"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which of these is a conjunction?",
    options: ["A) because", "B) beautiful", "C) quickly", "D) under"],
    correctIndex: 0,
    explanation: "That's right! A conjunction is a word that joins words, phrases, or clauses. 'Because' is a subordinating conjunction, used to give a reason.",
    tags: ["grammar", "word-classes", "conjunctions"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence is in the past progressive tense?",
    options: ["A) I was watching TV when you called.", "B) I watched TV last night.", "C) I will be watching TV later.", "D) I have watched that film before."],
    correctIndex: 0,
    explanation: "Excellent! The past progressive tense is used to describe an action that was in progress at a specific time in the past. It's formed with 'was' or 'were' + the present participle (-ing verb).",
    tags: ["grammar", "verb-tenses", "past-progressive"]
  },
  {
    world: "writing",
    level: 4,
    type: "text-input",
    question: "Correct the spelling of the underlined word: It is neccessary to warm up before you exercise.",
    options: ["necessary"],
    correctIndex: 0,
    explanation: "Brilliant! The word 'necessary' has one 'c' and a double 's'. You're a spelling whiz!",
    tags: ["spelling", "commonly-misspelled-words", "double-consonants"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which of these is a pronoun?",
    options: ["A) Sarah", "B) run", "C) it", "D) happy"],
    correctIndex: 2,
    explanation: "You've got it! A pronoun is a word that takes the place of a noun. 'It' can replace a noun like 'the book' or 'the dog'.",
    tags: ["grammar", "word-classes", "pronouns"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which suffix can be added to the word 'danger' to make a new word?",
    options: ["A) -ous", "B) -able", "C) -tion", "D) -ment"],
    correctIndex: 0,
    explanation: "Correct! Adding the suffix '-ous' to 'danger' creates the adjective 'dangerous', which means full of danger. Great job!",
    tags: ["spelling", "suffixes"]
  },
  {
    world: "writing",
    level: 4,
    type: "true-false",
    question: "An apostrophe can be used to show that letters are missing from a word.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "You're absolutely right! This is called a contraction. For example, 'don't' is a contraction of 'do not', and the apostrophe shows where the 'o' is missing.",
    tags: ["punctuation", "apostrophes", "contractions"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses the past perfect tense correctly?",
    options: ["A) I had eaten my breakfast before I went to school.", "B) I ate my breakfast this morning.", "C) I was eating my breakfast when the phone rang.", "D) I have eaten my breakfast."],
    correctIndex: 0,
    explanation: "Perfect! The past perfect tense is used to talk about an action that was completed before another action in the past. It's formed with 'had' + the past participle. You're a grammar expert!",
    tags: ["grammar", "verb-tenses", "perfect-tense"]
  },
  {
    world: "writing",
    level: 4,
    type: "text-input",
    question: "Correct the spelling of the underlined word: He felt a great sense of acheivement.",
    options: ["achievement"],
    correctIndex: 0,
    explanation: "Fantastic spelling! Remember the rule 'i before e except after c'. 'Achievement' is a great example of this rule. You're a spelling star!",
    tags: ["spelling", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which homophone correctly completes the sentence: 'The dog wagged ___ tail.'?",
    options: ["A) it's", "B) its", "C) its'", "D) it is"],
    correctIndex: 1,
    explanation: "Perfect! 'Its' is a possessive pronoun that shows that the tail belongs to the dog. 'It's' is a contraction of 'it is'. This is a very common mistake, so well done for getting it right!",
    tags: ["spelling", "homophones", "apostrophes"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence is in the active voice?",
    options: ["A) The window was broken by the ball.", "B) The ball broke the window.", "C) The broken window was reported.", "D) A report was made about the broken window."],
    correctIndex: 1,
    explanation: "You've got it! In the active voice, the subject of the sentence performs the action. Here, 'the ball' is the subject and it is doing the action ('broke').",
    tags: ["grammar", "active-voice", "passive-voice"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence uses an apostrophe for possession correctly?",
    options: ["A) The dogs' bone was buried in the garden.", "B) The dog's bone was buried in the garden.", "C) The dogs bone was buried in the garden.", "D) The dog's bones' were buried in the garden."],
    correctIndex: 1,
    explanation: "Spot on! For a single dog, we show possession by adding an apostrophe and then 's'. If there were multiple dogs, it would be 'the dogs' bone'.",
    tags: ["punctuation", "apostrophes", "possession"]
  },
  {
    world: "writing",
    level: 4,
    type: "true-false",
    question: "The word 'beautiful' contains a prefix.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "That's right, it's false. 'Beautiful' contains the base word 'beauty' and the suffix '-ful', which means 'full of'. It does not have a prefix at the start.",
    tags: ["spelling", "suffixes", "prefixes"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which sentence is punctuated correctly?",
    options: ["A) 'What time is it,' she asked?", "B) 'What time is it?' she asked.", "C) 'What time is it?,' she asked.", "D) 'What time is it', she asked?"],
    correctIndex: 1,
    explanation: "Perfect punctuation! The question mark goes inside the speech marks because it's part of the question being asked. The sentence then ends with a full stop.",
    tags: ["punctuation", "speech-marks", "quotes"]
  },
  {
    world: "writing",
    level: 4,
    type: "multiple-choice",
    question: "Which of these words with the suffix '-tion', '-sion', or '-cian' is spelled correctly?",
    options: ["A) Musitian", "B) Televishion", "C) Action", "D) Permision"],
    correctIndex: 2,
    explanation: "Correct! 'Action' is spelled perfectly. The other words should be 'musician', 'television', and 'permission'. You have a great eye for spelling!",
    tags: ["spelling", "suffix"]
  },

  // --- Level 5 (New) ---
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which of these words with the suffix '-tion', '-sion', or '-cian' is spelled incorrectly?",
    options: ["A) Invasion", "B) Politician", "C) Occassion", "D) Celebration"],
    correctIndex: 2,
    explanation: "This is a very common mistake! The correct spelling is 'occasion', with one 's' and a double 'c'. You have a great eye for detail!",
    tags: ["spelling", "suffix", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence contains a relative clause that adds extra, non-essential information?",
    options: ["A) The boy who won the race is my brother.", "B) My bike, which is red, was a birthday present.", "C) The house that is on the corner is very old.", "D) I don't like books that have sad endings."],
    correctIndex: 1,
    explanation: "Excellent! The clause 'which is red' is a non-defining relative clause. It gives us extra information, but the sentence still makes sense without it. We use commas to separate it from the main sentence.",
    tags: ["grammar", "relative-clauses", "punctuation", "commas"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence is written in the passive voice?",
    options: ["A) The dog chased the ball.", "B) The ball was chased by the dog.", "C) The girl threw the frisbee.", "D) The frisbee was thrown by the girl."],
    correctIndex: 1,
    explanation: "You've got it! In the passive voice, the object of the action becomes the subject. Here, 'the ball' is the subject, and the action ('was chased') is done to it. The active version is 'The dog chased the ball.'",
    tags: ["grammar", "active-voice", "passive-voice"]
  },
  {
    world: "writing",
    level: 5,
    type: "text-input",
    question: "Correct the spelling of the underlined word in this sentence: The librerian helped me find the book I needed.",
    options: ["librarian"],
    correctIndex: 0,
    explanation: "Brilliant spelling! A person who works in a library is a 'librarian'. It's one of those tricky words to remember.",
    tags: ["spelling", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence is in the present perfect tense?",
    options: ["A) I have finished my homework.", "B) I finished my homework earlier.", "C) I will finish my homework soon.", "D) I am finishing my homework."],
    correctIndex: 0,
    explanation: "Exactly! The present perfect tense is used to talk about actions that happened at an unspecified time in the past and are still relevant now. It's formed with 'have' or 'has' + the past participle. Great job!",
    tags: ["grammar", "verb-tenses", "perfect-tense"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence uses a semicolon correctly?",
    options: ["A) I like to read; and I also like to write.", "B) The sun was shining; the birds were singing.", "C) I have a cat; a dog; and a hamster.", "D) She is very tired; so she is going to bed early."],
    correctIndex: 1,
    explanation: "Great job! A semicolon can be used to join two closely related independent clauses. Both 'The sun was shining' and 'the birds were singing' are complete sentences, and the semicolon connects them beautifully.",
    tags: ["punctuation", "semicolons"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence uses a dash correctly?",
    options: ["A) I went to the park - it was a beautiful day.", "B) My favourite colour is blue - or maybe green.", "C) She is a great friend - always there for me.", "D) All of the above."],
    correctIndex: 3,
    explanation: "You've got it! Dashes can be used to add extra information, to show a change of thought, or to create emphasis. All of these sentences use the dash correctly. Super work!",
    tags: ["punctuation", "dashes"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which of these words contains a silent letter?",
    options: ["A) talk", "B) read", "C) write", "D) sing"],
    correctIndex: 2,
    explanation: "You're a spelling superstar! The 'w' in 'write' is silent. We don't pronounce it, but it's a very important part of the word.",
    tags: ["spelling", "silent-letters"]
  },
  {
    world: "writing",
    level: 5,
    type: "text-input",
    question: "What is the correct spelling for the missing word? The doctor gave me a ______ for my cough.",
    options: ["prescription"],
    correctIndex: 0,
    explanation: "Perfect spelling! A 'prescription' is a note from a doctor that allows you to get medicine. You're a spelling champion!",
    tags: ["spelling", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 5,
    type: "true-false",
    question: "The word 'their' is a homophone of 'there' and 'they're'.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "You've nailed it! Homophones are words that sound the same but have different meanings and spellings. 'Their' shows possession, 'there' indicates a place, and 'they're' is a contraction of 'they are'.",
    tags: ["spelling", "homophones"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which word with a prefix is spelled incorrectly?",
    options: ["A) mispell", "B) disappear", "C) rewrite", "D) prehistoric"],
    correctIndex: 0,
    explanation: "You've spotted the mistake! The correct spelling is 'misspell', with a double 's'. It's a tricky one, but you've got it!",
    tags: ["spelling", "prefixes", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence uses an ellipsis correctly?",
    options: ["A) I don't know... what to say.", "B) The story begins, 'Once upon a time...'", "C) He said, 'I think I can...' and then he fell asleep.", "D) All of the above."],
    correctIndex: 3,
    explanation: "Fantastic! An ellipsis (...) can be used to show hesitation, a pause, or that some words have been left out. All of these sentences use the ellipsis correctly. You're a punctuation pro!",
    tags: ["punctuation", "ellipsis"]
  },
  {
    world: "writing",
    level: 5,
    type: "true-false",
    question: "The sentence 'The cake was eaten' is in the active voice.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "That's right, it's false! This sentence is in the passive voice because the subject ('the cake') is having the action done to it. The active version would be 'Someone ate the cake.'",
    tags: ["grammar", "active-voice", "passive-voice"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence contains a fronted adverbial?",
    options: ["A) He walked home slowly.", "B) After the storm, a rainbow appeared in the sky.", "C) She sang a beautiful song.", "D) The cat slept peacefully."],
    correctIndex: 1,
    explanation: "Excellent! 'After the storm' is a fronted adverbial phrase that tells us when the rainbow appeared. It's placed at the front of the sentence for emphasis and is followed by a comma.",
    tags: ["grammar", "fronted-adverbials", "punctuation", "commas"]
  },
  {
    world: "writing",
    level: 5,
    type: "text-input",
    question: "Correct the spelling of the underlined word: She was very greatful for the gift.",
    options: ["grateful"],
    correctIndex: 0,
    explanation: "Wonderful spelling! The word 'grateful' means feeling or showing thanks. It's a common mistake, but you've spelled it perfectly!",
    tags: ["spelling", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence contains a non-defining relative clause?",
    options: ["A) The man who lives next door is a doctor.", "B) My sister, who loves to draw, is very creative.", "C) This is the book that I was telling you about.", "D) I saw the film that won an award."],
    correctIndex: 1,
    explanation: "Excellent work! 'who loves to draw' is a non-defining relative clause. It adds extra information about your sister, but the sentence would still make sense without it. Notice how it's separated by commas.",
    tags: ["grammar", "relative-clauses", "punctuation", "commas"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence is an example of the subjunctive mood?",
    options: ["A) I wish I was on holiday.", "B) If he were more careful, he wouldn't make so many mistakes.", "C) I suggest that he is a good candidate.", "D) She was happy to be there."],
    correctIndex: 1,
    explanation: "You've mastered the subjunctive mood! We use 'were' instead of 'was' to talk about hypothetical or unreal situations. Great job!",
    tags: ["grammar", "subjunctive-mood", "verb-moods"]
  },
  {
    world: "writing",
    level: 5,
    type: "true-false",
    question: "A semicolon can be used to introduce a list.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "That's correct, it's false. A colon (:) is used to introduce a list, while a semicolon (;) is used to join two closely related independent clauses. You have a great understanding of punctuation!",
    tags: ["punctuation", "semicolons", "colons"]
  },
  {
    world: "writing",
    level: 5,
    type: "text-input",
    question: "Correct the spelling of the underlined word: The government made a new anouncement.",
    options: ["announcement"],
    correctIndex: 0,
    explanation: "Excellent spelling! The word 'announcement' has a double 'n' in the middle. You've spelled it perfectly!",
    tags: ["spelling", "commonly-misspelled-words", "double-consonants"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence correctly uses a relative pronoun to combine two sentences: 'I have a friend. She is a doctor.'?",
    options: ["A) I have a friend, she is a doctor.", "B) I have a friend who is a doctor.", "C) I have a friend and is a doctor.", "D) I have a friend, a doctor."],
    correctIndex: 1,
    explanation: "Brilliant! The relative pronoun 'who' correctly joins the two sentences to create a more complex and interesting sentence. 'Who' refers back to the friend.",
    tags: ["grammar", "relative-clauses", "pronouns"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which of the following is NOT a function of a dash?",
    options: ["A) To show possession.", "B) To add extra information.", "C) To show a pause or interruption.", "D) To create emphasis."],
    correctIndex: 0,
    explanation: "You are absolutely correct! A dash has many uses, but showing possession is the job of an apostrophe. You know your punctuation inside and out!",
    tags: ["punctuation", "dashes", "apostrophes"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Which sentence uses the word 'practice' correctly?",
    options: ["A) I need to practice my spelling.", "B) The doctor's practice is on the high street.", "C) Are you going to football practice tonight?", "D) All of the above."],
    correctIndex: 3,
    explanation: "This is a tricky one, but you've got it! In British English, 'practice' is the noun (a thing, like a doctor's practice or football practice) and 'practise' is the verb (the action). However, 'practice' is often used for both in modern usage, and all these sentences are considered correct. Amazing work!",
    tags: ["spelling", "homophones", "commonly-misspelled-words"]
  },
  {
    world: "writing",
    level: 5,
    type: "multiple-choice",
    question: "Identify the word class of 'although' in the sentence: 'Although it was raining, we went to the park.'",
    options: ["A) Preposition", "B) Adverb", "C) Conjunction", "D) Verb"],
    correctIndex: 2,
    explanation: "You are a true grammar expert! 'Although' is a subordinating conjunction. It's used to connect a main clause ('we went to the park') with a subordinate clause ('Although it was raining') that depends on the main clause for its full meaning.",
    tags: ["grammar", "word-classes", "conjunctions"]
  },
  {
    world: "writing",
    level: 5,
    type: "text-input",
    question: "There is a spelling mistake in the following sentence. Correct the misspelled word: 'He was determined to succede.'",
    options: ["succeed"],
    correctIndex: 0,
    explanation: "You've done it! 'Succeed' is a very tricky word to spell with its double 'c' and double 'e'. You've spelled it perfectly. Well done!",
    tags: ["spelling", "commonly-misspelled-words", "double-consonants"]
  },
  {
    world: "writing",
    level: 5,
    type: "true-false",
    question: "A fronted adverbial must always be a single word.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "That's false, and you've correctly identified it! A fronted adverbial can be a single word (e.g., 'Suddenly,') or a phrase (e.g., 'In the dead of night,'). You really know your grammar!",
    tags: ["grammar", "fronted-adverbials"]
  }
];
