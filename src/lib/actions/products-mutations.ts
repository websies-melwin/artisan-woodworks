'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { Database } from '@/lib/types/database'

type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

/**
 * Create new product
 */
export async function createProduct(formData: ProductInsert): Promise<{ data: { id: string } | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase
      .from('products')
      .insert(formData)
      .select('id')
      .single()
    
    if (error) {
      return { data: null, error: error.message }
    }
    
    revalidatePath('/admin/products')
    revalidatePath('/admin/dashboard')
    
    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to create product' }
  }
}

/**
 * Update existing product
 */
export async function updateProduct(id: string, formData: ProductUpdate): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { error } = await supabase
      .from('products')
      .update(formData)
      .eq('id', id)
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/admin/products')
    revalidatePath('/admin/dashboard')
    revalidatePath(`/admin/products/${id}/edit`)
    
    return { error: null }
  } catch (err) {
    return { error: 'Failed to update product' }
  }
}

/**
 * Delete product
 */
export async function deleteProduct(id: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/admin/products')
    revalidatePath('/admin/dashboard')
    redirect('/admin/products')
  } catch (err) {
    return { error: 'Failed to delete product' }
  }
}

/**
 * Update product status only
 */
export async function updateProductStatus(
  id: string, 
  status: 'published' | 'hidden' | 'sold'
): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServer()
    
    const { error } = await supabase
      .from('products')
      .update({ status })
      .eq('id', id)
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/admin/products')
    revalidatePath('/admin/dashboard')
    
    return { error: null }
  } catch (err) {
    return { error: 'Failed to update product status' }
  }
}
