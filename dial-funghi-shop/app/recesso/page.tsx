import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Diritto di Recesso — Dial Funghi" };

export default function RecessoPage() {
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />
      <section style={{ padding: "140px 32px 120px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 32 }}>
          Diritto di Recesso
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 48px" }}>
          14 GIORNI <span style={{ display: "inline-block", background: "var(--c-acid)", padding: "0 16px", border: "2px solid var(--c-ink)", borderRadius: 14, transform: "rotate(-1deg)", boxShadow: "5px 5px 0 var(--c-ink)" }}>GARANTITI.</span>
        </h1>

        <div style={{ fontSize: 15, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 24 }}>
          <p>Ai sensi dell&apos;art. 52 del D.lgs. 206/2005 (Codice del Consumo) hai diritto di recedere dal contratto entro <strong>14 giorni</strong> dalla ricezione della merce, senza alcuna penale e senza specificare il motivo.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Come esercitare il recesso</h2>
          <p>Invia una comunicazione esplicita a: <a href="mailto:info@dialfunghi.it" style={{ color: "inherit", fontWeight: 700 }}>info@dialfunghi.it</a> entro 14 giorni dalla ricezione. Indica: numero ordine, nome, e prodotti da restituire.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Rimborso</h2>
          <p>Il rimborso verrà effettuato entro <strong>14 giorni</strong> dalla ricezione dei prodotti restituiti, utilizzando lo stesso metodo di pagamento dell&apos;ordine originale. Le spese di restituzione sono a carico del cliente.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Eccezioni (art. 59 D.lgs. 206/2005)</h2>
          <p>Il diritto di recesso <strong>non si applica</strong> a:</p>
          <ul style={{ paddingLeft: 24 }}>
            <li>Prodotti alimentari con confezione sigillata aperta dopo la consegna</li>
            <li>Prodotti personalizzati o su misura</li>
          </ul>
          <p>I prodotti con confezione integra e non aperta possono essere restituiti integralmente.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Prodotti difettosi</h2>
          <p>Per prodotti difettosi o diversi dall&apos;ordinato, il rimborso o la sostituzione avviene a spese nostre entro 48h dalla segnalazione. Garanzia legale di conformità: 24 mesi (art. 129 D.lgs. 206/2005).</p>

          <div style={{ background: "var(--c-acid)", border: "2px solid var(--c-ink)", borderRadius: 16, padding: 20, marginTop: 16 }}>
            <strong>Contatto rapido:</strong> info@dialfunghi.it · +39 0461 534505 (Lun–Ven 9:00–18:00)
          </div>

          <p style={{ opacity: 0.5, fontSize: 12 }}>Ultimo aggiornamento: maggio 2026</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
