# SAT Quest 🚀

Gamified KS2 SATs revision that feels like a game, not homework.

**Live at:** `sats-quest.antoniosmith.xyz`

## Features
- 📖 **3 Worlds** — Reading, Grammar & Maths with 5 difficulty levels each
- ⚡ **Bite-sized** — 5-15 minute practice sessions
- 🔥 **Streaks** — Daily practice tracking
- 🏆 **XP & Levels** — Gamified progression
- 📝 **Review** — See past answers and explanations
- 🎯 **Daily Challenge** — 5 questions per day to maintain streaks
- ⚡ **Speed Maths** — Timed mini-game
- 📝 **Exam Mode** — Timed mock papers per subject or a full mixed mock

## Content
- **Reading:** Comprehension, inference, vocabulary, summarising
- **Grammar (GPS):** Spelling rules, punctuation, grammar structures
- **Maths:** Place value, fractions, measures, geometry, statistics

## Tech Stack
- **Frontend:** Pure HTML/CSS/JS (no framework)
- **Backend:** Convex (real-time database)
- **Hosting:** Cloudflare Pages + Pages Functions (`/api/report` via Resend)

## Setup
```bash
pnpm install
pnpm convex dev          # run the Convex backend locally
pnpm dlx serve .         # serve the site locally
```

## Deploy

```bash
wrangler pages deploy . --project-name sats-quest
```

Secrets (Cloudflare Pages → Settings → Environment variables):
- `RESEND_API_KEY` — for the `/api/report` bug-report function

Local Convex env lives in `.env.local` (gitignored).
