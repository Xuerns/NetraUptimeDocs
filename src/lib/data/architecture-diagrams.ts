export interface ArchitectureDiagram {
	id: string;
	label: string;
	definition: string;
}

export const topologyDiagram: ArchitectureDiagram = {
	id: 'topology',
	label: 'Netra Uptime system topology',
	definition: `graph TB
    subgraph Client["Frontend (SvelteKit SPA)"]
        Browser["Web Browser"]
        WSClient["WebSocket Client"]
    end
    subgraph Container["Single Container / Process"]
        subgraph Ingress["Gin HTTP Engine"]
            Static["go:embed BuildFS + SPA fallback"]
            EnvJS["Runtime config /_app/env.js"]
            MemRate["In-memory sliding-window limiters"]
            Auth["JWT auth + tenant RBAC"]
            API["REST API /api/v1/*"]
            PublicAPI["Public API /api/v1/public/*"]
            WSEndpoint["WebSocket /api/v1/ws"]
        end
        subgraph InternalCache["In-Memory Store"]
            MemCache["cache.MemoryCache (sync.RWMutex)"]
        end
        subgraph RT["Real-time"]
            Hub["WebSocket Hub"]
        end
        subgraph Workers["Background workers"]
            Sched["Scheduler (20s)"]
            Queue["Job channel (1000)"]
            Pool["Worker pool (10)"]
            Checkers["HTTP / TCP / Ping checkers"]
            Eval["Alert evaluator"]
            Notifier["Notification dispatcher"]
            SSL["SSL + domain runner (24h)"]
            Retention["Retention rollup (1h)"]
        end
    end
    subgraph Storage["Data layer"]
        DB[("PostgreSQL 16 / SQLite (WAL)")]
    end
    subgraph External["External targets"]
        Targets["HTTP / TCP / Ping targets"]
        Channels["Slack / Discord / Webhook / SMTP"]
    end
    Browser --> Ingress
    WSClient <--> WSEndpoint
    WSEndpoint --> Hub
    Ingress --> Auth --> API
    API --> DB
    API <--> MemCache
    MemRate <--> MemCache
    PublicAPI <--> MemCache
    Sched --> Queue --> Pool --> Checkers
    Checkers --> Targets
    Checkers --> Eval
    Eval --> DB
    Eval --> Hub
    Eval --> Notifier --> Channels
    SSL --> DB
    Retention --> DB`
};

export const bootstrapDiagram: ArchitectureDiagram = {
	id: 'bootstrap',
	label: 'Application bootstrap sequence',
	definition: `sequenceDiagram
    autonumber
    participant Entry as "Entrypoint (Server / Desktop)"
    participant App as "internal/app (Lifecycle)"
    participant Cfg as config
    participant Cache as MemoryCache
    participant DB as "PostgreSQL / SQLite"
    participant Hub as WebSocket Hub
    participant WP as WorkerPool
    participant Sched as Scheduler
    participant SSL as SSLDomainScheduler
    participant Ret as RetentionJob
    participant Gin as Gin Engine
    Entry->>App: app.Setup(cfg)
    App->>Cfg: Load environment & ensure JWT secret
    App->>Cache: NewMemoryCache (TTL & 60s eviction)
    App->>DB: Database Init (Postgres pool or SQLite WAL)
    App->>DB: AutoMigrate (27 tables)
    App->>Hub: NewHub and Run goroutine
    App->>WP: NewWorkerPool(10) and Start
    App->>Sched: Start ticker (20s)
    App->>SSL: Start daily ticker (24h)
    App->>Ret: Start ticker (1h)
    App->>Gin: Register validator, CORS, static routes & SetupRouter
    Entry->>Gin: ListenAndServe on PORT`
};

export const requestRoutingDiagram: ArchitectureDiagram = {
	id: 'request-routing',
	label: 'HTTP request routing and authorization tiers',
	definition: `graph TD
    Req["Incoming HTTP request"] --> Check{"URL path"}
    Check -->|"/_app/* and static files"| Static["Serve from go:embed"]
    Check -->|"Non-API path"| SPA["Fallback to index.html"]
    Check -->|"/healthz, /api/v1/health"| Health["DB connectivity check"]
    Check -->|"/api/v1/public/*"| KeyGate["APIKeyAuthMiddleware"]
    KeyGate --> Hash["Verify SHA-256 key hash"]
    Hash --> KeyRate["In-memory counter 60 req/min"]
    KeyRate --> Perm["RequireAPIKeyPermission"]
    Perm --> PublicHandler["Public API handler"]
    Check -->|"/api/v1/auth/*"| IPRate["In-memory IP rate limiter"]
    IPRate --> AuthCtl["Register / Login / Refresh / Reset"]
    Check -->|"/api/v1/organization/:orgId/*"| JWT["AuthMiddleware (JWT cookie)"]
    JWT --> Tenant["TenantMiddleware (membership)"]
    Tenant --> Role["RequireRole (owner / admin / member)"]
    Role --> OrgHandler["Handler with org and role context"]`
};

