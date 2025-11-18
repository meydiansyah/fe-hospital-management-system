"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformCenterOfExcellence } from "@/lib/dataTransformers";

export default function CenterOfExcellencePage() {
  const { centerOfExcellences, centerOfExcellencesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const transformedCenters = useMemo(() => {
    if (!centerOfExcellences || centerOfExcellences.length === 0) {
      return [];
    }
    return centerOfExcellences
      .filter((coe) => coe.is_active)
      .map(transformCenterOfExcellence);
  }, [centerOfExcellences]);

  if (centerOfExcellencesLoading) {
    return (
      <section className="bg-white pt-32 pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">Memuat data center of excellence...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-32 pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-500">
              Pusat Keunggulan
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Center of Excellence
            </h2>
            <p className="text-sm text-slate-500 sm:max-w-lg">
              Temukan pusat keunggulan Sentra Medika yang menyediakan layanan
              medis terdepan dengan teknologi mutakhir dan tim ahli berpengalaman.
            </p>
          </div>
        </div>

        {transformedCenters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Tidak ada data center of excellence.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {transformedCenters.map((center) => (
              <article
                key={center.id}
                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-full w-24 opacity-60">
                  <Image
                    src={center.pattern}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <div className="relative flex h-full flex-col gap-4 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-blue-50">
                      <Image
                        src={center.logo}
                        alt={`${center.name} logo`}
                        fill
                        className="object-contain p-2"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {center.name}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {center.title}
                      </h3>
                    </div>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    {center.description}
                  </p>

                  <Link
                    href={center.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                  >
                    Selengkapnya
                    <span aria-hidden className="text-lg">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

