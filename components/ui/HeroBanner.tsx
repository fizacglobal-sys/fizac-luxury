"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // Hook to capture active regional subdirectories like /uk/
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface BannerData {
  subtitle: string;
  title: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
  media_type: string;
  media_url: string;
}

export default function HeroBanner() {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  // Safely extract the active location subdirectory code (falls back to 'uk' based on your verified path)
  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "uk";

  useEffect(() => {
    async function fetchActiveBanner() {
      try {
        const { data, error } = await supabase
          .from("hero_banners")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (data && !error) {
          setBanner(data);
        }
      } catch (err) {
        console.error("Failed to load luxury marketing hero assets:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveBanner();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-64px)] bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const fallbackData: BannerData = {
    subtitle: "HAUTE PARFUMERIE",
    title: "CULTURING THE SCENT",
    primary_btn_text: "EXPLORE COLLECTIONS",
    primary_btn_link: "/shop/haute-parfumerie",
    secondary_btn_text: "EXPLORE HOUSE",
    secondary_btn_link: "/world",
    media_type: "video",
    media_url: "/images/img/brand-video.mp4"
  };

  const activeData = banner || fallbackData;

  // 🎯 VERIFIED ROUTE TARGET: Matches your absolute path structure precisely to eliminate 404 errors
  const verifiedPerfumeLink = `/${currentLocale}/shop/haute-parfumerie`;

  return (
    /* 🌟 FULL BANNER INTERACTIVE CONTAINER: Every pixel links to the Haute Parfumerie shelf */
    <Link 
      href={verifiedPerfumeLink} 
      className="relative w-full h-[calc(100vh-64px)] bg-neutral-950 overflow-hidden text-white font-sans block cursor-pointer group"
    >
      
      {/* BACKGROUND DYNAMIC MEDIA COMPARTMENT */}
      <div className="absolute inset-0 w-full h-full select-none z-0">
        {activeData.media_type === "video" ? (
          <video
            autoPlay
            loop
            muted 
            playsInline 
            preload="auto"
            className="w-full h-full object-cover brightness-[0.70] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.01]"
          >
            <source src={activeData.media_url} type="video/mp4" />
            <img src="https://unsplash.com" className="w-full h-full object-cover" alt="Fallback background" />
          </video>
        ) : (
          <img
            src={activeData.media_url}
            alt={activeData.title}
            className="w-full h-full object-cover object-center brightness-[0.70] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.01]"
          />
        )}
      </div>

      {/* OVERLAY INTERACTIVE CONTENT GRID */}
      <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 px-6 md:pb-14 text-center z-10">
        
        {/* Sub-heading Collections Label */}
        <span className="text-[11px] tracking-[0.45em] font-medium text-neutral-300 uppercase mb-3">
          {activeData.subtitle}
        </span>

        {/* Cinematic Understated House Typography Heading */}
        <h1 className="text-[26px] sm:text-[36px] md:text-[42px] tracking-[0.2em] font-medium text-white uppercase leading-tight max-w-4xl mb-8 drop-shadow-sm">
          {activeData.title}
        </h1>

        {/* Action Button Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          
          {/* Explore Collections Visual Box (Clicks fall through directly to the global wrapper link) */}
          <div className="w-full sm:w-auto px-12 py-3.5 bg-white text-black text-[11px] tracking-[0.25em] font-bold uppercase transition-all duration-300 group-hover:bg-neutral-100 group-hover:tracking-[0.28em] text-center">
            {activeData.primary_btn_text}
          </div>

          {/* 
            EXPLORE HOUSE BUTTON (Safely commented out for now)
            We can style and restore this later whenever you are ready.

            <div className="w-full sm:w-auto px-12 py-3.5 bg-transparent text-white text-[11px] tracking-[0.25em] font-bold uppercase border border-white/60 transition-all duration-300 text-center">
              {activeData.secondary_btn_text}
            </div> 
          */}

        </div>

      </div>

      {/* Luxury Minimalist Scroll Down Marker */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400 select-none hidden md:flex z-10 opacity-70">
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

    </Link>
  );
}
