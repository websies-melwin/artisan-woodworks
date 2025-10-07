import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'bg' ? 'Общи условия' : 'Terms & Conditions',
    description: locale === 'bg'
      ? 'Прочетете нашите общи условия за използване на уебсайта и услугите.'
      : 'Read our terms and conditions for using our website and services.',
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('terms')

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
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('introduction.paragraph')}
            </p>
          </section>

          {/* Services */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('services.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('services.paragraph')}
            </p>
          </section>

          {/* Orders and Pricing */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('orders.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('orders.paragraph')}
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('intellectual.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('intellectual.paragraph')}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('liability.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('liability.paragraph')}
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-10">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-4">
              {t('changes.title')}
            </h2>
            <p className="text-[var(--color-gray-700)] leading-relaxed">
              {t('changes.paragraph')}
            </p>
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
