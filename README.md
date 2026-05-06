# Dial Funghi — Web Site Remix

E-commerce completo per Dial Funghi (tartufi, funghi e condimenti gourmet trentini).

## Struttura repository

```
project/                          ← Prototipo HTML/CSS/JS (FASE 0 completata)
  Homepage Dial Funghi.html        ← entry point, apri nel browser senza server
  components.jsx                   ← componenti stile bosco/glass
  js/
    home.jsx, shop.jsx, carrello.jsx, chi-siamo.jsx, contatti.jsx, ricette.jsx
    products-data.js               ← catalogo 16 prodotti
  assets/products/ azienda/ ricette/ cert/ frames/

dial-funghi-shop/                 ← App Next.js 16 (produzione)
  app/
    page.tsx                       ← Homepage
    shop/page.tsx                  ← Catalogo con filtri categoria
    shop/[id]/page.tsx             ← Pagina singolo prodotto
    carrello/page.tsx              ← Carrello
    chi-siamo/page.tsx             ← Chi siamo con timeline
    contatti/page.tsx              ← Form contatti
    ricette/page.tsx               ← Ricette con filtri
    success/page.tsx               ← Conferma ordine
    cancel/page.tsx                ← Ordine annullato
    api/checkout/route.ts          ← Stripe Checkout (server-side)
    api/webhooks/stripe/route.ts   ← Webhook + email Resend
    privacy/ cookie/ termini/ recesso/  ← Pagine legali GDPR
  components/Navbar.tsx Footer.tsx AddToCartButton.tsx CheckoutButton.tsx
  lib/products.ts                  ← Catalogo TypeScript (16 prodotti, 6 categorie)
  lib/cart.tsx                     ← CartContext + localStorage
  public/images/                   ← Tutte le immagini ufficiali
  .env.example                     ← Variabili d'ambiente necessarie
  vercel.json                      ← Config deploy (region cdg1)
```

## Stato completamento

- ✅ FASE 0 — Prototipo: immagini, prezzi, dati aziendali, ricette, chi siamo
- ✅ FASE 1 — Next.js 16 setup: TypeScript, Cart Context, layout, homepage
- ✅ FASE 2 — Porting design: tutte le pagine (shop, prodotto, carrello, chi-siamo, contatti, ricette)
- ✅ FASE 3 — Stripe Checkout: API route, sessione, success/cancel pages
- ✅ FASE 4 — Email Resend: webhook con email business + cliente in HTML branded
- ✅ FASE 5 — Pagine legali: privacy, cookie, termini, diritto di recesso (GDPR/D.lgs.206/2005)
- ✅ FASE 6 — Security headers: CSP, X-Frame-Options DENY, HSTS, Permissions-Policy
- ⏳ FASE 7 — Deploy Vercel (istruzioni sotto)

## Deploy su Vercel — istruzioni passo-passo

### Passo 1: Autenticati su GitHub

```bash
gh auth login -h github.com
```

### Passo 2: Crea il repo su GitHub e pusha

```bash
gh repo create web-site-remix-dial --public --push --source /Users/federicoorefice/Desktop/web-site-remix
```

Oppure se il repo esiste già:
```bash
git remote add origin https://github.com/federicoorefice/web-site-remix-dial.git
git push -u origin main
```

### Passo 3: Collega a Vercel

1. Vai su https://vercel.com/new
2. "Import Git Repository" → seleziona `web-site-remix-dial`
3. **Root Directory**: `dial-funghi-shop`
4. Framework: Next.js (rilevato automaticamente)

### Passo 4: Aggiungi variabili d'ambiente su Vercel

Nelle impostazioni del progetto Vercel → Environment Variables:

| Variable | Dove trovarla |
|---|---|
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/test/apikeys → Secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | https://dashboard.stripe.com/test/apikeys → Publishable key |
| `STRIPE_WEBHOOK_SECRET` | Dopo aver creato il webhook (passo 5) |
| `RESEND_API_KEY` | https://resend.com/api-keys |
| `NEXT_PUBLIC_BASE_URL` | `https://[tuo-dominio].vercel.app` |
| `BUSINESS_EMAIL` | `federico.orefice@dialfunghi.it` |

### Passo 5: Configura il webhook Stripe

1. Vai su https://dashboard.stripe.com/test/webhooks
2. "Add endpoint" → URL: `https://[tuo-dominio].vercel.app/api/webhooks/stripe`
3. Events: seleziona `checkout.session.completed`
4. Copia il "Signing secret" → incollalo come `STRIPE_WEBHOOK_SECRET` su Vercel

### Passo 6: Test end-to-end

1. Apri il sito Vercel
2. Aggiungi prodotti al carrello
3. Checkout con carta test: `4242 4242 4242 4242` (qualsiasi data futura, qualsiasi CVC)
4. Verifica che arrivi email a `federico.orefice@dialfunghi.it`
5. Verifica https://securityheaders.com con il dominio Vercel (target: grado A o A+)
