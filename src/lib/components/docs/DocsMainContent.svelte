<script lang="ts">
	import DiscordDocContent from './notifications/DiscordDocContent.svelte';
	import GettingStartedContent from './GettingStartedContent.svelte';
	import MonitorsContent from './MonitorsContent.svelte';
	import ConfigurationContent from './ConfigurationContent.svelte';
	import AlertRulesContent from './AlertRulesContent.svelte';
	import StatusPageContent from './StatusPageContent.svelte';
	import WebhookContent from './WebhookContent.svelte';
	import { docSections } from '$lib/data/docs';

	let { activeItemId }: { activeItemId: string } = $props();

	const activeSection = $derived(
		docSections.find((s) => s.id === activeItemId) ?? docSections[0]
	);

	// Sections with dedicated rich content components
	const richContentSections = [
		'getting-started',
		'monitors',
		'environment-variables',
		'alert-rules',
		'status-pages',
		'discord',
		'webhook'
	];

	const hasRichContent = $derived(richContentSections.includes(activeItemId));
</script>

<main class="flex-1 bg-transparent p-8 lg:p-16 xl:p-20">
	<div class="mx-auto flex max-w-4xl flex-col gap-12">
		{#if activeItemId === 'discord'}
			<DiscordDocContent />
		{:else}
			<!-- Section Header -->
			<section class="flex flex-col gap-8 p-6">
				<div class="eyebrow text-[#4edea3]/80">{activeSection.subtitle}</div>
				<h1
					class="font-display text-4xl leading-tight font-bold tracking-tight text-[#e5e2e3] lg:text-5xl"
				>
					{activeSection.title}
				</h1>
				<p class="max-w-3xl text-lg leading-loose font-light text-[#bbcabf]">
					{activeSection.description}
				</p>
			</section>


			<!-- Rich Content Components -->
			{#if activeItemId === 'getting-started'}
				<GettingStartedContent />
			{:else if activeItemId === 'monitors'}
				<MonitorsContent />
			{:else if activeItemId === 'environment-variables'}
				<ConfigurationContent />
			{:else if activeItemId === 'alert-rules'}
				<AlertRulesContent />
			{:else if activeItemId === 'status-pages'}
				<StatusPageContent />
			{:else if activeItemId === 'webhook'}
				<WebhookContent />
			{/if}

		{/if}
	</div>
</main>
