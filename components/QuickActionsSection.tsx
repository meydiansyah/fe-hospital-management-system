"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Building2,
  UserCircle2,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: CalendarCheck,
    label: "Appointment",
    href: "/appointment",
  },
  {
    icon: Building2,
    label: "Hospital",
    href: "/hospital",
  },
  {
    icon: UserCircle2,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: MessageCircle,
    label: "Chat Us",
    href: "/contact",
  },
];

export default function QuickActionsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -160px 0px", threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMatch = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileView(event.matches);
    };
    handleMatch(mediaQuery);
    mediaQuery.addEventListener("change", handleMatch);
    return () => mediaQuery.removeEventListener("change", handleMatch);
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
  const actionVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-40 flex justify-center sm:bottom-6 sm:px-6 lg:px-8",
        isMobileView ? "bottom-0" : "bottom-4"
      )}
    >
      <motion.div
        className={cn(
          "pointer-events-auto w-full transition-all duration-300 ease-out",
          isMobileView
            ? "max-w-none rounded-none border-t border-blue-100 bg-white/98 px-4 py-2 shadow-[0_-8px_24px_-12px_rgba(37,99,235,0.35)]"
            : "max-w-lg rounded-[2.5rem] border border-blue-100 bg-white/95 px-2 py-2 shadow-xl shadow-blue-100/50 backdrop-blur-sm sm:max-w-3xl sm:px-4",
          footerVisible
            ? "translate-y-24 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        )}
        variants={cardVariants}
        initial="hidden"
        animate={footerVisible ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        layout
      >
        <div
          className={cn(
            "items-center gap-3 sm:grid-cols-4 sm:gap-4",
            isMobileView
              ? "grid grid-cols-4"
              : "grid grid-cols-2 justify-around sm:grid-cols-4"
          )}
        >
          {actions.map((action, i) => {
            return (
              <motion.div
                key={action.label}
                variants={actionVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                className="focus:outline-none transition ease-in-out duration-300"
                tabIndex={-1}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
              >
                <Link
                  href={action.href}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl border border-transparent p-2 text-center text-sm font-medium text-slate-600 transition hover:border-blue-100 hover:bg-blue-50 focus-visible:border-blue-200 focus-visible:bg-blue-50 outline-none group",
                    footerVisible && "pointer-events-none",
                    isMobileView && "gap-1 text-xs"
                  )}
                  tabIndex={0}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm transition group-hover:bg-rose-100 group-hover:text-rose-600 group-focus-visible:bg-rose-100 group-focus-visible:text-rose-600">
                    <action.icon className="h-6 w-6" />
                  </span>
                  {action.label}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
