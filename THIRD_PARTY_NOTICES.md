# Third-party notices

The owned wrapper preserves AGPL-3.0-or-later from the existing private legacy package. Shared CLI/MCP/WriteGuard components follow the Navid Media framework.

Cloudflare api-schemas at commit 37e7a4ae9c5123a2c58929a100c42cb4584edc57 provides selected operation metadata and JSON request schemas under BSD-3-Clause. Original license is included in licenses/Cloudflare-BSD-3-Clause.txt. Examples, vendor code samples and unused components are excluded; original/distributed checksums and source provenance are recorded in src/tools/api-source.json. The API description version is 4.0.0, not a promise that every Cloudflare product is exposed.

Official cf and MCP source is inspected only for comparisons; no official CLI execution code is distributed in this wrapper. The community implementation is compared, not copied. MCP SDK, Ajv, ajv-formats and GraphQL notices remain in dependency packages. TypeScript/Vitest/Vite/MCPB are development tools and do not ship in the desktop runtime. Cloudflare service terms and trademarks are separate.
