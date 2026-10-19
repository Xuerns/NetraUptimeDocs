<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const composeFile = `version: '3.8'

services:
  app:
    image: ghcr.io/xuerns/netra-uptime:latest
    container_name: netra_uptime_app
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - APP_ENV=production
      - APP_MODE=selfhosted
      - PORT=8080
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=netra
      - DB_PASSWORD=netra_secret
      - DB_NAME=netra_uptime
      - DB_SSLMODE=disable
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=change_me_to_a_random_secure_secret_string
      - ALLOWED_ORIGIN=http://localhost:8080
      - PUBLIC_API_URL=http://localhost:8080/api/v1
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    container_name: netra_uptime_postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=netra
      - POSTGRES_PASSWORD=netra_secret
      - POSTGRES_DB=netra_uptime
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U netra -d netra_uptime"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: netra_uptime_redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:`;

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
				<strong class="font-medium text-zinc-200">Network & Ports</strong> — Port 8080 exposed for HTTP
				and WebSocket traffic, or proxied behind Nginx or Caddy.
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
			The Netra Uptime Compose stack consists of three coordinated services:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">app</strong> — Single-container binary executing the
				Gin HTTP engine, Gorilla WebSocket hub, 10-goroutine worker pool, and serving the embedded SvelteKit
				frontend.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">postgres</strong> — PostgreSQL 16 engine storing organizations,
				monitors, incidents, status pages, and aggregated stats with automatic schema migrations.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">redis</strong> — In-memory store providing token-bucket
				rate limiting for authentication and API keys, plus read-through caching for status pages and
				monitor lists.
			</li>
		</ul>
	</section>

	<!-- Volumes & Persistence -->
	<section id="dc-volumes" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">Volumes & Persistence</h3>
		<p class="text-sm leading-7 text-zinc-400">
			State is isolated into named Docker volumes to prevent data loss across container recreations
			and image updates:
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
						<td class="px-4 py-3 text-sm text-zinc-400"
							>All tables, users, monitor configs, metrics, and incident history</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">redis_data</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">/data</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Redis dump snapshots and sliding window rate limiter states</td
						>
					</tr>
				</tbody>
			</table>
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
				<CodeBlock code="docker compose logs -f app" language="bash" id="cmd-logs" />
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Restart services cleanly:</span>
				<CodeBlock code="docker compose restart" language="bash" id="cmd-restart" />
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-xs text-zinc-400">Pull new images and rebuild:</span>
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
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Database Backup & Recovery</h2>
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
