# Artisan Woodworks

A luxury, bilingual (English/Bulgarian) website for a handcrafted furniture business in Sofia, Bulgaria.

## 🚀 Features

### Public Site
- **Bilingual Support**: Full English and Bulgarian translations
- **Homepage**: Hero section, featured products, CTAs
- **Catalogue**: Filterable product grid (category, wood type)
- **Product Details**: Individual product pages with image galleries and videos
- **About & Contact**: Company story and contact information
- **Legal Pages**: Privacy Policy and Terms & Conditions

### Admin Panel
- **Authentication**: Secure login for admin users
- **Product Management**: Full CRUD operations
- **Rich Text Editor**: Tiptap for product descriptions
- **Media Upload**: Images (up to 10) and videos (1 per product)
- **Image Ordering**: Manage display order of product images
- **Product Status**: Published, Hidden, Sold
- **Featured Products**: Mark products for homepage display

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Internationalization**: next-intl
- **Rich Text**: Tiptap
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artisan-woodworks
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Tables
- `profiles`: Admin user profiles
- `products`: Product catalog
- `product_images`: Multiple images per product
- `product_videos`: Optional video per product

## 🔐 Admin Access

Default test credentials:
- Email: test@artisanwoodworks.com
- Password: TestPass123!

Access the admin panel at: `/admin/login`

## 🌍 Internationalization

The site supports two languages:
- English (en)
- Bulgarian (bg)

Translation files located in `/messages/`

## 📝 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Localized public pages
│   ├── admin/              # Admin panel
│   └── api/                # API routes
├── components/
│   ├── admin/              # Admin components
│   ├── layout/             # Header, Footer
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── actions/            # Server actions
│   └── supabase/           # Supabase clients
└── i18n/                   # i18n configuration
```

## 🚢 Deployment

This project is configured for deployment on Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📄 License

Private project for Artisan Woodworks

## 👥 Contact

For questions or support, contact: ahlgrenmelwin8@gmail.com
