import { createClient } from '@supabase/supabase-js';

// Initialize your existing Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StoreRegion {
    id: string;
    country_name: string;   
    country_code: string; // e.g., 'CH', 'CA', 'UY', 'CI', 'MA', 'AU'
    locale_prefix: string; // e.g., 'ch', 'ca', 'uy', 'ci', 'ma', 'au'
    currency_code: string; // e.g., 'CHF', 'CAD', 'UYU', 'XOF', 'MAD', 'AUD'
    currency_symbol: string; // e.g., 'CHF', '$', '$U', 'CFA', 'DH', '$'
}

/**
* Fetches all 70+ active luxury global market subdirectories
* configured within your Supabase database instance.
*/
export async function getStoreRegions(): Promise<StoreRegion[]> {
    const { data, error } = await supabase
        .from('store_regions')
        .select('id, name, code, currency')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching global regions from Supabase:', error);
        // Secure fallback array for seamless local rendering if connection drops
        return [
            { id: '1', country_name: 'Nigeria', country_code: 'NG', locale_prefix: 'en-ng', currency_code: 'NGN', currency_symbol: '₦' },
            { id: '2', country_name: 'Switzerland', country_code: 'CH', locale_prefix: 'ch', currency_code: 'CHF', currency_symbol: 'CHf' },
            { id: '3', country_name: 'Australia', country_code: 'AU', locale_prefix: 'au', currency_code: 'AUD', currency_symbol: '$' }
        ];
    }

    // This maps your clean DB columns to match the exact frontend keys and types!
    return (data || []).map((region) => ({
        id: region.id,
        country_name: region.name,
        country_code: region.code ? region.code.toUpperCase() : '',
        currency_code: region.currency || '',
        locale_prefix: region.code ? region.code.toLowerCase() : '',
        currency_symbol: region.currency === 'NGN' ? '₦' : '$'
    }));
}


