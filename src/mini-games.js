// SAT Quest — Mini Games
// Mini-games that feel like games, not worksheets
window.SATMiniGames = {
  'word-scramble': {
    name: 'Word Scramble 🔤',
    icon: '🔤',
    description: 'Unscramble SATs vocabulary words',
    levels: [
      {
        // Level 1 — easier / shorter words
        words: [
          { scrambled: 'BRUQEAO', answer: 'BAROQUE', hint: 'An ornate style of art and architecture' },
          { scrambled: 'AETLPAU', answer: 'PLATEAU', hint: 'A flat area of high land' },
          { scrambled: 'RLYICLA', answer: 'LYRICAL', hint: 'Expressing emotion beautifully, like a song' },
          { scrambled: 'HPMEARAT', answer: 'METAPHOR', hint: 'A figure of speech comparing two unlike things' },
          { scrambled: 'ISELMI', answer: 'SIMILE', hint: 'A comparison using "like" or "as"' },
          { scrambled: 'RNAROATR', answer: 'NARRATOR', hint: 'The person telling the story' },
          { scrambled: 'YHNMSO', answer: 'SYNONYM', hint: 'A word with a similar meaning' },
          { scrambled: 'TNYNAOM', answer: 'ANTONYM', hint: 'A word with the opposite meaning' },
          { scrambled: 'RPEFIX', answer: 'PREFIX', hint: 'Letters added to the start of a word' },
          { scrambled: 'FUXFIS', answer: 'SUFFIX', hint: 'Letters added to the end of a word' },
          { scrambled: 'DBAREV', answer: 'ADVERB', hint: 'A word that describes a verb' },
          { scrambled: 'NUON', answer: 'NOUN', hint: 'A word for a person, place, or thing' },
        ]
      },
      {
        // Level 2 — medium difficulty
        words: [
          { scrambled: 'ENECTSNE', answer: 'SENTENCE', hint: 'A group of words that makes complete sense' },
          { scrambled: 'GAAHPRRP', answer: 'PARAGRAPH', hint: 'A section of writing about one topic' },
          { scrambled: 'JCETIDVAE', answer: 'ADJECTIVE', hint: 'A word that describes a noun' },
          { scrambled: 'NCONJUTNOCI', answer: 'CONJUNCTION', hint: 'A word that joins clauses (and, but, or)' },
          { scrambled: 'PHOOMHONE', answer: 'HOMOPHONE', hint: 'Words that sound the same but have different meanings' },
          { scrambled: 'AOPSTRHEP', answer: 'APOSTROPHE', hint: 'A punctuation mark showing possession or omission' },
          { scrambled: 'NEECFNIRE', answer: 'INFERENCE', hint: 'A conclusion drawn from evidence in the text' },
          { scrambled: 'REIDTCPNO', answer: 'PREDICTION', hint: 'A guess about what will happen next' },
          { scrambled: 'RLPALU', answer: 'PLURAL', hint: 'More than one of something' },
          { scrambled: 'LASUEC', answer: 'CLAUSE', hint: 'A group of words containing a subject and verb' },
          { scrambled: 'OISSPNOSES', answer: 'POSSESSION', hint: 'Showing that something belongs to someone' },
          { scrambled: 'BVJUCSITUNE', answer: 'SUBJUNCTIVE', hint: 'A verb form used for wishes or formal requests' },
        ]
      },
      {
        // Level 3 — harder / longer words
        words: [
          { scrambled: 'NOPFIRTIASCEI', answer: 'PERSONIFICATION', hint: 'Giving human qualities to non-human things' },
          { scrambled: 'LAIRETTALION', answer: 'ALLITERATION', hint: 'Repeating the same sound at the start of words' },
          { scrambled: 'NOMATOOEPIA', answer: 'ONOMATOPOEIA', hint: 'A word that sounds like what it describes (buzz, crash)' },
          { scrambled: 'BREPYHELO', answer: 'HYPERBOLE', hint: 'Extreme exaggeration for effect' },
          { scrambled: 'TNEDMIERE', answer: 'DETERMINER', hint: 'A word that comes before a noun (the, a, this)' },
          { scrambled: 'RPESOITPOIN', answer: 'PREPOSITION', hint: 'A word showing position or time (in, on, under)' },
          { scrambled: 'NRPUOO', answer: 'PRONOUN', hint: 'A word used instead of a noun (he, she, it)' },
          { scrambled: 'RLAEIVT', answer: 'RELATIVE', hint: '_____ clause: adds extra info using who, which, that' },
          { scrambled: 'VBAILREAD', answer: 'ADVERBIAL', hint: 'A word or phrase that acts like an adverb' },
          { scrambled: 'MSIPOHE', answer: 'MORPHEME', hint: 'The smallest unit of meaning in a word' },
          { scrambled: 'YBLSLAEL', answer: 'SYLLABLE', hint: 'A single unit of sound in a word' },
          { scrambled: 'IAGDLEOU', answer: 'DIALOGUE', hint: 'A conversation between characters in a story' },
        ]
      }
    ]
  },
  'speed-math': {
    name: 'Speed Maths ⚡',
    icon: '⚡',
    description: 'Race against the clock',
    levels: [
      {
        problems: [
          { question: '15 × 12', answer: 180 }, { question: '23 × 7', answer: 161 },
          { question: '144 ÷ 12', answer: 12 }, { question: '45 + 67', answer: 112 },
          { question: '200 - 87', answer: 113 }, { question: '8 × 9', answer: 72 },
          { question: '250 ÷ 5', answer: 50 }, { question: '36 + 48', answer: 84 },
          { question: '17 × 6', answer: 102 }, { question: '300 - 156', answer: 144 },
          { question: '12 × 11', answer: 132 }, { question: '72 ÷ 8', answer: 9 },
          { question: '56 + 89', answer: 145 }, { question: '9 × 7', answer: 63 },
          { question: '240 ÷ 6', answer: 40 },
        ]
      }
    ]
  },
  'boss-battle': {
    name: 'Boss Battle 👾',
    icon: '👾',
    description: 'Defeat the boss with correct answers!',
    bosses: [
      {
        name: 'The Grammar Goblin',
        emoji: '👹',
        hp: 5,
        xpReward: 50,
        questions: [
          { question: 'Which sentence uses the subjunctive mood?', options: ['A) If I was you, I would go.', 'B) If I were you, I would go.', 'C) If I am you, I would go.', 'D) If I be you, I would go.'], correctIndex: 1, explanation: '"If I were you" uses the subjunctive mood, which expresses wishes or hypothetical situations.' },
          { question: 'What is the function of a semicolon?', options: ['A) To end a sentence', 'B) To introduce a list', 'C) To join two related independent clauses', 'D) To show possession'], correctIndex: 2, explanation: 'A semicolon joins two closely related sentences that could each stand alone.' },
          { question: 'Which word is a determiner in: "Those children played every day"?', options: ['A) children', 'B) played', 'C) every', 'D) day'], correctIndex: 2, explanation: '"Every" is a determiner — it comes before a noun to specify which one.' },
          { question: '"The wind whispered through the trees." What technique is this?', options: ['A) Simile', 'B) Metaphor', 'C) Personification', 'D) Alliteration'], correctIndex: 2, explanation: 'Personification gives human qualities (whispering) to non-human things (wind).' },
          { question: 'Which sentence is in the passive voice?', options: ['A) The cat chased the mouse.', 'B) The mouse was chased by the cat.', 'C) The cat is chasing the mouse.', 'D) The mouse ran away.'], correctIndex: 1, explanation: 'In passive voice, the subject receives the action. "The mouse was chased" — the mouse is the subject but the cat does the chasing.' },
          { question: 'What type of word is "although"?', options: ['A) Preposition', 'B) Subordinating conjunction', 'C) Adverb', 'D) Pronoun'], correctIndex: 1, explanation: '"Although" is a subordinating conjunction — it introduces a subordinate clause.' },
          { question: 'Which sentence uses a colon correctly?', options: ['A) I need: eggs, milk, bread.', 'B) I have one goal: to win.', 'C) She: went to the shop.', 'D) The cat: sat on the mat.'], correctIndex: 1, explanation: 'A colon follows a complete sentence and introduces what comes next. "I have one goal" is complete before the colon.' },
        ]
      },
      {
        name: 'The Maths Monster',
        emoji: '🐉',
        hp: 5,
        xpReward: 60,
        questions: [
          { question: 'What is 3/4 + 2/3?', options: ['A) 5/7', 'B) 17/12', 'C) 5/12', 'D) 1 5/12'], correctIndex: 1, explanation: 'Find a common denominator (12): 9/12 + 8/12 = 17/12.' },
          { question: 'A shape has 4 right angles and 2 pairs of parallel sides. All sides are equal. What is it?', options: ['A) Rectangle', 'B) Rhombus', 'C) Square', 'D) Trapezium'], correctIndex: 2, explanation: 'A square has 4 right angles, 2 pairs of parallel sides, and all sides equal.' },
          { question: 'Solve: 4x − 7 = 21', options: ['A) x = 3.5', 'B) x = 7', 'C) x = 5.5', 'D) x = 28'], correctIndex: 1, explanation: '4x − 7 = 21. Add 7: 4x = 28. Divide by 4: x = 7.' },
          { question: 'What is 35% of 240?', options: ['A) 72', 'B) 84', 'C) 96', 'D) 60'], correctIndex: 1, explanation: '10% of 240 = 24. 30% = 72. 5% = 12. 35% = 72 + 12 = 84.' },
          { question: 'The angles in a quadrilateral add up to...', options: ['A) 180°', 'B) 270°', 'C) 360°', 'D) 540°'], correctIndex: 2, explanation: 'The interior angles of any quadrilateral always sum to 360°.' },
          { question: 'Share £120 in the ratio 3:5. What is the larger share?', options: ['A) £45', 'B) £60', 'C) £72', 'D) £75'], correctIndex: 3, explanation: 'Total parts = 8. Each part = £15. Larger share = 5 × £15 = £75.' },
          { question: 'A cuboid is 6cm × 4cm × 3cm. What is its volume?', options: ['A) 13 cm³', 'B) 48 cm³', 'C) 72 cm³', 'D) 96 cm³'], correctIndex: 2, explanation: 'Volume = 6 × 4 × 3 = 72 cm³.' },
        ]
      },
      {
        name: 'The Reading Wraith',
        emoji: '👻',
        hp: 5,
        xpReward: 55,
        questions: [
          { passage: 'The old lighthouse stood sentinel on the cliff edge, its beam cutting through the fog like a golden sword. For over a century, it had guided sailors safely past the treacherous rocks below.', question: 'What does "stood sentinel" suggest about the lighthouse?', options: ['A) It was broken', 'B) It was guarding and watching over', 'C) It was very tall', 'D) It was lonely'], correctIndex: 1, explanation: '"Sentinel" means a guard or lookout. The lighthouse is personified as a watchful protector.' },
          { passage: 'Maya stared at the blank canvas, her brush hovering in mid-air. The colours on her palette seemed to mock her — so vibrant, so full of possibility, yet she could not bring herself to make the first stroke.', question: 'How is Maya feeling?', options: ['A) Excited and eager', 'B) Bored and sleepy', 'C) Anxious and creatively blocked', 'D) Angry at someone'], correctIndex: 2, explanation: 'The hovering brush and inability to start suggest creative anxiety — she wants to paint but feels blocked.' },
          { passage: '"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender."', question: 'What technique does the speaker use to create a powerful effect?', options: ['A) Rhyme', 'B) Repetition', 'C) Simile', 'D) Onomatopoeia'], correctIndex: 1, explanation: 'The repeated phrase "we shall fight" creates rhythm and builds determination and defiance.' },
          { passage: 'The Victorian workhouse was a grim place. Families were separated upon entry, fed a meagre diet of gruel and bread, and expected to work long hours breaking stones or picking oakum. The system was designed to be so unpleasant that only the truly desperate would seek help there.', question: 'Why was the workhouse designed to be unpleasant?', options: ['A) To punish criminals', 'B) To discourage people from seeking help unless desperate', 'C) Because they had no money for better food', 'D) To train people for hard jobs'], correctIndex: 1, explanation: 'The passage states it was "designed to be so unpleasant that only the truly desperate would seek help" — it was a deliberate deterrent.' },
          { passage: 'The forest floor was a tapestry of amber and gold, each fallen leaf a brushstroke in nature\'s masterpiece. Above, the remaining canopy filtered the sunlight into dappled patterns that danced with every breeze.', question: 'What season is being described?', options: ['A) Spring', 'B) Summer', 'C) Autumn', 'D) Winter'], correctIndex: 2, explanation: 'Amber and gold leaves, fallen leaves, and a thinning canopy all point to autumn.' },
          { passage: 'Two roads diverged in a wood, and I— / I took the one less travelled by, / And that has made all the difference.', question: 'What is the poet suggesting by choosing "the one less travelled by"?', options: ['A) The road was dangerous', 'B) Making unconventional choices shapes your life', 'C) The other road was too busy', 'D) Walking is good exercise'], correctIndex: 1, explanation: 'Robert Frost\'s famous poem uses the road as a metaphor for life choices. Choosing the less common path "made all the difference."' },
          { passage: 'Unlike the cheetah, which relies on explosive speed to catch prey in open grassland, the leopard is an ambush predator. It uses stealth and patience, stalking silently through dense vegetation before pouncing at close range.', question: 'How do the hunting strategies of the cheetah and leopard differ?', options: ['A) Cheetahs hunt at night; leopards hunt during the day', 'B) Cheetahs use speed in open areas; leopards use stealth in dense cover', 'C) Cheetahs hunt alone; leopards hunt in packs', 'D) There is no difference'], correctIndex: 1, explanation: 'The passage directly contrasts "explosive speed" in "open grassland" (cheetah) with "stealth and patience" in "dense vegetation" (leopard).' },
        ]
      }
    ]
  }
};
