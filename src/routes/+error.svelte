<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
	<p class="text-5xl font-bold text-zinc-200 dark:text-zinc-700">{$page.status}</p>
	<h1 class="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
		{$page.error?.message ?? 'Something went wrong'}
	</h1>
	<a href="/" class="mt-2 text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-700">
		Back to calendar
	</a>
</div>
