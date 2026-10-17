<script lang="ts">
	import { Copy, Check, Layers, Clock, Sparkles, Users } from 'lucide-svelte';

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
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Template-First Alert Architecture
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Netra Uptime implements a <strong class="text-[#e5e2e3]">Template-First</strong> alert
			architecture. Instead of defining and maintaining duplicate rules across individual monitors,
			all alert rules are structured inside reusable
			<strong class="text-[#e5e2e3]">Alert Templates</strong> at the organization level. Monitors then
			simply subscribe to a template, inheriting all its detection rules instantly.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Layers size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Reusable Across Fleet</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Modify a single template, and all 50+ subscribed monitors inherit the changes immediately.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Sparkles size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Auto-Seeded Defaults</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					New organizations automatically receive a pre-configured "Standard Web Service" template.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Clock size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Zero-Config Fallback</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Monitors without a template automatically run on safe 3-state system defaults.
				</p>
			</div>
		</div>
	</section>

	<!-- Alert Templates & Auto-Seeding -->
	<section id="ar-templates" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Alert Templates & Auto-Seeding
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Organization administrators can create dedicated templates for different infrastructure tiers
			(e.g., <em class="text-[#e5e2e3]">Critical Payment Gateways</em>,
			<em class="text-[#e5e2e3]">Internal Microservices</em>, or
			<em class="text-[#e5e2e3]">Public Marketing Sites</em>).
		</p>

		<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<h4 class="mb-3 font-mono text-xs font-bold tracking-wider text-[#4edea3] uppercase">
				Template Structure & API Definition
			</h4>
			<p class="mb-4 text-sm text-[#bbcabf]">
				Templates bundle multiple evaluation rules that test status codes, latency, and timeouts:
			</p>
			<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
				<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
					<div class="font-mono text-xs text-[#bbcabf]/60">json</div>
					<button
						onclick={() =>
							copyText(
								'{\n  "name": "Standard Web Service",\n  "description": "Production alert thresholds for HTTP APIs",\n  "is_default": true,\n  "rules": [\n    {\n      "name": "High Response Latency",\n      "metric": "response_time_ms",\n      "operator": ">",\n      "target_value": "1500",\n      "consecutive": 3,\n      "severity": "warning"\n    },\n    {\n      "name": "Server 5xx Outage",\n      "metric": "status_code",\n      "operator": "in",\n      "target_value": "500,502,503,504",\n      "consecutive": 1,\n      "severity": "critical"\n    }\n  ]\n}',
								'template-example'
							)}
						class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
					>
						{#if copied === 'template-example'}<Check size={12} />{:else}<Copy size={12} />{/if}
						{copied === 'template-example' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre
					class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]">{'{'}{'\n'}  <span
						class="text-[#4edea3]">"name"</span
					>: <span class="text-amber-300">"Standard Web Service"</span>,{'\n'}  <span
						class="text-[#4edea3]">"description"</span
					>: <span class="text-amber-300">"Production alert thresholds for HTTP APIs"</span
					>,{'\n'}  <span class="text-[#4edea3]">"is_default"</span>: <span class="text-purple-400"
						>true</span
					>,{'\n'}  <span class="text-[#4edea3]">"rules"</span>: [{'{'}{'\n'}    <span
						class="text-[#4edea3]">"name"</span
					>: <span class="text-amber-300">"High Response Latency"</span>,{'\n'}    <span
						class="text-[#4edea3]">"metric"</span
					>: <span class="text-amber-300">"response_time_ms"</span>,{'\n'}    <span
						class="text-[#4edea3]">"operator"</span
					>: <span class="text-amber-300">">"</span>,{'\n'}    <span class="text-[#4edea3]"
						>"target_value"</span
					>: <span class="text-amber-300">"1500"</span>,{'\n'}    <span class="text-[#4edea3]"
						>"consecutive"</span
					>: <span class="text-purple-400">3</span>,{'\n'}    <span class="text-[#4edea3]"
						>"severity"</span
					>: <span class="text-amber-300">"warning"</span>{'\n'}  {'}'},{'{'}{'\n'}    <span
						class="text-[#4edea3]">"name"</span
					>: <span class="text-amber-300">"Server 5xx Outage"</span>,{'\n'}    <span
						class="text-[#4edea3]">"metric"</span
					>: <span class="text-amber-300">"status_code"</span>,{'\n'}    <span
						class="text-[#4edea3]">"operator"</span
					>: <span class="text-amber-300">"in"</span>,{'\n'}    <span class="text-[#4edea3]"
						>"target_value"</span
					>: <span class="text-amber-300">"500,502,503,504"</span>,{'\n'}    <span
						class="text-[#4edea3]">"consecutive"</span
					>: <span class="text-purple-400">1</span>,{'\n'}    <span class="text-[#4edea3]"
						>"severity"</span
					>: <span class="text-amber-300">"critical"</span>{'\n'}  {'}'}]{'\n'}{'}'}</pre>
			</div>
		</div>
	</section>

	<!-- Metrics & Operators -->
	<section id="ar-metrics" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Metrics & Operators
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Each rule inside a template evaluates a <strong class="text-[#e5e2e3]">metric</strong> with an
			<strong class="text-[#e5e2e3]">operator</strong>
			against a <strong class="text-[#e5e2e3]">target value</strong>.
		</p>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- Metrics -->
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<h4 class="mb-4 font-mono text-xs font-bold tracking-wider text-[#4edea3] uppercase">
					Available Metrics
				</h4>
				<ul class="flex flex-col gap-3 text-sm">
					<li class="flex items-center gap-3">
						<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-[#4edea3]">status_code</code>
						<span class="text-[#bbcabf]">HTTP response status code</span>
					</li>
					<li class="flex items-center gap-3">
						<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-[#4edea3]"
							>response_time_ms</code
						>
						<span class="text-[#bbcabf]">Response latency in milliseconds</span>
					</li>
					<li class="flex items-center gap-3">
						<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-[#4edea3]">timeout</code>
						<span class="text-[#bbcabf]">Connection / request deadline exceeded</span>
					</li>
				</ul>
			</div>

			<!-- Operators -->
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<h4 class="mb-4 font-mono text-xs font-bold tracking-wider text-[#4edea3] uppercase">
					Operators
				</h4>
				<div class="grid grid-cols-2 gap-2 text-sm">
					{#each ['==', '!=', '>', '>=', '<', '<=', 'in', 'not_in'] as op}
						<div class="flex items-center gap-2">
							<code class="rounded bg-[#0e0e0f] px-2 py-1 text-xs text-amber-300">{op}</code>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Threshold Configuration -->
	<section id="ar-threshold" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
			Threshold & Pattern Configuration
		</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Target values can be numeric thresholds, comma-separated lists (e.g. for <code
				class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">in</code
			>
			/
			<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">not_in</code
			>), or wildcard patterns like
			<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-amber-300">5xx</code>
			and
			<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-amber-300">4xx</code>.
		</p>
	</section>

	<!-- Timeout Differentiation & Amber Unresponsive State -->
	<section id="ar-timeout" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Timeout vs Hard Crash: Amber Unresponsive State
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			A common issue in monitoring tools is false alarm panic when a service experiences a temporary
			latency surge or slow query that hits a client timeout. Netra Uptime specifically
			differentiates
			<strong class="text-[#e5e2e3]">Timeouts</strong> from
			<strong class="text-[#e5e2e3]">Hard Failures</strong>:
		</p>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- Amber State -->
			<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6">
				<div class="flex items-center gap-2">
					<span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
					<span class="font-mono text-xs font-bold tracking-wider text-amber-300 uppercase"
						>UNRESPONSIVE (Amber Warning)</span
					>
				</div>
				<h4 class="mt-3 font-display text-base font-semibold text-[#e5e2e3]">
					3× Consecutive Timeouts
				</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					When a monitor hits 3 consecutive request timeouts (<code class="font-mono text-amber-300"
						>ErrTimeout</code
					>), it transitions to <strong class="text-amber-300">UNRESPONSIVE</strong>. An incident is
					created with <strong class="text-amber-300">Medium severity</strong> and calm messaging:
					<em>"Target server taking unusually long to respond, but may not be completely down."</em>
				</p>
			</div>

			<!-- Down State -->
			<div class="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
				<div class="flex items-center gap-2">
					<span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
					<span class="font-mono text-xs font-bold tracking-wider text-red-400 uppercase"
						>DOWN (Critical Failure)</span
					>
				</div>
				<h4 class="mt-3 font-display text-base font-semibold text-[#e5e2e3]">Hard Outage / 5xx</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Hard connection crashes (<code class="font-mono text-red-400">ECONNREFUSED</code>, DNS
					failures) or 5xx server errors trigger the critical
					<strong class="text-red-400">DOWN</strong> state. Dispatches urgent multi-channel notifications
					to on-call responders and PICs.
				</p>
			</div>
		</div>
	</section>

	<!-- Consecutive Failures -->
	<section id="ar-consecutive" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">
			Consecutive Breaches Threshold
		</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			The <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>consecutive</code
			>
			field defines how many times the rule must be violated
			<strong class="text-[#e5e2e3]">in a row</strong> before triggering an alert. This removes false
			positives caused by transient internet packet glitches.
		</p>
	</section>

	<!-- Severity Levels -->
	<section id="ar-severity" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Severity Levels</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
				<div class="mb-2 font-mono text-xs font-bold tracking-wider text-red-400 uppercase">
					Critical
				</div>
				<p class="text-sm text-[#bbcabf]">
					Immediate attention required. Used for complete outages, service crashes, or critical rule
					breaches. Dispatches to all active notification channels.
				</p>
			</div>
			<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6">
				<div class="mb-2 font-mono text-xs font-bold tracking-wider text-amber-300 uppercase">
					Warning
				</div>
				<p class="text-sm text-[#bbcabf]">
					Performance degradation or slow response times. Used for high latency or unresponsive
					warnings. Allows proactive engineering investigation before complete downtime.
				</p>
			</div>
		</div>
	</section>

	<!-- Person-in-Charge -->
	<section id="ar-pic" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Person-in-Charge (PIC)
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Assign team members as Person-in-Charge for each monitor. PICs receive direct notifications
			when incidents occur. You can assign up to <strong class="text-[#e5e2e3]"
				>10 PICs per monitor</strong
			>
			(configurable via
			<code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>SELFHOSTED_MAX_PIC</code
			>).
		</p>
		<div class="flex items-center gap-4 rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<Users size={24} class="text-[#4edea3]" />
			<div>
				<h4 class="font-display text-base font-semibold text-[#e5e2e3]">Team Routing</h4>
				<p class="mt-1 text-sm text-[#bbcabf]">
					Netra Uptime routes alerts to the right team members based on monitor ownership, ensuring
					fast response times.
				</p>
			</div>
		</div>
	</section>

	<!-- Incident Timeline -->
	<section id="ar-incident-timeline" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Incident Timeline & Auto-Recovery
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Every incident includes an automatic, chronological timeline that captures:
		</p>
		<ul class="ml-6 flex list-disc flex-col gap-2 text-sm text-[#bbcabf]">
			<li>
				<strong class="text-[#e5e2e3]">Detection timestamp</strong> — When the incident was first detected
			</li>
			<li>
				<strong class="text-[#e5e2e3]">Notification log</strong> — Which channels and PICs were notified
			</li>
			<li>
				<strong class="text-[#e5e2e3]">Status updates</strong> — Manual investigation notes added by team
				members
			</li>
			<li>
				<strong class="text-[#e5e2e3]">Auto-Recovery</strong> — Once a single check succeeds, the incident
				is automatically closed and resolved notification dispatched
			</li>
		</ul>
	</section>
</div>
