"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

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

  const navItems: NavItem[] = [
    { label: t("doctor"), href: "/doctor" },
    {
      label: t("hospital"),
      href: "/hospital",
      children: [
        { label: t("hospital_list"), href: "/hospital/list" },
        { label: t("our_facilities"), href: "/hospital/facilities" },
        { label: t("patient_services"), href: "/hospital/services" },
      ],
    },
    {
      label: t("center-of-excelence"),
      href: "/center-of-excelence",
      children: [
        { label: t("cardiology"), href: "/center-of-excelence/cardiology" },
        { label: t("oncology"), href: "/center-of-excelence/oncology" },
        { label: t("orthopedic"), href: "/center-of-excelence/orthopedic" },
      ],
    },
    { label: t("technology"), href: "/technology" },
    { label: t("partner"), href: "/partner" },
    { label: t("media"), href: "/media" },
  ];

  return (
    <motion.div
      style={{ y: hideTopBar ? -50 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="bg-white ease-in duration-400"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className=" xl:w-72 w-60 relative h-14">
            <Image
              src="/smhg-logo.webp"
              alt="SMHG Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6 capitalize">
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
        </div>
      </div>
    </motion.div>
  );
}
