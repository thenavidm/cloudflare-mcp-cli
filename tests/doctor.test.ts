/**
 * doctor --network verifies the token where Cloudflare issued it, and never
 * reports an inactive token as verified or prints the token's own details.
 */
import { it, expect, vi } from "vitest";
import { cli } from "@thenavidm/slipway/testing";
import { CloudflareClient } from "../src/api/client.js";
import { createApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

function fixture(status: string, kind = "user") {
  const fetcher = vi.fn(async (_url: URL, _init?: RequestInit) => new Response(JSON.stringify({ success: true, result: { id: "private-token-id", status } })));
  const env = { CLOUDFLARE_API_TOKEN: "doctor-fixture", CLOUDFLARE_MIN_REQUEST_INTERVAL_MS: "0", CLOUDFLARE_TOKEN_KIND: kind, CLOUDFLARE_ACCOUNT_ID: "a".repeat(32) };
  const app = createApp({
    context: (settings) => {
      const config = loadConfig(settings);
      return { config, client: new CloudflareClient(config, fetcher as unknown as typeof fetch) };
    },
  });
  return { fetcher, run: () => cli(app, ["doctor", "--network", "--json"], { env }) };
}

it("accepts only active user tokens without disclosing token details", async () => {
  const f = fixture("active");
  const run = await f.run();
  expect(run.code).toBe(0);
  expect((f.fetcher.mock.calls[0]?.[0] as URL).pathname).toBe("/client/v4/user/tokens/verify");
  expect(run.stdout).not.toContain("private-token-id");
});

it("routes account-owned verification to its account and checks active status", async () => {
  const f = fixture("active", "account");
  expect((await f.run()).code).toBe(0);
  expect((f.fetcher.mock.calls[0]?.[0] as URL).pathname).toBe("/client/v4/accounts/" + "a".repeat(32) + "/tokens/verify");
});

it("does not report verification success for an inactive token in a successful HTTP envelope", async () => {
  const f = fixture("expired");
  const run = await f.run();
  expect(run.code).not.toBe(0);
  expect(JSON.parse(run.stdout).checks.find((c: { name: string }) => c.name === "Token").ok).toBe(false);
  expect(f.fetcher).toHaveBeenCalledTimes(1);
});
