<script lang="ts">
	import type { ChecklistStep } from '$lib/data/docs';

	let { steps }: { steps: ChecklistStep[] } = $props();
</script>

<div class="mt-4 ml-2 flex flex-col gap-12 border-l border-white/5 pl-10 lg:pl-14">
	{#each steps as step (step.id)}
		<div class="relative flex flex-col gap-5">
			<div
				class="absolute top-1 -left-[64px] bg-[#1a1d1b] px-2 py-2 font-mono text-lg font-light text-[#4edea3]/60 lg:-left-[80px]"
			>
				{step.number}
			</div>
			<h3 class="font-display text-xl font-semibold text-[#e5e2e3]">{step.title}</h3>
			<p class="max-w-2xl text-sm leading-relaxed font-light text-[#bbcabf]">
				{step.description}
			</p>
			<div
				class="rounded-lg border border-white/5 bg-[#0e0e0f] p-6 font-mono text-sm text-[#bbcabf]/70 shadow-inner"
			>
				{#each step.commands as command, i (i)}
					<span class="text-[#4edea3]/60">$</span>
					{command}
					{#if i < step.commands.length - 1}
						<br /><br />
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>
