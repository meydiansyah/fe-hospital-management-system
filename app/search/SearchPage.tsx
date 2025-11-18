"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { transformDoctor, getDescription } from "@/lib/dataTransformers";

type ListItem = {
  title: string;
  description: string;
  href: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const router = useRouter();

  const queryParam = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(queryParam);

  const {
    doctors,
    doctorsLoading,
    specializations,
    subSpecializations,
    offers,
    centerOfExcellences,
    articles,
    news,
  } = useSelector((state: RootState) => state.masterData);

  const filters = useMemo(
    () => t("searchPage.filters", { returnObjects: true }) as string[],
    [t]
  );

  // Filter data based on search query
  const searchQuery = queryParam.toLowerCase().trim();

  const filteredDoctors = useMemo(() => {
    if (!searchQuery) return [];
    return doctors
      .filter((d) => d.status !== "inactive")
      .filter(
        (d) =>
          d.full_name.toLowerCase().includes(searchQuery) ||
          d.bio?.toLowerCase().includes(searchQuery) ||
          d.specializations?.some((s) =>
            getDescription(s.title).toLowerCase().includes(searchQuery)
          )
      )
      .slice(0, 6)
      .map((doctor) => {
        const transformed = transformDoctor(doctor);
        return {
          slug: transformed.slug,
          name: transformed.name,
          title: transformed.specialty,
          hospital: transformed.hospital,
          image: transformed.image,
        };
      });
  }, [doctors, searchQuery]);

  const filteredSpecialties = useMemo(() => {
    if (!searchQuery) return [];
    const allSpecialties = [
      ...specializations.map((s) => ({
        title: getDescription(s.title),
        description: getDescription(s.description),
        href: `/doctor?specialty=${s.slug}`,
      })),
      ...subSpecializations.map((s) => ({
        title: getDescription(s.title),
        description: getDescription(s.description),
        href: `/doctor?specialty=${s.slug}`,
      })),
    ];
    return allSpecialties
      .filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery) ||
          s.description.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3);
  }, [specializations, subSpecializations, searchQuery]);

  const filteredOffers = useMemo(() => {
    if (!searchQuery) return [];
    return offers
      .filter((o) => o.is_active)
      .filter(
        (o) =>
          o.title.toLowerCase().includes(searchQuery) ||
          o.description.toLowerCase().includes(searchQuery) ||
          o.name.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map((offer) => ({
        title: offer.title || offer.name,
        description: offer.description,
        href: `/offers/${offer.slug}`,
      }));
  }, [offers, searchQuery]);

  const filteredCenterOfExcellence = useMemo(() => {
    if (!searchQuery) return [];
    return centerOfExcellences
      .filter((c) => c.is_active)
      .filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery) ||
          c.description.toLowerCase().includes(searchQuery) ||
          c.name.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map((coe) => ({
        title: coe.title,
        description: coe.description,
        href: `/center-of-excellence/${coe.slug}`,
      }));
  }, [centerOfExcellences, searchQuery]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return [];
    return articles
      .filter((a) => a.is_featured && a.published_at)
      .filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery) ||
          a.description.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map((article) => ({
        title: article.title,
        description: article.description,
        href: `/articles/${article.slug}`,
      }));
  }, [articles, searchQuery]);

  const filteredNews = useMemo(() => {
    if (!searchQuery) return [];
    return news
      .filter((n) => n.is_featured && n.published_at)
      .filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery) ||
          n.description.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map((newsItem) => ({
        title: newsItem.title,
        description: newsItem.description,
        href: `/news/${newsItem.slug}`,
      }));
  }, [news, searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className="mx-auto max-w-6xl pt-40 space-y-10 px-6 py-16 sm:px-8">
      <header className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-900">
            {t("searchPage.title")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={t("searchPage.searchPlaceholder")}
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
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("searchPage.sections.doctors")}
          </h2>
          <Link
            href="/doctor"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {t("searchPage.sections.seeAllDoctors")}
          </Link>
        </div>
        {doctorsLoading ? (
          <div className="text-center py-8">
            <p className="text-sm text-slate-500">Memuat data dokter...</p>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredDoctors.map((doctor) => (
              <Link
                key={doctor.slug}
                href={`/doctor/${doctor.slug}`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-5 shadow-md shadow-slate-200/30 transition hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-blue-50">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-slate-900">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-slate-500">{doctor.title}</p>
                    <p className="text-sm font-medium text-blue-600">
                      {doctor.hospital}
                    </p>
                  </div>
                </div>
                <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-blue-700">
                  {t("searchPage.doctorCard.book")}
                </span>
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <p className="text-sm text-slate-500">
            Tidak ada dokter yang ditemukan untuk &quot;{queryParam}&quot;.
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            Masukkan kata kunci untuk mencari dokter.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("searchPage.sections.specialties")}
          </h2>
          <Link
            href="/doctor"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {t("searchPage.sections.seeAll")}
          </Link>
        </div>
        {filteredSpecialties.length > 0 ? (
          <div className="space-y-3">
            {filteredSpecialties.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-blue-50/40 p-4 text-sm text-slate-600 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-blue-600 shadow-sm">
                  {t("searchPage.specialtyTag")}
                </span>
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <p className="text-sm text-slate-500">
            Tidak ada spesialisasi yang ditemukan untuk &quot;{queryParam}
            &quot;.
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            Masukkan kata kunci untuk mencari spesialisasi.
          </p>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <SearchListSection
          title={t("searchPage.sections.specialOffers")}
          items={filteredOffers}
          searchQuery={searchQuery}
        />
        <SearchListSection
          title={t("searchPage.sections.coe")}
          items={filteredCenterOfExcellence}
          searchQuery={searchQuery}
        />
        <SearchListSection
          title={t("searchPage.sections.healthArticles")}
          items={filteredArticles}
          searchQuery={searchQuery}
        />
        <SearchListSection
          title={t("searchPage.sections.news")}
          items={filteredNews}
          searchQuery={searchQuery}
          emptyState={t("searchPage.sections.noResults")}
        />
      </div>
    </div>
  );
}

function SearchListSection({
  title,
  items,
  searchQuery,
  emptyState,
}: {
  title: string;
  items: ListItem[];
  searchQuery: string;
  emptyState?: string;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/40">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <Link
          href="#"
          className={clsx(
            "text-sm font-medium text-blue-600",
            items.length === 0 && "invisible"
          )}
        >
          Semua
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">
          {searchQuery
            ? emptyState || `Tidak ada hasil untuk "${searchQuery}".`
            : "Masukkan kata kunci untuk mencari."}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              href={item.href}
              className="flex flex-col rounded-2xl border border-transparent bg-blue-50/30 p-4 text-sm transition hover:border-blue-100 hover:bg-blue-50"
            >
              <span className="font-semibold text-slate-900">{item.title}</span>
              <span className="text-xs text-slate-500">{item.description}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
