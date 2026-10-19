<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const subdomainUrl = `https://your-subdomain.yourdomain.com/status`;

	const maintenancePayload = `{
  "title": "Database Migration",
  "description": "Upgrading PostgreSQL to v16.2",
  "start_time": "2026-10-01T02:00:00Z",
  "end_time": "2026-10-01T04:00:00Z",
  "monitors": ["monitor-id-1", "monitor-id-2"]
}`;

	const badgeMarkdown = `![Status](https://your-domain.com/api/v1/public/statuspage/your-subdomain/badge.svg)`;
</script>

<div class="flex flex-col gap-12">
	<!-- Creating Status Pages -->
	<section id="sp-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Creating Public Status Pages</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Status pages give your users a transparent view of your service health. Each status page
			displays real-time monitor status, 90-day uptime history, component groups, and incident
			timelines without requiring authentication.
		</p>
	</section>

	<!-- Custom Subdomains -->
	<section id="sp-subdomain" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Custom Subdomains & Branding</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Each status page is assigned a unique subdomain slug and can be customized with your
			organization name, logo, and brand identity:
		</p>
		<CodeBlock code={subdomainUrl} language="text" id="subdomain-url" />
	</section>

	<!-- Component Groups -->
	<section id="sp-component-groups" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Component Groups</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Organize monitors into logical service groups for a structured status page:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">Frontend Services</strong> — Main Website, CDN, Static
				Assets
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Core API</strong> — REST API, GraphQL, WebSocket
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Database Clusters</strong> — PostgreSQL Primary, Read
				Replicas, Redis Cache
			</li>
		</ul>
	</section>

	<!-- Scheduled Maintenance -->
	<section id="sp-maintenance" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">
			Scheduled Maintenance Windows
		</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Schedule maintenance windows to prevent false alarms during planned downtime. Maintenance
			windows progress through three lifecycle stages:
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>scheduled</code
			>,
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>in_progress</code
			>, and
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>completed</code
			>.
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				When active (<code class="font-mono text-xs text-zinc-200">in_progress</code>), monitor
				checks continue in the background while suppressing incident notifications.
			</li>
			<li>
				The public status page displays a scheduled maintenance banner with start and end times.
			</li>
			<li>
				After the window reaches <code class="font-mono text-xs text-[#4edea3]">completed</code>,
				normal breach alerting and status reporting resume automatically.
			</li>
		</ul>
		<CodeBlock code={maintenancePayload} language="json" id="maintenance" />
	</section>

	<!-- GitHub Badges -->
	<section id="sp-badge" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">GitHub README Status Badges</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Embed a dynamic SVG status badge in your repository README via
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>GET /api/v1/public/statuspage/:subdomain/badge.svg</code
			>. The badge updates automatically to reflect your live operational status without requiring
			authentication:
		</p>
		<CodeBlock code={badgeMarkdown} language="markdown" id="badge" />
	</section>

	<!-- JSON Status Feeds -->
	<section id="sp-json-feeds" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">JSON Status Feeds</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime exposes public JSON endpoints for integration with third-party tools and custom
			dashboards:
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Endpoint</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]"
							>GET /api/v1/public/statuspage/:subdomain/summary.json</td
						>
						<td class="px-4 py-3 text-sm text-zinc-400">Lightweight summary of uptime status</td>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]"
							>GET /api/v1/public/statuspage/:subdomain/status.json</td
						>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Detailed status of each individual monitor</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]"
							>GET /api/v1/public/statuspage/:subdomain/badge.svg</td
						>
						<td class="px-4 py-3 text-sm text-zinc-400">Dynamic SVG status badge</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</div>
