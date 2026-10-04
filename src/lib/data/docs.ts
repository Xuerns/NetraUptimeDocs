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
		id: 'architecture-group',
		label: 'Architecture & Internals',
		items: [{ id: 'architecture', label: 'System Architecture' }]
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
		items: [{ id: 'alert-rules', label: 'Alert Rules & Incidents' }]
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
			{ id: 'permissions', label: 'Permission Scopes' },
			{ id: 'cicd', label: 'CI/CD Integration' }
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
		description: 'The fastest way to get PulseWatch running using Docker and Docker Compose.',
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
			'Start by cloning the official PulseWatch repository from GitHub to your server. We recommend placing it in /opt/pulsewatch.',
		commands: [
			'git clone https://github.com/Xuerns/PulseWatch.git /opt/pulsewatch',
			'cd /opt/pulsewatch'
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
		commands: ['docker compose logs -f web']
	}
];

export const docSections: DocSection[] = [
	{
		id: 'getting-started',
		title: 'Getting Started',
		subtitle: 'Documentation · Getting Started · Overview',
		description:
			'Welcome to PulseWatch. This guide will walk you through the process of setting up your own instance, configuring your first monitor, and setting up notification channels so you can know about downtime before your users do.',
		headings: [
			{ id: 'gs-overview', title: 'Overview', level: 2 },
			{ id: 'gs-requirements', title: 'System Requirements', level: 2 },
			{ id: 'gs-docker-deploy', title: 'Docker Deployment', level: 2 },
			{ id: 'gs-verify', title: 'Verifying Services & Healthcheck', level: 2 },
			{ id: 'gs-next-steps', title: 'Next Steps', level: 2 }
		]
	},
	{
		id: 'architecture',
		title: 'Architecture & Internals',
		subtitle: 'Core · Concepts · Architecture',
		description:
			'PulseWatch is a single-container Go + Svelte application backed by PostgreSQL and Redis. This section covers the system architecture, worker pool design, caching strategy, and real-time WebSocket protocol.',
		headings: [
			{ id: 'arch-overview', title: 'System Architecture Overview', level: 2 },
			{ id: 'arch-single-container', title: 'Single Container Design', level: 3 },
			{ id: 'arch-worker-pool', title: 'Worker Pool & Goroutine Concurrency', level: 2 },
			{ id: 'arch-redis', title: 'Redis Caching & Rate Limiting', level: 2 },
			{ id: 'arch-database', title: 'Database Schema & Migrations', level: 2 },
			{ id: 'arch-websocket', title: 'Real-time WebSocket Protocol', level: 2 }
		]
	},
	{
		id: 'docker-compose',
		title: 'Docker Compose Guide',
		subtitle: 'Deployment · Setup · Docker',
		description:
			'Docker Compose is the recommended deployment method. It manages all PulseWatch services including the web application, background workers, PostgreSQL database, and Redis cache.',
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
			'PulseWatch is configured through environment variables defined in a .env file. There are 26 crucial variables covering application core, security, database, Redis, operational quotas, SMTP, and OAuth settings.',
		headings: [
			{ id: 'env-app-core', title: 'Application Core', level: 2 },
			{ id: 'env-security', title: 'Security & JWT', level: 2 },
			{ id: 'env-database', title: 'Database (PostgreSQL)', level: 2 },
			{ id: 'env-redis', title: 'Redis Cache', level: 2 },
			{ id: 'env-quotas', title: 'Operational Quotas (Self-Hosted)', level: 2 },
			{ id: 'env-smtp', title: 'Email (SMTP)', level: 2 },
			{ id: 'env-oauth', title: 'Google OAuth', level: 2 }
		]
	},
	{
		id: 'reverse-proxy',
		title: 'Reverse Proxy Setup',
		subtitle: 'Deployment · Configuration · Proxy',
		description:
			'Configure Nginx, Caddy, or Cloudflare as a reverse proxy in front of PulseWatch. Includes SSL termination, WebSocket header forwarding, and security best practices.',
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
			'PulseWatch supports HTTP, TCP, ICMP Ping, SSL certificate, and Domain expiry checks. Each monitor type has unique configuration parameters and detection logic. This page covers all five protocols, smart incident detection, and on-demand manual checks.',
		headings: [
			{ id: 'mon-overview', title: 'Overview & Check Lifecycle', level: 2 },
			{ id: 'mon-http', title: 'HTTP / HTTPS Monitoring', level: 2 },
			{ id: 'mon-http-headers', title: 'Custom Headers & Auth', level: 3 },
			{ id: 'mon-http-status', title: 'Status Codes & Payloads', level: 3 },
			{ id: 'mon-tcp', title: 'TCP Port Monitoring', level: 2 },
			{ id: 'mon-ping', title: 'ICMP Ping Checks', level: 2 },
			{ id: 'mon-ssl', title: 'SSL / TLS Certificate Expiry', level: 2 },
			{ id: 'mon-domain', title: 'Domain Expiration (WHOIS)', level: 2 },
			{ id: 'mon-smart-detection', title: 'Smart Incident Detection (3×/1×)', level: 2 },
			{ id: 'mon-manual-check', title: 'On-Demand Manual Checks', level: 2 }
		]
	},
	{
		id: 'alert-rules',
		title: 'Alert Rules & Incident Management',
		subtitle: 'Alerts · Rules · Incidents',
		description:
			'Define custom alert rules based on response time, status codes, and timeouts. Configure severity levels, consecutive failure thresholds, and Person-in-Charge (PIC) assignments for efficient incident management.',
		headings: [
			{ id: 'ar-overview', title: 'Alert Rules Overview', level: 2 },
			{ id: 'ar-metrics', title: 'Metrics & Operators', level: 2 },
			{ id: 'ar-threshold', title: 'Threshold Configuration', level: 3 },
			{ id: 'ar-consecutive', title: 'Consecutive Failures', level: 3 },
			{ id: 'ar-severity', title: 'Severity Levels', level: 2 },
			{ id: 'ar-pic', title: 'Person-in-Charge (PIC)', level: 2 },
			{ id: 'ar-incident-timeline', title: 'Incident Timeline & Notes', level: 2 }
		]
	},
	{
		id: 'notification-channels',
		title: 'Notification Channels',
		subtitle: 'Notifications · Integrations · Overview',
		description:
			'PulseWatch supports multiple notification channels including Email (SMTP), Slack, Discord webhooks, and custom REST webhooks. Route alerts to the right team members with Person-in-Charge assignments.',
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
			'Create an incoming webhook in Discord and link it to PulseWatch to receive real-time status alerts.',
		headings: [
			{ id: 'discord-step1', title: 'Open Server Settings', level: 2 },
			{ id: 'discord-step2', title: 'Create a New Webhook', level: 2 },
			{ id: 'discord-step3', title: 'Configure & Copy URL', level: 2 },
			{ id: 'discord-step4', title: 'Add Channel in PulseWatch', level: 2 }
		]
	},
	{
		id: 'slack',
		title: 'Slack Webhook Integration',
		subtitle: 'Notification · Integrations · Slack',
		description:
			'Deliver real-time incident and resolution alerts directly to your team Slack channels using incoming webhooks.',
		headings: [
			{ id: 'slack-setup', title: 'Slack App Setup', level: 2 },
			{ id: 'slack-webhook', title: 'Incoming Webhook URL', level: 2 },
			{ id: 'slack-pulsewatch', title: 'Configure in PulseWatch', level: 2 }
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
			'Integrate PulseWatch alerts with your custom REST API endpoints, internal tools, or bots. Includes JSON payload schema and SSRF security details.',
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
		title: 'Permission Scopes',
		subtitle: 'API Keys · Security · Permissions',
		description:
			'Configure granular permissions for API keys to limit access to specific resources and actions. Understand read vs write scopes.',
		headings: [
			{ id: 'perm-overview', title: 'Permission Model', level: 2 },
			{ id: 'perm-read', title: 'Read Scope', level: 2 },
			{ id: 'perm-write', title: 'Write Scope', level: 2 },
			{ id: 'perm-create', title: 'Creating API Keys', level: 2 }
		]
	},
	{
		id: 'cicd',
		title: 'CI/CD Integration',
		subtitle: 'API Keys · Automation · CI/CD',
		description:
			'Use PulseWatch API keys in your CI/CD pipelines to automate monitor creation, status checks, and deployment verification.',
		headings: [
			{ id: 'cicd-github', title: 'GitHub Actions', level: 2 },
			{ id: 'cicd-gitlab', title: 'GitLab CI', level: 2 },
			{ id: 'cicd-examples', title: 'Example Workflows', level: 2 }
		]
	}
];

// Backward compatibility: keep sidebarSections as alias
export const sidebarSections = docSections;
