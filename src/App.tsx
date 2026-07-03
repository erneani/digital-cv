import CV from './components/CV'
import { getContent } from './content'

export default function App() {
  const data = getContent('en')
  return (
    <div style={{ backgroundColor: 'var(--cv-bg)', minHeight: '100vh' }}>
      <CV data={data} />
    </div>
  )
}
