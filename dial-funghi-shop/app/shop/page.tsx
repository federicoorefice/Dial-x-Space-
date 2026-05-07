"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { BASE_PATH } from "@/lib/basepath";

export default function ShopPage() {
  const [cat, setCat] = useState("tutti");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const filtered = cat === "tutti" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Shop" />

      {/* HERO */}
      <section style={{ padding: "160px 32px 60px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            position: "absolute", top: 130, right: 60,
            background: "var(--c-acid)", color: "var(--c-ink)",
            fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
            boxShadow: "5px 5px 0 var(--c-ink)", transform: "rotate(-4deg)",
          }}
        >
          {PRODUCTS.length} prodotti
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Shop / Catalogo
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0",
          }}
        >
          TUTTO IL{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
              border: "3px solid var(--c-ink)", borderRadius: 24,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            BOSCO.
          </span>
        </h1>
      </section>

      {/* FILTRI */}
      <div style={{ padding: "0 32px 32px", maxWidth: 1480, margin: "0 auto", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            style={{
              background: cat === c.id ? "var(--c-ink)" : "var(--c-cream)",
              color: cat === c.id ? "var(--c-acid)" : "var(--c-ink)",
              border: "2.5px solid var(--c-ink)", borderRadius: 999,
              padding: "10px 22px", fontWeight: 800, fontSize: 12,
              letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer", boxShadow: "4px 4px 0 var(--c-ink)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* GRIGLIA PRODOTTI */}
      <section style={{ padding: "32px 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {filtered.map((p, i) => (
            <div key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                borderRadius: 28, padding: 24,
                boxShadow: hoveredId === p.id ? "14px 18px 0 var(--c-ink)" : "8px 8px 0 var(--c-ink)",
                display: "flex", flexDirection: "column",
                transform: hoveredId === p.id ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              {/* Badges */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {p.badges.map((b) => (
                  <span key={b}
                    style={{
                      background: "var(--c-acid)", color: "var(--c-ink)",
                      padding: "3px 10px", borderRadius: 999, fontSize: 10,
                      fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em",
                      border: "1.5px solid var(--c-ink)",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Immagine */}
              <Link href={`/shop/${p.id}`} style={{ display: "block" }}>
                <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0" }}>
                  <Image src={`${BASE_PATH}${p.img}`} alt={p.name} width={180} height={200}
                    style={{ objectFit: "contain", filter: "drop-shadow(6px 6px 0 rgba(0,0,0,0.12))" }} />
                </div>
              </Link>

              {/* Info */}
              <Link href={`/shop/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 900, lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: 8 }}>
                  {p.name}
                </div>
              </Link>
              <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", opacity: 0.55, marginTop: 4 }}>{p.weight}</div>
              <div style={{ fontSize: 13, marginTop: 6, opacity: 0.7, lineHeight: 1.4 }}>{p.tagline}</div>

              {/* Prezzo + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 900 }}>
                  {formatPrice(p.price)}
                </div>
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
