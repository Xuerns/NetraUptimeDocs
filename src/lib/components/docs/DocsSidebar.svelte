<script lang="ts">
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
</script>

<aside
	data-lenis-prevent
	class="custom-scrollbar sticky top-14 hidden h-[calc(100vh-56px)] w-60 flex-shrink-0 overflow-y-auto border-r border-zinc-800/80 py-8 pr-4 lg:block"
>
	<div class="flex flex-col gap-6">
		{#each groups as group (group.id)}
			<div>
				<div class="mb-2 px-2.5 text-xs font-medium text-zinc-500">
					{group.label}
				</div>
				<ul class="flex flex-col gap-0.5">
					{#each group.items as item (item.id)}
						{@const isActive = activeItemId === item.id}
						<li>
							<button
								type="button"
								class="flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm transition-colors {isActive
									? 'border border-[#4edea3]/40 bg-[#4edea3]/5 font-medium text-[#4edea3]'
									: 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100'}"
								onclick={() => onSelectItem(item.id)}
							>
								<span class="truncate">{item.label}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</aside>
