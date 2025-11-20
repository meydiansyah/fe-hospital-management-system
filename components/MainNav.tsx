"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDown, Menu, X } from "lucide-react";
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
  onGetStarted: () => void;
}

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export default function MainNav({ hideTopBar, onGetStarted }: MainNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { hospitals, centerOfExcellences } = useSelector(
    (state: RootState) => state.masterData
  );

  // Transform hospitals for dropdown
  const hospitalChildren = useMemo(() => {
    const activeHospitals = hospitals
      .filter((h) => h.is_active)
      .slice(0, 6)
      .map((hospital) => ({
        label: hospital.name,
        href: `/hospital/${hospital.slug}`,
      }));

    // Add static items if needed
    return [
      { label: t("hospital_list") || "Daftar Rumah Sakit", href: "/hospital" },
      ...activeHospitals,
    ];
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
            label: t("cardiology") || "Cardiology",
            href: "/center-of-excellence/cardiology",
          },
          {
            label: t("oncology") || "Oncology",
            href: "/center-of-excellence/oncology",
          },
          {
            label: t("orthopedic") || "Orthopedic",
            href: "/center-of-excellence/orthopedic",
          },
        ];
  }, [centerOfExcellences, t]);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: t("doctor"), href: "/doctor" },
      {
        label: t("hospital"),
        href: "/hospital",
        children: hospitalChildren,
      },
      {
        label: t("center-of-excelence") || "Center of Excellence",
        href: "/center-of-excellence",
        children: centerChildren,
      },
      { label: t("nav_technology"), href: "/technology" },
      { label: t("nav_partner"), href: "/partner" },
      { label: t("media"), href: "/media" },
    ],
    [t, hospitalChildren, centerChildren]
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
          <Link
            href="/"
            className="relative h-14 w-52 shrink-0 sm:w-60 lg:w-72"
          >
            <Image
              src="/smhg-logo.webp"
              alt="SMHG Logo"
              fill
              className="object-contain"
              priority
            />
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
                  <DropdownMenuContent align="start" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.href}
                        asChild
                        className={clsx(
                          pathname === child.href && "bg-gray-100 font-medium"
                        )}
                      >
                        <Link href={child.href} className="cursor-pointer">
                          {child.label}
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
                    pathname === item.href
                      ? "text-primary font-semibold"
                      : "text-gray-600"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* CTA */}
            <Button
              className="rounded-md bg-primary text-white hover:bg-primary/90 cursor-pointer"
              onClick={onGetStarted}
            >
              {t("get_started") ?? "Get Started"}
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              size="sm"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              onClick={onGetStarted}
            >
              {t("get_started") ?? "Get Started"}
            </Button>
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
                    <Image
                      src="/smhg-logo.webp"
                      alt="SMHG Logo"
                      fill
                      className="object-contain"
                    />
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
                                "block rounded-lg px-4 py-2 text-sm transition hover:bg-primary/5",
                                pathname === child.href
                                  ? "bg-primary/5 font-medium text-primary"
                                  : "text-slate-600"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
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
                          pathname === item.href
                            ? "bg-primary/5 text-primary"
                            : "text-slate-700"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
                <div className="px-6 pt-6">
                  <Button
                    className="w-full rounded-full bg-primary py-3 text-base font-semibold text-white hover:bg-primary/90"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onGetStarted();
                    }}
                  >
                    {t("get_started") ?? "Get Started"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
