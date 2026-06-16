// Jack Daniels VDOT-based pace domain
// VDOT calculation uses the Daniels formula; zone paces use the published lookup tables.
// Reference: "Daniels' Running Formula" by Jack Daniels

import { EASY_LONG_PACE } from './easy-long-pace';
import { MARATHON_PACES } from './marathon-pace';
import { THRESHOLD_PACES } from './threshold-paces';
import { INTERVAL_PACES } from './interval-paces';
import { REPETITION_PACES } from './repetition-paces';

export { EASY_LONG_PACE, MARATHON_PACES, THRESHOLD_PACES, INTERVAL_PACES, REPETITION_PACES };

export interface ReferencePerformance {
	distanceMeters: number;
	timeSeconds: number;
}

export interface ZonePaces {
	zone: string;
	paceSecPerKm: number; // central/target pace in sec/km
}

export const REFERENCE_DISTANCES = [
	{ label: '1k', meters: 1000 },
	{ label: '3k', meters: 3000 },
	{ label: '5k', meters: 5000 },
	{ label: '10k', meters: 10000 },
	{ label: 'HM', meters: 21097 },
	{ label: 'M', meters: 42195 }
] as const;

export const WORKOUT_DISTANCES = [
	{ label: '200m', meters: 200 },
	{ label: '400m', meters: 400 },
	{ label: '800m', meters: 800 },
	{ label: '1k', meters: 1000 },
	{ label: '2k', meters: 2000 },
	{ label: '5k', meters: 5000 }
] as const;

const VDOT_MIN = 30;
const VDOT_MAX = 85;

/**
 * Calculates VDOT from a race performance using the Jack Daniels formula.
 */
export function calculateVDOT(distanceMeters: number, timeSeconds: number): number {
	if (distanceMeters <= 0 || timeSeconds <= 0) throw new Error('Distance and time must be positive');

	const minutes = timeSeconds / 60;
	const velocity = distanceMeters / minutes; // meters per minute

	const pct =
		0.8 +
		0.1894393 * Math.exp(-0.012778 * minutes) +
		0.2989558 * Math.exp(-0.1932605 * minutes);

	return (-4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity) / pct;
}

/**
 * Returns the best VDOT from a set of reference performances.
 * Uses the highest VDOT (best performance wins).
 */
export function bestVDOT(performances: ReferencePerformance[]): number | null {
	let best: number | null = null;
	for (const p of performances) {
		try {
			const v = calculateVDOT(p.distanceMeters, p.timeSeconds);
			if (best === null || v > best) best = v;
		} catch {
			// skip invalid entries
		}
	}
	return best;
}

/**
 * Clamps a VDOT float to the nearest integer within the table range (30-85).
 */
export function clampVDOT(vdot: number): number {
	return Math.max(VDOT_MIN, Math.min(VDOT_MAX, Math.round(vdot)));
}

/** Parses a time string "m:ss" or "h:mm:ss" or "ss" into seconds. */
export function parseTime(input: string): number | null {
	const trimmed = input.trim();
	if (!trimmed) return null;

	const parts = trimmed.split(':');
	if (parts.length === 1) {
		const n = parseFloat(parts[0]);
		return isNaN(n) ? null : n;
	}
	if (parts.length === 2) {
		const m = parseInt(parts[0]);
		const s = parseFloat(parts[1]);
		if (isNaN(m) || isNaN(s)) return null;
		return m * 60 + s;
	}
	if (parts.length === 3) {
		const h = parseInt(parts[0]);
		const m = parseInt(parts[1]);
		const s = parseFloat(parts[2]);
		if (isNaN(h) || isNaN(m) || isNaN(s)) return null;
		return h * 3600 + m * 60 + s;
	}
	return null;
}

/** Formats seconds as mm:ss or h:mm:ss */
export function formatTime(totalSeconds: number): string {
	const rounded = Math.round(totalSeconds);
	const h = Math.floor(rounded / 3600);
	const m = Math.floor((rounded % 3600) / 60);
	const s = rounded % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Formats a pace (sec/km) as min:sec/km, or time-for-distance for short distances.
 * Distances < 1000m show the time for the distance itself.
 */
export function formatPace(secPerKm: number, distanceMeters: number): string {
	if (distanceMeters < 1000) {
		return formatTime((secPerKm * distanceMeters) / 1000);
	}
	const m = Math.floor(secPerKm / 60);
	const s = Math.round(secPerKm % 60);
	return `${m}:${String(s).padStart(2, '0')}`;
}

type VDOTKey = string; // "30" through "85"

function key(vdot: number): VDOTKey {
	return String(clampVDOT(vdot));
}

function kmPaceToSecPerKm(paceStr: string | undefined): number | null {
	if (!paceStr) return null;
	return parseTime(paceStr);
}

/**
 * Returns per-km pace (seconds) for each training zone from the Daniels lookup tables.
 *
 * Zone mapping:
 *   zone1 (Recovery)     -> Easy/Long pace + 45 sec/km (slower than easy)
 *   zone2 (Aerobic)      -> Easy/Long pace
 *   zone3 (Steady State) -> Marathon pace
 *   zone4 (Threshold)    -> Threshold pace
 *   zone5 (VO2max)       -> Interval pace
 */
export function getZonePaces(vdot: number): ZonePaces[] {
	const k = key(vdot);

	const easyPace = kmPaceToSecPerKm((EASY_LONG_PACE as Record<string, { km: string }>)[k]?.km) ?? 0;
	const marathonPace = kmPaceToSecPerKm((MARATHON_PACES as Record<string, { km: string }>)[k]?.km) ?? 0;
	const thresholdPace = kmPaceToSecPerKm((THRESHOLD_PACES as Record<string, { km: string }>)[k]?.km) ?? 0;
	const intervalPace = kmPaceToSecPerKm((INTERVAL_PACES as Record<string, { km: string }>)[k]?.km) ?? 0;

	return [
		{ zone: 'zone1', paceSecPerKm: easyPace + 45 },
		{ zone: 'zone2', paceSecPerKm: easyPace },
		{ zone: 'zone3', paceSecPerKm: marathonPace },
		{ zone: 'zone4', paceSecPerKm: thresholdPace },
		{ zone: 'zone5', paceSecPerKm: intervalPace }
	];
}

/**
 * Returns the 200m and 400m repetition times from the Daniels table for a given VDOT.
 * Useful for speed/rep work that goes beyond zone5.
 */
export function getRepetitionPaces(vdot: number): { rep200m: string | null; rep400m: string | null } {
	const k = key(vdot);
	const row = (REPETITION_PACES as Record<string, { '200m': string; '400m': string }>)[k];
	return { rep200m: row?.['200m'] ?? null, rep400m: row?.['400m'] ?? null };
}
