import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  Microscope,
  Stethoscope,
  Brain,
  HeartPulse,
  Orbit,
  PhoneCall,
  MapPin,
} from "lucide-react";
import HospitalFacilitiesSection, {
  type HospitalFacility,
} from "@/components/HospitalFacilitiesSection";
import DoctorTeamSection from "@/components/DoctorTeamSection";
import FacilitiesCarouselSection from "@/components/FacilitiesCarouselSection";
import PromotionSection from "@/components/PromotionSection";
import HospitalContactSection from "@/components/HospitalContactSection";

type Specialty = {
  title: string;
  description: string;
  href: string;
  icon: string; // Changed to string for image path
};

type HospitalDetail = {
  slug: string;
  name: string;
  location: string;
  phone: string;
  heroImage: string;
  heroSubtitle: string;
  heroDescription: string;
  specialties: Specialty[];
  facilities: HospitalFacility[];
};

export const hospitalDetails: HospitalDetail[] = [
  {
    slug: "harapan-bunda",
    name: "Harapan Bunda Hospital",
    location: "Jakarta Timur, DKI Jakarta",
    phone: "1500-911",
    heroImage:
      "https://images.unsplash.com/photo-1584982752444-b3a850240bef?w=1600&q=80&auto=format&fit=crop",
    heroSubtitle: "Center of Excellence",
    heroDescription:
      "Rumah sakit rujukan regional dengan layanan kanker terpadu, cardiovascular center, dan fasilitas rawat inap modern.",
    specialties: [
      {
        title: "Onkologi & Kemoterapi",
        description:
          "Layanan Onkologi & Kemoterapi SMHG menyediakan layanan khusus pengobatan kanker secara terpadu, didukung dengan teknologi radioterapi terkini serta strategi perawatan yang dipersonalisasi untuk setiap pasien.",
        href: "/centers/oncology",
        icon: "/icon/hospital-facility/onkologi.svg",
      },
      {
        title: "Medical Check Up (MCU)",
        description:
          "MEDICAL CHECK UP (MCU) Sentra Medika Hospital Group (SMHG) menyediakan rangkaian layanan pemeriksaan kesehatan menyeluruh untuk deteksi dini berbagai kondisi medis, tersedia bagi individu maupun korporasi dengan hasil yang cepat.",
        href: "/centers/mcu",
        icon: "/icon/hospital-facility/mcu.svg",
      },
      {
        title: "Cardiovascular & Brain Center",
        description:
          "Cardiovascular & Brain Center SMHG merupakan pusat layanan terpadu jantung dan otak, dilengkapi dengan Cath Lab dan tim medis berpengalaman yang siap memberikan tindakan intervensi 24 jam guna penanganan optimal pasien stroke dan kardiovaskular.",
        href: "/centers/heart-brain",
        icon: "/icon/hospital-facility/brain-center.svg",
      },
    ],
    facilities: [
      {
        title: "Layanan 24 Jam",
        description:
          "IGD, farmasi, dan laboratorium siap melayani sepanjang waktu dengan dokter spesialis on call.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop",
        href: "/facilities/emergency",
      },
      {
        title: "Kamar Rawat Inap",
        description:
          "Pilihan kamar eksekutif, VIP, hingga suite family dengan fasilitas hotel dan nurse call system.",
        image:
          "https://images.unsplash.com/photo-1582454057068-07aa5e5d5841?w=900&q=80&auto=format&fit=crop",
        href: "/facilities/inpatient",
      },
      {
        title: "Instalasi Rawat Jalan",
        description:
          "Lebih dari 30 klinik spesialis dengan jadwal praktisi fleksibel dan sistem antrean digital.",
        image:
          "https://images.unsplash.com/photo-1585903166144-06fb70b4188f?w=900&q=80&auto=format&fit=crop",
        href: "/facilities/outpatient",
      },
    ],
  },
  {
    slug: "cibinong",
    name: "Sentra Medika Hospital Cibinong",
    location: "Bogor, Jawa Barat",
    phone: "021-8791-2000",
    heroImage:
      "https://images.unsplash.com/photo-1579154204691-07862ad9a1d6?w=1600&q=80&auto=format&fit=crop",
    heroSubtitle: "Hospital of Choice",
    heroDescription:
      "Pusat layanan unggulan di kawasan Bogor dengan fokus pada cardiology, neuro spine, dan layanan ibu & anak.",
    specialties: [
      {
        title: "PCNL",
        description:
          "PCNL (Percutaneous nephrolitotomy) adalah prosedur pengangkatan batu ginjal yang minimal invasif melalui sayatan kecil. Metode ini memungkinkan pemulihan lebih cepat dengan risiko komplikasi yang lebih rendah dibandingkan operasi terbuka.",
        href: "/centers/pcnl",
        icon: "/icon/hospital-facility/pcnl.svg",
      },
      {
        title: "Medical Rehabilitation Center",
        description:
          "Fasilitas perawatan intensif untuk pasien yang mengalami gangguan kesehatan, baik pasca-stroke, cedera olahraga, maupun kondisi lain yang memerlukan terapi fisik, okupasi, dan program rehabilitasi menyeluruh dengan pendekatan individual.",
        href: "/centers/rehab",
        icon: "/icon/hospital-facility/rehabilitation.svg",
      },
      {
        title: "Brain Center",
        description:
          "Brain Center kami menghadirkan layanan terpadu untuk penanganan stroke, bedah saraf, serta kondisi neurologis lainnya, didukung neuro ICU dan tim multidisiplin berpengalaman yang siap memberikan perawatan optimal bagi setiap pasien.",
        href: "/centers/brain",
        icon: "/icon/hospital-facility/brain-center.svg",
      },
    ],
    facilities: [
      {
        title: "ICU & NICU",
        description:
          "Perawatan intensif dewasa dan neonatal dengan monitoring 24 jam dan ventilator modern.",
        image:
          "https://images.unsplash.com/photo-1579154204691-07862ad9a1d6?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/icu",
      },
      {
        title: "Klinik Ibu & Anak",
        description: "Layanan persalinan, laktasi, dan tumbuh kembang anak terpadu.",
        image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/maternity",
      },
      {
        title: "Hemodialisa",
        description: "Unit hemodialisa dengan mesin canggih dan fasilitas lounge untuk keluarga.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/hemodialysis",
      },
    ],
  },
  {
    slug: "cikarang",
    name: "Sentra Medika Hospital Cikarang",
    location: "Bekasi, Jawa Barat",
    phone: "021-8900-888",
    heroImage:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1600&q=80&auto=format&fit=crop",
    heroSubtitle: "Trusted Healthcare Partner",
    heroDescription:
      "Melayani kawasan industri Cikarang dengan layanan industrial clinic, MCU korporasi, dan trauma center.",
    specialties: [
      {
        title: "Trauma Center",
        description:
          "Trauma Center merupakan fasilitas guna menangani pasien trauma/kecelakaan kerja yang memerlukan perawatan darurat, didukung oleh dokter spesialis kedokteran fisik dan rehabilitasi, ortopedi, serta bedah plastik untuk pemulihan komprehensif.",
        href: "/centers/trauma",
        icon: "/icon/hospital-facility/trauma.svg",
      },
      {
        title: "Orthopedic Center",
        description:
          "Orthopedi Center SMHG menyediakan layanan penanganan masalah tulang, sendi, dan sistem muskuloskeletal lainnya, termasuk prosedur arthroscopy serta operasi penggantian sendi (joint replacement) dengan teknologi modern.",
        href: "/centers/orthopedic",
        icon: "/icon/hospital-facility/orthopedi.svg",
      },
      {
        title: "Hemodialisa",
        description:
          "Hemodialisa (Cuci Darah) merupakan salah satu jenis terapi pasien gagal ginjal. Hemodialisa bekerja dengan cara mengeluarkan produk sisa yang mengandung racun, kelebihan air, dan zat-zat yang tidak diperlukan tubuh, dengan jadwal fleksibel khusus untuk pekerja industri.",
        href: "/centers/hemodialysis",
        icon: "/icon/hospital-facility/hemodialisa.svg",
      },
    ],
    facilities: [
      {
        title: "Rawat Jalan Eksekutif",
        description: "Klinik eksekutif dengan layanan one stop service dan lounge korporasi.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/outpatient",
      },
      {
        title: "Industrial Clinic",
        description: "Tim dokter perusahaan dan ambulance siaga untuk kebutuhan korporasi.",
        image:
          "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/industrial-clinic",
      },
      {
        title: "Fisioterapi & Rehab",
        description:
          "Pemulihan cedera otot dan muskuloskeletal dengan terapi manual dan alat modern.",
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/rehab",
      },
    ],
  },
  {
    slug: "cisalak",
    name: "Sentra Medika Hospital Cisalak",
    location: "Depok, Jawa Barat",
    phone: "021-8790-9000",
    heroImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&q=80&auto=format&fit=crop",
    heroSubtitle: "Your Health Companion",
    heroDescription:
      "Rumah sakit tipe B yang menghadirkan layanan komprehensif dengan fokus pada layanan ibu & anak serta layanan bedah minimal invasif.",
    specialties: [
      {
        title: "Layanan Ibu & Anak",
        description:
          "Layanan Ibu & Anak menyediakan pendampingan penuh mulai dari kehamilan, persalinan, konsultasi laktasi, perawatan NICU, hingga klinik tumbuh kembang anak untuk memastikan kesehatan ibu dan buah hati.",
        href: "/centers/maternity",
        icon: "/icon/hospital-facility/rehabilitation.svg",
      },
      {
        title: "Endoscopy Center",
        description:
          "Endoscopy Center menyediakan layanan diagnostik dan terapi endoskopi gastrointestinal dengan dokter spesialis berpengalaman menggunakan peralatan modern untuk penanganan yang akurat dan aman.",
        href: "/centers/endoscopy",
        icon: "/icon/hospital-facility/mcu.svg",
      },
      {
        title: "Spine Center",
        description:
          "Spine Center menghadirkan solusi komprehensif untuk masalah nyeri punggung, skoliosis, dan kondisi tulang belakang lainnya, termasuk prosedur bedah minimal invasif untuk pemulihan lebih cepat.",
        href: "/centers/spine",
        icon: "/icon/hospital-facility/brain-center.svg",
      },
    ],
    facilities: [
      {
        title: "Kamar Bersalin",
        description: "Ruang persalinan nyaman dengan fasilitas rooming-in dan dukungan doula.",
        image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/maternity",
      },
      {
        title: "Endoscopy Suite",
        description: "Fasilitas endoskopi modern dengan sedasi aman dan pemulihan cepat.",
        image:
          "https://images.unsplash.com/photo-1584467735815-f778f274e4eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/endoscopy",
      },
      {
        title: "Fisioterapi",
        description: "Terapi muskuloskeletal dan rehabilitasi pasca operasi tulang belakang.",
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/rehab",
      },
    ],
  },
  {
    slug: "gempol",
    name: "Sentra Medika Hospital Gempol",
    location: "Cirebon, Jawa Barat",
    phone: "0231-333-888",
    heroImage:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&q=80&auto=format&fit=crop",
    heroSubtitle: "Integrasi Layanan",
    heroDescription:
      "Mendukung kebutuhan kesehatan masyarakat Cirebon dengan layanan rawat jalan, MCU, dan rehabilitasi terpadu.",
    specialties: [
      {
        title: "MCU Korporasi",
        description:
          "MCU Korporasi menawarkan paket medical check up menyeluruh untuk karyawan perusahaan dengan layanan penjemputan sampel on-site, hasil cepat, dan laporan kesehatan yang komprehensif.",
        href: "/centers/mcu",
        icon: "/icon/hospital-facility/mcu.svg",
      },
      {
        title: "Rehabilitasi Medik",
        description:
          "Rehabilitasi Medik menyediakan program terapi individual untuk pemulihan pasca cedera dan pasca operasi, dirancang khusus sesuai kebutuhan setiap pasien untuk hasil maksimal.",
        href: "/centers/rehab",
        icon: "/icon/hospital-facility/rehabilitation.svg",
      },
      {
        title: "Trauma Center",
        description:
          "Trauma Center siap menangani kasus trauma dan kecelakaan lalu lintas dengan fasilitas imaging 24 jam serta tim medis berpengalaman untuk penanganan cepat dan tepat.",
        href: "/centers/trauma",
        icon: "/icon/hospital-facility/trauma.svg",
      },
    ],
    facilities: [
      {
        title: "MCU Lounge",
        description: "Area khusus pasien MCU dengan layanan cepat dan hasil digital.",
        image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/mcu",
      },
      {
        title: "Rehab Center",
        description: "Terapi okupasi, fisioterapi, dan hidroterapi untuk pemulihan optimal.",
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/rehab",
      },
      {
        title: "Laboratorium 24 Jam",
        description: "Pengolahan sampel cepat dengan integrasi ke rekam medis elektronik.",
        image:
          "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/lab",
      },
    ],
  },
  {
    slug: "minahasa-utara",
    name: "Sentra Medika Hospital Minahasa Utara",
    location: "Minahasa Utara, Sulawesi Utara",
    phone: "0431-888-700",
    heroImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop",
    heroSubtitle: "Gateway to Health",
    heroDescription:
      "Rumah sakit regional dengan layanan unggulan bedah, pusat mata, dan layanan dialisis untuk kawasan Sulawesi Utara.",
    specialties: [
      {
        title: "Eye Center",
        description:
          "Eye Center menyediakan layanan lengkap untuk kesehatan mata, termasuk operasi katarak, lasik, dan perawatan retina dengan peralatan diagnostik berteknologi tinggi dan tim dokter spesialis berpengalaman.",
        href: "/centers/eye",
        icon: "/icon/hospital-facility/mcu.svg",
      },
      {
        title: "Stroke Unit",
        description:
          "Stroke Unit memberikan tindakan cepat dan tepat untuk pasien stroke dengan dukungan telemedicine dan kolaborasi tim neurologis nasional, memastikan penanganan optimal dalam golden period.",
        href: "/centers/brain",
        icon: "/icon/hospital-facility/brain-center.svg",
      },
      {
        title: "Dialysis Care",
        description:
          "Dialysis Care menyediakan unit hemodialisa yang nyaman dengan jadwal berjenjang yang fleksibel, dirancang khusus untuk memenuhi kebutuhan pasien di wilayah sekitar.",
        href: "/centers/hemodialysis",
        icon: "/icon/hospital-facility/hemodialisa.svg",
      },
    ],
    facilities: [
      {
        title: "Operating Theatre",
        description: "Ruang operasi modern untuk bedah umum, ortopedi, dan endoscopy.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/surgery",
      },
      {
        title: "Dialysis Suite",
        description: "Unit hemodialisa dengan pemandangan alam dan fasilitas relaksasi pasien.",
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/hemodialysis",
      },
      {
        title: "Eye Diagnostic Center",
        description:
          "Peralatan OCT, aberrometer, dan cataract suite untuk layanan mata terintegrasi.",
        image:
          "https://images.unsplash.com/photo-1516924789899-7b3eb6df07a4?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/eye",
      },
    ],
  },
];

