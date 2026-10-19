<script lang="ts">
	let { items }: { items: string[] } = $props();
</script>

<ul class="list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-400">
	{#each items as item (item)}
		<li>{item}</li>
	{/each}
</ul>
