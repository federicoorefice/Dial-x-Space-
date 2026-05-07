"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RECIPES = [
  // Fior di Funghi squeeze
  { id: "risotto-porcini", title: "Risotto cremoso al fungo", time: "25 min", diff: "Facile", tag: "Fior di Funghi", productId: "ffps", color: "#D4FF3C", img: "/images/ricette/risotto-porcini.png" },
  { id: "burger-gourmet", title: "Burger gourmet con fungo", time: "15 min", diff: "Facile", tag: "Fior di Funghi", productId: "ffps", color: "#F2C200", img: "/images/ricette/panino-bbq.png" },
  { id: "bruschette", title: "Bruschette autunnali", time: "5 min", diff: "Facilissima", tag: "Fior di Funghi", productId: "ffps", color: "#E63B1E", img: "/images/ricette/risotto-porcini.png" },
  { id: "uova-tartufo", title: "Uova strapazzate al tartufo", time: "8 min", diff: "Facilissima", tag: "Fior di Funghi", productId: "fftap", color: "#2E4FE8", img: "/images/ricette/tartufo-pecorino.png" },
  { id: "toast-gourmet", title: "Toast gourmet al tartufo", time: "5 min", diff: "Facilissima", tag: "Fior di Funghi", productId: "fftap", color: "#F5EFE0", img: "/images/ricette/tartufo-pecorino.png" },
  { id: "tagliolini", title: "Tagliolini al tartufo e pecorino", time: "10 min", diff: "Facile", tag: "Fior di Funghi", productId: "fftap", color: "#D4FF3C", img: "/images/ricette/tartufo-pecorino.png" },
  { id: "costine", title: "Costine BBQ al fungo", time: "60 min", diff: "Media", tag: "Fior di Funghi", productId: "ffpab", color: "#E63B1E", img: "/images/ricette/panino-bbq.png" },
  { id: "patatine", title: "Patatine al forno paprika", time: "35 min", diff: "Facile", tag: "Fior di Funghi", productId: "ffpab", color: "#F2C200", img: "/images/ricette/panino-bbq.png" },
  { id: "hotdog", title: "Hot dog gourmet del bosco", time: "10 min", diff: "Facile", tag: "Fior di Funghi", productId: "ffpab", color: "#D4FF3C", img: "/images/ricette/panino-bbq.png" },
  { id: "salmone", title: "Salmone alla brace teriyaki", time: "20 min", diff: "Facile", tag: "Fior di Funghi", productId: "fft", color: "#2E4FE8", img: "/images/ricette/teriyaki-salmone.png" },
  { id: "bowl-pollo", title: "Bowl di pollo teriyaki", time: "25 min", diff: "Facile", tag: "Fior di Funghi", productId: "fft", color: "#F5EFE0", img: "/images/ricette/teriyaki-salmone.png" },
  { id: "wok-verdure", title: "Wok di verdure fusion", time: "15 min", diff: "Facile", tag: "Fior di Funghi", productId: "fft", color: "#D4FF3C", img: "/images/ricette/teriyaki-salmone.png" },

  // Funghi Secchi
  { id: "risotto-secchi", title: "Risotto ai Porcini Secchi", time: "35 min", diff: "Facile", tag: "Funghi Secchi", productId: "psec", color: "#D9A547", img: "/images/ricette/risotto-porcini.png" },
  { id: "sugo-porcini", title: "Sugo ai Porcini per Pasta", time: "20 min", diff: "Facile", tag: "Funghi Secchi", productId: "psec", color: "#A66B3D", img: "/images/ricette/risotto-porcini.png" },
  { id: "trifolato", title: "Trifolato di Funghi Misti", time: "15 min", diff: "Facile", tag: "Funghi Secchi", productId: "finf", color: "#D4FF3C", img: "/images/ricette/risotto-porcini.png" },
  { id: "zuppa-bosco", title: "Zuppa del Bosco", time: "40 min", diff: "Facile", tag: "Funghi Secchi", productId: "psec", color: "#8B5A2B", img: "/images/ricette/risotto-porcini.png" },
  { id: "morchelle-uova", title: "Morchelle con Uova al Burro", time: "12 min", diff: "Media", tag: "Funghi Secchi", productId: "morc", color: "#F5EFE0", img: "/images/ricette/tartufo-pecorino.png" },
  { id: "ramen-shiitake", title: "Ramen allo Shiitake", time: "30 min", diff: "Media", tag: "Funghi Secchi", productId: "shit", color: "#E63B1E", img: "/images/ricette/teriyaki-salmone.png" },

  // Polenta
  { id: "polenta-porcini", title: "Polenta Cremosa ai Porcini", time: "10 min", diff: "Facilissima", tag: "Polenta", productId: "pol", color: "#D9A547", img: "/images/ricette/risotto-porcini.png" },
  { id: "crostini-polenta", title: "Crostini di Polenta Fritta", time: "20 min", diff: "Facile", tag: "Polenta", productId: "pol", color: "#F2C200", img: "/images/ricette/panino-bbq.png" },
  { id: "polenta-cotechino", title: "Polenta con Ragù di Funghi", time: "45 min", diff: "Media", tag: "Polenta", productId: "pol", color: "#E63B1E", img: "/images/ricette/risotto-porcini.png" },

  // Condimenti
  { id: "pasta-grigliata", title: "Pasta alla Grigliata di Montagna", time: "15 min", diff: "Facile", tag: "Condimenti", productId: "grig", color: "#7A4226", img: "/images/ricette/risotto-porcini.png" },
  { id: "pollo-condito", title: "Petto di Pollo al Condimento Funghi", time: "25 min", diff: "Facile", tag: "Condimenti", productId: "papor", color: "#D4FF3C", img: "/images/ricette/tartufo-pecorino.png" },
  { id: "verdure-griglio", title: "Verdure Grigliate al Bosco", time: "20 min", diff: "Facile", tag: "Condimenti", productId: "grig", color: "#F5EFE0", img: "/images/ricette/panino-bbq.png" },
];

