<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const smtpConfig = `SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=alerts@yourdomain.com
SMTP_PASSWORD=your_16_character_app_password`;
</script>

<div class="flex flex-col gap-12">
	<!-- SMTP Configuration -->
	<section id="email-config" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">SMTP Configuration</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime sends email notifications directly through your SMTP provider. Set your
			credentials in the <code
				class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">.env</code
			> file:
		</p>
		<CodeBlock code={smtpConfig} language="env" id="smtp-env" />
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Variable</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Default</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">SMTP_HOST</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">smtp.gmail.com</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Hostname of the outbound mail server</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">SMTP_PORT</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">587</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Port: 587 for STARTTLS or 465 for SSL/TLS</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">SMTP_EMAIL</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">-</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Sending address displayed in the From header</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">SMTP_PASSWORD</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-400">-</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Account password or dedicated App Password</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Gmail App Passwords -->
	<section id="email-gmail" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Gmail App Passwords</h2>
		<p class="text-sm leading-7 text-zinc-400">
			If using Google Workspace or Gmail as your SMTP relay, regular account passwords are not
			accepted. Generate a dedicated App Password:
		</p>
		<ol class="ml-5 flex list-decimal flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				Enable <strong class="font-medium text-zinc-200">2-Step Verification</strong> on your Google Account
				under the Security section.
			</li>
			<li>
				Navigate to <strong class="font-medium text-zinc-200"
					>Security &rarr; 2-Step Verification &rarr; App passwords</strong
				>.
			</li>
			<li>
				Enter an app name (such as <code
					class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>Netra Uptime</code
				>) and click <strong class="font-medium text-zinc-200">Create</strong>.
			</li>
			<li>
				Copy the 16-character generated password into
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>SMTP_PASSWORD</code
				> without spaces.
			</li>
		</ol>
	</section>

	<!-- Email Templates -->
	<section id="email-templates" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Email Templates</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime dispatches HTML email notifications for incident lifecycle events:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Incident Outage Notice</strong> — Delivered immediately
				when a monitor breaches alert rules. Includes HTTP status code or socket failure reason, check
				latency, timestamp, and incident dashboard link.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Service Restored Notice</strong> — Sent once the service
				passes health checks. Summarizes total incident duration and marks the incident resolved.
			</li>
		</ul>
	</section>
</div>
