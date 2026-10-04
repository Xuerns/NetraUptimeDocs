<script lang="ts">
	import type { TableData } from '$lib/data/architecture-tables';

	let { table }: { table: TableData } = $props();
</script>

<div class="overflow-x-auto rounded-lg border border-white/5">
	<table class="w-full min-w-[32rem] text-sm">
		<thead>
			<tr class="border-b border-white/5 bg-[#1a1d1b]">
				{#each table.columns as column (column)}
					<th
						class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
						>{column}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
			{#each table.rows as row, rowIndex (rowIndex)}
				<tr>
					{#each row as cell, cellIndex (cellIndex)}
						<td
							class="px-5 py-3 align-top {table.mono?.includes(cellIndex)
								? 'font-mono text-xs text-[#e5e2e3]'
								: 'text-[#bbcabf]'}">{cell}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
