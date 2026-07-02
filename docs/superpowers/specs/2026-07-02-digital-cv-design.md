# Digital CV — Design Spec

**Date:** 2026-07-02  
**Author:** Vinícius Ernani de Carvalho  
**Status:** Approved

---

## 1. Overview

A single-page digital Curriculum Vitae rendered as a browser document. The aesthetic reference is RFC documents (e.g. rfc-editor.org) — a page that looks like it could be a printable file, not a web app. No photo, no color accents, no decorative UI chrome. Monochrome, document-first, typographically intentional.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Vite + React + TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Internationalization | react-i18next (UI strings only) |
| PDF export | react-to-print |
| UI components | None — hand-rolled with Tailwind |
| Package manager | npm |
| Deploy | GitHub Pages (static SPA, simpler config than Vercel — one `base` option in `vite.config.ts` + a GitHub Actions workflow; no external dashboard, no cold starts, no billing) |

---

## 3. Functional Requirements

### 3.1 Languages

Three locales supported: English (`en`), Brazilian Portuguese (`pt-br`), Spanish (`es`).

- Language selector in the header (native `<select>`, keyboard-operable)
- Persisted in `localStorage`
- On first visit: `navigator.language` mapped to supported locales (`pt`, `pt-BR` → `pt-br`; `es`, `es-*` → `es`; everything else → `en`)
- `lang` attribute on `<html>` updated dynamically on language change

### 3.2 Theme

Light/dark toggle in the header.

- Persisted in `localStorage`
- On first visit: `window.matchMedia('(prefers-color-scheme: dark)')` determines default
- Implemented via `data-theme="dark"` on `<html>`; Tailwind configured with `darkMode: 'selector'` targeting `[data-theme="dark"]`
- Inline script in `index.html` sets the attribute before first paint — no flash of wrong theme
- Both themes are monochrome/ink-tone — dark mode is dark paper, not a typical app dark mode

### 3.3 PDF Export

"Download PDF" button in the header using `react-to-print`.

- Prints the `<CV>` component (everything below the header) via a ref
- `print.css` scoped under `@media print`:
  - Forces light-theme CSS variable values regardless of active UI theme
  - Hides the header (`display: none`)
  - Sets `@page { margin: 1.5cm; }`
  - Sets `page-break-inside: avoid` on section wrappers
- Output is semantic HTML — real text, proper heading hierarchy — parseable by ATS systems and LLMs
- Always uses the currently selected language's content

### 3.4 Content

CV content lives in typed structured data files: `src/content/en.ts`, `src/content/pt-br.ts`, `src/content/es.ts`. Components never hardcode content. A `getContent(lang)` function returns the appropriate object — no i18n plumbing for content, just a language switch.

`react-i18next` handles only UI chrome strings (button labels, control text).

---

## 4. Content Data Model

Defined in `src/types/cv.ts`. All content files export a `CVData` object satisfying this shape.

```typescript
interface ContactInfo {
  phone?: string
  email: string
  location: string
  github?: string
  linkedin?: string
  website?: string
}

interface ExperienceEntry {
  company: string
  role: string
  period: string           // free-form string, e.g. "Feb 2024 – present"
  description: string
  competencies: string[]
  technologies: string[]
}

interface EducationEntry {
  institution: string
  institutionUrl?: string
  degree: string
  period: string
}

interface LanguageEntry {
  language: string
  proficiency: string      // e.g. "native", "professional", "conversational"
}

interface ProjectEntry {
  name: string
  description: string
  techStack: string[]
  url?: string
}

interface CVData {
  name: string
  title: string
  contact: ContactInfo
  about: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  languages: LanguageEntry[]
  interests: string[]      // flat list
  community: string[]      // flat list
  projects?: ProjectEntry[] // optional; section hidden if omitted or empty
}
```

**Design notes:**
- `period` is a free-form string (not typed `Date`) so locale-appropriate formatting (e.g. "fev. 2024 – presente" in PT-BR) requires no code — just write it in the data file
- `interests` and `community` are `string[]` — flat lists, no sub-structure
- `projects` is optional at the root; the section renders only if the array is non-empty

---

## 5. Project Structure

