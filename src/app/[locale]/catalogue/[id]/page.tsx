import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('name_en, name_bg, description_en, description_bg')
    .eq('id', id)
    .single()

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const name = locale === 'bg' ? product.name_bg : product.name_en
  const description = locale === 'bg' ? product.description_bg : product.description_en
  
  // Strip HTML tags from description for meta description
  const plainDescription = description?.replace(/<[^>]*>/g, '').substring(0, 160) || ''

  return {
    title: name,
    description: plainDescription,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const t = await getTranslations('productDetail')
  const supabase = await createClient()

  // Fetch product with images and video
  const { data: product } = await supabase
    .from('products')
    .select(`
      id,
      name_en,
      name_bg,
      description_en,
      description_bg,
      category,
      wood_type,
      status,
      product_images (
        id,
        image_url,
        display_order
      ),
      product_videos (
        id,
        video_url
      )
    `)
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (!product) {
    notFound()
  }

  const name = locale === 'bg' ? product.name_bg : product.name_en
  const description = locale === 'bg' ? product.description_bg : product.description_en
  
  // Sort images by display_order
  const sortedImages = product.product_images?.sort(
    (a: any, b: any) => a.display_order - b.display_order
  ) || []

  const primaryImage = sortedImages[0]
  const video = product.product_videos?.[0]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link 
          href={`/${locale}/catalogue`}
          className="inline-flex items-center gap-2 text-[var(--color-gray-700)] hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          {t('backToCatalogue')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Primary Image */}
            <div className="aspect-square bg-[var(--color-gray-50)] rounded-lg overflow-hidden">
              {primaryImage ? (
                <Image
                  src={primaryImage.image_url}
                  alt={name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-gray-400)]">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {sortedImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {sortedImages.map((image: any) => (
                  <div 
                    key={image.id}
                    className="aspect-square bg-[var(--color-gray-50)] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={image.image_url}
                      alt={`${name} - Image ${image.display_order + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Video */}
            {video && (
              <div className="aspect-video bg-[var(--color-gray-900)] rounded-lg overflow-hidden">
                <video
                  src={video.video_url}
                  controls
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-4">
              {name}
            </h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--color-gray-100)]">
              <span className="px-3 py-1 bg-[var(--color-off-white)] text-sm font-medium text-[var(--color-gray-700)] rounded capitalize">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-[var(--color-off-white)] text-sm font-medium text-[var(--color-gray-700)] rounded capitalize">
                {product.wood_type}
              </span>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <div 
                className="text-[var(--color-gray-700)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            {/* Contact CTA */}
            <div className="bg-[var(--color-off-white)] p-6 rounded-lg">
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-black mb-3">
                {t('interested')}
              </h3>
              <p className="text-[var(--color-gray-700)] mb-4">
                {t('contactDescription')}
              </p>
              <a href="mailto:info@artisanwoodworks.com">
                <Button variant="primary" size="lg">
                  {t('contactUs')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
