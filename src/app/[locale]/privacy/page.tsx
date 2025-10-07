import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'bg' ? 'Политика за поверителност' : 'Privacy Policy',
    description: locale === 'bg'
      ? 'Прочетете нашата политика за поверителност и как защитаваме вашите лични данни.'
      : 'Read our privacy policy and how we protect your personal information.',
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('privacy')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <h1 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-4">
          {t('title')}
        </h1>
        <p className="text-sm text-[var(--color-gray-600)] mb-12">
          {t('lastUpdated')}: October 7, 2025
        </p>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('introduction.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed mb-4">
              {t('introduction.paragraph1')}
            </p>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('introduction.paragraph2')}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('collection.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed mb-4">
              {t('collection.paragraph')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
              <li>{t('collection.item1')}</li>
              <li>{t('collection.item2')}</li>
              <li>{t('collection.item3')}</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('usage.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed mb-4">
              {t('usage.paragraph')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
              <li>{t('usage.item1')}</li>
              <li>{t('usage.item2')}</li>
              <li>{t('usage.item3')}</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('security.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('security.paragraph')}
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('rights.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed mb-4">
              {t('rights.paragraph')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
              <li>{t('rights.item1')}</li>
              <li>{t('rights.item2')}</li>
              <li>{t('rights.item3')}</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('contact.paragraph')}{' '}
              <a href="mailto:info@artisanwoodworks.com" className="text-[var(--color-wood-yellow)] hover:underline">
                info@artisanwoodworks.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
