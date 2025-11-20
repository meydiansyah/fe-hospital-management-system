"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState, useMemo } from "react";

interface InsurancePartner {
  id: number;
  name: string;
  logo: string;
  slug: string;
  description?: string;
}

// Dummy data untuk mitra penjamin
const dummyInsurancePartners: InsurancePartner[] = [
  {
    id: 1,
    name: "Asuransi BRI Life, PT",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=80",
    slug: "asuransi-bri-life",
    description: "BRI Life adalah perusahaan asuransi jiwa terpercaya",
  },
  {
    id: 2,
    name: "Asuransi Astra Buana, PT",
    logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=80",
    slug: "asuransi-astra-buana",
    description: "Asuransi Astra Buana - Perlindungan Terpercaya",
  },
  {
    id: 3,
    name: "Admedika - BNI Life Insurance",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    slug: "admedika-bni-life",
    description: "Layanan asuransi kesehatan BNI Life",
  },
  {
    id: 4,
    name: "Admedika - Allianz Life Indonesia",
    logo: "https://images.unsplash.com/photo-1554224311-beee4ece8474?w=400&q=80",
    slug: "admedika-allianz-life",
    description: "Asuransi jiwa dan kesehatan Allianz",
  },
  {
    id: 5,
    name: "AIA Financial",
    logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    slug: "aia-financial",
    description: "Asuransi jiwa AIA Financial",
  },
  {
    id: 6,
    name: "BPJS Ketenagakerjaan",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
    slug: "bpjs-ketenagakerjaan",
    description: "Jaminan sosial ketenagakerjaan",
  },
  {
    id: 7,
    name: "Asuransi Sinarmas, PT",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
    slug: "asuransi-sinarmas",
    description: "Asuransi umum dan jiwa Sinarmas",
  },
  {
    id: 8,
    name: "BCA Life",
    logo: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
    slug: "bca-life",
    description: "Asuransi jiwa BCA",
  },
  {
    id: 9,
    name: "Prudential Indonesia",
    logo: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=80",
    slug: "prudential-indonesia",
    description: "Asuransi jiwa Prudential",
  },
  {
    id: 10,
    name: "Manulife Indonesia",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    slug: "manulife-indonesia",
    description: "Asuransi jiwa Manulife",
  },
  {
    id: 11,
    name: "AXA Mandiri",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    slug: "axa-mandiri",
    description: "Asuransi jiwa AXA Mandiri",
  },
  {
    id: 12,
    name: "Sequis Life",
    logo: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&q=80",
    slug: "sequis-life",
    description: "Asuransi jiwa Sequis",
  },
];

const InsuranceCard = ({ partner }: { partner: InsurancePartner }) => {
  return (
    <Link
      href={`/partner/penjamin/${partner.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition hover:shadow-md"
    >
      {/* Logo Container */}
      <div className="relative mb-4 flex h-32 items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Partner Name */}
      <h3 className="text-center text-base font-semibold text-slate-900 transition group-hover:text-[#262B7E]">
        {partner.name}
      </h3>
    </Link>
  );
};

export default function PenjaminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter partners based on search
  const filteredPartners = useMemo(() => {
    if (!searchQuery) return dummyInsurancePartners;
    return dummyInsurancePartners.filter((partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartners = filteredPartners.slice(startIndex, endIndex);

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="mb-4 text-3xl font-bold text-[#262B7E] sm:text-4xl">
            Pastikan Kesehatan Anda dengan Mitra Penjamin Terpercaya
          </h1>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-slate-600">
            Di Sentra Medika, kami menerima pasien yang diasuransikan dengan klaim yang lancar dan
            kemitraan yang luas untuk perawatan yang bebas repot.
          </p>
          <Link
            href="#daftar-penjamin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4461F2] transition hover:text-[#3651E1]"
          >
            <Download className="h-4 w-4" />
            Lihat Daftar Mitra Penjamin
          </Link>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          {/* Left - Steps */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Bagaimana cara kerjanya</h2>
            <p className="mb-6 text-sm text-slate-600">
              Menggunakan Penjamin Anda di Sentra Medika sangatlah mudah. Ikuti langkah-langkah
              berikut ini agar prosesnya berjalan lancar:
            </p>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4 rounded-xl bg-blue-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-[#262B7E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">Periksa Cakupan Anda</h3>
                  <p className="text-sm text-slate-600">
                    Jelajahi mitra penjamin kami dan konfirmasikan penyedia Anda untuk cakupan.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 rounded-xl bg-blue-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-[#262B7E]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">Siapkan dokumen Anda</h3>
                  <p className="text-sm text-slate-600">
                    Bawa kartu penjamin, tanda pengenal, dan rujukan yang diperlukan.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 rounded-xl bg-blue-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-[#262B7E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">Kunjungi</h3>
                  <p className="text-sm text-slate-600">
                    Beritahu staf kami tentang penjamin Anda saat mendaftar.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 rounded-xl bg-blue-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-[#262B7E]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">Proses Klaim</h3>
                  <p className="text-sm text-slate-600">
                    Bergantung pada kebijakan Anda, nikmati layanan non-tunai atau proses
                    penggantian biaya.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4 rounded-xl bg-blue-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-[#262B7E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">Terima Perawatan</h3>
                  <p className="text-sm text-slate-600">
                    Dapatkan perawatan yang Anda butuhkan dengan percaya diri.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-96 overflow-hidden rounded-2xl lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
              alt="Medical consultation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Partners List Section */}
        <div id="daftar-penjamin">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Mitra Penjamin Kami</h2>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md">
            <input
              type="text"
              placeholder="Cari penjamin"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-6 pr-12 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#262B7E] focus:outline-none focus:ring-2 focus:ring-[#262B7E]/20"
            />
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Partners Grid */}
          {currentPartners.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-600">Tidak ada mitra penjamin ditemukan.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {currentPartners.map((partner) => (
                  <InsuranceCard key={partner.id} partner={partner} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1">
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
                          ? "bg-[#4461F2] text-white hover:bg-[#3651E1]"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

