'use client'

import { useState } from 'react'
import { login } from '@/lib/actions/auth'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(email, password)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
      // Success handled by redirect in login action
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-black mb-2">
              Admin Login
            </h1>
            <p className="text-[var(--color-gray-600)] text-sm">
              Artisan Woodworks CMS
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-wood-yellow)] focus:border-transparent"
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-wood-yellow)] focus:border-transparent"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--color-gray-600)]">
          Admin access only
        </p>
      </div>
    </div>
  )
}
