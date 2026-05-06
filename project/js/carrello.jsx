/* global React, Motion, D_BOLD, NavBoldB, FooterBoldB, useCartB, bp */
const { useState, useEffect } = React;
const { motion, AnimatePresence } = Motion;

function readCart() { try { return JSON.parse(localStorage.getItem("dial_cart") || "[]"); } catch { return []; } }
function writeCart(c) { localStorage.setItem("dial_cart", JSON.stringify(c)); window.dispatchEvent(new Event("storage")); }

function CarrelloApp() {
  const cartCount = useCartB();
  const [items, setItems] = useState(readCart());
  useEffect(() => { const f = () => setItems(readCart()); window.addEventListener("storage", f); return () => window.removeEventListener("storage", f); }, []);
  const sub = items.reduce((a, x) => a + x.price * x.qty, 0);
  const ship = sub >= 30 || sub === 0 ? 0 : 4.90;
  const tot = sub + ship;

  function up(id, d) { const c = items.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x); setItems(c); writeCart(c); }
  function rm(id) { const c = items.filter(x => x.id !== id); setItems(c); writeCart(c); }

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <NavBoldB active="Carrello" cartCount={cartCount} />

      <section style={{ padding: "160px 32px 60px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>Carrello</div>
        <h1 style={{ fontFamily: "Archivo Black, var(--font-body)", fontSize: "clamp(64px, 11vw, 180px)", lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0" }}>
          IL TUO <span style={{ display: "inline-block", background: "var(--c-acid)", padding: "0 24px", border: "3px solid var(--c-ink)", borderRadius: 24, transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)" }}>BOSCO</span>.
        </h1>
      </section>

      <section style={{ padding: "0 32px 120px", maxWidth: 1480, margin: "0 auto", display: "grid", gridTemplateColumns: items.length ? "1.6fr 1fr" : "1fr", gap: 32 }}>
        <div>
          {items.length === 0 ? (
            <div style={{ background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 28, padding: 60, boxShadow: "8px 8px 0 var(--c-ink)", textAlign: "center" }}>
              <div style={{ fontFamily: "Archivo Black", fontSize: 32, textTransform: "uppercase", marginBottom: 12 }}>Carrello vuoto</div>
              <div style={{ fontSize: 15, opacity: 0.7, marginBottom: 24 }}>Riempilo con i nostri prodotti.</div>
              <a href="shop.html" style={{ background: "var(--c-ink)", color: "var(--c-acid)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: "14px 28px", fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", display: "inline-block", boxShadow: "5px 5px 0 var(--c-acid)" }}>Vai allo shop →</a>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((it, i) => (
                <motion.div key={it.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  style={{ background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 24, padding: 20, marginBottom: 16, boxShadow: "6px 6px 0 var(--c-ink)", display: "grid", gridTemplateColumns: "100px 1fr auto auto", gap: 20, alignItems: "center" }}>
                  <div style={{ background: "var(--c-paper-2)", borderRadius: 16, height: 100, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--c-ink)" }}>
                    <img src={bp(it.img)} alt={it.name} style={{ maxHeight: 80, maxWidth: "85%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Archivo Black", fontSize: 18, textTransform: "uppercase", lineHeight: 1 }}>{it.name}</div>
                    <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>€{it.price.toFixed(2)} cad.</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--c-paper-2)", border: "2px solid var(--c-ink)", borderRadius: 999, padding: 4 }}>
                    <button onClick={() => up(it.id, -1)} style={{ width: 30, height: 30, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, fontWeight: 900 }}>−</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontWeight: 800 }}>{it.qty}</span>
                    <button onClick={() => up(it.id, 1)} style={{ width: 30, height: 30, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, fontWeight: 900 }}>+</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <div style={{ fontFamily: "Archivo Black", fontSize: 22 }}>€{(it.price * it.qty).toFixed(2)}</div>
                    <button onClick={() => rm(it.id)} style={{ background: "transparent", border: "none", color: "var(--c-ketchup)", fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>Rimuovi</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <aside style={{ background: "var(--c-acid)", border: "2.5px solid var(--c-ink)", borderRadius: 28, padding: 32, boxShadow: "10px 10px 0 var(--c-ink)", height: "fit-content", position: "sticky", top: 120 }}>
            <div style={{ fontFamily: "Archivo Black", fontSize: 28, textTransform: "uppercase", marginBottom: 24 }}>Riepilogo</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 15 }}><span>Subtotale</span><span style={{ fontWeight: 800 }}>€{sub.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 15 }}><span>Spedizione</span><span style={{ fontWeight: 800 }}>{ship === 0 ? "Gratis" : `€${ship.toFixed(2)}`}</span></div>
            {sub < 30 && <div style={{ fontSize: 12, fontWeight: 700, padding: "10px 14px", background: "var(--c-ink)", color: "var(--c-acid)", borderRadius: 14, marginTop: 12, textAlign: "center" }}>Aggiungi €{(30 - sub).toFixed(2)} per spedizione gratis</div>}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 20, borderTop: "2px solid var(--c-ink)", fontFamily: "Archivo Black", fontSize: 24 }}><span>Totale</span><span>€{tot.toFixed(2)}</span></div>
            <button style={{ width: "100%", background: "var(--c-ink)", color: "var(--c-acid)", border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: "18px", fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", marginTop: 24, boxShadow: "5px 5px 0 rgba(0,0,0,0.4)" }}>Procedi al checkout →</button>
          </aside>
        )}
      </section>

      <FooterBoldB />
    </div>
  );
}
window.CarrelloApp = CarrelloApp;
