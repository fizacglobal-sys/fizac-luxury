import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =================================================================
// 1. MASTER LOCALIZATION MATRIX (Your 70 Global Markets)
// =================================================================
export const GLOBAL_MARKET_MATRIX: Record<string, { currency: string; region: string; localeCode: string }> = {
    // --- EU: EUROPEAN OPERATIONS ---
    'at': { currency: 'EUR', region: 'Austria', localeCode: 'at' },
    'be': { currency: 'EUR', region: 'Belgium', localeCode: 'be' },
    'bg': { currency: 'BGN', region: 'Bulgaria', localeCode: 'bg' },
    'hr': { currency: 'EUR', region: 'Croatia', localeCode: 'hr' },
    'cy': { currency: 'EUR', region: 'Cyprus', localeCode: 'cy' },
    'cz': { currency: 'CZK', region: 'Czech Republic', localeCode: 'cz' },
    'dk': { currency: 'DKK', region: 'Denmark', localeCode: 'dk' },
    'fi': { currency: 'EUR', region: 'Finland', localeCode: 'fi' },
    'fr': { currency: 'EUR', region: 'France', localeCode: 'fr' },
    'de': { currency: 'EUR', region: 'Germany', localeCode: 'de' },
    'gr': { currency: 'EUR', region: 'Greece', localeCode: 'gr' },
    'hu': { currency: 'HUF', region: 'Hungary', localeCode: 'hu' },
    'ie': { currency: 'EUR', region: 'Ireland', localeCode: 'ie' },
    'it': { currency: 'EUR', region: 'Italy', localeCode: 'it' },
    'lu': { currency: 'EUR', region: 'Luxembourg', localeCode: 'lu' },
    'mc': { currency: 'EUR', region: 'Monaco', localeCode: 'mc' },
    'nl': { currency: 'EUR', region: 'Netherlands', localeCode: 'nl' },
    'no': { currency: 'NOK', region: 'Norway', localeCode: 'no' },
    'pl': { currency: 'PLN', region: 'Poland', localeCode: 'pl' },
    'pt': { currency: 'EUR', region: 'Portugal', localeCode: 'pt' },
    'ro': { currency: 'RON', region: 'Romania', localeCode: 'ro' },
    'sk': { currency: 'EUR', region: 'Slovakia', localeCode: 'sk' },
    'si': { currency: 'EUR', region: 'Slovenia', localeCode: 'si' },
    'es': { currency: 'EUR', region: 'Spain', localeCode: 'es' },
    'se': { currency: 'SEK', region: 'Sweden', localeCode: 'se' },
    'ch': { currency: 'CHF', region: 'Switzerland', localeCode: 'ch' },
    'tr': { currency: 'TRY', region: 'Türkiye', localeCode: 'tr' },
    'uk': { currency: 'GBP', region: 'United Kingdom', localeCode: 'uk' },

    // --- US: NORTH AMERICA & CARIBBEAN ---
    'bs': { currency: 'BSD', region: 'Bahamas', localeCode: 'bs' },
    'ca': { currency: 'CAD', region: 'Canada', localeCode: 'ca' },
    'mx': { currency: 'MXN', region: 'Mexico', localeCode: 'mx' },
    'pa': { currency: 'PAB', region: 'Panama', localeCode: 'pa' },
    'pr': { currency: 'USD', region: 'Puerto Rico', localeCode: 'pr' },
    'bl': { currency: 'EUR', region: 'Saint Barthélemy', localeCode: 'bl' },
    'us': { currency: 'USD', region: 'United States', localeCode: 'us' },

    // --- BR: SOUTH AMERICA ---
    'ar': { currency: 'ARS', region: 'Argentina', localeCode: 'ar' },
    'br': { currency: 'BRL', region: 'Brazil', localeCode: 'br' },
    'cl': { currency: 'CLP', region: 'Chile', localeCode: 'cl' },
    'co': { currency: 'COP', region: 'Colombia', localeCode: 'co' },
    'uy': { currency: 'UYU', region: 'Uruguay', localeCode: 'uy' },

    // --- CN: EAST ASIA & ASIA-PACIFIC ---
    'au': { currency: 'AUD', region: 'Australia', localeCode: 'au' },
    'cn': { currency: 'CNY', region: 'China', localeCode: 'cn' },
    'hk': { currency: 'HKD', region: 'Hong Kong SAR', localeCode: 'hk' },
    'id': { currency: 'IDR', region: 'Indonesia', localeCode: 'id' },
    'jp': { currency: 'JPY', region: 'Japan', localeCode: 'jp' },
    'mo': { currency: 'MOP', region: 'Macau SAR', localeCode: 'mo' },
    'my': { currency: 'MYR', region: 'Malaysia', localeCode: 'my' },
    'nz': { currency: 'NZD', region: 'New Zealand', localeCode: 'nz' },
    'ph': { currency: 'PHP', region: 'Philippines', localeCode: 'ph' },
    'sg': { currency: 'SGD', region: 'Singapore', localeCode: 'sg' },
    'kr': { currency: 'KRW', region: 'South Korea', localeCode: 'kr' },
    'tw': { currency: 'TWD', region: 'Taiwan', localeCode: 'tw' },
    'th': { currency: 'THB', region: 'Thailand', localeCode: 'th' },
    'vn': { currency: 'VND', region: 'Vietnam', localeCode: 'vn' },

    // --- IN: SOUTH & CENTRAL ASIA ---
    'in': { currency: 'INR', region: 'India', localeCode: 'in' },
    'kz': { currency: 'KZT', region: 'Kazakhstan', localeCode: 'kz' },

    // --- AE: MIDDLE EAST ---
    'bh': { currency: 'BHD', region: 'Bahrain', localeCode: 'bh' },
    'kw': { currency: 'KWD', region: 'Kuwait', localeCode: 'kw' },
    'qa': { currency: 'QAR', region: 'Qatar', localeCode: 'qa' },
    'sa': { currency: 'SAR', region: 'Saudi Arabia', localeCode: 'sa' },
    'ae': { currency: 'AED', region: 'United Arab Emirates', localeCode: 'ae' },

    // --- AFRICA ---
    'ma': { currency: 'MAD', region: 'Morocco', localeCode: 'ma' },
    'za': { currency: 'ZAR', region: 'South Africa', localeCode: 'za' },
    'ng': { currency: 'NGN', region: 'Nigeria', localeCode: 'ng' },
    'eg': { currency: 'EGP', region: 'Egypt', localeCode: 'eg' },
    'dz': { currency: 'DZD', region: 'Algeria', localeCode: 'dz' },
    'sn': { currency: 'XOF', region: 'Senegal', localeCode: 'sn' },
    'tn': { currency: 'TND', region: 'Tunisia', localeCode: 'tn' },
    'gh': { currency: 'GHS', region: 'Ghana', localeCode: 'gh' },
    'cm': { currency: 'XAF', region: 'Cameroon', localeCode: 'cm' },
    'ci': { currency: 'XOF', region: 'Ivory Coast', localeCode: 'ci' },

    // --- GLOBAL BACKUP ARCHITECTURE ---
    'int': { currency: 'USD', region: 'International Hub', localeCode: 'int' }
};

export const SUPPORTED_LOCALES = new Set(Object.keys(GLOBAL_MARKET_MATRIX));
const DEFAULT_LOCALE = 'ng';

const ipCache = new Map<string, { count: number; expires: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 60;

// =================================================================
// 2. ROOT HANDLER INTERCEPTOR 
// =================================================================
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (pathname.startsWith('/api/checkout')) {
        const now = Date.now();
        const clientData = ipCache.get(ip);

        if (!clientData || now > clientData.expires) {
            ipCache.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        } else {
            clientData.count++;
            if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
                return new NextResponse('Too many requests', { status: 429 });
            }
        }
    }

    // ✅ AUTOMATED FIX: Extract first folder cleanly and fallback safely to avoid compilation locks
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0] ? segments[0].toLowerCase() : '';
    const pathnameHasLocale = SUPPORTED_LOCALES.has(firstSegment);

    if (pathnameHasLocale) {
        const marketData = GLOBAL_MARKET_MATRIX[firstSegment];

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-market-locale', marketData.localeCode);
        requestHeaders.set('x-market-currency', marketData.currency);
        requestHeaders.set('x-market-region', marketData.region);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|images|videos|.*\\..*).*)'],
};
