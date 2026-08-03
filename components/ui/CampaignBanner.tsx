// components/ui/CampaignBanner.tsx
"use client";

import Link from "next/link";

interface CampaignBannerProps {
  currentLocale: string;
}

export default function CampaignBanner({ currentLocale = "ng" }: CampaignBannerProps) {
  // CONFIGURATION: Points directly to your image asset inside the public directory
  const campaignImage = "/images/img/MOBC0728.jpg"; 
  const targetDestination = `/${currentLocale}/shop/new-arrivals`;

  return (
    /* 🛠️ FIXED FULL SCREEN RESTRUCTURING COVER CANVAS CONTAINER */
    /* w-screen breaks out of any margin parameters to guarantee the visual layer hits the edges of the phone screen */
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] mt-20 mb-0 pb-0 bg-white select-none z-20 overflow-hidden">
      
      {/* ================= 1. THE PICTURE COMPONENT CONTAINER (FULL SCREEN IMAGE) ================= */}
      <Link 
        href={targetDestination} 
        className="w-full relative h-[100vh] min-h-[600px] overflow-hidden group block cursor-pointer bg-neutral-900"
      >
        <img
          src={campaignImage}
          alt="FIZAC GLOBAL Campaign Visual Narrative. Click to explore collections."
          className="w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out group-hover:scale-[1.03]"
          loading="eager"
        />
        {/* Subtle ultra-luxury ambient hover darkening shift over the image surface */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/5 z-10" />
      </Link>

      {/* ================= 2. THE EDITORIAL COPYWRITING COMPOSITION LAYER (UNDERNEATH) ================= */}
      <div className="max-w-[1500px] mx-auto px-6 text-center flex flex-col items-center pt-12 pb-6 space-y-8">
        
        {/* Editorial Storytelling Paragraph */}
        <p className="text-[14px] sm:text-[15px] tracking-[0.1em] font-light leading-relaxed text-neutral-800 max-w-2xl mx-auto">
          Essential volumes, natural materials and functional details define the new season, reinterpreting the codes of summer style.
        </p>

        {/* Gender Division Navigation Anchors */}
        <div className="flex items-center justify-center space-x-8 text-[11px] md:text-[12px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
          <Link 
            href={`/${currentLocale}/shop/women`} 
            className="text-neutral-800 hover:text-black hover:underline underline-offset-8 decoration-neutral-400 transition-all"
          >
            Women
          </Link>
          <span className="w-[1px] h-3 bg-neutral-200 block" />
          <Link 
            href={`/${currentLocale}/shop/men`} 
            className="text-neutral-800 hover:text-black hover:underline underline-offset-8 decoration-neutral-400 transition-all"
          >
            Men
          </Link>
        </div>

        {/* Primary Call to Action Action Button Block */}
        <div className="pt-2">
          <Link 
            href={targetDestination} 
            className="inline-block bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] tracking-[0.3em] px-12 py-4 transition-all duration-500 uppercase font-medium shadow-sm"
          >
            Discover More
          </Link>
        </div>

      </div>

    </section>
  );
}
