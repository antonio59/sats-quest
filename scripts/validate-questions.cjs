#!/usr/bin/env node
// Validates the question banks: structure, answer integrity, duplicates.
// Usage: node scripts/validate-questions.cjs [--dump]
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILES = {
  reading: 'src/questions-reading.js',
  writing: 'src/questions-grammar.js',
  math: 'src/questions-maths.js',
};

function loadBank(file, globalName) {
  const window = {};
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const fn = new Function('window', code);
  fn(window);
  return window[globalName] || [];
}

const banks = {
  reading: loadBank(FILES.reading, 'ReadingQuestions'),
  writing: loadBank(FILES.writing, 'GrammarQuestions'),
  math: loadBank(FILES.math, 'MathsQuestions'),
};

const VALID_TYPES = new Set(['multiple-choice', 'true-false', 'multi-select', 'text-input']);
const errors = [];
const warnings = [];
const seen = new Map(); // normalised question+options+passage -> location
let total = 0;

function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
function stripLetter(s) { return String(s).replace(/^\s*[a-d]\)\s*/i, ''); }

// Parse a string as an exact numeric value: int, decimal, "a/b", "w n/d" mixed number.
// Returns null when not a pure numeric expression.
function exactNum(raw) {
  const s = stripLetter(raw).replace(/,/g, '').replace(/[°£$%]/g, '')
    .replace(/\s*(cm²|cm³|cm|mm|km|m|kg|g|ml|l|litres?|hours?|hrs?|minutes?|mins?|seconds?|secs?|p|x)\s*$/i, '')
    .trim();
  let m;
  if ((m = s.match(/^(-?\d+(?:\.\d+)?)\s+(\d+)\/(\d+)$/))) {          // mixed "1 5/12"
    const w = parseFloat(m[1]), n = parseInt(m[2]), d = parseInt(m[3]);
    return w >= 0 ? w + n / d : w - n / d;
  }
  if ((m = s.match(/^(-?\d+)\/(\d+)$/))) return parseInt(m[1]) / parseInt(m[2]); // "17/12"
  if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
  return null;
}

function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }

// True if a numeric option is already in lowest terms (fractions/mixed numbers).
// Integers and decimals count as canonical.
function isLowestTerms(raw) {
  const s = stripLetter(raw).trim();
  let m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) return gcd(Math.abs(parseInt(m[1], 10)), parseInt(m[2], 10)) === 1;
  m = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (m) return gcd(parseInt(m[2], 10), parseInt(m[3], 10)) === 1;
  return true;
}

for (const [world, bank] of Object.entries(banks)) {
  bank.forEach((q, i) => {
    total++;
    const loc = `${world}[${i}]`;

    if (!q.question || typeof q.question !== 'string') errors.push(`${loc}: missing question`);
    if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.length < 10)
      warnings.push(`${loc}: missing/thin explanation — "${(q.question||'').slice(0,50)}"`);
    if (!Array.isArray(q.options)) errors.push(`${loc}: options not array`);
    if (q.world !== world) warnings.push(`${loc}: world field is "${q.world}" but in ${world} bank`);
    if (typeof q.level !== 'number' || q.level < 1 || q.level > 5)
      errors.push(`${loc}: bad level ${q.level}`);
    if (!Array.isArray(q.tags) || q.tags.length === 0)
      warnings.push(`${loc}: no tags`);

    const type = q.type || 'multiple-choice';
    if (!VALID_TYPES.has(type)) errors.push(`${loc}: unknown type "${type}"`);

    if (type === 'multi-select') {
      if (!Array.isArray(q.correctIndex) || q.correctIndex.length === 0)
        errors.push(`${loc}: multi-select needs array correctIndex`);
      else q.correctIndex.forEach(ci => {
        if (ci < 0 || ci >= (q.options || []).length) errors.push(`${loc}: correctIndex ${ci} out of bounds`);
      });
    } else if (type === 'text-input') {
      if (!q.options || q.options.length === 0) errors.push(`${loc}: text-input with no accepted answers`);
    } else {
      if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= (q.options || []).length)
        errors.push(`${loc}: correctIndex ${q.correctIndex} out of bounds (${(q.options||[]).length} options)`);
    }

    // Verbatim duplicate options (letter prefix stripped, punctuation preserved)
    const stripped = (q.options || []).map(o => norm(stripLetter(o)));
    const dupes = stripped.filter((s, j) => stripped.indexOf(s) !== j);
    if (dupes.length) errors.push(`${loc}: identical options — "${(q.question||'').slice(0,60)}" ${JSON.stringify(q.options)}`);

    // Numeric equivalence among options (different surface forms, same value).
    // Skipped for text-input: options are an accepted-answers list, so lenient
    // equivalent forms are intentional. For questions demanding the simplest
    // form, equivalent non-simplified options are legitimate distractors —
    // but the marked answer must itself be in lowest terms.
    const asksSimplest = /simplest form|lowest terms/i.test(q.question || '');
    const nums = stripped.map(exactNum);
    if (type !== 'text-input') {
      for (let a = 0; a < nums.length; a++) {
        if (nums[a] === null) continue;
        for (let b = a + 1; b < nums.length; b++) {
          if (nums[b] === null || Math.abs(nums[a] - nums[b]) >= 1e-9) continue;
          if (asksSimplest) {
            const ci = type === 'multi-select' ? -2 : q.correctIndex;
            if ((a === ci || b === ci) && !isLowestTerms(q.options[ci])) {
              errors.push(`${loc}: marked answer not in simplest form — "${q.question.slice(0,55)}" options[${ci}]="${q.options[ci]}"`);
            } else if (isLowestTerms(q.options[a]) && isLowestTerms(q.options[b])) {
              warnings.push(`${loc}: equivalent canonical options — "${q.question.slice(0,55)}" options[${a}]="${q.options[a]}" options[${b}]="${q.options[b]}"`);
            }
            continue;
          }
          const ci = type === 'multi-select' ? -2 : q.correctIndex;
          const tag = (a === ci || b === ci) ? 'AMBIGUOUS: two correct' : 'equivalent options';
          errors.push(`${loc}: ${tag} — "${q.question.slice(0,55)}" options[${a}]="${q.options[a]}" options[${b}]="${q.options[b]}"`);
        }
      }
    }

    // Duplicate = same question AND same options AND same passage
    const key = norm(q.question) + '|' + stripped.join('|') + '|' + norm(q.passage || '');
    if (seen.has(key)) errors.push(`${loc}: exact duplicate of ${seen.get(key)} — "${q.question.slice(0,60)}"`);
    else seen.set(key, loc);
  });
}

console.log(`Checked ${total} questions: reading=${banks.reading.length} writing=${banks.writing.length} math=${banks.math.length}`);
console.log(`\n=== ERRORS (${errors.length}) ===`);
errors.forEach(e => console.log('  ' + e));
console.log(`\n=== WARNINGS (${warnings.length}) ===`);
warnings.forEach(w => console.log('  ' + w));

if (process.argv.includes('--dump')) {
  const out = {};
  for (const [world, bank] of Object.entries(banks)) {
    out[world] = bank.map((q, i) => ({
      i, level: q.level, type: q.type || 'mc',
      passage: q.passage ? q.passage.slice(0, 80) : undefined,
      q: q.question, opts: q.options, ans: q.correctIndex, expl: q.explanation, tags: q.tags,
    }));
  }
  fs.writeFileSync('/tmp/questions-dump.json', JSON.stringify(out, null, 1));
  console.log('\nDumped to /tmp/questions-dump.json');
}

process.exit(errors.length ? 1 : 0);
