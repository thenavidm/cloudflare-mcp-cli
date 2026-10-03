<img src="https://cdn.navid.me/tools/cloudflare-icon.png" alt="Cloudflare" width="88">

# Cloudflare MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/cloudflare-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/cloudflare-mcp-cli)
[![CI](https://github.com/thenavidm/cloudflare-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/cloudflare-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Cloudflare MCP server and CLI for Codex and AI agents. **29 tools** for current DNS, cache, zone settings, Rulesets, Worker metadata and read-only analytics, with private accounts and explicit operation approval. One shared implementation supplies both binaries and a desktop bundle.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=cloudflare-mcp-cli&utm_content=readme). The complete guide is on [navid.me](https://navid.me/mcp-servers/cloudflare).

<img src="https://cdn.navid.me/repos/cloudflare-mcp-cli-retina.gif" alt="Illustrated workflow in the house terminal component" width="520">

The terminal illustrates real command names and approval flow. It is not a recording of a provider account run. Cloudflare already has official CLI and hosted MCP products; their current schemas, approval policies and supported workflows are compared below.

Requires Node 22+ and eligible Cloudflare API access for account operations. **Validation:** fixture tests, schema validation and protocol/artifact discovery are separate from provider-account outcomes, desktop GUI outcomes and fresh measured task/token evidence. Pending evidence is recorded, without invented success rates or efficiency claims.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/cloudflare-mcp-cli@latest
cloudflare-cli tools
cloudflare-cli list-zones --per-page 10 --agent
cloudflare-cli schema create-dns-record
cloudflare-cli create-dns-record --zone-id YOUR_ZONE_ID --payload-file /absolute/private/approved-dns.json --account work --confirm --agent
```

### MCP server, for your AI app

```bash
codex mcp add cloudflare -- npx -y @thenavidm/cloudflare-mcp-cli@latest
```

Configure private credentials first. Ask: “Read DNS for this exact zone; do not change any records.” Full setup is in INSTALL.md.

### Which one

| Where you work | Surface |
| --- | --- |
| Codex or shell agent | Shared CLI, local MCP or both |
| Desktop chat | Compatible local MCP or desktop bundle |
| Scripts / CI | CLI or MCP client |
| Remote-only client / broad API | Official Cloudflare hosted MCP / cf |
| Workers deployment | Official Wrangler / cf |

## Features

| Capability | CLI | MCP |
| --- | --- | --- |
| Zone/DNS reads | list-zones / list-dns-records | list_zones / list_dns_records |
| Explicit DNS changes | create-dns-record / update-dns-record | create_dns_record / update_dns_record |
| Exact DNS review/apply | preview-dns-batch / apply-dns-batch | preview_dns_batch / apply_dns_batch |
| Rulesets and settings | get-zone-ruleset / get-zone-setting | get_zone_ruleset / get_zone_setting |
| Bounded reads / analytics | query-pages / analytics-query | query_pages / analytics_query |
| Local schemas / previews | get-operation-schema / preview-operation | get_operation_schema / preview_operation |
| Profiles and policy | list-accounts / --account / --confirm | list_accounts / account / confirm |

## Contents

| Number | Section | What it covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | What you can ask it |
| 2 | [Quick install](#2-quick-install) | Quick install |
| 3 | [Set up Cloudflare access](#3-set-up-cloudflare-access) | Set up Cloudflare access |
| 4 | [Connect your client](#4-connect-your-client) | Connect your client |
| 5 | [Check it works](#5-check-it-works) | Check it works |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Output, flags and exit codes |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | MCP or CLI and token cost |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | Every tool and argument |
| 9 | [DNS, Rulesets, cache and analytics](#9-dns-rulesets-cache-and-analytics) | DNS, Rulesets, cache and analytics |
| 10 | [Pagination, retries and local input files](#10-pagination-retries-and-local-input-files) | Pagination, retries and local input files |
| 11 | [Several private accounts](#11-several-private-accounts) | Several private accounts |
| 12 | [Writing safely](#12-writing-safely) | Writing safely |
| 13 | [How the two surfaces work](#13-how-the-two-surfaces-work) | How the two surfaces work |
| 14 | [Privacy and data handling](#14-privacy-and-data-handling) | Privacy and data handling |
| 15 | [Environment variables](#15-environment-variables) | Environment variables |
| 16 | [Updates and removal](#16-updates-and-removal) | Updates and removal |
| 17 | [Troubleshooting](#17-troubleshooting) | Troubleshooting |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | API coverage and comparisons |
| 19 | [Versions](#19-versions) | Versions |
| 20 | [FAQ](#20-faq) | FAQ |

## 1. What you can ask it

- Read the intended zone's DNS records without changing anything.
- Inspect the exact native schema for an A, AAAA, TXT, MX or other supported DNS request.
- Preview a small reviewed DNS batch and submit only the same approved zone/profile/body.
- Apply one explicit DNS edit or deletion after inspecting its record ID and content.
- Read the selected zone setting, then change only the approved value.
- Inspect current Rulesets and the selected phase entrypoint before approving a Ruleset change.
- Purge only the requested cache targets after confirmation.
- Query an eligible analytics dataset for an explicit time window without mutations.

Actual credential-free stdio discovery supplies **29 tools: 18 reads and 11 confirmation-gated mutations**. Twenty-two native operations use a pinned, reviewed current REST schema; seven helpers provide local profile/schema/preview, bounded reads, DNS review/apply and query-only analytics. This is a focused management surface. It does not deploy Workers, expose an unrestricted raw API request or implement every Cloudflare product.

## 2. Quick install

```bash
npm install -g @thenavidm/cloudflare-mcp-cli@latest
cloudflare-cli --version
cloudflare-cli tools
cloudflare-cli schema create-dns-record
cloudflare-cli login
```

Requires Node 22+ for manual installs. Configure private tokens before provider calls. Discovery and local previews work without provider authentication. See [INSTALL.md](INSTALL.md) for macOS, Windows, Linux, every supported local client, Docker and desktop extension setup.

## 3. Set up Cloudflare access

### Private API tokens and resource access

1. Choose the intended Cloudflare user/account and zone. Create a least-privilege [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) through My Profile > API Tokens, or Manage account > Account API tokens for an account-owned token.
2. Choose only the permissions needed below and restrict account/zone resources. Check optional expiry and IP filters. Save the secret privately outside every repository; never use the Global API Key with this Bearer-only package.
3. Configure CLOUDFLARE_TOKEN_FILE as an absolute token-only file, or privately set CLOUDFLARE_API_TOKEN. Optional CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_ZONE_ID supply input defaults. A default does not restrict token permissions.
4. Run cloudflare-cli doctor for local configuration checks. Deliberately run doctor --network to verify token status: user tokens use GET /user/tokens/verify; account-owned tokens need CLOUDFLARE_TOKEN_KIND=account and a private account ID, using GET /accounts/{account_id}/tokens/verify. Only an active result is accepted; token IDs/status bodies are not printed.
5. Read the exact zone and DNS records, inspect the complete current input schema, preview the intended change locally and approve only the chosen request. A local preview does not verify provider permissions, conflicts or current remote state.

Requests use Authorization: Bearer on the fixed https://api.cloudflare.com/client/v4 origin. Token-kind selection changes the diagnostic route, not ordinary authorization or resource access. The wrapper does not implement OAuth login, refresh, saved official cf sessions, automatic .env loading or global CLI config ingestion. login prints instructions; it neither opens consent nor saves credentials.

User tokens inherit permitted user access. Account-owned tokens act as service principals; creation requires the provider's token-provisioning capability or Super Administrator role and grants cannot exceed the creator's permissions. Some products still have compatibility restrictions; verify the exact operation in the [account-token compatibility documentation](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/).

| Intended task | Permission to review with the provider | Resource scope |
| --- | --- | --- |
| Discover zones / zone identity | Zone: Read | Intended zone(s) |
| Read DNS records | DNS: Read | Intended zone(s) |
| Create/edit/delete/batch DNS | DNS: Edit | Intended zone(s) |
| Purge cache | Cache Purge permission | Intended zone(s) |
| Read/change zone settings | Zone Settings: Read / Edit | Intended zone(s) and supported setting |
| Read/change a Ruleset | The permission for its Ruleset phase, such as zone WAF or Transform Rules read/edit | Intended zone(s); phase/plan restrictions apply |
| Worker script metadata | Workers Scripts: Read | Intended account(s) |
| Query analytics | Analytics: Read and current dataset access | Intended account/zone(s) |
| Read Page Rules | Page Rules: Read | Intended zone(s) |
| List provider accounts | Account Settings: Read or provider-documented account listing grant | Accessible intended accounts |

Review [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) and the selected endpoint's accepted grant list; this table is task guidance, not a complete static authorization manifest. Do not grant token-management, account administration or every zone solely for installation.

Use a private 0700 directory and regular 0600 token-only file on macOS/Linux. Windows users must restrict the file ACL to their own user; POSIX checks do not establish Windows ACL protection. Token files cannot be symlinks or exceed 64 KiB. File credentials override environment credentials and are cached until restart. GUI applications may have a different environment from your terminal.

### Plans and limits

This AGPL wrapper is free; Cloudflare services and plan restrictions remain separate. DNS, proxy, cache purge, setting values, Ruleset phases and analytics availability are controlled by Cloudflare. Read metadata for the selected setting or dataset rather than assuming every write is allowed on every plan.

Current [general API limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/) list 1200 requests per five minutes for a user/account token and 200 per second per IP, with cumulative user limits and endpoint-specific exceptions. Other sessions and processes consume the same upstream quota. Local pacing defaults to 200 ms per profile/process; it does not reserve quota. No reads or mutations retry automatically after 429, timeout, network failure or HTTP 200 provider errors. Wait according to current provider response/reset policy and inspect state before a deliberate repeat.

[GraphQL analytics limits](https://developers.cloudflare.com/analytics/graphql-api/limits/) separately describe a default 300-query/five-minute user quota, up to ten zones or one account per scoped query, and dataset-specific retention/record limits. The general limits table uses a different GraphQL maximum figure; use the current analytics rules and returned policy for the actual query. Account-based limiting can be enabled through provider controls; the wrapper does not opt you into it. Inspect the provider's settings node for your dataset and resource. Adaptive analytics may be sampled; an aggregate is not necessarily an exact event ledger.

Reviewed DNS batches have a local cap of 1–50 total actions, deliberately below many provider plan limits. The underlying native batch command uses the reviewed source schema and provider limits. Request JSON is capped at 1 MiB; responses at 5 MiB; GraphQL query text at 64 KiB and 10000 parsed tokens; default timeout is 30 seconds. These caps do not raise Cloudflare quotas or plan allowances.

### Rotation and revocation

Revoke or rotate the selected user/account token in its Cloudflare settings, update private configuration and restart every client using it. npm uninstall does not revoke the token, restore DNS, remove Rulesets or undo a cache purge. Keep account exports, DNS TXT values, signed URLs and diagnostic responses out of public issues.

## 4. Connect your client

Codex is the primary documented agent. After private credential setup:

```bash
codex mcp add cloudflare -- npx -y @thenavidm/cloudflare-mcp-cli@latest
codex mcp list
```

Use the private env_vars TOML configuration in INSTALL.md to forward token/profile settings. Fully restart an npx @latest server to resolve the latest npm release. An already-running process keeps its existing version.

| Client | Setup route | Important detail |
| --- | --- | --- |
| Codex desktop / CLI | codex mcp add or private config.toml | Forward private env vars; choose CLI with SKILL.md for shell tasks |
| Claude Desktop | Versioned .mcpb or manual local stdio | Set sensitive token/file, defaults and policy in private extension settings |
| Claude Code | claude mcp add --scope user | Optional client; current measurements deferred |
| Cursor | Private user mcp.json | Interpolation/envFile must refer to private local settings |
| VS Code / Copilot | User MCP configuration | servers root and secure input prompts |
| Windsurf | Private Cascade MCP settings | Reconnect after changes |
| Zed | context_servers | Direct command/args/env shape |
| Gemini CLI | Private settings.json | Merge mcpServers and inspect /mcp |
| Cline / other stdio clients | Add local MCP | Adapt command/args without committed credentials |
| Remote-only clients | Official HTTPS MCP | This package supplies local stdio, no public listener |

The desktop archive vendors production dependencies. Host policies/runtime support and actual GUI installation remain separate from protocol discovery. [INSTALL.md](INSTALL.md) retains click-by-click steps and platform-specific launcher advice.

## 5. Check it works

```bash
cloudflare-cli doctor
cloudflare-cli doctor --network
cloudflare-cli list-accounts --agent
cloudflare-cli list-zones --per-page 10 --agent
cloudflare-cli get-zone --zone-id YOUR_ZONE_ID --agent
```

Local doctor reports configuration, not credentials validated. --network checks an active token through its configured token-kind route; it does not prove access to every endpoint. First provider read should be the exact zone needed for the task. Do not create DNS records or purge cache merely to verify installation.

Full discovery has 29 tools; CLOUDFLARE_READ_ONLY=1 hides eleven mutations and direct calls still refuse. Local helpers expose no tokens or provider IDs. A missing credential exits 10; a valid install is not proof of provider account access.

## 6. Output, flags and exit codes

The house CLI derives tool flags from the same input schemas used by MCP. Tool names use underscores in MCP and hyphens in the shell. Native path/query arguments are top-level flags; current native request bodies use --payload JSON or --payload-file PATH, never both. --select filters returned data locally; it does not change Cloudflare's upstream fields or quota.

| Flag / command | Contract |
| --- | --- |
| tools / no command | Discover every command; confirmed mutations are marked |
| COMMAND --help | Actual tool schema arguments |
| schema COMMAND | Complete JSON input schema, including native payload unions/references |
| --agent | --json --compact --no-input --no-color --yes; never implies --confirm |
| --json / --compact | Machine JSON, optionally compact |
| --select a,b.c | Local dotted result selection |
| --payload / --payload-file | Native JSON body / private regular JSON file |
| --account NAME | Exact private profile label |
| --confirm | Explicit intent for the selected mutation only |
| --no-input / --no-color / --yes | Noninteractive formatting/prompt policy; no mutation permission |

| Exit | Meaning |
| --- | --- |
| 0 | Success |
| 2 | Invalid input or refused mutation |
| 3 | Not found |
| 4 | Authentication/permission error |
| 5 | Provider or transport failure |
| 7 | Rate limited |
| 10 | No credentials configured |

Provider REST results retain success/result/result_info envelopes; query-only analytics retains data. HTTP 200 with provider errors fails. JSON output is not proof that DNS has propagated or every downstream service accepted a setting.

## 7. MCP or CLI and token cost

| Mode | What the client receives | Evidence required |
| --- | --- | --- |
| Local MCP | Tool descriptions/schemas according to the client's loading policy; returned provider data | Actual client/model usage for that loading mode |
| Shared CLI | Discovered help/SKILL.md and chosen command output | Actual successful matched task usage |
| Official Code Mode | Small docs/search/execute interface and generated execution/result | Its provider claims are not our Codex measurements |
| Read-only / bounded output | Fewer exposed writes, bounded pages and local --select | Policy/output bounds, not a measured token reduction |

Use Codex first. Record client/model/package versions, date, loading mode, identical resource/task/output requirements and actual API usage for successful runs. CLI and MCP should perform the same task before comparing cost. No fresh matched Codex task-token results are published for 2.0.0. Claude Code benchmarking is deferred at Navid's instruction. Do not divide schema characters by four, borrow another repo's numbers, compare 29 tools against three Code Mode tools as a winner, or claim a universal CLI saving.

## 8. Every tool and argument

Twenty-two current native operations and seven helpers. Each schema below comes from actual stdio discovery. Native payload bodies preserve required keys, enums, unions, nested references and source constraints. Missing zone_id/account_id may use the selected private profile default; other required arguments remain required. Confirmation is enforced outside ordinary schema-required lists.

| MCP tool | CLI command | Policy |
| --- | --- | --- |
| `list_provider_accounts` | `cloudflare-cli list-provider-accounts` | Read / local helper |
| `list_zones` | `cloudflare-cli list-zones` | Read / local helper |
| `get_zone` | `cloudflare-cli get-zone` | Read / local helper |
| `list_dns_records` | `cloudflare-cli list-dns-records` | Read / local helper |
| `get_dns_record` | `cloudflare-cli get-dns-record` | Read / local helper |
| `create_dns_record` | `cloudflare-cli create-dns-record` | Explicit confirmation required |
| `update_dns_record` | `cloudflare-cli update-dns-record` | Explicit confirmation required |
| `overwrite_dns_record` | `cloudflare-cli overwrite-dns-record` | Explicit confirmation required |
| `delete_dns_record` | `cloudflare-cli delete-dns-record` | Explicit confirmation required |
| `batch_dns_records` | `cloudflare-cli batch-dns-records` | Explicit confirmation required |
| `purge_cache` | `cloudflare-cli purge-cache` | Explicit confirmation required |
| `get_zone_setting` | `cloudflare-cli get-zone-setting` | Read / local helper |
| `update_zone_setting` | `cloudflare-cli update-zone-setting` | Explicit confirmation required |
| `list_workers` | `cloudflare-cli list-workers` | Read / local helper |
| `list_zone_rulesets` | `cloudflare-cli list-zone-rulesets` | Read / local helper |
| `get_zone_ruleset` | `cloudflare-cli get-zone-ruleset` | Read / local helper |
| `get_zone_entrypoint` | `cloudflare-cli get-zone-entrypoint` | Read / local helper |
| `create_zone_ruleset` | `cloudflare-cli create-zone-ruleset` | Explicit confirmation required |
| `update_zone_ruleset` | `cloudflare-cli update-zone-ruleset` | Explicit confirmation required |
| `delete_zone_ruleset` | `cloudflare-cli delete-zone-ruleset` | Explicit confirmation required |
| `list_page_rules` | `cloudflare-cli list-page-rules` | Read / local helper |
| `get_page_rule` | `cloudflare-cli get-page-rule` | Read / local helper |
| `list_accounts` | `cloudflare-cli list-accounts` | Read / local helper |
| `get_operation_schema` | `cloudflare-cli get-operation-schema` | Read / local helper |
| `preview_operation` | `cloudflare-cli preview-operation` | Read / local helper |
| `query_pages` | `cloudflare-cli query-pages` | Read / local helper |
| `preview_dns_batch` | `cloudflare-cli preview-dns-batch` | Read / local helper |
| `apply_dns_batch` | `cloudflare-cli apply-dns-batch` | Explicit confirmation required |
| `analytics_query` | `cloudflare-cli analytics-query` | Read / local helper |

#### list_provider_accounts

`cloudflare-cli list-provider-accounts`

List all accounts you have ownership or verified access to.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | Name of the account. |
| `page` | No; body and guard rules apply | number | Page number of paginated results. minimum: `1`. default: `1`. |
| `per_page` | No; body and guard rules apply | number | Maximum number of results per page. minimum: `5`. maximum: `50`. default: `20`. |
| `direction` | No; body and guard rules apply | string | Direction to order results. Values: `asc`, `desc`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /accounts`; `accounts-list-accounts`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### list_zones

`cloudflare-cli list-zones`

Lists, searches, sorts, and filters your zones. Listing zones across more than 500 accounts
is currently not allowed.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | A domain name. Optional filter operators can be provided to extend refine the search:   * `equal` (default)   * `not_equal`   * `starts_with`   * `ends_with`   * `contains`   * `starts_with_case_sensitive`   * `ends_with_case_sensitive`   * `contains_case_sensitive` maxLength: `253`. |
| `status` | No; body and guard rules apply | string | Specify a zone status to filter by. Values: `initializing`, `pending`, `active`, `moved`. |
| `type` | No; body and guard rules apply | array | Zone types to filter by. Multiple types can be specified as a comma-separated list (e.g., ?type=full,partial,secondary). When this parameter is not provided, zones with type "internal" are excluded from the results. Items: string. |
| `account_id` | No; body and guard rules apply | string | Filter by an account ID. |
| `account_name` | No; body and guard rules apply | string | An account Name. Optional filter operators can be provided to extend refine the search:   * `equal` (default)   * `not_equal`   * `starts_with`   * `ends_with`   * `contains`   * `starts_with_case_sensitive`   * `ends_with_case_sensitive`   * `contains_case_sensitive` maxLength: `253`. |
| `page` | No; body and guard rules apply | number | Page number of paginated results. minimum: `1`. default: `1`. |
| `per_page` | No; body and guard rules apply | number | Number of zones per page. minimum: `5`. maximum: `50`. default: `20`. |
| `order` | No; body and guard rules apply | string | Field to order zones by. Values: `name`, `status`, `account.id`, `account.name`, `plan.id`. |
| `direction` | No; body and guard rules apply | string | Direction to order zones. Values: `asc`, `desc`. |
| `match` | No; body and guard rules apply | string | Whether to match all search requirements or at least one (any). Values: `any`, `all`. default: `all`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones`; `zones-get`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### get_zone

`cloudflare-cli get-zone`

Retrieves detailed information about a specific zone identified by its zone ID.

Returns zone configuration, status, nameservers, and associated metadata.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}`; `zones-0-get`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### list_dns_records

`cloudflare-cli list-dns-records`

List, search, sort, and filter a zones' DNS records.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `name` | No; body and guard rules apply | string | Exact value of the DNS record name. This is a convenience alias for `name.exact`. |
| `name_exact` | No; body and guard rules apply | string | Exact value of the DNS record name. Name filters are case-insensitive. |
| `name_contains` | No; body and guard rules apply | string | Substring of the DNS record name. Name filters are case-insensitive. |
| `name_startswith` | No; body and guard rules apply | string | Prefix of the DNS record name. Name filters are case-insensitive. |
| `name_endswith` | No; body and guard rules apply | string | Suffix of the DNS record name. Name filters are case-insensitive. |
| `type` | No; body and guard rules apply | dns-records_type | See current schema |
| `content` | No; body and guard rules apply | string | Exact value of the DNS record content. This is a convenience alias for `content.exact`. |
| `content_exact` | No; body and guard rules apply | string | Exact value of the DNS record content. Content filters are case-insensitive. |
| `content_contains` | No; body and guard rules apply | string | Substring of the DNS record content. Content filters are case-insensitive. |
| `content_startswith` | No; body and guard rules apply | string | Prefix of the DNS record content. Content filters are case-insensitive. |
| `content_endswith` | No; body and guard rules apply | string | Suffix of the DNS record content. Content filters are case-insensitive. |
| `proxied` | No; body and guard rules apply | dns-records_proxied | See current schema |
| `match` | No; body and guard rules apply | dns-records_match | See current schema |
| `comment` | No; body and guard rules apply | string | Exact value of the DNS record comment. This is a convenience alias for `comment.exact`. |
| `comment_present` | No; body and guard rules apply | string | If this parameter is present, only records *with* a comment are returned. |
| `comment_absent` | No; body and guard rules apply | string | If this parameter is present, only records *without* a comment are returned. |
| `comment_exact` | No; body and guard rules apply | string | Exact value of the DNS record comment. Comment filters are case-insensitive. |
| `comment_contains` | No; body and guard rules apply | string | Substring of the DNS record comment. Comment filters are case-insensitive. |
| `comment_startswith` | No; body and guard rules apply | string | Prefix of the DNS record comment. Comment filters are case-insensitive. |
| `comment_endswith` | No; body and guard rules apply | string | Suffix of the DNS record comment. Comment filters are case-insensitive. |
| `tag` | No; body and guard rules apply | string | Condition on the DNS record tag.  Parameter values can be of the form `:` to search for an exact `name:value` pair, or just `` to search for records with a specific tag name regardless of its value.  This is a convenience shorthand for the more powerful `tag.` parameters. Examples: - `tag=important` is equivalent to `tag.present=important` - `tag=team:DNS` is equivalent to `tag.exact=team:DNS` |
| `tag_present` | No; body and guard rules apply | string | Name of a tag which must be present on the DNS record. Tag filters are case-insensitive. |
| `tag_absent` | No; body and guard rules apply | string | Name of a tag which must *not* be present on the DNS record. Tag filters are case-insensitive. |
| `tag_exact` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value is ``. Tag filters are case-insensitive. |
| `tag_contains` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value contains ``. Tag filters are case-insensitive. |
| `tag_startswith` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value starts with ``. Tag filters are case-insensitive. |
| `tag_endswith` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value ends with ``. Tag filters are case-insensitive. |
| `search` | No; body and guard rules apply | dns-records_search | See current schema |
| `tag_match` | No; body and guard rules apply | dns-records_tag_match | See current schema |
| `page` | No; body and guard rules apply | dns-records_page | See current schema |
| `per_page` | No; body and guard rules apply | dns-records_per_page | See current schema |
| `order` | No; body and guard rules apply | dns-records_order | See current schema |
| `direction` | No; body and guard rules apply | dns-records_direction | See current schema |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `shadowed_by_name` | No; body and guard rules apply | string | Filters the response to records at or below the specified NS delegation name. NS, DS, and NSEC records at the delegation name are excluded because they are not shadowed by that delegation. Those record types are included only when they exist below the delegation. The value must be a non-apex subdomain of the zone. Requires `include_shadow_metadata=true`. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). |
| `shadowing_name` | No; body and guard rules apply | string | Returns NS records that shadow the given name, searching at the name itself and each of its ancestor names within the zone, excluding the zone apex. The value must be a subdomain of the zone; the zone apex is not accepted. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/dns_records`; `dns-records-for-a-zone-list-dns-records`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### get_dns_record

`cloudflare-cli get-dns-record`

Retrieves details for a specific DNS record in the zone.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/dns_records/{dns_record_id}`; `dns-records-for-a-zone-dns-record-details`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### create_dns_record

`cloudflare-cli create-dns-record`

Create a new DNS record for a zone.

Notes:
- A/AAAA records cannot exist on the same name as CNAME records.
- NS records cannot exist on the same name as any other record type.
- Domain names are always represented in Punycode, even if Unicode
  characters were used when creating the record.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `POST /zones/{zone_id}/dns_records`; `dns-records-for-a-zone-create-dns-record`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### update_dns_record

`cloudflare-cli update-dns-record`

Update an existing DNS record.

Notes:
- A/AAAA records cannot exist on the same name as CNAME records.
- NS records cannot exist on the same name as any other record type.
- Domain names are always represented in Punycode, even if Unicode
  characters were used when creating the record.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `PATCH /zones/{zone_id}/dns_records/{dns_record_id}`; `dns-records-for-a-zone-patch-dns-record`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### overwrite_dns_record

`cloudflare-cli overwrite-dns-record`

Overwrite an existing DNS record.

Notes:
- A/AAAA records cannot exist on the same name as CNAME records.
- NS records cannot exist on the same name as any other record type.
- Domain names are always represented in Punycode, even if Unicode
  characters were used when creating the record.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `PUT /zones/{zone_id}/dns_records/{dns_record_id}`; `dns-records-for-a-zone-update-dns-record`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### delete_dns_record

`cloudflare-cli delete-dns-record`

Permanently removes a DNS record from the zone.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |

Native operation: `DELETE /zones/{zone_id}/dns_records/{dns_record_id}`; `dns-records-for-a-zone-delete-dns-record`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### batch_dns_records

`cloudflare-cli batch-dns-records`

Send a Batch of DNS Record API calls to be executed together.

Notes:
- Although Cloudflare will execute the batched operations in a single database transaction, Cloudflare's distributed KV store must treat each record change as a single key-value pair. This means that the propagation of changes is not atomic. See [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/ "Batch DNS records") for more information.
- The operations you specify within the /batch request body are always executed in the following order:

    - Deletes
    - Patches
    - Puts
    - Posts
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `POST /zones/{zone_id}/dns_records/batch`; `dns-records-for-a-zone-batch-dns-records`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### purge_cache

`cloudflare-cli purge-cache`

Deletes cached content in every Cloudflare data center and cache tier, including Cache Reserve. The next request for purged content is a cache `MISS`: Cloudflare fetches the full response from your origin and caches it again. Cloudflare does not serve purged content from cache again, even if your origin is unavailable.

To keep content cached and have Cloudflare revalidate it with your origin instead, use `POST /zones/{zone_id}/invalidate_cache`.

### Choose what to purge

Send one of these fields in the request body:

- `files`: specific URLs. If your cache key includes request headers, send each URL with the header values it was cached with.
- `tags`: all content whose `Cache-Tag` response header contains one of the tags.
- `hosts`: all content cached for the hostnames.
- `prefixes`: all content whose URL starts with one of the prefixes.
- `purge_everything`: all cached content in the zone.

### Check the result

A `200` response with `success: true` means Cloudflare accepted the request. It does not confirm that any content was cached or removed. To check, request a purged URL and confirm that the `CF-Cache-Status` response header is `MISS`.

### Availability and limits

Rate limits and the number of items you can send in one request depend on your plan. See [Purge cache: availability and limits](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | cache-purge_identifier | The zone ID. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | Union | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `POST /zones/{zone_id}/purge_cache`; `zone-purge`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### get_zone_setting

`cloudflare-cli get-zone-setting`

Fetch a single zone setting by name
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier | See current schema minLength: `1`. |
| `setting_id` | Yes | zones_setting_name | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/settings/{setting_id}`; `zone-settings-get-single-setting`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### update_zone_setting

`cloudflare-cli update-zone-setting`

Updates a single zone setting by the identifier
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier | See current schema minLength: `1`. |
| `setting_id` | Yes | zones_setting_name | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | Union | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `PATCH /zones/{zone_id}/settings/{setting_id}`; `zone-settings-edit-single-setting`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### list_workers

`cloudflare-cli list-workers`

Fetch a list of uploaded Worker scripts.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account_id` | No; body and guard rules apply | workers_identifier | See current schema minLength: `1`. |
| `tags` | No; body and guard rules apply | string | Filter scripts by tags. Format: comma-separated list of tag:allowed pairs where allowed is 'yes' or 'no'. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /accounts/{account_id}/workers/scripts`; `worker-script-list-workers`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### list_zone_rulesets

`cloudflare-cli list-zone-rulesets`

Fetches all rulesets at the zone level.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `cursor` | No; body and guard rules apply | rulesets_Cursor | See current schema |
| `per_page` | No; body and guard rules apply | rulesets_PerPage | See current schema |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/rulesets`; `listZoneRulesets`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### get_zone_ruleset

`cloudflare-cli get-zone-ruleset`

Fetches the latest version of a zone ruleset.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_id` | Yes | rulesets_RulesetId | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/rulesets/{ruleset_id}`; `getZoneRuleset`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### get_zone_entrypoint

`cloudflare-cli get-zone-entrypoint`

Fetches the latest version of the zone entry point ruleset for a given phase.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_phase` | Yes | rulesets_RulesetPhase | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint`; `getZoneEntrypointRuleset`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### create_zone_ruleset

`cloudflare-cli create-zone-ruleset`

Creates a ruleset at the zone level.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `dry_run` | No; body and guard rules apply | boolean | Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | JSON | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `POST /zones/{zone_id}/rulesets`; `createZoneRuleset`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### update_zone_ruleset

`cloudflare-cli update-zone-ruleset`

Updates a zone ruleset, creating a new version.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_id` | Yes | rulesets_RulesetId | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `dry_run` | No; body and guard rules apply | boolean | Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | JSON | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

Native operation: `PUT /zones/{zone_id}/rulesets/{ruleset_id}`; `updateZoneRuleset`. Native body required through payload or payload_file. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### delete_zone_ruleset

`cloudflare-cli delete-zone-ruleset`

Deletes all versions of an existing zone ruleset.
Every change requires explicit confirmation; never repeat an unknown outcome automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_id` | Yes | rulesets_RulesetId | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `dry_run` | No; body and guard rules apply | boolean | Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |

Native operation: `DELETE /zones/{zone_id}/rulesets/{ruleset_id}`; `deleteZoneRuleset`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### list_page_rules

`cloudflare-cli list-page-rules`

Fetches Page Rules in a zone.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier-2 | See current schema minLength: `1`. |
| `order` | No; body and guard rules apply | string | The field used to sort returned Page Rules. Values: `status`, `priority`. default: `priority`. |
| `direction` | No; body and guard rules apply | string | The direction used to sort returned Page Rules. Values: `asc`, `desc`. default: `desc`. |
| `match` | No; body and guard rules apply | string | When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match. Values: `any`, `all`. default: `all`. |
| `status` | No; body and guard rules apply | string | The status of the Page Rule. Values: `active`, `disabled`. default: `disabled`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/pagerules`; `page-rules-list-page-rules`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### get_page_rule

`cloudflare-cli get-page-rule`

Fetches the details of a Page Rule.
Read operation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `pagerule_id` | Yes | zones_identifier-2 | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | zones_identifier-2 | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

Native operation: `GET /zones/{zone_id}/pagerules/{pagerule_id}`; `page-rules-get-a-page-rule`. Native body not required. Schema discovery is local; endpoint permissions/plan decisions remain provider controlled.

#### list_accounts

`cloudflare-cli list-accounts`

Local profile labels/default/auth method only. No provider IDs, credential values or paths. No network.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

#### get_operation_schema

`cloudflare-cli get-operation-schema`

Complete selected current API input, path and query schema. Local metadata only.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `list_provider_accounts`, `list_zones`, `get_zone`, `list_dns_records`, `get_dns_record`, `create_dns_record`, `update_dns_record`, `overwrite_dns_record`, `delete_dns_record`, `batch_dns_records`, `purge_cache`, `get_zone_setting`, `update_zone_setting`, `list_workers`, `list_zone_rulesets`, `get_zone_ruleset`, `get_zone_entrypoint`, `create_zone_ruleset`, `update_zone_ruleset`, `delete_zone_ruleset`, `list_page_rules`, `get_page_rule`. |

#### preview_operation

`cloudflare-cli preview-operation`

Validate a named operation and return its exact local method/path/query/body/profile. No request, auth validation or provider policy checks.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `list_provider_accounts`, `list_zones`, `get_zone`, `list_dns_records`, `get_dns_record`, `create_dns_record`, `update_dns_record`, `overwrite_dns_record`, `delete_dns_record`, `batch_dns_records`, `purge_cache`, `get_zone_setting`, `update_zone_setting`, `list_workers`, `list_zone_rulesets`, `get_zone_ruleset`, `get_zone_entrypoint`, `create_zone_ruleset`, `update_zone_ruleset`, `delete_zone_ruleset`, `list_page_rules`, `get_page_rule`. |
| `arguments` | Yes | object | See the full input schema. |

#### query_pages

`cloudflare-cli query-pages`

Read at most five pages of a supported paginated named operation. Provider page metadata determines continuation; missing metadata stops with an explicit unknown continuation.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `list_provider_accounts`, `list_zones`, `list_dns_records`. |
| `arguments` | Yes | object | See the full input schema. |
| `max_pages` | No; body and guard rules apply | integer | See the full input schema. minimum: `1`. maximum: `5`. default: `1`. |

#### preview_dns_batch

`cloudflare-cli preview-dns-batch`

Local schema-validated DNS batch review capped at 50 actions. Digest binds exact JSON body, zone path and profile label; no account or DNS state read. Not a provider authorization grant.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. maxLength: `32`. |
| `account` | No; body and guard rules apply | string | See the full input schema. |
| `payload` | No; body and guard rules apply | object | See the full input schema. |
| `payload_file` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. |

#### apply_dns_batch

`cloudflare-cli apply-dns-batch`

Verify the reviewed digest and submit one exact native DNS batch with mandatory confirmation. Does not assert remote-state consistency or atomic DNS propagation; no retry.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. maxLength: `32`. |
| `account` | No; body and guard rules apply | string | See the full input schema. |
| `payload` | No; body and guard rules apply | object | See the full input schema. |
| `payload_file` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. |
| `preview_sha256` | Yes | string | See the full input schema. pattern: `^[0-9a-f]{64}$`. |
| `confirm` | No; body and guard rules apply | boolean | See the full input schema. |

#### analytics_query

`cloudflare-cli analytics-query`

One parsed GraphQL query only, with variables. No mutations, subscriptions or multiple operations. Permissions, dataset retention, sampling and query limits remain provider controlled.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | See the full input schema. minLength: `1`. maxLength: `65536`. |
| `variables` | No; body and guard rules apply | object | See the full input schema. |
| `account` | No; body and guard rules apply | string | See the full input schema. |

### Nested native input definitions

Identical object shapes are listed once below. References point to the named definitions; union branches retain their individual requirements. Some provider JSON-schema conditions do not fit a flat table; use schema COMMAND or get_operation_schema for complete validation. Unknown native root body keys are refused locally; provider constraints still apply.

##### list_provider_accounts

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | Name of the account. |
| `page` | No; body and guard rules apply | number | Page number of paginated results. minimum: `1`. default: `1`. |
| `per_page` | No; body and guard rules apply | number | Maximum number of results per page. minimum: `5`. maximum: `50`. default: `20`. |
| `direction` | No; body and guard rules apply | string | Direction to order results. Values: `asc`, `desc`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### list_zones

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | A domain name. Optional filter operators can be provided to extend refine the search:   * `equal` (default)   * `not_equal`   * `starts_with`   * `ends_with`   * `contains`   * `starts_with_case_sensitive`   * `ends_with_case_sensitive`   * `contains_case_sensitive` maxLength: `253`. |
| `status` | No; body and guard rules apply | string | Specify a zone status to filter by. Values: `initializing`, `pending`, `active`, `moved`. |
| `type` | No; body and guard rules apply | array | Zone types to filter by. Multiple types can be specified as a comma-separated list (e.g., ?type=full,partial,secondary). When this parameter is not provided, zones with type "internal" are excluded from the results. Items: string. |
| `account_id` | No; body and guard rules apply | string | Filter by an account ID. |
| `account_name` | No; body and guard rules apply | string | An account Name. Optional filter operators can be provided to extend refine the search:   * `equal` (default)   * `not_equal`   * `starts_with`   * `ends_with`   * `contains`   * `starts_with_case_sensitive`   * `ends_with_case_sensitive`   * `contains_case_sensitive` maxLength: `253`. |
| `page` | No; body and guard rules apply | number | Page number of paginated results. minimum: `1`. default: `1`. |
| `per_page` | No; body and guard rules apply | number | Number of zones per page. minimum: `5`. maximum: `50`. default: `20`. |
| `order` | No; body and guard rules apply | string | Field to order zones by. Values: `name`, `status`, `account.id`, `account.name`, `plan.id`. |
| `direction` | No; body and guard rules apply | string | Direction to order zones. Values: `asc`, `desc`. |
| `match` | No; body and guard rules apply | string | Whether to match all search requirements or at least one (any). Values: `any`, `all`. default: `all`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### get_zone

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### list_dns_records

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `name` | No; body and guard rules apply | string | Exact value of the DNS record name. This is a convenience alias for `name.exact`. |
| `name_exact` | No; body and guard rules apply | string | Exact value of the DNS record name. Name filters are case-insensitive. |
| `name_contains` | No; body and guard rules apply | string | Substring of the DNS record name. Name filters are case-insensitive. |
| `name_startswith` | No; body and guard rules apply | string | Prefix of the DNS record name. Name filters are case-insensitive. |
| `name_endswith` | No; body and guard rules apply | string | Suffix of the DNS record name. Name filters are case-insensitive. |
| `type` | No; body and guard rules apply | dns-records_type | See current schema |
| `content` | No; body and guard rules apply | string | Exact value of the DNS record content. This is a convenience alias for `content.exact`. |
| `content_exact` | No; body and guard rules apply | string | Exact value of the DNS record content. Content filters are case-insensitive. |
| `content_contains` | No; body and guard rules apply | string | Substring of the DNS record content. Content filters are case-insensitive. |
| `content_startswith` | No; body and guard rules apply | string | Prefix of the DNS record content. Content filters are case-insensitive. |
| `content_endswith` | No; body and guard rules apply | string | Suffix of the DNS record content. Content filters are case-insensitive. |
| `proxied` | No; body and guard rules apply | dns-records_proxied | See current schema |
| `match` | No; body and guard rules apply | dns-records_match | See current schema |
| `comment` | No; body and guard rules apply | string | Exact value of the DNS record comment. This is a convenience alias for `comment.exact`. |
| `comment_present` | No; body and guard rules apply | string | If this parameter is present, only records *with* a comment are returned. |
| `comment_absent` | No; body and guard rules apply | string | If this parameter is present, only records *without* a comment are returned. |
| `comment_exact` | No; body and guard rules apply | string | Exact value of the DNS record comment. Comment filters are case-insensitive. |
| `comment_contains` | No; body and guard rules apply | string | Substring of the DNS record comment. Comment filters are case-insensitive. |
| `comment_startswith` | No; body and guard rules apply | string | Prefix of the DNS record comment. Comment filters are case-insensitive. |
| `comment_endswith` | No; body and guard rules apply | string | Suffix of the DNS record comment. Comment filters are case-insensitive. |
| `tag` | No; body and guard rules apply | string | Condition on the DNS record tag.  Parameter values can be of the form `:` to search for an exact `name:value` pair, or just `` to search for records with a specific tag name regardless of its value.  This is a convenience shorthand for the more powerful `tag.` parameters. Examples: - `tag=important` is equivalent to `tag.present=important` - `tag=team:DNS` is equivalent to `tag.exact=team:DNS` |
| `tag_present` | No; body and guard rules apply | string | Name of a tag which must be present on the DNS record. Tag filters are case-insensitive. |
| `tag_absent` | No; body and guard rules apply | string | Name of a tag which must *not* be present on the DNS record. Tag filters are case-insensitive. |
| `tag_exact` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value is ``. Tag filters are case-insensitive. |
| `tag_contains` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value contains ``. Tag filters are case-insensitive. |
| `tag_startswith` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value starts with ``. Tag filters are case-insensitive. |
| `tag_endswith` | No; body and guard rules apply | string | A tag and value, of the form `:`. The API will only return DNS records that have a tag named `` whose value ends with ``. Tag filters are case-insensitive. |
| `search` | No; body and guard rules apply | dns-records_search | See current schema |
| `tag_match` | No; body and guard rules apply | dns-records_tag_match | See current schema |
| `page` | No; body and guard rules apply | dns-records_page | See current schema |
| `per_page` | No; body and guard rules apply | dns-records_per_page | See current schema |
| `order` | No; body and guard rules apply | dns-records_order | See current schema |
| `direction` | No; body and guard rules apply | dns-records_direction | See current schema |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `shadowed_by_name` | No; body and guard rules apply | string | Filters the response to records at or below the specified NS delegation name. NS, DS, and NSEC records at the delegation name are excluded because they are not shadowed by that delegation. Those record types are included only when they exist below the delegation. The value must be a non-apex subdomain of the zone. Requires `include_shadow_metadata=true`. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). |
| `shadowing_name` | No; body and guard rules apply | string | Returns NS records that shadow the given name, searching at the name itself and each of its ancestor names within the zone, excluding the zone apex. The value must be a subdomain of the zone; the zone apex is not accepted. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### get_dns_record

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### create_dns_record

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### update_dns_record

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### delete_dns_record

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `dns_record_id` | Yes | dns-records_identifier | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |

##### batch_dns_records

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | dns-records_identifier | See current schema minLength: `1`. |
| `include_shadow_metadata` | No; body and guard rules apply | boolean | Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records). default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | object | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### batch_dns_records.payload

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `deletes` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-delete. |
| `patches` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-patch. |
| `posts` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-post. |
| `puts` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-put. |

##### purge_cache

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | cache-purge_identifier | The zone ID. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | Union | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### get_zone_setting

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier | See current schema minLength: `1`. |
| `setting_id` | Yes | zones_setting_name | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### update_zone_setting

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier | See current schema minLength: `1`. |
| `setting_id` | Yes | zones_setting_name | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | Union | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### update_zone_setting.payload.oneOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `enabled` | No; body and guard rules apply | zones_ssl_recommender_enabled | See the full input schema. |

##### update_zone_setting.payload.oneOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `value` | No; body and guard rules apply | zones_setting_value | See the full input schema. |

##### list_workers

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account_id` | No; body and guard rules apply | workers_identifier | See current schema minLength: `1`. |
| `tags` | No; body and guard rules apply | string | Filter scripts by tags. Format: comma-separated list of tag:allowed pairs where allowed is 'yes' or 'no'. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### list_zone_rulesets

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `cursor` | No; body and guard rules apply | rulesets_Cursor | See current schema |
| `per_page` | No; body and guard rules apply | rulesets_PerPage | See current schema |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### get_zone_ruleset

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_id` | Yes | rulesets_RulesetId | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### get_zone_entrypoint

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_phase` | Yes | rulesets_RulesetPhase | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### create_zone_ruleset

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `dry_run` | No; body and guard rules apply | boolean | Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | JSON | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### create_zone_ruleset.payload.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `kind` | No; body and guard rules apply | rulesets_RulesetKind | See the full input schema. |
| `phase` | No; body and guard rules apply | rulesets_RulesetPhase | See the full input schema. |
| `rules` | No; body and guard rules apply | rulesets_RequestRules | See the full input schema. |

##### update_zone_ruleset

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_id` | Yes | rulesets_RulesetId | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `dry_run` | No; body and guard rules apply | boolean | Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |
| `payload` | No; body and guard rules apply | JSON | Complete current native JSON request body. Do not mix with payload_file. |
| `payload_file` | No; body and guard rules apply | string | Regular non-symlink local JSON request file, at most 1 MiB. No credentials in public files. minLength: `1`. |

##### delete_zone_ruleset

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ruleset_id` | Yes | rulesets_RulesetId | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | rulesets_ZoneId | See current schema minLength: `1`. |
| `dry_run` | No; body and guard rules apply | boolean | Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for the exact selected mutation, target and reviewed request. |

##### list_page_rules

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | zones_identifier-2 | See current schema minLength: `1`. |
| `order` | No; body and guard rules apply | string | The field used to sort returned Page Rules. Values: `status`, `priority`. default: `priority`. |
| `direction` | No; body and guard rules apply | string | The direction used to sort returned Page Rules. Values: `asc`, `desc`. default: `desc`. |
| `match` | No; body and guard rules apply | string | When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match. Values: `any`, `all`. default: `all`. |
| `status` | No; body and guard rules apply | string | The status of the Page Rule. Values: `active`, `disabled`. default: `disabled`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### get_page_rule

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `pagerule_id` | Yes | zones_identifier-2 | See current schema minLength: `1`. |
| `zone_id` | No; body and guard rules apply | zones_identifier-2 | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Account/zone defaults route inputs; token permissions remain provider controlled. |

##### get_operation_schema

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `list_provider_accounts`, `list_zones`, `get_zone`, `list_dns_records`, `get_dns_record`, `create_dns_record`, `update_dns_record`, `overwrite_dns_record`, `delete_dns_record`, `batch_dns_records`, `purge_cache`, `get_zone_setting`, `update_zone_setting`, `list_workers`, `list_zone_rulesets`, `get_zone_ruleset`, `get_zone_entrypoint`, `create_zone_ruleset`, `update_zone_ruleset`, `delete_zone_ruleset`, `list_page_rules`, `get_page_rule`. |

##### preview_operation

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `list_provider_accounts`, `list_zones`, `get_zone`, `list_dns_records`, `get_dns_record`, `create_dns_record`, `update_dns_record`, `overwrite_dns_record`, `delete_dns_record`, `batch_dns_records`, `purge_cache`, `get_zone_setting`, `update_zone_setting`, `list_workers`, `list_zone_rulesets`, `get_zone_ruleset`, `get_zone_entrypoint`, `create_zone_ruleset`, `update_zone_ruleset`, `delete_zone_ruleset`, `list_page_rules`, `get_page_rule`. |
| `arguments` | Yes | object | See the full input schema. |

##### query_pages

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `list_provider_accounts`, `list_zones`, `list_dns_records`. |
| `arguments` | Yes | object | See the full input schema. |
| `max_pages` | No; body and guard rules apply | integer | See the full input schema. minimum: `1`. maximum: `5`. default: `1`. |

##### preview_dns_batch

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. maxLength: `32`. |
| `account` | No; body and guard rules apply | string | See the full input schema. |
| `payload` | No; body and guard rules apply | object | See the full input schema. |
| `payload_file` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. |

##### preview_dns_batch.payload

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `deletes` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-delete. |
| `patches` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-patch. |
| `posts` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-post. |
| `puts` | No; body and guard rules apply | array | See the full input schema. Items: dns-records_dns-record-batch-put. |

##### apply_dns_batch

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `zone_id` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. maxLength: `32`. |
| `account` | No; body and guard rules apply | string | See the full input schema. |
| `payload` | No; body and guard rules apply | object | See the full input schema. |
| `payload_file` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. |
| `preview_sha256` | Yes | string | See the full input schema. pattern: `^[0-9a-f]{64}$`. |
| `confirm` | No; body and guard rules apply | boolean | See the full input schema. |

##### analytics_query

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | See the full input schema. minLength: `1`. maxLength: `65536`. |
| `variables` | No; body and guard rules apply | object | See the full input schema. |
| `account` | No; body and guard rules apply | string | See the full input schema. |

##### dns-records_AAAARecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | A valid IPv6 address. format: `ipv6`. |
| `private_routing` | No; body and guard rules apply | boolean | Enables private network routing to the origin. default: `False`. |
| `type` | No; body and guard rules apply | string | Record type. Values: `AAAA`. |

##### dns-records_ARecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | A valid IPv4 address. format: `ipv4`. |
| `private_routing` | No; body and guard rules apply | boolean | Enables private network routing to the origin. default: `False`. |
| `type` | No; body and guard rules apply | string | Record type. Values: `A`. |

##### dns-records_CAARecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted CAA content. See 'data' to set CAA properties. |
| `data` | No; body and guard rules apply | object | Components of a CAA record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `CAA`. |

##### dns-records_CAARecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `flags` | No; body and guard rules apply | number | Flags for the CAA record. minimum: `0`. maximum: `255`. |
| `tag` | No; body and guard rules apply | string | Name of the property controlled by this record (e.g.: issue, issuewild, iodef). |
| `value` | No; body and guard rules apply | string | Value of the record. This field's semantics depend on the chosen tag. |

##### dns-records_CERTRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted CERT content. See 'data' to set CERT properties. |
| `data` | No; body and guard rules apply | object | Components of a CERT record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `CERT`. |

##### dns-records_CERTRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `algorithm` | No; body and guard rules apply | number | Algorithm. minimum: `0`. maximum: `255`. |
| `certificate` | No; body and guard rules apply | string | Certificate. |
| `key_tag` | No; body and guard rules apply | number | Key Tag. minimum: `0`. maximum: `65535`. |
| `type` | No; body and guard rules apply | number | Type. minimum: `0`. maximum: `65535`. |

##### dns-records_CNAMERecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | A valid hostname. Must not match the record's name. |
| `settings` | No; body and guard rules apply | object | See the full input schema. |
| `type` | No; body and guard rules apply | string | Record type. Values: `CNAME`. |

##### dns-records_CNAMERecord.allOf[1].settings

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `flatten_cname` | No; body and guard rules apply | boolean | If enabled, causes the CNAME record to be resolved externally and the resulting address records (e.g., A and AAAA) to be returned instead of the CNAME record itself. This setting is unavailable for proxied records, since they are always flattened. default: `False`. |

##### dns-records_DNSKEYRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted DNSKEY content. See 'data' to set DNSKEY properties. |
| `data` | No; body and guard rules apply | object | Components of a DNSKEY record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `DNSKEY`. |

##### dns-records_DNSKEYRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `algorithm` | No; body and guard rules apply | number | Algorithm. minimum: `0`. maximum: `255`. |
| `flags` | No; body and guard rules apply | number | Flags. minimum: `0`. maximum: `65535`. |
| `protocol` | No; body and guard rules apply | number | Protocol. minimum: `0`. maximum: `255`. |
| `public_key` | No; body and guard rules apply | string | Public Key. |

##### dns-records_DSRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted DS content. See 'data' to set DS properties. |
| `data` | No; body and guard rules apply | object | Components of a DS record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `DS`. |

##### dns-records_DSRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `algorithm` | No; body and guard rules apply | number | Algorithm. minimum: `0`. maximum: `255`. |
| `digest` | No; body and guard rules apply | string | Digest. |
| `digest_type` | No; body and guard rules apply | number | Digest Type. minimum: `0`. maximum: `255`. |
| `key_tag` | No; body and guard rules apply | number | Key Tag. minimum: `0`. maximum: `65535`. |

##### dns-records_HTTPSRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted HTTPS content. See 'data' to set HTTPS properties. |
| `data` | No; body and guard rules apply | object | Components of a HTTPS record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `HTTPS`. |

##### dns-records_HTTPSRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `priority` | No; body and guard rules apply | number | Priority. minimum: `0`. maximum: `65535`. |
| `target` | No; body and guard rules apply | string | Target. |
| `value` | No; body and guard rules apply | string | Value. |

##### dns-records_LOCRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted LOC content. See 'data' to set LOC properties. |
| `data` | No; body and guard rules apply | object | Components of a LOC record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `LOC`. |

##### dns-records_LOCRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `altitude` | No; body and guard rules apply | number | Altitude of location in meters. minimum: `-100000`. maximum: `42849672.95`. |
| `lat_degrees` | No; body and guard rules apply | number | Degrees of latitude. minimum: `0`. maximum: `90`. |
| `lat_direction` | No; body and guard rules apply | string | Latitude direction. Values: `N`, `S`. |
| `lat_minutes` | No; body and guard rules apply | number | Minutes of latitude. minimum: `0`. maximum: `59`. |
| `lat_seconds` | No; body and guard rules apply | number | Seconds of latitude. minimum: `0`. maximum: `59.999`. |
| `long_degrees` | No; body and guard rules apply | number | Degrees of longitude. minimum: `0`. maximum: `180`. |
| `long_direction` | No; body and guard rules apply | string | Longitude direction. Values: `E`, `W`. |
| `long_minutes` | No; body and guard rules apply | number | Minutes of longitude. minimum: `0`. maximum: `59`. |
| `long_seconds` | No; body and guard rules apply | number | Seconds of longitude. minimum: `0`. maximum: `59.999`. |
| `precision_horz` | No; body and guard rules apply | number | Horizontal precision of location. minimum: `0`. maximum: `90000000`. |
| `precision_vert` | No; body and guard rules apply | number | Vertical precision of location. minimum: `0`. maximum: `90000000`. |
| `size` | No; body and guard rules apply | number | Size of location in meters. minimum: `0`. maximum: `90000000`. |

##### dns-records_MXRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | A valid mail server hostname. format: `hostname`. |
| `priority` | No; body and guard rules apply | dns-records_priority | See the full input schema. |
| `type` | No; body and guard rules apply | string | Record type. Values: `MX`. |

##### dns-records_NAPTRRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted NAPTR content. See 'data' to set NAPTR properties. |
| `data` | No; body and guard rules apply | object | Components of a NAPTR record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `NAPTR`. |

##### dns-records_NAPTRRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `flags` | No; body and guard rules apply | string | Flags. |
| `order` | No; body and guard rules apply | number | Order. minimum: `0`. maximum: `65535`. |
| `preference` | No; body and guard rules apply | number | Preference. minimum: `0`. maximum: `65535`. |
| `regex` | No; body and guard rules apply | string | Regex. |
| `replacement` | No; body and guard rules apply | string | Replacement. |
| `service` | No; body and guard rules apply | string | Service. |

##### dns-records_NSRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | A valid name server host name. |
| `type` | No; body and guard rules apply | string | Record type. Values: `NS`. |

##### dns-records_OPENPGPKEYRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1) |
| `type` | No; body and guard rules apply | string | Record type. Values: `OPENPGPKEY`. |

##### dns-records_PTRRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Domain name pointing to the address. |
| `type` | No; body and guard rules apply | string | Record type. Values: `PTR`. |

##### dns-records_SMIMEARecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted SMIMEA content. See 'data' to set SMIMEA properties. |
| `data` | No; body and guard rules apply | object | Components of a SMIMEA record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `SMIMEA`. |

##### dns-records_SMIMEARecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `certificate` | No; body and guard rules apply | string | Certificate. |
| `matching_type` | No; body and guard rules apply | number | Matching Type. minimum: `0`. maximum: `255`. |
| `selector` | No; body and guard rules apply | number | Selector. minimum: `0`. maximum: `255`. |
| `usage` | No; body and guard rules apply | number | Usage. minimum: `0`. maximum: `255`. |

##### dns-records_SRVRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Priority, weight, port, and SRV target. See 'data' for setting the individual component values. |
| `data` | No; body and guard rules apply | object | Components of a SRV record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `SRV`. |

##### dns-records_SRVRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `port` | No; body and guard rules apply | number | The port of the service. minimum: `0`. maximum: `65535`. |
| `priority` | No; body and guard rules apply | dns-records_priority | See the full input schema. |
| `target` | No; body and guard rules apply | string | A valid hostname. format: `hostname`. |
| `weight` | No; body and guard rules apply | number | The record weight. minimum: `0`. maximum: `65535`. |

##### dns-records_SSHFPRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted SSHFP content. See 'data' to set SSHFP properties. |
| `data` | No; body and guard rules apply | object | Components of a SSHFP record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `SSHFP`. |

##### dns-records_SSHFPRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `algorithm` | No; body and guard rules apply | number | Algorithm. minimum: `0`. maximum: `255`. |
| `fingerprint` | No; body and guard rules apply | string | Fingerprint. |
| `type` | No; body and guard rules apply | number | Type. minimum: `0`. maximum: `255`. |

##### dns-records_SVCBRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted SVCB content. See 'data' to set SVCB properties. |
| `data` | No; body and guard rules apply | object | Components of a SVCB record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `SVCB`. |

##### dns-records_SVCBRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `priority` | No; body and guard rules apply | number | Priority. minimum: `0`. maximum: `65535`. |
| `target` | No; body and guard rules apply | string | Target. |
| `value` | No; body and guard rules apply | string | Value. |

##### dns-records_TLSARecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted TLSA content. See 'data' to set TLSA properties. |
| `data` | No; body and guard rules apply | object | Components of a TLSA record. |
| `type` | No; body and guard rules apply | string | Record type. Values: `TLSA`. |

##### dns-records_TLSARecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `certificate` | No; body and guard rules apply | string | Certificate. |
| `matching_type` | No; body and guard rules apply | number | Matching Type. minimum: `0`. maximum: `255`. |
| `selector` | No; body and guard rules apply | number | Selector. minimum: `0`. maximum: `255`. |
| `usage` | No; body and guard rules apply | number | Usage. minimum: `0`. maximum: `255`. |

##### dns-records_TXTRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Text content for the record. The content must consist of quoted "character strings" (RFC 1035), each with a length of up to 255 bytes. Strings exceeding this allowed maximum length are automatically split.  Learn more at . |
| `type` | No; body and guard rules apply | string | Record type. Values: `TXT`. |

##### dns-records_URIRecord.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | string | Formatted URI content. See 'data' to set URI properties. |
| `data` | No; body and guard rules apply | object | Components of a URI record. |
| `priority` | No; body and guard rules apply | dns-records_priority | See the full input schema. |
| `type` | No; body and guard rules apply | string | Record type. Values: `URI`. |

##### dns-records_URIRecord.allOf[1].data

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `target` | No; body and guard rules apply | string | The record content. |
| `weight` | No; body and guard rules apply | number | The record weight. minimum: `0`. maximum: `65535`. |

##### dns-records_dns-record-shared-fields

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `comment` | No; body and guard rules apply | dns-records_comment | See the full input schema. |
| `name` | No; body and guard rules apply | dns-records_name | See the full input schema. |
| `proxied` | No; body and guard rules apply | dns-records_proxied | See the full input schema. |
| `settings` | No; body and guard rules apply | dns-records_settings | See the full input schema. |
| `tags` | No; body and guard rules apply | dns-records_tags | See the full input schema. |
| `ttl` | No; body and guard rules apply | dns-records_ttl | See the full input schema. |

##### dns-records_settings

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ipv4_only` | No; body and guard rules apply | boolean | When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6. default: `False`. |
| `ipv6_only` | No; body and guard rules apply | boolean | When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6. default: `False`. |

##### dns-records_dns-record-batch-delete.allOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | dns-records_identifier | See the full input schema. |

##### dns-records_dns-record-batch-patch

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | dns-records_identifier | See the full input schema. |

##### dns-records_dns-record-batch-put

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | dns-records_identifier | See the full input schema. |

##### cache-purge_Everything

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `purge_everything` | No; body and guard rules apply | boolean | Set to `true` to target all cached content in the zone, or in the environment for the environment endpoints. Must be the only field in the request. See [Purge everything](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/). |

##### cache-purge_FlexPurgeByHostnames

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `hosts` | No; body and guard rules apply | array | Hostnames, such as `www.example.com`. Targets all content cached for these hostnames. See [Purge cache by hostname](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/). Items: string. |

##### cache-purge_FlexPurgeByPrefixes

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `prefixes` | No; body and guard rules apply | array | URL prefixes, each a hostname followed by a path, such as `www.example.com/blog/`. Targets all content whose URL starts with one of these prefixes. Do not include a scheme, query string, or fragment. See [Purge cache by prefix](https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/). Items: string. |

##### cache-purge_FlexPurgeByTags

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `tags` | No; body and guard rules apply | array | Cache tags. Targets all content whose `Cache-Tag` response header contains at least one of these tags. See [Purge cache by cache-tags](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/). Items: string. |

##### cache-purge_SingleFile

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `files` | No; body and guard rules apply | array | Full URLs, such as `https://www.example.com/css/styles.css`. Targets the content cached for each URL. If your cache key includes request headers, send objects with `url` and `headers` instead. See [Purge by single-file](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/). Items: string. |

##### cache-purge_SingleFileWithUrlAndHeaders

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `files` | No; body and guard rules apply | array | URLs with the request headers your cache key uses. Use this form when your cache key includes request headers, or the visitor's device type, country, or language: send the header values each URL was cached with, such as `CF-Device-Type`, `CF-IPCountry`, or `Accept-Language`.  When you send the `Origin` header, include the scheme and hostname. Include the port unless it is the default for the scheme: 80 for `http`, 443 for `https`.  See [Purge by single-file](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/). Items: object. |

##### cache-purge_SingleFileWithUrlAndHeaders.files[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `headers` | No; body and guard rules apply | object | Request headers and the values the content was cached with. |
| `url` | No; body and guard rules apply | string | Full URL of the content. |

##### zones_automatic_platform_optimization

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cache_by_device_type` | Yes | boolean | Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled. |
| `cf` | Yes | boolean | Indicates whether or not Cloudflare proxy is enabled. default: `False`. |
| `enabled` | Yes | boolean | Indicates whether or not Automatic Platform Optimization is enabled. default: `False`. |
| `hostnames` | Yes | array | An array of hostnames where Automatic Platform Optimization for WordPress is activated. Items: string. |
| `wordpress` | Yes | boolean | Indicates whether or not site is powered by WordPress. default: `False`. |
| `wp_plugin` | Yes | boolean | Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed. default: `False`. |

##### zones_cache-rules_aegis_value

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `enabled` | No; body and guard rules apply | boolean | Whether the feature is enabled or not. |
| `pool_id` | No; body and guard rules apply | string | Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin. |

##### zones_nel_value

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `enabled` | No; body and guard rules apply | boolean | See the full input schema. default: `False`. |

##### zones_security_header_value

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `strict_transport_security` | No; body and guard rules apply | object | Strict Transport Security. |

##### zones_security_header_value.strict_transport_security

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `enabled` | No; body and guard rules apply | boolean | Whether or not strict transport security is enabled. |
| `include_subdomains` | No; body and guard rules apply | boolean | Include all subdomains for strict transport security. |
| `max_age` | No; body and guard rules apply | number | Max age in seconds of the strict transport security. |
| `nosniff` | No; body and guard rules apply | boolean | Whether or not to include 'X-Content-Type-Options: nosniff' header. |
| `preload` | No; body and guard rules apply | boolean | Enable automatic preload of the HSTS configuration. |

##### rulesets_BlockRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `block`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_BlockRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `response` | No; body and guard rules apply | object | The response to show when the block is applied. |

##### rulesets_BlockRule.allOf[1].action_parameters.response

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | Yes | string | The content to return. minLength: `1`. |
| `content_type` | Yes | string | The type of the content to return. minLength: `1`. |
| `status_code` | Yes | integer | The status code to return. minimum: `400`. maximum: `499`. |

##### rulesets_ChallengeRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `challenge`. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_CompressResponseRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `compress_response`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_CompressResponseRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `algorithms` | Yes | array | Custom order for compression algorithms. minItems: `1`. Items: object. |

##### rulesets_CompressResponseRule.allOf[1].action_parameters.algorithms[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | Name of the compression algorithm to enable. Values: `none`, `auto`, `default`, `gzip`, `brotli`, `zstd`. |

##### rulesets_DDoSDynamicRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `ddos_dynamic`. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_ExecuteCategoryOverrides[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | JSON | See the full input schema. |
| `category` | Yes | JSON | See the full input schema. |
| `enabled` | No; body and guard rules apply | JSON | See the full input schema. |
| `sensitivity_level` | No; body and guard rules apply | JSON | See the full input schema. |

##### rulesets_ExecuteMatchedData

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `public_key` | Yes | string | The public key to encrypt matched data logs with. minLength: `1`. |

##### rulesets_ExecuteOverrides

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | JSON | See the full input schema. |
| `categories` | No; body and guard rules apply | rulesets_ExecuteCategoryOverrides | See the full input schema. |
| `enabled` | No; body and guard rules apply | JSON | See the full input schema. |
| `rules` | No; body and guard rules apply | rulesets_ExecuteRuleOverrides | See the full input schema. |
| `sensitivity_level` | No; body and guard rules apply | JSON | See the full input schema. |

##### rulesets_ExecuteRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `execute`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_ExecuteRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | JSON | See the full input schema. |
| `matched_data` | No; body and guard rules apply | rulesets_ExecuteMatchedData | See the full input schema. |
| `overrides` | No; body and guard rules apply | rulesets_ExecuteOverrides | See the full input schema. |

##### rulesets_ExecuteRuleOverrides[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | JSON | See the full input schema. |
| `enabled` | No; body and guard rules apply | JSON | See the full input schema. |
| `id` | Yes | JSON | See the full input schema. |
| `score_threshold` | No; body and guard rules apply | integer | The score threshold to use for the rule. |
| `sensitivity_level` | No; body and guard rules apply | JSON | See the full input schema. |

##### rulesets_ForceConnectionCloseRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `force_connection_close`. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_JsChallengeRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `js_challenge`. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_LogCustomFieldCookieFields[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the cookie. minLength: `1`. |

##### rulesets_LogCustomFieldRawResponseFields[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the response header. minLength: `1`. |
| `preserve_duplicates` | No; body and guard rules apply | boolean | Whether to log duplicate values of the same header. default: `False`. |

##### rulesets_LogCustomFieldRequestFields[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the header. minLength: `1`. |

##### rulesets_LogCustomFieldResponseFields[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the response header. minLength: `1`. |
| `preserve_duplicates` | No; body and guard rules apply | boolean | Whether to log duplicate values of the same header. default: `False`. |

##### rulesets_LogCustomFieldRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `log_custom_field`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_LogCustomFieldRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cookie_fields` | No; body and guard rules apply | rulesets_LogCustomFieldCookieFields | See the full input schema. |
| `raw_response_fields` | No; body and guard rules apply | rulesets_LogCustomFieldRawResponseFields | See the full input schema. |
| `request_fields` | No; body and guard rules apply | rulesets_LogCustomFieldRequestFields | See the full input schema. |
| `response_fields` | No; body and guard rules apply | rulesets_LogCustomFieldResponseFields | See the full input schema. |
| `transformed_request_fields` | No; body and guard rules apply | rulesets_LogCustomFieldTransformedRequestFields | See the full input schema. |

##### rulesets_LogCustomFieldTransformedRequestFields[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the header. minLength: `1`. |

##### rulesets_LogRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `log`. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_ManagedChallengeRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `managed_challenge`. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_RedirectFromList

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `key` | Yes | string | An expression that evaluates to the list lookup key. minLength: `1`. |
| `name` | Yes | string | The name of the list to match against. pattern: `^[a-zA-Z0-9_]+$`. |

##### rulesets_RedirectFromValue

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `preserve_query_string` | No; body and guard rules apply | boolean | Whether to keep the query string of the original request. default: `False`. |
| `status_code` | No; body and guard rules apply | integer | The status code to use for the redirect. Values: `301`, `302`, `303`, `307`, `308`. |
| `target_url` | Yes | object | A URL to redirect the request to. |

##### rulesets_RedirectFromValue.target_url

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `expression` | No; body and guard rules apply | string | An expression that evaluates to a URL to redirect the request to. minLength: `1`. |
| `value` | No; body and guard rules apply | string | A URL to redirect the request to. minLength: `1`. |

##### rulesets_RedirectRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `redirect`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_RedirectRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `from_list` | No; body and guard rules apply | rulesets_RedirectFromList | See the full input schema. |
| `from_value` | No; body and guard rules apply | rulesets_RedirectFromValue | See the full input schema. |

##### rulesets_RewriteRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `rewrite`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_RewriteRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `headers` | No; body and guard rules apply | rulesets_RewriteHeaders | See the full input schema. |
| `uri` | No; body and guard rules apply | rulesets_RewriteUri | See the full input schema. |

##### rulesets_RewriteUri.allOf[0].anyOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `path` | Yes | rulesets_RewriteUriPath | See the full input schema. |

##### rulesets_RewriteUri.allOf[0].anyOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | rulesets_RewriteUriQuery | See the full input schema. |

##### rulesets_RewriteUri.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `origin` | No; body and guard rules apply | boolean | Whether to propagate the rewritten URI to origin. |

##### rulesets_RewriteUriPath

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `expression` | No; body and guard rules apply | string | An expression that evaluates to a value to rewrite the URI path to. minLength: `1`. |
| `value` | No; body and guard rules apply | string | A value to rewrite the URI path to. minLength: `1`. |

##### rulesets_RewriteUriQuery

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `expression` | No; body and guard rules apply | string | An expression that evaluates to a value to rewrite the URI query to. minLength: `1`. |
| `value` | No; body and guard rules apply | string | A value to rewrite the URI query to. |

##### rulesets_RouteOrigin

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `host` | No; body and guard rules apply | string | A resolved host to route to. minLength: `1`. |
| `port` | No; body and guard rules apply | integer | A destination port to route to. minimum: `1`. maximum: `65535`. |

##### rulesets_RouteRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `route`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_RouteRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `host_header` | No; body and guard rules apply | rulesets_RouteHostHeader | See the full input schema. |
| `origin` | No; body and guard rules apply | rulesets_RouteOrigin | See the full input schema. |
| `sni` | No; body and guard rules apply | rulesets_RouteSNI | See the full input schema. |

##### rulesets_RouteSNI

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `value` | Yes | string | A value to override the SNI to. minLength: `1`. |

##### rulesets_Rule

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | rulesets_RuleAction | See the full input schema. |
| `action_parameters` | No; body and guard rules apply | object | The parameters configuring the rule's action. default: `{}`. |
| `categories` | No; body and guard rules apply | rulesets_RuleCategories | See the full input schema. |
| `description` | No; body and guard rules apply | string | An informative description of the rule. default: `See current schema`. |
| `enabled` | No; body and guard rules apply | JSON | See the full input schema. |
| `exposed_credential_check` | No; body and guard rules apply | rulesets_RuleExposedCredentialCheck | See the full input schema. |
| `expression` | No; body and guard rules apply | string | The expression defining which traffic will match the rule. minLength: `1`. |
| `id` | No; body and guard rules apply | rulesets_RuleId | See the full input schema. |
| `last_updated` | Yes | string | The timestamp of when the rule was last modified. format: `date-time`. |
| `logging` | No; body and guard rules apply | rulesets_RuleLogging | See the full input schema. |
| `ratelimit` | No; body and guard rules apply | rulesets_RuleRatelimit | See the full input schema. |
| `ref` | No; body and guard rules apply | string | The reference of the rule (the rule's ID by default). minLength: `1`. |
| `version` | Yes | string | The version of the rule. pattern: `^[0-9]+$`. |

##### rulesets_RuleExposedCredentialCheck

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `password_expression` | Yes | string | An expression that selects the password used in the credentials check. minLength: `1`. |
| `username_expression` | Yes | string | An expression that selects the user ID used in the credentials check. minLength: `1`. |

##### rulesets_RuleLogging

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `enabled` | Yes | boolean | Whether to generate a log when the rule matches. |

##### rulesets_RuleRatelimit

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `characteristics` | Yes | array | Characteristics of the request on which the rate limit counter will be incremented. minItems: `1`. Items: string. |
| `counting_expression` | No; body and guard rules apply | string | An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression. minLength: `1`. |
| `mitigation_timeout` | No; body and guard rules apply | integer | Period of time in seconds after which the action will be disabled following its first execution. |
| `period` | Yes | integer | Period in seconds over which the counter is being incremented. minimum: `0`. |
| `requests_per_period` | No; body and guard rules apply | integer | The threshold of requests per period after which the action will be executed for the first time. minimum: `1`. |
| `requests_to_origin` | No; body and guard rules apply | boolean | Whether counting is only performed when an origin is reached. default: `False`. |
| `score_per_period` | No; body and guard rules apply | integer | The score threshold per period for which the action will be executed the first time. |
| `score_response_header_name` | No; body and guard rules apply | string | A response header name provided by the origin, which contains the score to increment rate limit counter with. minLength: `1`. |

##### rulesets_Ruleset

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `description` | No; body and guard rules apply | string | An informative description of the ruleset. default: `See current schema`. |
| `id` | Yes | JSON | See the full input schema. |
| `last_updated` | Yes | string | The timestamp of when the ruleset was last modified. format: `date-time`. |
| `name` | No; body and guard rules apply | string | The human-readable name of the ruleset. minLength: `1`. |
| `version` | Yes | JSON | See the full input schema. |

##### rulesets_ScoreRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `score`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_ScoreRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `increment` | Yes | rulesets_ScoreIncrement | See the full input schema. |

##### rulesets_ServeErrorRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `serve_error`. |
| `action_parameters` | No; body and guard rules apply | JSON | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_ServeErrorRule.allOf[1].action_parameters.allOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content_type` | Yes | rulesets_ServeErrorContentType | See the full input schema. |
| `status_code` | No; body and guard rules apply | rulesets_ServeErrorStatusCode | See the full input schema. |

##### rulesets_ServeErrorRule.allOf[1].action_parameters.allOf[1].oneOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | Yes | rulesets_ServeErrorContent | See the full input schema. |

##### rulesets_ServeErrorRule.allOf[1].action_parameters.allOf[1].oneOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `asset_name` | Yes | rulesets_ServeErrorAssetName | See the full input schema. |

##### rulesets_SetCacheControlDirective.oneOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cloudflare_only` | No; body and guard rules apply | rulesets_SetCacheControlCloudflareOnly | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |

##### rulesets_SetCacheControlDirective.oneOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cloudflare_only` | No; body and guard rules apply | rulesets_SetCacheControlCloudflareOnly | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |

##### rulesets_SetCacheControlDirectiveWithQualifiers.oneOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cloudflare_only` | No; body and guard rules apply | rulesets_SetCacheControlCloudflareOnly | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |
| `qualifiers` | No; body and guard rules apply | array | Optional list of header names to qualify the directive (e.g., for "private" or "no-cache" directives). Items: string. |

##### rulesets_SetCacheControlDirectiveWithValue.oneOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cloudflare_only` | No; body and guard rules apply | rulesets_SetCacheControlCloudflareOnly | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |
| `value` | Yes | integer | The duration value in seconds for the directive. minimum: `0`. |

##### rulesets_SetCacheControlRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `set_cache_control`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_SetCacheControlRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `immutable` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `max-age` | No; body and guard rules apply | rulesets_SetCacheControlDirectiveWithValue | See the full input schema. |
| `must-revalidate` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `must-understand` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `no-cache` | No; body and guard rules apply | rulesets_SetCacheControlDirectiveWithQualifiers | See the full input schema. |
| `no-store` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `no-transform` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `private` | No; body and guard rules apply | rulesets_SetCacheControlDirectiveWithQualifiers | See the full input schema. |
| `proxy-revalidate` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `public` | No; body and guard rules apply | rulesets_SetCacheControlDirective | See the full input schema. |
| `s-maxage` | No; body and guard rules apply | rulesets_SetCacheControlDirectiveWithValue | See the full input schema. |
| `stale-if-error` | No; body and guard rules apply | rulesets_SetCacheControlDirectiveWithValue | See the full input schema. |
| `stale-while-revalidate` | No; body and guard rules apply | rulesets_SetCacheControlDirectiveWithValue | See the full input schema. |

##### rulesets_SetCacheSettingsBrowserTTL

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `default` | No; body and guard rules apply | integer | The browser TTL (in seconds) if you choose the "override_origin" mode. minimum: `0`. |
| `mode` | Yes | string | The browser TTL mode. Values: `respect_origin`, `bypass_by_default`, `override_origin`, `bypass`. |

##### rulesets_SetCacheSettingsCacheKey

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cache_by_device_type` | No; body and guard rules apply | boolean | Whether to separate cached content based on the visitor's device type. |
| `cache_deception_armor` | No; body and guard rules apply | boolean | Whether to protect from web cache deception attacks, while allowing static assets to be cached. |
| `custom_key` | No; body and guard rules apply | rulesets_SetCacheSettingsCustomCacheKey | See the full input schema. |
| `ignore_query_strings_order` | No; body and guard rules apply | boolean | Whether to treat requests with the same query parameters the same, regardless of the order those query parameters are in. |

##### rulesets_SetCacheSettingsCacheReserve

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `eligible` | Yes | boolean | Whether Cache Reserve is enabled. If this is true and a request meets eligibility criteria, Cloudflare will write the resource to Cache Reserve. |
| `minimum_file_size` | No; body and guard rules apply | integer | The minimum file size eligible for storage in Cache Reserve. minimum: `0`. |

##### rulesets_SetCacheSettingsCustomCacheKey

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `cookie` | No; body and guard rules apply | rulesets_SetCacheSettingsCustomCacheKeyCookie | See the full input schema. |
| `header` | No; body and guard rules apply | rulesets_SetCacheSettingsCustomCacheKeyHeader | See the full input schema. |
| `host` | No; body and guard rules apply | rulesets_SetCacheSettingsCustomCacheKeyHost | See the full input schema. |
| `query_string` | No; body and guard rules apply | rulesets_SetCacheSettingsCustomCacheKeyQueryString | See the full input schema. |
| `user` | No; body and guard rules apply | rulesets_SetCacheSettingsCustomCacheKeyUser | See the full input schema. |

##### rulesets_SetCacheSettingsCustomCacheKeyCookie

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `check_presence` | No; body and guard rules apply | array | A list of cookies to check for the presence of. The presence of these cookies is included in the cache key. minItems: `1`. Items: string. |
| `include` | No; body and guard rules apply | array | A list of cookies to include in the cache key. minItems: `1`. Items: string. |

##### rulesets_SetCacheSettingsCustomCacheKeyHeader

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `check_presence` | No; body and guard rules apply | array | A list of headers to check for the presence of. The presence of these headers is included in the cache key. minItems: `1`. Items: string. |
| `contains` | No; body and guard rules apply | object | A mapping of header names to a list of values. If a header is present in the request and contains any of the values provided, its value is included in the cache key. |
| `exclude_origin` | No; body and guard rules apply | boolean | Whether to exclude the origin header in the cache key. |
| `include` | No; body and guard rules apply | array | A list of headers to include in the cache key. minItems: `1`. Items: string. |

##### rulesets_SetCacheSettingsCustomCacheKeyHost

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `resolved` | No; body and guard rules apply | boolean | Whether to use the resolved host in the cache key. |

##### rulesets_SetCacheSettingsCustomCacheKeyQueryString

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `exclude` | No; body and guard rules apply | object | Which query string parameters to exclude from the cache key. |
| `include` | No; body and guard rules apply | object | Which query string parameters to include in the cache key. |

##### rulesets_SetCacheSettingsCustomCacheKeyQueryString.exclude

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `all` | No; body and guard rules apply | boolean | Whether to exclude all query string parameters from the cache key. Values: `True`. |
| `list` | No; body and guard rules apply | array | A list of query string parameters to exclude from the cache key. minItems: `1`. Items: string. |

##### rulesets_SetCacheSettingsCustomCacheKeyQueryString.include

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `all` | No; body and guard rules apply | boolean | Whether to include all query string parameters in the cache key. Values: `True`. |
| `list` | No; body and guard rules apply | array | A list of query string parameters to include in the cache key. minItems: `1`. Items: string. |

##### rulesets_SetCacheSettingsCustomCacheKeyUser

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `device_type` | No; body and guard rules apply | boolean | Whether to use the user agent's device type in the cache key. |
| `geo` | No; body and guard rules apply | boolean | Whether to use the user agents's country in the cache key. |
| `lang` | No; body and guard rules apply | boolean | Whether to use the user agent's language in the cache key. |

##### rulesets_SetCacheSettingsEdgeTTL

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `default` | No; body and guard rules apply | integer | The edge TTL (in seconds) if you choose the "override_origin" mode. minimum: `0`. |
| `mode` | Yes | string | The edge TTL mode. Values: `respect_origin`, `bypass_by_default`, `override_origin`. |
| `status_code_ttl` | No; body and guard rules apply | rulesets_SetCacheSettingsStatusCodeTTL | See the full input schema. |

##### rulesets_SetCacheSettingsOriginRangeRequests

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `mode` | Yes | string | Whether to use range requests. `default` is the behaviour the zone gets without this rule. Values: `on`, `off`, `default`. |

##### rulesets_SetCacheSettingsRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `set_cache_settings`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_SetCacheSettingsRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `additional_cacheable_ports` | No; body and guard rules apply | rulesets_SetCacheSettingsAdditionalCacheablePorts | See the full input schema. |
| `browser_ttl` | No; body and guard rules apply | rulesets_SetCacheSettingsBrowserTTL | See the full input schema. |
| `cache` | No; body and guard rules apply | rulesets_SetCacheSettingsCache | See the full input schema. |
| `cache_key` | No; body and guard rules apply | rulesets_SetCacheSettingsCacheKey | See the full input schema. |
| `cache_reserve` | No; body and guard rules apply | rulesets_SetCacheSettingsCacheReserve | See the full input schema. |
| `edge_ttl` | No; body and guard rules apply | rulesets_SetCacheSettingsEdgeTTL | See the full input schema. |
| `origin_cache_control` | No; body and guard rules apply | rulesets_SetCacheSettingsOriginCacheControl | See the full input schema. |
| `origin_error_page_passthru` | No; body and guard rules apply | rulesets_SetCacheSettingsOriginErrorPagePassthru | See the full input schema. |
| `origin_range_requests` | No; body and guard rules apply | rulesets_SetCacheSettingsOriginRangeRequests | See the full input schema. |
| `read_timeout` | No; body and guard rules apply | rulesets_SetCacheSettingsReadTimeout | See the full input schema. |
| `respect_strong_etags` | No; body and guard rules apply | rulesets_SetCacheSettingsRespectStrongEtags | See the full input schema. |
| `serve_stale` | No; body and guard rules apply | rulesets_SetCacheSettingsServeStale | See the full input schema. |
| `shared_dictionary` | No; body and guard rules apply | rulesets_SetCacheSettingsSharedDictionary | See the full input schema. |
| `strip_etags` | No; body and guard rules apply | rulesets_SetCacheSettingsStripETags | See the full input schema. |
| `strip_last_modified` | No; body and guard rules apply | rulesets_SetCacheSettingsStripLastModified | See the full input schema. |
| `strip_set_cookie` | No; body and guard rules apply | rulesets_SetCacheSettingsStripSetCookie | See the full input schema. |
| `vary` | No; body and guard rules apply | rulesets_SetCacheSettingsVary | See the full input schema. |

##### rulesets_SetCacheSettingsServeStale

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `disable_stale_while_updating` | No; body and guard rules apply | boolean | Whether Cloudflare should disable serving stale content while getting the latest content from the origin. |

##### rulesets_SetCacheSettingsSharedDictionary

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `match_pattern` | Yes | string | URL pattern for the Use-As-Dictionary match field. This pattern specifies which URLs can use this response as a dictionary. minLength: `1`. maxLength: `1024`. |

##### rulesets_SetCacheSettingsStatusCodeTTL[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `status_code` | No; body and guard rules apply | integer | A single status code to apply the TTL to. minimum: `100`. maximum: `999`. |
| `status_code_range` | No; body and guard rules apply | object | A range of status codes to apply the TTL to. |
| `value` | Yes | integer | The time to cache the response for (in seconds). A value of 0 is equivalent to setting the cache control header with the value "no-cache". A value of -1 is equivalent to setting the cache control header with the value of "no-store". |

##### rulesets_SetCacheSettingsStatusCodeTTL[].status_code_range

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `from` | No; body and guard rules apply | integer | The lower bound of the range. minimum: `100`. maximum: `999`. |
| `to` | No; body and guard rules apply | integer | The upper bound of the range. minimum: `100`. maximum: `999`. |

##### rulesets_SetCacheSettingsVary

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `default` | No; body and guard rules apply | rulesets_SetCacheSettingsVaryDefault | See the full input schema. |
| `headers` | No; body and guard rules apply | object | A mapping of lowercase request header names to their vary configuration. |

##### rulesets_SetCacheSettingsVaryDefault

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | Yes | string | How the header value is treated when building the cache key. Values: `bypass`, `passthrough`, `normalize`. |

##### rulesets_SetCacheSettingsVaryHeader

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | Yes | string | How the header value is treated when building the cache key. Values: `bypass`, `passthrough`, `normalize`. |
| `languages` | No; body and guard rules apply | array | The set of languages to normalize against. Only valid for the `accept-language` header. maxItems: `20`. Items: string. |
| `media_types` | No; body and guard rules apply | array | The set of media types to normalize against. Only valid for the `accept` header. maxItems: `10`. Items: string. |

##### rulesets_SetCacheTagsRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `set_cache_tags`. |
| `action_parameters` | No; body and guard rules apply | Union | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_SetCacheTagsRule.allOf[1].action_parameters.oneOf[0]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | JSON | See the full input schema. |
| `values` | Yes | rulesets_SetCacheTagsValues | See the full input schema. |

##### rulesets_SetCacheTagsRule.allOf[1].action_parameters.oneOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `expression` | Yes | rulesets_SetCacheTagsExpression | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |

##### rulesets_SetCacheTagsRule.allOf[1].action_parameters.oneOf[2]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | JSON | See the full input schema. |
| `values` | Yes | rulesets_SetCacheTagsValues | See the full input schema. |

##### rulesets_SetCacheTagsRule.allOf[1].action_parameters.oneOf[3]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `expression` | Yes | rulesets_SetCacheTagsExpression | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |

##### rulesets_SetCacheTagsRule.allOf[1].action_parameters.oneOf[4]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | JSON | See the full input schema. |
| `values` | Yes | rulesets_SetCacheTagsValues | See the full input schema. |

##### rulesets_SetCacheTagsRule.allOf[1].action_parameters.oneOf[5]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `expression` | Yes | rulesets_SetCacheTagsExpression | See the full input schema. |
| `operation` | Yes | JSON | See the full input schema. |

##### rulesets_SetConfigAutominify

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `css` | No; body and guard rules apply | boolean | Whether to minify CSS files. default: `False`. |
| `html` | No; body and guard rules apply | boolean | Whether to minify HTML files. default: `False`. |
| `js` | No; body and guard rules apply | boolean | Whether to minify JavaScript files. default: `False`. |

##### rulesets_SetConfigRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `set_config`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_SetConfigRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `automatic_https_rewrites` | No; body and guard rules apply | boolean | Whether to enable Automatic HTTPS Rewrites. |
| `autominify` | No; body and guard rules apply | rulesets_SetConfigAutominify | See the full input schema. |
| `bic` | No; body and guard rules apply | boolean | Whether to enable Browser Integrity Check (BIC). |
| `content_converter` | No; body and guard rules apply | boolean | Whether to enable content conversion (e.g., HTML to Markdown). |
| `disable_apps` | No; body and guard rules apply | boolean | Whether to disable Cloudflare Apps. Values: `True`. |
| `disable_pay_per_crawl` | No; body and guard rules apply | boolean | Whether to disable Pay Per Crawl. Values: `True`. |
| `disable_rum` | No; body and guard rules apply | boolean | Whether to disable Real User Monitoring (RUM). Values: `True`. |
| `disable_zaraz` | No; body and guard rules apply | boolean | Whether to disable Zaraz. Values: `True`. |
| `email_obfuscation` | No; body and guard rules apply | boolean | Whether to enable Email Obfuscation. |
| `fonts` | No; body and guard rules apply | boolean | Whether to enable Cloudflare Fonts. |
| `hotlink_protection` | No; body and guard rules apply | boolean | Whether to enable Hotlink Protection. |
| `mirage` | No; body and guard rules apply | boolean | Whether to enable Mirage. |
| `opportunistic_encryption` | No; body and guard rules apply | boolean | Whether to enable Opportunistic Encryption. |
| `polish` | No; body and guard rules apply | string | The Polish level to configure. Values: `off`, `lossless`, `lossy`, `webp`. |
| `redirects_for_ai_training` | No; body and guard rules apply | boolean | Whether to redirect verified AI training crawlers to canonical URLs found in the HTML response. |
| `request_body_buffering` | No; body and guard rules apply | string | The request body buffering mode. Values: `none`, `standard`, `full`. |
| `response_body_buffering` | No; body and guard rules apply | string | The response body buffering mode. Values: `none`, `standard`. |
| `rocket_loader` | No; body and guard rules apply | boolean | Whether to enable Rocket Loader. |
| `security_level` | No; body and guard rules apply | string | The Security Level to configure. Values: `off`, `essentially_off`, `low`, `medium`, `high`, `under_attack`. |
| `server_side_excludes` | No; body and guard rules apply | boolean | Whether to enable Server-Side Excludes. |
| `ssl` | No; body and guard rules apply | string | The SSL level to configure. Values: `off`, `flexible`, `full`, `strict`, `origin_pull`. |
| `sxg` | No; body and guard rules apply | boolean | Whether to enable Signed Exchanges (SXG). |
| `webmcp_enabled` | No; body and guard rules apply | boolean | Whether to serve the WebMCP bridge script, which exposes the page's tools to browser AI agents. |
| `webmcp_packs` | No; body and guard rules apply | array | Bundled WebMCP tool packs to activate for matching requests. An empty array disables all packs. Omitting this parameter leaves the pack selection unchanged. Does not enable the WebMCP bridge itself. Non-empty selections require the WebMCP Configuration Rules entitlement. maxItems: `100`. Items: string. |

##### rulesets_SkipRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `skip`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_SkipRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `phase` | No; body and guard rules apply | rulesets_SkipPhase | See the full input schema. |
| `phases` | No; body and guard rules apply | rulesets_SkipPhases | See the full input schema. |
| `products` | No; body and guard rules apply | rulesets_SkipProducts | See the full input schema. |
| `rules` | No; body and guard rules apply | rulesets_SkipRules | See the full input schema. |
| `ruleset` | No; body and guard rules apply | rulesets_SkipRuleset | See the full input schema. |
| `rulesets` | No; body and guard rules apply | rulesets_SkipRulesets | See the full input schema. |

##### rulesets_TransformResponseHTMLRule.allOf[1]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `action` | No; body and guard rules apply | string | See the full input schema. Values: `transform_response_html`. |
| `action_parameters` | No; body and guard rules apply | object | See the full input schema. |
| `description` | No; body and guard rules apply | string | See the full input schema. |

##### rulesets_TransformResponseHTMLRule.allOf[1].action_parameters

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `link_maze` | Yes | object | Enables the link maze transformation on the response. |

## 9. DNS, Rulesets, cache and analytics

### A deliberate DNS change

Read list_zones, get_zone and list_dns_records to establish the exact zone and record. Inspect get_operation_schema for create_dns_record or update_dns_record. A PATCH edits provided fields; a PUT replacement can alter omitted-field behavior. Choose ttl/proxied/type/content deliberately rather than assuming every record should be proxied. DNS conflicts, plan constraints and semantic validity are finally decided by Cloudflare.

```bash
cloudflare-cli preview-operation --operation create_dns_record --arguments '{"zone_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","payload":{"name":"review.example.com","type":"A","content":"192.0.2.1","ttl":1,"proxied":false}}' --agent
cloudflare-cli create-dns-record --zone-id YOUR_ZONE_ID --payload-file /absolute/private/approved-dns.json --account work --confirm --agent
```

The first command is a local illustration using documentation-only IDs/IPs. It makes no provider request. The second is a real mutation only when private credentials, a real resource and the explicitly approved body are supplied. After any approved change, read the returned record and check the intended resolver/service.

### Review a small DNS batch

Save only the chosen native deletes/patches/puts/posts body in a private JSON file. preview_dns_batch validates the same native schema and 1–50 total-action cap, then returns a SHA-256 digest of method, exact zone path, profile label and canonically sorted JSON object keys. Array order is preserved. Read and approve the full body, target and profile before apply_dns_batch.

```bash
cloudflare-cli preview-dns-batch --zone-id YOUR_ZONE_ID --payload-file /absolute/private/approved-dns-batch.json --account work --agent
cloudflare-cli apply-dns-batch --zone-id YOUR_ZONE_ID --payload-file /absolute/private/approved-dns-batch.json --account work --preview-sha256 REVIEWED_64_CHARACTER_HASH --confirm --agent
```

Any change to that reviewed request requires a new preview. This does not detect concurrent remote edits, credential rotation under the same label or changes in token grants. The digest is not an authorization secret, human approval signature or remote-state transaction lock. The direct native batch_dns_records command also exists, requires --confirm and does not require a digest; choose the review/apply workflow when you need exact local review.

[Cloudflare batch semantics](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/) execute deletes, patches, puts, then posts in a database transaction; distributed DNS propagation remains non-atomic. If provider validation fails, no batch changes apply. A network failure after submission can leave the outcome unknown; read the affected records before repeating. The wrapper never promises all resolvers change at once or supplies a rollback.

### Settings and Rulesets

get_zone_setting with setting_id=ssl replaces the older SSL helper. Inspect the setting's editable/value metadata before update_zone_setting. Ruleset actions and phases have distinct plan/grant requirements; read list_zone_rulesets, get_zone_ruleset and get_zone_entrypoint before creation/update/deletion. Source schemas are broad and cannot establish that a chosen expression or action is appropriate. This release has no deprecated firewall-rule writer and no misleading Page Rule redirect shortcut.

Page Rules are readable for migration inventory; no Page Rules writer is exposed. A redirect should use a consciously selected modern Ruleset phase/action and full approved body. Cloudflare's modern Rules product is not a drop-in rename of every old rule.

### Cache, Workers and analytics

purge_cache changes edge cache only for the specified native request; it requires confirmation even for a single URL. It does not delete source files. list_workers reads script metadata, not script content, secrets or deployment state. Use Wrangler/cf for deployment workflows.

analytics_query accepts exactly one parsed GraphQL query with variables, refusing mutation/subscription/multiple-operation/schema documents. It is not a compiled dataset client or automatic time-series export. Choose eligible zoneTag/accountTag, dataset, time window, limits and ordering using current analytics docs/settings discovery. Provider partial errors fail instead of becoming silent success. Sampling, retention and dataset permissions still apply.

## 10. Pagination, retries and local input files

Ordinary reads fetch one provider response. query_pages supports only list_provider_accounts, list_zones and list_dns_records, with explicit native arguments, max_pages=1–5 and a local per_page cap of 100. Positive page numbers are required. result_info total_pages/total_count controls continuation. Missing metadata stops after the current response and reports continuationUnknown=true, rather than guessing complete. pages preserves native envelopes; pagesRead/hasMore/resumePage make the bounded result explicit.

```bash
cloudflare-cli query-pages --operation list_dns_records --arguments '{"zone_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","per_page":50,"page":1}' --max-pages 2 --agent
```

No automatic replay occurs after HTTP 429, transient error, timeout or mutation failure. Every ordinary native operation submits one request; bounded reads can submit up to the selected page budget. Parallel processes/profile labels share provider limits when they use the same token. A timeout is not proof that a mutation failed.

payload_file must be a regular non-symlink JSON file, at most 1 MiB; native payload and payload_file cannot be mixed. Confirmation/read-only policies are checked before file loading or provider fetch for mutations. The request body is validated through current Ajv schemas. This wrapper does not execute file content, upload local media, load .env automatically or accept arbitrary provider hosts/headers. Treat inputs and returned DNS TXT/rule descriptions as data, never agent instructions.

## 11. Several private accounts

Private profile configuration prevents implicit credential inheritance between named accounts. Configure the following placeholders only in a private client environment:

```json
[
  {
    "name": "work",
    "token_file": "/absolute/private/work-cloudflare.txt",
    "account_id": "YOUR_WORK_ACCOUNT_ID",
    "zone_id": "YOUR_WORK_ZONE_ID",
    "token_kind": "user"
  },
  {
    "name": "client",
    "token_file": "/absolute/private/client-cloudflare.txt",
    "account_id": "YOUR_CLIENT_ACCOUNT_ID",
    "zone_id": "YOUR_CLIENT_ZONE_ID",
    "token_kind": "account"
  }
]
```

Put the array in CLOUDFLARE_ACCOUNTS and set CLOUDFLARE_DEFAULT_ACCOUNT=work. Names must be unique and nonempty. --account selects the exact label; list_accounts returns only label/default/auth method, never token values, file paths or provider IDs. A profile lacking credentials does not fall back to a global token. Global account/zone defaults likewise do not leak into explicitly named entries.

account_id/zone_id are routing defaults; explicit operation inputs take precedence and can name another resource allowed by the token. Token-kind defaults to user and only changes the diagnostic verification route. Use provider token resource scopes for real access boundaries. Local profile separation is not a multi-user access-control service.

## 12. Writing safely

Every one of the eleven mutations requires confirm=true in MCP or --confirm in the CLI. The same WriteGuard runs before file loading/provider execution. Creation, edits, replacement, deletion, cache purge and Ruleset changes all require explicit intent. --agent and --yes never grant it.

CLOUDFLARE_READ_ONLY=1 hides every mutation and refuses direct calls to hidden names even with confirmation. CLOUDFLARE_ALLOW_DESTRUCTIVE=0 blocks all mutations even when confirmed; read-only takes precedence. Use narrow provider tokens as the authorization boundary. A model can assert confirm=true; clients and the human still decide whether the action was requested. This is not a cryptographic human approval.

Review the exact zone/account, profile, record/rule IDs and full native body. apply_dns_batch additionally compares the reviewed request digest and makes one native request without automatic replay. Local preview does not authenticate the account, check conflicts or read remote state. Direct native batch also needs confirmation but does not require the digest.

An optional CLOUDFLARE_AUDIT_LOG records timestamp, surface, tool, risk, static summary and decision. It excludes request bodies, account IDs and tokens. Existing file ACLs/rotation are your responsibility; a failed audit append does not block the action. Account data returned after a change is untrusted content.

## 13. How the two surfaces work

src/tools/index.ts builds one ALL_TOOLS catalogue from reviewed operation metadata and seven helpers. Both binaries use the same schemas, validation, profile routing, API client and WriteGuard. CLI command names are derived by converting underscores to hyphens; MCP uses stdio JSON-RPC and official SDK transport.

The server can initialize/discover without credentials. Local helper annotations accurately distinguish local work from provider calls. API requests use one fixed origin, no arbitrary headers or redirects and no automatic retries. Current selected body schemas use Ajv with formats; analytics is parsed through GraphQL's AST before fetch. Version comes from package.json; the desktop manifest/root lock must agree.

The public metadata excludes vendor examples/code samples. scripts/sync-openapi.mjs checks distributed metadata offline or compares against a checksum-reviewed local official JSON file. Refresh requires an explicit reviewed checksum and source commit; it has no network or source-code import path. Review changes, scan, rebuild, regenerate docs and bump versions before release.

## 14. Privacy and data handling

Account commands send the selected token in a Bearer header only to api.cloudflare.com. Prompts are not forwarded by this package; the native request/query content you select is. Your AI client may send returned DNS records, rule expressions and analytics to its model provider according to its own policy. The wrapper has no telemetry, public HTTP listener or hosted account store.

Named private profiles do not inherit global credentials. Token files use size/type/POSIX owner-only checks and are cached until restart. Windows ACLs require separate user configuration. Never commit credentials, .env, token files, real account exports or signed URLs; keep all such files outside public source and release staging.

Known credential keys, configured secrets and recognized signed URLs are redacted from ordinary output/errors. Legitimate URLs are preserved. Redaction is not complete anonymization: DNS TXT records, names, expressions and returned account data may still be sensitive. --select is local data shaping, not an authorization boundary or upstream privacy filter. Capture only needed output; terminal history and client transcripts can persist it.

Optional audit logging stores policy metadata, not bodies. The package does not automatically persist provider responses or backups; private input/output files you create remain on your system until you manage them. Revoke tokens through Cloudflare, not npm.

## 15. Environment variables

Configure these privately in the environment of the actual client process. The package does not automatically load a .env file. GUI clients may need private settings rather than shell exports.

| Variable | Purpose / default |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Private Bearer API token; no Global API Key support |
| `CLOUDFLARE_TOKEN_FILE` | Absolute regular owner-only token-only file; max 64 KiB; takes precedence |
| `CLOUDFLARE_ACCOUNTS` | Private JSON array of explicit named profiles; no global credential/default inheritance |
| `CLOUDFLARE_DEFAULT_ACCOUNT` | Exact profile name; first profile default when omitted |
| `CLOUDFLARE_ACCOUNT_ID` | Optional default account ID when using the single global profile |
| `CLOUDFLARE_ZONE_ID` | Optional default zone ID when using the single global profile |
| `CLOUDFLARE_TOKEN_KIND` | user (default) or account; doctor verification route only |
| `CLOUDFLARE_READ_ONLY` | 1/true hides/refuses every mutation |
| `CLOUDFLARE_ALLOW_DESTRUCTIVE` | 0/false refuses confirmed mutations; otherwise enabled |
| `CLOUDFLARE_AUDIT_LOG` | Optional private append-only metadata path |
| `CLOUDFLARE_REQUEST_TIMEOUT_MS` | Default 30000; integer 100–300000; no automatic retry |
| `CLOUDFLARE_MIN_REQUEST_INTERVAL_MS` | Default 200; integer 0–10000; per profile/process |

Credential/profile fields are strings without line breaks. Only 1/true enables read-only; 0/false disables destructive operations. Named profile keys are name, api_key or api_token, token_file, account_id, zone_id and token_kind. api_key is a compatibility field name holding a Bearer token, never a Global API Key.

## 16. Updates and removal

```bash
npm install -g @thenavidm/cloudflare-mcp-cli@latest
cloudflare-cli --version
npm uninstall -g @thenavidm/cloudflare-mcp-cli
codex mcp remove cloudflare
```

npx @latest resolves again when the server starts; restart/reconnect to use the release. Global npm installs need an explicit update. Desktop extensions need the new versioned archive installed separately. Check CHANGELOG.md and the manifest; remove duplicate MCP entries rather than running two account servers accidentally.

Remove client configuration/skill references and deliberately manage private files. Uninstall does not revoke tokens or undo DNS, Rulesets/cache changes. Existing private legacy refs stay private; migrate configuration/commands deliberately using the map below. Pin 2.0.0 if reproducible installation matters more than automatically receiving the latest release.

## 17. Troubleshooting

| Symptom | Check |
| --- | --- |
| Binary missing / PowerShell policy | Node/npm version, npm global prefix/PATH, npm.cmd or Command Prompt; reopen terminal |
| GUI cannot launch npx | Client environment; Windows cmd /c launcher or absolute node and entry path |
| Exit 10 | Private token/file for the selected profile; no implicit global inheritance |
| Token doctor fails | Token kind, account ID for account-owned verification, expiry/IP filter and active status |
| Token verifies but zone read fails | Exact resource IDs, token permissions/resource restrictions and membership |
| Mutation refuses | Exact --confirm/confirm:true, read-only and disabled-operation policy |
| Native body rejected | Complete current JSON payload, type-specific union branch, required keys and no unknown root fields |
| Batch digest changed | Re-preview exact zone/profile/body; do not copy a digest from another request |
| Unknown continuation | Provider metadata absent; bounded result does not establish the entire library |
| HTTP 200 but command fails | Provider success/errors or GraphQL partial errors; inspect sanitized error |
| HTTP 429 / timeout | Provider quota/reset; no automatic replay; inspect state before deliberate retry |
| Setting/rule unsupported | Provider plan, editable state, selected Ruleset phase/action and accepted grants |
| Analytics absent / sampled | Dataset settings, time window, plan/grant/retention and sampling |
| Expected Worker deploy / OAuth | Use official cf/Wrangler or hosted MCP; this focused package has neither |

Report a minimal redacted reproduction with package/client/OS versions and tool name. Never post token values, real DNS TXT secrets, private bodies or full account exports. Account/GUI/task outcomes are not established by fixture tests or stdio discovery.

## 18. API coverage and comparisons

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


### Legacy command migration

| Legacy command | Current route | Migration detail |
| --- | --- | --- |
| list_zones/get_zone | Same names | Current native arguments/envelopes; use exact filters |
| list_dns_records/create/update/delete | Same names | Complete native payload schemas; every mutation confirmed |
| purge_cache | Same name | Native body and explicit approval |
| get_ssl_settings/update_ssl_settings | get_zone_setting/update_zone_setting | setting_id=ssl and current value schema |
| get_zone_settings/update_zone_setting | Per-setting read/update | Deprecated bulk settings route excluded |
| get_zone_analytics | analytics_query | Read-only current GraphQL dataset query, not deprecated REST dashboard |
| list_firewall_rules | list_zone_rulesets / get_zone_ruleset | Current Rulesets product; no deprecated firewall writer |
| create_redirect_rule/list_redirects | Explicit selected Ruleset workflow | Legacy helper created Page Rules; modern redirect phase/action must be reviewed |
| list_page_rules | Read-only Page Rules inventory | No legacy Page Rule writer |
| list_workers | Same name | Worker script metadata only, no deployment |

Private legacy source is retained separately and never pushed into clean public history. The old source has 17 MCP tools and no declared task CLI. This release changes input/response/config contracts, so migration is deliberate rather than an unverified drop-in compatibility promise.

## 19. Versions

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


See [CHANGELOG.md](CHANGELOG.md) for dated changes and [GitHub Releases](https://github.com/thenavidm/cloudflare-mcp-cli/releases) for annotated source tags and versioned desktop assets. Match npm, server, manifest and root lock versions. Future schema refreshes must record upstream commit/checksums, exclusions, changed inputs and comparison evidence; do not assume a provider beta stays the same. No prior public legacy npm/tag release is implied.

## 20. FAQ

<details>
<summary><b>What does this package provide?</b></summary>

A focused shared Cloudflare CLI/local MCP and desktop archive, with 29 tools: 18 reads and 11 explicitly confirmed mutations. Its selected DNS/zone management surface is narrower than the official general API tools.

</details>

<details>
<summary><b>Does Cloudflare already have official MCPs and a CLI?</b></summary>

Yes. Code Mode MCP, specialized provider MCPs, the general cf CLI and Wrangler already exist. The comparison documents their strengths and our specific recurring workflow rather than claiming they are missing.

</details>

<details>
<summary><b>Why build this if official tools exist?</b></summary>

For consistent mandatory confirmation in both local surfaces, isolated private profiles and an exact-request DNS batch review. These are tested local workflow differences; no universal superiority or measured token winner is claimed.

</details>

<details>
<summary><b>Can I use it in Codex?</b></summary>

Yes: register the npx @latest stdio command, forward private environment settings, or use cloudflare-cli with SKILL.md. Discovery works without provider authentication; account operations need the intended token grant.

</details>

<details>
<summary><b>Does it support Claude Desktop?</b></summary>

A versioned .mcpb vendors production dependencies and exposes private token/file/default/policy settings. Manual stdio is also documented. A protocol handshake is not a verified desktop GUI installation.

</details>

<details>
<summary><b>Which operating systems and clients are covered?</b></summary>

The house setup covers Node 22+ on macOS, Windows and Linux and local stdio clients including Codex, Claude, Cursor, VS Code, Windsurf, Zed, Gemini CLI and Cline. Client runtime, policy and launchers still matter; remote-only clients use official hosted MCP.

</details>

<details>
<summary><b>Should I use a Global API Key?</b></summary>

No. This Bearer-only wrapper expects a least-privilege API token. Restrict its Cloudflare permissions/resources; local profile defaults do not narrow upstream grants.

</details>

<details>
<summary><b>Can it use account-owned tokens?</b></summary>

Yes when the intended endpoints support that token type. Set token_kind=account and an account ID for doctor verification. Token kind changes only the diagnostic route; provider compatibility and permissions remain authoritative.

</details>

<details>
<summary><b>Does login implement OAuth or save credentials?</b></summary>

No. login prints private token instructions. The package neither opens consent nor reads/renews official cf OAuth sessions or global CLI configuration.

</details>

<details>
<summary><b>How do I prevent writes?</b></summary>

Set CLOUDFLARE_READ_ONLY=1 and reconnect. Eleven mutations disappear and direct calls still refuse. CLOUDFLARE_ALLOW_DESTRUCTIVE=0 additionally refuses confirmed mutations.

</details>

<details>
<summary><b>Does --agent or --yes approve a write?</b></summary>

No. Every mutation needs --confirm or confirm:true for the actual requested operation. The client/human still determine that it was approved; this flag is not a signed human consent.

</details>

<details>
<summary><b>What does the DNS batch digest bind?</b></summary>

The exact method, zone path, profile label and canonical native JSON body, preserving array order. Any change requires a new local preview. It does not bind remote state or a token grant and does not prevent concurrent edits.

</details>

<details>
<summary><b>Does every DNS batch require a digest?</b></summary>

The review/apply helper does. Direct native batch_dns_records also exists, requires explicit confirmation and follows the native schema/provider limits, but does not require a digest.

</details>

<details>
<summary><b>Are DNS batch updates atomically visible everywhere?</b></summary>

No. Cloudflare executes the request in a database transaction but distributed propagation is not atomic. Inspect affected records after an unknown outcome and do not automatically repeat submissions.

</details>

<details>
<summary><b>Will it collect every page automatically?</b></summary>

No. Ordinary commands fetch one response. query_pages supports three named reads with a one-to-five-page budget and explicit continuation/unknown reporting.

</details>

<details>
<summary><b>Does it retry after rate limits or timeouts?</b></summary>

No request retries automatically. Wait for current upstream reset policy, inspect possible mutation state and deliberately repeat only if appropriate.

</details>

<details>
<summary><b>Can it deploy Workers or manage all Cloudflare products?</b></summary>

No. list_workers is metadata only. Use official cf, Code Mode or Wrangler for broader/deployment tasks. There is no unrestricted raw request tool here.

</details>

<details>
<summary><b>What analytics can it read?</b></summary>

One parsed GraphQL query at a time, with variables and provider-controlled dataset permissions, retention, sampling and limits. It refuses mutations and partial-error responses; it is not an automatic analytics export.

</details>

<details>
<summary><b>Is CLI more token-efficient than MCP?</b></summary>

That requires identical successful tasks and actual client/model usage. No fresh matched Codex token result is published; character estimates, schema counts and borrowed metrics are not evidence.

</details>

<details>
<summary><b>How do I update, remove or revoke access?</b></summary>

Restart npx @latest, explicitly update global npm installs and reinstall new desktop archives separately. Remove client entries and revoke the intended token through Cloudflare. Uninstall does not undo provider changes.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/cloudflare-mcp-cli/issues). Read SECURITY.md for private reports.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Cloudflare MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=cloudflare-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=cloudflare-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=cloudflare-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

Runtime: MCP TypeScript SDK, Ajv, ajv-formats and GraphQL. Development: TypeScript, Vitest, Vite and MCPB. Exact component versions are above and in package-lock.json. Reviewed Cloudflare API schema metadata is BSD-3-Clause and credited in THIRD_PARTY_NOTICES.md; packaging development tools are excluded from runtime bundles.

## License

Preserves AGPL-3.0-or-later. Read [LICENSE](LICENSE), the [full text](licenses/AGPL-3.0.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Cloudflare terms and trademarks remain separate.

---

© 2026 [Navid Media](https://navid.media). Made with ❤️ by [Navid Moazzez](https://navid.me).
