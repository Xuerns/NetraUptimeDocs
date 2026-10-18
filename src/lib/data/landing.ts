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
 * Install commands shown in the hero and the final CTA.
 * Uses the Netra Uptime CLI package runners.
 */
export const installCommands = {
	npx: 'npx netra-uptime start',
	pnpm: 'pnpm dlx netra-uptime start',
	yarn: 'yarn dlx netra-uptime start',
	bun: 'bunx netra-uptime start'
};

export const links = {
	github: 'https://github.com/Xuerns/PulseWatch',
	docs: '/docs'
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

/**
 * Screenshots live in src/lib/assets/landing/. Drop a .webp or .png file with
 * the exact base name below and it is picked up automatically.
 * When a file is missing, a placeholder is rendered instead.
 */
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
	alertRules: image('feature-alert-rules'),
	slack: image('integration-slack'),
	discord: image('integration-discord')
};

export const worksWith = [
	{ name: 'Slack', logo: slack },
	{ name: 'Discord', logo: discord },
	{ name: 'GitHub', logo: github },
	{ name: 'Docker', logo: docker },
	{ name: 'PostgreSQL', logo: postgresql },
	{ name: 'Redis', logo: redis },
	{ name: 'Go', logo: go },
	{ name: 'Svelte', logo: svelte }
];

export const stack = [
	{ name: 'Go', logo: go, note: 'Concurrent worker pool' },
	{ name: 'PostgreSQL', logo: postgresql, note: 'Primary datastore' },
	{ name: 'Redis', logo: redis, note: 'Cache, pub/sub, rate limits' },
	{ name: 'Svelte', logo: svelte, note: 'Embedded dashboard UI' },
	{ name: 'Docker', logo: docker, note: 'One-command deploy' }
];

export interface FaqItem {
	question: string;
	answer: string;
}

export const faqs: FaqItem[] = [
	{
		question: 'Is Netra Uptime free and open source?',
		answer:
			'Yes, Netra Uptime is 100% free and open-source under the AGPL-3.0 license. There are no paywalled features, artificial monitor limits, or recurring subscription fees. You own your infrastructure and retain complete control over your data.'
	},
	{
		question: 'How do I deploy Netra Uptime on my own servers?',
		answer:
			'You can launch Netra Uptime in less than a minute. For instant local testing, run "npx netra-uptime start" (or use pnpm dlx, yarn dlx, or bunx). For production environments, deploy with our official Docker Compose setup featuring PostgreSQL and Redis.'
	},
	{
		question: 'What monitoring protocols and checks are supported?',
		answer:
			'Netra Uptime supports multi-protocol checks including HTTP/HTTPS status, latency, and response assertion, TCP port connectivity, and ICMP Ping. It also includes proactive monitoring for SSL/TLS certificate validity and WHOIS/RDAP domain expiration.'
	},
	{
		question: 'Where can Netra Uptime send incident alerts?',
		answer:
			'Alerts can be delivered across multiple notification channels including Email (SMTP), Slack, Discord, and custom Webhooks. You can configure granular alert rules with consecutive failure thresholds and latency limits to prevent false alarms.'
	},
	{
		question: 'Can I create branded public status pages for my users?',
		answer:
			'Yes. You can publish branded public or private status pages on custom subdomains with custom logos, themes, 90-day uptime history bars, service component grouping, scheduled maintenance announcements, and embeddable SVG status badges.'
	},
	{
		question: 'Does Netra Uptime send any telemetry or data to third parties?',
		answer:
			'No. Netra Uptime is strictly self-hosted and privacy-first. All monitoring metrics, incident timelines, and user credentials remain entirely within your own database and servers. Nothing is ever sent to a third-party cloud.'
	}
];
