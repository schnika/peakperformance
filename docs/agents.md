# Agent Conventions

Guidelines for Claude Code agents working in this repository.

## Workflow

1. Read `CLAUDE.md` first — it has schema, zone vocabulary, and SQL examples.
2. Run `npm run check` before committing to catch TypeScript errors.
3. Run `npm run build` to verify the full production build passes.
4. Commit with conventional commit format (see below).
5. Push to the feature branch; never push directly to `main`.

## File Ownership

| Area        | Files                                        | Notes                                      |
| ----------- | -------------------------------------------- | ------------------------------------------ |
| Schema      | `src/lib/server/db/schema.ts`                | Always run `npm run db:push` after changes |
| Types       | `src/lib/types.ts`                           | Shared — changes affect all pages          |
| VDOT logic  | `src/lib/vdot.ts`                            | Pure functions, no side effects            |
| Calendar    | `src/routes/+page.svelte`, `+page.server.ts` | Read-only UI                               |
| Pace calc   | `src/routes/pace/+page.svelte`               | Client-only, uses localStorage             |
| Splits calc | `src/routes/splits/+page.svelte`             | Client-only                                |
| LLM docs    | `CLAUDE.md`, `docs/`                         | Keep in sync when schema changes           |

## Schema Changes

1. Edit `src/lib/server/db/schema.ts`
2. Run `npm run db:push` (requires `DATABASE_URL` in `.env`)
3. Update the schema reference table in `CLAUDE.md`
4. Update `src/lib/types.ts` if the change affects the `TrainingSession` interface

Never write raw migrations by hand — always use `drizzle-kit push` for development
and `drizzle-kit generate` + `drizzle-kit migrate` if moving to explicit migrations later.

## Creating / Updating Sessions

Use the Neon MCP server (`run_sql`) with the SQL template in `CLAUDE.md`.
Always include a valid `description` JSONB object — the UI will break on malformed JSON.

Validate the description structure against the schema in `CLAUDE.md` before inserting.

## Commit Convention

Format: `<type>(<scope>): <description>`

| Type       | When                                  |
| ---------- | ------------------------------------- |
| `feat`     | New feature or page                   |
| `fix`      | Bug fix                               |
| `chore`    | Tooling, dependencies, config         |
| `docs`     | Documentation only                    |
| `style`    | Formatting, no logic change           |
| `refactor` | Restructuring without behavior change |

Examples:

```
feat(calendar): add session type color legend
fix(vdot): correct zone3 pace boundary calculation
chore(deps): update @sveltejs/kit to 2.64
docs(claude): add example SQL for rest day sessions
```

## Domain-Driven Design

The codebase follows a lightweight DDD structure:

- **Domain layer** (`src/lib/domain/`) — pure business logic only. No SvelteKit, no DB, no side effects.
  - `session/` — session aggregate, types, display helpers (`describeBlock`, `priorityDots`)
  - `pace/` — VDOT formula + Daniels lookup tables, zone paces, time formatting
  - `calendar/` — calendar grid generation
- **Application layer** (`src/routes/`) — SvelteKit pages and server loaders
- **Infrastructure layer** (`src/lib/server/db/`) — Drizzle + Neon

When adding features: put **logic** in the domain layer, put **framework wiring** in routes.

## Test-Driven Development

All domain logic is covered by unit tests (`src/lib/domain/**/*.test.ts`).

The TDD workflow for any domain change:

1. Write a failing test that specifies the expected behavior
2. Implement the logic until the test passes
3. Refactor if needed — tests protect the behavior

```bash
npm run test:watch   # TDD mode — re-runs on file change
npm test             # one-shot run for CI / pre-push
npm run check        # TypeScript + Svelte type check
npm run build        # verify production build
```

Do **not** add logic to `.svelte` files that belongs in the domain. If you can unit-test it without a browser, it belongs in `src/lib/domain/`.
