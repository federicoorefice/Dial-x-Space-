"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContattiPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // In produzione, qui chiamerebbe /api/contact con Resend
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", border: "2.5px solid var(--c-ink)",
    borderRadius: 14, fontSize: 15, fontFamily: "var(--font-body)",
    background: "transparent", outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
    textTransform: "uppercase" as const, marginBottom: 8, opacity: 0.6,
  };

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Contatti" />

      <section style={{ padding: "160px 32px 80px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            position: "absolute", top: 130, right: 60,
            background: "var(--c-acid)", color: "var(--c-ink)",
            fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
            boxShadow: "5px 5px 0 var(--c-ink)", transform: "rotate(-5deg)",
          }}
        >
          Risp in 24h
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Contatti
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0",
          }}
        >
          DICCI{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
              border: "3px solid var(--c-ink)", borderRadius: 24,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            TUTTO.
          </span>
        </h1>
      </section>

      <section style={{ padding: "0 32px 120px", maxWidth: 1480, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40 }}>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
            borderRadius: 28, padding: 40, boxShadow: "10px 10px 0 var(--c-ink)",
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 48, lineHeight: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Grazie!
              </div>
              <div style={{ fontSize: 16, opacity: 0.7 }}>Ti rispondiamo entro 24 ore.</div>
            </div>
          ) : (
            <>
              {[["nome", "Nome e cognome"], ["email", "Email"], ["oggetto", "Oggetto"]].map(([name, label]) => (
                <div key={name} style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    name={name} type={name === "email" ? "email" : "text"}
                    required style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Messaggio</label>
                <textarea
                  name="messaggio" required rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <button
                type="submit" disabled={loading}
                style={{
                  background: "var(--c-ink)", color: "var(--c-acid)",
                  border: "2.5px solid var(--c-ink)", borderRadius: 999,
                  padding: "16px 32px", fontWeight: 900, fontSize: 14,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "5px 5px 0 var(--c-acid)",
                }}
              >
                {loading ? "Invio..." : "Invia messaggio →"}
              </button>
            </>
          )}
        </form>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { c: "var(--c-acid)", t: "Email", v: "info@dialfunghi.it" },
            { c: "var(--c-mustard)", t: "Telefono", v: "+39 0461 534505" },
            { c: "var(--c-cream)", t: "Sede", v: "Via Dei Prati, 60 · 38057 Pergine Valsugana (TN)" },
            { c: "var(--c-ketchup)", t: "Orari", v: "Lun–Ven · 9:00 – 18:00", light: true },
          ].map((b, i) => (
            <div key={b.t}
              style={{
                background: b.c, color: b.light ? "var(--c-cream)" : "var(--c-ink)",
                border: "2.5px solid var(--c-ink)", borderRadius: 22,
                padding: 22, boxShadow: "6px 6px 0 var(--c-ink)",
                transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
                {b.t}
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, marginTop: 6, lineHeight: 1.1, textTransform: "uppercase" }}>
                {b.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
