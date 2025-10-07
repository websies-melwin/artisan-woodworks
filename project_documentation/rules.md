- Responsive on all devices
- Generous whitespace
- Luxury aesthetic maintained

**Admin Panel Standards:**
- Functional and easy to use
- Clear labels and instructions
- Obvious buttons and actions
- Good contrast and readability
- Responsive on desktop and tablet
- Fast and efficient

---

## Scope Management

### In Scope (Build These)

✅ 3 public pages: Home, Catalogue, About & Contact  
✅ Bilingual support (EN/BG) for public site  
✅ Product catalogue with filtering (database-driven)  
✅ Email contact integration  
✅ Social media icon links  
✅ Privacy policy & terms templates  
✅ Responsive design  
✅ SEO optimization  
✅ **Admin Panel with full CMS:**  
  - Admin login (Supabase Auth)
  - Dashboard with stats
  - Product list (all statuses)
  - Add new product form
  - Edit product form
  - Delete product (with confirmation)
  - Quick status change
  - Image upload (max 10 per product)
  - Video upload (optional, 1 per product)
  - Rich text editor (Tiptap) for descriptions
  - Image reordering
✅ **Supabase Integration:**  
  - Database (PostgreSQL)
  - Authentication
  - Storage (images and videos)
  - Row Level Security
✅ **Deployment:**  
  - Git integration (via MCP)
  - Vercel deployment (via MCP)
  - Continuous deployment

---

### Out of Scope (Do NOT Build)

❌ Public user accounts/login  
❌ E-commerce/shopping cart  
❌ Payment processing  
❌ Booking system  
❌ Blog/CMS for public content  
❌ Customer reviews  
❌ Live chat  
❌ Newsletter signup  
❌ Public search functionality (filtering only)  
❌ Product detail pages (beyond catalogue cards/modal)  
❌ Wishlist/favorites  
❌ Social media feeds (only icon links)  
❌ Public contact forms (email links only)  
❌ Price display (inquiry-based)  
❌ Inventory tracking  

**If asked to add out-of-scope features, note in memo.md for future phases.**

---

## Communication

### Questions or Blockers

**When you have questions:**
1. Check documentation files first
2. If still unclear, document question in `memo.md`
3. Make a reasonable decision and document it
4. Continue with development

**When you encounter blockers:**
1. Log error in `errors.md`
2. Document blocker in `memo.md`
3. Attempt solutions
4. If unresolved, clearly state what's needed to proceed

---

## Supabase-Specific Rules

### 42. Database Schema

**Never modify the database schema directly via Supabase dashboard during development.**

**If schema changes are needed:**
1. Document the change in `memo.md`
2. Create a migration SQL file
3. Test on development database first
4. Apply to production after testing

**Current Schema is FINAL:**
- profiles table
- products table
- product_images table
- product_videos table

**Don't add new tables or columns without approval.**

---

### 43. Storage Buckets

**Don't create new buckets.** Use existing:
- `product-images` - For all product images
- `product-videos` - For all product videos

**Bucket Rules:**
- Both are public (safe for product media)
- Use proper folder structure: `{product-id}/{filename}`
- Delete files when deleting products
- Clean up orphaned files if database insert fails

---

### 44. RLS Policy Testing

**Before deploying, verify RLS policies:**

Test as unauthenticated user:
- ✅ Can view published products
- ❌ Cannot view hidden products
- ❌ Cannot view sold products
- ❌ Cannot insert/update/delete products
- ✅ Can view images of published products
- ❌ Cannot view images of hidden/sold products

Test as authenticated admin:
- ✅ Can view all products (any status)
- ✅ Can insert new products
- ✅ Can update any products
- ✅ Can delete any products
- ✅ Can manage all images and videos

**If RLS policies don't work as expected, log in errors.md and fix before deploying.**

---

## Admin Panel Specific Rules

### 45. Form Validation

**All admin forms must have validation:**

```typescript
import { z } from 'zod'

const productSchema = z.object({
  name_en: z.string().min(1, 'English name is required').max(200),
  name_bg: z.string().min(1, 'Bulgarian name is required').max(200),
  category: z.enum(['table', 'chair', 'cabinet', 'custom']),
  wood_type: z.enum(['oak', 'walnut', 'pine', 'mixed']),
  description_en: z.string().min(10, 'Description must be at least 10 characters'),
  description_bg: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['published', 'hidden', 'sold']).default('hidden'),
  featured: z.boolean().default(false),
})
```

**Show validation errors:**
- Inline below each field
- Clear, helpful error messages
- Not technical jargon

---

### 46. Loading States

**All async operations must have loading states:**

```typescript
const [loading, setLoading] = useState(false)

async function handleSubmit() {
  setLoading(true)
  try {
    await createProduct(formData)
  } finally {
    setLoading(false)
  }
}

return (
  
    {loading ? 'Saving...' : 'Save Product'}
  
)
```

**RULES:**
- Disable buttons during loading
- Show loading text or spinner
- Don't let users submit twice
- Re-enable after completion or error

---

### 47. Success/Error Messages

**All actions need feedback:**

```typescript
// Success
toast.success('Product created successfully!')

// Error
toast.error('Failed to create product. Please try again.')
```

**RULES:**
- Success messages in green
- Error messages in red
- Auto-dismiss after 5 seconds (success)
- Keep error messages until dismissed (errors)
- Be specific about what succeeded/failed

---

