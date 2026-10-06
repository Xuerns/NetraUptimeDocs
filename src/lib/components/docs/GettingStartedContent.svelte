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

	<!-- Docker Deployment -->
	<section id="gs-docker-deploy" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Docker Deployment</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Get PulseWatch running in under 2 minutes with Docker:
		</p>

		<!-- Clone & Configure -->
		<div class="flex flex-col gap-3">
			<h3 class="font-display text-lg font-semibold text-[#e5e2e3]">Clone & Configure</h3>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
						<Terminal size={13} class="text-[#4edea3]/60" /> bash
					</div>
					<button
						onclick={() =>
							copyText(
								'git clone https://github.com/Xuerns/PulseWatch.git /opt/pulsewatch\ncd /opt/pulsewatch\ncp .env.example .env',
								'step1'
							)}
						class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
					>
						{#if copied === 'step1'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'step1' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
						class="text-[#4edea3]">$</span
					> git clone https://github.com/Xuerns/PulseWatch.git /opt/pulsewatch
<span class="text-[#4edea3]">$</span> cd /opt/pulsewatch
<span class="text-[#4edea3]">$</span> cp .env.example .env</pre>
			</div>
		</div>

		<!-- Environment Variables -->
		<div class="flex flex-col gap-3">
			<h3 class="font-display text-lg font-semibold text-[#e5e2e3]">Edit Environment Variables</h3>
			<p class="text-sm leading-relaxed text-[#bbcabf]">
				Open the <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>.env</code
				>
				file and update at minimum:
				<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>JWT_SECRET</code
				>,
				<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>POSTGRES_PASSWORD</code
				>, and
				<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>DB_PASSWORD</code
				>.
			</p>
		</div>

		<!-- Start Services -->
		<div class="flex flex-col gap-3">
			<h3 class="font-display text-lg font-semibold text-[#e5e2e3]">Start Services</h3>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
						<Terminal size={13} class="text-[#4edea3]/60" /> bash
					</div>
					<button
						onclick={() => copyText('docker compose up -d', 'step3')}
						class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
					>
						{#if copied === 'step3'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'step3' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
						class="text-[#4edea3]">$</span
					> docker compose up -d</pre>
			</div>
		</div>
	</section>

	<!-- Verifying Services -->
	<section id="gs-verify" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Verifying Services & Healthcheck
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			After starting, verify all services are healthy:
		</p>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
					<Terminal size={13} class="text-[#4edea3]/60" /> bash
				</div>
				<button
					onclick={() =>
						copyText('docker compose ps\ncurl -s http://localhost:8080/healthz', 'verify')}
					class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
				>
					{#if copied === 'verify'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'verify' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
					class="text-[#86948a]"># Check container status</span
				>
<span class="text-[#4edea3]">$</span> docker compose ps

<span class="text-[#86948a]"># Verify health endpoint</span>
<span class="text-[#4edea3]">$</span> curl -s http://localhost:8080/healthz
<span class="text-[#86948a]"># Expected: {'{'}"status":"ok"{'}'}</span>

<span class="text-[#86948a]"># View application logs</span>
<span class="text-[#4edea3]">$</span> docker compose logs -f web</pre>
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
