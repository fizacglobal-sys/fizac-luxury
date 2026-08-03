"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";
  const transactionReference = searchParams.get("ref") || searchParams.get("reference") || "FZ-INTERNAL-MOCK";

  const [orderDate, setOrderDate] = useState<string>("");

  // Lock an official timestamp value right onto the customer's viewport receipt
  useEffect(() => {
    const today = new Date();
    setOrderDate(today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
    
    // Clear out any remaining shopping cart layout items from cache safely
    if (typeof window !== "undefined") {
      localStorage.removeItem("fizac_luxury_bag");
    }
  }, []);

  return (
    <main 
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }} 
      className="w-full min-h-screen bg-white text-black pt-36 pb-32 select-none relative z-30 flex items-center"
    >
      <div className="max-w-[700px] mx-auto px-6 w-full flex flex-col items-center text-center">
        
        {/* SUCCESS ICON DECORATION */}
        <div className="w-16 h-16 rounded-full bg-neutral-50 border border-neutral-100/80 flex items-center justify-center mb-8 animate-fade-in">
          <svg className="w-6 h-6 text-neutral-900 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* BRADING NARRATIVE APEX HEADLINE */}
        <span className="text-[9px] tracking-[0.35em] text-neutral-400 font-bold uppercase mb-3">TRANSACTION CONFIRMED</span>
        <h1 
          style={{ fontFamily: "'Granjon', 'Garamond', serif" }} 
          className="text-[26px] sm:text-[34px] tracking-[0.1em] font-normal uppercase text-neutral-950 mb-4"
        >
          Thank You For Your Order
        </h1>
        
        <p className="text-[13px] sm:text-[14px] tracking-[0.05em] font-light leading-relaxed text-neutral-600 max-w-md mx-auto mb-12">
          Your allocation transaction has cleared securely. An email receipt containing your tracking metrics has been transmitted to your client record.
        </p>

        {/* ================= EDITORIAL RECEIPT LEDGER BOX ================= */}
        <div className="w-full bg-neutral-50 border border-neutral-100/60 p-6 sm:p-8 text-left text-[12px] tracking-wide uppercase space-y-4 mb-12 text-neutral-800">
          <h2 className="text-[10px] tracking-[0.2em] font-semibold text-neutral-400 mb-2 block border-b border-neutral-200/40 pb-2">Boutique Registry Receipt</h2>
          
          <div className="flex justify-between items-baseline">
            <span className="text-neutral-400 font-light">Order Date</span>
            <span className="font-medium text-neutral-950">{orderDate}</span>
          </div>
          
          <div className="flex justify-between items-baseline">
            <span className="text-neutral-400 font-light">Shipping Hub Mode</span>
            <span className="font-medium text-neutral-950">Express International Delivery</span>
          </div>

          <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200/40">
            <span className="text-neutral-400 font-light">Payment Provider Node</span>
            <span className="font-medium text-neutral-950 text-right">Paystack Live Multi-Channel Gateway</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline pt-2 border-t border-neutral-200/40 gap-1 sm:gap-0">
            <span className="text-neutral-400 font-light">Bank Reference Authorization</span>
            <span className="font-mono text-neutral-950 font-bold tracking-normal text-[11px] select-all bg-white border border-neutral-200 px-2 py-0.5 rounded-sm">{transactionReference}</span>
          </div>
        </div>

        {/* PRIMARY CALL TO ACTION BUTTON */}
        <div className="pt-2">
          <Link
            href={`/${currentLocale}`}
            className="inline-block bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] font-medium px-12 py-4 uppercase transition-all duration-300 shadow-xl cursor-pointer"
          >
            Continue Browsing
          </Link>
        </div>

      </div>
    </main>
  );
}
