<script lang="ts">
	import { Check, ExternalLink } from 'lucide-svelte';
	import CodeBlock from './CodeBlock.svelte';

	const sampleSlackUrl =
		'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX';
</script>

<div class="flex flex-col gap-16">
	<!-- Slack App Setup -->
	<section id="slack-setup" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Slack App Setup</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Netra Uptime sends real-time status alerts directly into your Slack workspace using Slack's
			Incoming Webhooks feature.
		</p>
		<div class="flex max-w-3xl flex-col gap-4 rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<h3 class="font-display text-base font-semibold text-[#e5e2e3]">
				Step 1: Create a Slack App
			</h3>
			<p class="text-sm leading-relaxed text-[#bbcabf]">
				Visit the Slack API portal and create a new custom app for your organization workspace:
			</p>
			<ul class="flex flex-col gap-2.5">
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>1</span
					>
					<span
						>Navigate to <a
							href="https://api.slack.com/apps"
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center gap-1 text-[#4edea3] hover:underline"
							>Slack App Directory <ExternalLink size={11} /></a
						>
						and click <strong class="text-[#e5e2e3]">Create New App</strong>.</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>2</span
					>
					<span
						>Select <strong class="text-[#e5e2e3]">From scratch</strong>, name your app
						<strong class="text-[#e5e2e3]">Netra Uptime</strong>, and pick your target workspace.</span
					>
				</li>
			</ul>
		</div>
	</section>

	<!-- Incoming Webhook URL -->
	<section id="slack-webhook" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Incoming Webhook URL
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Enable Incoming Webhooks to generate a secure posting endpoint for your designated alerts
			channel:
		</p>
		<div class="flex max-w-3xl flex-col gap-4 rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<h3 class="font-display text-base font-semibold text-[#e5e2e3]">Step 2: Activate Webhooks</h3>
			<ul class="flex flex-col gap-2.5">
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>1</span
					>
					<span
						>In the app settings sidebar, click on <strong class="text-[#e5e2e3]"
							>Incoming Webhooks</strong
						>
						and toggle the switch to <strong class="text-[#e5e2e3]">On</strong>.</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>2</span
					>
					<span
						>Click <strong class="text-[#e5e2e3]">Add New Webhook to Workspace</strong> at the bottom
						of the page.</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>3</span
					>
					<span
						>Select the public or private channel where incidents should be announced (for example: <code
							class="font-mono text-xs text-[#4edea3]">#ops-alerts</code
						>
						or <code class="font-mono text-xs text-[#4edea3]">#infrastructure</code>).</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>4</span
					>
					<span>Copy the generated Webhook URL to your clipboard.</span>
				</li>
			</ul>
		</div>
		<CodeBlock code={sampleSlackUrl} language="text" id="slack-url" />
	</section>

	<!-- Configure in Netra Uptime -->
	<section id="slack-configure" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Configure in Netra Uptime
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Connect the Webhook URL to your Netra Uptime organization:
		</p>
		<ul class="flex max-w-3xl flex-col gap-3">
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span>Log in to your Netra Uptime dashboard and open your target organization.</span>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					>Navigate to <strong class="text-[#e5e2e3]">Settings</strong> &rarr;
					<strong class="text-[#e5e2e3]">Notification Channels</strong>.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					>Click <strong class="text-[#e5e2e3]">New Channel</strong>, select
					<strong class="text-[#e5e2e3]">Slack</strong>, and paste your copied Webhook URL.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					>Click <strong class="text-[#e5e2e3]">Send Test Notification</strong> to verify delivery into
					your Slack channel immediately.</span
				>
			</li>
		</ul>
	</section>
</div>
