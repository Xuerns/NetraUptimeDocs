<script lang="ts">
	import type { CodeExample, ResponseExample } from '$lib/data/api-reference';

	let { codeExample }: { codeExample: CodeExample } = $props();
</script>

<aside
	class="sticky top-14 h-full w-full overflow-y-auto border-t border-[#3c4a42] bg-[#0e0e0f] p-6 xl:h-[calc(100vh-56px)] xl:border-t-0"
>
	<h4
		class="mb-4 border-b border-[#3c4a42] pb-2 font-mono text-[11px] font-medium tracking-widest text-[#bbcabf] uppercase"
	>
		{codeExample.label}
	</h4>
	<div class="mb-8 overflow-x-auto rounded-lg border border-[#3c4a42] bg-[#1a1a1c] p-4">
		<pre class="font-mono text-xs leading-normal text-[#c9d1d9]"><code>{codeExample.code}</code
			></pre>
	</div>
	{#if codeExample.responses && codeExample.responses.length > 0}
		<h4
			class="mb-4 border-b border-[#3c4a42] pb-2 font-mono text-[11px] font-medium tracking-widest text-[#bbcabf] uppercase"
		>
			Responses
		</h4>
		<div class="flex flex-col gap-4">
			{#each codeExample.responses as response}
				<div>
					<div class="mb-2 flex items-center justify-between border-b border-[#3c4a42] pb-1.5">
						<span class="font-mono text-xs font-semibold text-[#e5e2e3]">{response.status}</span>
						{#if response.description}
							<span class="text-[10px] text-[#bbcabf]">{response.description}</span>
						{/if}
					</div>
					<div class="overflow-x-auto rounded-lg border border-[#3c4a42] bg-[#1a1a1c] p-4">
						<pre class="font-mono text-xs leading-normal text-[#c9d1d9]"><code>{response.code}</code
							></pre>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</aside>
