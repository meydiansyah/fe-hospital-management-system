"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

interface CorporatePartner {
  id: number;
  name: string;
  logo: string;
  slug: string;
  description: string;
  about: string;
  benefits: string[];
  programs: {
    morning: string[];
    afternoon: string[];
  };
  contact?: {
    website?: string;
    phone?: string;
  };
}

// Dummy data - harus sama dengan data di page.tsx
const dummyCorporatePartners: CorporatePartner[] = [
  {
    id: 1,
    name: "Kisi 93.4 FM Bogor",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    slug: "kisi-fm-bogor",
    description:
      "Merupakan Radio Kesehatan Keluarga dengan dukungan sepenuhnya dari Sentra Medika Hospitalis Group. Dengan jam siaran 24 jam partner terpercaya untuk melaksanakan event organizer.",
    about: `PT Kancah Irama Suara Indonesia (93.4 Kisi FM) Merupakan radio kesehatan pertama di Indonesia yang dikelola secara profesional dengan memberdayakan sumber daya rumah sakit yang dikelola oleh Sentra Medika Group (Rumah Sakit, Institute Medika Drg. Suherman, Industri Farmasi, Rumah Duka, Krematorium dan Rumah Abu). Kisi 93.4 FM memiliki kekuatan sumber daya yang mumpuni dan diaplikasikan kedalam berbagai bentuk Program Siaran dengan pengemasan yang tetap menghubur sehingga target pendengar keluarga dapat diraih secara tajam dan dapat diandalkan sebagai media yang tepat dalam berpromosi. Untuk client baik lokal ataupun nasional, team marketing kami akan selalu siap membantu dan memfasilitasi kebutuhan berpromosi baik untuk program on air ataupun off air dan terintegrasi juga dengan berbagai sosial media.`,
    benefits: [],
    programs: {
      morning: ["Dokter bicara", "KISItalkshow", "KISI Livereport"],
      afternoon: [
        "Lintas Informasi Kesehatan",
        "After Midnight",
        "40 Musik Sehat Dunia",
        "KISI Music Request",
        "10 Music Sehat Dunia",
      ],
    },
    contact: {
      website: "www.kisi934fm.com",
      phone: "0251-8371234",
    },
  },
  {
    id: 2,
    name: "Universitas Medika Suherman",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    slug: "universitas-medika-suherman",
    description: "Institusi pendidikan kesehatan terkemuka yang mencetak tenaga medis profesional",
    about:
      "Universitas Medika Suherman adalah institusi pendidikan tinggi yang fokus pada bidang kesehatan dengan kurikulum berbasis kompetensi dan praktik langsung di fasilitas Sentra Medika Group.",
    benefits: [],
    programs: {
      morning: ["Program S1 Keperawatan", "Program D3 Farmasi"],
      afternoon: ["Program D3 Analis Kesehatan", "Program D3 Fisioterapi"],
    },
  },
  {
    id: 3,
    name: "SMK Kesehatan Sentra Medika",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    slug: "smk-kesehatan-sentra-medika",
    description: "Sekolah menengah kejuruan kesehatan dengan fasilitas modern",
    about:
      "SMK Kesehatan Sentra Medika memberikan pendidikan vokasi kesehatan tingkat menengah dengan praktik langsung di rumah sakit untuk mempersiapkan siswa menjadi tenaga kesehatan terampil.",
    benefits: [],
    programs: {
      morning: ["Keperawatan", "Farmasi Klinis"],
      afternoon: ["Analis Kesehatan", "Rekam Medis"],
    },
  },
  {
    id: 4,
    name: "Pelayanan Rumah Duka",
    logo: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&q=80",
    slug: "pelayanan-rumah-duka",
    description: "Layanan pemakaman dan rumah duka dengan fasilitas lengkap",
    about:
      "Pelayanan Rumah Duka Sentra Medika menyediakan layanan pemakaman yang profesional dan penuh empati untuk membantu keluarga dalam masa duka.",
    benefits: [],
    programs: {
      morning: [],
      afternoon: [],
    },
  },
  {
    id: 5,
    name: "Klinik Pratama Sentra",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    slug: "klinik-pratama-sentra",
    description: "Klinik kesehatan pratama dengan pelayanan terpadu",
    about:
      "Klinik Pratama Sentra adalah fasilitas kesehatan tingkat pertama yang memberikan pelayanan kesehatan dasar dan preventif kepada masyarakat.",
    benefits: [],
    programs: {
      morning: [],
      afternoon: [],
    },
  },
  {
    id: 6,
    name: "Apotek Sentra Farma",
    logo: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80",
    slug: "apotek-sentra-farma",
    description: "Apotek dan farmasi terpercaya",
    about:
      "Apotek Sentra Farma menyediakan obat-obatan berkualitas dan pelayanan farmasi yang profesional untuk kesehatan Anda.",
    benefits: [],
    programs: {
      morning: [],
      afternoon: [],
    },
  },
  {
    id: 7,
    name: "Laboratorium Kesehatan Sentra",
    logo: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80",
    slug: "laboratorium-kesehatan-sentra",
    description: "Layanan laboratorium kesehatan dengan teknologi modern",
    about:
      "Laboratorium Kesehatan Sentra dilengkapi dengan peralatan canggih untuk pemeriksaan diagnostik yang akurat dan cepat.",
    benefits: [],
    programs: {
      morning: [],
      afternoon: [],
    },
  },
  {
    id: 8,
    name: "Sentra Home Care",
    logo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    slug: "sentra-home-care",
    description: "Layanan perawatan kesehatan di rumah",
    about:
      "Sentra Home Care memberikan layanan perawatan kesehatan profesional di kenyamanan rumah Anda dengan tenaga medis berpengalaman.",
    benefits: [],
    programs: {
      morning: [],
      afternoon: [],
    },
  },
];

