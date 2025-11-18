"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { transformNews, getImageUrl } from "@/lib/dataTransformers";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

export default function NewsDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { news, newsLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const newsItem = useMemo(() => {
    if (!news || news.length === 0) {
      return null;
    }
    const found = news.find((n) => n.slug === slugParam);
    return found ? transformNews(found) : null;
  }, [news, slugParam]);

  const originalNews = useMemo(() => {
    return news.find((n) => n.slug === slugParam);
  }, [news, slugParam]);

  if (newsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">
            {t("news.loading") || "Memuat berita..."}
          </p>
        </div>
      </div>
    );
  }

  if (!newsItem || !originalNews) {
    notFound();
  }

  const coverImage = getImageUrl(
    originalNews.images,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]">
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt={newsItem.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-3xl space-y-4 text-white">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("news.backToList") || "Kembali ke Berita"}
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {newsItem.title}
              </h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                {newsItem.summary}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{newsItem.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{newsItem.published_at}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <article className="prose prose-slate max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: originalNews.content || newsItem.summary,
            }}
            className="text-base leading-relaxed text-slate-700"
          />
        </article>

        {/* Share Section */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t("news.shareTitle") || "Bagikan Berita Ini"}
              </h3>
              <p className="text-sm text-slate-600">
                {t("news.shareDescription") ||
                  "Bantu sebarkan informasi kesehatan yang bermanfaat."}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Share2 className="h-4 w-4" />
              {t("news.share") || "Bagikan"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
