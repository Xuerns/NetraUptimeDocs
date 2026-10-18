<script lang="ts">
	import logo from '$lib/assets/Logo.svg';
	import { ArrowUpRight } from 'lucide-svelte';

	const productLinks = [
		{ label: 'Features', href: '#features' },
		{ label: 'Multi-Protocol', href: '#features' },
		{ label: 'Status Pages', href: '#features' },
		{ label: 'Incident Management', href: '#features' }
	];

	const companyLinks = [
		{ label: 'About Netra Uptime', href: '#top' },
		{ label: 'Open Source', href: '#open-source' },
		{ label: 'Self-Hosting', href: '#quick-start' },
		{ label: 'FAQ', href: '#faq' }
	];

	const supportLinks = [
		{ label: 'Documentation', href: '/docs' },
		{ label: 'Quick Start Guide', href: '#quick-start' },
		{ label: 'GitHub Repository', href: 'https://github.com/Xuerns/PulseWatch', external: true },
		{ label: 'API Reference', href: '/docs/api-reference' }
	];
</script>

<footer class="border-t border-white/5 bg-[#0e0e0f] px-6 py-12 lg:px-10">
	<div class="mx-auto grid max-w-360 grid-cols-1 gap-10 md:grid-cols-4">
		<!-- Brand Column -->
		<div class="col-span-1">
			<div class="mb-4 flex items-center gap-2">
				<img src={logo} alt="Netra Uptime Logo" class="h-9 w-auto" />
				<div class="font-display text-xl font-bold tracking-tight text-white">Netra Uptime</div>
			</div>
			<p class="text-sm leading-relaxed text-[#bbcabf]">
				Modern open-source uptime monitoring platform for businesses and developers who prioritize
				performance, security, and trust.
			</p>
		</div>

		<!-- Product Links -->
		<div>
			<h4 class="mb-4 text-xs font-bold tracking-wider text-[#4edea3] uppercase">Product</h4>
			<div class="flex flex-col gap-2.5 text-sm">
				{#each productLinks as item (item.label)}
					<a class="text-[#bbcabf] transition-colors hover:text-white" href={item.href}
						>{item.label}</a
					>
				{/each}
			</div>
		</div>

		<!-- Company / Project Links -->
		<div>
			<h4 class="mb-4 text-xs font-bold tracking-wider text-[#4edea3] uppercase">Project</h4>
			<div class="flex flex-col gap-2.5 text-sm">
				{#each companyLinks as item (item.label)}
					<a class="text-[#bbcabf] transition-colors hover:text-white" href={item.href}
						>{item.label}</a
					>
				{/each}
			</div>
		</div>

		<!-- Support / Docs Links -->
		<div>
			<h4 class="mb-4 text-xs font-bold tracking-wider text-[#4edea3] uppercase">Resources</h4>
			<div class="flex flex-col gap-2.5 text-sm">
				{#each supportLinks as item (item.label)}
					<a
						class="flex items-center gap-1 text-[#bbcabf] transition-colors hover:text-white"
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
					>
						{item.label}
						{#if item.external}
							<ArrowUpRight size={13} />
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom Section -->
	<div
		class="mx-auto mt-10 flex max-w-360 flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 md:flex-row"
	>
		<p class="text-xs text-[#bbcabf]/60">© 2026 Netra Uptime.</p>
		<div class="flex items-center gap-6 text-xs text-[#bbcabf]/60">
			<span>Self-Hosted</span>
			<span>•</span>
			<span>No Vendor Lock-in</span>
			<span>•</span>
			<span>AGPL-3.0</span>
		</div>
	</div>
</footer>
