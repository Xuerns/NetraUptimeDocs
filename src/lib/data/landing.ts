import slack from '$lib/assets/landing/logos/slack.svg';
import discord from '$lib/assets/landing/logos/discord.svg';
import github from '$lib/assets/landing/logos/github.svg';
import docker from '$lib/assets/landing/logos/docker.svg';
import postgresql from '$lib/assets/landing/logos/postgresql.svg';
import redis from '$lib/assets/landing/logos/redis.svg';
import go from '$lib/assets/landing/logos/go.svg';
import svelte from '$lib/assets/landing/logos/svelte.svg';
import npm from '$lib/assets/landing/logos/npm.svg';
import pnpm from '$lib/assets/landing/logos/pnpm.svg';
import bun from '$lib/assets/landing/logos/bun.svg';
import yarn from '$lib/assets/landing/logos/yarn.svg';

/**
 * Install commands shown in the hero and documentation.
 * Uses the Netra Uptime CLI package runners.
 */
export const installCommands = {
	npx: 'npx netra-uptime start',
	pnpm: 'pnpm dlx netra-uptime start',
	yarn: 'yarn dlx netra-uptime start',
	bun: 'bunx netra-uptime start'
};

export const links = {
	github: 'https://github.com/Xuerns/Netra-Uptime',
	issues: 'https://github.com/Xuerns/Netra-Uptime/issues',
	license: 'https://github.com/Xuerns/Netra-Uptime/blob/main/LICENSE',
	docs: '/docs',
	apiReference: '/docs/api-reference'
};

export const logos = {
	slack,
	discord,
	github,
	docker,
	postgresql,
	redis,
	go,
	svelte,
	npm,
	pnpm,
	bun,
	yarn
};

const found = import.meta.glob('$lib/assets/landing/*.{webp,png,jpg,jpeg,avif}', {
	eager: true,
	import: 'default',
	query: '?url'
}) as Record<string, string>;

function image(name: string): string | null {
	const key = Object.keys(found).find((path) => {
		const file = path.split('/').pop() ?? '';
		return file.replace(/\.[^.]+$/, '') === name;
	});
	return key ? found[key] : null;
}

export const images = {
	dashboard: image('dashboard-overview'),
	monitors: image('feature-monitors'),
	statusPage: image('feature-status-page'),
	incident: image('feature-incident'),
	alertRules: image('feature-alert-rules')
};

export interface FaqItem {
	question: string;
	answer: string;
}

export const faqs: FaqItem[] = [
	{
		question: 'How do I deploy Netra Uptime on my own server?',
		answer:
			'Run "npx netra-uptime start" (or pnpm dlx, yarn dlx, bunx) to generate a production-ready .env and docker-compose.yml with secure random credentials and start the containers automatically. You can also clone the repository and run "docker compose up -d" manually.'
	},
	{
		question: 'What monitoring protocols and checks are supported?',
		answer:
			'Netra Uptime supports HTTP/HTTPS status code, latency, and response body assertions, TCP port connectivity, ICMP Ping, daily SSL/TLS certificate validity checks, and WHOIS/RDAP domain expiration tracking.'
	},
	{
		question: 'How does alert evaluation avoid false-positive notifications?',
		answer:
			'Alert rules use a template-first state machine that differentiates between timeouts (amber state) and hard connection or status failures (red state). You can require consecutive breach counts before opening an incident or dispatching alerts.'
	},
	{
		question: 'Which notification channels are built in?',
		answer:
			'Alerts can be routed to Slack, Discord, Email (SMTP), and custom HTTP webhooks with built-in SSRF protection. Monitors can also assign a Person-in-Charge (PIC) to route incidents to the responsible engineer.'
	},
	{
		question: 'How does long-term data retention work?',
		answer:
			'Raw check logs are stored in PostgreSQL and automatically rolled up hourly into 90-day uptime and latency aggregates, keeping queries fast and disk usage predictable without external time-series databases.'
	},
	{
		question: 'What license is Netra Uptime released under?',
		answer:
			'Netra Uptime is open-source under the AGPL-3.0 license. All features—including multi-tenant organizations, role-based access control, public status pages, and REST API keys—are included with zero telemetry.'
	}
];
