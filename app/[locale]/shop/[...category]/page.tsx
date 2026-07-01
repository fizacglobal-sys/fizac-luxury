"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GLOBAL_MARKET_MATRIX } from "../../../../middleware";
import { supabase } from "../../../../lib/supabase"; 

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  images: string[];
}

export default function CategoryShelfPage() {
  const params = useParams();
  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";
  const categorySegments = Array.isArray(params?.category) ? params.category : [];

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRelationalBoutiqueInventory() {
      try {
        setLoading(true);
        
        const lastSegment = categorySegments[categorySegments.length - 1];
        const activeSlugFilter = typeof lastSegment === "string" ? lastSegment.toLowerCase() : "";

        if (!activeSlugFilter) {
          setLoading(false);
          return;
        }

        // ====================================================================
        // 🌐 GLOBAL "VIEW ALL" CONTROLLER CATCH ENGINE
        // ====================================================================
        // If clicking 'View All' under perfumes, fetch all categories in the fragrance pillar first, then extract their items
        if (activeSlugFilter === "haute-parfumerie" || activeSlugFilter === "pb-frag-view-all") {
          const { data: catRows, error: catErr } = await supabase
            .from("categories")
            .select("id")
            .eq("brand_pillar", "fragrance");

          if (catErr) throw catErr;

          if (catRows && catRows.length > 0) {
            const catIds = catRows.map(c => c.id);
            const { data: allFragrances, error: fragranceError } = await supabase
              .from("products")
              .select("*")
              .in("category_id", catIds); // Pulls everything under the broad fragrance umbrella safely!

            if (fragranceError) throw fragranceError;
            setProducts(allFragrances || []);
          } else {
            setProducts([]);
          }
          return;
        }

        // If clicking 'View All Clothing', fetch all categories in the fashion pillar first, then extract their items
        if (activeSlugFilter === "ready-to-wear" || activeSlugFilter === "ready-to-wear-view-all") {
          const { data: catRows, error: catErr } = await supabase
            .from("categories")
            .select("id")
            .eq("brand_pillar", "fashion");

          if (catErr) throw catErr;

          if (catRows && catRows.length > 0) {
            const catIds = catRows.map(c => c.id);
            const { data: allFashion, error: fashionError } = await supabase
              .from("products")
              .select("*")
              .in("category_id", catIds);

            if (fashionError) throw fashionError;
            setProducts(allFashion || []);
          } else {
            setProducts([]);
          }
          return;
        }

        // ====================================================================
        // 📁 STANDARD SUBCATEGORY FILTER (e.g. 'Men's Fragrance')
        // ====================================================================
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", activeSlugFilter)
          .single();

        if (categoryError) {
          console.warn("Category slug missed in Supabase archives:", categoryError);
          setProducts([]);
          return;
        }

        if (categoryData?.id) {
          const { data: productRecords, error: productError } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", categoryData.id);

          if (productError) throw productError;
          setProducts(productRecords || []);
        }
      } catch (err) {
        console.error("Database tracking loop error details:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    if (categorySegments.length > 0) {
      fetchRelationalBoutiqueInventory();
    }
  }, [categorySegments]);

  const getLocalizedPrice = (amountInNaira: number, localeKey: string) => {
    const market = GLOBAL_MARKET_MATRIX[localeKey] || GLOBAL_MARKET_MATRIX["int"];
    let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
    if (market.localeCode === "ng") languageFormattingCode = "en-NG";

    const exchangeRates: Record<string, number> = {
      NGN: 1, USD: 0.00073, EUR: 0.00070, GBP: 0.00060, BSD: 0.00063, CAD: 0.00085,
      MXN: 0.01200, PAB: 0.00063, ARS: 0.55000, BRL: 0.00330, CLP: 0.58000, COP: 2.65000,
      UYU: 0.02500, BGN: 0.00110, CZK: 0.01450, DKK: 0.00440, NOK: 0.00680, PLN: 0.00260,
      RON: 0.00290, SEK: 0.00670, CHF: 0.00056, TRY: 0.02100, AUD: 0.00096, CNY: 0.00450,
      HKD: 0.00490, IDR: 9.85000, JPY: 0.09600, MOP: 0.00510, MYR: 0.00280, NZD: 0.00105,
      PHP: 0.03600, SGD: 0.00084, KRW: 0.85000, TWD: 0.02000, THB: 0.02200, VND: 15.60000,
      INR: 0.05200, KZT: 0.28000, BHD: 0.00023, KWD: 0.00019, QAR: 0.00230, SAR: 0.00230,
      AED: 0.00230, MAD: 0.00630, ZAR: 0.01100, EGP: 0.03000, DZD: 0.08400, XOF: 0.39000,
      TND: 0.00190, GHS: 0.00920, XAF: 0.39000
    };

    const targetCurrency = market.currency || "USD";
    const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00063;

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

  const getPageHeadline = () => {
    if (categorySegments.length === 0) return "Collections";
    const displayTitle = categorySegments[categorySegments.length - 1];
    return displayTitle.toString().replace(/-/g, " ");
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] text-neutral-400 uppercase animate-pulse">Sifting House Archive...</span>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans pt-28 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* EDITORIAL SHELF HEADLINE */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[9px] tracking-[0.3em] text-neutral-400 font-bold uppercase mb-2">FIZAC SELECTION</span>
          <h1 className="text-[22px] sm:text-[28px] tracking-[0.2em] font-light uppercase text-neutral-950">
            {getPageHeadline()}
          </h1>
          <div className="w-8 h-[1px] bg-neutral-900/20 mt-5" />
          <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase mt-3 font-mono font-medium">{products.length} Items Found</span>
        </div>

        {products.length === 0 ? (
          <div className="w-full py-16 text-center">
            <p className="text-[12px] tracking-[0.15em] uppercase text-neutral-400 font-light">No creations are currently staged under this selection.</p>
          </div>
        ) : (
          
          /* DYNAMIC RESPONSIVE DISPLAY GRID CONTAINER */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((item) => {
              const calculatedNairaAmount = item.base_price / 0.00073;

              return (
                <Link key={item.id} href={`/${currentLocale}/product/${item.id}`} className="group flex flex-col cursor-pointer select-none">
                  <div className="w-full aspect-[3/4] bg-neutral-50 overflow-hidden mb-4 border border-neutral-100/60">
                    <img 
                      src={item.images?.[0] || "/images/img/placeholder.jpg"} // ✅ FIXED: Re-added the required [0] array index mapping element
                      alt={item.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="px-1 flex flex-col space-y-1.5">
                    <h3 className="text-[12px] tracking-[0.12em] font-medium text-neutral-800 uppercase line-clamp-1">{item.name}</h3>
                    <span className="text-[12px] tracking-[0.1em] font-semibold text-neutral-900">{getLocalizedPrice(calculatedNairaAmount, currentLocale)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
