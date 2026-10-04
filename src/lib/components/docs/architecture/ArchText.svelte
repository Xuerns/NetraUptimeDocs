<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">{@render children()}</p>
