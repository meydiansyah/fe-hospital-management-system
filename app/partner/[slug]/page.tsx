"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { getImageUrl, getDescription } from "@/lib/dataTransformers";
import { ArrowLeft, Calendar, Share2, CheckCircle2, Building2 } from "lucide-react";
import { notFound } from "next/navigation";
import type { Partner } from "@/types/api";

export default function PartnerDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { partners, partnersLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const partner = useMemo(() => {
    if (!partners || partners.length === 0) {
      return null;
    }
    return partners.find((p) => p.slug === slugParam) || null;
  }, [partners, slugParam]);

  if (partnersLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">
            {t("partner.loading") || "Memuat data partner..."}
          </p>
        </div>
      </div>
    );
  }

  if (!partner || !partner.is_active) {
    notFound();
  }

  const coverImage = getImageUrl(
    partner.images,
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop"
  );

  const formattedDate = partner.updated_at
    ? new Date(partner.updated_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Get title and description
  const title = getDescription(partner.title);
  const description = getDescription(partner.description);

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
              href="/partner"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("partner.backToList") || "Kembali ke Partner"}
            </Link>
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {partner.name}
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
                    {t("partner.lastUpdated") || "Terakhir diperbarui"}:{" "}
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
        {/* Partner Info Card */}
        <div className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/30 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {t("partner.partnership") || "Kemitraan Strategis"}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {t("partner.partnershipDescription") ||
                  "Kami berkomitmen untuk membangun kemitraan yang saling menguntungkan dan berkelanjutan dengan berbagai institusi terpercaya."}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <article className="prose prose-slate max-w-none">
          <div className="space-y-6 text-base leading-relaxed text-slate-700">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                {t("partner.overview") || "Gambaran Umum"}
              </h2>
              <p className="text-slate-700">{description}</p>
            </div>

            {/* Additional content can be added here if API provides content field */}
            {partner.content_id && (
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-600">
                  {t("partner.moreInfo") ||
                    "Informasi lebih lengkap tersedia. Hubungi kami untuk detail lebih lanjut."}
                </p>
              </div>
            )}
          </div>
        </article>

        {/* Benefits Section */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              {t("partner.benefits") || "Keuntungan Kemitraan"}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("partner.benefit1") ||
                    "Akses ke layanan kesehatan berkualitas"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("partner.benefit2") ||
                    "Kolaborasi untuk inovasi medis"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("partner.benefit3") ||
                    "Jaringan profesional yang luas"}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              {t("partner.collaboration") || "Area Kolaborasi"}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("partner.collaboration1") ||
                    "Program kesehatan dan wellness"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("partner.collaboration2") ||
                    "Riset dan pengembangan medis"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  {t("partner.collaboration3") ||
                    "Edukasi dan pelatihan profesional"}
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
                {t("partner.ctaTitle") ||
                  "Ingin menjadi mitra kami?"}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {t("partner.ctaDescription") ||
                  "Hubungi kami untuk membahas peluang kemitraan dan kolaborasi."}
              </p>
            </div>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:shrink-0"
            >
              {t("partner.contactUs") || "Hubungi Kami"}
            </Link>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t("partner.shareTitle") || "Bagikan Partner Ini"}
              </h3>
              <p className="text-sm text-slate-600">
                {t("partner.shareDescription") ||
                  "Bantu sebarkan informasi tentang kemitraan kami."}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Share2 className="h-4 w-4" />
              {t("partner.share") || "Bagikan"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

