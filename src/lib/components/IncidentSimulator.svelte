<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { resolve } from '$app/paths';
	import {
		ArrowRight,
		BellRing,
		CircleCheck,
		CircleX,
		Globe,
		RotateCcw,
		ShieldAlert,
		Zap
	} from 'lucide-svelte';
	import { logos } from '$lib/data/landing';
	import LatencyChart, { type ChartPoint } from './LatencyChart.svelte';

	type Phase = 'operational' | 'failing' | 'down' | 'recovering';
	type LogKind = 'ok' | 'warn' | 'error' | 'info';
	type Channel = 'slack' | 'discord' | 'status';

	interface Check {
		id: number;
		at: number;
		up: boolean;
		latency: number;
	}

	interface LogEntry {
		id: number;
		time: string;
		kind: LogKind;
		text: string;
	}

	interface QueuedEvent {
		kind: LogKind;
		text: string;
		effect?: () => void;
	}

	const CHECK_COUNT = 40;
	const BREACH_THRESHOLD = 3;
	const INTERVAL_SECONDS = 30;
	const TICK_MS = 900;
	const MAX_LOGS = 7;
	const MAX_LATENCY = 400;
	const START_SECONDS = 9 * 3600 + 41 * 60;

	const phaseMeta: Record<Phase, { label: string; dot: string; text: string; border: string }> = {
		operational: {
			label: 'Operational',
			dot: 'bg-[#4edea3]',
			text: 'text-[#4edea3]',
			border: 'border-[#4edea3]/30'
		},
		failing: {
			label: 'Degraded',
			dot: 'bg-amber-400',
			text: 'text-amber-400',
			border: 'border-amber-400/30'
		},
		down: { label: 'Down', dot: 'bg-red-400', text: 'text-red-400', border: 'border-red-400/30' },
		recovering: {
			label: 'Recovering',
			dot: 'bg-sky-400',
			text: 'text-sky-400',
			border: 'border-sky-400/30'
		}
	};

	const logStyle: Record<LogKind, { icon: typeof CircleCheck; color: string }> = {
		ok: { icon: CircleCheck, color: 'text-[#4edea3]' },
		warn: { icon: ShieldAlert, color: 'text-amber-400' },
		error: { icon: CircleX, color: 'text-red-400' },
		info: { icon: BellRing, color: 'text-sky-400' }
	};

	/** Deterministic baseline with occasional spikes so SSR and hydration match. */
	function latencyAt(index: number): number {
		const base = 62 + Math.round(((Math.sin(index * 1.7) + 1) / 2) * 34);
		return index % 9 === 4 ? base + 150 + ((index * 37) % 90) : base;
	}

	/** Random latency for live checks: steady baseline with occasional spikes. */
	function randomLatency(): number {
		const base = 60 + Math.round(Math.random() * 40);
		return Math.random() < 0.14 ? base + 120 + Math.round(Math.random() * 160) : base;
	}

	function clock(tick: number): string {
		const total = START_SECONDS + tick * INTERVAL_SECONDS;
		const h = Math.floor(total / 3600) % 24;
		const m = Math.floor(total / 60) % 60;
		const s = total % 60;
		return [h, m, s].map((value) => String(value).padStart(2, '0')).join(':');
	}

	let tick = $state(0);
	let phase = $state<Phase>('operational');
	let breaches = $state(0);
	let incidentNumber = $state(1041);
	let incidentOpenedAt = 0;
	let lastMttr = $state<string | null>(null);
	let channels = $state<Record<Channel, boolean>>({ slack: false, discord: false, status: false });
	let checkSeq = CHECK_COUNT;
	let logSeq = 0;
	let queue: QueuedEvent[] = [];

	let checks = $state<Check[]>(
		Array.from({ length: CHECK_COUNT }, (_, index) => ({
			id: index,
			at: index - (CHECK_COUNT - 1),
			up: true,
			latency: latencyAt(index)
		}))
	);

	const chartPoints = $derived<ChartPoint[]>(
		checks.map((check) => ({
			id: check.id,
			up: check.up,
			latency: check.latency,
			time: clock(check.at)
		}))
	);

	let logs = $state<LogEntry[]>(
		[0, -1, -2].map((offset) => ({
			id: logSeq++,
			time: clock(offset),
			kind: 'ok' as const,
			text: `GET /health 200 OK / ${latencyAt(CHECK_COUNT + offset)}ms`
		}))
	);

	const uptime = $derived(
		((checks.filter((check) => check.up).length / checks.length) * 100).toFixed(2)
	);
	const avgLatency = $derived.by(() => {
		const up = checks.filter((check) => check.up);
		if (up.length === 0) return 0;
		return Math.round(up.reduce((sum, check) => sum + check.latency, 0) / up.length);
	});
	const meta = $derived(phaseMeta[phase]);
	const canBreak = $derived(phase === 'operational');
	const canRestore = $derived(phase === 'failing' || phase === 'down');

	function log(kind: LogKind, text: string) {
		logs = [{ id: logSeq++, time: clock(tick), kind, text }, ...logs].slice(0, MAX_LOGS);
	}

	function pushCheck(up: boolean): number {
		const latency = up ? randomLatency() : 0;
		checks = [...checks.slice(1), { id: checkSeq++, at: tick, up, latency }];
		return latency;
	}

	function step() {
		tick += 1;
		const failing = phase === 'failing' || phase === 'down';
		const latency = pushCheck(!failing);

		const next = queue.shift();
		if (next) {
			next.effect?.();
			log(next.kind, next.text);
			return;
		}

		if (phase === 'operational') {
			log('ok', `GET /health 200 OK / ${latency}ms`);
			return;
		}

		if (phase === 'failing') {
			breaches += 1;
			log('warn', `GET /health 503 Service Unavailable / breach ${breaches}/${BREACH_THRESHOLD}`);
			if (breaches >= BREACH_THRESHOLD) openIncident();
			return;
		}

		if (phase === 'down') {
			log('error', 'GET /health 503 Service Unavailable / incident ongoing');
			return;
		}

		phase = 'operational';
		log('ok', `GET /health 200 OK / ${latency}ms`);
	}

	function openIncident() {
		phase = 'down';
		incidentNumber += 1;
		incidentOpenedAt = tick;
		queue = [
			{ kind: 'error', text: `Incident INC-${incidentNumber} opened / PIC: on-call engineer` },
			{
				kind: 'info',
				text: 'Slack Block Kit alert dispatched to #ops-alerts',
				effect: () => (channels.slack = true)
			},
			{
				kind: 'info',
				text: 'Discord embed dispatched (red / incident open)',
				effect: () => (channels.discord = true)
			},
			{
				kind: 'info',
				text: 'Status page component set to Major Outage',
				effect: () => (channels.status = true)
			}
		];
	}

	function breakService() {
		if (!canBreak) return;
		lastMttr = null;
		breaches = 0;
		phase = 'failing';
	}

	function restoreService() {
		if (!canRestore) return;

		if (phase === 'failing') {
			phase = 'recovering';
			breaches = 0;
			queue = [
				{
					kind: 'ok',
					text: `Recovered below threshold / no incident opened, no alert noise`
				}
			];
			return;
		}

		const minutes = Math.max(1, Math.round(((tick - incidentOpenedAt) * INTERVAL_SECONDS) / 60));
		phase = 'recovering';
		breaches = 0;
		queue = [
			{ kind: 'ok', text: 'GET /health 200 OK / check recovered' },
			{
				kind: 'ok',
				text: `Incident INC-${incidentNumber} resolved automatically / MTTR ${minutes}m`,
				effect: () => (lastMttr = `${minutes}m`)
			},
			{
				kind: 'info',
				text: 'Recovery notices sent / status page back to Operational',
				effect: () => (channels = { slack: false, discord: false, status: false })
			}
		];
	}

	let root = $state<HTMLElement>();

	onMount(() => {
		let visible = false;
		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
			},
			{ threshold: 0.15 }
		);
		if (root) observer.observe(root);

		const timer = window.setInterval(() => {
			if (visible && !document.hidden) step();
		}, TICK_MS);

		return () => {
			observer.disconnect();
			window.clearInterval(timer);
		};
	});
