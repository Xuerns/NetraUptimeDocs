export interface HeadingItem {
	id: string;
	title: string;
	level: number; // 2 for H2, 3 for H3
}

export interface DocItem {
	id: string;
	label: string;
}

export interface DocGroup {
	id: string;
	label: string;
	items: DocItem[];
}

export interface QuickLink {
	id: string;
	icon: string;
	title: string;
	description: string;
	href: string;
}

export interface ChecklistStep {
	id: string;
	number: string;
	title: string;
	description: string;
	commands: string[];
}

export interface DocSection {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	headings: HeadingItem[];
}

export const docGroups: DocGroup[] = [
	{
		id: 'getting-started-group',
		label: 'Getting Started',
		items: [{ id: 'getting-started', label: 'Overview & Quick Start' }]
	},
	{
		id: 'deployment-group',
		label: 'Deployment & Configuration',
		items: [
			{ id: 'docker-compose', label: 'Docker Compose Guide' },
			{ id: 'environment-variables', label: 'Environment Variables' },
			{ id: 'reverse-proxy', label: 'Reverse Proxy Setup' }
		]
	},
	{
		id: 'monitors-group',
		label: 'Monitors & Health Checks',
		items: [{ id: 'monitors', label: 'All Monitor Types' }]
	},
	{
		id: 'alert-rules-group',
		label: 'Alert Rules & Incidents',
		items: [{ id: 'alert-rules', label: 'Alert Templates & Rules' }]
	},
	{
		id: 'notification-group',
		label: 'Notifications & Integrations',
		items: [
			{ id: 'notification-channels', label: 'Channels Overview' },
			{ id: 'discord', label: 'Discord' },
			{ id: 'slack', label: 'Slack' },
			{ id: 'email', label: 'Email (SMTP)' },
			{ id: 'webhook', label: 'Custom Webhooks' }
		]
	},
	{
		id: 'status-pages-group',
		label: 'Status Pages & Badges',
		items: [{ id: 'status-pages', label: 'Status Pages & Badges' }]
	},
	{
		id: 'api-keys-group',
		label: 'API Keys & CI/CD',
		items: [
			{ id: 'permissions', label: 'Roles & Permissions' },
			{ id: 'cicd', label: 'CI/CD Integration' }
		]
	}
];

export const architectureGroups: DocGroup[] = [
	{
		id: 'arch-core-group',
		label: 'Core & Lifecycle',
		items: [
			{ id: 'architecture', label: 'System Architecture' },
			{ id: 'bootstrap-lifecycle', label: 'Bootstrap & Startup' },
			{ id: 'request-auth', label: 'Requests, Auth & Tenancy' }
		]
	},
	{
		id: 'arch-engine-group',
		label: 'Engine & Alerting',
		items: [
			{ id: 'monitoring-engine', label: 'Monitoring Engine' },
			{ id: 'alert-evaluation', label: 'Alert Evaluation' },
			{ id: 'incidents-notifications', label: 'Incidents & Dispatch' },
			{ id: 'ssl-domain-runner', label: 'SSL & Domain Runner' }
		]
	},
	{
		id: 'arch-data-group',
		label: 'Data, Real-time & Platform',
		items: [
			{ id: 'realtime-websocket', label: 'Real-time WebSocket' },
			{ id: 'caching-rate-limit', label: 'Caching & Rate Limiting' },
			{ id: 'data-retention', label: 'Data Retention' },
			{ id: 'status-pages-internals', label: 'Status Page Internals' },
			{ id: 'audit-logging', label: 'Audit Logging' }
		]
	}
];

