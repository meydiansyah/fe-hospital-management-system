"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { transformArticle, getImageUrl } from "@/lib/dataTransformers";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
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
const dummyArticles: BlogPost[] = [
  {
    id: 1,
    cover:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80&auto=format&fit=crop",
    published_at: "25 Agustus 2025",
    author: {
      name: "dr. Anita Sharma, Sp.OT",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "BMD (Bone Mineral Densitometry): Deteksi Dini Risiko Patah Tulang",
    summary:
      'Osteoporosis dikenal sebagai "silent disease" karena sering kali berkembang tanpa gejala hingga terjadi patah tulang...',
    slug: "bmd-deteksi-dini-risiko-patah-tulang",
    content: `
      <p>Osteoporosis dikenal sebagai "silent disease" karena sering kali berkembang tanpa gejala hingga terjadi patah tulang. Pemeriksaan BMD (Bone Mineral Densitometry) adalah metode paling akurat untuk mengukur kepadatan tulang dan mendeteksi risiko osteoporosis sejak dini.</p>
      
      <h2>Apa itu BMD?</h2>
      <p>BMD adalah tes non-invasif yang menggunakan sinar-X dosis rendah untuk mengukur kandungan mineral dalam tulang. Tes ini biasanya dilakukan pada tulang belakang, pinggul, dan pergelangan tangan.</p>
      
      <h2>Siapa yang Perlu Melakukan Tes BMD?</h2>
      <ul>
        <li>Wanita berusia 65 tahun ke atas</li>
        <li>Pria berusia 70 tahun ke atas</li>
        <li>Orang dengan riwayat patah tulang</li>
        <li>Mereka yang mengonsumsi obat steroid jangka panjang</li>
      </ul>
      
      <p>Deteksi dini melalui BMD dapat membantu mencegah patah tulang yang serius dan meningkatkan kualitas hidup Anda.</p>
    `,
  },
  {
    id: 2,
    cover:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80&auto=format&fit=crop",
    published_at: "25 Agustus 2025",
    author: {
      name: "dr. Budi Santoso, Sp.PD",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Cuci Darah Bukan Akhir Segalanya: Kenali Fakta Gagal Ginjal",
    summary:
      "Gagal ginjal bukan berarti hidup berakhir. Ketahui kapan cuci darah diperlukan dan bagaimana menjalani kehidupan yang berkualitas...",
    slug: "cuci-darah-fakta-gagal-ginjal",
    content: `
      <p>Gagal ginjal adalah kondisi serius, namun bukan berarti hidup berakhir. Dengan penanganan yang tepat, termasuk hemodialisis (cuci darah), pasien dapat menjalani kehidupan yang berkualitas.</p>
      
      <h2>Kapan Cuci Darah Diperlukan?</h2>
      <p>Cuci darah diperlukan ketika fungsi ginjal sudah sangat menurun (di bawah 15%) dan tidak mampu lagi menyaring limbah dari darah secara efektif.</p>
      
      <h2>Fakta tentang Cuci Darah</h2>
      <ul>
        <li>Cuci darah membantu menggantikan fungsi ginjal yang rusak</li>
        <li>Pasien dapat bekerja dan beraktivitas normal</li>
        <li>Diet dan pola hidup sehat tetap penting</li>
        <li>Transplantasi ginjal adalah opsi jangka panjang</li>
      </ul>
      
      <p>Konsultasikan dengan dokter spesialis ginjal untuk mendapatkan penanganan terbaik.</p>
    `,
  },
  {
    id: 3,
    cover:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop",
    published_at: "24 Agustus 2025",
    author: {
      name: "dr. Citra Dewi, Sp.S",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Stroke Ringan, Tapi Dampaknya Serius – Jangan Dianggap Sepele!",
    summary:
      "Gejala stroke ringan sering diabaikan. Kenali tanda-tandanya dan lakukan pencegahan sejak dini untuk menghindari stroke berat...",
    slug: "stroke-ringan-dampak-serius",
    content: `
      <p>Stroke ringan atau TIA (Transient Ischemic Attack) sering diabaikan karena gejalanya hilang dalam waktu singkat. Namun, TIA adalah peringatan serius bahwa Anda berisiko mengalami stroke berat.</p>
      
      <h2>Gejala Stroke Ringan</h2>
      <ul>
        <li>Kelemahan atau mati rasa mendadak pada wajah, lengan, atau kaki</li>
        <li>Kesulitan berbicara atau memahami ucapan</li>
        <li>Gangguan penglihatan pada satu atau kedua mata</li>
        <li>Kehilangan keseimbangan atau koordinasi</li>
      </ul>
      
      <h2>Pencegahan Stroke</h2>
      <p>Kontrol tekanan darah, kolesterol, dan gula darah. Berhenti merokok, olahraga teratur, dan konsumsi makanan sehat adalah kunci pencegahan stroke.</p>
      
      <p>Jika mengalami gejala stroke ringan, segera periksakan diri ke dokter untuk mencegah stroke yang lebih parah.</p>
    `,
  },
  {
    id: 4,
    cover:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&auto=format&fit=crop",
    published_at: "23 Agustus 2025",
    author: {
      name: "dr. David Kurniawan, Sp.JP",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Jantung Sehat, Hidup Nikmat: 5 Cara Cegah Serangan Jantung",
    summary:
      "Serangan jantung bisa dicegah dengan pola hidup yang tepat. Temukan 5 cara mudah untuk menjaga kesehatan jantung Anda...",
    slug: "jantung-sehat-cegah-serangan",
    content: `
      <p>Penyakit jantung adalah penyebab utama kematian di dunia. Namun, sebagian besar serangan jantung dapat dicegah dengan perubahan gaya hidup sederhana.</p>
      
      <h2>5 Cara Cegah Serangan Jantung</h2>
      <ol>
        <li><strong>Olahraga Teratur:</strong> Minimal 30 menit sehari, 5 hari seminggu</li>
        <li><strong>Pola Makan Sehat:</strong> Perbanyak buah, sayur, dan kurangi lemak jenuh</li>
        <li><strong>Berhenti Merokok:</strong> Merokok meningkatkan risiko serangan jantung hingga 2-4 kali lipat</li>
        <li><strong>Kelola Stres:</strong> Stres kronis dapat merusak kesehatan jantung</li>
        <li><strong>Cek Kesehatan Rutin:</strong> Pantau tekanan darah, kolesterol, dan gula darah secara teratur</li>
      </ol>
      
      <p>Mulai hari ini, jaga kesehatan jantung Anda untuk hidup yang lebih panjang dan berkualitas!</p>
    `,
  },
  {
    id: 5,
    cover:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop",
    published_at: "22 Agustus 2025",
    author: {
      name: "dr. Eka Putri, Sp.PD",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Diabetes: Kendalikan Gula Darah, Kendalikan Hidup Anda",
    summary:
      "Diabetes tipe 2 dapat dikendalikan dengan pola makan sehat dan olahraga teratur. Pelajari cara mengelola diabetes dengan efektif...",
    slug: "diabetes-kendalikan-gula-darah",
    content: `
      <p>Diabetes tipe 2 mempengaruhi jutaan orang di seluruh dunia. Kabar baiknya, diabetes dapat dikendalikan dengan baik melalui perubahan gaya hidup dan pengobatan yang tepat.</p>
      
      <h2>Tips Mengelola Diabetes</h2>
      <ul>
        <li>Pantau gula darah secara teratur</li>
        <li>Konsumsi makanan dengan indeks glikemik rendah</li>
        <li>Olahraga minimal 150 menit per minggu</li>
        <li>Minum obat sesuai anjuran dokter</li>
        <li>Kelola stres dengan baik</li>
      </ul>
      
      <h2>Pentingnya Kontrol Rutin</h2>
      <p>Pemeriksaan HbA1c setiap 3 bulan membantu memantau kontrol gula darah jangka panjang dan mencegah komplikasi seperti kerusakan saraf, ginjal, dan mata.</p>
      
      <p>Dengan manajemen yang tepat, Anda dapat hidup normal dan produktif meskipun memiliki diabetes.</p>
    `,
  },
  {
    id: 6,
    cover:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80&auto=format&fit=crop",
    published_at: "21 Agustus 2025",
    author: {
      name: "dr. Fitri Handayani, Sp.OG",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    title: "Kanker Serviks: Deteksi Dini Selamatkan Nyawa",
    summary:
      "Kanker serviks dapat dicegah dan dideteksi dini melalui skrining rutin. Kenali pentingnya pemeriksaan Pap smear dan vaksinasi HPV...",
    slug: "kanker-serviks-deteksi-dini",
    content: `
      <p>Kanker serviks adalah salah satu jenis kanker yang paling dapat dicegah. Dengan skrining rutin dan vaksinasi HPV, risiko kanker serviks dapat dikurangi secara signifikan.</p>
      
      <h2>Metode Deteksi Dini</h2>
      <ul>
        <li><strong>Pap Smear:</strong> Skrining untuk mendeteksi perubahan sel abnormal pada serviks</li>
        <li><strong>Tes HPV:</strong> Mendeteksi keberadaan virus HPV yang menyebabkan kanker serviks</li>
        <li><strong>IVA Test:</strong> Metode skrining visual dengan asam asetat</li>
      </ul>
      
      <h2>Vaksinasi HPV</h2>
      <p>Vaksin HPV efektif mencegah infeksi virus yang menyebabkan sebagian besar kasus kanker serviks. Vaksinasi direkomendasikan untuk anak perempuan usia 9-14 tahun.</p>
      
      <h2>Kapan Harus Skrining?</h2>
      <p>Wanita usia 21-65 tahun disarankan melakukan Pap smear setiap 3 tahun, atau tes HPV setiap 5 tahun.</p>
      
      <p>Deteksi dini adalah kunci untuk mencegah dan mengobati kanker serviks dengan tingkat kesembuhan yang tinggi.</p>
    `,
  },
];

export default function ArticleDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { articles, articlesLoading } = useSelector((state: RootState) => state.masterData);

  // Use API data if available, otherwise fallback to dummy data
  const article = useMemo(() => {
    if (articles && articles.length > 0) {
      const found = articles.find((a) => a.slug === slugParam);
      return found ? transformArticle(found) : null;
    }
    // Fallback to dummy data
    return dummyArticles.find((a) => a.slug === slugParam) || null;
  }, [articles, slugParam]);

  const originalArticle = useMemo(() => {
    if (articles && articles.length > 0) {
      return articles.find((a) => a.slug === slugParam);
    }
    return dummyArticles.find((a) => a.slug === slugParam);
  }, [articles, slugParam]);

  if (articlesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">{t("article.loading") || "Memuat artikel..."}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const coverImage =
    originalArticle && "images" in originalArticle
      ? getImageUrl(
          originalArticle.images,
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop"
        )
      : article.cover;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]">
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt={article.title}
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
              href="/article"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("article.backToList") || "Kembali ke Artikel"}
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                {article.summary}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.published_at}</span>
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
              __html:
                (originalArticle && "content" in originalArticle
                  ? originalArticle.content
                  : null) || article.summary,
            }}
            className="text-base leading-relaxed text-slate-700"
          />
        </article>

        {/* Share Section */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t("article.shareTitle") || "Bagikan Artikel Ini"}
              </h3>
              <p className="text-sm text-slate-600">
                {t("article.shareDescription") ||
                  "Bantu sebarkan informasi kesehatan yang bermanfaat."}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Share2 className="h-4 w-4" />
              {t("article.share") || "Bagikan"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
