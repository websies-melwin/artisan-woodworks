'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  translations: {
    home: string
    catalogue: string
    about: string
  }
}

export default function Header({ translations }: HeaderProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const otherLocale = locale === 'en' ? 'bg' : 'en'
  const currentPath = pathname.replace(`/${locale}`, '')
  const switchLocalePath = `/${otherLocale}${currentPath}`

  const navLinks = [
    { href: `/${locale}`, label: translations.home },
    { href: `/${locale}/catalogue`, label: translations.catalogue },
    { href: `/${locale}/about`, label: translations.about },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white border-b border-[var(--color-gray-100)] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="font-[var(--font-heading)] text-2xl font-bold text-black hover:text-[var(--color-wood-yellow)] transition-colors"
          >
            Artisan Woodworks
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[var(--color-wood-yellow)] font-semibold'
                    : 'text-[var(--color-gray-700)] hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <Link
              href={switchLocalePath}
              className="px-3 py-1.5 text-sm font-medium border border-[var(--color-gray-200)] rounded hover:border-black transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[var(--color-gray-700)] hover:text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-gray-100)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium py-2 transition-colors ${
                    isActive(link.href)
                      ? 'text-[var(--color-wood-yellow)] font-semibold'
                      : 'text-[var(--color-gray-700)]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <Link
                href={switchLocalePath}
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-[var(--color-gray-200)] rounded hover:border-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Switch to {otherLocale.toUpperCase()}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
