## Features Explicitly NOT Included

### Out of Scope for Initial Launch
These features are NOT part of the initial website build:

1. **Public User Accounts** - No login/registration for customers ❌
2. **E-commerce/Shopping Cart** - No online purchasing functionality ❌
3. **Payment Processing** - No payment gateway integration ❌
4. **Booking System** - No appointment scheduling ❌
5. **Blog/CMS for Public Content** - Only product CMS for admin ❌
6. **Customer Reviews/Testimonials** - Not included initially ❌
7. **Live Chat** - No real-time chat widget ❌
8. **Newsletter Signup** - No email marketing integration ❌
9. **Public Search Functionality** - Filtering only, no site-wide search ❌
10. **Product Detail Pages** - Products shown in catalogue grid/modal only ❌
11. **Wishlist/Favorites** - No saving functionality for users ❌
12. **Size/Color Configurators** - No interactive product customization ❌
13. **Price Display** - No pricing shown (inquiry-based) ❌
14. **Inventory Management** - No stock tracking ❌
15. **Multi-currency** - Single currency (BGN) if any prices shown ❌
16. **Social Media Feeds** - Only icon links, no embedded content ❌
17. **Email Marketing Integration** - No MailChimp, SendGrid, etc. ❌
18. **CRM Integration** - No Salesforce, HubSpot, etc. ❌
19. **Public Contact Forms** - Email links only (no web forms) ❌
20. **Analytics Dashboard for Admin** - Only Google Analytics for traffic ❌

**Note:** Admin panel CMS IS included for product management.

---

## Environment Variables

### Required Environment Variables

Create `.env.local` file in project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wwgdshwtkmgmrlzagdxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Z2RzaHd0a21nbXJsemFnZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MDM5NjAsImV4cCI6MjA3NTI3OTk2MH0.SYzKOFDrLtDxrSAuwSnQECaxB5NtyjaZTe7PRu_jbZo

# Supabase Service Role (Server-side only, NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Z2RzaHd0a21nbXJsemFnZHh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTcwMzk2MCwiZXhwIjoyMDc1Mjc5OTYwfQ.UTgkKdTexQET-5h3m9GAjEFl2RUuy8vZQUDVw6KG0VA

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://artisan-woodworks.vercel.app
```

### Vercel Environment Variables

When deploying to Vercel, add these environment variables in project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

**CRITICAL:** Never commit `.env.local` to Git. It's already in `.gitignore`.

---

## API Routes & Server Actions

### Server Actions (Recommended Approach)

Server Actions are used for all database operations. They run on the server and are called from client components.

#### Product Server Actions

**File:** `lib/actions/products.ts`

```typescript
'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Create new product
export async function createProduct(formData: ProductFormData) {
  // Insert into products table
  // Upload images to Storage
  // Insert image URLs into product_images table
  // Upload video if present
  // Revalidate catalogue page
}

// Update existing product
export async function updateProduct(id: string, formData: ProductFormData) {
  // Update products table
  // Handle image additions/deletions
  // Handle video update
  // Revalidate catalogue page
}

// Delete product
export async function deleteProduct(id: string) {
  // Delete from products table (CASCADE deletes images/videos)
  // Delete files from Storage buckets
  // Revalidate catalogue page
}

// Change product status
export async function updateProductStatus(id: string, status: 'published' | 'hidden' | 'sold') {
  // Update status field
  // Revalidate catalogue page
}

// Get all products (admin)
export async function getProducts() {
  // Fetch all products with images and video
  // Order by created_at DESC
}

// Get published products (public)
export async function getPublishedProducts() {
  // Fetch only published products
  // Include images and video
}

// Get product by ID
export async function getProductById(id: string) {
  // Fetch product with all relations
}
```

#### Image Upload Server Action

**File:** `lib/actions/upload.ts`

```typescript
'use server'

import { createServerClient } from '@/lib/supabase/server'

export async function uploadImage(file: File, productId: string) {
  // Validate file type and size
  // Generate unique filename
  // Upload to product-images bucket
  // Return public URL
}

export async function deleteImage(imageUrl: string) {
  // Extract file path from URL
  // Delete from Storage
}

export async function uploadVideo(file: File, productId: string) {
  // Validate file type and size
  // Generate unique filename
  // Upload to product-videos bucket
  // Return public URL
}

export async function deleteVideo(videoUrl: string) {
  // Extract file path from URL
  // Delete from Storage
}
```

### Supabase Client Setup

#### Client-Side Supabase Client

**File:** `lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server-Side Supabase Client

**File:** `lib/supabase/server.ts`

```typescript
import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerClient() {
  const cookieStore = await cookies()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', options)
        },
      },
    }
  )
}
```

---

## Middleware for Auth Protection

