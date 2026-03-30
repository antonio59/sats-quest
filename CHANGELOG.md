# Changelog

All notable changes to this project will be documented in this file.
## [Unreleased]

### CI/CD

- Add automatic changelog workflow

### Changes

- Add CI workflow, dependency review, and Dependabot config
- Merge pull request #1 from antonio59/dependabot/npm_and_yarn/esbuild-0.27.4

Bump esbuild from 0.25.12 to 0.27.4
- Bump esbuild from 0.25.12 to 0.27.4

Bumps [esbuild](https://github.com/evanw/esbuild) from 0.25.12 to 0.27.4.
- [Release notes](https://github.com/evanw/esbuild/releases)
- [Changelog](https://github.com/evanw/esbuild/blob/main/CHANGELOG.md)
- [Commits](https://github.com/evanw/esbuild/compare/v0.25.12...v0.27.4)

---
updated-dependencies:
- dependency-name: esbuild
  dependency-version: 0.27.4
  dependency-type: direct:production
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com>
- Fix SAT → SATs everywhere + add Open Graph metadata
- Add Dependabot, validation workflow, fix PIN to DDMMYYYY

- Dependabot for weekly npm dependency checks
- Validate workflow: JS syntax, HTML structure, secret scanning
- PIN format changed to DDMMYYYY (UK format) from MMDDYYYY
- Fix domain to sats-quest.antoniosmith.xyz
- Setup Resend email for bug reports + update domain to sats.antoniosmith.xyz

- Netlify Function at /api/report sends email via Resend
- Report button now calls API instead of mailto
- Pre-fills player name, level, XP, screen, browser, timestamp
- Emails sent to problem.antoniosmith.excavator193@passmail.com
- Updated all references to sats.antoniosmith.xyz
- API key goes in Netlify env vars as RESEND_API_KEY
- Add Report a Problem button + update email for Isabella

- 🐛 Bug report button in dashboard nav
- Modal with description field, auto-includes screen context + browser info
- Opens email client to ant@antoniosmith.xyz with pre-filled subject/body
- Updated email-draft.md with full Isabella letter explaining the site
- Fix world cards HTML structure and spacing

- Fixed duplicate text in all 3 world descriptions
- Added proper world-progress wrapper divs
- Fixed extra closing divs breaking card structure
- Improved section spacing with margin-top on titles
- Reduced section gaps for cleaner layout
- All 3 world cards now match visually
- Fix UI issues and mobile optimization

- Improved text contrast (--text-dim: #aaaacc, --text-muted: #777799)
- Fixed duplicate words in world descriptions
- Consistent card borders (subtle border on all cards)
- Better progress bar sizing (8px, more visible)
- Mobile responsive: stats, cards, exams all stack properly
- Fixed scrolling on all screens (overflow-y: auto)
- Proper 100dvh support for mobile browsers
- Larger touch targets on mobile
- Reduced padding on small screens to prevent truncation
- Maths bank expanded to 99 questions

All levels covered: 13 L1, 18 L2, 17 L3, 13 L4, 38 L5
Topics: place value, four operations, fractions/decimals/percentages,
ratio & proportion, algebra, measurement, geometry, statistics, reasoning
- Add Exam Simulation Mode 📝

4 exam papers:
- Reading: 15 questions, 30 min
- Grammar: 20 questions, 20 min
- Maths: 20 questions, 30 min
- Full Mock SATs: 30 questions, 45 min

Features:
- Live countdown timer (red when running out)
- Question navigation dots (click to jump)
- Back/Next navigation
- Finish confirmation dialog
- Score results screen with percentage, breakdown, time taken
- Review all answers with explanations
- Retry button
- XP rewards (15 XP per correct answer)

Convex URL updated to combative-viper-883
- Fix repo URL to sats-quest
- Fix broken questions.js — all content in separate world files

questions.js is now just an empty merge point. All 185 questions live in:
- questions-reading.js (37)
- questions-grammar.js (92)
- questions-maths.js (56)
- Question bank complete — 185 questions across all 3 KS2 worlds

- Reading: 37 questions (inference, vocabulary, retrieval, summarising)
- Grammar/GPS: 92 questions (word classes, tenses, punctuation, spelling)
- Maths: 56 questions (fractions, algebra, geometry, statistics)
- Fixed syntax error in reading questions (truncated multiline string)

All 3 worlds cover the full KS2 SATs curriculum at levels 1-5.
- Add 56 Maths questions — full KS2 coverage

Topics: place value, four operations, fractions, decimals, percentages,
ratio & proportion, algebra (substitution, equations, sequences, nth term),
measurement (unit conversions, perimeter, area, volume), geometry (angles,
coordinates), statistics (mean).

Level distribution across levels 1-4.
- Add 92 GPS/Grammar questions — full KS2 coverage

Covers all 37 topic tags:
- Word classes (nouns, verbs, adjectives, etc.)
- Verb tenses (past, present, progressive, perfect)
- Active/passive voice, subjunctive form
- Relative clauses, fronted adverbials
- Punctuation (colons, semicolons, dashes, ellipsis)
- Spelling (silent letters, prefixes, suffixes, homophones, -tion/-sion, -able/-ible, double consonants)
- Commonly misspelled words

Level distribution: 7 L1, 29 L2, 34 L3, 19 L4, 3 L5
- Add Reports Dashboard

- 📊 Reports screen with 3 sections: excelling / OK / focus areas
- Per-tag accuracy tracking across all questions
- Per-world breakdown with accuracy bars and XP
- Smart recommendations based on weak topics, streaks, daily goals
- 7-day activity heatmap
- Nav button (📊) in dashboard header
- Reports auto-compute from answer history
- Comprehensive KS2 question bank — 3 dedicated agents building 120+ questions

- Reading: 40+ questions covering all KS2 content domains (2a-2h)
- Grammar (GPS): 40+ questions on spelling, punctuation, grammar rules
- Maths: 40+ questions on number, fractions, geometry, algebra, stats
- Separate files per world (questions-reading/grammar/maths.js)
- Auto-merged into QuestionBank on load
- Covers: inference, vocab, fronted adverbials, fractions, percentages, algebra, etc.
- Pivot to UK KS2 SATs (Year 6) for Isabella

- Updated all branding: 'Writing' → 'Grammar (GPS)', 'Math' → 'Maths'
- 5 difficulty levels (KS2 range), not 10
- Updated world descriptions to match UK curriculum
- Rewrote email draft and README
- Sub-agent building KS2-specific question bank (reading, GPS, maths)
- Curriculum: inference, punctuation, fractions, geometry etc.
- Add mini-games, expand question bank, draft email for Isabella

- Added Speed Math mini-game with 60-second timer
- Added mini-games section to dashboard
- Created mini-games.js for game data
- Draft email for Isabella (email-draft.md)
- Sub-agent building 45+ question expansion
- SAT Quest — initial build

Gamified SAT prep with 3 worlds (Reading, Writing, Math), 10 levels each.
- Landing page with space theme
- Auth (name + birthday PIN)
- Dashboard with XP, streaks, daily challenges
- Question engine with immediate feedback and explanations
- Review screen for past answers
- Convex backend ready
- Netlify deployment config
- GitHub Actions for Convex deploy
- Dependabot for dependency updates

### Chores

- Add git-cliff config for changelog generation


