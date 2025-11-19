"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/store";
// import { transformHospital } from "@/lib/dataTransformers";

// Dummy data for testing
const dummyHospitals = [
  {
    id: "1",
    name: "Harapan Bunda Hospital",
    location: "Jakarta Timur, DKI Jakarta",
    distance: "12 KM",
    direction: "https://maps.google.com",
    profile: "/hospital/harapan-bunda",
  },
  {
    id: "2",
    name: "Sentra Medika Hospital Cibinong",
    location: "Bogor, Jawa Barat",
    distance: "24 KM",
    direction: "https://maps.google.com",
    profile: "/hospital/cibinong",
  },
  {
    id: "3",
    name: "Sentra Medika Hospital Cikarang",
    location: "Bekasi, Jawa Barat",
    distance: "28KM",
    direction: "https://maps.google.com",
    profile: "/hospital/cikarang",
  },
  {
    id: "4",
    name: "Sentra Medika Hospital Cisalak",
    location: "Depok, Jawa Barat",
    distance: "32 KM",
    direction: "https://maps.google.com",
    profile: "/hospital/cisalak",
  },
  {
    id: "5",
    name: "Sentra Medika Hospital Gempol",
    location: "Cirebon, Jawa Barat",
    distance: "64 KM",
    direction: "https://maps.google.com",
    profile: "/hospital/gempol",
  },
  {
    id: "6",
    name: "Sentra Medika Hospital Minahasa Utara",
    location: "Minahasa Utara, Sulawesi Utara",
    distance: "120 KM",
    direction: "https://maps.google.com",
    profile: "/hospital/minahasa-utara",
  },
];

export default function VisitHospitalSection() {
  // Redux - Commented for now, using dummy data
  // const { hospitals, hospitalsLoading } = useSelector(
  //   (state: RootState) => state.masterData
  // );

  // if (hospitalsLoading || hospitals.length === 0) {
  //   return null;
  // }

  // const transformedHospitals = hospitals
  //   .filter((h) => h.is_active)
  //   .slice(0, 6)
  //   .map((hospital) => {
  //     const transformed = transformHospital(hospital);
  //     return { ...transformed, distance: "12 KM" }; // Placeholder distance
  //   });

  const transformedHospitals = dummyHospitals;
  return (
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Header with Logo */}
        <div className="mb-6">
          <Image
            src="/VisitHospital.png"
            alt="Kunjungi Rumah Sakit"
            width={280}
            height={80}
            className="h-auto w-auto"
            priority
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {transformedHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span>{hospital.distance}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262B7E]">
                    {hospital.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{hospital.location}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={hospital.direction}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#5B7CFF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  <MapPin className="h-4 w-4" />
                  Direction
                </Link>
                <Link
                  href={hospital.profile}
                  className="text-sm font-medium text-slate-600 transition hover:text-[#5B7CFF]"
                >
                  Lihat Profil
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

