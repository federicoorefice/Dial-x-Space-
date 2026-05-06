/* global React, Motion */
const { useState, useEffect, useRef, useLayoutEffect, useMemo } = React;
const { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } = Motion;

/* ============================================================
   PALETTES
   ============================================================ */
const PALETTES = {
  bosco: { name: "Bosco", bg: "#0F1A14", text: "#F5EFE0", accent: "#C8A55A", moss: "#3A4F3A", bark: "#8B6F47" },
  alba:  { name: "Alba",  bg: "#1A140C", text: "#F5ECD7", accent: "#E0B36A", moss: "#4A5D44", bark: "#9A7B52" },
  notte: { name: "Notte", bg: "#080D0A", text: "#E8E0CC", accent: "#A88E4F", moss: "#2A3F2C", bark: "#6B5238" },
};

const PRODUCTS = [
  { id: "porcini",  name: "Porcini e Speck",     img: "assets/porcini.png",  tagline: "Il bosco incontra la montagna", color: "#A66B3D", price: "3,99 €", note: "Affumicato · Robusto · Profondo" },
  { id: "tartufo",  name: "Tartufo e Pecorino",  img: "assets/tartufo.png",  tagline: "Eleganza in formato squeeze",   color: "#5C4A35", price: "4,99 €", note: "Sofisticato · Cremoso · Aromatico" },
  { id: "paprika",  name: "Paprika e BBQ",       img: "assets/paprika.png",  tagline: "Il bosco va in griglieria",     color: "#C24B2B", price: "3,99 €", note: "Affumicato · Speziato · Vivace" },
  { id: "teriyaki", name: "Teriyaki e Zenzero",  img: "assets/teriyaki.png", tagline: "Limited Edition · Fusion",      color: "#7A4A1F", price: "2,99 €", note: "Umami · Esotico · Dolce-piccante" },
];

/* ============================================================
   FOREST VIDEO — usa frame-by-frame ma con doppio canvas + lerp morbido
   Il vero fix per "scatti": pre-decode tutti i frames + spring più morbida
   ============================================================ */
const FRAME_COUNT = 120;
const FRAME_PATH = (i) => `frames/frame_${String(i).padStart(3, "0")}.jpg`;

function ForestJourneyCanvas({ scrollProgress }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(0);
  const rafRef = useRef(0);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const imgs = [];
    let count = 0;
    // Prefetch sequenzialmente per evitare colli di bottiglia
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i);
      img.onload = () => { count++; setLoaded(count); };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [loaded]);

  function drawFrame(frameIdx) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // crossfade tra due frame adiacenti per smoothness
    const i0 = Math.floor(frameIdx);
    const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
    const t = frameIdx - i0;
    const img0 = imagesRef.current[i0];
    const img1 = imagesRef.current[i1];
    if (!img0 || !img0.complete || !img0.naturalWidth) return;

    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);

    const drawCover = (img, alpha) => {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale, dh = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };
    drawCover(img0, 1);
    if (img1 && img1.complete && img1.naturalWidth && t > 0.001) {
      drawCover(img1, t);
    }
    ctx.globalAlpha = 1;
    currentFrameRef.current = frameIdx;
  }

  useEffect(() => {
    let current = 0;
    const tick = () => {
      const target = scrollProgress.get() * (FRAME_COUNT - 1);
      // lerp molto più morbido (0.08 invece di 0.18) → niente scatti
      current += (target - current) * 0.08;
      drawFrame(current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded]);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }} />
      <AnimatePresence>
        {loaded < FRAME_COUNT && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed", inset: 0, zIndex: 100, background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(245,239,224,0.7)", fontFamily: "var(--font-body)",
              fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 16, fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 44, color: "#F5EFE0", textTransform: "none", letterSpacing: "-0.02em" }}>
                Dial Funghi
              </div>
              <div style={{ width: 240, height: 1, background: "rgba(245,239,224,0.15)", margin: "16px auto", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, width: `${(loaded / FRAME_COUNT) * 100}%`, background: "#C8A55A", transition: "width 0.2s" }} />
              </div>
              Caricamento bosco · {Math.round((loaded / FRAME_COUNT) * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   ICONS
   ============================================================ */
const ArrowUpRight = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
  </svg>
);
const PlayIcon = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
);

/* ============================================================
   BLUR TEXT
   ============================================================ */
