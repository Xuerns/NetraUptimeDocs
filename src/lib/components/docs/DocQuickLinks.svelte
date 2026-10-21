<script lang="ts">
	import { resolve } from '$app/paths';
	import { Terminal, Settings, HeartPulse, Bell, Code } from 'lucide-svelte';
	import type { QuickLink } from '$lib/data/docs';

	let { links }: { links: QuickLink[] } = $props();

	const iconMap: Record<string, typeof Terminal> = {
		terminal: Terminal,
		settings: Settings,
		'monitor-heart': HeartPulse,
		bell: Bell,
		code: Code
	};
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	{#each links as link (link.id)}
		{@const Icon = iconMap[link.icon]}
		{@const route =
			link.href === '/docs/api-reference' ? ('/docs/api-reference' as const) : ('/docs' as const)}
		{@const hash = link.href.startsWith('#') ? link.href : ''}
		<a
			href="{resolve(route)}{hash}"
			class="group rounded-lg border border-white/5 bg-[#1a1d1b] p-8 transition-all hover:border-[#4edea3]/30"
		>
			<div class="mb-4 text-[#4edea3]/70">
				<Icon size={28} strokeWidth={1.5} />
			</div>
			<h3
				class="mb-2 font-display text-xl font-semibold text-[#e5e2e3] transition-colors group-hover:text-[#4edea3]"
			>
				{link.title}
			</h3>
			<p class="text-sm leading-relaxed font-light text-[#bbcabf]">
				{link.description}
			</p>
		</a>
	{/each}
</div>
