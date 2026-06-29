// fizac-luxury/app/[locale]/page.tsx
import React from 'react';
import HeroBanner from "../../components/ui/HeroBanner"; 
import ProductGrid from "../../components/ui/ProductGrid"; 
import CampaignBanner from "../../components/ui/CampaignBanner"; 
import FragranceCampaign from "../../components/ui/FragranceCampaign"; 
import PerfumeGrid from "../../components/ui/PerfumeGrid"; 
import WomenVideoCampaign from "../../components/ui/WomenVideoCampaign"; 
import WomenSelectionGrid from "../../components/ui/WomenSelectionGrid"; 
import FizacServices from "../../components/ui/FizacServices"; 

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  // Await the dynamic layout parameter Promise on the server side
  const resolvedParams = await params;
  const targetLocale = resolvedParams?.locale || "ng";

  return (
    <main className="min-h-screen bg-white text-black font-light">
      
      {/* 1. Dynamic Luxury Hero Video Frame */}
      <HeroBanner />

      {/* 2. Product Matrix Selection with First Campaign Banner */}
      <ProductGrid currentLocale={targetLocale}>
        <CampaignBanner currentLocale={targetLocale} />
      </ProductGrid>

      {/* 3. Fragrance Campaign Banner */}
      <FragranceCampaign currentLocale={targetLocale} />

      {/* 4. 4-Picture Elegant Perfume Product Row Gallery */}
      <PerfumeGrid currentLocale={targetLocale} />

      {/* 5. Clickable Full-Frame Campaign Video Banner */}
      <WomenVideoCampaign currentLocale={targetLocale} />

      {/* 6. 4-Product Women's Choice Grid with Action Button */}
      <WomenSelectionGrid currentLocale={targetLocale} />

      {/* 7. Fizac Services Section row */}
      <FizacServices currentLocale={targetLocale} />

    </main>
  );
}
