import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CancelPage() {
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />
      <section style={{ padding: "200px 32px 120px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 8vw, 100px)",
            lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "uppercase", marginBottom: 24,
          }}
        >
          Pagamento{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-ketchup)", color: "var(--c-cream)",
              padding: "0 20px", border: "3px solid var(--c-ink)", borderRadius: 20,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            annullato.
          </span>
        </div>
        <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 40, opacity: 0.75 }}>
          Nessun importo è stato addebitato. Il tuo carrello è ancora lì, ad aspettarti.
        </p>
        <Link href="/carrello"
          style={{
            background: "var(--c-ink)", color: "var(--c-acid)",
            border: "2.5px solid var(--c-ink)", borderRadius: 999,
            padding: "18px 36px", fontWeight: 900, fontSize: 15,
            letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", boxShadow: "6px 6px 0 var(--c-acid)",
          }}
        >
          Torna al carrello →
        </Link>
      </section>
      <Footer />
    </div>
  );
}
