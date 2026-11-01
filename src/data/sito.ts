// Dati professionali e di contatto usati in tutto il sito.
import { testi } from '../lib/testi';

// I dati modificabili dalla Dottoressa (contatti, indirizzo, prezzi…) stanno nel file
// dei testi; qui si ricavano i collegamenti (telefono, WhatsApp, mappa).
const d = testi.dati;
const cifre = d.telefono.replace(/\D/g, '');
const internazionale = cifre.startsWith('39') ? cifre : `39${cifre}`;

export const sito = {
  nome: 'Maria Grazia De Zan',
  nomeCompleto: 'Dott.ssa Maria Grazia De Zan',
  titolo: 'Psicologa',
  albo: {
    ordine: 'Ordine degli Psicologi del Lazio',
    numero: '14656',
    sezione: 'A',
    dal: '2007',
  },
  partitaIva: d.partitaIva,

  telefono: d.telefono,
  telefonoLink: `tel:+${internazionale}`,
  whatsappLink: `https://wa.me/${internazionale}`,
  email: d.email,
  facebook: 'https://m.facebook.com/mariagraziadezanpsicologa/',

  studio: {
    presso: d.presso,
    via: d.via,
    cap: d.cap,
    citta: d.citta,
    quartiere: d.quartiere,
    mappaLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.via}, ${d.cap} ${d.citta}`)}`,
  },
  orari: d.orari,

  // Fornitore che ospita il sito (citato in Privacy e Cookie Policy).
  // Da aggiornare al passaggio su Cloudflare Pages.
  hosting: 'GitHub Pages, servizio di GitHub, Inc. (Stati Uniti)',

  // Chiave pubblica Cloudflare Turnstile (anti-spam del modulo).
  // Ora è la chiave di prova ufficiale di Cloudflare: [DA COMPLETARE] con quella reale.
  turnstileSiteKey: '1x00000000000000000000AA',

  // Dove la modalità modifica salva i testi
  repository: {
    proprietario: 'marcodezan',
    nome: 'mariagraziadezan',
    ramo: 'main',
    file: 'src/content/testi.json',
  },

  tariffe: d.tariffe.map((t) => ({ voce: t.voce, prezzo: t.prezzo })),
};

export const navigazione = [
  { href: '/chi-sono/', etichetta: 'Chi sono' },
  { href: '/aree-di-intervento/', etichetta: 'Aree di intervento' },
  { href: '/primo-colloquio/', etichetta: 'Il primo colloquio' },
  { href: '/faq/', etichetta: 'Domande frequenti' },
  { href: '/contatti/', etichetta: 'Contatti' },
] as const;

// Le aree compaiono in home (versione breve) e nella pagina dedicata.
export const aree = testi.aree;
