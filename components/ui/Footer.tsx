// components/ui/Footer.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FooterProps {
  activeCurrency?: string;
  activeRegion?: string;
  currentLocale?: string;
}

export default function Footer({ 
  activeCurrency = "NGN", 
  activeRegion = "Nigeria", 
  currentLocale = "ng" 
}: FooterProps) {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription for:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-neutral-950 text-white pt-20 pb-12 border-t border-neutral-900 font-sans select-none relative z-30">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-900">
        
        {/* ================= COLUMN 1: NEWSLETTER ================= */}
        <div className="lg:col-span-4 space-y-5">
          <h3 className="text-[11px] tracking-[0.25em] font-medium uppercase text-neutral-400">
            Fizac Newsletter
          </h3>
          <p className="text-[12px] tracking-[0.05em] font-light leading-relaxed text-neutral-400 max-w-sm">
            Sign up to receive announcements on latest seasonal collections, interior design drops, and high-fashion updates from the House.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-sm">
            <div className="relative flex items-center border-b border-neutral-700 focus-within:border-white transition-colors py-2">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-[11px] tracking-[0.15em] font-light placeholder-neutral-500 text-white focus:outline-none uppercase"
              />
              <button 
                type="submit" 
                className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white transition-colors font-medium pl-4"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        {/* ================= COLUMN 2: SERVICES ================= */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[11px] tracking-[0.25em] font-medium uppercase text-neutral-400">
            Client Services
          </h3>
          <ul className="space-y-2.5 text-[11px] tracking-[0.12em] font-light text-neutral-500 uppercase">
            <li>
              <Link href={`/${currentLocale}/contact`} className="hover:text-white transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/services/gifting`} className="hover:text-white transition-colors">Bespoke Gifting</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/services/personalization`} className="hover:text-white transition-colors">Personalization</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/faq`} className="hover:text-white transition-colors">FAQs & Care</Link>
            </li>
          </ul>
        </div>

        {/* ================= COLUMN 3: THE HOUSE ================= */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[11px] tracking-[0.25em] font-medium uppercase text-neutral-400">
            The House
          </h3>
          <ul className="space-y-2.5 text-[11px] tracking-[0.12em] font-light text-neutral-500 uppercase">
            <li>
              <Link href={`/${currentLocale}/heritage`} className="hover:text-white transition-colors">Our Heritage</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/sustainability`} className="hover:text-white transition-colors">Sustainability</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/careers`} className="hover:text-white transition-colors">Careers</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/stores`} className="hover:text-white transition-colors">Find a Store</Link>
            </li>
          </ul>
        </div>

        {/* ================= COLUMN 4: LEGAL ================= */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[11px] tracking-[0.25em] font-medium uppercase text-neutral-400">
            Legal Terms
          </h3>
          <ul className="space-y-2.5 text-[11px] tracking-[0.12em] font-light text-neutral-500 uppercase">
            <li>
              <Link href={`/${currentLocale}/legal/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/legal/terms`} className="hover:text-white transition-colors">Terms of Sale</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/legal/accessibility`} className="hover:text-white transition-colors">Accessibility</Link>
            </li>
          </ul>
        </div>

        {/* ================= COLUMN 5: SHIPPING BADGE ================= */}
        <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-start space-y-4">
          <h3 className="text-[11px] tracking-[0.25em] font-medium uppercase text-neutral-400">
            Shipping To
          </h3>
          <div className="flex items-center space-x-2 text-[10px] font-normal tracking-[0.2em] text-neutral-400 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full uppercase cursor-pointer hover:border-neutral-600 transition-colors">
            <span className="text-neutral-200 font-medium">{activeRegion}</span>
            <span className="text-neutral-600">·</span>
            <span className="font-mono text-neutral-100 font-semibold">{activeCurrency}</span>
          </div>
        </div>

      </div>

      {/* ================= REFINED DOWNCENTER BRAND SECTION ================= */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12 flex flex-col items-center justify-center space-y-4 text-center">
        
        {/* 1. TYPOGRAPHIC ACCENT IDENTICAL TO CENTER HEADER */}
        <span className="text-xl md:text-2xl tracking-[0.4em] font-semibold text-white uppercase block">
          FIZAC
        </span>

        {/* 2. LEAN MINIMALIST LEGAL CREDIT STRIP */}
        <span className="text-neutral-600 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-light block pt-2">
          © {new Date().getFullYear()} FIZAC GLOBAL. All Rights Reserved.
        </span>

      </div>
    </footer>
  );
}
