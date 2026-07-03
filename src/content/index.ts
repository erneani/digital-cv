import type { CVData, Locale } from '../types/cv'
import en from './en'
import ptBr from './pt-br'
import es from './es'

const contentMap: Record<Locale, CVData> = { en, 'pt-br': ptBr, es }

export function getContent(locale: Locale): CVData {
  return contentMap[locale] ?? en
}
