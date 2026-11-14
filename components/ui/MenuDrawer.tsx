"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  NAVIGATION_TREE,
  TABS_LIST,
  SECONDARY_LINKS_LIST,
  FeaturedCampaign
} from "../../data/navigationTree";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

export default function MenuDrawer({ isOpen, onClose, onOpenContact }: MenuDrawerProps) {
  const [activePillar, setActivePillar] = useState<string>("new-arrival");
  const [mobileSubView, setMobileSubView] = useState<string | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const params = useParams();
  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setMobileSubView(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPillarData = NAVIGATION_TREE[activePillar] || { title: "", sections: [] };

  // 🎨 Reusable Editorial Campaign Spotlight Card (Desktop & Mobile)
  const renderCampaignCard = (campaign: FeaturedCampaign, pillarKey: string) => {
    const hasBrokenImg = imgError[pillarKey];

    return (
      <Link
        href={`/${currentLocale}${campaign.href}`}
        onClick={onClose}
        className="group relative block w-full overflow-hidden bg-neutral-950 border border-neutral-200 mb-10"
      >
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          {!hasBrokenImg ? (
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              onError={() => setImgError((prev) => ({ ...prev, [pillarKey]: true }))}
              className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-stone-900" />
          )}

          {/* Editorial Dark Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Campaign Typography Overlay */}
          <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end text-white">
            <span className="text-[9px] tracking-[0.28em] uppercase text-neutral-300 mb-1.5">
              {campaign.eyebrow}
            </span>
            <h3 className="text-[15px] md:text-[17px] tracking-[0.22em] font-medium uppercase mb-1.5">
              {campaign.title}
            </h3>
            <p className="text-[11px] tracking-[0.06em] text-neutral-300 font-light line-clamp-2 max-w-md mb-3">
              {campaign.subtitle}
            </p>
            <span className="text-[10px] tracking-[0.25em] uppercase inline-flex items-center gap-2 border-b border-white/60 pb-1 w-fit group-hover:border-white transition-colors">
              <span>{campaign.ctaLabel}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div
      style={{ fontFamily: "'Helvetica Neue', Arial, 'Helvetica', sans-serif" }}
      className="fixed inset-0 z-50 flex"
    >
      {/* Background dimmer mask overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={onClose} />

      {/* Main Slide-out Panel Frame Box */}
      <div className="relative w-full max-w-[960px] bg-white h-screen shadow-2xl flex flex-col md:flex-row transition-transform duration-300 text-black overflow-hidden ml-auto">
        
        {/* ================= DESKTOP VIEW (Two-Column Split Drawer) ================= */}
        <div className="hidden md:flex w-[320px] bg-neutral-50 border-r border-neutral-200 p-8 pt-24 flex-col justify-between overflow-y-auto">
          <div className="flex flex-col space-y-7">
            {TABS_LIST.map((tab) => {
              const isSelected = activePillar === tab.id;
              const hasSubMenus = (NAVIGATION_TREE[tab.id]?.sections?.length ?? 0) > 0;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePillar(tab.id)}
                  className={`text-[12px] tracking-[0.2em] text-left uppercase flex justify-between items-center w-full transition-all duration-200 hover:text-black group cursor-pointer ${
                    isSelected ? "text-black font-medium translate-x-1" : "text-neutral-500 font-normal"
                  }`}
                >
                  <span>{tab.label}</span>
                  {hasSubMenus && (
                    <span
                      className={`text-[10px] tracking-normal font-normal text-neutral-400 transition-transform group-hover:translate-x-1 ${
                        isSelected ? "text-black scale-110" : ""
                      }`}
                    >
                      &gt;
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col space-y-6">
            {SECONDARY_LINKS_LIST.map((link) => {
              const isSelected = activePillar === link.id;

              if (link.href) {
                return (
                  <Link
                    key={link.id}
                    href={`/${currentLocale}${link.href}`}
                    onClick={onClose}
                    className="text-[11px] tracking-[0.25em] font-normal text-neutral-500 hover:text-black transition-colors block uppercase"
                  >
                    {link.label}
                  </Link>
                );
              }

              const hasSubMenus = (NAVIGATION_TREE[link.id]?.sections?.length ?? 0) > 0;

              return (
                <button
                  key={link.id}
                  onClick={() => setActivePillar(link.id)}
                  className={`text-[11px] tracking-[0.25em] text-left uppercase flex justify-between items-center w-full transition-all duration-200 hover:text-black group cursor-pointer ${
                    isSelected ? "text-black font-medium" : "text-neutral-500 font-normal"
                  }`}
                >
                  <span>{link.label}</span>
                  {hasSubMenus && (
                    <span className="text-[9px] tracking-normal font-normal text-neutral-400 group-hover:translate-x-1 transition-transform">
                      &gt;
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COMPARTMENT PANEL (Desktop): Editorial Campaign + Grid */}
        <div id="right-compartment-view" className="hidden md:flex md:flex-1 flex-col p-14 pt-24 overflow-y-auto bg-white relative">
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors p-1 cursor-pointer"
          >
            <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-[11px] tracking-[0.3em] font-medium text-neutral-400 mb-6 uppercase border-b border-neutral-100 pb-3 w-full">
            {currentPillarData.title}
          </h2>

          {/* Editorial Campaign Spotlight Card */}
          {currentPillarData.featuredCampaign &&
            renderCampaignCard(currentPillarData.featuredCampaign, activePillar)}

          <div className="grid grid-cols-2 gap-x-12 gap-y-12 w-full">
            {currentPillarData.sections.map((subCat) => (
              <div key={subCat.slug} className="flex flex-col space-y-5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <Link
                    href={`/${currentLocale}/shop/${subCat.slug}`}
                    onClick={onClose}
                    className="text-[12px] tracking-[0.2em] font-medium text-neutral-900 uppercase hover:text-neutral-500 transition-colors"
                  >
                    {subCat.subCategoryName}
                  </Link>
                  <span className="text-[10px] font-normal text-neutral-400 select-none">
                    &gt;
                  </span>
                </div>

                <ul className="flex flex-col space-y-3.5 pl-1">
                  {subCat.subSubCategories.map((leaf) => (
                    <li key={leaf.slug}>
                      <Link
                        href={`/${currentLocale}/shop/${leaf.slug}`}
                        onClick={onClose}
                        className="text-[11px] tracking-[0.18em] font-normal text-neutral-600 hover:text-black hover:font-medium transition-all block uppercase"
                      >
                        {leaf.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE VIEW (Luxury Single-Screen Drill-Down) ================= */}
        <div className="flex md:hidden flex-col w-full h-full bg-white relative pt-20">
          <div className="absolute top-0 left-0 right-0 h-16 px-6 border-b border-neutral-100 flex items-center justify-between bg-white z-10">
            {mobileSubView ? (
              <button
                onClick={() => setMobileSubView(null)}
                className="text-[11px] tracking-[0.2em] uppercase font-medium flex items-center gap-1.5 text-neutral-900 cursor-pointer"
              >
                <span>&larr;</span> BACK TO MENU
              </button>
            ) : (
              <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-400 font-medium">
                MENU
              </span>
            )}
            <button onClick={onClose} className="text-xs uppercase tracking-[0.2em] text-neutral-500 cursor-pointer">
              Close [X]
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {!mobileSubView ? (
              <div className="flex flex-col space-y-6">
                <div className="space-y-5 pb-6 border-b border-neutral-100">
                  {TABS_LIST.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActivePillar(tab.id);
                        setMobileSubView(tab.id);
                      }}
                      className="text-[12px] tracking-[0.2em] text-left uppercase font-normal flex justify-between items-center w-full py-1.5 text-neutral-900 cursor-pointer"
                    >
                      <span>{tab.label}</span>
                      <span className="text-neutral-400 text-xs">&gt;</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-5 pt-1">
                  {SECONDARY_LINKS_LIST.map((link) =>
                    link.href ? (
                      <Link
                        key={link.id}
                        href={`/${currentLocale}${link.href}`}
                        onClick={onClose}
                        className="text-[11px] tracking-[0.22em] uppercase text-neutral-600 block py-1.5"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        key={link.id}
                        onClick={() => {
                          setActivePillar(link.id);
                          setMobileSubView(link.id);
                        }}
                        className="text-[11px] tracking-[0.22em] text-left uppercase font-normal flex justify-between items-center w-full py-1.5 text-neutral-600 cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <span className="text-neutral-400 text-xs">&gt;</span>
                      </button>
                    )
                  )}

                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenContact) onOpenContact();
                    }}
                    className="text-[11px] tracking-[0.25em] text-left uppercase font-medium text-neutral-950 pt-4 border-t border-neutral-100 flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>CLIENT ADVISOR (CALL US)</span>
                    <span>&gt;</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-12">
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-medium border-b border-neutral-100 pb-3">
                  {currentPillarData.title}
                </h3>

                {/* Mobile Editorial Campaign Card */}
                {currentPillarData.featuredCampaign &&
                  renderCampaignCard(currentPillarData.featuredCampaign, activePillar)}

                <div className="flex flex-col space-y-8">
                  {currentPillarData.sections.map((subCat) => (
                    <div key={subCat.slug} className="flex flex-col space-y-3">
                      <Link
                        href={`/${currentLocale}/shop/${subCat.slug}`}
                        onClick={onClose}
                        className="text-[12px] uppercase tracking-[0.2em] font-medium text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2"
                      >
                        <span>{subCat.subCategoryName}</span>
                        <span className="text-neutral-400 text-xs">&gt;</span>
                      </Link>

                      <ul className="flex flex-col space-y-3 pl-1">
                        {subCat.subSubCategories.map((leaf) => (
                          <li key={leaf.slug}>
                            <Link
                              href={`/${currentLocale}/shop/${leaf.slug}`}
                              onClick={onClose}
                              className="text-[11px] tracking-[0.18em] text-neutral-600 hover:text-black block py-1 uppercase"
                            >
                              {leaf.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}