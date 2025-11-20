"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import VisitHospitalSection from "@/components/VisitHospitalSection";
import PromotionSection from "@/components/PromotionSection";
import StorySection from "@/components/StorySection";

type CenterDetail = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  heroImage: string;
};

// Dummy data for centers
const centersData: CenterDetail[] = [
  {
    slug: "swicc",
    title: "Pusat Layanan Unggulan Kanker Terpadu RS Sentra Medika",
    subtitle: "Dedikasi untuk Kesehatan yang Lebih Baik",
    description:
      "Suherman Widyatomo Integrated Cancer Center (SWICC) merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan penyakit kanker secara menyeluruh. Dengan dukungan tim dokter spesialis kanker berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan kanker yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/SWICC.png",
    heroImage: "/swicc-header.jpg",
  },
  {
    slug: "golden-hearth",
    title: "Pusat Layanan Unggulan Kardiovaskular RS Sentra Medika",
    subtitle: "Dedikasi untuk Jantung yang Lebih Sehat",
    description:
      "Golden Heart Cardiovascular Center merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan penyakit jantung serta pembuluh darah secara menyeluruh. Dengan dukungan tim dokter spesialis jantung berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan kardiovaskular yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/GoldenHeart.png",
    heroImage: "/golden-hearth-header.jpg",
  },
  {
    slug: "stroke-center",
    title: "Pusat Layanan Unggulan Stroke RS Sentra Medika",
    subtitle: "Dedikasi untuk Penanganan Stroke",
    description:
      "Stroke Center merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan stroke secara menyeluruh. Dengan dukungan tim dokter spesialis saraf berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan stroke yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/icon/hospital-facility/brain-center.svg",
    heroImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&q=80",
  },
  {
    slug: "uronephrology-center",
    title: "Pusat Layanan Unggulan Uronephrologi RS Sentra Medika",
    subtitle: "Dedikasi untuk Kesehatan Ginjal",
    description:
      "Uronephrology Center merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan penyakit ginjal dan saluran kemih secara menyeluruh. Dengan dukungan tim dokter spesialis urologi dan nefrologi berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan uronephrologi yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/icon/hospital-facility/pcnl.svg",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80",
  },
  {
    slug: "orthopedic-center",
    title: "Pusat Layanan Unggulan Ortopedi RS Sentra Medika",
    subtitle: "Dedikasi untuk Kesehatan Tulang dan Sendi",
    description:
      "Orthopedic Center merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan penyakit tulang, sendi, dan otot secara menyeluruh. Dengan dukungan tim dokter spesialis ortopedi berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan ortopedi yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/icon/hospital-facility/orthopedi.svg",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
  },
  {
    slug: "hepatobilier-digestive-center",
    title: "Pusat Layanan Unggulan Hepatobilier & Digestive RS Sentra Medika",
    subtitle: "Dedikasi untuk Kesehatan Pencernaan",
    description:
      "Hepatobilier & Digestive Center merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan penyakit hati, empedu, dan pencernaan secara menyeluruh. Dengan dukungan tim dokter spesialis gastroenterologi berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan digestive yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/icon/hospital-facility/mcu.svg",
    heroImage: "https://images.unsplash.com/photo-1584467735815-f778f274e4eb?w=1600&q=80",
  },
  {
    slug: "integrated-women-child",
    title: "Pusat Layanan Unggulan Ibu & Anak Terpadu RS Sentra Medika",
    subtitle: "Dedikasi untuk Kesehatan Ibu dan Anak",
    description:
      "Integrated Women & Child merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan kesehatan ibu dan anak secara menyeluruh. Dengan dukungan tim dokter spesialis kandungan dan anak berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan ibu dan anak yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/icon/hospital-facility/rehabilitation.svg",
    heroImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&q=80",
  },
  {
    slug: "eye-center",
    title: "Pusat Layanan Unggulan Mata RS Sentra Medika",
    subtitle: "Dedikasi untuk Kesehatan Mata",
    description:
      "Eye Center merupakan Centers of Excellence dari RS Sentra Medika yang berfokus pada pencegahan, diagnosis, dan penanganan penyakit mata secara menyeluruh. Dengan dukungan tim dokter spesialis mata berpengalaman dan teknologi terkini, kami berkomitmen memberikan pelayanan mata yang cepat, akurat, dan komprehensif bagi setiap pasien.",
    logo: "/icon/hospital-facility/mcu.svg",
    heroImage: "https://images.unsplash.com/photo-1516924689375-51f6b9a6e96d?w=1600&q=80",
  },
];

