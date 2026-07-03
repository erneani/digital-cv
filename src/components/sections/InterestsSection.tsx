import SectionWrapper from './SectionWrapper'

interface InterestsSectionProps {
  items: string[]
  title?: string
}

export default function InterestsSection({ items, title = 'Interests' }: InterestsSectionProps) {
  return (
    <SectionWrapper title={title}>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[0.9rem] text-[var(--cv-ink)] before:content-['·'] before:mr-2">
            {item}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
