"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

interface InsurancePartner {
  id: number;
  name: string;
  logo: string;
  slug: string;
  description: string;
  benefits: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  contact: {
    website?: string;
    phone?: string;
    email?: string;
  };
}

// Dummy data - harus sama dengan data di page.tsx
const dummyInsurancePartners: InsurancePartner[] = [
  {
    id: 1,
    name: "Asuransi BRI Life, PT",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
    slug: "asuransi-bri-life",
    description:
      "BRI Life adalah perusahaan asuransi jiwa terpercaya yang merupakan bagian dari Bank Rakyat Indonesia (BRI). Dengan pengalaman panjang di industri keuangan dan perlindungan jiwa, BRI Life menghadirkan berbagai produk asuransi jiwa, kesehatan, dan investasi yang fleksibel sesuai kebutuhan nasabah.",
    benefits: [
      "Perlindungan luas: Meliputi biaya rawat inap, operasi, perawatan intensif, hingga layanan unggulan di Sentra Medika.",
      "Proses klaim mudah: Didukung sistem online dan layanan customer care yang cepat tanggap.",
      "Jaringan luas: Bekerjasama dengan banyak rumah sakit, termasuk seluruh jaringan Sentra Medika.",
      "Keamanan finansial: Menjamin pasien mendapatkan layanan terbaik tanpa khawatir biaya tak terduga.",
    ],
    howToUse: {
      title: "Cara Menggunakan Asuransi BRI Life di Sentra Medika:",
      steps: [
        "Pastikan Anda merupakan peserta aktif asuransi BRI Life.",
        "Saat registrasi di Sentra Medika, tunjukkan kartu kepesertaan BRI Life Anda.",
        "Staf administrasi akan membantu verifikasi dan menjelaskan layanan yang ditanggung.",
        "Nikmati layanan medis dengan perlindungan finansial yang aman.",
      ],
    },
    contact: {
      website: "www.brilife.co.id",
      phone: "1500 087",
    },
  },
  {
    id: 2,
    name: "Asuransi Astra Buana, PT",
    logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=80",
    slug: "asuransi-astra-buana",
    description:
      "Asuransi Astra Buana adalah perusahaan asuransi umum yang memberikan perlindungan komprehensif untuk berbagai kebutuhan, termasuk kesehatan, kendaraan, dan properti.",
    benefits: [
      "Perlindungan komprehensif untuk kesehatan dan kecelakaan",
      "Proses klaim yang cepat dan mudah",
      "Jaringan rumah sakit yang luas",
      "Layanan pelanggan 24/7",
    ],
    howToUse: {
      title: "Cara Menggunakan Asuransi Astra Buana di Sentra Medika:",
      steps: [
        "Pastikan polis asuransi Anda aktif",
        "Bawa kartu asuransi dan identitas diri",
        "Registrasi di bagian admisi",
        "Staf akan membantu proses verifikasi",
      ],
    },
    contact: {
      website: "www.asuransiastrabuana.co.id",
      phone: "021-5021800",
    },
  },
  {
    id: 3,
    name: "Admedika - BNI Life Insurance",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    slug: "admedika-bni-life",
    description:
      "Admedika bekerja sama dengan BNI Life menyediakan layanan asuransi kesehatan yang komprehensif dengan jaringan provider yang luas di seluruh Indonesia.",
    benefits: [
      "Layanan kesehatan cashless",
      "Jaringan rumah sakit terlengkap",
      "Proses klaim online",
      "Customer service responsif",
    ],
    howToUse: {
      title: "Cara Menggunakan Admedika - BNI Life di Sentra Medika:",
      steps: [
        "Tunjukkan kartu Admedika saat registrasi",
        "Pastikan polis masih aktif",
        "Ikuti prosedur verifikasi",
        "Nikmati layanan cashless",
      ],
    },
    contact: {
      website: "www.admedika.co.id",
      phone: "1500910",
    },
  },
  {
    id: 4,
    name: "Admedika - Allianz Life Indonesia",
    logo: "https://images.unsplash.com/photo-1554224311-beee4ece8474?w=600&q=80",
    slug: "admedika-allianz-life",
    description:
      "Allianz Life Indonesia melalui Admedika menawarkan solusi asuransi kesehatan dengan perlindungan menyeluruh dan layanan berkelas internasional.",
    benefits: [
      "Perlindungan kesehatan internasional",
      "Layanan cashless di rumah sakit terkemuka",
      "Proses klaim mudah dan cepat",
      "Program kesehatan preventif",
    ],
    howToUse: {
      title: "Cara Menggunakan Admedika - Allianz Life di Sentra Medika:",
      steps: [
        "Bawa kartu asuransi Allianz",
        "Registrasi di bagian admisi",
        "Verifikasi dengan staf administrasi",
        "Dapatkan layanan kesehatan terbaik",
      ],
    },
    contact: {
      website: "www.allianz.co.id",
      phone: "1500136",
    },
  },
  {
    id: 5,
    name: "AIA Financial",
    logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    slug: "aia-financial",
    description:
      "AIA Financial adalah pemimpin asuransi jiwa di Asia yang menawarkan perlindungan kesehatan dan finansial terpadu untuk kehidupan yang lebih baik.",
    benefits: [
      "Perlindungan jiwa dan kesehatan terpadu",
      "Jaringan provider kesehatan luas",
      "Program wellness dan preventif",
      "Layanan digital terintegrasi",
    ],
    howToUse: {
      title: "Cara Menggunakan AIA Financial di Sentra Medika:",
      steps: [
        "Pastikan kartu AIA Anda aktif",
        "Tunjukkan saat registrasi",
        "Ikuti prosedur verifikasi",
        "Nikmati layanan kesehatan premium",
      ],
    },
    contact: {
      website: "www.aia-financial.co.id",
      phone: "1500988",
    },
  },
  {
    id: 6,
    name: "BPJS Ketenagakerjaan",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    slug: "bpjs-ketenagakerjaan",
    description:
      "BPJS Ketenagakerjaan adalah program jaminan sosial yang memberikan perlindungan kepada pekerja untuk mengatasi risiko sosial ekonomi tertentu.",
    benefits: [
      "Jaminan Kecelakaan Kerja (JKK)",
      "Jaminan Hari Tua (JHT)",
      "Jaminan Pensiun (JP)",
      "Jaminan Kematian (JKm)",
    ],
    howToUse: {
      title: "Cara Menggunakan BPJS Ketenagakerjaan di Sentra Medika:",
      steps: [
        "Bawa kartu BPJS Ketenagakerjaan",
        "Untuk kasus kecelakaan kerja, bawa surat keterangan dari perusahaan",
        "Registrasi di bagian BPJS",
        "Ikuti prosedur verifikasi",
      ],
    },
    contact: {
      website: "www.bpjsketenagakerjaan.go.id",
      phone: "175",
    },
  },
  {
    id: 7,
    name: "Asuransi Sinarmas, PT",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    slug: "asuransi-sinarmas",
    description:
      "Asuransi Sinarmas menyediakan berbagai produk asuransi umum dan jiwa dengan perlindungan yang komprehensif dan harga yang kompetitif.",
    benefits: [
      "Produk asuransi beragam",
      "Premi kompetitif",
      "Jaringan luas",
      "Klaim mudah",
    ],
    howToUse: {
      title: "Cara Menggunakan Asuransi Sinarmas di Sentra Medika:",
      steps: [
        "Tunjukkan polis asuransi",
        "Registrasi dengan kartu identitas",
        "Verifikasi cakupan",
        "Dapatkan layanan medis",
      ],
    },
    contact: {
      website: "www.sinarmas.co.id",
      phone: "1500155",
    },
  },
  {
    id: 8,
    name: "BCA Life",
    logo: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    slug: "bca-life",
    description:
      "BCA Life adalah perusahaan asuransi jiwa yang menawarkan berbagai produk perlindungan jiwa dan kesehatan dengan dukungan teknologi digital.",
    benefits: [
      "Perlindungan jiwa dan kesehatan",
      "Proses digital mudah",
      "Jaringan rumah sakit luas",
      "Customer service excellent",
    ],
    howToUse: {
      title: "Cara Menggunakan BCA Life di Sentra Medika:",
      steps: [
        "Bawa kartu BCA Life",
        "Registrasi di admisi",
        "Verifikasi polis",
        "Nikmati layanan",
      ],
    },
    contact: {
      website: "www.bcalife.co.id",
      phone: "1500880",
    },
  },
  {
    id: 9,
    name: "Prudential Indonesia",
    logo: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80",
    slug: "prudential-indonesia",
    description:
      "Prudential Indonesia adalah pemimpin asuransi jiwa yang menyediakan solusi perlindungan kesehatan dan investasi untuk masa depan yang lebih baik.",
    benefits: [
      "Perlindungan komprehensif",
      "Investasi dan proteksi terpadu",
      "Jaringan global",
      "Layanan pelanggan terbaik",
    ],
    howToUse: {
      title: "Cara Menggunakan Prudential di Sentra Medika:",
      steps: [
        "Tunjukkan kartu Prudential",
        "Bawa identitas diri",
        "Verifikasi benefit",
        "Dapatkan perawatan",
      ],
    },
    contact: {
      website: "www.prudential.co.id",
      phone: "1500085",
    },
  },
  {
    id: 10,
    name: "Manulife Indonesia",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    slug: "manulife-indonesia",
    description:
      "Manulife Indonesia menawarkan produk asuransi jiwa dan kesehatan dengan fokus pada perlindungan jangka panjang dan investasi.",
    benefits: [
      "Proteksi jangka panjang",
      "Investasi berkelanjutan",
      "Layanan kesehatan premium",
      "Fleksibilitas produk",
    ],
    howToUse: {
      title: "Cara Menggunakan Manulife di Sentra Medika:",
      steps: [
        "Bawa kartu Manulife",
        "Registrasi di loket",
        "Verifikasi coverage",
        "Terima layanan",
      ],
    },
    contact: {
      website: "www.manulife.co.id",
      phone: "14888",
    },
  },
  {
    id: 11,
    name: "AXA Mandiri",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    slug: "axa-mandiri",
    description:
      "AXA Mandiri adalah perusahaan asuransi hasil joint venture antara AXA dan Bank Mandiri yang menawarkan solusi proteksi terpadu.",
    benefits: [
      "Proteksi menyeluruh",
      "Akses mudah melalui Mandiri",
      "Jaringan internasional",
      "Produk inovatif",
    ],
    howToUse: {
      title: "Cara Menggunakan AXA Mandiri di Sentra Medika:",
      steps: [
        "Tunjukkan kartu AXA Mandiri",
        "Registrasi dengan KTP",
        "Verifikasi benefit",
        "Dapatkan layanan medis",
      ],
    },
    contact: {
      website: "www.axa-mandiri.co.id",
      phone: "1500803",
    },
  },
  {
    id: 12,
    name: "Sequis Life",
    logo: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&q=80",
    slug: "sequis-life",
    description:
      "Sequis Life adalah perusahaan asuransi jiwa yang fokus pada perlindungan kesehatan dan finansial dengan pendekatan personal.",
    benefits: [
      "Perlindungan personal",
      "Kesehatan dan jiwa terpadu",
      "Konsultan profesional",
      "Klaim responsif",
    ],
    howToUse: {
      title: "Cara Menggunakan Sequis Life di Sentra Medika:",
      steps: [
        "Bawa kartu Sequis Life",
        "Registrasi di bagian asuransi",
        "Verifikasi dengan staf",
        "Nikmati layanan kesehatan",
      ],
    },
    contact: {
      website: "www.sequis.co.id",
      phone: "500089",
    },
  },
];

