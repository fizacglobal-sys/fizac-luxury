"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GLOBAL_MARKET_MATRIX } from "../../../middleware";

interface CartItem {
  id: string;
  name: string;
  image: string;
  selected_variant_value: string;
  base_price: number; 
  quantity: number;
}

export default function ShoppingBagPage() {
  const params = useParams();
  const router = useRouter();
  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ SAFELY READ FROM LOCALSTORAGE ONLY AFTER MOUNTING TO THE CLIENT BROWSER
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("fizac_luxury_bag");
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        } else {
          // Fallback initial staging items for localhost previewing
          const initialMockData: CartItem[] = [
            {
              id: "10000000-0000-0000-0000-000000000001",
              name: "COLONIA DELUXE",
              image: "/images/img/perfume3.jpg",
              selected_variant_value: "100ml",
              base_price: 90.00,
              quantity: 1
            }
          ];
          setItems(initialMockData);
          localStorage.setItem("fizac_luxury_bag", JSON.stringify(initialMockData));
        }
      } catch (e) {
        console.error("Local storage error:", e);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const getLocalizedPrice = (amount: number, localeKey: string) => {
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

  const updateQuantity = (id: string, delta: number) => {
    const updated = items.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    });
    setItems(updated);
    localStorage.setItem("fizac_luxury_bag", JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem("fizac_luxury_bag", JSON.stringify(updated));
  };

  const totalNairaSum = items.reduce((acc, item) => {
    const itemNairaValue = item.base_price / 0.00073;
    return acc + (itemNairaValue * item.quantity);
  }, 0);

  const activeMarket = GLOBAL_MARKET_MATRIX[currentLocale] || GLOBAL_MARKET_MATRIX["int"];

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400">Loading...</span>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans pt-28 pb-32 select-none relative z-30">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="border-b border-neutral-100 pb-4 flex justify-between items-baseline">
            <h1 className="text-[20px] sm:text-[22px] tracking-[0.15em] font-light uppercase">Shopping Bag</h1>
            <span className="text-[11px] font-mono tracking-wider text-neutral-400">({items.length} Items)</span>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center space-y-5">
              <p className="text-[12px] tracking-[0.15em] text-neutral-400 uppercase font-light">Your shopping bag is completely empty.</p>
              <Link href={`/${currentLocale}`} className="inline-block bg-neutral-950 text-white text-[11px] tracking-[0.25em] px-10 py-4 uppercase font-medium">Continue Exploration</Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {items.map((item) => {
                const itemTotalNaira = (item.base_price / 0.00073) * item.quantity;
                return (
                  <div key={item.id} className="flex gap-6 py-8 first:pt-0 items-start">
                    <div className="w-[110px] sm:w-[130px] aspect-[3/4] bg-neutral-50 overflow-hidden relative border border-neutral-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-h-[145px] sm:min-h-[175px]">
                      <div className="space-y-1">
                        <h3 className="text-[13px] tracking-wide font-medium text-neutral-900 uppercase leading-snug">{item.name}</h3>
                        <p className="text-[11px] tracking-wider text-neutral-400 uppercase pt-1">Option: <span className="font-semibold text-neutral-700">{item.selected_variant_value}</span></p>
                        <div className="flex items-center space-x-3 pt-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border border-neutral-200 cursor-pointer font-mono">-</button>
                          <span className="text-[12px] font-mono font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border border-neutral-200 cursor-pointer font-mono">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <button onClick={() => removeItem(item.id)} className="text-[10px] tracking-[0.15em] text-neutral-400 hover:text-black underline underline-offset-4 font-light cursor-pointer uppercase">Remove</button>
                        <span className="text-[13px] tracking-wider font-semibold font-mono text-neutral-900">{getLocalizedPrice(itemTotalNaira, currentLocale)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="lg:col-span-4 bg-neutral-50 border border-neutral-100/60 p-6 md:p-8 space-y-6 lg:sticky lg:top-28">
            <h2 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-400 uppercase border-b border-neutral-200 pb-3">Order Summary</h2>
            <div className="space-y-4 text-[12px] tracking-wider uppercase font-light text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-900 font-medium">{getLocalizedPrice(totalNairaSum, currentLocale)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Shipping ({activeMarket.region})</span>
                <span className="text-neutral-400 font-normal">COMPLIMENTARY</span>
              </div>
              <div className="w-full h-[1px] bg-neutral-200 my-2" />
              <div className="flex justify-between items-baseline text-[14px] text-neutral-950 font-medium">
                <span className="tracking-[0.15em]">Total due</span>
                <span className="font-mono text-[16px] font-bold">{getLocalizedPrice(totalNairaSum, currentLocale)}</span>
              </div>
            </div>
            <div className="pt-2">
              <button className="w-full bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] py-4 uppercase font-medium shadow-xl cursor-pointer">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
