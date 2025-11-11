export type DoctorScheduleSession = {
  day: string;
  times: string[];
};

export type DoctorClinicSchedule = {
  name: string;
  sessions: DoctorScheduleSession[];
};

export type DoctorHospitalSchedule = {
  hospital: string;
  clinics: DoctorClinicSchedule[];
};

export type DoctorProfile = {
  slug: string;
  name: string;
  title: string;
  subspecialty: string;
  hospitals: string[];
  biography: string;
  highlight: string;
  image: string;
  symptoms: string[];
  procedures: string[];
  schedule: DoctorHospitalSchedule[];
  education: {
    program: string;
    institution: string;
    year: string;
    logo: string;
  }[];
  relatedDoctors: {
    slug: string;
    name: string;
    title: string;
    subspecialty: string;
    hospital: string;
    image: string;
  }[];
};

export const doctorProfiles: DoctorProfile[] = [
  {
    slug: "dr-abdullah-shidqul-azmi-sp-pd",
    name: "dr Abdullah Shidqul Azmi, Sp.PD",
    title: "Penyakit Dalam",
    subspecialty: "SubSpesialis Penyakit Dalam",
    hospitals: ["Harapan Bunda Hospital", "Sentra Medika Hospital Cibinong"],
    biography:
      "dr Abdullah Shidqul Azmi, Sp.PD adalah dokter spesialis penyakit dalam yang berpraktik di RS Sentra Medika Cisalak.",
    highlight: "Pilih Jadwal Janji Temu",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop",
    symptoms: [
      "Gagal Ginjal Akut",
      "Penyakit Addison",
      "Krisis Adrenal",
      "Penyakit Kuning",
      "Hepatitis Alkoholik",
      "Ketoasidosis Alkoholik",
      "Anuria",
      "Asites",
    ],
    procedures: [
      "Pemeriksaan HbA1c",
      "Pemeriksaan Anlase",
      "ACE Inhibitor",
      "Angiotis Beta",
    ],
    schedule: [
      {
        hospital: "Harapan Bunda Hospital",
        clinics: [
          {
            name: "Poliklinik Endokrin",
            sessions: [
              { day: "Senin", times: ["14:00 - 16:00"] },
              { day: "Selasa", times: ["10:00 - 12:00"] },
              { day: "Rabu", times: ["10:00 - 12:00"] },
              { day: "Kamis", times: ["14:00 - 16:00"] },
            ],
          },
          {
            name: "Poliklinik Gastro",
            sessions: [
              { day: "Senin", times: ["14:00 - 16:00"] },
              { day: "Selasa", times: ["10:00 - 12:00"] },
              { day: "Rabu", times: ["14:00 - 16:00"] },
              { day: "Jumat", times: ["14:00 - 20:00"] },
            ],
          },
        ],
      },
      {
        hospital: "Sentra Medika Hospital Cisalak",
        clinics: [
          {
            name: "Poliklinik Endokrin",
            sessions: [
              { day: "Senin", times: ["14:00 - 16:00"] },
              { day: "Selasa", times: ["10:00 - 12:00"] },
              { day: "Rabu", times: ["10:00 - 12:00"] },
              { day: "Kamis", times: ["14:00 - 16:00"] },
            ],
          },
          {
            name: "Poliklinik Gastro",
            sessions: [
              { day: "Senin", times: ["14:00 - 16:00"] },
              { day: "Selasa", times: ["10:00 - 12:00"] },
              { day: "Rabu", times: ["14:00 - 16:00"] },
              { day: "Jumat", times: ["14:00 - 20:00"] },
            ],
          },
        ],
      },
    ],
    education: [
      {
        program: "Pendidikan Profesi Dokter",
        institution: "Universitas Indonesia",
        year: "2009",
        logo: "https://images.unsplash.com/photo-1526401281623-359c03ad2970?w=200&h=200&fit=crop",
      },
      {
        program: "Spesialis Penyakit Dalam",
        institution: "Universitas Udayana, Denpasar",
        year: "2020",
        logo: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=200&h=200&fit=crop",
      },
    ],
    relatedDoctors: [
      {
        slug: "christy-efiyanti-dr-sppd",
        name: "Christy Efiyanti, dr, SpPD",
        title: "Penyakit Dalam",
        subspecialty: "Subspesialis Penyakit Dalam",
        hospital: "Sentra Medika Hospital Cibinong",
        image:
          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80&auto=format&fit=crop",
      },
      {
        slug: "andhika-rachman-dr-sp-pd-khom",
        name: "Andhika Rachman, dr, Sp.PD-KHOM",
        title: "Penyakit Dalam",
        subspecialty: "Subspesialis Hematologi Onkologi Medik",
        hospital: "Sentra Medika Hospital Cibinong",
        image:
          "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400&q=80&auto=format&fit=crop",
      },
    ],
  },
  {
    slug: "christy-efiyanti-dr-sppd",
    name: "Christy Efiyanti, dr, SpPD",
    title: "Penyakit Dalam",
    subspecialty: "Spesialis Penyakit Dalam",
    hospitals: ["Sentra Medika Hospital Cibinong"],
    biography:
      "Christy Efiyanti, dr, SpPD merupakan dokter spesialis penyakit dalam yang fokus pada penanganan gangguan metabolik dan autoimun.",
    highlight: "Siap Membantu Kesehatan Anda",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80&auto=format&fit=crop",
    symptoms: [
      "Hipertensi",
      "Diabetes Mellitus",
      "Penyakit Tiroid",
      "Gangguan Metabolik",
    ],
    procedures: [
      "Konsultasi Penyakit Dalam",
      "Manajemen Diabetes",
      "Evaluasi Tiroid",
    ],
    schedule: [
      {
        hospital: "Sentra Medika Hospital Cibinong",
        clinics: [
          {
            name: "Poliklinik Penyakit Dalam",
            sessions: [
              { day: "Senin", times: ["09:00 - 12:00"] },
              { day: "Rabu", times: ["09:00 - 12:00"] },
              { day: "Jumat", times: ["13:00 - 16:00"] },
            ],
          },
        ],
      },
    ],
    education: [
      {
        program: "Pendidikan Profesi Dokter",
        institution: "Universitas Padjadjaran",
        year: "2010",
        logo: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=200&h=200&fit=crop",
      },
      {
        program: "Spesialis Penyakit Dalam",
        institution: "Universitas Gadjah Mada",
        year: "2018",
        logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
      },
    ],
    relatedDoctors: [
      {
        slug: "dr-abdullah-shidqul-azmi-sp-pd",
        name: "dr Abdullah Shidqul Azmi, Sp.PD",
        title: "Penyakit Dalam",
        subspecialty: "SubSpesialis Penyakit Dalam",
        hospital: "Harapan Bunda Hospital",
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop",
      },
      {
        slug: "andhika-rachman-dr-sp-pd-khom",
        name: "Andhika Rachman, dr, Sp.PD-KHOM",
        title: "Penyakit Dalam",
        subspecialty: "Subspesialis Hematologi Onkologi Medik",
        hospital: "Sentra Medika Hospital Cibinong",
        image:
          "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400&q=80&auto=format&fit=crop",
      },
    ],
  },
];

export const doctorSummaries = doctorProfiles.map((doctor) => ({
  name: doctor.name,
  title: doctor.title,
  hospital: doctor.hospitals[0],
  image: doctor.image,
  slug: doctor.slug,
}));

export function getDoctorBySlug(slug: string) {
  return doctorProfiles.find((doctor) => doctor.slug === slug);
}

