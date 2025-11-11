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
  MapPin,
  Stethoscope,
  Building2,
  CreditCard,
  UserCircle2,
  X,
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
  const params = useParams<{ slug: string }>();
  const slugParam =
    typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const { t } = useTranslation();

  const doctor = useMemo(
    () => doctorProfiles.find((profile) => profile.slug === slugParam),
    [slugParam]
  );

  const [activeHospital, setActiveHospital] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const currentHospital = useMemo(() => {
    if (!doctor) return "";
    if (
      activeHospital &&
      doctor.schedule.some((item) => item.hospital === activeHospital)
    ) {
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
        <h1 className="text-xl font-semibold text-slate-900">
          {t("doctorDetail.notFoundTitle")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("doctorDetail.notFoundDescription")}
        </p>
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
    <section className="mx-auto max-w-6xl pt-40 space-y-10 px-6 py-16 sm:px-8">
      <Link
        href="/doctor"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("doctorDetail.backToList")}
      </Link>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <section className="flex flex-col gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-blue-100/20 lg:flex-row lg:items-start">
            <div className="relative h-40 w-40 self-center overflow-hidden rounded-3xl bg-blue-50 lg:self-start">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  {doctor.name}
                </h1>
                <p className="text-sm font-medium text-rose-600">
                  {doctor.title}
                </p>
                <p className="text-sm text-slate-500">{doctor.subspecialty}</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {t("doctorDetail.availableAt")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.hospitals.map((hospital) => (
                    <span
                      key={hospital}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600"
                    >
                      <MapPin className="h-4 w-4 text-blue-500" />
                      {hospital}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {t("doctorDetail.profileTitle")}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {doctor.biography}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-blue-100/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {t("doctorDetail.scheduleTitle")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {doctor.schedule.map((schedule) => (
                <button
                  key={schedule.hospital}
                  type="button"
                  onClick={() => setActiveHospital(schedule.hospital)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                    schedule.hospital === currentHospital
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {schedule.hospital}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {activeSchedule?.clinics.map((clinic) => (
                <div
                  key={clinic.name}
                  className="rounded-2xl border border-slate-100 bg-blue-50/40 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 border-b border-blue-100 pb-3">
                    <Stethoscope className="h-5 w-5 text-rose-500" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {clinic.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {t("doctorDetail.clinicSubtitle")}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 pt-3 sm:grid-cols-2">
                    {clinic.sessions.map((session) => (
                      <div
                        key={`${clinic.name}-${
                          session.day
                        }-${session.times.join("-")}`}
                        className="flex items-center justify-between rounded-xl border border-transparent bg-white px-4 py-3 text-sm text-slate-600 shadow-sm"
                      >
                        <span className="font-semibold text-slate-900">
                          {session.day}
                        </span>
                        <span className="inline-flex items-center gap-2 text-blue-600">
                          <Calendar className="h-4 w-4" />
                          {session.times.join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-blue-100/20">
            <h2 className="text-lg font-semibold text-slate-900">
              {t("doctorDetail.symptomsTitle")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {doctor.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-blue-100/20">
            <h2 className="text-lg font-semibold text-slate-900">
              {t("doctorDetail.proceduresTitle")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {doctor.procedures.map((procedure) => (
                <div
                  key={procedure}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-blue-50/50 px-4 py-3 text-sm text-slate-700"
                >
                  <span>{procedure}</span>
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-blue-100/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {t("doctorDetailSections.education")}
              </h2>
            </div>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div
                  key={`${edu.institution}-${index}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-blue-50/30 p-4 shadow-sm"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {edu.program}
                    </p>
                    <p className="text-xs text-slate-500">
                      {edu.year} — {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-40 self-start">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 text-center shadow-xl shadow-rose-100/40">
            <p className="text-sm font-semibold text-rose-500">
              {t("doctorDetail.highlightTag")}
            </p>
            <div className="mt-3 space-y-4 rounded-2xl bg-rose-50 p-5">
              <p className="text-sm font-semibold text-slate-700">
                {doctor.highlight}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">
                  {doctor.name}
                </p>
                <p className="text-xs text-slate-500">{doctor.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {t("doctorDetail.bookNow")}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-blue-100/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("doctorDetailSections.otherDoctors.title")}
          </h2>
          <Link
            href="/doctor"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {t("doctorDetailSections.otherDoctors.seeAll")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {doctor.relatedDoctors.map((related) => (
            <Link
              key={related.slug}
              href={`/doctor/${related.slug}`}
              className="group flex gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-md shadow-blue-100/30 transition hover:border-blue-200 hover:shadow-lg"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-blue-50">
                <Image
                  src={related.image}
                  alt={related.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700">
                    {related.name}
                  </p>
                  <p className="text-xs text-slate-500">{related.title}</p>
                  <p className="text-xs text-slate-400">
                    {related.subspecialty}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    {related.hospital}
                  </span>
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white group-hover:bg-blue-700">
                    {t("doctorDetailSections.otherDoctors.book")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-6xl overflow-hidden rounded-3xl border-none p-0 shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-[3fr_2fr]">
            <div className="border-r border-slate-100 bg-white p-6 sm:p-8">
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="text-2xl text-slate-900">
                  {t("bookingModal.title")}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  {t("bookingModal.subtitle")}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600">
                    {t("bookingModal.pickDate")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {t("bookingModal.dateHint")}
                  </p>
                  <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                      <span>
                        {selectedDate?.toLocaleDateString("id-ID", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:border-blue-200 hover:text-blue-600"
                        type="button"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        {t("bookingModal.today")}
                      </button>
                    </div>
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      weekStartsOn={1}
                      className="mx-auto rounded-xl bg-slate-50 p-2"
                      classNames={{
                        months:
                          "flex flex-col gap-4 text-slate-700 [&>div]:flex [&>div]:justify-center",
                        caption: "hidden",
                        weekdays:
                          "flex justify-between text-xs font-medium px-2",
                        weekday: "w-9 text-center text-slate-400",
                        table: "w-full border-collapse",
                        row: "mt-1 flex justify-between",
                        day: "h-9 w-9 rounded-full text-sm flex items-center justify-center border border-transparent transition",
                        selected:
                          "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
                        today:
                          "border-blue-500 text-blue-600 font-semibold bg-white",
                        disabled:
                          "text-slate-300 opacity-50 cursor-not-allowed",
                      }}
                      modifiers={{
                        disabled: { dayOfWeek: [0] },
                      }}
                    />
                    <div className="flex gap-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        {t("bookingModal.available")}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                        {t("bookingModal.unavailable")}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-600">
                    {t("bookingModal.consultationTime")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs">
                    {[
                      "09:00 - 10:30",
                      "10:00 - 12:00",
                      "13:00 - 14:30",
                      "14:30 - 15:30",
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:border-blue-200 hover:text-blue-600"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-slate-50 p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold text-slate-600">
                  {t("bookingModal.pickBranch")}
                </p>
                <div className="mt-3 flex gap-3 rounded-2xl border border-slate-200 p-4">
                  <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80&auto=format&fit=crop"
                      alt="Hospital Branch"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <p className="text-sm font-semibold text-slate-900">
                      {activeSchedule?.hospital ?? doctor.schedule[0]?.hospital}
                    </p>
                    <p className="text-xs text-slate-500">
                      Jl. Raya Jakarta-Bogor No.KM. 33, Cisalak, Kec. Sukmajaya,
                      Kota Depok
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <UserCircle2 className="h-4 w-4 text-rose-500" />
                    {t("bookingModal.patientInfo.title")}
                  </span>
                  <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:border-blue-200 hover:text-blue-600">
                    {t("bookingModal.patientInfo.select")}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  {t("bookingModal.patientInfo.description")}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-rose-500" />
                    {t("bookingModal.payment.title")}
                  </span>
                  <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:border-blue-200 hover:text-blue-600">
                    {t("bookingModal.payment.select")}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  {t("bookingModal.payment.description")}
                </p>
              </div>

              <DialogFooter className="flex-row justify-between pt-6">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-600"
                  >
                    <X className="h-4 w-4" />
                    {t("bookingModal.cancel")}
                  </button>
                </DialogClose>
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Building2 className="h-4 w-4" />
                  {t("bookingModal.confirm")}
                </button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