### 48. Confirmation Dialogs

**Destructive actions need confirmation:**

```typescript
function deleteProduct(id: string) {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    // Proceed with deletion
  }
}
```

**Require confirmation for:**
- Deleting products
- Changing status to "sold"
- Removing images/videos (optional)
- Canceling with unsaved changes (optional)

---

### 49. Image Upload UX

**Make image upload intuitive:**

**Features:**
- Drag and drop zone with visual feedback
- File picker button as alternative
- Preview thumbnails immediately after selection
- Progress bar during upload
- Remove button on each image
- Drag to reorder (updates display_order)
- Show current count (e.g., "8 of 10 images")
- Disable add button at 10 images

**Validation feedback:**
- File type rejected: "Only JPEG, PNG, and WebP images are allowed"
- File too large: "Image must be less than 5MB"
- Too many files: "Maximum 10 images per product"

---

### 50. Rich Text Editor (Tiptap)

**Keep it simple:**

**Toolbar buttons:**
- Bold
- Italic
- Underline
- Heading 2
- Heading 3
- Bullet list
- Numbered list
- Link
- Clear formatting

**Don't add:**
- Image upload (images are separate)
- Tables (too complex for product descriptions)
- Code blocks (not needed)
- Custom fonts/colors (maintain consistency)

**RULES:**
- Save as HTML
- Strip dangerous HTML tags on server (if needed)
- Test output on public site
- Ensure it works for both EN and BG

---

## Data Integrity Rules

### 51. Cascade Deletes

**Deleting a product must delete all related data:**

When deleting a product:
1. Delete product record (database CASCADE handles images/videos)
2. Delete image files from Storage
3. Delete video file from Storage (if exists)
4. Revalidate catalogue page

**Server Action structure:**
```typescript
export async function deleteProduct(id: string) {
  // 1. Get product with images/videos
  // 2. Delete from database (CASCADE to images/videos tables)
  // 3. Delete files from Storage
  // 4. Revalidate path
}
```

---

### 52. Orphaned Files

**Prevent orphaned files in Storage:**

If database insert fails after file upload:
- Delete uploaded files from Storage
- Don't leave files without database records
- Handle in try-catch blocks

```typescript
let uploadedUrls: string[] = []
try {
  // Upload files
  uploadedUrls = await uploadImages(files, productId)
  
  // Insert into database
  await insertProduct(data)
} catch (error) {
  // Clean up uploaded files
  await deleteFiles(uploadedUrls)
  throw error
}
```

---

### 53. Display Order

**Images must maintain correct display_order:**

- First image: display_order = 0
- Second image: display_order = 1
- Third image: display_order = 2
- etc.

**When reordering:**
- Update all display_order values
- Update in database
- Ensure no gaps in sequence

**When deleting image:**
- Recalculate display_order for remaining images
- Ensure sequence starts at 0

---

## Performance Monitoring

### 54. Monitor These Metrics

**Track in production:**
- Lighthouse scores (weekly)
- Page load times (Core Web Vitals)
- Error rates (Vercel/Supabase dashboards)
- Database query performance
- Storage usage
- Bandwidth usage

**Set up alerts for:**
- Error rate > 5%
- Page load time > 3 seconds
- Database queries > 1 second
- Storage > 80% of limit

---

## Backup & Recovery

### 55. Supabase Backups

**Supabase automatically backs up database daily.**

**In case of data loss:**
1. Contact Supabase support
2. Request restore from backup
3. Document incident in memo.md

**Best practices:**
- Don't rely only on automatic backups
- Periodically export products data (CSV or JSON)
- Keep backup of environment variables
- Document all configuration changes

---

## Summary

These rules ensure the Artisan Woodworks website is built to high standards of **quality, security, performance, accessibility, and maintainability**. Following these rules is not optional—they represent the requirements for successful project completion.

**Key Reminders:**
1. Read all documentation first
2. Follow the workflow
3. Log errors and decisions
4. Write clean, typed, accessible code
5. Test thoroughly (public site AND admin panel)
6. Stay within scope
7. Maintain luxury aesthetic on public site
8. Keep admin panel simple and functional
9. Use correct Supabase client for each context
10. Validate input on both client and server
11. Handle errors gracefully
12. Provide feedback for all actions
13. Test as both public user and admin
14. Respect Row Level Security policies

**When in doubt:**
- Refer to entry_data files for context
- Refer to these rules for technical guidance
- Document questions in memo.md
- Make reasonable decisions and move forward

**This is a full-stack application with:**
- Public bilingual site (luxury aesthetic)
- Admin CMS (functional, easy to use)
- Supabase backend (database, auth, storage)
- Next.js framework (Server Components, Server Actions)
- Vercel deployment (continuous deployment)

**Build it well, test it thoroughly, deploy it confidently.** 🚀## Data Fetching & Caching Rules

### 12. Server Components (Default)

**Use Server Components by default** - they fetch data on the server and are faster.

```typescript
// app/[locale]/catalogue/page.tsx
export default async function CataloguePage() {
  const products = await getPublishedProducts() // Server Action
  
  return 
}
```

**RULES:**
- Fetch data in Server Components when possible
- Use `async/await` syntax
- Handle errors with try-catch
- No need for useState or useEffect for initial data

---

### 13. Client Components (When Needed)