export default function KorporasiDetailPage() {
  const params = useParams();
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const partner = useMemo(() => {
    return dummyCorporatePartners.find((p) => p.slug === slugParam) || null;
  }, [slugParam]);

  if (!partner) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-slate-600">Mitra korporasi tidak ditemukan.</p>
          <Link
            href="/partner/korporasi"
            className="mt-4 inline-block text-sm font-semibold text-[#4461F2] transition hover:text-[#3651E1]"
          >
            Kembali ke Daftar Korporasi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Image */}
      <div className="relative h-64 bg-gradient-to-r from-slate-100 to-slate-50">
        <Image
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80"
          alt="Team collaboration"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Logo and Title Section */}
            <div className="mb-8 mt-8">
              <div className="mb-6">
                <div className="mb-6 inline-block overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
                  <div className="relative h-32 w-32">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-[#262B7E]">{partner.name}</h1>
                <p className="mb-6 text-base leading-relaxed text-slate-700">
                  {partner.description}
                </p>
              </div>

              {/* About Section */}
              <p className="text-base leading-relaxed text-slate-700">{partner.about}</p>
            </div>

            {/* Programs Section */}
            {(partner.programs.morning.length > 0 || partner.programs.afternoon.length > 0) && (
              <div className="mb-8">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Program & Insert Unggulan</h2>

                {partner.programs.morning.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-slate-900">Program & Insert Unggulan</h3>
                    <ol className="list-decimal space-y-2 pl-5">
                      {partner.programs.morning.map((program, index) => (
                        <li key={index} className="text-slate-700">
                          {program}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {partner.programs.afternoon.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-semibold text-slate-900">Program & Insert Unggulan</h3>
                    <ol className="list-decimal space-y-2 pl-5">
                      {partner.programs.afternoon.map((program, index) => (
                        <li key={index} className="text-slate-700">
                          {program}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Contact Section */}
            {partner.contact && (partner.contact.website || partner.contact.phone) && (
              <div className="mb-8">
                {partner.contact.website && (
                  <p className="mb-2 text-slate-700">
                    <strong>Website:</strong> {partner.contact.website}
                  </p>
                )}
                {partner.contact.phone && (
                  <p className="text-slate-700">
                    <strong>Call Center:</strong> {partner.contact.phone}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="relative overflow-hidden rounded-2xl border-2 border-red-500 bg-white p-6">
                {/* Red Pattern Background - positioned at top right corner */}
                <div className="absolute -right-20 -top-20 h-32 w-32">
                  <Image
                    src="/red-pattern.png"
                    alt="Pattern"
                    fill
                    className="object-contain opacity-80 rotate-40"
                    sizes="128px"
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="mb-2 text-lg font-bold text-[#262B7E]">
                    Punya pertanyaan atau butuh info lebih lanjut?
                  </h3>
                  <p className="mb-6 text-sm text-slate-700">Tim kami siap membantu Anda.</p>
                  <Link
                    href="/feedback"
                    className="block w-full rounded-lg bg-[#4461F2] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#3651E1]"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
