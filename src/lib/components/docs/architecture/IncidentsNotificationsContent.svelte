<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { incidentDiagram } from '$lib/data/architecture-diagrams';
	import { severityMatrix, ssrfBlocklist } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="inc-lifecycle" title="Incident Lifecycle & Dispatch">
		<ArchText>
			On a status transition, PulseWatch opens or resolves an incident, emails the person in charge,
			and dispatches the event to every active notification channel of the organization in parallel.
		</ArchText>
		<MermaidDiagram definition={incidentDiagram.definition} label={incidentDiagram.label} />
	</ArchSection>

	<ArchSection id="inc-severity" title="Dynamic Severity Matrix">
		<ArchText>
			Incident severity is derived from the monitor criticality combined with the alert rule
			severity.
		</ArchText>
		<DataTable table={severityMatrix} />
	</ArchSection>

	<ArchSection id="inc-ssrf" title="SSRF Protection">
		<ArchText>
			Custom webhook URLs are validated when registered and when fired. The dispatcher blocks the
			following targets.
		</ArchText>
		<DataTable table={ssrfBlocklist} />
	</ArchSection>
</div>
