"use client";

import {
  CalendarCheck,
  Building2,
  UserCircle2,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

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

export default function FloatingActionsSection() {
  return (
    <section className="relative z-30 -mt-20 px-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="flex flex-col gap-6 rounded-[2.5rem] border-none bg-white/95 p-6 shadow-2xl shadow-blue-100/50 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-8">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex flex-1 flex-col items-center gap-3 text-center text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-inner shadow-rose-100 transition group-hover:scale-105 group-hover:bg-rose-100">
                <action.icon className="h-6 w-6" />
              </span>
              {action.label}
            </Link>
          ))}
        </Card>
      </div>
    </section>
  );
}

