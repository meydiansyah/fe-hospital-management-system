"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

interface CorporatePartner {
  id: number;
  name: string;
  logo: string;
  slug: string;
  description?: string;
}

// Dummy data untuk mitra korporasi
const dummyCorporatePartners: CorporatePartner[] = [
  {
    id: 1,
    name: "Kisi 93.4 FM Bogor",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
    slug: "kisi-fm-bogor",
    description: "Radio Kesehatan Keluarga dengan dukungan sepenuhnya dari Sentra Medika Hospitalis Group",
  },
  {
    id: 2,
    name: "Universitas Medika Suherman",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
    slug: "universitas-medika-suherman",
    description: "Institusi pendidikan kesehatan terkemuka",
  },
  {
    id: 3,
    name: "SMK Kesehatan Sentra Medika",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
    slug: "smk-kesehatan-sentra-medika",
    description: "Sekolah menengah kejuruan kesehatan",
  },
  {
    id: 4,
    name: "Pelayanan Rumah Duka",
    logo: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=80",
    slug: "pelayanan-rumah-duka",
    description: "Layanan pemakaman dan rumah duka",
  },
  {
    id: 5,
    name: "Klinik Pratama Sentra",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80",
    slug: "klinik-pratama-sentra",
    description: "Klinik kesehatan pratama",
  },
  {
    id: 6,
    name: "Apotek Sentra Farma",
    logo: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80",
    slug: "apotek-sentra-farma",
    description: "Apotek dan farmasi terpercaya",
  },
  {
    id: 7,
    name: "Laboratorium Kesehatan Sentra",
    logo: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&q=80",
    slug: "laboratorium-kesehatan-sentra",
    description: "Layanan laboratorium kesehatan",
  },
  {
    id: 8,
    name: "Sentra Home Care",
    logo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    slug: "sentra-home-care",
    description: "Layanan perawatan di rumah",
  },
];

const PartnerCard = ({ partner }: { partner: CorporatePartner }) => {
  return (
    <Link
      href={`/partner/korporasi/${partner.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md"
    >
      {/* Logo Container */}
      <div className="relative mb-6 flex h-40 items-center justify-center">
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
      <h3 className="text-center text-lg font-bold text-slate-900 transition group-hover:text-[#262B7E]">
        {partner.name}
      </h3>
    </Link>
  );
};

export default function KorporasiPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter partners based on search
  const filteredPartners = useMemo(() => {
    if (!searchQuery) return dummyCorporatePartners;
    return dummyCorporatePartners.filter((partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-bold text-[#262B7E] sm:text-4xl">Mitra Korporasi</h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Cari Korporasi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300 bg-white py-3 pl-6 pr-12 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#262B7E] focus:outline-none focus:ring-2 focus:ring-[#262B7E]/20"
            />
            <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Partners Grid */}
        {filteredPartners.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-600">Tidak ada mitra korporasi ditemukan.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

