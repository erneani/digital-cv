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
