<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const githubActionsYaml = `name: Post-Deploy Verification

on:
  deployment_status:
  workflow_dispatch:

jobs:
  verify-netra-uptime:
    if: github.event_name == 'workflow_dispatch' || github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Instant Netra Uptime Health Check
        env:
          NETRA_UPTIME_URL: \${{ secrets.NETRA_UPTIME_BASE_URL }}
          NETRA_UPTIME_KEY: \${{ secrets.NETRA_UPTIME_API_KEY }}
          MONITOR_ID: \${{ secrets.NETRA_UPTIME_MONITOR_ID }}
        run: |
          echo "Triggering on-demand check for monitor $MONITOR_ID..."
          response=$(curl -s -w "\\n%{http_code}" -X POST \\
            "$NETRA_UPTIME_URL/api/v1/public/monitors/$MONITOR_ID/check" \\
            -H "Authorization: Bearer $NETRA_UPTIME_KEY")

          http_code=$(echo "$response" | tail -n1)
          body=$(echo "$response" | head -n-1)

          if [ "$http_code" -ne 200 ]; then
            echo "Health check trigger failed with HTTP $http_code"
            echo "$body"
            exit 1
          fi

          echo "Health check triggered successfully: $body"`;

	const gitlabCiYaml = `stages:
  - deploy
  - verify

verify_deployment:
  stage: verify
  image: alpine:latest
  before_script:
    - apk add --no-cache curl jq
  script:
    - |
      echo "Triggering Netra Uptime on-demand check..."
      curl -f -s -X POST \\
        "$NETRA_UPTIME_BASE_URL/api/v1/public/monitors/$NETRA_UPTIME_MONITOR_ID/check" \\
        -H "Authorization: Bearer $NETRA_UPTIME_API_KEY"
  only:
    - main`;

	const smokeTestBash = `#!/usr/bin/env bash
set -e

NETRA_UPTIME_URL="https://status.yourdomain.com"
API_KEY="$1"

echo "Querying all active monitors status..."
curl -s -X GET "$NETRA_UPTIME_URL/api/v1/public/monitors" \\
  -H "Authorization: Bearer $API_KEY" | jq '.data[] | {name: .name, status: .status, latency: .last_latency_ms}'`;
</script>

<div class="flex flex-col gap-12">
	<!-- GitHub Actions -->
	<section id="cicd-github" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">GitHub Actions</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Integrate Netra Uptime into your GitHub Actions release workflows to trigger immediate
			on-demand health verification as soon as your deployment completes. Store your API key in
			repository secrets (<code
				class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200"
				>Settings &rarr; Secrets and variables &rarr; Actions</code
			>) as
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>NETRA_UPTIME_API_KEY</code
			>:
		</p>
		<CodeBlock code={githubActionsYaml} language="yaml" id="github-actions" />
	</section>

	<!-- GitLab CI -->
	<section id="cicd-gitlab" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">GitLab CI</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Add a verification job into your
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>.gitlab-ci.yml</code
			> pipeline to ensure new releases pass health checks:
		</p>
		<CodeBlock code={gitlabCiYaml} language="yaml" id="gitlab-ci" />
	</section>

	<!-- Example Workflows -->
	<section id="cicd-examples" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Example Workflows</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Query all monitors for status and latency with <code
				class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">jq</code
			> in post-deployment smoke test scripts:
		</p>
		<CodeBlock code={smokeTestBash} language="bash" id="smoke-test" />
	</section>
</div>
