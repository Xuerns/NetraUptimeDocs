<script lang="ts">
	import { Copy, Check, AlertTriangle, ShieldAlert } from 'lucide-svelte';

	let copied = $state('');

	async function copyText(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copied = id;
		setTimeout(() => (copied = ''), 2000);
	}
</script>

<div class="flex flex-col gap-16">
	<!-- Webhook Setup -->
	<section id="wh-setup" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Webhook Setup</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Custom webhooks let you integrate PulseWatch alerts with any REST endpoint. Configure a webhook URL in your notification channels, and PulseWatch will send a JSON POST request whenever an incident occurs or resolves.
		</p>
	</section>

	<!-- JSON Payload Schema -->
	<section id="wh-payload" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">JSON Payload Schema</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			PulseWatch sends the following JSON payload to your webhook URL:
		</p>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="font-mono text-xs text-[#bbcabf]/60">json payload</div>
				<button onclick={() => copyText('{\n  "event": "monitor.down",\n  "monitor": "Production API",\n  "target": "https://api.example.com/health",\n  "status": "down",\n  "message": "[Incident] Production API is DOWN: HTTP 502 Bad Gateway",\n  "timestamp": "2026-09-30T12:00:00Z"\n}', 'payload')} class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]">
					{#if copied === 'payload'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'payload' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]">{"{"}{"\n"}  <span class="text-[#4edea3]">"event"</span>: <span class="text-amber-300">"monitor.down"</span>,{"\n"}  <span class="text-[#4edea3]">"monitor"</span>: <span class="text-amber-300">"Production API"</span>,{"\n"}  <span class="text-[#4edea3]">"target"</span>: <span class="text-amber-300">"https://api.example.com/health"</span>,{"\n"}  <span class="text-[#4edea3]">"status"</span>: <span class="text-amber-300">"down"</span>,{"\n"}  <span class="text-[#4edea3]">"message"</span>: <span class="text-amber-300">"[Incident] Production API is DOWN: HTTP 502 Bad Gateway"</span>,{"\n"}  <span class="text-[#4edea3]">"timestamp"</span>: <span class="text-amber-300">"2026-09-30T12:00:00Z"</span>{"\n"}{"}"}</pre>
		</div>
	</section>

	<!-- Event Types -->
	<section id="wh-events" class="flex flex-col gap-6">
		<h3 class="font-display text-2xl font-semibold tracking-tight text-[#e5e2e3]">Event Types</h3>
		<div class="overflow-hidden rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th class="px-6 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-[#4edea3]">Event</th>
						<th class="px-6 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-[#4edea3]">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr><td class="px-6 py-3 font-mono text-xs text-red-400">monitor.down</td><td class="px-6 py-3 text-[#bbcabf]">Monitor detected as down after consecutive failures</td></tr>
					<tr><td class="px-6 py-3 font-mono text-xs text-emerald-400">monitor.up</td><td class="px-6 py-3 text-[#bbcabf]">Monitor recovered from a down state</td></tr>
					<tr><td class="px-6 py-3 font-mono text-xs text-amber-300">monitor.degraded</td><td class="px-6 py-3 text-[#bbcabf]">Performance degradation detected (alert rules)</td></tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- SSRF Protection -->
	<section id="wh-ssrf" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">SSRF Protection</h2>
		<div class="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
			<p class="flex items-center gap-2 text-sm text-red-400">
				<ShieldAlert size={16} />
				<strong>Security:</strong> PulseWatch validates all webhook URLs to prevent Server-Side Request Forgery (SSRF) attacks.
			</p>
		</div>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			The following URL patterns are automatically blocked:
		</p>
		<ul class="ml-6 flex list-disc flex-col gap-2 text-sm text-[#bbcabf]">
			<li>Loopback addresses: <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">127.0.0.1</code>, <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">localhost</code></li>
			<li>AWS metadata endpoint: <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">169.254.169.254</code></li>
			<li>Private network ranges: <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">10.x.x.x</code>, <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">172.16.x.x</code>, <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">192.168.x.x</code></li>
			<li>IPv6 loopback: <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-red-400">::1</code></li>
		</ul>
	</section>
</div>
