"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RECIPES } from "@/lib/recipes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
            background: "#C24B2B", color: "var(--c-cream)",
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
          {RECIPES.length} ricette pronte in pochi minuti. Pasta, bowl, burger, brunch, ramen — il bosco diventa pratico.
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
          {filtered.map((r) => (
            <Link
              key={r.id}
              href={`/ricette/${r.id}`}
              onMouseEnter={() => setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: r.color, color: "var(--c-ink)", border: "2.5px solid var(--c-ink)",
                borderRadius: 28,
                boxShadow: hoveredId === r.id ? "14px 18px 0 var(--c-ink)" : "8px 8px 0 var(--c-ink)",
                padding: 24, display: "block", position: "relative", overflow: "hidden",
                transform: hoveredId === r.id ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                textDecoration: "none",
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
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--c-ink)" }}>
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
                  color: "var(--c-ink)",
                }}
              >
                {r.title}
              </div>
              <div style={{ fontSize: 12, marginTop: 10, fontWeight: 700, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--c-ink)" }}>
                {r.tag}
              </div>

              {/* Arrow hint */}
              <div style={{
                marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em",
                color: "var(--c-ink)", opacity: 0.6,
              }}>
                Vedi ricetta →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
