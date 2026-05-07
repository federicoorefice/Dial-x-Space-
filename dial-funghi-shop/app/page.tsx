"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { PRODUCTS, CERTIFICATIONS, formatPrice, type Product } from "@/lib/products";
import { BASE_PATH } from "@/lib/basepath";

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
          >
            <Image
              src={`${BASE_PATH}/images/logo-dial.png`}
              alt="Dial Funghi"
              width={220}
              height={220}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
              priority
            />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            style={{
              marginTop: 24, width: 56, height: 3, background: "#D4271A",
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
  // containerRef stays mounted permanently — never inside AnimatePresence
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const dragging = useRef(false);

  const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 24 });
  const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 24 });

  // Reset rotation on product switch
  useEffect(() => {
    rotateY.set(0);
    rotateX.set(0);
  }, [product.id, rotateX, rotateY]);

  // Event listeners attach once to the stable container — never re-registers
  useEffect(() => {
    const el = containerRef.current;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // containerRef is stable; rotateY/rotateX are stable MotionValue refs

  return (
    <div style={{ position: "relative", aspectRatio: "1", maxWidth: 580, margin: "0 auto", width: "100%" }}>
      {/* Radial glow — animates with product color */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at center, ${product.color}50 0%, transparent 65%)`,
        borderRadius: "50%",
        transition: "background 0.5s ease",
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

      {/* Stable drag container — ref lives here, never unmounts */}
      <div
        ref={containerRef}
        style={{
          position: "absolute", inset: "12%",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "grab", userSelect: "none", touchAction: "none",
          perspective: 1000,
        }}
      >
        {/* Only the bottle image transitions between products */}
        <AnimatePresence mode="wait">
          <motion.img
            key={product.id}
            src={`${BASE_PATH}${product.img}`}
            alt={product.name}
            draggable={false}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.3))",
              rotateY: sRotateY,
              rotateX: sRotateX,
            }}
          />
        </AnimatePresence>
      </div>

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

/* ── Reviews data ───────────────────────────────────────────── */
const REVIEWS = [
  {
    id: "r1", name: "Marco T.", location: "Milano", stars: 5,
    text: "Ho messo la salsa ai porcini su tutto: pasta, bruschetta, risotto. Un barattolo non basta mai.",
    product: "Porcini e Speck", color: "#D4FF3C",
  },
  {
    id: "r2", name: "Laura B.", location: "Roma", stars: 5,
    text: "Finalmente qualcosa che sa davvero di bosco. Il Tartufo e Pecorino ogni venerdì sera è diventato il mio rituale.",
    product: "Tartufo e Pecorino", color: "var(--c-cream)",
  },
  {
    id: "r3", name: "Giulio V.", location: "Trento", stars: 5,
    text: "Orgoglioso di comprare trentino. La Paprika BBQ è perfetta per i barbecue estivi. La ordino a cartoni.",
    product: "Paprika e BBQ", color: "#D4FF3C",
  },
  {
    id: "r4", name: "Serena M.", location: "Torino", stars: 5,
    text: "Il Teriyaki e Zenzero mi ha salvato tante cene dell'ultimo minuto. Cinque minuti e sembra un ristorante.",
    product: "Teriyaki e Zenzero", color: "var(--c-cream)",
  },
  {
    id: "r5", name: "Filippo R.", location: "Firenze", stars: 5,
    text: "Mia figlia mangia le verdure solo se ci metto sopra i funghi Dial. Ho trovato la mia arma segreta.",
    product: "Porcini e Speck", color: "#D4FF3C",
  },
  {
    id: "r6", name: "Anna C.", location: "Bologna", stars: 5,
    text: "Formato squeeze geniale. Non si rovescia, non si sporca, va su tutto. Regalo perfetto per chi ama cucinare.",
    product: "Tartufo e Pecorino", color: "var(--c-cream)",
  },
  {
    id: "r7", name: "Davide L.", location: "Napoli", stars: 5,
    text: "Ho scoperto il Teriyaki quasi per caso e ora non torno indietro. Su pollo, pesce, verdure — cambia tutto.",
    product: "Teriyaki e Zenzero", color: "#D4FF3C",
  },
  {
    id: "r8", name: "Chiara P.", location: "Venezia", stars: 5,
    text: "Ordino ogni mese. Il Paprika BBQ sulle costine al forno è una cosa seria. Tutta la famiglia lo chiede.",
    product: "Paprika e BBQ", color: "var(--c-cream)",
  },
];

const GALLERY_PHOTOS = [
  { src: "/images/azienda/stabilimento-1.jpg", label: "Stabilimento" },
  { src: "/images/azienda/stabilimento-2.jpg", label: "Stabilimento" },
  { src: "/images/azienda/macchinario-1.png", label: "Macchinari" },
  { src: "/images/azienda/macchinario-2.png", label: "Macchinari" },
  { src: "/images/azienda/lab-1.png", label: "Laboratorio" },
  { src: "/images/azienda/lab-2.jpg", label: "Laboratorio" },
];

/* ── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [activeBottle, setActiveBottle] = useState(0);
  const [flippedCertHome, setFlippedCertHome] = useState<string | null>(null);
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [hoveredHeroCard, setHoveredHeroCard] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [homeStatCounts, setHomeStatCounts] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const homeStatsRef = useRef<HTMLDivElement>(null);
  const homeStatsStarted = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % GALLERY_PHOTOS.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = homeStatsRef.current;
    if (!el) return;
    const TARGETS = [33, 10, 5, 16];
    const KEYS = ["a", "b", "c", "d"] as const;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || homeStatsStarted.current) return;
      homeStatsStarted.current = true;
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setHomeStatCounts({
          a: Math.round(ease * TARGETS[0]),
          b: Math.round(ease * TARGETS[1]),
          c: Math.round(ease * TARGETS[2]),
          d: Math.round(ease * TARGETS[3]),
        });
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            src={`${BASE_PATH}/images/hero-video.mp4`}
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

          {/* Center content */}
          <div style={{
            position: "relative", zIndex: 3,
            minHeight: "100vh",
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            padding: "80px 24px 90px", textAlign: "center",
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
                fontSize: "clamp(48px, 9vw, 160px)",
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
                fontSize: 15, fontWeight: 500, maxWidth: 600,
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
                border: "3px solid var(--c-ink)", padding: "14px 28px",
                borderRadius: 999, fontWeight: 900, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "6px 6px 0 var(--c-ink)",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>Compra Ora →</Link>
              <Link href="/ricette" style={{
                background: "transparent", color: "var(--c-cream)",
                border: "3px solid var(--c-cream)", padding: "14px 28px",
                borderRadius: 999, fontWeight: 800, fontSize: 14,
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
              style={{ display: "flex", gap: 24, padding: "10px 0", whiteSpace: "nowrap" }}
            >
              {Array.from({ length: 4 }).flatMap((_, i) =>
                ["PORCINI E SPECK", "TARTUFO E PECORINO", "PAPRIKA E BBQ", "TERIYAKI E ZENZERO", "DAL 1992", "100% TRENTINO"].map((t, j) => (
                  <span key={`${i}-${j}`} style={{ fontWeight: 900, fontSize: 13, color: "var(--c-ink)", letterSpacing: "0.08em" }}>
                    {t}
                    <span style={{ margin: "0 16px", opacity: 0.3 }}>·</span>
                  </span>
                ))
              )}
            </motion.div>
          </div>
        </section>

        {/* ── SQUEEZE & BOOM! ──────────────────────── */}
        <section style={{
          background: "var(--c-cream)", position: "relative",
          overflow: "hidden", padding: "80px 0 110px",
          borderTop: "3px solid var(--c-ink)",
        }}>
          <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px" }}>
            {/* Header — centered */}
            <div style={{ textAlign: "center", marginBottom: 70 }}>
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
                fontSize: "clamp(52px, 8vw, 130px)",
                lineHeight: 0.88, margin: 0,
                textTransform: "uppercase", letterSpacing: "-0.04em",
                color: "var(--c-ink)",
              }}>
                Squeeze<br />
                <span style={{ color: "#FF2800" }}>& Boom!</span>
              </h2>
              <p style={{ fontSize: 15, fontWeight: 500, maxWidth: 420, color: "var(--c-ink)", lineHeight: 1.5, margin: "24px auto 0" }}>
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
                      fontSize: "clamp(28px, 3.5vw, 52px)",
                      lineHeight: 0.92, margin: 0,
                      textTransform: "uppercase", letterSpacing: "-0.03em",
                      color: "var(--c-ink)",
                    }}>{product.name}</h3>

                    <p style={{
                      marginTop: 16, fontStyle: "italic",
                      fontSize: 16, color: product.color, lineHeight: 1.3,
                    }}>"{product.tagline}"</p>

                    <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.6, color: "var(--c-ink)", maxWidth: 480 }}>
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
                        fontWeight: 900, fontSize: 36, color: "var(--c-ink)", letterSpacing: "-0.02em",
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
          padding: "56px 0", position: "relative",
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
                  fontSize: "clamp(28px, 4vw, 54px)",
                  lineHeight: 0.9, margin: 0,
                  textTransform: "uppercase", letterSpacing: "-0.03em",
                }}>
                  Cinque<br />marchi.<br />
                  <span style={{ color: "var(--c-acid)" }}>Zero dubbi.</span>
                </h2>
              </div>
              <p style={{ maxWidth: 360, fontSize: 15, color: "rgba(245,239,224,0.8)", lineHeight: 1.6 }}>
                BRC, IFS, Vegan, Bio EU, Family Audit. Ogni fase del processo — dal bosco al barattolo — è controllata, tracciata e certificata. Non perché siamo obbligati, ma perché lo vogliamo.
              </p>
            </div>
          </div>

          {/* Scrolling carousel — flip cards */}
          <div style={{
            overflow: "hidden",
            borderTop: "2px solid rgba(245,239,224,0.15)",
            borderBottom: "2px solid rgba(245,239,224,0.15)",
            padding: "32px 0",
            background: "rgba(0,0,0,0.2)",
          }}>
            <motion.div
              animate={{ x: [0, -1310] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex", gap: 30, alignItems: "center", paddingLeft: 30 }}
            >
              {[...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS].map((c, i) => {
                const key = `${c.id}-${i}`;
                const isFlipped = flippedCertHome === key;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setFlippedCertHome(key)}
                    onMouseLeave={() => setFlippedCertHome(null)}
                    style={{ perspective: 800, cursor: "pointer", width: 232, height: 280, flexShrink: 0 }}
                  >
                    <div style={{
                      position: "relative", width: "100%", height: "100%",
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}>
                      {/* Front */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: "var(--c-cream)", color: "var(--c-ink)",
                        border: "2.5px solid rgba(245,239,224,0.4)", borderRadius: 24,
                        padding: 24, boxShadow: "6px 6px 0 rgba(212,255,60,0.5)",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        textAlign: "center",
                      }}>
                        <Image src={`${BASE_PATH}${c.img}`} alt={c.name} width={100} height={100} style={{ objectFit: "contain" }} />
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: 16 }}>{c.name}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>Dal {c.year}</div>
                        <div style={{ fontSize: 10, marginTop: 12, opacity: 0.4, fontStyle: "italic" }}>Hover per saperne di più</div>
                      </div>
                      {/* Back */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "var(--c-acid)", color: "var(--c-ink)",
                        border: "2.5px solid rgba(245,239,224,0.4)", borderRadius: 24,
                        padding: 28, boxShadow: "6px 6px 0 rgba(212,255,60,0.5)",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        textAlign: "center",
                      }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 16 }}>{c.name}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.85 }}>{c.desc}</div>
                        <div style={{ marginTop: 20, fontWeight: 900, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>Dal {c.year}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── PERGINE VALSUGANA ─────────────────────── */}
        <section style={{
          background: "var(--c-ink)", color: "var(--c-cream)",
          padding: "90px 0", position: "relative",
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
                fontSize: "clamp(32px, 4.7vw, 74px)",
                lineHeight: 0.88, margin: 0,
                textTransform: "uppercase", letterSpacing: "-0.04em",
              }}>
                Pergine<br />Valsugana,<br />
                <span style={{ color: "var(--c-acid)" }}>Trentino.</span>
              </h2>

              <p style={{ marginTop: 32, fontSize: 16, color: "rgba(245,239,224,0.85)", lineHeight: 1.6, maxWidth: 480 }}>
                Cinque generazioni di raccoglitori. Dieci ettari di bosco. Una sola ossessione: tirare fuori l'umami che la natura ci regala.{" "}
                <strong style={{ color: "var(--c-cream)" }}>Senza scorciatoie.</strong>
              </p>

              <div ref={homeStatsRef} style={{
                display: "inline-flex", flexWrap: "wrap", marginTop: 40,
                background: "var(--c-cream)", border: "2.5px solid var(--c-cream)",
                borderRadius: 20, overflow: "hidden",
                boxShadow: "6px 6px 0 var(--c-acid)",
              }}>
                {([
                  [homeStatCounts.a, "+", "anni di storia"],
                  [homeStatCounts.b, "", "ettari di bosco"],
                  [homeStatCounts.c, "", "certificazioni"],
                  [homeStatCounts.d, "", "prodotti"],
                ] as [number, string, string][]).map(([n, suffix, label], i, arr) => (
                  <div key={label} style={{
                    padding: "20px 28px",
                    borderRight: i < arr.length - 1 ? "2px solid rgba(10,15,12,0.15)" : "none",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 2.8vw, 42px)",
                      fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em",
                      color: "var(--c-ink)",
                    }}>{n}{suffix}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: "rgba(10,15,12,0.5)",
                      textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4,
                    }}>{label}</div>
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

            {/* Right — company photo in-card carousel */}
            <div
              onMouseEnter={() => setHoveredHeroCard(true)}
              onMouseLeave={() => setHoveredHeroCard(false)}
              style={{ position: "relative" }}
            >
              <div style={{
                position: "relative", aspectRatio: "4/5",
                borderRadius: 32, overflow: "hidden",
                border: "3px solid var(--c-cream)",
                boxShadow: hoveredHeroCard ? "18px 18px 0 var(--c-acid)" : "10px 10px 0 var(--c-acid)",
                transform: hoveredHeroCard ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
                transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease",
              }}>
                {GALLERY_PHOTOS.map((photo, idx) => (
                  <div key={idx} style={{
                    position: "absolute", inset: 0,
                    opacity: idx === carouselIdx ? 1 : 0,
                    transition: "opacity 0.75s ease",
                  }}>
                    <Image src={`${BASE_PATH}${photo.src}`} alt={photo.label} fill style={{ objectFit: "cover" }} />
                  </div>
                ))}
                <button
                  onClick={() => setCarouselIdx((i) => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)}
                  style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 4,
                    background: "var(--c-cream)", border: "2px solid var(--c-ink)",
                    borderRadius: "50%", width: 40, height: 40, cursor: "pointer", fontWeight: 900, fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "2px 2px 0 var(--c-ink)",
                  }}
                >←</button>
                <button
                  onClick={() => setCarouselIdx((i) => (i + 1) % GALLERY_PHOTOS.length)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 4,
                    background: "var(--c-cream)", border: "2px solid var(--c-ink)",
                    borderRadius: "50%", width: 40, height: 40, cursor: "pointer", fontWeight: 900, fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "2px 2px 0 var(--c-ink)",
                  }}
                >→</button>
                <div style={{
                  position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
                  display: "flex", gap: 6, zIndex: 4,
                }}>
                  {GALLERY_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIdx(idx)}
                      style={{
                        width: idx === carouselIdx ? 20 : 8, height: 8, borderRadius: 999, border: "none",
                        cursor: "pointer", padding: 0,
                        background: idx === carouselIdx ? "var(--c-acid)" : "rgba(245,239,224,0.5)",
                        transition: "width 0.3s ease, background 0.3s ease",
                      }}
                    />
                  ))}
                </div>
                <div style={{
                  position: "absolute", top: 14, right: 14, zIndex: 4,
                  background: "rgba(10,15,12,0.65)", color: "var(--c-cream)",
                  padding: "5px 12px", borderRadius: 999,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {GALLERY_PHOTOS[carouselIdx].label}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RECENSIONI ───────────────────────────── */}
        <section style={{
          background: "var(--c-paper)", color: "var(--c-ink)",
          padding: "100px 0 110px",
          borderTop: "3px solid var(--c-ink)",
        }}>
          <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px" }}>
            {/* Header */}
            <div style={{ marginBottom: 64 }}>
              <div style={{
                display: "inline-block",
                background: "var(--c-ink)", color: "var(--c-acid)",
                padding: "8px 16px", borderRadius: 999,
                border: "2.5px solid var(--c-ink)",
                fontWeight: 900, fontSize: 12, letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: 20,
                boxShadow: "4px 4px 0 var(--c-ink)",
              }}>⭐ Recensioni verificate</div>
              <h2 style={{
                fontFamily: "var(--font-heading, 'Archivo Black'), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(42px, 7vw, 110px)",
                lineHeight: 0.88, margin: 0,
                textTransform: "uppercase", letterSpacing: "-0.04em",
                color: "var(--c-ink)",
              }}>
                Lo dicono<br />
                <span style={{
                  display: "inline-block", background: "var(--c-acid)",
                  padding: "0 20px", border: "3px solid var(--c-ink)", borderRadius: 20,
                  transform: "rotate(-1.5deg)", boxShadow: "6px 6px 0 var(--c-ink)",
                }}>loro.</span>
              </h2>
            </div>

            {/* Review grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}>
              {REVIEWS.map((rev, i) => {
                const isHov = hoveredReview === rev.id;
                const baseRot = i % 2 === 0 ? -0.5 : 0.5;
                return (
                <div
                  key={rev.id}
                  onMouseEnter={() => setHoveredReview(rev.id)}
                  onMouseLeave={() => setHoveredReview(null)}
                  style={{
                    background: rev.color, color: "var(--c-ink)",
                    borderRadius: 24, padding: "32px 28px",
                    border: "2.5px solid var(--c-ink)",
                    boxShadow: isHov ? "16px 20px 0 var(--c-ink)" : "6px 6px 0 var(--c-ink)",
                    transform: isHov
                      ? `translateY(-10px) scale(1.03) rotate(${baseRot}deg)`
                      : `translateY(0) scale(1) rotate(${baseRot}deg)`,
                    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                    display: "flex", flexDirection: "column", gap: 16,
                    cursor: "default",
                  }}
                >
                  {/* Stars */}
                  <div style={{ fontSize: 18, letterSpacing: 2 }}>
                    {"★".repeat(rev.stars)}
                  </div>

                  {/* Quote */}
                  <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>

                  {/* Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 900, textTransform: "uppercase" }}>
                        {rev.name}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: 0.55, letterSpacing: "0.1em", marginTop: 2 }}>
                        {rev.location}
                      </div>
                    </div>
                    <div style={{
                      background: "var(--c-ink)", color: "var(--c-acid)",
                      padding: "5px 12px", borderRadius: 999,
                      fontSize: 10, fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {rev.product}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 64, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/shop" style={{
                background: "var(--c-ink)", color: "var(--c-acid)",
                border: "3px solid var(--c-ink)", padding: "16px 32px",
                borderRadius: 999, fontWeight: 900, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "6px 6px 0 var(--c-ink)",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>Esplora i Prodotti →</Link>
              <Link href="/ricette" style={{
                background: "transparent", color: "var(--c-ink)",
                border: "3px solid var(--c-ink)", padding: "16px 32px",
                borderRadius: 999, fontWeight: 800, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none",
              }}>Vedi le Ricette</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

    </>
  );
}