**File:** `middleware.ts`

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const response = NextResponse.next()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set(name, value, options)
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set(name, '', options)
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // No session? Redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
```

---

## Testing Requirements

### Functional Testing

**Public Site:**
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Language switcher functions
- [ ] Product filtering works
- [ ] Only published products visible
- [ ] Email links open correctly
- [ ] Images load from Supabase Storage
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No console errors or warnings

**Admin Panel:**
- [ ] Login works with valid credentials
- [ ] Invalid login shows error
- [ ] Dashboard displays correct stats
- [ ] Product list shows all products
- [ ] Add product form works
  - [ ] All fields save correctly
  - [ ] Images upload successfully
  - [ ] Video uploads successfully
  - [ ] Rich text editor saves HTML
  - [ ] Validation shows errors
- [ ] Edit product form works
  - [ ] Existing data loads
  - [ ] Changes save correctly
  - [ ] Can add/remove images
  - [ ] Can replace video
- [ ] Delete product works with confirmation
- [ ] Quick status change updates immediately
- [ ] Logout works
- [ ] Protected routes redirect when not authenticated

---

### Database Testing

- [ ] Products insert correctly
- [ ] Products update correctly
- [ ] Products delete correctly (CASCADE)
- [ ] Product images insert with correct display_order
- [ ] Product videos insert correctly
- [ ] RLS policies enforce public/admin access
- [ ] Status changes work (published/hidden/sold)
- [ ] Featured flag works
- [ ] Foreign key constraints work

---

### Storage Testing

- [ ] Images upload to product-images bucket
- [ ] Videos upload to product-videos bucket
- [ ] Public URLs generate correctly
- [ ] Files accessible via public URL
- [ ] File deletion works
- [ ] File size validation works
- [ ] File type validation works

---

### Authentication Testing

- [ ] Admin login works
- [ ] Session persists across refreshes
- [ ] Logout clears session
- [ ] Middleware protects admin routes
- [ ] Non-admin users cannot access admin panel
- [ ] Session expires after 7 days

---

## Performance Requirements

### Loading Performance
- **First Contentful Paint (FCP):** < 1.5 seconds
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Time to Interactive (TTI):** < 3.5 seconds
- **Total Page Size:** < 3MB per page (increased due to admin panel)
- **JavaScript Bundle:** < 300KB (minified, gzipped) - increased for admin features

### Database Performance
- **Product list query:** < 500ms
- **Single product query:** < 200ms
- **Image upload:** < 3 seconds per image
- **Video upload:** < 30 seconds (depends on file size)

### Lighthouse Scores (Target)
**Public Site:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

**Admin Panel:**
- Performance: > 80 (acceptable for admin tools)
- Accessibility: > 90
- Best Practices: > 90
- SEO: Not applicable (robots.txt blocks /admin)

---

## Security Considerations

### Database Security
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] Admin-only policies for insert/update/delete
- [ ] Public read-only for published products
- [ ] Service role key never exposed to client
- [ ] SQL injection prevented (Supabase handles this)

### Authentication Security
- [ ] Passwords hashed by Supabase Auth
- [ ] Session tokens httpOnly and secure
- [ ] CSRF protection via Supabase
- [ ] Session expiry after 7 days
- [ ] Logout clears all session data

### File Upload Security
- [ ] File type validation (whitelist only)
- [ ] File size limits enforced
- [ ] Malicious file detection (basic)
- [ ] Unique filenames prevent overwriting
- [ ] Public buckets for images/videos (safe for this use case)

### API Security
- [ ] All admin actions require authentication
- [ ] Server Actions validate user permissions
- [ ] Rate limiting via Vercel (automatic)
- [ ] No sensitive data in error messages

### General Security
- [ ] HTTPS enforced (SSL via Vercel)
- [ ] Environment variables secured
- [ ] No secrets in client-side code
- [ ] Content Security Policy headers
- [ ] XSS protection via React (automatic)

---

## Deployment Configuration

### Vercel Deployment Settings

**Build Command:**
```bash
next build
```

**Output Directory:**
```
.next
```

**Install Command:**
```bash
npm install
```

**Environment Variables:**
- Add all variables from `.env.local`
- Mark `SUPABASE_SERVICE_ROLE_KEY` as sensitive

**Domain Configuration:**
- Custom domain (when provided by client)
- Automatic SSL certificate
- Redirect www to non-www (or vice versa)

### Git Integration

- **Repository:** GitHub (created via Git MCP)
- **Branch:** `main` for production
- **Auto-deploy:** Every push to main triggers deployment
- **Preview deployments:** Available for other branches

### Post-Deployment

- [ ] Verify all environment variables set
- [ ] Test admin login on live site
- [ ] Test product creation on live site
- [ ] Test image uploads on live site
- [ ] Verify public site shows products
- [ ] Check Supabase dashboard for activity
- [ ] Monitor Vercel deployment logs
- [ ] Set up Google Analytics

---

## Summary

The Artisan Woodworks website is a **full-stack web application** built with Next.js 14+, TypeScript, Tailwind CSS, and Supabase. It features:

- **Public Site:** Bilingual catalogue of handcrafted furniture with filtering
- **Admin Panel:** Complete CMS for product management with authentication
- **Database:** Supabase PostgreSQL with RLS policies
- **Storage:** Supabase Storage for images and videos
- **Authentication:** Supabase Auth for admin access
- **Deployment:** Vercel with automatic deployments via Git

The application prioritizes **performance, security, accessibility, and user experience** while maintaining the luxury aesthetic of the brand. The admin panel is designed to be **simple, functional, and easy to use** for non-technical users (the client) to manage products independently.# Functionalities Description - Artisan Woodworks

## Technical Stack

### Core Technology
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl
- **Icons:** lucide-react
- **Backend:** Supabase (Database + Auth + Storage)
- **Rich Text Editor:** Tiptap
- **Form Handling:** React Hook Form
- **Deployment:** Vercel (with Git integration via MCP)

### Supabase Configuration
- **Project URL:** `https://wwgdshwtkmgmrlzagdxz.supabase.co`
- **Project Name:** artisan-woodworks
- **Region:** Europe West

### Development Tools
- **Build Tool:** Next.js built-in
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git (via MCP)
- **Database Migrations:** Supabase SQL Editor

---

### 10. Admin Panel & Content Management System

#### Description
Protected admin interface for managing products, images, and videos. Only authenticated admin users can access.

#### Technical Implementation
- Protected routes under `/admin/*`
- Middleware checks authentication on every request
- Server Actions for CRUD operations
- Supabase client (server-side) for database operations
- React Hook Form for form management
- Tiptap for rich text editing (descriptions)
- Image/video upload to Supabase Storage

---

#### 10.1 Admin Authentication (`/admin/login`)

**Features:**
- Email and password login form
- Supabase Auth integration
- Error handling for invalid credentials
- Redirect to dashboard on success
- Session management with cookies

**UI Components:**
- Email input field
- Password input field (hidden text)
- "Login" submit button
- Error message display
- Simple, functional design

**Acceptance Criteria:**
- [ ] Admin can login with valid credentials
- [ ] Invalid credentials show error message
- [ ] Successful login redirects to dashboard
- [ ] Session persists across page refreshes
- [ ] Protected routes redirect to login if not authenticated

