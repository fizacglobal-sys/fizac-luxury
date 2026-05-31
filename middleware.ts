import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Core subdirectories active in your app folder
const supportedLocales = ['ng', 'uk', 'us', 'ae', 'int'];
const defaultLocale = 'ng';

// In-memory cache for API rate limiting
const ipCache = new Map<string, { count: number; expires: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests max per minute per IP

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const ip = request.ip || '127.0.0.1';

    // ==========================================
    // SECURITY WALL: Rate Limit sensitive API Routes
    // ==========================================
    if (pathname.startsWith('/api/checkout')) {
        const now = Date.now();
        const clientData = ipCache.get(ip);

        if (!clientData || now > clientData.expires) {
            ipCache.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        } else {
            clientData.count++;
            if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
                return new NextResponse(
                    JSON.stringify({ success: false, message: "Too many checkout attempts. Rate limit exceeded." }),
                    { status: 429, headers: { 'Content-Type': 'application/json' } }
                );
            }
        }
    }

    // ==========================================
    // ROUTING: Exempt core assets and backend API channels
    // ==========================================
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.includes('.')
    ) {
        // Apply Global Security Response Headers even to API responses
        const response = NextResponse.next();
        return applySecurityHeaders(response);
    }

    // If the browser is already reading an active localized path, let them through
    const pathnameHasLocale = supportedLocales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        const response = NextResponse.next();
        return applySecurityHeaders(response);
    }

    // 2. Identify the ISO 2-letter country code from the network request
    const country = request.headers.get('x-vercel-ip-country')?.toLowerCase() || '';

    let targetLocale = defaultLocale;

    // 3. AFRICA REGION MAPPING
    const africaCountries = ['ng', 'za', 'cm', 'gh', 'ci', 'sn', 'ma', 'eg', 'dz', 'tn', 'cd'];

    // 4. EUROPE REGION MAPPING
    const europeCountries = [
        'gb', 'uk', 'fr', 'it', 'de', 'es', 'nl', 'be', 'at', 'ie', 'lu',
        'ch', 'dk', 'fi', 'se', 'pl', 'cz', 'gr', 'pt', 'hu', 'bg', 'ro', 'si', 'no'
    ];

    // 5. AMERICAS REGION MAPPING
    const americasCountries = ['us', 'ca', 'br', 'mx', 'ar', 'co', 'cl', 'pe', 'uy', 'py'];

    // 6. ASIA & MIDDLE EAST REGION MAPPING
    const asiaCountries = [
        'ae', 'sa', 'qa', 'kw', 'cn', 'jp', 'kr', 'hk', 'tw', 'sg', 'my', 'th', 'vn', 'id', 'in'
    ];

    // 7. MULTI-LOCAL ROUTING EVALUATION
    if (africaCountries.includes(country)) {
        targetLocale = 'ng';
    } else if (europeCountries.includes(country)) {
        targetLocale = 'uk';
    } else if (americasCountries.includes(country)) {
        targetLocale = 'us';
    } else if (asiaCountries.includes(country)) {
        targetLocale = 'ae';
    } else {
        // Australia (au), New Zealand (nz), and the rest of the world drop here
        targetLocale = 'int';
    }

    // 8. Execute redirect to the targeted localized subdirectory
    request.nextUrl.pathname = `/${targetLocale}${pathname}`;
    const redirectResponse = NextResponse.redirect(request.nextUrl);
    return applySecurityHeaders(redirectResponse);
}

// Helper function to inject global, luxury-tier security profiles into any response stream
function applySecurityHeaders(response: NextResponse) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.supabase.co;"
    );
    return response;
}

export const config = {
    // Merged matcher configuration to observe all routing layouts perfectly
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

