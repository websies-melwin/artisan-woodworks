import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import CatalogueClient from './CatalogueClient'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'bg' ? 'Каталог' : 'Catalogue',
    description: locale === 'bg'
      ? 'Разгледайте нашата колекция от ръчно изработени мебели - маси, столове, шкафове и по поръчка.'
      : 'Browse our collection of handcrafted furniture - tables, chairs, cabinets, and custom pieces.',
  }
}

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('catalogue')
  const supabase = await createClient()

  // Fetch all published products with their images
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name_en,
      name_bg,
      category,
      wood_type,
      status,
      product_images (
        image_url,
        display_order
      )
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-[var(--font-heading)] text-5xl font-bold text-black mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Client-side filtering and product display */}
        <CatalogueClient
          products={products || []}
          locale={locale}
          translations={{
            filterByCategory: t('filterByCategory'),
            filterByWood: t('filterByWood'),
            all: t('all'),
            table: t('categories.table'),
            chair: t('categories.chair'),
            cabinet: t('categories.cabinet'),
            custom: t('categories.custom'),
            oak: t('wood.oak'),
            walnut: t('wood.walnut'),
            pine: t('wood.pine'),
            mixed: t('wood.mixed'),
            noProducts: t('noProducts'),
          }}
        />
      </div>
    </div>
  )
}
