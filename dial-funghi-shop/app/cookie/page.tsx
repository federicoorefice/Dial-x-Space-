import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy — Dial Funghi" };

export default function CookiePage() {
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />
      <section style={{ padding: "140px 32px 120px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 32 }}>
          Cookie Policy
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 48px" }}>
          COOKIE <span style={{ display: "inline-block", background: "var(--c-cream)", padding: "0 16px", border: "2px solid var(--c-ink)", borderRadius: 14, transform: "rotate(1deg)", boxShadow: "5px 5px 0 var(--c-ink)" }}>POLICY.</span>
        </h1>

        <div style={{ fontSize: 15, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 24 }}>
          <p>Questo sito usa solo cookie tecnici strettamente necessari al funzionamento. Non utilizziamo cookie di profilazione o di marketing senza il tuo consenso esplicito.</p>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Cookie tecnici (necessari)</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--c-ink)", fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Nome</th>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Scopo</th>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Durata</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "dial_cart", scope: "Contenuto del carrello (localStorage)", dur: "Sessione" },
                { name: "__stripe_*", scope: "Antifrode e sicurezza pagamenti (Stripe)", dur: "Sessione" },
              ].map((r) => (
                <tr key={r.name} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                  <td style={{ padding: "10px 0", fontFamily: "var(--font-mono)", fontSize: 12 }}>{r.name}</td>
                  <td style={{ padding: "10px 0" }}>{r.scope}</td>
                  <td style={{ padding: "10px 0" }}>{r.dur}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", margin: "16px 0 0" }}>Come disabilitare i cookie</h2>
          <p>Puoi disabilitare i cookie dalle impostazioni del tuo browser. Tieni presente che la disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento del carrello.</p>

          <p>Per ulteriori informazioni: <a href="mailto:info@dialfunghi.it" style={{ color: "inherit" }}>info@dialfunghi.it</a></p>

          <p style={{ opacity: 0.5, fontSize: 12 }}>Ultimo aggiornamento: maggio 2026</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
