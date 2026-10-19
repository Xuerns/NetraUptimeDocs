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

	const currentSection = $derived(docSections.find((s) => s.id === activeItemId) ?? docSections[0]);
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
	<title>Netra Uptime | Documentation</title>
	<meta
		name="description"
		content="Documentation for Netra Uptime uptime monitoring platform. Learn how to deploy, configure, and manage your monitoring setup."
	/>
</svelte:head>

<div class="docs-fonts min-h-screen bg-[#0d0d0e] text-zinc-300">
	<DocsNav />

	<div class="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
		<DocsSidebar groups={docGroups} {activeItemId} onSelectItem={handleSelectItem} />

		<div class="flex min-w-0 flex-1 flex-col">
			<div data-reveal class="min-w-0 flex-1">
				<DocsMainContent {activeItemId} />
			</div>
			<div data-reveal class="mx-auto w-full max-w-3xl px-4 sm:px-8 lg:px-12">
				<DocsFooter {activeItemId} onSelectItem={handleSelectItem} />
			</div>
		</div>

		<DocsToc headings={currentHeadings} />
	</div>

	<DocsSiteFooter />
</div>
