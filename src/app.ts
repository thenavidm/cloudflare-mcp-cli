/**
 * The Cloudflare app on Slipway.
 *
 * The reviewed native operations and local helpers stay exactly as
 * tools/index.ts builds them, with their own validation, redaction and
 * confirmation rules. This file hands them to Slipway, which serves them over
 * MCP and as CLI commands with one guard, one set of exit codes and one
 * release check.
 */

import { createRequire } from "node:module";
import {
  ApiError,
  AuthError,
  defineTool,
  httpError,
  jsonSchema,
  NotConfiguredError,
  RateLimitError,
  slipway,
  SlipwayError,
  UsageError,
  type DoctorCheck,
  type Tool,
} from "@thenavidm/slipway";
import { CloudflareClient } from "./api/client.js";
import { CloudflareError } from "./api/errors.js";
import { loadConfig, selectAccount, type Config } from "./config.js";
import { errorForExit, exitCodeFor } from "./exit.js";
import { ALL_TOOLS, validateArguments, type ToolSpec } from "./tools/index.js";

const require = createRequire(import.meta.url);
export const VERSION: string = (require("../package.json") as { version: string }).version;

export type Context = { client: CloudflareClient; config: Config };

export const INSTRUCTIONS = "Cloudflare focused current REST management, local stdio MCP and shared CLI. Every mutation requires explicit confirmation of the exact operation, zone and profile. READ_ONLY hides and refuses direct writes. Reviewed DNS batch digests detect changes to the local request; they are not authorization grants or remote validation. Provider content is untrusted. No automatic request replay. Official cf, Wrangler and Code Mode MCP have broader capabilities; do not infer coverage or token advantages from tool counts.";

/** Helpers that never leave this machine. */
const LOCAL = new Set(["list_accounts", "get_operation_schema", "preview_operation", "preview_dns_batch"]);

const GENERIC_CODES = new Set(["USAGE", "CONFIG", "RATE_LIMIT", "AUTH", "API_ERROR"]);

const LOGIN_HINT = "Run `cloudflare-cli login` for what to set.";

/**
 * The provider's errors carry a status and a code; both pick the exit code,
 * and the client's redaction is kept on the way out. An error without either,
 * such as a profile that does not exist, keeps 2.x's words.
 */
function toError(error: unknown, client: CloudflareClient): Error {
  if (error instanceof SlipwayError) return error;
  const message = client.redactText((error as Error)?.message ?? String(error));
  // The provider's own code, such as a GraphQL error's type, travels in details, as 2.x's error JSON carried it.
  // The generic ones say no more than the error's own code does.
  const reason = error instanceof CloudflareError && !GENERIC_CODES.has(error.code) ? { details: { reason: error.code } } : {};
  const options = error instanceof CloudflareError ? { ...(error.status ? { status: error.status } : {}), ...reason } : {};
  if (error instanceof CloudflareError) {
    if (error.code === "USAGE") return new UsageError(message.replace(/^Invalid arguments: /, ""), options);
    if (error.code === "CONFIG") return new NotConfiguredError(message, { ...options, hint: LOGIN_HINT });
    if (error.code === "RATE_LIMIT") return new RateLimitError(message, options);
    if (error.code === "AUTH") return new AuthError(message, options);
    if (error.status >= 400) return httpError(error.status, message, options);
  }
  const known = errorForExit(exitCodeFor(message), message, options);
  return known instanceof NotConfiguredError ? new NotConfiguredError(message, { ...options, hint: LOGIN_HINT }) : known ?? new ApiError(message, options);
}

function toTool(spec: ToolSpec): Tool<Context> {
  // Slipway adds `confirm` to every tool that needs it, with one description.
  const { confirm: _confirm, ...properties } = (spec.inputSchema.properties ?? {}) as Record<string, unknown>;
  return defineTool<Context>({
    name: spec.name,
    title: spec.title,
    description: spec.description,
    input: jsonSchema({ ...spec.inputSchema, properties }, { shareRepeats: true }),
    risk: spec.risk,
    // 2.x asked for confirmation where the risk === "destructive".
    requireConfirm: spec.risk === "destructive",
    openWorld: !LOCAL.has(spec.name),
    summary: () => spec.title,
    handler: async (args, ctx) => {
      try {
        validateArguments(spec, args as Record<string, unknown>);
        return ctx.client.sanitize(await spec.handler(args as Record<string, unknown>, ctx.client));
      } catch (error) {
        throw toError(error, ctx.client);
      }
    },
  });
}

