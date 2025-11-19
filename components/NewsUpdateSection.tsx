"use client";

import Image from "next/image";
import Link from "next/link";

type NewsUpdate = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

// Dummy data for news updates
const dummyNews: NewsUpdate[] = [
  {
    id: "1",
    date: "25 Agustus 2025",
    title: "Pemkab Bogor Dukung Kehadiran SWICC Sentra Medika Cibinong, Pusa...",
    excerpt:
      "Pemerintah Kabupaten Bogor menyambut baik dan memberikan dukungan penuh atas kehadiran...",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    href: "/news/swicc-bogor-dukungan",
  },
  {
    id: "2",
    date: "25 Agustus 2025",
    title: "Minahasa Utara Ukir Sejarah: Sentra Medika Hospital Resmi Pelopor Wisat...",
    excerpt:
      "Babak baru industri pariwisata dan kesehatan Indonesia bagian timur resmi dibuka....",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80",
    href: "/news/minahasa-utara-wisata-medis",
  },
  {
    id: "3",
    date: "25 Agustus 2025",
    title: "Sentra Medika Hospital Cara Menyimpan Obat",
    excerpt:
      "Tidak semua obat bisa sembarangan disimpan di lemari atau dapur rumah. Ada yang harus di...",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    href: "/news/cara-simpan-obat",
  },
];

export default function NewsUpdateSection() {
  return (
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Image
            src="/NewsUpdateSentra.png"
            alt="Sentra Update"
            width={280}
            height={80}
            className="h-auto w-auto"
            priority
          />
          <Link
            href="/news"
            className="rounded-full border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#5B7CFF] hover:text-[#5B7CFF]"
          >
            Lihat Semua
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyNews.map((news) => (
            <Link
              key={news.id}
              href={news.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Date */}
                <p className="mb-3 text-sm text-slate-500">{news.date}</p>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-slate-900 line-clamp-2">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 line-clamp-3">{news.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

