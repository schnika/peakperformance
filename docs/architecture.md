# Architecture

## Layer Diagram

```
┌─────────────────────────────────────────────────────┐
│  Athlete Browser                                     │
│  SvelteKit (SSR + client routing)                   │
│  ├── / (calendar)      → +page.server.ts → Drizzle  │
│  ├── /pace (calc)      → client-only, localStorage  │
│  └── /splits (calc)    → client-only                │
└──────────────────────┬──────────────────────────────┘
                       │ neon-http
                ┌──────▼──────┐
                │  Neon DB    │
                │ (PostgreSQL)│
                └──────▲──────┘
                       │ SQL via Neon MCP
             ┌──────────────────┐
             │  Coach Workflow  │
             │  Claude Code +   │
             │  Neon MCP server │
             └──────────────────┘
```

## Request Flow

**Calendar page:**

1. Browser requests `/?year=2026&month=6`
2. `+page.server.ts` runs on Netlify Function (Node.js)
3. Drizzle queries Neon via `neon-http` (HTTP, no persistent connection)
4. HTML is server-rendered and streamed to the browser
5. Svelte hydrates; month navigation uses `goto()` (SvelteKit client router)

**Calculators (pace, splits):**

- Fully client-side; no server round-trips
- VDOT reference times persisted in `localStorage`

**Session writes (coach):**

1. Coach opens Claude Code with Neon MCP configured
2. Claude generates SQL and executes via `run_sql` tool on Neon MCP
3. Data lands directly in the `training_sessions` table
4. Next calendar load reflects the new session

## Key Technical Decisions

### SvelteKit over Next.js

- Smaller bundle, faster cold-start on Netlify Functions
- Svelte 5 runes give fine-grained reactivity with minimal boilerplate
- The `@sveltejs/adapter-netlify` produces a single Netlify Function for SSR

### Drizzle ORM over Prisma

- No binary engine — works in Netlify's Node.js environment without workarounds
- Schema as TypeScript — fully type-safe, no codegen step for querying
- `drizzle-kit push` is the only schema migration tool used

### Neon over RDS / Supabase

- HTTP driver (`neon-http`) is connection-safe for serverless (no connection pooling issues)
- Branching: create a Neon branch for local dev without affecting production data
- Free tier is sufficient for this use case

### No custom MCP server

- The Neon MCP server exposes `run_sql` — sufficient for structured session inserts
- CLAUDE.md documents the schema and provides example SQL
- Eliminates a layer of code to maintain

## File Conventions & DDD Structure

```
src/lib/domain/          — domain layer: pure business logic, no framework dependencies
  session/               — training session aggregate (types, validation, display logic)
  pace/                  — VDOT pace calculation domain (formula + Daniels lookup tables)
  calendar/              — calendar grid generation
src/lib/server/          — infrastructure layer: server-only DB access
src/lib/types.ts         — re-exports domain types + UI color constants
src/routes/              — application layer: SvelteKit pages and API routes
```

### Domain Layer Rules

- Domain modules are **pure TypeScript** — no SvelteKit imports, no DB imports
- All domain logic is **unit-testable** without mocking (see `*.test.ts` files)
- Domain modules export functions; components call them, not the other way around

### DB Access Rule

Only `+page.server.ts` and `+server.ts` files may import from `$lib/server/`.  
SvelteKit enforces this at build time.

## VDOT Implementation

Zone paces use the official Jack Daniels lookup tables (VDOT 30–85):

- `easy-long-pace.ts` → zone1 (+ 45s offset) and zone2
- `marathon-pace.ts` → zone3
- `threshold-paces.ts` → zone4
- `interval-paces.ts` → zone5
- `repetition-paces.ts` → speed reference (shown separately in UI)

VDOT is still **calculated** from reference times using the Daniels formula (`calculateVDOT()`),
then rounded to the nearest integer for table lookup. This gives accurate zone paces from
any distance input, not just the standard race distances in the tables.

## Environment Variables

| Variable       | Where                | Purpose                |
| -------------- | -------------------- | ---------------------- |
| `DATABASE_URL` | Netlify env + `.env` | Neon connection string |

Production: set in Netlify dashboard under Site → Environment variables.  
Local: copy `.env.example` → `.env` and fill in your Neon connection string.
