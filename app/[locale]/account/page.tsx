"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GLOBAL_MARKET_MATRIX } from "../../../middleware";
import { supabase } from "../../../lib/supabase"; 

interface OrderRecord {
  id: string;
  created_at: string;
  reference_code: string;
  total_price: number;
  delivery_status: string;
}

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  member_since: string;
}

export default function ClientAccountPage() {
  const params = useParams();
  const router = useRouter();

  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAccountPortfolio() {
      try {
        setLoading(true);

        // 1. Primary Check: Query your live Supabase authentication session records
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: dbUser } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          const { data: dbOrders } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });

          if (dbUser) {
            setProfile({
              first_name: dbUser.first_name || "Client",
              last_name: dbUser.last_name || "House Connoisseur",
              email: session.user.email || "",
              member_since: new Date(dbUser.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long" })
            });
          }
          if (dbOrders) setOrders(dbOrders);
          return;
        }

        // 2. Secondary Fallback: Render beautiful mockup layout data if no active login session exists
        setProfile({
          first_name: "Emmanuel",
          last_name: "Charles",
          email: "emmanuel.charles@fizacglobal.com",
          member_since: "June 2026"
        });

        setOrders([
          {
            id: "ORD-993821",
            created_at: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
            reference_code: "FZ-BAG-1786524391",
            total_price: 120000,
            delivery_status: "In Transit - Out For Delivery"
          }
        ]);

      } catch (err) {
        console.error("Account portal synchronization loop error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAccountPortfolio();
  }, []);

  // Multi-Currency Presentation Engine matching your master middleware data matrix configuration
  const formatLocalizedPrice = (amountInNaira: number) => {
    const market = GLOBAL_MARKET_MATRIX[currentLocale] || GLOBAL_MARKET_MATRIX["int"];
    let languageFormattingCode = `en-${market.localeCode.toUpperCase()}`;
    if (market.localeCode === "ng") languageFormattingCode = "en-NG";

    const exchangeRates: Record<string, number> = {
      NGN: 1, USD: 0.00073, EUR: 0.00070, GBP: 0.00060, AED: 0.00230, CAD: 0.00085, ZAR: 0.01100
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

  const handleSignOutAction = async () => {
    await supabase.auth.signOut();
    router.push(`/${currentLocale}`);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 animate-pulse">Authenticating Client Node...</span>
      </div>
    );
  }

  return (
    <main 
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }} 
      className="w-full min-h-screen bg-white text-black pt-28 pb-32 relative z-30 select-none"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* ================= LEFT SIDE: CLIENT PROFILE DOSSIER PANEL ================= */}
        <div className="lg:col-span-4 bg-neutral-50 border border-neutral-100/60 p-6 sm:p-8 flex flex-col justify-between h-fit space-y-8">
          <div className="space-y-4">
            <span className="text-[9px] tracking-[0.35em] text-neutral-400 font-bold uppercase block">HOUSE REGISTRY</span>
            
            {/* Elegant Granjon Serif Typography reserved exclusively for Profile Name Title */}
            <h1 
              style={{ fontFamily: "'Granjon', 'Garamond', serif" }} 
              className="text-[24px] sm:text-[30px] tracking-wide uppercase font-normal text-neutral-950 leading-tight"
            >
              {profile?.first_name} <br /> {profile?.last_name}
            </h1>
            
            <div className="w-8 h-[1px] bg-neutral-300 pt-2" />
            
            <div className="text-[11px] tracking-widest uppercase text-neutral-500 space-y-2 pt-2">
              <p className="text-neutral-400">Email Address: <span className="text-neutral-800 font-medium block tracking-normal normal-case pt-0.5">{profile?.email}</span></p>
              <p className="text-neutral-400 pt-2">Member Allocation Since: <span className="text-neutral-800 font-medium block tracking-wider pt-0.5">{profile?.member_since}</span></p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200/60">
            <button 
              onClick={handleSignOutAction}
              className="w-full text-center bg-white border border-neutral-300 text-neutral-700 hover:text-black hover:border-black text-[10px] tracking-[0.25em] py-3 uppercase font-medium transition-all cursor-pointer"
            >
              Sign Out Account
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE: HISTORICAL ORDERS LEDGER TABLE ================= */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-[12px] tracking-[0.2em] font-medium text-neutral-900 border-b border-neutral-100 pb-3 uppercase">
            Order Allocation History
          </h2>

          {orders.length === 0 ? (
            <div className="py-12 border border-dashed border-neutral-200 text-center">
              <p className="text-[12px] tracking-widest text-neutral-400 uppercase font-light">No historical order allocations are currently linked to this profile.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-neutral-100 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-[11px] tracking-widest uppercase text-neutral-500">
                  
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-neutral-900 text-[12px] tracking-normal font-mono">{order.id}</span>
                      <span className="text-[9px] bg-neutral-950 text-white font-medium px-2 py-0.5 rounded-sm tracking-[0.15em]">{order.delivery_status}</span>
                    </div>
                    <p className="text-neutral-400 text-[10px]">Registry Date: <span className="text-neutral-700 font-medium">{order.created_at}</span></p>
                    <p className="text-neutral-400 text-[10px]">Authorization Ref: <span className="text-neutral-700 font-mono tracking-normal normal-case select-all bg-neutral-50 border border-neutral-100 px-1 py-0.5 rounded-xs">{order.reference_code}</span></p>
                  </div>

                  <div className="flex sm:flex-col justify-between sm:justify-center items-baseline sm:items-end border-t sm:border-t-0 border-neutral-100/80 pt-3 sm:pt-0 gap-1">
                    <span className="text-neutral-400 text-[9px] hidden sm:block">TOTAL AMOUNT AMOUNT</span>
                    <span className="font-bold text-neutral-950 font-mono text-[14px] tracking-normal">{formatLocalizedPrice(order.total_price)}</span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
