# Project Memo - Artisan Woodworks

## Purpose
This file contains project notes, decisions, important information, and communications during the development of the Artisan Woodworks website.

---

## Project Information

**Client:** Artisan Woodworks  
**Project Start Date:** October 7, 2025  
**Project Type:** Full-Stack Web Application (NOT a static site)  
**Technology:** Next.js 14+, TypeScript, Tailwind CSS, Supabase  
**Project Directory:** `C:/projects/artisan_woodworks`

---

## Important Notes

### Supabase Configuration
**Project URL:** `https://wwgdshwtkmgmrlzagdxz.supabase.co`  
**Region:** Europe West  
**Database:** PostgreSQL with Row Level Security enabled  
**Storage Buckets:** 
- `product-images` (public)
- `product-videos` (public)

### Admin Users
- **Developer:** ahlgrenmelwin8@gmail.com (ID: 6cbf10cc-aefa-4f3a-9a01-7011bf21a5ea)
- **Client:** petriahlgren@hotmail.com (ID: e75b97f0-8121-4ad9-8f58-ff136d3b7cb1)

### Placeholder Information
- **Domain:** Not yet registered (to be determined by client)
- **Business Email:** Not yet set up (placeholder: info@artisanwoodworks.com)
- **Social Media:** Instagram and Facebook accounts exist but URLs not provided yet (use # as placeholder)

### Content Status
- **Images:** Using placeholder images initially, client will provide real photos later
- **Text Content:** To be written during development in English, then translated to Bulgarian
- **Products:** Client will add real products via admin panel after launch

---

## Architecture Decision: Static Site → Full-Stack Application

**Date:** October 7, 2025  
**Decision:** Changed from static site to full-stack application with Supabase backend  
**Reason:** Client needs ability to manage products independently without developer intervention  
**Impact:** 
- Added Supabase for database, auth, and storage
- Added admin panel with complete CMS
- Added authentication system
- Increased complexity but enables client independence
- Changed deployment from simple static hosting to full-stack on Vercel

---

## Key Decisions

### Design Decisions
- **Public Site:** Luxury aesthetic with black, white, and wood tones (#D4A574, #8B6F47)
- **Admin Panel:** Functional design prioritizing usability over aesthetics
- **Font Selections:** 
  - Public site: Serif headings (Playfair Display recommended), Sans-serif body (Inter recommended)
  - Admin panel: Sans-serif throughout (Inter)
- **Layout Approach:** Clean, minimal, image-focused with generous whitespace on public site; efficient and compact on admin panel

### Technical Decisions
- **Framework:** Next.js 14+ with App Router (Server Components by default)
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth (email/password)
- **Storage:** Supabase Storage (images and videos)
- **Internationalization:** next-intl for EN/BG support (public site only)
- **Rich Text Editor:** Tiptap (chosen for simplicity and React integration)
- **Form Management:** React Hook Form with Zod validation
- **Styling:** Tailwind CSS only (no custom CSS files)
- **Deployment:** Vercel with Git integration via MCP
- **Continuous Deployment:** Every push to main auto-deploys

### Feature Decisions
- **Contact Method:** Email only (mailto links), no forms on public site
- **Admin Access:** 2 users only (developer and client)
- **Product Management:** Full CRUD via admin panel
- **Image Limits:** Max 10 images per product (5MB each)
- **Video Support:** Optional 1 video per product (50MB max)
- **Product Status:** Three states (published, hidden, sold)
- **E-commerce:** Not included (future enhancement)
- **Booking System:** Not included (future enhancement)
- **Social Media:** Icon links only (no embedded feeds)
- **Admin Panel Language:** English only (simpler for development and maintenance)
- **Public Site Language:** Fully bilingual (EN/BG required)

---

## Development Notes

### Phase 0 Completed (October 7, 2025)
- ✅ Created all documentation files (8 files total)
- ✅ Defined complete project scope
- ✅ Set up Supabase project
- ✅ Created database schema (4 tables)
- ✅ Configured RLS policies
- ✅ Created storage buckets
- ✅ Set up admin user accounts
- ✅ Documented all credentials
- ✅ Established development workflow

### Database Schema Notes
**Tables Created:**
1. `profiles` - Admin user profiles
2. `products` - Product catalog
3. `product_images` - Multiple images per product
4. `product_videos` - Optional video per product

**Key Design Choices:**
- Using `display_order` for image sorting (0, 1, 2, etc.)
- CASCADE deletes for images/videos when product deleted
- `status` field for product visibility (published/hidden/sold)
- `featured` boolean for homepage display
- Bilingual fields: name_en, name_bg, description_en, description_bg
- HTML storage for descriptions (from Tiptap)

### RLS Policy Notes
- Public users can only read published products
- Admins verified via profiles table (role = 'admin')
- All mutations require admin authentication
- Images/videos follow product visibility rules

---

## Questions & Answers

**Q: Should admin panel be bilingual?**  
**A:** No, English only for simplicity. Client is comfortable with English.

**Q: What rich text editor to use?**  
**A:** Tiptap - lightweight, React-friendly, easy to integrate, good documentation.

**Q: How many admin users?**  
**A:** Two - developer (Melwin) and client (Petri).

**Q: Image limits?**  
**A:** Max 10 images at 5MB each, plus optional 1 video at 50MB.

**Q: Product status options?**  
**A:** Published (visible), Hidden (temporary), Sold (permanent removal from public).

---

## Change Log

### 2025-10-07 - Project Inception
- **Change:** Initial project setup and documentation
- **Reason:** Starting new website for Artisan Woodworks
- **Impact:** All 8 documentation files created

### 2025-10-07 - Architecture Change
- **Change:** From static site to full-stack application with Supabase
- **Reason:** Client needs CMS to manage products independently
- **Impact:** Major scope increase - added database, auth, storage, admin panel

### 2025-10-07 - Supabase Setup Complete
- **Change:** Supabase project created and configured
- **Reason:** Backend infrastructure needed
- **Impact:** Database tables created, RLS policies set, storage buckets ready, admin users created

---

## Client Feedback

<!-- Document any feedback received from the client -->

*No feedback yet - project just starting*

---

## Technical Challenges & Solutions

### Challenge: Product Status Management
**Problem:** How to handle products that are sold vs temporarily hidden?  
**Solution:** Three-state status system (published/hidden/sold) instead of just published/unpublished. Gives client flexibility.

### Challenge: Image Ordering
**Problem:** Need consistent primary image for each product.  
**Solution:** `display_order` field (integer) in product_images table. 0 = primary, 1 = second, etc. Can be reordered via drag-drop in admin panel.

### Challenge: Bilingual Product Management
**Problem:** How to make bilingual content easy for non-technical user?  
**Solution:** Separate fields (name_en, name_bg, description_en, description_bg) with clear labels. Tiptap editor for both languages.

### Challenge: File Upload Limits
**Problem:** Need reasonable limits to prevent storage bloat.  
**Solution:** 10 images max (5MB each) + optional 1 video (50MB). Enough for quality showcase without excessive storage costs.

---

## Future Enhancements

### Phase 2 (3-6 months)
- Contact form (instead of mailto:)
- Customer testimonials section
- Expanded product catalogue (20+ items)
- Blog for SEO content
- Enhanced product detail pages with galleries

### Phase 3 (6-12 months)
- E-commerce functionality (online ordering)
- Payment gateway integration (Stripe)
- Order tracking system
- Customer account system
- Shopping cart

### Phase 4 (12+ months)
- Booking system for consultations
- Live Instagram feed integration
- Advanced product configurator (customize dimensions, wood type, etc.)
- Multi-currency support
- International shipping calculator
- AR visualization (view furniture in your space)
- Multi-admin roles with permissions

### Admin Panel Enhancements (Future)
- Bulk operations (publish/hide multiple products)
- CSV import/export for products
- Product duplication (copy existing product)
- Draft auto-save (prevent data loss)
- Activity log (see who changed what)
- Image editing tools (crop, rotate)
- SEO optimization fields per product
- Analytics dashboard (views per product)

---

## Resources & References

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tiptap Documentation](https://tiptap.dev/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)

### Design Inspiration
- Keywords: Scandinavian furniture, artisan woodworking, luxury minimal websites, handcrafted furniture portfolio
- Focus: Clean layouts, high-quality photography, natural aesthetics

### Supabase Resources
- Dashboard: https://supabase.com/dashboard/project/wwgdshwtkmgmrlzagdxz
- Database: SQL Editor for queries and migrations
- Storage: Manage files in product-images and product-videos buckets
- Auth: Manage admin users

---

## Deployment Information

### Vercel Configuration
- **Repository:** GitHub (to be created via Git MCP)
- **Branch:** main (production)
- **Auto-deploy:** Yes (every push to main)
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Environment Variables (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://wwgdshwtkmgmrlzagdxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (mark as sensitive)
NEXT_PUBLIC_SITE_URL=https://artisan-woodworks.vercel.app
```

---

## Contact Information

**For Questions or Updates:**
- All communication through this memo or project documentation
- Client will provide domain and email information when ready
- Developer: ahlgrenmelwin8@gmail.com
- Client: petriahlgren@hotmail.com

---

## Performance Targets

### Public Site
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

### Admin Panel
- Lighthouse Performance: > 80 (acceptable for admin tools)
- Lighthouse Accessibility: > 90
- Product form submission: < 2s (excluding file uploads)
- Image upload: < 3s per image

---

## Security Notes

### Implemented Security Measures
- Row Level Security (RLS) on all tables
- Authentication middleware on admin routes
- Input validation (client and server)
- File type and size validation
- Service role key never exposed to client
- HTTPS enforced (via Vercel)
- httpOnly cookies for sessions
- SQL injection protection (Supabase)
- XSS protection (React)

### Security Best Practices Followed
- Never commit `.env.local` to Git
- Environment variables properly configured
- Sensitive keys marked as such in Vercel
- Admin panel not indexed by search engines (robots.txt)
- Passwords hashed by Supabase Auth
- Sessions expire after 7 days

---

## Notes Section

### Developer Notes (October 7, 2025)
- All documentation created before any code
- Supabase fully configured and ready
- Admin users created and tested
- Workflow designed for Claude Code execution
- MCP access confirmed for Git and Vercel
- Ready to begin Phase 1 development

### Important Reminders
- ALWAYS use Server Components by default
- Use correct Supabase client for context (client vs server)
- Validate input on both client AND server
- Revalidate paths after mutations
- Log all errors in errors.md
- Update this memo with decisions
- Test as both public user and admin
- Keep admin panel simple for client

---

## Project Status

**Current Phase:** Phase 3.5 Complete (Authentication System)  
**Next Phase:** Phase 4 (Admin Panel Development - Product CRUD)  
**Overall Progress:** ~40% (Project setup, design system, i18n, and auth complete)

**Blockers:** None  
**Risks:** None identified  
**Timeline:** On track (no specific deadline)

**Completed Phases:**
- ✅ Phase 0: Documentation & Supabase Setup
- ✅ Phase 1: Project Setup (Next.js, dependencies, structure)
- ✅ Phase 2: Design System (fonts, colors, Button, Card components)
- ✅ Phase 3: Internationalization (next-intl, EN/BG translations)
- ✅ Phase 3.5: Authentication System (login, dashboard, middleware)

**Test Admin Credentials:**
- Email: test@artisanwoodworks.com
- Password: TestPass123!