type MaybePromise<T> = T | Promise<T>;

type HospitalDetailPageProps = {
  params: MaybePromise<{ slug: string }>;
};

function isPromise<T>(value: MaybePromise<T>): value is Promise<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "then" in value &&
    typeof (value as Promise<T>).then === "function"
  );
}

export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const resolvedParams = isPromise(params) ? await params : (params as { slug: string });

  const rawSlug = decodeURIComponent((resolvedParams?.slug ?? "").toLowerCase());
  const normalizedSlug = rawSlug.replace(/-?hospital$/, "");
  const hospital = hospitalDetails.find(
    (item) => item.slug === rawSlug || item.slug === normalizedSlug
  );

  if (!hospital) {
    notFound();
  }

  return (
    <div className="space-y-16 pt-30 pb-12">
      <section className="relative isolate overflow-hidden">
        <div className="relative min-h-[320px] w-full sm:min-h-[380px] lg:min-h-[420px]">
          <Image
            src={hospital.heroImage}
            alt={hospital.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-blue-900/80" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-500">
            Center of Excellence
          </p>
          <h2 className="text-2xl font-semibold text-blue-900 sm:text-3xl">
            Perawatan Terbaik Dengan Standar Internasional
          </h2>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {hospital.specialties.map((center) => (
            <article
              key={center.title}
              className="flex h-[350px] w-full max-w-[280px] flex-col rounded-[20px] border-2 border-slate-200 bg-white p-5 transition hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center">
                <Image
                  src={center.icon}
                  alt={center.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
                {center.title}
              </h3>

              {/* Description */}
              <p className="mb-4 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-600">
                {center.description}
              </p>

              {/* Button */}
              <Link
                href={center.href}
                className="inline-flex h-8 w-[169px] items-center justify-center gap-2.5 rounded-lg border border-[#262B7E] text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
              >
                Lihat Selengkapnya
              </Link>
            </article>
          ))}
        </div>
      </section>

      <HospitalFacilitiesSection facilities={hospital.facilities} />

      <DoctorTeamSection />

      <FacilitiesCarouselSection />

      <PromotionSection />

      <HospitalContactSection />
    </div>
  );
}
