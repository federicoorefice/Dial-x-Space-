"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  location: string;
  stars: number;
  text: string;
  product: string;
  color: string;
}

interface Props {
  reviews: Review[];
}

const ROTATIONS = [-4, 2.5, -2, 4, -3.5, 1.5, -2.5, 3];

export default function SocialFanWall({ reviews }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to right, var(--c-paper), transparent)",
        zIndex: 5, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to left, var(--c-paper), transparent)",
        zIndex: 5, pointerEvents: "none",
      }} />

      {/* Scrolling track */}
      <motion.div
        ref={trackRef}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          display: "flex",
          gap: 24,
          paddingLeft: 24,
          paddingTop: 20,
          paddingBottom: 40,
          width: "max-content",
        }}
      >
        {[...reviews, ...reviews].map((rev, i) => {
          const rot = ROTATIONS[i % ROTATIONS.length];
          return (
            <motion.div
              key={`${rev.id}-${i}`}
              whileHover={{ rotate: 0, scale: 1.06, y: -12, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              style={{
                width: 280,
                flexShrink: 0,
                rotate: rot,
                background: rev.color,
                border: "2.5px solid var(--c-ink)",
                borderRadius: 20,
                padding: "24px 22px",
                boxShadow: "6px 6px 0 var(--c-ink)",
                cursor: "default",
                transformOrigin: "center bottom",
              }}
            >
              {/* Stars */}
              <div style={{ fontSize: 16, letterSpacing: 2, marginBottom: 12 }}>
                {"★".repeat(rev.stars)}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: 14, lineHeight: 1.6, margin: 0, fontStyle: "italic",
                color: "var(--c-ink)",
              }}>
                &ldquo;{rev.text}&rdquo;
              </p>

              {/* Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 20 }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 900,
                    textTransform: "uppercase", color: "var(--c-ink)",
                  }}>{rev.name}</div>
                  <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 700, letterSpacing: "0.08em", marginTop: 2 }}>
                    {rev.location}
                  </div>
                </div>
                <div style={{
                  background: "var(--c-ink)", color: "var(--c-acid)",
                  padding: "4px 10px", borderRadius: 999,
                  fontSize: 9, fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.06em",
                }}>
                  {rev.product}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
