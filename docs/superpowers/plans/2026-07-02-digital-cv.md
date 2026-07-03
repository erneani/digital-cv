# Digital CV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal CV website with trilingual content, light/dark theme, and PDF export — styled as a Courier Prime typewriter document with no decorative UI chrome.

**Architecture:** Vite + React SPA. CV content lives in typed `content/[lang].ts` data files consumed by section components; `react-i18next` handles only UI chrome strings. Theme is driven by `data-theme` on `<html>`, set before first paint via inline script to prevent flash. PDF export via `react-to-print` (triggers browser print dialog).

**Tech Stack:** Vite 6, React 19, TypeScript (strict), Tailwind CSS v4, react-i18next, i18next, react-to-print, Vitest, @testing-library/react

## Global Constraints

- TypeScript strict mode: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- No UI component library (MUI, shadcn, etc.) — Tailwind + hand-rolled components only
- Runtime dependencies limited to: react, react-dom, react-i18next, i18next, react-to-print
- Font: Courier Prime from Google Fonts, weights 400 and 700 only
- Locales: `en`, `pt-br`, `es`
- Color tokens (CSS custom properties): `--cv-bg`, `--cv-ink`, `--cv-ink-muted`, `--cv-rule`
- Light: `--cv-bg: #F8F6F1`, `--cv-ink: #1C1B19`, `--cv-ink-muted: #5C5A55`, `--cv-rule: #C8C5BE`
- Dark: `--cv-bg: #1C1B19`, `--cv-ink: #DEDBD2`, `--cv-ink-muted: #8A8780`, `--cv-rule: #3A3835`
- Max CV content width: `680px`, centered
- Deploy target: GitHub Pages (repo name: `digital-cv`, base path: `/digital-cv/`)
- localStorage key for theme: `cv-theme`; for locale: `cv-locale`
- PDF always prints with light-theme colors regardless of active UI theme

---

### Task 1: Project Scaffold

**Files:**
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `tsconfig.app.json`
- Create: `vitest.config.ts`
- Create: `src/test-setup.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx` (minimal shell)
- Create: `src/index.css`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: working dev server at `http://localhost:5173/digital-cv/`, passing `npm test` with empty suite, `npm run build` succeeds

- [ ] **Step 1: Initialize Vite project**

```bash
npm create vite@latest . -- --template react-ts
npm install
```

Answer `y` to any overwrite prompts.

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install react-i18next i18next react-to-print
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

- [ ] **Step 4: Configure vite.config.ts**

Replace the generated `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/digital-cv/',
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 5: Configure TypeScript strict mode**

Replace `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Add test scripts to package.json**

In `package.json` scripts section, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 8: Configure index.html**

Replace the generated `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Vinícius Ernani — Senior Software Engineer CV" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <title>Vinícius Ernani — CV</title>
    <script>
      // Set theme before first paint to prevent flash of wrong theme
      ;(function () {
        var stored = localStorage.getItem('cv-theme')
        var theme =
          stored ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', theme)
      })()
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Set up base CSS**

Replace `src/index.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  --font-mono: "Courier Prime", "Courier New", monospace;
}

:root {
  --cv-bg: #F8F6F1;
  --cv-ink: #1C1B19;
  --cv-ink-muted: #5C5A55;
  --cv-rule: #C8C5BE;
}

[data-theme="dark"] {
  --cv-bg: #1C1B19;
  --cv-ink: #DEDBD2;
  --cv-ink-muted: #8A8780;
  --cv-rule: #3A3835;
}

body {
  font-family: "Courier Prime", "Courier New", monospace;
  background-color: var(--cv-bg);
  color: var(--cv-ink);
}
```

- [ ] **Step 10: Write minimal App.tsx**

```tsx
export default function App() {
  return <main style={{ padding: '2rem', fontFamily: 'monospace' }}>CV loads here</main>
}
```

- [ ] **Step 11: Write main.tsx**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 12: Create GitHub Actions deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 13: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173/digital-cv/`.

Expected: page loads with "CV loads here" in monospace font, Courier Prime renders (visible in DevTools → Fonts), no console errors.

- [ ] **Step 14: Run tests (empty suite)**

```bash
npm test
```

Expected: `No test files found` or `0 tests`, exit 0.

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "feat: project scaffold — Vite, React, TypeScript strict, Tailwind v4, Vitest"
```

---

### Task 2: Types + Content Data

**Files:**
- Create: `src/types/cv.ts`
- Create: `src/content/en.ts`
- Create: `src/content/pt-br.ts`
- Create: `src/content/es.ts`
- Create: `src/content/index.ts`
- Create: `src/content/index.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `CVData`, `Locale`, `ExperienceEntry`, `EducationEntry`, `LanguageEntry`, `ProjectEntry`, `ContactInfo` (from `src/types/cv.ts`); `getContent(locale: Locale): CVData` (from `src/content/index.ts`)

- [ ] **Step 1: Write the failing test**

Create `src/content/index.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getContent } from './index'

describe('getContent', () => {
  it('returns English content for "en"', () => {
    const data = getContent('en')
    expect(data.name).toBe('Vinícius Ernani')
    expect(data.experience.length).toBeGreaterThan(0)
    expect(data.contact.email).toBe('viniciusernanicarvalho@gmail.com')
  })

  it('returns Portuguese content for "pt-br"', () => {
    const data = getContent('pt-br')
    expect(data.name).toBe('Vinícius Ernani')
    expect(data.languages[0].proficiency).toBe('nativo')
  })

  it('returns Spanish content for "es"', () => {
    const data = getContent('es')
    expect(data.name).toBe('Vinícius Ernani')
    expect(data.languages[0].proficiency).toBe('nativo')
  })

  it('falls back to English for unknown locale', () => {
    // @ts-expect-error testing runtime fallback
    const data = getContent('fr')
    expect(data.contact.email).toBe('viniciusernanicarvalho@gmail.com')
  })
})
```

- [ ] **Step 2: Run test to confirm failure**

```bash
npm test
```

Expected: FAIL — `Cannot find module './index'`

- [ ] **Step 3: Define CVData types**

Create `src/types/cv.ts`:

