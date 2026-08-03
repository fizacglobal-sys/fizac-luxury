// components/ui/WomenVideoCampaign.tsx
"use client";

import Link from "next/link";

interface WomenVideoCampaignProps {
  currentLocale: string;
}

export default function WomenVideoCampaign({ currentLocale = "ng" }: WomenVideoCampaignProps) {
  // CONFIGURATION: Points exactly to your nested video asset inside your image folder tree
  const campaignVideoSrc = "/images/img/XVZG4551.MP4"; 
  const targetDestination = `/${currentLocale}/shop/women`;

  return (
    <section className="w-full mt-8 mb-24 bg-white select-none relative z-30">
      
      {/* ================= 1. THE RECTANGULAR DYNAMIC VIDEO COMPONENT CONTAINER ================= */}
      <Link 
        href={targetDestination} 
        className="w-full relative h-[100vh] min-h-[600px] overflow-hidden group block cursor-pointer bg-white"
      >
        <video
          src={campaignVideoSrc}
          autoPlay
          loop
          muted
          playsInline // Ensures video plays elegantly in-line on mobile phones
          className="w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out group-hover:scale-[1.02]"
        />
        {/* Subtle premium luxury interactive hover overlay layer */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/5 z-10" />
      </Link>

      {/* ================= 2. THE EDITORIAL TYPOGRAPHY LABELS (UNDERNEATH) ================= */}
      <div className="max-w-[1500px] mx-auto px-6 text-center flex flex-col items-center pt-14 pb-8 space-y-4 bg-white">
        
        {/* Women Category Specification Title */}
        <span className="text-[10px] tracking-[0.35em] text-neutral-400 font-bold uppercase block">
          Women
        </span>

        {/* Latest Women Creation Sub-headline Monograph Label */}
        <h2 className="text-[20px] sm:text-[26px] tracking-[0.2em] font-light uppercase text-neutral-950 leading-tight">
          Latest Women Creation
        </h2>

        {/* Refined clean underline accent marking the transition breakpoint */}
        <div className="w-8 h-[1px] bg-neutral-950/20 mt-4 block" />

      </div>

    </section>
  );
}
