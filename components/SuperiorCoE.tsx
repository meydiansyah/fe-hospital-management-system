"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const superiorCenters = [
  {
    name: "SWICC",
    title: "Soeherman Widyatomo Integrated Cancer Center",
    description:
      "Suherman Widyatomo Integrated Cancer Center (SWICC) merupakan layanan unggulan kanker dari Sentra Medika Hospital Group yang didukung teknologi mutakhir dan tim onkologi multidisiplin.",
    href: "/centers/swicc",
    logo: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&q=80&auto=format&fit=crop",
    pattern: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Golden Heart",
    title: "Cardiovascular Center",
    description:
      "Cardiovascular Center merupakan pusat layanan terpadu jantung dan pembuluh darah dengan Cath Lab, ICU jantung, serta dokter spesialis berpengalaman.",
    href: "/centers/cardiovascular-brain",
    logo: "https://images.unsplash.com/photo-1604881988758-f76ad7a5d7b6?w=200&q=80&auto=format&fit=crop",
    pattern: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Stroke Center",
    title: "Stroke Center",
    description:
      "Stroke Center menghadirkan layanan penanganan cepat 24/7 dengan fasilitas CT Scan, MRI, serta tim neurologi dan rehabilitasi terintegrasi.",
    href: "/centers/stroke",
    logo: "https://images.unsplash.com/photo-1576765607924-4ca436b2931b?w=200&q=80&auto=format&fit=crop",
    pattern: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400&q=80&auto=format&fit=crop",
  },
];

export default function SuperiorCoESection() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-8">
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
              key={center.name}
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
                    "inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700",
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

