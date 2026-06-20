<script lang="ts">
	import { ZONE_LABELS } from '$lib/types';

	const zones = Object.entries(ZONE_LABELS) as [string, { name: string; rpe: string }][];

	const zoneColors: Record<string, string> = {
		zone1: '#22c55e',
		zone2: '#84cc16',
		zone3: '#f59e0b',
		zone4: '#f97316',
		zone5: '#ef4444'
	};
</script>

<div class="px-4 py-5">
	<!-- VDOT Embed -->
	<h1 class="mb-4 text-lg font-bold text-zinc-900 dark:text-white">Pace Calculator</h1>
	<div class="mb-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
		<iframe
			src="https://vdoto2.com/calculator/embed"
			width="100%"
			height="1600"
			frameborder="0"
			title="VDOT Pace Calculator"
		></iframe>
	</div>

	<!-- Zone / RPE Tabelle -->
	<h2 class="mb-3 text-base font-semibold text-zinc-900 dark:text-white">Zonen & RPE</h2>
	<div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
		<table class="min-w-full text-sm">
			<thead>
				<tr class="bg-zinc-50 dark:bg-zinc-800">
					<th class="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Zone</th>
					<th class="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Name</th>
					<th class="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">RPE</th>
					<th class="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Daniels</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
				{#each zones as [key, z], i (key)}
					<tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900">
						<td class="px-3 py-2.5">
							<span class="inline-flex items-center gap-1.5">
								<span class="h-2.5 w-2.5 flex-shrink-0 rounded-full" style="background:{zoneColors[key]}"></span>
								<span class="font-mono text-xs font-medium text-zinc-500">Z{i + 1}</span>
							</span>
						</td>
						<td class="px-3 py-2.5 font-medium text-zinc-800 dark:text-zinc-200">{z.name}</td>
						<td class="px-3 py-2.5 text-center">
							<span class="rounded-full px-2 py-0.5 text-xs font-semibold"
								style="background:{zoneColors[key]}22; color:{zoneColors[key]}">
								{z.rpe}
							</span>
						</td>
						<td class="px-3 py-2.5 text-xs text-zinc-400">
							{#if key === 'zone1'}E{:else if key === 'zone2'}M{:else if key === 'zone3'}T{:else if key === 'zone4'}I{:else if key === 'zone5'}R{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-2 text-xs text-zinc-400">RPE 1–10 · LT1 ≈ RPE 3–4 · LT2 ≈ RPE 6–7</p>
</div>
