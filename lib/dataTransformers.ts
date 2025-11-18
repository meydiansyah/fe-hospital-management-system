/**
 * Data Transformers
 * Transform API data to component-friendly format
 */

import type {
  Hospital,
  Doctor,
  Article,
  News,
  CenterOfExcellence,
  MedicalTourism,
  Milestone,
  Image,
  Partner,
} from "@/types/api";

// Helper to get image URL from various formats
export function getImageUrl(
  images: Image[] | string[] | undefined,
  fallback?: string
): string {
  const defaultFallback =
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop";
  if (!images || images.length === 0) return fallback || defaultFallback;
  const firstImage = images[0];
  if (typeof firstImage === "string") return firstImage;
  if (typeof firstImage === "object" && "url" in firstImage) {
    return firstImage.url;
  }
  return fallback || defaultFallback;
}

// Helper to get description (can be string or object with en/id)
export function getDescription(
  description: string | { en: string; id: string } | undefined,
  lang: string = "id"
): string {
  if (!description) return "";
  if (typeof description === "string") return description;
  return description[lang as keyof typeof description] || description.en || "";
}

// Transform Hospital to component format
export function transformHospital(hospital: Hospital) {
  const description = getDescription(hospital.description);
  return {
    id: hospital.id,
    name: hospital.name,
    slug: hospital.slug,
    location: hospital.address,
    description,
    phone: hospital.phone || hospital.emergency_phone || "",
    email: hospital.email || "",
    latitude: hospital.latitude,
    longitude: hospital.longitude,
    image: getImageUrl(hospital.images),
    direction: `https://maps.google.com/?q=${hospital.latitude},${hospital.longitude}`,
    profile: `/hospital/${hospital.slug}`,
  };
}

// Transform Doctor to component format
export function transformDoctor(doctor: Doctor) {
  const primarySpecialization =
    doctor.specializations && doctor.specializations.length > 0
      ? doctor.specializations[0]
      : null;
  const specializationName = primarySpecialization
    ? getDescription(primarySpecialization.title)
    : "";

  const primaryHospital =
    doctor.hospitals && doctor.hospitals.length > 0
      ? doctor.hospitals[0]
      : null;

  return {
    id: doctor.id,
    name: doctor.full_name,
    slug: doctor.id.toString(), // Using ID as slug for now
    specialty: specializationName,
    subspecialty: specializationName, // Can be enhanced with sub-specialization
    hospital: primaryHospital?.name || "",
    image: doctor.photo || getImageUrl(undefined),
    bio: doctor.bio,
    rating: doctor.rating,
    hospitals: doctor.hospitals.map((h) => h.name),
    specializations: doctor.specializations.map((s) => ({
      name: getDescription(s.title),
      slug: s.slug,
    })),
  };
}

// Transform Article to component format
export function transformArticle(article: Article) {
  return {
    id: article.id,
    cover: getImageUrl(article.images),
    published_at: article.published_at
      ? new Date(article.published_at).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Draft",
    title: article.title,
    summary: article.description,
    slug: article.slug,
    author: {
      name: "Sentra Medika",
      avatar: getImageUrl(undefined),
    },
  };
}

// Transform News to component format (similar to Article)
export function transformNews(news: News) {
  return transformArticle(news as unknown as Article);
}

// Transform CenterOfExcellence to component format
export function transformCenterOfExcellence(coe: CenterOfExcellence) {
  return {
    id: coe.id,
    name: coe.name,
    slug: coe.slug,
    title: coe.title,
    description: coe.description,
    image: getImageUrl(coe.images),
    logo: getImageUrl(coe.images, "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&q=80&auto=format&fit=crop"),
    pattern: getImageUrl(coe.images, "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?w=400&q=80&auto=format&fit=crop"),
    href: `/center-of-excellence/${coe.slug}`,
    isActive: coe.is_active,
  };
}

// Transform MedicalTourism to component format
export function transformMedicalTourism(tourism: MedicalTourism) {
  return {
    id: tourism.id,
    name: tourism.name,
    slug: tourism.slug,
    title: tourism.title,
    description: tourism.description,
    image: getImageUrl(tourism.images),
    href: `/medical-tourism/${tourism.slug}`,
    isActive: tourism.is_active,
  };
}

// Transform Partner to component format
export function transformPartner(partner: Partner) {
  return {
    id: partner.id,
    name: partner.name,
    slug: partner.slug,
    title: partner.title,
    description: partner.description,
    image: getImageUrl(partner.images),
    logo: getImageUrl(partner.images, "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&q=80&auto=format&fit=crop"),
    href: `/partner/${partner.slug}`,
    isActive: partner.is_active,
  };
}

// Transform Milestone to component format
export function transformMilestone(milestone: Milestone) {
  return {
    year: milestone.year.toString(),
    title: milestone.title,
    description: milestone.description,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80", // Default image, can be enhanced if API provides images
  };
}

// Calculate distance (mock for now, can be enhanced with geolocation)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string {
  // Simple distance calculation (Haversine formula can be added)
  const distance = Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2);
  if (distance < 0.1) return "1 KM";
  if (distance < 1) return `${Math.round(distance * 10)} KM`;
  return `${Math.round(distance)} KM`;
}

// Explicit exports for better tree-shaking and module resolution
export {
  getImageUrl,
  getDescription,
  transformHospital,
  transformDoctor,
  transformArticle,
  transformNews,
  transformCenterOfExcellence,
  transformMedicalTourism,
  transformPartner,
  transformMilestone,
  calculateDistance,
};
