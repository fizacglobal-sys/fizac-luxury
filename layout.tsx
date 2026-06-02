import type { Metadata } from "next";
import "./globals.css";

// Establishing international luxury metadata for SEO crawlers scanning Fizac Global
export const metadata: Metadata = {
    title: "FIZAC GLOBAL | Official Haute Luxury Flagship",
    description: "Experience artisanal perfumery and bespoke contemporary luxury design.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-black text-white selection:bg-neutral-800 selection:text-white">
            <body className="antialiased min-h-screen bg-black text-white flex flex-col">
                {/*
                    This is the core shell of your multi-local engine.
                    The dynamic subdirectories (/ng, /uk, /us, /ae, /int)
                    will automatically inject their specific page interfaces here.
                */}
                {children}
            </body>
        </html>
    );
}

export async function generateStaticParams() {
    return [
        { locale: 'ng' },
        { locale: 'uk' },
        { locale: 'us' },
        { locale: 'ae' },
        { locale: 'int' }
    ];
}

