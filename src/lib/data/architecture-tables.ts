export interface TableData {
	columns: string[];
	rows: string[][];
	mono?: number[];
}

export const runtimeConstants = {
	schedulerIntervalSeconds: 20,
	workerCount: 10,
	jobQueueSize: 1000,
	wsPingSeconds: 54,
	wsPongWaitSeconds: 60,
	wsMaxMessageBytes: 512,
	apiKeyRateLimitPerMinute: 60,
	retentionHours: 24,
	statusPageHistoryDays: 90
} as const;

export const severityMatrix: TableData = {
	columns: ['Monitor criticality', 'Alert severity', 'Incident severity'],
	rows: [
		['Extreme', 'Critical', 'Critical'],
		['Extreme', 'Warning', 'High'],
		['High', 'Critical', 'Critical'],
		['High', 'Warning', 'High'],
		['Medium', 'Critical', 'High'],
		['Medium', 'Warning', 'Medium'],
		['Low', 'Critical', 'Medium'],
		['Low', 'Warning', 'Low']
	]
};

export const redisKeyMatrix: TableData = {
	columns: ['Category', 'Key pattern', 'TTL', 'Purpose'],
	mono: [1, 2],
	rows: [
		[
			'Monitor list cache',
			'monitors:org:{orgId}',
			'60 seconds',
			'Per-organization monitor list; invalidated on create, update, or delete.'
		],
		[
			'Monitor detail cache',
			'monitor:{monitorId}',
			'60 seconds',
			'Monitor configuration; invalidated when the configuration changes.'
		],
		[
			'User status page cache',
			'statuspages:user:{userId}',
			'24 hours',
			'Reduces heavy relational queries for the dashboard status page list.'
		],
		[
			'Auth IP rate limit',
			'rate:{fullPath}:{clientIP}',
			'1-15 minutes',
			'Brute-force protection: login and register 5 req/min, password reset 3 req/15 min.'
		],
		[
			'Public API rate limit',
			'rate_limit:api_key:{keyId}:{minute}',
			'65 seconds',
			'Sliding-window counter per API key, 60 requests per minute.'
		]
	]
};

export const concurrencyMatrix: TableData = {
	columns: ['Goroutine', 'Trigger', 'Communication', 'Isolation'],
	rows: [
		[
			'HTTP server goroutines',
			'Incoming HTTP request',
			'Gin router and handlers',
			'context.Context, DB connection pool, Redis atomicity'
		],
		[
			'WebSocket hub loop',
			'Register, unregister, broadcast',
			'Go channels',
			'sync.RWMutex on room map and client sets'
		],
		[
			'WebSocket ReadPump',
			'Incoming frame from browser',
			'Conn to hub unregister channel',
			'SetReadDeadline, 512 byte limit'
		],
		[
			'WebSocket WritePump',
			'Send channel message or ping ticker',
			'chan []byte (buffer 256)',
			'SetWriteDeadline, periodic ping'
		],
		[
			'Scheduler loop',
			'Ticker every 20 seconds',
			'workerpool.QueueJob',
			'sync.Mutex on lastRun map'
		],
		[
			'Worker pool (10x)',
			'Item in jobQueue',
			'jobQueue channel (buffer 1000)',
			'Independent goroutines process different monitors in parallel'
		],
		[
			'SSL and domain scheduler',
			'Ticker every 24 hours (15s boot delay)',
			'One goroutine per active HTTP monitor',
			'500ms jitter between domain queries'
		],
		[
			'Retention and rollup loop',
			'Ticker every hour',
			'Background DB transaction',
			'Atomic upsert (ON CONFLICT) and batch delete'
		],
		[
			'Notification dispatcher',
			'Monitor breach or recovery event',
			'One goroutine per active channel',
			'Shared http.Client with 20s timeout, anti-SSRF'
		]
	]
};

export const checkerMatrix: TableData = {
	columns: ['Checker', 'Mechanism', 'Typical use'],
	mono: [0],
	rows: [
		[
			'checker/http.go',
			'Isolated http.Client with user timeout; GET request, measures DNS, TLS and body time, verifies status code.',
			'Websites and APIs'
		],
		[
			'checker/tcp.go',
			'net.DialTimeout("tcp", target, timeout) to verify the port accepts connections.',
			'PostgreSQL, Redis, mail servers, custom sockets'
		],
		[
			'checker/ping.go',
			'net.LookupIP resolution plus round-trip latency measurement.',
			'Hosts and IP addresses'
		]
	]
};

export const defaultRulesMatrix: TableData = {
	columns: ['Condition', 'Severity', 'State Transition & Ambang Batas'],
	rows: [
		[
			'Network or connection failure (ECONNREFUSED, DNS error, 5xx)',
			'critical',
			'DOWN after 3 consecutive failures'
		],
		[
			'Request timeout streak (ErrTimeout / Deadline exceeded)',
			'warning',
			'UNRESPONSIVE (Amber) after 3 consecutive timeouts'
		],
		['statusCode != monitor.expectedStatusCode', 'critical', 'DOWN after 3 consecutive breaches']
	]
};

export const ssrfBlocklist: TableData = {
	columns: ['Blocked target', 'Examples'],
	mono: [1],
	rows: [
		['Loopback addresses', '127.0.0.1, localhost, ::1'],
		['Private RFC 1918 subnets', '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16'],
		['Link-local and cloud metadata', '169.254.169.254 (AWS, GCP metadata)'],
		['Non-HTTP protocols', 'Any scheme other than http and https']
	]
};

export const rbacMatrix: TableData = {
	columns: ['Role', 'Allowed operations'],
	rows: [
		[
			'owner',
			'Transfer ownership, disband organization, kick members, invite new members as Admin or Member, promote members to Admin, demote Admins to Member, plus all Admin capabilities'
		],
		[
			'admin',
			'Manage monitors, alert templates & rules, notification channels, status pages & maintenance, invite new users as Member only (cannot invite Admin or promote members)'
		],
		[
			'member',
			'Read-only access to dashboard, monitors, status pages, and active incident response timelines'
		]
	]
};

export const wsComponents: TableData = {
	columns: ['Component', 'Behavior'],
	rows: [
		['Gorilla upgrader', 'Read and write buffers of 1024 bytes.'],
		['Rooms', 'Hub keeps Rooms map[string]map[*Client]bool keyed by OrganizationID.'],
		[
			'ReadPump',
			'Reads messages (max 512 bytes), extends the deadline on every pong, unregisters on disconnect.'
		],
		['WritePump', 'Sends a ping every 54 seconds, which is (pongWait * 9) / 10.'],
		[
			'Client backoff',
			'ws.ts reconnects with exponential backoff: min(1000 * 2^attempt, 10000) ms.'
		]
	]
};

export const auditFields: TableData = {
	columns: ['Field', 'Values'],
	mono: [1],
	rows: [
		['Actor', 'Name, email, and avatar of the user'],
		['Action', 'created, updated, deleted, transferred, invited, kicked, promoted, demoted'],
		['Entity', 'monitor, organization, member, status_page, api_key, alert_rule, maintenance'],
		['Metadata', 'Client IP address and millisecond timestamp']
	]
};
