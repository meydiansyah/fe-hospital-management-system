"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Building2, Filter, X } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { slugify } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// ==== Types ====
import { transformDoctor } from "@/lib/dataTransformers";

interface Doctor {
  id: number;
  name: string;
  slug: string;
  specialty: string;
  subspecialty: string;
  hospital: string;
  image: string;
}

interface Filters {
  location: string;
  specialty: string;
  subspecialty: string;
  gender: string;
  availability: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

// ==== Mock Data ====
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "dr Abdullah Shidqul Azmi, Sp.PD",
    slug: slugify("dr Abdullah Shidqul Azmi, Sp.PD"),
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cisalak",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Andhika Rachman, dr, Sp.PD-KHOM",
    slug: slugify("Andhika Rachman, dr, Sp.PD-KHOM"),
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Hemotologi Oknologi Medik",
    hospital: "Sentra Medika Cibinong",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Christy Efiyanti, dr, SpPD",
    slug: slugify("Christy Efiyanti, dr, SpPD"),
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cibinong",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "dr Abdullah Shidqul Azmi, Sp.PD",
    slug: slugify("dr Abdullah Shidqul Azmi, Sp.PD"),
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cisalak",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Andhika Rachman, dr, Sp.PD-KHOM",
    slug: slugify("Andhika Rachman, dr, Sp.PD-KHOM"),
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Hemotologi Oknologi Medik",
    hospital: "Sentra Medika Cisalak",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Christy Efiyanti, dr, SpPD",
    slug: slugify("Christy Efiyanti, dr, SpPD"),
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cibinong",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
];

// ==== Custom Store (Using Redux) ====
const useDoctorStore = () => {
  const { doctors: apiDoctors, doctorsLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const transformedDoctors: Doctor[] = apiDoctors
    .filter((d) => d.status !== "inactive")
    .map((doctor) => {
      const transformed = transformDoctor(doctor);
      return {
        id: transformed.id,
        name: transformed.name,
        slug: transformed.slug,
        specialty: transformed.specialty,
        subspecialty: transformed.subspecialty,
        hospital: transformed.hospital,
        image: transformed.image,
      };
    });

  return {
    doctors: transformedDoctors.length > 0 ? transformedDoctors : mockDoctors,
    loading: doctorsLoading,
    error: null,
    useMockData: transformedDoctors.length === 0,
    setUseMockData: () => {},
  };
};

// ==== Dropdown Component ====
const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// ==== Doctor Card Component ====
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4 mb-4">
        <Link href={`/doctor/${doctor.slug}`} className="block">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={100}
            height={100}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </Link>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {doctor.name}
          </h3>
          <p className="font-medium text-gray-700 mb-1">{doctor.specialty}</p>
          <p className="text-sm text-gray-500">{doctor.subspecialty}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <Building2 className="w-4 h-4" />
        <span className="text-sm">{doctor.hospital}</span>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/doctor/${doctor.slug}`}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
        >
          {t("doctor_page.view_profile")}
        </Link>
        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          {t("doctor_page.make_appointment")}
        </button>
      </div>
    </div>
  );
};

interface FiltersContentProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;
  onReset: () => void;
  t: TFunction;
}

const FiltersContent: React.FC<FiltersContentProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  useMockData,
  setUseMockData,
  onReset,
  t,
}) => (
  <div className="space-y-6">
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-12 pr-4 text-sm text-gray-700 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>

    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <h2 className="text-lg font-semibold text-gray-900">
        {t("doctor_page.filters_title")}
      </h2>
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-sm font-medium text-red-600 transition hover:text-red-700"
      >
        <X className="h-4 w-4" />
        {t("doctor_page.reset")}
      </button>
    </div>

    <div className="space-y-4">
      <Dropdown
        label="Lokasi"
        value={filters.location}
        onChange={(val) => setFilters((prev) => ({ ...prev, location: val }))}
        options={[
          "Semua Rumah Sakit",
          "Sentra Medika Cisalak",
          "Sentra Medika Cibinong",
        ]}
        placeholder="Semua Rumah Sakit"
      />

      <Dropdown
        label="Spesialis"
        value={filters.specialty}
        onChange={(val) => setFilters((prev) => ({ ...prev, specialty: val }))}
        options={[
          "Semua Spesialis",
          "Penyakit Dalam",
          "Bedah",
          "Anak",
          "Jantung",
        ]}
        placeholder="Semua Spesialis"
      />

      <Dropdown
        label="Subspesialis"
        value={filters.subspecialty}
        onChange={(val) =>
          setFilters((prev) => ({ ...prev, subspecialty: val }))
        }
        options={[
          "Semua Subspesialis",
          "Hemotologi Oknologi Medik",
          "Gastroenterologi",
        ]}
        placeholder="Semua Subspesialis"
      />

      <Dropdown
        label="Jenis Kelamin"
        value={filters.gender}
        onChange={(val) => setFilters((prev) => ({ ...prev, gender: val }))}
        options={["Semua", "Laki-laki", "Perempuan"]}
        placeholder="Semua"
      />

      <Dropdown
        label="Jadwal Ketersediaan Praktek"
        value={filters.availability}
        onChange={(val) =>
          setFilters((prev) => ({ ...prev, availability: val }))
        }
        options={[
          "Semua Hari",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ]}
        placeholder="Semua Hari"
      />
    </div>

    <div className="border-t border-gray-200 pt-4">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={useMockData}
          onChange={(e) => setUseMockData(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
        />
        Gunakan data simulasi
      </label>
    </div>
  </div>
);

// ==== Main Component ====
const DoctorSearch: React.FC = () => {
  const { t } = useTranslation();
  const { doctors, loading, useMockData, setUseMockData } = useDoctorStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    location: "",
    specialty: "",
    subspecialty: "",
    gender: "",
    availability: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // useEffect(() => {
  //   fetchDoctors(filters);
  // }, [useMockData]);

  const handleResetFilters = () => {
    setFilters({
      location: "",
      specialty: "",
      subspecialty: "",
      gender: "",
      availability: "",
    });
    setSearchQuery("");
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("doctor_page.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            {t("doctor_page.subtitle")}
          </p>
        </div>

        {/* Mobile filter trigger */}
        <div className="mb-6 md:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {t("doctor_page.filters_title")}
                </p>
                <p className="text-xs text-gray-500">
                  {t("doctor_page.subtitle")}
                </p>
              </div>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <Filter className="h-4 w-4" />
                  {t("doctor_page.open_filters", { defaultValue: "Filter" })}
                </button>
              </SheetTrigger>
            </div>
            <SheetContent
              side="left"
              className="w-full max-w-md overflow-y-auto px-6 pb-10 pt-8"
            >
              <FiltersContent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={filters}
                setFilters={setFilters}
                useMockData={useMockData}
                setUseMockData={setUseMockData}
                onReset={handleResetFilters}
                t={t}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar Filters */}
          <aside className="hidden w-full max-w-xs shrink-0 lg:block xl:max-w-sm">
            <div className="sticky top-32 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <FiltersContent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={filters}
                setFilters={setFilters}
                useMockData={useMockData}
                setUseMockData={setUseMockData}
                onReset={handleResetFilters}
                t={t}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-700 shadow-sm">
              <span>
                <span className="text-2xl font-semibold text-gray-900">
                  {filteredDoctors.length}
                </span>{" "}
                {t("doctor_page.result_suffix", {
                  defaultValue: "Dokter ditemukan",
                })}
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="hidden items-center gap-1 text-xs font-semibold text-red-600 transition hover:text-red-700 sm:inline-flex"
              >
                <X className="h-3.5 w-3.5" />
                {t("doctor_page.reset")}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
