/* global React, Motion */
/* ============================================================
   DIAL FUNGHI — SHARED CORE
   Used by all pages
   ============================================================ */
const { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } = React;
const { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useInView } = Motion;

/* ----------------------------------------------------------
   PRODUCTS
   ---------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "porcini",
    name: "Porcini e Speck",
    img: "assets/porcini.png",
    tagline: "Il bosco incontra la montagna",
    color: "#A66B3D",
    colorSoft: "#D9A37A",
    price: "3,99",
    weight: "180g",
    note: "Affumicato · Robusto · Profondo",
    intensity: 4,
    pairings: ["Pasta fresca", "Bruschette", "Risotto"],
    description: "L'incontro fra porcini selezionati delle Dolomiti e speck affumicato del Trentino. Una salsa densa, affumicata, perfetta per dare profondità a primi piatti e secondi della tradizione."
  },
  {
    id: "tartufo",
    name: "Tartufo e Pecorino",
    img: "assets/tartufo.png",
    tagline: "Eleganza in formato squeeze",
    color: "#5C4A35",
    colorSoft: "#9A8763",
    price: "4,99",
    weight: "180g",
    note: "Sofisticato · Cremoso · Aromatico",
    intensity: 5,
    pairings: ["Tagliolini", "Crostini", "Uova"],
    description: "Tartufo nero estivo italiano e pecorino stagionato si fondono in una crema aromatica, intensa, capace di trasformare un piatto semplice in un'esperienza."
  },
  {
    id: "paprika",
    name: "Paprika e BBQ",
    img: "assets/paprika.png",
    tagline: "Il bosco va in griglieria",
    color: "#C24B2B",
    colorSoft: "#E68A6E",
    price: "3,99",
    weight: "180g",
    note: "Affumicato · Speziato · Vivace",
    intensity: 3,
    pairings: ["Burger", "Hot dog", "Patate"],
    description: "Champignon e paprika affumicata danzano con note dolci-piccanti di salsa BBQ. Per chi vuole portare il bosco direttamente sulla griglia."
  },
  {
    id: "teriyaki",
    name: "Teriyaki e Zenzero",
    img: "assets/teriyaki.png",
    tagline: "Limited Edition · Fusion",
    color: "#8F5A1F",
    colorSoft: "#C9925A",
    price: "2,99",
    weight: "180g",
    note: "Umami · Esotico · Dolce-piccante",
    intensity: 2,
    pairings: ["Riso", "Bowl", "Ramen"],
    description: "Una contaminazione fusion: shiitake, salsa teriyaki e zenzero fresco. Edizione limitata che porta il sottobosco trentino in viaggio verso il Pacifico."
  },
];

/* ----------------------------------------------------------
   ICONS
   ---------------------------------------------------------- */
const Arrow = ({ s = 14, dir = "ne" }) => {
  const rot = { ne: 0, e: 45, se: 90, n: -45 }[dir] || 0;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
};
const Play = ({ s = 12 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>);
const Plus = ({ s = 14 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>);
const Minus = ({ s = 14 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/></svg>);
const Cart = ({ s = 16 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>);
const Check = ({ s = 14 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>);

/* ----------------------------------------------------------
   GLOBAL CART (persisted in localStorage)
   ---------------------------------------------------------- */
function useCart() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dial-cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("dial-cart", JSON.stringify(items)); }, [items]);

  const add = useCallback((product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === product.id);
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + qty }; return next;
      }
      return [...prev, { id: product.id, name: product.name, img: product.img, price: product.price, color: product.color, qty }];
    });
  }, []);
  const remove = useCallback((id) => setItems(prev => prev.filter(x => x.id !== id)), []);
  const setQty = useCallback((id, qty) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x)), []);
  const count = items.reduce((s, x) => s + x.qty, 0);
  const total = items.reduce((s, x) => s + parseFloat(x.price.replace(",", ".")) * x.qty, 0);
  return { items, add, remove, setQty, count, total };
}

