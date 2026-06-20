<script lang="ts">
	import './layout.css';
	import kometLogo from '$lib/assets/komet-logo.png';
	import { page } from '$app/stores';

	let { children } = $props();

	const tabs = [
		{ href: '/', label: 'Kalender', icon: 'calendar' },
		{ href: '/pace', label: 'Pace', icon: 'pace' },
		{ href: '/splits', label: 'Splits', icon: 'splits' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
	<!-- Club header -->
	<header
		class="flex items-center gap-3 px-4 py-3"
		style="background: var(--komet-brown);"
	>
		<img src={kometLogo} alt="Komet Blankenese Logo" class="h-12 w-auto flex-shrink-0" />
		<div class="ml-auto">
			<span class="rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style="background: var(--komet-gold); color: var(--komet-brown);">Training</span>
		</div>
	</header>

	<main class="flex-1 overflow-y-auto pb-16">
		{@render children()}
	</main>

	<nav
		class="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
	>
		<div class="flex">
			{#each tabs as tab (tab.href)}
				<a
					href={tab.href}
					class="flex flex-1 flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-colors"
					style={isActive(tab.href)
						? 'color: var(--komet-brown);'
						: 'color: #a1a1aa;'}
				>
					{#if tab.icon === 'calendar'}
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="4" width="18" height="18" rx="2" />
							<line x1="16" y1="2" x2="16" y2="6" />
							<line x1="8" y1="2" x2="8" y2="6" />
							<line x1="3" y1="10" x2="21" y2="10" />
						</svg>
					{:else if tab.icon === 'pace'}
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10" />
							<polyline points="12 6 12 12 16 14" />
						</svg>
					{:else}
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="14" y2="12" />
							<line x1="4" y1="18" x2="10" y2="18" />
						</svg>
					{/if}
					{tab.label}
				</a>
			{/each}
		</div>
	</nav>
</div>
