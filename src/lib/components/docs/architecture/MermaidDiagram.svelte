<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader, TriangleAlert } from 'lucide-svelte';

	let { definition, label }: { definition: string; label: string } = $props();

	let container: HTMLDivElement | undefined = $state();
	let status = $state<'loading' | 'ready' | 'error'>('loading');

	const diagramId = `mermaid-${Math.random().toString(36).slice(2, 10)}`;

	async function renderDiagram() {
		try {
			const { default: mermaid } = await import('mermaid');
			mermaid.initialize({
				startOnLoad: false,
				securityLevel: 'strict',
				theme: 'base',
				themeVariables: {
					background: '#0e0e0f',
					primaryColor: '#1a1d1b',
					primaryTextColor: '#e5e2e3',
					primaryBorderColor: '#4edea3',
					secondaryColor: '#1a1d1b',
					tertiaryColor: '#0e0e0f',
					lineColor: '#bbcabf',
					textColor: '#bbcabf',
					noteBkgColor: '#1a1d1b',
					noteTextColor: '#e5e2e3',
					actorBkg: '#1a1d1b',
					actorBorder: '#4edea3',
					actorTextColor: '#e5e2e3',
					signalColor: '#bbcabf',
					signalTextColor: '#e5e2e3',
					fontFamily: 'inherit'
				}
			});
			const { svg } = await mermaid.render(diagramId, definition);
			if (container) container.innerHTML = svg;
			status = 'ready';
		} catch {
			status = 'error';
		}
	}

	onMount(() => {
		renderDiagram();
	});
</script>

<figure class="flex flex-col gap-3" aria-label={label}>
	<div class="overflow-x-auto rounded-lg border border-white/5 bg-[#0e0e0f] p-4">
		{#if status === 'loading'}
			<div class="flex items-center gap-2 py-8 text-xs text-[#bbcabf]">
				<Loader size={14} class="animate-spin" />
				<span>Rendering diagram</span>
			</div>
		{:else if status === 'error'}
			<div class="flex items-center gap-2 py-8 text-xs text-amber-300">
				<TriangleAlert size={14} />
				<span>The diagram could not be rendered.</span>
			</div>
		{/if}
		<div
			bind:this={container}
			class="flex min-w-max justify-center"
			role="img"
			aria-label={label}
		></div>
	</div>
	<figcaption class="text-center font-mono text-xs text-[#bbcabf]/60">{label}</figcaption>
</figure>
