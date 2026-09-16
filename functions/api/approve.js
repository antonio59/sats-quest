// Cloudflare Pages Function — GET /api/approve
// Owner-facing approval endpoint linked from signup notification emails.
// Step 1 (?id&key&a=approve|deny) renders a confirm page so email link
// scanners can't auto-approve. Step 2 (&confirm=1) calls the Convex
// auth:moderateSignup mutation, which re-verifies APPROVAL_KEY server-side.

const CONVEX_MUTATION_URL = 'https://combative-viper-883.eu-west-1.convex.cloud/api/mutation';

function escHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function page(title, bodyHtml) {
  return new Response(`<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — SATs Quest</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#eaf2ff;font-family:system-ui,-apple-system,sans-serif}
  .card{background:#fff;border:3px solid #1c2b4a;border-radius:20px;box-shadow:8px 8px 0 #1c2b4a;padding:40px;max-width:420px;text-align:center}
  h1{font-size:1.5rem;margin:0 0 12px;color:#1c2b4a}
  p{color:#3d4a63;line-height:1.5}
  .btn{display:inline-block;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:1.05rem;text-decoration:none;border:3px solid #1c2b4a;box-shadow:4px 4px 0 #1c2b4a;margin-top:8px}
  .btn-approve{background:#0fb5a3;color:#fff}
  .btn-deny{background:#ff5d73;color:#fff}
</style>
</head>
<body><div class="card">${bodyHtml}</div></body>
</html>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const key = url.searchParams.get('key') || '';
  const action = url.searchParams.get('a') || '';
  const confirm = url.searchParams.get('confirm') === '1';
  const name = escHtml(String(url.searchParams.get('name') || 'this player').slice(0, 30));

  if (!env.APPROVAL_KEY || key !== env.APPROVAL_KEY) {
    return page('Invalid link', '<h1>🔒 Invalid link</h1><p>This approval link isn\'t valid. Ask for a fresh signup notification.</p>');
  }
  if (!/^[a-z0-9]+$/i.test(id) || (action !== 'approve' && action !== 'deny')) {
    return page('Invalid link', '<h1>🔒 Invalid link</h1><p>This approval link is malformed.</p>');
  }

  if (!confirm) {
    const verb = action === 'approve' ? 'approve' : 'deny and delete';
    const colour = action === 'approve' ? 'btn-approve' : 'btn-deny';
    const qs = `id=${encodeURIComponent(id)}&key=${encodeURIComponent(key)}&a=${action}&confirm=1`;
    return page('Confirm', `
      <h1>🚀 SATs Quest</h1>
      <p>Really <strong>${verb}</strong> the account for <strong>${name}</strong>?</p>
      <a class="btn ${colour}" href="/api/approve?${qs}">Yes, ${verb}</a>
    `);
  }

  let result;
  try {
    const res = await fetch(CONVEX_MUTATION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: 'auth:moderateSignup',
        args: { playerId: id, key, action },
      }),
    });
    result = await res.json();
  } catch (e) {
    return page('Error', '<h1>⚠️ Something went wrong</h1><p>Couldn\'t reach the game database. Try again in a moment.</p>');
  }

  const value = result?.value || {};
  if (result?.status !== 'success' || value.error) {
    const msg = escHtml(value.error || result?.errorMessage || 'Unknown error');
    return page('Error', `<h1>⚠️ Couldn't ${action}</h1><p>${msg}</p>`);
  }

  const playerName = escHtml(value.name || name);
  if (value.action === 'approved' || value.action === 'already-approved') {
    return page('Approved', `<h1>✅ Approved!</h1><p><strong>${playerName}</strong> can now log in and play. 🎉</p>`);
  }
  return page('Denied', `<h1>🗑️ Removed</h1><p>The account for <strong>${playerName}</strong> has been deleted.</p>`);
}

export async function onRequest(context) {
  if (context.request.method === 'GET') return onRequestGet(context);
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', 'Allow': 'GET' },
  });
}
