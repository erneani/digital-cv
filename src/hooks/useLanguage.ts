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
