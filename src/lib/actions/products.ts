'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/lib/types/database'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

/**
 * Get all products (admin only)
 * Returns all products regardless of status
 */
export async function getProducts(): Promise<{ data: Product[] | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      return { data: null, error: error.message }
    }
    
    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to fetch products' }
  }
}

/**
 * Get published products only (public)
 */
export async function getPublishedProducts(): Promise<{ data: Product[] | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    
    if (error) {
      return { data: null, error: error.message }
    }
    
    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to fetch published products' }
  }
}

/**
 * Get single product by ID
 */
export async function getProductById(id: string): Promise<{ data: Product | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      return { data: null, error: error.message }
    }
    
    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to fetch product' }
  }
}

/**
 * Get product stats for dashboard
 */
export async function getProductStats(): Promise<{
  total: number
  published: number
  hidden: number
  sold: number
} | null> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase
      .from('products')
      .select('status')
    
    if (error) {
      return null
    }
    
    const stats = {
      total: data.length,
      published: data.filter(p => p.status === 'published').length,
      hidden: data.filter(p => p.status === 'hidden').length,
      sold: data.filter(p => p.status === 'sold').length,
    }
    
    return stats
  } catch (err) {
    return null
  }
}
