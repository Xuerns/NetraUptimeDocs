<script lang="ts">
	import { Shield, Globe, Check, Lock } from 'lucide-svelte';
	import CodeBlock from './CodeBlock.svelte';

	const nginxConfig = `server {
    listen 80;
    server_name pulsewatch.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pulsewatch.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/pulsewatch.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pulsewatch.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Host and Client IP propagation
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for persistent WebSocket telemetry
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}

# Add in http block of nginx.conf:
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}`;

	const caddyConfig = `pulsewatch.yourdomain.com {
    reverse_proxy 127.0.0.1:8080 {
        # Caddy automatically handles WebSocket upgrade headers
        # and issues managed Let's Encrypt certificates
        header_up Host {host}
        header_up X-Real-IP {remote_host}
    }
}`;

	const envExample = `ALLOWED_ORIGIN=https://pulsewatch.yourdomain.com
PUBLIC_API_URL=https://pulsewatch.yourdomain.com/api/v1`;
</script>

<div class="flex flex-col gap-16">
	<!-- Why a Reverse Proxy? -->
	<section id="rp-overview" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Why a Reverse Proxy?
		</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			While PulseWatch serves HTTP directly on port 8080, deploying a production reverse proxy such
			as Nginx, Caddy, or Traefik provides vital security and operational capabilities:
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Lock size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">TLS / SSL Termination</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Offload cryptographic handshakes and automate certificate renewal using ACME Let's
					Encrypt.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Globe size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">Custom Domains & Ports</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Expose your instance on standard ports 80/443 without binding privileged ports directly to
					the container.
				</p>
			</div>
			<div class="rounded-lg border border-white/5 bg-[#1a1d1b] p-5">
				<Shield size={20} class="mb-3 text-[#4edea3]" />
				<h3 class="font-display text-sm font-semibold text-[#e5e2e3]">DDoS & Header Control</h3>
				<p class="mt-2 text-xs leading-relaxed text-[#bbcabf]">
					Add edge protection, enforce HTTP Strict Transport Security (HSTS), and protect client IP
					fidelity.
				</p>
			</div>
		</div>
	</section>

	<!-- Nginx Configuration -->
	<section id="rp-nginx" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Nginx Configuration
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			The following configuration proxies requests to the PulseWatch container while properly
			mapping WebSocket connection upgrade headers:
		</p>
		<CodeBlock code={nginxConfig} language="nginx" id="nginx-config" />
	</section>

	<!-- Caddy Configuration -->
	<section id="rp-caddy" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Caddy Configuration
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Caddy provides automatic HTTPS certification and native WebSocket proxying with minimal
			configuration:
		</p>
		<CodeBlock code={caddyConfig} language="caddyfile" id="caddy-config" />
	</section>

	<!-- WebSocket Headers -->
	<section id="rp-websocket" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">WebSocket Headers</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			PulseWatch uses a bidirectional Gorilla WebSocket connection at <code
				class="rounded bg-[#1a1d1b] px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">/api/v1/ws</code
			> for real-time dashboard updates. Ensure your proxy forwards these required HTTP/1.1 headers:
		</p>
		<div class="overflow-x-auto rounded-lg border border-white/5">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/5 bg-[#1a1d1b]">
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Header</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Required Value</th
						>
						<th
							class="px-5 py-3 text-left font-mono text-xs font-medium tracking-wider text-[#4edea3] uppercase"
							>Purpose</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 bg-[#0e0e0f]">
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">Upgrade</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">$http_upgrade (websocket)</td>
						<td class="px-5 py-3 text-[#bbcabf]"
							>Instructs backend to switch from HTTP/1.1 to WebSocket protocol</td
						>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">Connection</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">upgrade</td>
						<td class="px-5 py-3 text-[#bbcabf]"
							>Specifies connection hop-by-hop upgrade requirement</td
						>
					</tr>
					<tr>
						<td class="px-5 py-3 font-mono text-xs text-[#e5e2e3]">X-Forwarded-For</td>
						<td class="px-5 py-3 font-mono text-xs text-[#bbcabf]">$remote_addr</td>
						<td class="px-5 py-3 text-[#bbcabf]"
							>Preserves true client IP for Redis auth rate limiters</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Cloudflare SSL & Proxy -->
	<section id="rp-cloudflare" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">
			Cloudflare SSL & Proxy
		</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			If using Cloudflare proxy (orange cloud), configure the following settings in your Cloudflare
			dashboard:
		</p>
		<ul class="flex max-w-3xl flex-col gap-3">
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">SSL/TLS Encryption Mode</strong>: Set to
					<strong class="text-[#e5e2e3]">Full (Strict)</strong>. Avoid "Flexible" mode to prevent
					redirect loops.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">WebSockets</strong>: Navigate to
					<strong class="text-[#e5e2e3]">Network</strong>
					settings and verify that WebSockets are toggled
					<strong class="text-[#e5e2e3]">On</strong>.</span
				>
			</li>
			<li class="flex gap-3 text-sm leading-relaxed text-[#bbcabf]">
				<Check size={16} class="mt-0.5 shrink-0 text-[#4edea3]" />
				<span
					><strong class="text-[#e5e2e3]">Update .env</strong>: Ensure
					<code class="font-mono text-xs text-[#4edea3]">ALLOWED_ORIGIN</code> matches your public HTTPS
					domain to prevent CORS rejections.</span
				>
			</li>
		</ul>
		<CodeBlock code={envExample} language="env" id="cloudflare-env" />
	</section>
</div>
