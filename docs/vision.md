# Vision

## What

PeakPerformance is a lightweight training management app for a track & field training
group. It gives athletes a clear view of their training schedule and provides tools to
calculate zone-specific paces and race splits.

## Who

- **Coach** — creates and manages training sessions via Claude Code + Neon MCP.
  Never needs to log in to the web app.
- **Athletes** — use the web app to view upcoming sessions, understand the session
  structure, and calculate their personal training paces and race splits.

## Core Features

1. **Training Calendar** — monthly view of all sessions. Each session shows type,
   title, and priority. Clicking opens a detail drawer with the full session structure
   (warm-up, sets with blocks, cool-down) and coach notes.

2. **VDOT Pace Calculator** — athletes enter their current personal best times for
   standard distances (1k – marathon). The app derives Jack Daniels VDOT and shows
   target pace ranges for all five training zones across workout distances (100m–10k).
   Times are persisted in localStorage.

3. **Split Calculator** — athletes enter a target race time and choose a pacing strategy
   (even or negative split). The app outputs per-km splits and, for track distances, per-
   400m lap times.

## Non-Goals (for now)

- No authentication or user accounts
- No athlete profiles or personal record storage in the database
- No social or communication features
- No wearable or GPS device sync
- No coach-facing web UI (coach manages all data via Claude + Neon MCP)

## Design Principles

- **Mobile-first** — athletes check the app on their phones at the track
- **Read-heavy** — the web app is a display layer; writes happen via MCP
- **Fast** — minimal JavaScript, SSR for the calendar, client-only for calculators
- **No bloat** — add features only when there is a concrete need
