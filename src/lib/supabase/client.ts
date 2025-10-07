import { createBrowserClient } from '@supabase/ssr'

/**
 * Create Supabase client for browser/client components
 */
export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
