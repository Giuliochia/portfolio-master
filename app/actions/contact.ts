"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<ContactResult> {
  const { name, email, message } = data;

  // Validazione server-side minima
  if (!name.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: "Tutti i campi sono obbligatori." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Indirizzo email non valido." };
  }
  if (message.trim().length < 10) {
    return { success: false, error: "Il messaggio è troppo breve." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "giuliochiaramonte@me.com",
      replyTo: email,
      subject: `[Portfolio] Nuovo messaggio da ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-bottom:4px">Nuovo messaggio dal portfolio</h2>
          <p style="color:#555;margin-top:0;margin-bottom:24px;font-size:13px">
            Ricevuto tramite il form di contatto
          </p>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#888;font-size:13px;width:80px">Nome</td>
              <td style="padding:8px 0;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#888;font-size:13px">Email</td>
              <td style="padding:8px 0">
                <a href="mailto:${email}" style="color:#d4af37">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f5f5f5;border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</div>
        </div>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Errore nell'invio. Riprova tra qualche istante." };
  }
}