---

#### 10.2 Admin Dashboard (`/admin/dashboard`)

**Features:**
- Welcome message with admin name
- Quick stats cards:
  - Total products
  - Published products
  - Hidden products
  - Sold products
- Quick actions:
  - "Add New Product" button
  - "View All Products" button
- Logout button

**UI Components:**
- Header with navigation
- Stats cards (4 cards in grid)
- Action buttons
- Sidebar or top navigation

**Acceptance Criteria:**
- [ ] Dashboard loads after login
- [ ] Stats display correct counts
- [ ] Quick action buttons navigate correctly
- [ ] Logout button clears session and redirects

---

#### 10.3 Product List (`/admin/products`)

**Features:**
- Table view of all products (all statuses)
- Columns:
  - Product image (thumbnail)
  - Name (EN)
  - Category
  - Wood Type
  - Status (badge with color coding)
  - Featured (yes/no)
  - Actions (Edit, Delete, Quick Status Change)
- Filtering by status, category, wood type
- Search by name
- Pagination (20 products per page)
- Bulk actions (future enhancement)

**Status Badge Colors:**
- Published: Green
- Hidden: Yellow/Orange
- Sold: Red

**Actions Per Row:**
- Edit button → navigates to edit page
- Delete button → shows confirmation modal
- Quick status dropdown → change status without editing

**Acceptance Criteria:**
- [ ] All products load from database
- [ ] Table displays all product information
- [ ] Filters work correctly
- [ ] Search finds products by name
- [ ] Edit button navigates to edit page
- [ ] Delete shows confirmation before deleting
- [ ] Quick status change updates immediately
- [ ] Pagination works if >20 products

---

#### 10.4 Add New Product (`/admin/products/new`)

**Features:**
- Form with all product fields
- Image upload (drag & drop or file picker, up to 10 images)
- Optional video upload (1 video)
- Rich text editor for descriptions (EN & BG)
- Image reordering (drag to reorder display_order)
- Form validation
- Save as draft (hidden) or publish immediately
- Preview button to see how it looks on public site

**Form Fields:**
- **Product Name (EN):** Text input, required
- **Product Name (BG):** Text input, required
- **Category:** Dropdown (table, chair, cabinet, custom), required
- **Wood Type:** Dropdown (oak, walnut, pine, mixed), required
- **Description (EN):** Tiptap rich text editor, required
- **Description (BG):** Tiptap rich text editor, required
- **Status:** Radio buttons (published, hidden), default: hidden
- **Featured:** Checkbox, default: unchecked
- **Images:** Multi-file upload, required (at least 1), max 10
- **Video:** Single file upload, optional

**Image Upload Features:**
- Drag and drop zone
- File picker button
- Multiple files at once
- Preview thumbnails after upload
- Remove individual images
- Drag to reorder images (sets display_order)
- Progress bar during upload
- File type validation (JPEG, PNG, WebP only)
- File size validation (max 5MB per image)

**Video Upload Features:**
- Drag and drop or file picker
- Single file only
- Preview after upload
- Remove video button
- Progress bar during upload
- File type validation (MP4, WebM, MOV only)
- File size validation (max 50MB)

**Rich Text Editor (Tiptap) Features:**
- Bold, italic, underline
- Headings (H2, H3)
- Bullet list, numbered list
- Links
- Simple toolbar
- Clean, easy to use

**Form Actions:**
- **Save as Draft:** Saves with status = 'hidden'
- **Publish:** Saves with status = 'published'
- **Cancel:** Navigates back to product list (confirms if changes made)

**Validation:**
- All required fields must be filled
- At least 1 image must be uploaded
- Product name must be unique (EN)
- Descriptions must not be empty (even in rich text)

**Acceptance Criteria:**
- [ ] Form displays all fields correctly
- [ ] Tiptap editor works for descriptions
- [ ] Image upload accepts multiple files
- [ ] Images can be reordered by drag-drop
- [ ] Video upload accepts single file
- [ ] Validation shows errors for empty required fields
- [ ] Save as draft creates hidden product
- [ ] Publish creates published product
- [ ] Images upload to Supabase Storage
- [ ] Video uploads to Supabase Storage
- [ ] Product saves to database with correct relationships
- [ ] Success message shows after save
- [ ] Redirects to product list after save

---

#### 10.5 Edit Product (`/admin/products/[id]/edit`)

**Features:**
- Same form as "Add New Product"
- Pre-populated with existing product data
- Existing images shown with ability to:
  - Remove existing images
  - Add new images (up to 10 total)
  - Reorder all images
- Existing video shown with ability to:
  - Remove video
  - Replace with new video
- Change status (published → hidden, hidden → sold, etc.)
- Update any field
- Delete product button (with confirmation)

**Additional Actions:**
- **Update:** Save changes
- **Delete Product:** Deletes product and all associated images/videos
- **Cancel:** Navigate back without saving

**Delete Confirmation:**
- Modal popup: "Are you sure you want to delete this product? This action cannot be undone."
- Confirm and Cancel buttons
- On confirm, deletes from database (CASCADE deletes images/videos)

**Acceptance Criteria:**
- [ ] Form loads with existing product data
- [ ] Existing images display in correct order
- [ ] Can add new images (up to 10 total)
- [ ] Can remove existing images
- [ ] Can reorder images
- [ ] Existing video displays (if present)
- [ ] Can replace or remove video
- [ ] All fields editable
- [ ] Update saves changes to database
- [ ] Delete shows confirmation modal
- [ ] Delete removes product and all media
- [ ] Success message after update
- [ ] Redirects to product list after update/delete

---

#### 10.6 Quick Status Change

**Features:**
- Dropdown in product list to quickly change status
- Available statuses:
  - Published
  - Hidden
  - Sold
- Updates immediately without full edit
- Confirmation for changing to "Sold"

**Acceptance Criteria:**
- [ ] Status dropdown shows current status
- [ ] Changing status updates database immediately
- [ ] UI updates to reflect new status
- [ ] "Sold" status shows confirmation dialog
- [ ] Status change persists after page refresh

