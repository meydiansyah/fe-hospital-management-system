"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformMedicalTourism, getImageUrl } from "@/lib/dataTransformers";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Users } from "lucide-react";
import { notFound } from "next/navigation";

export default function MedicalTourismDetailPage() {
  const params = useParams();
  // Handle params which can be string, string[], or undefined
  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : typeof params.slug === "string"
    ? params.slug
    : "";

  const { medicalTourism, medicalTourismLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const tour = useMemo(() => {
    if (!medicalTourism || medicalTourism.length === 0) {
      return null;
    }
    const found = medicalTourism.find((t) => t.slug === slugParam);
    return found ? transformMedicalTourism(found) : null;
  }, [medicalTourism, slugParam]);

  if (medicalTourismLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 pt-32 text-center">
          <p className="text-slate-600">Memuat data medical tourism...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    notFound();
  }

  const originalTour = medicalTourism.find((t) => t.slug === slugParam);
  const heroImage = originalTour
    ? getImageUrl(
        originalTour.images,
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80&auto=format&fit=crop"
      )
    : "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={tour.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-3xl space-y-4 text-white">
            <Link
              href="/medical-tourism"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Medical Tourism
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {tour.title}
              </h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                {tour.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-blue-100/20 sm:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Tentang Paket {tour.title}
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-base leading-relaxed text-slate-600">
                  {tour.description}
                </p>
                {originalTour?.content_id && (
                  <p className="mt-4 text-sm text-slate-500">
                    Informasi lebih lengkap akan tersedia segera.
                  </p>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-blue-100/20 sm:p-8">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                Fasilitas & Layanan
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">
                      Konsultasi Medis
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Konsultasi dengan dokter spesialis berpengalaman.
                  </p>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">
                      Akomodasi Nyaman
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Penginapan dekat rumah sakit dengan fasilitas lengkap.
                  </p>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">
                      Transportasi
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Antar jemput dari bandara dan akomodasi.
                  </p>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">
                      Support 24/7
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Tim pendamping siap membantu selama perawatan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-blue-100/20">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Hubungi Kami
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Call Center
                    </p>
                    <a
                      href="tel:1500-911"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      1500-911
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email</p>
                    <a
                      href="mailto:info@sentramedika.com"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      info@sentramedika.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Lokasi
                    </p>
                    <p className="text-sm text-slate-600">
                      Tersedia di seluruh rumah sakit Sentra Medika
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
              <h3 className="mb-2 text-lg font-semibold text-blue-900">
                Tertarik dengan Paket Ini?
              </h3>
              <p className="mb-4 text-sm text-slate-600">
                Hubungi kami untuk informasi lebih lanjut atau konsultasi
                mengenai paket medical tourism yang sesuai dengan kebutuhan Anda.
              </p>
              <Link
                href="/doctor"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Konsultasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

