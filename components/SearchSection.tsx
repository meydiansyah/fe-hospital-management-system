"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

export default function SearchSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:py-16">
      <header className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-[26px]">
          {t("searchSection.titleLine1")}
        </h2>
        <p className="mt-1 text-2xl font-semibold text-slate-900 sm:text-[26px]">
          {t("searchSection.titleLine2")}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchSection.placeholder")}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {t("searchSection.searchButton")}
        </button>
      </form>
    </section>
  );
}
