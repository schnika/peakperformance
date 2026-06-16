export interface CalendarCell {
	date: string | null; // ISO YYYY-MM-DD, null for padding cells
	day: number | null;
}

export interface CalendarGrid {
	year: number;
	month: number; // 1-based
	cells: CalendarCell[];
	weekCount: number;
}

/**
 * Builds a Mon–Sun calendar grid for the given year/month.
 * Padding cells (before the 1st and after the last day) have date=null.
 */
export function buildCalendarGrid(year: number, month: number): CalendarGrid {
	const firstDay = new Date(year, month - 1, 1);
	// ISO weekday offset: Mon=0, Tue=1, ..., Sun=6
	const startPad = (firstDay.getDay() + 6) % 7;
	const daysInMonth = new Date(year, month, 0).getDate();
	const totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;

	const cells: CalendarCell[] = [];

	for (let i = 0; i < totalCells; i++) {
		const dayNum = i - startPad + 1;
		if (dayNum < 1 || dayNum > daysInMonth) {
			cells.push({ date: null, day: null });
		} else {
			cells.push({
				date: `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
				day: dayNum
			});
		}
	}

	return { year, month, cells, weekCount: totalCells / 7 };
}

/** Returns the previous month as { year, month }. */
export function prevMonth(year: number, month: number): { year: number; month: number } {
	return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
}

/** Returns the next month as { year, month }. */
export function nextMonth(year: number, month: number): { year: number; month: number } {
	return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
}
