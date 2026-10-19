<script lang="ts">
	interface EnvVar {
		name: string;
		type: string;
		defaultVal: string;
		description: string;
	}

	const appCoreVars: EnvVar[] = [
		{
			name: 'APP_ENV',
			type: 'string',
			defaultVal: 'development',
			description: 'Determines logging level & Gin release mode. Set to production for deployments.'
		},
		{
			name: 'APP_MODE',
			type: 'string',
			defaultVal: 'selfhosted',
			description: 'Self-hosted mode opens access without cloud registration.'
		},
		{
			name: 'PUBLIC_APP_MODE',
			type: 'string',
			defaultVal: 'selfhosted',
			description: 'Frontend app mode. Must match APP_MODE.'
		},
		{
			name: 'PORT',
			type: 'integer',
			defaultVal: '8080',
			description: 'Primary HTTP port for the single-container Go + Svelte application.'
		},
		{
			name: 'ALLOWED_ORIGIN',
			type: 'string',
			defaultVal: 'http://localhost:8080',
			description: 'CORS origin setting. Update when using a custom domain.'
		},
		{
			name: 'PUBLIC_API_URL',
			type: 'string',
			defaultVal: 'http://localhost:8080/api/v1',
			description: 'Public API URL accessed by the browser frontend.'
		}
	];

	const securityVars: EnvVar[] = [
		{
			name: 'JWT_SECRET',
			type: 'string',
			defaultVal: '(required)',
			description: 'Secret key for signing JWT access tokens. Must be changed from default.'
		},
		{
			name: 'JWT_ACCESS_EXPIRY',
			type: 'duration',
			defaultVal: '15m',
			description: 'Access token expiration time (default 15 minutes).'
		},
		{
			name: 'JWT_REFRESH_EXPIRY',
			type: 'duration',
			defaultVal: '168h',
			description: 'Refresh token expiration time (default 7 days).'
		}
	];

	const databaseVars: EnvVar[] = [
		{
			name: 'POSTGRES_USER',
			type: 'string',
			defaultVal: 'postgres',
			description: 'PostgreSQL container user.'
		},
		{
			name: 'POSTGRES_PASSWORD',
			type: 'string',
			defaultVal: '(required)',
			description: 'PostgreSQL container password.'
		},
		{
			name: 'POSTGRES_DB',
			type: 'string',
			defaultVal: 'netra_uptime',
			description: 'Database name.'
		},
		{
			name: 'DB_HOST',
			type: 'string',
			defaultVal: 'postgres',
			description: 'Database hostname (Docker service name).'
		},
		{ name: 'DB_PORT', type: 'integer', defaultVal: '5432', description: 'Database port.' },
		{
			name: 'DB_NAME',
			type: 'string',
			defaultVal: 'netra_uptime',
			description: 'GORM database name connection.'
		},
		{
			name: 'DB_SSLMODE',
			type: 'string',
			defaultVal: 'disable',
			description: 'SSL mode for database connection.'
		}
	];

	const redisVars: EnvVar[] = [
		{
			name: 'REDIS_HOST',
			type: 'string',
			defaultVal: 'redis',
			description: 'Redis hostname (Docker service name).'
		},
		{ name: 'REDIS_PORT', type: 'integer', defaultVal: '6379', description: 'Redis port.' },
		{
			name: 'REDIS_PASSWORD',
			type: 'string',
			defaultVal: '(empty)',
			description: 'Redis password. Set for production security.'
		}
	];

	const quotaVars: EnvVar[] = [
		{
			name: 'RECENT_CHECKS_LIMIT',
			type: 'integer',
			defaultVal: '60',
			description: 'Number of recent check history bars displayed in dashboard UI.'
		},
		{
			name: 'SELFHOSTED_MAX_MONITORS',
			type: 'integer',
			defaultVal: '0',
			description: 'Max monitors per org (0 = unlimited).'
		},
		{
			name: 'SELFHOSTED_MAX_ORGS',
			type: 'integer',
			defaultVal: '0',
			description: 'Max organizations per user (0 = unlimited).'
		},
		{
			name: 'SELFHOSTED_MAX_MEMBERS',
			type: 'integer',
			defaultVal: '0',
			description: 'Max members per org (0 = unlimited).'
		},
		{
			name: 'SELFHOSTED_MAX_PIC',
			type: 'integer',
			defaultVal: '10',
			description: 'Max Person-In-Charge per monitor.'
		},
		{
			name: 'SELFHOSTED_MIN_INTERVAL',
			type: 'integer',
			defaultVal: '10',
			description: 'Minimum check interval in seconds (prevents DDoS).'
		},
		{
			name: 'SELFHOSTED_MAX_TIMEOUT',
			type: 'integer',
			defaultVal: '60',
			description: 'Maximum timeout before request is considered failed.'
		}
	];

	const smtpVars: EnvVar[] = [
		{
			name: 'SMTP_HOST',
			type: 'string',
			defaultVal: 'smtp.gmail.com',
			description: 'SMTP server hostname.'
		},
		{
			name: 'SMTP_PORT',
			type: 'integer',
			defaultVal: '587',
			description: 'SMTP port (587 for TLS/STARTTLS, 465 for SSL).'
		},
		{
			name: 'SMTP_EMAIL',
			type: 'string',
			defaultVal: '(required)',
			description: 'Email address for sending notifications.'
		},
		{
			name: 'SMTP_PASSWORD',
			type: 'string',
			defaultVal: '(required)',
			description: 'SMTP password or app-specific password.'
		}
	];

	const oauthVars: EnvVar[] = [
		{
			name: 'PUBLIC_GOOGLE_CLIENT_ID',
			type: 'string',
			defaultVal: '(optional)',
			description: 'Google OAuth 2.0 Client ID.'
		},
		{
			name: 'GOOGLE_CLIENT_SECRET',
			type: 'string',
			defaultVal: '(optional)',
			description: 'Google OAuth 2.0 Client Secret.'
		},
		{
			name: 'PUBLIC_GOOGLE_REDIRECT_URL',
			type: 'string',
			defaultVal: '(optional)',
			description: 'Google OAuth redirect URL.'
		}
	];

	const sections = [
		{
			id: 'env-app-core',
			title: 'Application Core',
			description:
				'Core application settings that control runtime behavior, ports, and CORS configuration.',
			vars: appCoreVars
		},
		{
			id: 'env-security',
			title: 'Security & JWT',
			description: 'Secret keys and expiration durations for JWT session authentication.',
			vars: securityVars
		},
		{
			id: 'env-database',
			title: 'Database (PostgreSQL)',
			description:
				'Netra Uptime uses PostgreSQL 16 as its primary database. The schema is automatically migrated on startup using GORM AutoMigrate.',
			vars: databaseVars
		},
		{
			id: 'env-redis',
			title: 'Redis Cache',
			description: 'Connection settings for Redis caching and sliding-window rate limiting.',
			vars: redisVars
		},
		{
			id: 'env-quotas',
			title: 'Operational Quotas (Self-Hosted)',
			description:
				'Resource limits for your self-hosted deployment. Set 0 for unlimited on most quota fields.',
			vars: quotaVars
		},
		{
			id: 'env-smtp',
			title: 'Email (SMTP)',
			description:
				'Configure SMTP for sending email notifications. Supports both TLS/STARTTLS (port 587) and SSL (port 465).',
			vars: smtpVars
		},
		{
			id: 'env-oauth',
			title: 'Google OAuth',
			description:
				'Optional Google OAuth 2.0 integration for user login. If not configured, email/password authentication remains available.',
			vars: oauthVars
		}
	];
</script>

<div class="flex flex-col gap-12">
	{#each sections as section (section.id)}
		<section id={section.id} class="flex scroll-mt-24 flex-col gap-4">
			<h2 class="text-xl font-semibold tracking-tight text-zinc-100">{section.title}</h2>
			<p class="text-sm leading-7 text-zinc-400">{section.description}</p>
			<div class="overflow-x-auto rounded-lg border border-zinc-800">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="border-b border-zinc-800 bg-[#141416]">
							<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Variable</th>
							<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Default</th>
							<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Description</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60 bg-transparent">
						{#each section.vars as v (v.name)}
							<tr>
								<td class="px-4 py-3 font-mono text-xs whitespace-nowrap text-[#4edea3]">
									{v.name}
								</td>
								<td class="px-4 py-3 whitespace-nowrap">
									<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-300"
										>{v.defaultVal}</code
									>
								</td>
								<td class="px-4 py-3 text-sm text-zinc-400">{v.description}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/each}
</div>
