// Re-export domain types for convenience
export type {
	SessionType,
	Zone,
	Block,
	DurationBlock,
	RepsBlock,
	RestBlock,
	TrainingSet,
	SessionDescription,
	SessionVariation,
	TrainingSession,
	WarmupBlock,
	CooldownBlock
} from '$lib/domain/session';

export const ZONE_LABELS: Record<string, { name: string; rpe: string }> = {
	zone1: { name: 'Easy / Recovery', rpe: '1–3' },
	zone2: { name: 'Marathon', rpe: '4–5' },
	zone3: { name: 'Threshold', rpe: '6–7' },
	zone4: { name: 'VO2max-Intervall', rpe: '8–9' },
	zone5: { name: 'Repetition / Sprint', rpe: '9–10' }
};

export const SESSION_TYPE_COLORS: Record<string, string> = {
	interval: 'bg-red-500',
	tempo: 'bg-orange-500',
	easy: 'bg-green-500',
	long: 'bg-blue-500',
	race: 'bg-purple-500',
	rest: 'bg-zinc-400'
};

export const SESSION_TYPE_BG_COLORS: Record<string, string> = {
	interval: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300',
	tempo: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300',
	easy: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300',
	long: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
	race: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
	rest: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
};
