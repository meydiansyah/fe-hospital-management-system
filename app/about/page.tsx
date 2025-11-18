"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformMilestone } from "@/lib/dataTransformers";

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { about, aboutLoading, milestones, milestonesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const transformedMilestones = useMemo(() => {
    if (!milestones || milestones.length === 0) {
      return [
        {
          year: "1984",
          title: "RS Harapan Bunda",
          description:
            "Cikal bakal Sentra Medika dimulai dari berdirinya RS Harapan Bunda. Sebuah tonggak awal yang menandai dedikasi kami dalam dunia kesehatan.",
          image:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
        },
      ];
    }
    return milestones
      .filter((m) => m.is_active)
      .sort((a, b) => a.year - b.year)
      .map(transformMilestone);
  }, [milestones]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % transformedMilestones.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) =>
        (prev - 1 + transformedMilestones.length) % transformedMilestones.length
    );

  if (aboutLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex min-h-[360px] items-center bg-cover bg-center py-16 sm:min-h-[440px] sm:py-20 lg:min-h-[560px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.7)), url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-blue-600/40 mix-blend-multiply" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl justify-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest sm:text-sm">
              Tentang Sentra Medika
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {about?.title ||
                "Transformasi Kesehatan yang Membumi, Untuk Semua"}
            </h1>
            <p className="mt-4 text-sm leading-relaxed sm:text-base">
              {about?.description ||
                "Berawal dari semangat menolong masyarakat, Sentra Medika Hospital Group lahir pada tahun 1984 dengan pendirian RS Harapan Bunda Jakarta Timur oleh Drg. Suherman Widyatomo—sebuah langkah kecil yang kini telah berkembang menjadi sinergi enam rumah sakit kelas B bersertifikasi Paripurna SNARS, tersebar dari Jawa hingga Sulawesi."}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl">
                Tentang Sentra Medika Hospital Group
              </h2>
              <div
                className="space-y-4 text-sm leading-relaxed text-gray-700 sm:text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    about?.content ||
                    `
                    <p>
                      Perjalanan Sentra Medika Hospital Group (SMHG), berawal dari
                      komitmen Founding Father kami, Drg. Suherman Widyatomo untuk
                      berpartisipasi dalam memajukan kesehatan masyarakat Indonesia.
                      Diawali dengan membangun rumah sakit pertama di tahun 1984 RS
                      Harapan Bunda Jakarta Timur, SMHG kini telah berkembang dan
                      sukses mengoperasikan 6 rumah sakit umum kelas B yang telah
                      mendapatkan Sertifikat Akreditasi Paripurna SNARS dari KARS.
                    </p>
                    <p>
                      Rumah Sakit dalam SMHG terdiri dari RS Harapan Bunda Jakarta
                      Timur (200 tempat tidur), RS Sentra Medika Cisalak (210
                      tempat tidur), RS Sentra Medika Cikarang (200 tempat tidur),
                      RS Sentra Medika Cibinong (210 tempat tidur), Sentra Medika
                      Hospital Minahasa Utara (202 tempat tidur) dan Sentra Medika
                      Hospital Sengkol (241 tempat tidur). SMHG memberikan layanan
                      medis yang komprehensif dan terintegrasi dengan konsep
                      pelayanan "One Stop Health Care Services".
                    </p>
                    <p>
                      Dengan moto "Kesehatan Anda adalah Prioritas Kami", kami
                      selalu mengedepankan patient safety dan pelayanan penuh kasih
                      dalam seluruh aspek pelayanan medis dan non-medis bagi pasien
                      dan keluarga.
                    </p>
                  `,
                }}
              />
            </div>

            {/* Image Carousel */}
            <div className="relative flex-1">
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100 sm:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100 sm:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <Image
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80"
                alt="Sentra Medika Hospital"
                width={800}
                height={500}
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
                {milestones.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 w-2 rounded-full transition ${
                      index === currentSlide ? "bg-blue-600" : "bg-blue-200"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex-1 overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&q=80"
              alt="Team"
              width={800}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
              Visi & Misi
            </h2>
            <p className="text-sm text-gray-700 sm:text-base">
              Menggunakan Penjamin Anda di Sentra Medika sangatlah mudah. Ikuti
              langkah-langkah berikut ini agar prosesnya berjalan lancar:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Visi",
                  content:
                    "Menjadi rumah sakit pilihan dengan memberikan pelayanan yang terbaik.",
                },
                {
                  title: "Misi",
                  content: (
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>
                        • Memberikan pelayanan kesehatan bermutu dan
                        mengutamakan kepuasan pasien;
                      </li>
                      <li>
                        • Menyediakan tim medis dan karyawan yang profesional;
                      </li>
                      <li>
                        • Menyediakan tata kelola rumah sakit yang baik dengan
                        teknologi tepat guna;
                      </li>
                      <li>
                        • Menyediakan sistem pengembangan dan pembelajaran bagi
                        karyawan.
                      </li>
                    </ul>
                  ),
                },
                {
                  title: "Value",
                  content: (
                    <p>
                      {` "RCIT ok ❤️"`}
                      <br />
                      Ramah, Cepat, Informatif, Teliti, melayani dengan Hati.
                    </p>
                  ),
                },
                {
                  title: "Motto",
                  content: <p>Kesehatan Anda adalah prioritas kami.</p>,
                },
              ].map((item, index) => (
                <div key={index} className="rounded-lg bg-blue-50 p-5 sm:p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-800 sm:text-xl">
                    {item.title}
                  </h3>
                  <div className="text-sm text-gray-700 sm:text-base">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">
            Jejak Perjalanan Kami
          </h2>
          <p className="mb-8 text-sm text-gray-700 sm:text-base">
            Dari satu rumah sakit di Jakarta hingga kini tersebar di berbagai
            kota, berikut jejak perjalanan Sentra Medika:
          </p>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100 sm:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100 sm:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {transformedMilestones.length > 0 ? (
              <>
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-1 overflow-hidden rounded-2xl">
                    <Image
                      src={transformedMilestones[currentSlide].image}
                      alt={transformedMilestones[currentSlide].title}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 text-4xl font-bold text-blue-500 sm:text-5xl">
                      {transformedMilestones[currentSlide].year}
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                      {transformedMilestones[currentSlide].title}
                    </h3>
                    <p className="text-sm text-gray-700 sm:text-base">
                      {transformedMilestones[currentSlide].description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
                  {transformedMilestones.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 w-2 rounded-full transition ${
                        index === currentSlide ? "bg-blue-600" : "bg-blue-200"
                      }`}
                      aria-label={`Milestone ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">
                Tidak ada data milestone.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-4 my-8 overflow-hidden rounded-3xl sm:mx-6 lg:mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-l from-[#1a1a3e]/90 via-[#1a1a3e]/70 to-black/30" />
        <div className="relative z-10 flex flex-col items-start justify-center gap-6 px-6 py-12 text-white sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-16">
          <div className="w-full max-w-xl space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Mulai perjalanan sehat Anda hari ini
            </h2>
            <p className="text-sm leading-relaxed sm:text-base">
              Dengan fasilitas modern dan pelayanan ramah, kami hadir untuk
              memastikan Anda mendapatkan perawatan terbaik sesuai kebutuhan
              Anda.
            </p>
            <button className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:text-base">
              Buat Janji Temu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
