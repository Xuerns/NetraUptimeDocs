<script lang="ts">
	import { BellOff, Clock, Wallet } from 'lucide-svelte';
	import { spotlight } from '$lib/actions/spotlight';

	const problems = [
		{
			quote: 'I only learn my site is down when customers complain.',
			answer: 'Be notified in under two minutes of an incident.',
			icon: BellOff
		},
		{
			quote: 'I cannot tell when the downtime actually began.',
			answer: 'Get a precise incident timeline with every transition recorded.',
			icon: Clock
		},
		{
			quote: 'I need monitoring, but not another subscription.',
			answer: 'Run an open-source platform you can host indefinitely.',
			icon: Wallet
		}
	];
</script>

<section class="relative" aria-labelledby="problem-heading">
	<div class="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
		<div data-reveal class="mx-auto max-w-3xl text-center">
			<h2
				id="problem-heading"
				class="font-display text-4xl leading-tight tracking-tight text-[#f1eeef] sm:text-5xl"
			>
				Stop finding out about downtime <span class="text-gradient italic">from your users.</span>
			</h2>
		</div>
		<div class="mt-16 grid gap-5 md:grid-cols-3">
			{#each problems as problem, i (problem.quote)}
				<article
					data-reveal
					use:spotlight
					class="glass spotlight rounded-3xl p-7 {i === 1 ? 'md:mt-8' : ''}"
				>
					<div
						class="flex h-11 w-11 items-center justify-center rounded-full bg-[#4edea3]/10 text-[#4edea3] ring-1 ring-[#4edea3]/25"
					>
						<problem.icon size={20} />
					</div>
					<p class="mt-6 font-display text-xl leading-8 text-[#f1eeef]">“{problem.quote}”</p>
					<div class="mt-6 h-px w-full bg-linear-to-r from-[#4edea3]/50 to-transparent"></div>
					<p class="mt-5 text-sm leading-6 text-[#bbcabf]">{problem.answer}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
