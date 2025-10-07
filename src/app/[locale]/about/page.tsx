import { getTranslations } from 'next-intl/server'
import Button from '@/components/ui/Button'
import { Mail, Instagram, Facebook } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'bg' ? 'За нас и Контакти' : 'About & Contact',
    description: locale === 'bg'
      ? 'Научете повече за Artisan Woodworks и нашия процес на ръчна изработка. Свържете се с нас за вашия проект.'
      : 'Learn about Artisan Woodworks and our handcrafting process. Get in touch for your custom furniture project.',
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('about')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[var(--color-off-white)] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-[var(--font-heading)] text-5xl font-bold text-black mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-[var(--color-gray-700)] max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-6">
              {t('story.title')}
            </h2>
            <p className="text-lg text-[var(--color-gray-700)] mb-4 leading-relaxed">
              {t('story.paragraph1')}
            </p>
            <p className="text-lg text-[var(--color-gray-700)] leading-relaxed">
              {t('story.paragraph2')}
            </p>
          </div>
          <div className="aspect-square bg-[var(--color-gray-200)] rounded-lg flex items-center justify-center">
            <span className="text-[var(--color-gray-500)]">Story Image Placeholder</span>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-[var(--color-off-white)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-4">
              {t('craftsmanship.title')}
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
              {t('craftsmanship.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg border border-[var(--color-gray-100)]">
              <div className="w-12 h-12 bg-[var(--color-wood-yellow)] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-black mb-3">
                {t('craftsmanship.step1.title')}
              </h3>
              <p className="text-[var(--color-gray-700)]">
                {t('craftsmanship.step1.description')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg border border-[var(--color-gray-100)]">
              <div className="w-12 h-12 bg-[var(--color-wood-yellow)] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-black mb-3">
                {t('craftsmanship.step2.title')}
              </h3>
              <p className="text-[var(--color-gray-700)]">
                {t('craftsmanship.step2.description')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg border border-[var(--color-gray-100)]">
              <div className="w-12 h-12 bg-[var(--color-wood-yellow)] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-black mb-3">
                {t('craftsmanship.step3.title')}
              </h3>
              <p className="text-[var(--color-gray-700)]">
                {t('craftsmanship.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto mb-8">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email */}
          <a
            href="mailto:info@artisanwoodworks.com"
            className="flex flex-col items-center p-8 bg-[var(--color-off-white)] rounded-lg hover:shadow-md transition-shadow"
          >
            <Mail className="text-[var(--color-wood-yellow)] mb-4" size={40} />
            <h3 className="font-semibold text-lg text-black mb-2">{t('contact.email')}</h3>
            <p className="text-[var(--color-gray-700)]">info@artisanwoodworks.com</p>
          </a>

          {/* Social Media */}
          <div className="flex flex-col items-center p-8 bg-[var(--color-off-white)] rounded-lg">
            <h3 className="font-semibold text-lg text-black mb-4">{t('contact.social')}</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-white rounded-full hover:bg-[var(--color-wood-yellow)] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="p-3 bg-white rounded-full hover:bg-[var(--color-wood-yellow)] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="mailto:info@artisanwoodworks.com">
            <Button variant="primary" size="lg">
              {t('contact.cta')}
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
