import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();

    const name    = data.get('name')?.toString() || '';
    const email   = data.get('email')?.toString() || '';
    const service = data.get('service')?.toString() || '';
    const message = data.get('message')?.toString() || '';
    const honey   = data.get('website')?.toString(); // honeypot

    // Spam check
    if (honey) {
        return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }

    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { status: 400 });
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: 'Portafolio <hola@jairyara.dev>',
            to: 'jair@jairyara.dev',
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
        return new Response(JSON.stringify({ error: 'Error al enviar' }), { status: 500 });
    }
};