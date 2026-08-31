<script lang="ts">
	import type { Param } from '$lib/data/api-reference';

	let { title, params }: { title: string; params: Param[] } = $props();
</script>

<div class="mb-8">
	<h3 class="mb-3 text-sm font-semibold text-[#e5e2e3]">{title}</h3>
	<div class="overflow-hidden rounded-lg border border-[#3c4a42]">
		<table class="w-full border-collapse text-left text-sm">
			<thead>
				<tr class="border-b border-[#3c4a42] bg-[#201f20]">
					<th
						class="p-3 font-mono text-[11px] font-semibold tracking-wider text-[#e5e2e3] uppercase"
					>
						Attribute
					</th>
					<th
						class="p-3 font-mono text-[11px] font-semibold tracking-wider text-[#e5e2e3] uppercase"
					>
						Type
					</th>
					<th
						class="p-3 font-mono text-[11px] font-semibold tracking-wider text-[#e5e2e3] uppercase"
					>
						Description
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#3c4a42]">
				{#each params as param (param.name)}
					<tr>
						<td class="p-3 align-top font-mono text-[#e5e2e3]">
							{param.name}
							{#if param.required}
								<span class="ml-1 text-[#ffb4ab]">*</span>
							{/if}
						</td>
						<td class="p-3 align-top font-mono text-xs text-[#bbcabf]">{param.type}</td>
						<td class="p-3 align-top text-[#bbcabf]">{param.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
