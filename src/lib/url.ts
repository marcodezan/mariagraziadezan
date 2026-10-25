// Aggiunge ai link interni il percorso base del sito: vuoto sul dominio definitivo,
// "/nome-repository" su GitHub Pages. Così lo stesso codice funziona ovunque.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (percorso: string) => `${base}${percorso}`;
