"use client";

import FaqSection from "@/components/FaqSection";
import Image from "next/image";
import Link from "next/link";

const appointmentCards = [
  {
    title: "Janji Temu Online",
    description:
      "Pesan konsultasi Anda secara online melalui website atau aplikasi tanpa harus menunggu di rumah sakit.",
    steps: [
      "Pilih dokter dan jadwal yang Anda inginkan.",
      "Lengkapi data pasien dan metode pembayaran.",
      "Terima konfirmasi melalui email atau WhatsApp.",
    ],
    image:
      "https://images.unsplash.com/photo-1584467735815-f778f274e4eb?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Registrasi di Rumah Sakit",
    description:
      "Bagi Anda yang datang langsung ke rumah sakit, petugas admission siap membantu proses registrasi dengan cepat.",
    steps: [
      "Datang 15 menit sebelum jadwal konsultasi.",
      "Siapkan kartu identitas dan kartu asuransi (jika ada).",
      "Ambil nomor antrean dan tunggu panggilan petugas.",
    ],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop",
  },
];

const visitorGuides = [
  {
    title: "Jam Besuk",
    description:
      "Hari kerja 16.00 – 18.00 WIB, akhir pekan 10.00 – 12.00 & 16.00 – 18.00 WIB. Maksimal dua pengunjung per pasien.",
    icon: "🕑",
  },
  {
    title: "Protokol Kesehatan & Keamanan",
    description:
      "Gunakan masker, cek suhu tubuh, dan cuci tangan sebelum memasuki ruang perawatan untuk keamanan semua pihak.",
    icon: "🛡️",
  },
];

export default function VisitorGuidePage() {
  return (
    <>
      <div className="mx-auto max-w-6xl pt-40 px-6 py-16 sm:px-8">
        <header className="mx-auto max-w-3xl text-center space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Panduan Pasien & Pengunjung
          </h1>
          <p className="text-sm text-slate-500 sm:text-base">
            Kami menghadirkan panduan lengkap untuk perjalanan kesehatan yang
            nyaman, aman, dan terintegrasi—mulai dari pemesanan janji temu
            hingga perawatan rawat inap di Sentra Medika Hospital Group.
          </p>
        </header>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          {appointmentCards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-100/40"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">
                  {card.title}
                </h2>
                <p className="text-sm text-slate-500">{card.description}</p>
                <ul className="space-y-3 rounded-2xl bg-blue-50/70 p-4 text-sm text-slate-600">
                  {card.steps.map((step) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-6">
            {visitorGuides.map((guide) => (
              <div
                key={guide.title}
                className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-100/30"
              >
                <span className="text-3xl">{guide.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-500">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1584982752444-b3a850240bef?w=900&q=80&auto=format&fit=crop"
              alt="Hospital room"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </section>
      </div>
      <FaqSection />
    </>
  );
}