```ts
export interface ContactInfo {
  phone?: string
  email: string
  location: string
  github?: string
  linkedin?: string
  website?: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  description: string
  competencies: string[]
  technologies: string[]
}

export interface EducationEntry {
  institution: string
  institutionUrl?: string
  degree: string
  period: string
}

export interface LanguageEntry {
  language: string
  proficiency: string
}

export interface ProjectEntry {
  name: string
  description: string
  techStack: string[]
  url?: string
}

export interface CVData {
  name: string
  title: string
  contact: ContactInfo
  about: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  languages: LanguageEntry[]
  interests: string[]
  community: string[]
  projects?: ProjectEntry[]
}

export type Locale = 'en' | 'pt-br' | 'es'
```

- [ ] **Step 4: Create English content**

Create `src/content/en.ts`:

```ts
import type { CVData } from '../types/cv'

const en: CVData = {
  name: 'Vinícius Ernani',
  title: 'Senior Software Engineer',
  contact: {
    phone: '+55 84 99147-9189',
    email: 'viniciusernanicarvalho@gmail.com',
    location: 'Natal, Rio Grande do Norte, Brazil',
    github: 'github.com/erneani',
  },
  about:
    "I am a full-cycle software engineer with 7 years of experience in some of the world's major companies. My specialities are Front End development and Software Architecture.",
  experience: [
    {
      company: 'Mercado Libre',
      role: 'Senior Software Engineer',
      period: 'Feb 2024 – present',
      description: 'Joined Mercado Libre to improve the Marketplace products.',
      competencies: [
        'Create scalable, user-centric applications with strong accessibility, internationalization, and resilience.',
        'Design and create a service to quickly and globally notify users through UI in the application.',
      ],
      technologies: [
        'JavaScript (React) for Front End development.',
        'Java (Spring) for Back End development.',
        'GitHub Actions for CI and CD.',
        'React Testing Library and Jest for code quality.',
      ],
    },
    {
      company: 'Thoughtworks',
      role: 'Software Consultant',
      period: 'May 2021 – Jan 2024',
      description:
        'Joined Thoughtworks to provide technological expertise for other companies around the world.',
      competencies: [
        'Provided maintenance and scalability for a legacy and critical financial spreadsheet application for a US big Real Estate company.',
        'Worked on the creation of a globally distributed mathematical application with real-time data for a US big Oil and Gas company.',
        'Provided technical and business expertise to improve client retention for products in a big Oil and Gas company.',
      ],
      technologies: [
        'JavaScript and TypeScript (React and Angular) for Front End development.',
        'Python (FastAPI), C# (.NET), Node.js (Express), and Java (Spring) for Back End development.',
        'AWS, Google Cloud, and Azure for cloud services.',
        'Postgres, Redis, MariaDB, and MySQL for databases.',
        'Kafka, RabbitMQ and Azure Service Bus for message brokers.',
        'GitHub Actions, Jenkins, and CircleCI for CI and CD.',
        'React Testing Library, Jest, Pytest, SonarQube and many other testing tools for code quality.',
      ],
    },
    {
      company: 'Globo.com',
      role: 'SmartTV Software Engineer',
      period: 'Sep 2020 – Apr 2021',
      description:
        "Joined Globo.com to research and create solutions for the SmartTV environment at LATAM's biggest streaming company, Globoplay.",
      competencies: [
        'Delivered pixel-perfect, fast, and lightweight web components for a streaming platform with more than 5 million monthly users.',
        'Researched and refined technologies to improve application usability and responsiveness using React and Canvas.',
        'Co-implemented a robust fallback system that increased user screen time during peak hours.',
        'Changed project architecture to avoid re-fetching hardware information for each component.',
      ],
      technologies: [
        'JavaScript (React and vanilla) for Front End development.',
        'GraphQL for database queries.',
        'Redux for global state management.',
        'React Testing Library and Jest for unit testing.',
        'Cypress for E2E testing.',
        'Storybook for component documentation.',
      ],
    },
  ],
  education: [
    {
      institution: 'Federal University of Rio Grande do Norte (UFRN)',
      institutionUrl: 'https://www.ufrn.br/',
      degree: 'Information Technology degree',
      period: '2019 – 2024',
    },
    {
      institution:
        'Federal Institute of Education, Science, and Technology of Rio Grande do Norte (IFRN)',
      institutionUrl: 'https://portal.ifrn.edu.br/',
      degree: 'Informatics technical degree',
      period: '2015 – 2019',
    },
    {
      institution: 'Digital Metrópolis Institute (IMD)',
      institutionUrl: 'https://www.metropoledigital.ufrn.br/portal/',
      degree: 'Web Informatics technical degree',
      period: '2017 – 2020',
    },
  ],
  languages: [
    { language: 'Portuguese', proficiency: 'native' },
    { language: 'English', proficiency: 'professional' },
    { language: 'Spanish', proficiency: 'professional' },
    { language: 'French', proficiency: 'conversational' },
  ],
  interests: [
    'Code quality improvements and tests.',
    'Reactive software architectures.',
    'Discrete mathematics and graphs.',
    'Algorithm performance and asymptotic notation.',
  ],
  community: [
    'Placeholder: add your community contributions here.',
  ],
}

export default en
```

- [ ] **Step 5: Create Brazilian Portuguese content**

Create `src/content/pt-br.ts`:

