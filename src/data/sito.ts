// Unica fonte dei dati professionali e di contatto usati in tutto il sito.
// I valori null vengono mostrati come segnaposto evidente [DA COMPLETARE].

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
  partitaIva: null as string | null, // [DA COMPLETARE: P.IVA]

  telefono: '347 772 1576',
  telefonoLink: 'tel:+393477721576',
  whatsappLink: 'https://wa.me/393477721576',
  email: 'dottoressa.dezan@gmail.com',
  facebook: 'https://m.facebook.com/mariagraziadezanpsicologa/',

  studio: {
    presso: 'Poliofficina',
    via: 'Via G. Bruno Ferrari 43',
    cap: '00125',
    citta: 'Roma',
    quartiere: 'Acilia',
    mappaLink:
      'https://www.google.com/maps/search/?api=1&query=Via+G.+Bruno+Ferrari+43,+00125+Roma',
  },
  orari: 'Riceve su appuntamento',

  // Chiave pubblica Cloudflare Turnstile (anti-spam del modulo).
  // Ora è la chiave di prova ufficiale di Cloudflare: [DA COMPLETARE] con quella reale.
  turnstileSiteKey: '1x00000000000000000000AA',

  incontro: {
    durataMinuti: 60,
  },
  tariffe: [
    { voce: 'Colloquio individuale', prezzo: 60 },
    { voce: 'Sostegno alla genitorialità', prezzo: 75 },
    { voce: 'Sostegno di coppia', prezzo: 80 },
  ],
} as const;

export const navigazione = [
  { href: '/chi-sono/', etichetta: 'Chi sono' },
  { href: '/aree-di-intervento/', etichetta: 'Aree di intervento' },
  { href: '/primo-colloquio/', etichetta: 'Il primo colloquio' },
  { href: '/faq/', etichetta: 'Domande frequenti' },
  { href: '/contatti/', etichetta: 'Contatti' },
] as const;

// Le aree compaiono in home (versione breve) e nella pagina dedicata.
export const aree = [
  {
    id: 'genitorialita',
    titolo: 'Sostegno alla genitorialità',
    breve: 'Consulenza e sostegno ai genitori nelle fasi educative più complesse e nella relazione con i figli.',
  },
  {
    id: 'scuola-dsa-adhd',
    titolo: 'Scuola, DSA e ADHD',
    breve: 'Orientamento e supporto per difficoltà di apprendimento e di attenzione, in collaborazione con la famiglia e gli insegnanti.',
  },
  {
    id: 'adolescenza',
    titolo: 'Adolescenza',
    breve: 'Uno spazio di ascolto dedicato ai ragazzi e un lavoro di prevenzione dei comportamenti a rischio.',
  },
  {
    id: 'coppia-famiglia',
    titolo: 'Coppia e famiglia',
    breve: 'Sostegno nelle difficoltà relazionali e comunicative e nei momenti di crisi.',
  },
  {
    id: 'umore',
    titolo: 'Disturbi dell’umore',
    breve: 'Tristezza persistente, calo di energia e sbalzi d’umore che incidono sulla vita quotidiana.',
  },
] as const;
