# Copilot Instructions for WebsiteUI

## Project Overview
A **Next.js 16 + React 19** portfolio website with a futuristic neon aesthetic. Built for showcasing student portfolios with dark theme, cyan/purple neon gradients, and dynamic animations.

## Architecture

### Stack
- **Framework**: Next.js 16.1.2 (App Router)
- **Styling**: Tailwind CSS 4 + PostCSS with custom neon theme
- **Language**: TypeScript 5
- **Optimization**: React Compiler plugin enabled

### Key Directories
- `src/app/` - Root layout and main page (portfolio data lives in page.tsx)
- `src/components/` - Reusable UI components (Header, Footer, ProfileHero, SkillsSection, etc.)
- `src/app/globals.css` - Global styles, CSS variables, neon utilities

## Developer Workflows

### Running the App
```bash
npm run dev        # Start dev server on http://localhost:3000
npm run build      # Production build
npm start          # Run production server
npm run lint       # Run ESLint
```

### Build System
- **HMR**: Enabled by default in dev mode
- **Output**: Static optimization via Next.js built-in (no custom webpack config)
- **CSS**: Tailwind v4 with `@tailwindcss/postcss` (requires `postcss.config.mjs`)

## Project-Specific Patterns

### Configuration as Data in page.tsx
Portfolio content is **not database-driven**; it's a JavaScript object in [src/app/page.tsx](src/app/page.tsx#L11):
```javascript
const portfolio = {
  name: "TARO YAMADA",
  university: "Digital Hollywood University",
  description: "...",
  qualifications: [...],
  skills: [...]
}
```
**Guideline**: All portfolio edits happen here. Pass data down to components via props.

### Neon Design System
Custom utility classes in [src/app/globals.css](src/app/globals.css):
- `.neon-text-blue` / `.neon-text-purple` - Text glow effects
- `.neon-box-blue` - Box glow with inset shadow
- CSS variables: `--neon-blue: #00ffff`, `--neon-purple: #bc13fe`

**Guideline**: When styling, use custom neon classes + Tailwind. Avoid arbitrary values; extend theme in `tailwind.config.ts` if needed.

### Component Structure
- Functional components with TypeScript interfaces for props
- Example: [src/components/ProfileHero.tsx](src/components/ProfileHero.tsx) accepts `{ name, university, description }` and uses absolute-positioned gradient blobs with `animate-pulse` for ambient effects
- **Pattern**: Each major section (ProfileHero, SkillsSection, ListSection) is a separate component receiving data from page.tsx

### Tailwind + Neon Styling Conventions
- **Header** ([src/components/Header.tsx](src/components/Header.tsx)): `backdrop-blur-md`, `bg-black/50`, border glows with `border-white/10`
- **Gradients**: Linear gradients in CSS (globals.css body) for full-page effect; inline styles for component-level animations (e.g., `animationDelay: "1s"`)
- **Z-index**: Fixed header uses `z-50`; background blobs use `-z-10`

## Type Safety & Linting
- **TypeScript**: Strict mode enabled (`"strict": true`)
- **Path alias**: `@/*` maps to `src/*`
- **Linter**: ESLint 9 with Next.js config
- **React Compiler**: Enabled to optimize renders (no manual memoization needed)

## External Dependencies & Integration
- **Fonts**: `next/font` for Inter (Google Fonts)
- **Routing**: `next/link` for client-side navigation (Header nav uses placeholder hrefs `#`)
- **Metadata**: SEO via `Metadata` export in layout.tsx

## Critical Files to Understand First
1. [src/app/page.tsx](src/app/page.tsx) - Portfolio data structure
2. [src/app/layout.tsx](src/app/layout.tsx) - Global layout + metadata
3. [src/app/globals.css](src/app/globals.css) - Neon theme, CSS vars, utilities
4. [src/components/ProfileHero.tsx](src/components/ProfileHero.tsx) - Example of animated neon component with blur effects
