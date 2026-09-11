"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePaystackPayment } from "react-paystack";
import { GLOBAL_MARKET_MATRIX } from "../../../../middleware";

// ====================================================================
// 🗃️ HIGH-LUXURY ARCHIVE PORTFOLIO: FRONTEND SINGLE SOURCE OF TRUTH
// ====================================================================
const MASTER_FRONTEND_COLLECTION = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    name: "COLONIA DELUXE",
    slug: "colonia-deluxe",
    base_price: 72000, // Updated: 40% OFF from 120,000
    images: ["/images/img/Colonia Deluxe.jpg", "/images/img/perfume3.jpg"],
    product_description:
      "Designed for the modern connoisseur, COLONIA DELUXE by Fizac Fragrance redefines the classic, sun-drenched freshness of traditional colognes by infusing it with an unapologetic, contemporary depth. It captures the essence of refined luxury—opening with an explosive, invigorating brightness before settling into a rich, magnetic trail that commands attention. Crafted with high-performance projection in mind, this is not a scent that fades into the background, tailored for individuals who demand both timeless elegance and unforgettable presence.",
    product_details: [
      "Concentration: Eau de parfum / High Concentration Blend",
      "Scent Family: Citrus - Aromatic - Woody",
      "Master Perfumer: Emmanuel Charles",
      "Made in Nigeria",
      "Top Notes: Italian Bergamot, Black Currant, Apple, Lemon, Cedar, Lavender",
      "Heart Notes: Frankincense, Moroccan Jasmine, Juniper Berries, Birch",
      "Base Notes: Ambergris, Musk, Patchouli, Tonka Bean, Sandalwood, Leather, Vanilla",
      "Ingredients: Alcohol Denat, Parfum, Pogostemon Cablin Oil, Citrus Aurantium Bergamia Peel Oil, Citrus Limon Peel Oil, Benzyl Benzoate, Coumarin, Limonene, Vanillin, Linalyl Acetate, Linalool, Beta-Caryophyllene, Pinene, Pelargonium Graveolens Flower Oil, Citral, Citronellol, Terpineol, Rose Ketones, Eugenol, Geranyl Acetate, Geraniol, Terpinolene, Santalol, Camphor, Alpha-Terpinene, Rose Flower Oil/Extract, Benzyl Alcohol, Carvone, Farnesol"
    ],
    variants: [{ id: "v1", variant_value: "100ml", price_modifier: 0 }]
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "ELIXIR OF GODS",
    slug: "elixir-of-gods",
    base_price: 72000, // Updated: 40% OFF from 120,000
    images: ["/images/img/perfume2.jpg", "/images/img/perfume4.jpg"],
    product_description:
      "Experience the Ultimate Blend of Power, Elegance, and Mystery. Elixir Of Gods is a masterful symphony of contrast. It bridges the gap between raw, rugged masculinity and refined, aristocratic luxury. Bold yet smooth. Rugged yet perfectly tailored. This fragrance is for the modern man who is confident, complex, and unforgettably distinct.",
    product_details: [
      "Concentration: Extrait de Parfum Blend",
      "Scent Family: Amber - Oriental - Woody",
      "Master Perfumer: Emmanuel Charles",
      "Made in Nigeria",
      "Top Notes: Lavender, Calabrian Bergamot, Cardamom, Pink Pepper, Sichuan Pepper, Italian Orange, Brazilian Rosewood (Crisp, fresh, aromatic, and zesty with a pop of exotic spice.)",
      "Heart Notes: Tuscan Iris, Ambrette (Musk), Pear, Geranium, Leather, Rose, Agarwood (Oud), Sandalwood (Powdery, floral, and undeniably dark, anchored by creamy and exotic woods.)",
      "Base Notes: Virginia Cedar, Vetiver, Ambroxan, Labdanum, Vanilla, Tonka Bean, Amber (Sensual, warm, slightly smoky, and long-lasting with a rich, resinous trail.)",
      "Ingredients: Alcohol Denat, Parfum, Citrus Aurantium Bergamia Peel Oil, Aqua, Tetramethyl Acetyloctahydronaphthalenes, Pogostemon Cablin Oil, Linalool, Limonene, Vanillin, Citrus Limon Peel Oil, Linalyl Acetate, Coumarin, Pinene, Eugenia Caryophyllus Oil, Eugenol, Hydroxycitronellal, Beta-Caryophyllene, Cinnamal, Rose Ketones, Eugenyl Acetate, Terpineol, Isoeugenyl Acetate, Geranyl Acetate, Citral, Geraniol, Citrus Aurantium Peel Oil, Anethole, Terpinolene, Menthol, Anise Alcohol, Benzaldehyde, Citronellol, Alpha-Terpinene, Camphor."
    ],
    variants: [{ id: "v2", variant_value: "100ml", price_modifier: 0 }]
  },
  {
    id: "20000000-0000-0000-0000-000000000001",
    name: "The Obsidian Mocha Ankle Length Double-Breasted Overcoat",
    slug: "obsidian-mocha-overcoat",
    base_price: 155000,
    images: [
      "/images/img/Brown overcoat 1.jpg",
      "/images/img/Brown overcoat 2.jpg",
      "/images/img/Brown overcoat 3.jpg",
      "/images/img/Brown overcoat 4.jpg"
    ],
    product_description:
      "A striking, ankle-length double-breasted overcoat crafted from a heavyweight wool blend in a rich mocha colorway. The defining feature is its oversized peak lapels, which showcase a luxurious, deep chocolate contrast velvet upper panel. Featuring structured shoulders, distinct turn-back cuffs, deep side pockets, and a full tonal satin lining, this statement piece offers a dramatic, flowing silhouette that effortlessly bridges classic sartorial tailoring with high-end modern style.",
    product_details: [
      "Sartorial Tailoring: Brown Heavy Wool Blend",
      "Design Accent: Contrast Velvet Peak Lapels",
      "Pockets: Deep Functional Side Pockets",
      "Closure: Double-Breasted Front Button Assembly",
      "Cuffs: Traditional Turned-Back Style",
      "Fit Matrix: Dramatic Flowing Silhouette / Ankle-Length Cut",
      "Fabric Composition: 70% Wool, 30% Polyamide",
      "Interior Lining: 100% Premium Cupro",
      "Contrast Trim Accent: 100% Rich Cotton Velvet"
    ],
    variants: [
      { id: "s-xs", variant_value: "XS — IT 44 / US 34", price_modifier: 0 },
      { id: "s-s", variant_value: "S — IT 46 / US 36", price_modifier: 0 },
      { id: "s-m", variant_value: "M — IT 48 / US 38", price_modifier: 0 },
      { id: "s-l", variant_value: "L — IT 50 / US 40", price_modifier: 0 },
      { id: "s-xl", variant_value: "XL — IT 52 / US 42", price_modifier: 0 },
      { id: "s-xxl", variant_value: "XXL — IT 54 / US 44", price_modifier: 0 },
      { id: "s-3xl", variant_value: "3XL — IT 56 / US 46", price_modifier: 0 }
    ]
  },
  {
    id: "30000000-0000-0000-0000-000000000001",
    name: "The Noir Lug-Sole Chelsea Boot",
    slug: "noir-lug-sole-chelsea-boot",
    base_price: 95000,
    images: [
      "/images/img/Black chelsea boot 2.jpg",
      "/images/img/product4.jpg",
      "/images/img/Black chelsea boot 1.jpg"
    ],
    product_description:
      "A contemporary twist on a timeless footwear staple, these ankle-high Chelsea boots seamlessly combine rugged utilitarian design with clean, modern minimalism. Crafted with a smooth, premium black leather upper, they feature a distinctive heavy-duty lugged sole that brings an immediate edge to any outfit. Perfect for grounding relaxed denim, cargo pants, or tailored trousers with a bold, structural silhouette.",
    product_details: [
      "Footwear Finish: Matte Black Leather Upper",
      "Design Accent: Classic Elasticated Side Gores",
      "Heel Fitting: Woven Functional Pull Tab at the Heel",
      "Toe Profile: Sleek Rounded Silhouette Profile",
      "Sole Architecture: Chunky Rugged Rubber Lug Sole",
      "Upper Shell Material: 100% Premium Matte Leather",
      "Interior Interior Lining: 100% Breathable Microfiber / Leather Blend",
      "Outsole Foundation Matrix: 100% Durable TPU Rubber Compound"
    ],
    variants: [
      { id: "f-40", variant_value: "EU 40 — UK 6 / US 7", price_modifier: 0 },
      { id: "f-41", variant_value: "EU 41 — UK 7 / US 8", price_modifier: 0 },
      { id: "f-42", variant_value: "EU 42 — UK 8 / US 9", price_modifier: 0 },
      { id: "f-43", variant_value: "EU 43 — UK 9 / US 10", price_modifier: 0 },
      { id: "f-44", variant_value: "EU 44 — UK 10 / US 11", price_modifier: 0 },
      { id: "f-45", variant_value: "EU 45 — UK 11 / US 12", price_modifier: 0 },
      { id: "f-46", variant_value: "EU 46 — UK 12 / US 13", price_modifier: 0 }
    ]
  },
  {
    id: "30000000-0000-0000-0000-000000000002",
    name: "The Fizac Signature Duffle Bag",
    slug: "the-fizac-signature-duffle-bag",
    base_price: 110000,
    images: [
      "/images/img/product13.jpg",
      "/images/img/product14.jpg",
      "/images/img/product18.jpg"
    ],
    product_description:
      "Elevate your travel standard with The Fizac Signature Duffle Bag—a masterclass in artisanal leather craft and timeless utility. Designed for the discerning traveler, this weekender duffle is handcrafted from premium full-grain leather featuring a hand-burnished cognac patina that ages uniquely with every journey. Anchored by robust double-rolled leather handles anchored through metal grommets, the bag combines structural durability with refined elegance. A polished signature gold emblem sits at center stage, complemented by heavy-duty dual zippers and reinforced side D-rings for seamless shoulder strap integration. Whether powering through weekend getaways or navigating international carry-on terminals, The Fizac Signature Duffle stands as an understated symbol of luxury, prestige, and functional design.",
    product_details: [
      "Material: Hand-finished, burnished full-grain leather with a rich cognac/tan gradient patina",
      "Hardware: Antique metallic gunmetal grommets, heavy-duty zippers, and a signature gold crest emblem",
      "Silhouette: Structured cylindrical duffle / weekender holdall",
      "Carrying Options: Reinforced double-rolled leather handles & side D-rings for detachable strap",
      "Closure: Smooth dual-runner top zipper extending wide for effortless packing",
      "Storage: Spacious main compartment with interior zip & slip organization pockets",
      "Category: Travel / Weekender / Carry-On / Unisex Luxury Leather",
      "Care Instructions: Store in a dust bag when not in use. Clean gently with a soft cloth and condition periodically with leather balm"
    ],
    variants: [{ id: "v-one-size", variant_value: "ONE SIZE", price_modifier: 0 }]
  },
  {
    id: "30000000-0000-0000-0000-000000000003",
    name: "FIZAC BOSTON CLOG SUEDE",
    slug: "fizac-boston-clog-suede",
    base_price: 87000,
    pillar: "fashion",
    category_slug: [
      "men-shoes",
      "men-shoes-view-all",
      "men-sandals-mules",
      "clogs",
      "mules",
      "slippers"
    ],
    department_tags: ["Men", "Women", "Unisex"],
    subcategory_tags: ["Clogs", "Mules", "Slippers"],
    images: [
      "/images/img/ADXD6032.jpg",
      "/images/img/KXOZ1439.JPG",
      "/images/img/CUXL6501.JPG"
    ],
    description:
      "Step into effortless luxury and supreme comfort with our Shearling-Lined Suede Clogs. A refined take on the iconic closed-toe mule silhouette, this pair is crafted from premium, velvety-soft suede and lined completely with plush, natural shearling fleece. Engineered for transitional weather and elevated lounging, these slip-ons feature an anatomically contoured cork footbed that molds to your natural foot shape over time. A sleek, adjustable leather bridge strap with a vintage pin-buckle allows for a custom fit, while the lightweight, shock-absorbing EVA outsole provides durable traction for both indoor relaxing and outdoor wear. Combining tactile richness with all-day support, they are the ultimate unisex staple for casual sophistication.",
    details: {
      design_and_build: [
        "Upper Material: 100% Genuine Soft Suede Leather.",
        "Lining & Insole: Plush, temperature-regulating shearling fleece lining.",
        "Footbed: Ergonomic cork-latex core engineered for custom arch support and heel stability.",
        "Outsole: Treaded, lightweight EVA (Ethylene Vinyl Acetate) sole for flexible cushioning and grip.",
        "Closure: Adjustable instep strap with an antique metallic pin buckle."
      ],
      fit_and_care: [
        "Gender / Fit: Unisex styling. (Note: Due to the plush shearling lining, sizing up half or one full size is recommended for optimal comfort).",
        "Care Instructions: Spot-clean suede uppers with a specialized suede brush and eraser kit. Avoid direct submersion in water to preserve the shearling texture."
      ]
    },
    variants: [
      { id: "clog-39", variant_value: "EU 39 — UK 5.5 / US 6.5", price_modifier: 0 },
      { id: "clog-40", variant_value: "EU 40 — UK 6 / US 7", price_modifier: 0 },
      { id: "clog-41", variant_value: "EU 41 — UK 7 / US 8", price_modifier: 0 },
      { id: "clog-42", variant_value: "EU 42 — UK 8 / US 9", price_modifier: 0 },
      { id: "clog-43", variant_value: "EU 43 — UK 9 / US 10", price_modifier: 0 },
      { id: "clog-44", variant_value: "EU 44 — UK 10 / US 11", price_modifier: 0 },
      { id: "clog-45", variant_value: "EU 45 — UK 11 / US 12", price_modifier: 0 }
    ]
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    name: "WHITE PINSTRIPE EMBROIDERED AGBADA SET",
    slug: "white-pinstripe-embroidered-agbada-set",
    base_price: 185000,
    pillar: "fashion",
    category_slug: [
      "men-dresses",
      "men-ready-to-wear-view-all",
      "men-ready-to-wear",
      "men-new-in",
      "men-new-in-view-all"
    ],
    department_tags: ["Men"],
    subcategory_tags: ["Agbada", "Traditional", "Native Wear"],
    images: [
      "/images/img/product5.jpg",
      "/images/img/CBHA8600.JPG"
    ],
    product_description:
      "Command attention with refined traditional prestige in this classic White Pinstripe Embroidered Agbada Set. Crafted from premium, structured textile with pinstripe detailing, this ensemble offers a contemporary silhouette while honoring rich West African heritage. The centerpiece outer Agbada robe features tone-on-tone geometric chest embroidery in architectural chevron and diamond motifs. Designed as a full 4-piece ceremonial attire, it is paired over an inner short-sleeve kaftan shirt, tailored trousers, and a matching folded Fila cap. Ideal for weddings, high-profile galas, traditional ceremonies, and executive celebrations.",
    product_details: [
      "Outer Robe (Agbada): Lightweight pinstriped fabric with a subtle sheen and fluid drape.",
      "Inner Set (Kaftan & Trouser): Short-sleeve inner tunic with a grandad/band collar and matching tailored trousers.",
      "Embroidery: High-density, multi-directional geometric threadwork across the central bib panel.",
      "Headwear: Matching pinstripe Fila (traditional cap) crafted from the same main fabric.",
      "Colorway: Crisp White with Charcoal/Black Pinstripes & White Embroidery.",
      "Ensemble Includes: Outer Agbada Robe, Inner Kaftan Shirt, Trousers, and Matching Fila Cap.",
      "Fit Standard: Traditional Loose Fit Outer Robe / Tailored Inner Set.",
      "Care Instructions: Dry clean only to preserve threadwork structure and crisp fabric finish."
    ],
    variants: [
      { id: "agb-xs", variant_value: "XS — Chest 44–46\" / Agbada L 48–50\"", price_modifier: 0 },
      { id: "agb-s", variant_value: "S — Chest 46–48\" / Agbada L 50–52\"", price_modifier: 0 },
      { id: "agb-m", variant_value: "M — Chest 48–50\" / Agbada L 52–54\"", price_modifier: 0 },
      { id: "agb-l", variant_value: "L — Chest 50–52\" / Agbada L 54–56\"", price_modifier: 0 },
      { id: "agb-xl", variant_value: "XL — Chest 52–55\" / Agbada L 56–58\"", price_modifier: 0 },
      { id: "agb-xxl", variant_value: "XXL — Chest 55–58\" / Agbada L 58–60\"", price_modifier: 0 },
      { id: "agb-3xl", variant_value: "3XL — Chest 58–62\" / Agbada L 60–62\"", price_modifier: 0 }
    ]
  }
];

