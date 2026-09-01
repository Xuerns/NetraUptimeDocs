<script lang="ts">
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';
	import { apiGroups, type EndpointSection } from '$lib/data/api-reference';

	let {
		activeEndpointId,
		onSelectEndpoint
	}: {
		activeEndpointId: string;
		onSelectEndpoint: (id: string) => void;
	} = $props();

	const allEndpoints: EndpointSection[] = apiGroups.flatMap((g) => g.endpoints);

	const currentIndex = $derived(allEndpoints.findIndex((e) => e.id === activeEndpointId));
	const prevEndpoint = $derived(currentIndex > 0 ? allEndpoints[currentIndex - 1] : null);
	const nextEndpoint = $derived(
		currentIndex < allEndpoints.length - 1 ? allEndpoints[currentIndex + 1] : null
	);

	const methodColors: Record<string, string> = {
		GET: 'text-[#adc6ff]',
		POST: 'text-[#4edea3]',
		PUT: 'text-[#ffd699]',
		DELETE: 'text-[#ff99ad]',
		PATCH: 'text-[#adc6ff]'
	};
</script>

<section class="flex items-center justify-between gap-4 pt-8 pb-4">
	{#if prevEndpoint}
		<button
			class="flex min-w-0 flex-1 flex-col items-start rounded-lg border border-white/5 bg-[#1a1d1b] p-6"
			onclick={() => onSelectEndpoint(prevEndpoint.id)}
		>
			<span class="eyebrow mb-2 text-[#bbcabf]/60">
				Previous
			</span>
			<div class="flex items-center gap-3 text-[#4edea3]/80">
				<ArrowLeft
					size={16}
					class="flex-shrink-0"
				/>
				<span class="min-w-0 truncate font-display text-lg font-semibold">{prevEndpoint.title}</span
				>
			</div>
			<span class="mt-1 truncate font-mono text-xs text-[#bbcabf]/40">
				<span class={methodColors[prevEndpoint.method]}>{prevEndpoint.method}</span>
				{prevEndpoint.path}
			</span>
		</button>
	{/if}

	{#if nextEndpoint}
		<button
			class="flex min-w-0 flex-1 flex-col items-end rounded-lg border border-white/5 bg-[#1a1d1b] p-6"
			onclick={() => onSelectEndpoint(nextEndpoint.id)}
		>
			<span class="eyebrow mb-2 text-[#bbcabf]/60">
				Next
			</span>
			<div class="flex items-center gap-3 text-[#4edea3]/80">
				<span class="min-w-0 truncate font-display text-lg font-semibold">{nextEndpoint.title}</span
				>
				<ArrowRight
					size={16}
					class="flex-shrink-0"
				/>
			</div>
			<span class="mt-1 truncate font-mono text-xs text-[#bbcabf]/40">
				<span class={methodColors[nextEndpoint.method]}>{nextEndpoint.method}</span>
				{nextEndpoint.path}
			</span>
		</button>
	{/if}
</section>
