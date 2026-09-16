// Cloudflare Pages Function — POST /api/report
// Sends bug reports via the Resend API. Set RESEND_API_KEY as a Pages secret.

const MAX_DESCRIPTION = 4000;

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

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return json({ error: 'Report service unavailable' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { description, player, screen, userAgent, timestamp } = body || {};
  if (typeof description !== 'string' || !description.trim()) {
    return json({ error: 'Description required' }, 400);
  }

  const desc = escHtml(description.trim().slice(0, MAX_DESCRIPTION)).replace(/\n/g, '<br>');
  const playerName = escHtml(player?.name || 'Unknown');
  const playerLevel = Number.isFinite(+player?.level) ? Math.min(+player.level, 99) : 1;
  const playerXp = Number.isFinite(+player?.xp) ? Math.min(+player.xp, 9999999) : 0;
  const screenName = escHtml(String(screen || 'unknown').slice(0, 100));
  const ua = escHtml(String(userAgent || 'unknown').slice(0, 300));
  const time = escHtml(String(timestamp || new Date().toISOString()).slice(0, 40));

  const html = `
    <h2>🐛 Bug Report from SAT Quest</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Player</td><td style="padding:8px;border:1px solid #ddd">${playerName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Level</td><td style="padding:8px;border:1px solid #ddd">${playerLevel}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">XP</td><td style="padding:8px;border:1px solid #ddd">${playerXp}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Screen</td><td style="padding:8px;border:1px solid #ddd">${screenName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Browser</td><td style="padding:8px;border:1px solid #ddd">${ua}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Time</td><td style="padding:8px;border:1px solid #ddd">${time}</td></tr>
    </table>
    <h3>Description:</h3>
    <p style="background:#f5f5f5;padding:16px;border-radius:8px">${desc}</p>
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
      subject: `[SAT Quest] Bug report from ${String(player?.name || 'unknown').slice(0, 50)}`,
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
