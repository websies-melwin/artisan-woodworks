'use client'

import { useState, useEffect } from 'react'
import { updateProduct } from '@/lib/actions/products-mutations'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import VideoUpload from '@/components/admin/VideoUpload'
import type { Database } from '@/lib/types/database'

type Product = Database['public']['Tables']['products']['Row']

interface ProductImage {
  id: string
  image_url: string
  display_order: number
}

interface ProductVideo {
  id: string
  video_url: string
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const [product, setProduct] = useState<Product | null>(null)
  const [productId, setProductId] = useState<string>('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [descriptionBg, setDescriptionBg] = useState('')
  const [images, setImages] = useState<ProductImage[]>([])
  const [video, setVideo] = useState<ProductVideo | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const resolvedParams = await params
        const id = resolvedParams.id
        setProductId(id)
        
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Failed to load product')
        }
        const data = await response.json()
        setProduct(data)
        setDescriptionEn(data.description_en || '')
        setDescriptionBg(data.description_bg || '')
        
        // Fetch product images
        const imagesResponse = await fetch(`/api/products/${id}/images`)
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json()
          setImages(imagesData)
        }

        // Fetch product video
        const videoResponse = await fetch(`/api/products/${id}/video`)
        if (videoResponse.ok) {
          const videoData = await videoResponse.json()
          setVideo(videoData)
        }
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setFetchLoading(false)
      }
    }
    fetchProduct()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    const productData = {
      name_en: formData.get('name_en') as string,
      name_bg: formData.get('name_bg') as string,
      description_en: descriptionEn,
      description_bg: descriptionBg,
      category: formData.get('category') as string,
      wood_type: formData.get('wood_type') as string,
      status: formData.get('status') as 'published' | 'hidden' | 'sold',
      featured: formData.get('featured') === 'on',
    }

    const result = await updateProduct(productId, productData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/admin/products')
    }
  }

  if (fetchLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-gray-600)]">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Product not found'}</p>
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/products')}
          className="mt-4"
        >
          Back to Products
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-8">
        Edit Product
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-[var(--color-gray-100)] p-8">
        <div className="space-y-6">
          {/* English Name */}
          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Product Name (English) *
            </label>
            <input
              id="name_en"
              name="name_en"
              type="text"
              required
              defaultValue={product.name_en}
              className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
              disabled={loading}
            />
          </div>

          {/* Bulgarian Name */}
          <div>
            <label htmlFor="name_bg" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Product Name (Bulgarian) *
            </label>
            <input
              id="name_bg"
              name="name_bg"
              type="text"
              required
              defaultValue={product.name_bg}
              className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
              disabled={loading}
            />
          </div>

          {/* English Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Description (English) *
            </label>
            <RichTextEditor
              content={descriptionEn}
              onChange={setDescriptionEn}
              placeholder="Write product description in English..."
              disabled={loading}
            />
          </div>

          {/* Bulgarian Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Description (Bulgarian) *
            </label>
            <RichTextEditor
              content={descriptionBg}
              onChange={setDescriptionBg}
              placeholder="Write product description in Bulgarian..."
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={product.category}
                className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
                disabled={loading}
              >
                <option value="table">Table</option>
                <option value="chair">Chair</option>
                <option value="cabinet">Cabinet</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Wood Type */}
            <div>
              <label htmlFor="wood_type" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Wood Type *
              </label>
              <select
                id="wood_type"
                name="wood_type"
                required
                defaultValue={product.wood_type}
                className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
                disabled={loading}
              >
                <option value="oak">Oak</option>
                <option value="walnut">Walnut</option>
                <option value="pine">Pine</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue={product.status}
              className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
              disabled={loading}
            >
              <option value="published">Published (visible to public)</option>
              <option value="hidden">Hidden (not visible)</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={product.featured}
              className="w-4 h-4 text-[var(--color-wood-yellow)] border-[var(--color-gray-200)] rounded"
              disabled={loading}
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-[var(--color-gray-700)]">
              Feature on homepage
            </label>
          </div>

          {/* Product Images */}
          <div className="pt-6 border-t border-[var(--color-gray-200)]">
            <h3 className="text-lg font-semibold text-black mb-4">Product Images</h3>
            <ImageUpload
              productId={productId}
              existingImages={images}
              onImagesChange={setImages}
              maxImages={10}
              disabled={loading}
            />
          </div>

          {/* Product Video */}
          <div className="pt-6 border-t border-[var(--color-gray-200)]">
            <h3 className="text-lg font-semibold text-black mb-4">Product Video (Optional)</h3>
            <VideoUpload
              productId={productId}
              existingVideo={video}
              onVideoChange={setVideo}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
