"use client";

import { useState } from "react";
import { CartItem } from "@/lib/products";

export default function CheckoutButton({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error("Errore nel checkout");
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      setError("Errore di pagamento. Riprova tra qualche secondo.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          width: "100%", marginTop: 24,
          background: loading ? "var(--c-paper-2)" : "var(--c-ink)",
          color: "var(--c-acid)", border: "2.5px solid var(--c-ink)", borderRadius: 999,
          padding: "18px 32px", fontWeight: 900, fontSize: 15,
          letterSpacing: "0.06em", textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "6px 6px 0 var(--c-acid)", transition: "all 0.2s",
        }}
      >
        {loading ? "Attendere..." : "Procedi al pagamento →"}
      </button>
      {error && (
        <div style={{ marginTop: 12, color: "var(--c-ketchup)", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
          {error}
        </div>
      )}
    </>
  );
}