```ts
import type { CVData } from '../types/cv'

const ptBr: CVData = {
  name: 'Vinícius Ernani',
  title: 'Engenheiro de Software Sênior',
  contact: {
    phone: '+55 84 99147-9189',
    email: 'viniciusernanicarvalho@gmail.com',
    location: 'Natal, Rio Grande do Norte, Brasil',
    github: 'github.com/erneani',
  },
  about:
    'Sou um engenheiro de software full-cycle com 7 anos de experiência em algumas das maiores empresas do mundo. Minhas especialidades são desenvolvimento Front End e Arquitetura de Software.',
  experience: [
    {
      company: 'Mercado Livre',
      role: 'Engenheiro de Software Sênior',
      period: 'fev. 2024 – presente',
      description: 'Ingressei no Mercado Livre para melhorar os produtos do Marketplace.',
      competencies: [
        'Criar aplicações escaláveis e centradas no usuário com forte acessibilidade, internacionalização e resiliência.',
        'Projetar e criar um serviço para notificar usuários de forma rápida e global através da UI da aplicação.',
      ],
      technologies: [
        'JavaScript (React) para desenvolvimento Front End.',
        'Java (Spring) para desenvolvimento Back End.',
        'GitHub Actions para CI e CD.',
        'React Testing Library e Jest para qualidade de código.',
      ],
    },
    {
      company: 'Thoughtworks',
      role: 'Consultor de Software',
      period: 'mai. 2021 – jan. 2024',
      description:
        'Ingressei na Thoughtworks para fornecer expertise tecnológica para empresas ao redor do mundo.',
      competencies: [
        'Providenciei manutenção e escalabilidade para uma aplicação de planilha financeira legada e crítica de uma grande empresa de Real Estate dos EUA.',
        'Trabalhei na criação de uma aplicação matemática globalmente distribuída com dados em tempo real para uma grande empresa de Petróleo e Gás dos EUA.',
        'Forneci expertise técnica e de negócio para melhorar a retenção de clientes em produtos de uma grande empresa de Petróleo e Gás.',
      ],
      technologies: [
        'JavaScript e TypeScript (React e Angular) para desenvolvimento Front End.',
        'Python (FastAPI), C# (.NET), Node.js (Express) e Java (Spring) para desenvolvimento Back End.',
        'AWS, Google Cloud e Azure para serviços em nuvem.',
        'Postgres, Redis, MariaDB e MySQL para bancos de dados.',
        'Kafka, RabbitMQ e Azure Service Bus para message brokers.',
        'GitHub Actions, Jenkins e CircleCI para CI e CD.',
        'React Testing Library, Jest, Pytest, SonarQube e outras ferramentas de teste para qualidade de código.',
      ],
    },
    {
      company: 'Globo.com',
      role: 'Engenheiro de Software SmartTV',
      period: 'set. 2020 – abr. 2021',
      description:
        'Ingressei na Globo.com para pesquisar e criar soluções para o ambiente SmartTV na maior empresa de streaming da LATAM, o Globoplay.',
      competencies: [
        'Entregue componentes web pixel-perfect, rápidos e leves para uma plataforma de streaming com mais de 5 milhões de usuários mensais.',
        'Pesquisei e refinei tecnologias para melhorar a usabilidade e responsividade da aplicação usando React e Canvas.',
        'Co-implementei um robusto sistema de fallback que aumentou o tempo de tela dos usuários nos horários de pico.',
        'Alterei a arquitetura do projeto para evitar a re-busca de informações de hardware em cada componente.',
      ],
      technologies: [
        'JavaScript (React e vanilla) para desenvolvimento Front End.',
        'GraphQL para consultas no banco de dados.',
        'Redux para gerenciamento de estado global.',
        'React Testing Library e Jest para testes unitários.',
        'Cypress para testes E2E.',
        'Storybook para documentação de componentes.',
      ],
    },
  ],
  education: [
    {
      institution: 'Universidade Federal do Rio Grande do Norte (UFRN)',
      institutionUrl: 'https://www.ufrn.br/',
      degree: 'Bacharelado em Tecnologia da Informação',
      period: '2019 – 2024',
    },
    {
      institution:
        'Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte (IFRN)',
      institutionUrl: 'https://portal.ifrn.edu.br/',
      degree: 'Técnico em Informática',
      period: '2015 – 2019',
    },
    {
      institution: 'Instituto Metrópole Digital (IMD)',
      institutionUrl: 'https://www.metropoledigital.ufrn.br/portal/',
      degree: 'Técnico em Informática para Internet',
      period: '2017 – 2020',
    },
  ],
  languages: [
    { language: 'Português', proficiency: 'nativo' },
    { language: 'Inglês', proficiency: 'profissional' },
    { language: 'Espanhol', proficiency: 'profissional' },
    { language: 'Francês', proficiency: 'conversacional' },
  ],
  interests: [
    'Melhorias de qualidade de código e testes.',
    'Arquiteturas de software reativas.',
    'Matemática discreta e grafos.',
    'Desempenho de algoritmos e notação assintótica.',
  ],
  community: [
    'Placeholder: adicione suas contribuições comunitárias aqui.',
  ],
}

export default ptBr
```

- [ ] **Step 6: Create Spanish content**

Create `src/content/es.ts`:

