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