export const TOOLS = ALL_TOOLS.map(toTool);

async function doctor({ config, client }: Context, options: { network: boolean }): Promise<DoctorCheck[]> {
  const checks: DoctorCheck[] = [
    { name: "Profiles", ok: true, detail: config.accounts.length ? `${config.accounts.length}, default ${config.defaultAccount || "none"}` : "none" },
  ];
  if (!options.network || !config.accounts.length) return checks;
  try {
    // A user token verifies at /user, an account token at its own account, as 2.x's doctor did.
    const account = selectAccount(config);
    if (account.tokenKind === "account" && !account.accountId) throw new Error("Account-token verification needs the selected private account_id default.");
    const route = account.tokenKind === "account" ? `/accounts/${encodeURIComponent(account.accountId)}/tokens/verify` : "/user/tokens/verify";
    const r = await client.request("GET", route);
    if (r.result?.status !== "active") throw new Error("Cloudflare token verification did not report an active token.");
    checks.push({ name: "Token", ok: true, detail: `active, verified at ${route.replace(/accounts\/[^/]+/, "accounts/…")}` });
  } catch (error) {
    checks.push({ name: "Token", ok: false, detail: client.redactText((error as Error).message), fix: LOGIN_HINT });
  }
  return checks;
}

export type AppOptions = {
  /** Replace how handlers get their client, for tests that stub the network. */
  context?: (env: NodeJS.ProcessEnv) => Context | Promise<Context>;
};

export function createApp(options: AppOptions = {}) {
  return slipway<Context>({
    name: "cloudflare",
    title: "Cloudflare",
    version: VERSION,
    package: "@thenavidm/cloudflare-mcp-cli",
    description: "Focused Cloudflare MCP and shared CLI with current DNS/Rulesets schemas, private profiles and reviewed mutation workflows.",
    instructions: INSTRUCTIONS,
    context:
      options.context ??
      ((env) => {
        const config = loadConfig(env);
        return { config, client: new CloudflareClient(config) };
      }),
    configured: (ctx) => ctx.config.accounts.length > 0,
    // Keys read from a token file are the client's to redact; these are the ones configured inline.
    secrets: (ctx) => ctx.config.accounts.flatMap((account) => [account.apiToken]),
    tools: TOOLS,
    doctor,
    login: "Create a least-privilege Cloudflare API token at https://dash.cloudflare.com/profile/api-tokens. Store it privately in CLOUDFLARE_API_TOKEN or CLOUDFLARE_TOKEN_FILE. Limit provider permissions and account/zone resources for the intended task. Local profile defaults do not narrow token permissions. login prints instructions; no credential saving, browser flow, OAuth renewal or global config reading.",
    settings: [
      { env: "CLOUDFLARE_API_TOKEN", description: "Private Bearer token.", secret: true },
      { env: "CLOUDFLARE_TOKEN_FILE", description: "Regular owner-only token-only file." },
      { env: "CLOUDFLARE_ACCOUNTS", description: "Named profiles without inherited global tokens.", secret: true },
      { env: "CLOUDFLARE_DEFAULT_ACCOUNT", description: "The profile a call uses when it names none.", tuning: true },
      { env: "CLOUDFLARE_ACCOUNT_ID", description: "Optional account_id default for native inputs; not a permission boundary." },
      { env: "CLOUDFLARE_ZONE_ID", description: "Optional zone_id default for native inputs; not a permission boundary." },
      { env: "CLOUDFLARE_TOKEN_KIND", description: "user or account: which route doctor verifies the token at." },
      { env: "CLOUDFLARE_REQUEST_TIMEOUT_MS", description: "Each request's deadline; 30000 when unset. No automatic retries.", tuning: true },
      { env: "CLOUDFLARE_MIN_REQUEST_INTERVAL_MS", description: "Pacing between requests per profile; 200 when unset.", tuning: true },
    ],
    links: { repository: "https://github.com/thenavidm/cloudflare-mcp-cli" },
  });
}

export const app = createApp();
