# Changelog

## 3.0.1, 2026-10-05

- **A refusal and the approval form say what the call can do again.** 3.0.0 said every confirmed call "is public or cannot be undone", Slipway's words for a call it knows nothing more about. Both say again what 2.0.1 said, that the call may affect DNS, routing, security or account configuration, and a test holds them to it.
- **Built on Slipway 0.1.17**, which a fresh install of 3.0.0 already used. Since the Slipway 3.0.0 was measured on, `which` prints a title once where a description opens with it and reads an argument by its own words, and the general help counts the tuning settings instead of naming them, with `agent-context` describing each.

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.14. The 29 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A smaller tool list.** Each native body appeared twice, as its own fields and inside `payload`; 3.0.0 writes each repeated part once under `$defs`, and nothing is lost: Claude Code and Codex both read fields that appear only there, and validation still checks the full schema. Every tool loaded costs 144,067 tokens in Claude Code instead of 230,145.
- **A person approves each mutation over MCP.** All eleven still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `CLOUDFLARE_CONFIRM=model` makes it enough everywhere. The audit log records who approved each one.
- **`CLOUDFLARE_ALLOW_DESTRUCTIVE=0` still refuses every mutation**, confirmed or not, as 2.0 did.
- **Cloudflare's status picks the exit code.** A request Cloudflare rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`doctor --network` verifies the token where Cloudflare issued it**, at `/user/tokens/verify` or the account's own route for an account token, and fails a token that is not active, as 2.0's did.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that purges a zone's cache took a median of 83,426 input tokens over the CLI instead of 104,401 (five runs each): three 2.0.1 runs guessed a command that does not exist, and every 3.0.0 run asked `which`.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`cloudflare-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 319 ms of CPU before its first answer where 2.0.1 spent 769, and answers in 180 ms of wall time instead of 453 (median of 21 runs, taking turns on one busy Mac). npx installs 11 dependencies instead of 95. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were deferred; the version table says 3.0.0; and the confirmation text says what a person's approval is now.

### Upgrading

Over MCP, expect an approval prompt or form before any mutation; a headless agent that should mutate with `confirm: true` alone needs `CLOUDFLARE_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error's JSON keeps `error` and `status`; its `code` is now Slipway's (`usage`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`). Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `CLOUDFLARE_READ_ONLY=1`, a client that calls a hidden mutation gets "tool not found" instead of a refusal naming `CLOUDFLARE_READ_ONLY`; the CLI still names it. Codex shows `purge_cache`'s argument descriptions, which 2.0.1's larger schema lost in its rendering, so a discovery task over MCP read a median of 41,139 input tokens instead of 40,548. The audit log's lines gain `confirmed_by`, and each allowed mutation is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `CLOUDFLARE_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 241 tokens, for `which`, `install`, the flags, the account and zone defaults and the exit codes it now lists; the command list by 16; and a missing argument's error by 16, for its code and a hint. `SKILL.md` is 84 tokens longer in Claude Code, because it says how approval works over MCP and lists every exit code.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/cloudflare-mcp-cli` starts the MCP server whatever order npm keeps.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order. For this package that happened to be the server; for 23 others it was the CLI. A third binary named after the package, on its own file, now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.0 - 2026-10-03

- Refresh 22 selected current native Cloudflare REST operations and seven helpers with shared CLI/local MCP and desktop framework.
- Add 29 tools: 18 reads and 11 explicitly confirmed mutations; current native payload schemas, local preview/schema discovery, bounded reads and query-only analytics.
- Add exact-request DNS batch review/apply with a local 50-action cap and zone/profile/body digest.
- Remove deprecated bulk settings, legacy analytics and firewall writer routes; document deliberate Rulesets/analytics migration.
- Enforce direct-call read-only/disabled policies, isolated private profiles, token-kind verification and active-token diagnostics.
- Preserve fixed origin, bounded JSON/GraphQL, provider-error detection, credential redaction and no automatic replay.
- Preserve LF metadata checksums across Windows/macOS/Linux checkouts.
- Add complete house docs, OS/client setup, pinned official/community comparison and offline/checksum-reviewed schema maintenance. Preserve AGPL and private legacy history.

## 1.0.0 - private legacy source

Earlier 17-tool MCP-only package. No declared task CLI and no verified earlier public npm/tag release is assumed. Private source history is retained separately.

| Component | Reviewed version / source |
| --- | --- |
| Owned package / desktop | 2.0.0 |
| Legacy source package | 1.0.0; private source b6fef82d992cefbfb4ea9a9ea49e17275609c34e |
| Cloudflare REST API schema | API info 4.0.0; commit 37e7a4ae9c5123a2c58929a100c42cb4584edc57 |
| Official cf / Wrangler | 1.0.0-beta.12 / 4.147.0 at review |
| @modelcontextprotocol/sdk | 1.32.0 |
| ajv | 8.20.0 |
| ajv-formats | 3.0.1 |
| graphql | 16.14.2 |
| typescript | 7.0.2 |
| vitest | 5.0.3 |
| vite | 8.3.2 |
| @anthropic-ai/mcpb | 2.1.2 |
