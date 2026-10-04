<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import InstallCommand from './InstallCommand.svelte';
	import { links, logos } from '$lib/data/landing';
</script>

<section id="quick-start" class="relative" aria-labelledby="quick-start-heading">
	<div class="mx-auto max-w-5xl px-6 py-24 lg:px-10 lg:py-32">
		<div
			data-reveal
			class="relative overflow-hidden rounded-[2rem] border border-[#4edea3]/20 px-6 py-16 text-center sm:px-12"
			style="background: radial-gradient(70% 90% at 50% 0%, rgba(78,222,163,.16), transparent 70%), linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01))"
		>
			<h2
				id="quick-start-heading"
				class="font-display text-4xl tracking-tight text-[#f1eeef] sm:text-5xl"
			>
				Start monitoring <span class="text-gradient italic">today.</span>
			</h2>
			<p class="mx-auto mt-5 max-w-xl text-[#bbcabf]">
				Run one command and PulseWatch is up at <span class="font-mono text-[#e5e2e3]"
					>localhost:8080</span
				>.
			</p>
			<div class="mt-9 flex justify-center">
				<InstallCommand id="cta" />
			</div>
			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					id="cta-docs"
					href={links.docs}
					class="inline-flex items-center gap-2 rounded-full bg-[#4edea3] px-6 py-3 text-sm font-semibold text-[#003824] shadow-[0_0_40px_-8px_#4edea3] transition-colors hover:bg-[#6ffbbe]"
				>
					See the full setup guide <ArrowRight size={16} />
				</a>
				<a
					id="cta-github"
					href={links.github}
					class="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[#e5e2e3] transition-colors hover:bg-white/8"
				>
					<img src={logos.github} alt="" class="h-4 w-4" /> View on GitHub
				</a>
			</div>
		</div>
	</div>
</section>
