<script lang="ts">
	import type { EndpointSection } from '$lib/data/api-reference';
	import HttpMethodBadge from './HttpMethodBadge.svelte';
	import EndpointTable from './EndpointTable.svelte';

	let { endpoint }: { endpoint: EndpointSection } = $props();
</script>

<main class="min-w-0 flex-1 px-4 py-10 sm:px-8">
	<header class="mb-8 border-b border-zinc-800/80 pb-6">
		<h1 class="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
			{endpoint.title}
		</h1>
		<p class="mt-3 text-base leading-7 text-zinc-400">
			{endpoint.description}
		</p>
	</header>

	<section class="flex flex-col gap-8">
		<div class="flex flex-col gap-3">
			<div class="flex flex-wrap items-center gap-2.5">
				<HttpMethodBadge method={endpoint.method} />
				<code class="font-mono text-sm text-zinc-200">
					https://api.netrauptime.com/v1{endpoint.path}
				</code>
			</div>

			<p class="text-xs text-zinc-400">
				<strong class="font-medium text-zinc-300">Authentication:</strong>
				{endpoint.auth}
				{#if endpoint.rateLimit}
					<span class="mx-2 text-zinc-600">·</span>
					<strong class="font-medium text-zinc-300">Rate Limit:</strong>
					{endpoint.rateLimit}
				{/if}
			</p>
		</div>

		{#if endpoint.requestBody && endpoint.requestBody.length > 0}
			<EndpointTable title="Request Body" params={endpoint.requestBody} />
		{/if}

		{#if endpoint.queryParams && endpoint.queryParams.length > 0}
			<EndpointTable title="Query Parameters" params={endpoint.queryParams} />
		{/if}

		{#if endpoint.notes && endpoint.notes.length > 0}
			<div class="flex flex-col gap-2">
				<h2 class="text-lg font-semibold text-zinc-100">Notes</h2>
				<ul class="list-disc space-y-1.5 pl-5 text-sm leading-7 text-zinc-400">
					{#each endpoint.notes as note (note)}
						<li>{note}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>
</main>
