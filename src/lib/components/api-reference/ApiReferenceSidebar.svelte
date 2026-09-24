<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { ApiGroup } from '$lib/data/api-reference';

	let {
		groups,
		activeEndpointId,
		onSelectEndpoint
	}: {
		groups: ApiGroup[];
		activeEndpointId: string;
		onSelectEndpoint: (id: string) => void;
	} = $props();

	let expandedGroups = $state<Record<string, boolean>>({
		auth: true
	});

	$effect(() => {
		const currentGroup = groups.find((g) => g.endpoints.some((e) => e.id === activeEndpointId));
		if (currentGroup && !expandedGroups[currentGroup.id]) {
			expandedGroups[currentGroup.id] = true;
		}
	});

	function toggleGroup(groupId: string) {
		expandedGroups[groupId] = !expandedGroups[groupId];
	}

	const methodColors: Record<string, string> = {
		GET: 'text-[#adc6ff]',
		POST: 'text-[#4edea3]',
		PUT: 'text-[#ffd699]',
		DELETE: 'text-[#ff99ad]',
		PATCH: 'text-[#adc6ff]'
	};
</script>

<aside
	data-lenis-prevent
	class="sticky top-14 hidden h-[calc(100vh-56px)] w-80 flex-shrink-0 overflow-x-hidden overflow-y-auto border-r border-[#3c4a42] bg-[#131314] lg:block"
>
	<div class="flex flex-col gap-6 p-6">
		<div>
			<h4 class="mb-4 font-mono text-[11px] font-medium tracking-widest text-[#bbcabf] uppercase">
				API Reference
			</h4>
			<ul class="flex flex-col gap-4 font-mono text-sm">
				{#each groups as group (group.id)}
					<li>
						<button
							class="mb-2 flex w-full items-center justify-between text-left transition-colors hover:text-[#e5e2e3] {expandedGroups[
								group.id
							]
								? 'font-semibold text-[#e5e2e3]'
								: 'text-[#bbcabf]'}"
							onclick={() => toggleGroup(group.id)}
						>
							{group.label}
							{#if expandedGroups[group.id]}
								<ChevronUp size={14} />
							{:else}
								<ChevronDown size={14} />
							{/if}
						</button>
						{#if expandedGroups[group.id]}
							<ul class="ml-4 flex flex-col gap-2 border-l border-[#3c4a42] py-1 pl-4">
								{#each group.endpoints as endpoint (endpoint.id)}
									<li>
										<button
											class="flex w-full items-center gap-2 pr-2 text-left text-xs transition-colors {activeEndpointId ===
											endpoint.id
												? '-ml-2 rounded bg-[#201f20] px-2 py-1 font-semibold text-[#4edea3]'
												: 'text-[#bbcabf] hover:text-[#e5e2e3]'}"
											onclick={() => onSelectEndpoint(endpoint.id)}
										>
											<span class="text-[10px] font-bold {methodColors[endpoint.method]}">
												{endpoint.method}
											</span>
											{endpoint.path}
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</aside>
