<script lang="ts">
	import { onMount, tick } from 'svelte';
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
</script>

<aside
	data-lenis-prevent
	class="custom-scrollbar sticky top-14 hidden h-[calc(100vh-56px)] w-56 flex-shrink-0 overflow-y-auto py-10 pl-6 xl:block"
>
	{#if headings.length > 0}
		<div class="flex flex-col gap-3">
			<div class="text-xs font-medium text-zinc-300">On this page</div>

			<nav class="flex flex-col border-l border-zinc-800">
				{#each headings as heading (heading.id)}
					<button
						type="button"
						onclick={() => scrollToSection(heading.id)}
						class="-ml-px border-l-2 py-1.5 text-left text-xs transition-colors {heading.level === 3
							? 'pl-5'
							: 'pl-3'} {activeId === heading.id
							? 'border-[#4edea3] font-medium text-zinc-100'
							: 'border-transparent text-zinc-400 hover:text-zinc-200'}"
					>
						<span class="block truncate">{heading.title}</span>
					</button>
				{/each}
			</nav>
		</div>
	{/if}
</aside>
