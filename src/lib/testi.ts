// Accesso ai testi modificabili del sito (src/content/testi.json).
// Ogni testo ha una "chiave" (es. "home.titolo" o "aree.0.testo") che la modalità
// modifica usa per salvare le correzioni nel punto giusto del file.
import testi from '../content/testi.json';

export { testi };

/** Legge un valore dal file dei testi a partire dalla sua chiave. */
export function leggi(chiave: string): any {
  return chiave.split('.').reduce<any>((valore, parte) => valore?.[parte], testi);
}

const sostituzioni: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Testo sicuro da inserire nella pagina, con i segnaposto [DA …] evidenziati in giallo. */
export function conSegnaposto(testo: string): string {
  const sicuro = String(testo ?? '').replace(/[&<>"]/g, (c) => sostituzioni[c]);
  return sicuro.replace(/\[(DA [A-ZÀ-Ú ]+):([^\]]*)\]/g, '<mark class="segnaposto">[$1:$2]</mark>');
}
