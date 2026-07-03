import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfileSection from './ProfileSection'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import LanguagesSection from './LanguagesSection'
import InterestsSection from './InterestsSection'
import CommunitySection from './CommunitySection'
import en from '../../content/en'

describe('ProfileSection', () => {
  it('renders name as h1 and contact email', () => {
    render(
      <ProfileSection
        name={en.name}
        title={en.title}
        contact={en.contact}
        about={en.about}
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Vinícius Ernani')
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText(en.contact.email)).toBeInTheDocument()
  })
})

describe('ExperienceSection', () => {
  it('renders all company names', () => {
    render(<ExperienceSection entries={en.experience} />)
    expect(screen.getByText('Mercado Libre')).toBeInTheDocument()
    expect(screen.getByText('Thoughtworks')).toBeInTheDocument()
    expect(screen.getByText('Globo.com')).toBeInTheDocument()
  })
})

describe('EducationSection', () => {
  it('renders at least one institution', () => {
    render(<EducationSection entries={en.education} />)
    expect(screen.getByText(/UFRN/)).toBeInTheDocument()
  })
})

describe('LanguagesSection', () => {
  it('renders language and proficiency', () => {
    render(<LanguagesSection entries={en.languages} />)
    expect(screen.getByText(/Portuguese/)).toBeInTheDocument()
    expect(screen.getByText(/native/)).toBeInTheDocument()
  })
})

describe('InterestsSection', () => {
  it('renders at least one interest', () => {
    render(<InterestsSection items={en.interests} />)
    expect(screen.getByText(/Code quality/)).toBeInTheDocument()
  })
})

describe('CommunitySection', () => {
  it('renders list items', () => {
    render(<CommunitySection items={en.community} />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0)
  })
})
