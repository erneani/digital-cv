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
