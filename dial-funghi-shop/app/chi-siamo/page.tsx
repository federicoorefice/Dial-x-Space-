"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CERTIFICATIONS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BASE_PATH } from "@/lib/basepath";

const TIMELINE = [
  { y: "1992", t: "Nasce Dial", d: "Fondazione a Pergine Valsugana. Primo laboratorio di trasformazione funghi nel Trentino-Alto Adige.", c: "var(--c-acid)" },
  { y: "2001", t: "BRC Food", d: "Prima certificazione internazionale per la sicurezza alimentare. Entriamo nella GDO.", c: "#D9A547" },
  { y: "2005", t: "IFS Food", d: "International Featured Standard: riconoscimento dalla grande distribuzione europea.", c: "var(--c-cream)" },
  { y: "2018", t: "V-Label Vegan", d: "Certificazione vegana su tutta la gamma. Apriamo nuovi mercati.", c: "#9CB85C" },
  { y: "2020", t: "Bio EU", d: "Certificazione biologica europea. Tre ettari di coltivazioni bio.", c: "#6B9E3A", textLight: true },
  { y: "2024", t: "Fior di Funghi", d: "Lancio della prima salsa squeeze ai porcini. Un nuovo formato per il mondo retail.", c: "#C24B2B", textLight: true },
];

