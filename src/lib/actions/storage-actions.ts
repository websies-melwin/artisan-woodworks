'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

/**
 * Upload image to Supabase Storage
 */
export async function uploadProductImage(
  productId: string,
  file: File,
  displayOrder: number
): Promise<{ data: { id: string; url: string } | null; error: string | null }> {
  try {
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { data: null, error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' }
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      return { data: null, error: 'File size exceeds 5MB limit.' }
    }

    const supabase = await createSupabaseServer()

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop()
    const fileName = `${productId}/${timestamp}-${randomStr}.${extension}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '31536000', // 1 year
        upsert: false
      })

    if (uploadError) {
      return { data: null, error: uploadError.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    // Insert record into product_images table
    const { data, error: dbError } = await supabase
      .from('product_images')
      .insert({
        product_id: productId,
        storage_path: fileName,
        url: publicUrl,
        display_order: displayOrder
      })
      .select('id, url')
      .single()

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('product-images').remove([fileName])
      return { data: null, error: dbError.message }
    }

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${productId}/edit`)

    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to upload image' }
  }
}

/**
 * Delete image from Supabase Storage and database
 */
export async function deleteProductImage(imageId: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServer()

    // Get image record to find storage path
    const { data: image, error: fetchError } = await supabase
      .from('product_images')
      .select('storage_path, product_id')
      .eq('id', imageId)
      .single()

    if (fetchError || !image) {
      return { error: 'Image not found' }
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('product-images')
      .remove([image.storage_path])

    if (storageError) {
      return { error: storageError.message }
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('product_images')
      .delete()
      .eq('id', imageId)

    if (dbError) {
      return { error: dbError.message }
    }

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${image.product_id}/edit`)

    return { error: null }
  } catch (err) {
    return { error: 'Failed to delete image' }
  }
}

/**
 * Update image display order
 */
export async function updateImageOrder(
  imageId: string,
  newOrder: number
): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServer()

    const { error } = await supabase
      .from('product_images')
      .update({ display_order: newOrder })
      .eq('id', imageId)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (err) {
    return { error: 'Failed to update image order' }
  }
}

/**
 * Upload video to Supabase Storage
 */
export async function uploadProductVideo(
  productId: string,
  file: File
): Promise<{ data: { id: string; url: string } | null; error: string | null }> {
  try {
    // Validate file type
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      return { data: null, error: 'Invalid file type. Only MP4, WebM, and MOV videos are allowed.' }
    }

    // Validate file size
    if (file.size > MAX_VIDEO_SIZE) {
      return { data: null, error: 'File size exceeds 50MB limit.' }
    }

    const supabase = await createSupabaseServer()

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop()
    const fileName = `${productId}/${timestamp}-${randomStr}.${extension}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('product-videos')
      .upload(fileName, file, {
        cacheControl: '31536000', // 1 year
        upsert: false
      })

    if (uploadError) {
      return { data: null, error: uploadError.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-videos')
      .getPublicUrl(fileName)

    // Insert record into product_videos table
    const { data, error: dbError } = await supabase
      .from('product_videos')
      .insert({
        product_id: productId,
        storage_path: fileName,
        url: publicUrl
      })
      .select('id, url')
      .single()

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('product-videos').remove([fileName])
      return { data: null, error: dbError.message }
    }

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${productId}/edit`)

    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Failed to upload video' }
  }
}

/**
 * Delete video from Supabase Storage and database
 */
export async function deleteProductVideo(videoId: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServer()

    // Get video record to find storage path
    const { data: video, error: fetchError } = await supabase
      .from('product_videos')
      .select('storage_path, product_id')
      .eq('id', videoId)
      .single()

    if (fetchError || !video) {
      return { error: 'Video not found' }
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('product-videos')
      .remove([video.storage_path])

    if (storageError) {
      return { error: storageError.message }
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('product_videos')
      .delete()
      .eq('id', videoId)

    if (dbError) {
      return { error: dbError.message }
    }

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${video.product_id}/edit`)

    return { error: null }
  } catch (err) {
    return { error: 'Failed to delete video' }
  }
}
