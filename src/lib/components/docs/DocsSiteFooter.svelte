<script lang="ts">
	import logo from '$lib/assets/Logo.svg';
	import { ArrowUpRight } from 'lucide-svelte';
</script>

<footer class="border-t border-white/5 bg-[#0e0e0f] px-6 py-10 lg:px-10">
	<div class="mx-auto flex max-w-360 flex-col items-center justify-between gap-6 md:flex-row">
		<div class="flex items-center gap-2.5">
			<img src={logo} alt="PulseWatch Logo" class="h-7 w-auto" />
			<span class="font-display text-lg font-bold tracking-tight text-white">PulseWatch</span>
		</div>
		<div class="flex items-center gap-6 text-sm text-[#bbcabf]">
			<a href="/docs" class="transition-colors hover:text-white">Docs</a>
			<a href="/docs/api-reference" class="transition-colors hover:text-white">API Reference</a>
			<a
				href="https://github.com/Xuerns/PulseWatch"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1 transition-colors hover:text-white"
			>
				GitHub
				<ArrowUpRight size={13} />
			</a>
		</div>
		<p class="text-xs text-[#bbcabf]/60">© 2026 PulseWatch. MIT License.</p>
	</div>
</footer>