```
digital-cv/
├── .github/workflows/deploy.yml     # GitHub Actions: build + deploy to Pages
├── docs/superpowers/specs/          # design docs
├── public/                          # favicon, robots.txt
├── src/
│   ├── content/
│   │   ├── en.ts
│   │   ├── pt-br.ts
│   │   └── es.ts
│   ├── types/
│   │   └── cv.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── CV.tsx
│   │   └── sections/
│   │       ├── ProfileSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── EducationSection.tsx
│   │       ├── LanguagesSection.tsx
│   │       ├── InterestsSection.tsx
│   │       ├── CommunitySection.tsx
│   │       └── ProjectsSection.tsx
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── useLanguage.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── en.json
│   │       ├── pt-br.json
│   │       └── es.json
│   ├── styles/
│   │   └── print.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── tailwind.config.ts
```

---

## 6. Layout & Typography

### 6.1 Font

**Courier Prime** — loaded from Google Fonts (`<link rel="preconnect">` + `display=swap`). Weights: 400 and 700 only. Chosen over raw Courier New because it is designed for modern screen rendering while preserving the typewriter aesthetic. Matches the RFC document reference.

### 6.2 Page Layout

- Non-sticky header: language selector, theme toggle, PDF download button — scrolls away with content
- Max content width: `680px`, centered
- Generous vertical whitespace between sections: `3rem`
- Between entries within a section: `1.5rem`

### 6.3 Section Anatomy

Each section:
- Horizontal rule
- Section heading: ALL CAPS, bold, 0.85rem
- Horizontal rule
- Content

Experience entry layout:
- Company name + period on same line (period right-aligned)
- Role on the line below, slightly muted
- Description paragraph
- "Competencies" sub-heading + ordered list
- "Technologies" sub-heading + `·`-bulleted list

### 6.4 Typographic Scale

| Element | Size | Weight | Treatment |
|---|---|---|---|
| Name | 1.5rem | 700 | – |
| Title | 1rem | 400 | – |
| Contact | 0.8rem | 400 | muted color |
| Section heading | 0.85rem | 700 | ALL CAPS + rules |
| Company + period | 0.95rem | 700 | period right-aligned |
| Role | 0.9rem | 400 | muted |
| Sub-heading | 0.85rem | 700 | – |
| Body / list items | 0.9rem | 400 | – |

### 6.5 Color Tokens

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F8F6F1` | `#1C1B19` |
| `--ink` | `#1C1B19` | `#DEDBD2` |
| `--ink-muted` | `#5C5A55` | `#8A8780` |
| `--rule` | `#C8C5BE` | `#3A3835` |

Print always uses light-theme values.

---

## 7. Accessibility

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<address>`, proper `<h1>`→`<h3>` hierarchy (no skipped levels), `<ol>`/`<ul>` for lists
- All header controls have explicit `aria-label` attributes
- Language selector: native `<select>` (keyboard-operable by default)
- Theme toggle: `<button>` with `aria-pressed` reflecting current state
- PDF button: `<button>` with descriptive `aria-label`
- WCAG AA contrast: `#1C1B19` on `#F8F6F1` ≈ 17:1; `#DEDBD2` on `#1C1B19` ≈ 12:1
- `lang` attribute on `<html>` updated on language change

---

## 8. Performance

- No lazy loading — entire app is small, one chunk is fine; Vite splits vendor libs automatically
- Courier Prime: `preconnect` + `display=swap` prevents invisible text during font load
- All three i18n locale JSON files are tiny and bundled at build time — no runtime network requests for translations
- Target: Lighthouse performance ≥ 95, total bundle < 150 KB gzipped
- TypeScript strict mode enforced at build time via `vite-plugin-checker`

---

## 9. Implementation Phases

| # | Phase | What gets built | Browser checkpoint |
|---|---|---|---|
| 1 | Project scaffold | Vite + TS + Tailwind + all deps installed, GitHub Actions workflow | Blank page, no console errors |
| 2 | Content data model | `cv.ts` types + placeholder data for all three locales | `getContent('en')` returns typed object in console |
| 3 | CV layout + typography | All section components, static English content, Courier Prime | Document renders with correct font, spacing, structure |
| 4 | Theme system | `useTheme`, CSS custom properties, toggle button | Toggle switches theme, persists on reload, respects OS pref |
| 5 | i18n + language selector | `useLanguage`, react-i18next setup, locale JSON files | Switching language re-renders all content correctly |
| 6 | PDF export | `react-to-print` wiring, `print.css` | Download produces light-mode PDF matching screen layout |
| 7 | Polish + QA | Lighthouse audit, contrast check, keyboard nav, print preview | Lighthouse ≥ 95, no a11y violations |

---

## 10. Out of Scope

- Server-side rendering (no Next.js, no SSR need)
- Analytics or tracking
- Contact form or any backend
- Animation or transitions beyond browser defaults
- Projects section content (schema is present; section renders only when data is supplied)
