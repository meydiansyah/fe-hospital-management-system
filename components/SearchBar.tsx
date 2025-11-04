// components/SearchBar.js
"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  // Motion value for scroll
  const y = useMotionValue(0);
  const parallaxY = useTransform(y, [0, 500], [0, 80]); // Adjust intensity

  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  return (
    <motion.div
      style={{ y: parallaxY }}
      className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <form
        action="#"
        className="flex max-w-3xl mx-auto lg:mx-0 w-full lg:max-w-none relative  bg-gray-100 dark:bg-gray-950/60 border border-blue-100 dark:border-gray-950 overflow-hidden p-0.5 rounded-3xl before:absolute before:inset-1 before:bg-blue-50 dark:before:bg-gray-950 before:rounded-[1.25rem]"
      >
        <input
          type="text"
          placeholder={t("find_doctor_placeholder")}
          className="peer relative w-full bg-white dark:bg-gray-950 px-5 py-3 rounded-full outline-none text-gray-600 dark:text-gray-300"
        />
        <button className="absolute inset-y-1.5 right-1.5 bg-blue-600 text-white p-3 sm:px-6 flex items-center rounded-full">
          <span className="hidden sm:flex">{t("find")}</span>
          <span className="flex sm:hidden relative z-[5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </span>
        </button>
      </form>
    </motion.div>
  );
}
