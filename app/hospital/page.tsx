"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "@/store";
import { transformHospital } from "@/lib/dataTransformers";
import { hospitalDetails } from "./[slug]/page";

// Transform function untuk dummy data
function transformDummyHospital(hospital: (typeof hospitalDetails)[0]) {
  return {
    id: hospital.slug,
    name: hospital.name,
    slug: hospital.slug,
    location: hospital.location,
    distance: "12 KM", // Placeholder
    direction: `https://maps.google.com/?q=${encodeURIComponent(hospital.location)}`,
    profile: `/hospital/${hospital.slug}`,
  };
}

export default function HospitalPage() {
  const { t } = useTranslation();
  const { hospitals, hospitalsLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  // Use API data if available, otherwise fallback to dummy data
  const transformedHospitals =
    hospitals && hospitals.length > 0
      ? hospitals
          .filter((h) => h.is_active)
          .map((hospital) => {
            const transformed = transformHospital(hospital);
            const distance = "12 KM"; // Placeholder - can be enhanced with geolocation
            return { ...transformed, distance };
          })
      : hospitalDetails.map(transformDummyHospital);

  // Don't show loading if we have dummy data
  if (hospitalsLoading && (!hospitals || hospitals.length === 0)) {
    return (
      <section className="bg-white pt-32 pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">
              {t("hospital.loading") || "Memuat data rumah sakit..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (transformedHospitals.length === 0) {
    return (
      <section className="bg-white pt-32 pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">
              {t("hospital.noHospitals") || "Tidak ada rumah sakit tersedia"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-32 pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-500">
              {t("hospital.visit") || "Kunjungi"}
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t("hospital.title") || "Rumah Sakit Sentra Medika"}
            </h2>
            <p className="text-sm text-slate-500 sm:max-w-lg">
              {t("hospital.description") ||
                "Temukan rumah sakit Sentra Medika terdekat dan rencanakan kunjungan Anda dengan mudah melalui peta dan profil layanan lengkap."}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <MapPin className="h-4 w-4" />
            {t("hospital.nationalCoverage") || "Jangkauan Nasional"}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {transformedHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-blue-100 bg-white p-6 shadow-md shadow-blue-100/30 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-blue-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {hospital.distance}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">{hospital.name}</h3>
                  <p className="text-sm text-slate-500">{hospital.location}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm font-semibold">
                <Link
                  href={hospital.direction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  {t("hospital.direction") || "Direction"}
                </Link>
                <Link
                  href={hospital.profile}
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  {t("hospital.viewProfile") || "Lihat Profil"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
