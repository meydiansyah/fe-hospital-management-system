"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { transformArticle } from "@/lib/dataTransformers";

interface BlogPost {
  id: number;
  cover: string;
  published_at: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  summary: string;
  slug: string;
}

const BlogCard = ({
  cover,
  published_at,
  author,
  title,
  summary,
  slug,
}: BlogPost) => {
  return (
    <div className="flex flex-col space-y-5">
      <Image
        src={cover}
        alt={title}
        width={1300}
        height={900}
        className="w-full rounded aspect-[5/3] object-cover bg-gray-100 dark:bg-gray-900"
      />
      <Link
        href={`/article/${slug}`}
        className="mt-5 text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        {title}
      </Link>
      <p className="text-gray-700 dark:text-gray-300">{summary}</p>
      <div className="flex items-center gap-x-4">
        <Image
          src={author.avatar}
          alt={author.name}
          width={800}
          height={800}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="text-gray-800 dark:text-gray-50 font-semibold">
            {author.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {published_at}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ArticlePage() {
  const { t } = useTranslation();
  const { articles, articlesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const posts: BlogPost[] = useMemo(() => {
    return articles
      .filter((a) => a.status === "published" && a.published_at)
      .map(transformArticle) as BlogPost[];
  }, [articles]);

  if (articlesLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-950 pt-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center">
            <p className="text-gray-600">
              {t("article.loading") || "Memuat artikel..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-950 pt-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-y-8 items-center text-center md:text-left md:items-start md:justify-between">
          <div className="text-center space-y-6 max-w-2xl mx-auto md:mx-0 md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
              {t("article.title") || "Artikel Kesehatan"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
              {t("article.description") ||
                "Temukan artikel kesehatan terbaru, tips kesehatan, dan informasi medis dari tim ahli Sentra Medika Hospital Group."}
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {t("article.noArticles") || "Tidak ada artikel tersedia."}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

