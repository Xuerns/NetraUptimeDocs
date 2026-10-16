<script lang="ts">
	import { Bell, Mail, MessageSquare, Webhook, Check } from 'lucide-svelte';
	import CodeBlock from './CodeBlock.svelte';

	const sampleWebhookPayload = `{
  "event": "monitor.down",
  "monitor": {
    "id": "7b58c70e-1284-48f1-94be-b552fa0f9d41",
    "name": "Production API Gateway",
    "type": "http",
    "target": "https://api.yourdomain.com/healthz"
  },
  "incident_id": "c460d3d5-6677-4b19-9cf4-fa5f6176ea39",
  "severity": "critical",
  "status": "down",
  "message": "[Incident] Production API Gateway is DOWN: HTTP 502 Bad Gateway",
  "timestamp": "2026-10-04T12:00:00Z"
}`;
</script>

<div class="flex flex-col gap-16">
	<!-- Channels Overview -->
	<section id="nc-overview" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Channels Overview</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Netra Uptime provides a multi-channel alerting dispatcher. When a monitor transitions to <strong
				class="text-rose-400">DOWN</strong
			>
			or restores back to <strong class="text-[#4edea3]">UP</strong>, the worker pool simultaneously
			dispatches notifications across all active organization channels in non-blocking goroutines.
		</p>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<MessageSquare size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Discord</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Real-time rich embeds with colored status indicators directly into your channels.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Bell size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Slack</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Structured Block Kit cards with incident timestamps and direct resolution links.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Mail size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Email (SMTP)</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					HTML alerts routed directly to designated Person-in-Charge (PIC) responders.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Webhook size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Custom Webhooks</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					JSON payloads for automated remediation scripts, PagerDuty, or incident bots.
				</p>
			</div>
		</div>
	</section>

	<!-- Discord Webhook -->
	<section id="nc-discord" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Discord Webhook</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Discord webhooks format messages into Discord Rich Embeds with color-coded sidebars:
		</p>
		<ul class="flex max-w-3xl flex-col gap-3">
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">Outage Alerts</strong>: Red sidebar (hex
					<code>0xE74C3C</code>) displaying failure reason, target URL, and incident ID.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">Recovery Notifications</strong>: Emerald sidebar (hex
					<code>0x2ECC71</code>) reporting total downtime duration.</span
				>
			</li>
		</ul>
	</section>

	<!-- Slack Webhook -->
	<section id="nc-slack" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Slack Webhook</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Slack notifications use Slack Block Kit JSON objects to display structured key-value incident
			fields including organization, monitor criticality, and trigger timestamp formatted in UTC.
		</p>
	</section>

	<!-- Email via SMTP -->
	<section id="nc-email" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Email via SMTP</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Email notifications use STARTTLS or SSL authenticated SMTP delivery configured in your server
			environment. Messages are delivered to all subscribed team members and assigned
			Person-in-Charge engineers.
		</p>
	</section>

	<!-- Custom Webhooks -->
	<section id="nc-webhook" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Custom Webhooks</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			When an alert fires, Netra Uptime executes an HTTP POST request to your specified endpoint
			containing a structured JSON body:
		</p>
		<CodeBlock code={sampleWebhookPayload} language="json" id="webhook-sample" />
	</section>

	<!-- SSRF Security -->
	<section id="nc-ssrf" class="flex scroll-mt-24 flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">SSRF Security</h3>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			To prevent Server-Side Request Forgery (SSRF) attacks, Netra Uptime validates all webhook URLs
			during both creation and execution. The dispatcher rejects requests targeting internal
			infrastructure:
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Protected Range</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Blocked Addresses</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Protection Mechanism</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-5 py-3 text-[#e5e2e3]">Loopback</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">127.0.0.1, localhost, ::1</td>
						<td class="px-5 py-3 text-[#bbcabf]">Prevents attacks against local services on host</td
						>
					</tr>
					<tr>
						<td class="px-5 py-3 text-[#e5e2e3]">Private Subnets (RFC 1918)</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]"
							>10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16</td
						>
						<td class="px-5 py-3 text-[#bbcabf]"
							>Blocks probing internal LAN and internal database ports</td
						>
					</tr>
					<tr>
						<td class="px-5 py-3 text-[#e5e2e3]">Cloud Metadata</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">169.254.169.254</td>
						<td class="px-5 py-3 text-[#bbcabf]"
							>Blocks exfiltration of AWS / GCP instance IAM credentials</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</div>
