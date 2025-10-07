   - [ ] Email button (mailto:info@artisanwoodworks.com - placeholder)
   - [ ] Social media buttons (Instagram, Facebook - unlinked with # href)
   - [ ] Location: Sofia, Bulgaria

#### Technical Requirements:
- [ ] Static page (no data fetching)
- [ ] Process section with scroll-triggered animations
- [ ] Smooth transitions

---

## Phase 6: Legal Pages (Templates)

### 6.1 Privacy Policy (`/[locale]/privacy/page.tsx`)
- [ ] Create simple template with:
  - What data we collect (email inquiries, analytics)
  - How we use it (respond to inquiries, improve website)
  - Data storage (not stored, direct email)
  - User rights (GDPR compliant basics)
  - Contact for questions
- [ ] Bilingual content (EN/BG)

### 6.2 Terms & Conditions (`/[locale]/terms/page.tsx`)
- [ ] Create simple template with:
  - Website usage terms
  - Intellectual property (images, content)
  - Disclaimer (product images may vary)
  - Limitation of liability
  - Governing law (Bulgaria)
- [ ] Bilingual content (EN/BG)

---

## Phase 7: Content Integration

### 7.1 Placeholder Images
- [ ] Source 10-15 high-quality placeholder images:
  - 3 hero images (luxury furniture in elegant settings)
  - 6-9 product images (tables, chairs, cabinets)
  - 3-5 process images (workshop, crafting, materials)
- [ ] Optimize images for web (WebP format, responsive sizes)
- [ ] Place in `public/images/` directory
- [ ] Ensure images reflect luxury, natural, elegant aesthetic

### 7.2 Copy/Text Content
- [ ] Write all English content (about 1500-2000 words total):
  - Homepage hero + sections
  - Catalogue intro
  - About page (company story, process steps)
  - Contact CTAs
  - Legal pages
- [ ] Translate to Bulgarian (or mark for translation)
- [ ] Ensure tone is professional, warm, inspiring

### 7.3 Sample Products Data (Optional Initial Data)
- [ ] Create 2-3 initial products via Admin Panel:
  1. Oak Dining Table
  2. Walnut Coffee Table
  3. Pine Cabinet
- [ ] Each with name, description, wood type, category, 2-3 images
- [ ] Mark 1-2 as featured for homepage

**Note:** Products should be added via Admin Panel, not hardcoded. This tests the full CMS workflow.

---

## Phase 8: Functionality & Interactivity

### 8.1 Catalogue Filtering
- [ ] Implement category filter logic (client-side)
- [ ] Implement wood type filter logic (client-side)
- [ ] Combine multiple filters (e.g., Oak + Tables)
- [ ] Show "No products found" state
- [ ] Smooth transitions

### 8.2 Email Integration
- [ ] Set up mailto: links with subject pre-fill
- [ ] Add hover states to email buttons
- [ ] Test email links open correctly

### 8.3 Social Media Placeholders
- [ ] Instagram button: `<a href="#" aria-label="Instagram">`
- [ ] Facebook button: `<a href="#" aria-label="Facebook">`
- [ ] Add note in admin panel or memo.md for client to update URLs later

### 8.4 Animations & Interactions
- [ ] Smooth scroll between sections
- [ ] Fade-in animations on scroll (Intersection Observer)
- [ ] Hover effects on product cards
- [ ] Smooth page transitions
- [ ] Loading states for admin panel

---

## Phase 9: Optimization & SEO

### 9.1 Performance
- [ ] Optimize images (next/image, WebP, lazy loading)
- [ ] Minimize bundle size
- [ ] Code splitting for routes
- [ ] Test Lighthouse audit (target 90+ performance for public site, 80+ for admin)

### 9.2 SEO Basics
- [ ] Meta tags for each page (title, description)
- [ ] Open Graph tags for social sharing
- [ ] Semantic HTML (proper heading hierarchy)
- [ ] Alt text for all images
- [ ] robots.txt (block /admin from search engines)
- [ ] sitemap.xml

### 9.3 Accessibility
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Focus states visible
- [ ] Color contrast compliance (WCAG AA)
- [ ] Screen reader testing

---

## Phase 10: Testing & Quality Assurance

### 10.1 Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 10.2 Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Large desktop (1920px+)

### 10.3 Functionality Testing (Public Site)
- [ ] All navigation links work
- [ ] Language switcher works correctly
- [ ] Catalogue filters work
- [ ] Only published products visible
- [ ] Email links work (mailto:)
- [ ] All images load
- [ ] No console errors

### 10.4 Functionality Testing (Admin Panel)
- [ ] Login works with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Dashboard displays correct stats
- [ ] Product list shows all products (all statuses)
- [ ] Add new product form works:
  - [ ] All fields save correctly
  - [ ] Images upload successfully (up to 10)
  - [ ] Video uploads successfully
  - [ ] Rich text editor saves HTML
  - [ ] Validation shows errors for empty fields
  - [ ] Save as draft creates hidden product
  - [ ] Publish creates published product
- [ ] Edit product form works:
  - [ ] Existing data loads correctly
  - [ ] Can update all fields
  - [ ] Can add new images
  - [ ] Can remove existing images
  - [ ] Can reorder images
  - [ ] Can replace/remove video
  - [ ] Update saves changes
- [ ] Delete product works with confirmation
- [ ] Quick status change updates immediately
- [ ] Logout works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Non-admin users cannot access admin panel

### 10.5 Database Testing
- [ ] Products insert correctly with all relationships
- [ ] Products update correctly
- [ ] Products delete correctly (CASCADE to images/videos)
- [ ] Images save with correct display_order
- [ ] Videos save correctly
- [ ] RLS policies enforce public/admin access
- [ ] Status changes work (published/hidden/sold)

### 10.6 Storage Testing
- [ ] Images upload to product-images bucket
- [ ] Videos upload to product-videos bucket
- [ ] Public URLs generate correctly
- [ ] Files accessible via public URL
- [ ] File deletion works
- [ ] File size validation works (5MB for images, 50MB for videos)
- [ ] File type validation works

### 10.7 Content Review
- [ ] All text translated correctly (EN & BG)
- [ ] No placeholder text remaining (or clearly marked)
- [ ] Brand voice consistent
- [ ] No spelling/grammar errors

---

## Phase 11: Deployment

### 11.1 Build Configuration
- [ ] Configure environment variables (already done in Phase 1.3)
- [ ] Set up production build
- [ ] Test production build locally:
  ```bash
  npm run build
  npm run start
  ```
- [ ] Verify no build errors

### 11.2 Git Setup & Version Control
**Claude Code has full access to Git via MCP (Model Context Protocol)**

- [ ] Ensure Git repository is initialized (done in Phase 1.1)
- [ ] Review all changes:
  ```bash
  git status
  git diff
  ```
- [ ] Stage all files:
  ```bash
  git add .
  ```
- [ ] Commit with descriptive message:
  ```bash
  git commit -m "feat: complete Artisan Woodworks website with admin CMS

  - Implemented Next.js 14 with TypeScript and Tailwind CSS
  - Integrated Supabase for database, auth, and storage
  - Built bilingual public site (EN/BG) with home, catalogue, about pages
  - Created admin panel with product CMS (CRUD operations)
  - Implemented image/video upload system (max 10 images, 1 video per product)
  - Added authentication with middleware protection
  - Integrated Tiptap rich text editor for product descriptions
  - Set up Row Level Security policies
  - Optimized for performance and SEO
  - Tested across browsers and devices"
  ```
- [ ] Create GitHub repository using Git MCP
- [ ] Push code to GitHub:
  ```bash
  git branch -M main
  git remote add origin <repository-url>
  git push -u origin main
  ```

### 11.3 Vercel Deployment
**Claude Code has full access to Vercel via MCP (Model Context Protocol)**

**Deployment Process:**
- [ ] Connect GitHub repository to Vercel using Vercel MCP
- [ ] Verify build settings (auto-detected by Vercel):
  - Build Command: `next build`
  - Output Directory: `.next`
  - Install Command: `npm install`
- [ ] Set up environment variables in Vercel project settings:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://wwgdshwtkmgmrlzagdxz.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Z2RzaHd0a21nbXJsemFnZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MDM5NjAsImV4cCI6MjA3NTI3OTk2MH0.SYzKOFDrLtDxrSAuwSnQECaxB5NtyjaZTe7PRu_jbZo
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Z2RzaHd0a21nbXJsemFnZHh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTcwMzk2MCwiZXhwIjoyMDc1Mjc5OTYwfQ.UTgkKdTexQET-5h3m9GAjEFl2RUuy8vZQUDVw6KG0VA
  NEXT_PUBLIC_SITE_URL=https://artisan-woodworks.vercel.app
  ```
  - **CRITICAL:** Mark `SUPABASE_SERVICE_ROLE_KEY` as sensitive
- [ ] Deploy to production
- [ ] Wait for deployment to complete
- [ ] Note the deployment URL (e.g., https://artisan-woodworks.vercel.app)

**Continuous Deployment:**
- Every push to `main` branch auto-deploys to production
- Preview deployments available for feature branches
- Easy rollbacks available if issues arise

### 11.4 Post-Deployment Verification
- [ ] Visit live site: https://artisan-woodworks.vercel.app
- [ ] Test all public pages load correctly
- [ ] Test language switcher on live site
- [ ] Test catalogue filtering on live site
- [ ] Verify only published products visible
- [ ] Test admin login on live site: https://artisan-woodworks.vercel.app/admin/login
- [ ] Login with developer email: ahlgrenmelwin8@gmail.com
- [ ] Test dashboard loads
- [ ] Test adding a product on live site
- [ ] Test uploading images on live site
- [ ] Test uploading video on live site
- [ ] Verify new product appears on public catalogue
- [ ] Test editing a product
- [ ] Test deleting a product
- [ ] Test quick status change
- [ ] Test logout
- [ ] Verify protected routes redirect to login
- [ ] Check Supabase dashboard for activity
- [ ] Monitor Vercel deployment logs for errors
- [ ] Document any issues in errors.md

### 11.5 Domain Configuration (Future)
- [ ] When client provides domain name:
  - Configure custom domain in Vercel dashboard
  - Update DNS records (Vercel provides instructions)
  - SSL certificate auto-configured by Vercel
  - Update `NEXT_PUBLIC_SITE_URL` environment variable
  - Configure www vs non-www redirect

### 11.6 Analytics & Monitoring
- [ ] Set up Google Analytics 4:
  - Create GA4 property
  - Add tracking code to app/layout.tsx
  - Test tracking works
  - Set up custom events (email clicks, product views)
- [ ] Monitor Vercel Analytics (built-in)
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Document analytics setup in memo.md

### 11.7 Client Handoff
- [ ] Provide client with:
  - [ ] Admin panel URL: https://artisan-woodworks.vercel.app/admin/login
  - [ ] Login credentials (email: petriahlgren@hotmail.com, password: [provided earlier])
  - [ ] Quick start guide for adding products
  - [ ] Vercel dashboard access (if desired)
  - [ ] GitHub repository access (if desired)
  - [ ] Google Analytics access
  - [ ] List of placeholder items to replace:
    - Business email (currently placeholder)
    - Social media URLs (currently # placeholders)
    - Domain name (currently Vercel subdomain)
    - Any placeholder images
    - Any placeholder text content
- [ ] Schedule training session to walk through admin panel
- [ ] Document common tasks (add product, edit product, change status, etc.)

---

## Success Metrics

### Primary KPI
**Email inquiries per month** - Track via Google Analytics (email link clicks)

### Secondary Metrics
- Page views per month (especially catalogue)
- Average session duration
- Bounce rate
- Mobile vs desktop traffic split
- Language preference (EN vs BG usage)
- Catalogue engagement (filter usage, product views)
- Admin panel usage (products added per month)

### Technical Metrics
- Lighthouse scores (performance, accessibility, SEO)
- Page load times
- Error rates
- Uptime

---

## Future Enhancements (Post-Launch)

### Phase 2 (3-6 months)
- Contact form (instead of mailto:)
- Customer testimonials section
- Expanded product catalogue (20+ items)
- Blog for SEO content
- Enhanced product detail pages with full galleries
- Product search functionality (instead of just filters)

### Phase 3 (6-12 months)
- E-commerce functionality (online ordering)
- Payment gateway integration (Stripe or PayPal)
- Order tracking system
- Customer account system
- Shopping cart
- Newsletter signup and email marketing

### Phase 4 (12+ months)
- Booking system for consultations
- Live Instagram feed integration
- Advanced product configurator (customize wood, dimensions, etc.)
- Multi-currency support
- International shipping calculator
- AR visualization (view furniture in your space)
- Multi-admin roles (assign different permissions)

---

## Notes for Claude Code

1. **Design Philosophy**: Clean, simple, luxury aesthetic for public site. Generous whitespace, high-quality images, minimal text. Admin panel should be functional and easy to use, not necessarily matching the luxury aesthetic.

2. **Color Usage**: Public site - stick to black, white, and natural wood tones. No bright colors. Admin panel - can use more utilitarian colors for status badges, buttons, etc.

3. **Typography**: Public site - elegant serif for headings, clean sans-serif for body. Admin panel - clean sans-serif throughout for readability.

4. **Image Treatment**: Always use high-quality images on public site. Images should breathe (padding around them). Admin panel images can be smaller thumbnails.

5. **Mobile-First**: Public site MUST be excellent on mobile (most B2C traffic). Admin panel primarily used on desktop but should work on tablet.

6. **Bilingual Considerations**: Public site MUST be fully bilingual (EN/BG). Admin panel can be English-only if easier.

7. **Performance**: Public site must load fast. Admin panel can be slightly slower (acceptable for admin tools).

8. **Email Contact**: Emphasize email as primary contact method on public site. Make it prominent and easy to find.

9. **Social Proof**: Since this is a new business (2025), focus on craftsmanship quality over testimonials (which don't exist yet).

10. **Scalability**: Build with future e-commerce in mind, but don't implement it now. Structure data/components to allow easy addition later.

11. **Git & Vercel Access**: You have full access to Git and Vercel via MCP. Use Git for version control throughout development, and deploy to Vercel when ready.

12. **Continuous Deployment**: Once deployed to Vercel, every push to main branch will auto-deploy. Use this for iterative improvements and testing.

13. **Supabase Access**: All credentials are in environment variables. Never hardcode them. Use server-side client for sensitive operations.

14. **Admin Panel UX**: Make it intuitive for non-technical users. Client should be able to add/edit products easily without training.

15. **Error Handling**: Log all errors to errors.md. Handle errors gracefully in UI with clear messages.

16. **Testing**: Test thoroughly before deploying. Use the testing checklist in Phase 10.

17. **Documentation**: Update memo.md with decisions and notes as you develop. This helps with context if development is paused.

---

## Reference Documents (Read in Phase 0)
- `project_documentation/rules.md` - Development rules and constraints
- `project_documentation/workflow.md` - This file, step-by-step development guide
- `entry_data/project_description.md` - Overall project context and business overview
- `entry_data/user_identification.md` - Target users, personas, and user stories
- `entry_data/functionalities_description.md` - Features, requirements, and functionality specs
- `entry_data/ui_ux_description.md` - Design guidelines, brand identity, and UX requirements

## Documentation During Development
- `project_documentation/errors.md` - Log any errors encountered during development
- `project_documentation/memo.md` - Project notes, decisions, and important information## Phase 3: Internationalization Setup

### 3.1 Configure next-intl
- [ ] Set up locale detection and routing
- [ ] Create translation files (messages/en.json, messages/bg.json)
- [ ] Implement language switcher component in header
- [ ] Configure default locale (English)

### 3.2 Translation Structure
```json
{
  "nav": { "home": "", "catalogue": "", "about": "" },
  "home": { "hero": {}, "featured": {} },
  "catalogue": { "title": "", "filters": {} },
  "about": { "title": "", "process": {} },
  "contact": { "email": "", "cta": {} },
  "footer": { "tagline": "", "legal": {} },
  "admin": {
    "login": { "title": "", "email": "", "password": "", "submit": "" },
    "dashboard": { "welcome": "", "stats": {} },
    "products": { "list": {}, "add": {}, "edit": {} }
  }
}
```

**Note:** Admin panel can be English-only if preferred (easier for development). Public site MUST be bilingual.

---

## Phase 3.5: Authentication System

### 3.5.1 Create Auth Server Actions

File: `lib/actions/auth.ts`
```typescript
'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(email: string, password: string) {
  const supabase = await createSupabaseServer()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function getSession() {
  const supabase = await createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

### 3.5.2 Create Login Page

File: `app/admin/login/page.tsx`
```typescript
'use client'

import { useState } from 'react'
import { login } from '@/lib/actions/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // Success handled by redirect in login action
  }

  return (
    
      
        Admin Login
        
        {error && (
          
            {error}
          
        )}

        
          
            
              Email
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          

          
            
              Password
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          

          
            {loading ? 'Logging in...' : 'Login'}
          
        
      
    
  )
}
```

### 3.5.3 Create Admin Layout

File: `app/admin/layout.tsx`
```typescript
import AdminNav from '@/components/admin/AdminNav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      
      
        {children}
      
    
  )
}
```

### 3.5.4 Test Authentication
- [ ] Navigate to `/admin/dashboard` (should redirect to login)
- [ ] Login with developer email: ahlgrenmelwin8@gmail.com
- [ ] Verify redirect to dashboard
- [ ] Test logout
- [ ] Test with invalid credentials
- [ ] Document any issues in errors.md

---

## Phase 4: Admin Panel Development

### 4.1 Admin Dashboard (`/admin/dashboard/page.tsx`)

**Features to Build:**
- [ ] Welcome message with admin name
- [ ] Stats cards (total, published, hidden, sold products)
- [ ] Quick action buttons (Add New Product, View All Products)
- [ ] Logout button

**Implementation:**
```typescript
import { getUser } from '@/lib/actions/auth'
import { getProductStats } from '@/lib/actions/products'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await getUser()
  const stats = await getProductStats()

  return (
    
      
        Welcome, {user?.email}
      

      
        
        
        
        
      

      
        
          
            Add New Product
          
        
        
          
            View All Products
          
        
      
    
  )
}
```

---

### 4.2 Product List (`/admin/products/page.tsx`)

**Features to Build:**
- [ ] Table with all products
- [ ] Status badges with color coding
- [ ] Edit and Delete buttons per row
- [ ] Quick status change dropdown
- [ ] Filter by status, category, wood type
- [ ] Search by name

**Implementation Notes:**
- Fetch all products (including hidden/sold) using Server Component
- Use client component for filters and search
- Delete shows confirmation modal
- Quick status update uses Server Action

---

### 4.3 Add New Product (`/admin/products/new/page.tsx`)

**Features to Build:**
- [ ] ProductForm component with all fields
- [ ] Image upload component (max 10 images)
- [ ] Video upload component (optional, 1 video)
- [ ] Tiptap rich text editor for descriptions
- [ ] Form validation
- [ ] Save as draft or publish
- [ ] Image reordering (drag-drop)

**Components to Create:**

1. **ProductForm** (`components/admin/ProductForm.tsx`)
   - All input fields
   - Form state management with React Hook Form
   - Validation with Zod
   - Submit handler

2. **ImageUpload** (`components/admin/ImageUpload.tsx`)
   - Drag-drop zone
   - File picker
   - Preview thumbnails
   - Remove button per image
   - Reorder via drag-drop
   - Progress bar during upload

3. **VideoUpload** (`components/admin/VideoUpload.tsx`)
   - Single file upload
   - Preview
   - Remove button
   - Progress bar

4. **RichTextEditor** (`components/admin/RichTextEditor.tsx`)
   - Tiptap integration
   - Toolbar (bold, italic, underline, lists, links, headings)
   - Clean UI

---

### 4.4 Edit Product (`/admin/products/[id]/edit/page.tsx`)

**Features to Build:**
- [ ] Same form as Add New Product
- [ ] Pre-populate with existing data
- [ ] Show existing images with remove option
- [ ] Add new images (up to 10 total)
- [ ] Show existing video with replace/remove option
- [ ] Delete product button with confirmation
- [ ] Update button

---

### 4.5 Server Actions for Products

File: `lib/actions/products.ts`

Create these Server Actions:
- [ ] `getProducts()` - Fetch all products (admin)
- [ ] `getPublishedProducts()` - Fetch published products (public)
- [ ] `getProductById(id)` - Fetch single product
- [ ] `createProduct(formData)` - Create new product
- [ ] `updateProduct(id, formData)` - Update product
- [ ] `deleteProduct(id)` - Delete product
- [ ] `updateProductStatus(id, status)` - Change status
- [ ] `getProductStats()` - Get dashboard stats

---

### 4.6 Upload Server Actions

File: `lib/actions/upload.ts`

Create these Server Actions:
- [ ] `uploadImages(files, productId)` - Upload multiple images
- [ ] `deleteImage(imageUrl)` - Delete single image
- [ ] `uploadVideo(file, productId)` - Upload video
- [ ] `deleteVideo(videoUrl)` - Delete video
- [ ] `updateImageOrder(productId, imageIds)` - Update display_order

---

## Phase 5: Public Pages Development

### 5.1 Home Page (`/[locale]/page.tsx`)

#### Components to Build:
1. **Hero Section**
   - [ ] Full-width hero image (placeholder)
   - [ ] Business name "Artisan Woodworks"
   - [ ] Tagline
   - [ ] CTA button to Catalogue
   - [ ] Smooth scroll indicator

2. **Brand Story Snippet**
   - [ ] 2-3 sentences about craftsmanship
   - [ ] Link to About page

3. **Featured Products (Fetch from Supabase)**
   - [ ] Query products where `featured = true` and `status = 'published'`
   - [ ] Grid layout (3 columns desktop, 1 mobile)
   - [ ] Product cards with image, name, brief description
   - [ ] Link to Catalogue

4. **Craftsmanship Teaser**
   - [ ] 2-3 process images
   - [ ] Link to About page

5. **Contact CTA**
   - [ ] Email contact button
   - [ ] Brief text about custom orders

#### Technical Requirements:
- [ ] Use Server Component to fetch featured products
- [ ] Image optimization with next/image
- [ ] Smooth scroll animations
- [ ] SEO meta tags
- [ ] Responsive design

---

### 5.2 Catalogue Page (`/[locale]/catalogue/page.tsx`)

#### Components to Build:
1. **Page Header**
   - [ ] Title and subtitle (translated)

2. **Filter System**
   - [ ] Category filters (All, Tables, Chairs, Cabinets, Custom)
   - [ ] Wood type filters (All, Oak, Walnut, Pine, Mixed)
   - [ ] Active filter indicators
   - [ ] Clear filters button

3. **Product Grid**
   - [ ] Fetch all published products from Supabase
   - [ ] Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
   - [ ] Product cards with image, name, category, wood type, description
   - [ ] Hover effects
   - [ ] Click to view images in modal (optional)

#### Technical Requirements:
- [ ] Server Component fetches products
- [ ] Client Component handles filtering
- [ ] Only `status = 'published'` products visible
- [ ] ISR (Incremental Static Regeneration) with 60-second revalidation
- [ ] Image lazy loading

---

### 5.3 About & Contact Page (`/[locale]/about/page.tsx`)

#### Components to Build:
1. **Company Introduction**
   - [ ] Business overview
   - [ ] Founded 2025, Sofia, Bulgaria
   - [ ] Mission statement

2. **Craftsmanship Process Section**
   - [ ] 5 steps with icons/images and descriptions
   - [ ] Timeline/flow design

3. **Why Choose Us**
   - [ ] 4 key differentiators with icons

4. **Contact Section**
   - [ ] Email button (mailto:info@artisanwoodworks.com - placeholder)# Workflow - Artisan Woodworks Website

## Project Overview
Build a luxury, elegant bilingual (EN/BG) website for Artisan Woodworks, a handcrafted furniture business based in Sofia, Bulgaria. The site will showcase custom furniture pieces to attract B2C customers (individuals, companies, restaurants, hotels).

**Project Directory:** `C:/projects/artisan_woodworks`  
**All work must be done within this directory.**

---

## Phase 0: Pre-Development - Read Project Context

**Before starting any development work, read these files in order:**

1. [ ] Read `project_documentation/rules.md` - Development rules and constraints
2. [ ] Read `entry_data/project_description.md` - Overall project context and business overview
3. [ ] Read `entry_data/user_identification.md` - Target users, personas, and user stories
4. [ ] Read `entry_data/functionalities_description.md` - Features, requirements, and functionality specs
5. [ ] Read `entry_data/ui_ux_description.md` - Design guidelines, brand identity, and UX requirements

**These files contain essential context for all development decisions. Do not proceed to Phase 1 without reading them.**

---

## Phase 1: Project Setup

### 1.1 Initialize Next.js Project
- [ ] Navigate to `C:/projects/artisan_woodworks`
- [ ] Create Next.js 14+ project with TypeScript
- [ ] Set up project structure following Next.js App Router conventions
- [ ] Configure Tailwind CSS for styling
- [ ] Set up ESLint and Prettier
- [ ] Initialize Git repository (via Git MCP)
- [ ] Create initial commit

### 1.2 Install Dependencies
```bash
# Core dependencies
- next-intl (for bilingual support EN/BG)
- lucide-react (for icons)
- clsx / tailwind-merge (for utility classes)

# Optional but recommended
- next/image optimization
- react-intersection-observer (for scroll animations)
```

### 1.3 Project Structure
```
artisan-woodworks/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx (Home)
│   │   ├── catalogue/page.tsx
│   │   ├── about/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── FeaturedProducts.tsx
│       ├── ProcessShowcase.tsx
│       └── ContactCTA.tsx
├── lib/
│   ├── data/
│   │   ├── products.ts
│   │   └── translations.ts
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── products/
│   │   ├── process/
│   │   └── hero/
│   └── icons/
├── messages/
│   ├── en.json
│   └── bg.json
├── entry_data/ (READ THESE IN PHASE 0)
│   ├── project_description.md
│   ├── user_identification.md
│   ├── functionalities_description.md
│   └── ui_ux_description.md
├── project_documentation/
│   ├── workflow.md (this file - READ IN PHASE 0)
│   ├── rules.md (READ FIRST IN PHASE 0)
│   ├── errors.md (track errors here during development)
│   └── memo.md (project notes and decisions)
└── package.json
```

---

## Phase 2: Design System & Styling

### 2.1 Tailwind Configuration
- [ ] Configure color palette:
  - Primary: Wood tones (#D4A574, #8B6F47)
  - Neutral: Black (#000000), White (#FFFFFF)
  - Accent: Natural browns and creams
  - Avoid: Pastel colors
- [ ] Set up typography (elegant serif for headings, clean sans-serif for body)
- [ ] Configure spacing scale
- [ ] Add custom box shadows for depth

### 2.2 Component Library
- [ ] Create reusable Button component (primary, secondary, outline variants)
- [ ] Create Card component for product displays
- [ ] Create responsive image containers
- [ ] Create social media icon buttons (Instagram, Facebook - unlinked)

### 2.3 Design Tokens
```typescript
// colors: black, white, wood-yellow, natural browns
// fonts: Elegant serif (Playfair Display?) + Clean sans (Inter/Outfit?)
// spacing: Generous whitespace for luxury feel
// borders: Subtle, minimal
// shadows: Soft, natural
```

---

## Phase 3: Internationalization Setup

### 3.1 Configure next-intl
- [ ] Set up locale detection and routing
- [ ] Create translation files (messages/en.json, messages/bg.json)
- [ ] Implement language switcher component in header
- [ ] Configure default locale (English)

### 3.2 Translation Structure
```json
{
  "nav": { "home": "", "catalogue": "", "about": "" },
  "home": { "hero": {}, "featured": {} },
  "catalogue": { "title": "", "filters": {} },
  "about": { "title": "", "process": {} },
  "contact": { "email": "", "cta": {} },
  "footer": { "tagline": "", "legal": {} }
}
```

---

## Phase 4: Core Pages Development

### 4.1 Home Page (`/[locale]/page.tsx`)

#### Components to Build:
1. **Hero Section**
   - [ ] Full-width hero image (crafted furniture in elegant setting)
   - [ ] Overlay with business name "Artisan Woodworks"
   - [ ] Tagline about handcrafted luxury
   - [ ] CTA button to Catalogue
   - [ ] Smooth scroll indicator

2. **Brand Story Snippet**
   - [ ] 2-3 sentences about craftsmanship
   - [ ] Link to full About page
   - [ ] Background with subtle wood texture

3. **Featured Products (3 items)**
   - [ ] Grid layout (3 columns on desktop, 1 on mobile)
   - [ ] Product cards with:
     - High-quality image
     - Product name
     - Brief description (1 line)
     - "View Details" link to catalogue
   - [ ] Hover effects (subtle zoom/shadow)

4. **Craftsmanship Teaser**
   - [ ] 2-3 process images in a row
   - [ ] "Our Process" heading
   - [ ] Link to About page

5. **Contact CTA**
   - [ ] Email contact button (mailto:)
   - [ ] "Get in Touch" heading
   - [ ] Brief text about custom orders

#### Technical Requirements:
- [ ] Responsive design (mobile-first)
- [ ] Image optimization with next/image
- [ ] Smooth scroll animations on scroll
- [ ] SEO meta tags

---

### 4.2 Catalogue Page (`/[locale]/catalogue/page.tsx`)

#### Components to Build:
1. **Page Header**
   - [ ] Title: "Our Collection" (translated)
   - [ ] Subtitle about custom pieces

2. **Filter System**
   - [ ] Dropdown/buttons for categories:
     - All Products
     - Tables
     - Chairs
     - Cabinets
     - Custom Pieces
   - [ ] Wood type filters:
     - Oak
     - Walnut
     - Pine
     - Mixed
   - [ ] Active filter indicators
   - [ ] Clear filters button

3. **Product Grid**
   - [ ] Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
   - [ ] Product cards showing:
     - Primary image
     - Product name
     - Wood type
     - Brief description (2 lines)
     - Category tag
   - [ ] Hover state with image zoom
   - [ ] Click to expand modal/detail view (optional)

4. **Product Detail Modal (if applicable)**
   - [ ] Image gallery (2-3 images per product)
   - [ ] Full description
   - [ ] Dimensions (if applicable)
   - [ ] Wood type and finish
   - [ ] "Contact for Quote" button

#### Technical Requirements:
- [ ] Client-side filtering logic
- [ ] Smooth filter transitions
- [ ] Image lazy loading
- [ ] Alt text for accessibility

#### Initial Products Data Structure:
```typescript
interface Product {
  id: string;
  name: { en: string; bg: string };
  category: 'table' | 'chair' | 'cabinet' | 'custom';
  woodType: 'oak' | 'walnut' | 'pine' | 'mixed';
  description: { en: string; bg: string };
  images: string[]; // 2-3 placeholder images
  featured: boolean;
}
```

---

### 4.3 About & Contact Page (`/[locale]/about/page.tsx`)

#### Components to Build:
1. **Company Introduction**
   - [ ] Brief business overview
   - [ ] Founded 2025, Sofia, Bulgaria
   - [ ] Mission statement (quality, craftsmanship, custom work)

2. **Craftsmanship Process Section**
   - [ ] Step-by-step visual breakdown:
     1. Design & Consultation
     2. Material Selection
     3. Handcrafting
     4. Finishing & Quality Check
     5. Delivery
   - [ ] Each step with:
     - Icon or image
     - Title
     - 2-3 sentence description
   - [ ] Timeline/flow design

3. **Why Choose Us**
   - [ ] 3-4 key differentiators:
     - Handcrafted quality
     - Custom designs
     - Premium materials
     - Local Sofia craftsmanship
   - [ ] Icon + text format

4. **Contact Section**
   - [ ] Email button (mailto:)
   - [ ] Placeholder text: "Email us at: [email to be set up]"
   - [ ] Social media buttons (Instagram, Facebook - unlinked with # href)
   - [ ] Note: "Follow us on social media" (icons only)
   - [ ] Location: Sofia, Bulgaria (no detailed address needed)

#### Technical Requirements:
- [ ] Process section with scroll-triggered animations
- [ ] Smooth transitions between sections
- [ ] Contact button with clear CTA

---

## Phase 5: Layout Components

### 5.1 Header/Navigation
- [ ] Logo/Business name "Artisan Woodworks"
- [ ] Navigation links: Home | Catalogue | About & Contact
- [ ] Language switcher (EN/BG flag icons)
- [ ] Mobile hamburger menu
- [ ] Sticky header on scroll
- [ ] Transparent header on homepage hero, solid on other pages

### 5.2 Footer
- [ ] Business name and tagline
- [ ] Quick links (Home, Catalogue, About)
- [ ] Social media icons (Instagram, Facebook - unlinked)
- [ ] Location: Sofia, Bulgaria
- [ ] Links to Privacy Policy & Terms (coming from templates)
- [ ] Copyright © 2025 Artisan Woodworks
- [ ] Email placeholder

---

## Phase 6: Legal Pages (Templates)

### 6.1 Privacy Policy (`/[locale]/privacy/page.tsx`)
- [ ] Create simple template with:
  - What data we collect (email inquiries)
  - How we use it (respond to inquiries)
  - Data storage (not stored, direct email)
  - User rights (GDPR compliant basics)
  - Contact for questions
- [ ] Bilingual content

### 6.2 Terms & Conditions (`/[locale]/terms/page.tsx`)
- [ ] Create simple template with:
  - Website usage terms
  - Intellectual property (images, content)
  - Disclaimer (product images may vary)
  - Limitation of liability
  - Governing law (Bulgaria)
- [ ] Bilingual content

---

## Phase 7: Content Integration

### 7.1 Placeholder Images
- [ ] Generate/source 10-15 high-quality placeholder images:
  - 3 hero images (luxury furniture in elegant settings)
  - 6-9 product images (tables, chairs, cabinets)
  - 3-5 process images (workshop, crafting, materials)
- [ ] Optimize images for web (WebP format, responsive sizes)
- [ ] Ensure images reflect luxury, natural, elegant aesthetic

### 7.2 Copy/Text Content
- [ ] Write all English content (about 1000-1500 words total):
  - Homepage hero + sections
  - Catalogue intro + product descriptions
  - About page (company story, process steps)
  - Contact CTAs
- [ ] Translate to Bulgarian or mark for translation
- [ ] Ensure tone is professional, warm, inspiring

### 7.3 Sample Products Data
- [ ] Create 2-3 initial products:
  1. Oak Dining Table (custom, oak)
  2. Walnut Coffee Table (table, walnut)
  3. Pine Cabinet (cabinet, pine)
- [ ] Each with name, description, wood type, category, 2-3 images

---

## Phase 8: Functionality & Interactivity

### 8.1 Catalogue Filtering
- [ ] Implement category filter logic
- [ ] Implement wood type filter logic
- [ ] Combine multiple filters (e.g., Oak + Tables)
- [ ] Update URL params for filter state (optional)
- [ ] Show "No products found" state

### 8.2 Email Integration
- [ ] Set up mailto: links with subject pre-fill:
  - `mailto:info@artisanwoodworks.com?subject=Inquiry%20from%20Website`
- [ ] Add hover states to email buttons
- [ ] Consider adding copy-to-clipboard functionality

### 8.3 Social Media Placeholders
- [ ] Instagram button: `<a href="#" aria-label="Instagram">`
- [ ] Facebook button: `<a href="#" aria-label="Facebook">`
- [ ] Add visual indication these are not yet active (optional)

### 8.4 Animations & Interactions
- [ ] Smooth scroll between sections
- [ ] Fade-in animations on scroll (Intersection Observer)
- [ ] Hover effects on product cards
- [ ] Smooth page transitions
- [ ] Loading states

---

## Phase 9: Optimization & SEO

### 9.1 Performance
- [ ] Optimize images (next/image, WebP, lazy loading)
- [ ] Minimize bundle size
- [ ] Code splitting for routes
- [ ] Lighthouse audit (target 90+ performance)

### 9.2 SEO Basics
- [ ] Meta tags for each page (title, description)
- [ ] Open Graph tags for social sharing
- [ ] Semantic HTML (proper heading hierarchy)
- [ ] Alt text for all images
- [ ] robots.txt
- [ ] sitemap.xml

### 9.3 Accessibility
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Focus states visible
- [ ] Color contrast compliance (WCAG AA)
- [ ] Screen reader testing

---

## Phase 10: Testing & Quality Assurance

### 10.1 Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 10.2 Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Large desktop (1920px+)

### 10.3 Functionality Testing
- [ ] All navigation links work
- [ ] Language switcher works correctly
- [ ] Catalogue filters work
- [ ] Email links work (mailto:)
- [ ] All images load
- [ ] No console errors

### 10.4 Content Review
- [ ] All text translated correctly
- [ ] No placeholder text remaining (or clearly marked)
- [ ] Brand voice consistent
- [ ] No spelling/grammar errors

---

## Phase 11: Deployment Preparation

### 11.1 Build Configuration
- [ ] Configure environment variables (if any)
- [ ] Set up production build
- [ ] Test production build locally
- [ ] Optimize for static export (if applicable)

### 11.2 Git Setup & Version Control
**Claude Code has full access to Git via MCP (Model Context Protocol)**

- [ ] Initialize Git repository
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Artisan Woodworks website"
  ```
- [ ] Create GitHub repository using Git MCP
- [ ] Push code to GitHub
  ```bash
  git branch -M main
  git remote add origin <repository-url>
  git push -u origin main
  ```
- [ ] Set up branch strategy:
  - `main` - Production code
  - `develop` - Development branch (optional)
  - Feature branches as needed

### 11.3 Vercel Deployment
**Claude Code has full access to Vercel via MCP (Model Context Protocol)**

**Deployment Process:**
- [ ] Connect GitHub repository to Vercel using Vercel MCP
- [ ] Configure build settings (Next.js auto-detected):
  - Build Command: `next build`
  - Output Directory: `.next`
  - Install Command: `npm install`
- [ ] Set up environment variables in Vercel (if needed):
  ```
  NEXT_PUBLIC_SITE_URL=https://artisan-woodworks.vercel.app
  ```
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test live site thoroughly

**Continuous Deployment:**
- Every push to `main` branch auto-deploys to production
- Preview deployments available for feature branches
- Easy rollbacks available if issues arise

### 11.4 Domain Configuration (Future)
- [ ] When client provides domain name:
  - Configure custom domain in Vercel
  - Set up DNS records
  - Enable SSL certificate (automatic with Vercel)
  - Configure www vs non-www redirects

### 11.5 Post-Launch
- [ ] Set up analytics (Google Analytics or similar)
  - Track page views
  - Track email click-throughs
  - Monitor time on site
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Monitor Vercel deployment logs
- [ ] Document deployment process in `memo.md`
- [ ] Provide client with:
  - Vercel dashboard access
  - GitHub repository access
  - Analytics dashboard access
  - List of placeholder items to replace

---

## Success Metrics

### Primary KPI
- **Email inquiries per month** - Track via email client or analytics

### Secondary Metrics
- Page views per month
- Average session duration
- Bounce rate
- Catalogue page engagement
- Mobile vs desktop traffic split

---

## Future Enhancements (Post-Launch)
- Contact form instead of mailto:
- Product detail pages with full galleries
- Customer testimonials section
- Blog for SEO (craftsmanship stories, wood care tips)
- E-commerce functionality
- Booking system for consultations
- Newsletter signup
- Instagram feed integration (when account active)

---

## Notes for Claude Code

1. **Design Philosophy**: Clean, simple, luxury aesthetic. Generous whitespace, high-quality images, minimal text. Think "high-end furniture showroom."

2. **Color Usage**: Stick to black, white, and natural wood tones. No bright colors. Soft shadows and natural gradients only.

3. **Typography**: Use elegant serif for headings (conveys craftsmanship), clean sans-serif for body (modern, readable).

4. **Image Treatment**: Always use high-quality images. Consider subtle overlays or borders to maintain luxury feel. Images should breathe (padding around them).

5. **Mobile-First**: Ensure mobile experience is excellent. Most B2C traffic will be mobile.

6. **Bilingual Considerations**: Keep text concise for easier translation. Ensure layout works for both EN/BG text lengths.

7. **Performance**: Site must load fast. Luxury feel should not compromise on speed.

8. **Email Contact**: Emphasize email as the primary contact method. Make it prominent and easy to find.

9. **Social Proof**: Since this is a new business (2025), focus on craftsmanship quality over testimonials (which don't exist yet).

10. **Scalability**: Build with future e-commerce in mind, but don't implement it now. Structure data/components to allow easy addition later.

11. **Git & Vercel Access**: You have full access to Git and Vercel via MCP. Use Git for version control throughout development, and deploy to Vercel when ready.

12. **Continuous Deployment**: Once deployed to Vercel, every push to main branch will auto-deploy. Use this for iterative improvements and testing.

---

## Reference Documents (Read in Phase 0)
- `project_documentation/rules.md` - Development rules and constraints
- `project_documentation/workflow.md` - This file, step-by-step development guide
- `entry_data/project_description.md` - Overall project context and business overview
- `entry_data/user_identification.md` - Target users, personas, and user stories
- `entry_data/functionalities_description.md` - Features, requirements, and functionality specs
- `entry_data/ui_ux_description.md` - Design guidelines, brand identity, and UX requirements

## Documentation During Development
- `project_documentation/errors.md` - Log any errors encountered during development
- `project_documentation/memo.md` - Project notes, decisions, and important information