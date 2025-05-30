export interface RegisterUserType {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  password: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface UserProfile {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  password: string;
}

export interface ExtendedProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  linkedin?: string;
  interests?: string;
  preferred_industries?: string;
  education?: string;
  employment?: string;
  income?: string;
  is_single_parent?: boolean;
  has_disability?: boolean;
  accessibility_requirements?: string;
  opportunity_preferences?: string[];
  preferred_work_format?: string[];
  languages?: string;
  interest_search_phrase?: string;
  devices?: string[];
}

export interface JobAdzunaJobsQueryParams {
  query: string;
  location?: string;
  results_per_page?: number;
  page?: number;
}

export interface AdzunaCategory {
  tag: string;
  label: string;
  __CLASS__?: string;
}

export interface AdzunaCompany {
  display_name: string;
  __CLASS__?: string;
}

export interface AdzunaLocation {
  display_name: string;
  area: string[];
  __CLASS__?: string;
}

export interface AdzunaJob {
  id: string;
  title: string;
  description: string;
  redirect_url: string;
  created: string; // ISO string
  latitude?: number;
  longitude?: number;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: '0' | '1';
  contract_time?: string;
  adref?: string;
  __CLASS__?: string;
  category?: AdzunaCategory;
  company?: AdzunaCompany;
  location?: AdzunaLocation;
}

export type AdzunaJobResponse = AdzunaJob[];
export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}
export interface JobicyJobsQueryParams {
  count?: number
  geo?: string
  industry?: string
  tag?: string
}
export interface JobicyJob {
  id: number
  url: string
  jobSlug: string
  jobTitle: string
  companyName: string
  companyLogo: string
  jobIndustry: string[]
  jobType: string[]
  jobGeo: string
  jobLevel: string
  jobExcerpt: string
  jobDescription: string
  pubDate: string
  annualSalaryMin?: number
  annualSalaryMax?: number
  salaryCurrency?: string
}

export type JobicyJobResponse = JobicyJob[]