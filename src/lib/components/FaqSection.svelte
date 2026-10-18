<script lang="ts">
	import { ChevronDown, HelpCircle } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { faqs } from '$lib/data/landing';

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section id="faq" class="relative" aria-labelledby="faq-heading">
	<div class="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
		<div data-reveal class="mx-auto max-w-3xl text-center">
			<p class="pill"><HelpCircle size={13} /> Frequently asked questions</p>
			<h2
				id="faq-heading"
				class="mt-6 font-display text-4xl tracking-tight text-[#f1eeef] sm:text-5xl"
			>
				Got questions? <span class="text-gradient italic">We’ve got answers.</span>
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-[#bbcabf]">
				Everything you need to know about Netra Uptime, self-hosting, architecture, and
				capabilities.
			</p>
		</div>

		<div data-reveal class="mt-14 divide-y divide-white/10 border-y border-white/10">
			{#each faqs as item, index (item.question)}
				{@const isOpen = openIndex === index}
				<div class="transition-colors hover:bg-white/[0.02]">
					<button
						type="button"
						class="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-[#4edea3]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131314] focus-visible:outline-none sm:py-6"
						aria-expanded={isOpen}
						aria-controls="faq-answer-{index}"
						id="faq-question-{index}"
						onclick={() => toggle(index)}
					>
						<span
							class="font-display text-lg font-medium tracking-tight text-[#f1eeef] transition-colors group-hover:text-[#4edea3] sm:text-xl"
						>
							{item.question}
						</span>
						<span
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#bbcabf] transition-all duration-300 group-hover:bg-[#4edea3]/10 group-hover:text-[#4edea3] {isOpen
								? 'rotate-180 bg-[#4edea3]/10 text-[#4edea3]'
								: ''}"
						>
							<ChevronDown size={18} class="transition-transform duration-300" />
						</span>
					</button>

					{#if isOpen}
						<div
							id="faq-answer-{index}"
							role="region"
							aria-labelledby="faq-question-{index}"
							transition:slide={{ duration: 250 }}
							class="overflow-hidden pb-6 text-sm leading-relaxed text-[#bbcabf] sm:text-base"
						>
							<p>{item.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
