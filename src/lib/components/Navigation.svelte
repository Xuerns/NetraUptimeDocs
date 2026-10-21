<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowUpRight, Menu, X } from 'lucide-svelte';
	import logo from '$lib/assets/Logo.svg';

	let mobileOpen = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#0d0d0e]/95 backdrop-blur-md">
	<nav
		class="mx-auto flex h-14 max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-8"
		aria-label="Main navigation"
	>
		<div class="flex items-center gap-8">
			<a
				href={resolve('/')}
				class="flex items-center gap-2.5 text-zinc-100 transition-opacity hover:opacity-90"
				aria-label="Netra Uptime home"
			>
				<img src={logo} alt="Netra Uptime Logo" class="h-6 w-6 object-contain" />
				<span class="text-sm font-semibold tracking-tight text-zinc-100">Netra Uptime</span>
			</a>

			<div class="hidden items-center gap-6 text-sm md:flex">
				<a class="text-zinc-400 transition-colors hover:text-zinc-100" href="#features">
					Features
				</a>
				<a class="text-zinc-400 transition-colors hover:text-zinc-100" href="#architecture">
					Architecture
				</a>
				<a class="text-zinc-400 transition-colors hover:text-zinc-100" href="#faq">FAQ</a>
				<span class="h-3.5 w-px bg-zinc-800" aria-hidden="true"></span>
				<a class="text-zinc-400 transition-colors hover:text-zinc-100" href={resolve('/docs')}>
					Documentation
				</a>
				<a
					class="text-zinc-400 transition-colors hover:text-zinc-100"
					href={resolve('/docs/api-reference')}
				>
					API Reference
				</a>
			</div>
		</div>

		<div class="hidden items-center gap-3 md:flex">
			<a
				href="https://github.com/Xuerns/Netra-Uptime"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub Repository"
				class="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-zinc-100"
			>
				<svg class="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					/>
				</svg>
				<span>GitHub</span>
			</a>
			<a
				href={resolve('/docs')}
				class="flex items-center gap-1 rounded-md bg-[#4edea3] px-3 py-1.5 text-xs font-semibold text-[#003824] transition-colors hover:bg-[#6ffbbe]"
			>
				Get Started <ArrowUpRight size={13} />
			</a>
		</div>

		<button
			type="button"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-expanded={mobileOpen}
			aria-label="Toggle navigation menu"
			class="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100 md:hidden"
		>
			{#if mobileOpen}
				<X size={18} />
			{:else}
				<Menu size={18} />
			{/if}
		</button>
	</nav>

	{#if mobileOpen}
		<div class="border-t border-zinc-800/80 bg-[#0d0d0e] px-4 py-4 md:hidden">
			<div class="flex flex-col gap-3 text-sm">
				<a
					class="text-zinc-300 transition-colors hover:text-[#4edea3]"
					href="#features"
					onclick={() => (mobileOpen = false)}
				>
					Features
				</a>
				<a
					class="text-zinc-300 transition-colors hover:text-[#4edea3]"
					href="#architecture"
					onclick={() => (mobileOpen = false)}
				>
					Architecture
				</a>
				<a
					class="text-zinc-300 transition-colors hover:text-[#4edea3]"
					href="#faq"
					onclick={() => (mobileOpen = false)}
				>
					FAQ
				</a>
				<a
					class="text-zinc-300 transition-colors hover:text-[#4edea3]"
					href={resolve('/docs')}
					onclick={() => (mobileOpen = false)}
				>
					Documentation
				</a>
				<a
					class="text-zinc-300 transition-colors hover:text-[#4edea3]"
					href={resolve('/docs/api-reference')}
					onclick={() => (mobileOpen = false)}
				>
					API Reference
				</a>
				<div class="mt-2 flex items-center gap-3 border-t border-zinc-800/80 pt-3">
					<a
						href="https://github.com/Xuerns/Netra-Uptime"
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs font-medium text-zinc-200"
					>
						GitHub
					</a>
					<a
						href={resolve('/docs')}
						onclick={() => (mobileOpen = false)}
						class="flex flex-1 items-center justify-center gap-1 rounded-md bg-[#4edea3] px-3 py-2 text-xs font-semibold text-[#003824]"
					>
						Get Started <ArrowUpRight size={13} />
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
