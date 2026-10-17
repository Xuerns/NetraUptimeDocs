<script lang="ts">
	import { Copy, Check, Globe, Layers, CalendarClock, BadgeCheck, FileJson } from 'lucide-svelte';

	let copied = $state('');

	async function copyText(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copied = id;
		setTimeout(() => (copied = ''), 2000);
	}
</script>

<div class="flex flex-col gap-16">
	<!-- Creating Status Pages -->
	<section id="sp-overview" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Creating Public Status Pages
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Status pages give your users a transparent view of your service health. Each status page shows
			real-time monitor status, 90-day uptime history, and incident timelines — all without
			requiring authentication.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<Globe size={20} class="mb-3 text-[#4edea3]" />
				<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">Public Access</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					No authentication needed. Share the URL with anyone.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<Layers size={20} class="mb-3 text-[#4edea3]" />
				<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">Component Groups</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Organize monitors into logical service groups.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
				<CalendarClock size={20} class="mb-3 text-[#4edea3]" />
				<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">Maintenance Windows</h4>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Schedule maintenance to suppress false alarms.
				</p>
			</div>
		</div>
	</section>

	<!-- Custom Subdomains -->
	<section id="sp-subdomain" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Custom Subdomains & Branding
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Each status page gets a unique subdomain slug. Your status page will be accessible at:
		</p>
		<div class="rounded-lg border border-white/5 bg-[#0e0e0f] p-5 font-mono text-sm text-[#bbcabf]">
			<span class="text-[#86948a]">https://</span><span class="text-[#4edea3]">your-subdomain</span
			><span class="text-[#86948a]">.yourdomain.com/status</span>
		</div>
		<p class="text-sm leading-relaxed text-[#bbcabf]">
			Customize the page with your organization name, logo, and brand colors to match your identity.
		</p>
	</section>

	<!-- Component Groups -->
	<section id="sp-component-groups" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Component Groups</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Organize your monitors into logical groups for a cleaner status page. For example:
		</p>
		<div class="flex flex-col gap-3">
			{#each [{ name: 'Frontend Services', items: ['Main Website', 'CDN', 'Static Assets'] }, { name: 'Core API', items: ['REST API', 'GraphQL', 'WebSocket'] }, { name: 'Database Clusters', items: ['PostgreSQL Primary', 'Read Replicas', 'Redis Cache'] }] as group}
				<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
					<div class="mb-3 flex items-center gap-2">
						<Layers size={14} class="text-[#4edea3]" />
						<h4 class="font-display text-sm font-semibold text-[#e5e2e3]">{group.name}</h4>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each group.items as item}
							<span class="rounded bg-[#0e0e0f] px-3 py-1 text-xs text-[#bbcabf]">{item}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Scheduled Maintenance -->
	<section id="sp-maintenance" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Scheduled Maintenance Windows
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Schedule maintenance windows to prevent false alarms during planned downtime. Maintenance
			windows progress through three lifecycle stages: <code
				class="rounded bg-[#0e0e0f] px-1.5 py-0.5 font-mono text-xs text-amber-300">scheduled</code
			>,
			<code class="rounded bg-[#0e0e0f] px-1.5 py-0.5 font-mono text-xs text-blue-400"
				>in_progress</code
			>, and
			<code class="rounded bg-[#0e0e0f] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>completed</code
			>.
		</p>
		<ul class="ml-6 flex list-disc flex-col gap-2 text-sm text-[#bbcabf]">
			<li>
				When active (<code class="font-mono text-xs text-blue-400">in_progress</code>), monitor
				checks continue in the background but
				<strong class="text-[#e5e2e3]">suppress incident notifications</strong>.
			</li>
			<li>
				The public status page displays an active <strong class="text-[#e5e2e3]"
					>"Scheduled Maintenance in Progress"</strong
				> alert banner with start and end times.
			</li>
			<li>
				After the window reaches <code class="font-mono text-xs text-[#4edea3]">completed</code>,
				normal breach alerting and status reporting resume automatically.
			</li>
		</ul>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="font-mono text-xs text-[#bbcabf]/60">json payload</div>
				<button
					onclick={() =>
						copyText(
							'{\n  "title": "Database Migration",\n  "description": "Upgrading PostgreSQL to v16.2",\n  "start_time": "2026-10-01T02:00:00Z",\n  "end_time": "2026-10-01T04:00:00Z",\n  "monitors": ["monitor-id-1", "monitor-id-2"]\n}',
							'maintenance'
						)}
					class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
				>
					{#if copied === 'maintenance'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'maintenance' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]">{'{'}{'\n'}  <span
					class="text-[#4edea3]">"title"</span
				>: <span class="text-amber-300">"Database Migration"</span>,{'\n'}  <span
					class="text-[#4edea3]">"description"</span
				>: <span class="text-amber-300">"Upgrading PostgreSQL to v16.2"</span>,{'\n'}  <span
					class="text-[#4edea3]">"start_time"</span
				>: <span class="text-amber-300">"2026-10-01T02:00:00Z"</span>,{'\n'}  <span
					class="text-[#4edea3]">"end_time"</span
				>: <span class="text-amber-300">"2026-10-01T04:00:00Z"</span>,{'\n'}  <span
					class="text-[#4edea3]">"monitors"</span
				>: [<span class="text-amber-300">"monitor-id-1"</span>, <span class="text-amber-300"
					>"monitor-id-2"</span
				>]{'\n'}{'}'}</pre>
		</div>
	</section>

	<!-- GitHub Badges -->
	<section id="sp-badge" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			GitHub README Status Badges
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Embed a dynamic SVG status badge in your GitHub repository README. The badge updates in
			real-time to reflect your current service status, similar to Shields.io badges.
		</p>
		<div class="relative overflow-hidden rounded-lg border border-white/5 bg-[#0e0e0f]">
			<div class="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
				<div class="font-mono text-xs text-[#bbcabf]/60">markdown</div>
				<button
					onclick={() =>
						copyText(
							'![Status](https://your-domain.com/api/v1/public/statuspage/your-subdomain/badge.svg)',
							'badge'
						)}
					class="flex items-center gap-1.5 text-xs text-[#bbcabf]/60 transition-colors hover:text-[#4edea3]"
				>
					{#if copied === 'badge'}<Check size={12} />{:else}<Copy size={12} />{/if}
					{copied === 'badge' ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<pre class="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#bbcabf]"><span
					class="text-[#86948a]"># Add to your README.md:</span
				>
![Status](<span class="text-[#4edea3]"
					>https://your-domain.com/api/v1/public/statuspage/your-subdomain/badge.svg</span
				>)</pre>
		</div>

		<!-- Badge Preview -->
		<div class="flex items-center gap-4 rounded-lg border border-white/5 bg-[#1a1d1b] p-6">
			<BadgeCheck size={24} class="text-[#4edea3]" />
			<div>
				<h4 class="font-display text-base font-semibold text-[#e5e2e3]">Dynamic Badge</h4>
				<p class="mt-1 text-sm text-[#bbcabf]">
					The SVG badge automatically reflects your current service status — green for "All Systems
					Operational", yellow for degraded, red for outage.
				</p>
			</div>
		</div>

		<div class="rounded-lg border border-[#4edea3]/20 bg-[#4edea3]/5 p-4">
			<p class="text-sm text-[#4edea3]">
				<strong>Endpoint:</strong>
				<code class="text-xs">GET /api/v1/public/statuspage/:subdomain/badge.svg</code> — No authentication
				required.
			</p>
		</div>
	</section>

	<!-- JSON Status Feeds -->
	<section id="sp-json-feeds" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">JSON Status Feeds</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Netra Uptime provides public JSON endpoints for integration with third-party tools and custom
			dashboards:
		</p>
		<div class="overflow-hidden rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Endpoint</th
						>
						<th
							class="px-6 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]"
							>GET /api/v1/public/statuspage/:subdomain/summary.json</td
						>
						<td class="px-6 py-3 text-[#bbcabf]">Lightweight summary of uptime status</td>
					</tr>
					<tr>
						<td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]"
							>GET /api/v1/public/statuspage/:subdomain/status.json</td
						>
						<td class="px-6 py-3 text-[#bbcabf]">Detailed status of each individual monitor</td>
					</tr>
					<tr>
						<td class="px-6 py-3 font-mono text-xs text-[#e5e2e3]"
							>GET /api/v1/public/statuspage/:subdomain/badge.svg</td
						>
						<td class="px-6 py-3 text-[#bbcabf]">Dynamic SVG status badge</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</div>