const TAGS = ["Tutte", "Fior di Funghi", "Funghi Secchi", "Polenta", "Condimenti"];

export default function RicettePage() {
  const [tag, setTag] = useState("Tutte");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const filtered = tag === "Tutte" ? RECIPES : RECIPES.filter((r) => r.tag === tag);

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Ricette" />

      <section style={{ padding: "160px 32px 60px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            position: "absolute", top: 130, right: 120,
            background: "var(--c-ketchup)", color: "var(--c-cream)",
            fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
            boxShadow: "5px 5px 0 var(--c-ink)", transform: "rotate(4deg)",
          }}
        >
          {RECIPES.length} ricette
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Ricette / Squeeze quotidiano
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0",
          }}
        >
          UNO{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
              border: "3px solid var(--c-ink)", borderRadius: 24,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            SQUEEZE
          </span>
          <br />E SEI A CENA.
        </h1>
        <p style={{ fontSize: 18, marginTop: 32, maxWidth: 600, lineHeight: 1.5 }}>
          Ricette pronte in pochi minuti. Pasta, bowl, burger, brunch — il bosco diventa pratico.
        </p>
      </section>

      {/* Filtri */}
      <div style={{ padding: "0 32px 32px", maxWidth: 1480, margin: "0 auto", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {TAGS.map((t) => (
          <button key={t} onClick={() => setTag(t)}
            style={{
              background: tag === t ? "var(--c-ink)" : "var(--c-cream)",
              color: tag === t ? "var(--c-acid)" : "var(--c-ink)",
              border: "2.5px solid var(--c-ink)", borderRadius: 999,
              padding: "10px 22px", fontWeight: 800, fontSize: 12,
              letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer", boxShadow: "4px 4px 0 var(--c-ink)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <section style={{ padding: "32px 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {filtered.map((r, i) => (
            <div key={r.id}
              onMouseEnter={() => setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: r.color, color: "var(--c-ink)", border: "2.5px solid var(--c-ink)",
                borderRadius: 28,
                boxShadow: hoveredId === r.id ? "14px 18px 0 var(--c-ink)" : "8px 8px 0 var(--c-ink)",
                padding: 24, display: "block", position: "relative", overflow: "hidden",
                transform: hoveredId === r.id ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span
                  style={{
                    background: "var(--c-ink)", color: r.color, padding: "5px 11px",
                    borderRadius: 999, fontSize: 10, fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}
                >
                  {r.diff}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
                  ⏱ {r.time}
                </span>
              </div>

              <div style={{ height: 160, borderRadius: 12, overflow: "hidden", margin: "8px 0 16px", position: "relative" }}>
                <Image src={r.img} alt={r.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22,
                  lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em",
                }}
              >
                {r.title}
              </div>
              <div style={{ fontSize: 12, marginTop: 10, fontWeight: 700, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Con {r.tag}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
