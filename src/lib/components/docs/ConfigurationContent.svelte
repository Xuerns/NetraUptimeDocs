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
			description:
				'Runtime environment (development or production). Controls Gin release mode, secure cookie flags, and strict CORS enforcement.'
		},
		{
			name: 'HOST',
			type: 'string',
			defaultVal: '0.0.0.0 / 127.0.0.1',
			description:
				'Network bind interface. Defaults to 127.0.0.1 in standalone SQLite desktop mode, 0.0.0.0 for Docker containers.'
		},
		{
			name: 'PORT',
			type: 'integer',
			defaultVal: '27346',
			description:
				'HTTP listening port for the unified Go API worker and embedded SvelteKit static client.'
		},
		{
			name: 'ALLOWED_ORIGIN',
			type: 'string',
			defaultVal: 'http://localhost:27346',
			description:
				'Comma-separated list of allowed CORS origins. Also used as the base URL for verification and password reset links.'
		},
		{
			name: 'PUBLIC_API_URL',
			type: 'string',
			defaultVal: '/api/v1',
			description:
				'Base API URL injected into /_app/env.js. In Docker deployments, defaults to http://localhost:27346/api/v1.'
		}
	];

	const securityVars: EnvVar[] = [
		{
			name: 'JWT_SECRET',
			type: 'string',
			defaultVal: 'Auto-generated (.netra_secret)',
			description:
				'HMAC-SHA256 secret key (minimum 32 characters). If empty or set to default placeholder, Netra Uptime generates a random 64-hex secret and persists it to .netra_secret (0600 file permissions).'
		},
		{
			name: 'JWT_ACCESS_EXPIRY',
			type: 'duration',
			defaultVal: '15m',
			description:
				'Access token lifetime. Sets the access_token HttpOnly cookie max-age to 900 seconds.'
		},
		{
			name: 'JWT_REFRESH_EXPIRY',
			type: 'duration',
			defaultVal: '168h',
			description:
				'Refresh token lifetime (7 days). Sets the refresh_token HttpOnly cookie max-age to 604,800 seconds.'
		}
	];

	const databaseVars: EnvVar[] = [
		{
			name: 'DB_DRIVER',
			type: 'string',
			defaultVal: 'sqlite / postgres',
			description:
				'Database engine driver (sqlite or postgres). Defaults to postgres if DB_HOST is set; otherwise defaults to pure-Go sqlite.'
		},
		{
			name: 'DB_PATH',
			type: 'string',
			defaultVal: 'netra.db',
			description:
				'Database file path when DB_DRIVER=sqlite. Operates in WAL mode with busy_timeout(5000) and MaxOpenConns(1).'
		},
		{
			name: 'DB_HOST',
			type: 'string',
			defaultVal: '(empty) / postgres',
			description:
				'PostgreSQL server hostname (e.g., postgres in Docker Compose networks). If empty, SQLite is used.'
		},
		{
			name: 'DB_PORT',
			type: 'integer',
			defaultVal: '5432',
			description: 'PostgreSQL listening port.'
		},
		{
			name: 'DB_USER',
			type: 'string',
			defaultVal: 'postgres',
			description:
				'PostgreSQL authentication username. Falls back to POSTGRES_USER if DB_USER is not set.'
		},
		{
			name: 'DB_PASSWORD',
			type: 'string',
			defaultVal: '(empty)',
			description:
				'PostgreSQL authentication password. Falls back to POSTGRES_PASSWORD if DB_PASSWORD is not set.'
		},
		{
			name: 'DB_NAME',
			type: 'string',
			defaultVal: 'netra_uptime',
			description: 'PostgreSQL database name. Falls back to POSTGRES_DB if DB_NAME is not set.'
		},
		{
			name: 'DB_SSLMODE',
			type: 'string',
			defaultVal: 'disable',
			description: 'PostgreSQL SSL connection mode (disable, require, verify-ca, verify-full).'
		},
		{
			name: 'POSTGRES_USER',
			type: 'string',
			defaultVal: 'postgres',
			description:
				'Database container username in docker-compose.yml. Serves as automatic fallback for DB_USER.'
		},
		{
			name: 'POSTGRES_PASSWORD',
			type: 'string',
			defaultVal: '(required in Docker)',
			description:
				'Database container password in docker-compose.yml. Serves as automatic fallback for DB_PASSWORD.'
		},
		{
			name: 'POSTGRES_DB',
			type: 'string',
			defaultVal: 'netra_uptime',
			description:
				'Database container database name in docker-compose.yml. Serves as automatic fallback for DB_NAME.'
		}
	];

	const networkSecurityVars: EnvVar[] = [
		{
			name: 'TRUSTED_PROXIES',
			type: 'string',
			defaultVal: '(empty)',
			description:
				'Comma-separated list of trusted upstream proxy IPs or CIDRs (e.g., 127.0.0.1,10.0.0.0/8). If empty, Gin ignores X-Forwarded-For to prevent IP spoofing.'
		},
		{
			name: 'ALLOW_REGISTRATION',
			type: 'boolean',
			defaultVal: 'true',
			description:
				'Permits public sign-ups on /api/v1/auth/register. When set to false, sign-up is disabled except for the very first user (user count == 0), ensuring initial installation succeeds.'
		},
		{
			name: 'AUTH_RATE_LIMIT',
			type: 'integer',
			defaultVal: '60',
			description:
				'Maximum allowed requests per minute per IP on authentication routes (login, register, logout, password change).'
		},
		{
			name: 'ALLOW_PRIVATE_NETWORK_MONITORING',
			type: 'boolean',
			defaultVal: 'false',
			description:
				'When false, SSRF protection blocks monitors and webhooks from reaching loopback (127.0.0.1, localhost), RFC 1918 subnets (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), and cloud metadata (169.254.169.254). Automatically defaults to true when running in SQLite mode with a loopback bind (127.0.0.1 / localhost) for out-of-the-box homelab/LAN monitoring, and defaults to false for Docker, PostgreSQL, or 0.0.0.0 network binds.'
		}
	];

	const quotaVars: EnvVar[] = [
		{
			name: 'MAX_MONITORS_PER_ORG',
			type: 'integer',
			defaultVal: '200',
			description:
				'Maximum number of monitors allowed per organization (0 = unlimited). Legacy fallback: SELFHOSTED_MAX_MONITORS.'
		},
		{
			name: 'MAX_STATUS_PAGES_PER_ORG',
			type: 'integer',
			defaultVal: '10',
			description:
				'Maximum number of public and internal status pages allowed per organization (0 = unlimited).'
		},
		{
			name: 'MAX_ORGS_PER_USER',
			type: 'integer',
			defaultVal: '10',
			description:
				'Maximum organizations an individual user account can create (0 = unlimited). Legacy fallback: SELFHOSTED_MAX_ORGS.'
		},
		{
			name: 'MAX_MEMBERS_PER_ORG',
			type: 'integer',
			defaultVal: '100',
			description:
				'Maximum members and pending invites allowed per organization (0 = unlimited). Legacy fallback: SELFHOSTED_MAX_MEMBERS.'
		},
		{
			name: 'MAX_ASSIGNEES_PER_MONITOR',
			type: 'integer',
			defaultVal: '50',
			description:
				'Maximum Person-in-Charge (PIC) user assignments allowed per monitor. Legacy fallback: SELFHOSTED_MAX_PIC.'
		},
		{
			name: 'MIN_MONITOR_INTERVAL_SECONDS',
			type: 'integer',
			defaultVal: '30',
			description:
				'Minimum check interval in seconds allowed on monitor creation or update (hard floor: 30s). Legacy fallback: SELFHOSTED_MIN_INTERVAL.'
		},
		{
			name: 'DEFAULT_MONITOR_INTERVAL_SECONDS',
			type: 'integer',
			defaultVal: '60',
			description:
				'Default check interval in seconds assigned when interval_seconds is omitted during monitor creation.'
		},
		{
			name: 'RECENT_CHECKS_LIMIT',
			type: 'integer',
			defaultVal: '60',
			description:
				'Number of recent check history pings returned per monitor in UI telemetry payloads (clamped between 1 and 500).'
		},
		{
			name: 'SELFHOSTED_MAX_TIMEOUT',
			type: 'integer',
			defaultVal: '30',
			description:
				'Maximum check timeout ceiling in seconds. The monitor API enforces a maximum timeout limit of 30 seconds.'
		}
	];

	const smtpVars: EnvVar[] = [
		{
			name: 'SMTP_HOST',
			type: 'string',
			defaultVal: 'smtp.gmail.com',
			description: 'Outbound SMTP mail server hostname.'
		},
		{
			name: 'SMTP_PORT',
			type: 'integer',
			defaultVal: '587',
			description: 'Outbound SMTP port (587 for STARTTLS, 465 for implicit TLS).'
		},
		{
			name: 'SMTP_EMAIL',
			type: 'string',
			defaultVal: '(empty)',
			description:
				'Sender email address and SMTP username. When empty in development mode, generated emails are printed to stdout.'
		},
		{
			name: 'SMTP_PASSWORD',
			type: 'string',
			defaultVal: '(empty)',
			description: 'SMTP authentication password or 16-character dedicated Google App Password.'
		}
	];

	const sections = [
		{
			id: 'env-app-core',
			title: 'Application Core & Server',
			description:
				'Core application runtime settings controlling environment mode, listening port, and CORS origins.',
			vars: appCoreVars
		},
		{
			id: 'env-security',
			title: 'Tokens & Secrets',
			description:
				'Cryptographic signing secrets and token lifetime limits for authenticated sessions.',
			vars: securityVars
		},
		{
			id: 'env-database',
			title: 'Database (SQLite & PostgreSQL)',
			description:
				'Dual-driver database persistence. Netra Uptime automatically selects SQLite (netra.db) or PostgreSQL depending on DB_HOST.',
			vars: databaseVars
		},
		{
			id: 'env-network-security',
			title: 'Registration, Rate Limits & SSRF',
			description:
				'Security policies for reverse proxy headers, registration availability, authentication throttling, and outbound network boundaries.',
			vars: networkSecurityVars
		},
		{
			id: 'env-quotas',
			title: 'Operational Quotas & Limits',
			description:
				'Organization resource limits, check interval constraints, and telemetry history sizing. Supports modern names with legacy SELFHOSTED_* aliases.',
			vars: quotaVars
		},
		{
			id: 'env-smtp',
			title: 'Email (SMTP)',
			description:
				'Outbound email delivery settings for user invitations, password resets, and incident escalation notifications.',
			vars: smtpVars
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
							<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Type</th>
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
								<td class="px-4 py-3 font-mono text-xs whitespace-nowrap text-zinc-400">
									{v.type}
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
