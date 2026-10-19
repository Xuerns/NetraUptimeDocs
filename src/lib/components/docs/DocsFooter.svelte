<script lang="ts">
	import { sidebarSections } from '$lib/data/docs';

	let { activeItemId, onSelectItem }: { activeItemId: string; onSelectItem: (id: string) => void } =
		$props();

	const currentIndex = $derived(sidebarSections.findIndex((s) => s.id === activeItemId));
	const prevSection = $derived(currentIndex > 0 ? sidebarSections[currentIndex - 1] : null);
	const nextSection = $derived(
		currentIndex < sidebarSections.length - 1 ? sidebarSections[currentIndex + 1] : null
	);
</script>

<section class="mt-8 flex items-center justify-between gap-4 border-t border-zinc-800/80 py-8">
	{#if prevSection}
		<button
			type="button"
			class="group flex flex-col items-start text-left"
			onclick={() => onSelectItem(prevSection.id)}
		>
			<span class="text-xs text-zinc-500">Previous</span>
			<span
				class="mt-1 text-sm font-medium text-zinc-200 transition-colors group-hover:text-[#4edea3]"
			>
				&larr; {prevSection.title}
			</span>
		</button>
	{:else}
		<div></div>
	{/if}

	{#if nextSection}
		<button
			type="button"
			class="group flex flex-col items-end text-right"
			onclick={() => onSelectItem(nextSection.id)}
		>
			<span class="text-xs text-zinc-500">Next</span>
			<span
				class="mt-1 text-sm font-medium text-zinc-200 transition-colors group-hover:text-[#4edea3]"
			>
				{nextSection.title} &rarr;
			</span>
		</button>
	{/if}
</section>
