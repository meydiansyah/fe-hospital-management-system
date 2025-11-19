"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Map } from "lucide-react";
export type HospitalContact = {
  name: string;
  address: string;
  openingHours: {
    morning: string;
    afternoon: string;
  };
  mapUrl: string;
  mapEmbedUrl: string;
  socialMedia: {
    tiktok?: string;
    facebook?: string;
    instagram?: string;
  };
  guideUrl?: string;
};

const defaultContact: HospitalContact = {
  name: "Sentra Medika Hospital Cibinong",
  address:
    "Jl. Raya Mayor Oking Jaya Atmaja No.9, Cibinong, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16911",
  openingHours: {
    morning: "Pagi: 11:00 WIB s/d 13:00WIB",
    afternoon: "Sore: 17.00 WIB s/d 19.00 WIB",
  },
  mapUrl: "https://maps.google.com/?q=-6.4816,106.8540",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6!2d106.8540!3d-6.4816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjgnNTMuOCJTIDEwNsKwNTEnMTQuNCJF!5e0!3m2!1sen!2sid!4v1234567890",
  socialMedia: {
    tiktok: "https://tiktok.com/@sentramedika",
    facebook: "https://facebook.com/sentramedika",
    instagram: "https://instagram.com/sentramedika",
  },
  guideUrl: "/visitor-guide",
};

export default function HospitalContactSection({ contact }: { contact?: HospitalContact }) {
  const contactData = contact ?? defaultContact;

  return (
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={contactData.mapEmbedUrl}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[400px] w-full lg:h-[500px]"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="order-1 flex flex-col justify-center space-y-6 lg:order-2">
            {/* Title */}
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Kami siap melayani kunjungan Anda
            </h2>

            {/* Opening Hours */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900">Waktu Kunjungan Pasien</h3>
              <div className="flex items-start gap-3 text-slate-600">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div className="space-y-1 text-sm">
                  <p>{contactData.openingHours.morning}</p>
                  <p>{contactData.openingHours.afternoon}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-sm leading-relaxed">{contactData.address}</p>
              </div>
            </div>

            {/* Petunjuk Arah Button */}
            <div>
              <Link
                href={contactData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[37px] w-[162px] items-center justify-center gap-2.5 rounded-[5px] bg-[#262B7E] p-2.5 text-sm font-semibold text-white transition hover:bg-[#1a1f5c]"
              >
                <Map className="h-5 w-5" />
                Petunjuk Arah
              </Link>
            </div>

            {/* Visitor Guide Link */}
            {contactData.guideUrl && (
              <Link
                href={contactData.guideUrl}
                className="inline-flex items-center text-sm font-semibold text-[#262B7E] transition hover:text-[#1a1f5c]"
              >
                Lihat Panduan Pengunjung Rumah Sakit
                <span className="ml-1" aria-hidden="true">
                  →
                </span>
              </Link>
            )}

            {/* Social Media */}
            <div className="flex items-center gap-4 pt-4">
              {contactData.socialMedia.tiktok && (
                <Link
                  href={contactData.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-70"
                  aria-label="TikTok"
                >
                  <Image
                    src="/icon/social-media/tiktok.svg"
                    alt="TikTok"
                    width={17}
                    height={20}
                    className="h-5 w-[17px]"
                  />
                </Link>
              )}
              {contactData.socialMedia.facebook && (
                <Link
                  href={contactData.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-70"
                  aria-label="Facebook"
                >
                  <Image
                    src="/icon/social-media/facebook.svg"
                    alt="Facebook"
                    width={17}
                    height={20}
                    className="h-5 w-[17px]"
                  />
                </Link>
              )}
              {contactData.socialMedia.instagram && (
                <Link
                  href={contactData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-70"
                  aria-label="Instagram"
                >
                  <Image
                    src="/icon/social-media/instagram.svg"
                    alt="Instagram"
                    width={17}
                    height={20}
                    className="h-5 w-[17px]"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
