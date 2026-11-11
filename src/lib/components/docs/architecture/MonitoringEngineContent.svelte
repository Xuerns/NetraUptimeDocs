<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import DataTable from './DataTable.svelte';
	import Callout from './Callout.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { schedulerDiagram } from '$lib/data/architecture-diagrams';
	import { checkerMatrix, concurrencyMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="eng-scheduler" title="Scheduler">
		<ArchText>
			A ticker fires every 20 seconds, queries active monitors from the database, and enqueues every
			monitor whose configured interval has elapsed. A mutex-protected lastRun map prevents
			duplicate jobs from being queued.
		</ArchText>
		<MermaidDiagram definition={schedulerDiagram.definition} label={schedulerDiagram.label} />
	</ArchSection>

	<ArchSection id="eng-pool" title="Worker Pool">
		<ArchText>
			Ten worker goroutines read from a buffered channel with a capacity of 1000 jobs. Each worker
			applies the monitor timeout (clamped to a maximum of 30 seconds), runs the matching protocol
			checker, measures millisecond latency, executes immediate retries for transient failures,
			synchronizes scheduled maintenance status, evaluates alert rules, records checks, and
			broadcasts updates over WebSocket rooms.
		</ArchText>
		<ArchList
			items={[
				'Immediate Retry (2s Delay): If an initial check fails due to a transient connection error, timeout, 5xx server error, or status mismatch (shouldRetryCheck), the worker sleeps for 2 seconds and executes a 1x immediate retry before updating rule breach counts. Intentional SSRF rejections are excluded from retry.',
				"Maintenance Suppression: Before rule evaluation, syncAndCheckMaintenance automatically advances scheduled maintenance windows (scheduled -> in_progress -> completed). If a target is in active maintenance, check status is marked as 'maintenance', incident creation is suppressed, and alert notifications are muted."
			]}
		/>
		<Callout>
			A manual Check Now calls ProcessImmediate(monitorID), which bypasses the 20-second scheduler
			queue and executes the worker pipeline synchronously.
		</Callout>
	</ArchSection>

	<ArchSection id="eng-checkers" title="Checkers">
		<ArchText>
			Each monitor type delegates execution to a specialized protocol checker implementation in
			server/internal/worker/checker/:
		</ArchText>
		<ArchList
			items={[
				'CheckHTTPWithOptions: Executes HTTP checks with customizable methods (GET, POST, PUT, PATCH, HEAD), custom headers (CRLF-protected, max 25 headers / 4KB), and optional payload bodies (max 16KB). Uses official User-Agent: Netra-Uptime/1.0 via an isolated http.Client. Enforces anti-SSRF protections on every hop, follows up to 5 HTTP redirects, wraps deadline timeouts as ErrTimeout, and captures a sanitized 512-byte response snippet for error statuses (>= 400).',
				'CheckTCP: Establishes a raw TCP handshake via net.Dialer with timeout and SSRF socket validation, measuring connection establishment time before gracefully closing the socket.',
				'CheckPing: ICMP Echo request (native unprivileged socket on Linux/macOS and Win32 IcmpSendEcho via iphlpapi.dll on Windows) with automatic fallback to TCP reachability probe (ports 443/80) if ICMP sockets are unpermitted. Requires no root privileges and no Docker NET_RAW capability.'
			]}
		/>
		<DataTable table={checkerMatrix} />
		<Callout>
			Intranet & Private Network Monitoring: Set ALLOW_PRIVATE_NETWORK_MONITORING=true in .env to
			permit checkers to target loopback (127.0.0.1, localhost) and RFC 1918 private subnets
			(10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16). When false, the SSRF guard blocks all internal
			socket connections at the dialer layer.
		</Callout>
	</ArchSection>

	<ArchSection id="eng-concurrency" title="Concurrency Matrix">
		<ArchText>All goroutines that run concurrently inside the Netra Uptime runtime.</ArchText>
		<DataTable table={concurrencyMatrix} />
	</ArchSection>
</div>
