#!/usr/bin/env node
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';import {buildServer,VERSION} from './server.js';import {runCli,exitCodeFor} from './cli.js';import {runDoctor} from './doctor.js';import {basename} from 'node:path';
const HELP=`Cloudflare focused MCP and CLI ${VERSION}
cloudflare-mcp                         Local stdio MCP
cloudflare-cli <command> --help        Arguments from shared schemas
cloudflare-cli schema <command>        Complete current JSON input schema
cloudflare-cli doctor [--network]      Local checks / provider token verification
cloudflare-cli login                   Private API-token instructions only
CLOUDFLARE_API_TOKEN                   Private Bearer token
CLOUDFLARE_TOKEN_FILE                  Regular owner-only token-only file
CLOUDFLARE_ACCOUNTS / _DEFAULT_ACCOUNT  Named profiles without inherited global tokens
CLOUDFLARE_ACCOUNT_ID / _ZONE_ID        Optional native input defaults; not permission boundaries
CLOUDFLARE_TOKEN_KIND=user              user or account; token verification route only
CLOUDFLARE_READ_ONLY=1                  Hide and refuse all mutations
CLOUDFLARE_ALLOW_DESTRUCTIVE=0          Refuse mutations even when confirmed
CLOUDFLARE_REQUEST_TIMEOUT_MS=30000     No automatic retries
CLOUDFLARE_MIN_REQUEST_INTERVAL_MS=200  Per-profile process pacing
`;
async function main():Promise<void>{const args=process.argv.slice(2);const command=args[0];if(['--version','-v'].includes(command??'')){console.log(VERSION);return;}if(['--help','-h','help'].includes(command??'')){process.stdout.write(HELP);return;}if(command==='login'){console.log('Create a least-privilege Cloudflare API token at https://dash.cloudflare.com/profile/api-tokens. Store it privately in CLOUDFLARE_API_TOKEN or CLOUDFLARE_TOKEN_FILE. Limit provider permissions and account/zone resources for the intended task. Local profile defaults do not narrow token permissions. login prints instructions; no credential saving, browser flow, OAuth renewal or global config reading.');return;}if(command==='doctor'){if(args.slice(1).some(a=>a!=='--network')){process.exitCode=2;console.error(JSON.stringify({error:'doctor accepts only --network'}));return;}process.exitCode=await runDoctor(args.includes('--network'));return;}if(args.length||basename(process.argv[1]??'').startsWith('cloudflare-cli')){process.exitCode=await runCli(args);return;}const server=buildServer();await server.connect(new StdioServerTransport());for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>void server.close().then(()=>process.exit(0)));}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