/* ----------------------------------------------------------
   PAGE TRANSITION (Landon Norris masking)
   ---------------------------------------------------------- */
function PageMask({ onComplete }) {
  return (
    <motion.div
      className="page-mask"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      onAnimationComplete={onComplete}
      style={{ transformOrigin: "bottom" }}
    />
  );
}

function navigateMasked(href) {
  // Animate a curtain DOWN, then change page
  const mask = document.createElement("div");
  mask.style.cssText = "position:fixed;inset:0;z-index:9998;background:#0A0F0C;transform-origin:top;transform:scaleY(0);transition:transform 0.7s cubic-bezier(0.76,0,0.24,1);pointer-events:none;";
  document.body.appendChild(mask);
  requestAnimationFrame(() => { mask.style.transform = "scaleY(1)"; });
  setTimeout(() => { window.location.href = href; }, 720);
}

/* ----------------------------------------------------------
   NAVBAR (shared)
   ---------------------------------------------------------- */
function Navbar({ cartCount, light = false, current = "Home" }) {
  const links = [
    { name: "Home", href: "Homepage Dial Funghi.html" },
    { name: "Shop", href: "pages/shop.html" },
    { name: "Ricette", href: "pages/ricette.html" },
    { name: "Chi Siamo", href: "pages/chi-siamo.html" },
    { name: "Contatti", href: "pages/contatti.html" },
  ];
  const handle = (e, href) => { e.preventDefault(); navigateMasked(href); };

  const txt = light ? "var(--c-paper-deep)" : "var(--c-cream)";
  const glassClass = light ? "" : "dark-glass";
  const glassStyle = light
    ? { background: "rgba(245,239,224,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(31,38,31,0.08)" }
    : {};

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      style={{ position: "fixed", top: 16, left: 0, right: 0, zIndex: 100, padding: "0 24px" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1480, margin: "0 auto", gap: 16 }}>
        <a href="Homepage Dial Funghi.html" onClick={(e) => handle(e, "Homepage Dial Funghi.html")}
          className={glassClass}
          style={{ ...glassStyle, width: 64, height: 64, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 6, textDecoration: "none" }}>
          <img src={current === "Home" ? "assets/logo-dial.png" : "../assets/logo-dial.png"} alt="Dial Funghi" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </a>

        <div className={glassClass}
          style={{ ...glassStyle, display: "flex", alignItems: "center", borderRadius: 999, padding: 5, gap: 2 }}>
          {links.map((l) => {
            const active = l.name === current;
            return (
              <a key={l.name} href={l.href} onClick={(e) => handle(e, l.href)}
                style={{
                  color: txt, padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  textDecoration: "none", letterSpacing: "0.01em", whiteSpace: "nowrap",
                  background: active ? (light ? "var(--c-paper-deep)" : "var(--c-cream)") : "transparent",
                  color: active ? (light ? "var(--c-paper)" : "var(--c-ink)") : txt,
                  transition: "all 0.3s",
                }}>{l.name}</a>
            );
          })}
        </div>

        <a href="pages/carrello.html" onClick={(e) => handle(e, "pages/carrello.html")}
          className={glassClass}
          style={{ ...glassStyle, display: "flex", alignItems: "center", gap: 10, color: txt, borderRadius: 999, padding: "12px 18px", height: 56, textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
          <Cart s={16} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ opacity: 0.55 }}>·</span>
            <motion.span key={cartCount} initial={{ scale: 1.4, color: "var(--c-gold)" }} animate={{ scale: 1, color: txt }} style={{ display: "inline-block", minWidth: 14, textAlign: "center" }}>{cartCount}</motion.span>
          </span>
        </a>
      </div>
    </motion.nav>
  );
}

