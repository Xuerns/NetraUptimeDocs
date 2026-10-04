<script lang="ts">
	import { Briefcase, Code2, Server, Store } from 'lucide-svelte';
	import { spotlight } from '$lib/actions/spotlight';

	const audiences = [
		{
			title: 'Developer / Backend engineer',
			need: 'Monitor many services and APIs in one place.',
			benefit: 'One dashboard; alerts go directly to the responsible owner.',
			icon: Code2
		},
		{
			title: 'Agency / Freelancer',
			need: 'Keep a watchful eye on every client property.',
			benefit: 'Separate organizations and public status pages per client.',
			icon: Briefcase
		},
		{
			title: 'Business owner',
			need: 'Know about downtime before customers do.',
			benefit: 'Fast alerts and a setup that stays understandable.',
			icon: Store
		},
		{
			title: 'DevOps / SRE team',
			need: 'Run enterprise-grade monitoring without licensing costs.',
			benefit: 'Self-hosted, customizable, and ready to fit your operating model.',
			icon: Server
		}
	];
</script>

<section class="relative" aria-labelledby="audience-heading">
	<div class="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
		<div data-reveal class="mx-auto max-w-3xl text-center">
			<h2
				id="audience-heading"
				class="font-display text-4xl tracking-tight text-[#f1eeef] sm:text-5xl"
			>
				Reliability belongs <span class="text-gradient italic">to everyone.</span>
			</h2>
		</div>
		<div class="mt-16 grid gap-5 sm:grid-cols-2">
			{#each audiences as audience (audience.title)}
				<article data-reveal use:spotlight class="glass spotlight rounded-3xl p-7">
					<div class="flex items-start gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4edea3]/10 text-[#4edea3] ring-1 ring-[#4edea3]/25"
						>
							<audience.icon size={22} />
						</div>
						<div>
							<h3 class="font-display text-xl text-[#f1eeef]">{audience.title}</h3>
							<p class="mt-1.5 text-sm text-[#bbcabf]">{audience.need}</p>
						</div>
					</div>
					<p
						class="mt-5 rounded-xl border border-white/6 bg-black/20 px-4 py-3 text-sm leading-6 text-[#e5e2e3]"
					>
						{audience.benefit}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
