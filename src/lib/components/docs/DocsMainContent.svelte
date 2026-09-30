<script lang="ts">
	import DocQuickLinks from './DocQuickLinks.svelte';
	import DocChecklist from './DocChecklist.svelte';
	import DiscordDocContent from './notifications/DiscordDocContent.svelte';
	import GettingStartedContent from './GettingStartedContent.svelte';
	import MonitorsContent from './MonitorsContent.svelte';
	import ConfigurationContent from './ConfigurationContent.svelte';
	import AlertRulesContent from './AlertRulesContent.svelte';
	import StatusPageContent from './StatusPageContent.svelte';
	import WebhookContent from './WebhookContent.svelte';
	import { quickLinks, checklistSteps, docSections } from '$lib/data/docs';

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

			<!-- Quick Links (only on getting-started) -->
			{#if activeItemId === 'getting-started'}
				<section class="flex flex-col gap-10">
					<div class="eyebrow pl-2 text-[#bbcabf]/70">Navigation · Quick Links</div>
					<DocQuickLinks links={quickLinks} />
				</section>
			{/if}

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

			<!-- Checklist (only on getting-started) -->
			{#if activeItemId === 'getting-started'}
				<section
					class="flex flex-col gap-12 rounded-lg border border-white/5 bg-[#1a1d1b] p-10 lg:p-14"
				>
					<div class="flex flex-col gap-5">
						<div class="eyebrow text-[#bbcabf]/70">Deployment · Standard Procedure</div>
						<h2 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
							Deployment Checklist
						</h2>
						<p class="text-sm leading-relaxed font-light text-[#bbcabf]/80">
							Follow these steps carefully to ensure a secure and stable deployment of PulseWatch.
						</p>
					</div>
					<DocChecklist steps={checklistSteps} />
				</section>
			{/if}
		{/if}
	</div>
</main>
