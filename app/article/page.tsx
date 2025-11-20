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
  title: string;
  summary: string;
  slug: string;
}

// Dummy data - will be used when API is not ready
const dummyArticles: BlogPost[] = [
  {
    id: 1,
    cover:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80&auto=format&fit=crop",
    published_at: "25 Agustus 2025",
    title: "BMD (Bone Mineral Densitometry): Deteksi Dini Risiko Patah Tulang",
    summary:
      'Osteoporosis dikenal sebagai "silent disease" karena sering kali berkembang tanpa gejala hingga terjadi patah tulang...',
    slug: "bmd-deteksi-dini-risiko-patah-tulang",
  },
  {
    id: 2,
    cover:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80&auto=format&fit=crop",
    published_at: "25 Agustus 2025",
    title: "Cuci Darah Bukan Akhir Segalanya: Kenali Fakta Gagal Ginjal",
    summary:
      "Gagal ginjal bukan berarti hidup berakhir. Ketahui kapan cuci darah diperlukan dan bagaimana menjalani kehidupan yang berkualitas...",
    slug: "cuci-darah-fakta-gagal-ginjal",
  },
  {
    id: 3,
    cover:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop",
    published_at: "24 Agustus 2025",
    title: "Stroke Ringan, Tapi Dampaknya Serius – Jangan Dianggap Sepele!",
    summary:
      "Gejala stroke ringan sering diabaikan. Kenali tanda-tandanya dan lakukan pencegahan sejak dini untuk menghindari stroke berat...",
    slug: "stroke-ringan-dampak-serius",
  },
  {
    id: 4,
    cover:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&auto=format&fit=crop",
    published_at: "23 Agustus 2025",
    title: "Jantung Sehat, Hidup Nikmat: 5 Cara Cegah Serangan Jantung",
    summary:
      "Serangan jantung bisa dicegah dengan pola hidup yang tepat. Temukan 5 cara mudah untuk menjaga kesehatan jantung Anda...",
    slug: "jantung-sehat-cegah-serangan",
  },
  {
    id: 5,
    cover:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop",
    published_at: "22 Agustus 2025",
    title: "Diabetes: Kendalikan Gula Darah, Kendalikan Hidup Anda",
    summary:
      "Diabetes tipe 2 dapat dikendalikan dengan pola makan sehat dan olahraga teratur. Pelajari cara mengelola diabetes dengan efektif...",
    slug: "diabetes-kendalikan-gula-darah",
  },
  {
    id: 6,
    cover:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80&auto=format&fit=crop",
    published_at: "21 Agustus 2025",
    title: "Kanker Serviks: Deteksi Dini Selamatkan Nyawa",
    summary:
      "Kanker serviks dapat dicegah dan dideteksi dini melalui skrining rutin. Kenali pentingnya pemeriksaan Pap smear dan vaksinasi HPV...",
    slug: "kanker-serviks-deteksi-dini",
  },
];

// Featured Article Card (Large)
const FeaturedArticleCard = ({ article }: { article: BlogPost }) => {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
      </div>

      {/* Content Below Image */}
      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-[#262B7E] sm:text-3xl">
          {article.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {article.summary}
        </p>
        <p className="text-sm font-medium text-slate-500">
          {article.published_at}
        </p>
      </div>
    </Link>
  );
};

// Small Article Card (List) - Horizontal Layout
const SmallArticleCard = ({ article }: { article: BlogPost }) => {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex h-full gap-4 p-2"
    >
      {/* Image - Left */}
      <div className="relative h-full w-36 shrink-0 overflow-hidden rounded-xl lg:w-40">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 1024px) 144px, 160px"
        />
      </div>

      {/* Content - Right */}
      <div className="flex flex-1 flex-col justify-center overflow-hidden py-1">
        <h3 className="mb-2 line-clamp-3 text-base font-bold leading-tight text-slate-900 transition group-hover:text-[#262B7E]">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {article.summary}
        </p>
      </div>
    </Link>
  );
};

// Article Grid Card Component
const ArticleGridCard = ({ article }: { article: BlogPost }) => {
  return (
    <Link href={`/article/${article.slug}`} className="group flex flex-col">
      {/* Image */}
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <p className="mb-2 text-sm font-medium text-slate-500">
          {article.published_at}
        </p>
        <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-slate-900 transition group-hover:text-[#262B7E]">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {article.summary}
        </p>
      </div>
    </Link>
  );
};

export default function ArticlePage() {
  const { t } = useTranslation();
  const { articles, articlesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  // Use API data if available, otherwise fallback to dummy data
  const posts: BlogPost[] = useMemo(() => {
    if (articles && articles.length > 0) {
      return articles
        .filter((a) => a.status === "published" && a.published_at)
        .map(transformArticle) as BlogPost[];
    }
    // Fallback to dummy data when API is not ready
    return dummyArticles;
  }, [articles]);

  const featuredArticle = posts[0]; // First article as featured
  const sideArticles = posts.slice(1, 4); // Next 3 articles for sidebar
  const allArticles = posts.slice(0, 3); // First 3 for "Semua Artikel"
  const latestArticles = posts.slice(3, 6); // Next 3 for "Artikel Terbaru"
  const recommendedArticles = posts.slice(0, 3); // First 3 for "Rekomendasi"

  // Don't show loading if we have dummy data
  if (articlesLoading && (!articles || articles.length === 0)) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-slate-600">
            {t("article.loading") || "Memuat artikel..."}
          </p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-slate-600">
            {t("article.noArticles") || "Tidak ada artikel tersedia"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section - Featured Article + Side Articles */}
      {featuredArticle && (
        <section className="bg-white py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Left: Featured Article */}
              <div className="lg:col-span-8">
                <FeaturedArticleCard article={featuredArticle} />
              </div>

              {/* Right: Side Articles List - Equal height to featured */}
              {sideArticles.length > 0 && (
                <div className="flex flex-col lg:col-span-4">
                  {sideArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className={`flex-1 ${
                        index !== sideArticles.length - 1 ? "mb-4" : ""
                      }`}
                    >
                      <SmallArticleCard article={article} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section 1: Semua Artikel */}
      {allArticles.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("article.allArticles") || "Semua Artikel"}
              </h2>
              <Link
                href="/article"
                className="inline-flex items-center rounded-lg border-2 border-[#262B7E] px-6 py-2 text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
              >
                {t("article.viewAll") || "Lihat Semua"}
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {allArticles.map((article) => (
                <ArticleGridCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Artikel Terbaru */}
      {latestArticles.length > 0 && (
        <section className="bg-slate-50 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("article.latestArticles") || "Artikel Terbaru"}
              </h2>
              <Link
                href="/article"
                className="inline-flex items-center rounded-lg border-2 border-[#262B7E] px-6 py-2 text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
              >
                {t("article.viewAll") || "Lihat Semua"}
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleGridCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Rekomendasi Artikel */}
      {recommendedArticles.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("article.recommendedArticles") || "Rekomendasi Artikel"}
              </h2>
              <Link
                href="/article"
                className="inline-flex items-center rounded-lg border-2 border-[#262B7E] px-6 py-2 text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
              >
                {t("article.viewAll") || "Lihat Semua"}
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedArticles.map((article) => (
                <ArticleGridCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