export default function CenterOfExcellenceDetailPage() {
  const params = useParams();
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const center = centersData.find((c) => c.slug === slugParam);

  if (!center) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={center.heroImage}
          alt={center.title}
          fill
          className="object-cover object-center-top"
          style={{ objectPosition: "center 10%" }}
          priority
          sizes="80vw"
        />
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-tight text-[#262B7E] sm:text-4xl">
                  {center.title}
                </h1>
                <h2 className="text-xl font-semibold text-slate-900">{center.subtitle}</h2>
              </div>

              <p className="text-base leading-relaxed text-slate-700">{center.description}</p>
            </div>

            {/* Right Logo */}
            <div className="flex shrink-0 items-start justify-center pt-8 lg:justify-end">
              <div className="relative h-56 w-80">
                <Image
                  src={center.logo}
                  alt={center.title}
                  fill
                  className="object-contain"
                  sizes="320px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#5B7CFF] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Stat 1 */}
            <div className="text-center text-white">
              <div className="mb-2 flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold">1.5K+</span>
              </div>
              <p className="text-xl font-medium">
                Pasien
                <br />
                Kemoterapi
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center text-white">
              <div className="mb-2 flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold">2K+</span>
              </div>
              <p className="text-xl font-medium">Pasien Rawat Jalan.</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center text-white">
              <div className="mb-2 flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold">500+</span>
              </div>
              <p className="text-xl font-medium">
                Pasien Bedah
                <br />
                Onkologi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Facilities Section */}
      <TechnologyFacilitiesSection />

      {/* Doctors Team Section */}
      <DoctorsTeamSection centerSlug={center.slug} />

      {/* Facilities Section */}
      <FacilitiesSection />

      {/* Visit Hospital Section */}
      <VisitHospitalSection />

      {/* Promotion Section */}
      <PromotionSection />

      {/* Story Section */}
      <StorySection />

      {/* CTA Section */}
      <CTASection centerName={center.title} />
    </div>
  );
}

