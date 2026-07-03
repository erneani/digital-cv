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
