<script lang="ts">
	import { worksWith } from '$lib/data/landing';

	// Duplicated so the marquee loops seamlessly.
	const loop = [...worksWith, ...worksWith];
</script>

<div class="relative mx-auto mt-14 max-w-4xl">
	<p class="text-center font-mono text-[11px] tracking-[0.18em] text-[#86948a] uppercase">
		Works with your stack
	</p>
	<div
		class="mt-6 overflow-hidden"
		style="mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)"
	>
		<ul class="marquee-track gap-12">
			{#each loop as item, i (i)}
				<li class="flex items-center gap-2.5 pr-12 opacity-75 transition-opacity hover:opacity-100">
					<img src={item.logo} alt="" class="h-6 w-6" />
					<span class="text-sm font-medium text-[#bbcabf]">{item.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
