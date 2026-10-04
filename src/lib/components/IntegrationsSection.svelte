<script lang="ts">
	import { BellRing, Mail, Webhook } from 'lucide-svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { images, logos } from '$lib/data/landing';
	import ShotImage from './ShotImage.svelte';

	const channels = [
		{ name: 'Slack', copy: 'Block Kit messages with target, time, and reason.', logo: logos.slack },
		{ name: 'Discord', copy: 'Rich embeds delivered to any channel.', logo: logos.discord },
		{ name: 'Email', copy: 'HTML alerts over your own SMTP server.', icon: Mail },
		{ name: 'Webhook', copy: 'Standard JSON events with SSRF protection.', icon: Webhook }
	];
</script>

<section id="integrations" class="relative" aria-labelledby="integrations-heading">
	<div class="mx-auto max-w-360 px-6 py-24 lg:px-10 lg:py-32">
		<div class="grid items-center gap-14 lg:grid-cols-2">
			<div data-reveal>
				<p class="pill"><BellRing size={13} /> Alert channels</p>
				<h2
					id="integrations-heading"
					class="mt-6 font-display text-4xl leading-tight tracking-tight text-[#f1eeef] sm:text-5xl"
				>
					Alerts land where your <span class="text-gradient italic">team already works.</span>
				</h2>
				<p class="mt-5 max-w-lg leading-7 text-[#bbcabf]">
					Route each monitor to the person responsible. Every delivery attempt is logged, so you can
					see what was sent and what failed.
				</p>
				<div class="mt-9 grid gap-4 sm:grid-cols-2">
					{#each channels as channel (channel.name)}
						<div use:spotlight class="glass spotlight rounded-2xl p-5">
							<div class="flex items-center gap-3">
								{#if channel.logo}
									<img src={channel.logo} alt="" class="h-6 w-6" />
								{:else if channel.icon}
									<channel.icon size={22} class="text-[#4edea3]" />
								{/if}
								<h3 class="font-display text-lg text-[#f1eeef]">{channel.name}</h3>
							</div>
							<p class="mt-2 text-sm leading-6 text-[#bbcabf]">{channel.copy}</p>
						</div>
					{/each}
				</div>
			</div>

			<div data-reveal class="relative">
				<div
					class="pointer-events-none absolute -inset-6 rounded-full bg-[#5865F2]/15 blur-[90px]"
				></div>
				<div class="relative grid gap-4">
					<div class="glass overflow-hidden rounded-2xl hover:translate-y-0">
						<div class="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
							<img src={logos.slack} alt="" class="h-4 w-4" />
							<span class="text-xs text-[#bbcabf]">#incidents</span>
						</div>
						<div class="aspect-16/10">
							<ShotImage
								src={images.slack}
								file="integration-slack"
								alt="Slack notification example"
								ratio="16 / 10"
							/>
						</div>
					</div>
					<div class="glass ml-8 overflow-hidden rounded-2xl hover:translate-y-0">
						<div class="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
							<img src={logos.discord} alt="" class="h-4 w-4" />
							<span class="text-xs text-[#bbcabf]">#alerts</span>
						</div>
						<div class="aspect-16/10">
							<ShotImage
								src={images.discord}
								file="integration-discord"
								alt="Discord embed example"
								ratio="16 / 10"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
