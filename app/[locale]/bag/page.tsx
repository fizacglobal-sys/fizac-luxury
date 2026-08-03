"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePaystackPayment } from "react-paystack";
import { GLOBAL_MARKET_MATRIX } from "../../../middleware";

interface BagItem {
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
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load cart allocation arrays straight from browser storage nodes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingBag = localStorage.getItem("fizac_luxury_bag");
      if (existingBag) {
        setBagItems(JSON.parse(existingBag));
      }
      setLoading(false);
    }
  }, []);

  // Universal exchange rate pipeline matching your master middleware configuration matrix
  const getLocalizedPrice = (amountInNaira: number) => {
    const market = GLOBAL_MARKET_MATRIX[currentLocale] || GLOBAL_MARKET_MATRIX["int"];
    let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
    if (market.localeCode === "ng") languageFormattingCode = "en-NG";

    const exchangeRates: Record<string, number> = {
      NGN: 1, USD: 0.00073, EUR: 0.00070, GBP: 0.00060, AED: 0.00230, CAD: 0.00085, ZAR: 0.01100
    };

    const targetCurrency = market.currency || "USD";
    const conversionFactor = exchangeRates[targetCurrency] !== undefined ? exchangeRates[targetCurrency] : 0.00073;
    const finalCalculatedAmount = amountInNaira * conversionFactor;

    const formattedString = new Intl.NumberFormat(languageFormattingCode, {
      style: "currency",
      currency: targetCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(finalCalculatedAmount);

    return { formattedString, finalCalculatedAmount };
  };

  const handleRemoveItem = (indexToRemove: number) => {
    const updatedBag = bagItems.filter((_, idx) => idx !== indexToRemove);
    setBagItems(updatedBag);
    localStorage.setItem("fizac_luxury_bag", JSON.stringify(updatedBag));
  };

  const handleClearBag = () => {
    setBagItems([]);
    localStorage.removeItem("fizac_luxury_bag");
  };

  // Compute absolute cart balance summaries using base price values
  const totalCartNairaSum = bagItems.reduce((acc, item) => {
    const baselineItemNaira = (item.base_price || 90.00) / 0.00073;
    return acc + (baselineItemNaira * item.quantity);
  }, 0);

  const currentMarketConfig = GLOBAL_MARKET_MATRIX[currentLocale] || GLOBAL_MARKET_MATRIX["int"];
  const isTargetNaira = currentMarketConfig.currency === "NGN";
  const localizedSummary = getLocalizedPrice(totalCartNairaSum);
  const finalBillingCurrency = isTargetNaira ? "NGN" : "USD";

  // ====================================================================
  // 💳 PRIMARY MASTER CORES PAYSTACK CHECKOUT GATEWAY INTERFACE
  // ====================================================================
  const paystackConfig = {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    email: "client-checkout@fizac.com",
    amount: isTargetNaira ? Math.round(totalCartNairaSum * 100) : Math.round(localizedSummary.finalCalculatedAmount * 100),
    currency: finalBillingCurrency,
    reference: `FZ-BAG-${Date.now()}`,
    metadata: {
      custom_fields: bagItems.map((item, i) => ({
        display_name: `Item ${i + 1}`,
        variable_name: `item_${i + 1}`,
        value: `${item.name} (${item.selected_variant_value}) x${item.quantity}`
      }))
    }
  };

  const initializePaystackPayment = usePaystackPayment(paystackConfig);

  const handleBagCheckout = () => {
    if (bagItems.length === 0) return;
    initializePaystackPayment({
      onSuccess: (reference: any) => {
        localStorage.removeItem("fizac_luxury_bag");
        router.push(`/${currentLocale}/checkout/success?ref=${reference.reference}`);
      },
      onClose: () => {
        console.log("Cart overlay loop dropped by user closure command action.");
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 animate-pulse">Sifting Bag Records...</span>
      </div>
    );
  }

  return (
    <main 
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }} 
      className="w-full min-h-screen bg-white text-black pt-28 pb-32 relative z-30 select-none"
    >
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* ================= LEFT SIDE: SELECTION OVERVIEW LISTING ================= */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-baseline border-b border-neutral-100 pb-4">
            <h1 style={{ fontFamily: "'Granjon', 'Garamond', serif" }} className="text-[22px] sm:text-[26px] tracking-wide uppercase font-normal">
              Your Shopping Bag
            </h1>
            {bagItems.length > 0 && (
              <button onClick={handleClearBag} className="text-[10px] tracking-widest text-neutral-400 hover:text-black uppercase cursor-pointer">
                Clear All
              </button>
            )}
          </div>

          {bagItems.length === 0 ? (
            <div className="py-16 text-center space-y-6">
              <p className="text-[12px] tracking-widest text-neutral-400 uppercase font-light">Your luxury shopping bag sits completely vacant.</p>
              <Link href={`/${currentLocale}`} className="inline-block border border-black text-black px-8 py-3 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-black hover:text-white transition-colors">
                Continue Exploring
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {bagItems.map((item, index) => {
                const itemNairaBase = (item.base_price || 90.00) / 0.00073;
                return (
                  <div key={index} className="flex gap-6 py-6 items-center group">
                    <div className="w-[90px] aspect-[3/4] bg-neutral-50 border border-neutral-200 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-[12px] tracking-wide uppercase">
                      <div className="space-y-1">
                        <h3 className="font-medium text-neutral-900 text-[13px]">{item.name}</h3>
                        <p className="text-[10px] text-neutral-400">Variant Option: <span className="font-medium text-neutral-700">{item.selected_variant_value}</span></p>
                        <p className="text-[10px] text-neutral-400">Quantity Selection: <span className="font-medium text-neutral-700">{item.quantity}</span></p>
                      </div>

                      <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-2">
                        <span className="font-semibold text-neutral-950 font-mono text-[13px]">{getLocalizedPrice(itemNairaBase * item.quantity).formattedString}</span>
                        <button onClick={() => handleRemoveItem(index)} className="text-[9px] tracking-widest text-neutral-400 hover:text-red-600 transition-colors uppercase cursor-pointer pt-1">
                          Remove [X]
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDE: LUXURY BILLING ORDER OVERVIEW ================= */}
        {bagItems.length > 0 && (
          <div className="lg:col-span-4 bg-neutral-50/60 border border-neutral-100 p-6 flex flex-col justify-between h-fit space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4 text-[11px] tracking-widest uppercase text-neutral-500">
              <h2 className="text-[12px] tracking-[0.2em] font-medium text-neutral-900 border-b border-neutral-200/50 pb-3 block">Order Summary</h2>
              
              <div className="flex justify-between items-baseline pt-2">
                <span>Total Items Packaged</span>
                <span className="text-neutral-800 font-medium">{bagItems.reduce((sum, i) => sum + i.quantity, 0)} Units</span>
              </div>
              
              <div className="flex justify-between items-baseline">
                <span>Shipping Allocation</span>
                <span className="text-neutral-800 font-medium font-mono">Complimentary</span>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-neutral-200 text-neutral-900 font-semibold text-[12px]">
                <span>Bag Subtotal</span>
                <span className="font-mono text-[14px] text-black font-bold">{localizedSummary.formattedString}</span>
              </div>

              {!isTargetNaira && (
                <p className="text-[9px] text-neutral-400 italic font-light tracking-wide leading-relaxed pt-2 lowercase">
                  * order processes securely in US Dollars (${Math.round(localizedSummary.finalCalculatedAmount)}) matching the live global standard paystack framework rules.
                </p>
              )}
            </div>

            <button
              onClick={handleBagCheckout}
              className="w-full bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] py-4 uppercase font-medium shadow-xl transition-all duration-300 cursor-pointer"
            >
              Proceed To Checkout
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
