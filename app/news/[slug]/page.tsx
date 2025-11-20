"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { transformNews, getImageUrl, getDescription } from "@/lib/dataTransformers";
import { Share2, Link as LinkIcon } from "lucide-react";
import { notFound } from "next/navigation";

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
  content?: string;
}

// Dummy data - will be used when API is not ready
const dummyPosts: BlogPost[] = [
  {
    id: 1,
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
    published_at: "9 Mei 2025",
    author: {
      name: "dr. Ray Hendry, Sp.OT",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title:
      "Peringati Hari Thalasemia Sedunia, Sentra Medika Hospital Cisalak Gelar Edukasi dan Kegiatan Interaktif Bersama Pasien",
    summary:
      "Dalam rangka memperingati Hari Thalasemia Sedunia, RS Sentra Medika Hospital Cisalak mengadakan kegiatan edukasi dan interaktif bersama pasien thalasemia...",
    slug: "peringati-hari-thalasemia",
    content: `
      <p>Cisalak, 8 Mei 2025 – Dalam rangka memperingati Hari Thalasemia Sedunia, Sentra Medika Hospital Cisalak menyelenggarakan serangkaian kegiatan bertema edukasi dan kebersamaan yang berlangsung hangat di Ruang Thalasemia rumah sakit. Acara ini melibatkan langsung para pasien thalasemia yang sedang menjalani perawatan, sebagai bentuk dukungan dan kepedulian terhadap perjuangan mereka.</p>
      
      <p>Acara diawali dengan sesi sharing edukatif bersama dr. Khairiyah Darojat, SpPD-KHOM, dokter spesialis penyakit dalam konsultan hematologi onkologi medis. Dalam pemaparannya, dr. Khairiyah memberikan wawasan penting tentang penanganan thalasemia, pentingnya transfusi darah yang rutin, serta peran keluarga dan tim medis dalam mendampingi pasien agar tetap semangat menjalani hidup.</p>
      
      <p>"Thalasemia adalah kondisi yang membutuhkan perhatian jangka panjang, tetapi dengan dukungan yang tepat, para pasien tetap bisa tumbuh, belajar, dan berkarya," ujar dr. Khairiyah.</p>
      
      <p>Acara kemudian dilanjutkan dengan berbagai games ringan dan menyenangkan yang dirancang khusus agar dapat diikuti oleh para pasien. Suasana penuh tawa dan keakraban tercipta, menjadikan momen ini sebagai hiburan yang menyejukkan di tengah rutinitas pengobatan.</p>
      
      <p>Yang paling menyentuh adalah sesi berbagi cerita dari para pasien yang dengan penuh keberanian membagikan kisah hidup, perjuangan, dan harapan mereka. Cerita-cerita ini menjadi pengingat bagi semua yang hadir bahwa kekuatan sejati muncul dari semangat yang tak pernah padam.</p>
      
      <p>Sebagai penutup, pihak rumah sakit memberikan kenang-kenangan simbolis kepada peserta dan narasumber sebagai bentuk penghargaan atas semangat dan partisipasi dalam acara tersebut.</p>
      
      <p>Kegiatan ini merupakan bagian dari komitmen Sentra Medika Hospital Cisalak untuk tidak hanya memberikan pelayanan medis terbaik, tetapi juga menciptakan ruang dukungan emosional dan sosial bagi pasien thalasemia dan keluarganya.</p>
      
      <p><strong>Untuk informasi lebih lanjut tentang layanan thalasemia dan hematologi di Sentra Medika Hospital Cisalak, kunjungi langsung rumah sakit kami atau hubungi layanan informasi kami.</strong></p>
    `,
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
    content: `
      <p>Kami dengan bangga memperkenalkan dokter spesialis jantung terbaru kami, dr. Putra Habibie Adnantama Lubis, Sp. JP.</p>
      
      <p>Beliau adalah lulusan terbaik dari Fakultas Kedokteran Universitas Indonesia dengan spesialisasi kardiologi. Dengan pengalaman lebih dari 10 tahun di bidang penyakit jantung dan pembuluh darah, dr. Putra siap memberikan pelayanan kesehatan jantung yang komprehensif.</p>
      
      <p><strong>Jadwal Praktik:</strong></p>
      <ul>
        <li>Senin: 09:00 - 21:00</li>
        <li>Selasa: 09:00 - 21:00</li>
        <li>Rabu: 16:00 - 21:00</li>
        <li>Kamis: 16:00 - 21:00</li>
        <li>Jumat: 16:00 - 21:00</li>
      </ul>
      
      <p>Jangan tunda untuk menjaga jantung tetap sehat dan kuat! Kenali gejala dan lakukan pencegahan sejak dini.</p>
    `,
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
    content: `
      <p>RS Harapan Bunda dengan bangga mengumumkan peresmian layanan MRI 1,5 Tesla terbaru yang akan meningkatkan kualitas diagnostik untuk pasien kami.</p>
      
      <p>MRI (Magnetic Resonance Imaging) 1,5 Tesla ini merupakan teknologi pencitraan medis canggih yang memberikan hasil gambar detail dengan akurasi tinggi untuk berbagai pemeriksaan organ tubuh.</p>
      
      <p><strong>Keunggulan MRI 1,5 Tesla:</strong></p>
      <ul>
        <li>Gambar lebih detail dan akurat</li>
        <li>Waktu pemeriksaan lebih cepat</li>
        <li>Lebih nyaman untuk pasien</li>
        <li>Hasil diagnostik lebih presisi</li>
      </ul>
      
      <p>Dengan hadirnya teknologi ini, kami berkomitmen untuk terus memberikan pelayanan kesehatan terbaik bagi masyarakat.</p>
    `,
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
    content: `
      <p>Klub Senam PERSADIA RS Harapan Bunda mengadakan Family Gathering di Jl. Raya Bogor, 27 November 2023.</p>
      
      <p>Acara ini dihadiri oleh puluhan anggota PERSADIA beserta keluarga mereka dalam suasana yang hangat dan penuh kekeluargaan.</p>
      
      <p>Kegiatan yang dilakukan meliputi senam bersama, games seru, dan edukasi kesehatan tentang diabetes dan pola hidup sehat.</p>
      
      <p>Terima kasih kepada seluruh peserta yang telah meramaikan acara ini!</p>
    `,
  },
];

export default function NewsDetailPage() {
  const params = useParams();
  const { t } = useTranslation();

  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { news, newsLoading } = useSelector((state: RootState) => state.masterData);

  // Use API data if available, otherwise fallback to dummy data
  const newsItem = useMemo(() => {
    if (news && news.length > 0) {
      const found = news.find((n) => n.slug === slugParam);
      return found ? transformNews(found) : null;
    }
    // Fallback to dummy data
    return dummyPosts.find((post) => post.slug === slugParam) || null;
  }, [news, slugParam]);

  const originalNews = useMemo(() => {
    if (news && news.length > 0) {
      return news.find((n) => n.slug === slugParam);
    }
    return dummyPosts.find((post) => post.slug === slugParam);
  }, [news, slugParam]);

  if (!newsItem) {
    notFound();
  }

  const coverImage =
    originalNews && "images" in originalNews
      ? getImageUrl(
          originalNews.images,
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop"
        )
      : newsItem.cover;

  // Related news (exclude current news)
  const relatedNews = useMemo(() => {
    if (news && news.length > 0) {
      return news
        .filter((n) => n.slug !== slugParam && n.status === "published" && n.published_at)
        .slice(0, 3)
        .map(transformNews);
    }
    // Fallback to dummy data
    return dummyPosts.filter((post) => post.slug !== slugParam).slice(0, 3);
  }, [news, slugParam]);

  const formattedDate = originalNews && "published_at" in originalNews && originalNews.published_at
    ? new Date(originalNews.published_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : newsItem.published_at;

  const authorName =
    originalNews && "author" in originalNews
      ? originalNews.author || "Sentra Medika"
      : newsItem.author.name;

  const content =
    originalNews && "content" in originalNews
      ? originalNews.content || newsItem.summary
      : originalNews && "content" in originalNews
      ? originalNews.content
      : newsItem.summary;

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-7xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb/Category Badge */}
            <div className="mb-4">
              <Link
                href="/news"
                className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#262B7E] transition hover:bg-blue-100"
              >
                {t("news.backToList") || "Kembali ke Berita"}
              </Link>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {newsItem.title}
            </h1>

            {/* Meta Info & Action Buttons */}
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Meta Info */}
              <div className="space-y-1 text-sm text-slate-600">
                {formattedDate && <p>{formattedDate}</p>}
                {authorName && (
                  <div>
                    <span className="text-slate-600">{t("news.author") || "Narasumber"}:</span>{" "}
                    <span className="font-medium text-[#262B7E]">{authorName}</span>
                  </div>
                )}
                <p className="text-slate-500">
                  {t("news.writtenBy") || "Ditulis oleh Tim Medis Sentra Medika Hospital"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: newsItem.title,
                        text: newsItem.summary,
                        url: window.location.href,
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#262B7E] bg-white px-4 py-2 text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                  {t("news.share") || "Bagikan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  className="inline-flex items-center justify-center rounded-lg border border-[#262B7E] bg-white p-2 text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
                  aria-label={t("news.copyLink") || "Salin tautan"}
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-96">
              <Image
                src={coverImage}
                alt={newsItem.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Article Content */}
            <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-[#262B7E] prose-strong:text-slate-900">
              <div
                dangerouslySetInnerHTML={{
                  __html: content || "",
                }}
                className="text-base leading-relaxed"
              />
            </article>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              <span className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-[#262B7E]">
                Thalasemia
              </span>
              <span className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-[#262B7E]">
                Sentra Medika Cisalak
              </span>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="mb-6 text-xl font-bold text-slate-900">
                {t("news.relatedNews") || "Berita Lainnya"}
              </h2>
              {relatedNews.length === 0 ? (
                <p className="text-sm text-slate-500">
                  {t("news.noRelatedNews") || "Tidak ada berita terkait"}
                </p>
              ) : (
                <div className="space-y-6">
                  {relatedNews.map((post) => (
                    <Link
                      key={post.id}
                      href={`/news/${post.slug}`}
                      className="group block border-b border-slate-200 pb-6 last:border-0"
                    >
                      <p className="mb-2 text-sm font-medium text-slate-500">
                        {post.published_at}
                      </p>
                      <h3 className="mb-2 line-clamp-2 font-semibold leading-snug text-slate-900 transition group-hover:text-[#262B7E]">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {post.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
