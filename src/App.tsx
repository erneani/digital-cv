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
