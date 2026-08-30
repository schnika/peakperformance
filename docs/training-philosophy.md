# Training Philosophy — FTSV Komet Blankenese

The training approach for this group is grounded in current exercise science research,
not tradition. Key principles below.

---

## Intensity Distribution: Polarized Training

Based on Seiler et al. — approximately **80% of volume in zone1–2** (below LT1),
**20% in zone4–5** (above LT2). Zone3 is deliberately minimized.

The rationale: zone3 is too hard for full recovery and too easy to drive maximum
adaptation. It's the "grey zone" that feels productive but isn't.

For recreational runners with limited weekly volume, a **pyramidal variant** applies:
slightly more zone3 than the pure polarized model, since two quality sessions per week
already hit the upper zones. Middle-distance athletes follow the pyramidal model
explicitly (see Haugen et al. below) — 1500 m runners use zone3 more regularly than
800 m runners do.

---

## Intensity Control: RPE 1–10

No VDOT-based pace targets in communication with athletes. All zones are communicated
as RPE. Anchors:

- **LT1** (aerobic threshold) ≈ RPE 3–4 — conversation pace, easy/moderate boundary
- **LT2** (anaerobic threshold / critical velocity) ≈ RPE 6–7 — moderate/hard boundary

### Zone Table

Zone names and RPE ranges: see `src/lib/domain/session/zones.ts` (`ZONE_LABELS`) —
single source of truth. Any planning document must match those values.

| Zone  | Daniels ref | Physiology                   |
| ----- | ----------- | ---------------------------- |
| zone1 | E           | below LT1, aerobic system    |
| zone2 | M           | near LT1, high fat oxidation |
| zone3 | T           | around LT2, lactate balanced |
| zone4 | I           | above LT2, VO2max stimulus   |
| zone5 | R           | neuromuscular, anaerobic     |

---

## Evidence-Based Methods

### VO2max Intervals (Helgerud 2007, Laursen & Jenkins 2002)

4–5 × 4 min @ zone4, 3 min active recovery. Most effective method for improving VO2max.
Variants: 6 × 3 min, 8 × 2 min.

### Threshold / Cruise Intervals

20–40 min @ zone3 (LT2). Improves critical velocity. More effective than short intervals
for race-specific endurance. Cruise Intervals: 3–5 × 8–10 min with 2 min recovery.
Longer forms for marathon work: 3 × 12 min, 2 × 20 min.

### 10-20-30 Training (Gunnarsson & Bangsbo 2012)

Blocks of 30s easy / 20s moderate / 10s sprint, 5 rounds per block, 2 min between blocks.
Time-efficient, large cardiovascular and neuromuscular effect at low volume. Well-suited
for heterogeneous groups — sprint pace is self-regulated. The 30s must be genuinely slow,
slower than easy pace, or the method does not work.

### 30/30 Intervals (Billat)

2 sets × 10–12 × (30s @ zone4 / 30s jog), 3 min between sets. Accumulates time near VO2max
with low lactate accumulation, because no single effort exceeds 30s. **The recovery is
jogged, not walked** — that is the mechanism.

### Speed Endurance / Short Reps with Long Recovery (Bangsbo 2009)

Short intensive reps (200–400 m, or 30s time-based @ zone5) with long recovery (2:30–4 min).
Improves running economy and neuromuscular efficiency. Systemically light — pairs safely
with a hard session earlier in the same week. Run at ~1500 m race pace, not maximal.

### Mona Fartlek

20 min continuous: 2 × 90s, 4 × 60s, 4 × 30s, 4 × 15s, each with equal-duration float
recovery. Self-regulating because efforts shorten as fatigue accumulates. Good first
quality session after a deload week; the rhythm changes suit cross-country.

### Cut-down Fartlek

5 / 4 / 3 / 2 / 1 min with 90s jog recovery, each rep slightly faster than the last.
Trains pacing discipline under fatigue — starting too fast makes progression impossible.

