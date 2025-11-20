"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type CenterOfExcellence = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
};

// Superior Centers (SWICC & Golden Heart)
const superiorCenters: CenterOfExcellence[] = [
  {
    id: "1",
    name: "Suherman Widyatomo Integrated Cancer Center (SWICC)",
    slug: "swicc",
    logo: "/SWICC.png",
    description:
      "Suherman Widyatomo Integrated Cancer Center (SWICC) merupakan layanan unggulan kanker dari Sentra Medika Hospital Group yan...",
  },
  {
    id: "2",
    name: "Cardiovascular Center",
    slug: "golden-hearth",
    logo: "/GoldenHeart.png",
    description:
      "Cardiovascular Center merupakan pusat pelayanan terpadu Jantung dan Pembuluh Darah didukung oleh alat Catheterization Lab...",
  },
];

// Other Centers
const otherCenters: CenterOfExcellence[] = [
  {
    id: "3",
    name: "Stroke Center",
    slug: "stroke-center",
    logo: "/icon/hospital-facility/brain-center.svg",
    description: "",
  },
  {
    id: "4",
    name: "Uronephrology Center",
    slug: "uronephrology-center",
    logo: "/icon/hospital-facility/pcnl.svg",
    description: "",
  },
  {
    id: "5",
    name: "Orthopedic Center",
    slug: "orthopedic-center",
    logo: "/icon/hospital-facility/orthopedi.svg",
    description: "",
  },
  {
    id: "6",
    name: "Hepatobilier & Digestive Center",
    slug: "hepatobilier-digestive-center",
    logo: "/icon/hospital-facility/mcu.svg",
    description: "",
  },
  {
    id: "7",
    name: "Integrated Women & Child",
    slug: "integrated-women-child",
    logo: "/icon/hospital-facility/rehabilitation.svg",
    description: "",
  },
  {
    id: "8",
    name: "Eye Center",
    slug: "eye-center",
    logo: "/icon/hospital-facility/mcu.svg",
    description: "",
  },
];

export default function CenterOfExcellencePage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold leading-snug text-[#262B7E] sm:text-4xl">
            Centers of Excellence: Menghadirkan Standar Tertinggi dalam Pelayanan Kesehatan
          </h1>
          <p className="text-base leading-relaxed text-slate-700">
            Sentra Medika menghadirkan berbagai Centers of Excellence yang menjadi rujukan dalam
            bidangnya, seperti kardiovaskular, onkologi, ortopedi, dan perinatal. Dengan dukungan
            fasilitas modern, tim multidisiplin, serta pendekatan berbasis bukti, kami berkomitmen
            memberikan hasil klinis terbaik dan pengalaman perawatan yang manusiawi.
          </p>
        </div>

        {/* Superior Centers of Excellence Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-[#262B7E] sm:text-3xl">
            Superior Centers of Excellence
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {superiorCenters.map((center) => (
              <Link
                key={center.id}
                href={`/center-of-excellence/${center.slug}`}
                className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 transition hover:border-[#5B7CFF] hover:shadow-xl"
              >
                {/* Red Pattern Background */}
                <div className="absolute -right-20 -top-20 h-64 w-64 opacity-5">
                  <Image src="/red-pattern.png" alt="" fill className="rotate-12 object-contain" />
                </div>

                <div className="relative flex flex-col gap-6">
                  {/* Logo */}
                  <div className="relative h-16 w-48">
                    <Image
                      src={center.logo}
                      alt={center.name}
                      fill
                      className="object-contain object-left"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-slate-700">{center.description}</p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-[#5B7CFF] font-semibold transition group-hover:gap-3">
                    <span>Selengkapnya</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Centers of Excellence Section */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-[#262B7E] sm:text-3xl">
            Centers of Excellence
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherCenters.map((center) => (
              <Link
                key={center.id}
                href={`/center-of-excellence/${center.slug}`}
                className="group flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-6 transition hover:border-[#5B7CFF] hover:shadow-lg"
              >
                {/* Icon */}
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-slate-100 p-3">
                  <Image src={center.logo} alt={center.name} fill className="object-contain p-1" />
                </div>

                {/* Text */}
                <h3 className="flex-1 text-lg font-bold uppercase text-[#262B7E]">{center.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
