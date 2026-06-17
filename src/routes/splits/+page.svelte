<script lang="ts">
	import { parseTime, formatTime, REFERENCE_DISTANCES } from '$lib/domain/pace';

	type SplitStrategy = 'even' | 'negative';

	let distanceLabel = $state('5k');
	let targetTimeInput = $state('');
	let strategy = $state<SplitStrategy>('even');
	let firstHalfPct = $state(51);

	const selectedDistance = $derived(
		REFERENCE_DISTANCES.find((d) => d.label === distanceLabel) ?? REFERENCE_DISTANCES[2]
	);

	const targetSeconds = $derived(parseTime(targetTimeInput));

	interface Split {
		label: string;
		seconds: number;
		cumulative: number;
	}

	const splits = $derived.by((): Split[] | null => {
		if (!targetSeconds || targetSeconds <= 0) return null;
		const d = selectedDistance;
		const totalKm = d.meters / 1000;

		if (strategy === 'even') {
			const secPerKm = targetSeconds / totalKm;
			const result: Split[] = [];
			let cum = 0;
			for (let km = 1; km <= Math.floor(totalKm); km++) {
				cum += secPerKm;
				result.push({ label: `${km} km`, seconds: secPerKm, cumulative: cum });
			}
			const remainder = totalKm - Math.floor(totalKm);
			if (remainder > 0.01) {
				const remSec = secPerKm * remainder;
				cum += remSec;
				result.push({ label: `${totalKm.toFixed(1)} km`, seconds: remSec, cumulative: cum });
			}
			return result;
		}

		const halfSeconds = targetSeconds / 2;
		const firstHalf = halfSeconds * (firstHalfPct / 50);
		const secondHalf = targetSeconds - firstHalf;
		const halfMeters = d.meters / 2;
		const secPerKmFirst = firstHalf / (halfMeters / 1000);
		const secPerKmSecond = secondHalf / (halfMeters / 1000);

		const result: Split[] = [];
		let cum = 0;
		const totalKmInt = Math.floor(totalKm);

		for (let km = 1; km <= totalKmInt; km++) {
			const frac = (km * 1000) / d.meters;
			const prevFrac = ((km - 1) * 1000) / d.meters;
			const secThisKm =
				frac <= 0.5 || prevFrac >= 0.5
					? frac <= 0.5
						? secPerKmFirst
						: secPerKmSecond
					: (() => {
							const firstPart = (0.5 - prevFrac) * d.meters;
							const secondPart = 1000 - firstPart;
							return (firstPart / 1000) * secPerKmFirst + (secondPart / 1000) * secPerKmSecond;
						})();
			cum += secThisKm;
			result.push({ label: `${km} km`, seconds: secThisKm, cumulative: cum });
		}

		const remainder = totalKm - totalKmInt;
		if (remainder > 0.01) {
			const remSec = ((remainder * 1000) / 1000) * secPerKmSecond;
			cum += remSec;
			result.push({ label: `${totalKm.toFixed(1)} km`, seconds: remSec, cumulative: cum });
		}

		return result;
	});

	const lapSplits = $derived.by((): Split[] | null => {
		if (!targetSeconds || targetSeconds <= 0 || selectedDistance.meters > 10000) return null;
		const secPerMeter = targetSeconds / selectedDistance.meters;
		const result: Split[] = [];
		let cum = 0;
		const laps = Math.floor(selectedDistance.meters / 400);
		for (let i = 1; i <= laps; i++) {
			const lapSec = 400 * secPerMeter;
			cum += lapSec;
			result.push({ label: `Lap ${i}`, seconds: lapSec, cumulative: cum });
		}
		const rem = selectedDistance.meters % 400;
		if (rem > 0) {
			const remSec = rem * secPerMeter;
			cum += remSec;
			result.push({ label: `+${rem}m`, seconds: remSec, cumulative: cum });
		}
		return result;
	});
</script>

<div class="px-4 py-5">
	<h1 class="mb-1 text-xl font-bold text-zinc-900 dark:text-white">Split Calculator</h1>
	<p class="mb-6 text-sm text-zinc-500">Calculate per-km splits for your target race time.</p>

	<!-- Inputs -->
	<div class="mb-6 space-y-4">
		<!-- Distance -->
		<div>
			<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Distance</p>
			<div class="flex flex-wrap gap-2">
				{#each REFERENCE_DISTANCES as d}
					<button
						onclick={() => (distanceLabel = d.label)}
						class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
							{distanceLabel === d.label
							? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
							: 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}"
					>
						{d.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Target time -->
		<div>
			<label
				for="target-time"
				class="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
				>Target Time</label
			>
			<input
				id="target-time"
				type="text"
				placeholder="m:ss or h:mm:ss"
				bind:value={targetTimeInput}
				class="w-full max-w-xs rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400
					focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
			/>
		</div>

		<!-- Strategy -->
		<div>
			<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Strategy</p>
			<div class="flex gap-2">
				{#each [['even', 'Even'], ['negative', 'Negative split']] as [val, label]}
					<button
						onclick={() => (strategy = val as SplitStrategy)}
						class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
							{strategy === val
							? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
							: 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'}"
					>
						{label}
					</button>
				{/each}
			</div>

			{#if strategy === 'negative'}
				<div class="mt-3">
					<label for="first-half-pct" class="mb-1 block text-xs text-zinc-500">
						First half: <span class="font-semibold text-zinc-700 dark:text-zinc-300"
							>{firstHalfPct}%</span
						>
						/ Second half:
						<span class="font-semibold text-zinc-700 dark:text-zinc-300">{100 - firstHalfPct}%</span
						>
					</label>
					<input
						id="first-half-pct"
						type="range"
						min="50"
						max="55"
						step="1"
						bind:value={firstHalfPct}
						class="w-full max-w-xs"
					/>
				</div>
			{/if}
		</div>
	</div>

	{#if splits}
		<!-- Per-km splits table -->
		<div class="mb-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
			<table class="min-w-full text-sm">
				<thead class="bg-zinc-50 dark:bg-zinc-800">
					<tr>
						<th
							class="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500"
							>Km</th
						>
						<th
							class="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
							>Split</th
						>
						<th
							class="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
							>Cumulative</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
					{#each splits as s}
						<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900">
							<td class="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{s.label}</td>
							<td class="px-4 py-2.5 text-right font-mono text-zinc-800 dark:text-zinc-200"
								>{formatTime(s.seconds)}</td
							>
							<td class="px-4 py-2.5 text-right font-mono text-zinc-500"
								>{formatTime(s.cumulative)}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Lap splits for track distances -->
		{#if lapSplits}
			<h2 class="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">400m Lap Splits</h2>
			<div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
				<table class="min-w-full text-sm">
					<thead class="bg-zinc-50 dark:bg-zinc-800">
						<tr>
							<th
								class="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500"
								>Lap</th
							>
							<th
								class="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
								>Time</th
							>
							<th
								class="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
								>Cumulative</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
						{#each lapSplits as s}
							<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900">
								<td class="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{s.label}</td>
								<td class="px-4 py-2.5 text-right font-mono text-zinc-800 dark:text-zinc-200"
									>{formatTime(s.seconds)}</td
								>
								<td class="px-4 py-2.5 text-right font-mono text-zinc-500"
									>{formatTime(s.cumulative)}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	{:else}
		<div
			class="rounded-xl border border-dashed border-zinc-300 py-12 text-center dark:border-zinc-700"
		>
			<p class="text-sm text-zinc-400">Enter a target time to see splits.</p>
		</div>
	{/if}
</div>
