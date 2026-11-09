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
				rateLimit: '60 req/min (AUTH_RATE_LIMIT)',
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
					code: `curl -X POST http://localhost:27346/api/v1/auth/register \\
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
  "message": "User registered successfully"
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
				rateLimit: '60 req/min (AUTH_RATE_LIMIT)',
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
					code: `curl -X POST http://localhost:27346/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Login successfully",
  "user": {
    "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://api.dicebear.com/7.x/identicon/svg?seed=user",
    "is_verified": true
  }
}`
						},
						{
							status: '401 Unauthorized',
							code: `{
  "error": "Invalid email or password"
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
				rateLimit: '60 req/min (AUTH_RATE_LIMIT)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/auth/logout`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Logout successfully"
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
				auth: 'Cookie refresh_token',
				rateLimit: '30 req/min',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/auth/refresh \\
  --cookie "refresh_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "message": "Token refreshed successfully"
}`
						},
						{
							status: '401 Unauthorized',
							code: `{
  "error": "Refresh token not found or invalid"
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
					code: `curl -X POST http://localhost:27346/api/v1/auth/forgotpassword \\
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
					code: `curl -X PATCH http://localhost:27346/api/v1/auth/resetpassword \\
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
				id: 'auth-profile',
				method: 'GET',
				path: '/auth/profile',
				title: 'Get user profile',
				description: "View the currently logged-in user's profile information.",
				auth: 'Bearer token (cookie)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/auth/profile \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "user": {
    "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://api.dicebear.com/7.x/identicon/svg?seed=user",
    "is_verified": true,
    "has_password": true,
    "created_at": "2026-10-04T12:00:00Z"
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
				rateLimit: '60 req/min (AUTH_RATE_LIMIT)',
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
					code: `curl -X POST http://localhost:27346/api/v1/auth/password/change/init \\
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
				rateLimit: '60 req/min (AUTH_RATE_LIMIT)',
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
					code: `curl -X POST http://localhost:27346/api/v1/auth/password/change/verify \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/all \\
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
					code: `curl -X POST http://localhost:27346/api/v1/organization/create \\
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
					code: `curl -X GET http://localhost:27346/api/v1/invitation \\
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
					code: `curl -X PUT http://localhost:27346/api/v1/invitation/action \\
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
					code: `curl -X GET "http://localhost:27346/api/v1/search/persons?name=john&page=1" \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/members \\
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
				title: 'Invite members',
				description:
					'Invite new members to the organization. Owners can invite members as admin or member. Admins can invite new members as member only (inviting as admin returns 403 Forbidden).',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
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
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/invite \\
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
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/kick \\
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
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/disband \\
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/update \\
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/transfer \\
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/leave \\
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
				title: 'Promote member to admin',
				description:
					'Promote a member to the admin role. Strictly restricted to organization owners only.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner")',
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/promote \\
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/demote \\
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
						description: 'Required, min 10 (enforced >= MIN_MONITOR_INTERVAL_SECONDS, default 30).',
						required: true
					},
					{
						name: 'timeout_seconds',
						type: 'number',
						description: 'Required, min 1, max 30 (default 10).',
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
						name: 'assignees',
						type: 'array<string (uuid)>',
						description:
							'Required. Min 1, max 50 (accepts assignees or MonitorPICs, capped by MAX_ASSIGNEES_PER_MONITOR default 10).',
						required: true
					},
					{
						name: 'enable_ssl_domain_check',
						type: 'boolean',
						description: 'Optional. Default: true.',
						required: false
					},
					{
						name: 'alert_template_id',
						type: 'string (uuid)',
						description: 'Optional alert template UUID to attach upon creation.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/monitors \\
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
    "assignees": ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"],
    "enable_ssl_domain_check": true,
    "alert_template_id": "f5c2b3d4-e6f7-8a9b-0c1d-2e3f4a5b6c7d"
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": {
    "id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "alert_template_id": "f5c2b3d4-e6f7-8a9b-0c1d-2e3f4a5b6c7d",
    "name": "Production API Health",
    "type": "http",
    "target": "https://api.example.com/health",
    "interval_seconds": 60,
    "timeout_seconds": 10,
    "expectation_status_code": 200,
    "status": "up",
    "response_time": 42,
    "last_checked": "2026-10-04T12:00:00Z",
    "failure_count": 0,
    "consecutive_timeouts": 0,
    "is_active": true,
    "criticality": "high",
    "enable_ssl_domain_check": true,
    "ssl_status": "valid",
    "ssl_days_remaining": 64,
    "domain_status": "valid",
    "domain_days_remaining": 280,
    "assignees": [
      {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "Alex Mercer",
        "email": "alex@example.com"
      }
    ],
    "created_at": "2026-10-04T12:00:00Z",
    "updated_at": "2026-10-04T12:00:00Z"
  }
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/monitors \\
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
				id: 'monitor-overview',
				method: 'GET',
				path: '/organization/:orgId/monitors/overview',
				title: 'Fleet overview telemetry',
				description:
					'Get aggregated fleet uptime, 24h latency statistics (avg, median, p95, min, max, fastest), monitor fleet breakdown by status, and SSL/DNS health summary. Cached in-memory for 60 seconds.',
				auth: 'Bearer token + TenantMiddleware',
				queryParams: [
					{
						name: 'window',
						type: 'number',
						description: 'Optional window in days (default 30, range 1-90).',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:27346/api/v1/organization/org_uuid/monitors/overview?window=30" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "uptime": {
      "window_days": 30,
      "overall_pct": 99.94,
      "previous_window_pct": 99.92,
      "delta_pct": 0.02,
      "has_previous_window": true,
      "total_checks": 43200,
      "up_checks": 43174,
      "down_checks": 26
    },
    "latency": {
      "window_hours": 24,
      "avg_ms": 42,
      "median_ms": 38,
      "p95_ms": 115,
      "min_ms": 18,
      "max_ms": 420,
      "fastest_monitor": {
        "id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
        "name": "Edge Gateway",
        "avg_ms": 18
      },
      "sample_count": 1440
    },
    "fleet": {
      "total": 12,
      "active": 10,
      "paused": 2,
      "up": 9,
      "down": 1,
      "degraded": 0,
      "unresponsive": 0,
      "uniform_interval_seconds": 60,
      "min_interval_seconds": 30,
      "max_interval_seconds": 300
    },
    "ssl_dns": {
      "enabled_monitors": 8,
      "healthy_monitors": 7,
      "warning_monitors": 1,
      "expired_monitors": 0,
      "next_ssl_expiry": {
        "monitor_id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
        "name": "Production API Health",
        "days_remaining": 14
      },
      "next_domain_expiry": {
        "monitor_id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
        "name": "Production API Health",
        "days_remaining": 45
      }
    }
  }
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid \\
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
						description: 'Optional. Default: 30. Number of days for stats (range 1-90).',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid/stats?days=30" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "date": "2026-10-04T00:00:00Z",
      "total_checks": 1440,
      "up_checks": 1438,
      "down_checks": 2,
      "uptime_percentage": 99.86,
      "avg_latency_ms": 42,
      "min_latency_ms": 19,
      "max_latency_ms": 380,
      "count_2xx": 1438,
      "count_3xx": 0,
      "count_4xx": 0,
      "count_5xx": 2,
      "count_error": 0
    }
  ]
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
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
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
						description: 'Optional, min 1, max 30.',
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
						description: 'Optional. Toggle false to pause monitoring, true to resume.',
						required: false
					},
					{
						name: 'criticality',
						type: 'string',
						description: "Optional, oneof: 'extreme' | 'high' | 'medium' | 'low'.",
						required: false
					},
					{
						name: 'assignees',
						type: 'array<string (uuid)>',
						description: 'Optional array of user UUIDs (accepts assignees or MonitorPICs).',
						required: false
					},
					{
						name: 'enable_ssl_domain_check',
						type: 'boolean',
						description: 'Optional.',
						required: false
					},
					{
						name: 'alert_template_id',
						type: 'string (uuid) | null',
						description: 'Optional template UUID to attach, or null to detach.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid \\
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
  "data": {
    "id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "name": "Production API Health",
    "type": "http",
    "target": "https://api.example.com/health",
    "interval_seconds": 30,
    "timeout_seconds": 10,
    "expectation_status_code": 200,
    "status": "up",
    "is_active": true,
    "criticality": "high",
    "updated_at": "2026-10-04T12:05:00Z"
  }
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
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid \\
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
				id: 'monitor-check',
				method: 'POST',
				path: '/organization/:orgId/monitors/:monitorId/check',
				title: 'Trigger manual check',
				description:
					'Force the background worker pool to immediately check the monitor without waiting for the next scheduler interval.',
				auth: 'Bearer token + TenantMiddleware (owner or admin)',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid/check \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Manual check queued and processed successfully",
  "data": {
    "status": "up",
    "latency_ms": 45,
    "status_code": 200,
    "checked_at": "2026-10-04T12:00:00Z"
  }
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
					code: `curl -X GET http://localhost:27346/api/v1/monitors \\
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
		id: 'alertrules',
		label: 'Alert Templates & Rules',
		endpoints: [
			{
				id: 'alerttemplate-list',
				method: 'GET',
				path: '/organization/:orgId/alert-templates',
				title: 'List alert templates',
				description:
					'Retrieve all alert templates configured for the organization, including rule counts and assigned monitor counts.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/alert-templates \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
      "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "name": "Standard Web Service",
      "description": "Standard alert rules for production web apps",
      "is_default": true,
      "rules": [
        {
          "id": "7b83d1c4-6e21-487a-b519-7e3e0c0d1234",
          "name": "Slow Response Latency",
          "metric": "response_time_ms",
          "operator": ">",
          "target_value": "1500",
          "consecutive": 3,
          "severity": "warning",
          "is_active": true
        }
      ],
      "monitors_count": 4,
      "created_at": "2026-09-22T08:00:00Z",
      "updated_at": "2026-09-22T08:00:00Z"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'alerttemplate-create',
				method: 'POST',
				path: '/organization/:orgId/alert-templates',
				title: 'Create alert template',
				description: 'Create a new reusable alert template with optional initial rules.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 2, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'description',
						type: 'string',
						description: 'Optional description, max 255 chars, no HTML.',
						required: false
					},
					{
						name: 'is_default',
						type: 'boolean',
						description: 'Set as the default template for new monitors in this organization.',
						required: false
					},
					{
						name: 'rules',
						type: 'array',
						description: 'Optional initial list of alert rules for the template.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/alert-templates \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "Critical Microservices",
    "description": "Aggressive alerts for internal RPC microservices",
    "is_default": false,
    "rules": [
      {
        "name": "Immediate 5xx Alert",
        "metric": "status_code",
        "operator": "in",
        "target_value": "500,502,503",
        "consecutive": 1,
        "severity": "critical",
        "is_active": true
      }
    ]
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": {
    "id": "f5c2b3d4-e6f7-8a9b-0c1d-2e3f4a5b6c7d",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "name": "Critical Microservices",
    "description": "Aggressive alerts for internal RPC microservices",
    "is_default": false,
    "rules": [],
    "monitors_count": 0,
    "created_at": "2026-10-17T12:00:00Z",
    "updated_at": "2026-10-17T12:00:00Z"
  }
}`
						}
					]
				}
			},
			{
				id: 'alerttemplate-get',
				method: 'GET',
				path: '/organization/:orgId/alert-templates/:templateId',
				title: 'Get alert template detail',
				description: 'Retrieve details of an alert template including all its rules.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/alert-templates/template_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "name": "Standard Web Service",
    "is_default": true,
    "rules": [],
    "monitors_count": 3
  }
}`
						}
					]
				}
			},
			{
				id: 'alerttemplate-update',
				method: 'PUT',
				path: '/organization/:orgId/alert-templates/:templateId',
				title: 'Update alert template',
				description: 'Update template metadata such as name, description, or default flag.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/alert-templates/template_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{ "name": "Updated Template Name", "is_default": true }'`,
					responses: [
						{
							status: '200 OK',
							code: `{ "status": "success", "data": { "id": "uuid", "name": "Updated Template Name" } }`
						}
					]
				}
			},
			{
				id: 'alerttemplate-delete',
				method: 'DELETE',
				path: '/organization/:orgId/alert-templates/:templateId',
				title: 'Delete alert template',
				description: 'Permanently remove an alert template and its nested rules.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/alert-templates/template_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{ "status": "success", "message": "Alert template deleted successfully" }`
						}
					]
				}
			},
			{
				id: 'alerttemplate-create-rule',
				method: 'POST',
				path: '/organization/:orgId/alert-templates/:templateId/rules',
				title: 'Create rule in template',
				description: 'Add a new evaluation rule to an existing alert template.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Rule label, min 2, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'metric',
						type: 'string',
						description: "Metric type: 'status_code' | 'response_time_ms' | 'timeout'.",
						required: true
					},
					{
						name: 'operator',
						type: 'string',
						description: "Operator: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not_in'.",
						required: true
					},
					{
						name: 'target_value',
						type: 'string',
						description: 'Target threshold value or comma-separated list.',
						required: true
					},
					{
						name: 'consecutive',
						type: 'number',
						description: 'Consecutive breach count before triggering alert.',
						required: true
					},
					{
						name: 'severity',
						type: 'string',
						description: "'critical' or 'warning'.",
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/alert-templates/template_uuid/rules \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "High Response Latency",
    "metric": "response_time_ms",
    "operator": ">",
    "target_value": "2000",
    "consecutive": 3,
    "severity": "warning",
    "is_active": true
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{ "status": "success", "data": { "id": "rule_uuid", "name": "High Response Latency" } }`
						}
					]
				}
			},
			{
				id: 'alerttemplate-update-rule',
				method: 'PUT',
				path: '/organization/:orgId/alert-templates/:templateId/rules/:ruleId',
				title: 'Update rule in template',
				description: 'Update an existing evaluation rule within an alert template.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Optional rule label, min 2, max 100 chars, no HTML.',
						required: false
					},
					{
						name: 'metric',
						type: 'string',
						description: "Optional metric type: 'status_code' | 'response_time_ms' | 'timeout'.",
						required: false
					},
					{
						name: 'operator',
						type: 'string',
						description:
							"Optional operator: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not_in'.",
						required: false
					},
					{
						name: 'target_value',
						type: 'string',
						description: 'Optional target threshold value.',
						required: false
					},
					{
						name: 'consecutive',
						type: 'number',
						description: 'Optional consecutive breach count (1-20).',
						required: false
					},
					{
						name: 'severity',
						type: 'string',
						description: "Optional severity: 'critical' or 'warning'.",
						required: false
					},
					{
						name: 'is_active',
						type: 'boolean',
						description: 'Optional active status flag.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/alert-templates/template_uuid/rules/rule_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "Adjusted Latency Threshold",
    "target_value": "1500",
    "consecutive": 2
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "rule_uuid",
    "name": "Adjusted Latency Threshold",
    "metric": "response_time_ms",
    "operator": ">",
    "target_value": "1500",
    "consecutive": 2,
    "severity": "warning",
    "is_active": true
  }
}`
						}
					]
				}
			},
			{
				id: 'alerttemplate-delete-rule',
				method: 'DELETE',
				path: '/organization/:orgId/alert-templates/:templateId/rules/:ruleId',
				title: 'Delete rule from template',
				description: 'Remove a specific rule from an alert template.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/alert-templates/template_uuid/rules/rule_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{ "status": "success", "message": "Alert rule deleted from template" }`
						}
					]
				}
			},
			{
				id: 'alerttemplate-assign-monitor',
				method: 'POST',
				path: '/organization/:orgId/monitors/:monitorId/template',
				title: 'Assign template to monitor',
				description:
					'Subscribe a monitor to an alert template, or pass null to use system defaults.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'template_id',
						type: 'string | null',
						description: 'UUID of the alert template, or null to detach.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid/template \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{ "template_id": "e4b1a2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c" }'`,
					responses: [
						{
							status: '200 OK',
							code: `{ "status": "success", "message": "Monitor template updated successfully" }`
						}
					]
				}
			},

			{
				id: 'alertrule-list-monitor',
				method: 'GET',
				path: '/organization/:orgId/monitors/:monitorId/alert-rules',
				title: 'List alert rules for monitor',
				description: 'Retrieve all alert rules configured for a specific monitor.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid/alert-rules \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "7b83d1c4-6e21-487a-b519-7e3e0c0d1234",
      "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "monitor_id": "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f",
      "name": "High Latency Alert",
      "metric": "response_time_ms",
      "operator": ">=",
      "target_value": "1500",
      "consecutive": 3,
      "severity": "warning",
      "is_active": true,
      "created_at": "2026-09-22T08:00:00Z",
      "updated_at": "2026-09-22T08:00:00Z"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'alertrule-create',
				method: 'POST',
				path: '/organization/:orgId/monitors/:monitorId/alert-rules',
				title: 'Create alert rule',
				description:
					'Create a new alert rule for a monitor. Breaches trigger warning state (degraded) or critical incidents (monitor down).',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 2, max 100 chars, no HTML.',
						required: true
					},
					{
						name: 'metric',
						type: 'string',
						description: "Required, oneof: 'status_code' | 'response_time_ms' | 'timeout'.",
						required: true
					},
					{
						name: 'operator',
						type: 'string',
						description:
							"Required, oneof: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not_in'.",
						required: true
					},
					{
						name: 'target_value',
						type: 'string',
						description: "Required, min 1, max 100 chars, e.g. '200', '500', '1000'.",
						required: true
					},
					{
						name: 'consecutive',
						type: 'number',
						description: 'Optional. Default: 3. Consecutive breaches required before triggering.',
						required: false
					},
					{
						name: 'severity',
						type: 'string',
						description: "Required, oneof: 'critical' | 'warning'.",
						required: true
					},
					{
						name: 'is_active',
						type: 'boolean',
						description: 'Optional. Default: true.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/monitors/monitor_uuid/alert-rules \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "High Response Time Rule",
    "metric": "response_time_ms",
    "operator": ">=",
    "target_value": "1500",
    "consecutive": 3,
    "severity": "warning",
    "is_active": true
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": {
    "id": "7b83d1c4-6e21-487a-b519-7e3e0c0d1234",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "monitor_id": "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f",
    "name": "High Response Time Rule",
    "metric": "response_time_ms",
    "operator": ">=",
    "target_value": "1500",
    "consecutive": 3,
    "severity": "warning",
    "is_active": true,
    "created_at": "2026-09-22T08:00:00Z",
    "updated_at": "2026-09-22T08:00:00Z"
  }
}`
						},
						{
							status: '400 Bad Request',
							code: `{
  "error": "Validation failed: metric or operator invalid"
}`
						}
					]
				}
			},
			{
				id: 'alertrule-get',
				method: 'GET',
				path: '/organization/:orgId/alert-rules/:ruleId',
				title: 'Get alert rule detail',
				description: 'Retrieve details of an alert rule by its unique ID.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/alert-rules/rule_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "7b83d1c4-6e21-487a-b519-7e3e0c0d1234",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "monitor_id": "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f",
    "name": "High Response Time Rule",
    "metric": "response_time_ms",
    "operator": ">=",
    "target_value": "1500",
    "consecutive": 3,
    "severity": "warning",
    "is_active": true,
    "created_at": "2026-09-22T08:00:00Z",
    "updated_at": "2026-09-22T08:00:00Z"
  }
}`
						},
						{
							status: '404 Not Found',
							code: `{
  "error": "Alert rule not found"
}`
						}
					]
				}
			},
			{
				id: 'alertrule-update',
				method: 'PUT',
				path: '/organization/:orgId/alert-rules/:ruleId',
				title: 'Update alert rule',
				description: 'Update configuration parameters of an existing alert rule.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Optional, min 2, max 100 chars, no HTML.',
						required: false
					},
					{
						name: 'metric',
						type: 'string',
						description: "Optional, oneof: 'status_code' | 'response_time_ms' | 'timeout'.",
						required: false
					},
					{
						name: 'operator',
						type: 'string',
						description:
							"Optional, oneof: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not_in'.",
						required: false
					},
					{
						name: 'target_value',
						type: 'string',
						description: 'Optional, min 1, max 100 chars.',
						required: false
					},
					{
						name: 'consecutive',
						type: 'number',
						description: 'Optional.',
						required: false
					},
					{
						name: 'severity',
						type: 'string',
						description: "Optional, oneof: 'critical' | 'warning'.",
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/alert-rules/rule_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "consecutive": 2,
    "severity": "critical"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "7b83d1c4-6e21-487a-b519-7e3e0c0d1234",
    "organization_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "monitor_id": "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f",
    "name": "High Response Time Rule",
    "metric": "response_time_ms",
    "operator": ">=",
    "target_value": "1500",
    "consecutive": 2,
    "severity": "critical",
    "is_active": true,
    "created_at": "2026-09-22T08:00:00Z",
    "updated_at": "2026-09-22T08:15:00Z"
  }
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
				id: 'alertrule-delete',
				method: 'DELETE',
				path: '/organization/:orgId/alert-rules/:ruleId',
				title: 'Delete alert rule',
				description: 'Permanently remove an alert rule.',
				auth: 'Bearer token + TenantMiddleware + RequireRole("owner", "admin")',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/alert-rules/rule_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Alert rule deleted successfully"
}`
						},
						{
							status: '404 Not Found',
							code: `{
  "error": "Alert rule not found"
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/incident/incident_uuid \\
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
				title: 'List incidents',
				description: 'List all incidents for the organization, optionally filtered by monitor ID.',
				auth: 'Bearer token + TenantMiddleware',
				queryParams: [
					{
						name: 'monitor_id',
						type: 'string (uuid)',
						description: 'Optional filter by specific monitor UUID.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:27346/api/v1/organization/org_uuid/incident?monitor_id=monitor_uuid" \\
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
						description: 'Required, min 10, max 200 chars.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/incident/incident_uuid \\
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
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/incident/incident_uuid/join \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/incident/incident_uuid/updates \\
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
						name: 'logo_url',
						type: 'string',
						description: 'Optional. URL for brand logo image.',
						required: false
					},
					{
						name: 'favicon_url',
						type: 'string',
						description: 'Optional. URL for status page favicon.',
						required: false
					},
					{
						name: 'theme_color',
						type: 'string',
						description: "Optional. Hex color code, e.g. '#2563eb'.",
						required: false
					},
					{
						name: 'custom_css',
						type: 'string',
						description: 'Optional. Custom CSS stylesheet override.',
						required: false
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
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/statuspage \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/statuspage \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/monitors \\
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
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid \\
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
						name: 'logo_url',
						type: 'string',
						description: 'Optional. URL for brand logo image.',
						required: false
					},
					{
						name: 'favicon_url',
						type: 'string',
						description: 'Optional. URL for status page favicon.',
						required: false
					},
					{
						name: 'theme_color',
						type: 'string',
						description: 'Optional. Hex color code.',
						required: false
					},
					{
						name: 'custom_css',
						type: 'string',
						description: 'Optional. Custom CSS stylesheet override.',
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "title": "Updated Status Page",
    "theme_color": "#10b981"
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
					code: `curl -X GET http://localhost:27346/api/v1/statuspages \\
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
      "organization": { "id": "uuid", "name": "Acme Corp", "slug": "acme-corp" },
      "subdomain": "status",
      "title": "Production Status",
      "is_public": true
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'statuspage-group-create',
				method: 'POST',
				path: '/organization/:orgId/statuspage/:statusPageId/groups',
				title: 'Create component group',
				description:
					'Component groups allow grouping multiple monitors together on the public status page with expandable or collapsible headers.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Required, min 1, max 100 chars.',
						required: true
					},
					{
						name: 'display_order',
						type: 'number',
						description: 'Optional. Default: 0.',
						required: false
					},
					{
						name: 'is_expanded',
						type: 'boolean',
						description:
							'Optional. Default: true. Whether group is expanded by default on status page.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/groups \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "Core Services",
    "display_order": 0,
    "is_expanded": true
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": {
    "id": "uuid",
    "status_page_id": "uuid",
    "name": "Core Services",
    "display_order": 0,
    "is_expanded": true,
    "created_at": "2026-09-22T08:00:00Z",
    "updated_at": "2026-09-22T08:00:00Z"
  }
}`
						}
					]
				}
			},
			{
				id: 'statuspage-group-list',
				method: 'GET',
				path: '/organization/:orgId/statuspage/:statusPageId/groups',
				title: 'List component groups',
				description: 'Retrieve all component groups configured for a status page.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/groups \\
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
      "name": "Core Services",
      "display_order": 0,
      "is_expanded": true,
      "created_at": "2026-09-22T08:00:00Z",
      "updated_at": "2026-09-22T08:00:00Z"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'statuspage-group-update',
				method: 'PUT',
				path: '/organization/:orgId/statuspage/:statusPageId/groups/:groupId',
				title: 'Update component group',
				description:
					'Update the name, display order, or default expanded state of a component group.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'name',
						type: 'string',
						description: 'Optional, min 1, max 100 chars.',
						required: false
					},
					{
						name: 'display_order',
						type: 'number',
						description: 'Optional.',
						required: false
					},
					{
						name: 'is_expanded',
						type: 'boolean',
						description: 'Optional.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/groups/group_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "name": "Platform Infrastructure",
    "display_order": 1,
    "is_expanded": true
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "group_uuid",
    "status_page_id": "statuspage_uuid",
    "name": "Platform Infrastructure",
    "display_order": 1,
    "is_expanded": true,
    "created_at": "2026-09-22T08:00:00Z",
    "updated_at": "2026-09-22T08:30:00Z"
  }
}`
						}
					]
				}
			},
			{
				id: 'statuspage-group-delete',
				method: 'DELETE',
				path: '/organization/:orgId/statuspage/:statusPageId/groups/:groupId',
				title: 'Delete component group',
				description:
					'Delete a component group. Any monitors previously assigned to this group will become ungrouped.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/groups/group_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Component group deleted successfully"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-monitor-group-assign',
				method: 'PUT',
				path: '/organization/:orgId/statuspage/:statusPageId/monitors/:monitorId/group',
				title: 'Assign monitor to component group',
				description:
					'Assigns or unassigns a monitor to/from a component group. Pass null or omit group_id to remove the monitor from its current group.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'group_id',
						type: 'string|null (uuid)',
						description: 'Optional. Component group UUID, or null to unassign.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/monitors/monitor_uuid/group \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "group_id": "group_uuid"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Monitor assigned to group successfully"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-maintenance-create',
				method: 'POST',
				path: '/organization/:orgId/statuspage/:statusPageId/maintenance',
				title: 'Create scheduled maintenance',
				description:
					'Schedule upcoming system maintenance to display advance notices on the status page.',
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'title',
						type: 'string',
						description: 'Required, min 3, max 120 chars.',
						required: true
					},
					{
						name: 'description',
						type: 'string',
						description: 'Optional. Detailed maintenance description.',
						required: false
					},
					{
						name: 'scheduled_start',
						type: 'string (RFC3339)',
						description: "Required, RFC3339 timestamp, e.g. '2026-04-01T02:00:00Z'.",
						required: true
					},
					{
						name: 'scheduled_end',
						type: 'string (RFC3339)',
						description: "Required, RFC3339 timestamp, e.g. '2026-04-01T05:00:00Z'.",
						required: true
					},
					{
						name: 'monitor_ids',
						type: 'array<string (uuid)>',
						description: 'Optional. List of monitor UUIDs impacted by this maintenance.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/maintenance \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "title": "Scheduled Database Migration",
    "description": "Routine database upgrade on read replicas.",
    "scheduled_start": "2026-10-01T02:00:00Z",
    "scheduled_end": "2026-10-01T04:00:00Z",
    "monitor_ids": ["monitor_uuid_1"]
  }'`,
					responses: [
						{
							status: '201 Created',
							code: `{
  "status": "success",
  "data": {
    "id": "maintenance_uuid",
    "status_page_id": "statuspage_uuid",
    "title": "Scheduled Database Migration",
    "description": "Routine database upgrade on read replicas.",
    "status": "scheduled",
    "scheduled_start": "2026-10-01T02:00:00Z",
    "scheduled_end": "2026-10-01T04:00:00Z",
    "created_at": "2026-09-22T08:00:00Z",
    "affected_monitor_ids": ["monitor_uuid_1"]
  }
}`
						}
					]
				}
			},
			{
				id: 'statuspage-maintenance-list',
				method: 'GET',
				path: '/organization/:orgId/statuspage/:statusPageId/maintenance',
				title: 'List scheduled maintenance',
				description: 'Retrieve all maintenance windows configured for a status page.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/maintenance \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": [
    {
      "id": "maintenance_uuid",
      "status_page_id": "statuspage_uuid",
      "title": "Scheduled Database Migration",
      "status": "scheduled",
      "scheduled_start": "2026-10-01T02:00:00Z",
      "scheduled_end": "2026-10-01T04:00:00Z",
      "created_at": "2026-09-22T08:00:00Z"
    }
  ]
}`
						}
					]
				}
			},
			{
				id: 'statuspage-maintenance-update',
				method: 'PUT',
				path: '/organization/:orgId/statuspage/:statusPageId/maintenance/:maintenanceId',
				title: 'Update scheduled maintenance',
				description:
					"Update maintenance window properties or status ('scheduled' | 'in_progress' | 'completed').",
				auth: 'Bearer token + TenantMiddleware',
				requestBody: [
					{
						name: 'title',
						type: 'string',
						description: 'Optional, min 3, max 120 chars.',
						required: false
					},
					{
						name: 'description',
						type: 'string',
						description: 'Optional.',
						required: false
					},
					{
						name: 'status',
						type: 'string',
						description: "Optional, oneof: 'scheduled' | 'in_progress' | 'completed'.",
						required: false
					},
					{
						name: 'scheduled_start',
						type: 'string (RFC3339)',
						description: 'Optional.',
						required: false
					},
					{
						name: 'scheduled_end',
						type: 'string (RFC3339)',
						description: 'Optional.',
						required: false
					},
					{
						name: 'monitor_ids',
						type: 'array<string (uuid)>',
						description: 'Optional.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/maintenance/maintenance_uuid \\
  -H "Content-Type: application/json" \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..." \\
  -d '{
    "status": "in_progress"
  }'`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "id": "maintenance_uuid",
    "status": "in_progress",
    "actual_start": "2026-10-01T02:00:00Z"
  }
}`
						}
					]
				}
			},
			{
				id: 'statuspage-maintenance-delete',
				method: 'DELETE',
				path: '/organization/:orgId/statuspage/:statusPageId/maintenance/:maintenanceId',
				title: 'Delete scheduled maintenance',
				description: 'Permanently remove a scheduled maintenance window.',
				auth: 'Bearer token + TenantMiddleware',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/statuspage/statuspage_uuid/maintenance/maintenance_uuid \\
  --cookie "access_token=eyJhbGciOiJIUzI1NiIs..."`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "message": "Maintenance deleted successfully"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-public',
				method: 'GET',
				path: '/public/statuspage/:subdomain',
				title: 'Public status page detail',
				description:
					'Public endpoint returning complete real-time status page structure, active incidents, component groups, scheduled maintenance, and 90-day history. No authentication required.',
				auth: 'None',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/public/statuspage/status`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "success",
  "data": {
    "title": "Acme Status",
    "description": "Real-time system status and incident history",
    "subdomain": "acme",
    "overall_status": "operational",
    "logo_url": "https://example.com/logo.png",
    "favicon_url": "https://example.com/favicon.ico",
    "theme_color": "#2563eb",
    "custom_css": "",
    "monitors": [
      {
        "id": "uuid",
        "name": "API Gateway",
        "type": "http",
        "status": "up",
        "group_id": "group_uuid",
        "group_name": "Core Services",
        "uptime_percent": 99.98,
        "recent_checks": [1, 1, 1, 1, 1],
        "daily_stats": [
          {
            "date": "2026-09-21",
            "uptime_percentage": 100.0,
            "down_checks": 0,
            "total_checks": 1440,
            "has_data": true
          }
        ]
      }
    ],
    "component_groups": [
      {
        "id": "group_uuid",
        "name": "Core Services",
        "display_order": 0,
        "is_expanded": true
      }
    ],
    "active_incidents": [],
    "recent_incidents": [],
    "upcoming_maintenances": [],
    "ongoing_maintenances": []
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
			},
			{
				id: 'statuspage-public-summary',
				method: 'GET',
				path: '/public/statuspage/:subdomain/summary.json',
				title: 'Public status summary JSON',
				description:
					'Standard summary JSON endpoint for integrations, returning the complete status page structure directly at root level JSON.',
				auth: 'None',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/public/statuspage/status/summary.json`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "title": "Acme Status",
  "subdomain": "acme",
  "overall_status": "operational",
  "monitors": [ ... ],
  "component_groups": [ ... ],
  "active_incidents": [],
  "upcoming_maintenances": []
}`
						}
					]
				}
			},
			{
				id: 'statuspage-public-status-json',
				method: 'GET',
				path: '/public/statuspage/:subdomain/status.json',
				title: 'Public status health check JSON',
				description:
					"Lightweight status health check endpoint. Status values: 'operational', 'degraded', 'partial_outage', 'major_outage', 'maintenance'.",
				auth: 'None',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/public/statuspage/status/status.json`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "operational",
  "description": "All Systems Operational",
  "updated_at": "2026-09-22T03:30:00Z"
}`
						}
					]
				}
			},
			{
				id: 'statuspage-public-badge',
				method: 'GET',
				path: '/public/statuspage/:subdomain/badge.svg',
				title: 'Public status dynamic SVG badge',
				description:
					'Returns a dynamic SVG shields.io-compatible badge representing current real-time status. Ideal for GitHub READMEs and team dashboards.',
				auth: 'None',
				notes: [
					'Content-Type: image/svg+xml',
					'Color codes: operational (#10b981), degraded (#f59e0b), partial outage (#f97316), major outage (#ef4444), maintenance (#3b82f6)'
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET http://localhost:27346/api/v1/public/statuspage/status/badge.svg`,
					responses: [
						{
							status: '200 OK (image/svg+xml)',
							code: `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="20" role="img" aria-label="status: operational">
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r"><rect width="108" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="47" height="20" fill="#555"/>
    <rect x="47" width="61" height="20" fill="#10b981"/>
    <rect width="108" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="110">
    <text x="245" y="140" transform="scale(.1)">status</text>
    <text x="765" y="140" transform="scale(.1)">operational</text>
  </g>
</svg>`
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
					code: `curl -X GET "http://localhost:27346/api/v1/organization/org_uuid/audit-logs?page=1&limit=20" \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/notifications/channels \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/notifications/channels/channel_uuid \\
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
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/notifications/channels \\
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
					code: `curl -X PUT http://localhost:27346/api/v1/organization/org_uuid/notifications/channels/channel_uuid \\
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
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/notifications/channels/channel_uuid \\
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
					code: `curl -X GET "http://localhost:27346/api/v1/organization/org_uuid/notifications/logs?limit=50&offset=0" \\
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
					code: `curl -X GET http://localhost:27346/api/v1/organization/org_uuid/api-keys \\
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
      "key_prefix": "nuk_5f7a8b9c",
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
					code: `curl -X POST http://localhost:27346/api/v1/organization/org_uuid/api-keys \\
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
    "key_prefix": "nuk_5f7a8b9c",
    "permissions": "read",
    "last_used_at": null,
    "last_used_ip": "",
    "expires_at": "2024-01-01T00:00:00Z",
    "created_at": "2023-11-01T14:32:00Z",
    "created_by": "uuid",
    "plaintext_key": "nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"
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
					code: `curl -X DELETE http://localhost:27346/api/v1/organization/org_uuid/api-keys/key_uuid \\
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
				title: 'Real-time WebSocket stream',
				description:
					'Real-time streaming endpoint for monitor status transitions, check response times, and failure counts. During handshake, the server loads all organizations the authenticated user belongs to and automatically subscribes the connection to those organization rooms.',
				auth: 'Bearer token (via httpOnly access_token cookie or WebSocket handshake)',
				notes: [
					'Protocol: WebSocket upgrade (RFC 6455)',
					'Message Envelope: {"Room": "<orgId>", "Type": "<event_type>", "Payload": {...}}',
					'Event MONITOR_UPDATED: Dispatched whenever an automated worker check evaluates a monitor state.',
					'Keep connection alive using standard WebSocket Ping / Pong frames.',
					'Clients should implement exponential backoff reconnection (1s, 2s, 4s, up to 10s max) on connection loss.'
				],
				codeExample: {
					language: 'javascript',
					label: 'Example Client',
					code: `const ws = new WebSocket("ws://localhost:27346/api/v1/ws");

ws.onopen = () => {
  console.log("WebSocket connected. Subscribed to all org rooms.");
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(\`[\${message.Type}] Room: \${message.Room}\`, message.Payload);
};

ws.onclose = () => {
  console.log("Connection closed. Reconnecting with exponential backoff...");
};`,
					responses: [
						{
							status: 'MONITOR_UPDATED Envelope',
							code: `{
  "Room": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "Type": "MONITOR_UPDATED",
  "Payload": {
    "id": "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f",
    "status": "up",
    "response_time": 124,
    "last_checked": "2026-09-22T10:25:00Z",
    "failure_count": 0
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
					code: `curl -X GET http://localhost:27346/api/v1/public/monitors \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"`,
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
					code: `curl -X GET http://localhost:27346/api/v1/public/monitors/monitor_uuid \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"`,
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
						description: 'Required, min 1, max 30.',
						required: true
					},
					{
						name: 'criticality',
						type: 'string',
						description: "Required, oneof: 'extreme' | 'high' | 'medium' | 'low'.",
						required: true
					},
					{
						name: 'assignees',
						type: 'array<string (uuid)>',
						description: 'Required. Min 1, max 50 items.',
						required: true
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X POST http://localhost:27346/api/v1/public/monitors \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "New Monitor",
    "type": "http",
    "target": "https://api.example.com/health",
    "interval_seconds": 60,
    "timeout_seconds": 10,
    "criticality": "high",
    "assignees": ["user_uuid"]
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
					code: `curl -X PUT http://localhost:27346/api/v1/public/monitors/monitor_uuid \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a" \\
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
					code: `curl -X DELETE http://localhost:27346/api/v1/public/monitors/monitor_uuid \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"`,
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
				queryParams: [
					{
						name: 'monitor_id',
						type: 'string (uuid)',
						description: 'Optional filter by monitor UUID.',
						required: false
					}
				],
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -X GET "http://localhost:27346/api/v1/public/incidents?monitor_id=monitor_uuid" \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"`,
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
					code: `curl -X POST http://localhost:27346/api/v1/public/incidents \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a" \\
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
					code: `curl -X GET http://localhost:27346/api/v1/public/status-pages \\
  -H "Authorization: Bearer nuk_5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"`,
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
		id: 'health',
		label: 'Health & System',
		endpoints: [
			{
				id: 'health-liveness',
				method: 'GET',
				path: '/healthz',
				title: 'Liveness & Readiness probe',
				description:
					'Check container health, database connectivity, and engine status. Suitable for Kubernetes or Docker container health checks.',
				auth: 'None',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -s http://localhost:27346/healthz`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "ok",
  "database": "connected",
  "db_driver": "postgres",
  "app_mode": "selfhosted",
  "timestamp": "2026-10-04T12:00:00Z"
}`
						},
						{
							status: '503 Service Unavailable',
							code: `{
  "status": "degraded",
  "database": "unreachable",
  "db_driver": "postgres",
  "app_mode": "selfhosted",
  "timestamp": "2026-10-04T12:00:00Z"
}`
						}
					]
				}
			},
			{
				id: 'health-status',
				method: 'GET',
				path: '/api/v1/health',
				title: 'API Health status',
				description:
					'Verify API health and database connectivity. Shares the same handler as /healthz.',
				auth: 'None',
				codeExample: {
					language: 'bash',
					label: 'Example Request',
					code: `curl -s http://localhost:27346/api/v1/health`,
					responses: [
						{
							status: '200 OK',
							code: `{
  "status": "ok",
  "database": "connected",
  "db_driver": "postgres",
  "app_mode": "selfhosted",
  "timestamp": "2026-10-04T12:00:00Z"
}`
						},
						{
							status: '503 Service Unavailable',
							code: `{
  "status": "degraded",
  "database": "unreachable",
  "db_driver": "postgres",
  "app_mode": "selfhosted",
  "timestamp": "2026-10-04T12:00:00Z"
}`
						}
					]
				}
			}
		]
	}
];
