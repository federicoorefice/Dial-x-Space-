import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getProductById, formatPrice } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});
const resend = new Resend(process.env.RESEND_API_KEY);

// Required for raw body verification
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCompletedOrder(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedOrder(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name ?? "Cliente";
  const orderId = session.id.slice(-8).toUpperCase();

  // Parse items from metadata
  let items: { id: string; qty: number }[] = [];
  try {
    items = JSON.parse(session.metadata?.items ?? "[]");
  } catch {}

  const itemsHtml = items
    .map(({ id, qty }) => {
      const p = getProductById(id);
      if (!p) return "";
      return `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${p.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${qty}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${formatPrice(p.price * qty)}</td>
      </tr>`;
    })
    .join("");

  const totalFormatted = formatPrice((session.amount_total ?? 0) / 100);
  // shipping_details typings lag behind the API version
  const shippingAddress = (session as { shipping_details?: { address?: { line1?: string | null; line2?: string | null; postal_code?: string | null; city?: string | null } } }).shipping_details?.address;
  const addressHtml = shippingAddress
    ? `${shippingAddress.line1 ?? ""}${shippingAddress.line2 ? ", " + shippingAddress.line2 : ""}, ${shippingAddress.postal_code} ${shippingAddress.city}`
    : "—";

  const emailHtml = (to: "business" | "customer") => `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><title>Ordine #${orderId}</title></head>
<body style="font-family:'Barlow',Arial,sans-serif;background:#F0EAD8;margin:0;padding:32px">
  <div style="max-width:580px;margin:0 auto;background:#F5EFE0;border:2.5px solid #0A0F0C;border-radius:24px;overflow:hidden;box-shadow:8px 8px 0 #0A0F0C">
    <div style="background:#D4FF3C;padding:32px;border-bottom:2.5px solid #0A0F0C">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6">Dial Funghi</div>
      <h1 style="font-size:32px;font-weight:900;text-transform:uppercase;letter-spacing:-0.02em;margin:8px 0 0">
        ${to === "business" ? "🛒 Nuovo ordine!" : "Grazie, " + customerName.split(" ")[0] + "!"}
      </h1>
      <div style="font-size:14px;margin-top:8px;opacity:0.7">Ordine #${orderId}</div>
    </div>
    <div style="padding:32px">
      ${to === "customer" ? `<p style="font-size:15px;line-height:1.6">Abbiamo ricevuto il tuo ordine e lo stiamo preparando. Riceverai un'email con il tracking appena spedito.</p>` : ""}
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <thead>
          <tr style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;opacity:0.5">
            <th style="text-align:left;padding-bottom:8px">Prodotto</th>
            <th style="text-align:center;padding-bottom:8px">Qtà</th>
            <th style="text-align:right;padding-bottom:8px">Totale</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top:16px;font-weight:900;font-size:16px;text-transform:uppercase">Totale ordine</td>
            <td style="padding-top:16px;font-weight:900;font-size:22px;text-align:right">${totalFormatted}</td>
          </tr>
        </tfoot>
      </table>
      ${to === "business" ? `<p><strong>Cliente:</strong> ${customerName} — ${customerEmail ?? "—"}</p><p><strong>Indirizzo:</strong> ${addressHtml}</p>` : `<p><strong>Indirizzo di consegna:</strong> ${addressHtml}</p>`}
      <hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
      <p style="font-size:12px;opacity:0.5;text-align:center">Dial Funghi S.r.l. · P.IVA 02439500220 · Via Dei Prati, 60 · 38057 Pergine Valsugana (TN)</p>
    </div>
  </div>
</body>
</html>`;

  const emailPromises = [];

  // Email al business
  emailPromises.push(
    resend.emails.send({
      from: "Dial Funghi Shop <noreply@dialfunghi.it>",
      to: [process.env.BUSINESS_EMAIL ?? "federico.orefice@dialfunghi.it"],
      subject: `🛒 Nuovo ordine #${orderId} — ${totalFormatted}`,
      html: emailHtml("business"),
    })
  );

  // Email al cliente se disponibile
  if (customerEmail) {
    emailPromises.push(
      resend.emails.send({
        from: "Dial Funghi <ordini@dialfunghi.it>",
        to: [customerEmail],
        subject: `Ordine confermato #${orderId} — Dial Funghi`,
        html: emailHtml("customer"),
      })
    );
  }

  await Promise.allSettled(emailPromises);
}
