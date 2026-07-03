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
