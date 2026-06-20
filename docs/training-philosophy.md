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
already hit the upper zones.

---

## Intensity Control: RPE 1–10

No VDOT-based pace targets in communication with athletes. All zones are communicated
as RPE. Anchors:

- **LT1** (aerobic threshold) ≈ RPE 3–4 — conversation pace, easy/moderate boundary
- **LT2** (anaerobic threshold / critical velocity) ≈ RPE 6–7 — moderate/hard boundary

### Zone Table

Zone names and RPE ranges: see `src/lib/types.ts` (`ZONE_LABELS`) — single source of truth.

| Zone   | Daniels ref | Physiology                     |
| ------ | ----------- | ------------------------------ |
| zone1  | E           | below LT1, aerobic system      |
| zone2  | M           | near LT1, high fat oxidation   |
| zone3  | T           | around LT2, lactate balanced   |
| zone4  | I           | above LT2, VO2max stimulus     |
| zone5  | R           | neuromuscular, anaerobic       |

---

## Evidence-Based Methods

### VO2max Intervals (Helgerud 2007, Laursen & Jenkins 2002)
4–5 × 4 min @ zone4, 3 min active recovery. Most effective method for improving VO2max.
Variants: 6 × 3 min, 8 × 2 min.

### Threshold / Cruise Intervals
20–40 min @ zone3 (LT2). Improves critical velocity. More effective than short intervals
for race-specific endurance. Cruise Intervals: 3–4 × 8–10 min with 1 min recovery.

### 10-20-30 Training (Gunnarsson & Bangsbo 2012)
Blocks of 30s easy / 20s moderate / 10s sprint. Time-efficient, large cardiovascular and
neuromuscular effect at low volume. Well-suited for heterogeneous groups — sprint pace is
self-regulated. Ideal for the 5k/10k group.

### Speed Endurance (Bangsbo 2009)
Short intensive reps (200–400m @ zone5) with long recovery (2–4 min). Improves running
economy and neuromuscular efficiency.

### Long Run with Progressive Finish
70–80% easy (zone1–2), final 15–25% @ zone2–3. More effective than constant easy pace
(Daniels study, confirmed by Scharhag-Rosenberger 2020).

---

## Block Periodization (Issurin 2010)

Mesocycle structure in concentrated blocks:

- **Accumulation block** (2–3 weeks): volume ↑, moderate intensity — zone1–3 focus
- **Transmutation block** (1–2 weeks): quality ↑, moderate volume — zone4–5 focus
- **Realization block** (1 week): volume ↓ (taper), hold intensity — race preparation

---

## Running Economy

Strength training significantly improves running economy (Balsalobre-Fernández 2016).
Recommendation for athletes: 1–2×/week heavy compound lifts (squats, single-leg work)
or plyometric exercises.

---

## Training Groups

| Group   | Target distance   | Weekly volume  |
| ------- | ----------------- | -------------- |
| Group A | Half Marathon / Marathon | 40–70 km |
| Group B | 5k / 10k          | 25–40 km       |

Quality sessions are shared — Group A does more reps or longer sets. Volume difference
is managed through easy runs and long run distance.

---

## Weekly Template

| Day | Session                              | Type    | Priority |
| --- | ------------------------------------ | ------- | -------- |
| Mon | Quality 2 (homework, future: group)  | Quality | 1        |
| Tue | Easy (optional)                      | Easy    | 3        |
| Wed | Easy (optional)                      | Easy    | 3        |
| Thu | Quality 1 (**group session — fixed**) | Quality | 1       |
| Fri | Easy (optional)                      | Easy    | 3        |
| Sat | Long run                             | Long    | 2        |
| Sun | Easy (optional)                      | Easy    | 3        |

Max 5 sessions/week. Easy days are deliberately zone1 (RPE 1–3) — no moderate filler.

---

## Race Calendar & Macro Phases

| Date       | Race                           | Significance          |
| ---------- | ------------------------------ | --------------------- |
| 2026-08-30 | Blankeneser Heldenlauf (5–21k) | Experience event, no peak |
| 2026-10-03 | Herbstlauf                     | First performance marker |
| 2026-11-08 | Herbstlauf                     | Main autumn target    |
| 2027-04    | Hamburg Marathon/HM + 5k/10k   | Season peak           |

**Macro phases:**

1. Now → Aug 30: base building, conservative, aerobic base + first quality
2. Sep → Oct 3: accumulation + transmutation (~5 weeks), first peak
3. Oct → Nov 8: accumulation + transmutation + realization (~5 weeks)
4. Nov → Feb: winter base — large accumulation block, aerobic base, strength
5. Feb → Apr 2027: transmutation + realization → Hamburg
