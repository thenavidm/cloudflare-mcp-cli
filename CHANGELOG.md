# Changelog

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
