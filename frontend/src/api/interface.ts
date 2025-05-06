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
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  skills: string[];
  experience: string;
  linkedin: string;
  interests: string;
  preferred_industries: string;
  education: string;
  employment: string;
  income: string;
  is_single_parent: boolean;
  has_disability: boolean;
  accessibility_requirements: string;
  opportunity_preferences: string[];
  preferred_work_format: string[];
  languages: string;
  devices: string[];
}
