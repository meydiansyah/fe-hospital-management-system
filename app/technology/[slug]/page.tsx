"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { getImageUrl, getDescription } from "@/lib/dataTransformers";
import { ArrowLeft, Calendar, Share2, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import type { Technology } from "@/types/api";

export default function TechnologyDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { technologies, technologiesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const technology = useMemo(() => {
    if (!technologies || technologies.length === 0) {
      return null;
    }
    return technologies.find((t) => t.slug === slugParam) || null;
  }, [technologies, slugParam]);

  if (technologiesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">
            {t("technology.loading") || "Memuat teknologi..."}
          </p>
        </div>
      </div>
    );
  }

  if (!technology || !technology.is_active) {
    notFound();
  }

  const coverImage = getImageUrl(
    technology.images,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop"
  );

  const formattedDate = technology.updated_at
    ? new Date(technology.updated_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Get title and description (handle MultiLanguageField)
  const title = getDescription(technology.title);
  const description = getDescription(technology.description);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]">
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-3xl space-y-4 text-white">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("technology.backToList") || "Kembali ke Teknologi"}
            </Link>
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {technology.name}
              </div>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                {description}
              </p>
            </div>
            {formattedDate && (
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {t("technology.lastUpdated") || "Terakhir diperbarui"}:{" "}
                    {formattedDate}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Technology Info Card */}
        <div className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/30 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {t("technology.available") || "Teknologi Tersedia"}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {t("technology.availableDescription") ||
                  "Teknologi ini tersedia di fasilitas Sentra Medika Hospital Group. Hubungi kami untuk informasi lebih lanjut tentang ketersediaan dan jadwal."}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <article className="prose prose-slate max-w-none">
          <div className="space-y-6 text-base leading-relaxed text-slate-700">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                {t("technology.overview") || "Gambaran Umum"}
              </h2>
              <p className="text-slate-700">{description}</p>
            </div>

            {/* Additional content can be added here if API provides content field */}
            {technology.content_id && (
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-600">
                  {t("technology.moreInfo") ||
                    "Informasi lebih lengkap tersedia. Hubungi kami untuk detail lebih lanjut."}
                </p>
              </div>
            )}
          </div>
        </article>

        {/* Features/Benefits Section */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              {t("technology.benefits") || "Keuntungan"}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("technology.benefit1") ||
                    "Diagnosis yang lebih akurat dan cepat"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("technology.benefit2") ||
                    "Perawatan dengan teknologi terkini"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("technology.benefit3") ||
                    "Standar internasional untuk kualitas terbaik"}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              {t("technology.applications") || "Aplikasi"}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("technology.application1") ||
                    "Pencitraan diagnostik presisi tinggi"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("technology.application2") ||
                    "Terapi dan perawatan medis"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("technology.application3") ||
                    "Monitoring dan follow-up pasien"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t("technology.ctaTitle") ||
                  "Ingin mengetahui lebih lanjut tentang teknologi ini?"}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {t("technology.ctaDescription") ||
                  "Hubungi kami untuk konsultasi dan informasi lebih detail."}
              </p>
            </div>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:shrink-0"
            >
              {t("technology.contactUs") || "Hubungi Kami"}
            </Link>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t("technology.shareTitle") || "Bagikan Teknologi Ini"}
              </h3>
              <p className="text-sm text-slate-600">
                {t("technology.shareDescription") ||
                  "Bantu sebarkan informasi tentang teknologi medis terbaru."}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Share2 className="h-4 w-4" />
              {t("technology.share") || "Bagikan"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

