import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['ng', 'uk', 'us', 'ae', 'int'];
const defaultLocale = 'ng';

const ipCache = new Map<string, { count: number, expires: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

    // SECURITY WALL: Rate Limit sensitive API Routes
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

    // INTERNATIONAL ROUTING ENGINE
    const pathnameHasLocale = supportedLocales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return NextResponse.next();

    // Redirect to country-specific storefront if accessing root /
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
    ],
};