export default function PenjaminDetailPage() {
  const params = useParams();
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const partner = useMemo(() => {
    return dummyInsurancePartners.find((p) => p.slug === slugParam) || null;
  }, [slugParam]);

  // Get other partners for "Mitra Penjamin Lainnya" section
  const otherPartners = useMemo(() => {
    return dummyInsurancePartners.filter((p) => p.slug !== slugParam).slice(0, 4);
  }, [slugParam]);

  if (!partner) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-slate-600">Mitra penjamin tidak ditemukan.</p>
          <Link
            href="/partner/penjamin"
            className="mt-4 inline-block text-sm font-semibold text-[#4461F2] transition hover:text-[#3651E1]"
          >
            Kembali ke Daftar Penjamin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Image Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-50 to-purple-50">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
          alt="Medical consultation"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo and CTA Section */}
        <div className="-mt-16 mb-12 grid gap-8 lg:grid-cols-3">
          {/* Logo Card */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-6">
                <div className="relative h-24 w-32 shrink-0">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{partner.name}</h1>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-700">{partner.description}</p>
            </div>
          </div>

          {/* CTA Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl">
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                <div className="relative z-10">
                  <div className="mb-6 text-center">
                    <p className="mb-2 text-sm text-slate-600">Konsultasi langsung dengan</p>
                    <h3 className="text-xl font-bold text-[#262B7E]">Dokter Terpercaya</h3>
                  </div>

                  <Link
                    href="/doctor"
                    className="block w-full rounded-lg bg-[#4461F2] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#3651E1]"
                  >
                    Buat Janji Temu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Keuntungan Menggunakan {partner.name}</h2>
          <ul className="space-y-3">
            {partner.benefits.map((benefit, index) => (
              <li key={index} className="flex gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4461F2]"></span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How to Use Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">{partner.howToUse.title}</h2>
          <ol className="space-y-3">
            {partner.howToUse.steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-slate-700">
                <span className="shrink-0 font-bold text-[#262B7E]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact Section */}
        {(partner.contact.website || partner.contact.phone) && (
          <div className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Kontak {partner.name}</h2>
            <div className="space-y-2 text-slate-700">
              {partner.contact.website && (
                <p>
                  <strong>Website:</strong> {partner.contact.website}
                </p>
              )}
              {partner.contact.phone && (
                <p>
                  <strong>Call Center:</strong> {partner.contact.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Other Partners Section */}
        {otherPartners.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Mitra Penjamin Lainnya</h2>
              <Link
                href="/partner/penjamin"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4461F2] transition hover:text-[#3651E1]"
              >
                Lihat Semua Penjamin
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {otherPartners.map((p) => (
                <Link
                  key={p.id}
                  href={`/partner/penjamin/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div className="relative mb-4 flex h-24 items-center justify-center">
                    <div className="relative h-full w-full">
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        className="object-contain transition duration-300 group-hover:scale-105"
                        sizes="200px"
                      />
                    </div>
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 transition group-hover:text-[#262B7E]">
                    {p.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

