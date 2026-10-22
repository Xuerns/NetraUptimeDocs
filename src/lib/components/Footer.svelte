<script lang="ts">
	import { resolve } from '$app/paths';
	import logo from '$lib/assets/Logo.svg';
	import { ArrowUpRight } from 'lucide-svelte';

	const deploymentLinks = [
		{ label: 'Quick Start & CLI', hash: '#getting-started' },
		{ label: 'Docker Compose', hash: '#docker-compose' },
		{ label: 'Environment Variables', hash: '#environment-variables' },
		{ label: 'Reverse Proxy Setup', hash: '#reverse-proxy' }
	];

	const platformLinks = [
		{ label: 'Monitors & Health Checks', hash: '#monitors' },
		{ label: 'Alert Rules & Incidents', hash: '#alert-rules' },
		{ label: 'Notification Channels', hash: '#notification-channels' },
		{ label: 'Status Pages & Badges', hash: '#status-pages' }
	];
</script>

<footer class="border-t border-zinc-800/80 bg-[#0b0b0c]">
	<div class="mx-auto max-w-[1380px] px-4 py-10 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
			<div class="lg:col-span-2">
				<a
					href={resolve('/')}
					class="inline-flex items-center gap-2.5 text-zinc-100 transition-opacity hover:opacity-90"
				>
					<img src={logo} alt="Netra Uptime Logo" class="h-6 w-6 object-contain" />
					<span class="text-sm font-semibold tracking-tight">Netra Uptime</span>
				</a>
				<p class="mt-3 max-w-sm text-xs leading-5 text-zinc-400">
					Open-source, self-hosted uptime monitoring, incident management, and status page platform
					built with Go, Svelte, PostgreSQL, and Redis.
				</p>
			</div>

			<div>
				<h3 class="font-mono text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
					Deployment
				</h3>
				<ul class="mt-3 flex flex-col gap-2 text-xs">
					{#each deploymentLinks as item (item.label)}
						<li>
							<a
								class="text-zinc-400 transition-colors hover:text-zinc-100"
								href="{resolve('/docs')}{item.hash}"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-mono text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
					Platform Guides
				</h3>
				<ul class="mt-3 flex flex-col gap-2 text-xs">
					{#each platformLinks as item (item.label)}
						<li>
							<a
								class="text-zinc-400 transition-colors hover:text-zinc-100"
								href="{resolve('/docs')}{item.hash}"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-mono text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
					Architecture &amp; API
				</h3>
				<ul class="mt-3 flex flex-col gap-2 text-xs">
					<li>
						<a
							class="text-zinc-400 transition-colors hover:text-zinc-100"
							href="{resolve('/docs/architecture')}#architecture"
						>
							System Architecture
						</a>
					</li>
					<li>
						<a
							class="text-zinc-400 transition-colors hover:text-zinc-100"
							href="{resolve('/docs/architecture')}#monitoring-engine"
						>
							Monitoring Engine
						</a>
					</li>
					<li>
						<a
							class="text-zinc-400 transition-colors hover:text-zinc-100"
							href={resolve('/docs/api-reference')}
						>
							REST API Reference
						</a>
					</li>
					<li>
						<a
							class="text-zinc-400 transition-colors hover:text-zinc-100"
							href="{resolve('/docs')}#cicd"
						>
							CI/CD Integration
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-6 text-xs text-zinc-500 sm:flex-row"
		>
			<p>© 2026 Netra Uptime.</p>
			<div class="flex items-center gap-5">
				<a
					href="https://github.com/Xuerns/Netra-Uptime"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 transition-colors hover:text-zinc-300"
				>
					GitHub <ArrowUpRight size={12} />
				</a>
				<a
					href="https://github.com/Xuerns/Netra-Uptime/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 transition-colors hover:text-zinc-300"
				>
					Report Issue <ArrowUpRight size={12} />
				</a>
				<a
					href="https://github.com/Xuerns/Netra-Uptime/blob/main/LICENSE"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 transition-colors hover:text-zinc-300"
				>
					AGPL-3.0 License <ArrowUpRight size={12} />
				</a>
			</div>
		</div>
	</div>
</footer>
