<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { retentionDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="ret-rollup" title="Hourly Rollup">
		<ArchText>
			To keep the database fast with millions of checks, retention.go aggregates raw checks per day and then
			purges the raw rows older than 24 hours.
		</ArchText>
		<MermaidDiagram definition={retentionDiagram.definition} label={retentionDiagram.label} />
	</ArchSection>

	<ArchSection id="ret-impact" title="Why It Matters">
		<ArchList
			items={[
				'Efficient storage: second and minute resolution data is trimmed after 24 hours, which prevents disk bloat in PostgreSQL.',
				'Fast 90-day status pages: public pages read 90 rows from monitor_daily_stats instead of scanning millions of raw checks.',
				'Safe writes: the daily stats upsert uses ON CONFLICT DO UPDATE, so repeated hourly runs stay consistent.'
			]}
		/>
	</ArchSection>
</div>