### Hill Work — three distinct forms, in this order

1. **Hill sprints**: 8–10 × 10s maximal, full recovery (2–3 min). Recruitment, tendon
   stiffness, technique. Prepares the athlete to tolerate longer hill work later.
2. **Hill strength endurance**: 8–12 × 45–90s @ zone4, jog down. The winter backbone.
3. **Cross-specific hill fartlek**: push up, **run over the crest** and hold race pace for
   60–90s before easing. The decisive cross-country skill is not climbing — it is not
   shutting down at the top.

### Long Run with Progressive Finish

70–80% easy (zone1–2), final 15–25% @ zone2–3. More effective than constant easy pace
(Daniels study, confirmed by Scharhag-Rosenberger 2020).

Long run caps by target distance: 5 km → 20 km · middle distance → 17 km ·
half marathon → 24 km · marathon → 32 km.

### Middle Distance (Haugen et al. 2021, _Crossing the Golden Training Divide_)

World-class 1500 m: pyramidal distribution, ~80% low intensity but regular zone3;
progressive long runs 13–17 km; short sprints of 60–120 m with full recovery maintained
**year-round**; strength, plyometrics and medicine ball work as fixed components;
preparation starts at 40–60% of peak volume, increasing 5–15 km/week; lactate tolerance
work only late in the cycle. Volumes (120–170 km/week) scale down proportionally for
club athletes — the structure transfers, the absolute numbers do not.

---

## Block Periodization (Issurin 2010)

Mesocycle structure in concentrated blocks:

- **Accumulation block** (2–3 weeks): volume ↑, moderate intensity — zone1–3 focus
- **Transmutation block** (1–2 weeks): quality ↑, moderate volume — zone4–5 focus
- **Realization block** (1 week): volume ↓ (taper), hold intensity — race preparation

Load:recovery as 3:1 or 2:1. A reintegration week always follows a race before the next
block starts.

**Progression happens between sessions, not within them.** Repeating the same session with
one extra rep is not the model used here. Across a block, the sustained effort duration
grows while the work:rest ratio shrinks and intensity falls — for example 10s fragmented →
30s with long rest → 30s with equal rest → 90s → 5 min → 20 min continuous. Objective
markers come from a test and the race; heart rate at a fixed easy pace serves as a silent
third marker without changing any session.

---

## Running Economy

Strength training significantly improves running economy (Balsalobre-Fernández 2016).
1–2×/week heavy compound lifts (squats, single-leg work) or plyometrics; middle-distance
athletes 3×/week. Emphasis shifts from max strength in the base phase to reactive/plyometric
work in the specific phase, dropping to maintenance in the final 2–3 weeks.

**Eccentric calf work is mandatory whenever hills are in the programme.** Achilles problems
from hill loading typically surface in the third month, when the cause is no longer obvious.

---

## Training Groups

Three plan variants share one weekly template.

| Variant           | Target                      | Weekly volume | Notes                        |
| ----------------- | --------------------------- | ------------- | ---------------------------- |
| **Basis B**       | 5 km (also 10 km)           | 34–48 km      | default group                |
| **Basis A**       | 5 km (also 10 km)           | 42–58 km      | stronger runners             |
| **Marathon**      | marathon                    | 50–86 km      | currently one athlete        |
| **Mittelstrecke** | 1500 / 3000 m, winter cross | 35–56 km      | year-round speed maintenance |

**Construction rule:** Thursday is the same session for all variants, differing only in
warm-up/cool-down volume. Variant-specific work lives exclusively in **Monday and the long
run**. This keeps the group together on the day with the least supervision and limits
coaching overhead — the single marathon athlete needs her own Monday session exactly once
in a ten-week block.

---

## Weekly Template

