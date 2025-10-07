import { getAllProducts } from '@/lib/actions/products-queries'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductRow from '@/components/admin/ProductRow'
import { Plus } from 'lucide-react'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-4xl font-bold text-black">
          Products
        </h1>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-gray-100)] p-12 text-center">
          <p className="text-[var(--color-gray-600)] mb-4">No products yet</p>
          <Link href="/admin/products/new">
            <Button variant="primary">Create Your First Product</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-gray-100)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[var(--color-gray-50)] border-b border-[var(--color-gray-100)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-gray-600)] uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-gray-600)] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-gray-600)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-gray-600)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gray-100)]">
              {products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
