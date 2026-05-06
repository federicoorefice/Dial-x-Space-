/* global React, Motion, D_BOLD, StickerB, NavBoldB, FooterBoldB, useCartB, bp */
const { motion } = Motion;

function ChiSiamoApp() {
  const cartCount = useCartB();
  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <NavBoldB active="Chi Siamo" cartCount={cartCount} />

      {/* HERO */}
      <section style={{ padding: "160px 32px 80px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <StickerB color="var(--c-acid)" rotate={-5} top={130} right={80}>Dal 1992</StickerB>
        <StickerB color="var(--c-mustard)" rotate={4} top={200} right={40}>Trentino · Italia</StickerB>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>Chi siamo / Storia</div>
        <h1 style={{ fontFamily: "Archivo Black, var(--font-body)", fontSize: "clamp(72px, 13vw, 220px)", lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0" }}>
          PIÙ DI <span style={{ display: "inline-block", background: "var(--c-acid)", padding: "0 24px", border: "3px solid var(--c-ink)", borderRadius: 24, transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)" }}>30 ANNI</span><br />NEL BOSCO.
        </h1>
        <p style={{ fontSize: 20, marginTop: 32, maxWidth: 720, lineHeight: 1.5 }}>Tre generazioni di una famiglia trentina dedicate a un solo frutto: il fungo. Dalla raccolta alla lavorazione, ogni passo è nostro.</p>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "60px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {[
            { y: "1992", t: "Inizio", d: "Il primo laboratorio di trasformazione funghi a Trento.", c: "var(--c-acid)" },
            { y: "2001", t: "BRC Food", d: "Prima certificazione internazionale di sicurezza alimentare.", c: "var(--c-mustard)" },
            { y: "2018", t: "V-Label", d: "Linea vegana certificata.", c: "var(--c-cream)" },
            { y: "2024", t: "Fior di Funghi", d: "Lancio della prima salsa squeeze ai porcini.", c: "var(--c-ketchup)", textLight: true },
          ].map((it, i) => (
            <motion.div key={it.y} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: it.c, color: it.textLight ? "var(--c-cream)" : "var(--c-ink)", border: "2.5px solid var(--c-ink)", borderRadius: 24, padding: 28, boxShadow: "8px 8px 0 var(--c-ink)", transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)" }}>
              <div style={{ fontFamily: "Archivo Black", fontSize: 56, lineHeight: 1, letterSpacing: "-0.04em" }}>{it.y}</div>
              <div style={{ fontWeight: 900, fontSize: 18, marginTop: 8, textTransform: "uppercase" }}>{it.t}</div>
              <div style={{ fontSize: 14, marginTop: 8, lineHeight: 1.5, opacity: it.textLight ? 0.85 : 0.75 }}>{it.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOTO STABILIMENTO */}
      <section style={{ padding: "80px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Archivo Black", fontSize: "clamp(48px, 7vw, 110px)", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 40px" }}>
          DENTRO IL <span style={{ display: "inline-block", background: "var(--c-mustard)", padding: "0 18px", border: "3px solid var(--c-ink)", borderRadius: 18, transform: "rotate(2deg)", boxShadow: "6px 6px 0 var(--c-ink)" }}>LAB</span>.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, gridAutoRows: "minmax(240px, auto)" }}>
          {[
            { src: "assets/azienda/stabilimento-1.jpg", h: 480, span: 1 },
            { src: "assets/azienda/macchinario-1.png", h: 480 },
            { src: "assets/azienda/lab-1.png", h: 280 },
            { src: "assets/azienda/lab-2.jpg", h: 280 },
            { src: "assets/azienda/macchinario-2.png", h: 280 },
            { src: "assets/azienda/stabilimento-2.jpg", h: 280 },
          ].map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              style={{ border: "2.5px solid var(--c-ink)", borderRadius: 24, overflow: "hidden", boxShadow: "6px 6px 0 var(--c-ink)", height: it.h, gridColumn: i === 0 ? "1" : "auto" }}>
              <img src={bp(it.src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICAZIONI */}
      <section style={{ padding: "100px 32px", background: "var(--c-ink)", color: "var(--c-cream)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>Le nostre certificazioni</div>
          <h2 style={{ fontFamily: "Archivo Black", fontSize: "clamp(48px, 7vw, 110px)", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "16px 0 60px", color: "var(--c-cream)" }}>
            QUALITÀ <span style={{ display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)", padding: "0 18px", border: "3px solid var(--c-cream)", borderRadius: 18, transform: "rotate(-2deg)", boxShadow: "6px 6px 0 var(--c-acid)" }}>CERTIFICATA</span>.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {D_BOLD.certifications.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "var(--c-cream)", color: "var(--c-ink)", border: "2.5px solid var(--c-cream)", borderRadius: 24, padding: 24, boxShadow: "6px 6px 0 var(--c-acid)", textAlign: "center" }}>
                <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <img src={bp(c.img)} alt={c.name} style={{ maxHeight: 110, maxWidth: "85%", objectFit: "contain" }} />
                </div>
                <div style={{ fontFamily: "Archivo Black", fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{c.name}</div>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Dal {c.year}</div>
                <div style={{ fontSize: 12, marginTop: 12, lineHeight: 1.5, opacity: 0.75 }}>{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterBoldB />
    </div>
  );
}
window.ChiSiamoApp = ChiSiamoApp;
