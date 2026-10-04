<script lang="ts">
	import { Check } from 'lucide-svelte';

	let { items }: { items: string[] } = $props();
</script>

<ul class="flex max-w-3xl flex-col gap-3">
	{#each items as item (item)}
		<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
			<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
			<span>{item}</span>
		</li>
	{/each}
</ul>
