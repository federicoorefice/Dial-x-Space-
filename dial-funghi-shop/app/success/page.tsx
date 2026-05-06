"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />
      <section style={{ padding: "200px 32px 120px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
            border: "3px solid var(--c-ink)", borderRadius: 24,
            transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 8vw, 120px)",
            lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          GRAZIE!
        </div>
        <p style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 40 }}>
          Il tuo ordine è confermato. Riceverai una email con i dettagli e il tracking non appena spediamo.
        </p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 40 }}>
          info@dialfunghi.it · +39 0461 534505
        </div>
        <Link href="/shop"
          style={{
            background: "var(--c-ink)", color: "var(--c-acid)",
            border: "2.5px solid var(--c-ink)", borderRadius: 999,
            padding: "18px 36px", fontWeight: 900, fontSize: 15,
            letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", boxShadow: "6px 6px 0 var(--c-acid)",
          }}
        >
          Continua lo shopping →
        </Link>
      </section>
      <Footer />
    </div>
  );
}
