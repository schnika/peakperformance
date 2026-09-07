-- Herbstblock 2026 - FTSV Komet Blankenese
-- Block 1: Wochen 1-5, Mo 31.08.2026 bis Sa 03.10.2026
-- description = Basis; variations = Mittelstrecke
-- Ausnahme: donnerstags gibt es keine Variante. Dort trainiert die ganze Gruppe
-- dieselbe Einheit, weil der Abend selbstorganisiert laeuft.
--
-- Neuaufbau: dieser Seed raeumt selbst auf. Reihenfolge ist erst 0001, dann 0002.
-- Das DELETE unten entfernt ALLES ab dem 31.08.2026, also auch die Fuelltage aus 0002.
-- Wer 0001 allein laufen laesst, verliert die Sessions aus 0002 und muss sie neu laden.

BEGIN;

DELETE FROM training_sessions WHERE date >= '2026-08-31';

INSERT INTO training_sessions (date, title, type, priority, description, notes, variations) VALUES
  ('2026-08-31', 'Reintegration: Lauf-ABC und Steigerungen', 'easy', 2,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"},{"type":"reps","reps":8,"distance":100,"unit":"m","zone":"zone5","rest":"60s"}]}],"cooldown":{"duration":"5min","notes":"locker austraben"}}$j$::jsonb,
   'Erste Einheit nach dem Heldenlauf. Steigerungen locker angehen, kein Sprint.',
   $j$[{"label":"Mittelstrecke","description":{"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"20min","zone":"zone1"},{"type":"reps","reps":8,"distance":100,"unit":"m","zone":"zone5","rest":"60s"}]}],"cooldown":{"duration":"5min","notes":"locker austraben"}},"notes":"Wie die Basis. Steigerungen technisch sauber, nicht schnell."}]$j$::jsonb),
  ('2026-09-03', 'Lockerer Dauerlauf mit Steigerungen', 'easy', 2,
   $j${"sets":[{"label":"Dauerlauf","blocks":[{"type":"duration","duration":"50min","zone":"zone1"},{"type":"reps","reps":8,"distance":100,"unit":"m","zone":"zone5","rest":"60s"}]}],"cooldown":{"duration":"5min","notes":"locker austraben"}}$j$::jsonb,
   'Gruppe läuft selbst. Steigerungen auf Gras. Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[]$j$::jsonb),
  ('2026-09-05', 'Longrun', 'long', 2,
   $j${"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":14,"unit":"km","zone":"zone1","rest":"0"}]}]}$j$::jsonb,
   'Komplett zone1. Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":13,"unit":"km","zone":"zone1","rest":"0"}]}]}}]$j$::jsonb),
  ('2026-09-07', 'Hügelläufe 8× 45 s', 'interval', 1,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"8× 45 s bergauf","blocks":[{"type":"duration","duration":"45s","zone":"zone4"},{"type":"rest","duration":"2:00"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}}$j$::jsonb,
   'Technik: hohe Kadenz, aktiver Armeinsatz. Pause ist lockeres Runtertraben.',
   $j$[{"label":"Mittelstrecke","description":{"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"8× 10 s maximal bergauf","blocks":[{"type":"duration","duration":"10s","zone":"zone5"},{"type":"rest","duration":"2:30"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}},"notes":"Kurze maximale Sprints statt Kraftausdauer. Volle Pause, Qualität vor Anzahl."}]$j$::jsonb),
  ('2026-09-10', '10-20-30', 'interval', 1,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben"},"sets":[{"label":"Block 1: 5× [30 s / 20 s / 10 s]","blocks":[{"type":"duration","duration":"30s","zone":"zone1"},{"type":"duration","duration":"20s","zone":"zone2"},{"type":"duration","duration":"10s","zone":"zone5"},{"type":"rest","duration":"2:00"}]},{"label":"Block 2: 5× [30 s / 20 s / 10 s]","blocks":[{"type":"duration","duration":"30s","zone":"zone1"},{"type":"duration","duration":"20s","zone":"zone2"},{"type":"duration","duration":"10s","zone":"zone5"},{"type":"rest","duration":"2:00"}]},{"label":"Block 3: 5× [30 s / 20 s / 10 s]","blocks":[{"type":"duration","duration":"30s","zone":"zone1"},{"type":"duration","duration":"20s","zone":"zone2"},{"type":"duration","duration":"10s","zone":"zone5"},{"type":"rest","duration":"2:00"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}}$j$::jsonb,
   'Die 30 s sind wirklich langsam, langsamer als Dauerlauftempo. Die 10 s schnell, aber nicht Vollgas.',
   $j$[]$j$::jsonb),
  ('2026-09-12', 'Longrun', 'long', 2,
   $j${"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":15,"unit":"km","zone":"zone1","rest":"0"}]}]}$j$::jsonb,
   'Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":14,"unit":"km","zone":"zone1","rest":"0"}]}]}}]$j$::jsonb),
  ('2026-09-14', 'Hügelläufe 10× 45 s', 'interval', 1,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"10× 45 s bergauf","blocks":[{"type":"duration","duration":"45s","zone":"zone4"},{"type":"rest","duration":"2:00"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}}$j$::jsonb,
   'Zweite Hügelwoche. Wer letzte Woche am Ende zugemacht hat, läuft die gleiche Anzahl wie beim ersten Mal.',
   $j$[{"label":"Mittelstrecke","description":{"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"10× 10 s maximal bergauf","blocks":[{"type":"duration","duration":"10s","zone":"zone5"},{"type":"rest","duration":"2:30"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}}}]$j$::jsonb),
  ('2026-09-17', '30 s zügig, lange Pause', 'interval', 1,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"8× 30 s zügig","blocks":[{"type":"duration","duration":"30s","zone":"zone5"},{"type":"rest","duration":"2:45"}]}],"cooldown":{"duration":"12min","notes":"locker austraben"}}$j$::jsonb,
   '1500-m-Tempo, nicht Vollgas. Die lange Pause ist der Zweck: die letzte Wiederholung soll aussehen wie die erste. Flache, gerade Strecke ohne Kurven.',
   $j$[]$j$::jsonb),
  ('2026-09-19', 'Longrun', 'long', 2,
   $j${"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":16,"unit":"km","zone":"zone1","rest":"0"}]}]}$j$::jsonb,
   'Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":15,"unit":"km","zone":"zone1","rest":"0"}]}]}}]$j$::jsonb),
  ('2026-09-21', 'Cruise Intervals 3× 8 min', 'tempo', 1,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, 4× 100 m Steigerungen"},"sets":[{"label":"3× 8 min","blocks":[{"type":"duration","duration":"8min","zone":"zone3"},{"type":"rest","duration":"2:00"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}}$j$::jsonb,
   'Schwellentempo, etwa Ein-Stunden-Renntempo. Erstes Intervall gemeinsam kalibrieren.',
   $j$[{"label":"Mittelstrecke","description":{"warmup":{"duration":"15min","notes":"locker eintraben, 4× 100 m Steigerungen"},"sets":[{"label":"3× 8 min","blocks":[{"type":"duration","duration":"8min","zone":"zone3"},{"type":"rest","duration":"2:00"}]}],"cooldown":{"duration":"10min","notes":"locker austraben"}}}]$j$::jsonb),
  ('2026-09-24', '30/30', 'interval', 1,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, 4× 100 m Steigerungen"},"sets":[{"label":"Satz 1: 10× [30 s zügig / 30 s traben]","blocks":[{"type":"duration","duration":"30s","zone":"zone4"},{"type":"duration","duration":"30s","zone":"zone1"},{"type":"rest","duration":"3:00"}]},{"label":"Satz 2: 10× [30 s zügig / 30 s traben]","blocks":[{"type":"duration","duration":"30s","zone":"zone4"},{"type":"duration","duration":"30s","zone":"zone1"},{"type":"rest","duration":"3:00"}]}],"cooldown":{"duration":"12min","notes":"locker austraben"}}$j$::jsonb,
   'Die 30 s Pause werden getrabt, nicht gegangen. Daran hängt der Effekt. Zerfällt der zweite Satz, war der erste zu schnell.',
   $j$[]$j$::jsonb),
  ('2026-09-26', 'Longrun mit progressivem Abschluss', 'long', 2,
   $j${"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":14,"unit":"km","zone":"zone1","rest":"0"},{"type":"reps","reps":1,"distance":3,"unit":"km","zone":"zone2","rest":"0"}]}]}$j$::jsonb,
   'Letzte Kilometer zügig, aber fließend reinlaufen. Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":13,"unit":"km","zone":"zone1","rest":"0"},{"type":"reps","reps":1,"distance":3,"unit":"km","zone":"zone2","rest":"0"}]}]}}]$j$::jsonb),
  ('2026-09-28', 'Entlastung: Lauf-ABC und Steigerungen', 'easy', 2,
   $j${"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"15min","zone":"zone1"},{"type":"reps","reps":6,"distance":100,"unit":"m","zone":"zone5","rest":"60s"}]}],"cooldown":{"duration":"5min","notes":"locker austraben"}}$j$::jsonb,
   'Entlastungswoche. Beine frisch halten, der 3000-m-Test ist am Montag darauf.',
   $j$[{"label":"Mittelstrecke","description":{"warmup":{"duration":"15min","notes":"locker eintraben, Lauf-ABC"},"sets":[{"label":"Hauptteil","blocks":[{"type":"duration","duration":"15min","zone":"zone1"},{"type":"reps","reps":6,"distance":100,"unit":"m","zone":"zone5","rest":"60s"}]}],"cooldown":{"duration":"5min","notes":"locker austraben"}}}]$j$::jsonb),
  ('2026-10-01', 'Lockerer Dauerlauf mit Steigerungen', 'easy', 2,
   $j${"sets":[{"label":"Dauerlauf","blocks":[{"type":"duration","duration":"40min","zone":"zone1"},{"type":"reps","reps":6,"distance":100,"unit":"m","zone":"zone5","rest":"60s"}]}],"cooldown":{"duration":"5min","notes":"locker austraben"}}$j$::jsonb,
   'Nichts beweisen wollen. Wer sich gut fühlt, läuft trotzdem locker. Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[]$j$::jsonb),
  ('2026-10-03', 'Longrun kurz', 'long', 2,
   $j${"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":12,"unit":"km","zone":"zone1","rest":"0"}]}]}$j$::jsonb,
   'Verkürzt wegen Entlastung. Ab Minute 30 auf kohlenhydratreiche Energiezufuhr achten. Gel, Riegel oder isotonisches Getränk.',
   $j$[{"label":"Mittelstrecke","description":{"sets":[{"label":"Langer Lauf","blocks":[{"type":"reps","reps":1,"distance":12,"unit":"km","zone":"zone1","rest":"0"}]}]}}]$j$::jsonb);

COMMIT;
