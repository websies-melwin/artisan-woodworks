import { getUser } from '@/lib/actions/auth'
import AdminNav from '@/components/admin/AdminNav'
import { redirect } from 'next/navigation'

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <AdminNav userEmail={user.email || ''} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
