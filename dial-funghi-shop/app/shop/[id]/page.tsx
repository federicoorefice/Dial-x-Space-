import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProductById, formatPrice } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProductById(id);
  if (!p) return {};
  return {
    title: `${p.name} — Dial Funghi`,
    description: p.desc,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProductById(id);
  if (!p) notFound();

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Shop" />

      <section style={{ padding: "140px 32px 80px", maxWidth: 1480, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 40 }}>
          <Link href="/shop" style={{ color: "inherit", textDecoration: "none" }}>Shop</Link>
          {" / "}
          {p.name}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Immagine */}
          <div
            style={{
              background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 32,
              padding: 60, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "10px 10px 0 var(--c-ink)", minHeight: 400,
            }}
          >
            <Image src={p.img} alt={p.name} width={300} height={350}
              style={{ objectFit: "contain", filter: "drop-shadow(8px 8px 0 rgba(0,0,0,0.15))" }} />
          </div>

          {/* Info */}
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {p.badges.map((b) => (
                <span key={b}
                  style={{
                    background: "var(--c-acid)", color: "var(--c-ink)",
                    padding: "4px 12px", borderRadius: 999, fontSize: 11,
                    fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em",
                    border: "1.5px solid var(--c-ink)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0,
              }}
            >
              {p.name}
            </h1>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.5, marginTop: 8 }}>
              {p.weight}
            </div>
            <p style={{ fontSize: 16, marginTop: 20, lineHeight: 1.6, opacity: 0.8 }}>{p.desc}</p>

            <div style={{ fontFamily: "var(--font-heading)", fontSize: 48, fontWeight: 900, margin: "24px 0" }}>
              {formatPrice(p.price)}
              <span style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 400, opacity: 0.5, marginLeft: 8 }}>
                IVA inclusa
              </span>
            </div>

            <AddToCartButton product={p} />

            <div style={{ marginTop: 16, fontSize: 12, opacity: 0.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Spedizione gratuita sopra €30
            </div>

            {p.ingredients && (
              <div style={{ marginTop: 32, padding: 20, border: "2px solid var(--c-ink)", borderRadius: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: 8 }}>
                  Ingredienti
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.75 }}>{p.ingredients}</div>
              </div>
            )}

            {p.usage && (
              <div style={{ marginTop: 16, padding: 20, background: "var(--c-acid)", border: "2px solid var(--c-ink)", borderRadius: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: 8 }}>
                  Come si usa
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>{p.usage}</div>
              </div>
            )}

            {p.ideas && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: 10 }}>
                  Perfetto con
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.ideas.map((idea) => (
                    <span key={idea}
                      style={{
                        border: "2px solid var(--c-ink)", borderRadius: 999,
                        padding: "6px 14px", fontSize: 12, fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.04em",
                      }}
                    >
                      {idea}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRODOTTI CORRELATI */}
      {related.length > 0 && (
        <section style={{ padding: "60px 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4vw, 60px)",
              lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 32px",
            }}
          >
            POTREBBE PIACERTI
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {related.map((r) => (
              <Link key={r.id} href={`/shop/${r.id}`}
                style={{
                  background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                  borderRadius: 24, padding: 20, boxShadow: "6px 6px 0 var(--c-ink)",
                  textDecoration: "none", color: "inherit", display: "block",
                }}
              >
                <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Image src={r.img} alt={r.name} width={140} height={160}
                    style={{ objectFit: "contain", filter: "drop-shadow(4px 4px 0 rgba(0,0,0,0.1))" }} />
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, textTransform: "uppercase", lineHeight: 1 }}>
                  {r.name}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 900, marginTop: 8 }}>
                  {formatPrice(r.price)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
