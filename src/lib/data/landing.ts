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
	npx: 'npx pulsewatch start',
	pnpm: 'pnpm dlx pulsewatch start',
	yarn: 'yarn dlx pulsewatch start',
	bun: 'bunx pulsewatch start'
};

export const links = {
	github: 'https://github.com/Xuerns/PulseWatch',
	docs: '/docs'
};

export const logos = { slack, discord, github, docker, postgresql, redis, go, svelte, npm, pnpm, bun, yarn };

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
