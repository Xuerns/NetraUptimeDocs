<script lang="ts">
	import { images } from '$lib/data/landing';
	import ShotImage from './ShotImage.svelte';
</script>

<div class="relative mx-auto mt-16 max-w-6xl px-2" style="perspective: 1800px">
	<div
		class="pointer-events-none absolute -inset-x-10 -top-10 h-3/4 rounded-full bg-[#4edea3]/20 blur-[110px]"
	></div>
	<div
		class="relative overflow-hidden rounded-2xl border border-white/12 bg-[#101112] shadow-[0_40px_120px_-30px_rgba(78,222,163,0.35)]"
		style="transform: rotateX(6deg); transform-origin: 50% 100%"
	>
		<div class="flex items-center gap-2 border-b border-white/8 bg-white/3 px-4 py-3">
			<span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#28c840]/80"></span>
			<div
				class="mx-auto rounded-md bg-white/5 px-10 py-1 font-mono text-[11px] text-[#86948a]"
			>
				pulsewatch.local / dashboard
			</div>
		</div>
		<div class="aspect-16/10">
			<ShotImage
				src={images.dashboard}
				file="dashboard-overview"
				alt="Dashboard overview screenshot"
				ratio="16 / 10"
			/>
		</div>
	</div>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#0d0d0e] to-transparent"
	></div>
</div>
