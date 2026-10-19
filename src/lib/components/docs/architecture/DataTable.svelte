<script lang="ts">
	import type { TableData } from '$lib/data/architecture-tables';

	let { table }: { table: TableData } = $props();
</script>

<div class="overflow-x-auto rounded-lg border border-zinc-800">
	<table class="w-full min-w-[32rem] text-sm">
		<thead>
			<tr class="border-b border-zinc-800 bg-[#141416]">
				{#each table.columns as column (column)}
					<th class="px-4 py-2.5 text-left font-mono text-xs font-medium text-zinc-300">
						{column}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-zinc-800/80">
			{#each table.rows as row, rowIndex (rowIndex)}
				<tr>
					{#each row as cell, cellIndex (cellIndex)}
						<td
							class="px-4 py-2.5 align-top {table.mono?.includes(cellIndex)
								? 'font-mono text-xs text-zinc-200'
								: 'text-zinc-400'}">{cell}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