export const quickLinks: QuickLink[] = [
	{
		id: 'api-reference-link',
		icon: 'code',
		title: 'API Reference',
		description:
			'Complete interactive REST API and WebSocket reference with endpoint schemas and curl examples.',
		href: '/docs/api-reference'
	},
	{
		id: 'docker-deployment',
		icon: 'terminal',
		title: 'Docker Deployment',
		description: 'The fastest way to get Netra Uptime running using Docker and Docker Compose.',
		href: '#docker-compose'
	},
	{
		id: 'configuration-guide',
		icon: 'settings',
		title: 'Configuration Guide',
		description: 'Learn about environment variables and how to configure the database.',
		href: '#environment-variables'
	},
	{
		id: 'creating-monitors',
		icon: 'monitor-heart',
		title: 'Creating Monitors',
		description: 'Set up HTTP, TCP, Ping, SSL, and Domain monitors across your stack.',
		href: '#monitors'
	},
	{
		id: 'alerting-setup',
		icon: 'bell',
		title: 'Alerting Setup',
		description: 'Configure Slack, Discord, Email, or Webhook notifications for incidents.',
		href: '#notification-channels'
	}
];

export const checklistSteps: ChecklistStep[] = [
	{
		id: 'clone',
		number: '',
		title: 'Clone the Repository',
		description:
			'Start by cloning the official Netra Uptime repository from GitHub to your server. We recommend placing it in /opt/netra-uptime.',
		commands: [
			'git clone https://github.com/Xuerns/Netra-Uptime.git /opt/netra-uptime',
			'cd /opt/netra-uptime'
		]
	},
	{
		id: 'configure',
		number: '1.1',
		title: 'Configure Environment',
		description:
			'Copy the example environment file and update it with your specific database credentials, secret keys, and SMTP settings.',
		commands: ['cp .env.example .env', 'nano .env']
	},
	{
		id: 'containers',
		number: '1.2',
		title: 'Initialize Containers',
		description:
			'Use Docker Compose to pull the required images and start the services in detached mode. This will start the web server, worker, and database.',
		commands: ['docker compose up -d']
	},
	{
		id: 'verify',
		number: '1.3',
		title: 'Verify Installation',
		description:
			'Check the logs to ensure all services have started correctly without errors. The web UI should now be accessible at your configured domain or IP.',
		commands: ['docker compose logs -f netra-uptime']
	}
];

