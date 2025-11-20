"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { getImageUrl, getDescription } from "@/lib/dataTransformers";
import { Calendar, MapPin, Phone, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import type { Technology } from "@/types/api";

export default function TechnologyDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { technologies, technologiesLoading } = useSelector((state: RootState) => state.masterData);

  // Dummy data for fallback
  const dummyTechnology = {
    id: 1,
    name: "Radioterapi",
    slug: slugParam,
    title: { id: "LINAC – Radioterapi Presisi Tinggi", en: "LINAC – High Precision Radiotherapy" },
    description: {
      id: "Linear Accelerator atau LINAC adalah alat terapi radiasi yang menggunakan energi sinar-X atau elektron yang besar untuk memastikan bentuk tumor. Prosedur radioterapi ini juga bisa digunakan untuk menghancurkan sel kanker yang mengganggu jaringan sehat di sekitarnya.",
      en: "Linear Accelerator or LINAC is a radiation therapy device that uses high-energy X-rays or electrons to ensure tumor shape.",
    },
    images: [],
    is_active: true,
    content_id: null,
    updated_at: new Date().toISOString(),
  };

  const technology = useMemo(() => {
    if (!technologies || technologies.length === 0) {
      return dummyTechnology;
    }
    const found = technologies.find((t) => t.slug === slugParam);
    return found || dummyTechnology;
  }, [technologies, slugParam]);

  if (technologiesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">{t("technology.loading") || "Memuat teknologi..."}</p>
        </div>
      </div>
    );
  }

  // Use specific image for radioterapi/linac, otherwise use API image or fallback
  const getHeroImage = () => {
    if (slugParam === "linac" || slugParam === "radioterapi") {
      return "/RadioTeraImage.png";
    }
    return getImageUrl(
      technology.images,
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop"
    );
  };

  const coverImage = getHeroImage();

  const formattedDate = technology.updated_at
    ? new Date(technology.updated_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Get title and description (handle MultiLanguageField)
  const title = getDescription(technology.title);
  const description = getDescription(technology.description);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <section className="relative h-[400px] pt-16">
        <Image src={coverImage} alt={title} fill className="object-cover" priority sizes="100vw" />
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 py-12 lg:flex-row">
          {/* Left Content */}
          <div className="flex-1">
            {/* Title and Quick Actions */}
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-bold text-[#262B7E] lg:text-4xl">{title}</h1>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-base leading-relaxed text-slate-700">{description}</p>
            </div>

            {/* Main Image */}
            <div className="relative mb-8 h-[400px] overflow-hidden rounded-2xl">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Technology Details */}
            <div className="space-y-8">
              {/* LINAC Usage Section */}
              <div>
                <h2 className="mb-4 border-b-2 border-[#DC2626] pb-2 text-2xl font-bold text-[#262B7E]">
                  LINAC dapat digunakan dalam beragam jenis teknik radioterapi, di antaranya adalah
                  sebagai berikut:
                </h2>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>
                      <strong className="text-[#262B7E]">IMRT</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>
                      <strong className="text-[#262B7E]">VMAT</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>
                      <strong className="text-[#262B7E]">3D CRT</strong>
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-slate-700">
                  Berikut adalah penjelasan mengenai cara kerja radioterapi LINAC.
                </p>
              </div>

              {/* How LINAC Works */}
              <div>
                <h2 className="mb-4 border-b-2 border-[#DC2626] pb-2 text-2xl font-bold text-[#262B7E]">
                  Cara Kerja Alat Radioterapi LINAC
                </h2>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-[#262B7E]">1.</span>
                    <span>
                      Pada prinsipnya, LINAC menggunakan teknologi yang dapat mengubah elektron atau
                      foton menjadi energi sinar-X yang besar. Saat memapar tubuh pasien, sinar-X
                      dapat menyesuaikan bentuknya dengan bentuk tumor.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-[#262B7E]">2.</span>
                    <span>
                      Agar penilaian akurat, dokter juga dapat mengatur dosis radiasi sesuai
                      kebutuhan pasien.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-[#262B7E]">3.</span>
                    <span>
                      Hasil dari paparan sinar-X ini akan terlihat pada layar monitor untuk
                      dianalisis oleh dokter. Melalui pemindaian ini, dokter juga dapat merencanakan
                      pengobatan untuk pasien.
                    </span>
                  </li>
                </ol>
              </div>

              {/* Safety Section */}
              <div>
                <h2 className="mb-4 border-b-2 border-[#DC2626] pb-2 text-2xl font-bold text-[#262B7E]">
                  Apakah Alat Radioterapi LINAC Aman?
                </h2>
                <p className="mb-4 text-slate-700">Alat ini sangat aman digunakan pada pasien.</p>
                <p className="mb-4 text-slate-700">
                  Sebelum merekomendasikan radioterapi pada pasien, dokter akan terlebih dulu
                  menjalani pemeriksaan umum. Tujuan dari pemeriksaan adalah mengetahui dosis
                  radiasi yang dibutuhkan dan memastikan prosedur alat tepat.
                </p>
                <p className="text-slate-700">
                  Selain itu, tim dokter juga akan selalu memeriksa kondisi mesin dapat memapirkan
                  radiasi sesuai yang direncanakan. Pemeriksaan dimasukkan agar mesin dapat
                  memapirkan sesuai yang direncanakan untuk pasien. Setelah prosedur selesai, pasien
                  dapat kembali ke ruang perawatan.
                </p>
              </div>

              {/* LINAC Procedure */}
              <div>
                <h2 className="mb-4 border-b-2 border-[#DC2626] pb-2 text-2xl font-bold text-[#262B7E]">
                  Prosedur Penggunaan LINAC
                </h2>
                <p className="mb-4 text-slate-700">
                  Seperti yang disebut sebelumnya, sebelum merekomendasikan radioterapi, dokter akan
                  menjalani pemeriksaan terlebih dulu pada pasien.
                </p>
                <p className="mb-4 text-slate-700">
                  Jika pasien dapat menjalani radioterapi, dokter akan mengagendakan radioterapi
                  untuk pasien.
                </p>
                <p className="mb-4 text-slate-700">
                  Secara umum, penggunaan LINAC pada prosedur radioterapi adalah sebagai berikut:
                </p>
                <ul className="mb-4 space-y-2 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>Pasien berbaring di atas meja tindakan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>
                      Dokter akan membantu pasien memposisikan tubuh agar alat pemindaian dapat
                      memindai tubuh secara baik
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>
                      Setelah mengetahui lokasi pemindaian, dokter akan mengoperasikan mesin untuk
                      memindai tumor
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>Hasil dari pemindaian akan terlihat di layar monitor</span>
                  </li>
                </ul>
                <p className="text-slate-700">
                  Setelah prosedur selesai, pasien dapat kembali ke ruang perawatan.
                </p>
              </div>

              {/* Benefits Section */}
              <div>
                <h2 className="mb-4 border-b-2 border-[#DC2626] pb-2 text-2xl font-bold text-[#262B7E]">
                  Manfaat Penggunaan LINAC
                </h2>
                <p className="mb-4 text-slate-700">
                  Dengan menggunakan alat terapi radiasi LINAC, dokter dan pasien mendapat beberapa
                  manfaat berikut:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>Mengetahui bentuk dan ukuran tumor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>Dapat lebih mudah merencanakan pengobatan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#DC2626]"></span>
                    <span>Dapat memeriksa perkembangan pengobatan</span>
                  </li>
                </ul>
                <p className="mt-4 text-slate-700">
                  Itulah cara kerja dan prosedur alat terapi radiasi LINAC.
                </p>
              </div>

              {/* CTA Section */}
              <div className="rounded-2xl bg-[#262B7E] p-8 text-white">
                <h2 className="mb-4 text-2xl font-bold">
                  Apabila Anda mengalami gejala penyakit kanker, segera konsultasikan ke dokter
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/doctor"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#262B7E] transition hover:bg-slate-100"
                  >
                    Dokter Spesialis Bedah Oknologi
                  </Link>
                  <Link
                    href="/doctor"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#262B7E] transition hover:bg-slate-100"
                  >
                    Dokter Spesialis Bedah Oknologi Radiasi
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Consultation Card */}
          <div className="lg:w-[400px]">
            <div className="sticky top-8 overflow-hidden rounded-2xl">
              <div className="relative p-8">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image src="/banner-cta.png" alt="Background" fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6">
                    <p className="text-sm text-slate-800">Konsultasi langsung dengan</p>
                    <h3 className="text-xl font-bold text-[#262B7E]">Dokter Terpercaya</h3>
                  </div>

                  <Link
                    href="/doctor"
                    className="inline-block rounded-lg bg-[#4461F2] px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#3651E1]"
                  >
                    Buat Janji Temu
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
