<script lang="ts">
	import { Copy, Check, Terminal } from 'lucide-svelte';

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

<div {id} class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
	<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
		<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]">
			<Terminal size={13} class="text-[#4edea3]" />
			<span>{language}</span>
		</div>
		<button
			onclick={copyCode}
			class="flex items-center gap-1.5 text-xs text-[#bbcabf] transition-colors hover:text-[#4edea3]"
			aria-label="Copy code"
		>
			{#if copied}
				<Check size={12} class="text-[#4edea3]" />
				<span class="text-[#4edea3]">Copied!</span>
			{:else}
				<Copy size={12} />
				<span>Copy</span>
			{/if}
		</button>
	</div>
	<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><code>{code}</code
		></pre>
</div>
