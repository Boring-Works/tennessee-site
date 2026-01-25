// Type definitions for JSON data files

export interface Speaker {
  name: string;
  title: string;
  institution?: string;
  bio: string;
  portraying?: string;
}

export interface Lecture {
  id: number;
  title: string;
  date: string;
  time: string;
  speaker: Speaker;
  description: string;
  topics: string[];
  format?: string;
  note?: string;
}

export interface LectureSeries {
  title: string;
  subtitle: string;
  description: string;
  year: number;
  note: string;
}

export interface AdditionalProgramming {
  title: string;
  date: string;
  endDate: string;
  speaker: Omit<Speaker, "institution" | "portraying">;
  description: string;
  note: string;
}

export interface LecturesData {
  series: LectureSeries;
  lectures: Lecture[];
  additionalProgramming: AdditionalProgramming;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
  time: string | null;
  type: "new" | "enhanced" | "recurring" | "milestone";
  category: string;
  description: string;
  ticketUrl: string | null;
  featured: boolean;
  speaker?: string;
  speakerTitle?: string;
}

export interface EventsData {
  events: Event[];
}
