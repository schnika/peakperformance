export type SessionType = 'interval' | 'tempo' | 'easy' | 'long' | 'race' | 'rest';
export type Zone = 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5';
export type BlockUnit = 'm' | 'km';

export interface WarmupBlock {
	duration: string;
	notes?: string;
}

export interface CooldownBlock {
	duration: string;
	notes?: string;
}

export interface DurationBlock {
	type: 'duration';
	duration: string;
	zone: Zone;
}

export interface RepsBlock {
	type: 'reps';
	reps: number;
	distance: number;
	unit: BlockUnit;
	zone: Zone;
	pace?: string;
	rest: string;
}

export interface RestBlock {
	type: 'rest';
	duration: string;
}

export type Block = DurationBlock | RepsBlock | RestBlock;

export interface TrainingSet {
	label: string;
	blocks: Block[];
}

export interface SessionDescription {
	warmup?: WarmupBlock;
	sets: TrainingSet[];
	cooldown?: CooldownBlock;
}

export interface TrainingSession {
	id: number;
	date: string;
	title: string;
	type: SessionType;
	priority: number;
	description: SessionDescription;
	notes: string | null;
	createdAt: Date | null;
}

export const VALID_SESSION_TYPES: SessionType[] = [
	'interval', 'tempo', 'easy', 'long', 'race', 'rest'
];

export const VALID_ZONES: Zone[] = ['zone1', 'zone2', 'zone3', 'zone4', 'zone5'];

/** Returns the display label for a priority value (1=highest). */
export function priorityLabel(priority: number): string {
	if (priority === 1) return 'Key session';
	if (priority === 2) return 'Important';
	return 'Optional';
}

/** Returns filled-dot priority display string (●●●, ●●○, ●○○). */
export function priorityDots(priority: number): string {
	const filled = Math.max(0, 4 - priority); // 1→3, 2→2, 3→1
	return '●'.repeat(filled) + '○'.repeat(Math.max(0, 3 - filled));
}

/** Returns a human-readable description of a single block. */
export function describeBlock(block: Block, zoneLabels: Record<Zone, { name: string; rpe: string }>): string {
	if (block.type === 'rest') return `Rest ${block.duration}`;
	if (block.type === 'duration') {
		const z = zoneLabels[block.zone];
		return `${block.duration} — ${z?.name ?? block.zone} (RPE ${z?.rpe ?? ''})`;
	}
	// reps
	const z = zoneLabels[block.zone];
	const paceStr = block.pace ? ` @ ${block.pace}` : '';
	return `${block.reps} × ${block.distance}${block.unit}${paceStr} — ${z?.name ?? block.zone} (RPE ${z?.rpe ?? ''}) | rest ${block.rest}`;
}

/** Validates that a session description has the required structure. */
export function isValidDescription(desc: unknown): desc is SessionDescription {
	if (!desc || typeof desc !== 'object') return false;
	const d = desc as Record<string, unknown>;
	if (!Array.isArray(d.sets)) return false;
	return d.sets.every(
		(s: unknown) =>
			s && typeof s === 'object' &&
			typeof (s as Record<string, unknown>).label === 'string' &&
			Array.isArray((s as Record<string, unknown>).blocks)
	);
}
