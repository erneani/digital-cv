export interface ContactInfo {
  phone?: string
  email: string
  location: string
  github?: string
  linkedin?: string
  website?: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  description: string
  competencies: string[]
  technologies: string[]
}

export interface EducationEntry {
  institution: string
  institutionUrl?: string
  degree: string
  period: string
}

export interface LanguageEntry {
  language: string
  proficiency: string
}

export interface ProjectEntry {
  name: string
  description: string
  techStack: string[]
  url?: string
}

export interface CVData {
  name: string
  title: string
  contact: ContactInfo
  about: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  languages: LanguageEntry[]
  interests: string[]
  community: string[]
  projects?: ProjectEntry[]
}

export type Locale = 'en' | 'pt-br' | 'es'
