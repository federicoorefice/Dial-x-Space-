"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice, SHIPPING, PRODUCTS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton";
import AddToCartButton from "@/components/AddToCartButton";

export default function CarrelloPage() {
  const { items, count, subtotal, shipping, total, remove, setQty } = useCart();

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Shop" />

      <section style={{ padding: "140px 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Carrello
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(60px, 10vw, 160px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 40px",
          }}
        >
          IL TUO{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 20px",
              border: "3px solid var(--c-ink)", borderRadius: 20,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            BOSCO.
          </span>
        </h1>

        {count === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 40, textTransform: "uppercase", opacity: 0.3 }}>
              Carrello vuoto
            </div>
            <Link href="/shop"
              style={{
                display: "inline-block", marginTop: 24,
                background: "var(--c-ink)", color: "var(--c-acid)",
                border: "2.5px solid var(--c-ink)", borderRadius: 999,
                padding: "16px 32px", fontWeight: 900, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "5px 5px 0 var(--c-acid)",
              }}
            >
              Vai allo shop →
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "start" }}>
            {/* Lista prodotti */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((item) => (
                <div key={item.id}
                  style={{
                    background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                    borderRadius: 22, padding: 20, boxShadow: "6px 6px 0 var(--c-ink)",
                    display: "flex", alignItems: "center", gap: 20,
                  }}
                >
                  <Image src={item.img} alt={item.name} width={80} height={80}
                    style={{ objectFit: "contain", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, textTransform: "uppercase", lineHeight: 1 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 14, opacity: 0.6, marginTop: 4 }}>
                      {formatPrice(item.price)} cad.
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => setQty(item.id, item.qty - 1)}
                      style={{
                        width: 32, height: 32, borderRadius: "50%", border: "2px solid var(--c-ink)",
                        background: "transparent", fontSize: 16, fontWeight: 700, cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 900, minWidth: 24, textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button onClick={() => setQty(item.id, item.qty + 1)}
                      style={{
                        width: 32, height: 32, borderRadius: "50%", border: "2px solid var(--c-ink)",
                        background: "var(--c-acid)", fontSize: 16, fontWeight: 700, cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 900, minWidth: 70, textAlign: "right" }}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                  <button onClick={() => remove(item.id)}
                    style={{
                      background: "transparent", border: "none", fontSize: 18,
                      cursor: "pointer", opacity: 0.4, padding: 4,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Riepilogo */}
            <div
              style={{
                background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                borderRadius: 28, padding: 32, boxShadow: "10px 10px 0 var(--c-ink)",
                position: "sticky", top: 100,
              }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 24, textTransform: "uppercase", marginBottom: 24 }}>
                Riepilogo
              </div>

              {/* Shipping threshold bar */}
              {shipping > 0 ? (
                <div style={{
                  background: "rgba(212,255,60,0.15)", border: "2px solid var(--c-ink)",
                  borderRadius: 16, padding: "14px 16px", marginBottom: 16,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.04em", marginBottom: 10 }}>
                    🚚 Ancora{" "}
                    <span style={{ color: "#C24B2B" }}>
                      {formatPrice(SHIPPING.freeThreshold - subtotal)}
                    </span>{" "}
                    per la spedizione gratuita!
                  </div>
                  <div style={{
                    background: "rgba(10,15,12,0.12)", borderRadius: 999, height: 10,
                    overflow: "hidden", border: "1.5px solid var(--c-ink)",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${Math.min((subtotal / SHIPPING.freeThreshold) * 100, 100)}%`,
                      background: "var(--c-ink)", borderRadius: 999,
                      transition: "width 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }} />
                  </div>
                </div>
              ) : (
                <div style={{
                  background: "var(--c-acid)", border: "2px solid var(--c-ink)",
                  borderRadius: 16, padding: "12px 16px", marginBottom: 16,
                  fontWeight: 900, fontSize: 14, textAlign: "center",
                }}>
                  🎉 Spedizione gratuita!
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                  <span>Subtotale</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                  <span>Spedizione</span>
                  <span style={{ fontWeight: 700 }}>
                    {shipping === 0 ? (
                      <span style={{ color: "#2a7a3b", fontWeight: 800 }}>GRATIS ✓</span>
                    ) : formatPrice(shipping)}
                  </span>
                </div>
                <div style={{ borderTop: "2px solid var(--c-ink)", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, textTransform: "uppercase" }}>Totale</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 900 }}>{formatPrice(total)}</span>
                </div>
                <div style={{ fontSize: 11, opacity: 0.4, textAlign: "right" }}>IVA inclusa</div>
              </div>

              <CheckoutButton items={items} />

              <Link href="/shop"
                style={{
                  display: "block", textAlign: "center", marginTop: 12,
                  color: "var(--c-ink)", fontSize: 12, opacity: 0.5,
                  textDecoration: "none", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                ← Continua lo shopping
              </Link>
            </div>
          </div>
        )}

        {/* UPSELL — suggerimenti */}
        {count > 0 && (() => {
          const suggestions = PRODUCTS.filter((p) => !items.some((i) => i.id === p.id)).slice(0, 3);
          if (suggestions.length === 0) return null;
          return (
            <div style={{ marginTop: 80, paddingTop: 60, borderTop: "3px solid var(--c-ink)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: 12 }}>
                Potrebbe piacerti anche
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 72px)",
                lineHeight: 0.88, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "0 0 40px",
              }}>
                Completa il<br />
                <span style={{ background: "var(--c-acid)", padding: "0 16px", border: "3px solid var(--c-ink)", borderRadius: 16, display: "inline-block" }}>
                  tuo bosco.
                </span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                {suggestions.map((p) => (
                  <div key={p.id} style={{
                    background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                    borderRadius: 24, padding: 20, boxShadow: "6px 6px 0 var(--c-ink)",
                    display: "flex", flexDirection: "column",
                  }}>
                    <Link href={`/shop/${p.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 140, textDecoration: "none" }}>
                      <Image src={p.img} alt={p.name} width={140} height={140} style={{ objectFit: "contain" }} />
                    </Link>
                    <Link href={`/shop/${p.id}`} style={{ textDecoration: "none", color: "var(--c-ink)" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginTop: 8 }}>
                        {p.name}
                      </div>
                    </Link>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{p.tagline}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14 }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 900 }}>
                        {formatPrice(p.price)}
                      </span>
                      <AddToCartButton product={p} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      <Footer />
    </div>
  );
}
