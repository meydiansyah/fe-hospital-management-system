"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { transformNews } from "@/lib/dataTransformers";

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

// Dummy data - will be used when API is not ready
const dummyPosts: BlogPost[] = [
  {
    id: 1,
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
    published_at: "9 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title:
      "Peringati Hari Thalasemia Sedunia, Sentra Medika Hospital Cisalak Gelar Edukasi dan Kegiatan Interaktif Bersama Pasien",
    summary:
      "Dalam rangka memperingati Hari Thalasemia Sedunia, RS Sentra Medika Hospital Cisalak mengadakan kegiatan edukasi dan interaktif bersama pasien thalasemia...",
    slug: "peringati-hari-thalasemia",
  },
  {
    id: 2,
    cover:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
    published_at: "9 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Our New Doctor - dr. Putra Habibie Adnantama Lubis, Sp. JP",
    summary:
      "Jangan tunda untuk menjaga jantung tetap sehat dan kuat! Kenali gejala dan lakukan pencegahan sejak dini...",
    slug: "new-doctor-putra-habibie",
  },
  {
    id: 3,
    cover:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80&auto=format&fit=crop",
    published_at: "9 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Peresmian Layanan MRI 1,5 Tesla di RS Harapan Bunda",
    summary:
      "Jangan tunda untuk menjaga jantung tetap sehat dan kuat! Kenali gejala dan lakukan pencegahan sejak dini...",
    slug: "peresmian-mri-tesla",
  },
  {
    id: 4,
    cover:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80&auto=format&fit=crop",
    published_at: "9 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Family Gathering PERSADIA Unit RS Harapan Bunda",
    summary:
      "yang lalu Klub Senam PERSADIA RS Harapan Bunda mengadakan Family Gathering di Jl. Raya Bogor...",
    slug: "family-gathering-persadia",
  },
  {
    id: 5,
    cover:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop",
    published_at: "8 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Workshop Kesehatan Jantung untuk Masyarakat",
    summary:
      "RS Sentra Medika mengadakan workshop gratis tentang pencegahan penyakit jantung untuk masyarakat umum...",
    slug: "workshop-kesehatan-jantung",
  },
  {
    id: 6,
    cover:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80&auto=format&fit=crop",
    published_at: "7 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Peluncuran Program Vaksinasi COVID-19 Booster",
    summary:
      "Sentra Medika Hospital membuka layanan vaksinasi booster COVID-19 untuk seluruh masyarakat dengan harga terjangkau...",
    slug: "vaksinasi-covid-booster",
  },
  {
    id: 7,
    cover:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80&auto=format&fit=crop",
    published_at: "6 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Seminar Kesehatan Ibu dan Anak",
    summary:
      "Menghadirkan pakar kesehatan untuk membahas pentingnya nutrisi dan perawatan kesehatan ibu hamil dan anak...",
    slug: "seminar-kesehatan-ibu-anak",
  },
  {
    id: 8,
    cover:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80&auto=format&fit=crop",
    published_at: "5 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Screening Diabetes Gratis untuk Masyarakat",
    summary:
      "RS Sentra Medika mengadakan screening diabetes gratis untuk masyarakat umum sebagai bentuk kepedulian kesehatan...",
    slug: "screening-diabetes-gratis",
  },
  {
    id: 9,
    cover:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80&auto=format&fit=crop",
    published_at: "4 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Peluncuran Unit Hemodialisa Terbaru",
    summary:
      "Fasilitas hemodialisa terbaru dengan teknologi canggih siap melayani pasien dengan lebih nyaman dan aman...",
    slug: "unit-hemodialisa-terbaru",
  },
  {
    id: 10,
    cover:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80&auto=format&fit=crop",
    published_at: "3 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Donor Darah Massal Peringati HUT Kemerdekaan",
    summary:
      "Kegiatan donor darah massal yang diikuti ratusan peserta untuk membantu stok darah di PMI...",
    slug: "donor-darah-massal",
  },
  {
    id: 11,
    cover:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80&auto=format&fit=crop",
    published_at: "2 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Pelatihan CPR untuk Masyarakat Umum",
    summary:
      "Pelatihan cardiopulmonary resuscitation (CPR) gratis untuk meningkatkan kesadaran pertolongan pertama...",
    slug: "pelatihan-cpr",
  },
  {
    id: 12,
    cover:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80&auto=format&fit=crop",
    published_at: "1 Mei 2025",
    author: {
      name: "Sentra Medika",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Launching Aplikasi Mobile Hospital",
    summary:
      "Kemudahan akses layanan kesehatan kini di genggaman Anda dengan aplikasi mobile Sentra Medika Hospital...",
    slug: "launching-aplikasi-mobile",
  },
];

const NewsCard = ({ cover, published_at, title, summary, slug }: BlogPost) => {
  return (
    <Link href={`/news/${slug}`} className="group flex flex-col">
      {/* Image */}
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Date */}
      <p className="mb-3 text-sm font-medium text-slate-600">{published_at}</p>

      {/* Title */}
      <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-slate-900 transition group-hover:text-blue-600">
        {title}
      </h3>

      {/* Summary */}
      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{summary}</p>
    </Link>
  );
};

