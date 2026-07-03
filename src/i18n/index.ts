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
