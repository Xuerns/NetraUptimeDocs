<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import AudienceSection from '$lib/components/AudienceSection.svelte';
	import FeatureSection from '$lib/components/FeatureSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import OpenSourceSection from '$lib/components/OpenSourceSection.svelte';
	import ProblemSection from '$lib/components/ProblemSection.svelte';
	import QuickStartSection from '$lib/components/QuickStartSection.svelte';

	function animatePage() {
		return gsap.context(() => {
			gsap.from('[data-reveal]', {
				duration: 0.7,
				y: 18,
				autoAlpha: 0,
				stagger: 0.08,
				ease: 'power2.out'
			});
		});
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

		const context = animatePage();

		return () => {
			context.revert();
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<title>PulseWatch — Know before your users do</title>
	<meta
		name="description"
		content="Open-source, self-hosted uptime monitoring for websites, APIs, and infrastructure."
	/>
</svelte:head>

<Navigation />
<main>
	<HeroSection />
	<ProblemSection />
	<FeatureSection />
	<AudienceSection />
	<OpenSourceSection />
	<QuickStartSection />
</main>
<Footer />
