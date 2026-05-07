import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/basepath";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--c-acid)", color: "var(--c-ink)",
        padding: "100px 24px 40px", borderTop: "3px solid var(--c-ink)",
      }}
    >
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex", justifyContent: "space-between", flexWrap: "wrap",
            gap: 32, marginTop: 60, paddingTop: 32, borderTop: "2px solid var(--c-ink)",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src={`${BASE_PATH}/images/logo-dial.png`} alt="Dial Funghi" width={50} height={50} />
            <div>
              <div style={{ fontWeight: 900, fontSize: 16, textTransform: "uppercase" }}>
                Dial Funghi S.r.l.
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                Via Dei Prati, 60 · 38057 Pergine Valsugana (TN)
              </div>
            </div>
          </div>

          {/* Legal */}
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            © 2026 Dial S.r.l. · P.IVA 02439500220 · info@dialfunghi.it · +39 0461 534505
          </div>
        </div>

        {/* Legal links */}
        <div
          style={{
            display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap",
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.6,
          }}
        >
          <Link href="/privacy" style={{ color: "var(--c-ink)", textDecoration: "none" }}>Privacy</Link>
          <Link href="/cookie" style={{ color: "var(--c-ink)", textDecoration: "none" }}>Cookie</Link>
          <Link href="/termini" style={{ color: "var(--c-ink)", textDecoration: "none" }}>Termini</Link>
          <Link href="/recesso" style={{ color: "var(--c-ink)", textDecoration: "none" }}>Recesso</Link>
          <a href="https://www.dialfunghi.it" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--c-ink)", textDecoration: "none" }}>
            dialfunghi.it ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