export const docSections: DocSection[] = [
	{
		id: 'getting-started',
		title: 'Getting Started',
		subtitle: 'Documentation · Getting Started · Overview',
		description:
			'Welcome to Netra Uptime. This guide will walk you through the process of setting up your own instance, configuring your first monitor, and setting up notification channels so you can know about downtime before your users do.',
		headings: [
			{ id: 'gs-overview', title: 'Overview', level: 2 },
			{ id: 'gs-docker-deploy', title: 'Quick Start via CLI', level: 2 },
			{ id: 'gs-cli-commands', title: 'CLI Command Reference', level: 2 },
			{ id: 'gs-standalone', title: 'Standalone Binary (SQLite)', level: 2 },
			{ id: 'gs-download-windows', title: 'Download for Windows', level: 3 },
			{ id: 'gs-verify', title: 'Verifying Services & Healthcheck', level: 2 },
			{ id: 'gs-next-steps', title: 'Next Steps', level: 2 }
		]
	},
	{
		id: 'docker-compose',
		title: 'Docker Compose Guide',
		subtitle: 'Deployment · Setup · Docker',
		description:
			'Docker Compose is the recommended deployment method. It manages all Netra Uptime services including the single-container Go and Svelte web application, background workers, and PostgreSQL database with in-memory caching.',
		headings: [
			{ id: 'dc-prerequisites', title: 'Prerequisites', level: 2 },
			{ id: 'dc-compose-file', title: 'Docker Compose File', level: 2 },
			{ id: 'dc-services', title: 'Service Configuration', level: 3 },
			{ id: 'dc-volumes', title: 'Volumes & Persistence', level: 3 },
			{ id: 'dc-commands', title: 'Useful Commands', level: 2 },
			{ id: 'dc-backup', title: 'Database Backup & Recovery', level: 2 }
		]
	},
	{
		id: 'environment-variables',
		title: 'Environment Variables',
		subtitle: 'Configuration · Setup · Environment',
		description:
			'Netra Uptime is configured via environment variables defined in your .env file or container environment. Configuration is grouped into Core & Server, Tokens & Secrets, Database (SQLite & PostgreSQL), Network & Security, Operational Quotas, and SMTP Settings.',
		headings: [
			{ id: 'env-app-core', title: 'Application Core & Server', level: 2 },
			{ id: 'env-security', title: 'Tokens & Secrets', level: 2 },
			{ id: 'env-database', title: 'Database (SQLite & PostgreSQL)', level: 2 },
			{ id: 'env-network-security', title: 'Registration, Rate Limits & SSRF', level: 2 },
			{ id: 'env-quotas', title: 'Operational Quotas & Limits', level: 2 },
			{ id: 'env-smtp', title: 'Email (SMTP)', level: 2 }
		]
	},
	{
		id: 'reverse-proxy',
		title: 'Reverse Proxy Setup',
		subtitle: 'Deployment · Configuration · Proxy',
		description:
			'Configure Nginx, Caddy, or Cloudflare as a reverse proxy in front of Netra Uptime. Includes SSL termination, WebSocket header forwarding, and security best practices.',
		headings: [
			{ id: 'rp-overview', title: 'Why a Reverse Proxy?', level: 2 },
			{ id: 'rp-nginx', title: 'Nginx Configuration', level: 2 },
			{ id: 'rp-caddy', title: 'Caddy Configuration', level: 2 },
			{ id: 'rp-websocket', title: 'WebSocket Headers', level: 2 },
			{ id: 'rp-cloudflare', title: 'Cloudflare SSL & Proxy', level: 2 }
		]
	},
	{
		id: 'monitors',
		title: 'Monitors & Health Checks',
		subtitle: 'Core · Detection · Multi-Protocol',
		description:
			'Netra Uptime supports HTTP/HTTPS, TCP port, unprivileged Ping reachability, SSL certificate, and Domain expiry checks. This guide covers monitor schemas, fleet telemetry, status code distributions, criticality, PIC assignments, smart incident detection, and manual checks.',
		headings: [
			{ id: 'mon-overview', title: 'Overview & Check Lifecycle', level: 2 },
			{ id: 'mon-fleet-overview', title: 'Fleet Overview Telemetry', level: 2 },
			{ id: 'mon-http', title: 'HTTP / HTTPS Monitoring', level: 2 },
			{ id: 'mon-http-status', title: 'Status Code Distribution & Daily Stats', level: 3 },
			{ id: 'mon-tcp', title: 'TCP Port Monitoring', level: 2 },
			{ id: 'mon-ping', title: 'Ping Reachability Checks', level: 2 },
			{ id: 'mon-ssl', title: 'SSL / TLS Certificate Expiry', level: 2 },
			{ id: 'mon-domain', title: 'Domain Expiration (RDAP & WHOIS)', level: 2 },
			{ id: 'mon-criticality-pic', title: 'Criticality & PIC Assignment', level: 2 },
			{ id: 'mon-smart-detection', title: 'Smart Incident Detection & 4-State Machine', level: 2 },
			{ id: 'mon-manual-check', title: 'On-Demand Manual Checks', level: 2 }
		]
	},
	{
		id: 'alert-rules',
		title: 'Alert Templates & Incident Management',
		subtitle: 'Alerts · Templates · Rules · Incidents',
		description:
			'Netra Uptime uses a Template-First alert system. Define reusable Alert Templates at the organization level, attach monitors, and configure thresholds for latency, status codes, and timeouts. Differentiate timeouts from hard crashes with Amber Unresponsive states.',
		headings: [
			{ id: 'ar-overview', title: 'Template-First Alert Architecture', level: 2 },
			{ id: 'ar-templates', title: 'Alert Templates & Auto-Seeding', level: 2 },
			{ id: 'ar-metrics', title: 'Metrics & Operators', level: 2 },
			{ id: 'ar-threshold', title: 'Threshold & Pattern Configuration', level: 3 },
			{ id: 'ar-timeout', title: 'Timeout vs Hard Crash (Amber State)', level: 2 },
			{ id: 'ar-consecutive', title: 'Consecutive Breaches Threshold', level: 3 },
			{ id: 'ar-severity', title: 'Severity Levels', level: 2 },
			{ id: 'ar-pic', title: 'Person-in-Charge (PIC)', level: 2 },
			{ id: 'ar-incident-timeline', title: 'Incident Timeline & Auto-Recovery', level: 2 }
		]
	},
	{
		id: 'notification-channels',
		title: 'Notification Channels',
		subtitle: 'Notifications · Integrations · Overview',
		description:
			'Netra Uptime supports multiple notification channels including Email (SMTP), Slack, Discord webhooks, and custom REST webhooks. Route alerts to the right team members with Person-in-Charge assignments.',
		headings: [
			{ id: 'nc-overview', title: 'Channels Overview', level: 2 },
			{ id: 'nc-discord', title: 'Discord Webhook', level: 2 },
			{ id: 'nc-slack', title: 'Slack Webhook', level: 2 },
			{ id: 'nc-email', title: 'Email via SMTP', level: 2 },
			{ id: 'nc-webhook', title: 'Custom Webhooks', level: 2 },
			{ id: 'nc-ssrf', title: 'SSRF Security', level: 3 }
		]
	},
	{
		id: 'discord',
		title: 'Discord Webhook Configuration',
		subtitle: 'Notification · Integrations · Discord',
		description:
			'Create an incoming webhook in Discord and link it to Netra Uptime to receive real-time status alerts.',
		headings: [
			{ id: 'discord-step1', title: 'Open Server Settings', level: 2 },
			{ id: 'discord-step2', title: 'Create a New Webhook', level: 2 },
			{ id: 'discord-step3', title: 'Configure & Copy URL', level: 2 },
			{ id: 'discord-step4', title: 'Add Channel in Netra Uptime', level: 2 }
		]
	},
	{
		id: 'slack',
		title: 'Slack Webhook Integration',
		subtitle: 'Notification · Integrations · Slack',
		description:
			'Deliver real-time incident and resolution alerts directly to your team Slack channels using incoming webhooks.',
		headings: [
			{ id: 'slack-step1', title: '1. Create a Slack App', level: 2 },
			{ id: 'slack-step2', title: '2. Choose Setup Method', level: 2 },
			{ id: 'slack-step3', title: '3. App Name & Workspace', level: 2 },
			{ id: 'slack-step4', title: '4. Configure Scopes', level: 2 },
			{ id: 'slack-step5', title: '5. Authorize Target Channel', level: 2 },
			{ id: 'slack-step6', title: '6. Copy Webhook URL', level: 2 },
			{ id: 'slack-step7', title: '7. Add Channel in Netra Uptime', level: 2 }
		]
	},
	{
		id: 'email',
		title: 'Email Notification (SMTP)',
		subtitle: 'Notification · Email · SMTP',
		description:
			'Receive downtime notifications and performance summaries directly in your email inbox. Requires SMTP configuration in your .env file.',
		headings: [
			{ id: 'email-config', title: 'SMTP Configuration', level: 2 },
			{ id: 'email-gmail', title: 'Gmail App Passwords', level: 2 },
			{ id: 'email-templates', title: 'Email Templates', level: 2 }
		]
	},
	{
		id: 'webhook',
		title: 'Custom Webhooks',
		subtitle: 'Notification · Custom · Webhook',
		description:
			'Integrate Netra Uptime alerts with your custom REST API endpoints, internal tools, or bots. Includes JSON payload schema and SSRF security details.',
		headings: [
			{ id: 'wh-setup', title: 'Webhook Setup', level: 2 },
			{ id: 'wh-payload', title: 'JSON Payload Schema', level: 2 },
			{ id: 'wh-events', title: 'Event Types', level: 3 },
			{ id: 'wh-ssrf', title: 'SSRF Protection', level: 2 }
		]
	},
	{
		id: 'status-pages',
		title: 'Status Pages & Public Badges',
		subtitle: 'Status · Pages · Badges',
		description:
			'Create public status pages with custom subdomains, organize monitors into component groups, schedule maintenance windows, and embed dynamic SVG badges in your GitHub README.',
		headings: [
			{ id: 'sp-overview', title: 'Creating Status Pages', level: 2 },
			{ id: 'sp-subdomain', title: 'Custom Subdomains & Branding', level: 2 },
			{ id: 'sp-component-groups', title: 'Component Groups', level: 2 },
			{ id: 'sp-maintenance', title: 'Scheduled Maintenance Windows', level: 2 },
			{ id: 'sp-badge', title: 'GitHub README Badges', level: 2 },
			{ id: 'sp-json-feeds', title: 'JSON Status Feeds', level: 2 }
		]
	},
	{
		id: 'permissions',
		title: 'Roles & Permission Scopes',
		subtitle: 'RBAC · Security · API Keys · Permissions',
		description:
			'Understand organization member roles (Owner, Admin, Member) with strict RBAC rules, and configure granular permissions (Read vs Write) for external API keys.',
		headings: [
			{ id: 'perm-roles', title: 'Organization Roles & Strict RBAC', level: 2 },
			{ id: 'perm-overview', title: 'API Key Permission Model', level: 2 },
			{ id: 'perm-read', title: 'API Key Read Scope', level: 2 },
			{ id: 'perm-write', title: 'API Key Write Scope', level: 2 },
			{ id: 'perm-create', title: 'Creating API Keys', level: 2 }
		]
	},
	{
		id: 'cicd',
		title: 'CI/CD Integration',
		subtitle: 'API Keys · Automation · CI/CD',
		description:
			'Use Netra Uptime API keys in your CI/CD pipelines to automate monitor creation, status checks, and deployment verification.',
		headings: [
			{ id: 'cicd-github', title: 'GitHub Actions', level: 2 },
			{ id: 'cicd-gitlab', title: 'GitLab CI', level: 2 },
			{ id: 'cicd-examples', title: 'Example Workflows', level: 2 }
		]
	}
];

