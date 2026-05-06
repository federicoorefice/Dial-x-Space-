/* global React, Motion, D_BOLD, StickerB, NavBoldB, FooterBoldB, useCartB, bp */
const { useState, useEffect } = React;
const { motion } = Motion;

const RECIPES = [
  { id: "risotto-porcini", title: "Risotto cremoso al fungo", time: "25 min", diff: "Facile", tag: "Porcini e Speck", productId: "ffps", color: "#D4FF3C", img: "assets/ricette/risotto-porcini.png" },
  { id: "burger-gourmet", title: "Burger gourmet con fungo", time: "15 min", diff: "Facile", tag: "Porcini e Speck", productId: "ffps", color: "#F2C200", img: "assets/ricette/panino-bbq.png" },
  { id: "bruschette", title: "Bruschette autunnali", time: "5 min", diff: "Facilissima", tag: "Porcini e Speck", productId: "ffps", color: "#E63B1E", img: "assets/ricette/risotto-porcini.png" },
  { id: "uova-tartufo", title: "Uova strapazzate al tartufo", time: "8 min", diff: "Facilissima", tag: "Tartufo e Pecorino", productId: "fftap", color: "#2E4FE8", img: "assets/ricette/tartufo-pecorino.png" },
  { id: "toast-gourmet", title: "Toast gourmet", time: "5 min", diff: "Facilissima", tag: "Tartufo e Pecorino", productId: "fftap", color: "#F5EFE0", img: "assets/ricette/tartufo-pecorino.png" },
  { id: "tagliolini", title: "Tagliolini al tartufo", time: "10 min", diff: "Facile", tag: "Tartufo e Pecorino", productId: "fftap", color: "#D4FF3C", img: "assets/ricette/tartufo-pecorino.png" },
  { id: "costine", title: "Costine BBQ", time: "60 min", diff: "Media", tag: "Paprika e BBQ", productId: "ffpab", color: "#E63B1E", img: "assets/ricette/panino-bbq.png" },
  { id: "patatine", title: "Patatine al forno", time: "35 min", diff: "Facile", tag: "Paprika e BBQ", productId: "ffpab", color: "#F2C200", img: "assets/ricette/panino-bbq.png" },
  { id: "hotdog", title: "Hot dog gourmet", time: "10 min", diff: "Facile", tag: "Paprika e BBQ", productId: "ffpab", color: "#D4FF3C", img: "assets/ricette/panino-bbq.png" },
  { id: "salmone", title: "Salmone alla brace", time: "20 min", diff: "Facile", tag: "Teriyaki e Zenzero", productId: "fft", color: "#2E4FE8", img: "assets/ricette/teriyaki-salmone.png" },
  { id: "bowl-pollo", title: "Bowl di pollo teriyaki", time: "25 min", diff: "Facile", tag: "Teriyaki e Zenzero", productId: "fft", color: "#F5EFE0", img: "assets/ricette/teriyaki-salmone.png" },
  { id: "wok-verdure", title: "Wok di verdure fusion", time: "15 min", diff: "Facile", tag: "Teriyaki e Zenzero", productId: "fft", color: "#D4FF3C", img: "assets/ricette/teriyaki-salmone.png" },
];
const TAGS = ["Tutte", "Porcini e Speck", "Tartufo e Pecorino", "Paprika e BBQ", "Teriyaki e Zenzero"];

function RecipeCard({ r, i }) {
  const product = D_BOLD.products.find(p => p.id === r.productId);
  return (
    <motion.a href="#" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
      whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
      style={{
        background: r.color, color: "var(--c-ink)", border: "2.5px solid var(--c-ink)", borderRadius: 28,
        boxShadow: "8px 8px 0 var(--c-ink)", padding: 24, textDecoration: "none", display: "block",
        transition: "all 0.3s", position: "relative", overflow: "hidden",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ background: "var(--c-ink)", color: r.color, padding: "5px 11px", borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>{r.diff}</span>
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, fontWeight: 700 }}>⏱ {r.time}</span>
      </div>

      <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0 16px", borderRadius: 16, overflow: "hidden" }}>
        {r.img
          ? <img src={bp(r.img)} alt={r.title} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 16 }} />
          : product && <img src={bp(product.img)} alt={product.name} style={{ maxHeight: 160, maxWidth: "70%", objectFit: "contain", transform: "rotate(-6deg)", filter: "drop-shadow(6px 6px 0 rgba(0,0,0,0.15))" }} />
        }
      </div>

      <div style={{ fontFamily: "Archivo Black, var(--font-body)", fontWeight: 900, fontSize: 22, lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{r.title}</div>
      <div style={{ fontSize: 12, marginTop: 10, fontWeight: 700, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.05em" }}>Con {r.tag}</div>
    </motion.a>
  );
}

function RicetteApp() {
  const [tag, setTag] = useState("Tutte");
  const cartCount = useCartB();
  const filtered = tag === "Tutte" ? RECIPES : RECIPES.filter(r => r.tag === tag);
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <NavBoldB active="Ricette" cartCount={cartCount} />

      <section style={{ padding: "160px 32px 60px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <StickerB color="var(--c-ketchup)" rotate={4} top={130} right={120}>{RECIPES.length} ricette</StickerB>
        <StickerB color="var(--c-mustard)" rotate={-3} top={200} right={60}>Quick & easy</StickerB>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>Ricette / Squeeze quotidiano</div>
        <h1 style={{ fontFamily: "Archivo Black, var(--font-body)", fontSize: "clamp(72px, 13vw, 220px)", lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0" }}>
          UNO <span style={{ display: "inline-block", background: "var(--c-acid)", padding: "0 24px", border: "3px solid var(--c-ink)", borderRadius: 24, transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)" }}>SQUEEZE</span><br />E SEI A CENA.
        </h1>
        <p style={{ fontSize: 18, marginTop: 32, maxWidth: 600, lineHeight: 1.5 }}>Ricette pronte in pochi minuti. Pasta, bowl, burger, brunch — il bosco diventa pratico.</p>
      </section>

      <div style={{ padding: "0 32px 32px", maxWidth: 1480, margin: "0 auto", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {TAGS.map(t => (
          <button key={t} onClick={() => setTag(t)}
            style={{ background: tag === t ? "var(--c-ink)" : "var(--c-cream)", color: tag === t ? "var(--c-acid)" : "var(--c-ink)",
              border: "2.5px solid var(--c-ink)", borderRadius: 999, padding: "10px 22px", fontWeight: 800, fontSize: 12,
              letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "4px 4px 0 var(--c-ink)" }}>{t}</button>
        ))}
      </div>

      <section style={{ padding: "32px 32px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {filtered.map((r, i) => <RecipeCard key={r.id} r={r} i={i} />)}
        </div>
      </section>

      <FooterBoldB />
    </div>
  );
}
window.RicetteApp = RicetteApp;
