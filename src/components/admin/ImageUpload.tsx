'use client'

import { useState } from 'react'
import { uploadProductImage, deleteProductImage } from '@/lib/actions/storage-actions'
import { X, Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface ProductImage {
  id: string
  image_url: string
  display_order: number
}

interface ImageUploadProps {
  productId: string
  existingImages: ProductImage[]
  onImagesChange: (images: ProductImage[]) => void
  maxImages?: number
  disabled?: boolean
}

export default function ImageUpload({
  productId,
  existingImages,
  onImagesChange,
  maxImages = 10,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (existingImages.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    const file = files[0]
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const nextOrder = existingImages.length
      const result = await uploadProductImage(productId, file, nextOrder)

      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        onImagesChange([...existingImages, result.data])
      }
    } catch (err) {
      setError('Failed to upload image')
      console.error(err)
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ''
    }
  }

  async function handleDelete(imageId: string) {
    if (!confirm('Are you sure you want to delete this image?')) return

    setDeletingId(imageId)
    setError('')

    try {
      const result = await deleteProductImage(imageId)

      if (result.error) {
        setError(result.error)
      } else {
        // Remove from list and update display order
        const updatedImages = existingImages
          .filter(img => img.id !== imageId)
          .map((img, index) => ({ ...img, display_order: index }))
        onImagesChange(updatedImages)
      }
    } catch (err) {
      setError('Failed to delete image')
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Image Grid */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {existingImages.map((image, index) => (
            <div key={image.id} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-[var(--color-gray-200)]">
                <Image
                  src={image.image_url}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-[var(--color-wood-yellow)] text-black text-xs px-2 py-1 rounded">
                    Primary
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(image.id)}
                disabled={deletingId === image.id || disabled}
                className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                {deletingId === image.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {existingImages.length < maxImages && (
        <div>
          <input
            type="file"
            id={`image-upload-${productId}`}
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={uploading || disabled}
            className="hidden"
          />
          <label htmlFor={`image-upload-${productId}`}>
            <Button
              type="button"
              variant="outline"
              disabled={uploading || disabled}
              onClick={() => document.getElementById(`image-upload-${productId}`)?.click()}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image ({existingImages.length}/{maxImages})
                </>
              )}
            </Button>
          </label>
          <p className="mt-2 text-xs text-[var(--color-gray-500)]">
            JPEG, PNG, or WebP • Max 5MB • Max {maxImages} images
          </p>
        </div>
      )}
    </div>
  )
}
