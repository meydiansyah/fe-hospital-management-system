"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";

export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  subspecialization?: string;
  hospital: string;
  image: string;
  href: string;
};

const defaultDoctors: Doctor[] = [
  {
    id: "1",
    name: "Christy Efiyanti, dr, SpPD",
    title: "Penyakit Dalam",
    specialization: "Penyakit Dalam",
    subspecialization: "Subspesialis Penyakit Dalam",
    hospital: "Harapan Bunda Hospital",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop",
    href: "/doctor/christy-efiyanti",
  },
  {
    id: "2",
    name: "Andhika Rachman, dr, Sp.PD-KHOM",
    title: "Penyakit Dalam",
    specialization: "Penyakit Dalam",
    subspecialization: "Subspesialis Hemotologi Oknologi Medik",
    hospital: "Harapan Bunda Hospital",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop",
    href: "/doctor/andhika-rachman",
  },
];

export default function DoctorTeamSection({
  doctors,
  title = "Tim Dokter Spesialis Jantung & Pembuluh Darah",
  viewAllHref = "/doctor",
}: {
  doctors?: Doctor[];
  title?: string;
  viewAllHref?: string;
}) {
  const doctorsData = doctors ?? defaultDoctors;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="flex items-center gap-2 text-sm font-semibold text-[#262B7E] transition hover:text-[#1a1f5c]"
          >
            Lihat Semua Dokter
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {doctorsData.map((doctor) => (
            <article
              key={doctor.id}
              className="flex h-[261px] w-full max-w-[604px] flex-col gap-5 rounded-[20px] border border-[#E4E4E4] bg-white p-5 transition hover:shadow-md"
            >
              {/* Top Section: Image + Info */}
              <div className="flex flex-1 gap-5">
                {/* Doctor Image */}
                <div className="relative h-full w-[180px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex flex-1 flex-col space-y-2">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-[#262B7E]">
                    {doctor.name}
                  </h3>

                  {/* Specialization */}
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-slate-900">
                      {doctor.specialization}
                    </p>
                    {doctor.subspecialization && (
                      <p className="text-sm text-slate-600">
                        {doctor.subspecialization}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Section: Hospital + Button */}
              <div className="flex items-center justify-between gap-4">
                {/* Hospital */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-1">{doctor.hospital}</span>
                </div>

                {/* Button */}
                <Link
                  href={doctor.href}
                  className="inline-flex h-[41px] w-[149px] shrink-0 items-center justify-center gap-2.5 rounded-[5px] bg-[#5A81FA] px-10 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4870e8]"
                >
                  Buat Janji
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

