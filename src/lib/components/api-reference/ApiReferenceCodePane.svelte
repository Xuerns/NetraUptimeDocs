<script lang="ts">
	import type { CodeExample } from '$lib/data/api-reference';

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
	{#if codeExample.responseStatus}
		<h4
			class="mb-4 flex items-center justify-between border-b border-[#3c4a42] pb-2 font-mono text-[11px] font-medium tracking-widest text-[#bbcabf] uppercase"
		>
			<span>Example Response</span>
			<span
				class="rounded border border-[#005f40] bg-[#003824] px-1.5 py-0.5 text-[10px] text-[#4edea3]"
			>
				{codeExample.responseStatus}
			</span>
		</h4>
		<div class="overflow-x-auto rounded-lg border border-[#3c4a42] bg-[#1a1a1c] p-4">
			<pre class="font-mono text-xs leading-normal text-[#c9d1d9]"><code
					>{codeExample.responseCode}</code
				></pre>
		</div>
	{/if}
</aside>
