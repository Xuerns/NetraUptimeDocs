<script lang="ts">
	import step1 from '$lib/assets/docs/notifications/slack/step1.webp';
	import step2 from '$lib/assets/docs/notifications/slack/step2.webp';
	import step3 from '$lib/assets/docs/notifications/slack/step3.webp';
	import step4 from '$lib/assets/docs/notifications/slack/step4.webp';
	import step5 from '$lib/assets/docs/notifications/slack/step5.webp';
	import step6 from '$lib/assets/docs/notifications/slack/step6.webp';
	import step7 from '$lib/assets/docs/notifications/slack/step7.webp';
</script>

<div class="flex flex-col gap-12">
	<!-- Step 1: Create Slack App -->
	<section id="slack-step1" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">1. Create a Slack App</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime dispatches real-time status alerts directly into your Slack workspace using
			Slack's Incoming Webhooks feature.
		</p>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				Navigate to the
				<a
					href="https://api.slack.com/apps"
					target="_blank"
					rel="external noopener noreferrer"
					class="text-[#4edea3] hover:underline"
				>
					Slack Apps Console
				</a>.
			</li>
			<li>
				Click the <strong class="font-medium text-zinc-200">Create an App</strong> button.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step1}
					alt="Create an App in Slack Apps Console"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Click Create an App from the Slack developer dashboard
			</figcaption>
		</figure>
	</section>

	<!-- Step 2: Choose Setup Method -->
	<section id="slack-step2" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			2. Choose App Creation Method
		</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				In the modal dialog under <strong class="font-medium text-zinc-200">From scratch</strong>,
				select <strong class="font-medium text-zinc-200">Pick features</strong> to configure scopes manually.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Continue</strong> to proceed.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step2}
					alt="Select Pick features from scratch"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Select Pick features under From scratch
			</figcaption>
		</figure>
	</section>

	<!-- Step 3: App Name & Workspace -->
	<section id="slack-step3" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			3. App Name and Target Workspace
		</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				Enter an <strong class="font-medium text-zinc-200">App name (1)</strong> (e.g.,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">
					Netra-Uptime Alerts
				</code>).
			</li>
			<li>
				Select your target <strong class="font-medium text-zinc-200">Workspace (2)</strong> from the dropdown
				menu.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Continue (3)</strong> to confirm.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step3}
					alt="Enter App Name and Select Workspace"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Provide an app name, choose your Slack workspace, and click Continue
			</figcaption>
		</figure>
	</section>

	<!-- Step 4: Configure Bot Scopes -->
	<section id="slack-step4" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">4. Configure Bot Scopes</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				In the search input <strong class="font-medium text-zinc-200">(1)</strong>, verify that the
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">
					incoming-webhook
				</code>
				scope is added under <strong class="font-medium text-zinc-200">Bot scopes</strong> to grant permission
				for posting incident alerts.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Continue (2)</strong>.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step4}
					alt="Configure incoming-webhook bot scope"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Add incoming-webhook scope to authorize message posting
			</figcaption>
		</figure>
	</section>

	<!-- Step 5: Authorize Target Channel -->
	<section id="slack-step5" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">5. Authorize Target Channel</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				Confirm your target workspace under <strong class="font-medium text-zinc-200"
					>Where do you want to use Netra-Uptime Alerts? (1)</strong
				>.
			</li>
			<li>
				Select your destination Slack channel from the <strong class="font-medium text-zinc-200"
					>Channel for webhook (2)</strong
				>
				dropdown (for example,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">
					#all-netrauptime
				</code>).
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Allow (3)</strong> to grant permission for the
				app to post into that channel.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step5}
					alt="Authorize Netra Uptime to post in target Slack channel"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Select the destination Slack channel and click Allow
			</figcaption>
		</figure>
	</section>

	<!-- Step 6: Copy Webhook URL -->
	<section id="slack-step6" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">6. Copy Webhook URL</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				In the left sidebar under Features, ensure you are on <strong
					class="font-medium text-zinc-200">Incoming Webhooks (1)</strong
				>.
			</li>
			<li>
				Under <strong class="font-medium text-zinc-200">Webhook URLs for Your Workspace</strong>,
				locate your authorized channel and click
				<strong class="font-medium text-zinc-200">Copy (2)</strong> to copy the webhook URL to your clipboard.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step6}
					alt="Copy generated Webhook URL from Slack dashboard"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Copy your workspace Webhook URL from the Incoming Webhooks dashboard
			</figcaption>
		</figure>
	</section>

	<!-- Step 7: Configure in Netra Uptime -->
	<section id="slack-step7" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			7. Add Notification Channel in Netra Uptime
		</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				Open your Netra Uptime dashboard and navigate to <strong class="font-medium text-zinc-200"
					>Settings &rarr; Notification Channels</strong
				>, then click <strong class="font-medium text-zinc-200">Add Notification Channel</strong>.
			</li>
			<li>
				Enter a <strong class="font-medium text-zinc-200">Channel Name (1)</strong> (e.g.,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">
					Slack Alert
				</code>).
			</li>
			<li>
				Select <strong class="font-medium text-zinc-200">Slack (2)</strong> as the Channel Type.
			</li>
			<li>
				Paste your copied webhook URL into
				<strong class="font-medium text-zinc-200">Slack Incoming Webhook URL (3)</strong>.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Create Channel (4)</strong> to save and activate
				notifications.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step7}
					alt="Configure and save Slack notification channel in Netra Uptime"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Save the Slack webhook channel in the Netra Uptime dashboard
			</figcaption>
		</figure>
	</section>
</div>
