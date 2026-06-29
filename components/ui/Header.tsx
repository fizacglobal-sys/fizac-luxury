"use client";

import React, { useState } from "react";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

interface HeaderProps {
  activeCurrency?: string;
  activeRegion?: string;
  currentLocale?: string;
}

export default function Header({ 
  activeCurrency = "NGN", 
  activeRegion = "Nigeria", 
  currentLocale = "ng" 
}: HeaderProps) {
  // State to manage whether the full-screen luxury menu drawer is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Custom refresh function to completely restart the home screen experience on logo click
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.location.href = `/${currentLocale}`;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* ================= LEFT SIDE: MENU & SEARCH ================= */}
          <div className="flex items-center space-x-6 flex-1 justify-start">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 text-[11px] tracking-[0.15em] text-neutral-800 font-light hover:opacity-60 transition-opacity cursor-pointer"
            >
              <svg className="w-4 h-4 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
              <span className="hidden sm:inline">MENU</span>
            </button>

            <button 
              onClick={() => console.log("Open Search Modal Overlay Backend triggered")}
              className="flex items-center space-x-2 text-[11px] tracking-[0.15em] text-neutral-800 font-light hover:opacity-60 transition-opacity cursor-pointer"
            >
              <svg className="w-4 h-4 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="hidden sm:inline">SEARCH</span>
            </button>
          </div>

          {/* ================= CENTER SIDE: TYPOGRAPHIC IDENTITY ================= */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <a 
              href={`/${currentLocale}`} 
              onClick={handleLogoClick} 
              className="flex flex-col items-center group"
            >
              <span className="text-xl md:text-2xl tracking-[0.35em] font-semibold text-neutral-950 transition-transform duration-300 group-hover:scale-[1.02]">
                FIZAC
              </span>
            </a>
          </div>

          {/* ================= RIGHT SIDE: CLIENT UTILITIES ================= */}
          <div className="flex items-center space-x-5 md:space-x-6 flex-1 justify-end text-[11px] tracking-[0.15em] text-neutral-800 font-light">
            
            {/* DYNAMIC LOCATION BADGE */}
            <div className="hidden md:flex items-center space-x-1 text-[10px] font-normal tracking-[0.2em] text-neutral-400 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100/60 uppercase">
              <span className="text-neutral-700 font-medium">{activeRegion}</span>
              <span className="text-neutral-300 mx-0.5">·</span>
              <span className="font-mono text-neutral-900 font-semibold">{activeCurrency}</span>
            </div>

            {/* Call Support Link */}
            <Link href={`/${currentLocale}/contact`} className="hover:opacity-60 transition-opacity hidden lg:inline-block">
              CALL US
            </Link>

            {/* Wishlist Action Trigger */}
            <Link href={`/${currentLocale}/wishlist`} className="hover:opacity-60 transition-opacity flex items-center" aria-label="Wishlist">
              <svg className="w-[17px] h-[17px] stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </Link>

            {/* Client Account/Sign In */}
            <Link href={`/${currentLocale}/account`} className="hover:opacity-60 transition-opacity flex items-center" aria-label="My Account">
              <svg className="w-[18px] h-[18px] stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            {/* Shopping Cart Indicator */}
            <Link href={`/${currentLocale}/bag`} className="hover:opacity-60 transition-opacity flex items-center" aria-label="Shopping Bag">
              <svg className="w-[17px] h-[17px] stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <span className="text-[10px] ml-1 font-medium bg-neutral-950 text-white w-4 h-4 rounded-full flex items-center justify-center text-center font-sans">
                0
              </span>
            </Link>
          </div>

        </div>
      </header>

      {/* Global Interactive Side Flyout Menu Overlay Drawer Context */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
