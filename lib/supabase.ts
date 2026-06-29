import { createClient } from '@supabase/supabase-js';

// 1. Pull your secret cloud keys from the root .env vault file safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Structural Safety Check: Prevent the site from running if credentials are blank
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Fizac Engine Error: Missing Supabase Environment Variables inside your root .env file.'
    );
}

// 3. Export the initialized client gateway to power our backend API routes
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false, // Disables local storage tracking for maximum server-side rendering performance
    },
});
