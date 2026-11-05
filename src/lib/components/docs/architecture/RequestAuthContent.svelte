<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import DataTable from './DataTable.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { requestRoutingDiagram } from '$lib/data/architecture-diagrams';
	import { rbacMatrix } from '$lib/data/architecture-tables';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="req-routing" title="Request Routing">
		<ArchText>
			Incoming HTTP traffic is split into four tiers of authorization and data isolation: static
			assets, public API keys, unauthenticated auth endpoints, and organization-scoped JWT routes.
		</ArchText>
		<MermaidDiagram
			definition={requestRoutingDiagram.definition}
			label={requestRoutingDiagram.label}
		/>
	</ArchSection>

	<ArchSection id="req-auth" title="Authentication">
		<ArchText>
			The JWT access token is stored in an httpOnly secure cookie named access_token. AuthMiddleware
			extracts and validates claims, injecting the authenticated userID into the Gin context.
			Brute-force protection on authentication routes is enforced by in-memory sliding-window IP
			rate limiters (AUTH_RATE_LIMIT, default 60 req/min).
		</ArchText>
	</ArchSection>

	<ArchSection id="req-tenant" title="Tenant Isolation">
		<ArchText>
			TenantMiddleware verifies that the authenticated user is an active member of the requested
			:orgId through the organization_members table. Upon validation, it injects organizationID and
			organizationRole into the request context, ensuring complete multi-tenant boundary isolation.
		</ArchText>
	</ArchSection>

	<ArchSection id="req-rbac" title="Role-Based Access Control">
		<ArchText>
			RequireRole middleware enforces role boundaries at the handler level. Notice that monitor
			creation requires the Owner role, whereas monitor modification and deletion are permitted for
			both Owner and Admin roles. Members maintain read-only visibility across organization
			telemetry.
		</ArchText>
		<DataTable table={rbacMatrix} />
	</ArchSection>

	<ArchSection id="req-apikey" title="Public API Key Gateway">
		<ArchList
			items={[
				'Endpoints under /api/v1/public/* authenticate requests via the X-API-Key header or Authorization: Bearer nuk_<hex> token.',
				'Keys are generated with the nuk_ prefix (e.g. nuk_a1b2c3d4...); only the SHA-256 hash and truncated prefix are stored in the database.',
				'An in-memory sliding-window counter in cache.MemoryCache enforces a rate limit of 60 requests per minute per key.',
				'Keys are scoped to either Read (monitors, status pages, incidents) or Write (provisioning and posting incidents), and last_used_at is updated asynchronously.'
			]}
		/>
	</ArchSection>

	<ArchSection id="req-xss" title="Input Sanitization">
		<ArchText>
			The Gin validator registers a custom nohtml rule that is applied to user text input across all
			endpoints, blocking HTML tags and script injection attempts.
		</ArchText>
	</ArchSection>
</div>
