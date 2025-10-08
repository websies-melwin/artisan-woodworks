import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Sample product data for featured section
const sampleProducts = [
  {
    id: '1',
    name: 'Oak Dining Table',
    description: 'Handcrafted dining table with natural oak finish',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    category: 'Tables'
  },
  {
    id: '2',
    name: 'Walnut Coffee Table',
    description: 'Modern coffee table featuring rich walnut wood',
    image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&q=80',
    category: 'Tables'
  },
  {
    id: '3',
    name: 'Pine Cabinet',
    description: 'Traditional storage cabinet with pine construction',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    category: 'Cabinets'
  }
];

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO WITH VIDEO SUPPORT
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background container */}
        <div className="absolute inset-0 z-0">
          {/* TODO: Client will replace this Image with video element later */}
          {/* Video structure ready: <video autoPlay muted loop playsInline className="w-full h-full object-cover"><source src="CLIENT_VIDEO_URL" type="video/mp4" /></video> */}
          
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80"
            alt="Luxury handcrafted furniture"
            fill
            className="object-cover"
            priority
          />
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero content - centered */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-white mb-4">
              Artisan Woodworks
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/90 mb-8">
              Handcrafted furniture that combines timeless elegance with exceptional craftsmanship
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/en/catalogue">
                <button className="bg-[var(--color-wood-yellow)] text-black px-8 py-4 rounded hover:bg-[var(--color-wood-brown)] transition-colors">
                  View Catalogue
                </button>
              </Link>
              <Link href="/en/about">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded hover:bg-white hover:text-black transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: BRAND STORY
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
            Craftsmanship Meets Design
          </h2>
          <p className="font-body text-lg text-gray-700 leading-relaxed mb-8">
            Every piece we create is a testament to traditional woodworking techniques combined with modern design sensibilities. Our furniture is built to last generations.
          </p>
          <Link href="/en/about" className="text-[var(--color-wood-brown)] hover:text-[var(--color-wood-yellow)] transition-colors font-medium">
            Learn Our Story →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: FEATURED PRODUCTS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-center mb-12">
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-[var(--color-wood-brown)] font-medium">{product.category}</span>
                  <h3 className="font-heading text-2xl font-semibold mt-2 mb-3">
                    {product.name}
                  </h3>
                  <p className="font-body text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <Link href="/en/catalogue" className="text-[var(--color-wood-brown)] hover:text-[var(--color-wood-yellow)] transition-colors font-medium">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: PROCESS TEASER
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-center mb-12">
            Our Craftsmanship Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80"
                alt="Design consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"
                alt="Material selection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"
                alt="Handcrafting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/en/about" className="text-[var(--color-wood-brown)] hover:text-[var(--color-wood-yellow)] transition-colors font-medium text-lg">
              Learn About Our Process →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: CONTACT CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="font-body text-lg text-gray-700 mb-8">
            Get in touch to discuss your custom furniture needs. We'd love to bring your vision to life.
          </p>
          <a 
            href="mailto:info@artisanwoodworks.com?subject=Inquiry%20from%20Website"
            className="inline-block bg-[var(--color-wood-yellow)] text-black px-8 py-4 rounded hover:bg-[var(--color-wood-brown)] transition-colors font-medium"
          >
            Contact Us via Email
          </a>
        </div>
      </section>
    </main>
  );
}
