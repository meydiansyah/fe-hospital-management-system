"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { getImageUrl, getDescription } from "@/lib/dataTransformers";

// Dummy data untuk teknologi
const dummyTechnologies = [
  {
    id: "1",
    slug: "linac",
    name: "LINAC – Radioterapi Presisi Tinggi",
    description:
      "Teknologi Linear Accelerator (LINAC) memungkinkan terapi radiasi dengan tingkat...",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    id: "2",
    slug: "brakiterapi",
    name: "Brakiterapi – Terapi Radiasi dari Dalam Tubuh",
    description:
      "Brakiterapi adalah metode pengobatan kanker dengan menempatkan sumber radiasi lan...",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
  },
  {
    id: "3",
    slug: "mri",
    name: "MRI – Pencitraan Medis Detail & Aman",
    description:
      "Magnetic Resonance Imaging (MRI) adalah teknologi pencitraan tanpa radiasi yang mem...",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
  },
  {
    id: "4",
    slug: "lasik",
    name: "LASIK – Solusi Bebas Kacamata",
    description:
      "Prosedur LASIK (Laser-Assisted In Situ Keratomileusis) memperbaiki kelainan refraksi m...",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

export default function TechnologyPage() {
  const { technologies, technologiesLoading } = useSelector((state: RootState) => state.masterData);

  // Use API data if available, otherwise use dummy data
  const techList =
    technologies && technologies.length > 0
      ? technologies
          .filter((t) => t.is_active)
          .map((tech) => ({
            id: String(tech.id),
            slug: tech.slug,
            name: getDescription(tech.title) || tech.name,
            description: getDescription(tech.description) || "",
            image: getImageUrl(
              tech.images,
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
            ),
          }))
      : dummyTechnologies;

  if (technologiesLoading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-slate-600">Memuat teknologi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-[#262B7E] sm:text-4xl">
            Teknologi Medis Mutakhir Sentra Medika
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            Kami menghadirkan teknologi medis terbaru untuk menunjang diagnosis yang akurat dan
            terapi yang efektif. Dari radioterapi LINAC & brakiterapi, pencitraan MRI beresolusi
            tinggi, hingga prosedur LASIK modern - semua dirancang untuk memberikan perawatan
            terbaik dengan standar internasional.
          </p>
        </section>

        {/* Technology Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techList.map((tech) => (
            <Link
              key={tech.id}
              href={`/technology/${tech.slug}`}
              className="group overflow-hidden rounded-2xl bg-white transition"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-900 line-clamp-2">{tech.name}</h3>
                <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {tech.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
