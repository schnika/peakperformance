import { pgTable, serial, date, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const trainingSessions = pgTable('training_sessions', {
	id: serial('id').primaryKey(),
	date: date('date').notNull(),
	title: text('title').notNull(),
	type: text('type').notNull(),
	priority: integer('priority').notNull().default(2),
	description: jsonb('description').notNull().default({}),
	notes: text('notes'),
	variations: jsonb('variations').notNull().default([]),
	createdAt: timestamp('created_at').defaultNow()
});
