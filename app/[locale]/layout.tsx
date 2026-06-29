import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers"; // Added: Native Next.js utility to intercept headers
import Header from "../../components/ui/Header"; 
import Footer from "../../components/ui/Footer"; // Added: Imports your new global footer 
import "../globals.css"; 

// Configure the geometric luxury font matching high-fashion aesthetics
const luxuryFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-luxury", 
});

export const metadata: Metadata = {
  title: "FIZAC GLOBAL | Official Luxury House",
  description: "Explore exquisite collections of Fashion, Haute Parfumerie, Craftsmanship, and Contemporary Design.",
};

// Updated: Added async wrapper and typed params for subdirectory tracking
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 1. Safely extract the active URL market code (e.g., 'ng', 'us')
  const { locale } = await params;

  // 2. Fetch the localization strings injected from your middleware
  const headerList = await headers();
  const activeCurrency = headerList.get("x-market-currency") || "NGN";
  const activeRegion = headerList.get("x-market-region") || "Nigeria";

  return (
    <html lang={locale || "en"}>
      <body className={`${luxuryFont.className} bg-white text-black min-h-screen antialiased pt-16 flex flex-col justify-between`}>
        
        <div>
          {/* 3. Pass market parameters into your main header block */}
          <Header 
            activeCurrency={activeCurrency} 
            activeRegion={activeRegion} 
            currentLocale={locale} 
          />
          {children}
        </div>

        {/* 4. Pass matching market parameters into your global footer */}
        <Footer 
          activeCurrency={activeCurrency} 
          activeRegion={activeRegion} 
          currentLocale={locale} 
        />

      </body>
    </html>
  );
}
