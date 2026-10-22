// Regression checks for the 22 Oct security fixes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

async function loadModule(path, extras = {}) {
  const code = fs.readFileSync(path, 'utf8');
  const context = vm.createContext({
    console,
    URL,
    Response,
    Request,
    Map,
    Date,
    fetch: extras.fetch ?? (async () => new Response('{}', { status: 200 })),
  });
  const mod = new vm.SourceTextModule(code, { context, identifier: path });
  await mod.link(() => { throw new Error('unexpected import in ' + path); });
  await mod.evaluate();
  return mod.namespace;
}

function jsonRequest(url, body, headers = {}) {
  return new Request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

const APPROVAL_KEY = 'approval-key-must-not-appear-in-email';
const TOKEN = 'ab'.repeat(32);

async function testSignupNotify() {
  let sent = null;
  const ns = await loadModule('functions/api/signup-notify.js', {
    fetch: async (_url, opts) => {
      sent = JSON.parse(opts.body);
      return new Response('{}', { status: 200 });
    },
  });
  const env = { RESEND_API_KEY: 're_test', APPROVAL_KEY };

  const ok = await ns.onRequestPost({
    env,
    request: jsonRequest('https://quest.example/api/signup-notify', {
      playerId: 'abc123',
      name: 'Ada <script>',
      key: APPROVAL_KEY,
      token: TOKEN,
    }),
  });
  assert.equal(ok.status, 200);
  assert.ok(sent);
  const blob = JSON.stringify(sent);
  assert.equal(blob.includes(APPROVAL_KEY), false);
  assert.equal(blob.includes('key='), false);
  assert.ok(blob.includes(`token=${TOKEN}`));
  assert.ok(blob.includes('Ada &lt;script&gt;'));

  sent = null;
  const missing = await ns.onRequestPost({
    env,
    request: jsonRequest('https://quest.example/api/signup-notify', {
      playerId: 'abc123',
      name: 'Ada',
      key: APPROVAL_KEY,
    }),
  });
  assert.equal(missing.status, 400);
  assert.equal(sent, null);

  const rejectedKey = await ns.onRequestPost({
    env,
    request: jsonRequest('https://quest.example/api/signup-notify', {
      playerId: 'abc123',
      name: 'Ada',
      key: APPROVAL_KEY,
      token: APPROVAL_KEY,
    }),
  });
  assert.equal(rejectedKey.status, 400);
  assert.equal(sent, null);
}

async function testApproveUsesToken() {
  let args = null;
  const ns = await loadModule('functions/api/approve.js', {
    fetch: async (_url, opts) => {
      args = JSON.parse(opts.body).args;
      return new Response(JSON.stringify({
        status: 'success',
        value: { action: 'approved', name: 'Ada' },
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    },
  });
  const confirm = await ns.onRequestGet({
    request: new Request(`https://quest.example/api/approve?id=abc123&token=${TOKEN}&a=approve&name=Ada`),
  });
  const html = await confirm.text();
  assert.equal(args, null);
  assert.ok(html.includes(`token=${TOKEN}`));
  assert.equal(html.includes('key='), false);
  assert.equal(html.includes(APPROVAL_KEY), false);

  const done = await ns.onRequestGet({
    request: new Request(`https://quest.example/api/approve?id=abc123&token=${TOKEN}&a=approve&confirm=1`),
  });
  assert.equal(done.status, 200);
  assert.deepEqual(args, { playerId: 'abc123', token: TOKEN, action: 'approve' });
  assert.equal('key' in args, false);
}

async function testReportGuard() {
  let sent = 0;
  const ns = await loadModule('functions/api/report.js', {
    fetch: async () => {
      sent += 1;
      return new Response('{}', { status: 200 });
    },
  });
  const env = { RESEND_API_KEY: 're_test' };
  const good = (ip) => jsonRequest('https://quest.example/api/report', {
    description: 'The button did nothing',
  }, {
    Origin: 'https://quest.example',
    'Sec-Fetch-Site': 'same-origin',
    'CF-Connecting-IP': ip,
  });

  const cross = await ns.onRequestPost({
    env,
    request: jsonRequest('https://quest.example/api/report', { description: 'spam' }, {
      Origin: 'https://evil.example',
      'CF-Connecting-IP': '1.2.3.4',
    }),
  });
  assert.equal(cross.status, 403);
  assert.equal(sent, 0);

  const noOrigin = await ns.onRequestPost({
    env,
    request: jsonRequest('https://quest.example/api/report', { description: 'spam' }, {
      'CF-Connecting-IP': '1.2.3.4',
    }),
  });
  assert.equal(noOrigin.status, 403);
  assert.equal(sent, 0);

  for (let i = 0; i < 10; i++) {
    const res = await ns.onRequestPost({ env, request: good('9.9.9.9') });
    assert.equal(res.status, 200);
  }
  assert.equal(sent, 10);
  const limited = await ns.onRequestPost({ env, request: good('9.9.9.9') });
  assert.equal(limited.status, 429);
  assert.equal(sent, 10);

  const otherIp = await ns.onRequestPost({ env, request: good('8.8.8.8') });
  assert.equal(otherIp.status, 200);
}

function testDeployWorkflow() {
  const yml = fs.readFileSync('.github/workflows/deploy-pages.yml', 'utf8');
  const runLine = yml.split('\n').find(line => line.includes('npx wrangler'));
  assert.ok(runLine, 'deploy run line missing');
  assert.equal(runLine.includes('${{'), false);
  assert.ok(runLine.includes('"$COMMIT_MESSAGE"'));
  assert.ok(runLine.includes('"$GITHUB_SHA"'));
  assert.ok(yml.includes('COMMIT_MESSAGE: ${{ github.event.head_commit.message }}'));
}

function testPinHashFirst() {
  const src = fs.readFileSync('src/convex-client.js', 'utf8');
  const body = src.slice(src.indexOf('async logIn'), src.indexOf('logout()'));
  const first = body.indexOf('auth:logIn');
  const firstArgs = body.slice(first, body.indexOf(');', first));
  assert.equal(firstArgs.replaceAll('pinHash', '').includes('pin'), false);
  assert.ok(firstArgs.includes('pinHash'));
  assert.ok(body.includes('r?.legacy'));
  const second = body.indexOf('auth:logIn', first + 1);
  const secondArgs = body.slice(second, body.indexOf(');', second));
  assert.ok(secondArgs.includes('pin'));
}

function loadClient() {
  const listeners = {};
  const store = new Map();
  const localStorage = {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(String(k), String(v)); },
    removeItem(k) { store.delete(k); },
  };
  const window = {
    addEventListener(type, fn) { (listeners[type] ||= []).push(fn); },
  };
  const document = {
    createElement() { return {}; },
    head: { appendChild() {} },
  };
  const context = vm.createContext({
    window, document, localStorage, console, URL, TextEncoder, crypto: globalThis.crypto,
  });
  vm.runInContext(fs.readFileSync('src/convex-client.js', 'utf8'), context, { filename: 'src/convex-client.js' });
  return { client: context.window.SATClient, localStorage, listeners };
}

function testSessionNotClobbered() {
  const { client, localStorage, listeners } = loadClient();
  localStorage.setItem('sq_session', JSON.stringify({
    playerId: 'player-a', name: 'A', xp: 40, sessionSecret: 'sek-a', sessionRev: 1,
  }));

  const stale = client.writeSession({ playerId: 'player-b', name: 'B', xp: 1, sessionSecret: 'sek-b' });
  assert.equal(stale, null);
  assert.equal(JSON.parse(localStorage.getItem('sq_session')).playerId, 'player-a');

  localStorage.removeItem('sq_session');
  const resurrect = client.writeSession({ playerId: 'player-a', xp: 99, sessionSecret: 'sek-a' });
  assert.equal(resurrect, null);
  assert.equal(localStorage.getItem('sq_session'), null);

  client.writeSession({
    playerId: 'player-a', name: 'A', xp: 10, sessionSecret: 'sek-a',
  }, { authoritative: true });
  const bumped = client.writeSession({ playerId: 'player-a', name: 'stale-name', xp: 25, sessionSecret: 'replaced' });
  assert.equal(bumped.xp, 25);
  assert.equal(bumped.name, 'A');
  assert.equal(bumped.sessionSecret, 'sek-a');

  const seen = [];
  client.onSessionChange(session => seen.push(session));
  assert.ok(listeners.storage?.length);
  listeners.storage[0]({ key: 'sq_session', newValue: null });
  assert.equal(seen.length, 1);
  assert.equal(seen[0], null);
  listeners.storage[0]({
    key: 'other',
    newValue: JSON.stringify({ playerId: 'nope' }),
  });
  assert.equal(seen.length, 1);
  listeners.storage[0]({
    key: 'sq_session',
    newValue: JSON.stringify({ playerId: 'player-b', name: 'B', xp: 3 }),
  });
  assert.equal(seen[1].playerId, 'player-b');
}

function testServerRequiresSessionAndToken() {
  const games = fs.readFileSync('convex/games.ts', 'utf8');
  for (const name of ['recordAnswer', 'migrateProgress', 'migrateAnswers']) {
    const start = games.indexOf(`export const ${name}`);
    assert.ok(start >= 0, name);
    const slice = games.slice(start, start + 500);
    assert.ok(slice.includes('sessionSecret'), name);
  }
  assert.ok(games.includes('sessionSecret: v.string()'));
  const record = games.slice(games.indexOf('export const recordAnswer'), games.indexOf('export const getProgress'));
  assert.ok(record.includes('requireSession'));
  assert.ok(record.includes('args.sessionSecret'));

  const auth = fs.readFileSync('convex/auth.ts', 'utf8');
  assert.ok(auth.includes('return { legacy: true as const }'));
  assert.ok(auth.includes('sessionSecret'));
  assert.ok(auth.includes('issueApprovalToken'));
  const moderate = auth.slice(auth.indexOf('export const moderateSignup'), auth.indexOf('export const adminRemovePlayer'));
  assert.equal(moderate.includes('process.env.APPROVAL_KEY'), false);
  assert.equal(moderate.includes('args.key'), false);
  assert.ok(moderate.includes('tokenHash'));
}

await testSignupNotify();
await testApproveUsesToken();
await testReportGuard();
testDeployWorkflow();
testPinHashFirst();
testSessionNotClobbered();
testServerRequiresSessionAndToken();
console.log('security audit regression checks passed');
