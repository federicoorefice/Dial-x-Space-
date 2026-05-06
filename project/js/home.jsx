/* global React, Motion, PRODUCTS_DATA */
const { useState, useEffect, useRef } = React;
const { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } = Motion;

const D = window.PRODUCTS_DATA;
const FIOR = D.products.filter(p => p.brand === "fior");
const CERTS = D.certifications;

/* ============================================================
   SPACE PATTY-INSPIRED FLOATING STICKER
   ============================================================ */
function Sticker({ children, color = "var(--c-acid)", rotate = -4, top, left, right, bottom, size = "md", delay = 0, onClick }) {
  const sizes = { sm: { px: 10, py: 5, fs: 11 }, md: { px: 16, py: 8, fs: 13 }, lg: { px: 24, py: 14, fs: 18 } };
  const s = sizes[size];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 18 }}
      whileHover={{ scale: 1.1, rotate: rotate + 6 }}
      onClick={onClick}
      style={{
        position: "absolute", top, left, right, bottom,
        background: color, color: "var(--c-ink)",
        fontFamily: "var(--font-body)", fontWeight: 900,
        fontSize: s.fs, letterSpacing: "0.06em", textTransform: "uppercase",
        padding: `${s.py}px ${s.px}px`, borderRadius: 999,
        border: "2.5px solid var(--c-ink)",
        boxShadow: "5px 5px 0 var(--c-ink)",
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap", zIndex: 5,
      }}>
      {children}
    </motion.div>
  );
}

/* ============================================================
   NAV
   ============================================================ */
function NavBold({ cartCount }) {
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
      style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100, padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1480, margin: "0 auto" }}>
        <a href="Homepage Dial Funghi.html" style={{
          background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 999,
          padding: "8px 20px 8px 8px", display: "flex", alignItems: "center", gap: 12,
          textDecoration: "none", color: "var(--c-ink)", boxShadow: "4px 4px 0 var(--c-ink)",
        }}>
          <img src="assets/logo-dial.png" alt="Dial" style={{ width: 42, height: 42, objectFit: "contain" }} />
          <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.02em", textTransform: "uppercase" }}>Dial Funghi</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: 5, boxShadow: "4px 4px 0 var(--c-ink)" }}>
          {[["Shop", "pages/shop.html"], ["Ricette", "pages/ricette.html"], ["Chi Siamo", "pages/chi-siamo.html"], ["Contatti", "pages/contatti.html"]].map(([n, h]) => (
            <a key={n} href={h} style={{ padding: "10px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, color: "var(--c-ink)", textDecoration: "none", letterSpacing: "0.02em", textTransform: "uppercase", whiteSpace: "nowrap", transition: "background 0.2s" }}
              onMouseEnter={(e) => e.target.style.background = "var(--c-acid)"}
              onMouseLeave={(e) => e.target.style.background = "transparent"}>{n}</a>
          ))}
        </div>

        <a href="pages/carrello.html" style={{
          background: "var(--c-ink)", color: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
          borderRadius: 999, padding: "12px 22px", display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none", fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
          boxShadow: "4px 4px 0 var(--c-acid)",
        }}>
          🛒 <span>Carrello · {cartCount}</span>
        </a>
      </div>
    </motion.nav>
  );
}

/* ============================================================
   HERO — bosco video + bold sticker layout
   ============================================================ */
