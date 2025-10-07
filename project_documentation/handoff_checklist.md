## Placeholder Information

### To Be Provided Later by Client:
- **Domain name** (not yet registered)
- **Business email** (use placeholder: info@artisanwoodworks.com)
- **Social media URLs** (use # as placeholder href)
- **Real product images** (use high-quality placeholders initially)
- **Final copy/text content** (write professional placeholder content)

---

## Deployment Information

### Git & Vercel Access
**Claude Code has FULL ACCESS to:**
- **Git** - Via MCP (Model Context Protocol)
- **Vercel** - Via MCP (Model Context Protocol)

**This means Claude Code can:**
- Initialize Git repository
- Commit changes
- Push to GitHub
- Deploy to Vercel
- Configure Vercel settings
- Set up environment variables
- Monitor deployments

### Deployment Process
1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Artisan Woodworks website"
   ```

2. **Create GitHub Repository:**
   - Use Git MCP to create repository
   - Push code to GitHub

3. **Deploy to Vercel:**
   - Use Vercel MCP to connect repository
   - Configure build settings (Next.js auto-detected)
   - Set environment variables if needed
   - Deploy to production

4. **Continuous Deployment:**
   - Every push to `main` branch auto-deploys
   - Preview deployments for feature branches
   - Easy rollbacks if needed

### Vercel Configuration
```bash
# Build Command (auto-detected)
next build

# Output Directory (auto-detected)
.next

# Install Command (auto-detected)
npm install

# Development Command
npm run dev
```

### Environment Variables (if needed)
```
NEXT_PUBLIC_SITE_URL=https://artisan-woodworks.vercel.app
```

---

## Testing & Quality Assurance

### Pre-Deployment Testing
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Language switcher functions
- [ ] Product filtering works
- [ ] Email links open correctly
- [ ] Images load properly
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Lighthouse scores > 90

### Post-Deployment Testing
- [ ] Live site loads correctly
- [ ] All pages accessible
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics tracking works
- [ ] Both languages work on live site
- [ ] Cross-browser testing
- [ ] Mobile device testing

---

## Success Metrics

### Primary KPI
**Email inquiries per month** - Track via analytics

### Secondary Metrics
- Page views
- Average session duration
- Bounce rate
- Mobile vs desktop traffic
- Language preference (EN vs BG)
- Catalogue engagement

---

## Post-Launch

### Immediate Tasks
- [ ] Verify deployment successful
- [ ] Test all functionality on live site
- [ ] Set up Google Analytics (or similar)
- [ ] Monitor for errors
- [ ] Document any issues in `errors.md`

### Client Handoff
- [ ] Provide Vercel dashboard access
- [ ] Provide GitHub repository access
- [ ] Document how to update content
- [ ] Explain analytics dashboard
- [ ] Note placeholder items to replace

---

## Support & Maintenance

### Future Updates
When client provides:
- **Domain name:** Configure custom domain in Vercel
- **Business email:** Update all mailto: links
- **Social media URLs:** Update icon links
- **Real images:** Replace placeholder images
- **Final copy:** Replace placeholder text

### Version Control
- **Main branch:** Production code
- **Develop branch:** Development work
- **Feature branches:** Individual features

### Deployment Strategy
- Develop → Test → Merge to main → Auto-deploy to# Handoff Checklist - Artisan Woodworks Website

## Project Ready for Development

**Date Prepared:** October 7, 2025  
**Project:** Artisan Woodworks Website  
**Client:** Artisan Woodworks (Handcrafted Furniture, Sofia, Bulgaria)  
**Developer:** Claude Code  
**Project Directory:** `C:/projects/artisan_woodworks`

---

## Documentation Complete ✅

All project documentation has been prepared and is ready for development.

### Entry Data (4 files)
- [x] `entry_data/project_description.md` - Business context, goals, scope
- [x] `entry_data/user_identification.md` - User personas, stories, journeys
- [x] `entry_data/functionalities_description.md` - Technical specs, features
- [x] `entry_data/ui_ux_description.md` - Design system, brand identity

### Project Documentation (4 files)
- [x] `project_documentation/workflow.md` - 11-phase development workflow
- [x] `project_documentation/rules.md` - Development rules and constraints
- [x] `project_documentation/errors.md` - Error tracking template
- [x] `project_documentation/memo.md` - Project notes template

---

## Quick Project Summary

### What We're Building
A luxury, elegant **bilingual website** (English/Bulgarian) for Artisan Woodworks, a new handcrafted furniture business in Sofia, Bulgaria. The site will showcase custom furniture pieces to attract B2C customers.

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Icons:** lucide-react
- **Deployment:** Vercel

### Pages (3 total)
1. **Home** - Hero, featured products, process teaser, contact CTA
2. **Catalogue** - Product grid with filtering (category + wood type)
3. **About & Contact** - Company story, craftsmanship process, contact info

### Key Features
- Bilingual support (EN/BG)
- Product catalogue with client-side filtering
- Email contact (mailto links, no forms)
- Social media icon links (Instagram, Facebook - placeholder)
- Responsive design (mobile-first)
- SEO optimized
- Privacy policy & terms templates

### Design Style
- **Colors:** Black, white, wood tones (no pastels, no bright colors)
- **Typography:** Serif headings + sans-serif body
- **Layout:** Clean, simple, generous whitespace
- **Imagery:** High-quality photography, natural lighting
- **Aesthetic:** Luxury through simplicity

---

## Before Starting Development

### Step 1: Create Project Directory
```bash
mkdir C:/projects/artisan_woodworks
cd C:/projects/artisan_woodworks
```

### Step 2: Place Documentation
Move all documentation files into the project directory:

```
C:/projects/artisan_woodworks/
├── entry_data/
│   ├── project_description.md
│   ├── user_identification.md
│   ├── functionalities_description.md
│   └── ui_ux_description.md
└── project_documentation/
    ├── workflow.md
    ├── rules.md
    ├── errors.md
    └── memo.md
```

### Step 3: Read Documentation (MANDATORY)
**Claude Code MUST read these files in this order BEFORE writing any code:**

1. `project_documentation/rules.md` (development rules)
2. `entry_data/project_description.md` (business context)
3. `entry_data/user_identification.md` (users and personas)
4. `entry_data/functionalities_description.md` (technical requirements)
5. `entry_data/ui_ux_description.md` (design guidelines)
6. `project_documentation/workflow.md` (development workflow)

---

## Development Process

### Phase 0: Pre-Development
- [ ] Read all 6 documentation files listed above
- [ ] Understand project scope and constraints
- [ ] Review design system and brand identity

### Phase 1: Project Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (next-intl, lucide-react, etc.)
- [ ] Configure Tailwind CSS
- [ ] Set up project structure

### Phase 2-11: Follow Workflow
- [ ] Work through `workflow.md` sequentially
- [ ] Complete each phase before moving to next
- [ ] Check off tasks as completed
- [ ] Log all errors in `errors.md`
- [ ] Document decisions in `memo.md`

---

## Critical Rules to Remember

### MUST DO:
✅ Read all documentation before coding  
✅ Work within `C:/projects/artisan_woodworks` only  
✅ Follow the workflow sequentially  
✅ Log every error in `errors.md`  
✅ Document decisions in `memo.md`  
✅ Use TypeScript with strict mode  
✅ Use Tailwind CSS (no custom CSS)  
✅ Make everything bilingual (EN/BG)  
✅ Use `next/image` for all images  
✅ Test on mobile, tablet, and desktop  
✅ Maintain luxury aesthetic (whitespace!)  
✅ Stay within scope (3 pages, no e-commerce)  

### NEVER DO:
❌ Skip reading documentation  
❌ Work outside project directory  
❌ Use inline styles  
❌ Hardcode text (use translations)  
❌ Use `any` in TypeScript  
❌ Skip error logging  
❌ Add out-of-scope features  
❌ Use bright or pastel colors  
❌ Create cluttered layouts  
❌ Deploy without testing  

---

## Design System Quick Reference

### Colors
```css
Black: #000000
White: #FFFFFF
Wood Yellow: #D4A574
Wood Brown: #8B6F47
Light Gray: #F5F5F4
Medium Gray: #A8A29E
Dark Gray: #44403C
```

### Typography
- **Headings:** Serif (Playfair Display recommended)
- **Body:** Sans-serif (Inter recommended)
- **Sizes:** 48-64px (h1), 36-48px (h2), 24-32px (h3), 16px (body)

### Spacing
- Mobile: 16-24px
- Desktop: 24-48px
- Sections: 64-96px

### Buttons
- **Primary:** Wood yellow bg, black text
- **Secondary:** Transparent bg, black border
- **Border radius:** 4px
- **Hover:** Darken background, slight lift

---

## Out of Scope (Do NOT Build)

These features are explicitly NOT included:
- Contact forms (email only)
- E-commerce/shopping cart
- Payment processing
- Booking system
- User accounts
- Blog/CMS
- Customer reviews
- Live chat
- Newsletter signup
- Search functionality
- Social media feeds (only icon links)

---

## Placeholder Information

### To Be Provided Later by Client:
- **Domain name** (not yet registered)
- **Business email** (use placeholder: info@artisanwoodworks.com)