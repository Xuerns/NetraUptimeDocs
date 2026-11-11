<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const createMonitorJson = `{
  "name": "Production API Gateway",
  "type": "http",
  "target": "https://api.example.com/health",
  "interval_seconds": 60,
  "timeout_seconds": 10,
  "expectation_status_code": 200,
  "http_method": "GET",
  "http_headers": "{\\"Accept\\": \\"application/json\\"}",
  "criticality": "high",
  "assignees": [
    "4d8a2bf6-3fa7-4f4e-a128-48b4e6729581"
  ],
  "enable_ssl_domain_check": true,
  "alert_template_id": "7b2c8901-419b-4375-9b98-cd847926b1f2"
}`;

	const tcpConfigCode = `// TCP Port Check Target Format: host:port
Target:   "db.internal.net:5432"
Type:     "tcp"
Interval: 30 seconds
Timeout:  5 seconds`;

	const pingConfigCode = `// Ping Reachability Target Format: hostname or IP
Target:   "10.0.1.15" (or "edge-router.local")
Type:     "ping"
Interval: 30 seconds
Timeout:  5 seconds`;

	const fleetOverviewJson = `{
  "uptime": {
    "window_days": 30,
    "overall_pct": 99.98,
    "previous_window_pct": 99.92,
    "delta_pct": 0.06,
    "has_previous_window": true,
    "total_checks": 43200,
    "up_checks": 43191,
    "down_checks": 9
  },
  "latency": {
    "window_hours": 24,
    "avg_ms": 42.4,
    "median_ms": 38.0,
    "p95_ms": 86.2,
    "min_ms": 14.1,
    "max_ms": 340.5,
    "fastest_monitor": "US East Edge Gateway",
    "sample_count": 1440
  },
  "fleet": {
    "total": 12,
    "active": 11,
    "paused": 1,
    "up": 10,
    "down": 0,
    "degraded": 1,
    "unresponsive": 0,
    "min_interval_seconds": 30,
    "max_interval_seconds": 300
  },
  "ssl_dns": {
    "enabled_monitors": 9,
    "healthy_monitors": 8,
    "warning_monitors": 1,
    "expired_monitors": 0,
    "next_ssl_expiry": "2026-12-14T08:00:00Z",
    "next_domain_expiry": "2027-04-10T00:00:00Z"
  }
}`;

	const manualCheckCode = `curl -X POST \\
  http://localhost:27346/api/v1/organization/:orgId/monitors/:monitorId/check \\
  -H "Authorization: Bearer YOUR_TOKEN"`;
</script>

