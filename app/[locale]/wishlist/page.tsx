"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GLOBAL_MARKET_MATRIX } from "../../../middleware";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  category: string;
  base_price: number;
  slug: string;
}

export default function WishlistPage() {
  const params = useParams();
  const router = useRouter();

  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";
  const [favorites, setFavorites] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load saved favorites array straight from browser local memory logs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("fizac_luxury_wishlist");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      } else {
        // Fallback: Show COLONIA DELUXE as an elegant template example if empty
        setFavorites([
          {
            id: "10000000-0000-0000-0000-000000000001",
            name: "COLONIA DELUXE",
            category: "Haute Parfumerie",
            base_price: 90.00,
            image: "/images/img/Colonia Deluxe.jpg",
            slug: "colonia-deluxe"
          }
        ]);
      }
      setLoading(false);
    }
  }, []);

  const handleRemoveFavorite = (idToRemove: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== idToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem("fizac_luxury_wishlist", JSON.stringify(updatedFavorites));
  };

  // Local currency conversion engine matching your master middleware rules
  const formatLocalizedPrice = (amountInNaira: number) => {
    const market = GLOBAL_MARKET_MATRIX[currentLocale] || GLOBAL_MARKET_MATRIX["int"];
    let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
    if (market.localeCode === "ng") languageFormattingCode = "en-NG";

    const exchangeRates: Record<string, number> = {
      NGN: 1, USD: 0.00073, EUR: 0.00070, GBP: 0.00060, AED: 0.00230, CAD: 0.00085
    };

    const targetCurrency = market.currency || "USD";
    const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00073;

    return new Intl.NumberFormat(languageFormattingCode, {
      style: "currency",
      currency: targetCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amountInNaira * conversionFactor);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 animate-pulse">Sifting House Favorites...</span>
      </div>
    );
  }

  return (
    <main 
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }} 
      className="w-full min-h-screen bg-white text-black pt-28 pb-32 relative z-30 select-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* EDITORIAL HEADER BLOCK */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[9px] tracking-[0.35em] text-neutral-400 font-bold uppercase mb-2">MY SELECTION</span>
          <h1 
            style={{ fontFamily: "'Granjon', 'Garamond', serif" }} 
            className="text-[24px] sm:text-[32px] tracking-wide uppercase font-normal text-neutral-950"
          >
            Your Wishlist
          </h1>
          <div className="w-8 h-[1px] bg-neutral-900/20 mt-4" />
        </div>

        {favorites.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[12px] tracking-widest text-neutral-400 uppercase font-light">Your favorites collection is currently empty.</p>
          </div>
        ) : (
          
          /* UNIFORM RESPONSIVE DISPLAY GRID MATRICES */
          /* grid-cols-2 forces products 2-by-2 on mobile phones, lg:grid-cols-4 spreads them on desktops */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {favorites.map((item) => {
              const itemNairaBase = (item.base_price || 90.00) / 0.00073;

              return (
                <div key={item.id} className="group flex flex-col relative select-none">
                  
                  {/* Portrait Image Canvas Container */}
                  <Link href={`/${currentLocale}/product/${item.id}`} className="w-full aspect-[3/4] bg-neutral-50 overflow-hidden relative mb-3 sm:mb-4 border border-neutral-100/60 block">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104" />
                  </Link>

                  {/* Remove Item Button overlayed at the bottom */}
                  <button 
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-neutral-400 hover:text-black p-1.5 rounded-full border border-neutral-100 transition-colors cursor-pointer text-[10px]"
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>

                  {/* Product Specification Typography Metadata Block */}
                  <div className="flex flex-col space-y-1 px-0.5 sm:px-1">
                    <span className="text-[8px] sm:text-[9px] tracking-[0.22em] text-neutral-400 font-bold uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-[11px] sm:text-[12px] tracking-[0.12em] font-medium text-neutral-800 uppercase line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-[11px] sm:text-[12px] tracking-[0.1em] font-semibold text-neutral-900 pt-0.5">
                      {formatLocalizedPrice(itemNairaBase)}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
