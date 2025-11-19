"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { transformCenterOfExcellence } from "@/lib/dataTransformers";

type CenterOfExcellence = {
  id: string;
  title: string;
  logo: string;
  description: string;
  detailLink?: string;
  href: string;
};

// Dummy data - Replace with Redux data when ready
const centerOfExcellenceData: CenterOfExcellence[] = [
  {
    id: "swicc",
    title: "Suherman Widyatomo Integrated Cancer Center (SWICC)",
    logo: "/SWICC.png",
    description:
      "Suherman Widyatomo Integrated Cancer Center (SWICC) merupakan layanan unggulan kanker dari Sentra Medika Hospital Group yan...",
    detailLink: "Selengkapnya",
    href: "/center-of-excellence/swicc",
  },
  {
    id: "golden-heart",
    title: "Cardiovascular Center",
    logo: "/GoldenHeart.png",
    description:
      "Cardiovascular Center merupakan pusat pelayanan terpadu Jantung dan Pembuluh Darah didukung oleh alat Catheterization Lab...",
    detailLink: "Selengkapnya",
    href: "/center-of-excellence/cardiovascular",
  },
  {
    id: "stroke",
    title: "Stroke Center",
    logo: "/icon/hospital-facility/brain-center.svg",
    description:
      "Stroke Center menyediakan pelayanan stroke komprehensif dengan tim multidisiplin untuk penanganan cepat dan tepat.",
    href: "/center-of-excellence/stroke",
  },
  {
    id: "uronephrology",
    title: "Uronephrology Center",
    logo: "/icon/hospital-facility/pcnl.svg",
    description:
      "Uronephrology Center memberikan layanan terpadu untuk penyakit ginjal dan saluran kemih dengan teknologi modern.",
    href: "/center-of-excellence/uronephrology",
  },
  {
    id: "orthopedic",
    title: "Orthopedic Center",
    logo: "/icon/hospital-facility/orthopedi.svg",
    description:
      "Orthopedic Center menyediakan layanan komprehensif untuk gangguan tulang, sendi, dan sistem muskuloskeletal.",
    href: "/center-of-excellence/orthopedic",
  },
];

export default function SuperiorCoESection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Redux - Commented for now, using dummy data
  // const { centerOfExcellences, centerOfExcellencesLoading } = useSelector(
  //   (state: RootState) => state.masterData
  // );

  // const superiorCenters = useMemo(() => {
  //   if (!centerOfExcellences || centerOfExcellences.length === 0) {
  //     return [];
  //   }
  //   return centerOfExcellences
  //     .filter((coe) => coe.is_active)
  //     .slice(0, 5)
  //     .map(transformCenterOfExcellence);
  // }, [centerOfExcellences]);

  // if (centerOfExcellencesLoading) {
  //   return (
  //     <section className="bg-white py-12 lg:py-16">
  //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //         <div className="mb-8 text-center">
  //           <div className="mx-auto h-20 w-64 animate-pulse rounded bg-slate-200" />
  //         </div>
  //         <div className="mb-8 grid gap-6 lg:grid-cols-2">
  //           {[1, 2].map((i) => (
  //             <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-200" />
  //           ))}
  //         </div>
  //         <div className="flex gap-6 overflow-x-auto">
  //           {[1, 2, 3].map((i) => (
  //             <div key={i} className="h-64 w-80 shrink-0 animate-pulse rounded-2xl bg-slate-200" />
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  // if (superiorCenters.length === 0) {
  //   return null;
  // }

  const checkScrollability = useCallback(() => {
    const container = trackRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = trackRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const offset = direction === "left" ? -scrollAmount : scrollAmount;

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = trackRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
    };
  }, [checkScrollability]);

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Image
            src="/SuperiorCOE.png"
            alt="Superior Centers of Excellence"
            width={280}
            height={80}
            className="h-auto w-auto"
            priority
          />
        </div>

        {/* Main Featured Cards - Grid 2 columns */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {centerOfExcellenceData.slice(0, 2).map((center) => (
            <Link
              key={center.id}
              href={center.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:shadow-lg"
            >
              {/* Decorative Pattern - Top Right */}
              <div className="absolute -right-20 -top-10 h-64 w-64 opacity-10">
                <Image
                  src="/blue-pattern.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                {/* Logo */}
                <div className="mb-4 flex h-20 items-center">
                  <Image
                    src={center.logo}
                    alt={center.title}
                    width={200}
                    height={60}
                    className="h-auto w-auto max-w-full object-contain"
                  />
                </div>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {center.description}
                </p>

                {/* Link */}
                {center.detailLink && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#5B7CFF] transition group-hover:gap-3">
                    <span>{center.detailLink}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Other Centers - Horizontal Scroll */}
        <div className="relative">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:bg-slate-50 disabled:opacity-0 lg:flex"
            aria-label="Scroll previous"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          >
            {centerOfExcellenceData.slice(2).map((center) => (
              <Link
                key={center.id}
                href={center.href}
                className="group flex w-[420px] shrink-0 items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg lg:w-[460px]"
              >
                {/* Icon - Left Side */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center">
                  <Image
                    src={center.logo}
                    alt={center.title}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Content - Right Side */}
                <div className="flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-bold uppercase text-[#262B7E]">
                    {center.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:bg-slate-50 disabled:opacity-0 lg:flex"
            aria-label="Scroll next"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
