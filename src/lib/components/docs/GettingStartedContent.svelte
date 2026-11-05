<script lang="ts">
	import InstallCommand, { type CommandTab } from '$lib/components/InstallCommand.svelte';
	import { logos } from '$lib/data/landing';
	import CodeBlock from './CodeBlock.svelte';

	const globalInstallTabs: CommandTab[] = [
		{ key: 'npm', label: 'npm', logo: logos.npm, cmd: 'npm install -g netra-uptime' },
		{ key: 'pnpm', label: 'pnpm', logo: logos.pnpm, cmd: 'pnpm add -g netra-uptime' },
		{ key: 'yarn', label: 'yarn', logo: logos.yarn, cmd: 'yarn global add netra-uptime' },
		{ key: 'bun', label: 'bun', logo: logos.bun, cmd: 'bun add -g netra-uptime' }
	];

	const manualCloneCode = `git clone https://github.com/Xuerns/Netra-Uptime.git /opt/netra-uptime
cd /opt/netra-uptime && cp .env.example .env
docker compose up -d`;

	const standaloneEnvCode = `PORT=27346
APP_ENV=production
DB_DRIVER=sqlite
DB_PATH=netra.db
ALLOWED_ORIGIN=http://localhost:27346
PUBLIC_API_URL=/api/v1`;

	const standaloneRunCode = `# Linux / macOS (Pure-Go binary)
cd server && go build -tags netgo -ldflags="-s -w" -o netra-uptime ./cmd/netra-uptime
./netra-uptime

# Windows PowerShell build script
.\\scripts\\build-windows.ps1
.\\netra-uptime.exe`;

	const verifyCode = `# Check container status
netra-uptime status

# Verify health endpoint
curl -s http://localhost:27346/healthz
# Expected output:
# {
#   "status": "ok",
#   "database": "connected",
#   "db_driver": "postgres",
#   "app_mode": "selfhosted",
#   "timestamp": "2026-10-04T12:00:00Z"
# }

# View container logs
netra-uptime logs`;
</script>

