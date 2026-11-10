<script lang="ts">
	import { AlertTriangle } from 'lucide-svelte';
	import CodeBlock from './CodeBlock.svelte';

	const composeFile = `services:
  netra-uptime:
    image: ghcr.io/xuerns/netra-uptime:latest
    container_name: netra_uptime_app
    restart: unless-stopped
    ports:
      - "27346:27346"
    environment:
      - APP_ENV=production
      - PORT=27346
      - DB_DRIVER=postgres
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=netra
      - DB_PASSWORD=netra_secret_change_me
      - DB_NAME=netra_uptime
      - DB_SSLMODE=disable
      - JWT_SECRET=change_me_to_a_random_secure_secret_string
      - ALLOWED_ORIGIN=http://localhost:27346
      - PUBLIC_API_URL=http://localhost:27346/api/v1
      - ALLOW_REGISTRATION=true
      - ALLOW_PRIVATE_NETWORK_MONITORING=false
      - MAX_MONITORS_PER_ORG=200
      - MAX_STATUS_PAGES_PER_ORG=10
      - MIN_MONITOR_INTERVAL_SECONDS=30
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - netra_uptime_net

  postgres:
    image: postgres:16-alpine
    container_name: netra_uptime_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: netra
      POSTGRES_PASSWORD: netra_secret_change_me
      POSTGRES_DB: netra_uptime
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U netra -d netra_uptime"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - netra_uptime_net

volumes:
  postgres_data:

networks:
  netra_uptime_net:
    driver: bridge`;

	const backupCommand = `docker compose exec -T postgres pg_dump -U netra -d netra_uptime > backup_$(date +%Y%m%d_%H%M%S).sql`;
	const restoreCommand = `cat backup.sql | docker compose exec -T postgres psql -U netra -d netra_uptime`;
</script>

<div class="flex flex-col gap-12">
	<!-- Prerequisites -->
	<section id="dc-prerequisites" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Prerequisites</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Before deploying Netra Uptime with Docker Compose, ensure your host environment meets the
			following requirements:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Hardware</strong> — 1 vCPU and 512 MB RAM are sufficient
				for up to 100 monitors checking at 60-second intervals.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Docker Engine</strong> — Docker Engine 24.0+ and Docker
				Compose v2.20+ with the compose plugin installed.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Network &amp; Ports</strong> — Port 27346 exposed for
				HTTP and WebSocket traffic, or proxied behind Nginx or Caddy.
			</li>
		</ul>
	</section>

	<!-- Docker Compose File -->
	<section id="dc-compose-file" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Docker Compose File</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Save the following stack definition as
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>docker-compose.yml</code
			> in your deployment directory:
		</p>
		<CodeBlock code={composeFile} language="yaml" id="docker-compose-file" />
	</section>

	<!-- Service Configuration -->
	<section id="dc-services" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">Service Configuration</h3>
		<p class="text-sm leading-7 text-zinc-400">
			The production Netra Uptime Compose stack consists of two coordinated services:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">netra-uptime</strong> — Single-container binary
				executing the Gin HTTP engine, Gorilla WebSocket hub, concurrent worker pool, in-memory
				cache (<code class="font-mono text-zinc-300">cache.MemoryCache</code>), and serving the
				embedded SvelteKit frontend with zero external cache dependencies.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">postgres</strong> — PostgreSQL 16 relational database
				engine storing organizations, monitors, incidents, status pages, and 90-day daily aggregated statistics
				with automatic schema migrations.
			</li>
		</ul>
	</section>

	<!-- Volumes & Persistence -->
	<section id="dc-volumes" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">Volumes &amp; Persistence</h3>
		<p class="text-sm leading-7 text-zinc-400">
			Database state is isolated into a named Docker volume to ensure persistence across container
			recreations and image updates:
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Volume Name</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Mount Path</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Data Preserved</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">postgres_data</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">/var/lib/postgresql/data</td>
						<td class="px-4 py-3 text-sm text-zinc-400">
							All relational tables, users, monitor configs, metrics, daily rollups, and incident
							history
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div
			class="flex items-start gap-3 rounded-lg border border-amber-900/40 bg-amber-950/20 p-4 text-xs leading-6 text-zinc-300"
		>
			<AlertTriangle size={18} class="mt-0.5 shrink-0 text-amber-400" />
			<div class="flex flex-col gap-1">
				<p class="font-semibold text-amber-300">
					Important Note on Database Passwords &amp; Persistent Volumes
				</p>
				<p class="text-zinc-400">
					PostgreSQL initializes user credentials only when creating a new data volume. If you
					modify
					<code class="rounded bg-zinc-800/80 px-1 py-0.5 font-mono text-zinc-200"
						>POSTGRES_PASSWORD</code
					>
					or
					<code class="rounded bg-zinc-800/80 px-1 py-0.5 font-mono text-zinc-200">DB_PASSWORD</code
					>
					on an existing volume, PostgreSQL retains the original password. To reset passwords on a fresh
					instance, wipe the old volume using
					<code class="rounded bg-zinc-800/80 px-1 py-0.5 font-mono text-zinc-200"
						>docker compose down -v</code
					>
					before starting.
				</p>
			</div>
		</div>
	</section>

	<!-- Useful Commands -->
	<section id="dc-commands" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Useful Commands</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Common Docker Compose operations for managing your Netra Uptime instance:
		</p>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Start all services in detached mode:</span>
				<CodeBlock code="docker compose up -d" language="bash" id="cmd-up" />
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Stream logs from the application container:</span>
				<CodeBlock code="docker compose logs -f netra-uptime" language="bash" id="cmd-logs" />
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Restart services cleanly:</span>
				<CodeBlock code="docker compose restart" language="bash" id="cmd-restart" />
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Pull new images and recreate containers:</span>
				<CodeBlock
					code="docker compose pull && docker compose up -d"
					language="bash"
					id="cmd-pull"
				/>
			</div>
		</div>
	</section>

	<!-- Database Backup & Recovery -->
	<section id="dc-backup" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Database Backup &amp; Recovery
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Perform periodic dumps of your PostgreSQL database to maintain disaster recovery readiness:
		</p>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Create atomic SQL backup:</span>
				<CodeBlock code={backupCommand} language="bash" id="cmd-backup" />
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Restore database from SQL dump:</span>
				<CodeBlock code={restoreCommand} language="bash" id="cmd-restore" />
			</div>
		</div>
	</section>
</div>
