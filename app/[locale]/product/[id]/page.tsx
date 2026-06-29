"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GLOBAL_MARKET_MATRIX } from "../../../../middleware";
import { supabase } from "../../../../lib/supabase"; 

interface ProductData {
  id: string;
  name: string;
  product_description: string; 
  product_details: string[];    // 👈 Line 218: Ensure this says product_details instead of details
  our_commitment: string;       
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

  useEffect(() => {
    async function fetchLuxuryProductData() {
      try {
        setLoading(true);

        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (productError) throw productError;
        if (productData) setProduct(productData);

        // 🔍 Locate this exact snippet inside your fetchLuxuryProductData function:
        const { data: variantData, error: variantError } = await supabase
            .from("product_variants")
            .select("*")
            .eq("product_id", productId);

        if (variantError) throw variantError;
        if (variantData) {
            setVariants(variantData);
  
            // 🛠️ UPDATE THIS LINE BELOW: Add "[0]" to select the first variant object in the array
            if (variantData.length > 0) setSelectedVariant(variantData[0]); 
        }

      } catch (err) {
        console.error("Database sync issue:", err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) fetchLuxuryProductData();
  }, [productId]);

  // YOUR EXACT UNTOUCHED CONVERSION ENGINE
  const getLocalizedPrice = (amount: number, localeKey: string) => {
    const market = GLOBAL_MARKET_MATRIX[localeKey] || GLOBAL_MARKET_MATRIX["int"];
    let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
    if (market.localeCode === "ng") languageFormattingCode = "en-NG";
    if (market.localeCode === "fr") languageFormattingCode = "fr-FR";
    if (market.localeCode === "ae") languageFormattingCode = "en-AE";

    const exchangeRates: Record<string, number> = {
      NGN: 1, USD: 0.00063, EUR: 0.00060, GBP: 0.00050, BSD: 0.00063, CAD: 0.00085,
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
    const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00063;

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

    // ... Look right below your useEffect data-fetching hooks ...

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!product) return null;

  // Calculates baseline dollar inputs back to your Naira matrix standard
  const basePriceInNaira = product.base_price / 0.00063;
  const modifierInNaira = (selectedVariant?.price_modifier || 0) / 0.00063;
  const totalNairaAmount = basePriceInNaira + modifierInNaira;


  // 🛠️ PASTE THE ENTIRE handleAddToBag CODE BLOCK RIGHT HERE:
  const handleAddToBag = () => {
    if (!product) return;
    
    const newCartItem = {
      id: product.id,
      name: product.name,
      image: product.images?.[0] || "/placeholder.jpg",
      selected_variant_value: selectedVariant?.variant_value || "One Size",
      base_price: product.base_price,
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
      router.push(`/${currentLocale}/bag`);

    } catch (e) {
      console.error("Failed to commit item to bag allocation matrix:", e);
    }
  };


  // 📍 THIS IS THE RETURN BLOCK THAT SITS RIGHT UNDER YOUR PASTED CODE:
  return (
    <main className="w-full min-h-screen bg-white text-black font-sans pt-24 pb-32">
       {/* ... rest of your layout markup ... */}

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
            <h1 className="text-[20px] sm:text-[24px] tracking-[0.12em] font-medium uppercase text-neutral-950 leading-tight">
              {product.name}
            </h1>
            <p className="text-[16px] tracking-[0.08em] font-semibold text-neutral-900 font-mono">
              {getLocalizedPrice(totalNairaAmount, currentLocale)}
            </p>
          </div>

          <div className="w-full h-[1px] bg-neutral-100" />

          {/* Change {product.story} to this: */}
          <p className="text-[13px] sm:text-[14px] tracking-[0.05em] font-light leading-relaxed text-neutral-700">
            {product.product_description}
          </p>


          {/* Renders variant selection values (Sizes / Volumes) dynamically from your database records */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`text-[11px] tracking-[0.1em] py-3.5 border text-center font-medium cursor-pointer uppercase ${
                      selectedVariant?.id === v.id ? "bg-neutral-950 text-white border-neutral-950 font-bold" : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
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
              onClick={() => router.push(`/${currentLocale}/bag`)} 
              className="w-full bg-neutral-950 text-white text-[11px] tracking-[0.3em] py-4 uppercase font-medium shadow-lg cursor-pointer"
            >
              Add to Shopping Bag
            </button>
          </div>

          {/* Update both lines to use product_details instead of details */}
            {product.product_details && product.product_details.length > 0 && (
                <div className="border-t border-b border-neutral-100 py-4">
                    <ul className="space-y-2.5 text-[12px] tracking-[0.06em] font-light text-neutral-600 list-disc list-inside uppercase">
                        {product.product_details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
      </div>
    </main>
  );
}
