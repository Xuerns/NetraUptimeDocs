<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import { architectureGroups, architectureSections } from '$lib/data/docs';
	import DocsNav from '$lib/components/docs/DocsNav.svelte';
	import DocsSidebar from '$lib/components/docs/DocsSidebar.svelte';
	import DocsMainContent from '$lib/components/docs/DocsMainContent.svelte';
	import DocsToc from '$lib/components/docs/DocsToc.svelte';
	import DocsFooter from '$lib/components/docs/DocsFooter.svelte';
	import DocsSiteFooter from '$lib/components/docs/DocsSiteFooter.svelte';

	let activeItemId = $state('architecture');

	const currentSection = $derived(
		architectureSections.find((s) => s.id === activeItemId) ?? architectureSections[0]
	);
	const currentHeadings = $derived(currentSection?.headings ?? []);

	function handleSelectItem(id: string) {
		activeItemId = id;
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'instant' });
			window.history.replaceState(null, '', `#${id}`);
		}
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
				duration: 0.5,
				y: 12,
				autoAlpha: 0,
				stagger: 0.06,
				ease: 'power2.out'
			});
		});

		function syncFromHash() {
			const hash = window.location.hash.slice(1);
			if (hash) {
				const section = architectureSections.find((s) => s.id === hash);
				if (section) {
					activeItemId = hash;
				}
			}
		}

		syncFromHash();
		window.addEventListener('hashchange', syncFromHash);

		return () => {
			window.removeEventListener('hashchange', syncFromHash);
			context.revert();
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<title>Netra Uptime | Architecture & Internals</title>
	<meta
		name="description"
		content="System architecture and internal design of Netra Uptime: Go concurrent worker pool, alert state machine, WebSocket rooms, Redis caching, and PostgreSQL data retention."
	/>
</svelte:head>

<div class="docs-fonts min-h-screen bg-[#0d0d0e] text-zinc-300">
	<DocsNav activeTab="architecture" />

	<div class="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
		<DocsSidebar groups={architectureGroups} {activeItemId} onSelectItem={handleSelectItem} />

		<div class="flex min-w-0 flex-1 flex-col">
			<div data-reveal class="min-w-0 flex-1">
				<DocsMainContent {activeItemId} sections={architectureSections} />
			</div>
			<div data-reveal class="mx-auto w-full max-w-3xl px-4 sm:px-8 lg:px-12">
				<DocsFooter
					{activeItemId}
					onSelectItem={handleSelectItem}
					sections={architectureSections}
				/>
			</div>
		</div>

		<DocsToc headings={currentHeadings} />
	</div>

	<DocsSiteFooter />
</div>
