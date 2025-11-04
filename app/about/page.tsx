"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const milestones: Milestone[] = [
    {
      year: "1984",
      title: "RS Harapan Bunda",
      description:
        "Cikal bakal Sentra Medika dimulai dari berdirinya RS Harapan Bunda. Sebuah tonggak awal yang menandai dedikasi kami dalam dunia kesehatan.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    },
    {
      year: "2000",
      title: "Ekspansi Jaringan",
      description:
        "Membuka cabang baru di berbagai kota untuk menjangkau lebih banyak masyarakat yang membutuhkan layanan kesehatan berkualitas.",
      image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % milestones.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + milestones.length) % milestones.length
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.7)), url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80)",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-medium mb-2 uppercase tracking-wide">
              Tentang Sentra Medika
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Transformasi Kesehatan yang Membumi, Untuk Semua
            </h1>
            <p className="text-base leading-relaxed">
              Berawal dari semangat menolong masyarakat, Sentra Medika Hospital
              Group lahir pada tahun 1984 dengan pendirian RS Harapan Bunda
              Jakarta Timur oleh Drg. Suherman Widyatomo—sebuah langkah kecil
              yang kini telah berkembang menjadi sinergi enam rumah sakit kelas
              B bersertifikasi Paripurna SNARS, tersebar dari Jawa hingga
              Sulawesi.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Tentang Sentra Medika Hospital Group
              </h2>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
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
                  {`Rumah Sakit dalam SMHG terdiri dari RS Harapan Bunda Jakarta
                  Timur (200 tempat tidur), RS Sentra Medika Cisalak (210
                  tempat tidur), RS Sentra Medika Cikarang (200 tempat tidur),
                  RS Sentra Medika Cibinong (210 tempat tidur), Sentra Medika
                  Hospital Minahasa Utara (202 tempat tidur) dan Sentra Medika
                  Hospital Sengkol (241 tempat tidur). SMHG memberikan layanan
                  medis yang komprehensif dan terintegrasi dengan konsep
                  pelayanan "One Stop Health Care Services".`}
                </p>
                <p>
                  {`Dengan moto "Kesehatan Anda adalah Prioritas Kami", kami
                  selalu mengedepankan patient safety dan pelayanan penuh kasih
                  dalam seluruh aspek pelayanan medis dan non-medis bagi pasien
                  dan keluarga.`}
                </p>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="flex-1 relative">
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <Image
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80"
                alt="Sentra Medika Hospital"
                width={800}
                height={500}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <Image
              src="https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&q=80"
              alt="Team"
              width={800}
              height={500}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Visi & Misi
            </h2>
            <p className="text-gray-700 text-sm mb-6">
              Menggunakan Penjamin Anda di Sentra Medika sangatlah mudah. Ikuti
              langkah-langkah berikut ini agar prosesnya berjalan lancar:
            </p>

            <div className="space-y-6">
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
                <div key={index} className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <div className="text-gray-700 text-sm">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Jejak Perjalanan Kami
          </h2>
          <p className="text-gray-700 text-sm mb-8">
            Dari satu rumah sakit di Jakarta hingga kini tersebar di berbagai
            kota, berikut jejak perjalanan Sentra Medika:
          </p>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <Image
                  src={milestones[currentSlide].image}
                  alt={milestones[currentSlide].title}
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-blue-500 text-5xl font-bold mb-4">
                  {milestones[currentSlide].year}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {milestones[currentSlide].title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {milestones[currentSlide].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 my-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80)",
          }}
        />

        {/* Gradient Overlay (right to left) */}
        <div className="absolute inset-0 bg-linear-to-l from-[#1a1a3e]/90 to-transparent" />

        {/* Content */}
        <div className="relative z-10 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center text-white">
          <div className="flex-1" />

          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mulai perjalanan sehat Anda hari ini
            </h2>
            <p className="text-base mb-6">
              Dengan fasilitas modern dan pelayanan ramah, kami hadir untuk
              memastikan Anda mendapatkan perawatan terbaik sesuai kebutuhan
              Anda.
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Buat Janji Temu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
