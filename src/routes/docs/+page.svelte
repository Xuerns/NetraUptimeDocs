<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import { docGroups, docSections } from '$lib/data/docs';
	import DocsNav from '$lib/components/docs/DocsNav.svelte';
	import DocsSidebar from '$lib/components/docs/DocsSidebar.svelte';
	import DocsMainContent from '$lib/components/docs/DocsMainContent.svelte';
	import DocsToc from '$lib/components/docs/DocsToc.svelte';
	import DocsFooter from '$lib/components/docs/DocsFooter.svelte';
	import DocsSiteFooter from '$lib/components/docs/DocsSiteFooter.svelte';

	let activeItemId = $state('getting-started');

	// Get headings for the current section to pass to TOC
	const currentSection = $derived(
		docSections.find((s) => s.id === activeItemId) ?? docSections[0]
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
				duration: 0.7,
				y: 18,
				autoAlpha: 0,
				stagger: 0.08,
				ease: 'power2.out'
			});
		});

		// Restore active section from URL hash
		const hash = window.location.hash.slice(1);
		if (hash) {
			const section = docSections.find((s) => s.id === hash);
			if (section) {
				activeItemId = hash;
			}
		}

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

<div class="flex w-full min-h-screen">
	<!-- Column 1: Left Navigation Sidebar (w-72, sticky) -->
	<DocsSidebar groups={docGroups} {activeItemId} onSelectItem={handleSelectItem} />

	<!-- Column 2: Main Content (flexible width) -->
	<div class="flex min-w-0 flex-1 flex-col">
		<div data-reveal class="min-w-0 flex-1">
			<DocsMainContent {activeItemId} />
		</div>
		<div data-reveal class="px-8 lg:px-16 xl:px-20">
			<DocsFooter {activeItemId} onSelectItem={handleSelectItem} />
		</div>
		<DocsSiteFooter />
	</div>

	<!-- Column 3: TOC Right "On this page" (w-64, sticky, visible on xl: >= 1280px) -->
	<DocsToc headings={currentHeadings} />
</div>
