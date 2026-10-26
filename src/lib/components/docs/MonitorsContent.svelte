<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const headersCode = `{
  "Authorization": "Bearer your-token-here",
  "Content-Type": "application/json",
  "X-Custom-Header": "monitor-check"
}`;

	const tcpConfigCode = `// TCP Monitor Configuration
Host:     "db.example.com"
Port:     5432
Interval: 30 seconds
Timeout:  10 seconds`;

	const manualCheckCode = `curl -X POST \\
  http://localhost:27346/api/v1/organization/:orgId/monitors/:monitorId/check \\
  -H "Authorization: Bearer YOUR_TOKEN"`;
</script>

<div class="flex flex-col gap-12">
	<!-- Overview & Check Lifecycle -->
	<section id="mon-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Overview & Check Lifecycle</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime monitors work on a simple lifecycle: the <strong
				class="font-medium text-zinc-200">worker pool</strong
			> dispatches goroutines at configurable intervals to check each target. Results are evaluated, stored
			in PostgreSQL, and broadcast via WebSocket to all connected dashboards in real time. Supported check
			types include HTTP/HTTPS, TCP, ICMP Ping, SSL/TLS certificate expiry, and WHOIS domain expiration.
		</p>
	</section>

	<!-- HTTP / HTTPS Monitoring -->
	<section id="mon-http" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">HTTP / HTTPS Monitoring</h2>
		<p class="text-sm leading-7 text-zinc-400">
			HTTP monitors send requests to your endpoints at configurable intervals. They support custom
			headers, authentication tokens, expected status codes, and response time thresholds. Netra
			Uptime evaluates the response against your rules and triggers incidents when conditions are
			met.
		</p>

		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Parameter</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Type</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">url</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Full URL including protocol (<code class="font-mono text-xs text-zinc-300"
								>https://...</code
							>)</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">method</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">string</td>
						<td class="px-4 py-3 text-sm text-zinc-400">GET, POST, HEAD, PUT, DELETE</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">interval</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">integer</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Check interval in seconds (min: 10)</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">timeout</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">integer</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Request timeout in seconds (max: 60)</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">expected_status</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">integer</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Expected HTTP status code (default: 200)</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Custom Headers & Auth -->
	<section id="mon-http-headers" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">Custom Headers & Auth</h3>
		<p class="text-sm leading-7 text-zinc-400">
			Add custom headers to your HTTP monitors for authenticated endpoints. Common use cases include
			API key headers, Bearer tokens, and custom content-type headers.
		</p>
		<CodeBlock code={headersCode} language="json" id="headers" />
	</section>

	<!-- Status Codes & Payloads -->
	<section id="mon-http-status" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">Status Codes & Payloads</h3>
		<p class="text-sm leading-7 text-zinc-400">
			Configure expected status codes for your monitors. Netra Uptime marks the check as failed if
			the response status does not match your expectation. You can also send a request body for POST
			and PUT monitors.
		</p>
	</section>

	<!-- TCP Port Monitoring -->
	<section id="mon-tcp" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">TCP Port Monitoring</h2>
		<p class="text-sm leading-7 text-zinc-400">
			TCP monitors verify that specific ports on your servers are reachable and accepting
			connections:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Databases</strong> — PostgreSQL (5432), MySQL (3306),
				MongoDB (27017)
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Caches</strong> — Redis (6379), Memcached (11211)
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Mail Servers</strong> — SMTP (587/465), IMAP (993)
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Custom Daemons</strong> — Any service listening on a
				TCP port
			</li>
		</ul>
		<CodeBlock code={tcpConfigCode} language="text" id="tcp-config" />
	</section>

	<!-- ICMP Ping Checks -->
	<section id="mon-ping" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">ICMP Ping Checks</h2>
		<p class="text-sm leading-7 text-zinc-400">
			ICMP Ping monitors verify host availability by sending echo requests. They measure
			<strong class="font-medium text-zinc-200">round-trip latency</strong> and detect
			<strong class="font-medium text-zinc-200">network-level issues</strong> that may not be visible
			through HTTP or TCP checks.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			<strong class="font-medium text-zinc-200">Note:</strong> ICMP requires raw socket privileges.
			Ensure the Docker container runs with the
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>NET_RAW</code
			> capability.
		</p>
	</section>

	<!-- SSL / TLS Certificate Expiry -->
	<section id="mon-ssl" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">SSL / TLS Certificate Expiry</h2>
		<p class="text-sm leading-7 text-zinc-400">
			SSL monitors check the validity and expiration date of your SSL/TLS certificates. Netra Uptime
			alerts you before certificates expire, preventing outages caused by expired certificates.
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Alert Threshold</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Severity</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">30 days</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">Warning</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Certificate expires within 30 days</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">7 days</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">Critical</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Certificate expires within 7 days</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Expired</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">Critical</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Certificate has expired</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Domain Expiration (WHOIS) -->
	<section id="mon-domain" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Domain Expiration (WHOIS)</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Domain expiry monitors track WHOIS expiration dates and notify you in advance to prevent
			accidental domain loss. Netra Uptime queries WHOIS records every 24 hours (86,400 seconds) to
			determine the exact expiry date of your domains.
		</p>
	</section>

	<!-- Smart Incident Detection & 4-State Lifecycle -->
	<section id="mon-smart-detection" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Smart Incident Detection & Operational States
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime monitors inherit rules from an assigned <strong class="font-medium text-zinc-200"
				>Alert Template</strong
			> and evaluate targets through a 4-state finite state machine:
		</p>

		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-[#4edea3]">UP</strong> — All checks succeeded, latency is within
				normal thresholds, and HTTP status code matches expectation.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">DEGRADED</strong> — Target responded, but breached warning
				thresholds (for example, latency exceeds the warning limit for consecutive checks).
			</li>
			<li>
				<strong class="font-medium text-zinc-200">UNRESPONSIVE</strong> — Request timed out 3
				consecutive times (<code
					class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>ErrTimeout</code
				>). Generates a medium-severity incident.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">DOWN</strong> — Hard failure (<code
					class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>ECONNREFUSED</code
				>, DNS failure, 5xx server error) or consecutive critical breaches reached threshold.
			</li>
		</ul>

		<h3 class="mt-2 text-lg font-semibold tracking-tight text-zinc-200">
			Consecutive Breaches & Auto-Recovery
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			A monitor requires <strong class="font-medium text-zinc-200">3 consecutive failures</strong>
			(configurable from 1 to 20) before escalating to DOWN or UNRESPONSIVE, preventing transient network
			blips from triggering false alarms. Conversely, a
			<strong class="font-medium text-zinc-200">single successful check</strong> immediately resolves
			the incident, resets failure counters, and dispatches recovery notices across all channels.
		</p>
	</section>

	<!-- On-Demand Manual Checks -->
	<section id="mon-manual-check" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">On-Demand Manual Checks</h2>
		<p class="text-sm leading-7 text-zinc-400">
			After fixing a server issue, you do not have to wait for the next scheduled check. Trigger an
			immediate health check via the API or dashboard, and the result is broadcast in real time over
			WebSocket:
		</p>
		<CodeBlock code={manualCheckCode} language="bash" id="manual" />
	</section>
</div>
