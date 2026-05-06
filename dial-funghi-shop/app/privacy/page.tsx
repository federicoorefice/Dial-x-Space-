import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — Dial Funghi" };

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />
      <section style={{ padding: "140px 32px 120px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 32 }}>
          Informativa Privacy
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 48px" }}>
          PRIVACY <span style={{ display: "inline-block", background: "var(--c-acid)", padding: "0 16px", border: "2px solid var(--c-ink)", borderRadius: 14, transform: "rotate(-1deg)", boxShadow: "5px 5px 0 var(--c-ink)" }}>POLICY.</span>
        </h1>

        <div style={{ fontSize: 15, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 24 }}>
          <p><strong>Titolare del trattamento:</strong> Dial S.r.l. — Via Dei Prati, 60 · 38057 Pergine Valsugana (TN) · P.IVA 02439500220 · info@dialfunghi.it</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Dati raccolti</h2>
          <p>Raccogliamo nome, indirizzo email, indirizzo di spedizione e dati di pagamento (elaborati da Stripe) esclusivamente per l&apos;evasione degli ordini. Non vendiamo mai i tuoi dati a terzi.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Base giuridica</h2>
          <p>Esecuzione del contratto (Art. 6.1.b GDPR) per l&apos;elaborazione degli ordini. Consenso esplicito (Art. 6.1.a GDPR) per le comunicazioni promozionali opzionali.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Conservazione</h2>
          <p>I dati degli ordini sono conservati per 10 anni ai sensi degli obblighi fiscali italiani (D.P.R. 633/72). I dati di marketing vengono eliminati su richiesta.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>I tuoi diritti (GDPR)</h2>
          <p>Hai diritto di accesso, rettifica, cancellazione, portabilità e opposizione al trattamento. Per esercitarli: <a href="mailto:info@dialfunghi.it" style={{ color: "inherit" }}>info@dialfunghi.it</a>. Puoi presentare reclamo al Garante Privacy (www.garanteprivacy.it).</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Terze parti</h2>
          <p><strong>Stripe Inc.</strong> (pagamenti — USA, Standard Contractual Clauses) · <strong>Resend Inc.</strong> (email transazionali) · <strong>Vercel Inc.</strong> (hosting — USA, SCC). Tutti i fornitori sono conformi al GDPR.</p>

          <p style={{ opacity: 0.5, fontSize: 12 }}>Ultimo aggiornamento: maggio 2026</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
