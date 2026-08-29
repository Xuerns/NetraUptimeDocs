<script lang="ts">
	const problems = [
		{
			quote: 'I only learn my site is down when customers complain.',
			answer: 'Be notified in under two minutes of an incident.'
		},
		{
			quote: 'I cannot tell when the downtime actually began.',
			answer: 'Get a precise incident timeline with every transition recorded.'
		},
		{
			quote: 'I need monitoring, but not another subscription.',
			answer: 'Run an open-source platform you can host indefinitely.'
		}
	];
</script>

<section class="border-b border-outline-variant" aria-labelledby="problem-heading">
	<div class="mx-auto max-w-360 px-6 py-20 lg:px-10 lg:py-28">
		<div data-reveal class="mx-auto max-w-4xl text-center">
			<p class="eyebrow"><span class="mr-2 text-[#4edea3]">02</span> The incident gap</p>
			<h2
				id="problem-heading"
				class="mt-5 font-display text-4xl leading-tight tracking-tight text-[#e5e2e3] sm:text-5xl"
			>
				Stop finding out about downtime from your users.
			</h2>
		</div>
		<div class="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
			{#each problems as problem, index (problem.quote)}
				<article data-reveal class="border-t border-outline-variant pt-6">
					<p class="font-display text-xl leading-8 text-[#e5e2e3]">“{problem.quote}”</p>
					<div class="mt-7 h-px w-10 bg-[#4edea3]"></div>
					<p class="mt-5 text-sm leading-6 text-[#bbcabf]">
						<span class="font-mono text-[#4edea3]">0{index + 1}</span> — {problem.answer}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
