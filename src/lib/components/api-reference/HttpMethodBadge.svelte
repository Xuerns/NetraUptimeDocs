<script lang="ts">
	import type { HttpMethod } from '$lib/data/api-reference';

	let { method }: { method: HttpMethod } = $props();

	const colors: Record<HttpMethod, string> = {
		GET: 'bg-[#003824] text-[#4edea3] border border-[#005f40]',
		POST: 'bg-[#4edea3] text-[#003824]',
		PUT: 'bg-[#b8860b] text-[#fff8dc]',
		DELETE: 'bg-[#93000a] text-[#ffb4ab]',
		PATCH: 'bg-[#002e6a] text-[#adc6ff]'
	};
</script>

<span class="rounded px-2 py-0.5 font-mono text-[11px] font-semibold uppercase {colors[method]}">
	{method}
</span>
