/* global React, Motion */
/* Shared Space Patty-style components for all subpages */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;
const { motion: motionB, AnimatePresence: APB } = Motion;

const D_BOLD = window.PRODUCTS_DATA;

// On subpages, prepend "../" to relative asset paths
function bp(path) {
  // In bundled export, swap logo path for inlined resource
  if (path === "assets/logo-dial.png" && window.__LOGO_DIAL) return window.__LOGO_DIAL;
  return window.__SUBPAGE ? `../${path}` : path;
}

function StickerB({ children, color = "var(--c-acid)", rotate = -4, top, left, right, bottom, size = "md", delay = 0 }) {
  const sizes = { sm: { px: 10, py: 5, fs: 11 }, md: { px: 16, py: 8, fs: 13 }, lg: { px: 22, py: 12, fs: 16 } };
  const s = sizes[size];
  return (
    <motionB.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 18 }}
      whileHover={{ scale: 1.1, rotate: rotate + 6 }}
      style={{
        position: "absolute", top, left, right, bottom,
        background: color, color: "var(--c-ink)",
        fontFamily: "var(--font-body)", fontWeight: 900,
        fontSize: s.fs, letterSpacing: "0.06em", textTransform: "uppercase",
        padding: `${s.py}px ${s.px}px`, borderRadius: 999,
        border: "2.5px solid var(--c-ink)",
        boxShadow: "5px 5px 0 var(--c-ink)",
        whiteSpace: "nowrap", zIndex: 5,
      }}>
      {children}
    </motionB.div>
  );
}

function NavBoldB({ active, cartCount = 0 }) {
  const links = [["Shop", "shop.html"], ["Ricette", "ricette.html"], ["Chi Siamo", "chi-siamo.html"], ["Contatti", "contatti.html"]];
  return (
    <motionB.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
      style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100, padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1480, margin: "0 auto" }}>
        <a href="../Homepage Dial Funghi.html" style={{
          background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 999,
          padding: "8px 20px 8px 8px", display: "flex", alignItems: "center", gap: 12,
          textDecoration: "none", color: "var(--c-ink)", boxShadow: "4px 4px 0 var(--c-ink)",
        }}>
          <img src={bp("assets/logo-dial.png")} alt="Dial" style={{ width: 42, height: 42, objectFit: "contain" }} />
          <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.02em", textTransform: "uppercase" }}>Dial Funghi</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: 5, boxShadow: "4px 4px 0 var(--c-ink)" }}>
          {links.map(([n, h]) => (
            <a key={n} href={h} style={{
              padding: "10px 16px", borderRadius: 999, fontSize: 13, fontWeight: 800,
              color: "var(--c-ink)", textDecoration: "none", letterSpacing: "0.02em",
              textTransform: "uppercase", whiteSpace: "nowrap",
              background: active === n ? "var(--c-acid)" : "transparent",
              transition: "background 0.2s",
            }}
              onMouseEnter={(e) => { if (active !== n) e.target.style.background = "var(--c-acid)"; }}
              onMouseLeave={(e) => { if (active !== n) e.target.style.background = "transparent"; }}>{n}</a>
          ))}
        </div>

        <a href="carrello.html" style={{
          background: "var(--c-ink)", color: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
          borderRadius: 999, padding: "12px 22px", display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none", fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
          boxShadow: "4px 4px 0 var(--c-acid)",
        }}>
          🛒 <span>Carrello · {cartCount}</span>
        </a>
      </div>
    </motionB.nav>
  );
}

function FooterBoldB() {
  return (
    <footer style={{ background: "var(--c-acid)", color: "var(--c-ink)", padding: "100px 24px 40px", borderTop: "3px solid var(--c-ink)" }}>
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Archivo Black, var(--font-body)", fontWeight: 900, fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: 0 }}>
          DAL BOSCO<br />ALLA TUA<br />TAVOLA.
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginTop: 60, paddingTop: 32, borderTop: "2px solid var(--c-ink)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={bp("assets/logo-dial.png")} alt="Dial" style={{ width: 50, height: 50 }} />
            <div>
              <div style={{ fontWeight: 900, fontSize: 16, textTransform: "uppercase" }}>Dial Funghi srl</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Via dei Bosco · Trentino · Italia</div>
            </div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>© 2026 · P.IVA 00000000000</div>
        </div>
      </div>
    </footer>
  );
}

// Cart helpers (localStorage)
function useCartB() {
  const [count, setCount] = useStateB(0);
  useEffectB(() => {
    const read = () => { try { setCount(JSON.parse(localStorage.getItem("dial_cart") || "[]").reduce((a, x) => a + (x.qty || 1), 0)); } catch { setCount(0); } };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);
  return count;
}

function addToCartB(p) {
  try {
    const cart = JSON.parse(localStorage.getItem("dial_cart") || "[]");
    const ex = cart.find(x => x.id === p.id);
    if (ex) ex.qty++; else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
    localStorage.setItem("dial_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {}
}

window.StickerB = StickerB;
window.NavBoldB = NavBoldB;
window.FooterBoldB = FooterBoldB;
window.useCartB = useCartB;
window.addToCartB = addToCartB;
window.bp = bp;
window.D_BOLD = D_BOLD;
