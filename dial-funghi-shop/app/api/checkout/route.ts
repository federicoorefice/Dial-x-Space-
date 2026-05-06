import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { getProductById, SHIPPING } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

const cartItemSchema = z.object({
  id: z.string().min(1).max(20),
  qty: z.number().int().min(1).max(99),
});

const requestSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
    }

    const { items } = parsed.data;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    // Build Stripe line items from catalog (never trust client prices)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let subtotal = 0;

    for (const { id, qty } of items) {
      const product = getProductById(id);
      if (!product) {
        return NextResponse.json({ error: `Prodotto non trovato: ${id}` }, { status: 400 });
      }
      subtotal += product.price * qty;
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.tagline,
            images: [`${baseUrl}${product.img}`],
            metadata: { productId: product.id },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: qty,
      });
    }

    // Add shipping as a separate line item if applicable
    const shippingCost = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardCost;
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Spedizione standard" },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      locale: "it",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IT", "DE", "FR", "AT", "CH", "BE", "NL", "LU", "ES", "PT"],
      },
      phone_number_collection: { enabled: false },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/carrello`,
      metadata: {
        items: JSON.stringify(items.map(({ id, qty }) => ({ id, qty }))),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
