"use client";

import Image from "next/image";
import { Download, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Brochure {
  id: number;
  title: string;
  image: string;
  fileType: string;
  downloadUrl: string;
  viewUrl: string;
}

// Dummy data untuk brosur
const dummyBrochures: Brochure[] = [
  {
    id: 1,
    title: "Medical Excellence.pdf",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 2,
    title: "Medical.pdf",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 3,
    title: "Medical.pdf",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 4,
    title: "legal-tenure.pdf",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 5,
    title: "Scann_158.pdf",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 6,
    title: "Sheet 1.xls",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    fileType: "xls",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 7,
    title: "README.pdf",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 8,
    title: "FunnyMemeOMG.gif",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    fileType: "gif",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 9,
    title: "Promo Kesehatan.pdf",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 10,
    title: "Layanan Unggulan.pdf",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 11,
    title: "Paket Kesehatan.pdf",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 12,
    title: "Info Vaksinasi.pdf",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    fileType: "pdf",
    downloadUrl: "#",
    viewUrl: "#",
  },
];

const BrochureCard = ({ brochure }: { brochure: Brochure }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-100">
        <Image
          src={brochure.image}
          alt={brochure.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-4 text-center text-base font-semibold text-slate-900">
          {brochure.title}
        </h3>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.open(brochure.downloadUrl, "_blank")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#4461F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#4461F2] transition hover:bg-[#4461F2] hover:text-white"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            onClick={() => window.open(brochure.viewUrl, "_blank")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4461F2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3651E1]"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BrochurePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination calculations
  const totalPages = Math.ceil(dummyBrochures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrochures = dummyBrochures.slice(startIndex, endIndex);

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
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold text-[#262B7E] sm:text-4xl">
            e-Brosur Sentra Medika
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            Dapatkan informasi lengkap mengenai layanan unggulan, fasilitas, hingga paket kesehatan
            di Sentra Medika. Unduh sekarang dan temukan solusi kesehatan terbaik untuk Anda dan
            keluarga.
          </p>
        </div>

        {/* Brochures Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {currentBrochures.map((brochure) => (
            <BrochureCard key={brochure.id} brochure={brochure} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
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
                    ? "bg-[#4461F2] text-white hover:bg-[#3651E1]"
                    : page === "..."
                    ? "cursor-default text-slate-400"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
