import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RECIPES, getRecipeById } from "@/lib/recipes";
import { getProductById } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";
import { BASE_PATH } from "@/lib/basepath";

export async function generateStaticParams() {
  return RECIPES.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = getRecipeById(id);
  if (!r) return {};
  return {
    title: `${r.title} — Ricette Dial Funghi`,
    description: r.intro ?? `Ricetta ${r.title} con ${r.tag} Dial Funghi. Pronta in ${r.time}.`,
  };
}

function isColorDark(color: string): boolean {
  if (!color.startsWith("#") || color.length < 7) return false;
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.52;
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getRecipeById(id);
  if (!r) notFound();

  const product = getProductById(r.productId);
  const related = RECIPES.filter((x) => x.tag === r.tag && x.id !== r.id).slice(0, 3);
  const darkBg = isColorDark(r.color);
  const textOnColor = darkBg ? "#ffffff" : "var(--c-ink)";
  const mutedOnColor = darkBg ? "rgba(255,255,255,0.72)" : "rgba(10,15,12,0.55)";
  const borderOnColor = darkBg ? "rgba(255,255,255,0.28)" : "rgba(10,15,12,0.2)";

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Ricette" />

      {/* Hero */}
      <section
        style={{
          background: r.color, borderBottom: "3px solid var(--c-ink)",
          padding: "140px 32px 60px",
        }}
      >
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6, marginBottom: 32, color: textOnColor }}>
            <Link href="/ricette" style={{ color: textOnColor, textDecoration: "none" }}>Ricette</Link>
            {" / "}
            {r.title}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <span style={{
              background: textOnColor, color: r.color,
              padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>{r.diff}</span>
            <span style={{
              background: "transparent", color: textOnColor,
              padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.06em", border: `1.5px solid ${borderOnColor}`,
            }}>{r.time}</span>
            {r.servings && (
              <span style={{
                background: "transparent", color: textOnColor,
                padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.06em", border: `1.5px solid ${borderOnColor}`,
              }}>{r.servings} persone</span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(42px, 7vw, 120px)",
              lineHeight: 0.88, letterSpacing: "-0.04em", textTransform: "uppercase",
              margin: "0 0 24px", color: textOnColor,
            }}
          >
            {r.title}
          </h1>

          {r.intro && (
            <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 680, color: mutedOnColor }}>
              {r.intro}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "80px 32px 80px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 60, alignItems: "start" }}>

          {/* LEFT — ingredients + steps */}
          <div>
            {/* Hero image */}
            <div style={{
              borderRadius: 28, overflow: "hidden", border: "3px solid var(--c-ink)",
              boxShadow: "10px 10px 0 var(--c-ink)", marginBottom: 56,
              height: 420, position: "relative",
            }}>
              <Image src={`${BASE_PATH}${r.img}`} alt={r.title} fill style={{ objectFit: "cover" }} />
            </div>

            {/* Ingredients */}
            {r.ingredients && (
              <div style={{ marginBottom: 56 }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 3.5vw, 48px)",
                  textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 28px",
                }}>Ingredienti</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {r.ingredients.map((ing, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 16,
                      padding: "14px 20px", borderRadius: 14,
                      background: i % 2 === 0 ? "var(--c-cream)" : "transparent",
                      border: "2px solid var(--c-ink)",
                    }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--c-ink)", opacity: 0.4, minWidth: 24 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            {r.steps && (
              <div>
                <h2 style={{
                  fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 3.5vw, 48px)",
                  textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 28px",
                }}>Preparazione</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {r.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                      <div style={{
                        flexShrink: 0,
                        width: 48, height: 48, borderRadius: "50%",
                        background: r.color, border: "2.5px solid var(--c-ink)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 900,
                        boxShadow: "3px 3px 0 var(--c-ink)",
                      }}>
                        {i + 1}
                      </div>
                      <div style={{
                        flex: 1, padding: "12px 20px",
                        background: "var(--c-cream)", borderRadius: 16,
                        border: "2px solid var(--c-ink)",
                        fontSize: 15, lineHeight: 1.65,
                      }}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                {r.tips && (
                  <div style={{
                    marginTop: 32, padding: "20px 24px",
                    background: "var(--c-acid)", border: "2.5px solid var(--c-ink)",
                    borderRadius: 18, boxShadow: "6px 6px 0 var(--c-ink)",
                  }}>
                    <div style={{ fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                      💡 Consiglio dello chef
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{r.tips}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — product card + sidebar */}
          <div style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Product CTA */}
            {product && (
              <div style={{
                background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
                borderRadius: 24, padding: 24, boxShadow: "8px 8px 0 var(--c-ink)",
              }}>
                <div style={{ fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.55, marginBottom: 16 }}>
                  Prodotto usato in questa ricetta
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <Image src={`${BASE_PATH}${product.img}`} alt={product.name} width={80} height={90}
                    style={{ objectFit: "contain" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, textTransform: "uppercase", lineHeight: 1 }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.55, marginTop: 4 }}>{product.weight}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 900, marginTop: 8 }}>
                      {product.price.toFixed(2).replace(".", ",")}€
                    </div>
                  </div>
                </div>
                <AddToCartButton product={product} />
                <Link href={`/shop/${product.id}`}
                  style={{
                    display: "block", textAlign: "center", marginTop: 10,
                    color: "var(--c-ink)", fontSize: 12, opacity: 0.5,
                    textDecoration: "none", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                  Scopri il prodotto →
                </Link>
              </div>
            )}

            {/* Quick info */}
            <div style={{
              background: r.color, border: "2.5px solid var(--c-ink)",
              borderRadius: 20, padding: 20, boxShadow: "6px 6px 0 var(--c-ink)",
              color: textOnColor,
            }}>
              <div style={{ fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, color: textOnColor }}>
                Riepilogo
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Tempo", r.time],
                  ["Difficoltà", r.diff],
                  ...(r.servings ? [["Porzioni", `${r.servings} persone`]] : []),
                  ["Categoria", r.tag],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: mutedOnColor, fontWeight: 700 }}>{label}</span>
                    <span style={{ fontWeight: 800, color: textOnColor }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ricette correlate */}
      {related.length > 0 && (
        <section style={{ padding: "0 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 60px)",
            lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 32px",
          }}>
            ALTRE RICETTE
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {related.map((rel) => (
              <Link key={rel.id} href={`/ricette/${rel.id}`}
                style={{
                  background: rel.color, border: "2.5px solid var(--c-ink)",
                  borderRadius: 24, padding: 20, boxShadow: "6px 6px 0 var(--c-ink)",
                  textDecoration: "none", color: "var(--c-ink)", display: "block",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ background: "var(--c-ink)", color: rel.color, padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>{rel.diff}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>⏱ {rel.time}</span>
                </div>
                <div style={{ height: 120, borderRadius: 10, overflow: "hidden", marginBottom: 12, position: "relative" }}>
                  <Image src={`${BASE_PATH}${rel.img}`} alt={rel.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, textTransform: "uppercase", lineHeight: 1 }}>
                  {rel.title}
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
