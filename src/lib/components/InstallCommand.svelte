<script lang="ts">
	import { Check, Copy, Terminal } from 'lucide-svelte';
	import { installCommands, logos } from '$lib/data/landing';

	let { id = 'install' }: { id?: string } = $props();

	const tabs = [
		{ key: 'npx', label: 'npx', logo: logos.npm, cmd: installCommands.npx },
		{ key: 'pnpm', label: 'pnpm', logo: logos.pnpm, cmd: installCommands.pnpm },
		{ key: 'yarn', label: 'yarn', logo: logos.yarn, cmd: installCommands.yarn },
		{ key: 'bun', label: 'bun', logo: logos.bun, cmd: installCommands.bun }
	] as const;

	let active = $state<(typeof tabs)[number]['key']>('npx');
	let copied = $state(false);

	const current = $derived(tabs.find((tab) => tab.key === active) ?? tabs[0]);

	async function copy() {
		await navigator.clipboard.writeText(current.cmd);
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}
</script>

<div
	{id}
	class="glass w-full max-w-xl overflow-hidden rounded-2xl text-left hover:translate-y-0"
	style="box-shadow: 0 0 0 1px rgba(78,222,163,.12), 0 30px 80px -30px rgba(78,222,163,.35)"
>
	<div class="flex items-center justify-between border-b border-white/8 px-3 py-2">
		<div class="flex gap-1" role="tablist" aria-label="Install method">
			{#each tabs as tab (tab.key)}
				<button
					role="tab"
					id="install-tab-{tab.key}-{id}"
					aria-selected={active === tab.key}
					onclick={() => (active = tab.key)}
					class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors {active ===
					tab.key
						? 'bg-white/10 text-white'
						: 'text-[#86948a] hover:text-[#e5e2e3]'}"
				>
					<img src={tab.logo} alt="" class="h-3.5 w-3.5 object-contain" />
					{tab.label}
				</button>
			{/each}
		</div>
		<Terminal size={14} class="mr-2 text-[#4edea3]/70" />
	</div>
	<div class="flex items-center justify-between gap-4 px-5 py-4 font-mono text-sm sm:text-base">
		<code class="overflow-x-auto whitespace-nowrap text-[#e5e2e3]">
			<span class="text-[#4edea3]">$</span>
			{current.cmd}<span class="caret ml-0.5 text-[#4edea3]">▍</span>
		</code>
		<button
			id="copy-install-{id}"
			onclick={copy}
			aria-label="Copy install command"
			class="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#bbcabf] transition-colors hover:border-[#4edea3]/50 hover:text-[#4edea3]"
		>
			{#if copied}<Check size={14} /> Copied{:else}<Copy size={14} /> Copy{/if}
		</button>
	</div>
</div>
