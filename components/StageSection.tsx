"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type StageEpisode = {
  id: string;
  title: string;
  guest: string;
  guestTitle: string;
  summary: string;
  description: string;
  views: string;
  date: string;
  tags: string[];
  image: string;
  videoUrl?: string;
  href: string;
};

// Dummy data for stage episodes
const dummyEpisodes: StageEpisode[] = [
  {
    id: "1",
    title: "Gagal Ginjal Harus Cuci Darah?",
    guest: "dr. R. Dody Muhamad Turmudzi, Sp.PD",
    guestTitle: "Spesialis Penyakit Dalam",
    summary: "Hi Sobat Sentra!",
    description:
      "Penyakit Ginjal Kronis (PGK) adalah kondisi di mana fungsi ginjal menurun secara bertahap selama lebih dari 3 bulan, dan jika mencapai stadium lanjut, ginjal tidak lagi dapat menyaring darah, menyebabkan penumpukan limbah metabolisme dan masalah kesehatan serius.\n\nSimak penjelasan lengkap dr. R. Dody",
    views: "827",
    date: "15 Apr 2025",
    tags: ["Penyakit Dalam", "Edukasi Kesehatan", "Sentra Stage"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    videoUrl: "/videos/stage-gagal-ginjal.mp4",
    href: "/stage/gagal-ginjal-cuci-darah",
  },
  {
    id: "2",
    title: "Kenali Gejala Stroke Sejak Dini",
    guest: "dr. Andika Prawira, Sp.S",
    guestTitle: "Spesialis Saraf",
    summary: "Hi Sobat Sentra!",
    description:
      "Stroke adalah kondisi darurat medis yang terjadi ketika aliran darah ke otak terganggu. Mengenali gejala stroke sejak dini dapat menyelamatkan nyawa dan mencegah kerusakan permanen.",
    views: "1.2K",
    date: "10 Apr 2025",
    tags: ["Neurologi", "Edukasi Kesehatan", "Sentra Stage"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80",
    videoUrl: "/videos/stage-stroke.mp4",
    href: "/stage/gejala-stroke",
  },
];

export default function StageSection() {
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
            src="/StageSentra.png"
            alt="Sentra Stage"
            width={280}
            height={80}
            className="h-auto w-auto"
            priority
          />
          <div className="flex items-center gap-3">
            <Link
              href="/stage"
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
                aria-label="Previous episode"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF] disabled:opacity-30"
                aria-label="Next episode"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Episodes */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        >
          {dummyEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="flex w-full shrink-0 snap-start gap-8 lg:w-auto"
            >
              {/* Left - Video Thumbnail */}
              <Link
                href={episode.href}
                className="group relative h-[480px] w-[720px] shrink-0 overflow-hidden rounded-3xl bg-slate-900"
              >
                <Image
                  src={episode.image}
                  alt={episode.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                {episode.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 shadow-2xl transition group-hover:scale-110">
                      <Play className="h-12 w-12 fill-[#5B7CFF] text-[#5B7CFF]" />
                    </div>
                  </div>
                )}
                {/* Sentra Stage Logo Overlay */}
                <div className="absolute left-6 top-6">
                  <Image
                    src="/sentra-stage-watermark.png"
                    alt="Sentra Stage"
                    width={140}
                    height={40}
                    className="opacity-90"
                  />
                </div>
              </Link>

              {/* Right - Content */}
              <div className="flex w-[480px] flex-col py-4">
                {/* Title & Guest */}
                <div className="mb-4">
                  <h3 className="mb-3 text-3xl font-bold text-slate-900">
                    {episode.title}
                  </h3>
                  <p className="text-base font-semibold text-slate-700">
                    {episode.guest}
                  </p>
                </div>

                {/* Ringkasan Box */}
                <div className="mb-4 rounded-2xl bg-slate-50 p-6">
                  <h4 className="mb-2 text-lg font-bold text-slate-900">Ringkasan</h4>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    {episode.summary}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {episode.description}
                  </p>
                </div>

                {/* Bottom Info */}
                <div className="mt-auto space-y-4">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{episode.views} x ditonton</span>
                    <span>•</span>
                    <span>{episode.date}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {episode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

