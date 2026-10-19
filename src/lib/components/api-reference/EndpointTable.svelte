<script lang="ts">
	import type { Param } from '$lib/data/api-reference';

	let { title, params }: { title: string; params: Param[] } = $props();
</script>

<div class="flex flex-col gap-3">
	<h2 class="text-lg font-semibold text-zinc-100">{title}</h2>
	<div class="overflow-x-auto rounded-lg border border-zinc-800">
		<table class="w-full border-collapse text-left text-sm">
			<thead>
				<tr class="border-b border-zinc-800 bg-[#141416]">
					<th class="px-4 py-2.5 font-mono text-xs font-medium text-zinc-300">Attribute</th>
					<th class="px-4 py-2.5 font-mono text-xs font-medium text-zinc-300">Type</th>
					<th class="px-4 py-2.5 font-mono text-xs font-medium text-zinc-300">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-zinc-800/80">
				{#each params as param (param.name)}
					<tr>
						<td class="px-4 py-2.5 align-top font-mono text-xs text-zinc-200">
							{param.name}
							{#if param.required}
								<span class="ml-1 text-[#4edea3]">*</span>
							{/if}
						</td>
						<td class="px-4 py-2.5 align-top font-mono text-xs text-zinc-400">{param.type}</td>
						<td class="px-4 py-2.5 align-top text-zinc-400">{param.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
