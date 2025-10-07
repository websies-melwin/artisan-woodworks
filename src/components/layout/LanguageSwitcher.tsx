'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = params.locale as string

  const switchLocale = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <div className="flex items-center gap-2 bg-[var(--color-gray-50)] rounded-md p-1">
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded transition-all duration-200',
          currentLocale === 'en'
            ? 'bg-white text-black shadow-sm'
            : 'text-[var(--color-gray-600)] hover:text-black'
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('bg')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded transition-all duration-200',
          currentLocale === 'bg'
            ? 'bg-white text-black shadow-sm'
            : 'text-[var(--color-gray-600)] hover:text-black'
        )}
        aria-label="Switch to Bulgarian"
      >
        BG
      </button>
    </div>
  )
}
