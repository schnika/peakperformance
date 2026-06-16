import { db } from '$lib/server/db';
import { trainingSessions } from '$lib/server/db/schema';
import { and, gte, lte } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { TrainingSession } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
	const yearParam = url.searchParams.get('year');
	const monthParam = url.searchParams.get('month');

	const now = new Date();
	const year = yearParam ? parseInt(yearParam) : now.getFullYear();
	const month = monthParam ? parseInt(monthParam) : now.getMonth() + 1;

	const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
	const lastDay = new Date(year, month, 0).getDate();
	const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

	const rows = await db
		.select()
		.from(trainingSessions)
		.where(and(gte(trainingSessions.date, startDate), lte(trainingSessions.date, endDate)))
		.orderBy(trainingSessions.date);

	return {
		sessions: rows as TrainingSession[],
		year,
		month
	};
};
