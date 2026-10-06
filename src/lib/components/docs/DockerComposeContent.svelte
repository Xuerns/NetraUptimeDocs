<script lang="ts">
	import { Server, Terminal, Shield, Check } from 'lucide-svelte';
	import CodeBlock from './CodeBlock.svelte';

	const composeFile = `version: '3.8'

services:
  app:
    image: ghcr.io/xuerns/pulsewatch:latest
    container_name: pulsewatch_app
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - APP_ENV=production
      - APP_MODE=selfhosted
      - PORT=8080
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=pulsewatch
      - DB_PASSWORD=pulsewatch_secret
      - DB_NAME=pulsewatch
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
    container_name: pulsewatch_postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=pulsewatch
      - POSTGRES_PASSWORD=pulsewatch_secret
      - POSTGRES_DB=pulsewatch
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pulsewatch -d pulsewatch"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: pulsewatch_redis
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

	const backupCommand = `docker compose exec -T postgres pg_dump -U pulsewatch -d pulsewatch > backup_$(date +%Y%m%d_%H%M%S).sql`;
	const restoreCommand = `cat backup.sql | docker compose exec -T postgres psql -U pulsewatch -d pulsewatch`;
</script>

<div class="flex flex-col gap-16">
	<!-- Prerequisites -->
	<section id="dc-prerequisites" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Prerequisites</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Before deploying PulseWatch with Docker Compose, ensure your host environment satisfies the
			minimum hardware and software requirements.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Server size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Hardware</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					1 vCPU and 512 MB RAM are sufficient for up to 100 monitors checking at 60-second
					intervals.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Terminal size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Docker Engine</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Docker Engine 24.0+ and Docker Compose v2.20+ with compose plugin installed.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Shield size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Network & Ports</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Port 8080 exposed for HTTP/WebSocket traffic, or proxied behind Nginx/Caddy.
				</p>
			</div>
		</div>
	</section>

	<!-- Docker Compose File -->
	<section id="dc-compose-file" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Docker Compose File
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Save the following stack definition as <code
				class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>docker-compose.yml</code
			> in your deployment directory.
		</p>
		<CodeBlock code={composeFile} language="yaml" id="docker-compose-file" />
	</section>

	<!-- Service Configuration -->
	<section id="dc-services" class="flex scroll-mt-24 flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
			Service Configuration
		</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			The PulseWatch Compose stack consists of three coordinated services:
		</p>
		<ul class="flex max-w-3xl flex-col gap-3">
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">app</strong>: Single-container binary executing the Gin
					HTTP engine, Gorilla WebSocket hub, 10-goroutine worker pool, and serving the embedded
					SvelteKit frontend.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">postgres</strong>: PostgreSQL 16 engine storing
					organizations, monitors, incidents, status pages, and aggregated stats with automatic
					schema migrations.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">redis</strong>: In-memory store providing token-bucket
					rate limiting for authentication and API keys, plus read-through caching for status pages
					and monitor lists.</span
				>
			</li>
		</ul>
	</section>

	<!-- Volumes & Persistence -->
	<section id="dc-volumes" class="flex scroll-mt-24 flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
			Volumes & Persistence
		</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			State is strictly isolated into named Docker volumes to ensure zero data loss across container
			recreations and image updates:
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Volume Name</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Mount Path</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Data Preserved</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">postgres_data</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">/var/lib/postgresql/data</td>
						<td class="px-5 py-3 text-[#bbcabf]"
							>All tables, users, monitor configs, metrics, and incident history</td
						>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">redis_data</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">/data</td>
						<td class="px-5 py-3 text-[#bbcabf]"
							>Redis dump snapshots and sliding window rate limiter states</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Useful Commands -->
	<section id="dc-commands" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Useful Commands</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Common Docker Compose operations for managing your PulseWatch instance:
		</p>
		<div class="flex flex-col gap-4">
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]"
					>Start all services in detached mode</span
				>
				<CodeBlock code="docker compose up -d" language="bash" id="cmd-up" />
			</div>
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]"
					>Stream logs from the application container</span
				>
				<CodeBlock code="docker compose logs -f app" language="bash" id="cmd-logs" />
			</div>
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]">Restart services cleanly</span>
				<CodeBlock code="docker compose restart" language="bash" id="cmd-restart" />
			</div>
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]">Pull new images and rebuild</span>
				<CodeBlock
					code="docker compose pull && docker compose up -d"
					language="bash"
					id="cmd-pull"
				/>
			</div>
		</div>
	</section>

	<!-- Database Backup & Recovery -->
	<section id="dc-backup" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Database Backup & Recovery
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Perform periodic dumps of your PostgreSQL database to maintain disaster recovery readiness:
		</p>
		<div class="flex flex-col gap-4">
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]">Create atomic SQL backup</span>
				<CodeBlock code={backupCommand} language="bash" id="cmd-backup" />
			</div>
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]"
					>Restore database from SQL dump</span
				>
				<CodeBlock code={restoreCommand} language="bash" id="cmd-restore" />
			</div>
		</div>
	</section>
</div>
