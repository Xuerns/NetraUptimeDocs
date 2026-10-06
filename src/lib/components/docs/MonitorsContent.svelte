<script lang="ts">
	import {
		Copy,
		Check,
		Terminal,
		Globe,
		Server,
		Wifi,
		ShieldCheck,
		CalendarClock,
		Zap,
		AlertTriangle
	} from 'lucide-svelte';

	let copied = $state('');

	async function copyText(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copied = id;
		setTimeout(() => (copied = ''), 2000);
	}
</script>

<div class="flex flex-col gap-16">
	<!-- Overview & Check Lifecycle -->
	<section id="mon-overview" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Overview & Check Lifecycle
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			PulseWatch monitors work on a simple lifecycle: the <strong class="text-[#e5e2e3]"
				>worker pool</strong
			> dispatches goroutines at configurable intervals to check each target. Results are evaluated, stored
			in PostgreSQL, and broadcast via WebSocket to all connected dashboards in real-time.
		</p>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
			{#each [{ icon: Globe, label: 'HTTP/S', color: 'text-blue-400' }, { icon: Server, label: 'TCP', color: 'text-purple-400' }, { icon: Wifi, label: 'Ping', color: 'text-yellow-400' }, { icon: ShieldCheck, label: 'SSL', color: 'text-emerald-400' }, { icon: CalendarClock, label: 'Domain', color: 'text-orange-400' }] as proto}
				<div
					class="flex flex-col items-center gap-2 rounded-lg border border-white/5 bg-[#1a1d1b] p-4"
				>
					<proto.icon size={24} class={proto.color} />
					<span class="font-mono text-xs font-medium text-[#e5e2e3]">{proto.label}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- HTTP / HTTPS Monitoring -->
	<section id="mon-http" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			HTTP / HTTPS Monitoring
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			HTTP monitors send requests to your endpoints at configurable intervals. They support custom
			headers, authentication tokens, expected status codes, and response time thresholds.
			PulseWatch evaluates the response against your rules and triggers incidents when conditions
			are met.
		</p>

		<div class="overflow-hidden rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Parameter</th
						>
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Type</th
						>
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr
						><td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]">url</td><td
							class="px-6 py-3 text-[#bbcabf]">string</td
						><td class="px-6 py-3 text-[#bbcabf]">Full URL including protocol (https://...)</td></tr
					>
					<tr
						><td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]">method</td><td
							class="px-6 py-3 text-[#bbcabf]">string</td
						><td class="px-6 py-3 text-[#bbcabf]">GET, POST, HEAD, PUT, DELETE</td></tr
					>
					<tr
						><td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]">interval</td><td
							class="px-6 py-3 text-[#bbcabf]">integer</td
						><td class="px-6 py-3 text-[#bbcabf]">Check interval in seconds (min: 10)</td></tr
					>
					<tr
						><td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]">timeout</td><td
							class="px-6 py-3 text-[#bbcabf]">integer</td
						><td class="px-6 py-3 text-[#bbcabf]">Request timeout in seconds (max: 60)</td></tr
					>
					<tr
						><td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]">expected_status</td><td
							class="px-6 py-3 text-[#bbcabf]">integer</td
						><td class="px-6 py-3 text-[#bbcabf]">Expected HTTP status code (default: 200)</td></tr
					>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Custom Headers & Auth -->
	<section id="mon-http-headers" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
			Custom Headers & Auth
		</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Add custom headers to your HTTP monitors for authenticated endpoints. Common use cases include
			API key headers, Bearer tokens, and custom content-type headers.
		</p>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">json</div>
				<button
					onclick={() =>
						copyText(
							'{\n  "Authorization": "Bearer your-token-here",\n  "Content-Type": "application/json",\n  "X-Custom-Header": "monitor-check"\n}',
							'headers'
						)}
					class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
				>
					{#if copied === 'headers'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'headers' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]">{'{'}{'\n'}  <span
					class="text-[#4edea3]">"Authorization"</span
				>: <span class="text-amber-300">"Bearer your-token-here"</span>,{'\n'}  <span
					class="text-[#4edea3]">"Content-Type"</span
				>: <span class="text-amber-300">"application/json"</span>,{'\n'}  <span
					class="text-[#4edea3]">"X-Custom-Header"</span
				>: <span class="text-amber-300">"monitor-check"</span>{'\n'}{'}'}</pre>
		</div>
	</section>

	<!-- Status Codes & Payloads -->
	<section id="mon-http-status" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
			Status Codes & Payloads
		</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Configure expected status codes for your monitors. PulseWatch will mark the check as failed if
			the response status doesn't match your expectation. You can also send a request body for
			POST/PUT monitors.
		</p>
	</section>

	<!-- TCP Port Monitoring -->
	<section id="mon-tcp" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			TCP Port Monitoring
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			TCP monitors verify that specific ports on your servers are reachable and accepting
			connections. Ideal for monitoring:
		</p>
		<ul class="ml-6 flex list-disc flex-col gap-2 text-sm text-[#bbcabf]">
			<li>
				<strong class="text-[#e5e2e3]">Databases</strong> — PostgreSQL (5432), MySQL (3306), MongoDB (27017)
			</li>
			<li><strong class="text-[#e5e2e3]">Caches</strong> — Redis (6379), Memcached (11211)</li>
			<li><strong class="text-[#e5e2e3]">Mail Servers</strong> — SMTP (587/465), IMAP (993)</li>
			<li>
				<strong class="text-[#e5e2e3]">Custom Daemons</strong> — Any service listening on a TCP port
			</li>
		</ul>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center border-b border-white/5 px-5 py-2.5">
				<div class="font-mono text-xs text-[#bbcabf]/60">example configuration</div>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
					class="text-[#86948a]">// TCP Monitor Configuration</span
				>
Host:     <span class="text-amber-300">"db.example.com"</span>
Port:     <span class="text-[#4edea3]">5432</span>
Interval: <span class="text-[#4edea3]">30</span> seconds
Timeout:  <span class="text-[#4edea3]">10</span> seconds</pre>
		</div>
	</section>

	<!-- ICMP Ping Checks -->
	<section id="mon-ping" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">ICMP Ping Checks</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			ICMP Ping monitors verify host availability by sending echo requests. They measure <strong
				class="text-[#e5e2e3]">round-trip latency</strong
			>
			and detect <strong class="text-[#e5e2e3]">network-level issues</strong> that may not be visible
			through HTTP or TCP checks.
		</p>
		<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
			<p class="flex items-center gap-2 text-sm text-amber-300">
				<AlertTriangle size={16} />
				<strong>Note:</strong> ICMP requires raw socket privileges. Ensure the Docker container runs
				with <code class="text-xs">NET_RAW</code> capability.
			</p>
		</div>
	</section>

	<!-- SSL / TLS Certificate Expiry -->
	<section id="mon-ssl" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			SSL / TLS Certificate Expiry
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			SSL monitors check the validity and expiration date of your SSL/TLS certificates. PulseWatch
			will alert you before certificates expire, preventing outages caused by expired certificates.
		</p>
		<div class="overflow-hidden rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Alert Threshold</th
						>
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Severity</th
						>
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr
						><td class="px-6 py-3 text-[#e5e2e3]">30 days</td><td class="px-6 py-3"
							><span class="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300"
								>Warning</span
							></td
						><td class="px-6 py-3 text-[#bbcabf]">Certificate expires within 30 days</td></tr
					>
					<tr
						><td class="px-6 py-3 text-[#e5e2e3]">7 days</td><td class="px-6 py-3"
							><span class="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400">Critical</span
							></td
						><td class="px-6 py-3 text-[#bbcabf]">Certificate expires within 7 days</td></tr
					>
					<tr
						><td class="px-6 py-3 text-[#e5e2e3]">Expired</td><td class="px-6 py-3"
							><span class="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400">Critical</span
							></td
						><td class="px-6 py-3 text-[#bbcabf]">Certificate has expired</td></tr
					>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Domain Expiration (WHOIS) -->
	<section id="mon-domain" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Domain Expiration (WHOIS)
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Domain expiry monitors track WHOIS expiration dates and notify you well in advance to prevent
			accidental domain loss. PulseWatch queries WHOIS records to determine the exact expiry date of
			your domains.
		</p>
		<div class="rounded-lg border border-[#4edea3]/20 bg-[#4edea3]/5 p-4">
			<p class="text-sm text-[#4edea3]">
				<strong>Tip:</strong> Set the check interval to 24 hours (86400 seconds) for domain expiry monitors
				— WHOIS data doesn't change frequently.
			</p>
		</div>
	</section>

	<!-- Smart Incident Detection -->
	<section id="mon-smart-detection" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Smart Incident Detection (3×/1×)
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			PulseWatch uses a state machine evaluation algorithm to prevent transient network blips and
			false alarms:
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
				<div class="mb-3 font-mono text-xs font-bold tracking-wider text-red-400 uppercase">
					Down Detection
				</div>
				<p class="text-2xl font-bold text-[#e5e2e3]">3× Consecutive (Default)</p>
				<p class="mt-2 text-sm text-[#bbcabf]">
					A monitor must fail <strong class="text-[#e5e2e3]">consecutive checks</strong> (default
					<code class="rounded bg-[#0e0e0f] px-1.5 py-0.5 font-mono text-xs text-red-400"
						>RequiredBreaches = 3</code
					>, configurable from 1 to 20) before transitioning from UP to DOWN and dispatching
					incident notifications.
				</p>
			</div>
			<div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
				<div class="mb-3 font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
					Up Recovery
				</div>
				<p class="text-2xl font-bold text-[#e5e2e3]">1× Success</p>
				<p class="mt-2 text-sm text-[#bbcabf]">
					A single successful check immediately resolves the incident, resets the consecutive breach
					counter, and sends recovery notifications across all channels.
				</p>
			</div>
		</div>
	</section>

	<!-- On-Demand Manual Checks -->
	<section id="mon-manual-check" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			On-Demand Manual Checks
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			After fixing a server issue, you don't have to wait for the next scheduled check. PulseWatch
			provides a manual trigger to force an immediate health check.
		</p>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="flex items-center gap-2 font-mono text-xs text-[#bbcabf]/60">
					<Terminal size={13} class="text-[#4edea3]/60" /> curl
				</div>
				<button
					onclick={() =>
						copyText(
							'curl -X POST \\\n  http://localhost:8080/api/v1/organization/:orgId/monitors/:monitorId/check \\\n  -H "Authorization: Bearer YOUR_TOKEN"',
							'manual'
						)}
					class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
				>
					{#if copied === 'manual'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'manual' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
					class="text-[#4edea3]">POST</span
				> /api/v1/organization/:orgId/monitors/:monitorId/check

<span class="text-[#86948a]"># Example with curl:</span>
<span class="text-[#4edea3]">$</span> curl -X POST \
    http://localhost:8080/api/v1/organization/:orgId/monitors/:monitorId/check \
    -H <span class="text-amber-300">"Authorization: Bearer YOUR_TOKEN"</span></pre>
		</div>
		<div class="rounded-lg border border-[#4edea3]/20 bg-[#4edea3]/5 p-4">
			<p class="flex items-center gap-2 text-sm text-[#4edea3]">
				<Zap size={16} />
				The check is dispatched immediately to the worker pool. Results appear in real-time on the dashboard
				via WebSocket.
			</p>
		</div>
	</section>
</div>
