<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import DataTable from './DataTable.svelte';
	import Callout from './Callout.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { stateMachineDiagram } from '$lib/data/architecture-diagrams';
	import { defaultRulesMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="ae-state" title="Status State Machine">
		<ArchText>
			After each check completes, evaluator.go and pool.go process results through a 5-state finite
			state machine (UP, DEGRADED, UNRESPONSIVE, DOWN, and MAINTENANCE) governed by latency, HTTP status code,
			scheduled maintenance status, and socket failure conditions.
		</ArchText>
		<MermaidDiagram definition={stateMachineDiagram.definition} label={stateMachineDiagram.label} />
		<ArchList
			items={[
				'UP (Healthy): Check succeeded, latency is within normal thresholds, and status code matches expectation. Resets FailureCount and ConsecutiveTimeouts to 0, auto-resolves any open incidents, emails PICs, and emits monitor.up.',
				'DEGRADED (Warning): Target responded but breached a warning rule (such as elevated latency or unexpected non-critical status code). Resets FailureCount to 0 and dispatches monitor.degraded. Note that degraded checks with valid HTTP status codes (< 500) remain counted as available (UP) in SLA calculations.',
				'UNRESPONSIVE (Amber Warning): Target exceeded connection or read deadlines (ErrTimeout) for 3 consecutive checks. Opens a medium-severity incident and dispatches monitor.unresponsive.',
				'DOWN (Critical Outage): Target encountered a hard socket error (connection refused, DNS failure) or breached a critical rule for RequiredBreaches consecutive checks. Dispatches monitor.down.',
				'MAINTENANCE (Suppressed): Target is covered by an active scheduled maintenance window. Checks are marked with status \'maintenance\', alert rules are not breached, incidents are suppressed, notifications are muted, and checks are excluded from 90-day SLA calculations.'
			]}
		/>
	</ArchSection>

	<ArchSection id="ae-priority" title="Template-First & Evaluation Priority">
		<ArchText>Rules are resolved using a strict 3-tier hierarchy:</ArchText>
		<ArchList
			items={[
				'1. Alert Template: If monitor.AlertTemplateID is set, the evaluator runs all active rules from that template.',
				'2. Custom Monitor Rules: If no template is assigned but custom AlertRule rows exist, the evaluator executes those custom rules.',
				'3. System Default Fallback: If neither is assigned, the engine falls back to DefaultRuleSet(expectedStatusCode).',
				'Evaluation Order: Critical rules are evaluated first. If any critical rule breaches, warning evaluations are bypassed.',
				'Metric Types: status_code (exact, groups like 5xx, or lists like 500,502,503), response_time_ms (numeric comparison), and timeout (boolean check for socket deadlines).'
			]}
		/>
	</ArchSection>

	<ArchSection id="ae-timeout" title="Timeout vs Hard Crash (Amber State)">
		<ArchText>
			Transient latency spikes and dropped packets can cause individual requests to time out without
			signaling a true server crash. evaluator.go inspects errors with checker.IsTimeoutErr():
		</ArchText>
		<ArchList
			items={[
				'Transient Suppression: While ConsecutiveTimeouts < 3, the monitor maintains its previous status. No premature alerts are sent.',
				'Amber Escalation: When ConsecutiveTimeouts reaches 3, the monitor escalates to UNRESPONSIVE (Amber Warning) and opens an incident with medium severity.',
				'Hard Outage Separation: Sockets that return ECONNREFUSED or DNS failures reset ConsecutiveTimeouts to 0 and increment FailureCount directly toward DOWN.'
			]}
		/>
	</ArchSection>

	<ArchSection id="ae-fallback" title="Default Fallback Rules">
		<ArchText>
			Monitors running without an assigned template use the built-in system rules configured in
			DefaultRuleSet:
		</ArchText>
		<DataTable table={defaultRulesMatrix} />
		<Callout>
			When a new organization is created, Netra Uptime automatically seeds a pre-configured
			"Standard Web / API" template with 4 production rules (5xx Server Error critical after 2
			checks, Unexpected Status Code warning after 3 checks, High Latency &gt; 2000ms warning after
			3 checks, and Request Timeout critical after 2 checks).
		</Callout>
	</ArchSection>

	<ArchSection id="ae-consecutive" title="Consecutive Breaches Threshold">
		<ArchText>
			A monitor is never marked DOWN on an isolated blip. Every rule specifies a consecutive breach
			count (1 to 20):
		</ArchText>
		<ArchList
			items={[
				'Immediate Retry Gate: Prior to evaluating consecutive breaches, the worker automatically re-checks the target after a 2-second sleep delay if transient connection failures, timeouts, 5xx server crashes, or status mismatches occur, preventing isolated blips from incrementing failure counters.',
				'Consecutive Strikes: FailureCount increments only when the same critical condition persists across consecutive checks.',
				'Threshold Trigger: The state transitions to DOWN and fires alert dispatches only when FailureCount >= RequiredBreaches (default: 2, or the highest consecutive threshold among breached critical rules).',
				'Single Passing Recovery: A single successful check immediately resets FailureCount and ConsecutiveTimeouts to 0, transitions the monitor to UP, marks open incidents as resolved, and logs an auto-recovery note in the incident timeline.'
			]}
		/>
	</ArchSection>
</div>
