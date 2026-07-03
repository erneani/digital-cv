import CV from './components/CV'
import { getContent } from './content'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const data = getContent('en')

  return (
    <div style={{ backgroundColor: 'var(--cv-bg)', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0.75rem 1.5rem',
          fontSize: '0.8rem',
          color: 'var(--cv-ink-muted)',
          fontFamily: 'inherit',
        }}
      >
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
          {theme === 'dark' ? '● Dark' : '○ Light'}
        </button>
      </div>
      <CV data={data} />
    </div>
  )
}
