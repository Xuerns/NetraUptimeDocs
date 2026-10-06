<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { topologyDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="arch-topology" title="System Topology">
		<ArchText>
			PulseWatch is a self-hosted uptime monitoring and public status page platform. A single
			container runs a Go backend (Gin, GORM, goroutines) that serves the SvelteKit 5 SPA embedded
			with go:embed. PostgreSQL 16 is the persistent store; Redis 7 provides caching, rate limiting,
			and counters.
		</ArchText>
		<MermaidDiagram definition={topologyDiagram.definition} label={topologyDiagram.label} />
	</ArchSection>

	<ArchSection id="arch-characteristics" title="Key Characteristics">
		<ArchList
			items={[
				'Single-container deployment: the compiled SvelteKit build is embedded into the Go binary, so the runtime image needs no Node.js.',
				'Runtime configuration: public settings such as PUBLIC_API_URL are injected through /_app/env.js, so the Docker image does not depend on build-time environment variables.',
				'Decoupled asynchronous workers: network checks run over non-blocking Go channels, so slow or failing targets never block HTTP requests or other monitors.',
				'Strict multi-tenant isolation: monitors, incidents, status pages, and audit logs are scoped by organization_id, validated by middleware on every request.'
			]}
		/>
	</ArchSection>
</div>
