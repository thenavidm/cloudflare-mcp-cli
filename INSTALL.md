# Install Cloudflare MCP Server & CLI

One npm package includes both binaries and all **29 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Cloudflare API access; Cloudflare product plans, token permissions and API quota apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | cloudflare-cli | Scripts and agents with a shell |
| Local MCP | cloudflare-mcp | AI clients supporting stdio |
| Desktop archive | cloudflare-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Cloudflare-hosted alternative | https://mcp.cloudflare.com/mcp | Official remote provider-hosted access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and quota with Cloudflare instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/cloudflare-mcp-cli@latest
cloudflare-cli --version
cloudflare-cli
cloudflare-cli list-zones --help
cloudflare-cli schema create-dns-record
cloudflare-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/cloudflare-mcp-cli@latest cloudflare-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/cloudflare-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

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


```bash
export CLOUDFLARE_TOKEN_FILE='/absolute/private/cloudflare.txt'
cloudflare-cli doctor --network
```

```powershell
$env:CLOUDFLARE_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\cloudflare.txt'
cloudflare-cli doctor --network
```

### Agent-guided installation

> Help me install Cloudflare MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not change or mutate accounts during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add cloudflare -- npx -y @thenavidm/cloudflare-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.cloudflare]
command = "npx"
args = ["-y", "@thenavidm/cloudflare-mcp-cli@latest"]
env_vars = ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_TOKEN_FILE", "CLOUDFLARE_ACCOUNTS", "CLOUDFLARE_DEFAULT_ACCOUNT", "CLOUDFLARE_ZONE_ID", "CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_TOKEN_KIND", "CLOUDFLARE_READ_ONLY", "CLOUDFLARE_ALLOW_DESTRUCTIVE"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user cloudflare -- npx -y @thenavidm/cloudflare-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `cloudflare-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/cloudflare-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API token in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. Requests use Authorization: Bearer at the fixed Cloudflare endpoint. Configure optional account/zone defaults and user/account token kind privately; defaults do not narrow provider permissions.
4. Enable read-only if you want only the 18 read operations. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@thenavidm/cloudflare-mcp-cli@latest"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "YOUR_PRIVATE_API_TOKEN",
        "CLOUDFLARE_TOKEN_FILE": "",
        "CLOUDFLARE_ZONE_ID": "YOUR_ZONE_ID",
        "CLOUDFLARE_ACCOUNT_ID": "YOUR_ACCOUNT_ID",
        "CLOUDFLARE_TOKEN_KIND": "user"}
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/cloudflare-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "cloudflare": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/cloudflare-mcp-cli@latest"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${env:CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_TOKEN_FILE": "${env:CLOUDFLARE_TOKEN_FILE}",
        "CLOUDFLARE_ZONE_ID": "${env:CLOUDFLARE_ZONE_ID}"}
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "cloudflare-api-token", "description": "Cloudflare API token (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "cloudflare-token-file", "description": "Optional private token-file path (leave empty for API token)"},
    {"type": "promptString", "id": "cloudflare-zone-id", "description": "Optional Cloudflare zone input default"}],
  "servers": {
    "cloudflare": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/cloudflare-mcp-cli@latest"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${input:cloudflare-api-token}",
        "CLOUDFLARE_TOKEN_FILE": "${input:cloudflare-token-file}",
        "CLOUDFLARE_ZONE_ID": "${input:cloudflare-zone-id}"}
    }
  }
}
~~~

Start Cloudflare through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Cloudflare in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@thenavidm/cloudflare-mcp-cli@latest"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "YOUR_PRIVATE_API_TOKEN",
        "CLOUDFLARE_TOKEN_FILE": "",
        "CLOUDFLARE_ZONE_ID": "YOUR_ZONE_ID",
        "CLOUDFLARE_ACCOUNT_ID": "YOUR_ACCOUNT_ID",
        "CLOUDFLARE_TOKEN_KIND": "user"}
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/cloudflare-mcp-cli.git
cd cloudflare-mcp-cli
docker build -t cloudflare-mcp-cli .
docker run --rm -i -e CLOUDFLARE_API_TOKEN cloudflare-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/cloudflare-mcp-cli@latest`, stdio transport, and private local CLOUDFLARE_API_TOKEN or CLOUDFLARE_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Cloudflare's official server rather than this local stdio command.

## Verify

```bash
cloudflare-cli doctor
cloudflare-cli doctor --network
cloudflare-cli tools
cloudflare-cli schema list-dns-records
cloudflare-cli list-accounts --agent
```

The full server discovers 29 tools; read-only discovers 18. Help/schemas/list_accounts are local. The network doctor verifies the configured token kind and accepts only active status without returning token details. A successful account read does not prove every DNS/rule or account operation.

To try read-only, privately set CLOUDFLARE_READ_ONLY=1, restart/reconnect and inspect discovery. All 11 mutations must disappear and direct mutation calls must refuse. Remove/disable the setting and reconnect only when you need approved operations. `CLOUDFLARE_ALLOW_DESTRUCTIVE=0` separately blocks all 11 mutations even when confirmed.

## Multiple accounts

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

## Updates and removal

```bash
npm install -g @thenavidm/cloudflare-mcp-cli@latest
cloudflare-cli --version
claude mcp remove --scope user cloudflare
codex mcp remove cloudflare
npm uninstall -g @thenavidm/cloudflare-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Cloudflare credentials, remove private token files or undo DNS, Rulesets or cache changes. Revoke the API token in the Cloudflare user/account API Tokens area when appropriate. Inspect and remove your private settings and files separately.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/cloudflare-mcp-cli/releases) before a major update. Review changes before pinning an earlier version; never try to overwrite an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private CLOUDFLARE_API_TOKEN or regular CLOUDFLARE_TOKEN_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| 401/403 | Bearer grant, selected zone/account, provider role and eligible API access |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Native page/result_info and bounded query_pages; no automatic all-pages |
| Guard refusal | User-requested --confirm, read-only and operation settings |
| Mutation timeout | Inspect account before repeating; no automatic mutation retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/cloudflare-mcp-cli.git
cd cloudflare-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/cloudflare-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
