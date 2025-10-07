'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteProduct, updateProductStatus } from '@/lib/actions/products-mutations'
import type { Database } from '@/lib/types/database'

type Product = Database['public']['Tables']['products']['Row']

export default function ProductRow({ product }: { product: Product }) {
  const [deleting, setDeleting] = useState(false)
  const [changingStatus, setChangingStatus] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    setDeleting(true)
    const result = await deleteProduct(product.id)
    
    if (result.error) {
      alert('Error deleting product: ' + result.error)
      setDeleting(false)
    }
    // On success, deleteProduct redirects to products list
  }

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as 'published' | 'hidden' | 'sold'
    
    setChangingStatus(true)
    const result = await updateProductStatus(product.id, newStatus)
    
    if (result.error) {
      alert('Error updating status: ' + result.error)
    }
    setChangingStatus(false)
  }

  return (
    <tr className="hover:bg-[var(--color-gray-50)]">
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
        <select
          value={product.status}
          onChange={handleStatusChange}
          disabled={changingStatus}
          className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ${
            product.status === 'published' 
              ? 'bg-green-100 text-green-800'
              : product.status === 'hidden'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
          <option value="sold">Sold</option>
        </select>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <Link href={`/admin/products/${product.id}/edit`}>
          <Button variant="outline" size="sm">
            <Pencil className="w-4 h-4" />
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDelete}
          disabled={deleting}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </td>
    </tr>
  )
}
