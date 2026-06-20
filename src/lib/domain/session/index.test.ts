import { describe, it, expect } from 'vitest';
import { priorityDots, priorityLabel, isValidDescription, describeBlock } from './index';
import { ZONE_LABELS } from './zones';

describe('priorityDots', () => {
	it('returns 3 filled dots for priority 1', () => {
		expect(priorityDots(1)).toBe('●●●');
	});

	it('returns 2 filled dots for priority 2', () => {
		expect(priorityDots(2)).toBe('●●○');
	});

	it('returns 1 filled dot for priority 3', () => {
		expect(priorityDots(3)).toBe('●○○');
	});
});

describe('priorityLabel', () => {
	it('labels priority 1 as Key session', () => {
		expect(priorityLabel(1)).toBe('Key session');
	});

	it('labels priority 2 as Important', () => {
		expect(priorityLabel(2)).toBe('Important');
	});

	it('labels priority 3 as Optional', () => {
		expect(priorityLabel(3)).toBe('Optional');
	});
});

describe('isValidDescription', () => {
	it('accepts a minimal valid description', () => {
		expect(isValidDescription({ sets: [] })).toBe(true);
	});

	it('accepts a full description with sets and blocks', () => {
		expect(
			isValidDescription({
				warmup: { duration: '15min' },
				sets: [{ label: 'Core Set 1', blocks: [] }],
				cooldown: { duration: '10min' }
			})
		).toBe(true);
	});

	it('rejects null', () => {
		expect(isValidDescription(null)).toBe(false);
	});

	it('rejects missing sets array', () => {
		expect(isValidDescription({ warmup: { duration: '10min' } })).toBe(false);
	});

	it('rejects sets with missing label', () => {
		expect(isValidDescription({ sets: [{ blocks: [] }] })).toBe(false);
	});
});

describe('describeBlock', () => {
	it('describes a rest block', () => {
		expect(describeBlock({ type: 'rest', duration: '3min' }, ZONE_LABELS)).toBe('Rest 3min');
	});

	it('describes a duration block', () => {
		const result = describeBlock(
			{ type: 'duration', duration: '10min', zone: 'zone4' },
			ZONE_LABELS
		);
		expect(result).toContain('10min');
		expect(result).toContain('VO2max-Intervall');
	});

	it('describes a reps block', () => {
		const result = describeBlock(
			{ type: 'reps', reps: 6, distance: 800, unit: 'm', zone: 'zone5', rest: '90s' },
			ZONE_LABELS
		);
		expect(result).toContain('6 × 800m');
		expect(result).toContain('Repetition / Sprint');
		expect(result).toContain('rest 90s');
	});

	it('includes optional pace in reps block', () => {
		const result = describeBlock(
			{ type: 'reps', reps: 4, distance: 400, unit: 'm', zone: 'zone5', rest: '60s', pace: '72s' },
			ZONE_LABELS
		);
		expect(result).toContain('@ 72s');
	});
});
