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

export const docGroups: DocGroup[] = [
	{
		id: 'core-concepts',
		label: 'Core · Concepts',
		items: [
			{ id: 'getting-started', label: 'Getting Started' },
			{ id: 'architecture', label: 'Architecture' },
			{ id: 'authentication', label: 'Authentication' }
		]
	},
	{
		id: 'configuration',
		label: 'Configuration',
		items: [
			{ id: 'docker-compose', label: 'Docker Compose' },
			{ id: 'environment-variables', label: 'Environment Variables' },
			{ id: 'database-setup', label: 'Database Setup' }
		]
	},
	{
		id: 'monitors',
		label: 'Monitors',
		items: [
			{ id: 'http-https', label: 'HTTP / HTTPS' },
			{ id: 'tcp-ports', label: 'TCP Ports' },
			{ id: 'ping', label: 'Ping' },
			{ id: 'ssl', label: 'SSL Certificate' },
			{ id: 'domain-expire', label: 'Domain Expiry Check' }
		]
	},
	{
		id: 'notification',
		label: 'Notification',
		items: [
			{ id: 'email', label: 'Email' },
			{ id: 'slack', label: 'Slack' },
			{ id: 'discord', label: 'Discord' },
			{ id: 'webhook', label: 'Webhook' }
		]
	},
	{
		id: 'APIkeys',
		label: 'API Keys',
		items: [
			{ id: 'permissions', label: 'Permissions' },
			{ id: 'cicd', label: 'CI/CD' }
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
		description: 'Set up HTTP, TCP, or Ping monitors to keep track of your services.',
		href: '#http-https'
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
		number: '1.0',
		title: 'Clone the Repository',
		description:
			'Start by cloning the official PulseWatch repository from GitHub to your server. We recommend placing it in /opt/pulsewatch.',
		commands: [
			'git clone https://github.com/username/pulsewatch.git /opt/pulsewatch',
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

export const sidebarSections = [
	{
		id: 'getting-started',
		title: 'Getting Started',
		subtitle: 'Documentation · Getting Started · Overview',
		description:
			'Welcome to PulseWatch. This guide will walk you through the process of setting up your own instance, configuring your first monitor, and setting up notification channels so you can know about downtime before your users do.'
	},
	{
		id: 'architecture',
		title: 'Architecture',
		subtitle: 'Core · Concepts · Architecture',
		description:
			'PulseWatch uses a modular architecture with separate services for the web server, background workers, and database. This design ensures scalability and reliability for monitoring at any scale.'
	},
	{
		id: 'authentication',
		title: 'Authentication',
		subtitle: 'Core · Concepts · Authentication',
		description:
			'PulseWatch supports JWT-based authentication with role-based access control. Configure API keys and session tokens to secure access to your monitoring dashboard.'
	},
	{
		id: 'docker-compose',
		title: 'Docker Compose',
		subtitle: 'Configuration · Setup · Docker',
		description:
			'Docker Compose is the recommended deployment method. It manages all PulseWatch services including the web application, background worker, and PostgreSQL database.'
	},
	{
		id: 'environment-variables',
		title: 'Environment Variables',
		subtitle: 'Configuration · Setup · Environment',
		description:
			'PulseWatch is configured through environment variables. Key settings include database credentials, secret keys, SMTP configuration, and monitoring intervals.'
	},
	{
		id: 'database-setup',
		title: 'Database Setup',
		subtitle: 'Configuration · Setup · Database',
		description:
			'PulseWatch uses PostgreSQL as its primary database. The schema is automatically migrated on startup using the built-in migration system.'
	},
	{
		id: 'http-https',
		title: 'HTTP / HTTPS',
		subtitle: 'Monitors · Alerts · HTTP',
		description:
			'HTTP monitors send requests to your endpoints at configurable intervals. They support custom headers, authentication, expected status codes, and response time thresholds.'
	},
	{
		id: 'tcp-ports',
		title: 'TCP Ports',
		subtitle: 'Monitors · Alerts · TCP',
		description:
			'TCP monitors check if specific ports on your servers are reachable and accepting connections. Useful for monitoring databases, Redis, and other non-HTTP services.'
	},
	{
		id: 'ping',
		title: 'Ping',
		subtitle: 'Monitors · Alerts · Ping',
		description:
			'ICMP Ping monitors verify host availability by sending echo requests. They measure latency and packet loss to detect network-level issues.'
	},
	{
		id: 'ssl',
		title: 'SSL Certificate',
		subtitle: 'Monitors · Alerts · SSL',
		description:
			'SSL monitors check the validity and expiration of your SSL/TLS certificates and alert you before they expire.'
	},
	{
		id: 'domain-expire',
		title: 'Domain Expiry Check',
		subtitle: 'Monitors · Alerts · Domain',
		description:
			'Domain expiry monitors track WHOIS expiration dates and notify you well in advance to prevent accidental domain loss.'
	},
	{
		id: 'email',
		title: 'Email Notification',
		subtitle: 'Notification · Email Alerts',
		description:
			'Receive downtime notifications and performance summaries directly in your email inbox.'
	},
	{
		id: 'slack',
		title: 'Slack Notification',
		subtitle: 'Notification · Integrations · Slack Webhook',
		description:
			'Deliver real-time incident and resolution alerts directly to your team Slack channels.'
	},
	{
		id: 'discord',
		title: 'Discord Notification',
		subtitle: 'Notification · Integrations · Discord Webhook',
		description:
			'Connect PulseWatch uptime monitoring alerts directly to your Discord server using webhooks for instant incident notifications.'
	},
	{
		id: 'webhook',
		title: 'Custom Webhook',
		subtitle: 'Notification · Custom Integrations · Webhook',
		description:
			'Integrate PulseWatch alerts with your custom REST API endpoints, internal tools, or bots.'
	},
	{
		id: 'permissions',
		title: 'Permissions',
		subtitle: 'API Keys · Security · Permissions',
		description:
			'Configure granular permissions for API keys to limit access to specific resources and actions.'
	},
	{
		id: 'cicd',
		title: 'CI/CD Integration',
		subtitle: 'API Keys · Automation · CI/CD',
		description:
			'Use API keys in your CI/CD pipelines to automate monitor creation, status checks, and deployment verification.'
	}
];
