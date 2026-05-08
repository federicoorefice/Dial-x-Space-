"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CERTIFICATIONS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BASE_PATH } from "@/lib/basepath";

const TIMELINE = [
  { y: "1992", t: "Nasce Dial", d: "Fondazione a Pergine Valsugana. Primo laboratorio di trasformazione funghi nel Trentino-Alto Adige.", c: "var(--c-acid)" },
  { y: "2001", t: "BRC Food", d: "Prima certificazione internazionale per la sicurezza alimentare. Entriamo nella grande distribuzione.", c: "#D9A547" },
  { y: "2005", t: "IFS Food", d: "International Featured Standard: riconoscimento ufficiale dalla grande distribuzione europea.", c: "var(--c-cream)" },
  { y: "2018", t: "V-Label Vegan", d: "Certificazione vegana su tutta la gamma. Apriamo nuovi mercati e raggiungiamo nuovi consumatori.", c: "#9CB85C" },
  { y: "2020", t: "Bio EU", d: "Certificazione biologica europea. Tre ettari di coltivazioni proprie nel rispetto dell'ecosistema.", c: "#6B9E3A", textLight: true },
  { y: "2024", t: "Fior di Funghi", d: "Lanciamo la prima salsa squeeze ai porcini: un formato innovativo che porta il bosco in cucina in un secondo.", c: "#C24B2B", textLight: true },
];

const B2B_CLIENTS = [
  { name: "Giovanni Rana", logo: "/images/loghi/brandforum_logotale_giovanni_rana_logo9-scaled.jpeg", since: 2008, type: "Pasta fresca & ripieni", detail: "Paste e estratti di porcini calibrati su specifiche tecniche per i ripieni di pasta fresca premium." },
  { name: "Parmalat", logo: "/images/loghi/Parmalat.svg", since: 2012, type: "Private Label & Bio", detail: "Ingredientistica Bio EU certificata per creme e prodotti a marchio del gruppo internazionale." },
  { name: "McDonald's", logo: "/images/loghi/McDonalds.svg", since: 2015, type: "Food Service & HoReCa", detail: "Componenti di fungo secco per ricette speciali dei menu stagionali nazionali." },
  { name: "COOP", logo: "/images/loghi/Coop_Italia.svg", since: 2003, type: "GDO & Private Label", detail: "Partner storico per private label biologica e funghi secchi confezionati a marchio COOP." },
  { name: "CONAD", logo: "/images/loghi/Conad.svg", since: 2005, type: "Distribuzione retail", detail: "Funghi secchi e linea biologica certificata per i punti vendita CONAD su tutto il territorio." },
  { name: "Develey", logo: "/images/loghi/Develey.svg", since: 2010, type: "Salse & condimenti", detail: "Estratti fungo resistenti alla pastorizzazione per salse e condimenti della linea premium." },
  { name: "Esselunga", logo: "/images/loghi/Esselunga.svg", since: 2007, type: "Premium retail", detail: "Gamma di funghi secchi gourmet e prodotti biologici selezionati per la clientela Esselunga." },
  { name: "Carrefour", logo: "/images/loghi/Carrefour.svg", since: 2009, type: "GDO Europa & Bio", detail: "Linea biologica certificata EU per la grande distribuzione Carrefour Italia ed Europa." },
  { name: "Lidl", logo: "/images/loghi/Lidl.svg", since: 2014, type: "Private Label discount", detail: "Prodotti fungo premium accessibili per la rete Lidl: qualità certificata a prezzo competitivo." },
  { name: "Metro", logo: "/images/loghi/Metro.svg", since: 2006, type: "HoReCa & Food Service", detail: "Semilavorati professionali (polveri, briciole, paste) per chef e operatori della ristorazione." },
  { name: "Eurospin", logo: "/images/loghi/Eurospin.svg", since: 2016, type: "Distribuzione GDO", detail: "Funghi secchi e prodotti confezionati selezionati per la rete discount premium Eurospin." },
  { name: "Tosano", logo: "/images/loghi/Tosano.svg", since: 2011, type: "GDO Nordest", detail: "Partner esclusivo per la distribuzione di prodotti biologici e funghi secchi nel Triveneto." },
];

