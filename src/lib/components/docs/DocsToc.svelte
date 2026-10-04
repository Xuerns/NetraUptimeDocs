<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Edit3, ExternalLink, ArrowUp } from 'lucide-svelte';
	import type { HeadingItem } from '$lib/data/docs';

	let { headings = [] }: { headings: HeadingItem[] } = $props();
	let activeId = $state('');

	let observer: IntersectionObserver | null = null;

	async function setupObserver() {
		if (observer) observer.disconnect();
		await tick();

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{
				rootMargin: '-80px 0% -60% 0%',
				threshold: [0, 1.0]
			}
		);

		headings.forEach((h) => {
			const el = document.getElementById(h.id);
			if (el) observer?.observe(el);
		});

		if (headings.length > 0 && !activeId) {
			activeId = headings[0].id;
		}
	}

	$effect(() => {
		if (headings) {
			setupObserver();
		}
	});

	onMount(() => {
		setupObserver();
		return () => observer?.disconnect();
	});

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			window.history.replaceState(null, '', `#${id}`);
			activeId = id;
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<aside
	data-lenis-prevent
	class="sticky top-14 hidden h-[calc(100vh-56px)] w-64 flex-shrink-0 overflow-y-auto px-6 py-10 xl:block"
>
	{#if headings.length > 0}
		<div class="flex flex-col gap-6">
			<div class="eyebrow text-[#bbcabf]/70">On this page</div>

			<nav class="flex flex-col gap-1 border-l border-[#3c4a42]/50 pl-3">
				{#each headings as heading (heading.id)}
					<button
						onclick={() => scrollToSection(heading.id)}
						class="group flex w-full items-center text-left text-xs transition-colors duration-200 {heading.level ===
						3
							? 'pl-3'
							: ''} {activeId === heading.id
							? 'font-medium text-[#4edea3]'
							: 'text-[#bbcabf] hover:text-[#e5e2e3]'}"
					>
						<span class="truncate">{heading.title}</span>
					</button>
				{/each}
			</nav>
		</div>
	{/if}
</aside>