---

#### 10.7 Admin Navigation

**Features:**
- Persistent navigation in admin panel
- Links:
  - Dashboard
  - Products
  - Add New Product
  - Logout
- Current page indicator
- Responsive (hamburger on mobile)

**Design:**
- Simple sidebar (desktop) or top bar (mobile)
- Clean, functional design (not luxury like public site)
- Easy to use for client

**Acceptance Criteria:**
- [ ] Navigation visible on all admin pages
- [ ] Links navigate correctly
- [ ] Current page highlighted
- [ ] Logout button works
- [ ] Responsive on mobile

---

### 11. Image & Video Upload System

#### Description
Handle file uploads to Supabase Storage with validation, progress tracking, and optimization.

#### Technical Implementation
- **Client-side:** React file upload component
- **Server-side:** Server Actions to upload to Supabase Storage
- **Storage:** Supabase Storage buckets (product-images, product-videos)
- **Optimization:** Compress images before upload (optional)
- **Progress:** Track upload progress with percentage

#### Image Upload Process
1. User selects images (drag-drop or file picker)
2. Validate file type (JPEG, PNG, WebP only)
3. Validate file size (max 5MB per image)
4. Validate total count (max 10 images per product)
5. Show preview thumbnails
6. On form submit, upload to Supabase Storage
7. Get public URL for each image
8. Save image URLs to product_images table with display_order
9. Show success message

#### Video Upload Process
1. User selects video file
2. Validate file type (MP4, WebM, MOV only)
3. Validate file size (max 50MB)
4. Show preview (video player or thumbnail)
5. On form submit, upload to Supabase Storage
6. Get public URL
7. Save video URL to product_videos table
8. Show success message

#### File Naming Convention
```
Images: product-images/{product-id}/{timestamp}-{sanitized-filename}.ext
Videos: product-videos/{product-id}/{timestamp}-{sanitized-filename}.ext
```

#### Error Handling
- File type not allowed → Show error message
- File too large → Show error message
- Upload failed → Show error, allow retry
- Network error → Show error, allow retry
- Too many images → Show error, prevent upload

#### Acceptance Criteria
- [ ] File type validation works
- [ ] File size validation works
- [ ] Max image count enforced (10)
- [ ] Upload progress shows percentage
- [ ] Preview images before upload
- [ ] Images upload to correct bucket
- [ ] Video uploads to correct bucket
- [ ] Public URLs generated correctly
- [ ] Error messages clear and helpful
- [ ] Retry mechanism for failed uploads

---

### 12. Data Fetching & Caching

#### Description
Efficient data fetching from Supabase with appropriate caching strategies.

#### Public Site Data Fetching
- **Homepage:** Fetch featured products (Server Component, static generation)
- **Catalogue:** Fetch all published products (Server Component, ISR every 60 seconds)
- **About Page:** Static (no data fetching)

#### Admin Panel Data Fetching
- **Dashboard Stats:** Fetch on load (Server Component, no caching)
- **Product List:** Fetch on load (Server Component, no caching)
- **Edit Form:** Fetch product by ID (Server Component, no caching)

#### Caching Strategy
- **Public site:** Incremental Static Regeneration (ISR) with 60-second revalidation
- **Admin panel:** No caching (always fresh data)
- **Images/Videos:** CDN caching via Supabase (automatic)

#### Acceptance Criteria
- [ ] Public site uses ISR for catalogue
- [ ] Admin panel always shows fresh data
- [ ] Homepage products cached appropriately
- [ ] No stale data issues
- [ ] Fast load times on public site

---

## Architecture Overview

### Application Type
**Full-Stack Web Application** (changed from static site)

This is a dynamic web application with:
- Server-side rendering (SSR) and static generation (SSG) where appropriate
- Database-driven content (products fetched from Supabase)
- Authentication system (admin access)
- Content Management System (CMS) for product management
- Image and video storage
- Protected admin routes

### Data Flow
1. **Public Site:** Fetches published products from Supabase database
2. **Admin Panel:** Authenticated users manage products via protected routes
3. **Media Storage:** Images/videos uploaded to Supabase Storage
4. **Authentication:** Admin login handled by Supabase Auth

---

## Database Schema

### Supabase Tables

#### 1. `profiles` Table
Stores admin user information.

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields:**
- `id` - UUID, references auth.users, primary key
- `email` - Admin email address
- `role` - User role (always 'admin' for this project)
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

**Existing Admin Users:**
- Developer: ahlgrenmelwin8@gmail.com (ID: 6cbf10cc-aefa-4f3a-9a01-7011bf21a5ea)
- Client: petriahlgren@hotmail.com (ID: e75b97f0-8121-4ad9-8f58-ff136d3b7cb1)

---

#### 2. `products` Table
Stores all product information.

```sql
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_bg TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('table', 'chair', 'cabinet', 'custom')),
  wood_type TEXT NOT NULL CHECK (wood_type IN ('oak', 'walnut', 'pine', 'mixed')),
  description_en TEXT NOT NULL,
  description_bg TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'sold')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

**Fields:**
- `id` - UUID, auto-generated, primary key
- `name_en` - Product name in English
- `name_bg` - Product name in Bulgarian
- `category` - Product category (table, chair, cabinet, custom)
- `wood_type` - Type of wood (oak, walnut, pine, mixed)
- `description_en` - Rich text description in English (HTML from Tiptap)
- `description_bg` - Rich text description in Bulgarian (HTML from Tiptap)
- `status` - Product visibility:
  - `published` - Visible on public site
  - `hidden` - Temporarily hidden, not visible on public site
  - `sold` - Marked as sold, not visible on public site
- `featured` - Boolean, if true shows on homepage
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update
- `created_by` - UUID of admin who created the product

**Indexes:**
- `idx_products_status` - For filtering by status
- `idx_products_category` - For filtering by category
- `idx_products_wood_type` - For filtering by wood type
- `idx_products_featured` - For finding featured products

---

#### 3. `product_images` Table
Stores multiple images per product.

```sql
CREATE TABLE public.product_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields:**
- `id` - UUID, auto-generated, primary key
- `product_id` - Foreign key to products table
- `image_url` - Full URL to image in Supabase Storage
- `display_order` - Order for displaying images (0 = first, 1 = second, etc.)
- `created_at` - Timestamp of upload

