<script lang="ts">
	import {
		Copy,
		Check,
		Server,
		Database,
		Cpu,
		HardDrive,
		Terminal,
		ArrowRight,
		ExternalLink,
		Zap
	} from 'lucide-svelte';

	let copied = $state('');

	async function copyText(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copied = id;
		setTimeout(() => (copied = ''), 2000);
	}
</script>

<div class="flex flex-col gap-16">
	<!-- Overview -->
	<section id="gs-overview" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Overview</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			PulseWatch is an open-source, self-hosted uptime monitoring platform built with <strong
				class="text-[#e5e2e3]">Go</strong
			>
			and <strong class="text-[#e5e2e3]">Svelte</strong>. It monitors your websites, APIs, and
			infrastructure with multi-protocol health checks (HTTP, TCP, Ping, SSL, Domain) and alerts
			your team via Email, Slack, Discord, or custom webhooks the moment something goes wrong.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<Zap size={20} class="mb-3 text-[#4edea3]" />
				<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">Single Container</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Go backend + Svelte frontend in one Docker image. No microservices complexity.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<Server size={20} class="mb-3 text-[#4edea3]" />
				<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">Self-Hosted</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Full control over your data. No external dependencies or vendor lock-in.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<Database size={20} class="mb-3 text-[#4edea3]" />
				<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">PostgreSQL + Redis</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Reliable storage with Redis-powered rate limiting and caching.
				</p>
			</div>
		</div>
	</section>

	<!-- CLI Deployment -->
	<section id="gs-docker-deploy" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Quick Start via CLI</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Run PulseWatch instantly with a single command using the official CLI runner. It automatically initializes your <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">.env</code> and <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">docker-compose.yml</code> configurations with cryptographically secure random credentials and starts the containers.
		</p>

		<!-- Instant Run -->
		<div class="flex flex-col gap-3">
			<h3 class="font-display text-lg font-semibold text-[#e5e2e3]">Instant Run (No Installation Required)</h3>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
						<Terminal size={13} class="text-[#4edea3]/60" /> bash
					</div>
					<button
						onclick={() => copyText('npx pulsewatch start', 'step1')}
						class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
					>
						{#if copied === 'step1'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'step1' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span class="text-[#86948a]"># npm / npx</span>
<span class="text-[#4edea3]">$</span> npx pulsewatch start

<span class="text-[#86948a]"># pnpm</span>
<span class="text-[#4edea3]">$</span> pnpm dlx pulsewatch start

<span class="text-[#86948a]"># yarn</span>
<span class="text-[#4edea3]">$</span> yarn dlx pulsewatch start

<span class="text-[#86948a]"># bun</span>
<span class="text-[#4edea3]">$</span> bunx pulsewatch start</pre>
			</div>
		</div>

		<!-- Global Install Option -->
		<div class="flex flex-col gap-3">
			<h3 class="font-display text-lg font-semibold text-[#e5e2e3]">Global Installation (Optional)</h3>
			<p class="text-sm leading-relaxed text-[#bbcabf]">
				If you prefer having the <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">pulsewatch</code> command permanently available across your terminal:
			</p>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
						<Terminal size={13} class="text-[#4edea3]/60" /> bash
					</div>
					<button
						onclick={() => copyText('npm install -g pulsewatch\npulsewatch start', 'step2')}
						class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
					>
						{#if copied === 'step2'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'step2' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span class="text-[#86948a]"># npm</span>
<span class="text-[#4edea3]">$</span> npm install -g pulsewatch

<span class="text-[#86948a]"># pnpm</span>
<span class="text-[#4edea3]">$</span> pnpm add -g pulsewatch

<span class="text-[#86948a]"># yarn</span>
<span class="text-[#4edea3]">$</span> yarn global add pulsewatch

<span class="text-[#86948a]"># bun</span>
<span class="text-[#4edea3]">$</span> bun add -g pulsewatch

<span class="text-[#86948a]"># Then run anywhere:</span>
<span class="text-[#4edea3]">$</span> pulsewatch start</pre>
			</div>
		</div>

		<!-- Manual Clone Callout -->
		<div class="rounded-lg border border-white/10 bg-[#161a17] p-5">
			<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">Prefer Manual Setup?</h4>
			<p class="mt-1 text-xs leading-relaxed text-[#bbcabf]">
				If you prefer manual configuration without the CLI, you can clone the repository directly from GitHub and manage Docker Compose yourself:
			</p>
			<div class="relative mt-3 overflow-hidden rounded-md border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-4 py-2">
					<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
						<Terminal size={12} class="text-[#4edea3]/60" /> bash
					</div>
					<button
						onclick={() =>
							copyText(
								'git clone https://github.com/Xuerns/PulseWatch.git /opt/pulsewatch\ncd /opt/pulsewatch\ncp .env.example .env\ndocker compose up -d',
								'manual-clone'
							)}
						class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
					>
						{#if copied === 'manual-clone'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'manual-clone' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-4 font-mono text-xs leading-6 text-[#bbcabf]"><span class="text-[#4edea3]">$</span> git clone https://github.com/Xuerns/PulseWatch.git /opt/pulsewatch
<span class="text-[#4edea3]">$</span> cd /opt/pulsewatch &amp;&amp; cp .env.example .env
<span class="text-[#4edea3]">$</span> docker compose up -d</pre>
			</div>
		</div>
	</section>

	<!-- Verifying Services -->
	<section id="gs-verify" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Verifying Services & Healthcheck
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Once PulseWatch is running, the web dashboard is accessible at <span class="font-mono text-[#e5e2e3]">http://localhost:8080</span>. You can verify service health and container status with the following commands:
		</p>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
					<Terminal size={13} class="text-[#4edea3]/60" /> bash
				</div>
				<button
					onclick={() =>
						copyText('pulsewatch status\ncurl -s http://localhost:8080/healthz', 'verify')}
					class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
				>
					{#if copied === 'verify'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'verify' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
					class="text-[#86948a]"># Check container status</span
				>
<span class="text-[#4edea3]">$</span> pulsewatch status

<span class="text-[#86948a]"># Verify health endpoint</span>
<span class="text-[#4edea3]">$</span> curl -s http://localhost:8080/healthz
<span class="text-[#86948a]"># Expected: {"{"}"status":"ok"{"}"}</span>

<span class="text-[#86948a]"># View container logs</span>
<span class="text-[#4edea3]">$</span> pulsewatch logs</pre>
		</div>
	</section>

	<!-- Next Steps -->
	<section id="gs-next-steps" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Next Steps</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div
				class="group rounded-lg border border-white/5 bg-[#1a1d1b] p-6 transition-all hover:border-[#4edea3]/30"
			>
				<h4
					class="mb-2 font-display text-base font-semibold text-[#e5e2e3] transition-colors group-hover:text-[#4edea3]"
				>
					<ArrowRight size={14} class="mr-2 inline text-[#4edea3]/70" />Create Your First Monitor
				</h4>
				<p class="text-xs leading-relaxed text-[#bbcabf]">
					Set up HTTP, TCP, or Ping monitors to start tracking your services.
				</p>
			</div>
			<div
				class="group rounded-lg border border-white/5 bg-[#1a1d1b] p-6 transition-all hover:border-[#4edea3]/30"
			>
				<h4
					class="mb-2 font-display text-base font-semibold text-[#e5e2e3] transition-colors group-hover:text-[#4edea3]"
				>
					<ArrowRight size={14} class="mr-2 inline text-[#4edea3]/70" />Configure Notifications
				</h4>
				<p class="text-xs leading-relaxed text-[#bbcabf]">
					Set up Discord, Slack, Email, or webhook alerts for your team.
				</p>
			</div>
			<div
				class="group rounded-lg border border-white/5 bg-[#1a1d1b] p-6 transition-all hover:border-[#4edea3]/30"
			>
				<h4
					class="mb-2 font-display text-base font-semibold text-[#e5e2e3] transition-colors group-hover:text-[#4edea3]"
				>
					<ArrowRight size={14} class="mr-2 inline text-[#4edea3]/70" />Set Up Alert Rules
				</h4>
				<p class="text-xs leading-relaxed text-[#bbcabf]">
					Define latency thresholds and custom conditions for fine-grained alerts.
				</p>
			</div>
			<div
				class="group rounded-lg border border-white/5 bg-[#1a1d1b] p-6 transition-all hover:border-[#4edea3]/30"
			>
				<h4
					class="mb-2 font-display text-base font-semibold text-[#e5e2e3] transition-colors group-hover:text-[#4edea3]"
				>
					<ArrowRight size={14} class="mr-2 inline text-[#4edea3]/70" />Create a Status Page
				</h4>
				<p class="text-xs leading-relaxed text-[#bbcabf]">
					Share transparent uptime history with your users via public status pages.
				</p>
			</div>
		</div>
	</section>
</div>
