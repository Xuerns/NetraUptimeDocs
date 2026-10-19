<script lang="ts">
	import { onMount } from 'svelte';

	let { definition, label }: { definition: string; label: string } = $props();

	let container: HTMLDivElement | undefined = $state();
	let status = $state<'loading' | 'ready' | 'error'>('loading');

	const diagramId = `mermaid-${Math.random().toString(36).slice(2, 10)}`;

	async function renderDiagram(code: string) {
		status = 'loading';
		try {
			const { default: mermaid } = await import('mermaid');
			mermaid.initialize({
				startOnLoad: false,
				securityLevel: 'strict',
				theme: 'base',
				themeVariables: {
					darkMode: true,
					background: '#141416',
					primaryColor: '#18181b',
					primaryTextColor: '#e4e4e7',
					primaryBorderColor: '#4edea3',
					secondaryColor: '#18181b',
					tertiaryColor: '#141416',
					clusterBkg: '#18181b',
					clusterBorder: '#27272a',
					edgeLabelBackground: '#141416',
					lineColor: '#71717a',
					textColor: '#a1a1aa',
					noteBkgColor: '#18181b',
					noteTextColor: '#e4e4e7',
					actorBkg: '#18181b',
					actorBorder: '#4edea3',
					actorTextColor: '#e4e4e7',
					signalColor: '#71717a',
					signalTextColor: '#e4e4e7',
					fontFamily: 'inherit'
				}
			});
			const { svg } = await mermaid.render(diagramId, code);
			if (container) {
				// eslint-disable-next-line svelte/no-dom-manipulating
				container.innerHTML = svg;
			}
			status = 'ready';
		} catch (err) {
			console.error('Mermaid diagram render error:', err);
			status = 'error';
		}
	}

	onMount(() => {
		renderDiagram(definition);
	});
</script>

<figure class="flex flex-col gap-2" aria-label={label}>
	<div class="overflow-x-auto rounded-lg border border-zinc-800 bg-[#141416] p-4">
		{#if status === 'loading'}
			<div class="py-8 text-xs text-zinc-400">Rendering diagram...</div>
		{:else if status === 'error'}
			<div class="py-8 text-xs text-zinc-400">The diagram could not be rendered.</div>
		{/if}
		<div
			bind:this={container}
			class="flex min-w-max justify-center"
			role="img"
			aria-label={label}
		></div>
	</div>
	<figcaption class="text-center font-mono text-xs text-zinc-500">{label}</figcaption>
</figure>