/* Adjust nav links when on a subpage (paths differ) */
function NavbarSub({ cartCount, light = false, current }) {
  const links = [
    { name: "Home", href: "../Homepage Dial Funghi.html" },
    { name: "Shop", href: "shop.html" },
    { name: "Ricette", href: "ricette.html" },
    { name: "Chi Siamo", href: "chi-siamo.html" },
    { name: "Contatti", href: "contatti.html" },
  ];
  const handle = (e, href) => { e.preventDefault(); navigateMasked(href); };
  const txt = light ? "var(--c-paper-deep)" : "var(--c-cream)";
  const glassStyle = light
    ? { background: "rgba(245,239,224,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(31,38,31,0.08)" }
    : { background: "rgba(10,16,12,0.55)", backdropFilter: "blur(16px) saturate(140%)", WebkitBackdropFilter: "blur(16px) saturate(140%)", border: "1px solid rgba(255,255,255,0.08)" };

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{ position: "fixed", top: 16, left: 0, right: 0, zIndex: 100, padding: "0 24px" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1480, margin: "0 auto", gap: 16 }}>
        <a href="../Homepage Dial Funghi.html" onClick={(e) => handle(e, "../Homepage Dial Funghi.html")}
          style={{ ...glassStyle, width: 64, height: 64, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 6, textDecoration: "none" }}>
          <img src="../assets/logo-dial.png" alt="Dial Funghi" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </a>
        <div style={{ ...glassStyle, display: "flex", alignItems: "center", borderRadius: 999, padding: 5, gap: 2 }}>
          {links.map((l) => {
            const active = l.name === current;
            return (
              <a key={l.name} href={l.href} onClick={(e) => handle(e, l.href)}
                style={{
                  padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  textDecoration: "none", letterSpacing: "0.01em", whiteSpace: "nowrap",
                  background: active ? (light ? "var(--c-paper-deep)" : "var(--c-cream)") : "transparent",
                  color: active ? (light ? "var(--c-paper)" : "var(--c-ink)") : txt,
                  transition: "all 0.3s",
                }}>{l.name}</a>
            );
          })}
        </div>
        <a href="carrello.html" onClick={(e) => handle(e, "carrello.html")}
          style={{ ...glassStyle, display: "flex", alignItems: "center", gap: 10, color: txt, borderRadius: 999, padding: "12px 18px", height: 56, textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
          <Cart s={16} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ opacity: 0.55 }}>·</span>
            <motion.span key={cartCount} initial={{ scale: 1.4, color: "var(--c-gold)" }} animate={{ scale: 1, color: txt }}>{cartCount}</motion.span>
          </span>
        </a>
      </div>
    </motion.nav>
  );
}

/* ----------------------------------------------------------
   FOOTER (shared)
   ---------------------------------------------------------- */
