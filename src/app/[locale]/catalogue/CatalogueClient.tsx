'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ProductImage {
  image_url: string
  display_order: number
}

interface Product {
  id: string
  name_en: string
  name_bg: string
  category: string
  wood_type: string
  product_images: ProductImage[]
}

interface CatalogueClientProps {
  products: Product[]
  locale: string
  translations: {
    filterByCategory: string
    filterByWood: string
    all: string
    table: string
    chair: string
    cabinet: string
    custom: string
    oak: string
    walnut: string
    pine: string
    mixed: string
    noProducts: string
  }
}

export default function CatalogueClient({
  products,
  locale,
  translations,
}: CatalogueClientProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [woodFilter, setWoodFilter] = useState<string>('all')

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
      const matchesWood = woodFilter === 'all' || product.wood_type === woodFilter
      return matchesCategory && matchesWood
    })
  }, [products, categoryFilter, woodFilter])

  const categories = [
    { value: 'all', label: translations.all },
    { value: 'table', label: translations.table },
    { value: 'chair', label: translations.chair },
    { value: 'cabinet', label: translations.cabinet },
    { value: 'custom', label: translations.custom },
  ]

  const woodTypes = [
    { value: 'all', label: translations.all },
    { value: 'oak', label: translations.oak },
    { value: 'walnut', label: translations.walnut },
    { value: 'pine', label: translations.pine },
    { value: 'mixed', label: translations.mixed },
  ]

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            {translations.filterByCategory}
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-wood-yellow)]"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Wood Type Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            {translations.filterByWood}
          </label>
          <select
            value={woodFilter}
            onChange={(e) => setWoodFilter(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-wood-yellow)]"
          >
            {woodTypes.map((wood) => (
              <option key={wood.value} value={wood.value}>
                {wood.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const primaryImage = product.product_images?.find(
              (img) => img.display_order === 0
            )
            const name = locale === 'bg' ? product.name_bg : product.name_en

            return (
              <Link
                key={product.id}
                href={`/${locale}/catalogue/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-[var(--color-gray-100)] hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative bg-[var(--color-gray-50)]">
                    {primaryImage ? (
                      <Image
                        src={primaryImage.image_url}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-gray-400)]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-black mb-2">
                      {name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-gray-600)]">
                      <span className="capitalize">{product.wood_type}</span>
                      <span>•</span>
                      <span className="capitalize">{product.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-[var(--color-gray-600)]">
            {translations.noProducts}
          </p>
        </div>
      )}
    </>
  )
}
