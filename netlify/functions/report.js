import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { description, player, screen, userAgent, timestamp } = await req.json();

    if (!description || !description.trim()) {
      return new Response(JSON.stringify({ error: 'Description required' }), { status: 400 });
    }

    const html = `
      <h2>🐛 Bug Report from SAT Quest</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Player</td><td style="padding:8px;border:1px solid #ddd">${player?.name || 'Unknown'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Level</td><td style="padding:8px;border:1px solid #ddd">${player?.level || 1}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">XP</td><td style="padding:8px;border:1px solid #ddd">${player?.xp || 0}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Screen</td><td style="padding:8px;border:1px solid #ddd">${screen || 'unknown'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Browser</td><td style="padding:8px;border:1px solid #ddd">${userAgent || 'unknown'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Time</td><td style="padding:8px;border:1px solid #ddd">${timestamp || new Date().toISOString()}</td></tr>
      </table>
      <h3>Description:</h3>
      <p style="background:#f5f5f5;padding:16px;border-radius:8px">${description.trim().replace(/\n/g, '<br>')}</p>
    `;

    await resend.emails.send({
      from: 'SAT Quest <onboarding@resend.dev>',
      to: 'problem.antoniosmith.excavator193@passmail.com',
      subject: `[SAT Quest] Bug report from ${player?.name || 'unknown'}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Report error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
  }
};

export const config = {
  path: '/api/report'
};
