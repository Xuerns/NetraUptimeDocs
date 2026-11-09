<script lang="ts" module>
	export interface ChartPoint {
		id: number;
		up: boolean;
		latency: number;
		time: string;
	}
</script>

<script lang="ts">
	let { points, maxLatency = 400 }: { points: ChartPoint[]; maxLatency?: number } = $props();

	const uid = $props.id();
	const PAD = { top: 12, right: 10, bottom: 10, left: 44 };
	const GRID_STEPS = 4;

	interface Coord {
		x: number;
		y: number;
	}

	let width = $state(0);
	let height = $state(0);
	let hover = $state<number | null>(null);

	const innerW = $derived(Math.max(0, width - PAD.left - PAD.right));
	const innerH = $derived(Math.max(0, height - PAD.top - PAD.bottom));
	const bottom = $derived(PAD.top + innerH);
	const step = $derived(points.length > 1 ? innerW / (points.length - 1) : 0);
	const gridValues = $derived(
		Array.from({ length: GRID_STEPS + 1 }, (_, i) => Math.round((maxLatency / GRID_STEPS) * i))
	);

	function xAt(index: number): number {
		return PAD.left + index * step;
	}

	function yAt(value: number): number {
		return PAD.top + innerH - (Math.min(value, maxLatency) / maxLatency) * innerH;
	}

	function clampY(value: number): number {
		return Math.min(bottom, Math.max(PAD.top, value));
	}

	interface Segment {
		up: boolean;
		coords: Coord[];
	}

	/**
	 * Splits the series into runs that share the same status. Failed checks are
	 * plotted on the baseline, and each run starts at the last point of the
	 * previous run so the line stays continuous across outages.
	 */
	const segments = $derived.by(() => {
		const runs: Segment[] = [];
		let previous: Coord | null = null;
		points.forEach((point, index) => {
			const coord = { x: xAt(index), y: point.up ? yAt(point.latency) : bottom };
			const current = runs[runs.length - 1];
			if (current && current.up === point.up) {
				current.coords.push(coord);
			} else {
				runs.push({ up: point.up, coords: previous ? [previous, coord] : [coord] });
			}
			previous = coord;
		});
		return runs;
	});

	/** Catmull-Rom spline converted to cubic Bezier commands, clamped to the plot area. */
	function smoothPath(coords: Coord[]): string {
		let d = `M${coords[0].x} ${coords[0].y}`;
		for (let i = 0; i < coords.length - 1; i++) {
			const p0 = coords[i - 1] ?? coords[i];
			const p1 = coords[i];
			const p2 = coords[i + 1];
			const p3 = coords[i + 2] ?? p2;
			const c1x = p1.x + (p2.x - p0.x) / 6;
			const c1y = clampY(p1.y + (p2.y - p0.y) / 6);
			const c2x = p2.x - (p3.x - p1.x) / 6;
			const c2y = clampY(p2.y - (p3.y - p1.y) / 6);
			d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
		}
		return d;
	}

	function areaPath(coords: Coord[]): string {
		const first = coords[0];
		const last = coords[coords.length - 1];
		return `${smoothPath(coords)} L${last.x} ${bottom} L${first.x} ${bottom} Z`;
	}

	const hovered = $derived(hover === null ? null : (points[hover] ?? null));
	const tooltipFlip = $derived(hover !== null && xAt(hover) > width * 0.6);

	function onPointerMove(event: PointerEvent) {
		if (step === 0) return;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const index = Math.round((event.clientX - rect.left - PAD.left) / step);
		hover = Math.min(points.length - 1, Math.max(0, index));
	}
</script>

<div
	class="absolute inset-0"
	role="img"
	aria-label="Response time line chart"
	bind:clientWidth={width}
	bind:clientHeight={height}
	onpointermove={onPointerMove}
	onpointerleave={() => (hover = null)}
>
	{#if width > 0 && height > 0}
		<svg {width} {height} class="block" aria-hidden="true">
			<defs>
				<linearGradient id="{uid}-area" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#4edea3" stop-opacity="0.16" />
					<stop offset="100%" stop-color="#4edea3" stop-opacity="0" />
				</linearGradient>
			</defs>

			{#each gridValues as value (value)}
				<line
					x1={PAD.left}
					x2={width - PAD.right}
					y1={yAt(value)}
					y2={yAt(value)}
					stroke="#27272a"
					stroke-dasharray={value === 0 ? undefined : '2 4'}
				/>
				<text
					x={PAD.left - 8}
					y={yAt(value)}
					text-anchor="end"
					dominant-baseline="middle"
					class="fill-zinc-600 font-mono text-[10px]"
				>
					{value}ms
				</text>
			{/each}

			{#each points as point, index (point.id)}
				{#if !point.up}
					<rect
						x={Math.max(PAD.left, xAt(index) - step / 2)}
						y={PAD.top}
						width={Math.min(step, xAt(index) + step / 2 - PAD.left)}
						height={innerH}
						fill="rgba(248, 113, 113, 0.09)"
					/>
				{/if}
			{/each}

			{#each segments as segment, index (index)}
				{#if segment.coords.length > 1}
					{#if segment.up}
						<path d={areaPath(segment.coords)} fill="url(#{uid}-area)" />
					{/if}
					<path
						d={smoothPath(segment.coords)}
						fill="none"
						stroke={segment.up ? '#4edea3' : '#f87171'}
						stroke-width="1.75"
						stroke-linejoin="round"
						stroke-linecap="round"
					/>
				{/if}
			{/each}

			{#each points as point, index (point.id)}
				{#if point.up}
					<circle
						cx={xAt(index)}
						cy={yAt(point.latency)}
						r="1.75"
						fill="#131315"
						stroke="#4edea3"
						stroke-width="1.25"
					/>
				{:else}
					<circle cx={xAt(index)} cy={bottom} r="2.5" fill="#f87171" />
				{/if}
			{/each}

			{#if hover !== null && hovered}
				<line
					x1={xAt(hover)}
					x2={xAt(hover)}
					y1={PAD.top}
					y2={bottom}
					stroke="#3f3f46"
					stroke-dasharray="3 3"
				/>
				<circle
					cx={xAt(hover)}
					cy={hovered.up ? yAt(hovered.latency) : bottom}
					r="4"
					fill={hovered.up ? '#4edea3' : '#f87171'}
					stroke="#131315"
					stroke-width="2"
				/>
			{/if}
		</svg>

		{#if hover !== null && hovered}
			<div
				class="pointer-events-none absolute top-3 rounded-md border border-zinc-700/80 bg-[#0f1013]/95 px-3 py-2 font-mono text-[11px] whitespace-nowrap"
				style:left="{xAt(hover)}px"
				style:transform={tooltipFlip ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)'}
			>
				<p class="font-semibold text-zinc-100">Today, {hovered.time}</p>
				<p class="mt-1 flex items-center gap-1.5 text-zinc-300">
					<span class="h-2 w-2 rounded-[2px] {hovered.up ? 'bg-[#4edea3]' : 'bg-red-400'}"></span>
					Latency: {hovered.up ? `${hovered.latency} ms` : 'n/a'}
				</p>
				<p class="mt-0.5 pl-3.5 text-zinc-400">
					HTTP Status: <span class={hovered.up ? 'text-zinc-300' : 'text-red-400'}
						>{hovered.up ? 200 : 503}</span
					>
				</p>
			</div>
		{/if}
	{/if}
</div>
