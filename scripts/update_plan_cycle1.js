#!/usr/bin/env node
/**
 * 4-Week Cycle Refresh — Prio 1/2 sessions + Beginner variations
 * Run locally: node scripts/update_plan_cycle1.js
 * Requires DATABASE_URL in env.
 */

const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
	console.error('DATABASE_URL not set');
	process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// ---------------------------------------------------------------------------
// Session definitions
// Each entry: id, title, type, notes, description, variations
// ---------------------------------------------------------------------------

const SESSIONS = [
	// =========================================================================
	// WEEK 1
	// =========================================================================

	{
		// Mon Jun 22 — was: 2×15 min zone4 (boring blocks)
		id: 1,
		title: 'Schwellen-Kombo',
		type: 'tempo',
		notes:
			'3 Aufbau-Kilometer → jeder km startet bei zone3-Gefühl, die letzten 200 m darf man anziehen. ' +
			'5×200 m zone3 sind aktive Erholung, kein Sprint. ' +
			'Dann 2 ehrliche Schwellen-km zum Abschluss. KH 60–80 g/h – Verpflegung in der Pause.',
		description: {
			warmup: { duration: '15min', notes: 'easy jog GA1' },
			sets: [
				{
					label: 'Aufbau-km — Progression (Ø Schwelle)',
					blocks: [{ type: 'reps', reps: 3, distance: 1000, unit: 'm', zone: 'zone4', rest: '90s' }]
				},
				{
					label: 'Sub-Schwelle Floats',
					blocks: [{ type: 'reps', reps: 5, distance: 200, unit: 'm', zone: 'zone3', rest: '30s' }]
				},
				{
					label: 'Schwellen-Abschluss',
					blocks: [{ type: 'reps', reps: 2, distance: 1000, unit: 'm', zone: 'zone4', rest: '90s' }]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '15min', notes: 'easy jog GA1' },
					sets: [
						{
							label: 'Schwellen-Einführung 3×6 min zone3',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '6min' },
								{ type: 'rest', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '6min' },
								{ type: 'rest', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '6min' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'3×6 min im Steady-State/GA2-Bereich – ehrlich aber kontrollierbar. ' +
					'Das Tempo fühlt sich anstrengend an, aber du könntest noch kurze Sätze sprechen. ' +
					'Das ist deine Schwelle für heute – nicht die der Gruppe.'
			}
		]
	},

	{
		// Thu Jun 25 — was: 5×8 min zone4 (pure reps)
		id: 4,
		title: 'Bergläufe + Schwellen-Finish',
		type: 'interval',
		notes:
			'Bergläufe sind die ehrlichsten Intervalle – kein Betrug möglich. ' +
			'Zone4 bergauf = RPE 8 (bergauf immer anstrengender als flach). ' +
			'Abstieg locker zurücktraben (~4 min). Nach der letzten Berg-Rep kurz sammeln, ' +
			'dann 2 km Schwelle auf dem Flachen – Beine werden sich schwerer anfühlen als gewohnt. ' +
			'KH-Versorgung nicht vergessen.',
		description: {
			warmup: { duration: '15min', notes: 'easy jog' },
			sets: [
				{
					label: 'Bergläufe — 5×5 min bergauf (Abstieg joggen ~4 min)',
					blocks: [
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' }
					]
				},
				{
					label: 'Flacher Schwellen-Abschluss',
					blocks: [{ type: 'reps', reps: 2, distance: 1000, unit: 'm', zone: 'zone4', rest: '90s' }]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '15min', notes: 'easy jog' },
					sets: [
						{
							label: 'Bergläufe — 5×3 min zone3 (Abstieg gehen)',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'Bergauf zone3 fühlt sich wie zone4 auf dem Flachen an – das ist richtig so. ' +
					'Abstieg komplett gehen und durchatmen. ' +
					'5 Runden sind das Ziel – 4 ist auch ein voller Erfolg. Kein Flach-Abschluss für Einsteiger.'
			}
		]
	},

	{
		// Sat Jun 27 — was: 80 min zone2 straight
		id: 6,
		title: 'Langer Lauf · 80 min – Progression',
		type: 'long',
		notes:
			'Die ersten 60 min komplett locker – kein Stress, kein Tempo. ' +
			'Die letzten 20 min darf das Tempo ehrlich ansteigen auf GA2/zone3. ' +
			'Wer merkt, dass er in zone3 nicht mehr kann, hat in zone2 zu schnell begonnen. ' +
			'Hydration! Sommer-Tipp: Trinkpausen nach 30 und 60 min einbauen.',
		description: {
			sets: [
				{
					label: 'Grundlage',
					blocks: [{ type: 'duration', zone: 'zone2', duration: '60min' }]
				},
				{
					label: 'Tempoprogression',
					blocks: [{ type: 'duration', zone: 'zone3', duration: '20min' }]
				}
			]
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					sets: [
						{
							label: 'Langer Lauf',
							blocks: [{ type: 'duration', zone: 'zone2', duration: '65min' }]
						}
					]
				},
				notes:
					'65 min zone2 – kein Tempo-Push. Einfach die Zeit auf den Beinen sammeln. ' +
					'Locker und geduldig bleiben. 65 Minuten kontinuierlich laufen ist ein starkes Ergebnis!'
			}
		]
	},

	// =========================================================================
	// WEEK 2
	// =========================================================================

	{
		// Mon Jun 29 — was: 3×12 min zone4 (standard blocks)
		id: 8,
		title: 'Berg-Tempo · 6×5 min',
		type: 'interval',
		notes:
			'Die Schlüsseleinheit dieser Woche. 6 Bergläufe á 5 min – ' +
			'das sind 30 Min Qualitätsarbeit auf dem Hügel. ' +
			'Zone4 bergauf = RPE 8 (aber ehrlich bergauf anstrengend). ' +
			'Abstieg als Erholung locker traben (~4–5 min). ' +
			'Beine werden nach Rep 4 brennen – das soll so sein. KH 60–80 g/h.',
		description: {
			warmup: { duration: '15min', notes: 'easy jog GA1' },
			sets: [
				{
					label: 'Bergläufe — 6×5 min bergauf (Abstieg joggen ~4 min)',
					blocks: [
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' },
						{ type: 'rest', duration: '~4min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' }
					]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '15min', notes: 'easy jog GA1' },
					sets: [
						{
							label: 'Bergläufe — 5×3-4 min zone3 (Abstieg gehen)',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'5 Bergläufe á 4 min ist das Ziel – wer auf 3 min kürzen muss, macht das. ' +
					'Zone3 bergauf ist intensiv genug. Abstieg wirklich gehen – nicht joggen. Das ist Erholung, kein Zeitverlust.'
			}
		]
	},

	{
		// Thu Jul 2 — was: 35 min zone4 fartlek (vague)
		id: 11,
		title: 'Struktur-Fahrtspiel',
		type: 'interval',
		notes:
			'Gruppeneinheit neu gedacht: Aufbauphase mit 5 geführten Temposchüben ' +
			'(wer führt, bestimmt die 3-min-Attacke), dann locker 2 min als Gruppe. ' +
			'Sprint-Finale: 3 kurze Maximalschübe – Volle Attacke, dann tief durchatmen. ' +
			'Keine Uhr für die Schübe nötig – einfach anziehen wenn der Leader anzieht!',
		description: {
			warmup: { duration: '15min', notes: 'easy jog' },
			sets: [
				{
					label: 'Aufbauphase — 5×(3 min zone4 + 2 min zone2)',
					blocks: [
						{ type: 'duration', zone: 'zone4', duration: '3min' },
						{ type: 'duration', zone: 'zone2', duration: '2min' },
						{ type: 'duration', zone: 'zone4', duration: '3min' },
						{ type: 'duration', zone: 'zone2', duration: '2min' },
						{ type: 'duration', zone: 'zone4', duration: '3min' },
						{ type: 'duration', zone: 'zone2', duration: '2min' },
						{ type: 'duration', zone: 'zone4', duration: '3min' },
						{ type: 'duration', zone: 'zone2', duration: '2min' },
						{ type: 'duration', zone: 'zone4', duration: '3min' }
					]
				},
				{
					label: 'Sprint-Finale — 3×(1 min zone5 + 2 min zone2)',
					blocks: [
						{ type: 'duration', zone: 'zone5', duration: '1min' },
						{ type: 'duration', zone: 'zone2', duration: '2min' },
						{ type: 'duration', zone: 'zone5', duration: '1min' },
						{ type: 'duration', zone: 'zone2', duration: '2min' },
						{ type: 'duration', zone: 'zone5', duration: '1min' }
					]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '15min', notes: 'easy jog' },
					sets: [
						{
							label: 'Fahrtspiel — 6×(3 min zone3 + 2 min zone2)',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'duration', zone: 'zone2', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'duration', zone: 'zone2', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'duration', zone: 'zone2', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'duration', zone: 'zone2', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' },
								{ type: 'duration', zone: 'zone2', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '3min' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'zone3-Schübe – spürbar intensiv aber kein Vollangriff. ' +
					'Die 2 min zone2 sind echte Erholung: Tempo wirklich herausnehmen! ' +
					'Als Gruppe läuft man hinterher – kein Vergleich, eigenes Tempo.'
			}
		]
	},

	{
		// Sat Jul 4 — was: 90 min zone2 straight
		id: 13,
		title: 'Langer Lauf · 90 min – Negativsplit',
		type: 'long',
		notes:
			'Negativsplit: die zweite Hälfte schneller als die erste. ' +
			'Die ersten 65 min wirklich locker – zone2 und geduldig. ' +
			'Die letzten 20 min zone3 und die finalen 5 min richtig anziehen auf Schwelle. ' +
			'Wer nach 65 min noch frisch ist, hat es richtig gemacht. ' +
			'Trinkpause nach 30 und 60 min – Verpflegung nicht vergessen!',
		description: {
			sets: [
				{
					label: 'Grundlage',
					blocks: [{ type: 'duration', zone: 'zone2', duration: '65min' }]
				},
				{
					label: 'Negativsplit-Finale',
					blocks: [
						{ type: 'duration', zone: 'zone3', duration: '20min' },
						{ type: 'duration', zone: 'zone4', duration: '5min' }
					]
				}
			]
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					sets: [
						{
							label: 'Langer Lauf',
							blocks: [{ type: 'duration', zone: 'zone2', duration: '75min' }]
						}
					]
				},
				notes:
					'75 min zone2 – kein Push, keine Progression. ' +
					'Einfach die Zeit auf den Beinen sammeln. ' +
					'Wer nach 70 min noch Energie hat, darf 5 min zone3 dranhängen – aber kein Muss.'
			}
		]
	},

	// =========================================================================
	// WEEK 3 (Peak Load)
	// =========================================================================

	{
		// Mon Jul 6 — was: 25 min continuous zone4 (single block)
		id: 15,
		title: '3+5+3 Kombo · Schwelle',
		type: 'tempo',
		notes:
			'Die Königskombo: 3 Progressions-km (ersten 600 m zone3, letzten 400 m zone4+), ' +
			'kurze aktive Pause mit 5×200 m sub-Schwelle, ' +
			'dann 3 echte Schwellen-km zum Abschluss. ' +
			'Das ist mehr Arbeit als 25 min am Stück – und viel interessanter. Gut einteilen!',
		description: {
			warmup: { duration: '15min', notes: 'easy jog GA1' },
			sets: [
				{
					label: 'Progression 3×1 km (Ø Schwelle — ersten 600 m zone3, letzte 400 m zone4+)',
					blocks: [{ type: 'reps', reps: 3, distance: 1000, unit: 'm', zone: 'zone4', rest: '90s' }]
				},
				{
					label: 'Sub-Schwelle Floats 5×200 m (aktive Erholung)',
					blocks: [{ type: 'reps', reps: 5, distance: 200, unit: 'm', zone: 'zone3', rest: '30s' }]
				},
				{
					label: 'Schwellen-Abschluss 3×1 km',
					blocks: [{ type: 'reps', reps: 3, distance: 1000, unit: 'm', zone: 'zone4', rest: '90s' }]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '15min', notes: 'easy jog GA1' },
					sets: [
						{
							label: 'Aufbau 3×7 min zone3',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '7min' },
								{ type: 'rest', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '7min' },
								{ type: 'rest', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '7min' }
							]
						},
						{
							label: 'Sub-Schwelle Floats 4×150 m',
							blocks: [
								{ type: 'reps', reps: 4, distance: 150, unit: 'm', zone: 'zone3', rest: '30s' }
							]
						},
						{
							label: 'Abschluss 2×7 min zone3',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '7min' },
								{ type: 'rest', duration: '2min' },
								{ type: 'duration', zone: 'zone3', duration: '7min' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'Einsteiger-Version der 3+5+3: 7-Min-Blöcke statt km, zone3 statt zone4. ' +
					'Die 4×150 m sind der Wechsel – kurz beschleunigen, dann wieder locker. ' +
					'Wer die letzte 2×7 min nicht mehr schafft, macht nur 1×7 min. Das ist kein Versagen.'
			}
		]
	},

	{
		// Thu Jul 9 — was: 3×15 min zone3 (sub-threshold blocks)
		id: 18,
		title: 'Bergläufe + Sub-Schwelle',
		type: 'interval',
		notes:
			'Längere Berg-Reps: 4×6 min bergauf im zone3-Tempo (RPE 7 bergauf fühlt sich wie RPE 8 flach an). ' +
			'Abstieg locker traben. Dann 2×10 min Flat sub-Schwelle – Blöcke, die sich ' +
			'geläufiger anfühlen als die Bergversion aber trotzdem ehrlich sind. RPE 6–7.',
		description: {
			warmup: { duration: '15min', notes: 'easy jog' },
			sets: [
				{
					label: 'Bergläufe — 4×6 min zone3 bergauf (Abstieg joggen ~5 min)',
					blocks: [
						{ type: 'duration', zone: 'zone3', duration: '6min' },
						{ type: 'rest', duration: '~5min' },
						{ type: 'duration', zone: 'zone3', duration: '6min' },
						{ type: 'rest', duration: '~5min' },
						{ type: 'duration', zone: 'zone3', duration: '6min' },
						{ type: 'rest', duration: '~5min' },
						{ type: 'duration', zone: 'zone3', duration: '6min' }
					]
				},
				{
					label: 'Flache Sub-Schwelle-Blöcke',
					blocks: [
						{ type: 'duration', zone: 'zone3', duration: '10min' },
						{ type: 'rest', duration: '3min' },
						{ type: 'duration', zone: 'zone3', duration: '10min' }
					]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '15min', notes: 'easy jog' },
					sets: [
						{
							label: 'Bergläufe — 4×4 min zone3 (Abstieg gehen)',
							blocks: [
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' },
								{ type: 'rest', duration: '~5min' },
								{ type: 'duration', zone: 'zone3', duration: '4min' }
							]
						},
						{
							label: 'Erholungsblöcke Flach',
							blocks: [
								{ type: 'duration', zone: 'zone2', duration: '8min' },
								{ type: 'rest', duration: '3min' },
								{ type: 'duration', zone: 'zone2', duration: '8min' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'4×4 min bergauf zone3 – kürzer als die Gruppe, aber vollwertig intensiv. ' +
					'Abstieg wirklich gehen. Die 2×8 min danach in zone2 sind Bewegung mit Erholung – kein Druck.'
			}
		]
	},

	{
		// Sat Jul 11 — was: 80 min zone2 + 20 min zone3 (already structured, enhance it)
		id: 20,
		title: 'Langer Lauf · 100 min – Peakwoche',
		type: 'long',
		notes:
			'Der härteste Lauf des gesamten Zyklus. Die ersten 75 min komplett locker – kein Abkürzen bei zone2. ' +
			'15 min zone3 ist der komfortabel-unbequeme Teil. ' +
			'Die finalen 10 min zone4: nur wenn es sich wirklich gut anfühlt – wer auslässt, macht keinen Fehler. ' +
			'Danach: Beine hochlegen, essen, schlafen. Verpflegung während des Laufs ist Pflicht.',
		description: {
			sets: [
				{
					label: 'Grundlage',
					blocks: [{ type: 'duration', zone: 'zone2', duration: '75min' }]
				},
				{
					label: 'Marathon-Tempo',
					blocks: [{ type: 'duration', zone: 'zone3', duration: '15min' }]
				},
				{
					label: 'Schwellen-Push (optional — nur wenn frisch)',
					blocks: [{ type: 'duration', zone: 'zone4', duration: '10min' }]
				}
			]
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					sets: [
						{
							label: 'Langer Lauf',
							blocks: [{ type: 'duration', zone: 'zone2', duration: '80min' }]
						}
					]
				},
				notes:
					'80 min zone2 – das ist die Einsteiger-Peakeinheit. Wer sich nach 75 min noch frisch fühlt, ' +
					'darf 10 min zone3 dranhängen. Kein Muss. Danach Beine hoch und gut essen!'
			}
		]
	},

	// =========================================================================
	// WEEK 4 (Taper)
	// =========================================================================

	{
		// Mon Jul 13 — was: 8×3 min zone4 (too much for taper)
		id: 22,
		title: 'Aktiv-Impuls · 3+5',
		type: 'interval',
		notes:
			'Taperwoche – kein Volumen, aber Qualität halten. ' +
			'3 km Schwelle + 5 kurze zone5-Sprints halten das Nervensystem scharf ohne zu ermüden. ' +
			'Kürzer als die Vorwochen, aber nicht weniger intensiv in den einzelnen Reps. ' +
			'Beine sollten sich danach frisch anfühlen – nicht platt.',
		description: {
			warmup: { duration: '15min', notes: 'easy jog' },
			sets: [
				{
					label: '1-km-Blöcke Schwelle',
					blocks: [{ type: 'reps', reps: 3, distance: 1000, unit: 'm', zone: 'zone4', rest: '90s' }]
				},
				{
					label: 'VO2-Kurzsprints',
					blocks: [{ type: 'reps', reps: 5, distance: 200, unit: 'm', zone: 'zone5', rest: '60s' }]
				}
			],
			cooldown: { duration: '10min', notes: 'easy jog' }
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					warmup: { duration: '10min', notes: 'easy jog' },
					sets: [
						{
							label: '800-m-Blöcke',
							blocks: [
								{ type: 'reps', reps: 3, distance: 800, unit: 'm', zone: 'zone3', rest: '90s' }
							]
						},
						{
							label: 'Abschluss-Strides',
							blocks: [
								{ type: 'reps', reps: 4, distance: 150, unit: 'm', zone: 'zone4', rest: '60s' }
							]
						}
					],
					cooldown: { duration: '10min', notes: 'easy jog' }
				},
				notes:
					'Taperwoche Einsteiger: kürzer, etwas lockerer. ' +
					'Die 4 Strides am Ende aktivieren die Schnelligkeit ohne zu ermüden. ' +
					'Beine sollten sich danach besser anfühlen als vorher.'
			}
		]
	},

	{
		// Thu Jul 16 — was: 30 min zone2 + 6×80 m zone4 strides
		id: 25,
		title: 'Strides + Bergsprints · Aktivierung',
		type: 'easy',
		notes:
			'Letzte intensive Aktivierung vor dem Zyklusende. Easy run + Flat Strides + kurze Bergsprints ' +
			'halten die Beinschnelligkeit aktiv ohne zu ermüden. ' +
			'Die 4 Bergsprints sind je 20 Sekunden Vollangriff – nicht schnell, sondern 100%. ' +
			'Danach gehen, durchatmen, erholen. Gruppeneinheit – entspannt und spielerisch.',
		description: {
			sets: [
				{
					label: 'Easy Run',
					blocks: [{ type: 'duration', zone: 'zone2', duration: '30min' }]
				},
				{
					label: 'Flat Strides',
					blocks: [{ type: 'reps', reps: 4, distance: 80, unit: 'm', zone: 'zone5', rest: '60s' }]
				},
				{
					label: 'Bergsprints — 4×20 s bergauf (gehen Abstieg)',
					blocks: [
						{ type: 'duration', zone: 'zone5', duration: '20s' },
						{ type: 'rest', duration: '~60s' },
						{ type: 'duration', zone: 'zone5', duration: '20s' },
						{ type: 'rest', duration: '~60s' },
						{ type: 'duration', zone: 'zone5', duration: '20s' },
						{ type: 'rest', duration: '~60s' },
						{ type: 'duration', zone: 'zone5', duration: '20s' }
					]
				}
			]
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					sets: [
						{
							label: 'Easy Run',
							blocks: [{ type: 'duration', zone: 'zone2', duration: '30min' }]
						},
						{
							label: 'Strides (zone4 statt zone5)',
							blocks: [{ type: 'reps', reps: 4, distance: 80, unit: 'm', zone: 'zone4', rest: '60s' }]
						}
					]
				},
				notes:
					'Lockerer Abschluss der Woche. Die 4 Strides dürfen sich flott anfühlen – aber kein Vollangriff. ' +
					'Wer die Bergsprints machen möchte: 2–4 kurze Hügelsprints gerne dranhängen. Keine Pflicht.'
			}
		]
	},

	{
		// Sat Jul 18 — was: 60 min zone2 (taper)
		id: 27,
		title: 'Langer Lauf · 60 min + Strides',
		type: 'long',
		notes:
			'Taperwoche – 50 min easy, dann 4 kurze Strides für die Beinschnelligkeit. ' +
			'Der gesamte Lauf fühlt sich locker an. ' +
			'Nach 4 harten Wochen: genießen! Frischer Kopf, frische Beine.',
		description: {
			sets: [
				{
					label: 'Easy Run',
					blocks: [{ type: 'duration', zone: 'zone2', duration: '50min' }]
				},
				{
					label: 'Abschluss-Strides',
					blocks: [{ type: 'reps', reps: 4, distance: 100, unit: 'm', zone: 'zone5', rest: '60s' }]
				}
			]
		},
		variations: [
			{
				label: 'Einsteiger',
				description: {
					sets: [
						{
							label: 'Easy Run',
							blocks: [{ type: 'duration', zone: 'zone2', duration: '55min' }]
						}
					]
				},
				notes:
					'55 Minuten zone2 – kein Druck, kein Push. ' +
					'Die Beine erholen sich gerade. Das ist ein Genuss-Lauf zum Abschluss des Zyklus!'
			}
		]
	}
];

// ---------------------------------------------------------------------------
// Execute updates
// ---------------------------------------------------------------------------

async function run() {
	console.log(`Updating ${SESSIONS.length} sessions...\n`);

	for (const s of SESSIONS) {
		const descJson = JSON.stringify(s.description);
		const varJson = JSON.stringify(s.variations);

		await sql`
      UPDATE training_sessions
      SET
        title       = ${s.title},
        type        = ${s.type},
        notes       = ${s.notes},
        description = ${descJson}::jsonb,
        variations  = ${varJson}::jsonb
      WHERE id = ${s.id}
    `;

		console.log(`✓ ID ${s.id} — ${s.title}`);
	}

	console.log('\nDone! All sessions updated.');
}

run().catch((e) => {
	console.error('Error:', e.message);
	process.exit(1);
});
