"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      style={{
        background: added ? "var(--c-acid)" : "var(--c-ink)",
        color: added ? "var(--c-ink)" : "var(--c-acid)",
        border: "2.5px solid var(--c-ink)", borderRadius: 999,
        padding: "12px 20px", fontWeight: 900, fontSize: 13,
        letterSpacing: "0.06em", textTransform: "uppercase",
        cursor: "pointer", transition: "all 0.2s",
        boxShadow: "4px 4px 0 var(--c-acid)",
      }}
    >
      {added ? "✓ Aggiunto" : "Aggiungi +"}
    </button>
  );
}
