<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { bootstrapDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="boot-sequence" title="Startup Sequence">
		<ArchText>
			The server entry point is main.go. Initialization order is deterministic: configuration, database,
			migrations, WebSocket hub, worker pool, schedulers, and finally the HTTP engine.
		</ArchText>
		<MermaidDiagram definition={bootstrapDiagram.definition} label={bootstrapDiagram.label} />
	</ArchSection>

	<ArchSection id="boot-pooling" title="Connection Pooling & Migration">
		<ArchList
			items={[
				'Configuration is read from environment variables. In selfhosted mode, quotas are unlimited or follow the SELFHOSTED_* limits.',
				'PostgreSQL pool: SetMaxIdleConns(100), SetConnMaxIdleTime(10 minutes), SetConnMaxLifetime(1 hour).',
				'AutoMigrate runs for 24 model structs, including User, Monitor, Check, Incident, StatusPage, AlertRule, ComponentGroup, ScheduledMaintenance, APIKey, and AuditLog.'
			]}
		/>
	</ArchSection>

	<ArchSection id="boot-schedulers" title="Background Schedulers">
		<ArchList
			items={[
				'Scheduler: every 20 seconds, enqueues monitors that are due for a check.',
				'RetentionJob: every hour, rolls up raw checks older than 24 hours and deletes them.',
				'SSL and domain scheduler: every 24 hours, with the first run 15 seconds after boot.',
				'Worker pool: 10 goroutines consume a job channel with a buffer of 1000.',
				'HTTP ingress: API routes go to Gin; every non-API route is served from the embedded filesystem as the SPA.'
			]}
		/>
	</ArchSection>
</div>
