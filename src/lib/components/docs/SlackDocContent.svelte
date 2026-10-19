<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const sampleSlackUrl =
		'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX';
</script>

<div class="flex flex-col gap-12">
	<!-- Slack App Setup -->
	<section id="slack-setup" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Slack App Setup</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime sends real-time status alerts directly into your Slack workspace using Slack's
			Incoming Webhooks feature.
		</p>
		<ol class="ml-5 flex list-decimal flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				Navigate to the
				<a
					href="https://api.slack.com/apps"
					target="_blank"
					rel="noreferrer"
					class="text-[#4edea3] hover:underline">Slack App Directory</a
				>
				and click <strong class="font-medium text-zinc-200">Create New App</strong>.
			</li>
			<li>
				Select <strong class="font-medium text-zinc-200">From scratch</strong>, name your app
				<strong class="font-medium text-zinc-200">Netra Uptime</strong>, and pick your target
				workspace.
			</li>
		</ol>
	</section>

	<!-- Incoming Webhook URL -->
	<section id="slack-webhook" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Incoming Webhook URL</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Enable Incoming Webhooks to generate a posting endpoint for your alerts channel:
		</p>
		<ol class="ml-5 flex list-decimal flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				In the app settings sidebar, click <strong class="font-medium text-zinc-200"
					>Incoming Webhooks</strong
				>
				and toggle the switch to <strong class="font-medium text-zinc-200">On</strong>.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Add New Webhook to Workspace</strong> at the bottom
				of the page.
			</li>
			<li>
				Select the channel where incidents should be announced (for example,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>#ops-alerts</code
				>).
			</li>
			<li>Copy the generated Webhook URL to your clipboard:</li>
		</ol>
		<CodeBlock code={sampleSlackUrl} language="text" id="slack-url" />
	</section>

	<!-- Configure in Netra Uptime -->
	<section id="slack-configure" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Configure in Netra Uptime</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Connect the Webhook URL to your Netra Uptime organization:
		</p>
		<ol class="ml-5 flex list-decimal flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>Log in to your Netra Uptime dashboard and open your target organization.</li>
			<li>
				Navigate to <strong class="font-medium text-zinc-200">Settings</strong> &rarr;
				<strong class="font-medium text-zinc-200">Notification Channels</strong>.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">New Channel</strong>, select
				<strong class="font-medium text-zinc-200">Slack</strong>, and paste your copied Webhook URL.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Send Test Notification</strong> to verify delivery
				into your Slack channel.
			</li>
		</ol>
	</section>
</div>
