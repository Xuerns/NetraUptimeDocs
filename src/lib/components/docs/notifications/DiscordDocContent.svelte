<script lang="ts">
	import step1 from '$lib/assets/docs/notifications/discord/step1.webp';
	import step2 from '$lib/assets/docs/notifications/discord/step2.png';
	import step3 from '$lib/assets/docs/notifications/discord/step3.webp';
	import step4 from '$lib/assets/docs/notifications/discord/step4.webp';
</script>

<div class="flex flex-col gap-12">
	<section id="discord-step1" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			1. Open Server Settings in Discord
		</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>Click your Discord server name at the top left to open the dropdown menu.</li>
			<li>
				Select <strong class="font-medium text-zinc-200">Server Settings</strong>.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step1}
					alt="Open Server Settings in Discord"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Select Server Settings from the server menu
			</figcaption>
		</figure>
	</section>

	<section id="discord-step2" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">2. Create a New Webhook</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				In the left sidebar under <strong class="font-medium text-zinc-200">APPS</strong>, click
				<strong class="font-medium text-zinc-200">Integrations (1)</strong>.
			</li>
			<li>
				Click the <strong class="font-medium text-zinc-200">Create Webhook (2)</strong> button.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step2}
					alt="Create a New Webhook"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Navigate to Integrations and click Create Webhook
			</figcaption>
		</figure>
	</section>

	<section id="discord-step3" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			3. Configure Webhook and Copy URL
		</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				Enter a bot <strong class="font-medium text-zinc-200">Name (1)</strong>, such as
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>Alert</code
				>.
			</li>
			<li>
				Select the target <strong class="font-medium text-zinc-200">Channel (2)</strong> for notifications.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Copy Webhook URL (3)</strong> to copy the webhook
				URL to your clipboard.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step3}
					alt="Configure Webhook and Copy URL"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Set name, choose channel, and copy webhook URL
			</figcaption>
		</figure>
	</section>

	<section id="discord-step4" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			4. Add Notification Channel in Netra Uptime
		</h2>
		<ol class="ml-5 flex list-decimal flex-col gap-1.5 text-sm leading-7 text-zinc-400">
			<li>
				Open the <strong class="font-medium text-zinc-200">Add Notification Channel</strong> dialog in
				your Netra Uptime dashboard.
			</li>
			<li>
				Enter a <strong class="font-medium text-zinc-200">Channel Name (1)</strong>.
			</li>
			<li>
				Select <strong class="font-medium text-zinc-200">Discord</strong> as the channel type.
			</li>
			<li>
				Paste the copied URL into <strong class="font-medium text-zinc-200"
					>Discord Webhook URL (2)</strong
				>.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Create Channel</strong> to save.
			</li>
		</ol>
		<figure class="mt-1 flex flex-col gap-2">
			<div class="overflow-hidden rounded-lg border border-zinc-800 bg-[#141416] p-2">
				<img
					src={step4}
					alt="Add Notification Channel in Netra Uptime"
					class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
					loading="lazy"
				/>
			</div>
			<figcaption class="font-mono text-xs text-zinc-500">
				Configure and save the Discord channel in Netra Uptime
			</figcaption>
		</figure>
	</section>
</div>
