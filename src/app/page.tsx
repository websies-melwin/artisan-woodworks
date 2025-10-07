import Button from '@/components/ui/Button'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardBadge } from '@/components/ui/Card'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center bg-[var(--color-off-white)]">
        <h1 className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-black mb-6">
          Artisan Woodworks
        </h1>
        <p className="font-[var(--font-body)] text-xl text-[var(--color-gray-600)] max-w-2xl mb-8">
          Handcrafted furniture that combines timeless elegance with exceptional craftsmanship
        </p>
        <div className="flex gap-4">
          <Button variant="primary" size="lg">
            View Catalogue
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-[var(--font-heading)] text-4xl font-semibold text-black mb-12 text-center">
          Design System Preview
        </h2>

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="font-[var(--font-heading)] text-2xl font-semibold mb-6">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="font-[var(--font-heading)] text-2xl font-semibold mb-6">Product Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardImage>
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-wood-yellow)] to-[var(--color-wood-brown)] flex items-center justify-center text-white text-sm">
                  Product Image
                </div>
              </CardImage>
              <CardContent>
                <div className="mb-3">
                  <CardBadge>Oak</CardBadge>
                </div>
                <CardTitle>Handcrafted Dining Table</CardTitle>
                <CardDescription>
                  Elegant oak dining table featuring natural grain patterns and expert joinery
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardImage>
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-wood-brown)] to-[var(--color-wood-dark)] flex items-center justify-center text-white text-sm">
                  Product Image
                </div>
              </CardImage>
              <CardContent>
                <div className="mb-3">
                  <CardBadge>Walnut</CardBadge>
                </div>
                <CardTitle>Modern Coffee Table</CardTitle>
                <CardDescription>
                  Contemporary walnut coffee table with clean lines and rich wood tones
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardImage>
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-gray-600)] to-[var(--color-gray-900)] flex items-center justify-center text-white text-sm">
                  Product Image
                </div>
              </CardImage>
              <CardContent>
                <div className="mb-3">
                  <CardBadge>Pine</CardBadge>
                </div>
                <CardTitle>Rustic Cabinet</CardTitle>
                <CardDescription>
                  Beautiful pine cabinet with traditional craftsmanship and modern functionality
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
