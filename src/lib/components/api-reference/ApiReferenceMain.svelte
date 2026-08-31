<script lang="ts">
	import type { EndpointSection } from '$lib/data/api-reference';
	import HttpMethodBadge from './HttpMethodBadge.svelte';
	import EndpointTable from './EndpointTable.svelte';

	let { endpoint }: { endpoint: EndpointSection } = $props();
</script>

<main class="min-w-0 flex-1 p-6 md:p-8 xl:border-r xl:border-[#3c4a42]">
	<header class="mb-10 pb-6">
		<span
			class="mb-3 block font-mono text-[11px] font-medium tracking-widest text-[#bbcabf] uppercase"
		>
			API Reference
		</span>
		<h1 class="mb-2 font-display text-[36px] leading-tight font-medium text-[#e5e2e3]">
			{endpoint.title}
		</h1>
		<p class="font-sans text-sm text-[#bbcabf]">
			{endpoint.description}
		</p>
	</header>

	<section class="mb-10">
		<div class="mb-6 flex items-center gap-3">
			<HttpMethodBadge method={endpoint.method} />
			<span class="font-mono text-lg text-[#e5e2e3]">
				https://api.pulsewatch.com/v1{endpoint.path}
			</span>
		</div>

		{#if endpoint.requestBody && endpoint.requestBody.length > 0}
			<EndpointTable title="Request Body Schema" params={endpoint.requestBody} />
		{/if}
	</section>
</main>
