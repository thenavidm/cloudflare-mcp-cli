# Cloudflare comparisons

| Offering | Current surface | Verified strengths and limits |
| --- | --- | --- |
| [Official Code Mode MCP](https://github.com/cloudflare/mcp) | https://mcp.cloudflare.com/mcp; current pinned README lists docs/search/execute | OAuth or user/account token access, sandboxed code execution across the wider API, provider-maintained documentation search and configurable truncation. Individual endpoint tools are optional. Client approval and token permission boundaries remain relevant. |
| [Official cf CLI](https://developers.cloudflare.com/cf/) | cf 1.0.0-beta.12; Cloudflare documents more than 2900 commands | General account API coverage, command search, schemas, JSON, dry-run, named profiles, OAuth refresh, resource name resolution and local developer resources. Delete confirmation already exists. |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | 4.147.0 at this review | Workers development/deployment and related project workflows. This focused package does not replace the developer toolchain. |
| [Official domain MCP servers](https://github.com/cloudflare/mcp-server-cloudflare) | Provider-hosted service-specific MCP endpoints | Specialized analytics, builds, browser rendering and other products; current /mcp endpoints use Streamable HTTP. These are distinct from a local stdio DNS task wrapper. |
| [CloudFlareMCP](https://github.com/SquarePiSigma5/CloudFlareMCP/tree/0031d0c5f4dc453a74caa2bcdd61480b0cc6f78f) | Community MIT source 1.0.0; 11 documented tools; stdio/HTTP | DNS convenience, BIND export, edit snapshots, guarded raw passthrough and optional Worker deployment/secrets. Delete/passthrough confirmation is already present. No dedicated task CLI is declared in the pinned package. |
| This owned package | 29 shared local MCP tools / CLI commands; versioned desktop bundle | 18 reads and 11 mandatory-confirmation mutations, isolated private profiles, complete selected native schemas, local previews, bounded page reads, reviewed DNS digest and no automatic replay. Narrower coverage than the official general API tools. |

Checked October 3, 2026. Official MCP source: cloudflare/mcp commit 69ba3143bb8ffa2b3c1f12bfb7536c9ca4c57a2d. Selected API schema: cloudflare/api-schemas commit 37e7a4ae9c5123a2c58929a100c42cb4584edc57, API info 4.0.0. Community source is pinned above; its extra workflows are useful and are not claimed here.

The actual public cf@1.0.0-beta.12 package installed cleanly. Its complete binary passed version, command search, DNS-create schema and DNS-create dry-run checks with inherited provider credentials removed, telemetry disabled and fetch blocked. Its published DNS-create handler plus run wrapper were separately exercised in an isolated function fixture: a valid create without a confirmation flag reached an injected network-free SDK request once; dry-run reached it zero times. That fixture is not an authenticated Cloudflare operation or a whole-client approval test. Our equivalent shared handler refuses before fetch without explicit confirmation, including direct MCP calls.

Official cf already confirms deletes and has useful dry-run/profile features. Code Mode isolates credential injection from generated code; do not describe it as handing account tokens to the model. Reviewed official retry code can replay requests on transient/429 failures; this wrapper does not replay any request automatically. Confirmation is the caller asserting approved intent, not a cryptographic proof of a human approval or provider authorization.

The owned use case is a focused, repeatable DNS/zone task with consistent approval across CLI and MCP and an exact-request batch review. Choose official cf/Code Mode for broader API work and Wrangler for deployments. SEO, more tool names and metadata size do not establish better tasks or lower token cost. Live provider outcomes, GUI installation and actual matched Codex usage remain separately unverified.


| Mode | What the client receives | Evidence required |
| --- | --- | --- |
| Local MCP | Tool descriptions/schemas according to the client's loading policy; returned provider data | Actual client/model usage for that loading mode |
| Shared CLI | Discovered help/SKILL.md and chosen command output | Actual successful matched task usage |
| Official Code Mode | Small docs/search/execute interface and generated execution/result | Its provider claims are not our Codex measurements |
| Read-only / bounded output | Fewer exposed writes, bounded pages and local --select | Policy/output bounds, not a measured token reduction |

Use Codex first. Record client/model/package versions, date, loading mode, identical resource/task/output requirements and actual API usage for successful runs. CLI and MCP should perform the same task before comparing cost. No fresh matched Codex task-token results are published for 2.0.0. Claude Code benchmarking is deferred at Navid's instruction. Do not divide schema characters by four, borrow another repo's numbers, compare 29 tools against three Code Mode tools as a winner, or claim a universal CLI saving.