<div class="flex flex-col gap-10">
	<section id="gs-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Overview</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime is an open-source, self-hosted uptime monitoring and incident management platform
			built with Go and SvelteKit. It packages the concurrent Go worker pool and compiled SvelteKit
			frontend into a single binary or container image, backed by either PostgreSQL 16 or embedded
			pure-Go SQLite with Write-Ahead Logging (WAL).
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			With built-in thread-safe in-memory caching and sliding-window rate limiting (<code
				class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>cache.MemoryCache</code
			>), Netra Uptime has zero external cache dependencies. It monitors websites, APIs, and
			infrastructure with multi-protocol checks (HTTP/HTTPS, TCP, and unprivileged Ping), tracks SSL
			and domain expiration, and routes alerts to Slack, Discord, Email, or custom webhooks.
		</p>
	</section>

	<section id="gs-requirements" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">System Requirements</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime is engineered for minimal resource consumption and predictable self-hosting:
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Resource</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Requirement</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Notes</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">CPU & RAM</td>
						<td class="px-4 py-3 text-sm text-zinc-200">1 vCPU, 512 MB RAM</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Sufficient for up to 100 monitors checking at 60-second intervals.
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">Operating System</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Linux, macOS, Windows</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Runs natively as an OS binary or as a Docker container.
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">Container Runtime</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Docker 24+ &amp; Compose v2.20+</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Optional if running the standalone binary with SQLite.
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">Network Port</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-200">27346</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Serves HTTP REST API, embedded UI, and real-time WebSocket.
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section id="gs-docker-deploy" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Quick Start via CLI</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Run Netra Uptime with a single command using the official CLI runner. It initializes your
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">.env</code>
			and
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>docker-compose.yml</code
			>
			configurations with secure random credentials in
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>~/.netra-uptime</code
			>
			and starts the production 2-service stack (<code class="font-mono text-zinc-300"
				>postgres</code
			>
			+ <code class="font-mono text-zinc-300">netra-uptime</code>).
		</p>

		<h3 class="mt-2 text-base font-medium tracking-tight text-zinc-200">
			Instant Run (No Installation Required)
		</h3>
		<InstallCommand id="gs-instant-run" variant="docs" />

		<h3 class="mt-2 text-base font-medium tracking-tight text-zinc-200">
			Global Installation (Optional)
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			If you prefer having the
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>netra-uptime</code
			>
			command permanently available in your terminal, install it globally and run
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>netra-uptime start</code
			> anywhere:
		</p>
		<InstallCommand id="gs-global-install" tabs={globalInstallTabs} variant="docs" />

		<h3 class="mt-2 text-base font-medium tracking-tight text-zinc-200">Manual Setup</h3>
		<p class="text-sm leading-7 text-zinc-400">
			If you prefer manual configuration without the CLI runner, clone the repository directly from
			GitHub and start Docker Compose:
		</p>
		<CodeBlock code={manualCloneCode} language="bash" id="gs-manual-clone" />
	</section>

	<section id="gs-cli-commands" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">CLI Command Reference</h2>
		<p class="text-sm leading-7 text-zinc-400">
			The Netra Uptime CLI manages container lifecycle, database credentials, and service logs in
			your workspace directory (defaults to
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>~/.netra-uptime</code
			>):
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Command</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Action</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime start</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Start Services</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Initializes configuration if missing and launches containers in detached mode (<code
								class="font-mono text-zinc-300">docker compose up -d</code
							>).
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime stop</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Stop Services</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Gracefully terminates all running containers (<code class="font-mono text-zinc-300"
								>docker compose down</code
							>).
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime restart</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Restart Services</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Restarts the application and database containers cleanly.
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime status</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Inspect Health</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Displays container status, healthchecks, and exposed ports (<code
								class="font-mono text-zinc-300">docker compose ps</code
							>).
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime logs</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Stream Logs</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Streams consolidated real-time logs from containers (<code
								class="font-mono text-zinc-300">--tail 100</code
							>).
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime credentials</td>
						<td class="px-4 py-3 text-sm text-zinc-200">View Secrets</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Displays generated database passwords and configuration paths (alias: <code
								class="font-mono text-zinc-300">creds</code
							>).
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime update</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Upgrade Image</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Pulls the latest images from GitHub Container Registry and recreates containers.
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime init</td>
						<td class="px-4 py-3 text-sm text-zinc-200">Scaffold Files</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Generates <code class="font-mono text-zinc-300">.env</code> and
							<code class="font-mono text-zinc-300">docker-compose.yml</code> with secure random credentials
							without starting containers.
						</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">netra-uptime help</td>
						<td class="px-4 py-3 text-sm text-zinc-200">CLI Help</td>
						<td class="px-4 py-3 text-xs text-zinc-400">
							Prints available commands, subcommands, and flags.
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mt-2 text-base font-medium tracking-tight text-zinc-200">CLI Flags &amp; Options</h3>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>--port &lt;n&gt;</code
				>
				— Host port for the web dashboard (default:
				<code class="font-mono text-zinc-300">27346</code>).
			</li>
			<li>
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>--dir &lt;path&gt;</code
				>
				— Installation and workspace directory (default:
				<code class="font-mono text-zinc-300">~/.netra-uptime</code>).
			</li>
			<li>
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>--force</code
				>
				— Overwrite existing <code class="font-mono text-zinc-300">.env</code> and
				<code class="font-mono text-zinc-300">docker-compose.yml</code> during
				<code class="font-mono text-zinc-300">init</code>.
			</li>
		</ul>
	</section>

	<section id="gs-standalone" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Standalone Binary (SQLite)</h2>
		<p class="text-sm leading-7 text-zinc-400">
			In addition to Docker Compose, Netra Uptime can run as a single standalone executable with
			pure-Go embedded SQLite. In this mode, no PostgreSQL or Docker runtime is needed—the entire
			application, database engine, web assets, and worker routines execute within a single
			lightweight process:
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			Configure SQLite mode by providing a minimal <code
				class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">.env</code
			> file:
		</p>
		<CodeBlock code={standaloneEnvCode} language="env" id="gs-standalone-env" />

		<p class="text-sm leading-7 text-zinc-400">Build and execute the standalone binary directly:</p>
		<CodeBlock code={standaloneRunCode} language="bash" id="gs-standalone-run" />

		<p class="text-sm leading-7 text-zinc-400">
			When started with <code class="font-mono text-zinc-300">DB_DRIVER=sqlite</code>, the engine
			automatically configures SQLite Write-Ahead Logging (<code class="font-mono text-zinc-300"
				>PRAGMA journal_mode=WAL</code
			>), sets busy timeout to 5000ms, and pools connections safely with
			<code class="font-mono text-zinc-300">MaxOpenConns(1)</code>. If
			<code class="font-mono text-zinc-300">JWT_SECRET</code> is not provided, Netra Uptime
			generates and persists a cryptographic 64-character hex secret in
			<code class="font-mono text-zinc-300">.netra_secret</code> automatically.
		</p>
	</section>

	<section id="gs-verify" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Verifying Services &amp; Healthcheck
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Once Netra Uptime is running, the web dashboard is accessible at
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>http://localhost:27346</code
			>. Verify service health and container status with the following commands:
		</p>
		<CodeBlock code={verifyCode} language="bash" id="gs-verify-code" />
	</section>

	<section id="gs-next-steps" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Next Steps</h2>
		<p class="text-sm leading-7 text-zinc-400">
			After your instance is up and running, configure your monitoring environment:
		</p>
		<ul class="list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Create Your First Monitor</strong> — Set up HTTP, TCP,
				or Ping monitors to begin tracking your services.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Configure Notifications</strong> — Connect Discord,
				Slack, Email, or custom webhook endpoints for incident delivery.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Set Up Alert Rules</strong> — Define latency thresholds
				and consecutive failure counts in reusable alert templates.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Create a Status Page</strong> — Publish 90-day uptime
				history and maintenance schedules on a public status page.
			</li>
		</ul>
	</section>
</div>
