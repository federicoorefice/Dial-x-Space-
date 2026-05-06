"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Ricette", href: "/ricette" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
];

export default function Navbar({ active }: { active?: string }) {
  const { count } = useCart();

  return (
    <nav
      style={{
        position: "fixed", top: 20, left: 0, right: 0, zIndex: 100, padding: "0 24px",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          maxWidth: 1480, margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link href="/"
          style={{
            background: "var(--c-cream)", border: "2.5px solid var(--c-ink)", borderRadius: 999,
            padding: "8px 20px 8px 8px", display: "flex", alignItems: "center", gap: 12,
            textDecoration: "none", color: "var(--c-ink)", boxShadow: "4px 4px 0 var(--c-ink)",
          }}
        >
          <Image src="/images/logo-dial.png" alt="Dial Funghi" width={42} height={42} style={{ objectFit: "contain" }} />
          <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.02em", textTransform: "uppercase" }}>
            Dial Funghi
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              style={{
                background: active === l.label ? "var(--c-ink)" : "var(--c-cream)",
                color: active === l.label ? "var(--c-acid)" : "var(--c-ink)",
                border: "2.5px solid var(--c-ink)", borderRadius: 999,
                padding: "10px 18px", fontWeight: 800, fontSize: 13,
                letterSpacing: "0.04em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "3px 3px 0 var(--c-ink)",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Cart */}
          <Link href="/carrello"
            style={{
              background: count > 0 ? "var(--c-acid)" : "var(--c-cream)",
              color: "var(--c-ink)", border: "2.5px solid var(--c-ink)", borderRadius: 999,
              padding: "10px 18px", fontWeight: 900, fontSize: 13,
              letterSpacing: "0.04em", textTransform: "uppercase",
              textDecoration: "none", boxShadow: "3px 3px 0 var(--c-ink)",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            🛒{count > 0 && ` ${count}`}
          </Link>
        </div>
      </div>
    </nav>
  );
}
