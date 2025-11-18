"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { transformPartner, getImageUrl } from "@/lib/dataTransformers";
import { ArrowUpRight } from "lucide-react";

export default function PartnerPage() {
  const { t } = useTranslation();
  const { partners, partnersLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const transformedPartners = useMemo(() => {
    if (!partners || partners.length === 0) {
      return [];
    }
    return partners
      .filter((p) => p.is_active)
      .map(transformPartner);
  }, [partners]);

  if (partnersLoading) {
    return (
      <section className="bg-white pt-32 pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">
              {t("partner.loading") || "Memuat data partner..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-32 pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              {t("partner.badge") || "Mitra Kami"}
            </span>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t("partner.title") || "Partner & Mitra Strategis"}
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:max-w-lg sm:text-base">
              {t("partner.description") ||
                "Kami bekerja sama dengan berbagai institusi, perusahaan, dan organisasi terpercaya untuk memberikan layanan kesehatan terbaik bagi masyarakat."}
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        {transformedPartners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">
              {t("partner.noPartners") || "Tidak ada data partner."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {transformedPartners.map((partner) => (
              <article
                key={partner.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-100/50 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative flex h-full flex-col gap-4 p-6 sm:p-8">
                  {/* Logo */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-3">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {partner.name}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {partner.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    {partner.description}
                  </p>

                  {/* Link */}
                  <Link
                    href={partner.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                  >
                    {t("partner.learnMore") || "Pelajari lebih lanjut"}
                    <ArrowUpRight className="h-4 w-4" />
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

