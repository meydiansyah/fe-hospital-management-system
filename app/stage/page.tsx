"use client";

import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface StageVideo {
  id: number;
  title: string;
  speaker: string;
  thumbnail: string;
  videoUrl: string;
  slug: string;
}

// Dummy data untuk Sentra Stage
const dummyStageVideos: StageVideo[] = [
  {
    id: 1,
    title: "Quarter Life Crisis, Gangguan Mental?",
    speaker: "M. Rifky Anugrah P, S.Psi, M.Psi, Psikolog",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    videoUrl: "#",
    slug: "quarter-life-crisis-gangguan-mental",
  },
  {
    id: 2,
    title: "Gagal Ginjal Harus Cuci Darah?",
    speaker: "dr. R. Dody Muhamad Turmudzi, Sp.PD",
    thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    videoUrl: "#",
    slug: "gagal-ginjal-harus-cuci-darah",
  },
  {
    id: 3,
    title: "Cek Darah Harus Puasa? - dr. Rahardian Faisal, Sp.PK, MSc | Sentra Stage",
    speaker: "dr. Rahardian Faisal, Sp.PK, MSc",
    thumbnail: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80",
    videoUrl: "#",
    slug: "cek-darah-harus-puasa",
  },
  {
    id: 4,
    title: "Diabetes: Penyakit yang Bisa Dicegah",
    speaker: "dr. Siti Nurhaliza, Sp.PD",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    videoUrl: "#",
    slug: "diabetes-penyakit-dicegah",
  },
  {
    id: 5,
    title: "Kesehatan Jantung di Usia Muda",
    speaker: "dr. Ahmad Yani, Sp.JP",
    thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    videoUrl: "#",
    slug: "kesehatan-jantung-usia-muda",
  },
  {
    id: 6,
    title: "Pentingnya Deteksi Dini Kanker",
    speaker: "dr. Linda Wijaya, Sp.Onk",
    thumbnail: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    videoUrl: "#",
    slug: "deteksi-dini-kanker",
  },
  {
    id: 7,
    title: "Pola Hidup Sehat untuk Keluarga",
    speaker: "dr. Bambang Sutrisno, Sp.OG",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    videoUrl: "#",
    slug: "pola-hidup-sehat-keluarga",
  },
  {
    id: 8,
    title: "Mengatasi Stress di Tempat Kerja",
    speaker: "Psikolog Dewi Kusuma, M.Psi",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    videoUrl: "#",
    slug: "mengatasi-stress-tempat-kerja",
  },
  {
    id: 9,
    title: "Mitos dan Fakta Seputar Vaksinasi",
    speaker: "dr. Hendra Gunawan, Sp.A",
    thumbnail: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    videoUrl: "#",
    slug: "mitos-fakta-vaksinasi",
  },
  {
    id: 10,
    title: "Pentingnya Vitamin untuk Imunitas",
    speaker: "dr. Rina Marlina, Sp.GK",
    thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    videoUrl: "#",
    slug: "vitamin-untuk-imunitas",
  },
];

const StageVideoCard = ({ video }: { video: StageVideo }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-50">
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 lg:items-center">
        {/* Left: Thumbnail with Play Button */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90">
              <Play className="h-10 w-10 fill-[#262B7E] text-[#262B7E]" />
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h3 className="mb-2 text-xl font-bold leading-tight text-slate-900 lg:text-2xl">
            {video.title}
          </h3>
          <p className="text-sm text-slate-600">{video.speaker}</p>
        </div>
      </div>
    </div>
  );
};

export default function StagePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination calculations
  const totalPages = Math.ceil(dummyStageVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = dummyStageVideos.slice(startIndex, endIndex);
  const totalEntries = dummyStageVideos.length;

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

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

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Section with Blue Background */}
      <div className="relative mb-12 bg-gradient-to-br from-[#4A5FB5] to-[#6B7CC4] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            {/* Left: Text Content */}
            <div className="text-white">
              <h1 className="mb-2 text-4xl font-bold sm:text-5xl">Quarter Life Crisis =</h1>
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Gangguan Mental?</h1>
              <p className="text-base text-white/90">M. Rifky Anugrah P, S.Psi, M.Psi, Psikolog</p>
            </div>

            {/* Right: Featured Video Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={dummyStageVideos[0].thumbnail}
                alt={dummyStageVideos[0].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95">
                  <Play className="h-10 w-10 fill-[#262B7E] text-[#262B7E]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-12">
          <div className="relative h-20 w-56">
            <Image src="/StageSentra.png" alt="Sentra Stage" fill className="object-contain" />
          </div>
        </div>

        {/* Videos Grid */}
        <div className="mb-12 space-y-8">
          {currentVideos.map((video) => (
            <StageVideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Total Results - Left */}
          <p className="text-sm text-slate-600">
            Menampilkan {startIndex + 1} hingga {Math.min(endIndex, totalEntries)} dari{" "}
            {totalEntries} entri
          </p>

          {/* Pagination - Right */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Halaman sebelumnya"
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
                aria-label="Halaman berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
