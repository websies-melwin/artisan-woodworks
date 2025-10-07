import { getProducts } from '@/lib/actions/products'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function ProductsPage() {
  const { data: products, error } = await getProducts()

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading products: {error}</p>
      </div>
    )
  }

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

      {!products || products.length === 0 ? (
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
                <tr key={product.id} className="hover:bg-[var(--color-gray-50)]">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-black">{product.name_en}</div>
                      <div className="text-sm text-[var(--color-gray-600)]">{product.name_bg}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-gray-600)]">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'published' 
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'hidden'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
