import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, CERTIFICATIONS, formatPrice } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          padding: "160px 32px 100px", maxWidth: 1480, margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute", top: 140, right: 80,
            background: "var(--c-ketchup)", color: "var(--c-cream)",
            fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
            boxShadow: "5px 5px 0 var(--c-ink)", transform: "rotate(4deg)",
          }}
        >
          Dal 1992
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)", fontSize: 12,
            letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6,
          }}
        >
          Dial Funghi / Trentino · Italia
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase",
            margin: "16px 0 0",
          }}
        >
          IL BOSCO{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
              border: "3px solid var(--c-ink)", borderRadius: 24,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            IN TASCA.
          </span>
        </h1>

        <p style={{ fontSize: 20, marginTop: 32, maxWidth: 600, lineHeight: 1.5 }}>
          Le prime salse squeeze ai porcini trentini. Pasta, risotto, burger, brunch —
          il gusto del bosco sempre con te.
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
          <Link href="/shop"
            style={{
              background: "var(--c-ink)", color: "var(--c-acid)",
              border: "2.5px solid var(--c-ink)", borderRadius: 999,
              padding: "18px 36px", fontWeight: 900, fontSize: 15,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", boxShadow: "6px 6px 0 var(--c-acid)",
            }}
          >
            Shop ora →
          </Link>
          <Link href="/ricette"
            style={{
              background: "transparent", color: "var(--c-ink)",
              border: "2.5px solid var(--c-ink)", borderRadius: 999,
              padding: "18px 36px", fontWeight: 900, fontSize: 15,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", boxShadow: "6px 6px 0 var(--c-ink)",
            }}
          >
            Ricette
          </Link>
        </div>
      </section>

      {/* FIOR DI FUNGHI */}
      <section style={{ padding: "80px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: 40, flexWrap: "wrap", gap: 16,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(40px, 6vw, 90px)",
              lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0,
            }}
          >
            FIOR DI{" "}
            <span
              style={{
                display: "inline-block", background: "var(--c-mustard)",
                padding: "0 16px", border: "3px solid var(--c-ink)",
                borderRadius: 16, transform: "rotate(2deg)",
                boxShadow: "5px 5px 0 var(--c-ink)",
              }}
            >
              FUNGHI
            </span>
          </h2>
          <Link href="/shop?cat=fior-di-funghi"
            style={{
              color: "var(--c-ink)", fontWeight: 800, fontSize: 13,
              letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none",
              opacity: 0.6,
            }}
          >
            Vedi tutti →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {featured.filter((p) => p.category === "fior-di-funghi").map((p, i) => (
            <div
              key={p.id}
              style={{
                background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                borderRadius: 28, padding: 24, boxShadow: "8px 8px 0 var(--c-ink)",
                transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                display: "flex", flexDirection: "column",
              }}
            >
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

              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0" }}>
                <Image src={p.img} alt={p.name} width={180} height={200}
                  style={{ objectFit: "contain", filter: "drop-shadow(6px 6px 0 rgba(0,0,0,0.12))" }} />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 900,
                  lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: 8,
                }}
              >
                {p.name}
              </div>
              <div style={{ fontSize: 13, marginTop: 6, opacity: 0.7, lineHeight: 1.4 }}>{p.tagline}</div>

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

      {/* NUMERI */}
      <section style={{ background: "var(--c-ink)", color: "var(--c-cream)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {[
            { n: "30+", l: "anni di esperienza" },
            { n: "16", l: "prodotti nel catalogo" },
            { n: "5", l: "certificazioni" },
            { n: "€30", l: "spedizione gratuita" },
          ].map((s) => (
            <div key={s.n} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1, color: "var(--c-acid)" }}>
                {s.n}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.6, marginTop: 8 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICAZIONI */}
      <section style={{ padding: "100px 32px", background: "var(--c-ink)", color: "var(--c-cream)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em",
              margin: "0 0 60px", color: "var(--c-cream)",
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {CERTIFICATIONS.map((c) => (
              <div key={c.id}
                style={{
                  background: "var(--c-cream)", color: "var(--c-ink)",
                  border: "2.5px solid var(--c-cream)", borderRadius: 24,
                  padding: 24, boxShadow: "6px 6px 0 var(--c-acid)", textAlign: "center",
                }}
              >
                <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Image src={c.img} alt={c.name} width={100} height={100} style={{ objectFit: "contain", maxHeight: 100 }} />
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, textTransform: "uppercase" }}>{c.name}</div>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
                  Dal {c.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
