<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, Bell, KeyRound, Lock, Network } from 'lucide-svelte';
	import { images } from '$lib/data/landing';
	import ShotImage from './ShotImage.svelte';

	const primaryFeatures = [
		{
			id: 'monitors',
			title: 'Real-time monitor telemetry',
			copy: 'Track response times, uptime ratios, and check history across all endpoints in a live WebSocket-driven dashboard. Trigger manual checks on demand.',
			image: images.monitors,
			file: 'feature-monitors',
			hash: '#monitors',
			linkLabel: 'Monitors documentation'
		},
		{
			id: 'status',
			title: 'Public status pages',
			copy: 'Publish 90-day uptime bars, component groups, scheduled maintenance windows, and machine-readable JSON feeds on custom subdomains.',
			image: images.statusPage,
			file: 'feature-status-page',
			hash: '#status-pages',
			linkLabel: 'Status page guide'
		},
		{
			id: 'incident',
			title: 'Automatic incident timelines',
			copy: 'Incidents open on breach and resolve automatically upon recovery. Assign a Person-in-Charge and record timestamped status transitions.',
			image: images.incident,
			file: 'feature-incident',
			hash: '#incidents-notifications',
			linkLabel: 'Incident lifecycle docs'
		},
		{
			id: 'alerts',
			title: 'Template-first alert rules',
			copy: 'Evaluate status codes, latency thresholds, and timeouts with consecutive breach counters to eliminate false-positive alert fatigue.',
			image: images.alertRules,
			file: 'feature-alert-rules',
			hash: '#alert-rules',
			linkLabel: 'Alert rules guide'
		}
	];

	const secondaryFeatures = [
		{
			title: 'Multi-protocol checks',
			copy: 'HTTP/HTTPS header and payload assertions, TCP port handshakes, and ICMP ping probes.',
			hash: '#monitors',
			icon: Network
		},
		{
			title: 'SSL & domain expiry',
			copy: 'Daily background worker tracking TLS certificate chains and WHOIS/RDAP domain expiration.',
			hash: '#ssl-domain-runner',
			icon: Lock
		},
		{
			title: 'Multi-channel dispatch',
			copy: 'Deliver alerts to Slack, Discord, SMTP email, and SSRF-protected custom HTTP webhooks.',
			hash: '#notification-channels',
			icon: Bell
		},
		{
			title: 'Strict RBAC & API keys',
			copy: 'Multi-tenant organizations with Owner, Admin, and Member roles plus scoped REST API keys.',
			hash: '#permissions',
			icon: KeyRound
		}
	];
</script>

<section id="features" class="border-t border-zinc-800/80" aria-labelledby="features-heading">
	<div class="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div data-reveal class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<h2
					id="features-heading"
					class="font-display text-3xl tracking-tight text-zinc-100 sm:text-4xl"
				>
					Everything reliability needs, <span class="text-[#4edea3] italic">in one binary.</span>
				</h2>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
					Core monitoring, incident management, alerting, and public status pages compiled into a
					single deployment.
				</p>
			</div>
			<a
				href="{resolve('/docs')}#monitors"
				class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-[#4edea3]"
			>
				Explore all capabilities <ArrowRight size={14} />
			</a>
		</div>

		<div class="mt-8 grid gap-4 lg:grid-cols-2">
			{#each primaryFeatures as card (card.id)}
				<article data-reveal class="panel flex flex-col justify-between overflow-hidden rounded-lg">
					<div class="p-6">
						<div class="flex items-start justify-between gap-4">
							<h3 class="text-lg font-semibold tracking-tight text-zinc-100">{card.title}</h3>
							<a
								href="{resolve('/docs')}{card.hash}"
								class="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#4edea3] transition-opacity hover:opacity-80"
							>
								{card.linkLabel}
								<ArrowRight size={13} />
							</a>
						</div>
						<p class="mt-2 text-sm leading-6 text-zinc-400">{card.copy}</p>
					</div>
					<div class="border-t border-zinc-800/80 bg-[#0d0d0e]">
						<div class="aspect-16/9">
							<ShotImage
								src={card.image}
								file={card.file}
								alt="{card.title} screenshot"
								ratio="16 / 9"
							/>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each secondaryFeatures as item (item.title)}
				<a
					data-reveal
					href="{resolve('/docs')}{item.hash}"
					class="panel panel-interactive group flex flex-col justify-between rounded-lg p-5"
				>
					<div>
						<div class="flex items-center justify-between">
							<div
								class="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-[#4edea3]"
							>
								<item.icon size={16} />
							</div>
							<ArrowRight
								size={14}
								class="text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#4edea3]"
							/>
						</div>
						<h3
							class="mt-4 text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-[#4edea3]"
						>
							{item.title}
						</h3>
						<p class="mt-1.5 text-xs leading-5 text-zinc-400">{item.copy}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
