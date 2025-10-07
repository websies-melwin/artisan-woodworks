import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://artisan-woodworks.vercel.app'
  const supabase = await createClient()

  // Get all published products
  const { data: products } = await supabase
    .from('products')
    .select('id, updated_at')
    .eq('status', 'published')

  // Static pages for both locales
  const locales = ['en', 'bg']
  const staticPages = ['', '/catalogue', '/about', '/privacy', '/terms']

  const staticUrls = locales.flatMap(locale =>
    staticPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )

  // Product detail pages for both locales
  const productUrls = products
    ? locales.flatMap(locale =>
        products.map(product => ({
          url: `${baseUrl}/${locale}/catalogue/${product.id}`,
          lastModified: new Date(product.updated_at),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      )
    : []

  return [...staticUrls, ...productUrls]
}
