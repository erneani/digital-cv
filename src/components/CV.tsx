import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
        title={t('sections.experience')}
        competenciesLabel={t('sections.competencies')}
        technologiesLabel={t('sections.technologies')}
      />
      <EducationSection entries={data.education} title={t('sections.education')} />
      <LanguagesSection entries={data.languages} title={t('sections.languages')} />
      {data.interests.length > 0 && (
        <InterestsSection items={data.interests} title={t('sections.interests')} />
      )}
      {data.community.length > 0 && (
        <CommunitySection items={data.community} title={t('sections.community')} />
      )}
      {data.projects && data.projects.length > 0 && (
        <ProjectsSection entries={data.projects} title={t('sections.projects')} />
      )}
    </main>
  )
})

export default CV