**Constraints:**
- Maximum 10 images per product
- ON DELETE CASCADE - deleting product deletes all its images

**Index:**
- `idx_product_images_product_id` - For fetching images by product

---

#### 4. `product_videos` Table
Stores optional video per product.

```sql
CREATE TABLE public.product_videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  video_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields:**
- `id` - UUID, auto-generated, primary key
- `product_id` - Foreign key to products table (one video per product)
- `video_url` - Full URL to video in Supabase Storage
- `created_at` - Timestamp of upload

**Constraints:**
- Maximum 1 video per product
- ON DELETE CASCADE - deleting product deletes its video

**Index:**
- `idx_product_videos_product_id` - For fetching video by product

---

## Supabase Storage

### Storage Buckets

#### 1. `product-images` Bucket
- **Type:** Public bucket
- **Purpose:** Store product images
- **File Types:** JPEG, PNG, WebP
- **Max File Size:** 5MB per image
- **Max Files Per Product:** 10 images
- **Naming Convention:** `{product-id}/{timestamp}-{original-filename}`

#### 2. `product-videos` Bucket
- **Type:** Public bucket
- **Purpose:** Store product videos
- **File Types:** MP4, WebM, MOV
- **Max File Size:** 50MB per video (reasonable for product videos)
- **Max Files Per Product:** 1 video
- **Naming Convention:** `{product-id}/{timestamp}-{original-filename}`

### Storage URLs
Images and videos are accessed via public URLs:
```
https://wwgdshwtkmgmrlzagdxz.supabase.co/storage/v1/object/public/product-images/{path}
https://wwgdshwtkmgmrlzagdxz.supabase.co/storage/v1/object/public/product-videos/{path}
```

---

## Row Level Security (RLS) Policies

### Products Table

**Public Read (Published Only):**
```sql
CREATE POLICY "Anyone can view published products"
  ON public.products FOR SELECT
  USING (status = 'published');
