<script lang="ts">
	import { ArrowRight, BookOpen } from 'lucide-svelte';
	import FloatingLines from './FloatingLines.svelte';
	import InstallCommand from './InstallCommand.svelte';
	import LogoCloud from './LogoCloud.svelte';
	import DashboardPreview from './DashboardPreview.svelte';
	import { links, logos } from '$lib/data/landing';
</script>

<section id="top" class="relative overflow-hidden" aria-labelledby="hero-heading">
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-190 overflow-hidden opacity-70"
		style="mask-image: linear-gradient(180deg, #000 30%, transparent); -webkit-mask-image: linear-gradient(180deg, #000 30%, transparent)"
	>
		<FloatingLines
			enabledWaves={['top', 'bottom']}
			lineCount={8}
			lineDistance={100}
			bendRadius={5}
			bendStrength={1}
			interactive={false}
			parallax={true}
			linesGradient={['#4edea3', '#2dd4bf', '#10B981']}
		/>
	</div>

	<div class="relative mx-auto max-w-360 px-6 pt-32 pb-10 text-center lg:px-10 lg:pt-40">
		<p data-reveal class="pill">
			<img src={logos.github} alt="" class="h-3.5 w-3.5" />
			Open source · Self-hosted · AGPL-3.0
		</p>
		<h1
			data-reveal
			id="hero-heading"
			class="mx-auto mt-7 max-w-5xl font-display text-5xl leading-[1.04] tracking-[-0.035em] text-[#f1eeef] sm:text-6xl lg:text-7xl"
		>
			Self-hosted uptime monitoring <span class="text-gradient italic">&amp; status pages.</span>
		</h1>
		<p data-reveal class="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#bbcabf]">
			Netra Uptime watches your websites, APIs, and servers around the clock, opens an incident the
			moment something breaks, and alerts the right person on Slack, Discord, email, or webhook. One
			command to install. Your data never leaves your infrastructure.
		</p>

		<div data-reveal class="mt-10 flex justify-center">
			<InstallCommand id="hero" />
		</div>

		<div data-reveal class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<a
				id="hero-docs"
				href={links.docs}
				class="flex items-center gap-2 rounded-full bg-[#4edea3] px-6 py-3 text-sm font-semibold text-[#003824] shadow-[0_0_40px_-8px_#4edea3] transition-all hover:bg-[#6ffbbe]"
			>
				<BookOpen size={16} /> Read the docs
			</a>
			<a
				id="hero-github"
				href={links.github}
				class="flex items-center gap-2 rounded-full border border-white/15 bg-white/4 px-6 py-3 text-sm font-semibold text-[#e5e2e3] transition-colors hover:border-white/30 hover:bg-white/8"
			>
				<img src={logos.github} alt="" class="h-4 w-4" /> Star on GitHub
				<ArrowRight size={15} />
			</a>
		</div>

		<div data-reveal><LogoCloud /></div>
		<div data-reveal><DashboardPreview /></div>
	</div>
</section>
