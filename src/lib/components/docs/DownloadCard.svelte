<script lang="ts">
	import { onMount } from 'svelte';
	import { Download, ExternalLink, FileArchive, Info, Monitor } from 'lucide-svelte';
	import { links, windowsDownloads } from '$lib/data/landing';

	let { id = 'download-card' }: { id?: string } = $props();

	// null until mounted so the prerendered HTML never shows a wrong platform hint
	let isWindows = $state<boolean | null>(null);

	onMount(() => {
		isWindows = /windows/i.test(navigator.userAgent);
	});

	const specs = ['Windows 10 / 11', 'x64', 'Portable, no installer', 'No Docker required'];
</script>

<div {id} class="overflow-hidden rounded-lg border border-zinc-800 bg-[#131315]">
	<div class="flex flex-col gap-5 p-5 sm:p-6">
		<div class="flex items-start gap-4">
			<div
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-[#0f0f11]"
			>
				<Monitor size={20} class="text-[#4edea3]" />
			</div>
			<div class="flex min-w-0 flex-col gap-1.5">
				<div class="flex flex-wrap items-center gap-2">
					<h3 class="text-base font-semibold tracking-tight text-zinc-100">
						Netra Uptime for Windows
					</h3>
					<span
						class="rounded-full border border-[#4edea3]/30 bg-[#4edea3]/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-[#4edea3] uppercase"
					>
						Latest release
					</span>
				</div>
				<ul class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
					{#each specs as spec (spec)}
						<li
							class="flex items-center gap-3 [&:not(:first-child)]:before:text-zinc-700 [&:not(:first-child)]:before:content-['/']"
						>
							{spec}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="flex flex-col gap-2.5 sm:flex-row">
			<a
				id="{id}-exe"
				href={windowsDownloads.exe.url}
				rel="external"
				class="inline-flex items-center justify-center gap-2 rounded-md bg-[#4edea3] px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#6ee7b7] focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131315] focus-visible:outline-none"
			>
				<Download size={16} />
				Download for Windows
				<span class="font-mono text-xs font-medium text-zinc-900/70">.exe</span>
			</a>
			<a
				id="{id}-zip"
				href={windowsDownloads.zip.url}
				rel="external"
				class="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:outline-none"
			>
				<FileArchive size={16} class="text-zinc-400" />
				Download .zip
			</a>
		</div>

		{#if isWindows === false}
			<p
				class="flex items-start gap-2 rounded-md border border-zinc-800 bg-[#0f0f11] px-3 py-2.5 text-xs leading-5 text-zinc-400"
			>
				<Info size={14} class="mt-0.5 shrink-0 text-zinc-500" />
				<span>
					It looks like you are not on Windows. For Linux and macOS, use the
					<a
						href="#gs-docker-deploy"
						class="text-zinc-200 underline underline-offset-2 hover:text-[#4edea3]"
						>CLI quick start</a
					> or Docker Compose instead.
				</span>
			</p>
		{/if}
	</div>

	<div
		class="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 bg-[#0f0f11] px-5 py-3 text-xs sm:px-6"
	>
		<span class="font-mono text-zinc-500">{windowsDownloads.exe.fileName}</span>
		<a
			href={links.releases}
			target="_blank"
			rel="external noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-100"
		>
			Release notes &amp; all versions
			<ExternalLink size={12} />
		</a>
	</div>
</div>
