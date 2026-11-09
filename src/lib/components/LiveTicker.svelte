<script lang="ts">
	import { onMount } from 'svelte';

	type Health = 'up' | 'degraded';

	interface TickerMonitor {
		id: string;
		protocol: 'HTTP' | 'TCP' | 'PING';
		base: number;
		latency: number;
		uptime: number;
		health: Health;
		history: number[];
	}

	const HISTORY_LENGTH = 14;
	const UPDATE_MS = 1600;

	/** Deterministic pseudo-random generator so SSR and hydration render the same values. */
	function seeded(seed: number): () => number {
		let state = seed;
		return () => {
			state = (state * 16807) % 2147483647;
			return (state - 1) / 2147483646;
		};
	}

	const random = seeded(27346);

	const definitions: [string, TickerMonitor['protocol'], number, number][] = [
		['api.acme.dev', 'HTTP', 142, 99.98],
		['auth.acme.dev', 'HTTP', 96, 100],
		['db-primary:5432', 'TCP', 4, 99.99],
		['edge-sg-1', 'PING', 38, 99.95],
		['checkout.acme.dev', 'HTTP', 211, 99.91],
		['smtp.acme.dev:587', 'TCP', 27, 100],
		['cdn.acme.dev', 'HTTP', 58, 99.99],
		['status.acme.dev', 'HTTP', 73, 100]
	];

	function sample(base: number, rng: () => number): number {
		return Math.max(1, Math.round(base * (0.8 + rng() * 0.45)));
	}

	let monitors = $state<TickerMonitor[]>(
		definitions.map(([id, protocol, base, uptime]) => {
			const history = Array.from({ length: HISTORY_LENGTH }, () => sample(base, random));
			return {
				id,
				protocol,
				base,
				uptime,
				latency: history[history.length - 1],
				health: 'up',
				history
			};
		})
	);

	function barHeight(value: number, base: number): number {
		return Math.min(100, Math.max(18, (value / (base * 2.2)) * 100));
	}

	onMount(() => {
		const timer = window.setInterval(() => {
			if (document.hidden) return;
			for (const monitor of monitors) {
				const spike = Math.random() < 0.03;
				const value = spike
					? Math.round(monitor.base * (2 + Math.random()))
					: sample(monitor.base, Math.random);
				monitor.latency = value;
				monitor.health = spike ? 'degraded' : 'up';
				monitor.history = [...monitor.history.slice(1), value];
			}
		}, UPDATE_MS);

		return () => window.clearInterval(timer);
	});
</script>

<div class="ticker relative mt-8 overflow-hidden" aria-label="Simulated live monitor feed">
	<div class="ticker-track flex">
		{#each [0, 1] as copy (copy)}
			<ul class="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1}>
				{#each monitors as monitor (monitor.id)}
					<li
						class="flex w-[300px] shrink-0 items-center gap-3 overflow-hidden rounded-md border border-zinc-800 bg-[#121214]/90 px-3 py-2.5"
					>
						<span
							class="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 {monitor.health ===
							'up'
								? 'bg-[#4edea3]'
								: 'bg-amber-400'}"
						></span>
						<div class="min-w-0 flex-1">
							<div class="flex items-center gap-1.5">
								<span class="truncate font-mono text-[11px] text-zinc-200">{monitor.id}</span>
							</div>
							<div
								class="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] whitespace-nowrap text-zinc-500"
							>
								<span>{monitor.protocol}</span>
								<span class="text-zinc-700">/</span>
								<span
									class="tabular-nums {monitor.health === 'up'
										? 'text-zinc-400'
										: 'text-amber-400'}">{monitor.latency}ms</span
								>
								<span class="text-zinc-700">/</span>
								<span class="text-zinc-400 tabular-nums">{monitor.uptime.toFixed(2)}%</span>
							</div>
						</div>
						<div class="flex h-6 w-[68px] shrink-0 items-end justify-end gap-[2px]">
							{#each monitor.history as value, index (index)}
								<span
									class="w-[3px] rounded-[1px] transition-[height] duration-500 {value >
									monitor.base * 1.9
										? 'bg-amber-400/80'
										: 'bg-[#4edea3]/60'}"
									style:height="{barHeight(value, monitor.base)}%"
								></span>
							{/each}
						</div>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>
