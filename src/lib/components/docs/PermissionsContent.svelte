<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const sampleApiKeyRequest = `curl -X GET http://localhost:8080/api/v1/public/monitors \\
  -H "Authorization: Bearer pw_live_a1b2c3d4e5f6..."`;
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
				Owner can transfer ownership, disband the organization, remove members, promote members to Admin,
				and invite new users with the Admin role.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Admin</strong> — Operational manager. Can manage monitors,
				alert templates, notification channels, and status pages. Can only invite users as Member (cannot
				invite Admins or promote members).
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
						<td class="px-4 py-3 text-sm text-zinc-200">View Dashboard & Monitors</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
						<td class="px-4 py-3 text-center text-[#4edea3]">Yes</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-sm text-zinc-200"
							>Manage Monitors, Alert Templates & Channels</td
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
			> endpoints and are hashed with SHA-256 before being stored in PostgreSQL.
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">SHA-256 Hashed</strong> — Raw keys are displayed only
				once upon generation and never stored in plain text.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Scoped Access</strong> — Keys are restricted to either
				read-only inspection or write-level administrative control.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Redis Rate Limited</strong> — A sliding window counter
				enforces a limit of 60 requests per minute per active key.
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
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]"
							>GET /public/incidents, GET /public/incidents/:id</td
						>
						<td class="px-4 py-3 text-sm text-zinc-400">Ongoing & past incident records</td>
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
				<strong class="font-medium text-zinc-200">Create & Update Monitors</strong> — Programmatically
				provision or modify HTTP, TCP, and Ping monitors from CI/CD pipelines.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Trigger On-Demand Checks</strong> — Force instant health
				verification after a release without waiting for the next check interval.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Publish Incident Updates</strong> — Add operational
				status notes directly into active incident timelines.
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
					>pw_live_</code
				>.
			</li>
		</ol>
		<CodeBlock code={sampleApiKeyRequest} language="bash" id="curl-api-key" />
	</section>
</div>
