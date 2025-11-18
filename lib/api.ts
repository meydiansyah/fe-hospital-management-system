/**
 * API Utility Service
 * Handles all API calls to Laravel backend
 */

import type {
  ApiResponse,
  Technology,
  Facility,
  Insurance,
  Partner,
  Department,
  Position,
  Specialization,
  SubSpecialization,
  TechnologySpecialization,
  Polyclinic,
  Offer,
  Membership,
  ArticleCategory,
  ArticleTag,
  University,
  Bank,
  Hospital,
  Doctor,
  CenterOfExcellence,
  Article,
  News,
  Milestone,
  Dictionary,
  Banner,
  About,
  Faq,
  Benefit,
  HelpCenter,
  Statistic,
  MedicalTourism,
  DoctorSchedule,
  DoctorShiftQuota,
} from "@/types/api";

const API_BASE_URI =
  process.env.NEXT_PUBLIC_API_BASE_URI || "http://127.0.0.1:8000/api/v1";

export interface ApiError {
  message: string;
  exception?: string;
  file?: string;
  line?: number;
  trace?: unknown[];
}

// Re-export types for convenience
export type {
  Technology,
  Facility,
  Insurance,
  Partner,
  Department,
  Position,
  Specialization,
  SubSpecialization,
  TechnologySpecialization,
  Polyclinic,
  Offer,
  Membership,
  ArticleCategory,
  ArticleTag,
  University,
  Bank,
  Hospital,
  Doctor,
  CenterOfExcellence,
  Article,
  News,
  Milestone,
  Dictionary,
  Banner,
  About,
  Faq,
  Benefit,
  HelpCenter,
  Statistic,
  MedicalTourism,
  DoctorSchedule,
  DoctorShiftQuota,
};

/**
 * Helper function to build query string from params
 */
function buildQueryString(params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Generic API fetch function
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URI}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}

/**
 * Public API endpoints
 */
