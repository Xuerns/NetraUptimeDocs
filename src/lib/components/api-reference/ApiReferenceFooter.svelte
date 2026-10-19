<script lang="ts">
	import { apiGroups, type HttpMethod } from '$lib/data/api-reference';

	let {
		activeEndpointId,
		onSelectEndpoint
	}: {
		activeEndpointId: string;
		onSelectEndpoint: (id: string) => void;
	} = $props();

	const allEndpoints = $derived(apiGroups.flatMap((g) => g.endpoints));
	const currentIndex = $derived(allEndpoints.findIndex((e) => e.id === activeEndpointId));
	const prevEndpoint = $derived(currentIndex > 0 ? allEndpoints[currentIndex - 1] : null);
	const nextEndpoint = $derived(
		currentIndex < allEndpoints.length - 1 ? allEndpoints[currentIndex + 1] : null
	);

	const methodColors: Record<HttpMethod, string> = {
		GET: 'text-sky-400',
		POST: 'text-[#4edea3]',
		PUT: 'text-amber-400',
		PATCH: 'text-violet-400',
		DELETE: 'text-rose-400'
	};
</script>

<div class="mt-16 flex items-center justify-between border-t border-zinc-800/80 pt-8 pb-12">
	{#if prevEndpoint}
		<button
			type="button"
			onclick={() => onSelectEndpoint(prevEndpoint.id)}
			class="group flex flex-col items-start gap-1 text-left"
		>
			<span class="text-xs text-zinc-500">Previous</span>
			<span
				class="flex items-center gap-2 font-mono text-xs text-zinc-300 transition-colors group-hover:text-[#4edea3]"
			>
				<span class="text-[10px] font-semibold {methodColors[prevEndpoint.method]}"
					>{prevEndpoint.method}</span
				>
				<span>{prevEndpoint.path}</span>
			</span>
		</button>
	{:else}
		<div></div>
	{/if}

	{#if nextEndpoint}
		<button
			type="button"
			onclick={() => onSelectEndpoint(nextEndpoint.id)}
			class="group flex flex-col items-end gap-1 text-right"
		>
			<span class="text-xs text-zinc-500">Next</span>
			<span
				class="flex items-center gap-2 font-mono text-xs text-zinc-300 transition-colors group-hover:text-[#4edea3]"
			>
				<span class="text-[10px] font-semibold {methodColors[nextEndpoint.method]}"
					>{nextEndpoint.method}</span
				>
				<span>{nextEndpoint.path}</span>
			</span>
		</button>
	{:else}
		<div></div>
	{/if}
</div>
