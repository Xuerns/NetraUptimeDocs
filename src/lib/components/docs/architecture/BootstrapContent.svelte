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
			The server entry point is main.go. Initialization order is deterministic: configuration
			loading and secret verification, in-memory cache allocation, database connection and schema
			migrations, WebSocket hub, worker pool, background schedulers, and finally the HTTP engine.
		</ArchText>
		<MermaidDiagram definition={bootstrapDiagram.definition} label={bootstrapDiagram.label} />
	</ArchSection>

	<ArchSection id="boot-pooling" title="Connection Pooling & Migration">
		<ArchList
			items={[
				'Configuration is loaded from environment variables. If JWT_SECRET is omitted in selfhosted mode, Netra Uptime generates and persists a cryptographically random 64-character hex secret in .netra_secret.',
				'Dual-driver database initialization: PostgreSQL uses a high-concurrency connection pool (SetMaxIdleConns(100), SetConnMaxIdleTime(10 minutes), SetConnMaxLifetime(1 hour)); pure-Go SQLite enables Write-Ahead Logging (PRAGMA journal_mode=WAL, PRAGMA busy_timeout=5000) and serializes writes safely via SetMaxOpenConns(1).',
				'In-process cache initialization: cache.NewMemoryCache() initializes an in-memory sync.RWMutex store with an automatic 60-second background goroutine for expired key eviction.',
				'AutoMigrate executes across 27 GORM model structs, including User, Organization, OrganizationMember, OrganizationInvite, Monitor, MonitorPIC, Check, Incident, IncidentUpdate, IncidentAssignee, StatusPage, StatusPageComponent, StatusPageComponentGroup, StatusPageMonitor, StatusPageSubscriber, AlertTemplate, AlertRule, NotificationChannel, ScheduledMaintenance, ScheduledMaintenanceMonitor, ScheduledMaintenanceUpdate, MonitorDailyStat, APIKey, and AuditLog.'
			]}
		/>
	</ArchSection>

	<ArchSection id="boot-schedulers" title="Background Schedulers">
		<ArchList
			items={[
				'Scheduler: every 20 seconds, enqueues monitors that are due for a check into the job channel.',
				'RetentionJob: every hour, aggregates checks older than 24 hours into 90-day daily statistics and deletes expired raw entries.',
				'SSL and domain scheduler: every 24 hours (first run 15 seconds after boot), checks TLS certificates and RDAP/WHOIS expiration.',
				'Worker pool: 10 worker goroutines consume jobs concurrently from a buffered channel of 1000 items.',
				'HTTP ingress: Gin routes API requests to handlers, while non-API paths serve the embedded SvelteKit SPA directly from go:embed.'
			]}
		/>
	</ArchSection>
</div>
