"use client";

import React, { useEffect, useRef, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔒 TRAIT 1: Native Background Scroll Lock & Keyboard Listener
  useEffect(() => {
    if (!isOpen) return;

    // Freeze page scrolling behind our luxury modal layout
    document.body.style.overflow = "hidden";

    // Instantly close overlay if shopper presses the global 'Escape' key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Clean up completely when component unmounts or closes
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // ⌨️ TRAIT 2: Instant Autofocus Focus Management
  useEffect(() => {
    if (isOpen) {
      // Small timeout ensures the element is rendered in DOM before triggering keyboard focus
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery(""); // Clear text buffer when hidden
    }
  }, [isOpen]);

  // If the header state is closed, do not render any overhead elements into DOM tree
  if (!isOpen) return null;

  return (
    /* 🌟 THE HIGH-ISOLATION INTERACTIVE LUXURY CANVAS LAYER */
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-neutral-950/98 backdrop-blur-xl flex flex-col animate-fade-in text-white font-sans">
      
      {/* OVERLAY ACTION BAR HEADER (Minimalist Close Control Top Right) */}
      <div className="w-full flex justify-end items-center p-6 md:px-12 md:py-8 border-b border-white/5">
        <button 
          onClick={onClose}
          className="text-[11px] tracking-[0.3em] font-medium text-neutral-400 uppercase hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer group"
        >
          CLOSE 
          <span className="text-sm font-light text-neutral-500 group-hover:text-white transition-colors duration-300">✕</span>
        </button>
      </div>

      {/* CORE SEARCH ENTRY & LAYOUT SECTION WRAPPER */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col overflow-y-auto">
        
        {/* INPUT INPUT BOX: Borderless Editorial Typography */}
        <div className="w-full border-b border-white/10 pb-4 mb-12">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH FOR FRAGRANCES, COLLECTIONS..."
            className="w-full bg-transparent text-xl md:text-3xl font-light tracking-[0.1em] text-white uppercase placeholder-neutral-600 border-none outline-none focus:ring-0"
          />
        </div>

        {/* 🎬 TRAIT 3: PRE-RENDERED PLACEHOLDER VISUAL GRID CANVAS */}
        <div className="w-full flex-1 flex flex-col justify-start">
          
          {searchQuery.trim() === "" ? (
            /* 1. STATE A: Suggestive Discovery Panel when Input is Empty */
            <div className="animate-fade-in">
              <span className="text-[10px] tracking-[0.4em] font-semibold text-neutral-500 uppercase block mb-4">
                SUGGESTED DISCOVERIES
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-medium tracking-widest text-neutral-300 uppercase">
                <span className="border border-white/10 px-4 py-2 hover:border-white transition-colors cursor-pointer">HAUTE PARFUMERIE</span>
                <span className="border border-white/10 px-4 py-2 hover:border-white transition-colors cursor-pointer">COLONIA DELUXE</span>
                <span className="border border-white/10 px-4 py-2 hover:border-white transition-colors cursor-pointer">ELIXIR OF GODS</span>
              </div>
            </div>
          ) : (
            /* 2. STATE B: Real-Time Results Container Shell */
            <div className="animate-fade-in flex-1 flex flex-col">
              <span className="text-[10px] tracking-[0.4em] font-semibold text-neutral-500 uppercase block mb-6">
                SEARCH RESULTS FOR &ldquo;{searchQuery.toUpperCase()}&rdquo;
              </span>
              
              {/* This Grid Layout is ready to dynamically map Supabase Product Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 w-full">
                
                {/* Visual Placeholder Card 1 */}
                <div className="flex flex-col opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden mb-3">
                    <div className="w-full h-full bg-neutral-800 animate-pulse group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[11px] tracking-widest font-semibold uppercase text-neutral-300">FRAGRANCE ITEM</span>
                  <span className="text-[10px] tracking-widest text-neutral-500 mt-1">₦000,000</span>
                </div>

                {/* Visual Placeholder Card 2 */}
                <div className="flex flex-col opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden mb-3">
                    <div className="w-full h-full bg-neutral-800 animate-pulse group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[11px] tracking-widest font-semibold uppercase text-neutral-300">FRAGRANCE ITEM</span>
                  <span className="text-[10px] tracking-widest text-neutral-500 mt-1">₦000,000</span>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