function Footer({ subpage = false }) {
  const prefix = subpage ? "" : "pages/";
  const homeHref = subpage ? "../Homepage Dial Funghi.html" : "Homepage Dial Funghi.html";
  const handle = (e, href) => { e.preventDefault(); navigateMasked(href); };
  return (
    <footer style={{ background: "var(--c-ink)", color: "var(--c-cream)", padding: "120px 24px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1480, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 80 }}>
          <div>
            <div className="font-display" style={{ fontSize: 56, lineHeight: 0.95 }}>
              Dal bosco<br/><span className="gold">alla tua tavola.</span>
            </div>
            <p className="body" style={{ marginTop: 24, maxWidth: 360, color: "var(--c-cream-dim)" }}>
              Iscriviti per ricette, anteprime e offerte riservate.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8, marginTop: 24, maxWidth: 420 }}>
              <input type="email" placeholder="La tua email"
                style={{ flex: 1, background: "rgba(245,239,224,0.06)", border: "1px solid rgba(245,239,224,0.18)", color: "var(--c-cream)", padding: "13px 20px", borderRadius: 999, fontSize: 13, outline: "none" }} />
              <button className="btn-light" type="submit">Iscriviti <Arrow s={12} /></button>
            </form>
          </div>
          {[
            { t: "Shop", l: [["Tutti i gusti", `${prefix}shop.html`], ["Porcini e Speck", `${prefix}prodotto.html?id=porcini`], ["Tartufo e Pecorino", `${prefix}prodotto.html?id=tartufo`], ["Paprika e BBQ", `${prefix}prodotto.html?id=paprika`], ["Teriyaki e Zenzero", `${prefix}prodotto.html?id=teriyaki`]] },
            { t: "Esplora", l: [["Ricette", `${prefix}ricette.html`], ["Chi siamo", `${prefix}chi-siamo.html`], ["La filiera", `${prefix}chi-siamo.html#filiera`], ["Sostenibilità", `${prefix}chi-siamo.html#sostenibilita`]] },
            { t: "Aiuto", l: [["Contatti", `${prefix}contatti.html`], ["Spedizioni", "#"], ["Resi", "#"], ["FAQ", "#"], ["dialfunghi.it ↗", "https://www.dialfunghi.it"]] },
          ].map((col) => (
            <div key={col.t}>
              <div className="eyebrow" style={{ color: "var(--c-cream-faint)", marginBottom: 20 }}>{col.t}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.l.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} onClick={(e) => href.startsWith("http") || href === "#" ? null : handle(e, href)}
                      style={{ color: "var(--c-cream-dim)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-cream)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-cream-dim)"}
                    >{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand mark */}
        <div className="font-display" style={{ fontSize: "clamp(120px, 18vw, 280px)", lineHeight: 0.85, color: "var(--c-cream)", letterSpacing: "-0.04em", marginBottom: 40, opacity: 0.96, whiteSpace: "nowrap", overflow: "hidden" }}>
          Dial <span className="gold">Funghi</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 32, borderTop: "1px solid rgba(245,239,224,0.12)", color: "var(--c-cream-faint)", fontSize: 12 }}>
          <div>© 2026 Dial S.r.l. · P.IVA 02439500220 · Pergine Valsugana (TN)</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Cookie</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Termini</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------
   BLUR-IN TEXT
   ---------------------------------------------------------- */
function BlurText({ text, delay = 0, stepDelay = 60, style = {}, className = "", as = "p" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const words = (text || "").split(" ");
  const Tag = motion[as];
  return (
    <Tag ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", rowGap: "0.05em", margin: 0, ...style }}>
      {words.map((w, i) => (
        <motion.span key={i}
          initial={{ filter: "blur(14px)", opacity: 0, y: 28 }}
          animate={visible ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + (i * stepDelay) / 1000 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >{w}</motion.span>
      ))}
    </Tag>
  );
}

/* ----------------------------------------------------------
   CUSTOM CURSOR (Lusion-light)
   ---------------------------------------------------------- */
function CustomCursor() {
  const [large, setLarge] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const target = e.target.closest("[data-cursor='lg'], a, button");
      setLarge(!!target);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, x: sx, y: sy,
        width: large ? 64 : 10, height: large ? 64 : 10,
        background: large ? "var(--c-gold)" : "var(--c-cream)",
        borderRadius: 999,
        translateX: "-50%", translateY: "-50%",
        pointerEvents: "none", zIndex: 9999,
        mixBlendMode: "difference",
        transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s",
      }}
    />
  );
}

/* ----------------------------------------------------------
   MAGNETIC BUTTON (Lusion)
   ---------------------------------------------------------- */
function Magnetic({ children, strength = 0.3, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy, display: "inline-block" }}
      {...rest}
    >{children}</motion.div>
  );
}

/* Expose for other scripts */
Object.assign(window, {
  PRODUCTS, Arrow, Play, Plus, Minus, Cart, Check,
  useCart, PageMask, navigateMasked,
  Navbar, NavbarSub, Footer, BlurText, CustomCursor, Magnetic,
});
