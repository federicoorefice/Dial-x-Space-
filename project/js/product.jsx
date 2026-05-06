/* global React, Motion */
/* ============================================================
   PRODUCT DETAIL — 3D rotating bottle + tabs + add to cart
   ============================================================ */

function getProductId() {
  const u = new URL(window.location.href);
  return u.searchParams.get("id") || "porcini";
}

function PDPHero({ p, onAdd }) {
  const [qty, setQty] = useState(1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Mouse parallax
  const mx = useMotionValue(0), my = useMotionValue(0);
  const mRotateY = useSpring(useTransform(mx, [-1, 1], [-20, 20]), { stiffness: 100, damping: 18 });
  const mRotateX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 100, damping: 18 });
  const combinedRY = useTransform([rotateY, mRotateY], ([a, b]) => a + b);

  return (
    <section ref={ref} className="section-paper" style={{ paddingTop: 140, paddingBottom: 120, position: "relative", overflow: "hidden" }} data-screen-label="01 PDP Hero">
      {/* Color halo */}
      <div style={{ position: "absolute", left: "50%", top: "55%", width: 1000, height: 1000, transform: "translate(-50%, -50%)", borderRadius: "50%", background: `radial-gradient(circle, ${p.color}33 0%, transparent 60%)`, filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
        {/* Left — info */}
        <div>
          <button onClick={() => navigateMasked("shop.html")} className="eyebrow" style={{ background: "transparent", border: "none", color: "var(--c-paper-mute)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 40, padding: 0 }}>
            <Arrow s={12} dir="n" /> Torna al shop
          </button>
          <div className="eyebrow" style={{ color: p.color, marginBottom: 20 }}>{p.note}</div>
          <BlurText text={p.name} stepDelay={70}
            className="font-display" 
            style={{ color: "var(--c-paper-deep)", fontSize: "clamp(56px, 8vw, 128px)", lineHeight: 0.92, letterSpacing: "-0.03em" }} />
          <p className="body-lg" style={{ color: "var(--c-paper-mute)", maxWidth: 480, marginTop: 32 }}>{p.description}</p>

          {/* Intensity meter */}
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-paper-mute)" }}>
              <span>Intensità</span><span>{p.intensity}/5</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[1,2,3,4,5].map(i => (
                <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  style={{ flex: 1, height: 6, borderRadius: 3, background: i <= p.intensity ? p.color : "rgba(31,38,31,0.12)", transformOrigin: "left" }} />
              ))}
            </div>
          </div>

          {/* Pairings */}
          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ color: "var(--c-paper-mute)", marginBottom: 12 }}>Si abbina con</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.pairings.map((tag) => (
                <span key={tag} style={{ padding: "8px 16px", borderRadius: 999, fontSize: 13, color: "var(--c-paper-deep)", border: "1px solid rgba(31,38,31,0.2)", background: "rgba(255,255,255,0.4)" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Price + qty + add */}
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div className="font-display" style={{ fontSize: 64, lineHeight: 1, color: "var(--c-paper-deep)" }}>€{p.price}</div>
              <div style={{ fontSize: 12, color: "var(--c-paper-mute)", marginTop: 4 }}>{p.weight} · IVA inclusa</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(31,38,31,0.2)", borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.4)" }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 48, background: "transparent", border: "none", cursor: "pointer", color: "var(--c-paper-deep)" }}><Minus s={14} /></button>
              <span style={{ width: 44, textAlign: "center", fontSize: 15, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 44, height: 48, background: "transparent", border: "none", cursor: "pointer", color: "var(--c-paper-deep)" }}><Plus s={14} /></button>
            </div>
            <Magnetic>
              <button onClick={() => onAdd(p, qty)} className="btn-dark" style={{ padding: "16px 28px", fontSize: 14 }}>
                <Plus s={14} /> Aggiungi al carrello
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right — bottle 3D */}
        <motion.div onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
            my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
          }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          style={{ height: 720, position: "relative", perspective: 1400, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.img src={p.img} alt={p.name}
            style={{ height: "100%", maxWidth: "100%", objectFit: "contain", rotateY: combinedRY, rotateX: mRotateX, scale, transformStyle: "preserve-3d", filter: `drop-shadow(0 60px 80px ${p.color}77) drop-shadow(0 25px 30px rgba(0,0,0,0.3))` }} />
          {/* Floating tags */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "15%", right: "8%", padding: "10px 16px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--c-paper-deep)", border: "1px solid rgba(31,38,31,0.1)" }}>
            ✓ Senza conservanti
          </motion.div>
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", bottom: "20%", left: "5%", padding: "10px 16px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--c-paper-deep)", border: "1px solid rgba(31,38,31,0.1)" }}>
            ✓ Vegan
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PDPDetails({ p }) {
  const [tab, setTab] = useState("ingredienti");
  const tabs = [
    { id: "ingredienti", label: "Ingredienti", content: (
      <div>
        <p className="body-lg" style={{ color: "var(--c-paper-deep)", maxWidth: 720 }}>
          Funghi misti masticati (proporzione variabile 17%): {p.id === "porcini" ? "porcini, champignon" : p.id === "tartufo" ? "champignon, tartufo nero estivo (3%)" : p.id === "paprika" ? "champignon, paprika affumicata" : "shiitake, champignon"}, olio di girasole, acqua, aceto, concentrato di funghi, sale, zuccheri, addensanti naturali, aromi naturali.
        </p>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[{l:"Energia", v:"346 kcal"}, {l:"Grassi", v:"30g"}, {l:"Carboidrati", v:"4,7g"}, {l:"Proteine", v:"1,1g"}].map(s => (
            <div key={s.l} style={{ padding: 24, borderRadius: 16, background: "var(--c-paper-2)", border: "1px solid rgba(31,38,31,0.08)" }}>
              <div className="font-display" style={{ fontSize: 32, color: "var(--c-paper-deep)" }}>{s.v}</div>
              <div className="eyebrow" style={{ color: "var(--c-paper-mute)", marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    )},
    { id: "uso", label: "Come si usa", content: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {[
          { n: "01", t: "Agita", d: "Agita bene il flacone prima dell'uso per amalgamare gli ingredienti naturali." },
          { n: "02", t: "Spremi", d: "Spremi direttamente sul piatto. Tre secondi e il bosco è pronto." },
          { n: "03", t: "Conserva", d: "Dopo l'apertura, conserva in frigo a 2-4°C. Da consumarsi entro 10 giorni." },
        ].map(s => (
          <div key={s.n} style={{ padding: 28, background: "var(--c-paper-2)", borderRadius: 24, border: "1px solid rgba(31,38,31,0.08)" }}>
            <div className="font-display" style={{ fontSize: 56, color: p.color, lineHeight: 0.9 }}>{s.n}</div>
            <h4 className="font-display" style={{ fontSize: 28, color: "var(--c-paper-deep)", marginTop: 16, marginBottom: 12 }}>{s.t}</h4>
            <p className="body" style={{ color: "var(--c-paper-mute)" }}>{s.d}</p>
          </div>
        ))}
      </div>
    )},
    { id: "filiera", label: "Filiera", content: (
      <div>
        <p className="body-lg" style={{ color: "var(--c-paper-deep)", maxWidth: 720, marginBottom: 32 }}>
          Tutti i nostri prodotti sono certificati secondo i più alti standard internazionali di qualità e sostenibilità.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[{n:"BRC Food", d:"Sicurezza alimentare globale"}, {n:"IFS Food", d:"Standard internazionale"}, {n:"ICEA Bio", d:"Certificazione biologica"}, {n:"Vegan", d:"100% vegetale"}].map(c => (
            <div key={c.n} style={{ padding: "16px 24px", borderRadius: 16, background: "var(--c-paper-deep)", color: "var(--c-paper)", minWidth: 200 }}>
              <div className="font-display" style={{ fontSize: 22 }}>{c.n}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    )},
  ];

  return (
    <section className="section-paper-2" style={{ padding: "120px 24px" }} data-screen-label="02 PDP Details">
      <div className="container">
        <div style={{ display: "flex", gap: 8, marginBottom: 56, borderBottom: "1px solid rgba(31,38,31,0.15)" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: "16px 24px", background: "transparent", border: "none", borderBottom: tab === t.id ? `2px solid ${p.color}` : "2px solid transparent", color: tab === t.id ? "var(--c-paper-deep)" : "var(--c-paper-mute)", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: -1, transition: "all 0.3s" }}>
              {t.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}>
            {tabs.find(t => t.id === tab).content}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PDPRelated({ p }) {
  const others = PRODUCTS.filter(o => o.id !== p.id);
  return (
    <section className="section-paper" style={{ padding: "120px 24px 200px" }} data-screen-label="03 PDP Related">
      <div className="container">
        <h2 className="font-display" style={{ color: "var(--c-paper-deep)", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 56 }}>
          Anche tu potresti<br/><span style={{ color: "var(--c-bark)" }}>amare.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {others.map((o) => (
            <motion.a key={o.id}
              href={`prodotto.html?id=${o.id}`} onClick={(e) => { e.preventDefault(); navigateMasked(`prodotto.html?id=${o.id}`); }}
              whileHover={{ y: -6 }}
              style={{ background: "var(--c-paper-2)", borderRadius: 24, padding: 28, textDecoration: "none", color: "var(--c-paper-deep)", border: "1px solid rgba(31,38,31,0.08)", display: "block" }}>
              <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={o.img} alt={o.name} style={{ height: "100%", objectFit: "contain", filter: `drop-shadow(0 24px 30px ${o.color}55)` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                <h3 className="font-display" style={{ fontSize: 26, margin: 0 }}>{o.name}</h3>
                <span className="font-display" style={{ fontSize: 24 }}>€{o.price}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductApp() {
  const cart = useCart();
  const [toast, setToast] = useState(null);
  const id = getProductId();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const handleAdd = (product, qty = 1) => { cart.add(product, qty); setToast(product); setTimeout(() => setToast(null), 2200); };

  return (
    <div>
      <PageMask />
      <div className="grain" />
      <NavbarSub cartCount={cart.count} light current="Shop" />
      <main className="section-paper">
        <PDPHero p={p} onAdd={handleAdd} />
        <PDPDetails p={p} />
        <PDPRelated p={p} />
      </main>
      <Footer subpage />

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 32, background: "var(--c-ink)", color: "var(--c-cream)", padding: "12px 20px 12px 12px", borderRadius: 999, display: "flex", alignItems: "center", gap: 12, zIndex: 200, boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
            <img src={toast.img} alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <div style={{ fontSize: 13 }}><span style={{ fontWeight: 600 }}>{toast.name}</span> aggiunto al carrello</div>
            <Check s={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

window.ProductApp = ProductApp;
