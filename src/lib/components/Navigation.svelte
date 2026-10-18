<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import logo from '$lib/assets/Logo.svg';

	const navigationItems = [
		{ label: 'Features', href: '#features' },
		{ label: 'Why Netra Uptime', href: '#audience' },
		{ label: 'FAQ', href: '#faq' },
		{ label: 'Documentation', href: '/docs' }
	];
</script>

<header
	class="fixed top-3 left-1/2 z-50 w-[min(90%,56rem)] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#131314]/80 shadow-lg shadow-black/30 backdrop-blur-xl"
>
	<nav
		class="mx-auto flex h-15 max-w-360 items-center justify-between px-5"
		aria-label="Main navigation"
	>
		<!-- Logo / Brand -->
		<a
			href="#top"
			class="flex items-center gap-2 text-[#e5e2e3] transition-opacity hover:opacity-90"
			aria-label="Netra Uptime home"
		>
			<img src={logo} alt="Netra Uptime Logo" class="h-6 w-auto" />
			<span class="font-display text-base font-bold tracking-tight text-white">Netra Uptime</span>
		</a>

		<!-- Center Navigation Links -->
		<div class="hidden items-center gap-6 text-xs font-medium text-[#bbcabf] md:flex">
			{#each navigationItems as item (item.label)}
				<a class="transition-colors hover:text-[#4edea3]" href={item.href}>{item.label}</a>
			{/each}
		</div>

		<!-- Right Action Buttons -->
		<div class="flex items-center gap-3">
			<!-- Get Started Button -->
			<a
				href="/docs"
				class="flex items-center gap-1 rounded-full border border-[#4edea3] bg-[#4edea3] px-3.5 py-1.5 text-xs font-semibold text-[#003824] transition-all hover:bg-[#6ffbbe]"
			>
				Get started <ArrowUpRight size={13} />
			</a>
		</div>
	</nav>
</header>

<!-- GitHub icon — fixed at the far right edge, same height as navbar -->
<a
	href="https://github.com/Xuerns/PulseWatch"
	target="_blank"
	rel="noopener noreferrer"
	class="fixed top-5 right-7 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#131314]/80 text-[#bbcabf] shadow-lg shadow-black/30 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
	aria-label="GitHub Repository"
>
	<svg class="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
		/>
	</svg>
</a>
