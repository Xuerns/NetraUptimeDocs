<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const sampleApiKeyRequest = `curl -X GET http://localhost:27346/api/v1/public/monitors \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"`;
</script>

<div class="flex flex-col gap-12">
	<!-- Organization Roles & Strict RBAC -->
	<section id="perm-roles" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Organization Roles & Strict RBAC
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime enforces strict multi-tenant Role-Based Access Control (RBAC) across three
			distinct team roles: <strong class="font-medium text-zinc-200">Owner</strong>,
			<strong class="font-medium text-zinc-200">Admin</strong>, and
			<strong class="font-medium text-zinc-200">Member</strong>.
		</p>

		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Owner</strong> — Full organization authority. Only the
				Owner can provision new monitors, transfer ownership, disband the organization, remove members,
				promote members to Admin, and invite new users with the Admin role.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Admin</strong> — Operational manager. Can configure
				and update existing monitors, manage alert templates, notification channels, and status pages.
				Cannot create new monitors (Owner only), invite Admins (Owner only), or promote members.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Member</strong> — Read-only stakeholder. Can inspect
				dashboards, view incident timeline notes, and observe monitors. Cannot modify configuration or
				invite users.
			</li>
		</ul>

		<!-- RBAC Comparison Table -->
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300"
							>Capability / Action</th
						>
						<th class="px-4 py-3 text-center font-mono text-xs font-medium text-zinc-300">Owner</th>
						<th class="px-4 py-3 text-center font-mono text-xs font-medium text-zinc-300">Admin</th>
						<th class="px-4 py-3 text-center font-mono text-xs font-medium text-zinc-300">Member</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">View Dashboard & Telemetry</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Create Monitors (POST /monitors)</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No (Owner only)</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Update / Delete Monitors</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200"
							>Manage Alert Templates, Status Pages & Channels</td
						>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Invite New Users as Member</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Invite New Users as Admin</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No (403)</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Promote Member to Admin</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Remove Members</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200">Transfer Ownership & Disband Org</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
						<td class="px-4 py-3 text-center text-zinc-500">No</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Permission Model -->
	<section id="perm-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">API Key Permission Model</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime provides scoped API keys for programmatic interactions without exposing session
			cookies. API keys authenticate requests to
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>/api/v1/public/*</code
			> endpoints and are hashed with SHA-256 before being stored in PostgreSQL or SQLite.
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">SHA-256 Hashed</strong> — Raw keys are displayed only
				once upon generation and never stored in plain text.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Scoped Access</strong> — Keys are restricted to either
				read-only inspection or write-level management control.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">In-Memory Rate Limited</strong> — A thread-safe sliding
				window counter enforces a limit of 60 requests per minute per active key.
			</li>
		</ul>
	</section>

	<!-- Read Scope -->
	<section id="perm-read" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Read Scope</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Keys configured with the
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">read</code
			> scope can inspect resources without modifying configuration:
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Resource</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Endpoints Allowed</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Access Type</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-zinc-200">Monitors</td>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]"
							>GET /public/monitors, GET /public/monitors/:id</td
						>
						<td class="px-4 py-3 text-sm text-zinc-400">Read-only list & status details</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-zinc-200">Incidents</td>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">GET /public/incidents</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Ongoing & past incident records (optional ?monitor_id=...)</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-zinc-200">Status Pages</td>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">GET /public/status-pages</td>
						<td class="px-4 py-3 text-sm text-zinc-400">Public status page definitions</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Write Scope -->
	<section id="perm-write" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Write Scope</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Keys granted the
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>write</code
			> scope inherit full read capabilities and can execute mutations:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Create & Provision Monitors</strong> —
				Programmatically create HTTP, TCP, and Ping monitors from CI/CD automation (<code
					class="font-mono text-xs text-[#4edea3]">POST /public/monitors</code
				>).
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Update & Pause/Resume Monitors</strong> — Modify
				monitor settings, thresholds, or toggle monitoring active state (<code
					class="font-mono text-xs text-[#4edea3]">PUT /public/monitors/:id</code
				>).
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Delete Monitors</strong> — Permanently remove
				monitors when infrastructure is decommissioned (<code
					class="font-mono text-xs text-[#4edea3]">DELETE /public/monitors/:id</code
				>).
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Publish Incident Updates</strong> — Add
				operational status notes directly into active incident timelines (<code
					class="font-mono text-xs text-[#4edea3]">POST /public/incidents</code
				>).
			</li>
		</ul>
	</section>

	<!-- Creating API Keys -->
	<section id="perm-create" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Creating API Keys</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Generate API keys from your organization settings dashboard:
		</p>
		<ol class="ml-5 flex list-decimal flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				Open your Netra Uptime organization and navigate to
				<strong class="font-medium text-zinc-200">Settings</strong> &rarr;
				<strong class="font-medium text-zinc-200">API Keys</strong>.
			</li>
			<li>
				Click <strong class="font-medium text-zinc-200">Create Key</strong>, provide a descriptive
				name (for example,
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>GitHub-Actions-CI</code
				>), and choose permissions.
			</li>
			<li>
				Optionally set an expiration date, then click
				<strong class="font-medium text-zinc-200">Generate</strong>.
			</li>
			<li>
				Copy your token immediately. It starts with the prefix
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>nuk_</code
				>.
			</li>
		</ol>
		<CodeBlock code={sampleApiKeyRequest} language="bash" id="curl-api-key" />
	</section>
</div>