export const schedulerDiagram: ArchitectureDiagram = {
	id: 'scheduler',
	label: 'Scheduler and worker pool flow',
	definition: `flowchart TD
    Tick["Ticker fires (every 20s)"] --> Fetch["Fetch active monitors"]
    Fetch --> Lock["Lock scheduler mutex"]
    Lock --> Iter["Iterate monitors"]
    Iter --> Due{"now - lastRun >= interval?"}
    Due -->|Yes| Enq["QueueJob(monitor)"]
    Due -->|No| Skip["Skip this cycle"]
    Enq --> Last["lastRun[monitor.ID] = now"]
    Enq -.-> Queue[("jobQueue (buffer 1000)")]
    Queue --> W1["Worker 1"]
    Queue --> W2["Worker 2"]
    Queue --> WN["Worker N"]
    W1 --> Switch{"Monitor type"}
    W2 --> Switch
    WN --> Switch
    Switch -->|http| HTTP["CheckHTTPWithOptions"]
    Switch -->|tcp| TCP["CheckTCP"]
    Switch -->|ping| Ping["CheckPing"]
    HTTP --> Attempt1["Attempt #1 Result"]
    TCP --> Attempt1
    Ping --> Attempt1
    Attempt1 --> ShouldRetry{"Transient error / 5xx / timeout?"}
    ShouldRetry -->|Yes| RetryWait["Sleep 2s & Attempt #2 (Immediate Retry)"]
    RetryWait --> FinalResult["Final Check Result"]
    ShouldRetry -->|No / SSRF| FinalResult
    FinalResult --> MaintCheck{"syncAndCheckMaintenance"}
    MaintCheck -->|Window Active| Suppress["Tag status = 'maintenance' & Suppress Alert"]
    MaintCheck -->|Normal Operation| Rules["EvaluateRules (Alert Template)"]
    Rules --> Save["Persist to checks & incidents table"]
    Suppress --> Save`
};

export const stateMachineDiagram: ArchitectureDiagram = {
	id: 'state-machine',
	label: 'Monitor status state machine',
	definition: `stateDiagram-v2
    [*] --> UP: New monitor
    UP --> UP: Rules passed (FailureCount = 0)
    UP --> DEGRADED: Warning rule breached (e.g. latency > threshold)
    UP --> UNRESPONSIVE: Consecutive Timeouts >= 3 (Amber Warning)
    UP --> UP: Critical breach below threshold
    UP --> DOWN: FailureCount >= RequiredBreaches / Hard Failure
    UP --> MAINTENANCE: Scheduled maintenance window starts
    DEGRADED --> UP: Healthy again
    DEGRADED --> UNRESPONSIVE: Consecutive Timeouts >= 3
    DEGRADED --> DOWN: Critical breach at threshold
    DEGRADED --> MAINTENANCE: Maintenance starts
    UNRESPONSIVE --> UP: Healthy check (Auto-resolved)
    UNRESPONSIVE --> DOWN: Hard crash / Connection refused
    UNRESPONSIVE --> MAINTENANCE: Maintenance starts
    DOWN --> DOWN: Still breached
    DOWN --> UP: All rules passed (Auto-resolve)
    DOWN --> MAINTENANCE: Maintenance starts
    MAINTENANCE --> UP: Maintenance completes (target healthy)
    MAINTENANCE --> DOWN: Maintenance completes (target down)`
};

export const incidentDiagram: ArchitectureDiagram = {
	id: 'incident-lifecycle',
	label: 'Incident lifecycle and notification dispatch',
	definition: `sequenceDiagram
    autonumber
    participant WP as WorkerPool
    participant DB as DB (Postgres / SQLite)
    participant D as Dispatcher
    participant SMTP as SMTP
    participant Slack as Slack
    participant Discord as Discord
    participant WH as Custom webhook
    alt Target in Active Scheduled Maintenance
        WP->>DB: Record check as status = 'maintenance' (Alert suppressed)
    else Status becomes UNRESPONSIVE (3x Timeout)
        WP->>DB: Create medium severity incident
        WP->>D: Dispatch monitor.unresponsive (Calm warning)
    else Status becomes DOWN (Critical failure / breach)
        WP->>DB: Create critical incident (with triggered_rule & response_snippet)
        WP->>SMTP: Email the monitor PIC
        WP->>D: Dispatch monitor.down
        D->>DB: Load active channels
        par Parallel delivery
            D->>SMTP: HTML email
            D->>Slack: Block Kit payload
            D->>Discord: Rich embed
            D->>WH: JSON event (SSRF validated)
        end
        D->>DB: Save NotificationLog
    else Status recovers to UP
        WP->>DB: Resolve incident (calculate real downtime duration)
        WP->>SMTP: Service restored email
        WP->>D: Dispatch monitor.up
        D->>DB: Save NotificationLog
    end`
};

