<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { cacheDiagram } from '$lib/data/architecture-diagrams';
	import { redisKeyMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="cache-flow" title="Read-Through Cache & Invalidation">
		<ArchText>
			Redis serves as a distributed cache and counter store. Reads use a cache-aside flow; any monitor
			mutation writes to PostgreSQL first and then deletes the related keys.
		</ArchText>
		<MermaidDiagram definition={cacheDiagram.definition} label={cacheDiagram.label} />
	</ArchSection>

	<ArchSection id="cache-keys" title="Redis Key Matrix">
		<DataTable table={redisKeyMatrix} />
	</ArchSection>
</div>
