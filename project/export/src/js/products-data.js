// Dial Funghi — products data (mirrors official site)
window.PRODUCTS_DATA = {
  // GitHub raw base for files too large to import locally
  raw: "https://raw.githubusercontent.com/federicoorefice/dial-funghi-shop/main/",
  shipping: { freeThreshold: 30, standardCost: 4.90 },

  products: [
    // FIOR DI FUNGHI
    { id: "ffps", brand: "fior", name: "Porcini e Speck", tagline: "Il bosco incontra la montagna.", price: 3.99, weight: "180g", category: "fior-di-funghi", color: "#A66B3D", badges: ["Gluten Free"], img: "assets/products/porcini-speck.png", featured: true,
      desc: "La prima salsa ai funghi in formato squeeze. Porcini selezionati e speck trentino per un condimento intenso e versatile.",
      ingredients: "Funghi porcini, speck (carne di suino, sale, aromi naturali), olio EVO, aceto di vino, sale, aglio.",
      usage: "Scalda 2 min in padella o usa direttamente su pasta, risotto, hamburger e bruschette.",
      ideas: ["Pasta", "Bruschette", "Carni grigliate", "Formaggi", "Risotti"] },
    { id: "fftap", brand: "fior", name: "Tartufo e Pecorino", tagline: "Eleganza in formato squeeze.", price: 3.99, weight: "180g", category: "fior-di-funghi", color: "#5C4A35", badges: ["Gluten Free", "Vegetariano"], img: "assets/products/tartufo-pecorino.png", featured: true,
      desc: "L'incontro tra il profumo del tartufo e la sapidità del pecorino. Trasforma ogni piatto in esperienza gourmet.",
      ingredients: "Funghi (porcini, champignon), tartufo estivo, pecorino stagionato, olio EVO, sale.",
      usage: "Spalmala su crostini. Su pasta a fine cottura con burro. Su uova strapazzate a fuoco spento.",
      ideas: ["Pasta", "Uova", "Crostini", "Risotto", "Pizza bianca"] },
    { id: "ffpab", brand: "fior", name: "Paprika e BBQ", tagline: "Il bosco va in griglieria.", price: 3.99, weight: "180g", category: "fior-di-funghi", color: "#C24B2B", badges: ["Gluten Free", "Vegan"], img: "assets/products/paprika-bbq.png", featured: true,
      desc: "Funghi porcini con paprika affumicata e note BBQ per un condimento audace e inaspettato.",
      ingredients: "Funghi porcini, paprika affumicata, pomodoro, cipolla, olio di girasole, aceto di mele, zucchero di canna, sale, pepe.",
      usage: "Su carni alla griglia, hamburger, hot dog. Mix con maionese per BBQ cremosa.",
      ideas: ["Hamburger", "Carni grigliate", "Patatine", "Panini", "Verdure arrosto"] },
    { id: "fft", brand: "fior", name: "Teriyaki e Zenzero", tagline: "Il bosco viaggia in Oriente.", price: 3.99, weight: "180g", category: "fior-di-funghi", color: "#8F5A1F", badges: ["Gluten Free", "Vegan", "Limited Edition"], img: "assets/products/teriyaki-zenzero.png", featured: true,
      desc: "L'unica salsa ai porcini con anima fusion. Note umami del teriyaki e freschezza dello zenzero.",
      ingredients: "Funghi porcini, salsa di soia, zenzero, mirin, olio di sesamo, zucchero di canna, aglio.",
      usage: "Marina pollo, salmone o tofu 30 min. In wok negli ultimi 2 min. Su riso a fine cottura.",
      ideas: ["Salmone", "Pollo", "Riso", "Noodles", "Marinature"] },

    // CONDIMENTI (raw URL — files too big for local import)
    { id: "grig", brand: "dial", name: "Grigliata di Montagna", tagline: "Bosco a ogni grigliata.", price: 3.90, weight: "50g", category: "condimenti", color: "#7A4226", badges: ["Vegan", "Gluten Free"], img: "assets/products/grigliata-montagna.png", rawSrc: "IMMAGINI /altri prodotti dial /1 - CONDIMENTI/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 1 - GRIGLIATA DI MONTAGNA/PREPARATO grigliata di montagna .png",
      desc: "Blend di spezie essiccate con porcini per condire carne, pesce, pasta e verdure.",
      ideas: ["Carne", "Pesce", "Pasta", "Verdure"] },
    { id: "papor", brand: "dial", name: "Pasta ai Porcini", tagline: "Il blend essiccato per la pasta.", price: 3.90, weight: "50g", category: "condimenti", color: "#A66B3D", badges: ["Vegan", "Gluten Free"], img: "assets/products/preparato-porcini.png", rawSrc: "IMMAGINI /altri prodotti dial /1 - CONDIMENTI/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 2 - PREPARATO FUNGHI PORCINI/PREPARATO FUNGHI PORCINI RENDER.png",
      desc: "Condimento multiuso con spezie e porcini. Gusto ricco e naturale per ogni formato di pasta.",
      ideas: ["Pasta", "Risotto", "Zuppe"] },

    // POLENTA
    { id: "pol", brand: "dial", name: "Polenta ai Porcini", tagline: "Profumo di bosco in tavola.", price: 4.50, weight: "300g", category: "polenta", color: "#D9A547", badges: ["Vegan", "Gluten Free"], img: "assets/products/polenta.png",
      desc: "Polenta istantanea con farina di mais e porcini essiccati. Pronta in pochi minuti.",
      ideas: ["Piatto unico", "Contorno", "Crostini di polenta"] },

    // FUNGHI SECCHI
    { id: "psec", brand: "dial", name: "Porcini Secchi Speciali", tagline: "Aroma intenso, 100% naturali.", price: 4.90, weight: "60g", category: "funghi-secchi", color: "#A66B3D", badges: ["Vegan", "Gluten Free", "Bio"], img: "assets/products/porcini-secchi.png", featured: true,
      desc: "Fette di porcino selezionate ed essiccate lentamente per conservare aroma e consistenza.",
      ideas: ["Risotto", "Pasta", "Sughi", "Zuppe", "Trifolato"] },
    { id: "pext", brand: "dial", name: "Porcini Extra", tagline: "Selezione premium, aroma intenso.", price: 6.90, weight: "50g", category: "funghi-secchi", color: "#8B5A2B", badges: ["Vegan", "GF", "Bio", "Premium"], img: "assets/products/porcini-extra.png", rawSrc: "IMMAGINI /altri prodotti dial /3 - FUNGHI SECCHI SACCHETTO e BARATTOLO/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 5  - FUNGHI PORCINI QUALITA EXTRA SACCHETTO/IMMAGINE FUNGHI SACC EXTRA RENDER.png",
      desc: "La selezione più pregiata di porcini secchi. Ogni fetta è scelta a mano da personale specializzato.",
      ideas: ["Risotto", "Pasta", "Sughi pregiati", "Trifolato"] },
    { id: "morc", brand: "dial", name: "Morchelle Secche", tagline: "Sapore raffinato, 100% naturali.", price: 8.90, weight: "20g", category: "funghi-secchi", color: "#5C3A20", badges: ["Vegan", "GF"], img: "assets/products/morchelle.png", rawSrc: "IMMAGINI /altri prodotti dial /3 - FUNGHI SECCHI SACCHETTO e BARATTOLO/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 6  - FUNGHI MORCHELLE SACCHETTO/MORCHELLE SECCHE RENDER.png",
      desc: "Le spugnole sono tra i funghi più pregiati. Sapore delicato per piatti gourmet.",
      ideas: ["Pasta", "Risotto", "Uova", "Carni bianche"] },
    { id: "finf", brand: "dial", name: "Finferli Secchi", tagline: "Profumo delicato, 100% naturali.", price: 5.90, weight: "50g", category: "funghi-secchi", color: "#D9A547", badges: ["Vegan", "GF"], img: "assets/products/finferli.png", rawSrc: "IMMAGINI /altri prodotti dial /3 - FUNGHI SECCHI SACCHETTO e BARATTOLO/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 7  - FUNGHI FINFERLI SACCHETTO/FINFERLI SECCHI RENDER.png",
      desc: "I galletti essiccati conservano profumo delicato e fruttato.",
      ideas: ["Risotto", "Pasta", "Frittate", "Zuppe"] },
    { id: "shit", brand: "dial", name: "Shiitake a Fette", tagline: "Profumo intenso, gusto umami.", price: 12.90, weight: "400g", category: "funghi-secchi", color: "#3A2818", badges: ["Vegan", "GF"], img: "assets/products/shiitake.png", rawSrc: "IMMAGINI /altri prodotti dial /3 - FUNGHI SECCHI SACCHETTO e BARATTOLO/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 8  - FUNGHI SHIITAKE BARATTOLO/BOX SHITAKE RENDER.png",
      desc: "Shiitake essiccati a fette in pratico barattolo richiudibile. Consistenza carnosa.",
      ideas: ["Cucina asiatica", "Ramen", "Saltati", "Brodi"] },

    // BOX REGALO
    { id: "bestate", brand: "dial", name: "Box Estate", tagline: "Estate in tavola.", price: 24.90, weight: "Box regalo", category: "box", color: "#D9A547", badges: ["Regalo"], img: "assets/products/box-estate.png", rawSrc: "IMMAGINI /altri prodotti dial /4 - BOX/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 9  - BOX ESTATE/box estate .png", featured: true,
      desc: "Selezione estiva: Grigliata di Montagna, Bruschetta, Finferli, Polenta Finferli, Pomodori Secchi.",
      contents: ["Grigliata di Montagna", "Bruschetta", "Finferli Secchi", "Polenta Finferli", "Pomodori Secchi"] },
    { id: "bprim", brand: "dial", name: "Box Primavera", tagline: "Quando il gusto rifiorisce.", price: 26.90, weight: "Box regalo", category: "box", color: "#9CB85C", badges: ["Regalo"], img: "assets/products/box-primavera.png", rawSrc: "IMMAGINI /altri prodotti dial /4 - BOX/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 10  - BOX PRIMAVERA/BOX PRIMAVERA RENDER.png",
      desc: "Selezione primaverile: Morchelle, Aglio e Olio, Pepite del Bosco, Pesto, Polenta Trentina.",
      contents: ["Morchelle Secche", "Aglio e Olio", "Pepite del Bosco", "Pesto Genovese", "Polenta Trentina"] },
    { id: "baut", brand: "dial", name: "Box Autunno", tagline: "Calore, profumo, colore.", price: 26.90, weight: "Box regalo", category: "box", color: "#C24B2B", badges: ["Regalo"], img: "assets/products/box-autunno.png", rawSrc: "IMMAGINI /altri prodotti dial /4 - BOX/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 11  - BOX AUTUNNO/BOX AUTUNNOP.png",
      desc: "Sapori dell'autunno: Peperoncino, Polenta Tirolese, funghi autunnali, Vin Brulé, Polenta Porcini.",
      contents: ["Peperoncino essiccato", "Polenta Tirolese", "Funghi autunnali", "Vin Brulé", "Polenta Porcini"] },
    { id: "binv", brand: "dial", name: "Box Inverno", tagline: "Bandiera di montagna.", price: 39.90, weight: "Cassetta legno", category: "box", color: "#1F2820", badges: ["Premium", "Cassetta Legno"], img: "assets/products/box-inverno.png", rawSrc: "IMMAGINI /altri prodotti dial /4 - BOX/382025 - DIAL FUNGHI - SET IMMAGINI - PRODOTTO 12  - BOX INVERNO_nuovo/BOX INVERNO.png", featured: true,
      desc: "Cassetta in legno con selezione trifecta dei funghi più pregiati: Morchelle, Porcini, Finferli.",
      contents: ["Morchelle Secche", "Porcini Extra", "Finferli Secchi"] },
  ],

  categories: [
    { id: "tutti", label: "Tutti" },
    { id: "fior-di-funghi", label: "Fior di Funghi" },
    { id: "funghi-secchi", label: "Funghi Secchi" },
    { id: "condimenti", label: "Condimenti" },
    { id: "polenta", label: "Polenta" },
    { id: "box", label: "Box Regalo" },
  ],

  certifications: [
    { id: "brc", name: "BRC Food", year: "2001", img: "assets/cert/brc.png", desc: "Standard globale per la sicurezza alimentare. Certificazione conseguita per garantire i più alti standard di qualità nella lavorazione." },
    { id: "ifs", name: "IFS Food", year: "2005", img: "assets/cert/ifs.png", desc: "International Featured Standard. Sistema di gestione qualità riconosciuto dalla GDO europea." },
    { id: "vegan", name: "V-Label Vegan", year: "2018", img: "assets/cert/vegan.png", desc: "Certificazione che garantisce l'assenza di ingredienti di origine animale in tutta la gamma." },
    { id: "euk", name: "Bio EU", year: "2020", img: "assets/cert/euk.png", desc: "Foglia Bio europea: agricoltura biologica certificata secondo i regolamenti UE." },
    { id: "family", name: "Family Audit", year: "2022", img: "assets/cert/family-audit.png", desc: "Certificazione che riconosce le politiche aziendali a favore della conciliazione vita-lavoro." },
  ],
};

// Resolve raw URL fallback for missing local images
window.PRODUCTS_DATA.products.forEach(p => {
  if (p.rawSrc) {
    p.imgFallback = window.PRODUCTS_DATA.raw + encodeURI(p.rawSrc);
  }
});
