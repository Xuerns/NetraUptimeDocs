<script lang="ts">
	import { Copy, Check, Terminal, AlertTriangle, Users } from 'lucide-svelte';

	let copied = $state('');

	async function copyText(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copied = id;
		setTimeout(() => (copied = ''), 2000);
	}
</script>

<div class="flex flex-col gap-16">
	<!-- Alert Rules Overview -->
	<section id="ar-overview" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Alert Rules Overview</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			The Alert Rules Engine allows you to define <strong class="text-[#e5e2e3]">custom evaluation rules</strong> against check results.
			Instead of only alerting when a monitor is fully DOWN, you can trigger alerts based on <strong class="text-[#e5e2e3]">high latency</strong>,
			<strong class="text-[#e5e2e3]">specific status codes</strong>, or <strong class="text-[#e5e2e3]">timeout events</strong> — giving you proactive visibility
			before a full outage occurs.
		</p>
	</section>

	<!-- Metrics & Operators -->
	<section id="ar-metrics" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Metrics & Operators</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Each alert rule evaluates a <strong class="text-[#e5e2e3]">metric</strong> with an <strong class="text-[#e5e2e3]">operator</strong> against a <strong class="text-[#e5e2e3]">target value</strong>.
		</p>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- Metrics -->
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<h4 class="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-[#4edea3]">Available Metrics</h4>
				<ul class="flex flex-col gap-3 text-sm">
					<li class="flex items-center gap-3">
						<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-[#4edea3]">status_code</code>
						<span class="text-[#bbcabf]">HTTP response status code</span>
					</li>
					<li class="flex items-center gap-3">
						<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-[#4edea3]">response_time_ms</code>
						<span class="text-[#bbcabf]">Response time in milliseconds</span>
					</li>
					<li class="flex items-center gap-3">
						<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-[#4edea3]">timeout</code>
						<span class="text-[#bbcabf]">Request timeout event</span>
					</li>
				</ul>
			</div>

			<!-- Operators -->
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<h4 class="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-[#4edea3]">Operators</h4>
				<div class="grid grid-cols-2 gap-2 text-sm">
					{#each ['==', '!=', '>', '>=', '<', '<=', 'in', 'not_in'] as op}
						<div class="flex items-center gap-2">
							<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-amber-300">{op}</code>
							<span class="text-[#bbcabf]">
								{op === '==' ? 'Equal' : op === '!=' ? 'Not equal' : op === '>' ? 'Greater than' : op === '>=' ? 'Greater or equal' : op === '<' ? 'Less than' : op === '<=' ? 'Less or equal' : op === 'in' ? 'In set' : 'Not in set'}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Threshold Configuration -->
	<section id="ar-threshold" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">Threshold Configuration</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Target values can be single values or comma-separated lists (for <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">in</code> / <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">not_in</code>).
			You can also use wildcard patterns like <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-amber-300">5xx</code> or <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-amber-300">4xx</code>.
		</p>

		<!-- Example: High Latency Rule -->
		<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<h5 class="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#4edea3]">Example: High Latency Alert</h5>
			<p class="mb-4 text-sm text-[#bbcabf]">Alert when response time exceeds 2000ms for 3 consecutive checks:</p>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="font-mono text-xs text-[#bbcabf]/60">json</div>
					<button onclick={() => copyText('{\n  "metric": "response_time_ms",\n  "operator": ">",\n  "target_value": "2000",\n  "consecutive": 3,\n  "severity": "warning"\n}', 'latency-rule')} class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]">
						{#if copied === 'latency-rule'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'latency-rule' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]">{"{"}{"\n"}  <span class="text-[#4edea3]">"metric"</span>: <span class="text-amber-300">"response_time_ms"</span>,{"\n"}  <span class="text-[#4edea3]">"operator"</span>: <span class="text-amber-300">">"</span>,{"\n"}  <span class="text-[#4edea3]">"target_value"</span>: <span class="text-amber-300">"2000"</span>,{"\n"}  <span class="text-[#4edea3]">"consecutive"</span>: <span class="text-[#4edea3]">3</span>,{"\n"}  <span class="text-[#4edea3]">"severity"</span>: <span class="text-amber-300">"warning"</span>{"\n"}{"}"}</pre>
			</div>
		</div>

		<!-- Example: Status Code Rule -->
		<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<h5 class="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#4edea3]">Example: Server Error Alert</h5>
			<p class="mb-4 text-sm text-[#bbcabf]">Alert immediately on any 5xx server error:</p>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="font-mono text-xs text-[#bbcabf]/60">json</div>
					<button onclick={() => copyText('{\n  "metric": "status_code",\n  "operator": "in",\n  "target_value": "500,502,503,504",\n  "consecutive": 1,\n  "severity": "critical"\n}', 'status-rule')} class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]">
						{#if copied === 'status-rule'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'status-rule' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]">{"{"}{"\n"}  <span class="text-[#4edea3]">"metric"</span>: <span class="text-amber-300">"status_code"</span>,{"\n"}  <span class="text-[#4edea3]">"operator"</span>: <span class="text-amber-300">"in"</span>,{"\n"}  <span class="text-[#4edea3]">"target_value"</span>: <span class="text-amber-300">"500,502,503,504"</span>,{"\n"}  <span class="text-[#4edea3]">"consecutive"</span>: <span class="text-[#4edea3]">1</span>,{"\n"}  <span class="text-[#4edea3]">"severity"</span>: <span class="text-amber-300">"critical"</span>{"\n"}{"}"}</pre>
			</div>
		</div>
	</section>

	<!-- Consecutive Failures -->
	<section id="ar-consecutive" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">Consecutive Failures</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			The <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">consecutive</code> field defines how many times the rule
			must be violated <strong class="text-[#e5e2e3]">in a row</strong> before triggering an alert. This prevents noisy alerts from transient spikes.
		</p>
	</section>

	<!-- Severity Levels -->
	<section id="ar-severity" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Severity Levels</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
				<div class="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-red-400">Critical</div>
				<p class="text-sm text-[#bbcabf]">
					Immediate attention required. Used for production outages, complete failures, or security issues. Triggers all notification channels.
				</p>
			</div>
			<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6">
				<div class="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">Warning</div>
				<p class="text-sm text-[#bbcabf]">
					Performance degradation detected. Used for high latency, slow responses, or approaching thresholds. Allows time for proactive fixes.
				</p>
			</div>
		</div>
	</section>

	<!-- Person-in-Charge -->
	<section id="ar-pic" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Person-in-Charge (PIC)</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Assign team members as Person-in-Charge for each monitor. PICs receive direct notifications when incidents occur.
			You can assign up to <strong class="text-[#e5e2e3]">10 PICs per monitor</strong> (configurable via <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">SELFHOSTED_MAX_PIC</code>).
		</p>
		<div class="flex items-center gap-4 rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<Users size={24} class="text-[#4edea3]" />
			<div>
				<h4 class="font-display text-base font-semibold text-[#e5e2e3]">Team Routing</h4>
				<p class="mt-1 text-sm text-[#bbcabf]">PulseWatch routes alerts to the right team members based on monitor ownership, ensuring fast response times.</p>
			</div>
		</div>
	</section>

	<!-- Incident Timeline -->
	<section id="ar-incident-timeline" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Incident Timeline & Notes</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Every incident includes an automatic, chronological timeline that captures:
		</p>
		<ul class="ml-6 flex list-disc flex-col gap-2 text-sm text-[#bbcabf]">
			<li><strong class="text-[#e5e2e3]">Detection timestamp</strong> — When the incident was first detected</li>
			<li><strong class="text-[#e5e2e3]">Notification log</strong> — Which channels and PICs were notified</li>
			<li><strong class="text-[#e5e2e3]">Status updates</strong> — Manual notes added by team members</li>
			<li><strong class="text-[#e5e2e3]">Resolution</strong> — Automatic recovery detection with timestamp</li>
		</ul>
	</section>
</div>
