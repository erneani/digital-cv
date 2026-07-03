import type { EducationEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface EducationSectionProps {
  entries: EducationEntry[]
  title?: string
}

export default function EducationSection({ entries, title = 'Education' }: EducationSectionProps) {
  return (
    <SectionWrapper title={title}>
      <ul className="space-y-3">
        {entries.map((entry, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)]">
            {entry.institutionUrl ? (
              <a
                href={entry.institutionUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline"
              >
                {entry.institution}
              </a>
            ) : (
              <span className="font-bold">{entry.institution}</span>
            )}{' '}
            — {entry.degree}
            <span className="text-[var(--cv-ink-muted)]"> ({entry.period})</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
