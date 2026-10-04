<script lang="ts">
	import { ChevronDown, ChevronUp, ArrowUpRight, Code } from 'lucide-svelte';
	import type { DocGroup } from '$lib/data/docs';

	let {
		groups,
		activeItemId,
		onSelectItem
	}: {
		groups: DocGroup[];
		activeItemId: string;
		onSelectItem: (id: string) => void;
	} = $props();

	let expandedGroups = $state<Record<string, boolean>>({
		'getting-started-group': true,
		'architecture-group': false,
		'deployment-group': false,
		'monitors-group': false,
		'alert-rules-group': false,
		'notification-group': false,
		'status-pages-group': false,
		'api-keys-group': false
	});

	$effect(() => {
		for (const group of groups) {
			if (group.items.some((item) => item.id === activeItemId)) {
				expandedGroups[group.id] = true;
			}
		}
	});

	function toggleGroup(groupId: string) {
		expandedGroups[groupId] = !expandedGroups[groupId];
	}
</script>

<aside
	data-lenis-prevent
	class="sticky top-14 hidden h-[calc(100vh-56px)] w-72 flex-shrink-0 overflow-x-hidden overflow-y-auto border-r border-[#3c4a42]/50 bg-[#131314] lg:block"
>
	<div class="flex flex-col gap-0.5 p-6">
		{#each groups as group (group.id)}
			<div>
				{#if group.items.length === 1}
					<button
						class="mb-1 w-full rounded-md px-2 py-1 text-left text-sm transition-colors {activeItemId ===
						group.items[0].id
							? 'bg-[#4edea3]/10 font-medium text-[#4edea3]'
							: 'text-[#bbcabf] hover:text-[#e5e2e3]'}"
						onclick={() => onSelectItem(group.items[0].id)}
					>
						{group.label}
					</button>
				{:else}
				<button
					class="mb-2 flex w-full items-center justify-between px-2 py-1 text-left text-sm transition-colors hover:text-[#e5e2e3] {expandedGroups[
						group.id
					]
						? 'font-semibold text-[#e5e2e3]'
						: 'text-[#bbcabf]'}"
					onclick={() => toggleGroup(group.id)}
				>
					<span>{group.label}</span>
					{#if expandedGroups[group.id]}
						<ChevronUp size={14} />
					{:else}
						<ChevronDown size={14} />
					{/if}
				</button>
				{#if expandedGroups[group.id]}
					<ul class="ml-4 flex flex-col gap-1 border-l border-[#3c4a42]/50 py-1 pl-4">
						{#each group.items as item (item.id)}
							<li>
								<button
									class="w-full rounded-md px-2 py-1 text-left text-sm transition-colors {activeItemId ===
									item.id
										? '-ml-2 bg-[#4edea3]/10 font-medium text-[#4edea3]'
										: 'text-[#bbcabf] hover:text-[#e5e2e3]'}"
									onclick={() => onSelectItem(item.id)}
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
				{/if}
			</div>
		{/each}
	</div>
</aside>
