<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const payloadJson = `{
  "event": "monitor.down",
  "monitor": "Production API",
  "target": "https://api.example.com/health",
  "status": "down",
  "message": "[Incident] Production API is DOWN: HTTP 502 Bad Gateway",
  "timestamp": "2026-09-30T12:00:00Z"
}`;
</script>

<div class="flex flex-col gap-12">
	<!-- Webhook Setup -->
	<section id="wh-setup" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Webhook Setup</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Custom webhooks let you integrate Netra Uptime alerts with any HTTP endpoint. Configure a
			webhook URL in your notification channels, and Netra Uptime will send a JSON POST request
			whenever an incident occurs or resolves.
		</p>
	</section>

	<!-- JSON Payload Schema -->
	<section id="wh-payload" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">JSON Payload Schema</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime sends the following JSON payload to your webhook URL:
		</p>
		<CodeBlock code={payloadJson} language="json" id="payload" />
	</section>

	<!-- Event Types -->
	<section id="wh-events" class="flex scroll-mt-24 flex-col gap-4">
		<h3 class="text-lg font-semibold tracking-tight text-zinc-200">Event Types</h3>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Event</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">monitor.down</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Monitor detected as down after consecutive failures</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">monitor.up</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Monitor recovered from a down state</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">monitor.degraded</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Performance degradation detected by alert rules</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- SSRF Protection -->
	<section id="wh-ssrf" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">SSRF Protection</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime validates all webhook URLs before saving or dispatching requests to prevent
			Server-Side Request Forgery (SSRF) attacks, automatically blocking:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				Loopback interfaces:
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>127.0.0.1</code
				>,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>localhost</code
				>,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">::1</code
				>
			</li>
			<li>
				Private RFC 1918 subnets:
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>10.0.0.0/8</code
				>,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>172.16.0.0/12</code
				>,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>192.168.0.0/16</code
				>
			</li>
			<li>
				Cloud instance metadata and link-local services:
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>169.254.169.254</code
				>
			</li>
			<li>
				Non-HTTP/HTTPS protocol schemes (<code
					class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">file://</code
				>,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>gopher://</code
				>,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
					>ftp://</code
				>)
			</li>
		</ul>
	</section>
</div>
