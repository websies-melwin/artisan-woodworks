import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardBadge } from '@/components/ui/Card'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

export default function Home() {
  const t = useTranslations('home')

  return (
    <main className="min-h-screen bg-white">
      {/* Temporary Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center bg-[var(--color-off-white)]">
        <h1 className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-black mb-6">
          {t('hero.title')}
        </h1>
        <p className="font-[var(--font-body)] text-xl text-[var(--color-gray-600)] max-w-2xl mb-8">
          {t('hero.subtitle')}
        </p>
        <div className="flex gap-4">
          <Button variant="primary" size="lg">
            {t('hero.ctaPrimary')}
          </Button>
          <Button variant="outline" size="lg">
            {t('hero.ctaSecondary')}
          </Button>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-[var(--font-heading)] text-4xl font-semibold text-black mb-12 text-center">
          {t('designSystem.title')}
        </h2>

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="font-[var(--font-heading)] text-2xl font-semibold mb-6">{t('designSystem.buttons')}</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">{t('designSystem.primaryButton')}</Button>
            <Button variant="secondary">{t('designSystem.secondaryButton')}</Button>
            <Button variant="outline">{t('designSystem.outlineButton')}</Button>
            <Button variant="primary" size="sm">{t('designSystem.small')}</Button>
            <Button variant="primary" size="lg">{t('designSystem.large')}</Button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="font-[var(--font-heading)] text-2xl font-semibold mb-6">{t('designSystem.cards')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardImage>
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-wood-yellow)] to-[var(--color-wood-brown)] flex items-center justify-center text-white text-sm">
                  Product Image
                </div>
              </CardImage>
              <CardContent>
                <div className="mb-3">
                  <CardBadge>{t('products.oak')}</CardBadge>
                </div>
                <CardTitle>{t('products.diningTable.name')}</CardTitle>
                <CardDescription>
                  {t('products.diningTable.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardImage>
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-wood-brown)] to-[var(--color-wood-dark)] flex items-center justify-center text-white text-sm">
                  Product Image
                </div>
              </CardImage>
              <CardContent>
                <div className="mb-3">
                  <CardBadge>{t('products.walnut')}</CardBadge>
                </div>
                <CardTitle>{t('products.coffeeTable.name')}</CardTitle>
                <CardDescription>
                  {t('products.coffeeTable.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardImage>
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-gray-600)] to-[var(--color-gray-900)] flex items-center justify-center text-white text-sm">
                  Product Image
                </div>
              </CardImage>
              <CardContent>
                <div className="mb-3">
                  <CardBadge>{t('products.pine')}</CardBadge>
                </div>
                <CardTitle>{t('products.cabinet.name')}</CardTitle>
                <CardDescription>
                  {t('products.cabinet.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
