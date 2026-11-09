<script lang="ts">
	import { onMount } from 'svelte';

	let root = $state<HTMLDivElement>();

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion || !root) return;

		let frame = 0;
		function onMove(event: PointerEvent) {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!root) return;
				const rect = root.getBoundingClientRect();
				root.style.setProperty('--mx', `${event.clientX - rect.left}px`);
				root.style.setProperty('--my', `${event.clientY - rect.top}px`);
			});
		}

		window.addEventListener('pointermove', onMove, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', onMove);
		};
	});
</script>

<div
	bind:this={root}
	class="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden"
	aria-hidden="true"
>
	<div class="hero-backdrop-fade absolute inset-0">
		<div class="hero-grid absolute inset-0"></div>
		<div class="hero-grid-glow absolute inset-0"></div>
	</div>
</div>
