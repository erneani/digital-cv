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
