"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Story = {
  id: string;
  name: string;
  occupation: string;
  quote: string;
  image: string;
  href: string;
};

// Dummy data for stories
const dummyStories: Story[] = [
  {
    id: "1",
    name: "Mbak Nunung",
    occupation: "Comedian",
    quote:
      "Perjalanan ini tidak mudah, tapi di Sentra Medika saya menemukan harapan dan kekuatan baru.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    href: "/story/nunung",
  },
  {
    id: "2",
    name: "Ibu Sarah",
    occupation: "Entrepreneur",
    quote:
      "Tim medis yang profesional dan fasilitas yang lengkap membuat proses pemulihan saya lebih cepat.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80",
    href: "/story/sarah",
  },
  {
    id: "3",
    name: "Pak Budi",
    occupation: "Teacher",
    quote:
      "Pelayanan yang ramah dan perhatian dari dokter membuat saya merasa seperti keluarga sendiri.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    href: "/story/budi",
  },
];

export default function StorySection() {
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
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Image
            src="/StorySentra.png"
            alt="Sentra Story"
            width={280}
            height={80}
            className="h-auto w-auto"
            priority
          />
          <div className="flex items-center gap-3">
            <Link
              href="/story"
              className="rounded-full border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF]"
            >
              Lihat Semua
            </Link>
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF] disabled:opacity-30"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF] disabled:opacity-30"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Stories */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        >
          {dummyStories.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="group flex w-full shrink-0 snap-start gap-8 lg:w-auto"
            >
              {/* Left - Image */}
              <div className="relative h-[480px] w-[580px] shrink-0 overflow-hidden rounded-3xl bg-slate-200">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Right - Content */}
              <div className="flex w-[480px] flex-col justify-center py-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg
                    className="h-16 w-16 text-[#5B7CFF] opacity-40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </div>

                {/* Quote */}
                <blockquote className="mb-8 text-xl font-medium leading-relaxed text-slate-900 lg:text-2xl">
                  {story.quote}
                </blockquote>

                {/* Author Info */}
                <div>
                  <p className="text-lg font-bold text-slate-900">{story.name}</p>
                  <p className="text-sm text-slate-600">{story.occupation}</p>
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

