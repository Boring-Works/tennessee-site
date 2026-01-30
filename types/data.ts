// Type definitions for JSON data files

export interface Speaker {
  name: string
  title: string
  institution?: string
  bio: string
  portraying?: string
}

export interface Lecture {
  id: number
  title: string
  date: string
  time: string
  speaker: Speaker
  description: string
  topics: string[]
  format?: string
  note?: string
}

export interface LectureSeries {
  title: string
  subtitle: string
  description: string
  year: number
  note: string
}

export interface AdditionalProgramming {
  title: string
  date: string
  endDate: string
  speaker: Omit<Speaker, 'institution' | 'portraying'>
  description: string
  note: string
}

export interface LecturesData {
  series: LectureSeries
  lectures: Lecture[]
  additionalProgramming: AdditionalProgramming
}

export interface Event {
  id: string
  title: string
  date: string
  endDate: string | null
  time: string | null
  type: 'new' | 'enhanced' | 'recurring' | 'milestone'
  category: string
  description: string
  requiresTicket: boolean
  ticketUrl: string | null
  fareHarborId?: string
  pricing?: {
    adult?: number | null
    senior?: number | null
    child?: number | null
    underFive?: number | null
    members?: number | null
  } | null
  featured?: boolean
  speaker?: string
  speakerTitle?: string
  capacity?: number
  ageRecommendation?: string
}

export interface RecurringProgram {
  id: string
  title: string
  tagline: string
  description: string
  schedule: string
  scheduleNote?: string
  time: string
  duration: string
  requiresTicket: boolean
  ticketUrl: string | null
  fareHarborId?: string
  pricing?: {
    adult?: number | null
    senior?: number | null
    child?: number | null
    underFive?: number | null
    members?: number | null
  } | null
  category: string
  icon: string
  highlights?: string[]
  dates?: string[]
  capacity?: number
}

export interface First250Config {
  enrollmentStart: string
  enrollmentEnd: string
  ceremonyDate: string
  url: string
}

export interface EventsData {
  events: Event[]
  recurringPrograms: Record<string, RecurringProgram>
  first250: First250Config
}
