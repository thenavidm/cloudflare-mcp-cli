# Security

Report privately through [GitHub private reporting](https://github.com/thenavidm/cloudflare-mcp-cli/security/advisories/new). Never attach tokens, real DNS TXT secrets, private bodies or account exports.

Account commands send the selected token in a Bearer header only to api.cloudflare.com. Prompts are not forwarded by this package; the native request/query content you select is. Your AI client may send returned DNS records, rule expressions and analytics to its model provider according to its own policy. The wrapper has no telemetry, public HTTP listener or hosted account store.

Named private profiles do not inherit global credentials. Token files use size/type/POSIX owner-only checks and are cached until restart. Windows ACLs require separate user configuration. Never commit credentials, .env, token files, real account exports or signed URLs; keep all such files outside public source and release staging.

Known credential keys, configured secrets and recognized signed URLs are redacted from ordinary output/errors. Legitimate URLs are preserved. Redaction is not complete anonymization: DNS TXT records, names, expressions and returned account data may still be sensitive. --select is local data shaping, not an authorization boundary or upstream privacy filter. Capture only needed output; terminal history and client transcripts can persist it.

Optional audit logging stores policy metadata, not bodies. The package does not automatically persist provider responses or backups; private input/output files you create remain on your system until you manage them. Revoke tokens through Cloudflare, not npm.

Every one of the eleven mutations requires confirm=true in MCP or --confirm in the CLI. The same WriteGuard runs before file loading/provider execution. Creation, edits, replacement, deletion, cache purge and Ruleset changes all require explicit intent. --agent and --yes never grant it.

CLOUDFLARE_READ_ONLY=1 hides every mutation and refuses direct calls to hidden names even with confirmation. CLOUDFLARE_ALLOW_DESTRUCTIVE=0 blocks all mutations even when confirmed; read-only takes precedence. Use narrow provider tokens as the authorization boundary. A model can assert confirm=true; clients and the human still decide whether the action was requested. This is not a cryptographic human approval.

Review the exact zone/account, profile, record/rule IDs and full native body. apply_dns_batch additionally compares the reviewed request digest and makes one native request without automatic replay. Local preview does not authenticate the account, check conflicts or read remote state. Direct native batch also needs confirmation but does not require the digest.

An optional CLOUDFLARE_AUDIT_LOG records timestamp, surface, tool, risk, static summary and decision. It excludes request bodies, account IDs and tokens. Existing file ACLs/rotation are your responsibility; a failed audit append does not block the action. Account data returned after a change is untrusted content.
