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

	const verifyCode = `# Check container status
netra-uptime status

# Verify health endpoint
curl -s http://localhost:8080/healthz
# Expected: {"status":"ok"}

# View container logs
netra-uptime logs`;
</script>

<div class="flex flex-col gap-10">
	<section id="gs-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Overview</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime is an open-source, self-hosted uptime monitoring platform built with Go and
			Svelte. It packages the Go backend worker pool and compiled SvelteKit frontend into a single
			container image backed by PostgreSQL and Redis.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			It monitors your websites, APIs, and infrastructure with multi-protocol health checks (HTTP,
			TCP, Ping, SSL, and Domain expiry) and alerts your team via Email, Slack, Discord, or custom
			webhooks without external dependencies or vendor lock-in.
		</p>
	</section>

	<section id="gs-docker-deploy" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Quick Start via CLI</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Run Netra Uptime with a single command using the official CLI runner. It initializes your
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">.env</code>
			and
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>docker-compose.yml</code
			> configurations with secure random credentials and starts the containers.
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
			If you prefer manual configuration without the CLI, clone the repository directly from GitHub
			and start Docker Compose:
		</p>
		<CodeBlock code={manualCloneCode} language="bash" id="gs-manual-clone" />
	</section>

	<section id="gs-verify" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Verifying Services & Healthcheck
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Once Netra Uptime is running, the web dashboard is accessible at
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>http://localhost:8080</code
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
