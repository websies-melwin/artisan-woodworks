'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Instagram, Facebook, Mail } from 'lucide-react'

interface FooterProps {
  translations: {
    home: string
    catalogue: string
    about: string
    privacy: string
    terms: string
    contactUs: string
    followUs: string
    allRightsReserved: string
  }
}

export default function Footer({ translations }: FooterProps) {
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-gray-900)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Instagram, Facebook, Mail } from 'lucide-react'

interface FooterProps {
  translations: {
    home: string
    catalogue: string
    about: string
    privacy: string
    terms: string
    contactUs: string
    followUs: string
    allRightsReserved: string
  }
}

export default function Footer({ translations }: FooterProps) {
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-gray-900)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold mb-4">
              Artisan Woodworks
            </h3>
            <p className="text-sm text-[var(--color-gray-400)] leading-relaxed">
              Handcrafted furniture made with passion and precision in Sofia, Bulgaria.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}`}
                  className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  {translations.home}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/catalogue`}
                  className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  {translations.catalogue}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/about`}
                  className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  {translations.about}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/privacy`}
                  className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  {translations.privacy}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/terms`}
                  className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors"
                >
                  {translations.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">{translations.contactUs}</h4>
            <a 
              href="mailto:info@artisanwoodworks.com"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-gray-400)] hover:text-white transition-colors mb-6"
            >
              <Mail size={18} />
              info@artisanwoodworks.com
            </a>
            
            <h4 className="font-semibold mb-4 mt-6">{translations.followUs}</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-[var(--color-gray-800)] rounded-full hover:bg-[var(--color-wood-yellow)] hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-[var(--color-gray-800)] rounded-full hover:bg-[var(--color-wood-yellow)] hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[var(--color-gray-800)] text-center">
          <p className="text-sm text-[var(--color-gray-400)]">
            © {currentYear} Artisan Woodworks. {translations.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
