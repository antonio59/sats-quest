// Dynamic Maths Question Generator
// Generates randomised arithmetic and reasoning questions for infinite replayability
// Each generated question follows the same schema as static questions

window.QuestionGenerator = (function() {
  'use strict';

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function makeOptions(correct, wrongFn, count = 3) {
    const wrongs = new Set();
    let attempts = 0;
    while (wrongs.size < count && attempts < 50) {
      const w = wrongFn();
      if (w !== correct && !wrongs.has(w)) wrongs.add(w);
      attempts++;
    }
    // Fallback if we can't generate enough unique wrongs
    while (wrongs.size < count) wrongs.add(correct + wrongs.size + 1);
    const options = shuffle([correct, ...wrongs]);
    const correctIndex = options.indexOf(correct);
    return { options: options.map(String), correctIndex };
  }

  // ===== LEVEL 1: Foundation =====
  const level1Generators = [
    function addition() {
      const a = randInt(10, 99), b = randInt(10, 99);
      const answer = a + b;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-10, 10));
      return {
        world: "math", level: 1, type: "multiple-choice",
        question: `What is ${a} + ${b}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${a} + ${b} = ${answer}. Break it down: ${a} + ${b - (b % 10)} = ${a + b - (b % 10)}, then add ${b % 10} more.`,
        tags: ["addition", "mental-maths"],
        _generated: true
      };
    },
    function subtraction() {
      const a = randInt(50, 200), b = randInt(10, a - 1);
      const answer = a - b;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-15, 15));
      return {
        world: "math", level: 1, type: "multiple-choice",
        question: `What is ${a} − ${b}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${a} − ${b} = ${answer}. You can count back from ${a} or use column subtraction.`,
        tags: ["subtraction", "mental-maths"],
        _generated: true
      };
    },
    function multiplication() {
      const a = randInt(2, 12), b = randInt(2, 12);
      const answer = a * b;
      const { options, correctIndex } = makeOptions(answer, () => randInt(2, 12) * randInt(2, 12));
      return {
        world: "math", level: 1, type: "multiple-choice",
        question: `What is ${a} × ${b}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${a} × ${b} = ${answer}. That's ${a} groups of ${b}!`,
        tags: ["multiplication", "times-tables"],
        _generated: true
      };
    },
    function division() {
      const b = randInt(2, 12), answer = randInt(2, 12);
      const a = b * answer;
      const { options, correctIndex } = makeOptions(answer, () => randInt(2, 15));
      return {
        world: "math", level: 1, type: "multiple-choice",
        question: `What is ${a} ÷ ${b}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${a} ÷ ${b} = ${answer}. Think: ${b} × ? = ${a}. The answer is ${answer}!`,
        tags: ["division", "mental-maths"],
        _generated: true
      };
    },
    function placeValue() {
      const thousands = randInt(1, 9), hundreds = randInt(0, 9), tens = randInt(0, 9), ones = randInt(0, 9);
      const number = thousands * 1000 + hundreds * 100 + tens * 10 + ones;
      const digitPos = randInt(0, 3);
      const posNames = ['ones', 'tens', 'hundreds', 'thousands'];
      const digits = [ones, tens, hundreds, thousands];
      const values = [ones, tens * 10, hundreds * 100, thousands * 1000];
      const answer = values[digitPos];
      const { options, correctIndex } = makeOptions(answer, () => digits[digitPos] * Math.pow(10, randInt(0, 3)));
      return {
        world: "math", level: 1, type: "multiple-choice",
        question: `In the number ${number.toLocaleString()}, what is the value of the digit ${digits[digitPos]}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `The digit ${digits[digitPos]} is in the ${posNames[digitPos]} column, so its value is ${answer}.`,
        tags: ["place-value", "number"],
        _generated: true
      };
    },
  ];

  // ===== LEVEL 2: Developing =====
  const level2Generators = [
    function longMultiplication() {
      const a = randInt(12, 50), b = randInt(12, 30);
      const answer = a * b;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-50, 50));
      return {
        world: "math", level: 2, type: "multiple-choice",
        question: `Calculate ${a} × ${b}`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${a} × ${b} = ${answer}. Try breaking it up: ${a} × ${Math.floor(b/10)*10} = ${a * Math.floor(b/10)*10}, then ${a} × ${b % 10} = ${a * (b % 10)}. Add them together!`,
        tags: ["multiplication", "long-multiplication"],
        _generated: true
      };
    },
    function fractionOfAmount() {
      const denom = [2, 3, 4, 5, 10][randInt(0, 4)];
      const numer = 1;
      const whole = denom * randInt(2, 10);
      const answer = whole / denom;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-5, 5));
      return {
        world: "math", level: 2, type: "multiple-choice",
        question: `What is ${numer}/${denom} of ${whole}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `To find 1/${denom} of ${whole}, divide by ${denom}: ${whole} ÷ ${denom} = ${answer}.`,
        tags: ["fractions", "finding-amounts"],
        _generated: true
      };
    },
    function percentageOf() {
      const pct = [10, 20, 25, 50, 75][randInt(0, 4)];
      const whole = randInt(2, 20) * (100 / pct);
      const answer = whole * pct / 100;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-10, 10));
      return {
        world: "math", level: 2, type: "multiple-choice",
        question: `What is ${pct}% of ${whole}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${pct}% of ${whole} = ${answer}. ${pct}% means ${pct}/100, so multiply ${whole} by ${pct}/100.`,
        tags: ["percentages", "finding-percentages"],
        _generated: true
      };
    },
    function rounding() {
      const n = randInt(100, 9999);
      const place = [10, 100, 1000][randInt(0, 2)];
      const placeNames = { 10: 'nearest 10', 100: 'nearest 100', 1000: 'nearest 1,000' };
      const answer = Math.round(n / place) * place;
      const { options, correctIndex } = makeOptions(answer, () => (Math.round(n / place) + randInt(-2, 2)) * place);
      return {
        world: "math", level: 2, type: "multiple-choice",
        question: `Round ${n.toLocaleString()} to the ${placeNames[place]}.`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o.toLocaleString()}`),
        correctIndex,
        explanation: `${n.toLocaleString()} rounded to the ${placeNames[place]} is ${answer.toLocaleString()}. Look at the digit to the right of the rounding column to decide whether to round up or down.`,
        tags: ["rounding", "place-value"],
        _generated: true
      };
    },
    function orderOfOps() {
      const a = randInt(2, 10), b = randInt(2, 10), c = randInt(1, 10);
      const answer = a + b * c;
      const wrong1 = (a + b) * c;
      const { options, correctIndex } = makeOptions(answer, () => [wrong1, a * b + c, a * b * c][randInt(0, 2)]);
      return {
        world: "math", level: 2, type: "multiple-choice",
        question: `What is ${a} + ${b} × ${c}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `Remember BODMAS! Multiplication comes before addition. ${b} × ${c} = ${b*c}, then ${a} + ${b*c} = ${answer}.`,
        tags: ["order-of-operations", "BODMAS"],
        _generated: true
      };
    },
  ];

  // ===== LEVEL 3: Secure =====
  const level3Generators = [
    function addFractions() {
      const d = [4, 6, 8, 10, 12][randInt(0, 4)];
      const n1 = randInt(1, d - 2), n2 = randInt(1, d - n1);
      const answer_n = n1 + n2;
      // Simplify
      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
      const g = gcd(answer_n, d);
      const sn = answer_n / g, sd = d / g;
      const display = sd === 1 ? `${sn}` : `${sn}/${sd}`;
      return {
        world: "math", level: 3, type: "text-input",
        question: `What is ${n1}/${d} + ${n2}/${d}? Give your answer as a fraction in its simplest form.`,
        options: [display, `${answer_n}/${d}`, `${sn}/${sd}`],
        correctIndex: 0,
        explanation: `${n1}/${d} + ${n2}/${d} = ${answer_n}/${d}. Simplified: ${display}. When denominators are the same, just add the numerators!`,
        tags: ["fractions", "addition"],
        _generated: true
      };
    },
    function areaRectangle() {
      const l = randInt(3, 20), w = randInt(3, 15);
      const answer = l * w;
      const { options, correctIndex } = makeOptions(answer, () => randInt(3, 20) * randInt(3, 15));
      return {
        world: "math", level: 3, type: "multiple-choice",
        question: `A rectangle has a length of ${l} cm and a width of ${w} cm. What is its area?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o} cm²`),
        correctIndex,
        explanation: `Area of a rectangle = length × width = ${l} × ${w} = ${answer} cm². Remember: area is always in square units!`,
        tags: ["area", "geometry", "rectangle"],
        _generated: true
      };
    },
    function negativeNumbers() {
      const a = randInt(-10, -1), b = randInt(1, 15);
      const answer = a + b;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-5, 5));
      return {
        world: "math", level: 3, type: "multiple-choice",
        question: `What is ${a} + ${b}?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `Starting at ${a} on the number line and moving ${b} to the right gives us ${answer}.`,
        tags: ["negative-numbers", "addition"],
        _generated: true
      };
    },
    function perimeterShape() {
      const l = randInt(5, 25), w = randInt(3, 15);
      const answer = 2 * (l + w);
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-10, 10));
      return {
        world: "math", level: 3, type: "multiple-choice",
        question: `A rectangle has sides of ${l} cm and ${w} cm. What is its perimeter?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o} cm`),
        correctIndex,
        explanation: `Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = 2 × ${l + w} = ${answer} cm.`,
        tags: ["perimeter", "geometry"],
        _generated: true
      };
    },
    function sequenceNext() {
      const start = randInt(1, 10), step = randInt(2, 8);
      const seq = [start, start + step, start + 2*step, start + 3*step];
      const answer = start + 4*step;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-step*2, step*2));
      return {
        world: "math", level: 3, type: "multiple-choice",
        question: `What is the next number in this sequence? ${seq.join(', ')}, ...`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `The rule is +${step} each time. ${seq[3]} + ${step} = ${answer}.`,
        tags: ["sequences", "patterns"],
        _generated: true
      };
    },
  ];

  // ===== LEVEL 4: Advanced =====
  const level4Generators = [
    function ratioSharing() {
      const r1 = randInt(1, 5), r2 = randInt(1, 5);
      const multiplier = randInt(2, 8);
      const total = (r1 + r2) * multiplier;
      const answer = r1 * multiplier;
      const { options, correctIndex } = makeOptions(answer, () => randInt(1, total));
      return {
        world: "math", level: 4, type: "multiple-choice",
        question: `Share ${total} in the ratio ${r1}:${r2}. What is the larger share?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex: options.indexOf(Math.max(r1, r2) * multiplier) >= 0 ? options.indexOf(Math.max(r1, r2) * multiplier) : correctIndex,
        explanation: `Total parts = ${r1} + ${r2} = ${r1 + r2}. Each part = ${total} ÷ ${r1 + r2} = ${multiplier}. The shares are ${r1 * multiplier} and ${r2 * multiplier}.`,
        tags: ["ratio", "sharing"],
        _generated: true
      };
    },
    function algebraSolve() {
      const answer = randInt(2, 15);
      const a = randInt(2, 6);
      const b = randInt(1, 20);
      const result = a * answer + b;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-5, 5));
      return {
        world: "math", level: 4, type: "multiple-choice",
        question: `Solve: ${a}x + ${b} = ${result}`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) x = ${o}`),
        correctIndex,
        explanation: `${a}x + ${b} = ${result}. Subtract ${b}: ${a}x = ${result - b}. Divide by ${a}: x = ${answer}.`,
        tags: ["algebra", "linear-equations"],
        _generated: true
      };
    },
    function volumeCuboid() {
      const l = randInt(2, 10), w = randInt(2, 8), h = randInt(2, 6);
      const answer = l * w * h;
      const { options, correctIndex } = makeOptions(answer, () => randInt(2, 10) * randInt(2, 8) * randInt(2, 6));
      return {
        world: "math", level: 4, type: "multiple-choice",
        question: `A cuboid has dimensions ${l} cm × ${w} cm × ${h} cm. What is its volume?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o} cm³`),
        correctIndex,
        explanation: `Volume = length × width × height = ${l} × ${w} × ${h} = ${answer} cm³.`,
        tags: ["volume", "geometry", "3d-shapes"],
        _generated: true
      };
    },
    function convertUnits() {
      const conversions = [
        { from: 'km', to: 'm', factor: 1000 },
        { from: 'm', to: 'cm', factor: 100 },
        { from: 'cm', to: 'mm', factor: 10 },
        { from: 'kg', to: 'g', factor: 1000 },
        { from: 'litres', to: 'ml', factor: 1000 },
      ];
      const c = conversions[randInt(0, conversions.length - 1)];
      const val = randInt(1, 20);
      const answer = val * c.factor;
      const { options, correctIndex } = makeOptions(answer, () => val * [10, 100, 1000][randInt(0, 2)]);
      return {
        world: "math", level: 4, type: "multiple-choice",
        question: `Convert ${val} ${c.from} to ${c.to}.`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o.toLocaleString()} ${c.to}`),
        correctIndex,
        explanation: `1 ${c.from} = ${c.factor.toLocaleString()} ${c.to}, so ${val} ${c.from} = ${val} × ${c.factor.toLocaleString()} = ${answer.toLocaleString()} ${c.to}.`,
        tags: ["measurement", "unit-conversion"],
        _generated: true
      };
    },
    function percentageChange() {
      const original = randInt(5, 50) * 10;
      const pct = [10, 20, 25, 50][randInt(0, 3)];
      const increase = randInt(0, 1) === 0;
      const change = original * pct / 100;
      const answer = increase ? original + change : original - change;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-30, 30));
      const word = increase ? 'increase' : 'decrease';
      return {
        world: "math", level: 4, type: "multiple-choice",
        question: `${word.charAt(0).toUpperCase() + word.slice(1)} ${original} by ${pct}%.`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${pct}% of ${original} = ${change}. ${original} ${increase ? '+' : '−'} ${change} = ${answer}.`,
        tags: ["percentages", `percentage-${word}`],
        _generated: true
      };
    },
  ];

  // ===== LEVEL 5: Mastery =====
  const level5Generators = [
    function algebraTwoStep() {
      const x = randInt(1, 12);
      const a = randInt(2, 6), b = randInt(2, 6);
      // Simplify: (a-b)x + c = result => doesn't always work nicely
      // Use: ax + b = c format instead
      const rhs = a * x + b;
      const { options, correctIndex } = makeOptions(x, () => x + randInt(-4, 4));
      return {
        world: "math", level: 5, type: "multiple-choice",
        question: `If ${a}n + ${b} = ${rhs}, what is the value of n?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `${a}n + ${b} = ${rhs}. Subtract ${b}: ${a}n = ${rhs - b}. Divide by ${a}: n = ${x}.`,
        tags: ["algebra", "linear-equations"],
        _generated: true
      };
    },
    function fractionOperations() {
      const d1 = [2, 3, 4, 5, 6][randInt(0, 4)];
      const d2 = d1;
      const n1 = randInt(1, d1 - 1), n2 = randInt(1, d2 - 1);
      const op = randInt(0, 1) === 0 ? '+' : '−';
      const answer_n = op === '+' ? n1 + n2 : Math.max(n1, n2) - Math.min(n1, n2);
      const an1 = op === '−' ? Math.max(n1, n2) : n1;
      const an2 = op === '−' ? Math.min(n1, n2) : n2;
      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
      const g = gcd(answer_n, d1);
      const sn = answer_n / g, sd = d1 / g;
      const display = sd === 1 ? `${sn}` : `${sn}/${sd}`;
      return {
        world: "math", level: 5, type: "text-input",
        question: `Calculate ${an1}/${d1} ${op} ${an2}/${d2}. Give your answer as a simplified fraction.`,
        options: [display, `${answer_n}/${d1}`],
        correctIndex: 0,
        explanation: `${an1}/${d1} ${op} ${an2}/${d2} = ${answer_n}/${d1} = ${display}.`,
        tags: ["fractions", op === '+' ? "addition" : "subtraction"],
        _generated: true
      };
    },
    function meanAverage() {
      const count = randInt(4, 6);
      const nums = Array.from({ length: count }, () => randInt(5, 30));
      const sum = nums.reduce((a, b) => a + b, 0);
      // Adjust last number so mean is a whole number
      const remainder = sum % count;
      if (remainder !== 0) nums[count - 1] += (count - remainder);
      const newSum = nums.reduce((a, b) => a + b, 0);
      const answer = newSum / count;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-5, 5));
      return {
        world: "math", level: 5, type: "multiple-choice",
        question: `Find the mean of these numbers: ${nums.join(', ')}`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `Mean = sum ÷ count = ${newSum} ÷ ${count} = ${answer}. Add all the numbers, then divide by how many there are.`,
        tags: ["statistics", "mean", "average"],
        _generated: true
      };
    },
    function anglesMissing() {
      const a1 = randInt(30, 120);
      const a2 = randInt(20, 180 - a1 - 10);
      const answer = 180 - a1 - a2;
      const { options, correctIndex } = makeOptions(answer, () => answer + randInt(-20, 20));
      return {
        world: "math", level: 5, type: "multiple-choice",
        question: `A triangle has angles of ${a1}° and ${a2}°. What is the third angle?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}°`),
        correctIndex,
        explanation: `Angles in a triangle add up to 180°. ${a1}° + ${a2}° = ${a1 + a2}°. 180° − ${a1 + a2}° = ${answer}°.`,
        tags: ["angles", "geometry", "triangles"],
        _generated: true
      };
    },
    function nthTerm() {
      const a = randInt(2, 7), b = randInt(-5, 10);
      const answer5 = a * 5 + b;
      const { options, correctIndex } = makeOptions(answer5, () => answer5 + randInt(-10, 10));
      return {
        world: "math", level: 5, type: "multiple-choice",
        question: `The nth term rule is ${a}n ${b >= 0 ? '+' : '−'} ${Math.abs(b)}. What is the 5th term?`,
        options: options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
        correctIndex,
        explanation: `Substitute n = 5: ${a} × 5 ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${a * 5} ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${answer5}.`,
        tags: ["algebra", "sequences", "nth-term"],
        _generated: true
      };
    },
  ];

  const generatorsByLevel = {
    1: level1Generators,
    2: level2Generators,
    3: level3Generators,
    4: level4Generators,
    5: level5Generators,
  };

  /**
   * Generate a random maths question for the given level.
   * @param {number} level - 1 to 5
   * @returns {object} A question object matching the standard schema
   */
  function generate(level) {
    const gens = generatorsByLevel[level] || level1Generators;
    const gen = gens[randInt(0, gens.length - 1)];
    return gen();
  }

  return { generate };
})();
