"use client";
import { motion } from "framer-motion";

const STRIP_1 = ["PORCINI E SPECK", "DAL BOSCO TRENTINO", "SQUEEZE GOURMET", "100% NATURALE", "🍄", "FIOR DI FUNGHI"];
const STRIP_2 = ["TARTUFO E PECORINO", "PAPRIKA E BBQ", "DAL 1992", "TERIYAKI E ZENZERO", "🌲", "CERTIFICATO BRC"];

function renderStrip(items: string[]) {
  return (
    <>
      {Array.from({ length: 6 }).flatMap((_, i) =>
        items.map((t, j) => (
          <span key={`${i}-${j}`} style={{ fontWeight: 900, fontSize: 15, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
            {t}<span style={{ margin: "0 20px", opacity: 0.4 }}>·</span>
          </span>
        ))
      )}
    </>
  );
}

export default function CrossTicker() {
  return (
    <div style={{ position: "relative", height: 240, overflow: "hidden", background: "var(--c-paper)" }}>
      {/* Band 1 — tilts top-left → bottom-right, scrolls leftward */}
      <div style={{
        position: "absolute", left: "-20%", right: "-20%", top: "15%",
        transform: "rotate(-7deg)",
        background: "var(--c-ink)", overflow: "hidden",
        padding: "14px 0",
        borderTop: "2.5px solid var(--c-ink)", borderBottom: "2.5px solid var(--c-ink)",
        zIndex: 2,
      }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", color: "var(--c-cream)" }}
        >
          {renderStrip(STRIP_1)}
          {renderStrip(STRIP_1)}
        </motion.div>
      </div>

      {/* Band 2 — tilts top-right → bottom-left, scrolls rightward */}
      <div style={{
        position: "absolute", left: "-20%", right: "-20%", top: "50%",
        transform: "rotate(7deg)",
        background: "var(--c-acid)", overflow: "hidden",
        padding: "14px 0",
        borderTop: "2.5px solid var(--c-ink)", borderBottom: "2.5px solid var(--c-ink)",
        zIndex: 1,
      }}>
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", color: "var(--c-ink)" }}
        >
          {renderStrip(STRIP_2)}
          {renderStrip(STRIP_2)}
        </motion.div>
      </div>
    </div>
  );
}
