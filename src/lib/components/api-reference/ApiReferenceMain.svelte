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

		<div class="mb-6 flex flex-wrap gap-4 text-xs">
			<div class="rounded border border-[#3c4a42] bg-[#1a1a1c] px-3 py-1.5">
				<span class="font-mono text-[#bbcabf]">Auth: </span>
				<span class="font-mono text-[#e5e2e3]">{endpoint.auth}</span>
			</div>
			{#if endpoint.rateLimit}
				<div class="rounded border border-[#3c4a42] bg-[#1a1a1c] px-3 py-1.5">
					<span class="font-mono text-[#bbcabf]">Rate Limit: </span>
					<span class="font-mono text-[#e5e2e3]">{endpoint.rateLimit}</span>
				</div>
			{/if}
		</div>

		{#if endpoint.requestBody && endpoint.requestBody.length > 0}
			<EndpointTable title="Request Body" params={endpoint.requestBody} />
		{/if}

		{#if endpoint.queryParams && endpoint.queryParams.length > 0}
			<EndpointTable title="Query Parameters" params={endpoint.queryParams} />
		{/if}

		{#if endpoint.notes && endpoint.notes.length > 0}
			<div class="mb-8">
				<h3 class="mb-3 text-sm font-semibold text-[#e5e2e3]">Notes</h3>
				<ul class="list-inside list-disc space-y-1 text-sm text-[#bbcabf]">
					{#each endpoint.notes as note}
						<li>{note}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>
</main>
