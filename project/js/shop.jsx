/* global React, Motion, D_BOLD, StickerB, NavBoldB, FooterBoldB, useCartB, addToCartB, bp */
const { useState, useEffect, useRef, useMemo } = React;
const { motion, AnimatePresence, LayoutGroup } = Motion;

function ProductCardBold({ p, onOpen, idx }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -y * 8, ry: x * 8 });
  }
  const colors = ["#D4FF3C", "#F2C200", "#E63B1E", "#2E4FE8", "#F5EFE0"];
  const bg = colors[idx % colors.length];
  return (
    <motion.button
      ref={ref}
      layoutId={`prod-${p.id}`}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      onClick={() => onOpen(p)}
      whileHover={{ y: -6 }}
      style={{
        background: bg, color: "var(--c-ink)",
        border: "2.5px solid var(--c-ink)", borderRadius: 28,
        boxShadow: "8px 8px 0 var(--c-ink)",
        padding: "28px 24px 24px", textAlign: "left", cursor: "pointer",
        transformStyle: "preserve-3d", transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.2s, box-shadow 0.3s",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, position: "relative", zIndex: 2 }}>
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: 600, opacity: 0.6 }}>{p.weight}</span>
        <span style={{ background: "var(--c-ink)", color: bg, padding: "5px 11px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.04em" }}>€{p.price.toFixed(2)}</span>
      </div>

      <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0 16px", position: "relative" }}>
        <img src={bp(p.img)} onError={(e) => { if (p.imgFallback) e.target.src = p.imgFallback; }} alt={p.name}
          style={{ maxHeight: "100%", maxWidth: "85%", objectFit: "contain", filter: "drop-shadow(8px 8px 0 rgba(0,0,0,0.15))", transform: `translateZ(40px)` }} />
      </div>

      <div style={{ fontFamily: "Archivo Black, var(--font-body)", fontWeight: 900, fontSize: 22, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{p.name}</div>
      <div style={{ fontSize: 13, marginTop: 6, opacity: 0.75, fontStyle: "italic" }}>{p.tagline}</div>

      <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
        {(p.badges || []).slice(0, 3).map(b => (
          <span key={b} style={{ background: "var(--c-ink)", color: bg, fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 999, letterSpacing: "0.04em", textTransform: "uppercase" }}>{b}</span>
        ))}
      </div>
    </motion.button>
  );
}

function ProductDetailOverlay({ p, onClose }) {
  if (!p) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(10,15,12,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(12px)" }}>
      <motion.div layoutId={`prod-${p.id}`} onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--c-cream)", color: "var(--c-ink)",
          border: "2.5px solid var(--c-ink)", borderRadius: 32,
          boxShadow: "12px 12px 0 var(--c-acid)",
          maxWidth: 1100, width: "100%", maxHeight: "92vh", overflow: "auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
        }}>
        <div style={{ background: p.color || "var(--c-paper-2)", padding: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2.5px solid var(--c-ink)", position: "relative", minHeight: 480 }}>
          <img src={bp(p.img)} onError={(e) => { if (p.imgFallback) e.target.src = p.imgFallback; }} alt={p.name}
            style={{ maxHeight: 420, maxWidth: "85%", objectFit: "contain", filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.3))" }} />
          <div style={{ position: "absolute", top: 24, left: 24, background: "var(--c-acid)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: "8px 16px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", boxShadow: "4px 4px 0 var(--c-ink)" }}>{p.category.replace(/-/g, " ")}</div>
        </div>

        <div style={{ padding: 48 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {(p.badges || []).map(b => <span key={b} style={{ background: "var(--c-ink)", color: "var(--c-acid)", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 999, letterSpacing: "0.04em", textTransform: "uppercase" }}>{b}</span>)}
          </div>
          <h2 style={{ fontFamily: "Archivo Black, var(--font-body)", fontSize: 48, lineHeight: 0.95, margin: 0, textTransform: "uppercase", letterSpacing: "-0.02em" }}>{p.name}</h2>
          <p style={{ fontStyle: "italic", fontSize: 18, marginTop: 8, opacity: 0.7 }}>{p.tagline}</p>
          <p style={{ fontSize: 15, lineHeight: 1.55, marginTop: 24 }}>{p.desc}</p>

          {p.ingredients && (<div style={{ marginTop: 20 }}><div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, opacity: 0.6 }}>Ingredienti</div><div style={{ fontSize: 14, lineHeight: 1.5 }}>{p.ingredients}</div></div>)}
          {p.usage && (<div style={{ marginTop: 16 }}><div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, opacity: 0.6 }}>Come usarlo</div><div style={{ fontSize: 14, lineHeight: 1.5 }}>{p.usage}</div></div>)}
          {p.contents && (<div style={{ marginTop: 16 }}><div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, opacity: 0.6 }}>Contenuto box</div><ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>{p.contents.map(c => <li key={c}>{c}</li>)}</ul></div>)}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "2px solid var(--c-ink)" }}>
            <div><div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.weight}</div><div style={{ fontFamily: "Archivo Black", fontSize: 38, fontWeight: 900 }}>€{p.price.toFixed(2)}</div></div>
            <button onClick={() => { addToCartB(p); onClose(); }} style={{ background: "var(--c-ink)", color: "var(--c-acid)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: "16px 28px", fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "5px 5px 0 var(--c-acid)" }}>Aggiungi al carrello →</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ShopApp() {
  const [cat, setCat] = useState("tutti");
  const [open, setOpen] = useState(null);
  const cartCount = useCartB();
  const filtered = useMemo(() => cat === "tutti" ? D_BOLD.products : D_BOLD.products.filter(p => p.category === cat), [cat]);

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <NavBoldB active="Shop" cartCount={cartCount} />

      <section style={{ padding: "160px 32px 60px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <StickerB color="var(--c-acid)" rotate={-6} top={120} right={60}>17 prodotti · 6 categorie</StickerB>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>Shop / Catalogo completo</div>
        <h1 style={{ fontFamily: "Archivo Black, var(--font-body)", fontWeight: 900, fontSize: "clamp(72px, 13vw, 220px)", lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0" }}>
          TUTTA LA<br /><span style={{ display: "inline-block", background: "var(--c-acid)", padding: "0 24px", border: "3px solid var(--c-ink)", borderRadius: 24, transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)" }}>GAMMA</span> DIAL.
        </h1>
        <p style={{ fontSize: 18, marginTop: 32, maxWidth: 600, lineHeight: 1.5 }}>Dal flacone squeeze ai box stagionali. Tutti i nostri prodotti, dal bosco direttamente alla tua tavola.</p>
      </section>

      <div style={{ position: "sticky", top: 100, zIndex: 50, padding: "0 32px", marginBottom: 24 }}>
        <div style={{ maxWidth: 1480, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap", background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", padding: 8, borderRadius: 999, boxShadow: "5px 5px 0 var(--c-ink)", justifyContent: "center" }}>
          {D_BOLD.categories.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              style={{ padding: "10px 18px", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase",
                background: cat === c.id ? "var(--c-ink)" : "transparent", color: cat === c.id ? "var(--c-acid)" : "var(--c-ink)", transition: "all 0.2s" }}>{c.label}</button>
          ))}
        </div>
      </div>

      <section style={{ padding: "32px 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <LayoutGroup>
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.03 }}>
                  <ProductCardBold p={p} idx={i} onOpen={setOpen} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>

      <AnimatePresence>{open && <ProductDetailOverlay p={open} onClose={() => setOpen(null)} />}</AnimatePresence>

      <FooterBoldB />
    </div>
  );
}

window.ShopApp = ShopApp;
