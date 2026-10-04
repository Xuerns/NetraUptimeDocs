<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { auditDiagram } from '$lib/data/architecture-diagrams';
	import { auditFields } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="audit-flow" title="Audit Flow">
		<ArchText>
			Every configuration change made by a team member is written to the audit log for operational
			accountability.
		</ArchText>
		<MermaidDiagram definition={auditDiagram.definition} label={auditDiagram.label} />
	</ArchSection>

	<ArchSection id="audit-fields" title="Recorded Fields">
		<DataTable table={auditFields} />
		<ArchText>
			The dashboard shows a paginated audit view that can be filtered by action and entity type.
		</ArchText>
	</ArchSection>
</div>
