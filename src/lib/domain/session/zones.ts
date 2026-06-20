import type { Zone } from './index';

export const ZONE_LABELS: Record<Zone, { name: string; rpe: string }> = {
	zone1: { name: 'Easy / Recovery', rpe: '1–3' },
	zone2: { name: 'Marathon', rpe: '4–5' },
	zone3: { name: 'Threshold', rpe: '6–7' },
	zone4: { name: 'VO2max-Intervall', rpe: '8–9' },
	zone5: { name: 'Repetition / Sprint', rpe: '9–10' }
};
