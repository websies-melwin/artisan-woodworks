'use client'

import { useState } from 'react'
import { createProduct } from '@/lib/actions/products-mutations'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    const productData = {
      name_en: formData.get('name_en') as string,
      name_bg: formData.get('name_bg') as string,
      description_en: formData.get('description_en') as string,
      description_bg: formData.get('description_bg') as string,
      category: formData.get('category') as string,
      wood_type: formData.get('wood_type') as string,
      status: formData.get('status') as 'published' | 'hidden' | 'sold',
      featured: formData.get('featured') === 'on',
    }

    const result = await createProduct(productData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/admin/products')
    }
  }

  return (
    <div>
      <h1 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-8">
        Add New Product
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
              className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
              disabled={loading}
            />
          </div>

          {/* English Description */}
          <div>
            <label htmlFor="description_en" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Description (English) *
            </label>
            <textarea
              id="description_en"
              name="description_en"
              rows={4}
              required
              className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
              disabled={loading}
            />
          </div>

          {/* Bulgarian Description */}
          <div>
            <label htmlFor="description_bg" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Description (Bulgarian) *
            </label>
            <textarea
              id="description_bg"
              name="description_bg"
              rows={4}
              required
              className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md"
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
              className="w-4 h-4 text-[var(--color-wood-yellow)] border-[var(--color-gray-200)] rounded"
              disabled={loading}
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-[var(--color-gray-700)]">
              Feature on homepage
            </label>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
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
