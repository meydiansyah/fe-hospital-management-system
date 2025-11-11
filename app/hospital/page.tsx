"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const hospitals = [
  {
    distance: "12 KM",
    name: "Harapan Bunda Hospital",
    location: "Jakarta Timur, DKI Jakarta",
    direction: "https://maps.google.com",
    profile: "/hospital/harapan-bunda",
  },
  {
    distance: "24 KM",
    name: "Sentra Medika Hospital Cibinong",
    location: "Bogor, Jawa Barat",
    direction: "https://maps.google.com",
    profile: "/hospital/cibinong",
  },
  {
    distance: "28 KM",
    name: "Sentra Medika Hospital Cikarang",
    location: "Bekasi, Jawa Barat",
    direction: "https://maps.google.com",
    profile: "/hospital/cikarang",
  },
  {
    distance: "32 KM",
    name: "Sentra Medika Hospital Cisalak",
    location: "Depok, Jawa Barat",
    direction: "https://maps.google.com",
    profile: "/hospital/cisalak",
  },
  {
    distance: "64 KM",
    name: "Sentra Medika Hospital Gempol",
    location: "Cirebon, Jawa Barat",
    direction: "https://maps.google.com",
    profile: "/hospital/gempol",
  },
  {
    distance: "120 KM",
    name: "Sentra Medika Hospital Minahasa Utara",
    location: "Minahasa Utara, Sulawesi Utara",
    direction: "https://maps.google.com",
    profile: "/hospital/minahasa-utara",
  },
];

export default function HospitalPage() {
  return (
    <section className="bg-white py-16 max-w-7xl mx-auto pt-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-500">
              Kunjungi
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Rumah Sakit Sentra Medika
            </h2>
            <p className="text-sm text-slate-500 sm:max-w-lg">
              Temukan rumah sakit Sentra Medika terdekat dan rencanakan
              kunjungan Anda dengan mudah melalui peta dan profil layanan
              lengkap.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <MapPin className="h-4 w-4" />
            Jangkauan Nasional
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-blue-100 bg-white p-6 shadow-md shadow-blue-100/30 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-blue-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {hospital.distance}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    {hospital.name}
                  </h3>
                  <p className="text-sm text-slate-500">{hospital.location}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm font-semibold">
                <Link
                  href={hospital.direction}
                  target="_blank"
                  className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Direction
                </Link>
                <Link
                  href={hospital.profile}
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Lihat Profil
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
