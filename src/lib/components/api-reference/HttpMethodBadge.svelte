<script lang="ts">
	import type { HttpMethod } from '$lib/data/api-reference';

	let { method }: { method: HttpMethod } = $props();

	const colors: Record<HttpMethod, string> = {
		GET: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
		POST: 'border-[#4edea3]/30 bg-[#4edea3]/10 text-[#4edea3]',
		PUT: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
		PATCH: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
		DELETE: 'border-rose-500/30 bg-rose-500/10 text-rose-400'
	};
</script>

<span
	class="rounded border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase {colors[method]}"
>
	{method}
</span>
