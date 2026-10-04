<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { statusPageDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="spi-flow" title="Request Flow">
		<ArchText>
			Public status pages require no authentication and are optimized for reliability and low latency.
		</ArchText>
		<MermaidDiagram definition={statusPageDiagram.definition} label={statusPageDiagram.label} />
	</ArchSection>

	<ArchSection id="spi-features" title="Main Features">
		<ArchList
			items={[
				'Subdomain routing: each organization publishes a branded page at /status/:subdomain.',
				'Component groups: monitors are grouped into functional categories with custom display order and collapsible sections.',
				'Scheduled maintenance: during scheduled, in_progress, or completed windows, affected monitors are flagged and a banner is shown to visitors.',
				'Machine-readable endpoints: /summary.json and /status.json for integrations, plus a dynamic /badge.svg for GitHub READMEs.'
			]}
		/>
	</ArchSection>
</div>
