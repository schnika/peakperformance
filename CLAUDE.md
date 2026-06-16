# PeakPerformance — Claude Code Guidelines

A training management app for an ambitious track & field group. The coach manages
training sessions via Claude + Neon MCP. Athletes use the web app to view the calendar,
calculate training paces (VDOT), and compute race splits.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 2 (Svelte 5 runes mode) |
| Adapter | `@sveltejs/adapter-netlify` |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Drizzle ORM (`drizzle-orm/neon-http`) |
| Styling | TailwindCSS v4 (utility classes, system dark/light) |
| Language | TypeScript (strict) |

## Dev Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run check        # TypeScript + Svelte type check
npm test             # Run unit tests (Vitest)
npm run test:watch   # TDD mode — re-runs on file save
npm run db:push      # Push schema changes to Neon (set DATABASE_URL first)
npm run db:studio    # Open Drizzle Studio (visual DB browser)
npm run lint         # Prettier + ESLint check
npm run format       # Auto-format all files
```

## Key File Paths

```
src/lib/domain/session/       — Session types, priorityDots, describeBlock (+ tests)
src/lib/domain/pace/          — VDOT formula + Daniels lookup tables (+ tests)
src/lib/domain/calendar/      — Calendar grid logic (+ tests)
src/lib/server/db/schema.ts   — Drizzle table definitions (server-only)
src/lib/server/db/index.ts    — Neon + Drizzle client singleton (server-only)
src/lib/types.ts              — Re-exports domain types + UI color maps
src/routes/+page.server.ts    — Server-side calendar data loader
src/routes/+page.svelte       — Calendar view (monthly grid + side drawer)
src/routes/pace/+page.svelte  — VDOT pace calculator (client-only)
src/routes/splits/+page.svelte — Race split calculator (client-only)
drizzle.config.ts             — Drizzle Kit configuration
```

## Architecture & DDD Rules

**Database access is server-only.** Only `+page.server.ts` and `+server.ts` files may
import from `$lib/server/`. Never import DB code into `.svelte` files or client-side modules.

**Domain logic belongs in `src/lib/domain/`**, not in components. If it can be unit-tested
without a browser, it goes in the domain layer. Components call domain functions.

**TDD workflow:** write tests first (`*.test.ts` beside the domain file), then implement.
Run `npm run test:watch` to stay in the red-green-refactor loop.

## Database Schema

Table: `training_sessions`

| Column | Type | Notes |
|---|---|---|
| `id` | serial PK | auto-increment |
| `date` | date | ISO format `YYYY-MM-DD` |
| `title` | text | session name |
| `type` | text | see types below |
| `priority` | integer | 1=key, 2=important, 3=optional |
| `description` | jsonb | structured session content (see schema below) |
| `notes` | text | free-form coach remarks (nullable) |
| `created_at` | timestamptz | auto-set |

### Session Types

`interval` · `tempo` · `easy` · `long` · `race` · `rest`

### Zone Vocabulary

| Zone | Name | RPE |
|---|---|---|
| `zone1` | Recovery | 1–4 |
| `zone2` | Aerobic | 5–6 |
| `zone3` | Steady State | 7 |
| `zone4` | Threshold | 8–9 |
| `zone5` | VO2max | 10 |

### `description` JSONB Schema

```json
{
  "warmup": {
    "duration": "15min",
    "notes": "easy jog, mobility, drills"
  },
  "sets": [
    {
      "label": "Core Set 1",
      "blocks": [
        { "type": "duration", "duration": "10min", "zone": "zone4" },
        { "type": "rest", "duration": "3min" },
        { "type": "reps", "reps": 5, "distance": 200, "unit": "m", "zone": "zone5", "rest": "30s" },
        { "type": "duration", "duration": "10min", "zone": "zone4" }
      ]
    }
  ],
  "cooldown": {
    "duration": "10min",
    "notes": "easy jog, stretching"
  }
}
```

Block types:
- `duration`: `{ "type": "duration", "duration": "<time>", "zone": "<zone>" }`
- `reps`: `{ "type": "reps", "reps": <n>, "distance": <n>, "unit": "m"|"km", "zone": "<zone>", "pace": "<optional>", "rest": "<time>" }`
- `rest`: `{ "type": "rest", "duration": "<time>" }`

## Creating Sessions via Neon MCP

Use the Neon MCP server to insert sessions directly. Example:

```sql
INSERT INTO training_sessions (date, title, type, priority, description, notes)
VALUES (
  '2026-06-20',
  'Threshold intervals',
  'interval',
  1,
  '{
    "warmup": {"duration": "15min", "notes": "easy jog, drills"},
    "sets": [
      {
        "label": "Core Set 1",
        "blocks": [
          {"type": "reps", "reps": 6, "distance": 800, "unit": "m", "zone": "zone4", "rest": "90s"}
        ]
      }
    ],
    "cooldown": {"duration": "10min", "notes": "easy jog"}
  }',
  'Focus on even effort, not pace'
);
```

## Further Documentation

- `docs/vision.md` — project goals and non-goals
- `docs/architecture.md` — layer diagram and technical decisions
- `docs/agents.md` — agent workflow conventions for this repo