<div class="flex flex-col gap-12">
	<!-- Overview & Check Lifecycle -->
	<section id="mon-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Overview & Check Lifecycle</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime executes multi-protocol health checks using a concurrent <strong
				class="font-medium text-zinc-200">worker pool</strong
			> of 10 goroutines fed by a central scheduler. Every check result is stored in the database, evaluated
			against the monitor's assigned Alert Template, and immediately broadcast over WebSocket rooms to
			all active dashboard sessions.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			The system supports five monitoring vectors: HTTP/HTTPS endpoints, TCP port handshakes,
			unprivileged Ping reachability, TLS/SSL certificate lifecycle tracking, and RDAP/WHOIS domain
			expiration.
		</p>

		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Field</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Type</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Constraints</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">name</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-xs text-zinc-400">4–100 chars</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Descriptive human-readable monitor name.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">type</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-xs text-zinc-400">http, tcp, ping</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Protocol checker engine to execute.</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">target</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-xs text-zinc-400">4–100 chars</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>URL for HTTP (<code class="font-mono text-xs text-zinc-300">https://...</code>),
							<code class="font-mono text-xs text-zinc-300">host:port</code> for TCP, or hostname/IP for
							Ping.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">interval_seconds</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">integer</td>
						<td class="px-4 py-3 text-xs text-zinc-400">&ge; 30 (hard floor: 30s)</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Time between scheduled checks. Enforced by <code
								class="font-mono text-xs text-zinc-300">MIN_MONITOR_INTERVAL_SECONDS</code
							>.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">timeout_seconds</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">integer</td>
						<td class="px-4 py-3 text-xs text-zinc-400">1–30 seconds</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Socket read and connection deadline before failing with timeout.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">expectation_status_code</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">integer</td>
						<td class="px-4 py-3 text-xs text-zinc-400">HTTP status code</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Expected HTTP status code (default: 200). Triggers alert breach when mismatched.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">http_method</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-xs text-zinc-400">GET, POST, PUT, PATCH, HEAD</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>HTTP request method (default: GET). Custom methods for API health verification.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">http_headers</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string (JSON)</td>
						<td class="px-4 py-3 text-xs text-zinc-400">max 25 headers / 4096 bytes</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>JSON-encoded key-value object of custom request headers. Protected against CRLF
							injection and Host header overrides.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">http_body</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-xs text-zinc-400">max 16384 bytes</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Request body payload transmitted when issuing POST, PUT, or PATCH checks.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">criticality</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-xs text-zinc-400">extreme, high, medium, low</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Service priority tier. Drives dynamic incident severity weighting.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">assignees</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">uuid[]</td>
						<td class="px-4 py-3 text-xs text-zinc-400">1–50 items</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>User UUIDs assigned as Persons-in-Charge (PIC). Governed by <code
								class="font-mono text-xs text-zinc-300">MAX_ASSIGNEES_PER_MONITOR</code
							>
							(default: 50). Also accepts alias
							<code class="font-mono text-xs text-zinc-300">MonitorPICs</code>.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">enable_ssl_domain_check</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">boolean</td>
						<td class="px-4 py-3 text-xs text-zinc-400">true | false</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Enables daily background SSL certificate and RDAP/WHOIS domain tracking (HTTP only,
							default: true).</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">alert_template_id</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">uuid | null</td>
						<td class="px-4 py-3 text-xs text-zinc-400">optional UUID</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Reusable Alert Template ID. If omitted, falls back to safe system default rules.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">is_active</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">boolean</td>
						<td class="px-4 py-3 text-xs text-zinc-400">true | false</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Operational toggle. Set false to pause check scheduling without deleting
							configuration.</td
						>
					</tr>
				</tbody>
			</table>
		</div>

		<CodeBlock code={createMonitorJson} language="json" id="monitor-create-payload" />
	</section>

	<!-- Fleet Overview Telemetry -->
	<section id="mon-fleet-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Fleet Overview Telemetry</h2>
		<p class="text-sm leading-7 text-zinc-400">
			The organization overview endpoint (<code class="font-mono text-xs text-zinc-300"
				>GET /organization/:orgId/monitors/overview?window=30</code
			>) computes real-time operational telemetry across all active monitors in your organization
			over a configurable window (1 to 90 days, default 30).
		</p>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-5">
				<h3 class="font-mono text-xs font-semibold tracking-wider text-[#4edea3] uppercase">
					30-Day Uptime & Trend Delta
				</h3>
				<p class="mt-2 text-sm leading-6 text-zinc-400">
					Calculates overall uptime percentage across all checks within the window, and compares it
					against the preceding window of the same duration. The resulting <code
						class="font-mono text-xs text-zinc-300">delta_pct</code
					> provides immediate visibility into fleet availability trends.
				</p>
			</div>

			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-5">
				<h3 class="font-mono text-xs font-semibold tracking-wider text-[#4edea3] uppercase">
					24-Hour Latency Distribution
				</h3>
				<p class="mt-2 text-sm leading-6 text-zinc-400">
					Aggregates recent checks over the past 24 hours to report average, median (50th
					percentile), P95 (95th percentile), fastest (minimum), and peak (maximum) response
					latencies alongside the name of the top-performing endpoint.
				</p>
			</div>

			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-5">
				<h3 class="font-mono text-xs font-semibold tracking-wider text-[#4edea3] uppercase">
					Fleet Operational States
				</h3>
				<p class="mt-2 text-sm leading-6 text-zinc-400">
					Provides an instantaneous count of monitors in each operational state: <strong
						class="text-zinc-200">total</strong
					>, <strong class="text-[#4edea3]">up</strong>,
					<strong class="text-amber-300">degraded</strong>,
					<strong class="text-amber-400">unresponsive</strong>,
					<strong class="text-red-400">down</strong>, and
					<strong class="text-zinc-400">paused</strong>.
				</p>
			</div>

			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-5">
				<h3 class="font-mono text-xs font-semibold tracking-wider text-[#4edea3] uppercase">
					SSL & Domain Expiry Rollup
				</h3>
				<p class="mt-2 text-sm leading-6 text-zinc-400">
					Summarizes domain and certificate health across all HTTP monitors, reporting healthy
					counts, active warnings (&le; 30 days remaining), expired counts, and the exact timestamps
					of the next impending certificate and domain expirations.
				</p>
			</div>
		</div>

		<CodeBlock code={fleetOverviewJson} language="json" id="fleet-overview-json" />
	</section>

	<!-- HTTP / HTTPS Monitoring -->
	<section id="mon-http" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">HTTP / HTTPS Monitoring</h2>
		<p class="text-sm leading-7 text-zinc-400">
			HTTP monitors test web applications, microservices, and REST APIs. The Go worker issues
			requests with configurable HTTP methods (<code class="font-mono text-xs text-zinc-300"
				>GET</code
			>,
			<code class="font-mono text-xs text-zinc-300">POST</code>,
			<code class="font-mono text-xs text-zinc-300">PUT</code>,
			<code class="font-mono text-xs text-zinc-300">PATCH</code>, or
			<code class="font-mono text-xs text-zinc-300">HEAD</code>) using the official user agent
			<code class="font-mono text-xs text-zinc-300">User-Agent: Netra-Uptime/1.0</code>, follows up
			to 5 HTTP redirects, reads up to 4 KB of response content, and records total latency in
			milliseconds.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			Monitors support custom HTTP headers (JSON key-value map, up to 25 headers and 4 KB) protected
			against CRLF injection and host header spoofing, as well as request payloads (up to 16 KB) for
			testing mutation endpoints.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			When an HTTP check encounters an error or status code breach (&ge; 400), the worker
			automatically captures a sanitized <strong class="font-medium text-zinc-200"
				>response snippet</strong
			> (up to 512 bytes of printable UTF-8 text). This snippet is persisted with the check result and
			displayed on incident records to provide instant diagnostic context without storing sensitive binary
			blobs.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			Checks are executed via an isolated HTTP client equipped with an anti-SSRF dialer guard. By
			default, attempts to target loopback (<code class="font-mono text-xs text-zinc-300"
				>127.0.0.1</code
			>,
			<code class="font-mono text-xs text-zinc-300">localhost</code>), private RFC 1918 networks (<code
				class="font-mono text-xs text-zinc-300">10.0.0.0/8</code
			>,
			<code class="font-mono text-xs text-zinc-300">172.16.0.0/12</code>,
			<code class="font-mono text-xs text-zinc-300">192.168.0.0/16</code>), or cloud metadata
			endpoints (<code class="font-mono text-xs text-zinc-300">169.254.169.254</code>) are rejected
			at the socket level.
		</p>
		<div class="rounded-lg border border-zinc-800 bg-[#131315] p-4 text-sm leading-6 text-zinc-300">
			<strong class="font-medium text-zinc-100">Monitoring Internal Endpoints:</strong> If you run
			Netra Uptime inside a private network or homelab and want to monitor internal servers, set
			<code class="font-mono text-xs text-[#4edea3]">ALLOW_PRIVATE_NETWORK_MONITORING=true</code> in
			your
			<code class="font-mono text-xs text-zinc-200">.env</code> configuration file.
		</div>
	</section>

	<!-- Status Code Distribution & Daily Stats -->
	<section id="mon-http-status" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">
			Status Code Distribution & Daily Stats
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime aggregates every completed check into daily histogram buckets. Rather than merely
			recording a binary up/down status, the platform groups HTTP responses into five distinct
			telemetry counters:
		</p>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-5">
			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-3 text-center">
				<span class="font-mono text-xs font-semibold text-[#4edea3]">2xx Success</span>
				<p class="mt-1 text-xs text-zinc-400">Status codes 200–299</p>
			</div>
			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-3 text-center">
				<span class="font-mono text-xs font-semibold text-sky-400">3xx Redirect</span>
				<p class="mt-1 text-xs text-zinc-400">Status codes 300–399</p>
			</div>
			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-3 text-center">
				<span class="font-mono text-xs font-semibold text-amber-400">4xx Client Err</span>
				<p class="mt-1 text-xs text-zinc-400">Status codes 400–499</p>
			</div>
			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-3 text-center">
				<span class="font-mono text-xs font-semibold text-red-400">5xx Server Err</span>
				<p class="mt-1 text-xs text-zinc-400">Status codes 500–599</p>
			</div>
			<div class="rounded-lg border border-zinc-800 bg-[#131315] p-3 text-center">
				<span class="font-mono text-xs font-semibold text-zinc-400">Errors</span>
				<p class="mt-1 text-xs text-zinc-400">Timeouts, DNS, refusals</p>
			</div>
		</div>

		<p class="text-sm leading-7 text-zinc-400">
			The stats endpoint (<code class="font-mono text-xs text-zinc-300"
				>GET /organization/:orgId/monitors/:monitorId/stats?days=30</code
			>) merges long-term historical records from the
			<code class="font-mono text-xs text-zinc-300">monitor_daily_stats</code> table with live, unaggregated
			checks from the current UTC day. This delivers an uninterrupted uptime and latency timeline with
			zero reporting lag.
		</p>
	</section>

	<!-- TCP Port Monitoring -->
	<section id="mon-tcp" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">TCP Port Monitoring</h2>
		<p class="text-sm leading-7 text-zinc-400">
			TCP monitors perform a raw network socket handshake against a target <code
				class="font-mono text-xs text-zinc-300">host:port</code
			> to verify that infrastructure daemons are accepting inbound connections. The worker records socket
			establishment latency and verifies SSRF boundaries before dialing.
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Databases</strong> — PostgreSQL (5432), MySQL (3306),
				Redis (6379), MongoDB (27017)
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Email Transport</strong> — Outbound SMTP (587/465),
				IMAP (993)
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Infrastructure Daemons</strong> — SSH (22), DNS (53),
				gRPC services, and custom TCP listeners
			</li>
		</ul>
		<CodeBlock code={tcpConfigCode} language="text" id="tcp-config" />
	</section>

	<!-- Ping Reachability Checks -->
	<section id="mon-ping" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Ping Reachability Checks</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Ping monitors test network-level reachability and round-trip latency to a host without
			requiring an open HTTP port. Targets can be specified as a domain name or IP address; URL
			schemes and path segments are automatically trimmed.
		</p>
		<div class="rounded-lg border border-zinc-800 bg-[#131315] p-4 text-sm leading-6 text-zinc-300">
			<strong class="font-medium text-[#4edea3]"
				>Unprivileged User-Space ICMP & TCP Fallback:</strong
			>
			Netra Uptime sends real ICMP echo requests using unprivileged native ICMP sockets on Linux/macOS
			and Win32 <code class="font-mono text-xs text-zinc-200">IcmpSendEcho</code> (via
			<code class="font-mono text-xs text-zinc-200">iphlpapi.dll</code>) on Windows without
			requiring administrator privileges. If ICMP sockets are restricted (such as in unprivileged
			container environments), it automatically falls back to TCP socket reachability probes
			(probing port 443 or 80). It does
			<strong class="text-zinc-100">not</strong> require root privileges or the Docker
			<code class="font-mono text-xs text-zinc-200">NET_RAW</code> capability, enabling safe execution
			inside hardened non-root containers (UID 10001).
		</div>
		<CodeBlock code={pingConfigCode} language="text" id="ping-config" />
	</section>

	<!-- SSL / TLS Certificate Expiry -->
	<section id="mon-ssl" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">SSL / TLS Certificate Expiry</h2>
		<p class="text-sm leading-7 text-zinc-400">
			When <code class="font-mono text-xs text-zinc-300">enable_ssl_domain_check</code> is active on
			an HTTP monitor, Netra Uptime's dedicated SSL runner connects over TLS (port 443 or target
			custom port) every 24 hours, parses the leaf certificate's
			<code class="font-mono text-xs text-zinc-300">NotAfter</code> timestamp, and calculates the exact
			days remaining.
		</p>

		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Reminder Schedule</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Severity</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Recipients</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 text-sm font-medium text-zinc-200">30 days remaining</td>
						<td class="px-4 py-3 font-mono text-xs text-amber-400">Warning</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Monitor PICs</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Proactive renewal notice.</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm font-medium text-zinc-200">14 days remaining</td>
						<td class="px-4 py-3 font-mono text-xs text-amber-400">Warning</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Monitor PICs</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Second renewal reminder.</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm font-medium text-zinc-200">7 days remaining</td>
						<td class="px-4 py-3 font-mono text-xs text-red-400">Critical (Escalated)</td>
						<td class="px-4 py-3 text-sm text-zinc-300">Monitor PICs + Owners & Admins</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Urgent notice escalated to all organization administrators.</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm font-medium text-zinc-200">3 days remaining</td>
						<td class="px-4 py-3 font-mono text-xs text-red-400">Critical (Escalated)</td>
						<td class="px-4 py-3 text-sm text-zinc-300">Monitor PICs + Owners & Admins</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Final emergency escalation prior to expiration.</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Domain Expiration (RDAP & WHOIS) -->
	<section id="mon-domain" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Domain Expiration (RDAP & WHOIS)
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			To protect against domain hijackings and accidental registration lapses, Netra Uptime runs a
			daily domain expiration check. The runner extracts the registrable root domain using a
			multi-part TLD parser (supporting complex extensions such as <code
				class="font-mono text-xs text-zinc-300">.co.id</code
			>, <code class="font-mono text-xs text-zinc-300">.ac.id</code>,
			<code class="font-mono text-xs text-zinc-300">.co.uk</code>, and
			<code class="font-mono text-xs text-zinc-300">.com.au</code>).
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			The lookup uses a two-tier mechanism: querying the modern <strong
				class="font-medium text-zinc-200">RDAP JSON protocol</strong
			>
			first, and seamlessly falling back to raw
			<strong class="font-medium text-zinc-200">TCP port 43 WHOIS</strong> with an IANA referral resolver.
			A 500ms delay between targets prevents registry rate limiting.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			<strong class="font-medium text-zinc-200">Platform Whitelist Filtering:</strong> Shared PaaS
			subdomains (including <code class="font-mono text-xs text-zinc-300">vercel.app</code>,
			<code class="font-mono text-xs text-zinc-300">github.io</code>,
			<code class="font-mono text-xs text-zinc-300">pages.dev</code>,
			<code class="font-mono text-xs text-zinc-300">railway.app</code>,
			<code class="font-mono text-xs text-zinc-300">netlify.app</code>, and 16 other cloud
			providers) are automatically skipped to avoid spurious domain expiry alerts.
		</p>
	</section>

	<!-- Criticality & PIC Assignment -->
	<section id="mon-criticality-pic" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Criticality & PIC Assignment</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Every monitor is assigned a <strong class="font-medium text-zinc-200">Criticality tier</strong
			>
			(<code class="font-mono text-xs text-zinc-300">extreme</code>,
			<code class="font-mono text-xs text-zinc-300">high</code>,
			<code class="font-mono text-xs text-zinc-300">medium</code>, or
			<code class="font-mono text-xs text-zinc-300">low</code>). When an alert rule breaches, the
			engine combines the rule severity with the monitor criticality to calculate the final incident
			severity.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			Monitors also specify one or more <strong class="font-medium text-zinc-200"
				>Persons-in-Charge (PIC)</strong
			>
			using their organization user UUIDs. Up to
			<code class="font-mono text-xs text-[#4edea3]">MAX_ASSIGNEES_PER_MONITOR</code> (default: 10) PICs
			can be assigned. PICs receive immediate direct email alerts on incident trigger and incident resolution.
		</p>
	</section>

	<!-- Smart Incident Detection & 5-State Machine -->
	<section id="mon-smart-detection" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Smart Incident Detection & 5-State Machine
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime tracks each monitor through a strict 5-state finite state machine designed to
			eliminate transient alert noise and protect SLA accuracy:
		</p>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-lg border border-emerald-900/40 bg-[#131315] p-4">
				<span class="font-mono text-xs font-semibold tracking-wider text-[#4edea3] uppercase"
					>UP (Healthy)</span
				>
				<p class="mt-2 text-xs leading-6 text-zinc-400">
					All checks succeeded, latency is within normal parameters, and HTTP response code matches
					expectation. Resets failure and timeout counters to zero.
				</p>
			</div>

			<div class="rounded-lg border border-amber-900/40 bg-[#131315] p-4">
				<span class="font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase"
					>DEGRADED (Warning)</span
				>
				<p class="mt-2 text-xs leading-6 text-zinc-400">
					The target responded, but breached warning criteria (such as elevated latency exceeding
					warning thresholds for consecutive checks).
				</p>
			</div>

			<div class="rounded-lg border border-amber-900/40 bg-[#131315] p-4">
				<span class="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase"
					>UNRESPONSIVE (Amber Warning)</span
				>
				<p class="mt-2 text-xs leading-6 text-zinc-400">
					Three consecutive request timeouts (<code class="font-mono text-xs text-zinc-300"
						>ErrTimeout</code
					>). Generates a medium-severity incident without panicking on transient packet drops.
				</p>
			</div>

			<div class="rounded-lg border border-red-900/40 bg-[#131315] p-4">
				<span class="font-mono text-xs font-semibold tracking-wider text-red-400 uppercase"
					>DOWN (Hard Failure)</span
				>
				<p class="mt-2 text-xs leading-6 text-zinc-400">
					Hard connection failures (<code class="font-mono text-xs text-zinc-300">ECONNREFUSED</code
					>, DNS lookup failure), 5xx server crashes, or consecutive breaches reaching the critical
					threshold.
				</p>
			</div>

			<div
				class="rounded-lg border border-blue-900/40 bg-[#131315] p-4 sm:col-span-2 lg:col-span-1"
			>
				<span class="font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase"
					>MAINTENANCE (Suppressed)</span
				>
				<p class="mt-2 text-xs leading-6 text-zinc-400">
					Active during scheduled maintenance windows. Checks are recorded with status
					'maintenance', error alerts and incident generation are suppressed, and checks are
					excluded from 90-day SLA calculations.
				</p>
			</div>
		</div>

		<h3 class="mt-2 text-lg font-semibold tracking-tight text-zinc-200">
			Immediate Retry Mechanism (False-Positive Suppression)
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			To prevent false alarms caused by fleeting network blips, the worker pool executes an
			automatic
			<strong class="font-medium text-zinc-200">Immediate Retry</strong>. If the initial check fails
			due to a transient network error, timeout, 5xx server error, or HTTP status mismatch (SSRF
			denials are excluded from retry), the worker pauses for a 2-second sleep delay and retries the
			check once. Alert rules and consecutive failure counters are only updated if the second
			attempt also fails.
		</p>

		<h3 class="mt-2 text-lg font-semibold tracking-tight text-zinc-200">
			Uptime SLA Calculation vs Performance Degradation
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime strictly decouples availability SLA from latency degradation. A check marked as
			<code class="font-mono text-xs text-amber-300">degraded</code> due to high response time that
			nonetheless returned a valid HTTP status code (&lt; 500) is counted as an
			<strong class="font-medium text-zinc-200">up_check</strong>
			in uptime formulas. In contrast, request timeouts (status code 0) are categorized as
			<strong class="font-medium text-zinc-200">down_checks</strong>. Downtime duration is
			accurately measured from the exact timestamps between incident creation and resolution.
		</p>

		<h3 class="mt-2 text-lg font-semibold tracking-tight text-zinc-200">
			Consecutive Breaches & Auto-Recovery
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			A monitor requires consecutive rule violations before escalating to DOWN or UNRESPONSIVE. A
			single passing check immediately returns the monitor to <strong
				class="font-medium text-[#4edea3]">UP</strong
			>, auto-resolves any active incident, records a system timeline entry, and dispatches recovery
			notifications.
		</p>
	</section>

	<!-- On-Demand Manual Checks -->
	<section id="mon-manual-check" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">On-Demand Manual Checks</h2>
		<p class="text-sm leading-7 text-zinc-400">
			After deploying a fix or restarting infrastructure, you can trigger an immediate check without
			waiting for the scheduled interval. The API executes the check directly via <code
				class="font-mono text-xs text-zinc-300">workerPool.ProcessImmediate</code
			> and broadcasts results across WebSocket in real time:
		</p>
		<CodeBlock code={manualCheckCode} language="bash" id="manual-check-curl" />
		<p class="text-xs text-zinc-500">
			Manual checks are rate-limited to 10 requests per minute per monitor to prevent check queue
			flooding.
		</p>
	</section>
</div>
