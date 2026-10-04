<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { websocketDiagram } from '$lib/data/architecture-diagrams';
	import { wsComponents } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="rt-handshake" title="Handshake & Broadcast">
		<ArchText>
			A persistent WebSocket connection updates the dashboard instantly, without repeated polling. After a
			worker finishes evaluating a check, the hub broadcasts MONITOR_UPDATED to every client in that
			organization room, and the SvelteKit client updates its state without re-fetching the API.
		</ArchText>
		<MermaidDiagram definition={websocketDiagram.definition} label={websocketDiagram.label} />
	</ArchSection>

	<ArchSection id="rt-components" title="Technical Components">
		<DataTable table={wsComponents} />
	</ArchSection>
</div>