const PHOTOS = [
  { src: "/images/azienda/stabilimento-1.jpg", h: 480 },
  { src: "/images/azienda/macchinario-1.png", h: 480 },
  { src: "/images/azienda/lab-1.png", h: 280 },
  { src: "/images/azienda/lab-2.jpg", h: 280 },
  { src: "/images/azienda/macchinario-2.png", h: 280 },
  { src: "/images/azienda/stabilimento-2.jpg", h: 280 },
];

const STAT_TARGETS = [
  { key: "anni", target: 33, suffix: "+", label: "Anni di storia" },
  { key: "cert", target: 5, suffix: "", label: "Certificazioni" },
  { key: "clienti", target: 10, suffix: "", label: "Clienti B2B" },
  { key: "prodotti", target: 50, suffix: "", label: "Prodotti totali" },
];

export default function ChiSiamoPage() {
  const [flippedCert, setFlippedCert] = useState<string | null>(null);
  const [flippedClient, setFlippedClient] = useState<string | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [hoveredTimeline, setHoveredTimeline] = useState<string | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({ anni: 0, cert: 0, clienti: 0, prodotti: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          const next: Record<string, number> = {};
          STAT_TARGETS.forEach(({ key, target }) => {
            next[key] = Math.round(target * ease);
          });
          setCounts(next);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--c-paper)", minHeight: "100vh", color: "var(--c-ink)" }}>
      <Navbar active="Chi Siamo" />

      {/* HERO */}
      <section style={{ padding: "160px 32px 80px", maxWidth: 1480, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            position: "absolute", top: 130, right: 80,
            background: "var(--c-acid)", color: "var(--c-ink)",
            fontWeight: 900, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "8px 16px", borderRadius: 999, border: "2.5px solid var(--c-ink)",
            boxShadow: "5px 5px 0 var(--c-ink)", transform: "rotate(-5deg)",
          }}
        >
          Dal 1992
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Chi siamo / Storia
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(72px, 13vw, 220px)",
            lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "16px 0 0",
          }}
        >
          PIÙ DI{" "}
          <span
            style={{
              display: "inline-block", background: "var(--c-acid)", padding: "0 24px",
              border: "3px solid var(--c-ink)", borderRadius: 24,
              transform: "rotate(-2deg)", boxShadow: "8px 8px 0 var(--c-ink)",
            }}
          >
            33 ANNI
          </span>
          <br />NEL BOSCO.
        </h1>
        <p style={{ fontSize: 20, marginTop: 32, maxWidth: 720, lineHeight: 1.6 }}>
          Tre generazioni di una famiglia trentina con una sola missione: portare il fungo migliore sulle tavole italiane. Non raccogliamo — selezioniamo. Acquistiamo funghi secchi dai migliori fornitori, li valutiamo con le nostre micologhe e li imbutiamo rigorosamente a mano.{" "}
          <a href="https://www.dialfunghi.it" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--c-ink)", fontWeight: 800, textDecoration: "underline" }}>
            dialfunghi.it ↗
          </a>
        </p>

        {/* Stats row — animated counters, bordered card */}
        <div
          ref={statsRef}
          style={{
            display: "inline-flex", flexWrap: "wrap", marginTop: 48,
            background: "var(--c-cream)", border: "2.5px solid var(--c-ink)",
            borderRadius: 24, boxShadow: "8px 8px 0 var(--c-ink)", overflow: "hidden",
          }}
        >
          {STAT_TARGETS.map(({ key, suffix, label }, i) => (
            <div key={key} style={{
              padding: "24px 36px",
              borderRight: i < STAT_TARGETS.length - 1 ? "2.5px solid var(--c-ink)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                {counts[key]}{suffix}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE — verticale centrata */}
      <section style={{ padding: "60px 32px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.03em", textTransform: "uppercase", fontWeight: 900, marginBottom: 48, textAlign: "center", lineHeight: 1.1 }}>
            La nostra{" "}
            <span style={{
              display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)",
              padding: "0 20px", border: "3px solid var(--c-ink)", borderRadius: 20,
              transform: "rotate(-2deg)", boxShadow: "7px 7px 0 var(--c-ink)",
            }}>
              storia
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {TIMELINE.map((it, i) => {
              const isHov = hoveredTimeline === it.y;
              const isLast = i === TIMELINE.length - 1;
              return (
                <div key={it.y} style={{ display: "grid", gridTemplateColumns: "120px 48px 1fr", alignItems: "flex-start" }}>

                  {/* Anno — sinistra */}
                  <div style={{ paddingTop: 22, textAlign: "right", paddingRight: 0, paddingBottom: isLast ? 0 : 36 }}>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 38px)",
                      letterSpacing: "-0.04em", lineHeight: 1, color: "var(--c-ink)",
                      opacity: isHov ? 1 : 0.45,
                      transition: "opacity 0.2s ease",
                    }}>
                      {it.y}
                    </div>
                  </div>

                  {/* Dot + linea — centro */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 26 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: it.c, border: "3px solid var(--c-ink)",
                      boxShadow: isHov ? `0 0 0 5px ${it.c}66` : "none",
                      transition: "box-shadow 0.25s ease",
                      zIndex: 1,
                    }} />
                    {!isLast && (
                      <div style={{
                        width: 3, flex: 1, minHeight: 48,
                        background: "var(--c-ink)", opacity: 0.1, borderRadius: 2,
                        marginTop: 4,
                      }} />
                    )}
                  </div>

                  {/* Card — destra */}
                  <div style={{ paddingLeft: 12, paddingBottom: isLast ? 0 : 28 }}>
                    <div
                      onMouseEnter={() => setHoveredTimeline(it.y)}
                      onMouseLeave={() => setHoveredTimeline(null)}
                      style={{
                        background: it.c, color: it.textLight ? "var(--c-cream)" : "var(--c-ink)",
                        border: "2.5px solid var(--c-ink)", borderRadius: 24,
                        padding: "28px 32px 30px",
                        boxShadow: isHov ? "12px 12px 0 var(--c-ink)" : "6px 6px 0 var(--c-ink)",
                        transform: isHov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                        cursor: "default",
                      }}
                    >
                      <div style={{ fontWeight: 900, fontSize: 17, textTransform: "uppercase", letterSpacing: "0.05em" }}>{it.t}</div>
                      <div style={{ fontSize: 15, marginTop: 10, lineHeight: 1.65, opacity: it.textLight ? 0.85 : 0.72 }}>{it.d}</div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOTO STABILIMENTO */}
      <section style={{ padding: "80px 32px", maxWidth: 1480, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
            lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 40px",
          }}
        >
          DENTRO IL{" "}
          <span
            style={{
              display: "inline-block", background: "#D9A547",
              padding: "0 18px", border: "3px solid var(--c-ink)", borderRadius: 18,
              transform: "rotate(2deg)", boxShadow: "6px 6px 0 var(--c-ink)",
            }}
          >
            LAB.
          </span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, gridAutoRows: "minmax(240px, auto)" }}>
          {PHOTOS.map((photo, i) => {
            const isHov = hoveredPhoto === i;
            return (
              <div key={i}
                onMouseEnter={() => setHoveredPhoto(i)}
                onMouseLeave={() => setHoveredPhoto(null)}
                style={{
                  border: "2.5px solid var(--c-ink)", borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: isHov ? "14px 14px 0 var(--c-ink)" : "6px 6px 0 var(--c-ink)",
                  height: photo.h, gridColumn: i === 0 ? "1" : "auto",
                  position: "relative",
                  transform: isHov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                  cursor: "default",
                }}
              >
                <Image src={`${BASE_PATH}${photo.src}`} alt="Dial Funghi stabilimento" fill style={{ objectFit: "cover" }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* B2B — CLIENTI */}
      <section style={{
        background: "var(--c-ink)", color: "var(--c-cream)",
        padding: "120px 32px 0", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: 20 }}>
            Mercato B2B / Partner industriali
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", marginBottom: 80 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.04em",
              margin: 0, color: "var(--c-cream)",
            }}>
              Non siamo<br />un fornitore<br />qualsiasi.<br />
              <span style={{ color: "var(--c-acid)" }}>Siamo l&apos;eccellenza.</span>
            </h2>
            <div style={{ paddingTop: 16 }}>
              <p style={{ fontSize: 18, color: "rgba(245,239,224,0.85)", lineHeight: 1.7, margin: "0 0 28px" }}>
                Giovanni Rana, Develey, Parmalat e le più grandi insegne della distribuzione italiana non scelgono i fornitori per caso. Scelgono Dial Funghi perché siamo l&apos;unico partner che unisce materia prima d&apos;eccellenza, tecnologia industriale avanzata e un laboratorio R&D interno dedicato allo sviluppo di nuovi ingredienti.
              </p>
              <p style={{ fontSize: 15, color: "rgba(245,239,224,0.65)", lineHeight: 1.65, margin: 0 }}>
                Quando un brand leader deve formulare un nuovo sugo, creare una pasta fresca con fungo, sviluppare una ricetta di qualità superiore — chiama noi. Perché sappiamo trasformare il fungo secco in qualsiasi forma: estratto, polvere, pasta, emulsione. E lo facciamo con zero additivi chimici.
              </p>
            </div>
          </div>

          {/* 3 pillars — perché ci scelgono */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 80 }}>
            {[
              {
                n: "01",
                title: "Tecnologia\nIndustriale",
                body: "Linee di produzione all'avanguardia per formati liquidi (paste, estratti, salse, emulsioni) e secchi (polveri micronizzate, briciole calibrate). Investiamo ogni anno in nuovi macchinari.",
                bg: "var(--c-acid)", color: "var(--c-ink)", rot: -1.5,
                photo: "/images/azienda/macchinario-1.png",
              },
              {
                n: "02",
                title: "R&D Interno\nDedicato",
                body: "Il nostro team di micologhe e food technologist sviluppa su richiesta nuovi ingredienti funzionali. Lavoriamo in NDA con i brand partner, dalla prototipazione alla produzione in scala.",
                bg: "var(--c-cream)", color: "var(--c-ink)", rot: 1,
                photo: "/images/azienda/lab-1.png",
              },
              {
                n: "03",
                title: "Filiera Corta\nCertificata",
                body: "Selezioniamo personalmente i fornitori di funghi secchi in tutto il mondo. Ogni lotto è tracciato, analizzato in laboratorio e certificato BRC, IFS, Bio EU, Vegan V-Label.",
                bg: "var(--c-acid)", color: "var(--c-ink)", rot: -1,
                photo: "/images/azienda/stabilimento-1.jpg",
              },
            ].map((p) => {
              const isHov = hoveredPillar === p.n;
              return (
                <div
                  key={p.n}
                  onMouseEnter={() => setHoveredPillar(p.n)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  style={{
                    background: p.bg, color: p.color,
                    border: "2.5px solid var(--c-cream)",
                    borderRadius: 24, overflow: "hidden",
                    boxShadow: isHov ? "16px 16px 0 var(--c-cream)" : "8px 8px 0 var(--c-cream)",
                    transform: isHov
                      ? `translateY(-10px) scale(1.04) rotate(${p.rot}deg)`
                      : `translateY(0) scale(1) rotate(${p.rot}deg)`,
                    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                    cursor: "default",
                  }}
                >
                  {/* Photo strip */}
                  <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                    <Image
                      src={`${BASE_PATH}${p.photo}`}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {/* Text */}
                  <div style={{ padding: "28px 28px 32px" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", opacity: 0.5, marginBottom: 12 }}>
                      {p.n}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontSize: "clamp(20px, 2vw, 28px)",
                      textTransform: "uppercase", letterSpacing: "-0.03em",
                      lineHeight: 0.95, marginBottom: 16, whiteSpace: "pre-line",
                    }}>
                      {p.title}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0, opacity: 0.8 }}>{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why Rana, Develey, Parmalat */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
              Case — perché i leader ci scelgono
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                {
                  brand: "Giovanni Rana",
                  logo: "/images/loghi/brandforum_logotale_giovanni_rana_logo9-scaled.jpeg",
                  role: "Leader mondiale nella pasta fresca",
                  text: "Rana richiede ingredienti con profilo aromatico estremamente costante e tracciabilità completa del lotto. Il nostro laboratorio sviluppa estratti e paste di porcini calibrate su specifiche tecniche precise, integrabili direttamente nella loro linea di produzione ad alta velocità.",
                  tag: "Paste & Estratti",
                  photo: "/images/ricette/pasta-grigliata.png",
                  accent: "var(--c-acid)",
                },
                {
                  brand: "Develey",
                  logo: "/images/loghi/Develey.svg",
                  role: "Primo produttore europeo di salse",
                  text: "Per Develey sviluppiamo componenti di fungo che resistono ai processi di pastorizzazione e sterilizzazione senza perdere il profilo aromatico. Un risultato impossibile con additivi chimici — noi lo otteniamo con processi fisici brevettati.",
                  tag: "Componenti per salse",
                  photo: "/images/ricette/sugo-porcini.png",
                  accent: "var(--c-cream)",
                },
                {
                  brand: "Parmalat",
                  logo: "/images/loghi/Parmalat.svg",
                  role: "Gruppo alimentare internazionale",
                  text: "Parmalat lavora con Dial per l'ingredientistica dei propri prodotti in Private Label. La nostra certificazione Bio EU e la filiera completamente tracciata sono requisiti non negoziabili che pochi fornitori in Europa riescono a garantire ai loro livelli.",
                  tag: "Private Label & Bio",
                  photo: "/images/ricette/polenta-porcini.png",
                  accent: "var(--c-acid)",
                },
              ].map((c, i) => {
                const isHov = hoveredCase === c.brand;
                const rot = i % 2 === 0 ? -0.8 : 0.8;
                return (
                  <div
                    key={c.brand}
                    onMouseEnter={() => setHoveredCase(c.brand)}
                    onMouseLeave={() => setHoveredCase(null)}
                    style={{
                      background: "var(--c-cream)", color: "var(--c-ink)",
                      border: "2.5px solid var(--c-cream)",
                      borderRadius: 24, overflow: "hidden",
                      boxShadow: isHov ? "16px 16px 0 var(--c-cream)" : "8px 8px 0 var(--c-cream)",
                      transform: isHov
                        ? `translateY(-10px) scale(1.03) rotate(${rot}deg)`
                        : `translateY(0) scale(1) rotate(${rot}deg)`,
                      transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                      cursor: "default",
                    }}
                  >
                    {/* Photo strip */}
                    <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                      <Image
                        src={`${BASE_PATH}${c.photo}`}
                        alt={c.brand}
                        fill
                        style={{ objectFit: "cover", filter: "brightness(0.75) saturate(0.9)" }}
                      />
                      {/* Tag overlay */}
                      <div style={{
                        position: "absolute", top: 12, left: 12,
                        background: c.accent, color: "var(--c-ink)",
                        border: "2px solid var(--c-ink)", borderRadius: 999,
                        padding: "5px 14px", fontSize: 10, fontWeight: 900,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        boxShadow: "3px 3px 0 var(--c-ink)",
                      }}>{c.tag}</div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "24px 26px 28px" }}>
                      {/* Logo + name row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                        <div style={{
                          background: "#fff", borderRadius: 12, border: "1.5px solid var(--c-ink)",
                          padding: "6px 10px", flexShrink: 0,
                        }}>
                          <Image
                            src={`${BASE_PATH}${c.logo}`}
                            alt={c.brand}
                            width={70} height={32}
                            style={{ objectFit: "contain", display: "block" }}
                          />
                        </div>
                        <div>
                          <div style={{
                            fontFamily: "var(--font-heading)", fontSize: "clamp(18px, 1.8vw, 24px)",
                            textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1,
                          }}>{c.brand}</div>
                          <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.45, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>
                            {c.role}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "100%", height: 2, background: "var(--c-ink)", opacity: 0.1, borderRadius: 2, marginBottom: 16 }} />
                      <p style={{ fontSize: 13, color: "rgba(10,15,12,0.72)", lineHeight: 1.7, margin: 0 }}>{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Client logo grid — flip cards */}
          <div style={{ paddingTop: 60, borderTop: "2px solid rgba(212,255,60,0.15)", marginBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: 12 }}>
                  Partner ufficiali
                </div>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4.5vw, 64px)",
                  lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em",
                  color: "var(--c-cream)", margin: 0,
                }}>
                  Loro scelgono<br /><span style={{ color: "var(--c-acid)" }}>Dial Funghi.</span>
                </h3>
              </div>
              <p style={{ fontSize: 14, color: "rgba(245,239,224,0.6)", maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
                Hover sui loghi per scoprire il tipo di partnership.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
              {B2B_CLIENTS.map((client) => {
                const isFlipped = flippedClient === client.name;
                return (
                  <div
                    key={client.name}
                    onMouseEnter={() => setFlippedClient(client.name)}
                    onMouseLeave={() => setFlippedClient(null)}
                    style={{ perspective: 800, cursor: "pointer", height: 195 }}
                  >
                    <div style={{
                      position: "relative", width: "100%", height: "100%",
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}>
                      {/* Front */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                        background: "#fff", border: "2.5px solid rgba(245,239,224,0.3)",
                        borderRadius: 20, boxShadow: "6px 6px 0 rgba(212,255,60,0.4)",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", padding: 20, gap: 10,
                      }}>
                        <Image src={`${BASE_PATH}${client.logo}`} alt={client.name} width={150} height={64} style={{ objectFit: "contain", maxHeight: 64 }} />
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999" }}>Partner dal {client.since}</div>
                      </div>
                      {/* Back */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "var(--c-acid)", color: "var(--c-ink)",
                        border: "2.5px solid rgba(245,239,224,0.3)",
                        borderRadius: 20, boxShadow: "6px 6px 0 rgba(212,255,60,0.4)",
                        display: "flex", flexDirection: "column",
                        alignItems: "flex-start", justifyContent: "center", padding: "18px 20px",
                      }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: 17, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1 }}>
                          {client.name}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.55, marginTop: 4 }}>Dal {client.since}</div>
                        <div style={{ width: 28, height: 2, background: "var(--c-ink)", borderRadius: 2, margin: "10px 0 8px" }} />
                        <div style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.07em", opacity: 0.7, marginBottom: 7 }}>{client.type}</div>
                        <div style={{ fontSize: 11, lineHeight: 1.55, opacity: 0.8 }}>{client.detail}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Produzione industriale */}
          <div style={{ paddingTop: 60, paddingBottom: 100, borderTop: "2px solid rgba(212,255,60,0.15)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: 16 }}>
              Semilavorati / OEM / Private Label
            </div>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4.5vw, 64px)",
              textTransform: "uppercase", letterSpacing: "-0.03em", color: "var(--c-cream)",
              lineHeight: 0.9, margin: "0 0 48px",
            }}>
              Produzione<br /><span style={{ color: "var(--c-acid)" }}>su misura.</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 36 }}>
              {[
                {
                  title: "Prodotti Liquidi",
                  body: "Estratti, concentrati, paste, emulsioni, puree e salse. Ideali per zuppe, minestroni, sughi pronti, ripieni e pasta fresca industriale. Disponibili in formati standard o sviluppati su specifica cliente.",
                },
                {
                  title: "Prodotti Secchi",
                  body: "Polvere micronizzata, polvere &lt;2mm, briciole calibrate (1–9mm). Adatti a ogni applicazione nel food processing industriale: da condimenti a snack, da panificazione a pet food premium.",
                },
              ].map((card) => (
                <div key={card.title} style={{
                  background: "rgba(245,239,224,0.05)", border: "2px solid rgba(212,255,60,0.2)",
                  borderRadius: 20, padding: "28px 24px",
                }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, textTransform: "uppercase", color: "var(--c-acid)", marginBottom: 14, lineHeight: 1 }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(245,239,224,0.72)", lineHeight: 1.7, margin: 0 }}
                     dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
              {["Bio EU", "Vegan V-Label", "Gluten Free", "Allergen Free", "Non-GMO", "BRC Food", "IFS Food"].map((c) => (
                <span key={c} style={{
                  background: "rgba(212,255,60,0.1)", border: "1.5px solid rgba(212,255,60,0.3)",
                  color: "var(--c-acid)", borderRadius: 999,
                  padding: "7px 16px", fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>{c}</span>
              ))}
            </div>
            <Link href="/contatti" className="pop" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--c-acid)", color: "var(--c-ink)",
              border: "2.5px solid var(--c-acid)", borderRadius: 999,
              padding: "18px 32px", fontWeight: 900, fontSize: 14,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", boxShadow: "5px 5px 0 rgba(212,255,60,0.4)",
            }}>
              Richiedi informazioni B2B →
            </Link>
          </div>
        </div>
      </section>

      {/* CERTIFICAZIONI — con flip 3D */}
      <section style={{ padding: "100px 32px", background: "var(--c-cream)", color: "var(--c-ink)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6, marginBottom: 20 }}>
            Le nostre certificazioni
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            QUALITÀ{" "}
            <span
              style={{
                display: "inline-block", background: "var(--c-acid)", color: "var(--c-ink)",
                padding: "0 18px", border: "3px solid var(--c-ink)", borderRadius: 18,
                transform: "rotate(-2deg)", boxShadow: "6px 6px 0 var(--c-ink)",
              }}
            >
              CERTIFICATA.
            </span>
          </h2>
          <p style={{ fontSize: 15, opacity: 0.65, marginBottom: 48 }}>
            Passa il mouse su ogni certificazione per scoprire cosa significa. ✋
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {CERTIFICATIONS.map((c) => {
              const isFlipped = flippedCert === c.id;
              return (
                <div
                  key={c.id}
                  onMouseEnter={() => setFlippedCert(c.id)}
                  onMouseLeave={() => setFlippedCert(null)}
                  style={{ perspective: 800, cursor: "pointer", height: 280 }}
                >
                  <div style={{
                    position: "relative", width: "100%", height: "100%",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}>
                    {/* Front */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: "var(--c-paper)", color: "var(--c-ink)",
                      border: "2.5px solid var(--c-ink)", borderRadius: 24,
                      padding: 24, boxShadow: "6px 6px 0 var(--c-ink)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      textAlign: "center",
                    }}>
                      <Image src={`${BASE_PATH}${c.img}`} alt={c.name} width={100} height={100} style={{ objectFit: "contain" }} />
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: 16 }}>{c.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>Dal {c.year}</div>
                      <div style={{ fontSize: 11, marginTop: 12, opacity: 0.45, fontStyle: "italic" }}>Passa il mouse per saperne di più</div>
                    </div>
                    {/* Back */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "var(--c-acid)", color: "var(--c-ink)",
                      border: "2.5px solid var(--c-ink)", borderRadius: 24,
                      padding: 28, boxShadow: "6px 6px 0 var(--c-ink)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      textAlign: "center",
                    }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em" }}>{c.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 10 }}>Ottenuto nel {c.year}</div>
                      <div style={{ width: 40, height: 2, background: "var(--c-ink)", margin: "16px auto" }} />
                      <div style={{ fontSize: 14, lineHeight: 1.65 }}>{c.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section style={{ padding: "100px 32px", background: "var(--c-acid)", color: "var(--c-ink)", borderTop: "3px solid var(--c-ink)" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(38px, 6vw, 90px)",
            lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.04em", margin: 0,
          }}>
            Vieni a<br />trovarci.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 16, lineHeight: 1.6 }}>
              <strong>Dial Funghi S.r.l.</strong><br />
              Via Dei Prati, 60<br />
              38057 Pergine Valsugana (TN)<br />
              <a href="mailto:info@dialfunghi.it" style={{ color: "var(--c-ink)", fontWeight: 700 }}>info@dialfunghi.it</a> ·{" "}
              <a href="tel:+390461534505" style={{ color: "var(--c-ink)", fontWeight: 700 }}>+39 0461 534505</a>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/contatti" style={{
                background: "var(--c-ink)", color: "var(--c-acid)",
                border: "3px solid var(--c-ink)", padding: "16px 28px",
                borderRadius: 999, fontWeight: 900, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "5px 5px 0 var(--c-ink)",
              }}>Contattaci →</Link>
              <a href="https://www.dialfunghi.it" target="_blank" rel="noopener noreferrer" style={{
                background: "transparent", color: "var(--c-ink)",
                border: "3px solid var(--c-ink)", padding: "16px 28px",
                borderRadius: 999, fontWeight: 800, fontSize: 14,
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none",
              }}>dialfunghi.it ↗</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
