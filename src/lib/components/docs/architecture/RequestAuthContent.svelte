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
			Incoming HTTP traffic is split into four tiers of authorization and data isolation: static assets,
			public API keys, unauthenticated auth endpoints, and organization-scoped JWT routes.
		</ArchText>
		<MermaidDiagram
			definition={requestRoutingDiagram.definition}
			label={requestRoutingDiagram.label}
		/>
	</ArchSection>

	<ArchSection id="req-auth" title="Authentication">
		<ArchText>
			The JWT is stored in an httpOnly secure cookie named access_token. AuthMiddleware extracts the claims
			and injects userID into the Gin context.
		</ArchText>
	</ArchSection>

	<ArchSection id="req-tenant" title="Tenant Isolation">
		<ArchText>
			TenantMiddleware verifies that the authenticated user is a member of the requested :orgId through the
			organization_members table. On success it injects organizationID and organizationRole.
		</ArchText>
	</ArchSection>

	<ArchSection id="req-rbac" title="Role-Based Access Control">
		<ArchText>RequireRole restricts access at the handler level.</ArchText>
		<DataTable table={rbacMatrix} />
	</ArchSection>

	<ArchSection id="req-apikey" title="Public API Key Gateway">
		<ArchList
			items={[
				'Endpoints under /api/v1/public/* accept X-API-Key or Authorization: Bearer <key>.',
				'The key hash is verified, expiry is checked, and a Redis counter enforces 60 requests per minute.',
				'last_used_at is updated asynchronously.'
			]}
		/>
	</ArchSection>

	<ArchSection id="req-xss" title="Input Sanitization">
		<ArchText>
			The Gin validator registers a custom nohtml rule that is applied to user text input, blocking HTML
			and script injection.
		</ArchText>
	</ArchSection>
</div>
