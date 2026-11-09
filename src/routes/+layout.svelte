<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/Logo.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:site_name" content="Netra Uptime" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://netrauptime.dev/og-image.png" />
	<meta property="og:image:secure_url" content="https://netrauptime.dev/og-image.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="Netra Uptime - Self-hosted uptime monitoring and status pages"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://netrauptime.dev/og-image.png" />
	<meta
		name="twitter:image:alt"
		content="Netra Uptime - Self-hosted uptime monitoring and status pages"
	/>
</svelte:head>
{@render children()}
