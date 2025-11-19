"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export type Facility = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const defaultFacilities: Facility[] = [
  {
    id: "1",
    title: "Layanan 24 Jam",
    description:
      "Layanan 24 jam di RS Sentra Medika Cibinong tersedia untuk memenuhi kebutuhan medis Anda kapan pun. Kami siap memberikan perawatan terbaik dengan tim profesional yang berdedikasi.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop",
    href: "/facilities/emergency",
  },
  {
    id: "2",
    title: "Instalasi Rawat Jalan",
    description:
      "Layanan rawat jalan RS Sentra Medika Cibinong menyediakan konsultasi medis dengan dokter spesialis berpengalaman. Fasilitas modern dan sistem antrian digital memudahkan kunjungan Anda.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
    href: "/facilities/outpatient",
  },
  {
    id: "3",
    title: "Rawat Jalan",
    description:
      "Layanan konsultasi dan perawatan medis tanpa perlu rawat inap dengan dukungan fasilitas lengkap dan tim medis profesional.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
    href: "/facilities/clinic",
  },
  {
    id: "4",
    title: "ICU",
    description:
      "Fasilitas perawatan intensif untuk pasien yang mengalami gangguan kesehatan kritis dengan monitoring 24 jam dan peralatan medis canggih.",
    image:
      "https://images.unsplash.com/photo-1576765607924-4ca436b2931b?w=800&q=80&auto=format&fit=crop",
    href: "/facilities/icu",
  },
  {
    id: "5",
    title: "Kamar Rawat Inap",
    description:
      "Instalasi Rawat Inap RS Sentra Medika Cibinong menyediakan berbagai pilihan kelas kamar dengan fasilitas lengkap untuk kenyamanan pasien dan keluarga.",
    image:
      "https://images.unsplash.com/photo-1582454057068-07aa5e5d5841?w=800&q=80&auto=format&fit=crop",
    href: "/facilities/inpatient",
  },
];

export default function FacilitiesCarouselSection({
  facilities,
  sectionTitle = "Fasilitas & Layanan",
  subtitle = "Lengkap, Modern, dan Nyaman Untuk Anda.",
}: {
  facilities?: Facility[];
  sectionTitle?: string;
  subtitle?: string;
}) {
  const facilitiesData = facilities ?? defaultFacilities;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320; // approximate card width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(checkScrollability, 100);
  };

  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-12 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-600">
            {sectionTitle}
          </p>
          <h2 className="text-3xl font-bold text-[#262B7E] sm:text-4xl">
            {subtitle}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[#5A81FA] p-3 text-white shadow-lg transition hover:bg-[#4870e8] disabled:opacity-50 disabled:cursor-not-allowed lg:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {facilitiesData.map((facility) => (
              <article
                key={facility.id}
                className="group flex h-[377px] w-[272px] flex-shrink-0 snap-start flex-col gap-5 bg-white"
              >
                {/* Image */}
                <div className="relative h-[200px] w-[272px] overflow-hidden rounded-[20px]">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="272px"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {facility.description}
                  </p>

                  {/* Link Button */}
                  <Link
                    href={facility.href}
                    className="inline-flex h-8 w-[167px] items-center justify-center gap-2.5 rounded-[10px] py-1.5 text-sm font-semibold text-[#262B7E] transition hover:text-[#1a1f5c]"
                  >
                    Lihat Selengkapnya
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[#5A81FA] p-3 text-white shadow-lg transition hover:bg-[#4870e8] disabled:opacity-50 disabled:cursor-not-allowed lg:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

