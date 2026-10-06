<script lang="ts">
	import { BadgeCheck, CalendarClock, Lock, Network, Sparkles } from 'lucide-svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { images } from '$lib/data/landing';
	import ShotImage from './ShotImage.svelte';

	const big = [
		{
			id: 'monitors',
			title: 'Real-time dashboard',
			copy: 'Response times, history, and current state for every monitor in one focused view. Trigger a check on demand.',
			image: images.monitors,
			file: 'feature-monitors',
			span: 'lg:col-span-7'
		},
		{
			id: 'status',
			title: 'Public status pages',
			copy: 'Share 90-day uptime history on your own subdomain, with logo, theme, and custom CSS.',
			image: images.statusPage,
			file: 'feature-status-page',
			span: 'lg:col-span-5'
		},
		{
			id: 'incident',
			title: 'Automatic incident timeline',
			copy: 'Incidents open and resolve themselves. Responders join and post updates in a shared record.',
			image: images.incident,
			file: 'feature-incident',
			span: 'lg:col-span-5'
		},
		{
			id: 'alerts',
			title: 'Smart alert rules',
			copy: 'Alert on status code, latency, or timeout, and require consecutive failures to avoid false alarms.',
			image: images.alertRules,
			file: 'feature-alert-rules',
			span: 'lg:col-span-7'
		}
	];

	const small = [
		{ title: 'Multi-protocol checks', copy: 'HTTP, TCP ports, and ICMP ping.', icon: Network },
		{
			title: 'SSL & domain expiry',
			copy: 'Know before a certificate or domain lapses.',
			icon: Lock
		},
		{
			title: 'Scheduled maintenance',
			copy: 'Planned windows with a public banner.',
			icon: CalendarClock
		},
		{ title: 'Live status badges', copy: 'Embed an SVG badge in your README.', icon: BadgeCheck }
	];
</script>

<section id="features" class="relative" aria-labelledby="features-heading">
	<div class="mx-auto max-w-360 px-6 py-24 lg:px-10 lg:py-32">
		<div data-reveal class="mx-auto max-w-3xl text-center">
			<p class="pill"><Sparkles size={13} /> The monitoring toolkit</p>
			<h2
				id="features-heading"
				class="mt-6 font-display text-4xl tracking-tight text-[#f1eeef] sm:text-5xl"
			>
				Everything reliability needs, <span class="text-gradient italic">in one binary.</span>
			</h2>
		</div>

		<div class="mt-16 grid gap-5 lg:grid-cols-12">
			{#each big as card (card.id)}
				<article
					data-reveal
					use:spotlight
					class="glass spotlight group flex flex-col overflow-hidden rounded-3xl {card.span}"
				>
					<div class="p-7 pb-5">
						<h3 class="font-display text-2xl text-[#f1eeef]">{card.title}</h3>
						<p class="mt-2 max-w-md text-sm leading-6 text-[#bbcabf]">{card.copy}</p>
					</div>
					<div
						class="relative mx-7 mt-auto h-56 overflow-hidden rounded-t-xl border border-b-0 border-white/10 transition-transform duration-500 group-hover:-translate-y-1"
					>
						<ShotImage
							src={card.image}
							file={card.file}
							alt="{card.title} screenshot"
							ratio="16 / 9"
						/>
					</div>
				</article>
			{/each}

			{#each small as card (card.title)}
				<article data-reveal use:spotlight class="glass spotlight rounded-3xl p-6 lg:col-span-3">
					<div
						class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4edea3]/10 text-[#4edea3] ring-1 ring-[#4edea3]/25"
					>
						<card.icon size={20} />
					</div>
					<h3 class="mt-5 font-display text-xl text-[#f1eeef]">{card.title}</h3>
					<p class="mt-2 text-sm leading-6 text-[#bbcabf]">{card.copy}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
