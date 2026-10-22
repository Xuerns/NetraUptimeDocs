<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from '$lib/assets/Logo.svg';
</script>

<footer class="border-t border-zinc-800/80 bg-[#0d0d0e] py-8">
	<div
		class="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8"
	>
		<div class="flex items-center gap-2.5">
			<img src={Logo} alt="Netra Uptime Logo" class="h-5 w-5 object-contain opacity-80" />
			<span class="text-xs text-zinc-500">Netra Uptime — Self-Hosted Monitoring</span>
		</div>
		<div class="flex items-center gap-6 text-xs text-zinc-500">
			<a href={resolve('/docs')} class="transition-colors hover:text-zinc-300">Documentation</a>
			<a href={resolve('/docs/architecture')} class="transition-colors hover:text-zinc-300"
				>Architecture</a
			>
			<a href={resolve('/docs/api-reference')} class="transition-colors hover:text-zinc-300"
				>API Reference</a
			>
			<a
				href="https://github.com/Xuerns/Netra-Uptime"
				target="_blank"
				rel="noreferrer"
				class="transition-colors hover:text-zinc-300">GitHub</a
			>
		</div>
	</div>
</footer>
