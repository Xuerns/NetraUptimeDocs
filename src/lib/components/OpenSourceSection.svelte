<script lang="ts">
	import { KeyRound, LockKeyhole, Scale } from 'lucide-svelte';

	const values = [
		{
			title: 'Data privacy',
			copy: 'Monitoring data stays on your server. Nothing is sent to a third-party cloud.',
			icon: LockKeyhole
		},
		{
			title: 'No vendor lock-in',
			copy: 'Keep full control, without surprise pricing or a subscription to unwind.',
			icon: KeyRound
		},
		{
			title: 'Free forever',
			copy: 'No restricted tier and no features held back behind a paywall.',
			icon: Scale
		}
	];
</script>

<section class="border-b border-outline-variant bg-[#0e0e0f]" aria-labelledby="open-heading">
	<div class="mx-auto max-w-360 px-6 py-20 lg:px-10 lg:py-28">
		<div data-reveal class="max-w-3xl">
			<p class="eyebrow"><span class="mr-2 text-[#4edea3]">05</span> A system you own</p>
			<h2
				id="open-heading"
				class="mt-5 font-display text-4xl leading-tight tracking-tight text-[#e5e2e3] sm:text-5xl"
			>
				Your infrastructure. Your data. <em class="text-[#4edea3]">Your rules.</em>
			</h2>
		</div>
		<div
			class="mt-14 grid gap-px overflow-hidden rounded border border-outline-variant bg-[#3c4a42] md:grid-cols-3"
		>
			{#each values as value (value.title)}
				<article data-reveal class="bg-[#131314] p-7 text-center">
					<value.icon size={28} class="mx-auto text-[#4edea3]" />
					<h3 class="mt-6 font-display text-2xl text-[#e5e2e3]">{value.title}</h3>
					<p class="mt-3 text-sm leading-6 text-[#bbcabf]">{value.copy}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
