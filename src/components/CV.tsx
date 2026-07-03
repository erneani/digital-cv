import { forwardRef } from 'react'
import type { CVData } from '../types/cv'
import ProfileSection from './sections/ProfileSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import LanguagesSection from './sections/LanguagesSection'
import InterestsSection from './sections/InterestsSection'
import CommunitySection from './sections/CommunitySection'
import ProjectsSection from './sections/ProjectsSection'

interface CVProps {
  data: CVData
}

const CV = forwardRef<HTMLElement, CVProps>(function CV({ data }, ref) {
  return (
    <main ref={ref} className="max-w-[680px] mx-auto px-6 py-12">
      <ProfileSection
        name={data.name}
        title={data.title}
        contact={data.contact}
        about={data.about}
      />
      <ExperienceSection
        entries={data.experience}
        title="Experience"
        competenciesLabel="Competencies"
        technologiesLabel="Technologies"
      />
      <EducationSection entries={data.education} title="Education" />
      <LanguagesSection entries={data.languages} title="Languages" />
      {data.interests.length > 0 && <InterestsSection items={data.interests} title="Interests" />}
      {data.community.length > 0 && <CommunitySection items={data.community} title="Community" />}
      {data.projects && data.projects.length > 0 && (
        <ProjectsSection entries={data.projects} title="Projects" />
      )}
    </main>
  )
})

export default CV
