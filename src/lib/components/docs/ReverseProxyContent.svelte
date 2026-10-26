<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const nginxConfig = `server {
    listen 80;
    server_name uptime.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name uptime.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/uptime.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/uptime.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:27346;
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

	const caddyConfig = `uptime.yourdomain.com {
    reverse_proxy 127.0.0.1:27346 {
        # Caddy automatically handles WebSocket upgrade headers
        # and issues managed Let's Encrypt certificates
        header_up Host {host}
        header_up X-Real-IP {remote_host}
    }
}`;

	const envExample = `ALLOWED_ORIGIN=https://uptime.yourdomain.com
PUBLIC_API_URL=https://uptime.yourdomain.com/api/v1`;
</script>

<div class="flex flex-col gap-12">
	<!-- Why a Reverse Proxy? -->
	<section id="rp-overview" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Why a Reverse Proxy?</h2>
		<p class="text-sm leading-7 text-zinc-400">
			While Netra Uptime serves HTTP directly on port 27346, deploying a production reverse proxy
			such as Nginx, Caddy, or Traefik provides essential security and operational capabilities:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">TLS / SSL Termination</strong> — Offload cryptographic
				handshakes and automate certificate renewal using ACME / Let's Encrypt.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Custom Domains & Ports</strong> — Expose your instance
				on standard ports 80 and 443 without binding privileged ports directly to the container.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Header & Client IP Fidelity</strong> — Enforce HTTP
				Strict Transport Security (HSTS) and forward client IP headers accurately for rate limiting.
			</li>
		</ul>
	</section>

	<!-- Nginx Configuration -->
	<section id="rp-nginx" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Nginx Configuration</h2>
		<p class="text-sm leading-7 text-zinc-400">
			The following configuration proxies requests to the Netra Uptime container while mapping
			WebSocket connection upgrade headers:
		</p>
		<CodeBlock code={nginxConfig} language="nginx" id="nginx-config" />
	</section>

	<!-- Caddy Configuration -->
	<section id="rp-caddy" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Caddy Configuration</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Caddy provides automatic HTTPS certification and native WebSocket proxying with minimal
			configuration:
		</p>
		<CodeBlock code={caddyConfig} language="caddyfile" id="caddy-config" />
	</section>

	<!-- WebSocket Headers -->
	<section id="rp-websocket" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">WebSocket Headers</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Netra Uptime uses a bidirectional Gorilla WebSocket connection at
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>/api/v1/ws</code
			> for real-time dashboard updates. Ensure your proxy forwards these HTTP/1.1 headers:
		</p>
		<div class="overflow-x-auto rounded-lg border border-zinc-800">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-zinc-800 bg-[#141416]">
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Header</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Required Value</th>
						<th class="px-4 py-3 font-mono text-xs font-medium text-zinc-300">Purpose</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-800/60 bg-transparent">
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">Upgrade</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">$http_upgrade (websocket)</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Instructs backend to switch from HTTP/1.1 to WebSocket protocol</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">Connection</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">upgrade</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Specifies connection hop-by-hop upgrade requirement</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3 font-mono text-xs text-[#4edea3]">X-Forwarded-For</td>
						<td class="px-4 py-3 font-mono text-xs text-zinc-300">$remote_addr</td>
						<td class="px-4 py-3 text-sm text-zinc-400"
							>Preserves true client IP for Redis auth rate limiters</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Cloudflare SSL & Proxy -->
	<section id="rp-cloudflare" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Cloudflare SSL & Proxy</h2>
		<p class="text-sm leading-7 text-zinc-400">
			If using Cloudflare proxy (orange cloud), configure the following settings in your Cloudflare
			dashboard:
		</p>
		<ul class="ml-5 flex list-disc flex-col gap-2 text-sm leading-7 text-zinc-400">
			<li>
				<strong class="font-medium text-zinc-200">SSL/TLS Encryption Mode</strong> — Set to
				<strong class="font-medium text-zinc-200">Full (Strict)</strong>. Avoid Flexible mode to
				prevent redirect loops.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">WebSockets</strong> — Navigate to
				<strong class="font-medium text-zinc-200">Network</strong> settings and verify that
				WebSockets are toggled <strong class="font-medium text-zinc-200">On</strong>.
			</li>
			<li>
				<strong class="font-medium text-zinc-200">Update .env</strong> — Ensure
				<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
					>ALLOWED_ORIGIN</code
				> matches your public HTTPS domain to prevent CORS rejections:
			</li>
		</ul>
		<CodeBlock code={envExample} language="env" id="cloudflare-env" />
	</section>
</div>
