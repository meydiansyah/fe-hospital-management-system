"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformMedicalTourism } from "@/lib/dataTransformers";

export default function MedicalTourismPage() {
  const { medicalTourism, medicalTourismLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const transformedTours = useMemo(() => {
    if (!medicalTourism || medicalTourism.length === 0) {
      return [];
    }
    return medicalTourism
      .filter((t) => t.is_active)
      .map(transformMedicalTourism);
  }, [medicalTourism]);

  if (medicalTourismLoading) {
    return (
      <section className="bg-white pt-32 pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">Memuat data medical tourism...</p>
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
              Medical Tourism
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Medical Tourism Sentra Medika
            </h2>
            <p className="text-sm text-slate-500 sm:max-w-lg">
              Nikmati perawatan medis berkualitas tinggi sambil menikmati
              keindahan Indonesia. Kami menyediakan paket medical tourism yang
              lengkap dengan akomodasi dan layanan kesehatan terbaik.
            </p>
          </div>
        </div>

        {transformedTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">
              Tidak ada data medical tourism tersedia.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {transformedTours.map((tour) => (
              <article
                key={tour.id}
                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="relative flex h-full flex-col gap-4 p-6 sm:p-8">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-slate-900">
                      {tour.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {tour.description}
                    </p>
                  </div>

                  <Link
                    href={tour.href}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                  >
                    Pelajari Lebih Lanjut
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

