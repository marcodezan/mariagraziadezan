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
| Dati professionali, contatti, tariffe, aree | `src/data/sito.ts` (unica fonte) |
| Colori, caratteri, spazi | `src/styles/global.css` (variabili in `:root`) |
| Pagine | `src/pages/` |
| Componenti (intestazione, piè di pagina, modulo…) | `src/components/` |
| Foto usate nel sito | `src/assets/foto/` (Astro le converte in AVIF/WebP) |
| Invio del modulo di contatto | `functions/api/contatto.ts` (solo su Cloudflare) |

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
