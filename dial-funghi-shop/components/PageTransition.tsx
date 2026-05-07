"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageTransition() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only fire when navigating TO the homepage
    if (pathname === "/" && prevPathname.current !== "/") {
      setShow(true);
      const t = setTimeout(() => setShow(false), 900);
      prevPathname.current = pathname;
      return () => clearTimeout(t);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="home-transition"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/logo-dial.png"
              alt="Dial Funghi"
              width={200}
              height={200}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            style={{
              marginTop: 24, width: 56, height: 3,
              background: "#D4271A", transformOrigin: "left",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
