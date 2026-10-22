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
	import { docSections, architectureSections, type DocSection } from '$lib/data/docs';

	let {
		activeItemId,
		sections = [...docSections, ...architectureSections]
	}: {
		activeItemId: string;
		sections?: DocSection[];
	} = $props();

	const activeSection = $derived(sections.find((s) => s.id === activeItemId) ?? sections[0]);
</script>

<main class="flex-1 px-4 py-10 sm:px-8 lg:px-12">
	<div class="mx-auto flex max-w-3xl flex-col gap-10">
		<header class="flex flex-col gap-3 border-b border-zinc-800/80 pb-8">
			<h1 class="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
				{activeSection.title}
			</h1>
			<p class="text-base leading-7 text-zinc-400">
				{activeSection.description}
			</p>
		</header>

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
		{:else if activeItemId === 'discord'}
			<DiscordDocContent />
		{:else if activeItemId === 'slack'}
			<SlackDocContent />
		{:else if activeItemId === 'email'}
			<EmailDocContent />
		{:else if activeItemId === 'permissions'}
			<PermissionsContent />
		{:else if activeItemId === 'cicd'}
			<CicdContent />
		{/if}
	</div>
</main>
