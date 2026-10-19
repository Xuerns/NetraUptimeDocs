<script lang="ts">
	import { Copy, Check } from 'lucide-svelte';

	let {
		code,
		language = 'bash',
		id = 'code-block'
	}: { code: string; language?: string; id?: string } = $props();

	let copied = $state(false);

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div {id} class="relative overflow-hidden rounded-lg border border-zinc-800 bg-[#141416]">
	<div class="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2">
		<span class="font-mono text-xs text-zinc-400">{language}</span>
		<button
			type="button"
			onclick={copyCode}
			class="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
			aria-label="Copy code"
		>
			{#if copied}
				<Check size={12} class="text-[#4edea3]" />
				<span class="text-[#4edea3]">Copied</span>
			{:else}
				<Copy size={12} />
				<span>Copy</span>
			{/if}
		</button>
	</div>
	<pre class="overflow-x-auto p-4 font-mono text-xs leading-6 text-zinc-300"><code>{code}</code
		></pre>
</div>
