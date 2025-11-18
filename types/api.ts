/**
 * API Type Definitions
 * Based on Laravel API responses
 */

// ============================================================================
// Common Types
// ============================================================================

export interface Image {
  id?: number;
  url: string;
  path?: string;
  alt?: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  from: number;
  to: number;
  has_more_pages: boolean;
  last_page: number;
  total: number;
  links: {
    first: string;
    last: string;
  };
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
  };
}

// ============================================================================
// Technology Types
// ============================================================================

export interface Technology {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Hospital Types
// ============================================================================

export interface Hospital {
  id: number;
  name: string;
  slug: string;
  description: string | { en: string; id: string };
  address: string;
  latitude: number;
  longitude: number;
  province_code: string | null;
  city_code: string | null;
  email: string | null;
  phone: string | null;
  emergency_phone: string | null;
  call_center: string | null;
  actived_at: string;
  is_active: boolean;
  hinai_id: string;
  count_views: number;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Doctor Types
// ============================================================================

export interface DoctorSpecialization {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
  pivot?: {
    employee_id: number;
    master_specialization_id: number;
  };
}

export interface DoctorHospitalAssignment {
  id: number;
  employee_id: number;
  polyclinic_id: number;
  hospital_id: number;
  created_at: string;
  updated_at: string;
  hospital: Hospital;
}

export interface DoctorMediaSocial {
  id: number;
  employee_id: number;
  name: string;
  icon: string;
  icon_pack: string;
  username: string;
  url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorUniversity {
  id: number;
  employee_id: number;
  university_id: number;
  degree: string;
  major: string;
  start_year: string;
  end_year: string;
  is_graduated: boolean;
  certificate_number: string;
  created_at: string;
  updated_at: string;
}

export interface DoctorPosition {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorDepartment {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorArticle {
  id: number;
  writer_type: string;
  writer_id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  published_at: string | null;
  status: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  bio: string;
  photo: string | null;
  nik: string;
  phone: string;
  email: string | null;
  gender: "male" | "female" | "other";
  birthdate: string;
  birthplace: string;
  marital_status: string;
  blood_type: string;
  str_number: string;
  sip_number: string;
  sip_validate_at: string;
  sip_validated: boolean;
  available_leaves: number;
  rating: number;
  status: string;
  level: string;
  created_at: string;
  updated_at: string;
  hospitals: Hospital[];
  hospital_assignments: DoctorHospitalAssignment[];
  specializations: DoctorSpecialization[];
  media_socials: DoctorMediaSocial[];
  universities: DoctorUniversity[];
  request_leaves: unknown[];
  articles: DoctorArticle[];
  position: DoctorPosition | null;
  department: DoctorDepartment | null;
  user: unknown | null;
}

// ============================================================================
// Facility Types
// ============================================================================

export interface Facility {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Insurance Types
// ============================================================================

export interface Insurance {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Partner Types
// ============================================================================

export interface Partner {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Department Types
// ============================================================================

export interface Department {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Position Types
// ============================================================================

export interface Position {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Specialization Types
// ============================================================================

export interface Specialization {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubSpecialization {
  id: number;
  name: string;
  slug: string;
  title: string | { en: string; id: string };
  description: string | { en: string; id: string };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TechnologySpecialization {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Polyclinic Types
// ============================================================================

export interface Polyclinic {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Offer Types
// ============================================================================

export interface Offer {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Membership Types
// ============================================================================

export interface Membership {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Article Types
// ============================================================================

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  writer_type: string;
  writer_id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  published_at: string | null;
  status: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
  category?: ArticleCategory;
  tags?: ArticleTag[];
}

// ============================================================================
// News Types
// ============================================================================

export interface News {
  id: number;
  writer_type: string;
  writer_id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  published_at: string | null;
  status: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// University Types
// ============================================================================

export interface University {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Bank Types
// ============================================================================

export interface Bank {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Center of Excellence Types
// ============================================================================

export interface CenterOfExcellence {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Corporate Config Types
// ============================================================================

export interface Milestone {
  id: number;
  year: number;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Dictionary {
  id: number;
  key: string;
  value: string;
  language: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: number;
  title: string;
  description: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HelpCenter {
  id: number;
  title: string;
  description: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Statistic {
  id: number;
  title: string;
  value: number;
  unit: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Medical Tourism Types
// ============================================================================

export interface MedicalTourism {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  content_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: Image[] | string[];
}

// ============================================================================
// Doctor Schedule Types
// ============================================================================

export interface DoctorSchedule {
  id: number;
  doctor_id: number;
  hospital_id: number;
  polyclinic_id: number;
  day: string;
  start_time: string;
  end_time: string;
  quota: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorShiftQuota {
  shift_id: number;
  available_quota: number;
  total_quota: number;
  date: string;
}

