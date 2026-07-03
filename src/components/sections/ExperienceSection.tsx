import type { ExperienceEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface ExperienceSectionProps {
  entries: ExperienceEntry[]
  title?: string
  competenciesLabel?: string
  technologiesLabel?: string
}

export default function ExperienceSection({
  entries,
  title = 'Experience',
  competenciesLabel = 'Competencies',
  technologiesLabel = 'Technologies',
}: ExperienceSectionProps) {
  return (
    <SectionWrapper title={title}>
      {entries.map((entry, i) => (
        <div key={i} className="mb-6 print:break-inside-avoid">
          <div className="flex justify-between items-baseline">
            <span className="text-[0.95rem] font-bold text-[var(--cv-ink)]">{entry.company}</span>
            <span className="text-[0.85rem] text-[var(--cv-ink-muted)]">{entry.period}</span>
          </div>
          <p className="text-[0.9rem] text-[var(--cv-ink-muted)] mb-2">{entry.role}</p>
          <p className="text-[0.9rem] text-[var(--cv-ink)] mb-3 leading-relaxed">
            {entry.description}
          </p>
          {entry.competencies.length > 0 && (
            <>
              <p className="text-[0.85rem] font-bold text-[var(--cv-ink)] mb-1">
                {competenciesLabel}
              </p>
              <ol className="list-decimal list-inside text-[0.9rem] text-[var(--cv-ink)] space-y-1 mb-3">
                {entry.competencies.map((c, j) => (
                  <li key={j}>{c}</li>
                ))}
              </ol>
            </>
          )}
          {entry.technologies.length > 0 && (
            <>
              <p className="text-[0.85rem] font-bold text-[var(--cv-ink)] mb-1">
                {technologiesLabel}
              </p>
              <ul className="text-[0.9rem] text-[var(--cv-ink)] space-y-1">
                {entry.technologies.map((t, j) => (
                  <li key={j} className="before:content-['·'] before:mr-2">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </SectionWrapper>
  )
}
