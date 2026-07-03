import type { ProjectEntry } from '../../types/cv'
import SectionWrapper from './SectionWrapper'

interface ProjectsSectionProps {
  entries: ProjectEntry[]
  title?: string
}

export default function ProjectsSection({ entries, title = 'Projects' }: ProjectsSectionProps) {
  return (
    <SectionWrapper title={title}>
      {entries.map((entry, i) => (
        <div key={i} className="mb-4 print:break-inside-avoid">
          <span className="text-[0.95rem] font-bold text-[var(--cv-ink)]">
            {entry.url ? (
              <a href={entry.url} target="_blank" rel="noreferrer" className="underline">
                {entry.name}
              </a>
            ) : (
              entry.name
            )}
          </span>
          <p className="text-[0.9rem] text-[var(--cv-ink)] mt-1 mb-2 leading-relaxed">
            {entry.description}
          </p>
          <p className="text-[0.85rem] text-[var(--cv-ink-muted)]">
            {entry.techStack.join(' · ')}
          </p>
        </div>
      ))}
    </SectionWrapper>
  )
}
