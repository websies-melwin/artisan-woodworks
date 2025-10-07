import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'bg' 
      ? 'Начало | Ръчно изработени мебели' 
      : 'Home | Handcrafted Furniture',
    description: locale === 'bg'
      ? 'Луксозни ръчно изработени мебели и дървообработка по поръчка в София, България.'
      : 'Luxury handcrafted furniture and custom woodworking in Sofia, Bulgaria.',
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('home')
  const supabase = await createClient()

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select(`
      id,
      name_en,
      name_bg,
      category,
      wood_type,
      product_images (
        image_url,
        display_order
      )
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-[var(--color-gray-900)] to-[var(--color-gray-800)] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/catalogue`}>
              <Button variant="primary" size="lg">
                {t('hero.ctaPrimary')}
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-black">
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-4">
              {t('featured.title')}
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const primaryImage = product.product_images?.find(
                (img: any) => img.display_order === 0
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

          <div className="text-center mt-12">
            <Link href={`/${locale}/catalogue`}>
              <Button variant="outline" size="lg">
                {t('featured.viewAll')}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* About CTA Section */}
      <section className="bg-[var(--color-off-white)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-[var(--color-gray-700)] mb-6 leading-relaxed">
                {t('about.description')}
              </p>
              <Link href={`/${locale}/about`}>
                <Button variant="primary" size="lg">
                  {t('about.cta')}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
            <div className="aspect-square bg-[var(--color-gray-200)] rounded-lg flex items-center justify-center">
              <span className="text-[var(--color-gray-500)]">About Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-6">
          {t('contact.title')}
        </h2>
        <p className="text-lg text-[var(--color-gray-600)] mb-8 max-w-2xl mx-auto">
          {t('contact.description')}
        </p>
        <a href="mailto:info@artisanwoodworks.com">
          <Button variant="primary" size="lg">
            {t('contact.cta')}
          </Button>
        </a>
      </section>
    </>
  )
}
