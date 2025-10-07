import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  const t = await getTranslations()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header
        translations={{
          home: t('nav.home'),
          catalogue: t('nav.catalogue'),
          about: t('nav.about'),
        }}
      />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer
        translations={{
          home: t('nav.home'),
          catalogue: t('nav.catalogue'),
          about: t('nav.about'),
          privacy: t('footer.privacy'),
          terms: t('footer.terms'),
          contactUs: t('footer.contactUs'),
          followUs: t('footer.followUs'),
          allRightsReserved: t('footer.allRightsReserved'),
        }}
      />
    </NextIntlClientProvider>
  )
}
