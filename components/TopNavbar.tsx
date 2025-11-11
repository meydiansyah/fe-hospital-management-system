"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Phone,
  Instagram,
  Youtube,
  MapPin,
  Ambulance,
  Globe,
  MessageSquareText,
  Dot,
} from "lucide-react";
import { RootState } from "@/store";
import { setLanguage } from "@/store/slices/languageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  hideTopBar: boolean;
}

export default function TopBar({ hideTopBar }: TopBarProps) {
  const { t, i18n } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const dispatch = useDispatch();

  const changeLanguage = (newLang: string) => {
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.div
      className="h-[48px] border-b border-slate-200 bg-[#f8f9fd] text-xs text-slate-600 ease-in duration-400"
      style={{ y: hideTopBar ? -50 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="hidden w-full items-center gap-4 md:flex">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-medium">
              <Phone className="h-4 w-4" aria-hidden />
              {t("contact_us")}
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <a
              href="#instagram"
              className="flex items-center gap-2 hover:text-slate-900"
            >
              <Instagram className="h-4 w-4" aria-hidden />
              {t("topbar.instagram")}
            </a>
            <div className="h-4 w-px bg-slate-300" />
            <a
              href="#youtube"
              className="flex items-center gap-2 hover:text-slate-900"
            >
              <Youtube className="h-4 w-4" aria-hidden />
              {t("topbar.youtube")}
            </a>
            <div className="h-4 w-px bg-slate-300" />
            <Link
              href="/feedback"
              className="flex items-center gap-2 hover:text-slate-900"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden />
              {t("feedback.title")}
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-4 md:gap-6">
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4" aria-hidden />
              {t("topbar.activate_location")}
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2 font-medium text-red-600">
              <Ambulance className="h-4 w-4" aria-hidden />
              {t("topbar.er_24_hours")}
            </span>
            <div className="h-4 w-px bg-slate-300" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 rounded-full border border-transparent px-3 py-1 font-medium text-slate-600 hover:border-slate-200 hover:bg-white"
              >
                <Globe className="h-4 w-4" aria-hidden />
                <span className="uppercase">{lang}</span>
                <Dot className="h-4 w-4 text-red-500" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-sm">
              <DropdownMenuItem
                onClick={() => changeLanguage("en")}
                className={clsx(
                  "cursor-pointer",
                  lang === "en" && "bg-slate-100 font-medium"
                )}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("id")}
                className={clsx(
                  "cursor-pointer",
                  lang === "id" && "bg-slate-100 font-medium"
                )}
              >
                Bahasa Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
