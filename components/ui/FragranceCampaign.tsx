// components/ui/FragranceCampaign.tsx
"use client";

import Link from "next/link";

interface FragranceCampaignProps {
  currentLocale: string;
}

export default function FragranceCampaign({ currentLocale = "ng" }: FragranceCampaignProps) {
  const campaignImage = "/images/img/heritage-bg.jpg"; 
  const targetDestination = `/${currentLocale}/shop/perfumes-and-beauty`;

  return (
    // FORCED: Removed "mt-8" and replaced with "mt-0 pt-0" to pull it completely up. Forced background to white.
    <section className="w-full mt-0 pt-0 mb-24 !bg-white select-none relative z-30">
      
      {/* ================= 1. THE PICTURE COMPONENT CONTAINER (FIXED RATIO MAXIMIZER) ================= */}
      <Link 
        href={targetDestination} 
        // CHANGED: Fixed height h-[750px] prevents viewport canvas spillover. Forced background to white.
        className="w-full relative h-[500px] md:h-[750px] overflow-hidden group block cursor-pointer !bg-white"
      >
        <img
          src={campaignImage}
          alt="FIZAC Haute Parfumerie Campaign Visual Narrative. Click to experience."
          // FORCED: layout matches exact parent bounds cleanly
          className="w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out group-hover:scale-[1.03] block"
          loading="eager"
        />
        {/* Transparent overlay */}
        <div className="absolute inset-0 bg-transparent transition-colors duration-700 ease-out group-hover:bg-black/5 z-10" />
      </Link>

      {/* ================= 2. THE EDITORIAL COPYWRITING COMPOSITION LAYER (UNDERNEATH) ================= */}
      <div className="max-w-[1500px] mx-auto px-6 text-center flex flex-col items-center pt-12 pb-4 space-y-6 !bg-white">
        
        {/* Category Badge */}
        <span className="text-[10px] tracking-[0.35em] text-neutral-400 font-bold uppercase">
          Perfumes & Beauty
        </span>

        {/* Main Monograph Headline */}
        <h2 className="text-[24px] sm:text-[32px] tracking-[0.18em] font-light uppercase text-neutral-950 leading-tight">
          Your Signature Scent, Reimagined.
        </h2>

        {/* Sub-headline Copywriting Block */}
        <p className="text-[14px] sm:text-[15px] tracking-[0.1em] font-light leading-relaxed text-neutral-600 max-w-xl mx-auto">
          Effortless elegance for every moment. Experience Fizac.
        </p>

        {/* Primary Call to Action Button */}
        <div className="pt-2">
          <Link 
            href={targetDestination} 
            className="inline-block bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] px-12 py-4 transition-all duration-500 uppercase font-medium"
          >
            Experience the Magic
          </Link>
        </div>

      </div>

    </section>
  );
}
