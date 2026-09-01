<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import { docGroups } from '$lib/data/docs';
	import DocsNav from '$lib/components/docs/DocsNav.svelte';
	import DocsSidebar from '$lib/components/docs/DocsSidebar.svelte';
	import DocsMainContent from '$lib/components/docs/DocsMainContent.svelte';
	import DocsFooter from '$lib/components/docs/DocsFooter.svelte';
	import DocsSiteFooter from '$lib/components/docs/DocsSiteFooter.svelte';

	let activeItemId = $state('getting-started');

	function handleSelectItem(id: string) {
		activeItemId = id;
	}

	onMount(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		const context = gsap.context(() => {
			gsap.from('[data-reveal]', {
				duration: 0.7,
				y: 18,
				autoAlpha: 0,
				stagger: 0.08,
				ease: 'power2.out'
			});
		});

		return () => {
			context.revert();
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<title>PulseWatch | Documentation</title>
	<meta
		name="description"
		content="Documentation for PulseWatch uptime monitoring platform. Learn how to deploy, configure, and manage your monitoring setup."
	/>
</svelte:head>

<DocsNav />

<div class="flex w-full flex-grow">
	<DocsSidebar groups={docGroups} {activeItemId} onSelectItem={handleSelectItem} />

	<div class="flex min-w-0 flex-1 flex-col">
		<div data-reveal class="min-w-0 flex-1">
			<DocsMainContent {activeItemId} />
		</div>
		<div data-reveal class="px-8 lg:px-16 xl:px-20">
			<DocsFooter {activeItemId} onSelectItem={handleSelectItem} />
		</div>
		<DocsSiteFooter />
	</div>
</div>
