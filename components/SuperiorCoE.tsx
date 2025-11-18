"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformCenterOfExcellence } from "@/lib/dataTransformers";
import { cn } from "@/lib/utils";

export default function SuperiorCoESection() {
  const { centerOfExcellences, centerOfExcellencesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const superiorCenters = useMemo(() => {
    if (!centerOfExcellences || centerOfExcellences.length === 0) {
      return [];
    }
    return centerOfExcellences
      .filter((coe) => coe.is_active)
      .slice(0, 3)
      .map(transformCenterOfExcellence);
  }, [centerOfExcellences]);

  if (centerOfExcellencesLoading) {
    return (
      <section className="bg-linear-to-b from-white to-blue-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex flex-col leading-tight">
              <span className="text-3xl font-extrabold text-blue-900">
                SUPERIOR
              </span>
              <span className="text-2xl font-semibold text-red-500">COE</span>
            </span>
            <div className="h-px flex-1 bg-blue-200" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (superiorCenters.length === 0) {
    return null;
  }
  return (
    <section className="bg-linear-to-b from-white to-blue-50 py-12 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex flex-col leading-tight">
            <span className="text-3xl font-extrabold text-blue-900">
              SUPERIOR
            </span>
            <span className="text-2xl font-semibold text-red-500">COE</span>
          </span>
          <div className="h-px flex-1 bg-blue-200" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {superiorCenters.map((center) => (
            <article
              key={center.id}
              className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50"
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
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                  )}
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
      </div>
    </section>
  );
}
