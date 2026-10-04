<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		title,
		level = 2,
		children
	}: { id: string; title: string; level?: 2 | 3; children: Snippet } = $props();
</script>

<section {id} class="flex scroll-mt-24 flex-col gap-6">
	{#if level === 2}
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">{title}</h2>
	{:else}
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">{title}</h3>
	{/if}
	{@render children()}
</section>
