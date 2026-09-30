<script lang="ts">
	import {
		BellRing,
		ChartNoAxesCombined,
		HeartPulse,
		Network,
		RadioTower,
		ShieldCheck,
		BadgeCheck,
		CalendarClock,
		Lock
	} from 'lucide-svelte';

	const features = [
		{
			title: 'Multi-protocol checks',
			copy: 'Test HTTP, TCP ports, and ping targets across your stack.',
			icon: Network
		},
		{
			title: 'Smart detection',
			copy: 'Verify three consecutive failures before declaring an incident.',
			icon: ShieldCheck
		},
		{
			title: 'Targeted alerts',
			copy: 'Route Email, Slack, Discord, and webhook alerts to the responsible owner.',
			icon: BellRing
		},
		{
			title: 'Real-time dashboard',
			copy: 'See response times, history, and current state in one focused view.',
			icon: ChartNoAxesCombined
		},
		{
			title: 'Public status pages',
			copy: 'Share transparent 90-day uptime history with the people who depend on you.',
			icon: RadioTower
		},
		{
			title: 'Incident management',
			copy: 'Capture updates and context in an automatic, chronological incident record.',
			icon: HeartPulse
		},
		{
			title: 'SSL & Domain checks',
			copy: 'Track SSL/TLS certificate expiry and WHOIS domain renewal dates before they lapse.',
			icon: Lock
		},
		{
			title: 'Scheduled maintenance',
			copy: 'Set maintenance windows that suppress false alarms and show a public banner.',
			icon: CalendarClock
		},
		{
			title: 'GitHub status badges',
			copy: 'Embed a dynamic SVG badge in your README that reflects live service status.',
			icon: BadgeCheck
		}
	];
</script>

<section id="features" class="border-b border-outline-variant" aria-labelledby="features-heading">
	<div class="mx-auto max-w-360 px-6 py-20 lg:px-10 lg:py-28">
		<div data-reveal class="flex flex-col justify-between gap-5 md:flex-row md:items-end">
			<div>
				<p class="eyebrow"><span class="mr-2 text-[#4edea3]">03</span> The monitoring toolkit</p>
				<h2
					id="features-heading"
					class="mt-5 font-display text-4xl tracking-tight text-[#e5e2e3] sm:text-5xl"
				>
					Everything reliability needs.
				</h2>
			</div>
		</div>
		<div
			class="mt-14 grid gap-px overflow-hidden rounded border border-outline-variant bg-[#3c4a42] md:grid-cols-2 lg:grid-cols-3"
		>
			{#each features as feature, index (feature.title)}
				<article
					data-reveal
					class="group flex min-h-64 flex-col bg-[#201f20] p-6 transition-colors hover:bg-[#2a2a2b]"
				>
					<div class="flex items-start justify-between">
						<feature.icon size={22} class="text-[#4edea3]" />
						<span class="font-mono text-xs text-[#86948a]">0{index + 1}</span>
					</div>
					<div class="mt-auto pt-10">
						<h3 class="font-display text-2xl text-[#e5e2e3]">{feature.title}</h3>
						<p class="mt-3 text-sm leading-6 text-[#bbcabf]">{feature.copy}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
