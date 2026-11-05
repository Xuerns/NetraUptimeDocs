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
      - name: Verify Monitor Health via Public API
        env:
          NETRA_UPTIME_URL: \${{ secrets.NETRA_UPTIME_BASE_URL }}
          NETRA_UPTIME_KEY: \${{ secrets.NETRA_UPTIME_API_KEY }} # nuk_... API key
          MONITOR_ID: \${{ secrets.NETRA_UPTIME_MONITOR_ID }}
        run: |
          echo "Querying monitor health for $MONITOR_ID..."
          response=$(curl -s -f -X GET \\
            "$NETRA_UPTIME_URL/api/v1/public/monitors/$MONITOR_ID" \\
            -H "Authorization: Bearer $NETRA_UPTIME_KEY")

          status=$(echo "$response" | jq -r '.data.status')
          echo "Monitor status: $status"

          if [ "$status" != "up" ]; then
            echo "Monitor is not operational (status: $status)!"
            exit 1
          fi

          echo "Deployment verified healthy."`;

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
      echo "Triggering immediate monitor check..."
      curl -f -s -X POST \\
        "$NETRA_UPTIME_BASE_URL/api/v1/organization/$NETRA_UPTIME_ORG_ID/monitors/$NETRA_UPTIME_MONITOR_ID/check" \\
        --cookie "access_token=$NETRA_UPTIME_AUTH_TOKEN"
  only:
    - main`;

	const smokeTestBash = `#!/usr/bin/env bash
set -e

# Usage: ./smoke-test.sh nuk_5f7a8b9c...
NETRA_UPTIME_URL="http://localhost:27346"
API_KEY="\${1:-$NETRA_UPTIME_API_KEY}"

if [ -z "$API_KEY" ]; then
  echo "Error: Netra Uptime API key (nuk_...) required."
  exit 1
fi

echo "Querying all active monitors status..."
curl -s -X GET "$NETRA_UPTIME_URL/api/v1/public/monitors" \\
  -H "Authorization: Bearer $API_KEY" | jq '.data[] | {name: .name, status: .status, response_time: .response_time}'`;
</script>

<div class="flex flex-col gap-12">
	<!-- GitHub Actions -->
	<section id="cicd-github" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">GitHub Actions</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Integrate Netra Uptime into your GitHub Actions release workflows to verify endpoint health as
			soon as your deployment completes. Generate a scoped API key with prefix
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]">nuk_</code
			>
			and store it in repository secrets (<code
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
			Add an on-demand check verification step into your
			<code class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-[#4edea3]"
				>.gitlab-ci.yml</code
			> pipeline to immediately trigger worker checks via the organization check endpoint:
		</p>
		<CodeBlock code={gitlabCiYaml} language="yaml" id="gitlab-ci" />
	</section>

	<!-- Example Workflows -->
	<section id="cicd-examples" class="flex scroll-mt-24 flex-col gap-4">
		<h2 class="text-xl font-semibold tracking-tight text-zinc-100">Example Workflows</h2>
		<p class="text-sm leading-7 text-zinc-400">
			Query all organization monitors for real-time operational status and response times with <code
				class="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-200">jq</code
			> in post-deployment smoke test scripts:
		</p>
		<CodeBlock code={smokeTestBash} language="bash" id="smoke-test" />
	</section>
</div>