</script>

<section
	bind:this={root}
	id="simulator"
	class="border-t border-zinc-800/80"
	aria-labelledby="simulator-heading"
>
	<div class="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div data-reveal class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p class="eyebrow">Interactive simulation</p>
				<h2
					id="simulator-heading"
					class="mt-2 font-display text-3xl tracking-tight text-zinc-100 sm:text-4xl"
				>
					Break it on purpose. <span class="text-[#4edea3] italic">Watch Netra respond.</span>
				</h2>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
					Trigger an outage and follow the alert state machine in real time: consecutive breach
					counting, automatic incident lifecycle, and multi-channel dispatch. Restore early to see
					false positives suppressed.
				</p>
			</div>
			<a
				href="{resolve('/docs/architecture')}#alert-evaluation"
				class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-[#4edea3]"
			>
				How alert evaluation works <ArrowRight size={14} />
			</a>
		</div>

		<div data-reveal class="mt-8 grid gap-4 lg:grid-cols-5">
			<div class="panel flex flex-col rounded-lg lg:col-span-3">
				<div
					class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 px-5 py-4"
				>
					<div class="min-w-0">
						<div class="flex items-center gap-2">
							<span class="font-mono text-sm text-zinc-100">api.acme.dev</span>
							<span
								class="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400"
								>HTTP</span
							>
						</div>
						<p class="mt-0.5 font-mono text-[11px] text-zinc-500">
							GET /health / every {INTERVAL_SECONDS}s / threshold {BREACH_THRESHOLD} breaches
						</p>
					</div>
					<span
						class="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-300 {meta.border} {meta.text}"
						aria-live="polite"
					>
						<span class="h-1.5 w-1.5 rounded-full {meta.dot}"></span>
						{meta.label}
					</span>
				</div>

				<div class="grid grid-cols-3 border-b border-zinc-800/80">
					<div class="border-r border-zinc-800/80 px-5 py-3.5">
						<p class="eyebrow">Uptime (window)</p>
						<p class="mt-1 font-mono text-lg text-zinc-100 tabular-nums">{uptime}%</p>
					</div>
					<div class="border-r border-zinc-800/80 px-5 py-3.5">
						<p class="eyebrow">Avg latency</p>
						<p class="mt-1 font-mono text-lg text-zinc-100 tabular-nums">{avgLatency}ms</p>
					</div>
					<div class="px-5 py-3.5">
						<p class="eyebrow">Breach counter</p>
						<div class="mt-2 flex items-center gap-1.5">
							{#each Array.from({ length: BREACH_THRESHOLD }, (_, i) => i) as index (index)}
								<span
									class="h-3 flex-1 rounded-sm border transition-colors duration-300 {index <
										breaches || phase === 'down'
										? phase === 'down'
											? 'border-red-400/60 bg-red-400/70'
											: 'border-amber-400/60 bg-amber-400/70'
										: 'border-zinc-800 bg-zinc-900'}"
								></span>
							{/each}
						</div>
					</div>
				</div>

				<div class="flex flex-1 flex-col px-4 pt-4 pb-4">
					<div class="relative min-h-48 flex-1">
						<LatencyChart points={chartPoints} maxLatency={MAX_LATENCY} />
					</div>
					<div class="mt-2 flex justify-between pr-2.5 pl-11 font-mono text-[10px] text-zinc-600">
						<span>-{((CHECK_COUNT * INTERVAL_SECONDS) / 60).toFixed(0)}m</span>
						<span>now / {clock(tick)}</span>
					</div>
				</div>

				<div
					class="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 px-5 py-4"
				>
					<div class="flex flex-wrap gap-2">
						<button
							type="button"
							onclick={breakService}
							disabled={!canBreak}
							class="inline-flex items-center gap-2 rounded-md border border-red-400/40 bg-red-400/10 px-3.5 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-400/20 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-transparent disabled:text-zinc-600"
						>
							<Zap size={14} /> Simulate outage
						</button>
						<button
							type="button"
							onclick={restoreService}
							disabled={!canRestore}
							class="inline-flex items-center gap-2 rounded-md bg-[#4edea3] px-3.5 py-2 text-xs font-semibold text-[#003824] transition-colors hover:bg-[#6ffbbe] disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
						>
							<RotateCcw size={14} /> Restore service
						</button>
					</div>
					<p class="font-mono text-[11px] text-zinc-500">
						{#if lastMttr}
							Last incident resolved in <span class="text-[#4edea3]">{lastMttr}</span>
						{:else}
							1 tick = 1 check ({INTERVAL_SECONDS}s simulated)
						{/if}
					</p>
				</div>
			</div>

			<div class="panel flex flex-col rounded-lg lg:col-span-2">
				<div class="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
					<h3 class="text-sm font-semibold tracking-tight text-zinc-100">Event stream</h3>
					<span class="font-mono text-[11px] text-zinc-500">ws://localhost:27346</span>
				</div>

				<ol class="h-[296px] flex-none overflow-hidden px-5 py-2" aria-live="polite">
					{#each logs as entry (entry.id)}
						{@const style = logStyle[entry.kind]}
						<li
							animate:flip={{ duration: 250 }}
							in:fade={{ duration: 200 }}
							class="flex h-10 items-center gap-3 border-b border-zinc-800/50 last:border-b-0"
						>
							<style.icon size={14} class="shrink-0 {style.color}" />
							<p class="min-w-0 flex-1 truncate text-xs text-zinc-300" title={entry.text}>
								{entry.text}
							</p>
							<span class="shrink-0 font-mono text-[10px] text-zinc-600 tabular-nums">
								{entry.time}
							</span>
						</li>
					{/each}
				</ol>

				<div class="grid grid-cols-3 gap-2 border-t border-zinc-800/80 p-4">
					{#each [{ key: 'slack', label: 'Slack', logo: logos.slack }, { key: 'discord', label: 'Discord', logo: logos.discord }, { key: 'status', label: 'Status page', logo: null }] as channel (channel.key)}
						{@const active = channels[channel.key as Channel]}
						<div
							class="flex flex-col items-center gap-1.5 rounded-md border px-2 py-2.5 transition-colors duration-300 {active
								? 'border-[#4edea3]/45 bg-[#4edea3]/[0.06]'
								: 'border-zinc-800 bg-[#0f0f11]'}"
						>
							{#if channel.logo}
								<img
									src={channel.logo}
									alt=""
									class="h-4 w-4 object-contain transition-opacity duration-300 {active
										? 'opacity-100'
										: 'opacity-40'}"
								/>
							{:else}
								<Globe
									size={16}
									class="transition-colors duration-300 {active
										? 'text-[#4edea3]'
										: 'text-zinc-600'}"
								/>
							{/if}
							<span class="text-[11px] font-medium {active ? 'text-zinc-100' : 'text-zinc-500'}">
								{channel.label}
							</span>
							<span
								class="font-mono text-[9px] tracking-wider uppercase {active
									? 'text-[#4edea3]'
									: 'text-zinc-600'}"
							>
								{active ? 'Notified' : 'Idle'}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
