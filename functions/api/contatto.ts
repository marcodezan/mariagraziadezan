// Cloudflare Pages Function: riceve il modulo di contatto, verifica l'anti-spam
// Turnstile e inoltra il messaggio via email (Email Routing) alla Dottoressa.
// Nessun dato viene salvato: il messaggio esiste solo nell'email inviata.
import { EmailMessage } from 'cloudflare:email';

interface Env {
  EMAIL: { send(message: EmailMessage): Promise<void> };
  TURNSTILE_SECRET: string;
  MITTENTE: string;
  DESTINATARIO: string;
}

const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO_VALIDO = /^\+?[\d\s./-]{8,20}$/;

function pulisci(valore: FormDataEntryValue | null, max: number) {
  return typeof valore === 'string' ? valore.trim().slice(0, max) : '';
}

function base64Utf8(testo: string) {
  const byte = new TextEncoder().encode(testo);
  let binario = '';
  for (const b of byte) binario += String.fromCharCode(b);
  return btoa(binario);
}

function rispondi(request: Request, stato: number, errore?: string) {
  const vuoleJson = (request.headers.get('Accept') || '').includes('application/json');
  if (vuoleJson) {
    return new Response(JSON.stringify(errore ? { errore } : { inviato: true }), {
      status: stato,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
  // Invio senza JavaScript: si torna alla pagina Contatti
  const destinazione = new URL(errore ? '/contatti/?errore=1' : '/contatti/?inviato=1', request.url);
  return Response.redirect(destinazione.toString(), 303);
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let dati: FormData;
  try {
    dati = await request.formData();
  } catch {
    return rispondi(request, 400, 'Richiesta non valida.');
  }

  // Campo trappola compilato: è un programma automatico, si finge l'invio
  if (pulisci(dati.get('sito_web'), 200)) return rispondi(request, 200);

  const nome = pulisci(dati.get('nome'), 100).replace(/[\r\n]+/g, ' ');
  const contatto = pulisci(dati.get('contatto'), 150).replace(/[\r\n]+/g, ' ');
  const messaggio = pulisci(dati.get('messaggio'), 3000);
  const consenso = dati.get('consenso') === 'si';

  if (nome.length < 2 || messaggio.length < 5 || !consenso) {
    return rispondi(request, 400, 'Alcuni campi obbligatori non sono compilati.');
  }
  const eEmail = EMAIL_VALIDA.test(contatto);
  if (!eEmail && !TELEFONO_VALIDO.test(contatto)) {
    return rispondi(request, 400, 'Il recapito indicato non è valido.');
  }

  // Verifica anti-spam Turnstile
  const verifica = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET,
      response: pulisci(dati.get('cf-turnstile-response'), 2048),
      remoteip: request.headers.get('CF-Connecting-IP') || '',
    }),
  }).then((r) => r.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
  if (!verifica.success) {
    return rispondi(request, 400, 'La verifica anti-spam non è riuscita.');
  }

  const corpo = [
    'Nuovo messaggio dal modulo di contatto del sito.',
    '',
    `Nome: ${nome}`,
    `Recapito: ${contatto}`,
    '',
    'Messaggio:',
    messaggio,
  ].join('\r\n');

  const dominio = env.MITTENTE.split('@')[1] || 'localhost';
  const intestazioni = [
    `From: Sito web <${env.MITTENTE}>`,
    `To: <${env.DESTINATARIO}>`,
    eEmail ? `Reply-To: <${contatto}>` : '',
    `Subject: =?UTF-8?B?${base64Utf8(`Richiesta di contatto da ${nome}`)}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${dominio}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ].filter(Boolean);
  const raw = `${intestazioni.join('\r\n')}\r\n\r\n${base64Utf8(corpo).replace(/.{76}/g, '$&\r\n')}`;

  try {
    await env.EMAIL.send(new EmailMessage(env.MITTENTE, env.DESTINATARIO, raw));
  } catch (err) {
    console.error('Invio email non riuscito', err);
    return rispondi(request, 502);
  }
  return rispondi(request, 200);
};