export const websocketDiagram: ArchitectureDiagram = {
	id: 'websocket',
	label: 'WebSocket handshake and broadcast sequence',
	definition: `sequenceDiagram
    autonumber
    participant B as Browser (ws.ts)
    participant H as WsHandler
    participant Hub as Hub
    participant WP as WorkerPool
    B->>H: GET /api/v1/ws (Upgrade)
    H->>H: Validate JWT cookie, load organizations
    H->>B: 101 Switching Protocols
    H->>Hub: Register client in org rooms
    par Pumps
        H->>B: WritePump ping every 54s
        B->>H: ReadPump pong (60s deadline)
    end
    WP->>Hub: BroadcastToOrg(MONITOR_UPDATED)
    Hub->>B: JSON frame
    B->>B: Update monitors state without refetch`
};

export const sslRunnerDiagram: ArchitectureDiagram = {
	id: 'ssl-runner',
	label: 'SSL and domain expiry runner',
	definition: `flowchart TD
    Start["Daily ticker (24h, first run 15s after boot)"] --> Fetch["Active http monitors with ssl/domain check enabled"]
    Fetch --> Parse["Extract host and apex domain"]
    Parse --> Dial["tls.DialWithDialer"]
    Dial --> Cert["Read NotAfter and compute days left"]
    Cert --> Cat{"Days left"}
    Cat -->|"< 0"| Expired["expired"]
    Cat -->|"<= 30"| Warn["warning"]
    Cat -->|"> 30"| Valid["valid"]
    Parse --> Shared{"Shared platform domain?"}
    Shared -->|Yes| None["status none"]
    Shared -->|No| RDAP["Query RDAP"]
    RDAP --> Ok{"RDAP success?"}
    Ok -->|Yes| Calc["Compute domain days left"]
    Ok -->|No| WHOIS["Fallback to WHOIS port 43"]
    WHOIS --> Calc
    Expired --> Save["Update monitors table"]
    Warn --> Save
    Valid --> Save
    Calc --> Save
    Save --> Remind{"Days left in 30, 14, 7, 3?"}
    Remind -->|Yes| Send["Email PIC; escalate to admins and owner at 7 days or less"]
    Remind -->|No| Done["Done"]`
};

export const cacheDiagram: ArchitectureDiagram = {
	id: 'cache',
	label: 'In-memory read-through cache and invalidation',
	definition: `graph TD
    Req["Read monitor or status page"] --> Hit{"MemoryCache key exists?"}
    Hit -->|HIT| Cached["Return cached JSON"]
    Hit -->|MISS| DB["Query DB (Postgres / SQLite)"]
    DB --> Store["Store in MemoryCache with TTL"]
    Store --> Fresh["Return fresh data"]
    Mut["Create / update / delete monitor"] --> Write["Write to DB"]
    Write --> Del1["DEL monitors:org:{orgId}"]
    Write --> Del2["DEL monitor:{monitorId}"]
    Write --> Del3["DEL monitors:overview:org:{orgId}:*"]`
};

export const retentionDiagram: ArchitectureDiagram = {
	id: 'retention',
	label: 'Hourly retention and rollup pipeline',
	definition: `flowchart TD
    Tick["Hourly ticker"] --> Threshold["threshold = now - 24h"]
    Threshold --> Agg["Aggregate GROUP BY monitor_id, DATE(checked_at)"]
    Agg --> Metrics["Total, uptime %, avg/min/max latency, status buckets"]
    Metrics --> Upsert["Upsert monitor_daily_stats (ON CONFLICT DO UPDATE)"]
    Upsert --> Delete["DELETE FROM checks WHERE checked_at < threshold"]
    Delete --> Log["Log rows cleaned"]`
};

export const statusPageDiagram: ArchitectureDiagram = {
	id: 'status-page',
	label: 'Public status page request flow',
	definition: `graph LR
    Visitor["Public visitor"] --> Route["GET /status/:subdomain"]
    Route --> Query["Query StatusPage by subdomain"]
    Query --> Components["Load monitors and component groups"]
    Components --> Maint["Load active maintenance"]
    Maint --> Days["Load 90 days from monitor_daily_stats"]
    Days --> Render["Return payload and render page"]
    Visitor --> Badge["GET /public/statuspage/:subdomain/badge.svg"]
    Badge --> SVG["Generate dynamic SVG"]
    SVG --> CacheHdr["Cache-Control max-age=60"]`
};

export const auditDiagram: ArchitectureDiagram = {
	id: 'audit',
	label: 'Audit logging sequence',
	definition: `sequenceDiagram
    autonumber
    participant Admin as Admin / Owner
    participant Handler as Handler
    participant Audit as AuditService
    participant DB as audit_logs
    Admin->>Handler: Mutate configuration
    Handler->>Handler: Apply the change
    Handler->>Audit: LogAction(org, user, action, entity, details, IP)
    Audit->>DB: INSERT audit log
    Handler->>Admin: 200 OK`
};
