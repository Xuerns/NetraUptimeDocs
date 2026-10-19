<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		title,
		level = 2,
		children
	}: { id: string; title: string; level?: 2 | 3; children: Snippet } = $props();
</script>

<section {id} class="flex scroll-mt-24 flex-col gap-4">
	{#if level === 2}
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">{title}</h2>
	{:else}
		<h3 class="text-base font-medium tracking-tight text-zinc-200">{title}</h3>
	{/if}
	{@render children()}
</section>
