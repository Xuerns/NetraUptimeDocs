<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="text-sm leading-7 text-zinc-400">
	{@render children()}
</p>
