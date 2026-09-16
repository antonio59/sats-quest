// Cloudflare Pages Function — POST /api/signup-notify
// Called by the Convex emails.notifySignup action when a new player registers.
// Sends the site owner an approval email via Resend. Requires APPROVAL_KEY
// (Pages secret, shared with Convex) so it can't be used to spam the owner.

function escHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;

  if (!env.RESEND_API_KEY || !env.APPROVAL_KEY) {
    console.error('signup-notify secrets not configured');
    return json({ error: 'Service unavailable' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { playerId, name, key } = body || {};
  if (key !== env.APPROVAL_KEY) return json({ error: 'Unauthorised' }, 401);
  if (typeof playerId !== 'string' || !/^[a-z0-9]+$/i.test(playerId)) {
    return json({ error: 'Invalid playerId' }, 400);
  }
  const displayName = String(name || 'A new player').slice(0, 30);

  const base = new URL(request.url).origin;
  const qs = `id=${encodeURIComponent(playerId)}&key=${encodeURIComponent(env.APPROVAL_KEY)}&name=${encodeURIComponent(displayName)}`;
  const approveUrl = `${base}/api/approve?${qs}&a=approve`;
  const denyUrl = `${base}/api/approve?${qs}&a=deny`;

  const html = `
    <h2>🚀 New SATs Quest signup</h2>
    <p><strong>${escHtml(displayName)}</strong> just created an account and is waiting for your approval.</p>
    <p style="margin:24px 0">
      <a href="${approveUrl}" style="background:#0fb5a3;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold;margin-right:12px">✅ Approve</a>
      <a href="${denyUrl}" style="background:#ff5d73;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold">❌ Deny &amp; delete</a>
    </p>
    <p style="color:#666;font-size:13px">Approving lets them log in and play. Denying removes the account completely.</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SAT Quest <onboarding@resend.dev>',
      to: 'problem.antoniosmith.excavator193@passmail.com',
      subject: `[SAT Quest] Approve new player: ${displayName}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('Resend error:', res.status, detail);
    return json({ error: 'Failed to send' }, 502);
  }

  return json({ success: true });
}

export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
  });
}
