<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const smtpConfig = `SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=alerts@yourdomain.com
SMTP_PASSWORD=your_16_character_app_password`;
</script>

<div class="flex flex-col gap-16">
	<!-- SMTP Configuration -->
	<section id="email-config" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			SMTP Configuration
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Netra Uptime sends email notifications directly through your SMTP provider. Set your credentials
			in the <code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>.env</code
			> file:
		</p>
		<CodeBlock code={smtpConfig} language="env" id="smtp-env" />
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">SMTP_HOST</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">smtp.gmail.com</td>
						<td class="px-5 py-3 text-[#bbcabf]">Hostname of the outbound mail server</td>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">SMTP_PORT</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">587</td>
						<td class="px-5 py-3 text-[#bbcabf]">Port: 587 for STARTTLS or 465 for SSL/TLS</td>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">SMTP_EMAIL</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">-</td>
						<td class="px-5 py-3 text-[#bbcabf]">Sending address displayed in the From: header</td>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">SMTP_PASSWORD</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">-</td>
						<td class="px-5 py-3 text-[#bbcabf]">Account password or dedicated App Password</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Gmail App Passwords -->
	<section id="email-gmail" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Gmail App Passwords
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			If using Google Workspace or Gmail as your SMTP relay, regular account passwords are not
			accepted. You must generate a dedicated App Password:
		</p>
		<div class="flex max-w-3xl flex-col gap-4 rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<h3 class="font-display text-base font-semibold text-[#e5e2e3]">
				How to Generate a Google App Password
			</h3>
			<ul class="flex flex-col gap-2.5">
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>1</span
					>
					<span
						>Enable <strong class="text-[#e5e2e3]">2-Step Verification</strong> on your Google Account
						under the Security section.</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>2</span
					>
					<span
						>Navigate to <strong class="text-[#e5e2e3]"
							>Security &rarr; 2-Step Verification &rarr; App passwords</strong
						>.</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>3</span
					>
					<span
						>Enter an app name (such as <code class="font-mono text-xs text-[#4edea3]"
							>Netra Uptime</code
						>) and click <strong class="text-[#e5e2e3]">Create</strong>.</span
					>
				</li>
				<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e0e0f] font-mono text-[10px] text-[#4edea3]"
						>4</span
					>
					<span
						>Copy the 16-character generated password into <code
							class="font-mono text-xs text-[#4edea3]">SMTP_PASSWORD</code
						> without spaces.</span
					>
				</li>
			</ul>
		</div>
	</section>

	<!-- Email Templates -->
	<section id="email-templates" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Email Templates</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Netra Uptime sends responsive, clean HTML email templates styled with high-contrast status
			badges:
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<div class="mb-2 font-mono text-xs font-semibold text-rose-400">INCIDENT OUTAGE EMAIL</div>
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Outage Notice</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Delivered immediately when a monitor breaches alert rules. Includes exact HTTP status code
					or socket failure reason, check latency, timestamp, and one-click incident dashboard URL.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<div class="mb-2 font-mono text-xs font-semibold text-[#4edea3]">
					SERVICE RESTORED EMAIL
				</div>
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Recovery Notice</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Sent once the service passes health checks. Summarizes total incident duration and
					automatically marks the incident resolved.
				</p>
			</div>
		</div>
	</section>
</div>
