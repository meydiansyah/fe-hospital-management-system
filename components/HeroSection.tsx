"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type HeroSlideContent = {
  badge?: string;
  tagline: string;
  title: string;
  description: string;
  cta: string;
  indicator: string;
  imageAlt: string;
};

const slideImages = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584467735815-f778f274e4eb?w=1200&q=80&auto=format&fit=crop",
];

const HeroSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = (
    t("hero.slides", {
      returnObjects: true,
    }) as HeroSlideContent[]
  ).map((slide, index) => ({
    ...slide,
    image: slideImages[index % slideImages.length],
  }));

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-white pt-32 sm:pt-36 lg:pt-40">
      <div className="absolute inset-0">
        <div className="mx-auto grid h-full w-full grid-cols-1 lg:grid-cols-2">
          <div />
          <div className="relative">
            {slides.map((slide, index) => (
              <Image
                key={`bg-${slide.title}-${index}`}
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === currentSlide}
                className={`object-cover transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-l from-blue-100/40 via-blue-100/10 to-transparent" />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[520px] max-w-7xl grid-cols-1 gap-10 px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="relative space-y-10">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src="/smhg-logo.webp"
              alt={t("hero.brandAlt")}
              width={120}
              height={44}
              className="h-8 w-auto sm:h-10"
              priority
            />
            <div className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 sm:text-sm">
              {current?.badge ?? "SWICC"}
            </div>
          </div>

          <div className="relative min-h-[280px]">
            {slides.map((slide, index) => (
              <div
                key={`slide-text-${slide.title}-${index}`}
                className={`absolute inset-0 space-y-6 transition-all duration-700 ease-out ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 sm:text-sm">
                  {slide.tagline}
                </p>
                <h1 className="text-3xl font-bold leading-tight text-blue-950 sm:text-4xl lg:text-[3.25rem]">
                  {slide.title}
                </h1>
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl">
                  {slide.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="#swicc"
                    className="inline-flex items-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-400/40 transition hover:bg-red-700"
                  >
                    {slide.cta}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                    <span>{slide.indicator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[420px] lg:block" />
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 px-4 pb-10 sm:pb-12">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-10 bg-blue-900" : "w-3 bg-blue-200"
            }`}
            aria-label={t("hero.dotLabel", { index: index + 1 })}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
