import { describe, it, expect } from 'vitest';
import {
	calculateVDOT,
	clampVDOT,
	getZonePaces,
	getRepetitionPaces,
	bestVDOT,
	formatTime,
	formatPace,
	parseTime
} from './index';

describe('calculateVDOT', () => {
	it('returns ~49.6 VDOT for a 20:00 5k', () => {
		// Jack Daniels table: 5k 19:57 === VDOT 50
		const vdot = calculateVDOT(5000, 20 * 60);
		expect(vdot).toBeCloseTo(49.6, 0);
	});

	it('returns ~60 VDOT for a 17:03 5k', () => {
		// Jack Daniels table: 5k 17:03 = VDOT 60
		const vdot = calculateVDOT(5000, 17 * 60 + 3);
		expect(vdot).toBeCloseTo(60, 0);
	});

	it('throws on zero distance', () => {
		expect(() => calculateVDOT(0, 300)).toThrow();
	});

	it('throws on zero time', () => {
		expect(() => calculateVDOT(5000, 0)).toThrow();
	});

	it('higher VDOT for faster time over same distance', () => {
		expect(calculateVDOT(5000, 18 * 60)).toBeGreaterThan(calculateVDOT(5000, 25 * 60));
	});
});

describe('clampVDOT', () => {
	it('rounds to nearest integer', () => {
		expect(clampVDOT(49.6)).toBe(50);
		expect(clampVDOT(49.3)).toBe(49);
	});

	it('clamps below 30 to 30', () => {
		expect(clampVDOT(20)).toBe(30);
	});

	it('clamps above 85 to 85', () => {
		expect(clampVDOT(90)).toBe(85);
	});
});

describe('getZonePaces', () => {
	it('returns 5 zone entries', () => {
		expect(getZonePaces(50)).toHaveLength(5);
	});

	it('zone keys are zone1 through zone5', () => {
		const zones = getZonePaces(50).map((z) => z.zone);
		expect(zones).toEqual(['zone1', 'zone2', 'zone3', 'zone4', 'zone5']);
	});

	it('zones are ordered slowest to fastest (zone1 > zone5 in sec/km)', () => {
		const zones = getZonePaces(50);
		for (let i = 1; i < zones.length; i++) {
			expect(zones[i].paceSecPerKm).toBeLessThan(zones[i - 1].paceSecPerKm);
		}
	});

	it('zone1 is slower than zone2 (recovery offset applied)', () => {
		const [z1, z2] = getZonePaces(60);
		expect(z1.paceSecPerKm).toBeGreaterThan(z2.paceSecPerKm);
		expect(z1.paceSecPerKm - z2.paceSecPerKm).toBe(45);
	});

	it('returns non-zero paces for VDOT 50', () => {
		for (const z of getZonePaces(50)) {
			expect(z.paceSecPerKm).toBeGreaterThan(0);
		}
	});

	it('higher VDOT -> faster paces across all zones', () => {
		const low = getZonePaces(40);
		const high = getZonePaces(70);
		for (let i = 0; i < 5; i++) {
			expect(high[i].paceSecPerKm).toBeLessThan(low[i].paceSecPerKm);
		}
	});
});

describe('getRepetitionPaces', () => {
	it('returns 200m and 400m rep times for VDOT 60', () => {
		const { rep200m, rep400m } = getRepetitionPaces(60);
		expect(rep200m).toBeTruthy();
		expect(rep400m).toBeTruthy();
	});

	it('rep 400m is faster than interval 400m for same VDOT', () => {
		const { rep400m } = getRepetitionPaces(60);
		// Interval pace for VDOT 60: zone5 from getZonePaces
		const intervalKmPace = getZonePaces(60).find((z) => z.zone === 'zone5')!.paceSecPerKm;
		const interval400mSecs = (intervalKmPace * 400) / 1000;
		const rep400mSecs = parseTime(rep400m!)!;
		expect(rep400mSecs).toBeLessThan(interval400mSecs);
	});
});

describe('bestVDOT', () => {
	it('returns null for empty array', () => {
		expect(bestVDOT([])).toBeNull();
	});

	it('picks the highest VDOT from multiple performances', () => {
		const result = bestVDOT([
			{ distanceMeters: 5000, timeSeconds: 20 * 60 }, // ~49.6 VDOT
			{ distanceMeters: 10000, timeSeconds: 46 * 60 } // ~44 VDOT
		]);
		expect(result).toBeGreaterThan(48);
	});

	it('ignores invalid entries', () => {
		const result = bestVDOT([
			{ distanceMeters: 0, timeSeconds: 300 }, // invalid
			{ distanceMeters: 5000, timeSeconds: 20 * 60 }
		]);
		expect(result).not.toBeNull();
	});
});

describe('formatTime', () => {
	it('formats under an hour as m:ss', () => {
		expect(formatTime(3 * 60 + 45)).toBe('3:45');
	});

	it('formats >= 1 hour as h:mm:ss', () => {
		expect(formatTime(3600 + 5 * 60 + 9)).toBe('1:05:09');
	});

	it('pads single-digit seconds', () => {
		expect(formatTime(5 * 60 + 7)).toBe('5:07');
	});

	it('rounds fractional seconds', () => {
		expect(formatTime(60.4)).toBe('1:00');
	});
});

describe('formatPace', () => {
	it('shows distance time for distances < 1000m', () => {
		// 240 sec/km -> 400m -> 96s -> 1:36
		expect(formatPace(240, 400)).toBe('1:36');
	});

	it('shows min:sec/km for distances >= 1000m', () => {
		expect(formatPace(240, 1000)).toBe('4:00');
	});

	it('pads seconds correctly', () => {
		expect(formatPace(4 * 60 + 5, 1000)).toBe('4:05');
	});
});

describe('parseTime', () => {
	it('parses m:ss format', () => {
		expect(parseTime('3:45')).toBe(3 * 60 + 45);
	});

	it('parses h:mm:ss format', () => {
		expect(parseTime('1:05:30')).toBe(3600 + 5 * 60 + 30);
	});

	it('parses raw seconds', () => {
		expect(parseTime('300')).toBe(300);
	});

	it('returns null for empty string', () => {
		expect(parseTime('')).toBeNull();
	});

	it('returns null for invalid input', () => {
		expect(parseTime('abc')).toBeNull();
	});

	it('trims whitespace', () => {
		expect(parseTime('  4:00  ')).toBe(240);
	});
});
