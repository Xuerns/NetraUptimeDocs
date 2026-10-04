<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { sslRunnerDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="ssl-flow" title="Runner Flow">
		<ArchText>
			Certificates and domain expiry are checked by a separate daily runner so they never load the main
			uptime queue.
		</ArchText>
		<MermaidDiagram definition={sslRunnerDiagram.definition} label={sslRunnerDiagram.label} />
	</ArchSection>

	<ArchSection id="ssl-design" title="Design Highlights">
		<ArchList
			items={[
				'Shared platform blacklist: domains on vercel.app, workers.dev, github.io, railway.app, and netlify.app are marked none to avoid false domain errors.',
				'Two-tier lookup: modern RDAP (REST/JSON) first, then raw WHOIS on TCP port 43 as a fallback.',
				'Rate limit jitter: a random 500ms delay between domain queries prevents the server IP from being blocked by registries.'
			]}
		/>
	</ArchSection>
</div>
