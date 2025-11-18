"use client";

import Link from "next/link";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { getDescription } from "@/lib/dataTransformers";

const Footer = () => {
  const { hospitals, centerOfExcellences, hospitalsLoading, centerOfExcellencesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  // Transform hospitals data
  const footerHospitals = hospitals
    .filter((h) => h.is_active)
    .slice(0, 6)
    .map((hospital) => ({
      name: hospital.name,
      href: `/hospital/${hospital.slug}`,
    }));

  // Transform center of excellences data
  const footerCenters = centerOfExcellences
    .filter((c) => c.is_active)
    .slice(0, 7)
    .map((center) => ({
      name: getDescription(center.title) || center.name,
      href: `/center-of-excellence/${center.slug}`,
    }));

  const information = [
    { name: "Tentang Sentra Medika Hospital Group", href: "/about" },
    { name: "Panduan Pengunjung Rumah Sakit", href: "/visitor-guide" },
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Kebijakan Privasi", href: "/privacy" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/sentramedika",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@sentramedika",
      label: "YouTube",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/sentramedika",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/sentramedika",
      label: "Twitter",
    },
  ];

  return (
    <footer id="site-footer" className="bg-[#f2f4ff] text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Rumah Sakit Kami */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Rumah Sakit Kami
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {hospitalsLoading ? (
                <li className="text-slate-400">Memuat...</li>
              ) : footerHospitals.length > 0 ? (
                footerHospitals.map((hospital) => (
                  <li key={hospital.name}>
                    <Link
                      href={hospital.href}
                      className="transition-colors hover:text-slate-900"
                    >
                      {hospital.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400">Tidak ada data</li>
              )}
            </ul>
          </div>

          {/* Center of Excellence */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Center of Excellence
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {centerOfExcellencesLoading ? (
                <li className="text-slate-400">Memuat...</li>
              ) : footerCenters.length > 0 ? (
                footerCenters.map((center) => (
                  <li key={center.name}>
                    <Link
                      href={center.href}
                      className="transition-colors hover:text-slate-900"
                    >
                      {center.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400">Tidak ada data</li>
              )}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Informasi
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {information.map((info) => (
                <li key={info.name}>
                  <Link
                    href={info.href}
                    className="transition-colors hover:text-slate-900"
                  >
                    {info.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Ikuti Kami</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 transition hover:bg-slate-900 hover:text-white shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 sm:text-sm">
          <p>
            Copyright © {new Date().getFullYear()} Sentra Medika Group. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
