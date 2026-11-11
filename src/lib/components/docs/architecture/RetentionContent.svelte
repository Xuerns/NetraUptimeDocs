<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import Callout from './Callout.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { retentionDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="ret-rollup" title="Hourly Rollup">
		<ArchText>
			To keep PostgreSQL and SQLite performant when operating thousands of checks per hour,
			retention.go runs a background aggregation job every hour. It rolls up raw checks older than
			24 hours into daily summaries and purges the raw check records.
		</ArchText>
		<MermaidDiagram definition={retentionDiagram.definition} label={retentionDiagram.label} />
		<ArchText>
			During rollup, the runner groups checks by (monitor_id, DATE(checked_at)) and calculates:
		</ArchText>
		<ArchList
			items={[
				"Total & Health Counts: total_checks, up_checks (status is up, or degraded with valid HTTP status < 500 / latency breach), and down_checks (status is down, or degraded with status 0 timeout). All checks with status = 'maintenance' are strictly excluded (status != 'maintenance').",
				"Unbiased Latency Metrics: avg_latency_ms, min_latency_ms, and max_latency_ms exclude down, maintenance, and timeout checks (response_time_ms > 0 and status != 'down') to eliminate statistical skew from 0ms connection resets and 30s timeout aborts. When merging buckets on conflict, average latency is weighted by up_checks.",
				'HTTP Status Code Histogram Buckets: count_2xx (200–299), count_3xx (300–399), count_4xx (400–499), count_5xx (>= 500), and count_error (status_code is NULL or 0, indicating socket timeouts, DNS drops, or connection refusals).',
				'Idempotent Upsert: Writes into monitor_daily_stats using clause.OnConflict on (monitor_id, date), ensuring re-runs merge cleanly before deleting old raw rows.'
			]}
		/>
	</ArchSection>

	<ArchSection id="ret-impact" title="Why It Matters">
		<ArchList
			items={[
				'Storage Efficiency: Second-by-second high-resolution data is compressed into a single row per monitor per day after 24 hours, preventing table bloat and index degradation in both PostgreSQL and SQLite.',
				'Instantaneous Status Pages: Public status pages and dashboard analytics query pre-computed daily stat rows instead of scanning millions of raw checks.',
				"Seamless Live-Today Merging: GetMonitorStats loads historical days from monitor_daily_stats and dynamically aggregates un-purged raw checks from midnight UTC to now. Today's live data is merged seamlessly into the time-series response with zero reporting latency."
			]}
		/>
		<Callout>
			By combining 24-hour raw check retention with 365-day daily rollups, Netra Uptime delivers
			instantaneous sub-millisecond historical queries while maintaining a negligible disk
			footprint.
		</Callout>
	</ArchSection>
</div>
