<script lang="ts">
	import { Copy, Check, AlertTriangle } from 'lucide-svelte';

	let copied = $state('');

	async function copyText(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copied = id;
		setTimeout(() => (copied = ''), 2000);
	}

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
			description: 'Secret key for signing JWT access tokens. Must be changed from default!'
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
</script>

<div class="flex flex-col gap-16">
	<!-- App Core -->
	<section id="env-app-core" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Application Core</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Core application settings that control the runtime behavior, ports, and CORS configuration.
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each appCoreVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Security & JWT -->
	<section id="env-security" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Security & JWT</h2>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each securityVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Database -->
	<section id="env-database" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Database (PostgreSQL)
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Netra Uptime uses PostgreSQL 16 as its primary database. The schema is automatically migrated
			on startup using GORM's AutoMigrate.
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each databaseVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Redis -->
	<section id="env-redis" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Redis Cache</h2>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each redisVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Operational Quotas -->
	<section id="env-quotas" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Operational Quotas (Self-Hosted)
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Fine-tune resource limits for your self-hosted deployment. Set <code
				class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">0</code
			> for unlimited on most quota fields.
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each quotaVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- SMTP -->
	<section id="env-smtp" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Email (SMTP)</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Configure SMTP for sending email notifications. Supports both TLS/STARTTLS (port 587) and SSL
			(port 465).
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each smtpVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Google OAuth -->
	<section id="env-oauth" class="flex flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Google OAuth</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Optional Google OAuth 2.0 integration for user login. If not configured, only email/password
			authentication will be available.
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Variable</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Default</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					{#each oauthVars as v}
						<tr>
							<td class="px-5 py-3 whitespace-nowrap">
								<button
									onclick={() => copyText(v.name, v.name)}
									class="group flex items-center gap-1.5 font-mono text-xs text-[#e5e2e3] transition-colors hover:text-[#4edea3]"
								>
									{v.name}
									{#if copied === v.name}<Check size={10} class="text-[#4edea3]" />{:else}<Copy
											size={10}
											class="opacity-0 group-hover:opacity-100"
										/>{/if}
								</button>
							</td>
							<td class="px-5 py-3 whitespace-nowrap"
								><code class="rounded bg-[#1a1d1b] px-1.5 py-0.5 text-xs text-[#bbcabf]"
									>{v.defaultVal}</code
								></td
							>
							<td class="px-5 py-3 text-[#bbcabf]">{v.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
