<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import { apiGroups } from '$lib/data/api-reference';
	import ApiReferenceNav from '$lib/components/api-reference/ApiReferenceNav.svelte';
	import ApiReferenceSidebar from '$lib/components/api-reference/ApiReferenceSidebar.svelte';
	import ApiReferenceMain from '$lib/components/api-reference/ApiReferenceMain.svelte';
	import ApiReferenceCodePane from '$lib/components/api-reference/ApiReferenceCodePane.svelte';
	import ApiReferenceFooter from '$lib/components/api-reference/ApiReferenceFooter.svelte';
	import DocsSiteFooter from '$lib/components/docs/DocsSiteFooter.svelte';

	let activeEndpointId = $state('auth-register');

	const activeEndpoint = $derived(
		apiGroups.flatMap((g) => g.endpoints).find((e) => e.id === activeEndpointId) ??
			apiGroups[0].endpoints[0]
	);

	function handleSelectEndpoint(id: string) {
		activeEndpointId = id;
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'instant' });
			window.history.replaceState(null, '', `#${id}`);
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined' && window.location.hash) {
			const hash = window.location.hash.slice(1);
			if (apiGroups.flatMap((g) => g.endpoints).some((e) => e.id === hash)) {
				activeEndpointId = hash;
			}
		}

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

		return () => {
			context.revert();
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<title>Netra Uptime | API Reference</title>
	<meta
		name="description"
		content="REST API reference for Netra Uptime uptime monitoring platform. Integrate monitors, incidents, and status pages programmatically."
	/>
	<meta property="og:url" content="https://netrauptime.dev/docs/api-reference" />
	<meta property="og:title" content="Netra Uptime | API Reference" />
	<meta
		property="og:description"
		content="REST API reference for Netra Uptime uptime monitoring platform. Integrate monitors, incidents, and status pages programmatically."
	/>
	<meta name="twitter:url" content="https://netrauptime.dev/docs/api-reference" />
	<meta name="twitter:title" content="Netra Uptime | API Reference" />
	<meta
		name="twitter:description"
		content="REST API reference for Netra Uptime uptime monitoring platform. Integrate monitors, incidents, and status pages programmatically."
	/>
</svelte:head>

<div class="docs-fonts min-h-screen bg-[#0d0d0e] text-zinc-300">
	<ApiReferenceNav />

	<div class="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
		<ApiReferenceSidebar
			groups={apiGroups}
			{activeEndpointId}
			onSelectEndpoint={handleSelectEndpoint}
		/>

		<div class="flex min-w-0 flex-1 flex-col xl:flex-row xl:gap-8">
			<div data-reveal class="min-w-0 flex-1">
				<ApiReferenceMain endpoint={activeEndpoint} />
				<div data-reveal class="px-4 sm:px-8">
					<ApiReferenceFooter {activeEndpointId} onSelectEndpoint={handleSelectEndpoint} />
				</div>
			</div>
			<div data-reveal class="min-w-0 flex-shrink-0 xl:w-[380px] 2xl:w-[420px]">
				<ApiReferenceCodePane codeExample={activeEndpoint.codeExample} />
			</div>
		</div>
	</div>

	<DocsSiteFooter />
</div>
