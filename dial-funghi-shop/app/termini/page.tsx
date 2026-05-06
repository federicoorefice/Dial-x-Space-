import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Condizioni di Vendita — Dial Funghi" };

export default function TerminiPage() {
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />
      <section style={{ padding: "140px 32px 120px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 32 }}>
          Condizioni di Vendita
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 48px" }}>
          TERMINI <span style={{ display: "inline-block", background: "var(--c-mustard)", padding: "0 16px", border: "2px solid var(--c-ink)", borderRadius: 14, transform: "rotate(1deg)", boxShadow: "5px 5px 0 var(--c-ink)" }}>DI VENDITA.</span>
        </h1>

        <div style={{ fontSize: 15, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 24 }}>
          <p><strong>Venditore:</strong> Dial S.r.l. — Via Dei Prati, 60 · 38057 Pergine Valsugana (TN) · P.IVA 02439500220</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Prezzi e IVA</h2>
          <p>Tutti i prezzi sono in Euro e includono l&apos;IVA italiana (22%). I prezzi sono validi al momento dell&apos;ordine.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Spedizione</h2>
          <p>Spedizione standard €4,90. <strong>Gratuita per ordini superiori a €30,00.</strong> Tempi di consegna stimati: 3–5 giorni lavorativi per l&apos;Italia. Il tracking viene inviato via email.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Pagamento</h2>
          <p>Pagamento sicuro via Stripe (carte di credito/debito, Apple Pay, Google Pay). Nessun dato della carta viene memorizzato sui nostri server. Stripe è certificato PCI DSS Level 1.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Diritto di recesso</h2>
          <p>I consumatori hanno diritto di recedere entro <strong>14 giorni</strong> dalla ricezione (D.lgs. 206/2005, art. 52). Fanno eccezione i prodotti alimentari aperti o con confezione originale danneggiata. Vedi la nostra <a href="/recesso" style={{ color: "inherit", fontWeight: 700 }}>pagina Recesso</a>.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Allergeni</h2>
          <p>Le informazioni sugli allergeni sono riportate su ciascuna scheda prodotto e sull&apos;etichetta. Per allergie gravi contattaci prima dell&apos;acquisto: <a href="mailto:info@dialfunghi.it" style={{ color: "inherit" }}>info@dialfunghi.it</a></p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Foro competente</h2>
          <p>Per controversie con consumatori si applica il Foro del luogo di residenza del consumatore (D.lgs. 206/2005). Per controversie B2B: Foro di Trento.</p>

          <p style={{ opacity: 0.5, fontSize: 12 }}>Ultimo aggiornamento: maggio 2026</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