```
- Anyone can view products with status = 'published'
- Hidden and sold products are not visible to public

**Admin Full Access:**
```sql
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT ...
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE ...
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE ...
```
- Only users in profiles table with role = 'admin' can create/update/delete products

### Product Images & Videos

**Public Read (For Published Products):**
- Anyone can view images/videos belonging to published products
- Images/videos of hidden or sold products are not accessible

**Admin Full Access:**
- Admins can upload, update, delete any images/videos

---

## Authentication System

### Supabase Auth

**Provider:** Email/Password authentication

**Admin Users:**
- Developer: ahlgrenmelwin8@gmail.com
- Client: petriahlgren@hotmail.com

**Authentication Flow:**
1. Admin visits `/admin/login`
2. Enters email and password
3. Supabase Auth validates credentials
4. On success, redirects to `/admin/dashboard`
5. Session stored in cookie (httpOnly, secure)
6. Middleware protects all `/admin/*` routes

### Protected Routes
All routes under `/admin/*` require authentication:
- `/admin/login` - Login page (public)
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/products` - Product list (protected)
- `/admin/products/new` - Add new product (protected)
- `/admin/products/[id]/edit` - Edit product (protected)

### Session Management
- Sessions expire after 7 days (Supabase default)
- Refresh token used for renewal
- Logout clears session and redirects to `/admin/login`

---

## Core Functionalities

### 1. Internationalization (i18n)

#### Description
Full bilingual support for English and Bulgarian languages with seamless switching.

#### Technical Implementation
- Use `next-intl` for translation management
- Route structure: `/[locale]/...` (e.g., `/en/catalogue`, `/bg/catalogue`)
- Translation files: `messages/en.json` and `messages/bg.json`
- Language detection based on URL parameter
- Default language: English

#### User Features
- Language switcher in header (flag icons or text)
- Persists language choice across pages
- All content translated (navigation, headings, body text, buttons, footer)
- SEO-friendly with proper `hreflang` tags

#### Acceptance Criteria
- [ ] User can switch between EN and BG from any page
- [ ] Language choice persists during session
- [ ] All UI elements are translated
- [ ] URLs reflect current language (e.g., `/en/about`, `/bg/about`)
- [ ] No untranslated placeholder text visible to users

---

### 2. Responsive Design

#### Description
Fully responsive website that works seamlessly across all device sizes.

#### Technical Implementation
- Mobile-first Tailwind CSS approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`
- Flexible grid layouts using CSS Grid and Flexbox
- Responsive images with `next/image`
- Touch-friendly interactions on mobile

#### User Features
- **Mobile (320px - 480px):**
  - Single column layouts
  - Hamburger menu navigation
  - Stack elements vertically
  - Large touch targets (min 44x44px)
  
- **Tablet (768px - 1024px):**
  - 2-column catalogue grid
  - Expanded navigation (still may use hamburger)
  - Optimized image sizes
  
- **Desktop (1280px+):**
  - 3-column catalogue grid
  - Full horizontal navigation
  - Maximum content width with centered container
  - Hover effects and interactions

#### Acceptance Criteria
- [ ] Website is usable on screens from 320px to 2560px
- [ ] No horizontal scrolling on any device
- [ ] Images scale appropriately
- [ ] Navigation adapts to screen size
- [ ] Touch targets are adequate on mobile
- [ ] Text is readable without zooming on all devices

---

### 3. Navigation System

#### Description
Clear, intuitive navigation that allows users to move between pages easily.

#### Technical Implementation
- Next.js Link components for client-side navigation
- Active page indicators
- Mobile hamburger menu with smooth animations
- Sticky header on scroll (optional)

#### Components
**Header Navigation:**
- Logo/Business name (links to home)
- Main navigation links:
  - Home
  - Catalogue
  - About & Contact
- Language switcher
- Mobile hamburger menu (screens < 768px)

**Footer Navigation:**
- Quick links (Home, Catalogue, About)
- Legal links (Privacy Policy, Terms & Conditions)
- Social media icons
- Copyright notice

#### User Features
- Clear visual indication of current page
- Smooth page transitions
- Accessible keyboard navigation
- Mobile menu slides in/out smoothly

#### Acceptance Criteria
- [ ] All navigation links work correctly
- [ ] Current page is visually indicated
- [ ] Mobile menu opens/closes smoothly
- [ ] Navigation is keyboard accessible
- [ ] Links have proper hover/focus states

---

### 4. Image Optimization

#### Description
High-quality images that load quickly and look great on all devices.

#### Technical Implementation
- Use Next.js `next/image` component
- WebP format with fallbacks
- Lazy loading for below-the-fold images
- Responsive image sizes (srcset)
- Blur placeholder while loading

#### Image Requirements
- **Hero images:** 1920x1080px minimum
- **Product images:** 1200x900px minimum (4:3 ratio)
- **Process images:** 800x600px minimum
- **Thumbnails:** 400x300px
- **Format:** WebP with JPEG fallback
- **Compression:** 80-85% quality

#### User Features
- Fast image loading
- No layout shift during image load
- Sharp images on retina displays
- Graceful loading states

#### Acceptance Criteria
- [ ] All images use next/image component
- [ ] Images are optimized and compressed
- [ ] Alt text provided for all images
- [ ] Images are responsive to viewport size
- [ ] No cumulative layout shift (CLS)

---

### 5. Product Catalogue with Filtering

#### Description
Browse furniture pieces with filtering capabilities by category, wood type, and status. Products are fetched from Supabase database in real-time.

#### Technical Implementation
- **Data Source:** Supabase products table
- **Fetching Method:** Server Components for initial load, client-side for filtering
- Client-side filtering logic with React state
- Filter state managed with React hooks
- Smooth filter transitions with CSS

#### Product Data Structure
```typescript
interface Product {
  id: string;
  name_en: string;
  name_bg: string;
  category: 'table' | 'chair' | 'cabinet' | 'custom';
  wood_type: 'oak' | 'walnut' | 'pine' | 'mixed';
  description_en: string; // HTML from Tiptap
  description_bg: string; // HTML from Tiptap
  status: 'published' | 'hidden' | 'sold';
  featured: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  images: ProductImage[]; // Joined from product_images table
  video?: ProductVideo; // Joined from product_videos table
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

interface ProductVideo {
  id: string;
  product_id: string;
  video_url: string;
  created_at: string;
}
```

#### Filter Options
**Category Filters:**
- All Products (default)
- Tables
- Chairs
- Cabinets
- Custom Pieces

**Wood Type Filters:**
- All Woods (default)
- Oak
- Walnut
- Pine
- Mixed

**Status Filters (Admin Only):**
- All Statuses
- Published
- Hidden
- Sold

#### Public Display
- Only products with `status = 'published'` are visible
- Products with `status = 'hidden'` or `status = 'sold'` are not shown
- Grid layout (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each product card shows:
  - Primary image (first image by display_order)
  - Product name (translated)
  - Category tag
  - Wood type badge
  - Brief description (first 100 characters, HTML stripped)
- Hover effects (subtle zoom, shadow)
- Click to view larger images in modal (optional)

#### Acceptance Criteria
- [ ] Products load from Supabase database
- [ ] Only published products visible on public site
- [ ] Filters work correctly in isolation and combination
- [ ] UI updates smoothly when filtering
- [ ] Active filters are visually distinct
- [ ] Clear filters button appears when needed
- [ ] Product count is accurate
- [ ] Empty state shows when no products match
- [ ] Filtering is fast (no loading delays)
- [ ] Images load from Supabase Storage

---

### 6. Email Contact Integration

#### Description
Simple, direct email contact method without forms.

#### Technical Implementation
- Standard `mailto:` links
- Pre-filled subject line for context
- Multiple contact points throughout site

#### Email Link Format
```html

  Contact Us

```

#### Contact Points
1. **Header:** Small "Contact" link
2. **Homepage:** Call-to-action button in hero and dedicated contact section
3. **Catalogue:** "Contact for Quote" buttons on products
4. **About & Contact Page:** Primary contact button
5. **Footer:** Email link

#### User Features
- Clicking opens default email client
- Subject line pre-filled (e.g., "Inquiry from Website")
- Email address clearly displayed as text (for copy/paste)
- Contact points visually prominent

#### Placeholder Email
Until business email is set up, use placeholder:
- Displayed: "Email: [To be set up]"
- Buttons disabled or show "Coming soon" message
- Or use temporary email like: `info@artisanwoodworks.com` (non-functional)

#### Acceptance Criteria
- [ ] Email links open default mail client
- [ ] Subject line is pre-filled appropriately
- [ ] Email is displayed as clickable text
- [ ] Email is easily copyable for manual entry
- [ ] Contact buttons are prominent and clear
- [ ] All contact points tested and functional

---

### 7. Social Media Integration

#### Description
Social media buttons linking to Instagram and Facebook profiles.

#### Technical Implementation
- Icon buttons in header and footer
- Use lucide-react icons or custom SVG
- Links initially point to `#` (placeholder)
- Easy to update with actual URLs later

#### Social Platforms
- **Instagram:** Primary platform (visual content)
- **Facebook:** Secondary platform (business presence)

#### User Features
- Recognizable platform icons
- "Follow us" or similar text label
- Opens in new tab when clicked (when URLs added)
- Currently disabled/placeholder state

#### Display Locations
1. **Header:** Optional (small icons)
2. **About & Contact Page:** Prominent section with text "Follow us on social media"
3. **Footer:** Icon row with links

#### Implementation Note
```html


  




  

```

#### Acceptance Criteria
- [ ] Social icons are visible and recognizable
- [ ] Icons have proper ARIA labels
- [ ] Links open in new tab (when active)
- [ ] Icons have hover states
- [ ] Easy to update URLs without code changes (consider config file)

---

### 8. SEO Optimization

#### Description
Search engine optimization for discoverability and ranking.

#### Technical Implementation
- Next.js Metadata API for meta tags
- Semantic HTML structure
- Proper heading hierarchy (h1, h2, h3)
- Alt text for all images
- Clean URL structure
- Sitemap and robots.txt

#### Meta Tags (per page)
```typescript
export const metadata: Metadata = {
  title: "Artisan Woodworks | Handcrafted Furniture Sofia",
  description: "Luxury handcrafted furniture in Sofia, Bulgaria. Custom tables, chairs, and cabinets made from premium oak, walnut, and pine.",
  keywords: "handcrafted furniture, custom furniture Sofia, artisan woodwork Bulgaria",
  openGraph: {
    title: "Artisan Woodworks",
    description: "...",
    images: ["/og-image.jpg"],
  },
}
```

#### SEO Checklist
**Technical SEO:**
- [ ] Unique title and description per page
- [ ] Proper heading hierarchy (single h1 per page)
- [ ] Alt text for all images
- [ ] Clean, descriptive URLs
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Mobile-friendly (passes Google test)
- [ ] Fast page load (< 3 seconds)

**Content SEO:**
- [ ] Keyword-rich content (natural, not stuffed)
- [ ] Descriptive product names and descriptions
- [ ] Internal linking between pages
- [ ] Bilingual hreflang tags
- [ ] Structured data (Organization, LocalBusiness schema)

**Performance SEO:**
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Minimal JavaScript blocking
- [ ] Image optimization
- [ ] Text compression enabled

#### Acceptance Criteria
- [ ] All pages have unique meta tags
- [ ] Google can crawl and index site
- [ ] Site appears correctly in search results
- [ ] No broken links or errors
- [ ] Mobile-friendly test passes
- [ ] PageSpeed Insights score > 85

---

### 9. Analytics Integration

#### Description
Track website performance and user behavior to measure success.

#### Technical Implementation
- Google Analytics 4 (or similar)
- Event tracking for key interactions
- Privacy-compliant implementation

#### Metrics to Track
**Traffic Metrics:**
- Page views per page
- Unique visitors
- Session duration
- Bounce rate
- Traffic sources
- Geographic location
- Device type (mobile vs. desktop)
- Language preference (EN vs. BG)

**Engagement Metrics:**
- Catalogue page views
- Filter usage (category, wood type)
- Time on catalogue
- Product card clicks
- Email link clicks (**PRIMARY KPI**)
- Social media icon clicks

**Technical Metrics:**
- Page load times
- Error rates
- Browser/device distribution

#### Events to Track
```javascript
// Custom events
- email_click: When user clicks email contact
- filter_use: When user applies catalogue filter
- language_switch: When user changes language
- social_click: When user clicks social media icon
- product_view: When user views product detail
```

#### Privacy Considerations
- [ ] Cookie consent banner (GDPR/CCPA)
- [ ] Privacy policy mentions analytics
- [ ] IP anonymization enabled
- [ ] Option to opt-out of tracking

#### Acceptance Criteria
- [ ] Analytics tracking code installed
- [ ] All key events are tracked
- [ ] Data appears in analytics dashboard
- [ ] Privacy compliant (consent, policy)
- [ ] No impact on page load performance

---

### 10. Legal Pages

#### Description
Privacy Policy and Terms & Conditions pages with template content.

#### Technical Implementation
- Standard Next.js pages
- Markdown or HTML content
- Fully translated (EN/BG)
- Linked from footer

#### Content Requirements
**Privacy Policy:**
- What data is collected (email addresses from inquiries, analytics data)
- How data is used (respond to inquiries, improve website)
- How data is stored (email not stored, sent directly)
- User rights (GDPR compliance: access, deletion, portability)
- Cookie usage (analytics cookies)
- Contact information for privacy questions
- Last updated date

**Terms & Conditions:**
- Website usage terms
- Intellectual property rights (images, content ownership)
- Disclaimer (product images may vary from final product)
- Limitation of liability
- Governing law (Bulgaria)
- Dispute resolution
- Changes to terms
- Contact information

#### Template Source
- Use standard European/GDPR-compliant templates
- Customize for Artisan Woodworks specifics
- Review by legal professional recommended (note for client)

#### Acceptance Criteria
- [ ] Both pages fully written and translated
- [ ] Links in footer work correctly
- [ ] Content is clear and readable
- [ ] Last updated date is accurate
- [ ] Compliant with EU/Bulgarian law (basic compliance)

---

## Features Explicitly NOT Included

### Out of Scope for Initial Launch
These features are NOT part of the initial website build:

1. **Contact Forms** - Only email links, no web forms
2. **E-commerce/Shopping Cart** - No online purchasing functionality
3. **Payment Processing** - No payment gateway integration
4. **Booking System** - No appointment scheduling
5. **User Accounts** - No login/registration
6. **Blog/CMS** - No content management system
7. **Customer Reviews/Testimonials** - Not included initially
8. **Live Chat** - No real-time chat widget
9. **Newsletter Signup** - No email marketing integration
10. **Search Functionality** - Filtering only, no site-wide search
11. **Product Detail Pages** - Products shown in catalogue grid only
12. **Wishlist/Favorites** - No saving functionality
13. **Size/Color Configurators** - No interactive product customization
14. **Price Display** - No pricing shown (inquiry-based)
15. **Inventory Management** - No stock tracking
16. **Multi-currency** - Single currency (BGN) if any prices shown
17. **Social Media Feeds** - Only icon links, no embedded content
18. **Email Integration** - No MailChimp, SendGrid, etc.
19. **CRM Integration** - No Salesforce, HubSpot, etc.
20. **Analytics Dashboard** - Only standard Google Analytics

---

## Performance Requirements

### Loading Performance
- **First Contentful Paint (FCP):** < 1.5 seconds
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Time to Interactive (TTI):** < 3.5 seconds
- **Total Page Size:** < 2MB per page
- **JavaScript Bundle:** < 200KB (minified, gzipped)

### Lighthouse Scores (Target)
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### User Experience Metrics
- **Time to First Byte (TTFB):** < 600ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms
- **No JavaScript errors** in console
- **Works offline:** No (not required)

---

## Browser & Device Support

### Browsers (Desktop)
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Browsers (Mobile)
- Safari iOS (latest 2 versions)
- Chrome Android (latest 2 versions)
- Samsung Internet (latest version)

### Devices
- Mobile phones (320px - 480px)
- Tablets (768px - 1024px)
- Laptops (1280px - 1920px)
- Large displays (1920px+)

### Operating Systems
- iOS 14+
- Android 10+
- Windows 10+
- macOS 11+

---

## Accessibility Requirements (WCAG 2.1 Level AA)

### Perceivable
- [ ] Text alternatives for images (alt text)
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Content not dependent on color alone
- [ ] Proper heading structure

### Operable
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Skip navigation links
- [ ] Focus indicators visible
- [ ] Touch targets minimum 44x44px

### Understandable
- [ ] Language of page declared
- [ ] Navigation is consistent
- [ ] Labels clear and descriptive
- [ ] Error messages are clear
- [ ] Instructions provided where needed

### Robust
- [ ] Valid HTML
- [ ] ARIA landmarks used appropriately
- [ ] Semantic HTML elements
- [ ] Works with screen readers (test with NVDA/VoiceOver)

---

## Security Considerations

### Basic Security
- [ ] HTTPS enabled (SSL certificate)
- [ ] Secure headers configured
- [ ] No sensitive data exposed in code
- [ ] External links use `rel="noopener noreferrer"`
- [ ] Input sanitization (if forms added later)

### Privacy & GDPR
- [ ] Cookie consent banner
- [ ] Privacy policy accessible
- [ ] Analytics IP anonymization
- [ ] No tracking without consent
- [ ] Clear data usage explanation

---

## Deployment & Hosting

### Hosting Platform
**Recommended:** Vercel
- Free tier sufficient for initial launch
- Automatic deployments from Git
- Built-in CDN and edge functions
- Excellent Next.js support
- Custom domain support

**Alternatives:** Netlify, AWS Amplify, Railway

### Domain Configuration
- Domain to be purchased by client
- DNS configuration required
- SSL certificate (automatic with Vercel)
- Redirect www to non-www (or vice versa)

### Deployment Checklist
- [ ] Production build tested locally
- [ ] Environment variables configured
- [ ] Domain connected
- [ ] SSL certificate active
- [ ] Analytics tracking verified
- [ ] Email links tested
- [ ] All pages accessible
- [ ] Mobile responsive verified
- [ ] Cross-browser tested

---

## Content Requirements

### Homepage
- 1 hero image (high-quality furniture photo)
- Business name and tagline (2-3 sentences)
- 3 featured product images
- Brief company introduction (50-100 words)
- Call-to-action text
- 2-3 process images

### Catalogue Page
- Page title and subtitle (20-30 words)
- 2-3 product entries with:
  - Product name (EN & BG)
  - Category and wood type
  - Description (30-50 words per product)
  - 2-3 images per product

### About & Contact Page
- Company introduction (100-150 words)
- Process description (5 steps, 30-50 words each)
- "Why Choose Us" section (3-4 points, 20-30 words each)
- Contact information (email placeholder)
- Location mention (Sofia, Bulgaria)

### Legal Pages
- Privacy policy (500-800 words)
- Terms & conditions (500-800 words)
- Both fully translated to Bulgarian

### Navigation & UI
- All button labels (EN & BG)
- Navigation menu items (EN & BG)
- Filter labels (EN & BG)
- Footer text (EN & BG)
- Error messages (EN & BG)

---

## Testing Requirements

### Functional Testing
- [ ] All links work correctly
- [ ] Language switcher functions
- [ ] Filtering system works
- [ ] Email links open correctly
- [ ] Navigation responsive to screen size
- [ ] Images load properly
- [ ] No console errors

### Cross-Browser Testing
- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)

### Device Testing
- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Android tablet (Chrome)
- [ ] Desktop 1920x1080
- [ ] Desktop 1366x768

### Performance Testing
- [ ] Lighthouse audit (all scores > 90)
- [ ] PageSpeed Insights test
- [ ] Load time under 3 seconds
- [ ] No layout shift during load
- [ ] Images load progressively

### Accessibility Testing
- [ ] WAVE tool (no errors)
- [ ] Keyboard navigation test
- [ ] Screen reader test (NVDA or VoiceOver)
- [ ] Color contrast check
- [ ] Touch target size verification

### Content Testing
- [ ] All text translated accurately
- [ ] No placeholder text visible
- [ ] No broken images
- [ ] Alt text present and descriptive
- [ ] No spelling/grammar errors

---

## Future Enhancements (Post-Launch)

These features may be added in future phases:

### Phase 2 (3-6 months)
- Contact form (instead of mailto)
- Customer testimonials section
- Expanded product catalogue (10-20 items)
- Blog for SEO content
- Enhanced product pages with galleries

### Phase 3 (6-12 months)
- E-commerce functionality (online ordering)
- Payment gateway integration
- Order tracking system
- Customer account system
- Newsletter signup and email marketing

### Phase 4 (12+ months)
- Booking system for consultations
- Live Instagram feed integration
- Advanced product configurator
- Multi-currency support
- International shipping calculator

---

## Summary

The Artisan Woodworks website is a content-focused, static site built with modern technologies (Next.js, TypeScript, Tailwind CSS). Core functionalities include bilingual support, responsive design, product catalogue with filtering, and email-based contact. The site prioritizes performance, accessibility, and user experience while maintaining a luxury aesthetic. No backend services, databases, or complex integrations are required for the initial launch, making it simple to deploy and maintain.