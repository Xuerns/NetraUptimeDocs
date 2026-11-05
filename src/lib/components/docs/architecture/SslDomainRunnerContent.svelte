<script lang="ts">
	import ArchSection from './ArchSection.svelte';
	import ArchText from './ArchText.svelte';
	import ArchList from './ArchList.svelte';
	import Callout from './Callout.svelte';
	import MermaidDiagram from './MermaidDiagram.svelte';
	import { sslRunnerDiagram } from '$lib/data/architecture-diagrams';
</script>

<div class="flex flex-col gap-16">
	<ArchSection id="ssl-flow" title="Runner Flow">
		<ArchText>
			Certificate and domain expiration checks are decoupled from high-frequency uptime polling. A
			dedicated background runner (ssl_domain_runner.go) executes once every 24 hours (with an
			initial boot delay of 15 seconds) for all active HTTP monitors with enable_ssl_domain_check =
			true.
		</ArchText>
		<MermaidDiagram definition={sslRunnerDiagram.definition} label={sslRunnerDiagram.label} />
	</ArchSection>

	<ArchSection id="ssl-design" title="Design Highlights">
		<ArchText>
			The SSL and domain runner implements multiple heuristics to maximize check accuracy while
			avoiding false alarms on cloud infrastructure:
		</ArchText>
		<ArchList
			items={[
				'Shared Platform Filtering: The domain checker skips 21 known shared PaaS and serverless domains (vercel.app, netlify.app, github.io, render.com, fly.dev, railway.app, herokuapp.com, pages.dev, workers.dev, ngrok.io, ngrok-free.app, ondigitalocean.app, azurewebsites.net, amazonaws.com, cloudfront.net, firebaseapp.com, web.app, supabase.co, glitch.me, replit.dev, repl.co) as well as raw IP addresses, setting DomainStatus = "none".',
				'Multi-Part TLD Extraction: Resolves the registrable apex domain by accounting for two-tier country ccTLD suffixes (such as .co.id, .ac.id, .co.uk, .com.au, and .org.uk) before querying registries.',
				'Two-Tier Lookup (RDAP + WHOIS): Queries modern JSON-based RDAP (https://rdap.org/domain/<domain>) first. If RDAP is unavailable or returns an error, it falls back to raw TCP port 43 WHOIS with an IANA referral parser and internal TLD server mapping (.id, .com, .net, .org, .io, .dev, .app, .ai, .co, .xyz, .me, .tech, .cloud).',
				'Registry Rate Limiting Jitter: Introduces a 500ms delay between consecutive monitor queries to prevent registry socket bans.',
				'Tiered Email Escalation: Dispatches automated reminder emails at 4 predefined thresholds: 30, 14, 7, and 3 days remaining. At <= 7 days, alerts are automatically escalated to Organization Owners and Admins in addition to monitor PICs. LastExpiryReminderThreshold prevents duplicate notifications.'
			]}
		/>
		<Callout>
			SSL status transitions are categorized as valid (&gt; 30 days remaining), warning (&le; 30
			days remaining), expired (&lt; 0 days), or error (TLS handshake failure or certificate read
			error).
		</Callout>
	</ArchSection>
</div>
