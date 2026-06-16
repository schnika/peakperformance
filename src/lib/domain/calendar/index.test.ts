import { describe, it, expect } from 'vitest';
import { buildCalendarGrid, prevMonth, nextMonth } from './index';

describe('buildCalendarGrid', () => {
	it('always produces a multiple of 7 cells', () => {
		for (const [y, m] of [[2026, 1], [2026, 6], [2026, 2], [2024, 2]]) {
			const { cells } = buildCalendarGrid(y, m);
			expect(cells.length % 7).toBe(0);
		}
	});

	it('contains exactly daysInMonth non-null cells', () => {
		const { cells } = buildCalendarGrid(2026, 6); // June 2026 has 30 days
		const nonNull = cells.filter((c) => c.date !== null);
		expect(nonNull).toHaveLength(30);
	});

	it('first non-null cell has correct date', () => {
		const { cells } = buildCalendarGrid(2026, 6);
		const first = cells.find((c) => c.date !== null)!;
		expect(first.date).toBe('2026-06-01');
	});

	it('last non-null cell has correct date', () => {
		const { cells } = buildCalendarGrid(2026, 6);
		const last = [...cells].reverse().find((c) => c.date !== null)!;
		expect(last.date).toBe('2026-06-30');
	});

	it('dates are in YYYY-MM-DD format', () => {
		const { cells } = buildCalendarGrid(2026, 1);
		const first = cells.find((c) => c.date !== null)!;
		expect(first.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});

	it('handles February in a leap year', () => {
		const { cells } = buildCalendarGrid(2024, 2); // Feb 2024 = 29 days
		const nonNull = cells.filter((c) => c.date !== null);
		expect(nonNull).toHaveLength(29);
	});

	it('handles February in a non-leap year', () => {
		const { cells } = buildCalendarGrid(2025, 2); // Feb 2025 = 28 days
		const nonNull = cells.filter((c) => c.date !== null);
		expect(nonNull).toHaveLength(28);
	});

	it('first day of week is Monday (index 0 is Mon)', () => {
		// June 2026: June 1 is a Monday
		const { cells } = buildCalendarGrid(2026, 6);
		// The first cell should be June 1 (no padding before)
		expect(cells[0].date).toBe('2026-06-01');
	});
});

describe('prevMonth', () => {
	it('decrements month within a year', () => {
		expect(prevMonth(2026, 6)).toEqual({ year: 2026, month: 5 });
	});

	it('wraps from January to previous December', () => {
		expect(prevMonth(2026, 1)).toEqual({ year: 2025, month: 12 });
	});
});

describe('nextMonth', () => {
	it('increments month within a year', () => {
		expect(nextMonth(2026, 6)).toEqual({ year: 2026, month: 7 });
	});

	it('wraps from December to next January', () => {
		expect(nextMonth(2026, 12)).toEqual({ year: 2027, month: 1 });
	});
});
