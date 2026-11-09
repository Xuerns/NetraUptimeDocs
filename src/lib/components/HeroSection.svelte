<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, ArrowUpRight, BookOpen, Code2, Cpu, Layers, Terminal } from 'lucide-svelte';
	import InstallCommand from './InstallCommand.svelte';
	import DashboardPreview from './DashboardPreview.svelte';
	import HeroBackdrop from './HeroBackdrop.svelte';
	import LiveTicker from './LiveTicker.svelte';

	const quickDocs = [
		{
			title: 'Quick Start & CLI',
			description: 'Initialize configuration and launch containers with a single command.',
			route: '/docs' as const,
			hash: '#getting-started',
			icon: Terminal
		},
		{
			title: 'Docker Compose',
			description: 'Production topology, persistent volumes, and database backup guides.',
			route: '/docs' as const,
			hash: '#docker-compose',
			icon: Layers
		},
		{
			title: 'System Architecture',
			description: 'Go worker pool, alert state machine, and in-memory caching internals.',
			route: '/docs/architecture' as const,
			hash: '#architecture',
			icon: Cpu
		},
		{
			title: 'REST API Reference',
			description: 'Interactive endpoint specifications, authentication scopes, and curl examples.',
			route: '/docs/api-reference' as const,
			hash: '',
			icon: Code2
		}
	];
</script>

<section id="top" class="relative" aria-labelledby="hero-heading">
	<HeroBackdrop />
	<div class="relative mx-auto max-w-[1380px] px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
		<div class="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
			<div data-reveal class="lg:col-span-7">
				<h1
					id="hero-heading"
					class="font-display text-4xl leading-[1.08] tracking-tight text-zinc-100 sm:text-5xl lg:text-[3.35rem]"
				>
					Self-hosted uptime monitoring <span class="text-[#4edea3] italic"
						>&amp; status pages.</span
					>
				</h1>
				<p class="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
					Netra Uptime is a single-container Go and Svelte monitoring platform backed by PostgreSQL
					or embedded SQLite with thread-safe in-memory caching. Track HTTP, TCP, Ping, SSL, and
					domain expiry, manage incidents automatically, and route alerts to Slack, Discord, email,
					or webhooks.
				</p>

				<div class="mt-6 flex flex-wrap items-center gap-3">
					<a
						id="hero-docs"
						href={resolve('/docs')}
						class="inline-flex items-center gap-2 rounded-md bg-[#4edea3] px-4 py-2.5 text-xs font-semibold text-[#003824] transition-colors hover:bg-[#6ffbbe]"
					>
						<BookOpen size={15} /> Read Documentation
					</a>
					<a
						id="hero-api"
						href={resolve('/docs/api-reference')}
						class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-[#131315] px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
					>
						<Code2 size={15} class="text-zinc-400" /> API Reference
					</a>
					<a
						id="hero-github"
						href="https://github.com/Xuerns/Netra-Uptime"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-[#131315] px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
					>
						<span>GitHub Repository</span>
						<ArrowUpRight size={14} class="text-zinc-400" />
					</a>
				</div>
			</div>

			<div data-reveal class="lg:col-span-5">
				<InstallCommand id="hero" class="max-w-none" />
				<div class="mt-2.5 flex items-center justify-between text-xs text-zinc-500">
					<span
						>Starts web UI and workers on <code class="font-mono text-zinc-300"
							>localhost:27346</code
						></span
					>
					<a
						href="{resolve('/docs')}#docker-compose"
						class="inline-flex items-center gap-1 font-medium text-zinc-400 transition-colors hover:text-[#4edea3]"
					>
						Manual Docker setup <ArrowRight size={12} />
					</a>
				</div>
			</div>
		</div>

		<div data-reveal>
			<LiveTicker />
		</div>

		<div data-reveal>
			<DashboardPreview />
		</div>

		<div data-reveal class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each quickDocs as item (item.title)}
				<a
					href="{resolve(item.route)}{item.hash}"
					class="panel panel-interactive group flex flex-col justify-between rounded-lg p-4"
				>
					<div>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2 text-zinc-200">
								<item.icon size={16} class="text-[#4edea3]" />
								<h2 class="text-sm font-semibold tracking-tight group-hover:text-[#4edea3]">
									{item.title}
								</h2>
							</div>
							<ArrowRight
								size={14}
								class="text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#4edea3]"
							/>
						</div>
						<p class="mt-2 text-xs leading-5 text-zinc-400">{item.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
