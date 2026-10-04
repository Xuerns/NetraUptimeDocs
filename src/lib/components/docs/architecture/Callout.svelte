<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Info, TriangleAlert } from 'lucide-svelte';

	let {
		variant = 'info',
		children
	}: { variant?: 'info' | 'warning'; children: Snippet } = $props();
</script>

<div
	class="flex gap-3 rounded-lg border p-4 text-sm leading-relaxed text-[#bbcabf] {variant === 'warning'
		? 'border-amber-300/30 bg-[#1f1c12]'
		: 'border-[#4edea3]/30 bg-[#101a15]'}"
	role="note"
>
	{#if variant === 'warning'}
		<TriangleAlert size={16} class="mt-0.5 shrink-0 text-amber-300" />
	{:else}
		<Info size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
	{/if}
	<div class="min-w-0">{@render children()}</div>
</div>