function Hero({ onAddCart }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#000" }}>
      {/* Video sfondo bosco */}
      <motion.div style={{ position: "absolute", inset: 0, y, opacity }}>
        <video src="uploads/ok_genera_un_latro_video_ma_in.mp4" autoPlay muted loop playsInline
          style={{ width: "100%", height: "120%", objectFit: "cover", filter: "brightness(0.7) saturate(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)" }} />
      </motion.div>

      {/* Floating stickers */}
      <Sticker top="22%" left="6%" rotate={-8} delay={1.2} color="var(--c-acid)">⭐ Dal 1992</Sticker>
      <Sticker top="28%" right="8%" rotate={6} delay={1.4} color="var(--c-mustard)">100% Trentino</Sticker>
      <Sticker bottom="22%" left="10%" rotate={-3} delay={1.6} color="var(--c-ketchup)" size="lg">🍄 Bosco vivo</Sticker>
      <Sticker bottom="32%" right="12%" rotate={4} delay={1.8} color="var(--c-cream)">Pronto in 0 sec</Sticker>

      {/* Centro: titolo enorme tipo Space Patty */}
      <div style={{ position: "relative", zIndex: 3, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "120px 24px 80px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="sticker sticker--cream" style={{ marginBottom: 24, fontSize: 13 }}>
          🌲 Dial Funghi · Pergine Valsugana
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)", fontWeight: 900,
            fontSize: "clamp(72px, 14vw, 240px)", lineHeight: 0.85,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            color: "var(--c-cream)", margin: 0,
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}>
          Funghi<br/>
          <span style={{ display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)", padding: "0 24px", border: "4px solid var(--c-ink)", borderRadius: 24, transform: "rotate(-2deg)", margin: "8px 0" }}>From&nbsp;the</span>
          <br/>Bosco
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }}
          style={{ marginTop: 40, color: "var(--c-cream)", fontSize: 20, fontWeight: 500, maxWidth: 600, textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
          La prima salsa ai funghi in formato squeeze. <br/>Selezione manuale, lavorazione artigianale.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
          style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="pages/shop.html" style={{
            background: "var(--c-acid)", color: "var(--c-ink)", border: "3px solid var(--c-ink)",
            padding: "20px 36px", borderRadius: 999, fontWeight: 900, fontSize: 16, letterSpacing: "0.06em",
            textTransform: "uppercase", textDecoration: "none", boxShadow: "6px 6px 0 var(--c-ink)",
            display: "inline-flex", alignItems: "center", gap: 10, transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px,-3px)"; e.currentTarget.style.boxShadow = "9px 9px 0 var(--c-ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "6px 6px 0 var(--c-ink)"; }}>
            Compra Ora →
          </a>
          <a href="pages/ricette.html" style={{
            background: "transparent", color: "var(--c-cream)", border: "3px solid var(--c-cream)",
            padding: "20px 36px", borderRadius: 999, fontWeight: 800, fontSize: 16, letterSpacing: "0.06em",
            textTransform: "uppercase", textDecoration: "none",
          }}>Ricette</a>
        </motion.div>
      </div>

      {/* Marquee bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--c-acid)", borderTop: "3px solid var(--c-ink)", borderBottom: "3px solid var(--c-ink)", overflow: "hidden", zIndex: 4 }}>
        <motion.div animate={{ x: [0, -1400] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: 32, padding: "16px 0", whiteSpace: "nowrap" }}>
          {Array.from({ length: 4 }).map((_, i) =>
            ["🍄 PORCINI E SPECK", "✨ TARTUFO E PECORINO", "🔥 PAPRIKA E BBQ", "🌶️ TERIYAKI E ZENZERO", "⭐ DAL 1992", "🌲 100% TRENTINO"].map((t, j) => (
              <span key={`${i}-${j}`} style={{ fontWeight: 900, fontSize: 18, color: "var(--c-ink)", letterSpacing: "0.04em" }}>{t}</span>
            ))).flat()}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   GAMMA — split screen con flacone gigante drag-to-explore
   ============================================================ */
function GammaSplit({ onAddCart }) {
  const [active, setActive] = useState(0);
  const product = FIOR[active];

  return (
    <section style={{ background: "var(--c-cream)", position: "relative", overflow: "hidden", padding: "120px 0 100px", borderTop: "3px solid var(--c-ink)" }}>
      <Sticker top={60} right="8%" rotate={8} color="var(--c-ketchup)" size="lg">NEW · 4 Gusti</Sticker>

      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="sticker" style={{ marginBottom: 20 }}>⚡ La Gamma</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(56px, 9vw, 140px)", lineHeight: 0.88, margin: 0, textTransform: "uppercase", letterSpacing: "-0.04em", color: "var(--c-ink)" }}>
              Squeeze<br/><span style={{ color: "var(--c-ketchup)" }}>& Boom!</span>
            </h2>
          </div>
          <p style={{ fontSize: 18, fontWeight: 500, maxWidth: 380, color: "var(--c-ink)", lineHeight: 1.5 }}>
            Quattro salse ai funghi pronte all'uso. Squeeze, condisci, gustati l'effetto.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: 60, alignItems: "center" }}>
          {/* SX — Info */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={product.id}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}>
                <div style={{ display: "inline-block", background: product.color, color: "var(--c-cream)", padding: "10px 18px", border: "2.5px solid var(--c-ink)", borderRadius: 999, fontWeight: 800, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24, boxShadow: "4px 4px 0 var(--c-ink)" }}>
                  Gusto #{active + 1}
                </div>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(48px, 6vw, 84px)", lineHeight: 0.92, margin: 0, textTransform: "uppercase", letterSpacing: "-0.03em", color: "var(--c-ink)" }}>
                  {product.name}
                </h3>
                <p style={{ marginTop: 16, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, color: product.color, lineHeight: 1.2 }}>
                  "{product.tagline}"
                </p>
                <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.55, color: "var(--c-ink)", maxWidth: 480 }}>
                  {product.desc}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
                  {product.badges.map(b => (
                    <span key={b} style={{ background: "var(--c-ink)", color: "var(--c-cream)", padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{b}</span>
                  ))}
                </div>
                <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 24 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: 56, color: "var(--c-ink)", letterSpacing: "-0.02em" }}>€{product.price.toFixed(2).replace(".", ",")}</span>
                  <button onClick={() => onAddCart(product.id)}
                    style={{ background: "var(--c-acid)", color: "var(--c-ink)", border: "3px solid var(--c-ink)", padding: "16px 28px", borderRadius: 999, fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "5px 5px 0 var(--c-ink)" }}>
                    + Aggiungi
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tabs gusto */}
            <div style={{ marginTop: 56, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {FIOR.map((p, i) => (
                <button key={p.id} onClick={() => setActive(i)}
                  style={{
                    padding: "10px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
                    background: i === active ? p.color : "transparent",
                    color: i === active ? "var(--c-cream)" : "var(--c-ink)",
                    fontWeight: 800, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                    transition: "all 0.3s", boxShadow: i === active ? "4px 4px 0 var(--c-ink)" : "none",
                  }}>{p.name.split(" e ")[0]}</button>
              ))}
            </div>
          </div>

          {/* DX — Flacone gigante */}
          <DragBottle product={product} />
        </div>
      </div>
    </section>
  );
}

