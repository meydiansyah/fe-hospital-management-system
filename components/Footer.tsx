import Link from "next/link";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const hospitals = [
    { name: "Sentra Medika Cibinong", href: "/hospitals/cibinong" },
    { name: "Sentra Medika Cikarang", href: "/hospitals/cikarang" },
    { name: "Sentra Medika Cisalak", href: "/hospitals/cisalak" },
    { name: "Sentra Medika Minahasa Utara", href: "/hospitals/minahasa-utara" },
    { name: "Sentra Medika Gempol", href: "/hospitals/gempol" },
    { name: "RS Harapan Bunda", href: "/hospitals/harapan-bunda" },
  ];

  const centers = [
    {
      name: "Soeherman Widyatomo Integrated Cancer Center (SWICC)",
      href: "/centers/swicc",
    },
    {
      name: "Cardiovascular & Brain Center",
      href: "/centers/cardiovascular-brain",
    },
    { name: "Jakarta Timur Eye Center (JTEC)", href: "/centers/jtec" },
    { name: "Medical Rehabilitation Center", href: "/centers/rehabilitation" },
    { name: "Trauma Center", href: "/centers/trauma" },
    {
      name: "Integrated Women & Child Healthcare",
      href: "/centers/women-child",
    },
    {
      name: "Geriatric & Diabetic Center",
      href: "/centers/geriatric-diabetic",
    },
  ];

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
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Rumah Sakit Kami */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Rumah Sakit Kami
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {hospitals.map((hospital) => (
                <li key={hospital.name}>
                  <Link
                    href={hospital.href}
                    className="transition-colors hover:text-slate-900"
                  >
                    {hospital.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center of Excellence */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Center of Excellence
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {centers.map((center) => (
                <li key={center.name}>
                  <Link
                    href={center.href}
                    className="transition-colors hover:text-slate-900"
                  >
                    {center.name}
                  </Link>
                </li>
              ))}
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
