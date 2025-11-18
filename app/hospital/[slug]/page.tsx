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

type Specialty = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
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

const hospitalDetails: HospitalDetail[] = [
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
          "Penanganan kanker terpadu dengan teknologi radioterapi dan PAS (Personalized Adaptive Strategy).",
        href: "/centers/oncology",
        icon: Microscope,
      },
      {
        title: "Medical Check Up (MCU)",
        description:
          "Paket skrining komprehensif untuk korporasi dan individu dengan hasil digital realtime.",
        href: "/centers/mcu",
        icon: Activity,
      },
      {
        title: "Cardiovascular & Brain Center",
        description:
          "Cath Lab terintegrasi untuk tindakan jantung dan stroke dengan tim intervensi 24 jam.",
        href: "/centers/heart-brain",
        icon: HeartPulse,
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
          "Prosedur minimal invasif pengangkatan batu ginjal dengan pemulihan cepat.",
        href: "/centers/pcnl",
        icon: Orbit,
      },
      {
        title: "Medical Rehabilitation Center",
        description:
          "Rehabilitasi pasca stroke, cedera olahraga, dan terapi okupasi dengan fasilitas lengkap.",
        href: "/centers/rehab",
        icon: Stethoscope,
      },
      {
        title: "Brain Center",
        description:
          "Penanganan stroke dan bedah saraf dengan neuro ICU dan tim multidisiplin.",
        href: "/centers/brain",
        icon: Brain,
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
        description:
          "Layanan persalinan, laktasi, dan tumbuh kembang anak terpadu.",
        image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/maternity",
      },
      {
        title: "Hemodialisa",
        description:
          "Unit hemodialisa dengan mesin canggih dan fasilitas lounge untuk keluarga.",
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
          "Penanganan cedera kerja dan kecelakaan dengan dokter ortopedi dan bedah plastik.",
        href: "/centers/trauma",
        icon: Activity,
      },
      {
        title: "Orthopedic Center",
        description:
          "Fasilitas penanganan tulang dan sendi, termasuk arthroscopy dan joint replacement.",
        href: "/centers/orthopedic",
        icon: Stethoscope,
      },
      {
        title: "Hemodialisa",
        description:
          "Pelayanan cuci darah dengan jadwal fleksibel khusus pekerja industri.",
        href: "/centers/hemodialysis",
        icon: HeartPulse,
      },
    ],
    facilities: [
      {
        title: "Rawat Jalan Eksekutif",
        description:
          "Klinik eksekutif dengan layanan one stop service dan lounge korporasi.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/outpatient",
      },
      {
        title: "Industrial Clinic",
        description:
          "Tim dokter perusahaan dan ambulance siaga untuk kebutuhan korporasi.",
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
          "Pendampingan persalinan, laktasi, NICU, serta klinik tumbuh kembang anak.",
        href: "/centers/maternity",
        icon: Stethoscope,
      },
      {
        title: "Endoscopy Center",
        description:
          "Diagnostik dan terapi endoskopi gastrointestinal dengan dokter spesialis berpengalaman.",
        href: "/centers/endoscopy",
        icon: Microscope,
      },
      {
        title: "Spine Center",
        description:
          "Layanan nyeri punggung, skoliosis, dan bedah tulang belakang minimal invasif.",
        href: "/centers/spine",
        icon: Brain,
      },
    ],
    facilities: [
      {
        title: "Kamar Bersalin",
        description:
          "Ruang persalinan nyaman dengan fasilitas rooming-in dan dukungan doula.",
        image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/maternity",
      },
      {
        title: "Endoscopy Suite",
        description:
          "Fasilitas endoskopi modern dengan sedasi aman dan pemulihan cepat.",
        image:
          "https://images.unsplash.com/photo-1584467735815-f778f274e4eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/endoscopy",
      },
      {
        title: "Fisioterapi",
        description:
          "Terapi muskuloskeletal dan rehabilitasi pasca operasi tulang belakang.",
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
          "Paket medical check up karyawan dengan penjemputan sample on-site.",
        href: "/centers/mcu",
        icon: Activity,
      },
      {
        title: "Rehabilitasi Medik",
        description:
          "Rehabilitasi pasca cedera dan pasca operasi dengan program individual.",
        href: "/centers/rehab",
        icon: Stethoscope,
      },
      {
        title: "Trauma Center",
        description:
          "Penanganan trauma dan kecelakaan lalu lintas didukung imaging 24 jam.",
        href: "/centers/trauma",
        icon: HeartPulse,
      },
    ],
    facilities: [
      {
        title: "MCU Lounge",
        description:
          "Area khusus pasien MCU dengan layanan cepat dan hasil digital.",
        image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/mcu",
      },
      {
        title: "Rehab Center",
        description:
          "Terapi okupasi, fisioterapi, dan hidroterapi untuk pemulihan optimal.",
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/rehab",
      },
      {
        title: "Laboratorium 24 Jam",
        description:
          "Pengolahan sampel cepat dengan integrasi ke rekam medis elektronik.",
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
          "Layanan katarak, lasik, dan retina dengan peralatan diagnostik berteknologi tinggi.",
        href: "/centers/eye",
        icon: Microscope,
      },
      {
        title: "Stroke Unit",
        description:
          "Tindak cepat stroke dengan telemedicine dan kolaborasi neurologis nasional.",
        href: "/centers/brain",
        icon: Brain,
      },
      {
        title: "Dialysis Care",
        description:
          "Unit hemodialisa nyaman dengan jadwal berjenjang untuk pasien wilayah sekitar.",
        href: "/centers/hemodialysis",
        icon: HeartPulse,
      },
    ],
    facilities: [
      {
        title: "Operating Theatre",
        description:
          "Ruang operasi modern untuk bedah umum, ortopedi, dan endoscopy.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&auto=format&fit=crop",
        href: "/facilities/surgery",
      },
      {
        title: "Dialysis Suite",
        description:
          "Unit hemodialisa dengan pemandangan alam dan fasilitas relaksasi pasien.",
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

export default async function HospitalDetailPage({
  params,
}: HospitalDetailPageProps) {
  const resolvedParams = isPromise(params)
    ? await params
    : (params as { slug: string });

  const rawSlug = decodeURIComponent(
    (resolvedParams?.slug ?? "").toLowerCase()
  );
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hospital.specialties.map((center) => (
            <article
              key={center.title}
              className="flex h-full flex-col justify-between rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <center.icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-blue-900">
                  {center.title}
                </h3>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {center.description}
              </p>
              <Link
                href={center.href}
                className="mt-6 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Lihat Selengkapnya &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      <HospitalFacilitiesSection facilities={hospital.facilities} />
    </div>
  );
}
