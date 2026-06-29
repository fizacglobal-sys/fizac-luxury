// components/ui/WomenSelectionGrid.tsx
"use client";

import React from "react";
import Link from "next/link";
import { GLOBAL_MARKET_MATRIX } from "../../middleware";

interface WomenSelectionGridProps {
  currentLocale: string;
}

export default function WomenSelectionGrid({ currentLocale = "ng" }: WomenSelectionGridProps) {
  
  // CONFIGURATION: Maps your exact files, luxury copy definitions, and custom baseline pricing structures
  const products = [
    { id: "w9", name: "Metal-Tip Pointed-Toe Block Heel Chunky Shoe", category: "SHOES", priceAmount: 165000, image: "/images/img/product9.jpg", slug: "metal-tip-pointed-toe-block-heel" },
    { id: "w10", name: "Glitter Cami Wrap Dress", category: "READY TO WEAR", priceAmount: 220000, image: "/images/img/product10.jpg", slug: "glitter-cami-wrap-dress" },
    { id: "w11", name: "Chloe Maxime Wedge Sandal", category: "SHOES", priceAmount: 145000, image: "/images/img/product11.jpg", slug: "chloe-maxime-wedge-sandal" },
    { id: "w12", name: "Round Wire-Frame Glasses", category: "EYEWEAR", priceAmount: 95000, image: "/images/img/product12.jpg", slug: "round-wire-frame-glasses" },
  ];

  // Complete Global Multi-Currency Formatting Engine for FIZAC GLOBAL
const getLocalizedPrice = (amount: number, localeKey: string) => {
  // 1. Fetch market specifications from your master matrix data. Fallback to USD International Hub if deep parameters miss.
  const market = GLOBAL_MARKET_MATRIX[localeKey] || GLOBAL_MARKET_MATRIX["int"];
  
  // 2. Map standard language locale codes safely matching internal Intl.NumberFormat parameters
  let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
  if (market.localeCode === "ng") languageFormattingCode = "en-NG";
  if (market.localeCode === "fr") languageFormattingCode = "fr-FR";
  if (market.localeCode === "ae") languageFormattingCode = "en-AE";
  if (market.localeCode === "cn") languageFormattingCode = "zh-CN";
  if (market.localeCode === "jp") languageFormattingCode = "ja-JP";

  // 3. COMPLETE GLOBAL CURRENCY EXCHANGE FACTORS MATRIX (Base currency: NGN ₦)
  const exchangeRates: Record<string, number> = {
    // --- FIAT BASE ---
    NGN: 1,          // Nigeria (Baseline)
    
    // --- MAJOR INTERNATIONAL ANCHORS ---
    USD: 0.00073,    // United States, Puerto Rico
    EUR: 0.00070,    // Austria, Belgium, Croatia, Cyprus, Finland, France, Germany, Greece, Ireland, Italy, Luxembourg, Monaco, Netherlands, Portugal, Slovakia, Slovenia, Spain, Saint Barthélemy
    GBP: 0.00060,    // United Kingdom

    // --- NORTH & SOUTH AMERICA ---
    BSD: 0.00063,    // Bahamas
    CAD: 0.00085,    // Canada
    MXN: 0.01200,    // Mexico
    PAB: 0.00063,    // Panama
    ARS: 0.55000,    // Argentina
    BRL: 0.00330,    // Brazil
    CLP: 0.58000,    // Chile
    COP: 2.65000,    // Colombia
    UYU: 0.02500,    // Uruguay

    // --- EUROPE (NON-EUROZONE) ---
    BGN: 0.00110,    // Bulgaria
    CZK: 0.01450,    // Czech Republic
    DKK: 0.00440,    // Denmark
    NOK: 0.00680,    // Norway
    PLN: 0.00260,    // Poland
    RON: 0.00290,    // Romania
    SEK: 0.00670,    // Sweden
    CHF: 0.00056,    // Switzerland
    TRY: 0.02100,    // Türkiye

    // --- ASIA-PACIFIC ---
    AUD: 0.00096,    // Australia
    CNY: 0.00450,    // China
    HKD: 0.00490,    // Hong Kong SAR
    IDR: 9.85000,    // Indonesia
    JPY: 0.09600,    // Japan
    MOP: 0.00510,    // Macau SAR
    MYR: 0.00280,    // Malaysia
    NZD: 0.00105,    // New Zealand
    PHP: 0.03600,    // Philippines
    SGD: 0.00084,    // Singapore
    KRW: 0.85000,    // South Korea
    TWD: 0.02000,    // Taiwan
    THB: 0.02200,    // Thailand
    VND: 15.60000,   // Vietnam

    // --- SOUTH & CENTRAL ASIA ---
    INR: 0.05200,    // India
    KZT: 0.28000,    // Kazakhstan

    // --- MIDDLE EAST ---
    BHD: 0.00023,    // Bahrain
    KWD: 0.00019,    // Kuwait
    QAR: 0.00230,    // Qatar
    SAR: 0.00230,    // Saudi Arabia
    AED: 0.00230,    // United Arab Emirates

    // --- AFRICA ---
    MAD: 0.00630,    // Morocco
    ZAR: 0.01100,    // South Africa
    EGP: 0.03000,    // Egypt
    DZD: 0.08400,    // Algeria
    XOF: 0.39000,    // Senegal, Ivory Coast (CFA Franc BCEAO)
    TND: 0.00190,    // Tunisia
    GHS: 0.00920,    // Ghana
    XAF: 0.39000,    // Cameroon (CFA Franc BEAC)
  };

  // 4. Fetch exchange rate multiplier based on current matrix currency string
  const targetCurrency = market.currency || "USD";
  const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00063; // Fallback to USD dynamic rate if currency is unmapped

  // 5. Execute calculations and format safely with clean exception catches
  try {
    return new Intl.NumberFormat(languageFormattingCode, {
      style: "currency",
      currency: targetCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * conversionFactor);
  } catch (e) {
    // Standard universal safety backup format
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: targetCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * conversionFactor);
  }
};

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 mb-32 bg-white select-none">
      
      {/* 1. THE 4-PRODUCT DISPLAY MATRIX GRID (4 wide desktop, 2 wide mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/${currentLocale}/shop/product/${product.slug}`} // Leads strictly to their full description details view parameters
            className="group flex flex-col cursor-pointer select-none"
          >
            {/* Portrait Image Canvas Container (Aspect Ratio 3:4) */}
            <div className="w-full aspect-[3/4] bg-neutral-50 overflow-hidden relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/5" />
            </div>

            {/* Product Meta Specifications Block */}
            <div className="px-1 flex flex-col space-y-1.5">
              <span className="text-[9px] tracking-[0.25em] text-neutral-400 font-bold uppercase">
                {product.category}
              </span>
              
              <h3 className="text-[12px] tracking-[0.12em] font-medium text-neutral-800 uppercase line-clamp-1 group-hover:text-black transition-colors">
                {product.name}
              </h3>
              
              <span className="text-[12px] tracking-[0.1em] font-semibold text-neutral-900 pt-0.5">
                {getLocalizedPrice(product.priceAmount, currentLocale)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= 2. THE NEW ARRIVAL SELECTION BUTTON BLOCK (UNDERNEATH) ================= */}
      <div className="w-full text-center flex flex-col items-center pt-16 space-y-3">
        
        {/* Category Context Label Indicator */}
        <span className="text-[9px] tracking-[0.35em] text-neutral-400 font-bold uppercase">
          New Arrival
        </span>

        {/* Action Button Link Trigger */}
        <div className="pt-2">
          <Link 
            href={`/${currentLocale}/shop/women/new-arrivals`} // Triggers directly into women new arrivals path layout rules
            className="inline-block bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] px-12 py-4 transition-all duration-500 uppercase font-medium"
          >
            Discover the Selection
          </Link>
        </div>

      </div>

    </section>
  );
}
