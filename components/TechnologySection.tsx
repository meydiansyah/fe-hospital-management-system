"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Technology } from "@/types/api";

const fallbackImage =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop";

export function TechnologyCard({ technology }: { technology: Technology }) {
  // Handle images array - can be string[] or Image[]
  const getImageUrl = (images: Technology["images"]): string => {
    if (!images || images.length === 0) return fallbackImage;
    const firstImage = images[0];
    if (typeof firstImage === "string") return firstImage;
    if (typeof firstImage === "object" && "url" in firstImage) {
      return firstImage.url;
    }
    return fallbackImage;
  };

  const cover = getImageUrl(technology.images);
  const formattedDate = technology.updated_at
    ? new Date(technology.updated_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Terbaru";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/30 transition duration-300 hover:cursor-pointer hover:border-blue-200 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={cover}
          alt={technology.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            {technology.name}
          </span>
          <h3 className="text-xl font-semibold text-slate-900">
            {technology.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {technology.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-slate-400">
            Diperbarui {formattedDate}
          </span>
          <Link
            href={`/technology/${technology.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Pelajari lebih lanjut
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const TechnologySection = () => {
  const { technologies, technologiesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  if (technologiesLoading) {
    return (
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">Memuat teknologi...</p>
          </div>
        </div>
      </section>
    );
  }

  if (technologies.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              Teknologi Unggulan
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Solusi Medis Modern untuk Perawatan Terbaik
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Setiap fasilitas Sentra Medika ditunjang perangkat medis mutakhir,
              mulai dari sistem pencitraan diagnostik hingga terapi presisi
              tinggi yang memastikan keputusan klinis lebih cepat dan hasil
              perawatan optimal.
            </p>
          </div>
          <Link
            href="/technology"
            className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:text-blue-800"
          >
            Lihat semua teknologi
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {technologies.slice(0, 6).map((technology) => (
            <TechnologyCard key={technology.id} technology={technology} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
