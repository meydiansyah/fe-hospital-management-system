"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type HospitalFacility = {
  title: string;
  description: string;
  image: string;
  href: string;
};

const defaultFacilities: HospitalFacility[] = [
  {
    title: "Layanan 24 Jam",
    description:
      "Unit gawat darurat, farmasi, dan laboratorium siap melayani pasien setiap saat dengan respon cepat.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop",
    href: "/facilities/emergency",
  },
  {
    title: "Instalasi Rawat Jalan",
    description:
      "Klinik rawat jalan menyediakan konsultasi berbagai spesialis dengan sistem antrean digital.",
    image:
      "https://images.unsplash.com/photo-1585903166144-06fb70b4188f?w=900&q=80&auto=format&fit=crop",
    href: "/facilities/outpatient",
  },
  {
    title: "Rawat Jalan",
    description:
      "Layanan konsultasi dan perawatan medis tanpa perlu rawat inap dengan dukungan fasilitas lengkap.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop",
    href: "/facilities/clinic",
  },
  {
    title: "ICU",
    description:
      "Fasilitas perawatan intensif dengan ventilator modern dan monitoring 24 jam oleh tim kritikal.",
    image:
      "https://images.unsplash.com/photo-1576765607924-4ca436b2931b?w=900&q=80&auto=format&fit=crop",
    href: "/facilities/icu",
  },
  {
    title: "Kamar Rawat Inap",
    description:
      "Pilihan kamar nyaman dengan fasilitas hotel, menyediakan privasi dan kenyamanan bagi pasien dan keluarga.",
    image:
      "https://images.unsplash.com/photo-1582454057068-07aa5e5d5841?w=900&q=80&auto=format&fit=crop",
    href: "/facilities/inpatient",
  },
];

export default function HospitalFacilitiesSection({
  facilities,
}: {
  facilities?: HospitalFacility[];
}) {
  const facilitiesData = facilities ?? defaultFacilities;
  const trackRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  const scroll = useCallback((direction: "left" | "right", smooth = true) => {
    const container = trackRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild
      ? container.firstElementChild.clientWidth + 24
      : 320;
    const offset = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({
      left: offset,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const visibleClass = (index: number) => {
    if (facilitiesData.length <= 3) return "opacity-100";
    const visibleRange = [
      startIndex,
      (startIndex + 1) % facilitiesData.length,
      (startIndex + 2) % facilitiesData.length,
    ];
    return visibleRange.includes(index)
      ? "opacity-100"
      : "opacity-10 sm:opacity-40";
  };

  useEffect(() => {
    const id = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % facilitiesData.length);
      scroll("right", true);
    }, 5000);
    return () => clearInterval(id);
  }, [facilitiesData.length, scroll]);

  const showPrevious = () => {
    setStartIndex(
      (prev) => (prev - 1 + facilitiesData.length) % facilitiesData.length
    );
    scroll("left");
  };

  const showNext = () => {
    setStartIndex((prev) => (prev + 1) % facilitiesData.length);
    scroll("right");
  };

  return (
    <section className="bg-linear-to-b from-white via-blue-50/40 to-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:px-8">
        <header className="text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-500">
            Fasilitas & Layanan
          </p>
          <h2 className="text-2xl font-semibold text-blue-900 sm:text-3xl">
            Lengkap, Modern, dan Nyaman Untuk Anda.
          </h2>
        </header>

        <div className="relative">
          <button
            type="button"
            onClick={showPrevious}
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-blue-200 bg-white p-3 text-blue-600 shadow-md transition hover:bg-blue-600 hover:text-white sm:flex"
            aria-label="Scroll previous facilities"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {facilitiesData.map((facility, index) => (
              <article
                key={facility.title}
                className={`min-w-[260px] flex-1 snap-start overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/40 transition hover:border-blue-200 hover:shadow-xl md:min-w-[280px] ${visibleClass(
                  index
                )}`}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {facility.description}
                  </p>
                  <Link
                    href={facility.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Lihat Selengkapnya <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-blue-200 bg-white p-3 text-blue-600 shadow-md transition hover:bg-blue-600 hover:text-white sm:flex"
            aria-label="Scroll next facilities"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
