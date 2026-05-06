# Dial Funghi — Web Site Remix

Prototipo e-commerce Dial Funghi. Design in HTML/CSS/JS con React 18 (CDN), Framer Motion, Tailwind.

## Come aprire il sito in locale

Apri `project/Homepage Dial Funghi.html` nel browser — funziona senza server.

## Struttura

```
project/
  Homepage Dial Funghi.html   ← entry point principale
  components.jsx               ← componenti stile bosco/glass
  js/
    home.jsx                   ← homepage (stile Bold)
    shop.jsx                   ← pagina shop
    carrello.jsx               ← carrello
    chi-siamo.jsx              ← chi siamo
    contatti.jsx               ← contatti
    ricette.jsx                ← ricette
    products-data.js           ← catalogo 16 prodotti
  assets/
    products/                  ← 16 immagini prodotti ufficiali
    azienda/                   ← foto stabilimento e lab
    ricette/                   ← foto food per le ricette
    cert/                      ← loghi certificazioni
  frames/                      ← 120 frame JPG animazione bosco (NON modificare)
  pages/                       ← HTML per le sotto-pagine
  styles/system.css            ← variabili CSS globali
```

## Cosa è stato completato (FASE 0)

- Immagini ufficiali: tutti i 16 prodotti, azienda, ricette, certificazioni
- Prezzi corretti: Fior di Funghi €2.99
- Dati aziendali reali: P.IVA 02439500220, Via Dei Prati 60, Pergine Valsugana (TN)
- Contatti reali: tel. +39 0461 534505, info@dialfunghi.it
- Ricette: foto food reali (risotto, panino, tartufo, teriyaki)
- Chi siamo: griglia foto stabilimento e laboratorio completa

## Prossimi passi (FASE 1+)

Vedere il piano completo in `/Users/federicoorefice/.claude/plans/riesci-a-vedere-il-gentle-wreath.md`

**FASE 1:** Setup Next.js 14 + TypeScript + Tailwind

## GitHub — setup al rientro

Il repo git locale è pronto. Per creare e pushare su GitHub esegui:

```bash
cd /Users/federicoorefice/Desktop/web-site-remix

# 1. Autenticati con GitHub
gh auth login -h github.com

# 2. Crea il repo e pusha
gh repo create web-site-remix-dial --public --push --source .
```

Oppure se la repo esiste già:
```bash
git remote add origin https://github.com/federicoorefice/web-site-remix-dial.git
git push -u origin main
```
