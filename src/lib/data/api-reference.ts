export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Param {
	name: string;
	type: string;
	description: string;
	required: boolean;
}

export interface ResponseExample {
	status: string;
	code: string;
	description?: string;
}

export interface CodeExample {
	language: string;
	label: string;
	code: string;
	responses: ResponseExample[];
}

export interface EndpointSection {
	id: string;
	method: HttpMethod;
	path: string;
	title: string;
	description: string;
	auth: string;
	rateLimit?: string;
	requestBody?: Param[];
	queryParams?: Param[];
	notes?: string[];
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
		label: 'Authentication',
		endpoints: [
			{
				id: 'auth-register',
				method: 'POST',
				path: '/auth/register',
				title: 'Register a new account',
				description: 'Create a new user account.',
				auth: 'None',
				rateLimit: '5 req/min',
				requestBody: [
					{
						name: 'email',
						type: 'string',
						description: 'Required, email format, max 50 chars.',
						required: true
					},
					{
						name: 'password',
						type: 'string',
						description: 'Required, min 8, max 50 chars.',
						required: true
					},
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 3, max 30 chars, no HTML.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "message": "string"
}`
						},
						{
							status: '400 Bad Request',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'auth-login',
				method: 'POST',
				path: '/auth/login',
				title: 'Log in',
				description: 'Authenticate a user. Sets cookies: access_token, refresh_token (httpOnly).',
				auth: 'None',
				rateLimit: '5 req/min',
				requestBody: [
					{
						name: 'email',
						type: 'string',
						description: 'Required, email format, max 50 chars.',
						required: true
					},
					{
						name: 'password',
						type: 'string',
						description: 'Required, min 8, max 50 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Login Succesfully"
}`
						},
						{
							status: '401 Unauthorized',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'auth-logout',
				method: 'POST',
				path: '/auth/logout',
				title: 'Log out',
				description: 'Clears cookies: access_token, refresh_token.',
				auth: 'None',
				rateLimit: '5 req/min',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/logout`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Logout succesfully"
}`
						}
					]
				}
			},
			{
				id: 'auth-refresh',
				method: 'POST',
				path: '/auth/refresh',
				title: 'Refresh access token',
				description:
					'Obtain a new access token using the refresh_token cookie. Sets cookie: access_token.',
				auth: 'None',
				rateLimit: '5 req/min',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/refresh \\
  --cookie "refresh_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "New access Token granted"
}`
						},
						{
							status: '401 Unauthorized',
							code: `{
  "error": "Refresh token not found"
}`
						}
					]
				}
			},
			{
				id: 'auth-forgot-password',
				method: 'POST',
				path: '/auth/forgotpassword',
				title: 'Forgot password',
				description: 'Sends a password reset link if the email is registered.',
				auth: 'None',
				rateLimit: '3 req/15 min',
				requestBody: [
					{
						name: 'email',
						type: 'string',
						description: 'Required, email format, max 50 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/forgotpassword \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "If this email is registered, a reset link has been sent."
}`
						},
						{
							status: '500 Internal Server Error',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'auth-reset-password',
				method: 'PATCH',
				path: '/auth/resetpassword',
				title: 'Reset password',
				description: 'Reset password using the token from the email link.',
				auth: 'None',
				rateLimit: '3 req/15 min',
				requestBody: [
					{
						name: 'token',
						type: 'string',
						description: 'Required. Token from the reset email.',
						required: true
					},
					{
						name: 'password',
						type: 'string',
						description: 'Required, min 8, max 50 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PATCH http://localhost:8080/api/v1/auth/resetpassword \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "reset_token_from_email",
    "password": "newsecurepassword"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Password reset successfully"
}`
						},
						{
							status: '400 Bad Request',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'auth-oauth',
				method: 'POST',
				path: '/auth',
				title: 'OAuth login (Google/GitHub)',
				description:
					'Authenticate via Google or GitHub OAuth. Sets cookies: access_token, refresh_token.',
				auth: 'None',
				rateLimit: '5 req/min',
				requestBody: [
					{
						name: 'provider',
						type: 'string',
						description: "Required, oneof: 'google' | 'github'.",
						required: true
					},
					{
						name: 'code',
						type: 'string',
						description: 'Required. OAuth authorization code.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "google",
    "code": "oauth_authorization_code"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Login successfully"
}`
						},
						{
							status: '400 Bad Request',
							code: `{
  "error": "string"
}`
						},
						{
							status: '500 Internal Server Error',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'auth-profile',
				method: 'GET',
				path: '/auth/profile',
				title: 'Get user profile',
				description: "View the currently logged-in user's profile information.",
				auth: 'Bearer token (cookie)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/auth/profile \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://...",
    "auth_provider": "google"
  }
}`
						},
						{
							status: '401 Unauthorized',
							code: `{
  "error": "User ID not found"
}`
						}
					]
				}
			},
			{
				id: 'auth-password-change-init',
				method: 'POST',
				path: '/auth/password/change/init',
				title: 'Initiate password change',
				description: 'Sends a 6-digit verification code to the user email for password change.',
				auth: 'Bearer token (cookie)',
				requestBody: [
					{
						name: 'current_password',
						type: 'string',
						description: 'Required. The current password.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/password/change/init \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "current_password": "currentpassword"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Verification code sent to your email"
}`
						},
						{
							status: '400 Bad Request',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'auth-password-change-verify',
				method: 'POST',
				path: '/auth/password/change/verify',
				title: 'Verify password change',
				description: 'Verify the 6-digit code and set the new password.',
				auth: 'Bearer token (cookie)',
				requestBody: [
					{
						name: 'code',
						type: 'string',
						description: 'Required. Exactly 6 characters.',
						required: true
					},
					{
						name: 'new_password',
						type: 'string',
						description: 'Required, min 8, max 50 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/auth/password/change/verify \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "code": "123456",
    "new_password": "newsecurepassword"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Password changed successfully"
}`
						},
						{
							status: '400 Bad Request',
							code: `{
  "error": "string"
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'organization',
		label: 'Organization',
		endpoints: [
			{
				id: 'org-list-all',
				method: 'GET',
				path: '/organization/all',
				title: 'List all organizations',
				description: 'List all organizations the current user belongs to.',
				auth: 'Bearer token',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/all \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "My Team",
      "slug": "my-team",
      "created_at": "2023-11-01T14:32:00Z",
      "total_monitors": 5,
      "active_monitors": 4,
      "total_member": 10
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'org-create',
				method: 'POST',
				path: '/organization/create',
				title: 'Create organization',
				description: 'Create a new organization. The creator becomes the Owner.',
				auth: 'Bearer token',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 3, max 24 chars, no HTML.',
						required: true
					},
					{
						name: 'slug',
						type: 'string',
						description: 'Required, min 6, max 24 chars, print ASCII, no HTML.',
						required: true
					},
					{
						name: 'invitations',
						type: 'array',
						description: "Optional. Array of { invitee_id: uuid, role?: 'admin' | 'member' }.",
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/create \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "My Team",
    "slug": "my-team"
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "message": "Organization created successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-invitations-list',
				method: 'GET',
				path: '/invitation',
				title: 'List pending invitations',
				description: 'List all pending invitations for the current user.',
				auth: 'Bearer token',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/invitation \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "role": "member",
      "status": "pending",
      "organization": { "name": "My Team" },
      "inviter": { "name": "John Doe", "avatar_url": "https://..." }
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'org-invitation-action',
				method: 'PUT',
				path: '/invitation/action',
				title: 'Accept or reject invitation',
				description: 'Accept or reject a pending organization invitation.',
				auth: 'Bearer token',
				requestBody: [
					{
						name: 'invitation_id',
						type: 'string (uuid)',
						description: 'Required.',
						required: true
					},
					{
						name: 'action',
						type: 'string',
						description: "Required, oneof: 'accept' | 'reject'.",
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/invitation/action \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "invitation_id": "uuid",
    "action": "accept"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Invitation accepted"
}`
						}
					]
				}
			},
			{
				id: 'org-search-persons',
				method: 'GET',
				path: '/search/persons',
				title: 'Search users',
				description: 'Search for users by name. Returns empty array if no users found.',
				auth: 'Bearer token',
				queryParams: [
					{
						name: 'name',
						type: 'string',
						description: 'Required. Search query.',
						required: true
					},
					{
						name: 'page',
						type: 'number',
						description: 'Optional. Default: 1.',
						required: false
					},
					{
						name: 'orgId',
						type: 'string (uuid)',
						description: 'Optional. Organization ID to exclude members.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:8080/api/v1/search/persons?name=john&page=1" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "avatar_url": "https://..."
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'org-members',
				method: 'GET',
				path: '/organization/:orgId/members',
				title: 'List organization members',
				description: 'List all members of an organization with their roles.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/members \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "organization_id": "uuid",
      "user_id": "uuid",
      "role": "owner",
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "avatar_url": "https://..."
      }
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'org-invite-member',
				method: 'POST',
				path: '/organization/:orgId/invite',
				title: 'Invite a member',
				description: 'Invite a new member to the organization.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				requestBody: [
					{
						name: 'invitations',
						type: 'array',
						description:
							"Required. Array of { invitee_id: uuid (required), role?: 'admin' | 'member' }.",
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/invite \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "invitations": [
      { "invitee_id": "uuid", "role": "member" }
    ]
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Invitation sent successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-kick-member',
				method: 'DELETE',
				path: '/organization/:orgId/kick',
				title: 'Remove a member',
				description:
					'Remove a member from the organization. Expects a raw JSON string of member_id, not an object.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				requestBody: [
					{
						name: 'member_id',
						type: 'string (raw JSON)',
						description: 'Required. Raw JSON string, not an object.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/organization/org_uuid/kick \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '"member_uuid"'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Member removed successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-disband',
				method: 'DELETE',
				path: '/organization/:orgId/disband',
				title: 'Disband organization',
				description: 'Permanently delete the organization and all its data.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/organization/org_uuid/disband \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Organization disbanded successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-update',
				method: 'PUT',
				path: '/organization/:orgId/update',
				title: 'Update organization',
				description: 'Update organization name or slug.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				requestBody: [
					{
						name: 'organization_id',
						type: 'string (uuid)',
						description: 'Required.',
						required: true
					},
					{
						name: 'name',
						type: 'string',
						description: 'Optional, min 3, max 24 chars, no HTML.',
						required: false
					},
					{
						name: 'slug',
						type: 'string',
						description: 'Optional, min 6, max 24 chars, print ASCII, no HTML.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/update \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "organization_id": "org_uuid",
    "name": "Updated Team Name"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Organization updated successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-transfer',
				method: 'PUT',
				path: '/organization/:orgId/transfer',
				title: 'Transfer ownership',
				description: 'Transfer organization ownership to another member.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				requestBody: [
					{
						name: 'user_id',
						type: 'string (uuid)',
						description: 'Required. Target user ID.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/transfer \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "user_id": "target_user_uuid"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Ownership transferred successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-leave',
				method: 'PUT',
				path: '/organization/:orgId/leave',
				title: 'Leave organization',
				description: 'Leave the current organization.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/leave \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Left organization successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-promote',
				method: 'PUT',
				path: '/organization/:orgId/promote',
				title: 'Promote member',
				description: 'Promote a member to a higher role.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'user_id',
						type: 'string (uuid)',
						description: 'Required. User ID to promote.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/promote \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "user_id": "member_uuid"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Member promoted successfully"
}`
						}
					]
				}
			},
			{
				id: 'org-demote',
				method: 'PUT',
				path: '/organization/:orgId/demote',
				title: 'Demote member',
				description: 'Demote a member to a lower role.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				requestBody: [
					{
						name: 'user_id',
						type: 'string (uuid)',
						description: 'Required. User ID to demote.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/demote \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "user_id": "admin_uuid"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Member demoted successfully"
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'monitors',
		label: 'Monitors',
		endpoints: [
			{
				id: 'monitor-create',
				method: 'POST',
				path: '/organization/:orgId/monitors',
				title: 'Create a monitor',
				description:
					'Creates a new monitor to continuously check the health of an endpoint or service.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 4, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'type',
						type: 'string',
						description: "Required, oneof: 'http' | 'tcp' | 'ping'.",
						required: true
					},
					{
						name: 'target',
						type: 'string',
						description: 'Required, min 4, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'interval_seconds',
						type: 'number',
						description: 'Required, min 10.',
						required: true
					},
					{
						name: 'timeout_seconds',
						type: 'number',
						description: 'Required, min 1.',
						required: true
					},
					{
						name: 'expectation_status_code',
						type: 'number',
						description: 'Optional. Default: 200.',
						required: false
					},
					{
						name: 'criticality',
						type: 'string',
						description: "Required, oneof: 'extreme' | 'high' | 'medium' | 'low'.",
						required: true
					},
					{
						name: 'MonitorPICs',
						type: 'array<string (uuid)>',
						description: 'Required. Min 1, max 2 items.',
						required: true
					},
					{
						name: 'enable_ssl_domain_check',
						type: 'boolean',
						description: 'Optional.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/monitors \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "Production API Health",
    "type": "http",
    "target": "https://api.example.com/health",
    "interval_seconds": 60,
    "timeout_seconds": 10,
    "expectation_status_code": 200,
    "criticality": "high",
    "MonitorPICs": ["user_uuid"],
    "enable_ssl_domain_check": true
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'monitor-list',
				method: 'GET',
				path: '/organization/:orgId/monitors',
				title: 'List monitors',
				description: 'List all monitors within an organization.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/monitors \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'monitor-get',
				method: 'GET',
				path: '/organization/:orgId/monitors/:monitorId',
				title: 'Get monitor detail',
				description: 'Retrieve detailed information about a specific monitor.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/monitors/monitor_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'monitor-stats',
				method: 'GET',
				path: '/organization/:orgId/monitors/:monitorId/stats',
				title: 'Get monitor stats',
				description: 'Get daily statistics for a monitor.',
				auth: 'Bearer token + TenantMiddleware',
				queryParams: [
					{
						name: 'days',
						type: 'number',
						description: 'Optional. Default: 30. Number of days for stats.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:8080/api/v1/organization/org_uuid/monitors/monitor_uuid/stats?days=30" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'monitor-update',
				method: 'PUT',
				path: '/organization/:orgId/monitors/:monitorId',
				title: 'Update monitor',
				description:
					'Update monitor configuration including name, target, interval, and other settings.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Optional, min 4, max 100 chars, no HTML.',
						required: false
					},
					{
						name: 'target',
						type: 'string',
						description: 'Optional, min 4, max 100 chars, no HTML.',
						required: false
					},
					{
						name: 'interval_seconds',
						type: 'number',
						description: 'Optional, min 10.',
						required: false
					},
					{
						name: 'timeout_seconds',
						type: 'number',
						description: 'Optional, min 1.',
						required: false
					},
					{
						name: 'expectation_status_code',
						type: 'number',
						description: 'Optional.',
						required: false
					},
					{
						name: 'is_active',
						type: 'boolean',
						description: 'Optional.',
						required: false
					},
					{
						name: 'criticality',
						type: 'string',
						description: "Optional, oneof: 'extreme' | 'high' | 'medium' | 'low'.",
						required: false
					},
					{
						name: 'MonitorPICs',
						type: 'array<string (uuid)>',
						description: 'Optional.',
						required: false
					},
					{
						name: 'enable_ssl_domain_check',
						type: 'boolean',
						description: 'Optional.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/monitors/monitor_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "interval_seconds": 30,
    "is_active": true
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'monitor-delete',
				method: 'DELETE',
				path: '/organization/:orgId/monitors/:monitorId',
				title: 'Delete monitor',
				description: 'Permanently delete a monitor.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/organization/org_uuid/monitors/monitor_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Monitor deleted successfully"
}`
						}
					]
				}
			},
			{
				id: 'monitor-global-list',
				method: 'GET',
				path: '/monitors',
				title: 'All monitors (global)',
				description: 'List all monitors across all organizations the user belongs to.',
				auth: 'Bearer token',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/monitors \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'incidents',
		label: 'Incidents',
		endpoints: [
			{
				id: 'incident-get',
				method: 'GET',
				path: '/organization/:orgId/incident/:incidentId',
				title: 'Get incident detail',
				description: 'Retrieve detailed information about a specific incident.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/incident/incident_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "uuid",
    "monitor_id": "uuid",
    "status": "ongoing",
    "summary": "High response time detected",
    "started_at": "2023-11-01T10:00:00Z",
    "resolved_at": null,
    "monitor": { "name": "Production API Health", "target": "https://api.example.com/health" },
    "assignees": [
      {
        "user_id": "uuid",
        "role": "assignee",
        "created_at": "2023-11-01T10:01:00Z",
        "user": { "name": "John Doe", "avatar": "https://..." }
      }
    ]
  }
}`
						}
					]
				}
			},
			{
				id: 'incident-list',
				method: 'GET',
				path: '/organization/:orgId/incident',
				title: 'List all incidents',
				description: 'List all incidents for the organization.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/incident \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'incident-add-update',
				method: 'POST',
				path: '/organization/:orgId/incident/:incidentId',
				title: 'Add incident update',
				description: 'Add a status update message to an ongoing incident.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'message',
						type: 'string',
						description: 'Required, min 10, max 100 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/incident/incident_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "message": "Investigating the root cause of the issue."
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'incident-join',
				method: 'POST',
				path: '/organization/:orgId/incident/:incidentId/join',
				title: 'Join incident',
				description: 'Join an incident as an assignee for coordination.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/incident/incident_uuid/join \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "You successfully joined the incident"
}`
						}
					]
				}
			},
			{
				id: 'incident-updates-list',
				method: 'GET',
				path: '/organization/:orgId/incident/:incidentId/updates',
				title: 'List incident updates',
				description: 'List all status update messages for an incident.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/incident/incident_uuid/updates \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "message": "Investigating the root cause of the issue.",
      "username": "John Doe",
      "avatarUrl": "https://...",
      "createAt": "2023-11-01T10:05:00Z"
    }
  ]
}`
						}
					]
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
				description: 'Create a new status page.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'subdomain',
						type: 'string',
						description: 'Required, min 3, max 60 chars.',
						required: true
					},
					{
						name: 'title',
						type: 'string',
						description: 'Required, max 60 chars.',
						required: true
					},
					{
						name: 'description',
						type: 'string',
						description: 'Optional.',
						required: false
					},
					{
						name: 'is_public',
						type: 'boolean',
						description: 'Required.',
						required: true
					},
					{
						name: 'monitor_id',
						type: 'array<string (uuid)>',
						description: 'Required. Min 1, max 40 items.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/statuspage \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "subdomain": "status",
    "title": "Production Status",
    "description": "Our production services status page",
    "is_public": true,
    "monitor_id": ["monitor_uuid"]
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "message": "Status page created successfully"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-list',
				method: 'GET',
				path: '/organization/:orgId/statuspage',
				title: 'List status pages',
				description: 'List all status pages for the organization.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/statuspage \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'statuspage-get',
				method: 'GET',
				path: '/organization/:orgId/statuspage/:statusPageId',
				title: 'Get status page detail',
				description: 'Retrieve detailed information about a specific status page.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/statuspage/statuspage_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "uuid",
    "organization_id": "uuid",
    "organization": { "id": "uuid", "name": "My Team", "slug": "my-team" },
    "subdomain": "status",
    "title": "Production Status",
    "description": "Our production services",
    "is_public": true,
    "created_at": "2023-11-01T14:32:00Z",
    "status_page_monitors": [
      {
        "id": "uuid",
        "status_page_id": "uuid",
        "monitor_id": "uuid",
        "display_order": 0
      }
    ]
  }
}`
						}
					]
				}
			},
			{
				id: 'statuspage-monitors',
				method: 'GET',
				path: '/organization/:orgId/statuspage/:statusPageId/monitors',
				title: 'List status page monitors',
				description: 'List all monitors linked to a status page.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/statuspage/statuspage_uuid/monitors \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "status_page_id": "uuid",
      "monitor_id": "uuid",
      "display_order": 0
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'statuspage-delete',
				method: 'DELETE',
				path: '/organization/:orgId/statuspage/:statusPageId',
				title: 'Delete status page',
				description: 'Permanently delete a status page.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/organization/org_uuid/statuspage/statuspage_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Status page deleted successfully"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-update',
				method: 'PUT',
				path: '/organization/:orgId/statuspage/:statusPageId',
				title: 'Update status page',
				description: 'Update status page configuration.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'subdomain',
						type: 'string',
						description: 'Optional, min 3, max 60 chars.',
						required: false
					},
					{
						name: 'title',
						type: 'string',
						description: 'Optional, max 60 chars.',
						required: false
					},
					{
						name: 'description',
						type: 'string',
						description: 'Optional.',
						required: false
					},
					{
						name: 'is_public',
						type: 'boolean',
						description: 'Optional.',
						required: false
					},
					{
						name: 'monitor_id',
						type: 'array<string (uuid)>',
						description: 'Optional.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/statuspage/statuspage_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "title": "Updated Status Page"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Status page updated successfully"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-global-list',
				method: 'GET',
				path: '/statuspages',
				title: 'All status pages (global)',
				description: 'List all status pages across all organizations the user belongs to.',
				auth: 'Bearer token',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/statuspages \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'statuspage-public',
				method: 'GET',
				path: '/public/statuspage/:subdomain',
				title: 'Public status page',
				description: 'Access a status page publicly without login. No authentication required.',
				auth: 'None',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/public/statuspage/status`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "title": "Production Status",
    "description": "Our production services",
    "subdomain": "status",
    "monitors": [
      {
        "id": "uuid",
        "name": "Production API Health",
        "type": "http",
        "status": "up",
        "recent_checks": [1, 1, 1, 0, 1, 1, 1]
      }
    ]
  }
}`
						},
						{
							status: '404 Not Found',
							code: `{
  "error": "Status page not found"
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'subscriptions',
		label: 'Subscriptions',
		endpoints: [
			{
				id: 'subscription-list',
				method: 'GET',
				path: '/subscription',
				title: 'List subscriptions',
				description: 'List all subscriptions for the current user.',
				auth: 'Bearer token',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/subscription \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "data": [
    {
      "organization_id": "uuid",
      "organization": { "name": "My Team" },
      "plan": "pro",
      "status": "active",
      "current_period_end": "2024-01-01T00:00:00Z"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'subscription-create',
				method: 'POST',
				path: '/organization/:orgId/subscription',
				title: 'Create subscription',
				description: 'Create a new subscription. Returns a redirect URL for payment.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'plan',
						type: 'string',
						description: "Required, oneof: 'pro' | 'max'.",
						required: true
					},
					{
						name: 'email',
						type: 'string',
						description: 'Required. Email format.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/subscription \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "plan": "pro",
    "email": "user@example.com"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "data": {
    "redirect_url": "https://app.midtrans.com/..."
  }
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'auditlogs',
		label: 'Audit Logs',
		endpoints: [
			{
				id: 'audit-list',
				method: 'GET',
				path: '/organization/:orgId/audit-logs',
				title: 'Organization audit log',
				description: 'View a record of every significant action within the organization.',
				auth: 'Bearer token + TenantMiddleware',
				queryParams: [
					{
						name: 'page',
						type: 'number',
						description: 'Optional. Default: 1.',
						required: false
					},
					{
						name: 'limit',
						type: 'number',
						description: 'Optional. Default: 20.',
						required: false
					},
					{
						name: 'action',
						type: 'string',
						description: 'Optional. Filter by action type.',
						required: false
					},
					{
						name: 'entity_type',
						type: 'string',
						description: 'Optional. Filter by entity type.',
						required: false
					},
					{
						name: 'search',
						type: 'string',
						description: 'Optional. Search in description/details.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:8080/api/v1/organization/org_uuid/audit-logs?page=1&limit=20" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "audit logs retrieved successfully",
  "data": {
    "logs": [
      {
        "id": "uuid",
        "organization_id": "uuid",
        "user_id": "uuid",
        "user_name": "John Doe",
        "user_email": "user@example.com",
        "user_avatar_url": "https://...",
        "action": "monitor.created",
        "entity_type": "monitor",
        "entity_id": "uuid",
        "description": "Created monitor Production API Health",
        "details": "{...}",
        "ip_address": "127.0.0.1",
        "created_at": "2023-11-01T14:32:00Z"
      }
    ],
    "total_count": 100,
    "page": 1,
    "limit": 20,
    "total_pages": 5
  }
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'notifications',
		label: 'Notification Channels',
		endpoints: [
			{
				id: 'notif-channels-list',
				method: 'GET',
				path: '/organization/:orgId/notifications/channels',
				title: 'List notification channels',
				description: 'List all configured notification channels for the organization.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/notifications/channels \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "organization_id": "uuid",
      "name": "Slack Alerts",
      "type": "slack",
      "config": { "webhook_url": "https://hooks.slack.com/..." },
      "is_active": true,
      "created_at": "2023-11-01T14:32:00Z"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'notif-channel-get',
				method: 'GET',
				path: '/organization/:orgId/notifications/channels/:channelId',
				title: 'Get notification channel',
				description: 'Retrieve detailed information about a specific notification channel.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/notifications/channels/channel_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "uuid",
    "organization_id": "uuid",
    "name": "Slack Alerts",
    "type": "slack",
    "config": { "webhook_url": "https://hooks.slack.com/..." },
    "is_active": true,
    "created_at": "2023-11-01T14:32:00Z"
  }
}`
						},
						{
							status: '404 Not Found',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'notif-channel-create',
				method: 'POST',
				path: '/organization/:orgId/notifications/channels',
				title: 'Create notification channel',
				description: 'Create a new notification channel (Email, Slack, Discord, or Webhook).',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 2, max 80 chars, no HTML.',
						required: true
					},
					{
						name: 'type',
						type: 'string',
						description: "Required, oneof: 'email' | 'slack' | 'webhook' | 'discord'.",
						required: true
					},
					{
						name: 'config',
						type: 'object',
						description:
							'Required. Map of key-value pairs. Sensitive values are masked in responses.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/notifications/channels \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "Slack Alerts",
    "type": "slack",
    "config": {
      "webhook_url": "https://hooks.slack.com/services/T00/B00/xxx"
    }
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": {
    "id": "uuid",
    "organization_id": "uuid",
    "name": "Slack Alerts",
    "type": "slack",
    "config": { "webhook_url": "https://hooks.slack.com/..." },
    "is_active": true,
    "created_at": "2023-11-01T14:32:00Z"
  }
}`
						}
					]
				}
			},
			{
				id: 'notif-channel-update',
				method: 'PUT',
				path: '/organization/:orgId/notifications/channels/:channelId',
				title: 'Update notification channel',
				description: 'Update notification channel name, active state, or config.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Optional, min 2, max 80 chars, no HTML.',
						required: false
					},
					{
						name: 'is_active',
						type: 'boolean',
						description: 'Optional.',
						required: false
					},
					{
						name: 'config',
						type: 'object',
						description: 'Optional. Map of key-value pairs.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/organization/org_uuid/notifications/channels/channel_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "is_active": false
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'notif-channel-delete',
				method: 'DELETE',
				path: '/organization/:orgId/notifications/channels/:channelId',
				title: 'Delete notification channel',
				description: 'Permanently delete a notification channel.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/organization/org_uuid/notifications/channels/channel_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "notification channel deleted"
}`
						},
						{
							status: '404 Not Found',
							code: `{
  "error": "string"
}`
						}
					]
				}
			},
			{
				id: 'notif-logs',
				method: 'GET',
				path: '/organization/:orgId/notifications/logs',
				title: 'Notification delivery logs',
				description: 'View logs of all sent notifications for audit and debugging.',
				auth: 'Bearer token + TenantMiddleware',
				queryParams: [
					{
						name: 'limit',
						type: 'number',
						description: 'Optional. Default: 50, max: 100.',
						required: false
					},
					{
						name: 'offset',
						type: 'number',
						description: 'Optional. Default: 0.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:8080/api/v1/organization/org_uuid/notifications/logs?limit=50&offset=0" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "logs": [
      {
        "id": "uuid",
        "monitor_id": "uuid",
        "incident_id": null,
        "channel_id": "uuid",
        "channel": "Slack Alerts",
        "message": "Monitor is down: Production API Health",
        "status": "sent",
        "error_detail": "",
        "sent_at": "2023-11-01T10:00:05Z"
      }
    ],
    "total": 100,
    "limit": 50,
    "offset": 0
  }
}`
						}
					]
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
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/organization/org_uuid/api-keys \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "CI/CD Integration",
      "key_prefix": "pw_live_abc",
      "permissions": "read",
      "last_used_at": "2023-11-01T14:35:00Z",
      "last_used_ip": "127.0.0.1",
      "expires_at": "2024-01-01T00:00:00Z",
      "created_at": "2023-11-01T14:32:00Z",
      "created_by": "uuid"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'apikey-create',
				method: 'POST',
				path: '/organization/:orgId/api-keys',
				title: 'Create API key',
				description:
					'Create a new API key. Only Owner and Admin can create keys. The plaintext key is shown ONLY once.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 2, max 100 chars.',
						required: true
					},
					{
						name: 'permissions',
						type: 'string',
						description: "Required, oneof: 'read' | 'write'.",
						required: true
					},
					{
						name: 'expires_in_days',
						type: 'number|null',
						description: 'Optional. e.g., 30, 90, 365.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/organization/org_uuid/api-keys \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "CI/CD Integration",
    "permissions": "read",
    "expires_in_days": 90
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "message": "API key created successfully",
  "data": {
    "id": "uuid",
    "name": "CI/CD Integration",
    "key_prefix": "pw_live_abc",
    "permissions": "read",
    "last_used_at": null,
    "last_used_ip": "",
    "expires_at": "2024-01-01T00:00:00Z",
    "created_at": "2023-11-01T14:32:00Z",
    "created_by": "uuid",
    "plaintext_key": "pw_live_xxxxxxxxxxxxxxxx"
  }
}`
						}
					]
				}
			},
			{
				id: 'apikey-delete',
				method: 'DELETE',
				path: '/organization/:orgId/api-keys/:keyId',
				title: 'Revoke API key',
				description: 'Permanently revoke an API key. This action cannot be undone.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/organization/org_uuid/api-keys/key_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "API key revoked successfully"
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'websocket',
		label: 'WebSocket',
		endpoints: [
			{
				id: 'ws-connect',
				method: 'GET',
				path: '/ws',
				title: 'WebSocket connection',
				description:
					'Real-time notifications endpoint. Upgrades HTTP connection to WebSocket and registers the client to receive real-time updates for all organizations the user belongs to.',
				auth: 'Bearer token',
				notes: [
					'Protocol: WebSocket upgrade',
					'Sends real-time notifications for monitor status changes, incident updates, and more.'
				],
				codeExample: {
					language: 'javascript',
					label: 'Example Client',
					code: `const ws = new WebSocket(
  "ws://localhost:8080/api/v1/ws",
  [],
  { headers: { Cookie: "access_token=..." } }
);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Notification:", data);
};`,
					responses: [
						{
							status: 'WebSocket Messages',
							code: `{
  "type": "monitor.status_change",
  "data": {
    "monitor_id": "uuid",
    "status": "down",
    "timestamp": "2023-11-01T10:00:00Z"
  }
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'publicapi',
		label: 'Public REST API',
		endpoints: [
			{
				id: 'public-monitors-list',
				method: 'GET',
				path: '/public/monitors',
				title: 'List monitors (API Key)',
				description: 'List all monitors using API Key authentication. Rate limited to 60 req/min.',
				auth: 'API Key (read permission)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/public/monitors \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx"`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'public-monitors-get',
				method: 'GET',
				path: '/public/monitors/:id',
				title: 'Get monitor (API Key)',
				description: 'Retrieve a specific monitor using API Key authentication.',
				auth: 'API Key (read permission)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/public/monitors/monitor_uuid \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx"`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": { ... }
}`
						},
						{
							status: '404 Not Found',
							code: `{
  "error": "Monitor not found"
}`
						}
					]
				}
			},
			{
				id: 'public-monitors-create',
				method: 'POST',
				path: '/public/monitors',
				title: 'Create monitor (API Key)',
				description: 'Create a new monitor using API Key authentication.',
				auth: 'API Key (write permission)',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 4, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'type',
						type: 'string',
						description: "Required, oneof: 'http' | 'tcp' | 'ping'.",
						required: true
					},
					{
						name: 'target',
						type: 'string',
						description: 'Required, min 4, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'interval_seconds',
						type: 'number',
						description: 'Required, min 10.',
						required: true
					},
					{
						name: 'timeout_seconds',
						type: 'number',
						description: 'Required, min 1.',
						required: true
					},
					{
						name: 'criticality',
						type: 'string',
						description: "Required, oneof: 'extreme' | 'high' | 'medium' | 'low'.",
						required: true
					},
					{
						name: 'MonitorPICs',
						type: 'array<string (uuid)>',
						description: 'Required. Min 1, max 2 items.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/public/monitors \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "New Monitor",
    "type": "http",
    "target": "https://api.example.com/health",
    "interval_seconds": 60,
    "timeout_seconds": 10,
    "criticality": "high",
    "MonitorPICs": ["user_uuid"]
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "message": "Monitor created successfully",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'public-monitors-update',
				method: 'PUT',
				path: '/public/monitors/:id',
				title: 'Update monitor (API Key)',
				description: 'Update a monitor using API Key authentication.',
				auth: 'API Key (write permission)',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Optional, min 4, max 100 chars, no HTML.',
						required: false
					},
					{
						name: 'target',
						type: 'string',
						description: 'Optional, min 4, max 100 chars, no HTML.',
						required: false
					},
					{
						name: 'interval_seconds',
						type: 'number',
						description: 'Optional, min 10.',
						required: false
					},
					{
						name: 'is_active',
						type: 'boolean',
						description: 'Optional.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:8080/api/v1/public/monitors/monitor_uuid \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "is_active": false
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Monitor updated successfully",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'public-monitors-delete',
				method: 'DELETE',
				path: '/public/monitors/:id',
				title: 'Delete monitor (API Key)',
				description: 'Permanently delete a monitor using API Key authentication.',
				auth: 'API Key (write permission)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:8080/api/v1/public/monitors/monitor_uuid \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx"`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Monitor deleted successfully"
}`
						}
					]
				}
			},
			{
				id: 'public-incidents-list',
				method: 'GET',
				path: '/public/incidents',
				title: 'List incidents (API Key)',
				description: 'List all incidents using API Key authentication.',
				auth: 'API Key (read permission)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/public/incidents \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx"`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			},
			{
				id: 'public-incidents-add-update',
				method: 'POST',
				path: '/public/incidents',
				title: 'Add incident update (API Key)',
				description: 'Add a status update to an incident using API Key authentication.',
				auth: 'API Key (write permission)',
				requestBody: [
					{
						name: 'incident_id',
						type: 'string (uuid)',
						description: 'Required.',
						required: true
					},
					{
						name: 'message',
						type: 'string',
						description: 'Required, min 2, max 1000 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/public/incidents \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "incident_id": "incident_uuid",
    "message": "Issue has been identified and a fix is being deployed."
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "message": "Incident update note added successfully",
  "data": { ... }
}`
						}
					]
				}
			},
			{
				id: 'public-statuspages-list',
				method: 'GET',
				path: '/public/status-pages',
				title: 'List status pages (API Key)',
				description: 'List all status pages using API Key authentication.',
				auth: 'API Key (read permission)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:8080/api/v1/public/status-pages \\
  -H "Authorization: Bearer pw_live_xxxxxxxxxxxxxxxx"`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [ ... ]
}`
						}
					]
				}
			}
		]
	},
	{
		id: 'webhooks',
		label: 'Webhooks',
		endpoints: [
			{
				id: 'webhook-midtrans',
				method: 'POST',
				path: '/api/webhook/midtrans',
				title: 'Midtrans payment webhook',
				description:
					'Webhook endpoint for Midtrans payment gateway notifications. Validated via Midtrans signature.',
				auth: 'None (validated via Midtrans signature)',
				requestBody: [
					{
						name: 'transaction_status',
						type: 'string',
						description: "e.g., 'capture', 'settlement', 'pending'.",
						required: true
					},
					{
						name: 'order_id',
						type: 'string',
						description: 'Required.',
						required: true
					},
					{
						name: 'gross_amount',
						type: 'string',
						description: 'Required.',
						required: true
					},
					{
						name: 'status_code',
						type: 'string',
						description: 'Required.',
						required: true
					},
					{
						name: 'signature_key',
						type: 'string',
						description: 'Required.',
						required: true
					},
					{
						name: 'fraud_status',
						type: 'string',
						description: "e.g., 'accept', 'challenge', 'deny'.",
						required: true
					},
					{
						name: 'payment_type',
						type: 'string',
						description: 'Required.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:8080/api/v1/api/webhook/midtrans \\
  -H "Content-Type: application/json" \\
  -d '{
    "transaction_status": "settlement",
    "order_id": "order_123",
    "gross_amount": "100000",
    "status_code": "200",
    "signature_key": "abc123...",
    "fraud_status": "accept",
    "payment_type": "credit_card"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Webhook processed successfully"
}`
						},
						{
							status: '401 Unauthorized',
							code: `{
  "error": "Invalid signature"
}`
						}
					]
				}
			}
		]
	}
];
