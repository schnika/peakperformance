-- Herbstblock 2026 - FTSV Komet Blankenese
-- Block 1, Ergaenzung: lockere Einheiten und Krafttraining, Di 01.09. bis Mi 30.09.2026
-- description = Basis Gruppe B; variations = Gruppe A, Marathon, Mittelstrecke
-- Kraft liegt in den notes der Di/Fr-Laeufe. Frequenz 1-1-2-2-1 ueber die fuenf Wochen.
--
-- Erneutes Laden: erst die Zeilen im Zeitraum entfernen.
-- DELETE FROM training_sessions WHERE date BETWEEN '2026-09-01' AND '2026-09-30' AND title LIKE 'Lockerer Lauf%';

BEGIN;

INSERT INTO training_sessions (date, title, type, priority, description, notes, variations) VALUES
  ('2026-09-01', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach die erste Krafteinheit — Technik vor Last. 2–3 Sätze × 10–12 Wdh: Goblet-Kniebeuge, Ausfallschritt rückwärts, einbeiniges Kreuzheben, Side Plank, einbeiniges Beckenheben. Leichtes Gewicht oder nur Körpergewicht. Kein Muskelversagen, kein Muskelkater — es geht um saubere Bewegungsmuster.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-06', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"60min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"70min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-08', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach Kraft wie in der Vorwoche, 2–3 Sätze × 10–12 Wdh. Neu und ab jetzt Pflicht: exzentrische Wadenheber, 3 × 10 je Bein, 3 s ablassen, je ein Satz mit gestrecktem und mit gebeugtem Knie. Die Hügel vom Montag belasten die Achillessehne — das hier ist die Gegenmaßnahme, nicht die Kür.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"65min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-09', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Zusätzlich Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Leicht — das ist die dritte Krafteinheit der Woche, kein zweiter schwerer Tag."}]$j$::jsonb),
  ('2026-09-13', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Kurz und locker.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-15', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach Maximalkraft: 3 Sätze × 6 Wdh Kniebeuge, Ausfallschritt, einbeiniges Kreuzheben. Schwer, aber 3 Wdh in Reserve — der Satz endet, wenn die Technik nachlässt, nicht wenn nichts mehr geht. Pausen 2–3 min, vollständig. Davor 2 × 10 leichte Sprünge, danach exzentrische Wadenheber 3 × 10 je Bein. Wenig Wdh mit viel Last verbessert die Laufökonomie über die Ansteuerung, nicht über Muskelmasse.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"65min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-16', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Zusätzlich Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Leicht — das ist die dritte Krafteinheit der Woche, kein zweiter schwerer Tag."}]$j$::jsonb),
  ('2026-09-18', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Kurzer lockerer Lauf, danach die zweite Krafteinheit der Woche: gleiche Übungen wie Dienstag, 3 Sätze × 6 Wdh. Wenn der Dienstag noch in den Beinen sitzt, lieber eine Wdh weniger als weniger Last. Exzentrische Wadenheber nicht auslassen.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-20', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Kurz und locker.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-22', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"50min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach Maximalkraft, schwerste Woche des Blocks: 3–4 Sätze × 4–5 Wdh, 2 Wdh in Reserve. Pausen 2–3 min. Konzentrisch zügig denken, exzentrisch 2–3 s kontrolliert ablassen. Davor 2 × 10 Sprünge, danach exzentrische Wadenheber.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"60min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"70min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-23', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"60min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Zusätzlich Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Leicht — das ist die dritte Krafteinheit der Woche, kein zweiter schwerer Tag."}]$j$::jsonb),
  ('2026-09-25', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Kurzer lockerer Lauf, danach zweite Krafteinheit: 3 Sätze × 5 Wdh. Letzte schwere Einheit vor der Entlastung — sauber abschließen, nicht ausbelasten.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-27', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Kurz und locker.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-29', 'Lockerer Lauf + Kraft', 'easy', 2,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}$j$::jsonb,
   'Lockerer Lauf, danach nur noch Erhalt: 2 Sätze × 5 Wdh bei etwa 70 % der Last aus der Vorwoche, zügig ausgeführt, kein Ausbelasten. Rumpf und Mobilität bleiben. Am Montag darauf steht der 3000-m-Test — die Beine sollen frisch sein.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"55min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"40min","zone":"zone1"}]}]}}]$j$::jsonb),
  ('2026-09-30', 'Lockerer Lauf', 'easy', 3,
   $j${"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"25min","zone":"zone1"}]}]}$j$::jsonb,
   'Optional. Wirklich easy.',
   $j$[{"label":"Gruppe A","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"35min","zone":"zone1"}]}]}},{"label":"Marathon","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"45min","zone":"zone1"}]}]}},{"label":"Mittelstrecke","description":{"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"30min","zone":"zone1"}]}]},"notes":"Optional. Wirklich easy. Zusätzlich Stabi/Athletik: Rumpf, Hüftstabilität, Mobilität, 20 min. Leicht — das ist die dritte Krafteinheit der Woche, kein zweiter schwerer Tag."}]$j$::jsonb);

COMMIT;
