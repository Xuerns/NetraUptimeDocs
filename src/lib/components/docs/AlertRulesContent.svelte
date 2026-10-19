<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const templateJson = `{
  "name": "Standard Web Service",
  "description": "Production alert thresholds for HTTP APIs",
  "is_default": true,
  "rules": [
    {
      "name": "High Response Latency",
      "metric": "response_time_ms",
      "operator": ">",
      "target_value": "1500",
      "consecutive": 3,
      "severity": "warning"
    },
    {
      "name": "Server 5xx Outage",
      "metric": "status_code",
      "operator": "in",
      "target_value": "500,502,503,504",
      "consecutive": 1,
      "severity": "critical"
    }
  ]
}`;
</script>

<div class="flex flex-col gap-12">
	<!-- Alert Rules Overview -->
	<section id="ar-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Template-First Alert Architecture
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime implements a <strong class="font-medium text-zinc-200">Template-First</strong>
			alert architecture. Instead of defining and maintaining duplicate rules across individual monitors,
			all alert rules are structured inside reusable
			<strong class="font-medium text-zinc-200">Alert Templates</strong> at the organization level. Monitors
			subscribe to a template and inherit all of its detection rules.
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Reusable Across Fleet</strong> — Modify a single template
				and all subscribed monitors inherit the changes immediately.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Auto-Seeded Defaults</strong> — New organizations automatically
				receive a pre-configured "Standard Web Service" template.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Zero-Config Fallback</strong> — Monitors without an
				assigned template automatically run on safe system defaults.
			</li>
		</ul>
	</section>

	<!-- Alert Templates & Auto-Seeding -->
	<section id="ar-templates" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Alert Templates & Auto-Seeding
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Organization administrators can create dedicated templates for different infrastructure tiers
			(such as critical payment gateways, internal microservices, or public marketing sites).
			Templates bundle multiple evaluation rules that test status codes, latency, and timeouts:
		</p>
		<CodeBlock code={templateJson} language="json" id="template-example" />
	</section>

	<!-- Metrics & Operators -->
	<section id="ar-metrics" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Metrics & Operators</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Each rule inside a template evaluates a <strong class="font-medium text-zinc-200"
				>metric</strong
			>
			with an <strong class="font-medium text-zinc-200">operator</strong> against a
			<strong class="font-medium text-zinc-200">target value</strong>.
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>status_code</code
				> — HTTP response status code.
			</li>
			<li>
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>response_time_ms</code
				> — Response latency in milliseconds.
			</li>
			<li>
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>timeout</code
				> — Connection or request deadline exceeded.
			</li>
		</ul>
		<p class="text-sm leading-7 text-zinc-400">
			Supported operators:
			{#each ['==', '!=', '>', '>=', '<', '<=', 'in', 'not_in'] as op, idx (op)}
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>{op}</code
				>{idx < 7 ? ', ' : '.'}
			{/each}
		</p>
	</section>

	<!-- Threshold Configuration -->
	<section id="ar-threshold" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">
			Threshold & Pattern Configuration
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			Target values can be numeric thresholds, comma-separated lists (for
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">in</code> /
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>not_in</code
			>), or wildcard patterns such as
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">5xx</code>
			and
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">4xx</code>.
		</p>
	</section>

	<!-- Timeout Differentiation -->
	<section id="ar-timeout" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Timeout vs Hard Failure</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime differentiates request <strong class="font-medium text-zinc-200">Timeouts</strong
			>
			from <strong class="font-medium text-zinc-200">Hard Failures</strong> to prevent false alarms during
			temporary latency spikes:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">UNRESPONSIVE (3x Consecutive Timeouts)</strong> —
				When a monitor hits 3 consecutive request timeouts (<code
					class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>ErrTimeout</code
				>), it transitions to <code class="font-mono text-xs text-zinc-200">UNRESPONSIVE</code> and opens
				a medium-severity incident.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">DOWN (Hard Outage / 5xx)</strong> — Hard
				connection errors (<code
					class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>ECONNREFUSED</code
				>, DNS failures) or 5xx server errors trigger the critical
				<code class="font-mono text-xs text-zinc-200">DOWN</code> state and dispatch urgent multi-channel
				notifications.
			</li>
		</ul>
	</section>

	<!-- Consecutive Failures -->
	<section id="ar-consecutive" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">
			Consecutive Breaches Threshold
		</h3>
		<p class="text-sm leading-7 text-zinc-400">
			The <code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>consecutive</code
			> field defines how many times a rule must be violated in a row before triggering an alert, eliminating
			false positives caused by transient network packet loss.
		</p>
	</section>

	<!-- Severity Levels -->
	<section id="ar-severity" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Severity Levels</h2>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Critical</strong> — Immediate attention required. Used
				for complete outages, service crashes, or critical rule breaches. Dispatches to all active notification
				channels.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Warning</strong> — Performance degradation or slow response
				times. Allows proactive engineering investigation before complete downtime occurs.
			</li>
		</ul>
	</section>

	<!-- Person-in-Charge -->
	<section id="ar-pic" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Person-in-Charge (PIC)</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Assign team members as Person-in-Charge for each monitor. PICs receive direct notifications
			when incidents occur, routing alerts based on service ownership. You can assign up to
			<strong class="font-medium text-zinc-200">10 PICs per monitor</strong> (configurable via
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>SELFHOSTED_MAX_PIC</code
			>).
		</p>
	</section>

	<!-- Incident Timeline -->
	<section id="ar-incident-timeline" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Incident Timeline & Auto-Recovery
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Every incident maintains an automatic chronological timeline that captures:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Detection timestamp</strong> — When the incident was
				first detected.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Notification log</strong> — Which channels and PICs
				were notified.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Status updates</strong> — Manual investigation notes
				added by team members.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Auto-Recovery</strong> — Once a single check succeeds,
				the incident is automatically closed and a resolution notification is dispatched.
			</li>
		</ul>
	</section>
</div>
