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
    base_price: 120000, 
    images: ["/images/img/Colonia Deluxe.jpg", "/images/img/perfume3.jpg"],
    product_description: "Designed for the modern connoisseur, COLONIA DELUXE by Fizac Fragrance redefines the classic, sun-drenched freshness of traditional colognes by infusing it with an unapologetic, contemporary depth...",
    product_details: [
      "Concentration: Eau de parfum / High Concentration Blend",
      "Scent Family: Citrus - Aromatic - Woody"
    ],
    variants: [{ id: "v1", variant_value: "100ml", price_modifier: 0 }]
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "ELIXIR OF GODS",
    slug: "elixir-of-gods",
    base_price: 120000, 
    images: ["/images/img/perfume2.jpg", "/images/img/perfume4.jpg"],
    product_description: "Experience the Ultimate Blend of Power, Elegance, and Mystery. Elixir Of Gods is a masterful symphony of contrast. It bridges the gap between raw, rugged masculinity and refined, aristocratic luxury...",
    product_details: [
      "Concentration: Extrait de Parfum Blend",
      "Scent Family: Amber - Oriental - Woody"
    ],
    variants: [{ id: "v2", variant_value: "100ml", price_modifier: 0 }]
  },
  // 🌟 ADDED: THE OBSIDIAN MOCHA OVERCOAT PRODUCT SPECIFICATION DATA 
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
    product_description: "A striking, ankle-length double-breasted overcoat crafted from a heavyweight wool blend in a rich mocha colorway. The defining feature is its oversized peak lapels, which showcase a luxurious, deep chocolate contrast velvet upper panel. Featuring structured shoulders, distinct turn-back cuffs, deep side pockets, and a full tonal satin lining, this statement piece offers a dramatic, flowing silhouette that effortlessly bridges classic sartorial tailoring with high-end modern style.",
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
    // Renders your comprehensive sizing dropdown grid parameters beautifully inside your purchase sections
    variants: [
      { id: "s-xs", variant_value: "XS — IT 44 / US 34", price_modifier: 0 },
      { id: "s-s", variant_value: "S — IT 46 / US 36", price_modifier: 0 },
      { id: "s-m", variant_value: "M — IT 48 / US 38", price_modifier: 0 },
      { id: "s-l", variant_value: "L — IT 50 / US 40", price_modifier: 0 },
      { id: "s-xl", variant_value: "XL — IT 52 / US 42", price_modifier: 0 },
      { id: "s-xxl", variant_value: "XXL — IT 54 / US 44", price_modifier: 0 },
      { id: "s-3xl", variant_value: "3XL — IT 56 / US 46", price_modifier: 0 }
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
          setProduct({
            id: matchedItem.id,
            name: matchedItem.name,
            product_description: matchedItem.product_description,
            product_details: matchedItem.product_details,
            images: matchedItem.images,
            base_price: matchedItem.base_price
          });
          setVariants(matchedItem.variants);
          if (matchedItem.variants.length > 0) {
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
  const isTargetNaira = currentMarketConfig.currency === "NGN";
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
        { display_name: "Selected Size", variable_name: "selected_size", value: selectedVariant?.variant_value || "100ml" },
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
      selected_variant_value: selectedVariant?.variant_value || "100ml",
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
              <div className="grid grid-cols-4 gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`text-[11px] tracking-[0.1em] py-3.5 border text-center font-normal transition-all cursor-pointer uppercase ${
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
                  <span className="text-[10px] tracking-[0.2em] font-medium text-neutral-400 uppercase block">Olfactive Signature Matrix</span>
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
                <p className="text-[10px] text-neutral-400 pt-0.5">Option: <span className="font-medium text-neutral-700">{selectedVariant?.variant_value || "100ml"}</span></p>
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

