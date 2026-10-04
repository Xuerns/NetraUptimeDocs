<script lang="ts">
	import { ImageIcon } from 'lucide-svelte';

	let {
		src,
		file,
		alt,
		ratio = '16 / 10',
		class: className = ''
	}: { src: string | null; file: string; alt: string; ratio?: string; class?: string } = $props();
</script>

{#if src}
	<img {src} {alt} loading="lazy" class="h-full w-full object-cover object-top {className}" />
{:else}
	<div
		role="img"
		aria-label={alt}
		style="aspect-ratio: {ratio}"
		class="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-[linear-gradient(135deg,#17211c,#0f1513)] text-center {className}"
	>
		<div
			class="absolute inset-0 opacity-60"
			style="background: radial-gradient(60% 60% at 30% 20%, rgba(78,222,163,.18), transparent 70%)"
		></div>
		<ImageIcon size={22} class="relative text-[#4edea3]/70" />
		<p class="relative font-mono text-[11px] text-[#bbcabf]">{alt}</p>
		<p class="relative font-mono text-[10px] text-[#86948a]">landing/{file}.webp</p>
	</div>
{/if}