**Use Client Components only when you need:**
- Interactivity (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- React hooks (useState, useEffect, etc.)
- Event listeners

```typescript
'use client'

export default function ProductFilter({ products }: Props) {
  const [filtered, setFiltered] = useState(products)
  // ... filtering logic
}
```

**RULES:**
- Add `'use client'` directive at top of file
- Keep client components small and focused
- Pass data from Server Components as props
- Don't fetch data in client components if avoidable

---

### 14. Caching Strategy

**Public Site:**
- Homepage: Static generation + ISR (revalidate every 60 seconds)
- Catalogue: ISR (revalidate every 60 seconds)
- About: Static (no revalidation needed)

**Admin Panel:**
- No caching (always fresh data)
- Use `revalidatePath` after mutations

```typescript
// After creating/updating/deleting product
revalidatePath('/[locale]/catalogue')
revalidatePath('/admin/products')
```

**RULES:**
- Use ISR for public pages with dynamic content
- Revalidate paths after database mutations
- Admin panel should always show fresh data
- Don't cache authenticated routes

---

## Security Rules

### 15. Input Validation

**Validate ALL user input on both client and server.**

**Client-side (immediate feedback):**
```typescript
import { z } from 'zod'

const productSchema = z.object({
  name_en: z.string().min(1, 'Name is required').max(200),
  name_bg: z.string().min(1, 'Name is required').max(200),
  category: z.enum(['table', 'chair', 'cabinet', 'custom']),
  // ... etc
})
```

**Server-side (security):**
```typescript
'use server'

export async function createProduct(formData: unknown) {
  const validated = productSchema.parse(formData) // Throws if invalid
  // ... proceed with validated data
}
```

**RULES:**
- Never trust client-side validation alone
- Use Zod or similar for validation
- Sanitize HTML input (Tiptap output)
- Validate file uploads (type, size)
- Check user permissions on server

---

### 16. SQL Injection Prevention

**Supabase handles SQL injection protection automatically.**

**DO use:**
```typescript
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId) // Safe - parameterized
```

**DON'T use:**
```typescript
// Never use raw SQL with user input
const { data } = await supabase.rpc('unsafe_query', {
  sql: `SELECT * FROM products WHERE id = '${productId}'` // ❌ NEVER DO THIS
})
```

---

### 17. XSS Prevention

**React handles XSS protection automatically** - it escapes content by default.

**Safe:**
```typescript
{userInput} // Automatically escaped
```

**Dangerous (when using HTML from Tiptap):**
```typescript

```

**RULES:**
- Only use `dangerouslySetInnerHTML` for trusted content (admin-created descriptions)
- Never use it for user-generated content from public users
- Tiptap output is safe because it's created by authenticated admins

---

### 18. File Upload Security

**Validate files thoroughly:**

```typescript
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type')
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('File too large')
  }
}
```

**RULES:**
- Validate file type (whitelist, not blacklist)
- Validate file size
- Generate unique filenames (prevent overwriting)
- Store in public buckets (safe for product images)
- Delete from storage if database insert fails

---

## Design System Rules

### 19. Colors (Public Site)

**MUST USE:**
- Primary: `#000000` (black), `#FFFFFF` (white)
- Accent: `#D4A574` (wood yellow), `#8B6F47` (wood brown)
- Grays: `#F5F5F4`, `#A8A29E`, `#44403C`, `#1C1917`

**NEVER USE:**
- Bright colors (neon, saturated primaries)
- Pastel colors (pink, baby blue, mint green)
- Cool tones (blues, purples) unless very muted

**Implementation:**
```typescript
// tailwind.config.ts
colors: {
  'wood-yellow': '#D4A574',
  'wood-brown': '#8B6F47',
  'wood-dark': '#6B5444',
}
```

---

### 20. Colors (Admin Panel)

**Admin panel can use more utilitarian colors:**
- Success: Green (#10B981)
- Warning: Yellow/Orange (#F59E0B)
- Danger: Red (#EF4444)
- Info: Blue (#3B82F6)

**Status Badge Colors:**
- Published: Green background
- Hidden: Yellow/Orange background
- Sold: Red background

**RULES:**
- Prioritize clarity over aesthetics in admin
- Use color to communicate status
- Ensure sufficient contrast for readability

---

### 21. Typography

**Font Families:**
- **Headings (Public):** Serif font (e.g., Playfair Display, Cormorant Garamond)
- **Body (Public):** Sans-serif font (e.g., Inter, Outfit, DM Sans)
- **Admin Panel:** Sans-serif throughout for readability

**RULES:**
- Use semantic HTML headings (h1, h2, h3) in proper hierarchy
- Only ONE h1 per page
- Line height: 1.2 for headings, 1.6 for body text
- Never use more than 2 font families on public site

---

### 22. Spacing

**Follow Tailwind's spacing scale:**
- Use generous whitespace on public site
- Mobile: 16-24px between elements
- Desktop: 24-48px between elements
- Sections: 64-96px spacing

**Rule:** When in doubt, add MORE whitespace on public site. Luxury brands never feel cramped.

**Admin panel:** Can use tighter spacing for efficiency.

---

### 23. Images

**Requirements:**
- Always use Next.js `next/image` component
- Provide alt text for every image
- Use proper width and height
- Implement lazy loading for below-fold images

**Public Site Images:**
- Hero: 1920x1080px minimum
- Products: 1200x900px (4:3 ratio)
- Process: 800x600px

**Admin Panel Images:**
- Thumbnails: 200x150px
- Previews: 400x300px

**RULES:**
- Never use `<img>` tags directly
- Always include `alt` attribute
- Optimize images before upload
- Use WebP format when possible

---

## Code Quality Rules

### 24. TypeScript

**Strict Mode:**
- Enable strict TypeScript checking
- No `any` types (use `unknown` if needed)
- Define proper interfaces for all data structures
- Export types for reusability

**Example:**
```typescript
interface Product {
  id: string
  name_en: string
  name_bg: string
  category: 'table' | 'chair' | 'cabinet' | 'custom'
  wood_type: 'oak' | 'walnut' | 'pine' | 'mixed'
  description_en: string
  description_bg: string
  status: 'published' | 'hidden' | 'sold'
  featured: boolean
  images: ProductImage[]
  video?: ProductVideo
}
```

**RULES:**
- Use interfaces for data structures
- Use types for unions and utilities
- Enable strict mode in tsconfig.json
- Fix all TypeScript errors before committing

---

### 25. Component Structure

**React Components:**
- Use functional components with hooks
- One component per file
- Named exports for utilities, default export for components
- Props interfaces defined at top of file

**File Naming:**
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Server Actions: `camelCase.ts` (e.g., `products.ts`)

**Component Structure:**
```typescript
import { ... } from '...'

interface ComponentProps {
  // Props interface
}

export default function ComponentName({ props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

---

### 26. Styling

**Tailwind CSS Rules:**
- Use Tailwind utility classes, NOT custom CSS
- Use `clsx` or `cn()` helper for conditional classes
- Keep className strings readable (break long lists)
- Mobile-first responsive design

**Avoid:**
- Inline styles
- External CSS files (except globals.css)
- `!important` declarations

**Example:**
```typescript

  Contact Us

```

---

### 27. Internationalization

**i18n Rules:**
- All user-facing text MUST be translatable on public site
- Use translation keys, never hardcoded text (public site)
- Organize translations by page/section
- Provide both EN and BG translations for public site
- Admin panel can be English-only

**Structure:**
```json
// messages/en.json
{
  "nav": {
    "home": "Home",
    "catalogue": "Catalogue",
    "about": "About & Contact"
  },
  "home": {
    "hero": {
      "title": "Artisan Woodworks",
      "subtitle": "Handcrafted Furniture"
    }
  }
}
```

**Usage:**
```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('nav')
return {t('home')}
```

**RULES:**
- Public site: All text must be translated
- Admin panel: Can be English-only for simplicity
- Test both languages thoroughly on public site
- Ensure layout works for both EN and BG text lengths

---

## Performance Rules

### 28. Image Optimization

**Requirements:**
- Use `next/image` with proper width/height
- Implement lazy loading
- Use WebP format with fallbacks
- Compress images (80-85% quality)

**Example:**
```typescript

```

---

### 29. Bundle Size

**RULES:**
- Keep JavaScript bundle < 300KB (minified, gzipped) - increased for admin features
- Use dynamic imports for heavy components
- Avoid unnecessary dependencies
- Tree-shake unused code

```typescript
// Dynamic import for admin components
const ProductForm = dynamic(() => import('@/components/admin/ProductForm'))
```

---

### 30. Loading Performance

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Page Size: < 3MB per page (increased for admin)

**RULES:**
- Minimize blocking JavaScript
- Defer non-critical CSS
- Preload critical assets
- Use font-display: swap

---

## Accessibility Rules (WCAG 2.1 AA)

### 31. Color Contrast

**Requirements:**
- Normal text (< 18px): Contrast ratio ≥ 4.5:1
- Large text (≥ 18px): Contrast ratio ≥ 3:1
- UI components: Contrast ratio ≥ 3:1

**Test all color combinations before using.**

---

### 32. Semantic HTML

**RULES:**
- Use proper HTML5 elements (`<nav>`, `<main>`, `<header>`, `<footer>`)
- Use `<button>` for clickable elements, NOT `<div>` with onClick
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Use `<article>` for product cards

---

### 33. Keyboard Navigation

**Requirements:**
- All interactive elements must be keyboard accessible
- Visible focus indicators on all focusable elements
- Logical tab order
- No keyboard traps

**Focus Styles:**
```css
focus:outline-2 focus:outline-wood-yellow focus:outline-offset-2
```

---

### 34. Screen Readers

**Requirements:**
- Alt text for all images (descriptive, not "image of...")
- ARIA labels for icon buttons
- `aria-current="page"` for active nav items
- Language attribute on `<html>` tag

**Example:**
```typescript

  

```

---

## Git & Version Control Rules

### 35. Commit Messages

**Format:**
```
type(scope): brief description

Detailed description if needed
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `style`: Styling changes
- `refactor`: Code refactoring
- `docs`: Documentation updates
- `chore`: Build tasks, dependencies

**Examples:**
- `feat(catalogue): add product filtering by wood type`
- `fix(auth): resolve session expiry redirect loop`
- `feat(admin): implement image upload with preview`

---

### 36. Branch Strategy

**Branches:**
- `main`: Production-ready code
- Feature branches: `feature/feature-name` (optional for solo development)

**Workflow:**
1. Make changes
2. Test thoroughly
3. Commit with proper messages
4. Push to main (triggers auto-deploy on Vercel)

---

## Testing Rules

### 37. Manual Testing

**Required Tests (Public Site):**
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Language switcher works correctly
- [ ] Product filtering works correctly
- [ ] Only published products visible
- [ ] Email links open correctly
- [ ] Images load properly from Supabase Storage
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No console errors or warnings

**Required Tests (Admin Panel):**
- [ ] Login works with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Dashboard displays correct stats
- [ ] Product list shows all products
- [ ] Add product form works (all fields, images, video)
- [ ] Edit product form works (update, add/remove images)
- [ ] Delete product works with confirmation
- [ ] Quick status change updates immediately
- [ ] Logout works
- [ ] Protected routes redirect to login

---

### 38. Browser Testing

**Test in:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Test on:**
- Desktop (1920x1080 and 1366x768)
- Tablet (iPad size: 768x1024)
- Mobile (iPhone size: 375x667)

---

### 39. Accessibility Testing

**Tools:**
- WAVE browser extension (no errors)
- Lighthouse audit (accessibility score > 95 for public, > 90 for admin)
- Keyboard navigation (tab through all interactive elements)
- Screen reader test (NVDA or VoiceOver)

---

## Deployment Rules

### 40. Pre-Deployment Checklist

**Before deploying, verify:**
- [ ] All tests pass
- [ ] No console errors
- [ ] All environment variables in `.env.local`
- [ ] Lighthouse scores > 90 (public site)
- [ ] SEO meta tags complete
- [ ] Images optimized
- [ ] Both languages tested (public site)
- [ ] Admin panel fully functional
- [ ] Database operations work
- [ ] File uploads work

---

### 41. Vercel Deployment

**Process:**
1. Push code to GitHub (via Git MCP)
2. Connect repository to Vercel (via Vercel MCP)
3. Configure environment variables in Vercel
4. Deploy to production
5. Test live site thoroughly

**Environment Variables in Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY (mark as sensitive)
NEXT_PUBLIC_SITE_URL
```

---

## Prohibited Practices

### Never Do These:

❌ **Skip reading the documentation files**  
❌ **Work outside `C:/projects/artisan_woodworks`**  
❌ **Use inline styles instead of Tailwind**  
❌ **Hardcode text instead of using translations (public site)**  
❌ **Use `any` type in TypeScript**  
❌ **Skip error logging in errors.md**  
❌ **Use `<img>` instead of `next/image`**  
❌ **Remove focus outlines without replacement**  
❌ **Skip accessibility testing**  
❌ **Use bright or pastel colors (public site)**  
❌ **Add features not in the scope**  
❌ **Deploy without testing**  
❌ **Commit `.env.local` to Git**  
❌ **Skip responsive testing**  
❌ **Use more than 2 font families (public site)**  
❌ **Create cluttered layouts (needs whitespace on public site)**  
❌ **Expose service role key to client**  
❌ **Use client-side Supabase in Server Components**  
❌ **Skip input validation**  
❌ **Trust client-side validation alone**  

---

## Best Practices

### Do These:

✅ **Read all documentation before coding**  
✅ **Follow the workflow sequentially**  
✅ **Log every error in errors.md**  
✅ **Update memo.md with decisions**  
✅ **Use semantic HTML**  
✅ **Write descriptive alt text**  
✅ **Test on multiple devices**  
✅ **Use TypeScript strictly**  
✅ **Keep components small and focused**  
✅ **Optimize all images**  
✅ **Test both languages thoroughly (public site)**  
✅ **Commit frequently with clear messages**  
✅ **Use generous whitespace in public site design**  
✅ **Prioritize accessibility**  
✅ **Keep bundle size small**  
✅ **Use Server Components by default**  
✅ **Validate input on client AND server**  
✅ **Handle errors gracefully**  
✅ **Use correct Supabase client for context**  
✅ **Revalidate paths after mutations**  
✅ **Test admin panel with non-technical user mindset**  

---

## Quality Standards

### Code Quality

**Requirements:**
- TypeScript with strict mode
- ESLint passes with no warnings
- Prettier formatted
- No console.log in production code
- Proper error handling
- All Server Actions have error handling
- All database queries handle errors

---

### Performance

**Lighthouse Targets:**
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

### Design Quality

**Public Site Standards:**
- Consistent spacing throughout
- Proper color contrast
- Professional typography
- High-quality images only
- Smooth animations (200-300ms)
- Responsive on# Development Rules - Artisan Woodworks

## Overview

This document defines the rules, constraints, and best practices for developing the Artisan Woodworks website. **All development work must adhere to these rules.**

---

## Project Context

**Project Directory:** `C:/projects/artisan_woodworks`  
**ALL work must be done within this directory. Never work outside this path.**

**Technology Stack:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- next-intl (internationalization)
- lucide-react (icons)

---

## Critical Rules

### 1. Read Documentation First

**BEFORE writing any code, you MUST read these files in order:**

1. `project_documentation/rules.md` (this file)
2. `entry_data/project_description.md`
3. `entry_data/user_identification.md`
4. `entry_data/functionalities_description.md`
5. `entry_data/ui_ux_description.md`
6. `project_documentation/workflow.md`

**Do not skip this step. These files contain essential context for all development decisions.**

---

### 2. Follow the Workflow

- Work through `project_documentation/workflow.md` sequentially
- Complete each phase before moving to the next
- Check off tasks as you complete them
- If you encounter blockers, document them in `project_documentation/memo.md`

---

### 3. Error Tracking

**Every error encountered must be logged in `project_documentation/errors.md`**

Include:
- Error number and date
- Phase and component where it occurred
- Error type and message
- Solution applied
- Status (Resolved/Pending)

---

### 4. Project Notes

**Use `project_documentation/memo.md` for:**
- Development decisions and rationale
- Important discoveries during development
- Questions that arise
- Client feedback
- Technical notes

**Update memo.md as you work, not just at the end.**

---

## Design System Rules

### Colors

**MUST USE:**
- Primary: `#000000` (black), `#FFFFFF` (white)
- Accent: `#D4A574` (wood yellow), `#8B6F47` (wood brown)
- Grays: `#F5F5F4`, `#A8A29E`, `#44403C`, `#1C1917`

**NEVER USE:**
- Bright colors (neon, saturated primaries)
- Pastel colors (pink, baby blue, mint green)
- Cool tones (blues, purples) unless very muted

**Implementation:**
```typescript
// tailwind.config.ts
colors: {
  'wood-yellow': '#D4A574',
  'wood-brown': '#8B6F47',
  'wood-dark': '#6B5444',
  // ... etc
}
```

---

### Typography

**Font Families:**
- **Headings:** Serif font (e.g., Playfair Display, Cormorant Garamond)
- **Body:** Sans-serif font (e.g., Inter, Outfit, DM Sans)

**Rules:**
- Use semantic HTML headings (h1, h2, h3) in proper hierarchy
- Only ONE h1 per page
- Line height: 1.2 for headings, 1.6 for body text
- Never use more than 2 font families

**Implementation:**
```typescript
// tailwind.config.ts
fontFamily: {
  serif: ['Playfair Display', 'serif'],
  sans: ['Inter', 'sans-serif'],
}
```

---

### Spacing

**Follow Tailwind's spacing scale:**
- Use generous whitespace
- Mobile: 16-24px between elements
- Desktop: 24-48px between elements
- Sections: 64-96px spacing

**Rule:** When in doubt, add MORE whitespace. Luxury brands never feel cramped.

---

### Images

**Requirements:**
- Always use Next.js `next/image` component
- Provide alt text for every image
- Use placeholder images during development
- Optimize for performance (WebP format)

**Image Sizes:**
- Hero: 1920x1080px minimum
- Products: 1200x900px (4:3 ratio)
- Process: 800x600px

**Rules:**
- Never use `<img>` tags directly
- Always include `alt` attribute
- Use lazy loading for below-fold images

---

## Code Quality Rules

### TypeScript

**Strict Mode:**
- Enable strict TypeScript checking
- No `any` types (use `unknown` if needed)
- Define proper interfaces for all data structures
- Export types for reusability

**Example:**
```typescript
interface Product {
  id: string;
  name: { en: string; bg: string };
  category: 'table' | 'chair' | 'cabinet' | 'custom';
  woodType: 'oak' | 'walnut' | 'pine' | 'mixed';
  description: { en: string; bg: string };
  images: string[];
  featured: boolean;
}
```

---

### Component Structure

**React Components:**
- Use functional components with hooks
- One component per file
- Named exports for utilities, default export for components
- Props interfaces defined at top of file

**File Naming:**
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Data files: `camelCase.ts` (e.g., `products.ts`)

**Component Structure:**
```typescript
import { ... } from '...';

interface ComponentProps {
  // Props interface
}

export default function ComponentName({ props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

---

### Styling

**Tailwind CSS Rules:**
- Use Tailwind utility classes, NOT custom CSS
- Use `clsx` or `cn()` helper for conditional classes
- Keep className strings readable (break long lists)
- Mobile-first responsive design

**Avoid:**
- Inline styles
- External CSS files (except globals.css)
- `!important` declarations

**Example:**
```typescript

  Contact Us

```

---

### Internationalization

**i18n Rules:**
- All user-facing text MUST be translatable
- Use translation keys, never hardcoded text
- Organize translations by page/section
- Provide both EN and BG translations

**Structure:**
```json
// messages/en.json
{
  "nav": {
    "home": "Home",
    "catalogue": "Catalogue",
    "about": "About & Contact"
  },
  "home": {
    "hero": {
      "title": "Artisan Woodworks",
      "subtitle": "Handcrafted Furniture"
    }
  }
}
```

**Usage:**
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('nav');
return {t('home')};
```

---

## Performance Rules

### Image Optimization

**Requirements:**
- Use `next/image` with proper width/height
- Implement lazy loading
- Use WebP format with fallbacks
- Compress images (80-85% quality)

**Example:**
```typescript
<Image
  src="/images/products/table.jpg"
  alt="Handcrafted oak dining table"
  width={1200}
  height={900}
  className="rounded-lg"
  placeholder="blur"
  blurDataURL="..." // low-res placeholder
/>
```

---

### Bundle Size

**Rules:**
- Keep JavaScript bundle < 200KB (minified, gzipped)
- Use dynamic imports for heavy components
- Avoid unnecessary dependencies
- Tree-shake unused code

---

### Loading Performance

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Page Size: < 2MB

**Rules:**
- Minimize blocking JavaScript
- Defer non-critical CSS
- Preload critical assets
- Use font-display: swap

---

## Accessibility Rules (WCAG 2.1 AA)

### Color Contrast

**Requirements:**
- Normal text (< 18px): Contrast ratio ≥ 4.5:1
- Large text (≥ 18px): Contrast ratio ≥ 3:1
- UI components: Contrast ratio ≥ 3:1

**Test all color combinations before using.**

---

### Semantic HTML

**Rules:**
- Use proper HTML5 elements (`<nav>`, `<main>`, `<header>`, `<footer>`)
- Use `<button>` for clickable elements, NOT `<div>` with onClick
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Use `<article>` for product cards

---

### Keyboard Navigation

**Requirements:**
- All interactive elements must be keyboard accessible
- Visible focus indicators on all focusable elements
- Logical tab order
- No keyboard traps

**Focus Styles:**
```css
outline: 2px solid #D4A574;
outline-offset: 2px;
```

---

### Screen Readers

**Requirements:**
- Alt text for all images (descriptive, not "image of...")
- ARIA labels for icon buttons
- `aria-current="page"` for active nav items
- Language attribute on `<html>` tag

**Example:**
```typescript

  

```

---

## SEO Rules

### Meta Tags

**Every page must have:**
- Unique `<title>` tag (50-60 characters)
- Meta description (150-160 characters)
- Open Graph tags for social sharing
- Canonical URL
- Language alternates (hreflang)

**Example:**
```typescript
export const metadata: Metadata = {
  title: "Artisan Woodworks | Handcrafted Furniture Sofia",
  description: "Luxury handcrafted furniture in Sofia, Bulgaria...",
  openGraph: {
    title: "Artisan Woodworks",
    description: "...",
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://artisanwoodworks.com',
    languages: {
      'en': 'https://artisanwoodworks.com/en',
      'bg': 'https://artisanwoodworks.com/bg',
    },
  },
};
```

---

### URL Structure

**Rules:**
- Clean, descriptive URLs
- Lowercase only
- Hyphens for word separation (not underscores)
- Include language code: `/en/catalogue`, `/bg/catalogue`

---

### Content

**Rules:**
- Descriptive headings and subheadings
- Alt text for all images
- Internal linking between pages
- Structured data (Schema.org) for business info

---

## Responsive Design Rules

### Breakpoints

**Tailwind Breakpoints:**
- `sm`: 640px (landscape phones)
- `md`: 768px (tablets)
- `lg`: 1024px (small laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large screens)

**Approach:** Mobile-first (design for mobile, then scale up)

---

### Layout Rules

**Grid System:**
- Mobile: 1 column
- Tablet (`md:`): 2 columns
- Desktop (`lg:`): 3 columns

**Touch Targets:**
- Minimum size: 44x44px for mobile
- Adequate spacing between clickable elements
- Test on actual devices, not just browser DevTools

---

### Navigation

**Mobile (< 768px):**
- Hamburger menu
- Full-screen or slide-in drawer
- Large, easy-to-tap links

**Desktop (≥ 768px):**
- Horizontal navigation
- Hover states
- Dropdown if needed (not required for this project)

---

## Git & Version Control Rules

### Commit Messages

**Format:**
```
type(scope): brief description

Detailed description if needed
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `style`: Styling changes
- `refactor`: Code refactoring
- `docs`: Documentation updates
- `chore`: Build tasks, dependencies

**Examples:**
- `feat(catalogue): add product filtering by wood type`
- `fix(header): resolve mobile menu not closing on nav click`
- `style(homepage): adjust hero section spacing`

---

### Branch Strategy

**Branches:**
- `main`: Production-ready code
- `develop`: Development branch
- Feature branches: `feature/feature-name`

**Workflow:**
1. Create feature branch from `develop`
2. Make changes
3. Commit with proper messages
4. Merge back to `develop`
5. Merge `develop` to `main` when ready for deployment

---

## Testing Rules

### Manual Testing

**Required Tests:**
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Language switcher works correctly
- [ ] Product filtering works correctly
- [ ] Email links open correctly
- [ ] Images load properly
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No console errors or warnings

---

### Browser Testing

**Test in:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Test on:**
- Desktop (1920x1080 and 1366x768)
- Tablet (iPad size: 768x1024)
- Mobile (iPhone size: 375x667)

---

### Accessibility Testing

**Tools:**
- WAVE browser extension (no errors)
- Lighthouse audit (accessibility score > 95)
- Keyboard navigation (tab through all interactive elements)
- Screen reader test (NVDA or VoiceOver)

---

## Security Rules

### Basic Security

**Requirements:**
- HTTPS only (SSL certificate)
- Secure headers configured
- No sensitive data in client-side code
- External links use `rel="noopener noreferrer"`

**Example:**
```typescript

  Instagram

```

---

### Environment Variables

**Rules:**
- Store sensitive data in `.env.local`
- Never commit `.env.local` to Git
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Document required env vars in README

---

## Content Rules

### Placeholder Content

**During Development:**
- Use Lorem Ipsum or descriptive placeholder text
- Mark placeholder content clearly: `[PLACEHOLDER]`
- Use placeholder images (high-quality stock photos)
- Note in `memo.md` what content needs to be replaced

---

### Bilingual Content

**Requirements:**
- All user-facing text in both EN and BG
- Consistent terminology across languages
- Professional translations (not Google Translate)
- Test both languages thoroughly

**Structure:**
```json
{
  "nav": {
    "home": "Home", // English
  }
}
```

```json
{
  "nav": {
    "home": "Начало", // Bulgarian
  }
}
```

---

### Product Data

**Structure:**
```typescript
const products: Product[] = [
  {
    id: 'oak-table-01',
    name: { 
      en: 'Oak Dining Table', 
      bg: 'Дъбова Трапезна Маса' 
    },
    category: 'table',
    woodType: 'oak',
    description: { 
      en: 'Handcrafted oak dining table...', 
      bg: 'Ръчно изработена дъбова маса...' 
    },
    images: ['/images/products/oak-table-01.jpg'],
    featured: true,
  },
];
```

---

## Deployment Rules

### Pre-Deployment Checklist

**Before deploying, verify:**
- [ ] All tests pass
- [ ] No console errors
- [ ] All placeholder content replaced or noted
- [ ] Lighthouse scores > 90
- [ ] SEO meta tags complete
- [ ] Images optimized
- [ ] Analytics configured
- [ ] Privacy policy and terms pages complete
- [ ] Email links functional
- [ ] Both languages tested

---

### Vercel Deployment

**Process:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy to preview environment
5. Test thoroughly
6. Deploy to production

**Environment Variables:**
```
NEXT_PUBLIC_SITE_URL=https://artisanwoodworks.com
```

---

## Documentation Rules

### Code Comments

**When to Comment:**
- Complex logic that isn't immediately clear
- Workarounds or hacks (with explanation)
- Important business logic
- Regular expressions

**When NOT to Comment:**
- Obvious code
- Self-explanatory function names
- Every single line

**Example:**
```typescript
// Filter products by category and wood type
// Combines multiple filters with AND logic
const filteredProducts = products.filter(product => {
  const categoryMatch = !selectedCategory || product.category === selectedCategory;
  const woodMatch = !selectedWood || product.woodType === selectedWood;
  return categoryMatch && woodMatch;
});
```

---

### README

**Include:**
- Project overview
- Setup instructions
- Development commands
- Deployment process
- Environment variables needed
- Known issues

---

## Prohibited Practices

### Never Do These:

❌ **Skip reading the documentation files**  
❌ **Work outside `C:/projects/artisan_woodworks`**  
❌ **Use inline styles instead of Tailwind**  
❌ **Hardcode text instead of using translations**  
❌ **Use `any` type in TypeScript**  
❌ **Skip error logging in errors.md**  
❌ **Use `<img>` instead of `next/image`**  
❌ **Remove focus outlines without replacement**  
❌ **Skip accessibility testing**  
❌ **Use bright or pastel colors**  
❌ **Add features not in the scope**  
❌ **Deploy without testing**  
❌ **Commit `.env.local` to Git**  
❌ **Skip responsive testing**  
❌ **Use more than 2 font families**  
❌ **Create cluttered layouts (needs whitespace)**  

---

## Best Practices

### Do These:

✅ **Read all documentation before coding**  
✅ **Follow the workflow sequentially**  
✅ **Log every error in errors.md**  
✅ **Update memo.md with decisions**  
✅ **Use semantic HTML**  
✅ **Write descriptive alt text**  
✅ **Test on multiple devices**  
✅ **Use TypeScript strictly**  
✅ **Keep components small and focused**  
✅ **Optimize all images**  
✅ **Test both languages thoroughly**  
✅ **Commit frequently with clear messages**  
✅ **Use generous whitespace in design**  
✅ **Prioritize accessibility**  
✅ **Keep bundle size small**  

---

## Quality Standards

### Code Quality

**Requirements:**
- TypeScript with strict mode
- ESLint passes with no warnings
- Prettier formatted
- No console.log in production code
- Proper error handling

---

### Performance

**Lighthouse Targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

---

### Design Quality

**Standards:**
- Consistent spacing throughout
- Proper color contrast
- Professional typography
- High-quality images only
- Smooth animations (200-300ms)
- Responsive on all devices

---

## Scope Management

### In Scope (Build These)

✅ 3 pages: Home, Catalogue, About & Contact  
✅ Bilingual support (EN/BG)  
✅ Product catalogue with filtering  
✅ Email contact integration  
✅ Social media icon links  
✅ Privacy policy & terms templates  
✅ Responsive design  
✅ SEO optimization  
✅ Analytics integration  

---

### Out of Scope (Do NOT Build)

❌ Contact forms  
❌ E-commerce/shopping cart  
❌ Payment processing  
❌ Booking system  
❌ User accounts/login  
❌ Blog/CMS  
❌ Customer reviews  
❌ Live chat  
❌ Newsletter signup  
❌ Search functionality  
❌ Product detail pages (beyond catalogue cards)  
❌ Wishlist/favorites  
❌ Social media feeds (only icon links)  

**If asked to add out-of-scope features, note in memo.md for future phases.**

---

## Communication

### Questions or Blockers

**When you have questions:**
1. Check documentation files first
2. If still unclear, document question in `memo.md`
3. Make a reasonable decision and document it
4. Continue with development

**When you encounter blockers:**
1. Log error in `errors.md`
2. Document blocker in `memo.md`
3. Attempt solutions
4. If unresolved, clearly state what's needed to proceed

---

## Summary

These rules ensure the Artisan Woodworks website is built to high standards of quality, performance, accessibility, and maintainability. Following these rules is not optional—they represent the requirements for successful project completion.

**Key Reminders:**
1. Read all documentation first
2. Follow the workflow
3. Log errors and decisions
4. Write clean, typed, accessible code
5. Test thoroughly
6. Stay within scope
7. Maintain luxury aesthetic (clean, simple, generous whitespace)
8. Prioritize user experience

**When in doubt, refer to the entry_data files for context and these rules for technical guidance.**