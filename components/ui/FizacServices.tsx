// components/ui/FizacServices.tsx
"use client";

import React from "react";
import Link from "next/link";

interface FizacServicesProps {
  currentLocale: string;
}

export default function FizacServices({ currentLocale = "ng" }: FizacServicesProps) {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 mb-32 bg-white select-none relative z-30">
      
      {/* ================= 1. THE SERVICES INTRO TYPOGRAPHY HEADER BLOCK ================= */}
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-[20px] sm:text-[24px] tracking-[0.25em] font-medium uppercase text-neutral-900 mb-4">
          Fizac Services
        </h2>
        <p className="text-[13px] sm:text-[14px] tracking-[0.08em] font-light leading-relaxed text-neutral-600 max-w-2xl mx-auto">
          Fizac provides an exclusive suite of tailored services, featuring signature gift wrapping, bespoke personalization options, and dedicated Client Advisor support.
        </p>
        <div className="w-12 h-[1px] bg-neutral-900 mt-6 opacity-30" />
      </div>

      {/* ================= 2. THE 3-COLUMN CUSTOM SERVICES INTERACTION GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        
        {/* --- COLUMN 1: CLIENT ADVISOR (IMG_6291.JPG) --- */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-full aspect-[4/5] bg-neutral-50 overflow-hidden relative mb-5">
            <img
              src="/images/img/IMG_6291.JPG"
              alt="Book An Appointment"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center space-y-3 px-2">
            <h3 className="text-[13px] tracking-[0.15em] font-medium text-neutral-950 uppercase">
              Book An Appointment
            </h3>
            <Link
              href={`/${currentLocale}/contact`}
              className="text-[11px] tracking-[0.2em] font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors pt-1 block"
            >
              CALL US
            </Link>
          </div>
        </div>

        {/* --- COLUMN 2: BESPOKE GIFTING (service2.jpg) --- */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-full aspect-[4/5] bg-neutral-50 overflow-hidden relative mb-5">
            <img
              src="/images/img/service2.jpg"
              alt="Bespoke Gifting"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center space-y-3 px-2">
            <h3 className="text-[13px] tracking-[0.15em] font-medium text-neutral-950 uppercase">
              Bespoke Gifting
            </h3>
            <div className="flex items-center space-x-4 pt-1 text-[11px] tracking-[0.2em] font-semibold">
              <Link
                href={`/${currentLocale}/shop/gifts-for-her`}
                className="text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors"
              >
                GIFTS FOR HER
              </Link>
              <span className="w-[1px] h-3 bg-neutral-200 block" />
              <Link
                href={`/${currentLocale}/shop/gifts-for-him`}
                className="text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors"
              >
                GIFTS FOR HIM
              </Link>
            </div>
          </div>
        </div>

        {/* --- COLUMN 3: PERSONALIZATION (service1.jpg) --- */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-full aspect-[4/5] bg-neutral-50 overflow-hidden relative mb-5">
            <img
              src="/images/img/service1.jpg"
              alt="Personalization"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center space-y-3 px-2">
            <h3 className="text-[13px] tracking-[0.15em] font-medium text-neutral-950 uppercase">
              Personalization
            </h3>
            <Link
              href={`/${currentLocale}/services/personalization`}
              className="text-[11px] tracking-[0.2em] font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors pt-1 block"
            >
              Explore
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
