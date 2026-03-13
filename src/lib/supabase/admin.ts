import { createClient } from '@supabase/supabase-js'

/**
 * Server-side client for public data only – no auth, no cookies.
 * Use this for getProducts, getSettings, etc. to avoid Supabase auth rate limits.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
