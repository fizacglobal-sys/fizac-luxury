"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
// Importing your master localization object directly from your middleware
import { GLOBAL_MARKET_MATRIX } from "../../middleware";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  priceAmount: number; // Stored in your baseline currency (e.g., Naira NGN baseline)
  image: string;       
  slug: string;
}

// 1. Define the TypeScript parameters required by your app/[locale]/page.tsx
interface ProductGridProps {
  currentLocale: string;
  children?: React.ReactNode; // This securely accepts and renders your campaign banners
}

// Minimalist collection aligned to your exact specifications without adjustments or scattering
const SAMPLE_COLLECTION: ProductItem[] = [
  { id: "1", name: "Fizac Signature Duffle Bag", category: "TRAVEL & BAGS", priceAmount: 110000, image: "/images/img/product3.jpg", slug: "fizac-signature-duffle-bag" },
  { id: "2", name: "Fizac Boston Clog Suede", category: "SHOES", priceAmount: 87000, image: "/images/img/ADXD6032.jpg", slug: "fizac-boston-clog-suede" },
  { id: "3", name: "Double-Breasted Overcoat", category: "READY TO WEAR", priceAmount: 155000, image: "/images/img/long overcoat.jpg", slug: "double-breasted-overcoat" },
  { id: "4", name: "Chelsea Boot", category: "SHOES", priceAmount: 95000, image: "/images/img/FEOZ9897.jpg", slug: "chelsea-boot" },
  { id: "5", name: "Pinstripes White Agbada", category: "TRADITIONAL AFRICAN LUXURY", priceAmount: 185000, image: "/images/img/product5.jpg", slug: "pinstripes-white-agbada" },
  { id: "6", name: "Elixir OF Gods", category: "FRAGRANCE & BEAUTY", priceAmount: 120000, image: "/images/img/perfume2.jpg", slug: "elixir-of-gods" },
  { id: "7", name: "Colonia Deluxe", category: "FRAGRANCE & BEAUTY", priceAmount: 120000, image: "/images/img/perfume3.jpg", slug: "colonia-deluxe" },
  { id: "8", name: "Aso Oke Agbada", category: "TRADITIONAL AFRICAN LUXURY", priceAmount: 145000, image: "/images/img/product6.jpg", slug: "aso-oke-agbada" }
];

// 2. Accept the parameters into the main component module function block
export default function ProductGrid({ currentLocale, children }: ProductGridProps) {
  const params = useParams();
  
  // Cleanly fall back to the prop or the active router directory segment if needed
  const activeLocale = (typeof params?.locale === "string" ? params.locale : currentLocale || "ng").toLowerCase();

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
      EUR: 0.00070,    // Eurozone Anchors
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
    const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00063; // Fallback if currency is unmapped

    // 5. Execute calculations and format safely with clean exception catches
    try {
      return new Intl.NumberFormat(languageFormattingCode, {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount * conversionFactor);
    } catch (e) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount * conversionFactor);
    }
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 py-24 bg-white text-black font-sans">
      
      {/* SECTION HEADER BLOCK */}
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-[20px] sm:text-[24px] tracking-[0.25em] font-medium uppercase text-neutral-900 mb-2">
          Explore a Selection by the Fizac's Collection
        </h2>
        <div className="w-12 h-[1px] bg-neutral-900 mt-4 opacity-40" />
      </div>

      {/* THE DYNAMIC DISPLAY GRID */}
      {/* 🛠️ FIXED: Changed grid-cols-1 to grid-cols-2 to force a uniform 2-by-2 mobile grid alignment layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
        {SAMPLE_COLLECTION.map((product) => (
          <Link 
            key={product.id} 
            href={`/${activeLocale}/product/${product.slug}`} 
            className="group flex flex-col select-none cursor-pointer"
          >
            {/* Portrait Image Canvas Container */}
            <div className="w-full aspect-[3/4] bg-neutral-50 overflow-hidden relative mb-3 sm:mb-4 border border-neutral-100/60">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Product Meta Specifications Block */}
            <div className="flex flex-col space-y-1 px-0.5 sm:px-1">
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-neutral-400 font-bold uppercase">
                {product.category}
              </span>
              
              <h3 className="text-[11px] sm:text-[12px] tracking-[0.12em] font-medium text-neutral-800 uppercase line-clamp-1 group-hover:text-black transition-colors">
                {product.name}
              </h3>
              
              <span className="text-[11px] sm:text-[12px] tracking-[0.1em] font-semibold text-neutral-900 pt-0.5">
                {getLocalizedPrice(product.priceAmount, activeLocale)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. INJECT THE HERITAGE/CAMPAIGN BANNER AT THE BASE OF THE INITIAL 8 PRODUCTS */}
      {children && (
        <div className="w-full mt-20">
          {children}
        </div>
      )}

    </section>
  );
}
