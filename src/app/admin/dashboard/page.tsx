import { getUser } from '@/lib/actions/auth'
import { getProductStats } from '@/lib/actions/products'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Package, Plus, Eye } from 'lucide-react'

export default async function DashboardPage() {
  const user = await getUser()
  const stats = await getProductStats()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-heading)] text-4xl font-bold text-black mb-2">
          Welcome back!
        </h1>
        <p className="text-[var(--color-gray-600)]">
          {user?.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-[var(--color-gray-100)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-600)]">Total Products</h3>
            <Package className="w-5 h-5 text-[var(--color-wood-yellow)]" />
          </div>
          <p className="text-3xl font-bold text-black">{stats?.total || 0}</p>
          <p className="text-sm text-[var(--color-gray-600)] mt-2">
            {stats?.total === 0 ? 'No products yet' : 'All products'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--color-gray-100)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-600)]">Published</h3>
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-black">{stats?.published || 0}</p>
          <p className="text-sm text-[var(--color-gray-600)] mt-2">Visible to public</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--color-gray-100)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-600)]">Hidden</h3>
            <Eye className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-black">{stats?.hidden || 0}</p>
          <p className="text-sm text-[var(--color-gray-600)] mt-2">Not visible</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--color-gray-100)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-600)]">Sold</h3>
            <Package className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-black">{stats?.sold || 0}</p>
          <p className="text-sm text-[var(--color-gray-600)] mt-2">Marked as sold</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-lg border border-[var(--color-gray-100)] shadow-sm">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-black mb-6">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/products/new">
            <Button variant="primary" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="outline" size="lg">
              <Package className="w-5 h-5 mr-2" />
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
