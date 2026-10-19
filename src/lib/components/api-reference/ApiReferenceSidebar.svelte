<script lang="ts">
	import type { ApiGroup, HttpMethod } from '$lib/data/api-reference';

	let {
		groups,
		activeEndpointId,
		onSelectEndpoint
	}: {
		groups: ApiGroup[];
		activeEndpointId: string;
		onSelectEndpoint: (id: string) => void;
	} = $props();

	const methodColors: Record<HttpMethod, string> = {
		GET: 'text-sky-400',
		POST: 'text-[#4edea3]',
		PUT: 'text-amber-400',
		PATCH: 'text-violet-400',
		DELETE: 'text-rose-400'
	};
</script>

<aside
	data-lenis-prevent
	class="custom-scrollbar sticky top-14 hidden h-[calc(100vh-56px)] w-64 flex-shrink-0 overflow-x-hidden overflow-y-auto border-r border-zinc-800/80 py-8 pr-4 lg:block"
>
	<div class="flex flex-col gap-6">
		{#each groups as group (group.id)}
			<div>
				<div class="mb-2 px-2.5 text-xs font-medium text-zinc-500">
					{group.label}
				</div>
				<ul class="flex flex-col gap-0.5 font-mono text-xs">
					{#each group.endpoints as endpoint (endpoint.id)}
						{@const isActive = activeEndpointId === endpoint.id}
						<li>
							<button
								type="button"
								class="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left transition-colors {isActive
									? 'border border-[#4edea3]/40 bg-[#4edea3]/5 font-medium text-zinc-100'
									: 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100'}"
								onclick={() => onSelectEndpoint(endpoint.id)}
							>
								<span
									class="w-11 flex-shrink-0 text-[10px] font-semibold {methodColors[
										endpoint.method
									]}"
								>
									{endpoint.method}
								</span>
								<span class="truncate">{endpoint.path}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</aside>
