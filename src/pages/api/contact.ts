import type { APIRoute } from 'astro';
import { Resend } from 'resend';
// @ts-ignore - cloudflare:workers is available at runtime in CF Workers
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const apiKey = (env as any).RESEND_API_KEY;

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

    const serviceLabels: Record<string, string> = {
        web: 'Desarrollo Web',
        cyber: 'Ciberseguridad',
        saas: 'Producto SaaS',
        infra: 'Infraestructura / Hosting',
        otro: 'Otro',
    };
    const serviceLabel = serviceLabels[service] || service || 'No especificado';

    const confirmationHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mensaje recibido</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0F;font-family:'DM Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0F;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;text-align:center;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2DD4BF;">jairyara.dev</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#13131C;border-radius:16px;border:1px solid rgba(255,255,255,0.06);padding:40px 40px 32px;background-image:linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 60%);">

              <!-- Accent line -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="height:2px;width:32px;background-color:#2DD4BF;border-radius:2px;"></td>
                </tr>
              </table>

              <!-- Title -->
              <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">
                Mensaje recibido<span style="color:#2DD4BF;">.</span>
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#8892A4;line-height:1.6;">
                Hola ${name}, gracias por escribirme. Te responderé antes de 24 h — normalmente el mismo día.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr><td style="height:1px;background-color:rgba(255,255,255,0.06);"></td></tr>
              </table>

              <!-- Summary -->
              <p style="margin:0 0 14px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#2DD4BF;">Resumen de tu mensaje</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 14px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid #2DD4BF;">
                    <p style="margin:0 0 4px;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#4A5568;">Servicio</p>
                    <p style="margin:0;font-size:14px;color:#ffffff;">${serviceLabel}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 14px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid rgba(45,212,191,0.3);">
                    <p style="margin:0 0 4px;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#4A5568;">Mensaje</p>
                    <p style="margin:0;font-size:14px;color:#8892A4;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 24px;">
                <tr><td style="height:1px;background-color:rgba(255,255,255,0.06);"></td></tr>
              </table>

              <!-- CTA -->
              <p style="margin:0 0 20px;font-size:13px;color:#8892A4;line-height:1.6;">
                Mientras tanto, puedes revisar mi trabajo o escribirme directo.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#2DD4BF;border-radius:10px;padding:12px 24px;">
                    <a href="https://jairyara.dev" style="color:#0A0A0F;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">Ver portafolio →</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#4A5568;font-family:'Courier New',monospace;">
                © ${new Date().getFullYear()} Jair Yara · <a href="https://jairyara.dev" style="color:#4A5568;text-decoration:none;">jairyara.dev</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const notificationHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuevo mensaje</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0F;font-family:'DM Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0F;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;text-align:center;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2DD4BF;">jairyara.dev</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#13131C;border-radius:16px;border:1px solid rgba(255,255,255,0.06);padding:40px 40px 32px;background-image:linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 60%);">

              <!-- Accent line -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="height:2px;width:32px;background-color:#2DD4BF;border-radius:2px;"></td>
                </tr>
              </table>

              <!-- Title -->
              <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">
                Nuevo mensaje<span style="color:#2DD4BF;">.</span>
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#8892A4;line-height:1.6;">
                <strong style="color:#ffffff;">${name}</strong> te escribió desde el formulario de contacto.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr><td style="height:1px;background-color:rgba(255,255,255,0.06);"></td></tr>
              </table>

              <!-- Info -->
              <p style="margin:0 0 14px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#2DD4BF;">Datos del contacto</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 14px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid #2DD4BF;">
                    <p style="margin:0 0 2px;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#4A5568;">Nombre</p>
                    <p style="margin:0;font-size:14px;color:#ffffff;">${name}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 14px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid rgba(45,212,191,0.4);">
                    <p style="margin:0 0 2px;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#4A5568;">Email</p>
                    <p style="margin:0;font-size:14px;color:#2DD4BF;">${email}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 14px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid rgba(45,212,191,0.2);">
                    <p style="margin:0 0 2px;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#4A5568;">Servicio</p>
                    <p style="margin:0;font-size:14px;color:#ffffff;">${serviceLabel}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 14px;background-color:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid rgba(45,212,191,0.2);">
                    <p style="margin:0 0 2px;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#4A5568;">Mensaje</p>
                    <p style="margin:0;font-size:14px;color:#8892A4;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 24px;">
                <tr><td style="height:1px;background-color:rgba(255,255,255,0.06);"></td></tr>
              </table>

              <!-- CTA reply -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#2DD4BF;border-radius:10px;padding:12px 24px;">
                    <a href="mailto:${email}" style="color:#0A0A0F;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">Responder a ${name.split(' ')[0]} →</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#4A5568;font-family:'Courier New',monospace;">
                © ${new Date().getFullYear()} Jair Yara · <a href="https://jairyara.dev" style="color:#4A5568;text-decoration:none;">jairyara.dev</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    try {
        await Promise.all([
            resend.emails.send({
                from: 'Portafolio <hola@jairyara.dev>',
                to: 'hola@jairyara.dev',
                replyTo: email,
                subject: `Nuevo mensaje de ${name} — ${serviceLabel}`,
                html: notificationHtml,
            }),
            resend.emails.send({
                from: 'Jair Yara <no-reply@jairyara.dev>',
                to: email,
                subject: `Recibí tu mensaje, ${name.split(' ')[0]} ✔`,
                html: confirmationHtml,
            }),
        ]);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error('Resend error:', err);
        return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
    }
};