export const publicApi = {
  // Search
  search: (query: string, params?: Record<string, string>) => {
    const searchParams = new URLSearchParams({ q: query });
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, value);
        }
      });
    }
    return apiFetch(`/public/search?${searchParams.toString()}`);
  },

  // Technologies
  getTechnologies: (params?: Record<string, string>) =>
    apiFetch<Technology[]>(`/public/technologies${buildQueryString(params)}`),
  getTechnology: (id: string | number) =>
    apiFetch<Technology>(`/public/technologies/${id}`),

  // Facilities
  getFacilities: (params?: Record<string, string>) =>
    apiFetch<Facility[]>(`/public/facilities${buildQueryString(params)}`),
  getFacility: (id: string | number) =>
    apiFetch<Facility>(`/public/facilities/${id}`),

  // Insurances
  getInsurances: (params?: Record<string, string>) =>
    apiFetch<Insurance[]>(`/public/insurances${buildQueryString(params)}`),
  getInsurance: (id: string | number) =>
    apiFetch<Insurance>(`/public/insurances/${id}`),

  // Partners
  getPartners: (params?: Record<string, string>) =>
    apiFetch<Partner[]>(`/public/partners${buildQueryString(params)}`),
  getPartner: (id: string | number) =>
    apiFetch<Partner>(`/public/partners/${id}`),

  // Departments
  getDepartments: (params?: Record<string, string>) =>
    apiFetch<Department[]>(`/public/departments${buildQueryString(params)}`),
  getDepartment: (id: string | number) =>
    apiFetch<Department>(`/public/departments/${id}`),

  // Positions
  getPositions: (params?: Record<string, string>) =>
    apiFetch<Position[]>(`/public/positions${buildQueryString(params)}`),
  getPosition: (id: string | number) =>
    apiFetch<Position>(`/public/positions/${id}`),

  // Specializations
  getSpecializations: (params?: Record<string, string>) =>
    apiFetch<Specialization[]>(`/public/specializations${buildQueryString(params)}`),
  getSpecialization: (id: string | number) =>
    apiFetch<Specialization>(`/public/specializations/${id}`),

  // Sub Specializations
  getSubSpecializations: (params?: Record<string, string>) =>
    apiFetch<SubSpecialization[]>(`/public/sub-specializations${buildQueryString(params)}`),
  getSubSpecialization: (id: string | number) =>
    apiFetch<SubSpecialization>(`/public/sub-specializations/${id}`),

  // Technology Specializations
  getTechnologySpecializations: (params?: Record<string, string>) =>
    apiFetch<TechnologySpecialization[]>(`/public/technology-specializations${buildQueryString(params)}`),

  // Polyclinics
  getPolyclinics: (params?: Record<string, string>) =>
    apiFetch<Polyclinic[]>(`/public/polyclinics${buildQueryString(params)}`),
  getPolyclinic: (id: string | number) =>
    apiFetch<Polyclinic>(`/public/masters/polyclinics/${id}`),

  // Offers
  getOffers: (params?: Record<string, string>) =>
    apiFetch<Offer[]>(`/public/offers${buildQueryString(params)}`),
  getOffer: (id: string | number) =>
    apiFetch<Offer>(`/public/offers/${id}`),
  createOfferLead: (data: unknown) =>
    apiFetch(`/public/offers`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Memberships
  getMemberships: (params?: Record<string, string>) =>
    apiFetch<Membership[]>(`/public/memberships${buildQueryString(params)}`),
  getMembership: (id: string | number) =>
    apiFetch<Membership>(`/public/memberships/${id}`),

  // Article Categories
  getArticleCategories: (params?: Record<string, string>) =>
    apiFetch<ArticleCategory[]>(`/public/article-categories${buildQueryString(params)}`),
  getArticleCategory: (id: string | number) =>
    apiFetch<ArticleCategory>(`/public/article-categories/${id}`),

  // Article Tags
  getArticleTags: (params?: Record<string, string>) =>
    apiFetch<ArticleTag[]>(`/public/article-tags${buildQueryString(params)}`),
  getArticleTag: (id: string | number) =>
    apiFetch<ArticleTag>(`/public/article-tags/${id}`),

  // Universities
  getUniversities: (params?: Record<string, string>) =>
    apiFetch<University[]>(`/public/universities${buildQueryString(params)}`),
  getUniversity: (id: string | number) =>
    apiFetch<University>(`/public/universities/${id}`),

  // Banks
  getBanks: (params?: Record<string, string>) =>
    apiFetch<Bank[]>(`/public/banks${buildQueryString(params)}`),
  getBank: (id: string | number) =>
    apiFetch<Bank>(`/public/banks/${id}`),

  // Hospitals
  getHospitals: (params?: Record<string, string>) =>
    apiFetch<Hospital[]>(`/public/hospitals${buildQueryString(params)}`),
  getHospital: (id: string | number) =>
    apiFetch<Hospital>(`/public/hospitals/${id}`),

  // Doctors
  getDoctors: (params?: Record<string, string>) =>
    apiFetch<Doctor[]>(`/public/doctors${buildQueryString(params)}`),
  getDoctor: (id: string | number) =>
    apiFetch<Doctor>(`/public/doctors/${id}`),
  getDoctorSchedules: (doctorId: string | number, params?: Record<string, string>) =>
    apiFetch<DoctorSchedule[]>(`/public/doctors/${doctorId}/schedules${buildQueryString(params)}`),
  getDoctorShiftQuota: (shiftId: string | number) =>
    apiFetch<DoctorShiftQuota>(`/public/doctor-shifts/${shiftId}/quota`),

  // Center of Excellences
  getCenterOfExcellences: (params?: Record<string, string>) =>
    apiFetch<CenterOfExcellence[]>(`/public/center-of-excellences${buildQueryString(params)}`),
  getCenterOfExcellence: (id: string | number) =>
    apiFetch<CenterOfExcellence>(`/public/center-of-excellences/${id}`),

  // Articles
  getArticles: (params?: Record<string, string>) =>
    apiFetch<Article[]>(`/public/articles${buildQueryString(params)}`),
  getArticle: (id: string | number) =>
    apiFetch<Article>(`/public/articles/${id}`),
  likeArticle: (id: string | number) =>
    apiFetch(`/public/articles/${id}/like`, { method: "POST" }),
  shareArticle: (id: string | number) =>
    apiFetch(`/public/articles/${id}/share`, { method: "POST" }),

  // News
  getNews: (params?: Record<string, string>) =>
    apiFetch<News[]>(`/public/news${buildQueryString(params)}`),
  getNewsItem: (id: string | number) =>
    apiFetch<News>(`/public/news/${id}`),
  likeNews: (id: string | number) =>
    apiFetch(`/public/news/${id}/like`, { method: "POST" }),
  shareNews: (id: string | number) =>
    apiFetch(`/public/news/${id}/share`, { method: "POST" }),

  // Corporate Config
  corporateConfig: {
    getMilestones: (params?: Record<string, string>) =>
      apiFetch<Milestone[]>(`/public/corporate-config/milestones${buildQueryString(params)}`),
    getMilestone: (id: string | number) =>
      apiFetch<Milestone>(`/public/corporate-config/milestones/${id}`),
    getDictionaries: (params?: Record<string, string>) =>
      apiFetch<Dictionary[]>(`/public/corporate-config/dictionaries${buildQueryString(params)}`),
    getDictionary: (id: string | number) =>
      apiFetch<Dictionary>(`/public/corporate-config/dictionaries/${id}`),
    getBanners: (params?: Record<string, string>) =>
      apiFetch<Banner[]>(`/public/corporate-config/banners${buildQueryString(params)}`),
    getBanner: (id: string | number) =>
      apiFetch<Banner>(`/public/corporate-config/banners/${id}`),
    getAbout: () =>
      apiFetch<About>(`/public/corporate-config/about`),
    getFaqs: (params?: Record<string, string>) =>
      apiFetch<Faq[]>(`/public/corporate-config/faqs${buildQueryString(params)}`),
    getFaq: (id: string | number) =>
      apiFetch<Faq>(`/public/corporate-config/faqs/${id}`),
    getBenefits: (params?: Record<string, string>) =>
      apiFetch<Benefit[]>(`/public/corporate-config/benefits${buildQueryString(params)}`),
    getBenefit: (id: string | number) =>
      apiFetch<Benefit>(`/public/corporate-config/benefits/${id}`),
    getHelpCenters: (params?: Record<string, string>) =>
      apiFetch<HelpCenter[]>(`/public/corporate-config/help-centers${buildQueryString(params)}`),
    getHelpCenter: (id: string | number) =>
      apiFetch<HelpCenter>(`/public/corporate-config/help-centers/${id}`),
    getStatistics: (params?: Record<string, string>) =>
      apiFetch<Statistic[]>(`/public/corporate-config/statistics${buildQueryString(params)}`),
    getStatistic: (id: string | number) =>
      apiFetch<Statistic>(`/public/corporate-config/statistics/${id}`),
  },

  // Medical Tourism
  getMedicalTourism: (params?: Record<string, string>) =>
    apiFetch<MedicalTourism[]>(`/public/medical-tourism${buildQueryString(params)}`),
  getMedicalTourismItem: (id: string | number) =>
    apiFetch<MedicalTourism>(`/public/medical-tourism/${id}`),
};

