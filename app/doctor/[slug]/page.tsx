"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Building2,
  CreditCard,
  UserCircle2,
  X,
  Share2,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DoctorHospitalSchedule, doctorProfiles } from "@/data/doctors";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function DoctorDetailPage() {
  const params = useParams();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";
  const { t } = useTranslation();

  const doctor = useMemo(
    () => doctorProfiles.find((profile) => profile.slug === slugParam),
    [slugParam]
  );

  const [activeHospital, setActiveHospital] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  const [isSymptomsExpanded, setIsSymptomsExpanded] = useState(false);
  const [isProceduresExpanded, setIsProceduresExpanded] = useState(false);
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);

  // Modal booking states
  const [isHospitalExpanded, setIsHospitalExpanded] = useState(false);
  const [isPatientExpanded, setIsPatientExpanded] = useState(false);
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("Sentra Medika Cisalak");
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; image: string } | null>(
    null
  );
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const currentHospital = useMemo(() => {
    if (!doctor) return "";
    if (activeHospital && doctor.schedule.some((item) => item.hospital === activeHospital)) {
      return activeHospital;
    }
    return doctor.schedule[0]?.hospital ?? "";
  }, [doctor, activeHospital]);

  const activeSchedule = useMemo<DoctorHospitalSchedule | null>(() => {
    if (!doctor) return null;
    return (
      doctor.schedule.find((item) => item.hospital === currentHospital) ??
      doctor.schedule[0] ??
      null
    );
  }, [doctor, currentHospital]);

  if (!doctor) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-xl font-semibold text-slate-900">{t("doctorDetail.notFoundTitle")}</h1>
        <p className="mt-2 text-sm text-slate-500">{t("doctorDetail.notFoundDescription")}</p>
        <Link
          href="/doctor"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("doctorDetail.backToList")}
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-24 pb-12">
      {/* Header with Back Button */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Link
        href="/doctor"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-[#262B7E]"
      >
        <ArrowLeft className="h-4 w-4" />
          Kembali ke <span className="font-semibold text-[#262B7E]">Semua Dokter</span>
      </Link>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Doctor Profile Header - Full Width */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:gap-8">
          {/* Doctor Image */}
          <div className="relative h-48 w-48 shrink-0 self-center overflow-hidden rounded-3xl sm:self-start lg:h-52 lg:w-52">
              <Image src={doctor.image} alt={doctor.name} fill className="object-cover" priority />
          </div>

          {/* Doctor Info */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#262B7E] sm:text-3xl">{doctor.name}</h1>
              <p className="text-base font-medium text-slate-900">{doctor.title}</p>
              <p className="text-sm text-slate-700">{doctor.subspecialty}</p>
              </div>

              <div className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-900">Tersedia di:</h2>
              <div className="flex flex-col gap-2">
                  {doctor.hospitals.map((hospital) => (
                  <div key={hospital} className="flex items-center gap-2 text-sm text-slate-700">
                    <Building2 className="h-4 w-4 text-[#5B7CFF]" />
                      {hospital}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Icons - No Border */}
            <div className="flex gap-3">
              <button
                type="button"
                className="text-[#262B7E] transition hover:opacity-70"
                aria-label="YouTube"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </button>
              <button
                type="button"
                className="text-[#262B7E] transition hover:opacity-70"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
                <button
                  type="button"
                className="text-[#262B7E] transition hover:opacity-70"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                </button>
            </div>
          </div>
            </div>

        {/* Main Grid - All Sections with Appointment Card */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Left Column - All Sections */}
          <div className="space-y-8">
            {/* Profil Dokter Section */}
            <section className="space-y-4">
              <button
                type="button"
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="flex w-full items-center justify-between border-b-2 border-slate-900 pb-4 text-left"
              >
                <h2 className="text-lg font-semibold text-slate-900">Profil Dokter</h2>
                {isProfileExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                )}
              </button>
              {isProfileExpanded ? (
                <div className="space-y-4 pt-2">
                  <p className="text-sm leading-relaxed text-slate-700">
                    dr. {doctor.name} adalah dokter spesialis {doctor.title.toLowerCase()} yang
                    berpraktik di RS Sentra Medika Cisalak, siap membantu pasien dalam menangani
                    berbagai keluhan dan penyakit pada organ dalam seperti hipertensi, diabetes,
                    infeksi, serta gangguan metabolik.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Selain layanan pemeriksaan dan konsultasi penyakit dalam, beliau juga
                    menyediakan Medical Check Up (MCU), vaksinasi dewasa, infus vitamin, terapi
                    nebulizer, hingga perawatan luka, dengan pendekatan profesional dan edukatif
                    untuk membantu pasien menjaga kesehatan secara menyeluruh.
                  </p>
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-[#262B7E] px-6 py-2.5 text-sm font-semibold text-[#262B7E] transition hover:bg-[#262B7E] hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                      Bagikan Profil Dokter
                    </button>
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsProfileExpanded(false)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-700"
                      >
                        Sembunyikan Detail
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-700">
                    dr. {doctor.name} adalah dokter spesialis {doctor.title.toLowerCase()} yang
                    berpraktik di RS Sentra Medika Cisalak, siap membantu pasien dalam menangani
                    berbagai keluhan dan penyakit pada organ dalam seperti hipertensi, diabetes,
                    infeksi, serta gangguan metabolik.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsProfileExpanded(true)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-700"
                  >
                    Lihat Selengkapnya
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </section>

            {/* Schedule Section */}
            <section className="space-y-4">
              <button
                type="button"
                onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
                className="flex w-full items-center justify-between border-b-2 border-slate-900 pb-4 text-left"
              >
                <h2 className="text-lg font-semibold text-slate-900">Jadwal & Buat Janji Temu</h2>
                {isScheduleExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                )}
              </button>
              {isScheduleExpanded ? (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-3">
                    {doctor.hospitals.map((hospital) => (
                      <div
                        key={hospital}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                      >
                        <Building2 className="h-5 w-5 text-[#5B7CFF]" />
                        {hospital}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-slate-900">
                      {activeSchedule?.clinics[0]?.name || "Poliklinik"}
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeSchedule?.clinics.map((clinic) => (
                        <div
                          key={clinic.name}
                          className="rounded-2xl border-2 border-slate-200 bg-white p-6"
                        >
                          <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
                            <Building2 className="h-5 w-5 text-[#5B7CFF]" />
                            {clinic.name.replace("Poliklinik ", "")}
                          </div>

                          <div className="space-y-4">
                            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(
                              (day) => {
                                const daySessions = clinic.sessions.filter((s) => s.day === day);
                                return (
                                  <div
                                    key={day}
                                    className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                                  >
                                    <span className="text-sm font-medium text-slate-900">
                                      {day}
                                    </span>
                                    <div className="flex flex-col items-end gap-1 text-right">
                                      {daySessions.length > 0 ? (
                                        daySessions.map((session, idx) =>
                                          session.times.map((time, timeIdx) => (
                                            <span
                                              key={`${idx}-${timeIdx}`}
                                              className="text-sm text-slate-700"
                                            >
                                              {time}
                                            </span>
                                          ))
                                        )
                                      ) : (
                                        <span className="text-sm text-slate-400">-</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsScheduleExpanded(false)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-700"
                  >
                    Sembunyikan
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 pt-2">
                  {doctor.hospitals.map((hospital) => (
                    <div
                      key={hospital}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                    >
                      <Building2 className="h-5 w-5 text-[#5B7CFF]" />
                      {hospital}
                </div>
              ))}
                  <button
                    type="button"
                    onClick={() => setIsScheduleExpanded(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-700"
                  >
                    Lihat Jadwal
                    <ChevronRight className="h-4 w-4" />
                  </button>
            </div>
              )}
          </section>

            {/* Gejala & Penyakit Section */}
            <section className="space-y-4">
              <button
                type="button"
                onClick={() => setIsSymptomsExpanded(!isSymptomsExpanded)}
                className="flex w-full items-center justify-between border-b-2 border-slate-900 pb-4 text-left"
              >
                <h2 className="text-lg font-semibold text-slate-900">Gejala & Penyakit</h2>
                {isSymptomsExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                )}
              </button>
              {isSymptomsExpanded ? (
                <div className="space-y-4 pt-2">
            <div className="flex flex-wrap gap-3">
              {doctor.symptoms.map((symptom) => (
                <span
                  key={symptom}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  {symptom}
                </span>
              ))}
            </div>
                  <button
                    type="button"
                    onClick={() => setIsSymptomsExpanded(false)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#262B7E] hover:text-blue-700"
                  >
                    Sembunyikan Detail
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 pt-2">
                  {doctor.symptoms.slice(0, 4).map((symptom) => (
                    <span
                      key={symptom}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      {symptom}
                    </span>
                  ))}
                  {doctor.symptoms.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setIsSymptomsExpanded(true)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#262B7E] hover:text-blue-700"
                    >
                      Lihat Selengkapnya
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
          </section>

            {/* Penanganan / Prosedur Spesialistik Section */}
            <section className="space-y-4">
              <button
                type="button"
                onClick={() => setIsProceduresExpanded(!isProceduresExpanded)}
                className="flex w-full items-center justify-between border-b-2 border-slate-900 pb-4 text-left"
              >
            <h2 className="text-lg font-semibold text-slate-900">
                  Penanganan / Prosedur Spesialistik
            </h2>
                {isProceduresExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                )}
              </button>
              {isProceduresExpanded ? (
                <div className="space-y-4 pt-2">
                  <div className="grid gap-4 sm:grid-cols-2">
              {doctor.procedures.map((procedure) => (
                      <div key={procedure} className="text-sm text-slate-700">
                        {procedure}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsProceduresExpanded(false)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#262B7E] hover:text-blue-700"
                  >
                    Sembunyikan Detail
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {doctor.procedures.slice(0, 3).map((procedure) => (
                      <div key={procedure} className="text-sm text-slate-700">
                        {procedure}
                </div>
              ))}
            </div>
                  {doctor.procedures.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setIsProceduresExpanded(true)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#262B7E] hover:text-blue-700"
                    >
                      Lihat Selengkapnya
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
          </section>

            {/* Pendidikan Section */}
            <section className="space-y-4">
              <h2 className="border-b-2 border-slate-900 pb-4 text-lg font-semibold text-slate-900">
                Pendidikan
              </h2>
              <div className="space-y-4 pt-2">
              {doctor.education.map((edu, index) => (
                <div
                  key={`${edu.institution}-${index}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                    <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{edu.program}</p>
                      <p className="text-sm text-slate-600">
                        {edu.year} - {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

          {/* Right Column - Appointment Card (Sticky) */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative overflow-hidden rounded-[20px] border-2 border-[#DC2626] bg-white p-6">
              {/* Decorative Pattern - Top Right */}
              <div className="absolute -right-40 -top-50 h-40 w-40">
                <Image
                  src="/red-pattern.png"
                  alt="Pattern"
                  fill
                  className="scale-[2.5] rotate-45 object-contain opacity-100"
                />
              </div>

              <div className="relative z-10 space-y-5 text-center">
                <p className="text-sm font-semibold text-[#DC2626]">
                  Pilih Jadwal & Buat Janji Temu
                </p>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold leading-tight text-[#262B7E]">{doctor.name}</h3>
                  <p className="text-sm text-slate-700">
                    {doctor.title.replace("Spesialis ", "Poli ")}
                  </p>
                </div>

              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#5B7CFF] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                  Buat Janji Temu
              </button>
            </div>
          </div>
        </aside>
      </div>
        </div>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-hidden rounded-2xl border-none p-0 shadow-2xl sm:max-w-4xl lg:max-w-5xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">Jadwal & Janji temu Dokter</h2>
                      <button
              onClick={() => setIsBookingOpen(false)}
              className="rounded-full p-2 hover:bg-slate-100"
                      >
              <X className="h-6 w-6" />
                      </button>
                    </div>

          <div className="grid gap-0 lg:grid-cols-2">
            {/* Left Side - Date & Time */}
            <div className="border-b bg-white p-6 lg:border-b-0 lg:border-r">
              {/* Pilih Tanggal */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Pilih Tanggal</h3>
                <p className="mb-4 text-sm text-slate-600">
                  Pesanan janji dapat dilakukan untuk 3 bulan ke depan
                </p>
                <div className="max-w-xs rounded-xl border border-slate-200 p-3">
                  <DayPicker animate mode="single" />

                  <div className="mt-2 flex items-center gap-3 border-t pt-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded-sm bg-[#5B7CFF]"></div>
                      <span className="text-slate-600">Tersedia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded-sm bg-slate-800"></div>
                      <span className="text-slate-600">Jadwal tidak tersedia</span>
                    </div>
                    </div>
                  </div>
                </div>

              {/* Waktu Konsultasi */}
                <div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">Waktu Konsultasi</h3>
                <div className="flex flex-wrap gap-2">
                    {["09:00 - 10:30", "10:00 - 12:00", "13:00 - 14:30", "14:30 - 15:30"].map(
                      (slot) => (
                        <button
                          key={slot}
                          type="button"
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-[11px] font-medium text-slate-700 transition hover:border-[#5B7CFF] hover:bg-[#5B7CFF] hover:text-white"
                        >
                          {slot}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

            {/* Right Side - Hospital, Patient, Payment */}
            <div className="bg-white p-6">
              {/* Pilih Cabang RS */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Pilih Cabang Rumah Sakit
                </h3>

                {!isHospitalExpanded ? (
                  <button
                    type="button"
                    onClick={() => setIsHospitalExpanded(true)}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                  >
                    <span className="font-semibold text-slate-900">
                      {selectedHospital || "Pilih Cabang Rumah Sakit"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedHospital("Sentra Medika Cisalak");
                        setIsHospitalExpanded(false);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                    >
                      <p className="font-semibold text-slate-900">Sentra Medika Cisalak</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Jl. Raya Jakarta-Bogor No.KM. 33, Cisalak, Kec. Sukmajaya, Kota Depok, Jawa
                        Barat 16416
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedHospital("Sentra Medika Cibinong");
                        setIsHospitalExpanded(false);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                    >
                      <p className="font-semibold text-slate-900">Sentra Medika Cibinong</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Jl. Raya Mayor Oking Jaya Atmaja No.9, Cibinong, Kec. Cibinong, Kabupaten
                        Bogor, Jawa Barat 16911
                      </p>
                    </button>
                  </div>
                )}
            </div>

              {/* Informasi Pasien */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Informasi Pasien</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Pastikan konsultasi dipesan untuk calon pasien yang tepat
                </p>

                {!isPatientExpanded ? (
                  <button
                    type="button"
                    onClick={() => setIsPatientExpanded(true)}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                  >
                    <span className="font-semibold text-slate-900">
                      {selectedPatient ? selectedPatient.name : "Pilih Pasien"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPatient({
                          name: "Jane Cooper",
                          image:
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop",
                        });
                        setIsPatientExpanded(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                    <Image
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop"
                          alt="Jane Cooper"
                      fill
                      className="object-cover"
                    />
                  </div>
                      <span className="font-semibold text-slate-900">Jane Cooper</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPatient({
                          name: "Bessie Cooper",
                          image:
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop",
                        });
                        setIsPatientExpanded(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop"
                          alt="Bessie Cooper"
                          fill
                          className="object-cover"
                        />
                  </div>
                      <span className="font-semibold text-slate-900">Bessie Cooper</span>
                  </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-left hover:border-slate-400"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <span className="text-2xl text-slate-400">+</span>
                </div>
                      <span className="font-medium text-slate-600">Tambah Pasien</span>
                  </button>
                </div>
                )}
              </div>

              {/* Metode Pembayaran */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Pilih Metode pembayaran
                </h3>

                {!isPaymentExpanded ? (
                  <button
                    type="button"
                    onClick={() => setIsPaymentExpanded(true)}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                  >
                    <span className="font-semibold text-slate-900">
                      {selectedPayment || "Metode Bayar"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPayment("Jaminan");
                        setIsPaymentExpanded(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <UserCircle2 className="h-5 w-5 text-slate-600" />
                      </div>
                      <span className="font-semibold text-slate-900">Jaminan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPayment("Pribadi");
                        setIsPaymentExpanded(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <CreditCard className="h-5 w-5 text-slate-600" />
                      </div>
                      <span className="font-semibold text-slate-900">Pribadi</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer - BPJS Info & Button */}
          <div className="sticky bottom-0 border-t bg-[#262B7E] p-4">
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              <p className="text-sm text-white">
                Janji temu dengan penjaminan BPJS/JKN hanya dapat dilakukan melalui{" "}
                <a href="#" className="font-semibold text-red-400 underline">
                  Mobile JKN &gt;
                </a>
              </p>
                <button
                  type="button"
                className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-[#262B7E] transition hover:bg-slate-100 lg:w-auto"
                >
                Buat Janji Temu
                </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
