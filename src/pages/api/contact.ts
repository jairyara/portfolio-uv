import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    const runtime = (locals as any).runtime;
    const apiKey = runtime?.env?.RESEND_API_KEY;

    const data = await request.formData();
    const name    = data.get('name')?.toString() || '';
    const email   = data.get('email')?.toString() || '';
    const service = data.get('service')?.toString() || '';
    const message = data.get('message')?.toString() || '';
    const honey   = data.get('website')?.toString();

    if (honey) return new Response(JSON.stringify({ ok: false }), { status: 400 });
    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400 });
    }

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: 'Portafolio <hola@jairyara.dev>',
            to: 'hola@jairyara.dev',
            replyTo: email,
            subject: `Nuevo mensaje de ${name} — ${service || 'Contacto'}`,
            html: `
        <h2>Nuevo mensaje desde jairyara.dev</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${service || 'No especificado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error('Resend error:', err);
        return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
    }
};