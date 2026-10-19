<script lang="ts">
	import type { CodeExample } from '$lib/data/api-reference';
	import CodeBlock from '$lib/components/docs/CodeBlock.svelte';

	let { codeExample }: { codeExample: CodeExample } = $props();
</script>

<aside
	data-lenis-prevent
	class="sticky top-14 w-full overflow-y-auto py-10 xl:h-[calc(100vh-56px)]"
>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<div class="text-xs font-medium text-zinc-300">{codeExample.label}</div>
			<CodeBlock code={codeExample.code} language="bash" id="api-request-code" />
		</div>

		{#if codeExample.responses && codeExample.responses.length > 0}
			<div class="flex flex-col gap-4">
				<div class="text-xs font-medium text-zinc-300">Responses</div>
				{#each codeExample.responses as response (response.status)}
					<div class="flex flex-col gap-2">
						<div class="flex items-center justify-between text-xs">
							<span class="font-mono font-medium text-zinc-200">{response.status}</span>
							{#if response.description}
								<span class="text-zinc-400">{response.description}</span>
							{/if}
						</div>
						<CodeBlock code={response.code} language="json" id="api-response-{response.status}" />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</aside>
