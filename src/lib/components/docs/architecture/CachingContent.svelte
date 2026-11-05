<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { cacheDiagram } from '$lib/data/architecture-diagrams';
	import { cacheKeyMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="cache-flow" title="Read-Through Cache &amp; Invalidation">
		<ArchText>
			Netra Uptime uses an in-process, thread-safe memory cache (cache.MemoryCache) implemented in
			Go with sync.RWMutex. It serves as both a high-throughput read-through cache for monitor
			lists, telemetry, and status pages, and an atomic sliding-window counter store for API key and
			auth rate limiting.
		</ArchText>
		<ArchList
			items={[
				'Cache-Aside Pattern: Read requests check cache.MemoryCache first; on a cache miss, the data is retrieved from PostgreSQL or SQLite, stored with a defined TTL, and returned.',
				'Targeted Invalidation: Any mutation (creating, editing, or deleting a monitor) writes to the persistent database first, then immediately evicts the affected keys and wildcard prefixes (e.g. DelByPrefix("monitors:overview:org:" + orgId)).',
				'Automatic Eviction: An active background goroutine executes every 60 seconds to purge expired entries and release memory without causing query latency spikes.',
				'Atomic Rate Limiting: The Incr method atomically increments integer counters and applies TTL expiry on the first request within a sliding window, enforcing limits with sub-millisecond execution.'
			]}
		/>
		<MermaidDiagram definition={cacheDiagram.definition} label={cacheDiagram.label} />
	</ArchSection>

	<ArchSection id="cache-keys" title="Cache &amp; Rate Limit Key Matrix">
		<ArchText>
			The following key patterns, expiration times, and invalidation triggers govern the internal
			in-memory cache:
		</ArchText>
		<DataTable table={cacheKeyMatrix} />
	</ArchSection>
</div>