function DragBottle({ product }) {
  const ref = useRef(null);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const dragging = useRef(false);

  const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 24 });
  const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 24 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0, startY = 0, startRY = 0, startRX = 0;
    const onDown = (e) => {
      dragging.current = true;
      const p = e.touches ? e.touches[0] : e;
      startX = p.clientX; startY = p.clientY;
      startRY = rotateY.get(); startRX = rotateX.get();
    };
    const onMove = (e) => {
      if (!dragging.current) return;
      const p = e.touches ? e.touches[0] : e;
      rotateY.set(startRY + (p.clientX - startX) * 0.6);
      rotateX.set(startRX - (p.clientY - startY) * 0.4);
    };
    const onUp = () => { dragging.current = false; };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [product.id]);

  return (
    <div style={{ position: "relative", aspectRatio: "1", maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at center, ${product.color}40 0%, ${product.color}00 60%)`,
        }} />
      {/* big circle behind */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", inset: "8%",
          background: product.color, borderRadius: "50%",
          border: "4px solid var(--c-ink)",
          opacity: 0.22,
        }} />
      {/* sticker badge orbiting */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", inset: 0 }}>
        <div style={{
          position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%) rotate(-8deg)",
          background: "var(--c-acid)", color: "var(--c-ink)",
          border: "3px solid var(--c-ink)", borderRadius: 999,
          padding: "10px 20px", fontWeight: 900, fontSize: 14,
          letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: "4px 4px 0 var(--c-ink)",
        }}>180g · Squeeze</div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div ref={ref} key={product.id}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", inset: "10%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "grab", userSelect: "none", touchAction: "none",
            perspective: 1000,
          }}>
          <motion.img src={product.img} alt={product.name}
            draggable={false}
            style={{
              maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.35))",
              rotateY: sRotateY, rotateX: sRotateX,
            }} />
        </motion.div>
      </AnimatePresence>

      <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "var(--c-ink)", textTransform: "uppercase", letterSpacing: "0.08em", background: "var(--c-cream)", padding: "8px 16px", borderRadius: 999, border: "2px solid var(--c-ink)", whiteSpace: "nowrap" }}>
        ✋ Trascina per ruotare
      </div>
    </div>
  );
}

/* ============================================================
   CERT BAND — banda certificazioni con render
   ============================================================ */
function CertBand() {
  return (
    <section style={{ background: "var(--c-ink)", color: "var(--c-cream)", padding: "80px 0", borderTop: "3px solid var(--c-ink)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 50 }}>
        <div>
          <div style={{ display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)", padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-cream)", fontWeight: 900, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            🏅 5 Certificazioni
          </div>
          <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.9, margin: 0, textTransform: "uppercase", letterSpacing: "-0.03em" }}>
            Certificati,<br/>certificati,<br/><span style={{ color: "var(--c-acid)" }}>certificati.</span>
          </h2>
        </div>
        <p style={{ maxWidth: 360, fontSize: 16, color: "var(--c-cream-dim)", lineHeight: 1.55 }}>
          Standard internazionali per ogni fase: dalla raccolta in bosco al barattolo. Niente compromessi.
        </p>
      </div>

      <div style={{ overflow: "hidden", borderTop: "2px solid rgba(245,239,224,0.15)", borderBottom: "2px solid rgba(245,239,224,0.15)", padding: "40px 0", background: "var(--c-ink-2)" }}>
        <motion.div animate={{ x: [0, -1600] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: 80, alignItems: "center" }}>
          {[...CERTS, ...CERTS, ...CERTS].map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, minWidth: 200 }}>
              <div style={{ background: "var(--c-cream)", borderRadius: 24, padding: 20, border: "3px solid var(--c-cream)", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "6px 6px 0 var(--c-acid)" }}>
                <img src={c.img} alt={c.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--c-cream-faint)", marginTop: 4 }}>dal {c.year}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   GRID — gamma completa (16 prodotti)
   ============================================================ */
function FullGamma({ onAddCart }) {
  const [cat, setCat] = useState("tutti");
  const items = cat === "tutti" ? D.products : D.products.filter(p => p.category === cat);

  return (
    <section style={{ background: "var(--c-paper)", padding: "120px 0", position: "relative", overflow: "hidden", borderTop: "3px solid var(--c-ink)" }}>
      <Sticker top={60} left="6%" rotate={-6} color="var(--c-cobalt)" size="lg" >
        <span style={{ color: "var(--c-cream)" }}>17 PRODOTTI</span>
      </Sticker>

      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 40 }}>
          <div className="sticker" style={{ marginBottom: 20 }}>📦 Tutta la Gamma</div>
          <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(56px, 9vw, 140px)", lineHeight: 0.88, margin: 0, textTransform: "uppercase", letterSpacing: "-0.04em", color: "var(--c-ink)" }}>
            Salse, secchi,<br/>polenta, <span style={{ color: "var(--c-ketchup)" }}>box.</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 50 }}>
          {D.categories.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              style={{
                padding: "12px 22px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
                background: cat === c.id ? "var(--c-ink)" : "transparent",
                color: cat === c.id ? "var(--c-acid)" : "var(--c-ink)",
                fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.2s", boxShadow: cat === c.id ? "4px 4px 0 var(--c-acid)" : "none",
              }}>{c.label}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.div key={p.id} layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (i % 8) * 0.04, duration: 0.4 }}>
                <ProductCard p={p} onAddCart={onAddCart} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onAddCart }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 14, y: px * 14 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  const handleImgError = (e) => {
    if (p.imgFallback && e.target.src !== p.imgFallback) e.target.src = p.imgFallback;
  };

  return (
    <a href={`pages/prodotto.html?id=${p.id}`} ref={ref}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        display: "block", position: "relative",
        background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 24,
        padding: 24, textDecoration: "none", color: "var(--c-ink)",
        boxShadow: "6px 6px 0 var(--c-ink)",
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}>
      {p.featured && (
        <div style={{ position: "absolute", top: -12, right: 16, background: "var(--c-acid)", color: "var(--c-ink)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: "5px 12px", fontWeight: 900, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", transform: "rotate(4deg)", zIndex: 2, boxShadow: "3px 3px 0 var(--c-ink)" }}>
          ⭐ Top
        </div>
      )}
      <div style={{ aspectRatio: "1", background: `radial-gradient(circle at 50% 60%, ${p.color}30, transparent 70%)`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <img src={p.img} onError={handleImgError} alt={p.name} style={{ maxWidth: "75%", maxHeight: "85%", objectFit: "contain", filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.25))", transition: "transform 0.4s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{p.weight}</div>
          <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{p.name}</h3>
        </div>
        <div style={{ fontWeight: 900, fontSize: 22, whiteSpace: "nowrap" }}>€{p.price.toFixed(2).replace(".", ",")}</div>
      </div>
      <button onClick={(e) => { e.preventDefault(); onAddCart(p.id); }}
        style={{ marginTop: 16, width: "100%", background: "var(--c-ink)", color: "var(--c-acid)", border: "2.5px solid var(--c-ink)", padding: "12px", borderRadius: 999, fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>
        + Aggiungi al carrello
      </button>
    </a>
  );
}

/* ============================================================
   STORY — bosco split
   ============================================================ */
function Story() {
  return (
    <section style={{ background: "var(--c-ink)", color: "var(--c-cream)", padding: "140px 0", position: "relative", overflow: "hidden", borderTop: "3px solid var(--c-ink)" }}>
      <Sticker top={80} right="6%" rotate={6} color="var(--c-mustard)" size="lg">EST. 1992</Sticker>

      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)", padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-cream)", fontWeight: 900, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
            🌲 Da 33 anni
          </div>
          <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(48px, 7vw, 110px)", lineHeight: 0.88, margin: 0, textTransform: "uppercase", letterSpacing: "-0.04em" }}>
            Pergine<br/>Valsugana,<br/><span style={{ color: "var(--c-acid)" }}>Trentino.</span>
          </h2>
          <p style={{ marginTop: 32, fontSize: 19, color: "var(--c-cream-dim)", lineHeight: 1.55, maxWidth: 480 }}>
            Cinque generazioni di raccoglitori. Dieci ettari di bosco. Un solo ossessione: tirare fuori l'umami che la natura ci regala. <strong style={{ color: "var(--c-cream)" }}>Senza scorciatoie.</strong>
          </p>
          <div style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap" }}>
            {[["33", "anni di storia"], ["10", "ettari di bosco"], ["5", "certificazioni"], ["17", "prodotti gamma"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontWeight: 900, fontSize: 56, color: "var(--c-acid)", lineHeight: 1, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--c-cream-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <a href="pages/chi-siamo.html" style={{ marginTop: 40, display: "inline-flex", alignItems: "center", gap: 10, background: "var(--c-acid)", color: "var(--c-ink)", border: "3px solid var(--c-acid)", padding: "16px 28px", borderRadius: 999, fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", boxShadow: "5px 5px 0 var(--c-cream)" }}>
            La nostra storia →
          </a>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 32, overflow: "hidden", border: "3px solid var(--c-cream)", boxShadow: "10px 10px 0 var(--c-acid)" }}>
            <video src="uploads/ok_genera_un_latro_video_ma_in.mp4" autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <Sticker top={-20} left={-20} rotate={-12} color="var(--c-ketchup)" size="lg">🌲 Bosco vivo</Sticker>
          <Sticker bottom={20} right={-30} rotate={8} color="var(--c-cream)" size="md">Filiera tracciata</Sticker>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function FooterBold() {
  return (
    <footer style={{ background: "var(--c-acid)", color: "var(--c-ink)", padding: "100px 0 40px", borderTop: "3px solid var(--c-ink)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "0 32px" }}>
        <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(64px, 12vw, 200px)", lineHeight: 0.85, margin: 0, textTransform: "uppercase", letterSpacing: "-0.04em" }}>
          DAL BOSCO<br/>ALLA TUA<br/>TAVOLA.
        </h2>
        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <img src="assets/logo-dial.png" alt="Dial" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 16 }} />
            <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.55, maxWidth: 280 }}>Dial Funghi · Pergine Valsugana, Trentino. Dal 1992.</p>
          </div>
          {[
            { t: "Shop", l: ["Tutti i prodotti", "Fior di Funghi", "Funghi Secchi", "Box Regalo"] },
            { t: "Esplora", l: ["Ricette", "Chi siamo", "Certificazioni", "Sostenibilità"] },
            { t: "Aiuto", l: ["Contatti", "Spedizioni", "Resi", "FAQ"] },
          ].map(c => (
            <div key={c.t}>
              <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>{c.t}</div>
              {c.l.map(x => <div key={x} style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{x}</div>)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 60, paddingTop: 20, borderTop: "2px solid var(--c-ink)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          <div>© 2026 Dial S.r.l. · P.IVA 02439500220 · Via Dei Prati, 60 · 38057 Pergine Valsugana (TN) · info@dialfunghi.it</div>
          <div>Made in Trentino · 🍄 Always</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dial-cart") || "[]"); } catch { return []; }
  });
  const addToCart = (id) => {
    const next = [...cart];
    const ex = next.find(x => x.id === id);
    if (ex) ex.qty++; else next.push({ id, qty: 1 });
    setCart(next);
    localStorage.setItem("dial-cart", JSON.stringify(next));
  };
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <>
      <NavBold cartCount={cartCount} />
      <Hero onAddCart={addToCart} />
      <GammaSplit onAddCart={addToCart} />
      <CertBand />
      <FullGamma onAddCart={addToCart} />
      <Story />
      <FooterBold />
    </>
  );
}