const B2B_CLIENTS = [
  { name: "Giovanni Rana", logo: "/images/loghi/brandforum_logotale_giovanni_rana_logo9-scaled.jpeg" },
  { name: "Parmalat", logo: "/images/loghi/Parmalat.svg" },
  { name: "McDonald's", logo: "/images/loghi/McDonalds.svg" },
  { name: "COOP", logo: "/images/loghi/Coop_Italia.svg" },
  { name: "CONAD", logo: "/images/loghi/Conad.svg" },
  { name: "Develey", logo: "/images/loghi/Develey.svg" },
  { name: "Esselunga", logo: "/images/loghi/Esselunga.svg" },
  { name: "Carrefour", logo: "/images/loghi/Carrefour.svg" },
  { name: "Lidl", logo: "/images/loghi/Lidl.svg" },
  { name: "Metro", logo: "/images/loghi/Metro.svg" },
  { name: "Eurospin", logo: "/images/loghi/Eurospin.svg" },
  { name: "Tosano", logo: "/images/loghi/Tosano.svg" },
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
  const [flippedCert, setFlippedCert] = useState<string | null>(null);
  const [flippedClient, setFlippedClient] = useState<string | null>(null);

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
        <p style={{ fontSize: 20, marginTop: 32, maxWidth: 720, lineHeight: 1.6 }}>
          Tre generazioni di una famiglia trentina dedicate a un solo frutto: il fungo. Dalla raccolta nei boschi di Pergine Valsugana alla lavorazione, ogni passo è nostro.{" "}
          <a href="https://www.dialfunghi.it" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--c-ink)", fontWeight: 800, textDecoration: "underline" }}>
            dialfunghi.it ↗
          </a>
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
          {[["33+", "Anni di storia"], ["5", "Certificazioni"], ["150+", "Clienti B2B"], ["16", "Prodotti a catalogo"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>{n}</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "60px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6, marginBottom: 32 }}>
          La nostra storia
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {TIMELINE.map((it, i) => (
            <div key={it.y}
              style={{
                background: it.c, color: it.textLight ? "var(--c-cream)" : "var(--c-ink)",
                border: "2.5px solid var(--c-ink)", borderRadius: 24,
                padding: 28, boxShadow: "8px 8px 0 var(--c-ink)",
                transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
              }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 52, lineHeight: 1, letterSpacing: "-0.04em" }}>{it.y}</div>
              <div style={{ fontWeight: 900, fontSize: 16, marginTop: 8, textTransform: "uppercase" }}>{it.t}</div>
              <div style={{ fontSize: 14, marginTop: 8, lineHeight: 1.55, opacity: it.textLight ? 0.85 : 0.75 }}>{it.d}</div>
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
              display: "inline-block", background: "#D9A547",
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
              <Image src={`${BASE_PATH}${photo.src}`} alt="Dial Funghi stabilimento" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* B2B — CLIENTI */}
      <section style={{
        background: "var(--c-ink)", color: "var(--c-cream)",
        padding: "100px 32px", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: 20 }}>
            Mercato B2B / Partner
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(42px, 7vw, 100px)",
              lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.04em",
              margin: "0 0 24px", color: "var(--c-cream)",
            }}
          >
            Loro scelgono<br />
            <span style={{ color: "var(--c-acid)" }}>Dial Funghi.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(245,239,224,0.75)", maxWidth: 600, lineHeight: 1.6, marginBottom: 60 }}>
            Da oltre 30 anni forniamo prodotti a base di funghi alle più grandi realtà della distribuzione e della ristorazione italiana ed europea. Qualità certificata, volumi industriali, filiera corta.
          </p>

          {/* Client grid — flip cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
            {B2B_CLIENTS.map((client) => {
              const isFlipped = flippedClient === client.name;
              return (
                <div
                  key={client.name}
                  onMouseEnter={() => setFlippedClient(client.name)}
                  onMouseLeave={() => setFlippedClient(null)}
                  style={{ perspective: 800, cursor: "pointer", height: 160 }}
                >
                  <div style={{
                    position: "relative", width: "100%", height: "100%",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}>
                    {/* Front — logo a colori su sfondo bianco */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: "#fff",
                      border: "2.5px solid rgba(245,239,224,0.3)",
                      borderRadius: 20,
                      boxShadow: "6px 6px 0 rgba(212,255,60,0.4)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      padding: 20, gap: 10,
                    }}>
                      <Image
                        src={`${BASE_PATH}${client.logo}`}
                        alt={client.name}
                        width={150}
                        height={64}
                        style={{ objectFit: "contain", maxHeight: 64 }}
                      />
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999" }}>
                        Partner
                      </div>
                    </div>
                    {/* Back — nome brand su acid */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "var(--c-acid)", color: "var(--c-ink)",
                      border: "2.5px solid rgba(245,239,224,0.3)",
                      borderRadius: 20,
                      boxShadow: "6px 6px 0 rgba(212,255,60,0.4)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      padding: 20, textAlign: "center",
                    }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95 }}>
                        {client.name}
                      </div>
                      <div style={{ marginTop: 12, width: 32, height: 2, background: "var(--c-ink)", borderRadius: 2 }} />
                      <div style={{ marginTop: 12, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>
                        Partner Dial Funghi
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 48, padding: 28, background: "rgba(212,255,60,0.1)", borderRadius: 24, border: "2px solid rgba(212,255,60,0.3)", maxWidth: 700 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, textTransform: "uppercase", color: "var(--c-acid)", marginBottom: 12 }}>
              ⚙️ Produzione su commessa
            </div>
            <p style={{ fontSize: 14, color: "rgba(245,239,224,0.8)", lineHeight: 1.6 }}>
              Produciamo su commessa per grandi marchi e catene. Ricette personalizzate, private label, formati dedicati. Certificazioni BRC e IFS garantiscono la massima qualità anche a volumi industriali.{" "}
              <a href="https://www.dialfunghi.it" target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--c-acid)", fontWeight: 800 }}>
                Contattaci per un preventivo →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICAZIONI — con flip 3D */}
      <section style={{ padding: "100px 32px", background: "var(--c-cream)", color: "var(--c-ink)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6, marginBottom: 20 }}>
            Le nostre certificazioni
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            QUALITÀ{" "}
            <span
              style={{
                display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)",
                padding: "0 18px", border: "3px solid var(--c-ink)", borderRadius: 18,
                transform: "rotate(-2deg)", boxShadow: "6px 6px 0 var(--c-ink)",
              }}
            >
              CERTIFICATA.
            </span>
          </h2>
          <p style={{ fontSize: 15, opacity: 0.65, marginBottom: 48 }}>
            Passa il mouse su ogni certificazione per scoprire cosa significa. ✋
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {CERTIFICATIONS.map((c) => {
              const isFlipped = flippedCert === c.id;
              return (
                <div
                  key={c.id}
                  onMouseEnter={() => setFlippedCert(c.id)}
                  onMouseLeave={() => setFlippedCert(null)}
                  style={{ perspective: 800, cursor: "pointer", height: 280 }}
                >
                  <div style={{
                    position: "relative", width: "100%", height: "100%",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}>
                    {/* Front */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: "var(--c-paper)", color: "var(--c-ink)",
                      border: "2.5px solid var(--c-ink)", borderRadius: 24,
                      padding: 24, boxShadow: "6px 6px 0 var(--c-ink)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      textAlign: "center",
                    }}>
                      <Image src={`${BASE_PATH}${c.img}`} alt={c.name} width={100} height={100} style={{ objectFit: "contain" }} />
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: 16 }}>{c.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>Dal {c.year}</div>
                      <div style={{ fontSize: 11, marginTop: 12, opacity: 0.45, fontStyle: "italic" }}>Tocca per saperne di più</div>
                    </div>
                    {/* Back */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "var(--c-acid)", color: "var(--c-ink)",
                      border: "2.5px solid var(--c-ink)", borderRadius: 24,
                      padding: 28, boxShadow: "6px 6px 0 var(--c-ink)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      textAlign: "center",
                    }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em" }}>{c.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 10 }}>Ottenuto nel {c.year}</div>
                      <div style={{ width: 40, height: 2, background: "var(--c-ink)", margin: "16px auto" }} />
                      <div style={{ fontSize: 14, lineHeight: 1.65 }}>{c.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section style={{ padding: "100px 32px", background: "var(--c-acid)", color: "var(--c-ink)", borderTop: "3px solid var(--c-ink)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(38px, 6vw, 90px)",
            lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.04em", margin: 0,
          }}>
            Vieni a<br />trovarci.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 16, lineHeight: 1.6 }}>
              <strong>Dial Funghi S.r.l.</strong><br />
              Via Dei Prati, 60<br />
              38057 Pergine Valsugana (TN)<br />
              <a href="mailto:info@dialfunghi.it" style={{ color: "var(--c-ink)", fontWeight: 700 }}>info@dialfunghi.it</a> ·{" "}
              <a href="tel:+390461534505" style={{ color: "var(--c-ink)", fontWeight: 700 }}>+39 0461 534505</a>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/contatti" style={{
                background: "var(--c-ink)", color: "var(--c-acid)",
                border: "3px solid var(--c-ink)", padding: "16px 28px",
                borderRadius: 999, fontWeight: 900, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "5px 5px 0 var(--c-ink)",
              }}>Contattaci →</Link>
              <a href="https://www.dialfunghi.it" target="_blank" rel="noopener noreferrer" style={{
                background: "transparent", color: "var(--c-ink)",
                border: "3px solid var(--c-ink)", padding: "16px 28px",
                borderRadius: 999, fontWeight: 800, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none",
              }}>dialfunghi.it ↗</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
