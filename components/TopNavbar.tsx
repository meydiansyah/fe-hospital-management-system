"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setLanguage } from "@/store/slices/languageSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, MessageSquareText } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

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
      className="bg-blue-900 h-[50px] text-white ease-in duration-400"
      style={{ y: hideTopBar ? -50 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex py-2 items-center justify-between">
          <div className="hidden md:flex items-center divide-x-2">
            {/* <div className="text-sm px-4 font-medium">{t("contact_us")}</div> */}
            <div className="flex py-2 items-center justify-between">
              <div className="hidden md:flex items-center divide-x-2 gap-4">
                <div className="text-sm pr-4 font-medium">
                  {t("contact_us")}
                </div>
                {/* <div className="flex space-x-6 text-sm px-4 font-medium transition-colors">
                  {navItems.slice(0, 2).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-gray-300 ease-in duration-200 transition-colors capitalize"
                  >
                    {item.label}
                  </Link>
                ))}
                </div> */}
                <Link
                  href="/feedback"
                  className="pr-4 flex items-center font-medium gap-1 hover:text-gray-300 ease-in duration-200 transition-colors capitalize"
                >
                  <MessageSquareText className="w-4 h-4" />
                  {t("feedback.title")}
                </Link>
              </div>
            </div>
          </div>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-800"
              >
                <Globe className="h-4 w-4 text-white" />
                <span className="uppercase text-white">{lang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => changeLanguage("en")}
                className={clsx(
                  "cursor-pointer",
                  lang === "en" && "bg-gray-100 font-medium"
                )}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("id")}
                className={clsx(
                  "cursor-pointer",
                  lang === "id" && "bg-gray-100 font-medium"
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
