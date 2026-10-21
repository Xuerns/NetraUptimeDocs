<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from 'lenis';
	import ArchitectureSection from '$lib/components/ArchitectureSection.svelte';
	import FaqSection from '$lib/components/FaqSection.svelte';
	import FeatureSection from '$lib/components/FeatureSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	function animatePage() {
		gsap.registerPlugin(ScrollTrigger);
		return gsap.context(() => {
			const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
			gsap.set(items, { y: 16, autoAlpha: 0 });
			ScrollTrigger.batch(items, {
				start: 'top 92%',
				once: true,
				onEnter: (batch) =>
					gsap.to(batch, {
						y: 0,
						autoAlpha: 1,
						duration: 0.55,
						stagger: 0.06,
						ease: 'power2.out'
					})
			});
		});
	}

	onMount(() => {
		const lenis = new Lenis({
			duration: 1.1,
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
	<title>Netra Uptime | Self-hosted uptime monitoring &amp; status pages</title>
	<meta
		name="description"
		content="Netra Uptime is an open-source, self-hosted uptime monitor with incident management, alerts to Slack and Discord, and public status pages. Install with one command."
	/>
	<meta property="og:title" content="Netra Uptime | Self-hosted uptime monitoring & status pages" />
	<meta
		property="og:description"
		content="Open-source uptime monitoring, incident management, and public status pages you host yourself."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div class="landing min-h-screen">
	<Navigation />
	<main class="relative">
		<HeroSection />
		<FeatureSection />
		<ArchitectureSection />
		<FaqSection />
	</main>
	<Footer />
</div>