```ts
import type { CVData } from '../types/cv'

const es: CVData = {
  name: 'Vinícius Ernani',
  title: 'Ingeniero de Software Senior',
  contact: {
    phone: '+55 84 99147-9189',
    email: 'viniciusernanicarvalho@gmail.com',
    location: 'Natal, Rio Grande do Norte, Brasil',
    github: 'github.com/erneani',
  },
  about:
    'Soy un ingeniero de software full-cycle con 7 años de experiencia en algunas de las principales empresas del mundo. Mis especialidades son el desarrollo Front End y la Arquitectura de Software.',
  experience: [
    {
      company: 'Mercado Libre',
      role: 'Ingeniero de Software Senior',
      period: 'feb. 2024 – presente',
      description: 'Me uní a Mercado Libre para mejorar los productos del Marketplace.',
      competencies: [
        'Crear aplicaciones escalables y centradas en el usuario con fuerte accesibilidad, internacionalización y resiliencia.',
        'Diseñar y crear un servicio para notificar a los usuarios de forma rápida y global a través de la UI de la aplicación.',
      ],
      technologies: [
        'JavaScript (React) para desarrollo Front End.',
        'Java (Spring) para desarrollo Back End.',
        'GitHub Actions para CI y CD.',
        'React Testing Library y Jest para calidad de código.',
      ],
    },
    {
      company: 'Thoughtworks',
      role: 'Consultor de Software',
      period: 'may. 2021 – ene. 2024',
      description:
        'Me uní a Thoughtworks para brindar experiencia tecnológica a otras empresas alrededor del mundo.',
      competencies: [
        'Proporcioné mantenimiento y escalabilidad para una aplicación de hoja de cálculo financiera legada y crítica para una gran empresa de Real Estate de EE.UU.',
        'Trabajé en la creación de una aplicación matemática distribuida globalmente con datos en tiempo real para una gran empresa de Petróleo y Gas de EE.UU.',
        'Proporcioné experiencia técnica y de negocio para mejorar la retención de clientes en productos de una gran empresa de Petróleo y Gas.',
      ],
      technologies: [
        'JavaScript y TypeScript (React y Angular) para desarrollo Front End.',
        'Python (FastAPI), C# (.NET), Node.js (Express) y Java (Spring) para desarrollo Back End.',
        'AWS, Google Cloud y Azure para servicios en la nube.',
        'Postgres, Redis, MariaDB y MySQL para bases de datos.',
        'Kafka, RabbitMQ y Azure Service Bus para message brokers.',
        'GitHub Actions, Jenkins y CircleCI para CI y CD.',
        'React Testing Library, Jest, Pytest, SonarQube y otras herramientas de prueba para calidad de código.',
      ],
    },
    {
      company: 'Globo.com',
      role: 'Ingeniero de Software SmartTV',
      period: 'sep. 2020 – abr. 2021',
      description:
        'Me uní a Globo.com para investigar y crear soluciones para el entorno SmartTV en la mayor empresa de streaming de LATAM, Globoplay.',
      competencies: [
        'Entregué componentes web pixel-perfect, rápidos y ligeros para una plataforma de streaming con más de 5 millones de usuarios mensuales.',
        'Investigué y refiné tecnologías para mejorar la usabilidad y responsividad de la aplicación usando React y Canvas.',
        'Co-implementé un robusto sistema de respaldo que aumentó el tiempo en pantalla de los usuarios durante las horas pico.',
        'Cambié la arquitectura del proyecto para evitar la re-obtención de información de hardware en cada componente.',
      ],
      technologies: [
        'JavaScript (React y vanilla) para desarrollo Front End.',
        'GraphQL para consultas en la base de datos.',
        'Redux para gestión de estado global.',
        'React Testing Library y Jest para pruebas unitarias.',
        'Cypress para pruebas E2E.',
        'Storybook para documentación de componentes.',
      ],
    },
  ],
  education: [
    {
      institution: 'Universidad Federal de Rio Grande do Norte (UFRN)',
      institutionUrl: 'https://www.ufrn.br/',
      degree: 'Licenciatura en Tecnología de la Información',
      period: '2019 – 2024',
    },
    {
      institution:
        'Instituto Federal de Educación, Ciencia y Tecnología de Rio Grande do Norte (IFRN)',
      institutionUrl: 'https://portal.ifrn.edu.br/',
      degree: 'Técnico en Informática',
      period: '2015 – 2019',
    },
    {
      institution: 'Instituto Metrópolis Digital (IMD)',
      institutionUrl: 'https://www.metropoledigital.ufrn.br/portal/',
      degree: 'Técnico en Informática para Internet',
      period: '2017 – 2020',
    },
  ],
  languages: [
    { language: 'Portugués', proficiency: 'nativo' },
    { language: 'Inglés', proficiency: 'profesional' },
    { language: 'Español', proficiency: 'profesional' },
    { language: 'Francés', proficiency: 'conversacional' },
  ],
  interests: [
    'Mejoras de calidad de código y pruebas.',
    'Arquitecturas de software reactivas.',
    'Matemáticas discretas y grafos.',
    'Rendimiento de algoritmos y notación asintótica.',
  ],
  community: [
    'Placeholder: agrega tus contribuciones a la comunidad aquí.',
  ],
}

export default es
```

- [ ] **Step 7: Create getContent function**

Create `src/content/index.ts`:

```ts
import type { CVData, Locale } from '../types/cv'
import en from './en'
import ptBr from './pt-br'
import es from './es'

const contentMap: Record<Locale, CVData> = { en, 'pt-br': ptBr, es }

export function getContent(locale: Locale): CVData {
  return contentMap[locale] ?? en
}
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
npm test
```

Expected: 4 tests pass.

- [ ] **Step 9: Commit**

```bash
git add src/types/cv.ts src/content/ vitest.config.ts src/test-setup.ts package.json
git commit -m "feat: CV types and trilingual content data"
```

---

### Task 3: CV Layout + Typography

**Files:**
- Create: `src/styles/print.css`
- Create: `src/components/sections/SectionWrapper.tsx`
- Create: `src/components/sections/ProfileSection.tsx`
- Create: `src/components/sections/ExperienceSection.tsx`
- Create: `src/components/sections/EducationSection.tsx`
- Create: `src/components/sections/LanguagesSection.tsx`
- Create: `src/components/sections/InterestsSection.tsx`
- Create: `src/components/sections/CommunitySection.tsx`
- Create: `src/components/sections/ProjectsSection.tsx`
- Create: `src/components/sections/sections.test.tsx`
- Create: `src/components/CV.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `CVData`, `ContactInfo`, `ExperienceEntry`, `EducationEntry`, `LanguageEntry`, `ProjectEntry` from `src/types/cv.ts`; `getContent(locale: Locale): CVData` from `src/content/index.ts`
- Produces: `<CV ref data={CVData} />` — a `forwardRef` component whose ref is `HTMLElement`, used by react-to-print in Task 6

- [ ] **Step 1: Write component smoke tests**

Create `src/components/sections/sections.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfileSection from './ProfileSection'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import LanguagesSection from './LanguagesSection'
import InterestsSection from './InterestsSection'
import CommunitySection from './CommunitySection'
import en from '../../content/en'

describe('ProfileSection', () => {
  it('renders name as h1 and contact email', () => {
    render(
      <ProfileSection
        name={en.name}
        title={en.title}
        contact={en.contact}
        about={en.about}
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Vinícius Ernani')
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText(en.contact.email)).toBeInTheDocument()
  })
})

describe('ExperienceSection', () => {
  it('renders all company names', () => {
    render(<ExperienceSection entries={en.experience} />)
    expect(screen.getByText('Mercado Libre')).toBeInTheDocument()
    expect(screen.getByText('Thoughtworks')).toBeInTheDocument()
    expect(screen.getByText('Globo.com')).toBeInTheDocument()
  })
})

describe('EducationSection', () => {
  it('renders at least one institution', () => {
    render(<EducationSection entries={en.education} />)
    expect(screen.getByText(/UFRN/)).toBeInTheDocument()
  })
})

describe('LanguagesSection', () => {
  it('renders language and proficiency', () => {
    render(<LanguagesSection entries={en.languages} />)
    expect(screen.getByText(/Portuguese/)).toBeInTheDocument()
    expect(screen.getByText(/native/)).toBeInTheDocument()
  })
})

describe('InterestsSection', () => {
  it('renders at least one interest', () => {
    render(<InterestsSection items={en.interests} />)
    expect(screen.getByText(/Code quality/)).toBeInTheDocument()
  })
})

