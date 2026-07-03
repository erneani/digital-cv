import type { ContactInfo } from '../../types/cv'

interface ProfileSectionProps {
  name: string
  title: string
  contact: ContactInfo
  about: string
}

export default function ProfileSection({ name, title, contact, about }: ProfileSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="text-[1.5rem] font-bold text-[var(--cv-ink)]">{name}</h1>
      <p className="text-[1rem] text-[var(--cv-ink)] mt-1">{title}</p>
      <address className="not-italic text-[0.8rem] text-[var(--cv-ink-muted)] mt-2 leading-relaxed">
        {contact.email && <span>{contact.email}</span>}
        {contact.phone && <span> · {contact.phone}</span>}
        {contact.location && <span> · {contact.location}</span>}
        {contact.github && (
          <span>
            {' '}·{' '}
            <a
              href={`https://${contact.github}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {contact.github}
            </a>
          </span>
        )}
        {contact.linkedin && (
          <span>
            {' '}·{' '}
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {contact.linkedin}
            </a>
          </span>
        )}
      </address>
      <p className="text-[0.9rem] text-[var(--cv-ink)] mt-4 leading-relaxed">{about}</p>
    </div>
  )
}
