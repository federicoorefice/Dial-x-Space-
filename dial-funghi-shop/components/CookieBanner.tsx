"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) setVisible(true);
    } catch {
      // localStorage non disponibile (SSR/privato)
    }
  }, []);

  const accept = (type: "all" | "necessary") => {
    try {
      localStorage.setItem("cookie-consent", type);
    } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9000,
        background: "var(--c-ink)", color: "var(--c-cream)",
        borderTop: "3px solid var(--c-acid)",
        padding: "20px 32px",
        display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.35)",
        animation: "slideUpBanner 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <style>{`
        @keyframes slideUpBanner {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{
          fontFamily: "var(--font-heading)", fontSize: 18,
          textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 6,
        }}>
          🍪 Questo sito usa cookie
        </div>
        <p style={{ fontSize: 13, color: "rgba(245,239,224,0.7)", lineHeight: 1.55, margin: 0 }}>
          Utilizziamo cookie tecnici necessari al funzionamento e, previo consenso, cookie analitici per migliorare la tua esperienza.{" "}
          <Link href="/privacy" style={{ color: "var(--c-acid)", fontWeight: 700, textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/cookie" style={{ color: "var(--c-acid)", fontWeight: 700, textDecoration: "underline" }}>
            Cookie Policy
          </Link>
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        <button
          onClick={() => accept("necessary")}
          style={{
            background: "transparent", color: "var(--c-cream)",
            border: "2px solid rgba(245,239,224,0.35)", borderRadius: 999,
            padding: "11px 22px", fontWeight: 700, fontSize: 12,
            letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Solo necessari
        </button>
        <button
          onClick={() => accept("all")}
          style={{
            background: "var(--c-acid)", color: "var(--c-ink)",
            border: "2.5px solid var(--c-acid)", borderRadius: 999,
            padding: "11px 24px", fontWeight: 900, fontSize: 12,
            letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
            boxShadow: "4px 4px 0 rgba(212,255,60,0.4)",
            fontFamily: "inherit",
          }}
        >
          Accetta tutto
        </button>
      </div>
    </div>
  );
}
