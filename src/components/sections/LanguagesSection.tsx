import type { LanguageEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface LanguagesSectionProps {
  entries: LanguageEntry[]
  title?: string
}

export default function LanguagesSection({ entries, title = 'Languages' }: LanguagesSectionProps) {
  return (
    <SectionWrapper title={title}>
      <ul className="space-y-1">
        {entries.map((entry, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)]">
            <span className="font-bold">{entry.language}</span>
            <span className="text-[var(--cv-ink-muted)]"> — {entry.proficiency}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
