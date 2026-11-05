<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const sampleWebhookPayload = `{
  "event": "monitor.down",
  "monitor": {
    "id": "7b58c70e-1284-48f1-94be-b552fa0f9d41",
    "name": "Production API Gateway",
    "type": "http",
    "target": "https://api.yourdomain.com/healthz"
  },
  "incident": {
    "id": "c460d3d5-6677-4b19-9cf4-fa5f6176ea39",
    "status": "ongoing",
    "cause": "HTTP 502 Bad Gateway",
    "started_at": "2026-10-04T12:00:00Z"
  },
  "status": "down",
  "message": "[Incident] Production API Gateway is DOWN: HTTP 502 Bad Gateway",
  "timestamp": "2026-10-04T12:00:00Z"
}`;
</script>

<div class="flex flex-col gap-10">
	<section id="nc-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Channels Overview</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime provides a multi-channel alerting dispatcher. When a monitor transitions to a
			failing state or restores back to operational status, the worker pool simultaneously
			dispatches notifications across all active organization channels in non-blocking goroutines.
		</p>
		<p class="text-sm leading-7 text-zinc-400">
			Supported notification channels include Discord webhooks, Slack Block Kit webhooks, Email via
			SMTP, and custom HTTP POST webhooks for external automation or incident response systems.
		</p>
	</section>

	<section id="nc-discord" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Discord Webhook</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Discord webhooks format messages into structured Discord Rich Embeds. Outage alerts display
			the failure reason, target URL, and incident ID, while recovery notifications report the total
			downtime duration once the monitor recovers.
		</p>
	</section>

	<section id="nc-slack" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Slack Webhook</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Slack notifications use Slack Block Kit JSON objects to display structured key-value incident
			fields including organization, monitor criticality, and trigger timestamp formatted in UTC.
		</p>
	</section>

	<section id="nc-email" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Email via SMTP</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Email notifications use STARTTLS or SSL authenticated SMTP delivery configured in your server
			environment. Messages are delivered to all subscribed team members and assigned
			Person-in-Charge engineers.
		</p>
	</section>

	<section id="nc-webhook" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Custom Webhooks</h2>
		<p class="text-sm leading-7 text-zinc-400">
			When an alert fires, Netra Uptime executes an HTTP POST request to your specified endpoint
			containing a structured JSON payload:
		</p>
		<CodeBlock code={sampleWebhookPayload} language="json" id="webhook-sample" />
	</section>

	<section id="nc-ssrf" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-base font-medium tracking-tight text-zinc-200">SSRF Security</h3>
		<p class="text-sm leading-7 text-zinc-400">
			To prevent Server-Side Request Forgery (SSRF) attacks, Netra Uptime validates all webhook URLs
			during both creation and execution. The dispatcher rejects requests targeting internal
			infrastructure:
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-2.5 text-left font-mono text-xs font-medium text-zinc-300">
							Protected Range
						</th>
						<th class="px-4 py-2.5 text-left font-mono text-xs font-medium text-zinc-300">
							Blocked Addresses
						</th>
						<th class="px-4 py-2.5 text-left font-mono text-xs font-medium text-zinc-300">
							Protection Mechanism
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/80">
					<tr>
						<td class="px-4 py-2.5 text-zinc-200">Loopback</td>
						<td class="px-4 py-2.5 font-mono text-xs text-zinc-400">127.0.0.1, localhost, ::1</td>
						<td class="px-4 py-2.5 text-zinc-400">Prevents requests against local host services</td>
					</tr>
					<tr>
						<td class="px-4 py-2.5 text-zinc-200">Private Subnets (RFC 1918)</td>
						<td class="px-4 py-2.5 font-mono text-xs text-zinc-400">
							10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
						</td>
						<td class="px-4 py-2.5 text-zinc-400">
							Blocks probing internal LAN and internal database ports
						</td>
					</tr>
					<tr>
						<td class="px-4 py-2.5 text-zinc-200">Cloud Metadata</td>
						<td class="px-4 py-2.5 font-mono text-xs text-zinc-400">169.254.169.254</td>
						<td class="px-4 py-2.5 text-zinc-400">
							Blocks exfiltration of cloud instance IAM credentials
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</div>