// Technology & Facilities Section Component
function TechnologyFacilitiesSection() {
  const scrollContainerRef = useState<HTMLDivElement | null>(null)[0];

  const technologies = [
    {
      id: 1,
      title: "Brakiterapi Flexitron",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      descriptions: [
        {
          title: "Direct-to-Tumor Radiation",
          text: "Radiasi ditempatkan langsung di dalam atau sekitar tumor, sehingga lebih tepat sasaran dan meminimalkan efek samping ke jaringan sehat.",
        },
        {
          title: "High Precision & Stable Dose",
          text: "Teknologi 3D/4D IGRT dan Flexitron memastikan posisi radiasi akurat dan dosis tetap stabil sesuai kebutuhan pasien.",
        },
        {
          title: "Fast & Comfortable",
          text: "Prosedur cepat dan nyaman untuk pasien.",
        },
      ],
    },
    {
      id: 2,
      title: "CT Scan 128 Slice",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      descriptions: [
        {
          title: "High Resolution Imaging",
          text: "Menghasilkan gambar detail dengan kecepatan tinggi untuk diagnosis yang akurat.",
        },
        {
          title: "Low Radiation Dose",
          text: "Teknologi terkini yang meminimalkan paparan radiasi untuk keamanan pasien.",
        },
      ],
    },
    {
      id: 3,
      title: "MRI 3 Tesla",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
      descriptions: [
        {
          title: "Advanced Imaging",
          text: "Teknologi MRI terkini untuk diagnosis yang lebih detail dan akurat.",
        },
        {
          title: "Non-Invasive",
          text: "Prosedur tanpa radiasi yang aman untuk semua pasien.",
        },
      ],
    },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("tech-scroll-container");
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Teknologi dan Fasilitas Modern</h2>
          <p className="mt-2 text-slate-600">
            Golden Heart Cardiovascular Center dilengkapi dengan fasilitas berstandar internasional,
            termasuk:
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4">
            {/* Navigation Button Left */}
            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5B7CFF] text-white shadow-lg transition hover:bg-[#4a6eef] z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Scrollable Container */}
            <div
              id="tech-scroll-container"
              className="hide-scrollbar flex flex-1 gap-6 overflow-x-auto scroll-smooth"
            >
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="flex min-w-[85%] gap-0 overflow-hidden rounded-2xl bg-white shadow-lg lg:min-w-[75%]"
                >
                  {/* Image Side */}
                  <div className="relative w-1/2 bg-slate-200">
                    <div className="relative h-full min-h-[400px]">
                      <Image
                        src={tech.image}
                        alt={tech.title}
                        fill
                        className="object-cover"
                        sizes="40vw"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:scale-110">
                          <Play className="h-8 w-8 fill-[#5B7CFF] text-[#5B7CFF]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Description Side */}
                  <div className="flex w-1/2 flex-col justify-center space-y-6 p-8">
                    <h3 className="text-2xl font-bold text-slate-900">{tech.title}</h3>
                    <div className="space-y-4">
                      {tech.descriptions.map((desc, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-slate-900">{desc.title}</h4>
                          <p className="text-sm text-slate-600">{desc.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Button Right */}
            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5B7CFF] text-white shadow-lg transition hover:bg-[#4a6eef] z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Doctors Team Section Component
function DoctorsTeamSection({ centerSlug }: { centerSlug: string }) {
  const doctors = [
    {
      id: 1,
      name: "Christy Efiyanti, dr, SpPD",
      specialty: "Penyakit Dalam",
      subspecialty: "Subspesialis Penyakit Dalam",
      hospital: "Harapan Bunda Hospital",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    },
    {
      id: 2,
      name: "Andhika Rachman, dr, Sp.PD-KHOM",
      specialty: "Penyakit Dalam",
      subspecialty: "Subspesialis Hemotologi Oknologi Medik",
      hospital: "Harapan Bunda Hospital",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold text-slate-900">
            Tim Dokter Spesialis Jantung & Pembuluh Darah
          </h2>
          <Link
            href="/doctor"
            className="flex items-center gap-2 text-[#5B7CFF] font-semibold transition hover:gap-3"
          >
            Lihat Semua Dokter
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white transition hover:border-[#5B7CFF] hover:shadow-lg"
            >
              <div className="flex gap-6 p-6">
                {/* Doctor Image */}
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex flex-1 flex-col justify-center space-y-2">
                  <h3 className="text-xl font-bold text-[#5B7CFF]">{doctor.name}</h3>
                  <p className="text-sm font-semibold text-slate-900">{doctor.specialty}</p>
                  <p className="text-sm text-slate-600">{doctor.subspecialty}</p>
                </div>
              </div>

              {/* Hospital & Button */}
              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {doctor.hospital}
                </div>
                <button className="rounded-lg bg-[#5B7CFF] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#4a6eef]">
                  Buat Janji
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection({ centerName }: { centerName: string }) {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/banner-cta.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          {/* Content */}
          <div className="relative px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold leading-tight text-[#262B7E] sm:text-4xl">
                Jaga Jantung Anda Bersama Kami
              </h2>
              <p className="text-lg leading-relaxed text-slate-700">
                Segera lakukan pemeriksaan di Golden Heart Cardiovascular Center RS Sentra Medika
                dan temukan solusi terbaik untuk kesehatan jantung Anda.
              </p>
              <button className="inline-flex items-center gap-3 rounded-full bg-[#262B7E] px-8 py-4 font-semibold text-white shadow-xl transition hover:bg-[#1a1f5c]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Hubungi kami
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Facilities Section Component
function FacilitiesSection() {
  const facilities = [
    {
      id: 1,
      title: "Laboratorium",
      description:
        "Dilengkapi dengan Imunohistokimia (IHC), untuk menganalisis jaringan tubuh da...",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
    },
    {
      id: 2,
      title: "Rawat Jalan",
      description:
        "Ruang poli SWICC dirancang untuk memberikan kenyamanan dan ketenangan bagi pasien sel...",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    },
    {
      id: 3,
      title: "Rawat Inap",
      description:
        "Ruang rawat inap di SWICC dirancang untuk memberikan kenyamanan maksimal, dengan...",
      image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80",
    },
    {
      id: 4,
      title: "Layanan VIP",
      description:
        "Nikmati layanan VIP SWICC yang mencakup penjemputan pasien, Patient Relation Officer yang sia...",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Fasilitas Kami</h2>
          <p className="mt-2 text-slate-600">Fasilitas untuk Pasien dari Luar Kota.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-slate-900">{facility.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
