export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Param {
	name: string;
	type: string;
	description: string;
	required: boolean;
}

export interface CodeExample {
	language: string;
	label: string;
	code: string;
	responseStatus?: string;
	responseCode: string;
}

export interface EndpointSection {
	id: string;
	method: HttpMethod;
	path: string;
	title: string;
	description: string;
	params?: Param[];
	requestBody?: Param[];
	codeExample: CodeExample;
}

export interface ApiGroup {
	id: string;
	label: string;
	endpoints: EndpointSection[];
}

export const apiGroups: ApiGroup[] = [
	{
		id: 'auth',
		label: 'Auth',
		endpoints: [
			{
				id: 'auth-register',
				method: 'POST',
				path: '/auth/register',
				title: 'Register a new account',
				description:
					'Create a new user account. The first account created automatically becomes the Organization Owner.',
				requestBody: [
					{ name: 'email', type: 'string', description: 'User email address.', required: true },
					{
						name: 'password',
						type: 'string',
						description: 'Password (min 8 characters).',
						required: true
					},
					{
						name: 'name',
						type: 'string',
						description: 'Display name for the user.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "usr_9x8kj23",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2023-11-01T14:32:00Z"
}`
				}
			},
			{
				id: 'auth-login',
				method: 'POST',
				path: '/auth/login',
				title: 'Log in',
				description: 'Authenticate a user and receive an access token and refresh token.',
				requestBody: [
					{ name: 'email', type: 'string', description: 'User email address.', required: true },
					{ name: 'password', type: 'string', description: 'User password.', required: true }
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'`,
					responseStatus: '200 OK',
					responseCode: `{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 900
}`
				}
			},
			{
				id: 'auth-logout',
				method: 'POST',
				path: '/auth/logout',
				title: 'Log out',
				description: 'Revoke the current access token and end the session.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/auth/logout \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "message": "Logged out successfully"
}`
				}
			},
			{
				id: 'auth-refresh',
				method: 'POST',
				path: '/auth/refresh',
				title: 'Refresh access token',
				description: 'Obtain a new access token using a valid refresh token.',
				requestBody: [
					{
						name: 'refresh_token',
						type: 'string',
						description: 'The refresh token from login.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
  }'`,
					responseStatus: '200 OK',
					responseCode: `{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 900
}`
				}
			},
			{
				id: 'auth-profile',
				method: 'GET',
				path: '/auth/profile',
				title: 'Get user profile',
				description: "View the currently logged-in user's profile information.",
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/auth/profile \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "usr_9x8kj23",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2023-11-01T14:32:00Z"
}`
				}
			}
		]
	},
	{
		id: 'organization',
		label: 'Organization',
		endpoints: [
			{
				id: 'org-list',
				method: 'GET',
				path: '/organization/all',
				title: 'List all organizations',
				description: 'List all organizations the current user belongs to.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/all \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "organizations": [
    {
      "id": "org_49x8jkl",
      "name": "My Team",
      "role": "owner",
      "member_count": 5
    }
  ]
}`
				}
			},
			{
				id: 'org-create',
				method: 'POST',
				path: '/organization/create',
				title: 'Create organization',
				description: 'Create a new organization. The creator becomes the Owner.',
				requestBody: [
					{ name: 'name', type: 'string', description: 'Organization name.', required: true }
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/create \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Team"
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "org_49x8jkl",
  "name": "My Team",
  "role": "owner",
  "created_at": "2023-11-01T14:32:00Z"
}`
				}
			},
			{
				id: 'org-members',
				method: 'GET',
				path: '/organization/:orgId/members',
				title: 'List organization members',
				description: 'List all members of an organization with their roles.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/members \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "members": [
    {
      "id": "usr_9x8kj23",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "owner"
    }
  ]
}`
				}
			},
			{
				id: 'org-invite',
				method: 'POST',
				path: '/organization/:orgId/invite',
				title: 'Invite a member',
				description: 'Invite a new member to the organization. Only Owner can invite.',
				requestBody: [
					{
						name: 'email',
						type: 'string',
						description: 'Email address to invite.',
						required: true
					},
					{
						name: 'role',
						type: 'string',
						description: 'Role to assign: admin or member.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/invite \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "newuser@example.com",
    "role": "member"
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "message": "Invitation sent successfully",
  "invitation_id": "inv_abc123"
}`
				}
			},
			{
				id: 'org-update',
				method: 'PUT',
				path: '/organization/:orgId/update',
				title: 'Update organization',
				description: 'Update organization name or info. Only Owner can update.',
				requestBody: [
					{ name: 'name', type: 'string', description: 'New organization name.', required: false }
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT https://api.pulsewatch.com/v1/organization/org_49x8jkl/update \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Updated Team Name"
  }'`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "org_49x8jkl",
  "name": "Updated Team Name"
}`
				}
			}
		]
	},
	{
		id: 'monitors',
		label: 'Monitors',
		endpoints: [
			{
				id: 'monitors-create',
				method: 'POST',
				path: '/organization/:orgId/monitors',
				title: 'Create a new monitor',
				description:
					'Creates a new synthetic monitor to continuously check the health of an endpoint or service.',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'A descriptive name for the monitor. (Max 100 characters)',
						required: true
					},
					{
						name: 'type',
						type: 'string',
						description: 'Type of monitor: http, tcp, ping, or dns.',
						required: true
					},
					{
						name: 'url',
						type: 'string',
						description: 'The target URL, hostname, or IP address to monitor.',
						required: true
					},
					{
						name: 'interval',
						type: 'integer',
						description: 'Check interval in seconds. Minimum 30s. Default is 60.',
						required: false
					},
					{
						name: 'locations',
						type: 'array<string>',
						description: 'Array of region codes to run checks from.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/monitors \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API Health",
    "type": "http",
    "url": "https://api.example.com/health",
    "interval": 60,
    "locations": ["us-east", "eu-west"],
    "headers": {
      "Authorization": "Bearer xxxx"
    }
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "mon_w9r2jklasdf82",
  "name": "Production API Health",
  "type": "http",
  "url": "https://api.example.com/health",
  "status": "pending",
  "created_at": "2023-11-01T14:32:00Z",
  "organization_id": "org_49x8jkl"
}`
				}
			},
			{
				id: 'monitors-list',
				method: 'GET',
				path: '/organization/:orgId/monitors',
				title: 'List all monitors',
				description: 'List all monitors within an organization with their current status.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/monitors \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "monitors": [
    {
      "id": "mon_w9r2jklasdf82",
      "name": "Production API Health",
      "type": "http",
      "url": "https://api.example.com/health",
      "status": "up",
      "interval": 60,
      "last_check": "2023-11-01T14:35:00Z"
    }
  ]
}`
				}
			},
			{
				id: 'monitors-get',
				method: 'GET',
				path: '/organization/:orgId/monitors/:monitorId',
				title: 'Get monitor detail',
				description:
					'Retrieve detailed information about a specific monitor including current status and configuration.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/monitors/mon_w9r2jklasdf82 \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "mon_w9r2jklasdf82",
  "name": "Production API Health",
  "type": "http",
  "url": "https://api.example.com/health",
  "status": "up",
  "interval": 60,
  "locations": ["us-east", "eu-west"],
  "created_at": "2023-11-01T14:32:00Z",
  "last_check": "2023-11-01T14:35:00Z"
}`
				}
			},
			{
				id: 'monitors-update',
				method: 'PUT',
				path: '/organization/:orgId/monitors/:monitorId',
				title: 'Update monitor',
				description:
					'Update monitor configuration including name, URL, interval, and other settings.',
				requestBody: [
					{ name: 'name', type: 'string', description: 'Updated monitor name.', required: false },
					{ name: 'url', type: 'string', description: 'Updated target URL.', required: false },
					{
						name: 'interval',
						type: 'integer',
						description: 'Updated check interval in seconds.',
						required: false
					},
					{
						name: 'active',
						type: 'boolean',
						description: 'Enable or disable the monitor.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT https://api.pulsewatch.com/v1/organization/org_49x8jkl/monitors/mon_w9r2jklasdf82 \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "interval": 30,
    "active": true
  }'`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "mon_w9r2jklasdf82",
  "name": "Production API Health",
  "interval": 30,
  "active": true
}`
				}
			},
			{
				id: 'monitors-delete',
				method: 'DELETE',
				path: '/organization/:orgId/monitors/:monitorId',
				title: 'Delete monitor',
				description: 'Permanently delete a monitor and its associated data.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE https://api.pulsewatch.com/v1/organization/org_49x8jkl/monitors/mon_w9r2jklasdf82 \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "message": "Monitor deleted successfully"
}`
				}
			},
			{
				id: 'monitors-all',
				method: 'GET',
				path: '/monitors',
				title: 'All monitors across organizations',
				description: 'List all monitors across all organizations the user belongs to.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/monitors \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "monitors": [
    {
      "id": "mon_w9r2jklasdf82",
      "name": "Production API Health",
      "status": "up",
      "organization_id": "org_49x8jkl"
    }
  ]
}`
				}
			}
		]
	},
	{
		id: 'incidents',
		label: 'Incidents',
		endpoints: [
			{
				id: 'incidents-list',
				method: 'GET',
				path: '/organization/:orgId/incident',
				title: 'List all incidents',
				description: 'List all incidents for the organization, including ongoing and resolved.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/incident \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "incidents": [
    {
      "id": "inc_xyz789",
      "monitor_id": "mon_w9r2jklasdf82",
      "monitor_name": "Production API Health",
      "status": "resolved",
      "started_at": "2023-11-01T10:00:00Z",
      "resolved_at": "2023-11-01T10:15:00Z"
    }
  ]
}`
				}
			},
			{
				id: 'incidents-get',
				method: 'GET',
				path: '/organization/:orgId/incident/:incidentId',
				title: 'Get incident detail',
				description:
					'Retrieve detailed information about a specific incident including timeline and notes.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/incident/inc_xyz789 \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "inc_xyz789",
  "monitor_id": "mon_w9r2jklasdf82",
  "monitor_name": "Production API Health",
  "status": "resolved",
  "started_at": "2023-11-01T10:00:00Z",
  "resolved_at": "2023-11-01T10:15:00Z",
  "downtime_seconds": 900,
  "notes": []
}`
				}
			},
			{
				id: 'incidents-note',
				method: 'POST',
				path: '/organization/:orgId/incident/:incidentId',
				title: 'Add incident note',
				description: 'Add a note or status update to an ongoing incident.',
				requestBody: [
					{ name: 'content', type: 'string', description: 'The note content.', required: true }
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/incident/inc_xyz789 \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Investigating the root cause. Database connection pool exhausted."
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "note_abc123",
  "content": "Investigating the root cause...",
  "author": "John Doe",
  "created_at": "2023-11-01T10:05:00Z"
}`
				}
			},
			{
				id: 'incidents-join',
				method: 'POST',
				path: '/organization/:orgId/incident/:incidentId/join',
				title: 'Join as assignee',
				description: 'Join an incident as an assignee for coordination.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/incident/inc_xyz789/join \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "message": "Joined incident successfully",
  "assignee": {
    "id": "usr_9x8kj23",
    "name": "John Doe"
  }
}`
				}
			}
		]
	},
	{
		id: 'statuspages',
		label: 'Status Pages',
		endpoints: [
			{
				id: 'statuspage-create',
				method: 'POST',
				path: '/organization/:orgId/statuspage',
				title: 'Create status page',
				description: 'Create a new public status page to share with your users.',
				requestBody: [
					{ name: 'name', type: 'string', description: 'Status page name.', required: true },
					{
						name: 'subdomain',
						type: 'string',
						description: 'Unique subdomain for the status page URL.',
						required: true
					},
					{
						name: 'monitors',
						type: 'array<string>',
						description: 'Array of monitor IDs to display.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/statuspage \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production Status",
    "subdomain": "status",
    "monitors": ["mon_w9r2jklasdf82"]
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "sp_abc123",
  "name": "Production Status",
  "subdomain": "status",
  "url": "https://yourdomain.com/status/status",
  "created_at": "2023-11-01T14:32:00Z"
}`
				}
			},
			{
				id: 'statuspage-list',
				method: 'GET',
				path: '/organization/:orgId/statuspage',
				title: 'List status pages',
				description: 'List all status pages for the organization.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/statuspage \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "status_pages": [
    {
      "id": "sp_abc123",
      "name": "Production Status",
      "subdomain": "status"
    }
  ]
}`
				}
			},
			{
				id: 'statuspage-get',
				method: 'GET',
				path: '/organization/:orgId/statuspage/:statusPageId',
				title: 'Get status page detail',
				description: 'Retrieve detailed information about a specific status page.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/statuspage/sp_abc123 \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "sp_abc123",
  "name": "Production Status",
  "subdomain": "status",
  "monitors": [
    {
      "id": "mon_w9r2jklasdf82",
      "name": "Production API Health",
      "status": "up"
    }
  ]
}`
				}
			},
			{
				id: 'statuspage-update',
				method: 'PUT',
				path: '/organization/:orgId/statuspage/:statusPageId',
				title: 'Update status page',
				description:
					'Update status page configuration including name, subdomain, and displayed monitors.',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Updated status page name.',
						required: false
					},
					{
						name: 'monitors',
						type: 'array<string>',
						description: 'Updated list of monitor IDs.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT https://api.pulsewatch.com/v1/organization/org_49x8jkl/statuspage/sp_abc123 \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Updated Status Page"
  }'`,
					responseStatus: '200 OK',
					responseCode: `{
  "id": "sp_abc123",
  "name": "Updated Status Page"
}`
				}
			},
			{
				id: 'statuspage-delete',
				method: 'DELETE',
				path: '/organization/:orgId/statuspage/:statusPageId',
				title: 'Delete status page',
				description: 'Permanently delete a status page.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE https://api.pulsewatch.com/v1/organization/org_49x8jkl/statuspage/sp_abc123 \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "message": "Status page deleted successfully"
}`
				}
			},
			{
				id: 'statuspage-public',
				method: 'GET',
				path: '/public/statuspage/:subdomain',
				title: 'Public status page access',
				description:
					'Access a status page publicly without login. This endpoint requires no authentication.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/public/statuspage/status`,
					responseStatus: '200 OK',
					responseCode: `{
  "name": "Production Status",
  "monitors": [
    {
      "id": "mon_w9r2jklasdf82",
      "name": "Production API Health",
      "status": "up",
      "uptime_90d": 99.98
    }
  ],
  "incidents": []
}`
				}
			}
		]
	},
	{
		id: 'notifications',
		label: 'Notifications',
		endpoints: [
			{
				id: 'notif-channels-list',
				method: 'GET',
				path: '/organization/:orgId/notifications/channels',
				title: 'List notification channels',
				description: 'List all configured notification channels for the organization.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/notifications/channels \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "channels": [
    {
      "id": "ch_slack1",
      "name": "Slack Alerts",
      "type": "slack",
      "active": true
    }
  ]
}`
				}
			},
			{
				id: 'notif-channel-create',
				method: 'POST',
				path: '/organization/:orgId/notifications/channels',
				title: 'Create notification channel',
				description:
					'Create a new notification channel (Email, Slack, Discord, or Custom Webhook).',
				requestBody: [
					{ name: 'name', type: 'string', description: 'Channel name.', required: true },
					{
						name: 'type',
						type: 'string',
						description: 'Channel type: email, slack, discord, or webhook.',
						required: true
					},
					{
						name: 'config',
						type: 'object',
						description: 'Channel-specific configuration (webhook URL, email, etc.).',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/notifications/channels \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Slack Alerts",
    "type": "slack",
    "config": {
      "webhook_url": "https://hooks.slack.com/services/T00/B00/xxx"
    }
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "ch_slack1",
  "name": "Slack Alerts",
  "type": "slack",
  "active": true,
  "created_at": "2023-11-01T14:32:00Z"
}`
				}
			},
			{
				id: 'notif-logs',
				method: 'GET',
				path: '/organization/:orgId/notifications/logs',
				title: 'Notification delivery logs',
				description: 'View logs of all sent notifications for audit and debugging.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/notifications/logs \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "logs": [
    {
      "id": "log_abc123",
      "channel": "Slack Alerts",
      "monitor": "Production API Health",
      "status": "sent",
      "sent_at": "2023-11-01T10:00:05Z"
    }
  ]
}`
				}
			}
		]
	},
	{
		id: 'apikeys',
		label: 'API Keys',
		endpoints: [
			{
				id: 'apikey-list',
				method: 'GET',
				path: '/organization/:orgId/api-keys',
				title: 'List API keys',
				description: 'List all API keys for the organization.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/api-keys \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "api_keys": [
    {
      "id": "key_abc123",
      "name": "CI/CD Integration",
      "permissions": ["read", "write"],
      "created_at": "2023-11-01T14:32:00Z",
      "last_used": "2023-11-01T14:35:00Z"
    }
  ]
}`
				}
			},
			{
				id: 'apikey-create',
				method: 'POST',
				path: '/organization/:orgId/api-keys',
				title: 'Create API key',
				description:
					'Create a new API key. Only Owner and Admin can create keys. The key is shown only once.',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Descriptive name for the key.',
						required: true
					},
					{
						name: 'permissions',
						type: 'array<string>',
						description: 'Permissions: read, write.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/organization/org_49x8jkl/api-keys \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "CI/CD Integration",
    "permissions": ["read", "write"]
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "key_abc123",
  "name": "CI/CD Integration",
  "key": "pw_live_xxxxxxxxxxxxxxxx",
  "permissions": ["read", "write"],
  "created_at": "2023-11-01T14:32:00Z"
}`
				}
			},
			{
				id: 'apikey-delete',
				method: 'DELETE',
				path: '/organization/:orgId/api-keys/:keyId',
				title: 'Revoke API key',
				description: 'Permanently revoke an API key. This action cannot be undone.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE https://api.pulsewatch.com/v1/organization/org_49x8jkl/api-keys/key_abc123 \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "message": "API key revoked successfully"
}`
				}
			}
		]
	},
	{
		id: 'auditlog',
		label: 'Audit Log',
		endpoints: [
			{
				id: 'audit-list',
				method: 'GET',
				path: '/organization/:orgId/audit-logs',
				title: 'Organization audit log',
				description: 'View a record of every significant action within the organization.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/organization/org_49x8jkl/audit-logs \\
  -H "Authorization: Bearer <access_token>"`,
					responseStatus: '200 OK',
					responseCode: `{
  "logs": [
    {
      "id": "audit_abc123",
      "action": "monitor.created",
      "actor": "John Doe",
      "details": "Created monitor Production API Health",
      "timestamp": "2023-11-01T14:32:00Z"
    }
  ]
}`
				}
			}
		]
	},
	{
		id: 'publicapi',
		label: 'Public API',
		endpoints: [
			{
				id: 'public-monitors-list',
				method: 'GET',
				path: '/public/monitors',
				title: 'List monitors (API Key)',
				description: 'List all monitors using API Key authentication. Requires read permission.',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET https://api.pulsewatch.com/v1/public/monitors \\
  -H "X-API-Key: pw_live_xxxxxxxxxxxxxxxx"`,
					responseStatus: '200 OK',
					responseCode: `{
  "monitors": [
    {
      "id": "mon_w9r2jklasdf82",
      "name": "Production API Health",
      "status": "up"
    }
  ]
}`
				}
			},
			{
				id: 'public-monitors-create',
				method: 'POST',
				path: '/public/monitors',
				title: 'Create monitor (API Key)',
				description:
					'Create a new monitor using API Key authentication. Requires write permission.',
				requestBody: [
					{ name: 'name', type: 'string', description: 'Monitor name.', required: true },
					{
						name: 'type',
						type: 'string',
						description: 'Monitor type: http, tcp, ping, or dns.',
						required: true
					},
					{ name: 'url', type: 'string', description: 'Target URL or hostname.', required: true }
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST https://api.pulsewatch.com/v1/public/monitors \\
  -H "X-API-Key: pw_live_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "New Monitor",
    "type": "http",
    "url": "https://api.example.com/health"
  }'`,
					responseStatus: '201 Created',
					responseCode: `{
  "id": "mon_new123",
  "name": "New Monitor",
  "status": "pending"
}`
				}
			}
		]
	}
];