export default function NewsPage() {
  const { t } = useTranslation();
  const { news, newsLoading } = useSelector((state: RootState) => state.masterData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Show 9 posts per page

  // Use API data if available, otherwise fallback to dummy data
  const posts: BlogPost[] = useMemo(() => {
    if (news && news.length > 0) {
      return news
        .filter((n) => n.status === "published" && n.published_at)
        .map(transformNews) as BlogPost[];
    }
    // Fallback to dummy data when API is not ready
    return dummyPosts;
  }, [news]);

  const headline = posts[0]; // First post as headline

  // Filter posts for search
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Don't show loading if we have dummy data
  if (newsLoading && (!news || news.length === 0)) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-slate-600">{t("news.loading") || "Memuat berita..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero/Headline Section */}
      {headline && (
        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            {/* Left: Content */}
            <div className="flex flex-col justify-center space-y-4 px-4 py-12 sm:px-6 lg:space-y-6 lg:px-8 lg:py-16">
              {/* Date */}
              <p className="text-sm font-medium text-slate-600">{headline.published_at}</p>

              {/* Title */}
              <Link href={`/news/${headline.slug}`} className="transition hover:opacity-80">
                <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {headline.title}
                </h1>
              </Link>

              {/* Summary */}
              <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 lg:text-base">
                {headline.summary}
              </p>
            </div>

            {/* Right: Image - Full Height, No Radius */}
            <div className="relative h-64 w-full lg:h-auto">
              <Image
                src={headline.cover}
                alt={headline.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* News List Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Header with Search */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {t("news.allNews") || "Semua Berita"}
            </h2>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder={t("news.searchPlaceholder") || "Cari Berita"}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full rounded-md border border-slate-300 bg-white py-2 pl-4 pr-10 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* News Grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-600">
                {t("news.noResults") || "Tidak ada berita ditemukan."}
              </p>
            </div>
          ) : (
            <>
              {/* News Grid */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map((post) => (
                  <NewsCard key={post.id} {...post} />
                ))}
              </div>

              {/* Pagination Section - Total Results (Left) & Pagination (Right) */}
              <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
                {/* Total Results - Left */}
                <p className="text-sm text-slate-600">
                  {t("news.showingResults", {
                    start: startIndex + 1,
                    end: Math.min(endIndex, filteredPosts.length),
                    total: filteredPosts.length,
                  }) ||
                    `Menampilkan ${startIndex + 1} hingga ${Math.min(
                      endIndex,
                      filteredPosts.length
                    )} dari ${filteredPosts.length} entri`}
                </p>

                {/* Pagination - Right */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="flex h-10 w-10 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      aria-label={t("news.previousPage") || "Halaman sebelumnya"}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === "number" && setCurrentPage(page)}
                        disabled={page === "..."}
                        className={`flex h-10 min-w-[40px] items-center justify-center rounded px-3 text-sm font-medium transition ${
                          page === currentPage
                            ? "bg-[#E63946] text-white hover:bg-[#d32f3c]"
                            : page === "..."
                            ? "cursor-default text-slate-400"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="flex h-10 w-10 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      aria-label={t("news.nextPage") || "Halaman berikutnya"}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
