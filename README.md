# Sito della Dott.ssa Maria Grazia De Zan — Psicologa

Sito statico realizzato con [Astro](https://astro.build), pensato prima di tutto per il telefono.

## Lavorare in locale

```bash
npm install
npm run dev        # anteprima su http://localhost:4321
npm run build      # genera il sito nella cartella dist/
```

## Dove si trovano le cose

| Cosa | Dove |
|---|---|
| **Testi modificabili** (pagine, FAQ, contatti, prezzi) | `src/content/testi.json` |
| Dati fissi e collegamenti (Albo, link telefono/WhatsApp/mappa) | `src/data/sito.ts` |
| Colori, caratteri, spazi | `src/styles/global.css` (variabili in `:root`) |
| Pagine | `src/pages/` |
| Componenti (intestazione, piè di pagina, modulo…) | `src/components/` |
| Foto usate nel sito | `src/assets/foto/` (Astro le converte in AVIF/WebP) |
| Invio del modulo di contatto | `functions/api/contatto.ts` (solo su Cloudflare) |

## Modifica dei testi dal sito

La Dottoressa può modificare i testi direttamente dal sito pubblicato
(piè di pagina → **Area riservata**). Le modifiche vengono salvate in
`src/content/testi.json` su GitHub e il sito si ripubblica da solo.
Guida per lei: `GUIDA-MODIFICA-TESTI.md`.

### Creare il codice di accesso (una volta, dal proprietario del repository)
1. GitHub → foto profilo → **Settings** → **Developer settings** →
   **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. Nome: `Sito – modifica testi`. Scadenza: a scelta (es. 1 anno).
3. **Repository access** → *Only select repositories* → `mariagraziadezan`.
4. **Permissions** → *Repository permissions* → **Contents: Read and write**.
5. **Generate token** e copia il codice (inizia con `github_pat_`).
6. Consegnalo alla Dottoressa di persona o con un messaggio che poi cancellerai:
   è come una password.

Per revocarlo: stessa pagina → token → **Delete**. Alla scadenza se ne crea uno nuovo.

### Protezioni
- Prima di ogni pubblicazione `scripts/controlla-testi.mjs` blocca il sito se nei
  testi compare "psicoterapeuta"; online resta la versione precedente.
- La modalità modifica rifiuta testi vuoti e la stessa parola già al salvataggio.

## Pubblicazione

### Ora: GitHub Pages (provvisorio)
Ogni aggiornamento del ramo `main` viene pubblicato in automatico
(`.github/workflows/pubblica.yml`) su `https://<utente>.github.io/<repository>/`.
Il sito provvisorio **non è indicizzato** dai motori di ricerca.
Su GitHub Pages il modulo di contatto è visibile ma non può inviare email: chi prova
a usarlo vede l'invito a telefonare.

### In seguito: Cloudflare Pages (definitivo)
1. Cloudflare → Workers e Pages → Crea → Pages → collega questo repository.
   - Comando di build: `npm run build` · Cartella: `dist`
   - Variabili: `SITE_URL=https://www.<dominio>` e, quando il sito è pronto,
     `INDICIZZA=true`
2. **Email Routing** sul dominio: attivarlo e verificare come destinazione
   `dottoressa.dezan@gmail.com`. Il mittente in `wrangler.toml` (`MITTENTE`) deve
   appartenere al dominio.
3. **Turnstile** (anti-spam): creare un widget per il dominio.
   - chiave pubblica → `turnstileSiteKey` in `src/data/sito.ts`
   - chiave segreta → variabile segreta `TURNSTILE_SECRET` del progetto Pages
4. Collegare il dominio personalizzato al progetto Pages.

Per provare il modulo in locale: `npm run build && npx wrangler pages dev dist`
(serve un file `.dev.vars` con `TURNSTILE_SECRET=1x0000000000000000000000000000000AA`,
la chiave di prova ufficiale di Cloudflare).

## Regole di contenuto
- Titolo professionale: solo "Psicologa" o "Psicologa clinica".
- Niente testimonianze, niente promesse di risultati.
- Il footer con i dati di iscrizione all'Albo deve comparire in ogni pagina.
