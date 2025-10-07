'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/lib/actions/auth'
import { LogOut, Home, Package, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/products/new', label: 'Add Product', icon: Plus },
  ]

  return (
    <nav className="bg-[var(--color-gray-near-black)] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="font-[var(--font-heading)] text-xl font-bold">
              Artisan Woodworks
            </Link>
            
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[var(--color-wood-yellow)] text-black'
                        : 'text-white hover:bg-[var(--color-gray-700)]'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{userEmail}</span>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-gray-700)] rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
