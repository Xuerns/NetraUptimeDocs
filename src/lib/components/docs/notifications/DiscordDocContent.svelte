<script lang="ts">
	import step1 from '$lib/assets/docs/notifications/discord/step1.webp';
	import step2 from '$lib/assets/docs/notifications/discord/step2.png';
	import step3 from '$lib/assets/docs/notifications/discord/step3.webp';
	import step4 from '$lib/assets/docs/notifications/discord/step4.webp';

	const steps = [
		{
			number: '1',
			title: 'Open Server Settings in Discord',
			instructions: [
				'Click your Discord server name at the top left to open the dropdown menu.',
				'Select <strong>Server Settings</strong> (highlighted in red).'
			],
			image: step1,
			caption: 'Select Server Settings from the server menu'
		},
		{
			number: '2',
			title: 'Create a New Webhook',
			instructions: [
				'In the left sidebar under <strong>APPS</strong>, click <strong>Integrations (1)</strong>.',
				'Click the <strong>Create Webhook (2)</strong> button.'
			],
			image: step2,
			caption: 'Navigate to Integrations and click Create Webhook'
		},
		{
			number: '3',
			title: 'Configure Webhook and Copy URL',
			instructions: [
				'Enter a bot <strong>Name (1)</strong>, such as <code>Alert</code>.',
				'Select the target <strong>Channel (2)</strong> for notifications.',
				'Click <strong>Copy Webhook URL (3)</strong> to copy the webhook URL to your clipboard.'
			],
			image: step3,
			caption: 'Set name, choose channel, and copy webhook URL'
		},
		{
			number: '4',
			title: 'Add Notification Channel in PulseWatch',
			instructions: [
				'Open the <strong>Add Notification Channel</strong> dialog in your PulseWatch dashboard.',
				'Enter a <strong>Channel Name (1)</strong>.',
				'Select <strong>Discord</strong> as the channel type.',
				'Paste the copied URL into <strong>Discord Webhook URL (2)</strong>.',
				'Click <strong>Create Channel</strong> to save.'
			],
			image: step4,
			caption: 'Configure and save the Discord channel in PulseWatch'
		}
	];
</script>

<div class="flex flex-col gap-12">
	<!-- Page Header -->
	<header class="flex flex-col gap-3">
		<span class="eyebrow text-[#4edea3]">Notification · Discord</span>
		<h1 class="font-display text-4xl font-bold tracking-tight text-[#e5e2e3]">
			Discord Webhook Configuration
		</h1>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Follow these 4 steps to create an incoming webhook in Discord and link it to PulseWatch to receive real-time status alerts.
		</p>
	</header>

	<!-- Steps Flow (Clean vertical timeline matching PulseWatch design without overused containers) -->
	<div class="flex flex-col gap-12 border-l border-[#3c4a42] pl-6 sm:pl-8">
		{#each steps as step (step.number)}
			<section class="relative flex flex-col gap-4">
				<!-- Step Number Marker -->
				<div
					class="absolute -left-[37px] top-0 flex h-7 w-7 sm:-left-[45px] items-center justify-center rounded-lg border border-[#3c4a42] bg-[#131314] font-mono text-xs font-bold text-[#4edea3]"
				>
					{step.number}
				</div>

				<!-- Step Title and Instructions -->
				<div class="flex flex-col gap-2">
					<h2 class="font-display text-xl font-semibold text-[#e5e2e3]">
						{step.title}
					</h2>
					<ul class="flex flex-col gap-1.5 text-sm font-light leading-relaxed text-[#bbcabf]">
						{#each step.instructions as instruction}
							<li class="flex items-start gap-2">
								<span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-sm bg-[#4edea3]"></span>
								<span>{@html instruction}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Step Screenshot -->
				<figure class="mt-1 flex flex-col gap-2">
					<div class="overflow-hidden rounded-lg border border-[#3c4a42] bg-[#0e0e0f] p-2">
						<img
							src={step.image}
							alt={step.title}
							class="max-h-[460px] w-auto max-w-full rounded-md object-contain"
							loading="lazy"
						/>
					</div>
					<figcaption class="font-mono text-xs text-[#bbcabf]">
						{step.caption}
					</figcaption>
				</figure>
			</section>
		{/each}
	</div>
</div>
