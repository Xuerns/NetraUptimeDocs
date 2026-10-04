<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { stateMachineDiagram } from '$lib/data/architecture-diagrams';
	import { defaultRulesMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="ae-state" title="Status State Machine">
		<ArchText>
			After a check completes, evaluator.go decides the final monitor status from latency, status code, and
			connection result.
		</ArchText>
		<MermaidDiagram
			definition={stateMachineDiagram.definition}
			label={stateMachineDiagram.label}
		/>
	</ArchSection>

	<ArchSection id="ae-priority" title="Custom Rule Priority">
		<ArchList
			items={[
				'Active custom rules are evaluated with critical severity first, then warning.',
				'status_code supports exact match, groups (5xx, 4xx, 2xx), comma lists (500,502,503), and numeric comparison (>= 400).',
				'response_time_ms (latency) supports >, >=, <, and <=.',
				'timeout and connection detect socket failures and HTTP timeouts.'
			]}
		/>
	</ArchSection>

	<ArchSection id="ae-fallback" title="Default Fallback Rules">
		<ArchText>Monitors without custom rules use these built-in rules.</ArchText>
		<DataTable table={defaultRulesMatrix} />
	</ArchSection>

	<ArchSection id="ae-consecutive" title="Consecutive Breaches Threshold">
		<ArchText>
			A monitor is not marked DOWN on the first failure. FailureCount increases on each consecutive breach,
			and the transition to DOWN happens only when FailureCount reaches RequiredBreaches (configurable from
			1 to 20). This removes false positives caused by brief network glitches.
		</ArchText>
	</ArchSection>
</div>
