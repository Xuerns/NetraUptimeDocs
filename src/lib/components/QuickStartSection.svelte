<script lang="ts">
	import { ArrowRight, Copy, Terminal } from 'lucide-svelte';

	const commands = [
		'git clone https://github.com/username/pulsewatch.git',
		'cd pulsewatch && cp .env.example .env',
		'docker compose up -d'
	];

	async function copyCommand(): Promise<void> {
		await navigator.clipboard.writeText(commands.join('\n'));
	}
</script>

<section id="quick-start" aria-labelledby="quick-start-heading">
	<div class="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-28">
		<div data-reveal>
			<p class="eyebrow"><span class="mr-2 text-[#4edea3]">06</span> Get running</p>
			<h2
				id="quick-start-heading"
				class="mt-5 font-display text-4xl tracking-tight text-[#e5e2e3] sm:text-5xl"
			>
				Start monitoring today.
			</h2>
			<p class="mx-auto mt-5 max-w-xl text-[#bbcabf]">
				Three commands stand between your team and a clearer picture of uptime.
			</p>
		</div>
		<div
			data-reveal
			class="mt-10 overflow-hidden rounded border border-outline-variant bg-[#201f20] text-left"
		>
			<div class="flex items-center justify-between border-b border-outline-variant px-5 py-3">
				<div class="flex items-center gap-2 font-mono text-xs tracking-wider text-[#bbcabf]">
					<Terminal size={15} class="text-[#4edea3]" /> BASH
				</div>
				<button
					class="flex items-center gap-2 text-xs text-[#bbcabf] transition-colors hover:text-[#4edea3]"
					onclick={copyCommand}
					aria-label="Copy setup commands"><Copy size={14} /> Copy</button
				>
			</div>
			<div class="overflow-x-auto p-5 font-mono text-sm leading-8 text-[#bbcabf]">
				{#each commands as command (command)}
					<div><span class="text-[#4edea3]">$</span> {command}</div>
				{/each}
			</div>
		</div>
		<p data-reveal class="mt-5 font-mono text-xs tracking-wide text-[#86948a]">
			THAT'S IT · PULSEWATCH IS RUNNING AT HTTP://LOCALHOST:8080
		</p>
		<a
			data-reveal
			href="#top"
			class="mt-9 inline-flex items-center gap-2 rounded border border-[#4edea3] bg-[#4edea3] px-5 py-3 font-semibold text-[#003824] transition-colors hover:bg-[#6ffbbe]"
			>See the full setup guide <ArrowRight size={17} /></a
		>
	</div>
</section>
