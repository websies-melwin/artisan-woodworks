import Image from 'next/image';
import Link from 'next/link';
import { createSupabaseServer } from '@/lib/supabase/server';

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params
  
  // Fetch featured products from Supabase
  const supabase = await createSupabaseServer()
  
  const { data: featuredProducts, error } = await supabase
    .from('products')
    .select(`
      id,
      name_en,
      name_bg,
      category,
      wood_type,
      status,
      product_images (
        image_url,
        display_order
      )
    `)
    .eq('featured', true)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching featured products:', error)
  }

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
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80&fit=crop"
            alt="Luxury handcrafted furniture showroom"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          
          {/* Improved overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Hero content - centered */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center px-6 sm:px-8 max-w-5xl">
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Artisan Woodworks
            </h1>
            <p className="font-body text-lg sm:text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Handcrafted furniture that combines timeless elegance with exceptional craftsmanship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/catalogue`}>
                <button className="w-full sm:w-auto bg-[#D4A574] text-black px-10 py-4 rounded-md hover:bg-[#8B6F47] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  View Catalogue
                </button>
              </Link>
              <Link href={`/${locale}/about`}>
                <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-10 py-4 rounded-md hover:bg-white hover:text-black transition-all duration-300 font-medium text-lg">
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
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">
            Craftsmanship Meets Design
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
            Every piece we create is a testament to traditional woodworking techniques combined with modern design sensibilities. Our furniture is built to last generations.
          </p>
          <Link 
            href={`/${locale}/about`}
            className="inline-block text-[#8B6F47] hover:text-[#D4A574] transition-colors duration-300 font-medium text-lg hover:underline"
          >
            Learn Our Story →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: FEATURED PRODUCTS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-center mb-16">
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => {
                const productName = locale === 'en' ? product.name_en : product.name_bg
                const firstImage = product.product_images
                  ?.sort((a, b) => a.display_order - b.display_order)[0]?.image_url
                
                return (
                  <article 
                    key={product.id} 
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={`${productName} - Handcrafted ${product.wood_type} ${product.category}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs uppercase tracking-wider text-[#8B6F47] font-semibold">
                        {product.category}
                      </span>
                      <h3 className="font-heading text-2xl font-semibold mt-3 mb-2 text-gray-900">
                        {productName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 capitalize">
                        {product.wood_type} wood
                      </p>
                      <Link 
                        href={`/${locale}/catalogue`} 
                        className="inline-block text-[#8B6F47] hover:text-[#D4A574] transition-colors duration-300 font-medium text-sm group-hover:underline"
                      >
                        View in Catalogue →
                      </Link>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">No featured products available yet.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for our latest handcrafted pieces.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: PROCESS TEASER
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-center mb-16">
            Our Craftsmanship Process
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
            {/* Process Step 1 */}
            <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80"
                alt="Design consultation - discussing custom furniture requirements"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  Design & Consultation
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We work closely with you to understand your vision and requirements
                </p>
              </div>
            </div>

            {/* Process Step 2 */}
            <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"
                alt="Material selection - premium wood varieties"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  Material Selection
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Premium woods carefully chosen for each unique piece
                </p>
              </div>
            </div>

            {/* Process Step 3 */}
            <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"
                alt="Handcrafting - traditional woodworking techniques"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  Handcrafting
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Traditional techniques meet modern precision tools
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href={`/${locale}/about`}
              className="inline-block text-[#8B6F47] hover:text-[#D4A574] transition-colors duration-300 font-medium text-lg hover:underline"
            >
              Learn About Our Process →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: CONTACT CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">
            Ready to Start Your Project?
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            Get in touch to discuss your custom furniture needs. We'd love to bring your vision to life.
          </p>
          <a 
            href="mailto:petriahlgren@hotmail.com?subject=Custom%20Furniture%20Inquiry%20from%20Website"
            className="inline-block bg-[#D4A574] text-black px-10 py-4 rounded-md hover:bg-[#8B6F47] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Contact Us via Email
          </a>
        </div>
      </section>
    </main>
  )
}
