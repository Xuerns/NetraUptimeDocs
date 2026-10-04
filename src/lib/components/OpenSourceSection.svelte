<script lang="ts">
	import { KeyRound, LockKeyhole, Scale } from 'lucide-svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { stack } from '$lib/data/landing';

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

<section class="relative" aria-labelledby="open-heading">
	<div class="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
		<div data-reveal class="mx-auto max-w-3xl text-center">
			<h2
				id="open-heading"
				class="font-display text-4xl leading-tight tracking-tight text-[#f1eeef] sm:text-5xl"
			>
				Your infrastructure. Your data. <span class="text-gradient italic">Your rules.</span>
			</h2>
		</div>
		<div class="mt-16 grid gap-5 md:grid-cols-3">
			{#each values as value (value.title)}
				<article data-reveal use:spotlight class="glass spotlight rounded-3xl p-7">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4edea3]/10 text-[#4edea3] ring-1 ring-[#4edea3]/25"
					>
						<value.icon size={22} />
					</div>
					<h3 class="mt-6 font-display text-2xl text-[#f1eeef]">{value.title}</h3>
					<p class="mt-3 text-sm leading-6 text-[#bbcabf]">{value.copy}</p>
				</article>
			{/each}
		</div>

		<div data-reveal class="mt-10 rounded-3xl border border-white/8 bg-white/2 p-6">
			<p class="text-center font-mono text-[11px] tracking-[0.18em] text-[#86948a] uppercase">
				Built on boring, reliable technology
			</p>
			<ul class="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
				{#each stack as tech (tech.name)}
					<li class="flex flex-col items-center gap-2 text-center">
						<img src={tech.logo} alt="" class="h-8 w-8" />
						<span class="text-sm font-medium text-[#e5e2e3]">{tech.name}</span>
						<span class="text-xs text-[#86948a]">{tech.note}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
