"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { PRODUCTS, CERTIFICATIONS, formatPrice, type Product } from "@/lib/products";

const FIOR = PRODUCTS.filter((p) => p.brand === "fior");

/* ── Loading Screen ──────────────────────────────────────────── */
function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(64px, 14vw, 160px)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#D4271A",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            DIAL<br />FUNGHI
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            style={{
              marginTop: 32, width: 56, height: 3, background: "#D4271A",
              transformOrigin: "left",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── 3D Drag Bottle ──────────────────────────────────────────── */
function DragBottle({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const dragging = useRef(false);

  const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 24 });
  const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 24 });

  useEffect(() => {
    rotateY.set(0);
    rotateX.set(0);
  }, [product.id, rotateX, rotateY]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0, startY = 0, startRY = 0, startRX = 0;

    const onDown = (e: MouseEvent) => {
      dragging.current = true;
      startX = e.clientX; startY = e.clientY;
      startRY = rotateY.get(); startRX = rotateX.get();
    };
    const onTouchStart = (e: TouchEvent) => {
      dragging.current = true;
      const t = e.touches[0];
      startX = t.clientX; startY = t.clientY;
      startRY = rotateY.get(); startRX = rotateX.get();
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      rotateY.set(startRY + (e.clientX - startX) * 0.6);
      rotateX.set(startRX - (e.clientY - startY) * 0.4);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      rotateY.set(startRY + (t.clientX - startX) * 0.6);
      rotateX.set(startRX - (t.clientY - startY) * 0.4);
    };
    const onUp = () => { dragging.current = false; };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [product.id, rotateX, rotateY]);

  return (
    <div style={{ position: "relative", aspectRatio: "1", maxWidth: 580, margin: "0 auto", width: "100%" }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at center, ${product.color}50 0%, transparent 65%)`,
        borderRadius: "50%",
      }} />

      {/* Orbiting sticker */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <div style={{
          position: "absolute", top: "5%", left: "50%",
          transform: "translateX(-50%) rotate(-8deg)",
          background: "var(--c-acid)", color: "var(--c-ink)",
          border: "3px solid var(--c-ink)", borderRadius: 999,
          padding: "10px 20px", fontWeight: 900, fontSize: 13,
          letterSpacing: "0.08em", textTransform: "uppercase",
          boxShadow: "4px 4px 0 var(--c-ink)", whiteSpace: "nowrap",
        }}>180g · Squeeze</div>
      </motion.div>

      {/* Bottle with 3D drag */}
      <AnimatePresence mode="wait">
        <motion.div
          ref={ref}
          key={product.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", inset: "12%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "grab", userSelect: "none", touchAction: "none",
            perspective: 1000,
          }}
        >
          <motion.img
            src={product.img}
            alt={product.name}
            draggable={false}
            style={{
              maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.3))",
              rotateY: sRotateY,
              rotateX: sRotateX,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Drag hint */}
      <div style={{
        position: "absolute", bottom: -28, left: "50%",
        transform: "translateX(-50%)",
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 11, fontWeight: 700, color: "var(--c-ink)",
        textTransform: "uppercase", letterSpacing: "0.08em",
        background: "var(--c-cream)", padding: "7px 14px",
        borderRadius: 999, border: "2px solid var(--c-ink)",
        whiteSpace: "nowrap",
      }}>
        ✋ Trascina per ruotare
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [activeBottle, setActiveBottle] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const product = FIOR[activeBottle];

  return (
    <>
      <LoadingScreen done={loaded} />

      <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
        <Navbar />

        {/* ── HERO ────────────────────────────────── */}
        <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#000" }}>
          {/* Video background */}
          <video
            src="/images/hero-video.mp4"
            autoPlay muted loop playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: "brightness(0.65) saturate(1.15)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.68) 100%)",
          }} />

          {/* Floating stickers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={loaded ? { opacity: 1, scale: 1, rotate: -8 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 18 }}
            style={{
              position: "absolute", top: "22%", left: "6%", zIndex: 5,
              background: "var(--c-acid)", color: "var(--c-ink)",
              fontWeight: 900, fontSize: 13, letterSpacing: "0.06em",
              textTransform: "uppercase", padding: "8px 16px",
              borderRadius: 999, border: "2.5px solid var(--c-ink)",
              boxShadow: "5px 5px 0 var(--c-ink)",
            }}
          >⭐ Dal 1992</motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={loaded ? { opacity: 1, scale: 1, rotate: 6 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 18 }}
            style={{
              position: "absolute", top: "30%", right: "8%", zIndex: 5,
              background: "#D9A547", color: "var(--c-ink)",
              fontWeight: 900, fontSize: 13, letterSpacing: "0.06em",
              textTransform: "uppercase", padding: "8px 16px",
              borderRadius: 999, border: "2.5px solid var(--c-ink)",
              boxShadow: "5px 5px 0 var(--c-ink)",
            }}
          >100% Trentino</motion.div>

          {/* Center content */}
          <div style={{
            position: "relative", zIndex: 3,
            minHeight: "100vh",
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            padding: "120px 24px 140px", textAlign: "center",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                marginBottom: 24,
                background: "var(--c-cream)", color: "var(--c-ink)",
                padding: "6px 18px", borderRadius: 999,
                fontSize: 12, fontWeight: 800, letterSpacing: "0.12em",
                textTransform: "uppercase", border: "2px solid var(--c-ink)",
                display: "inline-block",
              }}
            >
              🌲 Dial Funghi · Pergine Valsugana
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(72px, 14vw, 240px)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "var(--c-cream)", margin: 0,
                textShadow: "0 4px 40px rgba(0,0,0,0.5)",
              }}
            >
              Funghi<br />
              <span style={{
                display: "inline-block",
                background: "var(--c-acid)", color: "var(--c-ink)",
                padding: "0 24px",
                border: "4px solid var(--c-ink)", borderRadius: 24,
                transform: "rotate(-2deg)", margin: "8px 0",
              }}>From&nbsp;the</span>
              <br />Bosco
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.7 }}
              style={{
                marginTop: 40, color: "var(--c-cream)",
                fontSize: 20, fontWeight: 500, maxWidth: 600,
                textShadow: "0 2px 20px rgba(0,0,0,0.6)", lineHeight: 1.5,
              }}
            >
              La prima salsa ai funghi in formato squeeze.<br />
              Selezione manuale, lavorazione artigianale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
            >
              <Link href="/shop" style={{
                background: "var(--c-acid)", color: "var(--c-ink)",
                border: "3px solid var(--c-ink)", padding: "20px 40px",
                borderRadius: 999, fontWeight: 900, fontSize: 16,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "6px 6px 0 var(--c-ink)",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>Compra Ora →</Link>
              <Link href="/ricette" style={{
                background: "transparent", color: "var(--c-cream)",
                border: "3px solid var(--c-cream)", padding: "20px 40px",
                borderRadius: 999, fontWeight: 800, fontSize: 16,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none",
              }}>Ricette</Link>
            </motion.div>
          </div>

          {/* Marquee bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "var(--c-acid)", borderTop: "3px solid var(--c-ink)",
            overflow: "hidden", zIndex: 4,
          }}>
            <motion.div
              animate={{ x: [0, -1400] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex", gap: 32, padding: "14px 0", whiteSpace: "nowrap" }}
            >
              {Array.from({ length: 4 }).flatMap((_, i) =>
                ["🍄 PORCINI E SPECK", "✨ TARTUFO E PECORINO", "🔥 PAPRIKA E BBQ", "🌶️ TERIYAKI E ZENZERO", "⭐ DAL 1992", "🌲 100% TRENTINO"].map((t, j) => (
                  <span key={`${i}-${j}`} style={{ fontWeight: 900, fontSize: 18, color: "var(--c-ink)", letterSpacing: "0.04em" }}>{t}</span>
                ))
              )}
            </motion.div>
          </div>
        </section>

        {/* ── SQUEEZE & BOOM! ──────────────────────── */}
        <section style={{
          background: "var(--c-cream)", position: "relative",
          overflow: "hidden", padding: "120px 0 160px",
          borderTop: "3px solid var(--c-ink)",
        }}>
          <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px" }}>
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 60, flexWrap: "wrap", gap: 24,
            }}>
              <div>
                <div style={{
                  display: "inline-block",
                  background: "var(--c-acid)", color: "var(--c-ink)",
                  padding: "8px 16px", borderRadius: 999,
                  border: "2.5px solid var(--c-ink)",
                  fontWeight: 900, fontSize: 12, letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 20,
                  boxShadow: "4px 4px 0 var(--c-ink)",
                }}>⚡ La Gamma</div>
                <h2 style={{
                  fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(56px, 9vw, 140px)",
                  lineHeight: 0.88, margin: 0,
                  textTransform: "uppercase", letterSpacing: "-0.04em",
                  color: "var(--c-ink)",
                }}>
                  Squeeze<br />
                  <span style={{ color: "#C24B2B" }}>& Boom!</span>
                </h2>
              </div>
              <p style={{ fontSize: 18, fontWeight: 500, maxWidth: 380, color: "var(--c-ink)", lineHeight: 1.5 }}>
                Quattro salse ai funghi pronte all'uso. Squeeze, condisci, gustati l'effetto.
              </p>
            </div>

            {/* Grid: info + bottle */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
              gap: 60, alignItems: "center",
            }}>
              {/* Left — product info */}
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div style={{
                      display: "inline-block",
                      background: product.color, color: "var(--c-cream)",
                      padding: "10px 18px", border: "2.5px solid var(--c-ink)",
                      borderRadius: 999, fontWeight: 800, fontSize: 12,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      marginBottom: 24, boxShadow: "4px 4px 0 var(--c-ink)",
                    }}>Gusto #{activeBottle + 1}</div>

                    <h3 style={{
                      fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(40px, 5vw, 76px)",
                      lineHeight: 0.92, margin: 0,
                      textTransform: "uppercase", letterSpacing: "-0.03em",
                      color: "var(--c-ink)",
                    }}>{product.name}</h3>

                    <p style={{
                      marginTop: 16, fontStyle: "italic",
                      fontSize: 22, color: product.color, lineHeight: 1.3,
                    }}>"{product.tagline}"</p>

                    <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.55, color: "var(--c-ink)", maxWidth: 480 }}>
                      {product.desc}
                    </p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
                      {product.badges.map((b) => (
                        <span key={b} style={{
                          background: "var(--c-ink)", color: "var(--c-cream)",
                          padding: "6px 14px", borderRadius: 999, fontSize: 11,
                          fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                        }}>{b}</span>
                      ))}
                    </div>

                    <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                        fontWeight: 900, fontSize: 52, color: "var(--c-ink)", letterSpacing: "-0.02em",
                      }}>{formatPrice(product.price)}</span>
                      <AddToCartButton product={product} />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Flavor tabs */}
                <div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {FIOR.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveBottle(i)}
                      style={{
                        padding: "10px 18px", borderRadius: 999,
                        border: "2.5px solid var(--c-ink)",
                        background: i === activeBottle ? p.color : "transparent",
                        color: i === activeBottle ? "var(--c-cream)" : "var(--c-ink)",
                        fontWeight: 800, fontSize: 12, letterSpacing: "0.06em",
                        textTransform: "uppercase", cursor: "pointer",
                        transition: "all 0.3s",
                        boxShadow: i === activeBottle ? "4px 4px 0 var(--c-ink)" : "none",
                      }}
                    >
                      {p.name.split(" e ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — 3D draggable bottle */}
              <DragBottle product={product} />
            </div>
          </div>
        </section>

        {/* ── CERTIFICAZIONI ───────────────────────── */}
        <section style={{
          background: "var(--c-ink)", color: "var(--c-cream)",
          padding: "80px 0", position: "relative",
          overflow: "hidden", borderTop: "3px solid var(--c-ink)",
        }}>
          <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px", marginBottom: 50 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
              <div>
                <div style={{
                  display: "inline-block",
                  background: "var(--c-acid)", color: "var(--c-ink)",
                  padding: "8px 16px", borderRadius: 999,
                  border: "2.5px solid var(--c-cream)",
                  fontWeight: 900, fontSize: 12, letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 16,
                }}>🏅 5 Certificazioni</div>
                <h2 style={{
                  fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(40px, 6vw, 80px)",
                  lineHeight: 0.9, margin: 0,
                  textTransform: "uppercase", letterSpacing: "-0.03em",
                }}>
                  Certificati,<br />certificati,<br />
                  <span style={{ color: "var(--c-acid)" }}>certificati.</span>
                </h2>
              </div>
              <p style={{ maxWidth: 360, fontSize: 16, color: "rgba(245,239,224,0.75)", lineHeight: 1.55 }}>
                Standard internazionali per ogni fase: dalla raccolta in bosco al barattolo. Niente compromessi.
              </p>
            </div>
          </div>

          {/* Scrolling carousel */}
          <div style={{
            overflow: "hidden",
            borderTop: "2px solid rgba(245,239,224,0.15)",
            borderBottom: "2px solid rgba(245,239,224,0.15)",
            padding: "40px 0",
            background: "rgba(0,0,0,0.2)",
          }}>
            <motion.div
              animate={{ x: [0, -1600] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex", gap: 80, alignItems: "center" }}
            >
              {[...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS].map((c, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, minWidth: 200 }}>
                  <div style={{
                    background: "var(--c-cream)", borderRadius: 24, padding: 20,
                    width: 140, height: 140,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "6px 6px 0 var(--c-acid)",
                  }}>
                    <Image src={c.img} alt={c.name} width={100} height={100} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(245,239,224,0.5)", marginTop: 4 }}>dal {c.year}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PERGINE VALSUGANA ─────────────────────── */}
        <section style={{
          background: "var(--c-ink)", color: "var(--c-cream)",
          padding: "140px 0", position: "relative",
          overflow: "hidden", borderTop: "3px solid var(--c-ink)",
        }}>
          <div style={{
            maxWidth: 1480, margin: "0 auto", padding: "0 32px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 80, alignItems: "center",
          }}>
            {/* Left — text */}
            <div>
              <div style={{
                display: "inline-block",
                background: "var(--c-acid)", color: "var(--c-ink)",
                padding: "8px 16px", borderRadius: 999,
                border: "2.5px solid var(--c-cream)",
                fontWeight: 900, fontSize: 12, letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: 24,
              }}>🌲 Da 33 anni</div>

              <h2 style={{
                fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(48px, 7vw, 110px)",
                lineHeight: 0.88, margin: 0,
                textTransform: "uppercase", letterSpacing: "-0.04em",
              }}>
                Pergine<br />Valsugana,<br />
                <span style={{ color: "var(--c-acid)" }}>Trentino.</span>
              </h2>

              <p style={{ marginTop: 32, fontSize: 19, color: "rgba(245,239,224,0.8)", lineHeight: 1.55, maxWidth: 480 }}>
                Cinque generazioni di raccoglitori. Dieci ettari di bosco. Una sola ossessione: tirare fuori l'umami che la natura ci regala.{" "}
                <strong style={{ color: "var(--c-cream)" }}>Senza scorciatoie.</strong>
              </p>

              <div style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap" }}>
                {[["33", "anni di storia"], ["10", "ettari di bosco"], ["5", "certificazioni"], ["16", "prodotti"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontWeight: 900, fontSize: 52, color: "var(--c-acid)", lineHeight: 1, letterSpacing: "-0.03em" }}>{n}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,239,224,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>

              <Link href="/chi-siamo" style={{
                marginTop: 40, display: "inline-flex",
                alignItems: "center", gap: 10,
                background: "var(--c-acid)", color: "var(--c-ink)",
                border: "3px solid var(--c-acid)", padding: "16px 28px",
                borderRadius: 999, fontWeight: 900, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "5px 5px 0 var(--c-cream)",
              }}>La nostra storia →</Link>
            </div>

            {/* Right — company building photo */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "relative", aspectRatio: "4/5",
                borderRadius: 32, overflow: "hidden",
                border: "3px solid var(--c-cream)",
                boxShadow: "10px 10px 0 var(--c-acid)",
              }}>
                <Image
                  src="/images/azienda/stabilimento-1.jpg"
                  alt="Stabilimento Dial Funghi · Pergine Valsugana"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{
                position: "absolute", top: -16, left: -16,
                background: "#C24B2B", color: "var(--c-cream)",
                fontWeight: 900, fontSize: 12, letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "8px 16px", borderRadius: 999,
                border: "2.5px solid var(--c-cream)",
                boxShadow: "4px 4px 0 var(--c-cream)",
                transform: "rotate(-8deg)",
              }}>🌲 Bosco vivo</div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
