"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { getDescription } from "@/lib/dataTransformers";

interface MainNavProps {
  hideTopBar: boolean;
}

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: string }[];
}

export default function MainNav({ hideTopBar }: MainNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { hospitals, centerOfExcellences } = useSelector((state: RootState) => state.masterData);

  // Transform hospitals for dropdown
  const hospitalChildren = useMemo(() => {
    const activeHospitals = hospitals
      .filter((h) => h.is_active)
      .slice(0, 6)
      .map((hospital) => {
        // Get first image from images array
        let iconUrl: string | undefined;
        if (hospital.images && hospital.images.length > 0) {
          const firstImage = hospital.images[0];
          iconUrl = typeof firstImage === "string" ? firstImage : firstImage.url;
        }
        return {
          label: hospital.name,
          href: `/hospital/${hospital.slug}`,
          icon: iconUrl,
        };
      });

    // If no hospitals from API, use fallback data
    const hospitalsToShow =
      activeHospitals.length > 0
        ? activeHospitals
        : [
            {
              label: "RS Harapan Bunda",
              href: "/hospital/harapan-bunda",
              icon: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&q=80",
            },
            {
              label: "Sentra Medika Hospital Cibinong",
              href: "/hospital/cibinong",
              icon: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=200&q=80",
            },
            {
              label: "Sentra Medika Hospital Cikarang",
              href: "/hospital/cikarang",
              icon: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=200&q=80",
            },
            {
              label: "Sentra Medika Hospital Cisalak",
              href: "/hospital/cisalak",
              icon: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=200&q=80",
            },
            {
              label: "Sentra Medika Hospital Gempol",
              href: "/hospital/gempol",
              icon: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=200&q=80",
            },
            {
              label: "Sentra Medika Hospital Minahasa Utara",
              href: "/hospital/minahasa-utara",
              icon: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=200&q=80",
            },
          ];

    return [{ label: "Lihat Semua", href: "/hospital" }, ...hospitalsToShow];
  }, [hospitals, t]);

  // Transform center of excellences for dropdown
  const centerChildren = useMemo(() => {
    const activeCenters = centerOfExcellences
      .filter((c) => c.is_active)
      .slice(0, 6)
      .map((center) => ({
        label: getDescription(center.title) || center.name,
        href: `/center-of-excellence/${center.slug}`,
      }));

    return activeCenters.length > 0
      ? activeCenters
      : [
          {
            label: "Suherman Widyatomo Integrated Cancer Center (SWICC)",
            href: "/center-of-excellence/swicc",
            icon: "/SWICC.png",
          },
          {
            label: "Golden Hearth (Cardiovascular Center)",
            href: "/center-of-excellence/golden-hearth",
            icon: "/GoldenHeart.png",
          },
          {
            label: "Stroke Center",
            href: "/center-of-excellence/stroke-center",
            icon: "/icon/hospital-facility/brain-center.svg",
          },
          {
            label: "Uronephrology Center",
            href: "/center-of-excellence/uronephrology-center",
            icon: "/icon/hospital-facility/pcnl.svg",
          },
        ];
  }, [centerOfExcellences]);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Cari Dokter", href: "/doctor" },
      {
        label: "Rumah Sakit",
        href: "/hospital",
        children: hospitalChildren,
      },
      {
        label: "Centers of Excellence",
        href: "/center-of-excellence",
        children: [{ label: "Lihat Semua", href: "/center-of-excellence" }, ...centerChildren],
      },
      {
        label: "Teknologi Medis",
        href: "/technology",
        children: [
          { label: "Lihat Semua", href: "/technology" },
          { label: "Linac", href: "/technology/linac" },
          { label: "Brakiterapi", href: "/technology/brakiterapi" },
          { label: "MRI", href: "/technology/mri" },
          { label: "Lasik", href: "/technology/lasik" },
        ],
      },
      {
        label: "Mitra",
        href: "/partner",
        children: [
          { label: "Lihat Semua", href: "/partner" },
          { label: "Mitra Penjamin", href: "/partner/penjamin" },
          { label: "Mitra Korporasi", href: "/partner/korporasi" },
        ],
      },
      {
        label: "SMHG Media",
        href: "/media",
        children: [
          { label: "Lihat Semua", href: "/media" },
          { label: "Sentra Update", href: "/news" },
          { label: "Artikel Kesehatan", href: "/article" },
          { label: "e-Brosur SMHG", href: "/brochure" },
          { label: "Sentra Stage", href: "/stage" },
        ],
      },
    ],
    [hospitalChildren, centerChildren]
  );

  return (
    <motion.div
      style={{ y: hideTopBar ? -35 : 0 }}
      transition={{ type: "tween", duration: 0.45 }}
      className="bg-white ease-in duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="relative h-14 w-52 shrink-0 sm:w-60 lg:w-72">
            <Image src="/smhg-logo.webp" alt="SMHG Logo" fill className="object-contain" priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-end gap-6 md:flex md:capitalize">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={clsx(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none cursor-pointer",
                        pathname.startsWith(item.href)
                          ? "text-primary font-semibold"
                          : "text-gray-600"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.href}
                        asChild
                        className={clsx(
                          pathname === child.href && "bg-gray-100 font-medium",
                          "py-3"
                        )}
                      >
                        <Link href={child.href} className="flex items-center gap-4 cursor-pointer">
                          {child.icon && (
                            <div className="relative h-12 w-12 shrink-0 rounded-lg bg-slate-100 p-2">
                              <Image
                                src={child.icon}
                                alt={child.label}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                          )}
                          <span className="flex-1 text-sm leading-tight">{child.label}</span>
                          {child.label === "Lihat Semua" && (
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                          )}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary font-semibold" : "text-gray-600"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* CTA */}
            <Link href="/login">
              <Button className="rounded-md bg-primary text-white hover:bg-primary/90 cursor-pointer">
                Masuk/Daftar
              </Button>
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Masuk/Daftar
              </Button>
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t("open_menu") ?? "Open menu"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-primary/40 hover:text-primary"
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs px-0 pb-10">
                <div className="flex items-center justify-between px-6 pb-4 pt-6">
                  <Link
                    href="/"
                    className="relative h-10 w-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image src="/smhg-logo.webp" alt="SMHG Logo" fill className="object-contain" />
                  </Link>
                  <button
                    type="button"
                    aria-label={t("close_menu") ?? "Close menu"}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-primary/40 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
                <nav className="space-y-2 px-6">
                  {navItems.map((item) =>
                    item.children ? (
                      <div key={item.href} className="space-y-1">
                        <Link
                          href={item.href}
                          className={clsx(
                            "block rounded-lg px-4 py-3 text-base font-semibold transition hover:bg-primary/5",
                            pathname.startsWith(item.href)
                              ? "bg-primary/5 text-primary"
                              : "text-slate-700"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={clsx(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition hover:bg-primary/5",
                                pathname === child.href
                                  ? "bg-primary/5 font-medium text-primary"
                                  : "text-slate-600"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.icon && (
                                <div className="relative h-10 w-10 shrink-0 rounded-lg bg-slate-100 p-1.5">
                                  <Image
                                    src={child.icon}
                                    alt={child.label}
                                    fill
                                    className="object-contain p-0.5"
                                  />
                                </div>
                              )}
                              <span className="flex-1 leading-tight">{child.label}</span>
                              {child.label === "Lihat Semua" && (
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          "block rounded-lg px-4 py-3 text-base font-semibold transition hover:bg-primary/5",
                          pathname === item.href ? "bg-primary/5 text-primary" : "text-slate-700"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
                <div className="px-6 pt-6">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full bg-primary py-3 text-base font-semibold text-white hover:bg-primary/90">
                      Masuk/Daftar
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
