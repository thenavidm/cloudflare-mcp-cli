/** Reviewed local JSON only: no network, imports, examples or source-code execution. */
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const file=name=>new URL(name,root);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const existing=JSON.parse(fs.readFileSync(file('src/tools/operations.json'),'utf8'));
const provenance=JSON.parse(fs.readFileSync(file('src/tools/api-source.json'),'utf8'));
const args=process.argv.slice(2),refresh=args.includes('--refresh');
const source=args.find(x=>!x.startsWith('--'));
const shaArg=args.find(x=>x.startsWith('--sha256='))?.split('=')[1];
const commit=args.find(x=>x.startsWith('--commit='))?.split('=')[1];
if(args.some(x=>x.startsWith('--')&&!['--refresh','--check'].includes(x)&&!x.startsWith('--sha256=')&&!x.startsWith('--commit=')))throw Error('Unknown option. Use --check [local.json] or --refresh local.json --sha256=<reviewed hash> --commit=<reviewed source SHA>.');
if(!source){
 if(refresh)throw Error('Refresh needs an explicitly reviewed local JSON file, checksum and source commit.');
 if(hash(fs.readFileSync(file('src/tools/operations.json')))!==provenance.distributedMetadataSha256)throw Error('Distributed metadata checksum mismatch.');
 console.log(JSON.stringify({offline:true,operations:existing.length,sourceSha256:provenance.sha256,metadataSha256:provenance.distributedMetadataSha256}));process.exit(0);
}
const bytes=fs.readFileSync(source);if(bytes.length>40*1024*1024)throw Error('Source exceeds 40 MiB.');
if(hash(bytes)!==(shaArg??provenance.sha256))throw Error('Reviewed source checksum mismatch.');
if(refresh&&(!shaArg||!commit||!/^\w{40}$/.test(commit)))throw Error('Refresh requires explicit checksum and 40-character reviewed source commit.');
const api=JSON.parse(bytes);
function resolve(value){let v=value;const seen=new Set();while(typeof v?.$ref==='string'){if(!v.$ref.startsWith('#/'))throw Error('External reference refused.');if(seen.has(v.$ref))throw Error('Cyclic direct reference.');seen.add(v.$ref);v=v.$ref.slice(2).split('/').reduce((v,k)=>v?.[k.replace(/~1/g,'/').replace(/~0/g,'~')],api);if(!v)throw Error('Missing reference.');}return v;}
function clean(v){if(Array.isArray(v))return v.map(clean);if(!v||typeof v!=='object')return v;let o=Object.fromEntries(Object.entries(v).filter(([k])=>!['example','examples','discriminator','xml','readOnly','writeOnly','externalDocs'].includes(k)&&!k.startsWith('x-')).map(([k,x])=>[k,clean(x)]));if(typeof o.$ref==='string')o.$ref=o.$ref.replace('#/components/schemas/','#/$defs/');for(const[k,b]of[['exclusiveMinimum','minimum'],['exclusiveMaximum','maximum']])if(typeof o[k]==='boolean'){const value=o[k];delete o[k];if(value&&b in o){o[k]=o[b];delete o[b];}}if(o.nullable===true){delete o.nullable;o={anyOf:[o,{type:'null'}]};}else delete o.nullable;return o;}
const defs=clean(api.components.schemas);
function closure(value){const names=new Set();function walk(v){if(Array.isArray(v)){v.forEach(walk);return;}if(!v||typeof v!=='object')return;if(typeof v.$ref==='string'){const k=v.$ref.split('/').at(-1);if(!names.has(k)){if(!defs[k])throw Error('Missing component '+k);names.add(k);walk(defs[k]);}}for(const[k,x]of Object.entries(v))if(k!=='$ref')walk(x);}walk(value);return Object.fromEntries([...names].sort().map(k=>[k,defs[k]]));}
const next=existing.map(old=>{
 const item=api.paths[old.path],up=item?.[old.method.toLowerCase()];if(!up||up.deprecated)throw Error('Selected route missing/deprecated: '+old.name);
 const params=[...(item.parameters??[]),...(up.parameters??[])].map(p=>{p=resolve(p);if(!['path','query'].includes(p.in))throw Error('Unsupported parameter location.');const schema=clean(p.schema??{});schema.description=p.description??schema.description??'';if(p.in==='path')schema.minLength=1;return{name:p.name,key:p.name.replace(/[.-]/g,'_'),in:p.in,required:!!p.required,schema,style:p.style??null,explode:p.explode??null};});
 const rb=resolve(up.requestBody??{}),body=clean(resolve(rb.content?.['application/json']?.schema??{type:'object',properties:{},additionalProperties:false}));body.$defs=closure({body,params:params.map(p=>p.schema)});if(Object.keys(rb).length)body.unevaluatedProperties=false;
 return{...old,title:up.summary??up.operationId,description:(up.description??up.summary??'').trim(),operationId:up.operationId,params,bodySchema:body,bodyRequired:!!rb.required,paginated:['page','per_page'].every(k=>params.some(p=>p.name===k))};
});
function stable(v){if(Array.isArray(v))return v.map(stable);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])]));return v;}
if(!refresh){if(JSON.stringify(stable(existing))!==JSON.stringify(stable(next)))throw Error('Selected schemas differ; review before refreshing.');console.log(JSON.stringify({checked:true,operations:next.length,sourceSha256:hash(bytes),examplesDistributed:false}));}
else{const out=JSON.stringify(next,null,2)+'\n';fs.writeFileSync(file('src/tools/operations.json'),out);fs.writeFileSync(file('src/tools/api-source.json'),JSON.stringify({...provenance,checked:new Date().toISOString().slice(0,10),sha:commit,url:`https://raw.githubusercontent.com/cloudflare/api-schemas/${commit}/openapi.json`,sha256:hash(bytes),bytes:bytes.length,info:api.info,distributedMetadataSha256:hash(out)},null,2)+'\n');console.log('Metadata refreshed. Review diff, secret-scan, rebuild, test, regenerate docs and bump version before release.');}
