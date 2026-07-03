interface SectionWrapperProps {
  title: string
  children: React.ReactNode
}

export default function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <section className="mt-12 print:break-inside-avoid">
      <hr className="border-[var(--cv-rule)] mb-1" />
      <h2 className="text-[0.85rem] font-bold tracking-widest uppercase text-[var(--cv-ink)] mb-1">
        {title}
      </h2>
      <hr className="border-[var(--cv-rule)] mb-4" />
      {children}
    </section>
  )
}
