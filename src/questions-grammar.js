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
  }
];
