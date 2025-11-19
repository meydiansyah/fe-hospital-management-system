"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Promotion = {
  id: string;
  hospital: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  image: string;
  href: string;
};

// Dummy data for promotions
const dummyPromotions: Promotion[] = [
  {
    id: "1",
    hospital: "RS Harapan Bunda",
    title: "Medical Check Up Paket Diabetes",
    description:
      "Paket pemeriksaan khusus untuk mendeteksi, memantau, dan mencegah komplikasi diabetes sejak dini. Dengan rangkaian tes laboratorium lengkap dan konsultasi dokter spesialis, Anda bisa lebih tenang dalam mengelola kesehatan.",
    tags: ["Diabetes", "Medical Check Up", "Harapan Bunda"],
    date: "24 September 2025",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
    href: "/promo/diabetes-checkup",
  },
  {
    id: "2",
    hospital: "Sentra Medika Cibinong",
    title: "Paket Persalinan Normal & Caesar",
    description:
      "Nikmati pengalaman persalinan yang aman dan nyaman dengan paket lengkap yang mencakup kamar VIP, perawatan ibu dan bayi, serta pendampingan tim medis berpengalaman.",
    tags: ["Persalinan", "Ibu & Anak", "Cibinong"],
    date: "30 September 2025",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80",
    href: "/promo/maternity",
  },
];

export default function PromotionSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

    const scrollAmount = container.clientWidth;
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
        <div className="mb-8 flex items-center justify-between">
          <Image
            src="/PromosiSentra.png"
            alt="Promosi Sentra"
            width={280}
            height={80}
            className="h-auto w-auto"
            priority
          />
          <div className="flex items-center gap-3">
            <Link
              href="/promo"
              className="rounded-full border border-[#262B7E] px-6 py-2 text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
            >
              Lihat Semua
            </Link>
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF] disabled:opacity-30"
                aria-label="Previous promotion"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF] disabled:opacity-30"
                aria-label="Next promotion"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Promotions */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        >
          {dummyPromotions.map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="group flex w-full shrink-0 snap-start gap-6 rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-xl lg:w-auto"
            >
              {/* Left - Image */}
              <div className="relative h-64 w-[480px] shrink-0 overflow-hidden rounded-xl bg-slate-100 lg:h-80 lg:w-[600px]">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Right - Content */}
              <div className="flex w-[480px] flex-col justify-between py-2">
                {/* Hospital Badge */}
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm text-[#5B7CFF]">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{promo.hospital}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
                    {promo.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-base leading-relaxed text-slate-600 line-clamp-4">
                    {promo.description}
                  </p>
                </div>

                {/* Bottom - Tags & Date */}
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {promo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#5B7CFF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span>{promo.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
