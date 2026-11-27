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
- **Hosting:** Cloudflare Pages + Pages Functions (`/api/report` bug reports, `/api/signup-notify` + `/api/approve` signup approval via Resend)

New signups are held as `pending` until approved — the owner gets an email with approve/deny links.

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
- `RESEND_API_KEY` — for `/api/report` + `/api/signup-notify` emails
- `APPROVAL_KEY` — shared secret authorising approval requests (also set on Convex: `npx convex env set APPROVAL_KEY …`)

Local Convex env lives in `.env.local` (gitignored).

## Versioning and releases

`package.json` (`version`) is the single source of truth for the app version. Running `pnpm build` (`scripts/build-pages.sh`) injects it into `dist/src/version.js` so the app shows it in the footer (falling back to `dev` when served directly without a build).

To release a user-facing change:
1. Bump `version` in `package.json` (minor for new features, patch for fixes).
2. Add a plain-English `## [x.y.z] - YYYY-MM-DD` section under `## Release notes` in the `header` of `cliff.toml` (newest first). Do **not** edit `CHANGELOG.md` directly — it is regenerated automatically by `git-cliff` on every push to `main`.
3. Merge to `main` — no manual git tags are needed; Cloudflare Pages deploys automatically and `CHANGELOG.md` updates from `cliff.toml`.
