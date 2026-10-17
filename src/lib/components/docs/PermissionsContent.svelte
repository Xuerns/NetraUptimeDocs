<script lang="ts">
	import {
		Key,
		Shield,
		Check,
		Lock,
		Users,
		Crown,
		ShieldAlert,
		ShieldCheck,
		UserCheck
	} from 'lucide-svelte';
	import CodeBlock from './CodeBlock.svelte';

	const sampleApiKeyRequest = `curl -X GET http://localhost:8080/api/v1/public/monitors \\
  -H "Authorization: Bearer pw_live_a1b2c3d4e5f6..."`;
</script>

<div class="flex flex-col gap-16">
	<!-- Organization Roles & Strict RBAC -->
	<section id="perm-roles" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Organization Roles & Strict RBAC
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Netra Uptime enforces strict multi-tenant Role-Based Access Control (RBAC) across three
			distinct team roles: <strong class="text-[#e5e2e3]">Owner</strong>,
			<strong class="text-[#e5e2e3]">Admin</strong>, and
			<strong class="text-[#e5e2e3]">Member</strong>.
		</p>

		<!-- Role Cards -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-5">
				<Crown size={22} class="mb-3 text-purple-400" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Owner</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Full organization authority. Only the Owner can transfer ownership, disband the org, kick
					members, promote members to Admin, and invite new users with the Admin role.
				</p>
			</div>

			<div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
				<ShieldCheck size={22} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Admin</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Operational manager. Can manage monitors, alert templates, notification channels, and
					status pages. <strong class="text-[#e5e2e3]">Can only invite users as Member</strong> (cannot
					invite Admins or promote members).
				</p>
			</div>

			<div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-5">
				<Users size={22} class="mb-3 text-blue-400" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Member</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Read-only stakeholder. Can inspect dashboards, view incident timeline notes, and observe
					public/internal monitors. Cannot modify configuration or invite users.
				</p>
			</div>
		</div>

		<!-- RBAC Comparison Table -->
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Capability / Action</th
						>
						<th
							class="px-5 py-3 text-center font-mono text-xs font-medium tracking-wider text-purple-400 uppercase"
							>Owner</th
						>
						<th
							class="px-5 py-3 text-center font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Admin</th
						>
						<th
							class="px-5 py-3 text-center font-mono text-xs font-medium tracking-wider text-blue-400 uppercase"
							>Member</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]">View Dashboard & Monitors</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
					</tr>
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]"
							>Manage Monitors, Alert Templates & Channels</td
						>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
					</tr>
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]">Invite New Users as Member</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
					</tr>
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]">
							Invite New Users as Admin <span class="text-amber-300">(Strict)</span>
						</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕ (403 Forbidden)</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
					</tr>
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]">
							Promote Member to Admin <span class="text-amber-300">(Strict)</span>
						</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
					</tr>
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]">Kick Members / Remove Access</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
					</tr>
					<tr>
						<td class="px-5 py-3 text-xs text-[#e5e2e3]">Transfer Ownership & Disband Org</td>
						<td class="px-5 py-3 text-center text-[#4edea3]">✓</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
						<td class="px-5 py-3 text-center text-red-400/50">✕</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Permission Model -->
	<section id="perm-overview" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			API Key Permission Model
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Netra Uptime provides scoped API keys for programmatic interactions without exposing session
			cookies. API keys are authenticated against <code class="font-mono text-xs text-[#4edea3]"
				>/api/v1/public/*</code
			> endpoints and hashed using SHA-256 before persisting to PostgreSQL.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Shield size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">SHA-256 Hashed</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Raw keys are displayed only once upon generation and never stored in plain text.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Lock size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Scoped Access</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Keys are restricted to either read-only inspection or write-level administrative control.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Key size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Redis Rate Limited</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Sliding counter enforces a limit of 60 requests per minute per active key.
				</p>
			</div>
		</div>
	</section>

	<!-- Read Scope -->
	<section id="perm-read" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Read Scope</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Keys configured with the <code
				class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">read</code
			> scope can inspect resources without modifying configuration:
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Resource</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Endpoints Allowed</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Access Type</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">Monitors</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]"
							>GET /public/monitors, GET /public/monitors/:id</td
						>
						<td class="px-5 py-3 text-[#bbcabf]">Read-only list & status details</td>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">Incidents</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]"
							>GET /public/incidents, GET /public/incidents/:id</td
						>
						<td class="px-5 py-3 text-[#bbcabf]">Ongoing & past incident records</td>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">Status Pages</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">GET /public/status-pages</td>
						<td class="px-5 py-3 text-[#bbcabf]">Public status page definitions</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Write Scope -->
	<section id="perm-write" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Write Scope</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Keys granted the <code
				class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">write</code
			> scope inherit full read capabilities and can execute mutations:
		</p>
		<ul class="flex max-w-3xl flex-col gap-3">
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">Create & Update Monitors</strong>: Programmatically spin
					up or modify HTTP, TCP, and Ping monitors from CI/CD pipelines.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">Trigger On-Demand Checks</strong>: Force instant health
					verification after a release without waiting for the next check interval.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">Publish Incident Updates</strong>: Add operational status
					notes directly into active incident timelines.</span
				>
			</li>
		</ul>
	</section>

	<!-- Creating API Keys -->
	<section id="perm-create" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Creating API Keys</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Generate API keys directly from your organization settings dashboard:
		</p>
		<ol class="flex max-w-3xl flex-col gap-2.5">
			<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1a1d1b] font-mono text-[10px] text-[#4edea3]"
					>1</span
				>
				<span
					>Open your Netra Uptime organization and navigate to <strong class="text-[#e5e2e3]"
						>Settings</strong
					>
					&rarr; <strong class="text-[#e5e2e3]">API Keys</strong>.</span
				>
			</li>
			<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1a1d1b] font-mono text-[10px] text-[#4edea3]"
					>2</span
				>
				<span
					>Click <strong class="text-[#e5e2e3]">Create Key</strong>, provide a descriptive name
					(e.g., <code class="font-mono text-[#4edea3]">GitHub-Actions-CI</code>), and choose
					permissions.</span
				>
			</li>
			<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1a1d1b] font-mono text-[10px] text-[#4edea3]"
					>3</span
				>
				<span
					>Optionally set an expiration date, then click <strong class="text-[#e5e2e3]"
						>Generate</strong
					>.</span
				>
			</li>
			<li class="flex items-start gap-2.5 text-xs text-[#bbcabf]">
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1a1d1b] font-mono text-[10px] text-[#4edea3]"
					>4</span
				>
				<span
					>Copy your token immediately. It starts with the prefix <code
						class="font-mono text-[#4edea3]">pw_live_</code
					>.</span
				>
			</li>
		</ol>
		<CodeBlock code={sampleApiKeyRequest} language="bash" id="curl-api-key" />
	</section>
</div>
