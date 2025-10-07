'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type Product = Database['public']['Tables']['products']['Row']

/**
 * Get all products (admin view - includes all statuses)
 */
export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServer()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data || []
}

/**
 * Get single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createSupabaseServer()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  
  return data
}
