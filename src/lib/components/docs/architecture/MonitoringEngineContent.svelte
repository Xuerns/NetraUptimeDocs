<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import DataTable from './DataTable.svelte';
	import Callout from './Callout.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { schedulerDiagram } from '$lib/data/architecture-diagrams';
	import { checkerMatrix, concurrencyMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="eng-scheduler" title="Scheduler">
		<ArchText>
			A ticker fires every 20 seconds, loads active monitors, and enqueues every monitor whose
			interval has elapsed. A mutex protects the lastRun map.
		</ArchText>
		<MermaidDiagram definition={schedulerDiagram.definition} label={schedulerDiagram.label} />
	</ArchSection>

	<ArchSection id="eng-pool" title="Worker Pool">
		<ArchText>
			Ten worker goroutines read from a buffered channel of 1000 jobs. Each worker applies the
			monitor timeout (default 10 seconds), runs the matching checker, measures latency, evaluates
			alert rules, and stores the result.
		</ArchText>
		<Callout>
			A manual Check Now calls ProcessImmediate(monitorID), which runs the checker directly without
			going through the scheduler queue.
		</Callout>
	</ArchSection>

	<ArchSection id="eng-checkers" title="Checkers">
		<DataTable table={checkerMatrix} />
	</ArchSection>

	<ArchSection id="eng-concurrency" title="Concurrency Matrix">
		<ArchText>All goroutines that run concurrently inside the PulseWatch runtime.</ArchText>
		<DataTable table={concurrencyMatrix} />
	</ArchSection>
</div>