| Day | Session                             | Type    | Priority |
| --- | ----------------------------------- | ------- | -------- |
| Mon | Quality — **coach on site**         | Quality | 1        |
| Tue | Easy + strength                     | Easy    | 3        |
| Wed | Easy (optional)                     | Easy    | 3        |
| Thu | Quality — **group, self-organized** | Quality | 1        |
| Fri | Easy + strength (accumulation only) | Easy    | 3        |
| Sat | Long run                            | Long    | 2        |
| Sun | Easy (optional)                     | Easy    | 3        |

Easy days are deliberately zone1 — no moderate filler.

### Monday vs Thursday — the key planning rule

- **Monday** takes everything that needs instruction: pace calibration, technique, hill
  work with form correction, VO2max pacing, tests, race-pace work. Sessions may be complex.
- **Thursday** takes sessions that carry themselves: driven by **time and perceived effort,
  never a pace table**; no track, no measured course; mixed abilities irrelevant. Loop
  format with a shared start and finish so everyone finishes together. One person per
  evening calls the times, the role rotates. The coach attends on rotation only.
- The coach records a **voice message the evening before** explaining the Thursday session,
  so new formats are fine. What a voice message cannot replace is pace correction during
  the session — which is why race-pace work stays on Monday.
- This also matches the load pattern: Thursday sits between a hard Monday and Saturday's
  long run and should be the softer of the two quality sessions.

---

## Race Calendar & Macro Phases

| Date          | Race                               | Significance                      |
| ------------- | ---------------------------------- | --------------------------------- |
| 2026-08-30    | Blankeneser Heldenlauf             | done — closed the VO2max block    |
| 2026-10-05    | 3000 m test (Monday group session) | benchmark, sets paces for block 2 |
| 2026-11-08    | Süderelbe-Lauf, Neugraben          | **autumn peak** — 5 km / HM       |
| 2026-12-06    | Valencia Marathon                  | marathon athlete's main target    |
| 2027-01 (TBC) | Bergedorfer Crosslauf, Doktorberg  | middle-distance peak — **hilly**  |
| 2027-04       | Hamburg Marathon / HM + 5k/10k     | spring target                     |

Süderelbe start times: HM 10:00, 10 km 10:15, 5 km 10:20. The half marathon sits exactly
four weeks before Valencia and is run as a sharpening race without a real taper.

The Bergedorf date is **not yet published** — expected in the first or second week of
January 2027. The winter block is therefore planned backwards from race day; the buffer
week is inserted in the strength-endurance phase, not at the end. Note that aggregator
sites describe the course as flat — that is wrong. Start and finish are at the Rodelbahn
Doktorberg and the course is hilly, which is why hills and strength form the winter base.

**Macro phases:**

1. Aug 31 → Nov 8: autumn block, 10 weeks, 2 × 3:1 (see `claude/mesozyklus-herbst-2026.md`
   in the Claude project for the full plan)
2. Nov 9 → Dec 6: marathon specific phase and taper for Valencia
3. Nov → Jan: middle-distance winter — hill strength endurance, then cross-specific work
4. Jan → Apr 2027: transmutation + realization → Hamburg

---

## Seeding Sessions

Plans are loaded via versioned SQL seeds in `seeds/`, not by hand. Convention:

- One file per block: `seeds/<nnnn>_<block>_<part>.sql`
- `description` holds the **Basis Gruppe B** version
- `variations` holds `Gruppe A`, `Marathon`, `Mittelstrecke` in that order
- Titles and notes are in **German** — athletes read them in the app
- Time-based interval sets encode one pattern in `blocks` and the repeat count in the set
  `label` (e.g. `"Satz 1: 10× [30 s zügig / 30 s traben]"`), because the block schema has
  no n×duration form. Distance-based reps use the `reps` block properly.
- Each file starts with a commented `DELETE` for its own date range so it can be re-run

**Schema drift to fix:** `variations` exists in `src/lib/server/db/schema.ts` but not in
`drizzle/0000_awesome_cardiac.sql` — it was added via `db:push` without a migration.
Generate a migration so a fresh database matches production.
