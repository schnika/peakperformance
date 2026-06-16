<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { buildCalendarGrid, nextMonth, prevMonth } from '$lib/domain/calendar';
	import {
		SESSION_TYPE_COLORS,
		SESSION_TYPE_BG_COLORS,
		ZONE_LABELS,
		type TrainingSession,
		type SessionDescription,
		type Block
	} from '$lib/types';
	import { describeBlock } from '$lib/domain/session';

	let { data } = $props();

	const MONTH_NAMES = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	let selectedSession = $state<TrainingSession | null>(null);
	let drawerOpen = $state(false);
	const selectedDesc = $derived(selectedSession?.description as SessionDescription | null);

	function navigate(delta: number) {
		const { year, month } = delta < 0
			? prevMonth(data.year, data.month)
			: nextMonth(data.year, data.month);
		goto(`/?year=${year}&month=${month}`);
	}

	function openDrawer(session: TrainingSession) {
		selectedSession = session;
		drawerOpen = true;
	}

	function closeDrawer() {
		drawerOpen = false;
		selectedSession = null;
	}

	const calendarDays = $derived.by(() => {
		const grid = buildCalendarGrid(data.year, data.month);
		return grid.cells.map((cell) => ({
			...cell,
			sessions: cell.date ? data.sessions.filter((s) => s.date === cell.date) : []
		}));
	});

	function priorityDots(priority: number): string {
		const filled = 4 - priority;
		return '●'.repeat(filled) + '○'.repeat(3 - filled);
	}

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr + 'T00:00:00');
		return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
	}

	function descBlock(block: Block): string {
		return describeBlock(block, ZONE_LABELS);
	}

	const today = new Date().toISOString().slice(0, 10);
</script>

<div class="px-3 py-4">
	<!-- Header -->
	<div class="mb-4 flex items-center justify-between">
		<button
			onclick={() => navigate(-1)}
			class="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
			aria-label="Previous month"
		>
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6" />
			</svg>
		</button>

		<h1 class="text-lg font-semibold text-zinc-900 dark:text-white">
			{MONTH_NAMES[data.month - 1]} {data.year}
		</h1>

		<button
			onclick={() => navigate(1)}
			class="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
			aria-label="Next month"
		>
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</button>
	</div>

	<!-- Day names -->
	<div class="mb-1 grid grid-cols-7 gap-px">
		{#each DAY_NAMES as d}
			<div class="py-1 text-center text-xs font-medium text-zinc-400">{d}</div>
		{/each}
	</div>

	<!-- Calendar grid -->
	<div class="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800">
		{#each calendarDays as cell}
			<div
				class="min-h-[80px] bg-white p-1 dark:bg-zinc-950
					{cell.date === today ? 'ring-2 ring-inset ring-zinc-900 dark:ring-zinc-100' : ''}"
			>
				{#if cell.day !== null}
					<span class="mb-1 block text-xs font-medium text-zinc-400 dark:text-zinc-500">
						{cell.day}
					</span>
					{#each cell.sessions as session}
						<button
							onclick={() => openDrawer(session)}
							class="mb-1 flex w-full items-start gap-1 rounded px-1 py-0.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900"
						>
							<span class="mt-1 h-2 w-2 flex-shrink-0 rounded-full {SESSION_TYPE_COLORS[session.type]}"></span>
							<div class="min-w-0 flex-1">
								<p class="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">{session.title}</p>
								<p class="text-[10px] text-zinc-400">
									{priorityDots(session.priority)}
								</p>
							</div>
						</button>
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>

<!-- Side drawer backdrop -->
{#if drawerOpen}
	<div
		class="fixed inset-0 z-40 bg-black/40"
		onclick={closeDrawer}
		role="button"
		tabindex="-1"
		onkeydown={(e) => e.key === 'Escape' && closeDrawer()}
	></div>
{/if}

<!-- Side drawer -->
<div
	class="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl transition-transform duration-300 dark:bg-zinc-900
		{drawerOpen ? 'translate-x-0' : 'translate-x-full'}"
>
	{#if selectedSession}
		<div class="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-700">
			<div>
				<h2 class="font-semibold text-zinc-900 dark:text-white">{selectedSession.title}</h2>
				<p class="text-sm text-zinc-500">{formatDate(selectedSession.date)}</p>
			</div>
			<button
				onclick={closeDrawer}
				class="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
				aria-label="Close"
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>

		<div class="flex-1 space-y-5 px-4 py-4">
			<!-- Type + priority -->
			<div class="flex items-center gap-3">
				<span class="rounded-full px-2.5 py-1 text-sm font-medium capitalize {SESSION_TYPE_BG_COLORS[selectedSession.type]}">
					{selectedSession.type}
				</span>
				<span class="font-mono text-sm text-zinc-500">
					{priorityDots(selectedSession.priority)}
					<span class="ml-1 text-xs">
						{selectedSession.priority === 1 ? 'Key session' : selectedSession.priority === 2 ? 'Important' : 'Optional'}
					</span>
				</span>
			</div>

			<!-- Description -->
			{#if selectedDesc}
				{#if selectedDesc.warmup}
					<div>
						<h3 class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">Warm-up</h3>
						<p class="text-sm text-zinc-700 dark:text-zinc-300">
							{selectedDesc.warmup.duration}{selectedDesc.warmup.notes ? ` — ${selectedDesc.warmup.notes}` : ''}
						</p>
					</div>
				{/if}

				{#each selectedDesc.sets as set}
					<div>
						<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">{set.label}</h3>
						<ul class="space-y-1.5">
							{#each set.blocks as block}
								<li class="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
									{descBlock(block)}
								</li>
							{/each}
						</ul>
					</div>
				{/each}

				{#if selectedDesc.cooldown}
					<div>
						<h3 class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">Cool-down</h3>
						<p class="text-sm text-zinc-700 dark:text-zinc-300">
							{selectedDesc.cooldown.duration}{selectedDesc.cooldown.notes ? ` — ${selectedDesc.cooldown.notes}` : ''}
						</p>
					</div>
				{/if}
			{/if}

			<!-- Notes -->
			{#if selectedSession.notes}
				<div>
					<h3 class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">Notes</h3>
					<p class="text-sm text-zinc-700 dark:text-zinc-300">{selectedSession.notes}</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
