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

	let activeEndpointId = $state('auth-register');

	const activeEndpoint = $derived(
		apiGroups.flatMap((g) => g.endpoints).find((e) => e.id === activeEndpointId) ??
			apiGroups[0].endpoints[0]
	);

	function handleSelectEndpoint(id: string) {
		activeEndpointId = id;
		if (typeof window !== 'undefined') {
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
	<title>PulseWatch | API Reference</title>
	<meta
		name="description"
		content="REST API reference for PulseWatch uptime monitoring platform. Integrate monitors, incidents, and status pages programmatically."
	/>
</svelte:head>

<ApiReferenceNav />

<div class="docs-fonts flex w-full flex-grow">
	<ApiReferenceSidebar
		groups={apiGroups}
		{activeEndpointId}
		onSelectEndpoint={handleSelectEndpoint}
	/>

	<div class="flex min-w-0 flex-grow flex-col xl:flex-row">
		<div data-reveal class="min-w-0 flex-1">
			<ApiReferenceMain endpoint={activeEndpoint} />
			<div data-reveal class="px-6 md:px-8 xl:px-10">
				<ApiReferenceFooter {activeEndpointId} onSelectEndpoint={handleSelectEndpoint} />
			</div>
		</div>
		<div data-reveal class="min-w-0 flex-shrink-0 xl:w-[440px] 2xl:w-[520px]">
			<ApiReferenceCodePane codeExample={activeEndpoint.codeExample} />
		</div>
	</div>
</div>
