"use client";

import React, { useEffect, useRef, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: string;
}

export default function SearchOverlay({ isOpen, onClose, currentLocale }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Array listing your premium trending product segments
  const trendingSearches = ["Fragrances", "Handbags", "Shoes", "Belts", "Wallets"];

  // 🔒 Native Background Scroll Lock & Keyboard Listener
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // ⌨️ Focus Management
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      onClose();
      window.location.href = `/${currentLocale}`;
    }
  };

  if (!isOpen) return null;

  return (
    /* 🌟 THE HIGH-ISOLATION INTERACTIVE LUXURY CANVAS LAYER */
    <div className="fixed inset-0 w-screen h-screen z-50 bg-white/98 backdrop-blur-xl flex flex-col animate-fade-in text-neutral-900 font-sans overflow-y-auto">
      
      {/* ⚓ ANCHORED STICKY HEADER COMPARTMENT */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs w-full border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex-1 flex justify-start" />

          {/* Center Uniform Logo Identity */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <a href={`/${currentLocale}`} onClick={handleLogoClick} className="flex flex-col items-center group">
              <span 
                style={{ fontFamily: "'Granjon', 'Garamond', 'Baskerville', 'Georgia', serif" }} 
                className="text-lg sm:text-xl md:text-2xl tracking-[0.4em] font-normal text-neutral-950 transition-transform duration-300 group-hover:scale-[1.01]"
              >
                FIZAC
              </span>
            </a>
          </div>

          {/* Right side: Standalone Minimalist Close Indicator */}
          <div className="flex-1 flex justify-end">
            <button 
              onClick={onClose}
              className="text-[14px] font-light text-neutral-800 hover:opacity-60 transition-opacity cursor-pointer p-2"
              aria-label="Close search"
            >
              ✕
            </button>
          </div>

        </div>
      </div>

      {/* CORE SEARCH ENTRY & LAYOUT SECTION WRAPPER */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col flex-1">
        
        {/* INPUT BOX: Simplified Prompt */}
        <div className="w-full border-b border-neutral-200 pb-4 mb-12">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH FOR"
            className="w-full bg-transparent text-xl md:text-2xl font-light tracking-[0.1em] text-neutral-900 uppercase placeholder-neutral-400 border-none outline-none focus:ring-0"
          />
        </div>

        {/* DATA CONTAINER CANVAS SHELL */}
        <div className="w-full flex-1 flex flex-col justify-start">
          
          {searchQuery.trim() === "" ? (
            /* STATE A: Trending Searches Categorical Entry Grid */
            <div className="animate-fade-in">
              <span className="text-[10px] tracking-[0.4em] font-semibold text-neutral-400 uppercase block mb-5">
                TRENDING SEARCHES
              </span>
              <div className="flex flex-wrap gap-3 text-[11px] tracking-widest font-normal text-neutral-700 uppercase">
                {trendingSearches.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSearchQuery(category)}
                    className="border border-neutral-200 px-5 py-2.5 hover:border-neutral-900 hover:text-neutral-950 transition-all cursor-pointer bg-white font-medium"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* STATE B: Active Filtering Presentation Grid */
            <div className="animate-fade-in flex-1 flex flex-col">
              <span className="text-[10px] tracking-[0.4em] font-semibold text-neutral-400 uppercase block mb-6">
                SEARCH RESULTS FOR &ldquo;{searchQuery.toUpperCase()}&rdquo;
              </span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 w-full">
                {/* Visual Placeholder Card 1 */}
                <div className="flex flex-col cursor-pointer group">
                  <div className="aspect-[3/4] bg-neutral-50 border border-neutral-100 overflow-hidden mb-3">
                    <div className="w-full h-full bg-neutral-100 animate-pulse group-hover:scale-[1.01] transition-transform duration-700" />
                  </div>
                  <span className="text-[11px] tracking-widest font-medium uppercase text-neutral-800">MATCHING {searchQuery.slice(0, -1).toUpperCase()}</span>
                  <span className="text-[10px] tracking-widest text-neutral-400 mt-1">120,000 NGN</span>
                </div>

                {/* Visual Placeholder Card 2 */}
                <div className="flex flex-col cursor-pointer group">
                  <div className="aspect-[3/4] bg-neutral-50 border border-neutral-100 overflow-hidden mb-3">
                    <div className="w-full h-full bg-neutral-100 animate-pulse group-hover:scale-[1.01] transition-transform duration-700" />
                  </div>
                  <span className="text-[11px] tracking-widest font-medium uppercase text-neutral-800">MATCHING {searchQuery.slice(0, -1).toUpperCase()}</span>
                  <span className="text-[10px] tracking-widest text-neutral-400 mt-1">120,000 NGN</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
