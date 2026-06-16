<script lang="ts">
	import { browser } from '$app/environment';
	import {
		calculateVDOT,
		clampVDOT,
		getZonePaces,
		getRepetitionPaces,
		bestVDOT,
		formatPace,
		formatTime,
		parseTime,
		REFERENCE_DISTANCES,
		WORKOUT_DISTANCES
	} from '$lib/domain/pace';
	import { ZONE_LABELS } from '$lib/types';

	const STORAGE_KEY = 'peakperformance:reference-times';

	let inputs = $state<Record<string, string>>(
		browser ? JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') : {}
	);

	$effect(() => {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
	});

	const vdot = $derived.by(() => {
		const performances = REFERENCE_DISTANCES.flatMap((d) => {
			const raw = inputs[d.label];
			if (!raw) return [];
			const secs = parseTime(raw);
			if (!secs || secs <= 0) return [];
			return [{ distanceMeters: d.meters, timeSeconds: secs }];
		});
		return bestVDOT(performances);
	});

	const vdotInt = $derived(vdot ? clampVDOT(vdot) : null);

	const zonePaces = $derived(vdot ? getZonePaces(vdot) : null);
	const repPaces = $derived(vdotInt ? getRepetitionPaces(vdotInt) : null);

	const paceTable = $derived.by(() => {
		if (!zonePaces) return null;
		return zonePaces.map((zp) => ({
			zone: zp.zone,
			zoneLabel: ZONE_LABELS[zp.zone as keyof typeof ZONE_LABELS],
			distances: WORKOUT_DISTANCES.map((d) => ({
				label: d.label,
				time: formatPace(zp.paceSecPerKm, d.meters)
			}))
		}));
	});
</script>

<div class="px-4 py-5">
	<h1 class="mb-1 text-xl font-bold text-zinc-900 dark:text-white">Pace Calculator</h1>
	<p class="mb-6 text-sm text-zinc-500">Enter your current race times to calculate training paces (Jack Daniels VDOT).</p>

	<!-- Reference time inputs -->
	<div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each REFERENCE_DISTANCES as dist}
			<div>
				<label
					for="ref-{dist.label}"
					class="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500"
				>
					{dist.label}
				</label>
				<input
					id="ref-{dist.label}"
					type="text"
					placeholder="m:ss"
					bind:value={inputs[dist.label]}
					class="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400
						focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
				/>
			</div>
		{/each}
	</div>

	{#if vdotInt}
		<p class="mb-4 text-sm text-zinc-500">
			VDOT: <span class="font-semibold text-zinc-800 dark:text-zinc-200">{vdotInt}</span>
		</p>
	{/if}

	{#if paceTable}
		<!-- Zone pace table -->
		<div class="mb-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
			<table class="min-w-full text-sm">
				<thead class="bg-zinc-50 dark:bg-zinc-800">
					<tr>
						<th class="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Zone</th>
						{#each WORKOUT_DISTANCES as d}
							<th class="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">{d.label}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
					{#each paceTable as row}
						<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900">
							<td class="whitespace-nowrap px-3 py-2.5">
								<span class="font-medium text-zinc-800 dark:text-zinc-200">{row.zoneLabel.name}</span>
								<span class="ml-1.5 text-xs text-zinc-400">RPE {row.zoneLabel.rpe}</span>
							</td>
							{#each row.distances as cell}
								<td class="px-3 py-2.5 text-center font-mono text-xs text-zinc-700 dark:text-zinc-300">
									{cell.time}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Repetition paces (speed work) -->
		{#if repPaces && (repPaces.rep200m || repPaces.rep400m)}
			<div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
				<h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Speed / Repetition</h2>
				<div class="flex gap-6 font-mono text-sm text-zinc-700 dark:text-zinc-300">
					{#if repPaces.rep200m}
						<span><span class="text-xs text-zinc-400">200m</span> {repPaces.rep200m}</span>
					{/if}
					{#if repPaces.rep400m}
						<span><span class="text-xs text-zinc-400">400m</span> {repPaces.rep400m}</span>
					{/if}
				</div>
			</div>
		{/if}

		<p class="mt-3 text-xs text-zinc-400">Times shown per distance. For distances >= 1k: min:sec/km.</p>
	{:else}
		<div class="rounded-xl border border-dashed border-zinc-300 py-12 text-center dark:border-zinc-700">
			<p class="text-sm text-zinc-400">Enter at least one reference time to see your training paces.</p>
		</div>
	{/if}
</div>
