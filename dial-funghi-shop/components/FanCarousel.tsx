"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/basepath";
import { type Product, formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  products: Product[];
}

const ROTATIONS = [-14, -7, 0, 7, 14];
const SCALES    = [0.72, 0.84, 1, 0.84, 0.72];
const Y_OFFSETS = [32,   16,  0, 16,  32];

export default function FanCarousel({ products }: Props) {
  const [center, setCenter] = useState(0);

  const visible = products.map((_, i) => {
    const offset = ((i - center + products.length) % products.length);
    const wrapped = offset > products.length / 2 ? offset - products.length : offset;
    return { product: products[i], offset: wrapped };
  }).sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset)); // render sides first, center on top

  const slots = [-2, -1, 0, 1, 2];

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "hidden", overflowY: "visible" }}>
      {/* Fan stage */}
      <div style={{
        position: "relative",
        height: 520,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}>
        {slots.map((slot) => {
          const idx = ((center + slot) % products.length + products.length) % products.length;
          const product = products[idx];
          const slotIndex = slot + 2; // 0..4
          const rotation = ROTATIONS[slotIndex] ?? 0;
          const scale    = SCALES[slotIndex]    ?? 0.72;
          const yOffset  = Y_OFFSETS[slotIndex] ?? 32;
          const isCenter = slot === 0;

          return (
            <motion.div
              key={`${slot}-${product.id}`}
              layout
              onClick={() => !isCenter && setCenter(idx)}
              style={{
                position: "absolute",
                width: 220,
                cursor: isCenter ? "default" : "pointer",
                zIndex: isCenter ? 10 : 5 - Math.abs(slot),
                transformOrigin: "bottom center",
              }}
              animate={{
                rotate: rotation,
                scale,
                y: yOffset,
                x: slot * 160,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div style={{
                background: "var(--c-cream)",
                border: `3px solid var(--c-ink)`,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: isCenter
                  ? `8px 8px 0 var(--c-ink)`
                  : `4px 4px 0 var(--c-ink)`,
                transition: "box-shadow 0.3s",
              }}>
                {/* Product image */}
                <div style={{
                  position: "relative",
                  height: isCenter ? 260 : 180,
                  background: `${product.color}22`,
                  transition: "height 0.3s",
                }}>
                  <Image
                    src={`${BASE_PATH}${product.img}`}
                    alt={product.name}
                    fill
                    style={{ objectFit: "contain", padding: 16 }}
                  />
                  {isCenter && (
                    <div style={{
                      position: "absolute", top: 10, right: 10,
                      background: product.color,
                      border: "2px solid var(--c-ink)", borderRadius: 999,
                      padding: "4px 12px", fontSize: 10, fontWeight: 900,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      color: "var(--c-ink)",
                    }}>
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: isCenter ? "20px 20px 22px" : "12px 14px 16px" }}>
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900, fontSize: isCenter ? 18 : 13,
                    textTransform: "uppercase", letterSpacing: "-0.02em",
                    lineHeight: 1, color: "var(--c-ink)",
                  }}>{product.name}</div>

                  {isCenter && (
                    <>
                      <p style={{ fontSize: 12, color: "rgba(10,15,12,0.6)", margin: "8px 0 0", fontStyle: "italic", lineHeight: 1.4 }}>
                        &ldquo;{product.tagline}&rdquo;
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22, color: "var(--c-ink)" }}>
                          {formatPrice(product.price)}
                        </span>
                        <AddToCartButton product={product} />
                      </div>
                    </>
                  )}

                  {!isCenter && (
                    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(10,15,12,0.5)", marginTop: 4 }}>
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nav dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 36 }}>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCenter(i)}
            style={{
              width: i === center ? 28 : 10, height: 10, borderRadius: 999,
              border: "2px solid var(--c-ink)", padding: 0, cursor: "pointer",
              background: i === center ? "var(--c-ink)" : "transparent",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Shop CTA */}
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <Link href="/shop" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "var(--c-acid)", color: "var(--c-ink)",
          border: "3px solid var(--c-ink)", padding: "14px 28px",
          borderRadius: 999, fontWeight: 900, fontSize: 13,
          letterSpacing: "0.06em", textTransform: "uppercase",
          textDecoration: "none", boxShadow: "5px 5px 0 var(--c-ink)",
        }}>Vedi tutti i prodotti →</Link>
      </div>
    </div>
  );
}
