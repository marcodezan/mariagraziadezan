// Controllo prima della pubblicazione: il file dei testi deve essere valido e non
// contenere il titolo "psicoterapeuta" (non annotato all'Albo). Se il controllo
// fallisce, la pubblicazione si ferma e online resta la versione precedente.
import { readFileSync } from 'node:fs';

const percorso = new URL('../src/content/testi.json', import.meta.url);
let testi;
try {
  testi = JSON.parse(readFileSync(percorso, 'utf8'));
} catch (err) {
  console.error('✗ Il file dei testi non è leggibile:', err.message);
  process.exit(1);
}

const trovati = [];
(function cerca(valore, chiave) {
  if (typeof valore === 'string') {
    if (/psicoterapeut/i.test(valore)) trovati.push(chiave);
  } else if (valore && typeof valore === 'object') {
    for (const [k, v] of Object.entries(valore)) cerca(v, chiave ? `${chiave}.${k}` : k);
  }
})(testi, '');

if (trovati.length) {
  console.error('✗ Il titolo "psicoterapeuta" non può comparire nel sito. Testi da correggere:');
  for (const k of trovati) console.error(`  - ${k}`);
  process.exit(1);
}
console.log('✓ Testi controllati');
