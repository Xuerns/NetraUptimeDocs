<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { faqs } from '$lib/data/landing';

	let openIndex = $state<number | null>(0);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section id="faq" class="border-t border-zinc-800/80" aria-labelledby="faq-heading">
	<div class="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div class="grid gap-8 lg:grid-cols-12 lg:gap-10">
			<div data-reveal class="lg:col-span-4">
				<h2 id="faq-heading" class="font-display text-3xl tracking-tight text-zinc-100 sm:text-4xl">
					Common <span class="text-[#4edea3] italic">questions.</span>
				</h2>
				<p class="mt-2.5 text-sm leading-6 text-zinc-400">
					Answers on deployment, monitoring protocols, alert rules, data retention, and licensing.
				</p>
				<div class="mt-5 flex flex-col items-start gap-2.5 text-xs font-medium">
					<a
						href={resolve('/docs')}
						class="inline-flex items-center gap-1.5 text-zinc-300 transition-colors hover:text-[#4edea3]"
					>
						Read full documentation <ArrowRight size={13} />
					</a>
					<a
						href="https://github.com/Xuerns/Netra-Uptime/issues"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-200"
					>
						Open an issue on GitHub <ArrowUpRight size={13} />
					</a>
				</div>
			</div>

			<div
				data-reveal
				class="divide-y divide-zinc-800/80 overflow-hidden rounded-lg border border-zinc-800 bg-[#131315] lg:col-span-8"
			>
				{#each faqs as item, index (item.question)}
					{@const isOpen = openIndex === index}
					<div>
						<button
							type="button"
							class="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-zinc-900/60 focus-visible:outline-none"
							aria-expanded={isOpen}
							aria-controls="faq-answer-{index}"
							id="faq-question-{index}"
							onclick={() => toggle(index)}
						>
							<span
								class="text-sm font-medium tracking-tight text-zinc-100 transition-colors group-hover:text-[#4edea3] sm:text-base"
							>
								{item.question}
							</span>
							<ChevronDown
								size={16}
								class="shrink-0 text-zinc-400 transition-transform duration-200 {isOpen
									? 'rotate-180 text-[#4edea3]'
									: ''}"
							/>
						</button>

						{#if isOpen}
							<div
								id="faq-answer-{index}"
								role="region"
								aria-labelledby="faq-question-{index}"
								transition:slide={{ duration: 200 }}
								class="overflow-hidden border-t border-zinc-800/60 bg-[#0f0f11] px-5 py-4 text-sm leading-6 text-zinc-400"
							>
								<p>{item.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
