"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import ArticleCard from "./ArticleCard";
import { transformArticle } from "@/lib/dataTransformers";

export default function ArticleSection() {
  const { t } = useTranslation();
  const { articles, articlesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const posts = articles
    .filter((a) => a.status === "published" && a.published_at)
    .slice(0, 3)
    .map(transformArticle);

  if (articlesLoading) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">
              {t("article.loading") || "Memuat artikel..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t("article.sectionTitle") || "Artikel Terbaru Kami"}
            </h2>
            <p className="text-sm text-slate-500 sm:max-w-lg">
              {t("article.sectionDescription") ||
                "Temukan wawasan kesehatan, tips medis, dan panduan dari tim ahli Sentra Medika Hospital Group."}
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 gap-8 rounded-t-lg sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 2).map((post) => (
            <ArticleCard key={post.id} {...post} />
          ))}

          {/* Newsletter Card */}
          <div className="sm:col-span-2 lg:col-span-1 p-6 sm:p-10 md:p-14 lg:p-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex flex-col space-y-6 relative overflow-hidden">
            <div className="absolute w-14 h-14 rounded-full bg-linear-to-bl from-blue-600 to-violet-500 blur-2xl -top-7 -left-7 opacity-40"></div>
            <div className="absolute w-14 h-14 rounded-full bg-linear-to-bl from-blue-600 to-violet-500 blur-2xl -bottom-7 -right-7 opacity-40"></div>

            <div className="lg:h-full flex flex-col items-center text-center justify-center space-y-5 mx-auto max-w-2xl">
              <h1 className="font-bold text-gray-900 dark:text-white text-3xl">
                {t("article.newsletter.title") || "Bergabung dengan"}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-bl from-blue-700 to-violet-400 dark:from-blue-300 dark:to-violet-400">
                  {t("article.newsletter.highlight") || "Ribuan Pasien"}
                </span>{" "}
                {t("article.newsletter.subtitle") || "yang Percaya"}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t("article.newsletter.description") ||
                  "Berlangganan newsletter kami untuk mendapatkan artikel dan update terbaru."}
              </p>
              <div className="w-full flex flex-col sm:items-center sm:flex-row lg:flex-col gap-y-3 gap-x-4">
                <div className="flex justify-center w-full sm:w-max lg:w-full">
                  <Link
                    href="/article"
                    className="py-3 rounded-lg px-6 bg-blue-600 dark:bg-blue-500 text-white font-medium text-base w-full flex justify-center hover:bg-blue-700 transition"
                  >
                    {t("article.seeMore") || "Lihat Semua Artikel"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
