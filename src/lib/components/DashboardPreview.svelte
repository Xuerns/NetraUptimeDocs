<script lang="ts">
	import { images } from '$lib/data/landing';
	import ShotImage from './ShotImage.svelte';
</script>

<div class="mx-auto mt-6 max-w-[1380px]">
	<div data-tilt class="overflow-hidden rounded-lg border border-zinc-800 bg-[#101112]">
		<div
			class="flex items-center justify-between border-b border-zinc-800/80 bg-[#131315] px-4 py-2.5"
		>
			<div class="flex items-center gap-1.5">
				<span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
				<span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
				<span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
			</div>
			<div class="font-mono text-[11px] text-zinc-400">http://localhost:27346/dashboard</div>
			<div class="w-10"></div>
		</div>
		<div class="aspect-16/10 bg-[#0d0d0e]">
			<ShotImage
				src={images.dashboard}
				file="dashboard-overview"
				alt="Netra Uptime dashboard overview"
				ratio="16 / 10"
			/>
		</div>
	</div>
</div>
