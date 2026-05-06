import Image from "next/image";
import { CERTIFICATIONS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Siamo — Dial Funghi",
  description: "Dal 1992 a Pergine Valsugana. Tre generazioni trentine dedicate al fungo.",
};

const TIMELINE = [
  { y: "1992", t: "Inizio", d: "Il primo laboratorio di trasformazione funghi a Trento.", c: "var(--c-acid)" },
  { y: "2001", t: "BRC Food", d: "Prima certificazione internazionale di sicurezza alimentare.", c: "var(--c-mustard)" },
  { y: "2018", t: "V-Label", d: "Linea vegana certificata.", c: "var(--c-cream)" },
  { y: "2024", t: "Fior di Funghi", d: "Lancio della prima salsa squeeze ai porcini.", c: "var(--c-ketchup)", textLight: true },
];

const PHOTOS = [
  { src: "/images/azienda/stabilimento-1.jpg", h: 480 },
  { src: "/images/azienda/macchinario-1.png", h: 480 },
  { src: "/images/azienda/lab-1.png", h: 280 },
  { src: "/images/azienda/lab-2.jpg", h: 280 },
  { src: "/images/azienda/macchinario-2.png", h: 280 },
  { src: "/images/azienda/stabilimento-2.jpg", h: 280 },
];

export default function ChiSiamoPage() {
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Chi Siamo" />

      {/* HERO */}
      <section style={{ padding: "160px 32px 80px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            position: "absolute", top: 130, right: 80,
            background: "var(--c-acid)", color: "var(--c-ink)",
            fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
            boxShadow: "5px 5px 0 var(--c-ink)", transform: "rotate(-5deg)",
          }}
        >
          Dal 1992
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Chi siamo / Storia
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0",
          }}
        >
          PIÙ DI{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
              border: "3px solid var(--c-ink)", borderRadius: 24,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            30 ANNI
          </span>
          <br />NEL BOSCO.
        </h1>
        <p style={{ fontSize: 20, marginTop: 32, maxWidth: 720, lineHeight: 1.5 }}>
          Tre generazioni di una famiglia trentina dedicate a un solo frutto: il fungo. Dalla raccolta alla lavorazione, ogni passo è nostro.
        </p>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "60px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TIMELINE.map((it, i) => (
            <div key={it.y}
              style={{
                background: it.c, color: it.textLight ? "var(--c-cream)" : "var(--c-ink)",
                border: "2.5px solid var(--c-ink)", borderRadius: 24,
                padding: 28, boxShadow: "8px 8px 0 var(--c-ink)",
                transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
              }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 56, lineHeight: 1, letterSpacing: "-0.04em" }}>{it.y}</div>
              <div style={{ fontWeight: 900, fontSize: 18, marginTop: 8, textTransform: "uppercase" }}>{it.t}</div>
              <div style={{ fontSize: 14, marginTop: 8, lineHeight: 1.5, opacity: it.textLight ? 0.85 : 0.75 }}>{it.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOTO STABILIMENTO */}
      <section style={{ padding: "80px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
            lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 40px",
          }}
        >
          DENTRO IL{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-mustard)",
              padding: "0 18px", border: "3px solid var(--c-ink)", borderRadius: 18,
              transform: "rotate(2deg)", boxShadow: "6px 6px 0 var(--c-ink)",
            }}
          >
            LAB.
          </span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, gridAutoRows: "minmax(240px, auto)" }}>
          {PHOTOS.map((photo, i) => (
            <div key={i}
              style={{
                border: "2.5px solid var(--c-ink)", borderRadius: 24,
                overflow: "hidden", boxShadow: "6px 6px 0 var(--c-ink)",
                height: photo.h, gridColumn: i === 0 ? "1" : "auto",
                position: "relative",
              }}
            >
              <Image src={photo.src} alt="Dial Funghi stabilimento" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICAZIONI */}
      <section style={{ padding: "100px 32px", background: "var(--c-ink)", color: "var(--c-cream)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
            Le nostre certificazioni
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em",
              margin: "16px 0 60px", color: "var(--c-cream)",
            }}
          >
            QUALITÀ{" "}
            <span
              style={{
                display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)",
                padding: "0 18px", border: "3px solid var(--c-cream)", borderRadius: 18,
                transform: "rotate(-2deg)", boxShadow: "6px 6px 0 var(--c-acid)",
              }}
            >
              CERTIFICATA.
            </span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {CERTIFICATIONS.map((c) => (
              <div key={c.id}
                style={{
                  background: "var(--c-cream)", color: "var(--c-ink)",
                  border: "2.5px solid var(--c-cream)", borderRadius: 24,
                  padding: 24, boxShadow: "6px 6px 0 var(--c-acid)", textAlign: "center",
                }}
              >
                <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative" }}>
                  <Image src={c.img} alt={c.name} width={110} height={110} style={{ objectFit: "contain" }} />
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{c.name}</div>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Dal {c.year}</div>
                <div style={{ fontSize: 12, marginTop: 12, lineHeight: 1.5, opacity: 0.75 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
