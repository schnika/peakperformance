-- Herbstblock 2026 - FTSV Komet Blankenese
-- Block 1, Ergaenzung: lockere Einheiten und Krafttraining, Di 01.09. bis Mi 30.09.2026
-- description = Basis; variations = Mittelstrecke
-- Kraft liegt in den notes der Di/Fr-Laeufe. Frequenz 1-1-2-2-1 ueber die fuenf Wochen.
--
-- Neuaufbau: laeuft nach 0001, siehe dort zur Reihenfolge.
-- Das DELETE unten trifft nur die eigenen Fuelltage, nicht die Mo/Do/Sa-Sessions aus 0001.

BEGIN;

DELETE FROM training_sessions WHERE date BETWEEN '2026-09-01' AND '2026-09-30' AND title LIKE 'Lockerer Lauf%';

INSERT INTO training_sessions (date, title, type, priority, description, notes, variations) VALUES
  ('2026-09-01', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach die erste Krafteinheit. Technik geht vor Last. 2–3 Sätze × 10–12 Wdh: Goblet-Kniebeuge, Ausfallschritt rückwärts, einbeiniges Kreuzheben, Side Plank, einbeiniges Beckenheben. Leichtes Gewicht oder nur Körpergewicht. Geht bitte nicht bis zum Muskelversagen. In dieser Woche geht es nur um saubere Bewegungen.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-06', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-08', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach Kraft wie in der Vorwoche, 2–3 Sätze × 10–12 Wdh. Neu dazu kommen exzentrische Wadenheber, 3 × 10 je Bein, 3 s ablassen, je ein Satz mit gestrecktem und mit gebeugtem Knie. Die macht bitte jede Woche mit, solange wir Hügel laufen. Sie schützen die Achillessehne vor der Belastung vom Montag.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-09', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Dazu Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Dritte Krafteinheit der Woche. Das soll kein hartes Training werden, sondern beim Aufbau helfen."}]$j$::jsonb),
  ('2026-09-13', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Kurz und locker.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-15', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach Maximalkraft: 3 Sätze × 6 Wdh Kniebeuge, Ausfallschritt, einbeiniges Kreuzheben. Schwer, aber lasst 3 Wdh im Tank. Beendet den Satz, sobald die Technik nachlässt. Pausen 2–3 min und die bitte voll ausnutzen. Davor 2 × 10 leichte Sprünge, danach exzentrische Wadenheber 3 × 10 je Bein. Wenige Wiederholungen mit viel Last verbessern die Laufökonomie. Das läuft über die Ansteuerung der Muskulatur, Masse baut ihr davon nicht auf.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-16', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Dazu Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Dritte Krafteinheit der Woche. Das soll kein hartes Training werden, sondern beim Aufbau helfen."}]$j$::jsonb),
  ('2026-09-18', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Kurzer lockerer Lauf, danach die zweite Krafteinheit der Woche. Gleiche Übungen wie Dienstag, 3 Sätze × 6 Wdh. Wenn der Dienstag noch in den Beinen sitzt, macht lieber eine Wiederholung weniger und lasst das Gewicht drauf. Die Wadenheber gehören dazu.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-20', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Kurz und locker.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-22', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach Maximalkraft. Das ist die schwerste Woche im Block: 3–4 Sätze × 4–5 Wdh, 2 Wdh im Tank lassen. Pausen 2–3 min. Nach oben zügig bewegen, nach unten 2–3 s kontrolliert ablassen. Davor 2 × 10 Sprünge, danach exzentrische Wadenheber.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-23', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Dazu Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Dritte Krafteinheit der Woche. Das soll kein hartes Training werden, sondern beim Aufbau helfen."}]$j$::jsonb),
  ('2026-09-25', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Kurzer lockerer Lauf, danach die zweite Krafteinheit: 3 Sätze × 5 Wdh. Letzte schwere Einheit vor der Entlastung. Sauber abschließen reicht, ihr müsst euch nicht ausbelasten.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-27', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Kurz und locker.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-29', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach nur noch Erhalt: 2 Sätze × 5 Wdh bei etwa 70 % der Last aus der Vorwoche, zügig ausgeführt. Rumpf und Mobilität macht ihr weiter wie gewohnt. Am Montag darauf steht der 3000-m-Test, die Beine sollen frisch sein.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-30', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Dazu Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Dritte Krafteinheit der Woche. Das soll kein hartes Training werden, sondern beim Aufbau helfen."}]$j$::jsonb);

COMMIT;
