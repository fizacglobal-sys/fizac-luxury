import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';

// Explicit whitelist of authorized billing currencies to eliminate injection vectors
const AUTHORIZED_CURRENCIES = ['USD', 'EUR', 'GBP', 'NGN', 'CAD', 'AED', 'ZAR'];

// Sanitization function to strip out common SQL Injection or Cross-Site Scripting payloads
function sanitizeInput(text: string): string {
    if (!text) return '';
    return text
        .replace(/[^a-zA-Z0-9\-_]/g, '') // Strips out semicolons, quotes, and dangerous tags completely
        .trim();
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. SANITIZE INPUTS: Instantly strip dangerous characters from client data
        const rawProductId = body.productId ? String(body.productId) : '';
        const rawCurrencyCode = body.currencyCode ? String(body.currencyCode) : '';

        const productId = sanitizeInput(rawProductId);
        const currencyCode = rawCurrencyCode.toUpperCase().trim();

        // 2. SCHEMA VALIDATION: Enforce strict structural rules
        if (!productId || !currencyCode) {
            return NextResponse.json(
                { success: false, message: "Validation Failure: Malformed data parameters encountered." },
                { status: 400 }
            );
        }

        // Reject immediately if the incoming currency string is not explicitly whitelisted
        if (!AUTHORIZED_CURRENCIES.includes(currencyCode)) {
            return NextResponse.json(
                { success: false, message: "Security Warning: Unauthorized or high-risk currency parameter rejected." },
                { status: 403 }
            );
        }

        // 3. SECURE BACKEND INTEGRITY CHECK: Pull verified truth directly from Supabase
        const { data: certifiedPrice, error } = await supabase
            .from('prices')
            .select('amount')
            .eq('product_id', productId)
            .eq('currency_code', currencyCode)
            .single();

        if (error || !certifiedPrice) {
            return NextResponse.json(
                { success: false, message: "Security Warning: Price verification failed. Unauthorized market parameters." },
                { status: 422 }
            );
        }

        const secureFinalAmount = certifiedPrice.amount;

        console.log(`[Price Integrity Check Passed] ID: ${productId} | Secure Amount: ${secureFinalAmount} ${currencyCode}`);

        // 4. GENERATE SECURE RESPONSE PAYLOAD
        return NextResponse.json(
            {
                success: true,
                message: "Market integrity check verified. Session cleared for generation.",
                checkoutSession: {
                    productId: productId,
                    currency: currencyCode,
                    amount: secureFinalAmount
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "Critical Server Handshake Refused." },
            { status: 500 }
        );
    }
}

