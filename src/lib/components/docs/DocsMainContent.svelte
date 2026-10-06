<script lang="ts">
	import DiscordDocContent from './notifications/DiscordDocContent.svelte';
	import GettingStartedContent from './GettingStartedContent.svelte';
	import MonitorsContent from './MonitorsContent.svelte';
	import ConfigurationContent from './ConfigurationContent.svelte';
	import AlertRulesContent from './AlertRulesContent.svelte';
	import StatusPageContent from './StatusPageContent.svelte';
	import WebhookContent from './WebhookContent.svelte';
	import ArchitectureOverviewContent from './architecture/ArchitectureOverviewContent.svelte';
	import BootstrapContent from './architecture/BootstrapContent.svelte';
	import RequestAuthContent from './architecture/RequestAuthContent.svelte';
	import MonitoringEngineContent from './architecture/MonitoringEngineContent.svelte';
	import AlertEvaluationContent from './architecture/AlertEvaluationContent.svelte';
	import IncidentsNotificationsContent from './architecture/IncidentsNotificationsContent.svelte';
	import RealtimeContent from './architecture/RealtimeContent.svelte';
	import SslDomainRunnerContent from './architecture/SslDomainRunnerContent.svelte';
	import CachingContent from './architecture/CachingContent.svelte';
	import RetentionContent from './architecture/RetentionContent.svelte';
	import StatusPageInternalsContent from './architecture/StatusPageInternalsContent.svelte';
	import AuditLoggingContent from './architecture/AuditLoggingContent.svelte';
	import DockerComposeContent from './DockerComposeContent.svelte';
	import ReverseProxyContent from './ReverseProxyContent.svelte';
	import NotificationChannelsContent from './NotificationChannelsContent.svelte';
	import SlackDocContent from './SlackDocContent.svelte';
	import EmailDocContent from './EmailDocContent.svelte';
	import PermissionsContent from './PermissionsContent.svelte';
	import CicdContent from './CicdContent.svelte';
	import { docSections } from '$lib/data/docs';

	let { activeItemId }: { activeItemId: string } = $props();

	const activeSection = $derived(docSections.find((s) => s.id === activeItemId) ?? docSections[0]);
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
			{:else if activeItemId === 'architecture'}
				<ArchitectureOverviewContent />
			{:else if activeItemId === 'bootstrap-lifecycle'}
				<BootstrapContent />
			{:else if activeItemId === 'request-auth'}
				<RequestAuthContent />
			{:else if activeItemId === 'monitoring-engine'}
				<MonitoringEngineContent />
			{:else if activeItemId === 'alert-evaluation'}
				<AlertEvaluationContent />
			{:else if activeItemId === 'incidents-notifications'}
				<IncidentsNotificationsContent />
			{:else if activeItemId === 'realtime-websocket'}
				<RealtimeContent />
			{:else if activeItemId === 'ssl-domain-runner'}
				<SslDomainRunnerContent />
			{:else if activeItemId === 'caching-rate-limit'}
				<CachingContent />
			{:else if activeItemId === 'data-retention'}
				<RetentionContent />
			{:else if activeItemId === 'status-pages-internals'}
				<StatusPageInternalsContent />
			{:else if activeItemId === 'audit-logging'}
				<AuditLoggingContent />
			{:else if activeItemId === 'docker-compose'}
				<DockerComposeContent />
			{:else if activeItemId === 'reverse-proxy'}
				<ReverseProxyContent />
			{:else if activeItemId === 'notification-channels'}
				<NotificationChannelsContent />
			{:else if activeItemId === 'slack'}
				<SlackDocContent />
			{:else if activeItemId === 'email'}
				<EmailDocContent />
			{:else if activeItemId === 'permissions'}
				<PermissionsContent />
			{:else if activeItemId === 'cicd'}
				<CicdContent />
			{/if}
		{/if}
	</div>
</main>
