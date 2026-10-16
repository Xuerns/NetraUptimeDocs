<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const githubActionsYaml = `name: Post-Deploy Verification

on:
  deployment_status:
  workflow_dispatch:

jobs:
  verify-pulsewatch:
    if: github.event_name == 'workflow_dispatch' || github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Instant Netra Uptime Health Check
        env:
          PULSEWATCH_URL: \${{ secrets.PULSEWATCH_BASE_URL }}
          PULSEWATCH_KEY: \${{ secrets.PULSEWATCH_API_KEY }}
          MONITOR_ID: \${{ secrets.PULSEWATCH_MONITOR_ID }}
        run: |
          echo "Triggering on-demand check for monitor $MONITOR_ID..."
          response=$(curl -s -w "\\n%{http_code}" -X POST \\
            "$PULSEWATCH_URL/api/v1/public/monitors/$MONITOR_ID/check" \\
            -H "Authorization: Bearer $PULSEWATCH_KEY")

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
        "$PULSEWATCH_BASE_URL/api/v1/public/monitors/$PULSEWATCH_MONITOR_ID/check" \\
        -H "Authorization: Bearer $PULSEWATCH_API_KEY"
  only:
    - main`;

	const smokeTestBash = `#!/usr/bin/env bash
set -e

PULSEWATCH_URL="https://status.yourdomain.com"
API_KEY="$1"

echo "Querying all active monitors status..."
curl -s -X GET "$PULSEWATCH_URL/api/v1/public/monitors" \\
  -H "Authorization: Bearer $API_KEY" | jq '.data[] | {name: .name, status: .status, latency: .last_latency_ms}'`;
</script>

<div class="flex flex-col gap-16">
	<!-- GitHub Actions -->
	<section id="cicd-github" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">GitHub Actions</h2>
		<p class="max-w-3xl text-base leading-relaxed font-light text-[#bbcabf]">
			Integrate Netra Uptime into your GitHub Actions release workflows to trigger immediate on-demand
			health verification as soon as your deployment completes.
		</p>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Store your API key in repository secrets (<code class="font-mono text-xs text-[#4edea3]"
				>Settings &rarr; Secrets and variables &rarr; Actions</code
			>) as <code class="font-mono text-xs text-[#4edea3]">PULSEWATCH_API_KEY</code>:
		</p>
		<CodeBlock code={githubActionsYaml} language="yaml" id="github-actions" />
	</section>

	<!-- GitLab CI -->
	<section id="cicd-gitlab" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">GitLab CI</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Add a verification job into your <code class="font-mono text-xs text-[#4edea3]"
				>.gitlab-ci.yml</code
			> pipeline to ensure new releases pass health checks:
		</p>
		<CodeBlock code={gitlabCiYaml} language="yaml" id="gitlab-ci" />
	</section>

	<!-- Example Workflows -->
	<section id="cicd-examples" class="flex scroll-mt-24 flex-col gap-6">
		<h2 class="font-display text-3xl font-bold tracking-tight text-[#e5e2e3]">Example Workflows</h2>
		<p class="max-w-3xl text-sm leading-relaxed text-[#bbcabf]">
			Automate fleet-wide sanity audits and smoke test pipelines across your microservices:
		</p>
		<div class="flex flex-col gap-4">
			<div>
				<span class="mb-1 block font-mono text-xs text-[#bbcabf]"
					>Query all monitors status and latency with jq</span
				>
				<CodeBlock code={smokeTestBash} language="bash" id="smoke-test" />
			</div>
		</div>
	</section>
</div>
