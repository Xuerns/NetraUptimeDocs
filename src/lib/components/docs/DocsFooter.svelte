<script lang="ts">
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';
	import { sidebarSections } from '$lib/data/docs';

	let { activeItemId, onSelectItem }: { activeItemId: string; onSelectItem: (id: string) => void } =
		$props();

	const currentIndex = $derived(sidebarSections.findIndex((s) => s.id === activeItemId));
	const prevSection = $derived(currentIndex > 0 ? sidebarSections[currentIndex - 1] : null);
	const nextSection = $derived(
		currentIndex < sidebarSections.length - 1 ? sidebarSections[currentIndex + 1] : null
	);

</script>

<section class="flex items-center justify-between gap-4 pt-8 pb-4">
	{#if prevSection}
		<button
			class="flex min-w-0 flex-1 flex-col items-start rounded-lg border border-white/5 bg-[#1a1d1b] p-6 px-10"
			onclick={() => onSelectItem(prevSection.id)}
		>
			<span class="eyebrow mb-3 text-[#bbcabf]/60">
				Previous
			</span>
			<div class="flex items-center gap-3 text-[#4edea3]/80">
				<ArrowLeft
					size={18}
					class="flex-shrink-0"
				/>
				<span class="font-display text-lg font-semibold">{prevSection.title}</span>
			</div>
		</button>
	{/if}

	{#if nextSection}
		<button
			class="flex min-w-0 flex-1 flex-col items-end rounded-lg border border-white/5 bg-[#1a1d1b] p-6 px-10"
			onclick={() => onSelectItem(nextSection.id)}
		>
			<span class="eyebrow mb-3 text-[#bbcabf]/60">
				Next
			</span>
			<div class="flex items-center gap-3 text-[#4edea3]/80">
				<span class="font-display text-lg font-semibold">{nextSection.title}</span>
				<ArrowRight size={18} class="flex-shrink-0" />
			</div>
		</button>
	{/if}
</section>
