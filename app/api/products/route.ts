import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; // Goes up 3 steps out of app/api/products back to the root folder

export async function GET(request: Request) {
    try {
        // 1. Read incoming URL search parameters from the front-end fetch request
        const { searchParams } = new URL(request.url);
        const categoryFilter = searchParams.get('category');
        const currencyFilter = searchParams.get('currency') || 'NGN'; // Defaults to Naira baseline

        // 2. High-performance relational join: fetch products and their associated multi-local price matrix simultaneously
        let query = supabase
            .from('products')
            .select(`
                id,
                name,
                subtitle,
                img,
                category,
                prices (
                    currency_code,
                    amount
                )
            `);

        // 3. Apply category sorting on the fly if requested by front-end menu structures
        if (categoryFilter) {
            query = query.eq('category', categoryFilter.toLowerCase());
        }

        const { data: dbProducts, error } = await query;

        if (error) throw error;

        // 4. Data Transformation: Filter out all other international currencies
        // and deliver ONLY the precise fixed price required for the active subdirectory
        const localizedProducts = dbProducts.map((product: any) => {
            const targetedPrice = product.prices?.find(
                (p: any) => p.currency_code.toUpperCase() === currencyFilter.toUpperCase()
            );

            // Robust fallback architecture: if a matching price row doesn't exist yet,
            // present the first available regional price rather than crashing the interface
            const finalPrice = targetedPrice || product.prices?.[0] || { currency_code: currencyFilter, amount: 0 };

            return {
                id: product.id,
                name: product.name,
                subtitle: product.subtitle,
                img: product.img,
                category: product.category,
                price: {
                    currency: finalPrice.currency_code,
                    amount: finalPrice.amount,
                },
            };
        });

        // 5. Send back a clean, premium, structured JSON response with a success status code of 200
        return NextResponse.json(
            {
                success: true,
                count: localizedProducts.length,
                data: localizedProducts
            },
            { status: 200 }
        );

    } catch (error: any) {
        // If anything fails in the cloud database handshake, cleanly catch the error with status 500
        return NextResponse.json(
            { success: false, message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
