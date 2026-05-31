import { NextResponse } from 'next/server';

// Using an open-access, reliable exchange rate API for currency conversion
const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest";

export async function GET(request: Request) {
    try {
        // 1. Parse incoming parameters (e.g., ?from=USD&to=CAD)
        const { searchParams } = new URL(request.url);
        const from = searchParams.get('from')?.toUpperCase() || 'USD';
        const to = searchParams.get('to')?.toUpperCase();

        // 2. Validate that a target currency was requested
        if (!to) {
            return NextResponse.json(
                { success: false, message: "Missing target currency code parameter '?to='." },
                { status: 400 }
            );
        }

        // 3. Fetch live global financial exchange sheets
        const response = await fetch(`${EXCHANGE_API_URL}/${from}`, {
            next: { revalidate: 3600 } // Cache results for 1 hour to keep your site extremely fast
        });

        if (!response.ok) {
            throw new Error("Failed to communicate with external financial rates provider.");
        }

        const exchangeData = await response.json();
        const targetRate = exchangeData.rates[to];

        // 4. Handle cases where an invalid or completely obscure currency code is requested
        if (!targetRate) {
            return NextResponse.json(
                { success: false, message: `Unsupported or invalid target currency code: ${to}` },
                { status: 422 }
            );
        }

        // 5. Return clean, formatted mathematical modifier data
        return NextResponse.json(
            {
                success: true,
                baseCurrency: from,
                targetCurrency: to,
                rate: targetRate,
                timestamp: exchangeData.time_last_update_utc
            },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Internal Exchange Engine Failure." },
            { status: 500 }
        );
    }
}