describe('CommunitySection', () => {
  it('renders list items', () => {
    render(<CommunitySection items={en.community} />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run tests to confirm failure**

```bash
npm test
```

Expected: FAIL — module not found errors for section components.

- [ ] **Step 3: Create SectionWrapper**

Create `src/components/sections/SectionWrapper.tsx`:

```tsx
interface SectionWrapperProps {
  title: string
  children: React.ReactNode
}

export default function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <section className="mt-12 print:break-inside-avoid">
      <hr className="border-[var(--cv-rule)] mb-1" />
      <h2 className="text-[0.85rem] font-bold tracking-widest uppercase text-[var(--cv-ink)] mb-1">
        {title}
      </h2>
      <hr className="border-[var(--cv-rule)] mb-4" />
      {children}
    </section>
  )
}
```

- [ ] **Step 4: Create ProfileSection**

Create `src/components/sections/ProfileSection.tsx`:

```tsx
import type { ContactInfo } from '../../types/cv'

interface ProfileSectionProps {
  name: string
  title: string
  contact: ContactInfo
  about: string
}

export default function ProfileSection({ name, title, contact, about }: ProfileSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="text-[1.5rem] font-bold text-[var(--cv-ink)]">{name}</h1>
      <p className="text-[1rem] text-[var(--cv-ink)] mt-1">{title}</p>
      <address className="not-italic text-[0.8rem] text-[var(--cv-ink-muted)] mt-2 leading-relaxed">
        {contact.email && <span>{contact.email}</span>}
        {contact.phone && <span> · {contact.phone}</span>}
        {contact.location && <span> · {contact.location}</span>}
        {contact.github && (
          <span>
            {' '}·{' '}
            <a
              href={`https://${contact.github}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {contact.github}
            </a>
          </span>
        )}
        {contact.linkedin && (
          <span>
            {' '}·{' '}
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {contact.linkedin}
            </a>
          </span>
        )}
      </address>
      <p className="text-[0.9rem] text-[var(--cv-ink)] mt-4 leading-relaxed">{about}</p>
    </div>
  )
}
```

- [ ] **Step 5: Create ExperienceSection**

Create `src/components/sections/ExperienceSection.tsx`:

```tsx
import type { ExperienceEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface ExperienceSectionProps {
  entries: ExperienceEntry[]
}

export default function ExperienceSection({ entries }: ExperienceSectionProps) {
  return (
    <SectionWrapper title="Experience">
      {entries.map((entry, i) => (
        <div key={i} className="mb-6 print:break-inside-avoid">
          <div className="flex justify-between items-baseline">
            <span className="text-[0.95rem] font-bold text-[var(--cv-ink)]">{entry.company}</span>
            <span className="text-[0.85rem] text-[var(--cv-ink-muted)]">{entry.period}</span>
          </div>
          <p className="text-[0.9rem] text-[var(--cv-ink-muted)] mb-2">{entry.role}</p>
          <p className="text-[0.9rem] text-[var(--cv-ink)] mb-3 leading-relaxed">
            {entry.description}
          </p>
          {entry.competencies.length > 0 && (
            <>
              <p className="text-[0.85rem] font-bold text-[var(--cv-ink)] mb-1">Competencies</p>
              <ol className="list-decimal list-inside text-[0.9rem] text-[var(--cv-ink)] space-y-1 mb-3">
                {entry.competencies.map((c, j) => (
                  <li key={j}>{c}</li>
                ))}
              </ol>
            </>
          )}
          {entry.technologies.length > 0 && (
            <>
              <p className="text-[0.85rem] font-bold text-[var(--cv-ink)] mb-1">Technologies</p>
              <ul className="text-[0.9rem] text-[var(--cv-ink)] space-y-1">
                {entry.technologies.map((t, j) => (
                  <li key={j} className="before:content-['·'] before:mr-2">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </SectionWrapper>
  )
}
```

- [ ] **Step 6: Create EducationSection**

Create `src/components/sections/EducationSection.tsx`:

```tsx
import type { EducationEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface EducationSectionProps {
  entries: EducationEntry[]
}

export default function EducationSection({ entries }: EducationSectionProps) {
  return (
    <SectionWrapper title="Education">
      <ul className="space-y-3">
        {entries.map((entry, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)]">
            {entry.institutionUrl ? (
              <a
                href={entry.institutionUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline"
              >
                {entry.institution}
              </a>
            ) : (
              <span className="font-bold">{entry.institution}</span>
            )}{' '}
            — {entry.degree}
            <span className="text-[var(--cv-ink-muted)]"> ({entry.period})</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
```

- [ ] **Step 7: Create LanguagesSection**

Create `src/components/sections/LanguagesSection.tsx`:

```tsx
import type { LanguageEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface LanguagesSectionProps {
  entries: LanguageEntry[]
}

export default function LanguagesSection({ entries }: LanguagesSectionProps) {
  return (
    <SectionWrapper title="Languages">
      <ul className="space-y-1">
        {entries.map((entry, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)]">
            <span className="font-bold">{entry.language}</span>
            <span className="text-[var(--cv-ink-muted)]"> — {entry.proficiency}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
```

- [ ] **Step 8: Create InterestsSection**

Create `src/components/sections/InterestsSection.tsx`:

```tsx
import SectionWrapper from './SectionWrapper'

interface InterestsSectionProps {
  items: string[]
}

export default function InterestsSection({ items }: InterestsSectionProps) {
  return (
    <SectionWrapper title="Interests">
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)] before:content-['·'] before:mr-2">
            {item}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
```

- [ ] **Step 9: Create CommunitySection**

Create `src/components/sections/CommunitySection.tsx`:

```tsx
import SectionWrapper from './SectionWrapper'

interface CommunitySectionProps {
  items: string[]
}

export default function CommunitySection({ items }: CommunitySectionProps) {
  return (
    <SectionWrapper title="Community">
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)] before:content-['·'] before:mr-2">
            {item}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
```

- [ ] **Step 10: Create ProjectsSection**

Create `src/components/sections/ProjectsSection.tsx`:

```tsx
import type { ProjectEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface ProjectsSectionProps {
  entries: ProjectEntry[]
}

export default function ProjectsSection({ entries }: ProjectsSectionProps) {
  return (
    <SectionWrapper title="Projects">
      {entries.map((entry, i) => (
        <div key={i} className="mb-4 print:break-inside-avoid">
          <span className="text-[0.95rem] font-bold text-[var(--cv-ink)]">
            {entry.url ? (
              <a href={entry.url} target="_blank" rel="noreferrer" className="underline">
                {entry.name}
              </a>
            ) : (
              entry.name
            )}
          </span>
          <p className="text-[0.9rem] text-[var(--cv-ink)] mt-1 mb-2 leading-relaxed">
            {entry.description}
          </p>
          <p className="text-[0.85rem] text-[var(--cv-ink-muted)]">
            {entry.techStack.join(' · ')}
          </p>
        </div>
      ))}
    </SectionWrapper>
  )
}
```

- [ ] **Step 11: Create CV root component**

Create `src/components/CV.tsx`:

```tsx
import { forwardRef } from 'react'
import type { CVData } from '../types/cv'
import ProfileSection from './sections/ProfileSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import LanguagesSection from './sections/LanguagesSection'
import InterestsSection from './sections/InterestsSection'
import CommunitySection from './sections/CommunitySection'
import ProjectsSection from './sections/ProjectsSection'

interface CVProps {
  data: CVData
}

const CV = forwardRef<HTMLElement, CVProps>(function CV({ data }, ref) {
  return (
    <main ref={ref} className="max-w-[680px] mx-auto px-6 py-12">
      <ProfileSection
        name={data.name}
        title={data.title}
        contact={data.contact}
        about={data.about}
      />
      <ExperienceSection entries={data.experience} />
      <EducationSection entries={data.education} />
      <LanguagesSection entries={data.languages} />
      {data.interests.length > 0 && <InterestsSection items={data.interests} />}
      {data.community.length > 0 && <CommunitySection items={data.community} />}
      {data.projects && data.projects.length > 0 && (
        <ProjectsSection entries={data.projects} />
      )}
    </main>
  )
})

export default CV
```

- [ ] **Step 12: Create print CSS**

Create `src/styles/print.css`:

```css
@media print {
  header {
    display: none !important;
  }

  /* Force light theme regardless of data-theme attribute */
  :root,
  [data-theme="dark"] {
    --cv-bg: #F8F6F1 !important;
    --cv-ink: #1C1B19 !important;
    --cv-ink-muted: #5C5A55 !important;
    --cv-rule: #C8C5BE !important;
  }

  body {
    background-color: #F8F6F1 !important;
    color: #1C1B19 !important;
  }

  @page {
    margin: 1.5cm;
  }

  section {
    break-inside: avoid;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
```

- [ ] **Step 13: Update main.tsx to import print CSS**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/print.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 14: Update App.tsx to render CV**

Replace `src/App.tsx`:

```tsx
import CV from './components/CV'
import { getContent } from './content'

export default function App() {
  const data = getContent('en')
  return (
    <div style={{ backgroundColor: 'var(--cv-bg)', minHeight: '100vh' }}>
      <CV data={data} />
    </div>
  )
}
```

- [ ] **Step 15: Run tests to verify they pass**

```bash
npm test
```

Expected: all tests pass (content tests + 6 section smoke tests).

- [ ] **Step 16: Run dev server and check in browser**

```bash
npm run dev
```

Open `http://localhost:5173/digital-cv/`. Verify:
- Courier Prime font renders for all text
- Warm off-white background (`#F8F6F1`)
- Name (`Vinícius Ernani`) in large bold text
- ALL CAPS section headings (EXPERIENCE, EDUCATION, etc.) with horizontal rules above and below
- Company + period on same line, period right-aligned
- No console errors

- [ ] **Step 17: Commit**

```bash
git add src/components/ src/styles/ src/main.tsx src/App.tsx
git commit -m "feat: CV layout, typography, and all section components"
```

---

### Task 4: Theme System

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/hooks/useTheme.test.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `useTheme(): { theme: 'light' | 'dark', toggle: () => void }`

- [ ] **Step 1: Write the failing hook test**

Create `src/hooks/useTheme.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('useTheme', () => {
  it('defaults to light when OS prefers light', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('defaults to dark when OS prefers dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('reads persisted theme from localStorage over OS preference', () => {
    localStorage.setItem('cv-theme', 'dark')
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('toggle switches theme and persists to localStorage', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('cv-theme')).toBe('dark')
  })

  it('toggle updates data-theme attribute on <html>', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
```

- [ ] **Step 2: Run test to confirm failure**

```bash
npm test
```

Expected: FAIL — `Cannot find module './useTheme'`

- [ ] **Step 3: Implement useTheme**

Create `src/hooks/useTheme.ts`:

```ts
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'cv-theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggle() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggle }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: 5 useTheme tests pass, all previous tests still pass.

- [ ] **Step 5: Wire theme into App.tsx**

Replace `src/App.tsx`:

```tsx
import CV from './components/CV'
import { getContent } from './content'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const data = getContent('en')

  return (
    <div style={{ backgroundColor: 'var(--cv-bg)', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0.75rem 1.5rem',
          fontSize: '0.8rem',
          color: 'var(--cv-ink-muted)',
          fontFamily: 'inherit',
        }}
      >
        <button
          onClick={toggle}
          aria-pressed={theme === 'dark'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? '● Dark' : '○ Light'}
        </button>
      </div>
      <CV data={data} />
    </div>
  )
}
```

- [ ] **Step 6: Run dev server and verify**

```bash
npm run dev
```

Expected:
- Toggle button appears top-right
- Clicking switches between `#F8F6F1` (light) and `#1C1B19` (dark) backgrounds
- Ink color, muted text, and rule color all switch
- Refreshing the page preserves selected theme
- Clearing localStorage and refreshing uses OS preference

- [ ] **Step 7: Commit**

```bash
git add src/hooks/useTheme.ts src/hooks/useTheme.test.ts src/App.tsx
git commit -m "feat: light/dark theme with localStorage persistence and OS fallback"
```

---

### Task 5: i18n + Language Selector

**Files:**
- Create: `src/hooks/useLanguage.ts`
- Create: `src/hooks/useLanguage.test.ts`
- Create: `src/i18n/index.ts`
- Create: `src/i18n/locales/en.json`
- Create: `src/i18n/locales/pt-br.json`
- Create: `src/i18n/locales/es.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `useLanguage(): { locale: Locale, setLocale: (locale: Locale) => void }`

- [ ] **Step 1: Write the failing hook test**

Create `src/hooks/useLanguage.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLanguage } from './useLanguage'

beforeEach(() => {
  localStorage.clear()
})

describe('useLanguage', () => {
  it('defaults to "en" when browser language is unrecognised', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR')
    const { result } = renderHook(() => useLanguage())
    expect(result.current.locale).toBe('en')
  })

  it('maps "pt" to "pt-br"', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt')
    const { result } = renderHook(() => useLanguage())
    expect(result.current.locale).toBe('pt-br')
  })

  it('maps "pt-BR" to "pt-br"', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt-BR')
    const { result } = renderHook(() => useLanguage())
    expect(result.current.locale).toBe('pt-br')
  })

  it('maps "es-MX" to "es"', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-MX')
    const { result } = renderHook(() => useLanguage())
    expect(result.current.locale).toBe('es')
  })

  it('reads persisted locale from localStorage over browser preference', () => {
    localStorage.setItem('cv-locale', 'es')
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
    const { result } = renderHook(() => useLanguage())
    expect(result.current.locale).toBe('es')
  })

  it('setLocale updates locale and persists to localStorage', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
    const { result } = renderHook(() => useLanguage())
    act(() => result.current.setLocale('pt-br'))
    expect(result.current.locale).toBe('pt-br')
    expect(localStorage.getItem('cv-locale')).toBe('pt-br')
  })
})
```

- [ ] **Step 2: Run test to confirm failure**

```bash
npm test
```

Expected: FAIL — `Cannot find module './useLanguage'`

- [ ] **Step 3: Implement useLanguage**

Create `src/hooks/useLanguage.ts`:

```ts
import { useState } from 'react'
import type { Locale } from '../types/cv'

const STORAGE_KEY = 'cv-locale'
const SUPPORTED: Locale[] = ['en', 'pt-br', 'es']

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored as Locale)) return stored as Locale
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('pt')) return 'pt-br'
  if (lang.startsWith('es')) return 'es'
  return 'en'
}

export function useLanguage() {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  function setLocale(next: Locale) {
    localStorage.setItem(STORAGE_KEY, next)
    setLocaleState(next)
  }

  return { locale, setLocale }
}
```

- [ ] **Step 4: Create i18n locale files**

Create `src/i18n/locales/en.json`:

```json
{
  "header": {
    "download": "Download PDF",
    "theme_light": "Light",
    "theme_dark": "Dark",
    "lang_en": "English",
    "lang_pt": "Português",
    "lang_es": "Español"
  }
}
```

Create `src/i18n/locales/pt-br.json`:

```json
{
  "header": {
    "download": "Baixar PDF",
    "theme_light": "Claro",
    "theme_dark": "Escuro",
    "lang_en": "English",
    "lang_pt": "Português",
    "lang_es": "Español"
  }
}
```

Create `src/i18n/locales/es.json`:

```json
{
  "header": {
    "download": "Descargar PDF",
    "theme_light": "Claro",
    "theme_dark": "Oscuro",
    "lang_en": "English",
    "lang_pt": "Português",
    "lang_es": "Español"
  }
}
```

- [ ] **Step 5: Set up react-i18next**

Create `src/i18n/index.ts`:

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ptBr from './locales/pt-br.json'
import es from './locales/es.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'pt-br': { translation: ptBr },
    es: { translation: es },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
```

- [ ] **Step 6: Import i18n in main.tsx**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/print.css'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 7: Wire language into App.tsx**

Replace `src/App.tsx`:

```tsx
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CV from './components/CV'
import { getContent } from './content'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import type { Locale } from './types/cv'

export default function App() {
  const { theme, toggle } = useTheme()
  const { locale, setLocale } = useLanguage()
  const { t, i18n } = useTranslation()
  const data = getContent(locale)

  useEffect(() => {
    i18n.changeLanguage(locale)
    document.documentElement.setAttribute('lang', locale)
  }, [locale, i18n])

  return (
    <div style={{ backgroundColor: 'var(--cv-bg)', minHeight: '100vh' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          fontFamily: 'inherit',
          fontSize: '0.8rem',
          color: 'var(--cv-ink-muted)',
        }}
      >
        <select
          value={locale}
          onChange={e => setLocale(e.target.value as Locale)}
          aria-label="Select language"
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            background: 'transparent',
            color: 'inherit',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="en">{t('header.lang_en')}</option>
          <option value="pt-br">{t('header.lang_pt')}</option>
          <option value="es">{t('header.lang_es')}</option>
        </select>
        <button
          onClick={toggle}
          aria-pressed={theme === 'dark'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? t('header.theme_dark') : t('header.theme_light')}
        </button>
      </header>
      <CV data={data} />
    </div>
  )
}
```

- [ ] **Step 8: Run all tests**

```bash
npm test
```

Expected: all tests pass (content, sections, useTheme, useLanguage).

- [ ] **Step 9: Run dev server and verify language switching**

```bash
npm run dev
```

Expected:
- Language dropdown shows English / Português / Español
- Switching language immediately re-renders all CV content (name title stays same, body text and dates change)
- Theme toggle label switches language (Light/Claro/Claro, Dark/Escuro/Oscuro)
- `lang` attribute on `<html>` updates (check DevTools → Elements)
- Refreshing preserves selected language

- [ ] **Step 10: Commit**

```bash
git add src/hooks/useLanguage.ts src/hooks/useLanguage.test.ts src/i18n/ src/main.tsx src/App.tsx
git commit -m "feat: i18n with react-i18next and trilingual language selector"
```

---

### Task 6: PDF Export + Complete Header Component

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Header.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useTheme(): { theme, toggle }`, `useLanguage(): { locale, setLocale }`, `getContent(locale): CVData`, `<CV ref data />` (forwardRef, ref is `React.RefObject<HTMLElement>`)
- Produces: `<Header theme onThemeToggle locale onLocaleChange onPrint />`

- [ ] **Step 1: Write the failing Header test**

Create `src/components/Header.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '../i18n'
import Header from './Header'

describe('Header', () => {
  it('renders language selector with three options', () => {
    render(
      <Header
        theme="light"
        onThemeToggle={vi.fn()}
        locale="en"
        onLocaleChange={vi.fn()}
        onPrint={vi.fn()}
      />,
    )
    expect(screen.getByRole('combobox', { name: /language/i })).toBeInTheDocument()
    expect(screen.getAllByRole('option').length).toBe(3)
  })

  it('renders theme toggle with aria-pressed=true when dark', () => {
    render(
      <Header
        theme="dark"
        onThemeToggle={vi.fn()}
        locale="en"
        onLocaleChange={vi.fn()}
        onPrint={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /light mode/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('renders download button', () => {
    render(
      <Header
        theme="light"
        onThemeToggle={vi.fn()}
        locale="en"
        onLocaleChange={vi.fn()}
        onPrint={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
  })

  it('calls onPrint when download button is clicked', async () => {
    const onPrint = vi.fn()
    render(
      <Header
        theme="light"
        onThemeToggle={vi.fn()}
        locale="en"
        onLocaleChange={vi.fn()}
        onPrint={onPrint}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: /download/i }))
    expect(onPrint).toHaveBeenCalledOnce()
  })

  it('calls onThemeToggle when theme button is clicked', async () => {
    const onThemeToggle = vi.fn()
    render(
      <Header
        theme="light"
        onThemeToggle={onThemeToggle}
        locale="en"
        onLocaleChange={vi.fn()}
        onPrint={vi.fn()}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    expect(onThemeToggle).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run test to confirm failure**

```bash
npm test
```

Expected: FAIL — `Cannot find module './Header'`

- [ ] **Step 3: Implement Header component**

Create `src/components/Header.tsx`:

```tsx
import { useTranslation } from 'react-i18next'
import type { Locale } from '../types/cv'

interface HeaderProps {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onPrint: () => void
}

const LOCALES: Locale[] = ['en', 'pt-br', 'es']
const LOCALE_LABEL_KEYS: Record<Locale, string> = {
  en: 'header.lang_en',
  'pt-br': 'header.lang_pt',
  es: 'header.lang_es',
}

export default function Header({
  theme,
  onThemeToggle,
  locale,
  onLocaleChange,
  onPrint,
}: HeaderProps) {
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <header
      className="flex justify-end items-center gap-4 px-6 py-3 text-[0.8rem] text-[var(--cv-ink-muted)] print:hidden"
      style={{ fontFamily: 'inherit' }}
    >
      <select
        value={locale}
        onChange={e => onLocaleChange(e.target.value as Locale)}
        aria-label="Select language"
        className="bg-transparent text-[var(--cv-ink-muted)] border-none cursor-pointer"
        style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
      >
        {LOCALES.map(l => (
          <option key={l} value={l}>
            {t(LOCALE_LABEL_KEYS[l])}
          </option>
        ))}
      </select>

      <button
        onClick={onThemeToggle}
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="bg-transparent border-none text-[var(--cv-ink-muted)] cursor-pointer"
        style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
      >
        {isDark ? t('header.theme_dark') : t('header.theme_light')}
      </button>

      <button
        onClick={onPrint}
        aria-label={t('header.download')}
        className="bg-transparent border-none text-[var(--cv-ink-muted)] cursor-pointer"
        style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
      >
        {t('header.download')}
      </button>
    </header>
  )
}
```

- [ ] **Step 4: Wire react-to-print in App.tsx**

Replace `src/App.tsx`:

```tsx
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
import CV from './components/CV'
import Header from './components/Header'
import { getContent } from './content'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'

export default function App() {
  const { theme, toggle } = useTheme()
  const { locale, setLocale } = useLanguage()
  const { i18n } = useTranslation()
  const data = getContent(locale)
  const cvRef = useRef<HTMLElement>(null)

  useEffect(() => {
    i18n.changeLanguage(locale)
    document.documentElement.setAttribute('lang', locale)
  }, [locale, i18n])

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `${data.name} — CV`,
  })

  return (
    <div style={{ backgroundColor: 'var(--cv-bg)', minHeight: '100vh' }}>
      <Header
        theme={theme}
        onThemeToggle={toggle}
        locale={locale}
        onLocaleChange={setLocale}
        onPrint={handlePrint}
      />
      <CV ref={cvRef} data={data} />
    </div>
  )
}
```

- [ ] **Step 5: Run all tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 6: Run dev server and verify PDF export**

```bash
npm run dev
```

Expected:
- Header shows language selector, theme toggle, "Download PDF" button — all in Courier Prime, muted color
- Clicking "Download PDF" opens the browser print dialog
- In print preview: header is hidden, background is `#F8F6F1`, ink is `#1C1B19` regardless of active theme
- All text in the preview is selectable (not rasterized)
- Document title in print dialog shows `Vinícius Ernani — CV`

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx src/App.tsx
git commit -m "feat: PDF export via react-to-print and complete header"
```

---

### Task 7: Polish + QA + GitHub Pages Deploy

**Files:**
- Review all files — no new files, minor fixes only

**Interfaces:**
- Produces: deployed site at `https://<username>.github.io/digital-cv/`, Lighthouse ≥ 95

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: all tests pass with no warnings.

- [ ] **Step 2: Type-check the full project**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Build for production**

```bash
npm run build
```

Expected: `dist/` created, no errors. Check `dist/assets/` — combined JS files should be under 400 KB uncompressed (well under 150 KB gzipped).

- [ ] **Step 4: Preview the production build**

```bash
npm run preview
```

Open `http://localhost:4173/digital-cv/`. Verify the production build looks identical to the dev server.

- [ ] **Step 5: Check heading hierarchy**

In the browser, open DevTools → Elements. Confirm:
- One `<h1>` element containing `Vinícius Ernani`
- Multiple `<h2>` elements, one per section (EXPERIENCE, EDUCATION, etc.)
- No skipped heading levels

- [ ] **Step 6: Check keyboard navigation**

Tab through the page from top. Confirm:
- Language `<select>` is focusable and options are navigable with arrow keys
- Theme `<button>` is focusable and activatable with Space/Enter
- Download `<button>` is focusable and activatable with Space/Enter  
- Education institution links are focusable
- GitHub link in profile is focusable

- [ ] **Step 7: Test dark mode print**

Switch to dark mode. Click "Download PDF". In print preview confirm: background is light (`#F8F6F1`), not dark.

- [ ] **Step 8: Test all three locales**

Switch to PT-BR. Verify: title is "Engenheiro de Software Sênior", period reads "fev. 2024 – presente", button reads "Baixar PDF".

Switch to ES. Verify: title is "Ingeniero de Software Senior", period reads "feb. 2024 – presente", button reads "Descargar PDF".

- [ ] **Step 9: Enable GitHub Pages in repository**

In GitHub repository settings:
1. Settings → Pages
2. Source: **GitHub Actions**
3. Save

- [ ] **Step 10: Push to trigger deploy**

```bash
git push origin main
```

Wait for the Actions workflow to complete (visible in the repo's Actions tab). The site will be live at `https://<your-github-username>.github.io/digital-cv/`.

- [ ] **Step 11: Final commit (if any polish fixes were made)**

```bash
git add -A
git commit -m "chore: QA polish and production verification"
```
