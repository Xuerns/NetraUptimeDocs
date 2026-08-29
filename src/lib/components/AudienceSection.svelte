<script lang="ts">
	const audiences = [
		{
			title: 'Developer / Backend engineer',
			need: 'Monitor many services and APIs in one place.',
			benefit: 'One dashboard; alerts go directly to the responsible owner.'
		},
		{
			title: 'Agency / Freelancer',
			need: 'Keep a watchful eye on every client property.',
			benefit: 'Separate organizations and public status pages per client.'
		},
		{
			title: 'Business owner',
			need: 'Know about downtime before customers do.',
			benefit: 'Fast alerts and a setup that stays understandable.'
		},
		{
			title: 'DevOps / SRE team',
			need: 'Run enterprise-grade monitoring without licensing costs.',
			benefit: 'Self-hosted, customizable, and ready to fit your operating model.'
		}
	];
</script>

<section class="border-b border-outline-variant" aria-labelledby="audience-heading">
	<div class="mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-28">
		<div data-reveal class="text-center">
			<p class="eyebrow"><span class="mr-2 text-[#4edea3]">04</span> Built for accountable teams</p>
			<h2
				id="audience-heading"
				class="mt-5 font-display text-4xl tracking-tight text-[#e5e2e3] sm:text-5xl"
			>
				Reliability belongs to everyone.
			</h2>
		</div>
		<div class="mt-14 overflow-hidden rounded border border-outline-variant bg-[#3c4a42]">
			{#each audiences as audience, index (audience.title)}
				<article
					data-reveal
					class="grid gap-5 border-b border-outline-variant bg-[#201f20] p-6 last:border-b-0 md:grid-cols-[4.5rem_1fr_1.2fr] md:items-center"
				>
					<span class="font-display text-4xl text-[#4edea3] italic">0{index + 1}</span>
					<div>
						<h3 class="font-display text-2xl text-[#e5e2e3]">{audience.title}</h3>
						<p class="mt-2 text-sm text-[#bbcabf]">{audience.need}</p>
					</div>
					<p class="border-l border-outline-variant pl-5 text-sm leading-6 text-[#e5e2e3]">
						{audience.benefit}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