export const architectureSections: DocSection[] = [
	{
		id: 'architecture',
		title: 'System Architecture',
		subtitle: 'Core · Concepts · Architecture',
		description:
			'Netra Uptime is a single-container Go + Svelte application backed by PostgreSQL or embedded SQLite with built-in in-memory caching. This page covers the overall topology and the principles behind the design.',
		headings: [
			{ id: 'arch-topology', title: 'System Topology', level: 2 },
			{ id: 'arch-characteristics', title: 'Key Characteristics', level: 2 }
		]
	},
	{
		id: 'bootstrap-lifecycle',
		title: 'Bootstrap & Startup',
		subtitle: 'Architecture · Lifecycle · Bootstrap',
		description:
			'How the Netra Uptime server initializes configuration, database, workers, and schedulers in a deterministic order.',
		headings: [
			{ id: 'boot-sequence', title: 'Startup Sequence', level: 2 },
			{ id: 'boot-pooling', title: 'Connection Pooling & Migration', level: 2 },
			{ id: 'boot-schedulers', title: 'Background Schedulers', level: 2 }
		]
	},
	{
		id: 'request-auth',
		title: 'Requests, Auth & Multi-Tenancy',
		subtitle: 'Architecture · Security · Requests',
		description:
			'The request lifecycle: routing tiers, JWT authentication, tenant isolation, role-based access control, and the public API key gateway.',
		headings: [
			{ id: 'req-routing', title: 'Request Routing', level: 2 },
			{ id: 'req-auth', title: 'Authentication', level: 2 },
			{ id: 'req-tenant', title: 'Tenant Isolation', level: 2 },
			{ id: 'req-rbac', title: 'Role-Based Access Control (Strict RBAC)', level: 2 },
			{ id: 'req-apikey', title: 'Public API Key Gateway', level: 2 },
			{ id: 'req-xss', title: 'Input Sanitization', level: 2 }
		]
	},
	{
		id: 'monitoring-engine',
		title: 'Monitoring Engine',
		subtitle: 'Architecture · Workers · Concurrency',
		description:
			'The scheduler and worker pool that run checks continuously and in parallel, plus the concurrency model of the whole runtime.',
		headings: [
			{ id: 'eng-scheduler', title: 'Scheduler', level: 2 },
			{ id: 'eng-pool', title: 'Worker Pool', level: 2 },
			{ id: 'eng-checkers', title: 'Checkers', level: 2 },
			{ id: 'eng-concurrency', title: 'Concurrency Matrix', level: 2 }
		]
	},
	{
		id: 'alert-evaluation',
		title: 'Alert Evaluation',
		subtitle: 'Architecture · Alerts · State Machine',
		description:
			'How check results are evaluated against alert rules to decide whether a monitor is up, degraded, unresponsive, or down.',
		headings: [
			{ id: 'ae-state', title: 'Status State Machine', level: 2 },
			{ id: 'ae-priority', title: 'Template-First & Evaluation Priority', level: 2 },
			{ id: 'ae-timeout', title: 'Timeout vs Hard Crash (Amber State)', level: 2 },
			{ id: 'ae-fallback', title: 'Default Fallback Rules', level: 2 },
			{ id: 'ae-consecutive', title: 'Consecutive Breaches Threshold', level: 2 }
		]
	},
	{
		id: 'incidents-notifications',
		title: 'Incidents & Notification Dispatch',
		subtitle: 'Architecture · Incidents · Dispatcher',
		description:
			'The incident lifecycle, severity calculation, multi-channel delivery, and SSRF protection for custom webhooks.',
		headings: [
			{ id: 'inc-lifecycle', title: 'Incident Lifecycle & Dispatch', level: 2 },
			{ id: 'inc-severity', title: 'Dynamic Severity Matrix', level: 2 },
			{ id: 'inc-ssrf', title: 'SSRF Protection', level: 2 }
		]
	},
	{
		id: 'ssl-domain-runner',
		title: 'SSL & Domain Expiry Runner',
		subtitle: 'Architecture · Workers · SSL',
		description:
			'The daily background runner that tracks SSL certificate and domain expiry with tiered reminders.',
		headings: [
			{ id: 'ssl-flow', title: 'Runner Flow', level: 2 },
			{ id: 'ssl-design', title: 'Design Highlights', level: 2 }
		]
	},
	{
		id: 'realtime-websocket',
		title: 'Real-time WebSocket Protocol',
		subtitle: 'Architecture · Real-time · WebSocket',
		description:
			'How the dashboard receives live monitor updates through room-based WebSocket broadcasting.',
		headings: [
			{ id: 'rt-handshake', title: 'Handshake & Broadcast', level: 2 },
			{ id: 'rt-components', title: 'Technical Components', level: 2 }
		]
	},
	{
		id: 'caching-rate-limit',
		title: 'Caching & Rate Limiting',
		subtitle: 'Architecture · In-Memory Cache · Performance',
		description:
			'The in-memory cache tier: thread-safe sync.RWMutex TTL caching, atomic sliding-window rate limiting, and prefix-based cache invalidation.',
		headings: [
			{ id: 'cache-flow', title: 'Read-Through Cache & Invalidation', level: 2 },
			{ id: 'cache-keys', title: 'Cache & Rate Limit Key Matrix', level: 2 }
		]
	},
	{
		id: 'data-retention',
		title: 'Data Retention & Rollup',
		subtitle: 'Architecture · Database · Retention',
		description:
			'How hourly aggregation keeps PostgreSQL fast while preserving 90 days of uptime history.',
		headings: [
			{ id: 'ret-rollup', title: 'Hourly Rollup', level: 2 },
			{ id: 'ret-impact', title: 'Why It Matters', level: 2 }
		]
	},
	{
		id: 'status-pages-internals',
		title: 'Status Page Internals',
		subtitle: 'Architecture · Status · Public',
		description:
			'How public status pages are served: subdomain routing, component groups, maintenance, and machine-readable feeds.',
		headings: [
			{ id: 'spi-flow', title: 'Request Flow', level: 2 },
			{ id: 'spi-features', title: 'Main Features', level: 2 }
		]
	},
	{
		id: 'audit-logging',
		title: 'Audit Logging',
		subtitle: 'Architecture · Security · Audit',
		description:
			'How configuration changes are recorded for accountability and security compliance.',
		headings: [
			{ id: 'audit-flow', title: 'Audit Flow', level: 2 },
			{ id: 'audit-fields', title: 'Recorded Fields', level: 2 }
		]
	}
];

// Backward compatibility: keep sidebarSections as alias
export const sidebarSections = docSections;