function BlurText({ text, delay = 0, stepDelay = 90, style = {}, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.05em", ...style }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(12px)", opacity: 0, y: 30 }}
          animate={visible ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + (i * stepDelay) / 1000 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >{w}</motion.span>
      ))}
    </p>
  );
}

/* ============================================================
   MARQUEE — gamma scrolling
   ============================================================ */
function GammaMarquee() {
  const items = ["Porcini e Speck", "Tartufo e Pecorino", "Paprika e BBQ", "Teriyaki e Zenzero"];
  const sequence = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
      <motion.div
        className="flex items-center"
        animate={{ x: ["0%", "-33.3333%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{ gap: 56, whiteSpace: "nowrap", width: "max-content" }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center gap-14" style={{ color: "var(--c-text)" }}>
            <span className="font-heading italic" style={{ fontSize: 56, letterSpacing: "-0.02em" }}>{item}</span>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--c-accent)" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ cartCount }) {
  const links = ["Home", "Shop", "Ricette", "Chi Siamo", "Contatti"];
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-6 lg:px-10"
    >
      <div className="flex items-center justify-between max-w-[1480px] mx-auto">
        <div className="dark-glass" style={{ width: 76, height: 76, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
          <img src="assets/logo-dial.png" alt="Dial Funghi" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div className="hidden lg:flex dark-glass items-center" style={{ borderRadius: 9999, padding: 6, gap: 2 }}>
          {links.map((l) => (
            <a key={l} href={l === "Shop" ? "#shop" : "#"} className="font-body text-sm font-medium text-white/85 hover:text-white transition" style={{ padding: "8px 14px", borderRadius: 9999 }}>{l}</a>
          ))}
          <a href="#shop" className="bg-white text-black font-body text-sm font-medium flex items-center gap-1 whitespace-nowrap" style={{ padding: "8px 14px", borderRadius: 9999, marginLeft: 4 }}>
            Acquista <ArrowUpRight s={14} />
          </a>
        </div>
        <div className="dark-glass flex items-center gap-2 text-white/95 font-body text-sm" style={{ borderRadius: 9999, padding: "12px 18px", height: 60 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="hidden md:inline">Carrello</span>
          <span className="opacity-50">·</span>
          <motion.span key={cartCount} initial={{ scale: 1.5, color: "#C8A55A" }} animate={{ scale: 1, color: "#fff" }} style={{ display: "inline-block" }}>{cartCount}</motion.span>
        </div>
      </div>
    </motion.nav>
  );
}

/* ============================================================
   HERO — flotta interattiva di 4 flaconi
   ============================================================ */
function Hero({ tweaks, onAddToCart }) {
  const headlineParts = tweaks.headline.split("/").map((s) => s.trim());
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PRODUCTS[activeIdx];

  // Auto-cycle ogni 4s se l'utente non ha mai cliccato
  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % 4), 4000);
    return () => clearInterval(t);
  }, [autoplay]);

  // Mouse parallax sul flacone centrale
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-300, 300], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-300, 300], [-8, 8]), { stiffness: 100, damping: 20 });

  return (
    <section
      className="relative w-full"
      style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: 40 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
    >
      {/* Glow color del prodotto attivo che pulsa dietro */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute", left: "50%", top: "55%", transform: "translate(-50%, -50%)",
          width: 900, height: 900, borderRadius: "50%",
          background: `radial-gradient(circle, ${active.color}99 0%, ${active.color}00 60%)`,
          filter: "blur(80px)", pointerEvents: "none", zIndex: 1,
        }}
      />

      <div className="relative z-10 grid grid-cols-12 gap-6 max-w-[1480px] mx-auto px-6" style={{ minHeight: "calc(100vh - 140px)" }}>
        {/* Sinistra — copy */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center" style={{ paddingTop: 24 }}>
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="dark-glass inline-flex items-center gap-2 self-start"
            style={{ borderRadius: 9999, padding: "5px 14px 5px 5px" }}
          >
            <span className="bg-[var(--c-accent)] text-[#0F1A14] font-body font-bold" style={{ borderRadius: 9999, padding: "4px 12px", fontSize: 11, letterSpacing: "0.08em" }}>DAL 1992</span>
            <span className="font-body text-sm text-white">Trentino · Premium · Artigianale</span>
          </motion.div>

          <div style={{ marginTop: 28 }}>
            <BlurText
              text={headlineParts[0]}
              delay={0.4}
              className="font-heading italic text-white text-shadow-soft"
              style={{ fontSize: "clamp(56px, 7.5vw, 110px)", lineHeight: 0.92, letterSpacing: "-0.025em", justifyContent: "flex-start" }}
            />
            <BlurText
              text={headlineParts[1] || ""}
              delay={0.7}
              className="font-heading italic text-shadow-soft"
              style={{ fontSize: "clamp(56px, 7.5vw, 110px)", lineHeight: 0.92, letterSpacing: "-0.025em", justifyContent: "flex-start", color: "var(--c-accent)" }}
            />
          </div>

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 16 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-body text-white text-shadow-soft"
            style={{ marginTop: 28, fontSize: 17, maxWidth: 520, lineHeight: 1.55, fontWeight: 300 }}
          >
            Da oltre trent'anni selezioniamo i migliori funghi italiani nel cuore del Trentino. Ogni prodotto è un viaggio dal sottobosco delle Dolomiti alla tua tavola.
          </motion.p>

          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 16 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-4 flex-wrap"
            style={{ marginTop: 36 }}
          >
            <button onClick={() => onAddToCart(active)} className="bg-white text-black font-body font-semibold inline-flex items-center gap-2 hover:scale-[1.03] transition" style={{ borderRadius: 9999, padding: "13px 24px", fontSize: 14 }}>
              {tweaks.cta} <ArrowUpRight s={14} />
            </button>
            <a href="#story" className="dark-glass inline-flex items-center gap-2 text-white font-body font-medium" style={{ borderRadius: 9999, padding: "13px 22px", fontSize: 14 }}>
              <PlayIcon s={12} /> Scopri la storia
            </a>
          </motion.div>

          {/* Mini-row stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center gap-6 flex-wrap"
            style={{ marginTop: 48 }}
          >
            {[{ v: "30+", l: "anni nei boschi" }, { v: "100%", l: "energia rinnovabile" }, { v: "4", l: "certificazioni" }].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-heading italic text-white text-shadow-soft" style={{ fontSize: 40, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.v}</span>
                <span className="font-body text-white/80 uppercase" style={{ fontSize: 10, letterSpacing: "0.12em", maxWidth: 90, lineHeight: 1.2 }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Destra — Product Carousel/Stack */}
        <div className="col-span-12 lg:col-span-5 relative flex items-center justify-center" style={{ minHeight: 600 }}>
          {/* Big product centerpiece */}
          <div style={{ position: "relative", width: "100%", height: 540, perspective: 1200 }}>
            <AnimatePresence mode="popLayout">
              <motion.img
                key={active.id}
                src={active.img}
                initial={{ opacity: 0, scale: 0.8, y: 40, rotateZ: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -40, rotateZ: 6 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "contain",
                  filter: `drop-shadow(0 40px 60px ${active.color}66) drop-shadow(0 20px 30px rgba(0,0,0,0.5))`,
                  rotateY, rotateX,
                }}
              />
            </AnimatePresence>

            {/* Float idle animation */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            />

            {/* Info card sotto il prodotto */}
            <motion.div
              key={`info-${active.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dark-glass absolute"
              style={{ bottom: 0, left: 0, right: 0, borderRadius: 20, padding: "16px 20px" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-heading italic text-white" style={{ fontSize: 24, lineHeight: 1, letterSpacing: "-0.01em" }}>{active.name}</div>
                  <div className="font-body text-white/75" style={{ fontSize: 11, marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{active.note}</div>
                </div>
                <div className="text-right">
                  <div className="font-heading italic text-white" style={{ fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1 }}>{active.price}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Thumbnail selector */}
          <div className="absolute" style={{ right: -8, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12 }}>
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setActiveIdx(i); setAutoplay(false); }}
                onMouseEnter={() => { setActiveIdx(i); setAutoplay(false); }}
                className="dark-glass relative"
                style={{
                  width: 56, height: 72, borderRadius: 14, padding: 6,
                  outline: activeIdx === i ? `2px solid ${p.color}` : "2px solid transparent",
                  outlineOffset: 2, transition: "outline 0.3s",
                }}
              >
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }} />
                {activeIdx === i && (
                  <motion.div
                    layoutId="thumb-active"
                    style={{ position: "absolute", inset: -2, borderRadius: 16, border: `1.5px solid ${p.color}`, pointerEvents: "none" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee gamma */}
      <div className="relative z-10" style={{ marginTop: 40, paddingBottom: 24 }}>
        <div className="text-center mb-3">
          <span className="dark-glass font-body text-white" style={{ borderRadius: 9999, padding: "5px 14px", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            La gamma Fior di Funghi
          </span>
        </div>
        <GammaMarquee />
      </div>
    </section>
  );
}

/* ============================================================
   CAPABILITIES — con tilt 3D
   ============================================================ */
function TiltCard({ children, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 300, damping: 25 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 300, damping: 25 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d", perspective: 800 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Capabilities() {
  const cards = [
    { title: "Selezione Manuale", tags: ["Funghi italiani", "Selezione a mano", "Lotto controllato"], desc: "Ogni fungo è scelto da personale specializzato nei nostri stabilimenti del Trentino. Solo la prima scelta entra nei nostri prodotti.", num: "01" },
    { title: "Filiera Tracciata", tags: ["BRC Food", "IFS Food", "ICEA Bio", "Vegan"],         desc: "Quattro certificazioni internazionali garantiscono ogni fase: dal bosco al laboratorio, fino al packaging. Tracciabilità assoluta.", num: "02" },
    { title: "Innovazione Squeeze", tags: ["Pronto all'uso", "Zero sprechi", "Versatile"],     desc: "Fior di Funghi è la prima salsa ai funghi in formato squeeze. Tutto il sapore del bosco, nella praticità che la cucina moderna richiede.", num: "03" },
  ];
  return (
    <section className="relative w-full" style={{ minHeight: "100vh", padding: "140px 32px 80px" }}>
      {/* Dark overlay locale per leggibilità */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(8,13,10,0.0) 0%, rgba(8,13,10,0.6) 50%, rgba(8,13,10,0.0) 100%)" }} />

      <div className="relative z-10 max-w-[1480px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 text-white/70 font-body" style={{ marginBottom: 24, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span style={{ width: 28, height: 1, background: "var(--c-accent)" }} />
            Tre pilastri Dial
          </div>
          <h2 className="font-heading italic text-white text-shadow-soft" style={{ fontSize: "clamp(56px, 8vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.025em" }}>
            Tradizione<br/>
            <span style={{ color: "var(--c-accent)" }}>reinventata.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: 80 }}>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
            >
              <TiltCard className="dark-glass-strong flex flex-col h-full" style={{ borderRadius: 24, padding: 28, minHeight: 380 }}>
                <div className="flex items-start justify-between">
                  <span className="font-heading italic" style={{ fontSize: 64, lineHeight: 0.8, color: "var(--c-accent)", letterSpacing: "-0.04em" }}>{c.num}</span>
                  <div className="flex flex-wrap justify-end gap-1.5" style={{ maxWidth: "65%" }}>
                    {c.tags.map(t => (
                      <span key={t} className="dark-glass font-body text-white whitespace-nowrap" style={{ borderRadius: 9999, padding: "5px 11px", fontSize: 11 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-1" />
                <div style={{ marginTop: 32 }}>
                  <h3 className="font-heading italic text-white" style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 16 }}>{c.title}</h3>
                  <p className="font-body text-white/90" style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 300 }}>{c.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRODUCTS SHOWCASE — magnetic hover, big bottles
   ============================================================ */
function ProductsShowcase({ onAddToCart }) {
  return (
    <section id="shop" className="relative w-full" style={{ minHeight: "100vh", padding: "120px 32px 80px" }}>
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(8,13,10,0) 0%, rgba(8,13,10,0.7) 50%, rgba(8,13,10,0) 100%)" }} />

      <div className="relative z-10 max-w-[1480px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 text-white/70 font-body" style={{ marginBottom: 24, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span style={{ width: 28, height: 1, background: "var(--c-accent)" }} />
            Fior di Funghi · 4 gusti
          </div>
          <h2 className="font-heading italic text-white text-shadow-soft" style={{ fontSize: "clamp(52px, 7vw, 92px)", lineHeight: 0.92, letterSpacing: "-0.025em", maxWidth: 900 }}>
            La salsa ai funghi<br/>
            <span style={{ color: "var(--c-accent)" }}>in formato squeeze.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginTop: 72 }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} idx={i} onAddToCart={onAddToCart} />)}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, idx, onAddToCart }) {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const ty = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.08 * idx }}
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); mx.set(0); my.set(0); }}
      className="dark-glass-strong flex flex-col items-center relative overflow-hidden"
      style={{ borderRadius: 24, padding: "28px 22px 24px", cursor: "pointer" }}
    >
      {/* Pulsing color halo */}
      <motion.div
        animate={{ opacity: hover ? 0.5 : 0.18, scale: hover ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute", inset: "-20%", borderRadius: "50%",
          background: `radial-gradient(circle at center, ${p.color}99, transparent 60%)`,
          filter: "blur(40px)", pointerEvents: "none",
        }}
      />
      <div className="relative z-10" style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <motion.img
          src={p.img}
          alt={p.name}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", filter: `drop-shadow(0 25px 35px ${p.color}66) drop-shadow(0 12px 20px rgba(0,0,0,0.5))`, x: tx, y: ty }}
          animate={{ rotateZ: hover ? [0, -3, 3, 0] : 0, scale: hover ? 1.06 : 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <div className="relative z-10 w-full" style={{ marginTop: 20 }}>
        <h3 className="font-heading italic text-white text-center" style={{ fontSize: 26, lineHeight: 1, letterSpacing: "-0.01em" }}>{p.name}</h3>
        <p className="font-body font-light text-white/85 text-center" style={{ fontSize: 12, marginTop: 8 }}>{p.tagline}</p>
        <div className="flex items-center justify-between" style={{ marginTop: 18 }}>
          <span className="font-heading italic text-white" style={{ fontSize: 24 }}>{p.price}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
            className="bg-white text-black font-body font-semibold inline-flex items-center gap-1.5 hover:scale-105 transition"
            style={{ borderRadius: 9999, padding: "8px 14px", fontSize: 12 }}
          >
            Aggiungi <ArrowUpRight s={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   STORY
   ============================================================ */
function StorySection() {
  return (
    <section id="story" className="relative w-full" style={{ minHeight: "100vh", padding: "140px 32px" }}>
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(8,13,10,0) 0%, rgba(8,13,10,0.75) 50%, rgba(8,13,10,0) 100%)" }} />
      <div className="relative z-10 max-w-[1100px] mx-auto flex flex-col items-center text-center" style={{ minHeight: "calc(100vh - 280px)", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="flex items-center gap-3 text-white/75 font-body" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <span style={{ width: 28, height: 1, background: "var(--c-accent)" }} />
          Pergine Valsugana · Trentino · 1992
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="font-heading italic text-white text-shadow-soft"
          style={{ fontSize: "clamp(48px, 6.5vw, 88px)", lineHeight: 1, letterSpacing: "-0.02em", marginTop: 24 }}
        >
          Una storia che inizia<br/>
          <span style={{ color: "var(--c-accent)" }}>nel sottobosco.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-white text-shadow-soft"
          style={{ fontSize: 18, maxWidth: 720, marginTop: 32, lineHeight: 1.55, fontWeight: 300 }}
        >
          Dal 1992 raccogliamo l'eredità dei boschi trentini. Selezione manuale, essiccazione lenta a bassa temperatura, lavorazione artigianale: ogni gesto rispetta il tempo della natura. Fior di Funghi nasce dall'incontro tra trent'anni di tradizione e l'esigenza di una cucina più rapida — senza compromessi sul gusto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
          style={{ marginTop: 64, maxWidth: 920 }}
        >
          {[{ v: "1992", l: "Anno di fondazione" }, { v: "30+", l: "Anni di esperienza" }, { v: "100%", l: "Energia rinnovabile" }, { v: "4", l: "Certificazioni" }].map((s, i) => (
            <div key={i} className="dark-glass flex flex-col items-center" style={{ borderRadius: 18, padding: "26px 16px" }}>
              <div className="font-heading italic text-white" style={{ fontSize: 48, lineHeight: 0.9, letterSpacing: "-0.02em" }}>{s.v}</div>
              <div className="font-body text-white/80" style={{ fontSize: 11, marginTop: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="dark-glass-strong inline-flex items-center gap-2 text-white font-body font-medium hover:scale-105 transition"
          style={{ borderRadius: 9999, padding: "13px 26px", fontSize: 14, marginTop: 56 }}
        >
          Scopri la nostra storia <ArrowUpRight s={14} />
        </motion.a>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <section className="relative w-full" style={{ padding: "100px 32px 40px" }}>
      <div className="relative z-10 max-w-[1480px] mx-auto">
        <div className="dark-glass-strong" style={{ borderRadius: 32, padding: "64px 56px" }}>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div>
              <h3 className="font-heading italic text-white" style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: "-0.025em" }}>
                Dal bosco<br/><span style={{ color: "var(--c-accent)" }}>alla tua tavola.</span>
              </h3>
              <p className="font-body text-white/85" style={{ fontSize: 14, marginTop: 20, maxWidth: 440, fontWeight: 300 }}>
                Iscriviti per ricevere ricette, anteprime e offerte riservate.
              </p>
            </div>
            <form className="flex items-center gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="La tua email" className="dark-glass text-white placeholder-white/55 font-body" style={{ borderRadius: 9999, padding: "13px 20px", fontSize: 14, minWidth: 280, outline: "none" }} />
              <button className="bg-white text-black font-body font-semibold inline-flex items-center gap-1.5 whitespace-nowrap hover:scale-105 transition" style={{ borderRadius: 9999, padding: "13px 22px", fontSize: 14 }}>
                Iscriviti <ArrowUpRight s={14} />
              </button>
            </form>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white/60 font-body" style={{ marginTop: 64, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 12 }}>
            <div>© 2026 Dial S.r.l. · P.IVA 02439500220 · Pergine Valsugana (TN)</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Cookie</a>
              <a href="#" className="hover:text-white">Termini</a>
              <a href="https://www.dialfunghi.it" className="hover:text-white">dialfunghi.it ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ADD-TO-CART TOAST
   ============================================================ */
function CartToast({ items }) {
  const last = items[items.length - 1];
  return (
    <AnimatePresence>
      {last && (
        <motion.div
          key={last.k}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="dark-glass-strong fixed z-[60] flex items-center gap-3"
          style={{ left: "50%", transform: "translateX(-50%)", bottom: 32, borderRadius: 9999, padding: "10px 20px 10px 10px" }}
        >
          <img src={last.img} alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <div className="font-body text-white" style={{ fontSize: 13 }}>
            <span className="font-semibold">{last.name}</span> aggiunto al carrello
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "headline": "Dal cuore del bosco / alla tua tavola",
    "cta": "Inizia il Viaggio",
    "palette": "bosco",
    "journeySpeed": 1.0
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[tweaks.palette] || PALETTES.bosco;

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 18, mass: 0.4 });

  const [cart, setCart] = useState([]);
  const handleAdd = (p) => setCart((c) => [...c, { ...p, k: Date.now() + Math.random() }].slice(-6));

  // Auto-clear toast after 2.5s
  useEffect(() => {
    if (!cart.length) return;
    const t = setTimeout(() => setCart((c) => c.slice(0, -1)), 2500);
    return () => clearTimeout(t);
  }, [cart.length]);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--c-bg", palette.bg);
    r.style.setProperty("--c-text", palette.text);
    r.style.setProperty("--c-accent", palette.accent);
    r.style.setProperty("--c-moss", palette.moss);
    r.style.setProperty("--c-bark", palette.bark);
  }, [palette]);

  return (
    <div className="relative" style={{ background: palette.bg, color: palette.text }}>
      <ForestJourneyCanvas scrollProgress={smoothProgress} />

      {/* Stronger atmospheric vignette */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.7) 100%)",
      }} />

      <Navbar cartCount={cart.length} />

      <main className="relative z-10">
        <Hero tweaks={tweaks} onAddToCart={handleAdd} />
        <Capabilities />
        <ProductsShowcase onAddToCart={handleAdd} />
        <StorySection />
        <Footer />
      </main>

      <CartToast items={cart} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette del bosco">
          <TweakRadio
            value={tweaks.palette}
            onChange={(v) => setTweak("palette", v)}
            options={Object.entries(PALETTES).map(([k, p]) => ({ value: k, label: p.name }))}
          />
        </TweakSection>
        <TweakSection label="Headline (usa / per andare a capo)">
          <TweakText value={tweaks.headline} onChange={(v) => setTweak("headline", v)} />
        </TweakSection>
        <TweakSection label="CTA primaria">
          <TweakText value={tweaks.cta} onChange={(v) => setTweak("cta", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

window.App = App;
