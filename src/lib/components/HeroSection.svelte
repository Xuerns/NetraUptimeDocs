<script lang="ts">
	import { ArrowRight, Code2, Server, Terminal } from 'lucide-svelte';

	const proofPoints = [
		{
			title: 'Open source',
			copy: 'Inspect the code. Shape the roadmap. Own the stack.',
			icon: Code2
		},
		{
			title: 'Self-hosted',
			copy: 'Your telemetry stays on infrastructure you control.',
			icon: Server
		},
		{
			title: 'Free forever',
			copy: 'Every feature, without a metered monitoring bill.',
			icon: Terminal
		}
	];
</script>

<section id="top" class="border-b border-outline-variant" aria-labelledby="hero-heading">
	<div class="mx-auto grid max-w-360 gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
		<div class="lg:col-span-8">
			<p data-reveal class="eyebrow mb-6">
				<span class="mr-2 text-[#4edea3]">01</span> Uptime, under your control
			</p>
			<h1
				data-reveal
				id="hero-heading"
				class="max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.035em] text-[#e5e2e3] sm:text-6xl lg:text-8xl"
			>
				Know before <em class="font-display text-[#4edea3]">your users</em> do.
			</h1>
			<p data-reveal class="mt-8 max-w-2xl text-lg leading-8 text-[#bbcabf]">
				A calm, capable command center for websites, APIs, and infrastructure. Detect failure early
				and route the right alert to the right person.
			</p>
			<div data-reveal class="mt-10 flex flex-col gap-3 sm:flex-row">
				<a
					href="#quick-start"
					class="flex items-center justify-center gap-2 rounded border border-[#4edea3] bg-[#4edea3] px-5 py-3 font-semibold text-[#003824] transition-colors hover:bg-[#6ffbbe]"
				>
					Deploy with Docker <Terminal size={17} />
				</a>
				<a
					href="#features"
					class="flex items-center justify-center gap-2 rounded border border-outline-variant px-5 py-3 font-semibold text-[#e5e2e3] transition-colors hover:border-[#86948a] hover:bg-[#201f20]"
				>
					Explore the system <ArrowRight size={17} />
				</a>
			</div>
		</div>

		<div
			data-reveal
			class="grid overflow-hidden rounded border border-outline-variant bg-[#3c4a42] lg:col-span-4"
		>
			{#each proofPoints as point (point.title)}
				<div class="border-b border-outline-variant bg-[#201f20] p-6 last:border-b-0">
					<point.icon size={22} class="mb-7 text-[#4edea3]" />
					<h2 class="font-display text-2xl text-[#e5e2e3]">{point.title}</h2>
					<p class="mt-2 text-sm leading-6 text-[#bbcabf]">{point.copy}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