interface ProductData {
  id: string;
  name: string;
  product_description: string;
  product_details: string[];
  images: string[];
  base_price: number;
}

interface VariantData {
  id: string;
  variant_value: string;
  price_modifier: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";
  const productId = typeof params?.id === "string" ? params.id : "";

  const [product, setProduct] = useState<ProductData | null>(null);
  const [variants, setVariants] = useState<VariantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<VariantData | null>(null);
  const [isBagModalOpen, setIsBagModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadLocalProductData() {
      try {
        setLoading(true);
        const matchedItem = MASTER_FRONTEND_COLLECTION.find(
          (item) => item.id === productId || item.slug === productId
        );

        if (matchedItem) {
          // Normalizing schema variations across items
          const descriptionText =
            matchedItem.product_description || (matchedItem as any).description || "";
          
          let detailsArray: string[] = [];
          if (Array.isArray(matchedItem.product_details)) {
            detailsArray = matchedItem.product_details;
          } else if ((matchedItem as any).details) {
            const rawDetails = (matchedItem as any).details;
            detailsArray = [
              ...(rawDetails.design_and_build || []),
              ...(rawDetails.fit_and_care || [])
            ];
          }

          setProduct({
            id: matchedItem.id,
            name: matchedItem.name,
            product_description: descriptionText,
            product_details: detailsArray,
            images: matchedItem.images || [],
            base_price: matchedItem.base_price
          });

          setVariants(matchedItem.variants || []);
          if (matchedItem.variants && matchedItem.variants.length > 0) {
            setSelectedVariant(matchedItem.variants[0]);
          }
        }
      } catch (err) {
        console.error("Local data lookup pipeline exception:", err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) loadLocalProductData();
  }, [productId]);

  const getLocalizedPrice = (amountInNaira: number, localeKey: string) => {
    const market = GLOBAL_MARKET_MATRIX[localeKey] || GLOBAL_MARKET_MATRIX["int"];
    let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
    if (market.localeCode === "ng") languageFormattingCode = "en-NG";
    if (market.localeCode === "fr") languageFormattingCode = "fr-FR";
    if (market.localeCode === "ae") languageFormattingCode = "en-AE";

    const exchangeRates: Record<string, number> = {
      NGN: 1, USD: 0.00073, EUR: 0.00070, GBP: 0.00060, BSD: 0.00063, CAD: 0.00085,
      MXN: 0.01200, PAB: 0.00063, ARS: 0.55000, BRL: 0.00330, CLP: 0.58000, COP: 2.65000,
      UYU: 0.02500, BGN: 0.00110, CZK: 0.01450, DKK: 0.00440, NOK: 0.00680, PLN: 0.00260,
      RON: 0.00290, SEK: 0.00670, CHF: 0.00056, TRY: 0.02100, AUD: 0.00096, CNY: 0.00450,
      HKD: 0.00490, IDR: 9.85000, JPY: 0.09600, MOP: 0.00510, MYR: 0.00280, NZD: 0.00105,
      PHP: 0.03600, SGD: 0.00084, KRW: 0.85000, TWD: 0.02000, THB: 0.02200, VND: 15.60000,
      INR: 0.05200, KZT: 0.28000, BHD: 0.00023, KWD: 0.00019, QAR: 0.00230, SAR: 0.00230,
      AED: 0.00230, MAD: 0.00630, ZAR: 0.01100, EGP: 0.03000, DZD: 0.08400, XOF: 0.39000,
      TND: 0.00190, GHS: 0.00920, XAF: 0.39000,
    };

    const targetCurrency = market.currency || "USD";
    const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00073;

    try {
      return new Intl.NumberFormat(languageFormattingCode, {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amountInNaira * conversionFactor);
    } catch (e) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amountInNaira * conversionFactor);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!product) return null;

  const basePriceInNaira = product.base_price;
  const modifierInNaira = selectedVariant?.price_modifier || 0;
  const totalNairaAmount = basePriceInNaira + modifierInNaira;

  const currentMarketConfig = GLOBAL_MARKET_MATRIX[currentLocale] || GLOBAL_MARKET_MATRIX["int"];
  const finalBillingCurrency = "NGN";

  // ====================================================================
  // 💳 INTERACTIVE LIVE PAYSTACK CORE GATEWAY CONFIGURATION
  // ====================================================================
  const paystackConfig = {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    email: "client-checkout@fizac.com",
    amount: Math.round(totalNairaAmount * 100),
    currency: finalBillingCurrency,
    reference: `FZ-${Date.now()}`,
    metadata: {
      custom_fields: [
        { display_name: "Product Name", variable_name: "product_name", value: product.name },
        { display_name: "Selected Size", variable_name: "selected_size", value: selectedVariant?.variant_value || "ONE SIZE" },
        { display_name: "Original Browsing Currency", variable_name: "display_currency", value: currentMarketConfig.currency }
      ]
    }
  };

  const initializePaystackPayment = usePaystackPayment(paystackConfig);

  const handleCheckoutAction = () => {
    setIsBagModalOpen(false);
    initializePaystackPayment({
      onSuccess: (reference: any) => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("fizac_luxury_bag");
          window.dispatchEvent(new Event("storage"));
        }
        router.push(`/${currentLocale}/checkout/success?ref=${reference.reference}`);
      },
      onClose: () => {
        console.log("Transaction window dismissed by customer.");
      }
    });
  };

  const handleAddToBag = () => {
    const newCartItem = {
      id: product.id,
      name: product.name,
      image: product.images?.[0] || "/placeholder.jpg",
      selected_variant_value: selectedVariant?.variant_value || "ONE SIZE",
      base_price: product.base_price * 0.00073,
      quantity: 1
    };

    try {
      const existingCart = localStorage.getItem("fizac_luxury_bag");
      let cartArray = existingCart ? JSON.parse(existingCart) : [];

      const existingItemIndex = cartArray.findIndex(
        (item: any) => item.id === newCartItem.id && item.selected_variant_value === newCartItem.selected_variant_value
      );

      if (existingItemIndex > -1) {
        cartArray[existingItemIndex].quantity += 1;
      } else {
        cartArray.push(newCartItem);
      }

      localStorage.setItem("fizac_luxury_bag", JSON.stringify(cartArray));
      window.dispatchEvent(new Event("storage"));
      setIsBagModalOpen(true);

    } catch (e) {
      console.error("Failed to commit item to bag allocation matrix:", e);
    }
  };

  return (
    <main 
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }} 
      className="w-full min-h-screen bg-white text-black pt-24 pb-32 relative z-30 select-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* MEDIA GALLERY SECTION */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4 items-start lg:sticky lg:top-24">
          <div className="w-full aspect-[3/4] bg-neutral-50 overflow-hidden relative border border-neutral-100">
            <img
              src={product.images?.[activeImageIndex] || "/images/img/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {product.images?.length > 1 && (
            <div className="flex flex-row md:flex-col gap-3 w-full md:w-[90px] overflow-x-auto md:overflow-x-visible pb-2 scrollbar-none">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 md:w-full aspect-[3/4] overflow-hidden border cursor-pointer ${activeImageIndex === idx ? "border-black" : "border-neutral-200 opacity-60"}`}
                >
                  <img src={imgUrl} alt="View" className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS INFORMATION PANEL */}
        <div className="lg:col-span-5 flex flex-col space-y-8 pt-2">
          
          <div className="space-y-3">
            <h1 
              style={{ fontFamily: "'Granjon', 'Garamond', serif" }} 
              className="text-[22px] sm:text-[26px] tracking-[0.15em] font-normal uppercase text-neutral-950 leading-tight"
            >
              {product.name}
            </h1>
            <p className="text-[15px] tracking-[0.08em] font-medium text-neutral-900 font-mono">
              {getLocalizedPrice(totalNairaAmount, currentLocale)}
            </p>
          </div>

          <p className="text-[13px] sm:text-[14px] tracking-[0.05em] font-light leading-relaxed text-neutral-700">
            {product.product_description}
          </p>

          {variants.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.2em] font-medium text-neutral-400 uppercase block mb-1">Select Size</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`text-[10px] tracking-[0.05em] py-3.5 px-2 border text-center font-normal transition-all cursor-pointer uppercase ${
                      selectedVariant?.id === v.id ? "bg-neutral-950 text-white border-neutral-950 font-medium" : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
                    }`}
                  >
                    {v.variant_value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button 
              onClick={handleAddToBag} 
              className="w-full bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] py-4 uppercase font-medium shadow-xl transition-colors cursor-pointer"
            >
              Add to Shopping Bag
            </button>
          </div>

          {product.product_details && product.product_details.length > 0 && (
              <div className="border-t border-b border-neutral-100 py-6 space-y-3">
                  <span className="text-[10px] tracking-[0.2em] font-medium text-neutral-400 uppercase block">Product Specifications & Care</span>
                  <ul className="space-y-3 text-[12px] tracking-[0.06em] font-light text-neutral-600 pl-4 list-disc uppercase">
                      {product.product_details.map((detail, index) => (
                          <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                  </ul>
              </div>
          )}

        </div>
      </div>

      {/* ====================================================================
      // 📱 INTERACTIVE SLIDE-OUT ADD-TO-BAG DRAWER OVERLAY (GUCCI BLUEPRINT)
      // ==================================================================== */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out ${isBagModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsBagModalOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-full max-w-[460px] bg-white text-black p-6 flex flex-col justify-between transition-transform duration-500 ease-in-out transform ${isBagModalOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          <div className="space-y-6">
            <div className="flex justify-between items-baseline border-b border-neutral-100 pb-4">
              <h2 className="text-[11px] tracking-[0.25em] font-medium text-neutral-400 uppercase">Added To Shopping Bag</h2>
              <button onClick={() => setIsBagModalOpen(false)} className="text-[11px] tracking-wider text-neutral-800 font-medium uppercase cursor-pointer p-1">Close [X]</button>
            </div>

            <div className="flex gap-5 bg-neutral-50/60 p-4 border border-neutral-100/60 items-center">
              <div className="w-[85px] aspect-[3/4] bg-white border border-neutral-200 overflow-hidden flex-shrink-0">
                <img src={product.images?.[0] || "/placeholder.jpg"} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col space-y-1 text-[12px] tracking-wide uppercase">
                <h3 className="font-medium text-neutral-900">{product.name}</h3>
                <p className="text-[10px] text-neutral-400 pt-0.5">Option: <span className="font-medium text-neutral-700">{selectedVariant?.variant_value || "ONE SIZE"}</span></p>
                <p className="text-[10px] text-neutral-400">Quantity: <span className="font-medium text-neutral-700">1</span></p>
                <p className="font-semibold text-neutral-950 pt-2 font-mono">{getLocalizedPrice(totalNairaAmount, currentLocale)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-neutral-100">
            <button 
              onClick={handleCheckoutAction}
              className="w-full bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] py-4 uppercase font-medium shadow-xl cursor-pointer"
            >
              Secure Checkout
            </button>
            <button 
              onClick={() => { setIsBagModalOpen(false); router.push(`/${currentLocale}/bag`); }}
              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-600 hover:text-black text-[11px] tracking-[0.25em] py-3.5 uppercase font-normal cursor-pointer"
            >
              View Shopping Bag
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}