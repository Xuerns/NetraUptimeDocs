<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, Mail, Webhook } from 'lucide-svelte';
	import { logos } from '$lib/data/landing';

	const pillars = [
		{
			name: 'Monitoring Engine',
			tech: 'Go Worker Pool',
			logo: logos.go,
			copy: 'Deterministic tick scheduler and bounded goroutine worker pool executing HTTP, TCP, and unprivileged Ping probes concurrently.',
			hash: '#monitoring-engine'
		},
		{
			name: 'Alert State Machine',
			tech: 'Rule Evaluator',
			logo: logos.svelte,
			copy: 'Separates amber timeouts from red connection failures and enforces consecutive breach counts before opening incidents.',
			hash: '#alert-evaluation'
		},
		{
			name: 'Data & 90-Day Rollup',
			tech: 'PostgreSQL / SQLite',
			logo: logos.postgresql,
			copy: 'Stores incidents, audit trails, and check results with automated hourly aggregation to keep 90-day queries fast.',
			hash: '#data-retention'
		},
		{
			name: 'Cache & Live Socket',
			tech: 'Go MemoryCache + WS',
			logo: logos.go,
			copy: 'In-process thread-safe read-through caching, sliding-window rate limiting, and room-isolated WebSocket broadcasting.',
			hash: '#caching-rate-limit'
		}
	];

	const channels = [
		{
			name: 'Slack',
			copy: 'Block Kit payloads with target URL, failure reason, and incident link.',
			logo: logos.slack,
			hash: '#slack'
		},
		{
			name: 'Discord',
			copy: 'Color-coded rich embeds for incident open, degraded, and resolved states.',
			logo: logos.discord,
			hash: '#discord'
		},
		{
			name: 'Email (SMTP)',
			copy: 'HTML incident and recovery notifications over your own SMTP relay.',
			icon: Mail,
			hash: '#email'
		},
		{
			name: 'Custom Webhooks',
			copy: 'Structured JSON events with strict private-network SSRF protection.',
			icon: Webhook,
			hash: '#webhook'
		}
	];
</script>

<section
	id="architecture"
	class="border-t border-zinc-800/80"
	aria-labelledby="architecture-heading"
>
	<div class="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div data-reveal class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<h2
					id="architecture-heading"
					class="font-display text-3xl tracking-tight text-zinc-100 sm:text-4xl"
				>
					Engineered for <span class="text-[#4edea3] italic">predictable self-hosting.</span>
				</h2>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
					A single Go binary serving the REST API, concurrent check workers, and compiled Svelte
					frontend, backed by PostgreSQL or SQLite with zero external cache dependencies.
				</p>
			</div>
			<a
				href="{resolve('/docs/architecture')}#architecture"
				class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-[#4edea3]"
			>
				Read system architecture <ArrowRight size={14} />
			</a>
		</div>

		<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each pillars as pillar (pillar.name)}
				<a
					data-reveal
					href="{resolve('/docs/architecture')}{pillar.hash}"
					class="panel panel-interactive group flex flex-col justify-between rounded-lg p-5"
				>
					<div>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<img src={pillar.logo} alt="" class="h-4 w-4 object-contain" />
								<span class="font-mono text-[11px] text-zinc-400">{pillar.tech}</span>
							</div>
							<ArrowRight
								size={14}
								class="text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#4edea3]"
							/>
						</div>
						<h3
							class="mt-3 text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-[#4edea3]"
						>
							{pillar.name}
						</h3>
						<p class="mt-1.5 text-xs leading-5 text-zinc-400">{pillar.copy}</p>
					</div>
				</a>
			{/each}
		</div>

		<div data-reveal class="panel mt-4 rounded-lg p-6">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
				<div>
					<h3 class="text-lg font-semibold tracking-tight text-zinc-100">
						Alert routing &amp; notification dispatch
					</h3>
					<p class="mt-1 text-sm leading-6 text-zinc-400">
						Route each monitor to specific channels and assign a Person-in-Charge. Every dispatch
						attempt is recorded for auditability.
					</p>
				</div>
				<a
					href="{resolve('/docs')}#notification-channels"
					class="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#4edea3] transition-opacity hover:opacity-80"
				>
					Channels overview <ArrowRight size={13} />
				</a>
			</div>

			<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each channels as channel (channel.name)}
					<a
						href="{resolve('/docs')}{channel.hash}"
						class="group rounded-md border border-zinc-800/90 bg-[#0f0f11] p-4 transition-colors hover:border-[#4edea3]/45 hover:bg-[#141417]"
					>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2.5">
								{#if channel.logo}
									<img src={channel.logo} alt="" class="h-4 w-4 object-contain" />
								{:else if channel.icon}
									<channel.icon size={16} class="text-[#4edea3]" />
								{/if}
								<span class="text-sm font-medium text-zinc-100 group-hover:text-[#4edea3]">
									{channel.name}
								</span>
							</div>
							<ArrowRight
								size={13}
								class="text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#4edea3]"
							/>
						</div>
						<p class="mt-1.5 text-xs leading-5 text-zinc-400">{channel.copy}</p>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
