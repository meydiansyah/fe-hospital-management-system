"use client";
import React, { useState, useEffect } from "react";
import { Search, Building2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// ==== Types ====
interface Doctor {
  id: number;
  name: string;
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
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cisalak",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Andhika Rachman, dr, Sp.PD-KHOM",
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Hemotologi Oknologi Medik",
    hospital: "Sentra Medika Cibinong",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Christy Efiyanti, dr, SpPD",
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cibinong",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "dr Abdullah Shidqul Azmi, Sp.PD",
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cisalak",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Andhika Rachman, dr, Sp.PD-KHOM",
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Hemotologi Oknologi Medik",
    hospital: "Sentra Medika Cisalak",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Christy Efiyanti, dr, SpPD",
    specialty: "Penyakit Dalam",
    subspecialty: "Subspesialis Penyakit Dalam",
    hospital: "Sentra Medika Cibinong",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
];

// ==== Custom Store (Mock Redux Slice) ====
const useDoctorStore = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState<boolean>(true);

  const fetchDoctors = async (filters: Partial<Filters> = {}) => {
    if (useMockData) {
      setDoctors(mockDoctors);
      return;
    }

    setLoading(true);
    try {
      const queryParams = new URLSearchParams(
        filters as Record<string, string>
      ).toString();
      const response = await fetch(`/api/doctors?${queryParams}`);
      const data = await response.json();
      setDoctors(data.doctors || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      setDoctors(mockDoctors);
    } finally {
      setLoading(false);
    }
  };

  return { doctors, loading, error, fetchDoctors, useMockData, setUseMockData };
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
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4 mb-4">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={100}
          height={100}
          className="w-20 h-20 rounded-lg object-cover"
        />
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
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Lihat Profil
        </button>
        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Buat Janji temu
        </button>
      </div>
    </div>
  );
};

// ==== Main Component ====
const DoctorSearch: React.FC = () => {
  const { doctors, loading, fetchDoctors, useMockData, setUseMockData } =
    useDoctorStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    location: "",
    specialty: "",
    subspecialty: "",
    gender: "",
    availability: "",
  });

  useEffect(() => {
    fetchDoctors(filters);
  }, [useMockData]);

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
    <div className="min-h-screen bg-gray-100 mt-30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cari Dokter</h1>
          <p className="text-gray-600">
            Temukan dengan mudah dokter yang tepat untuk kebutuhan Anda
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-96 shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-40">
              {/* Search Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari nama atau spesialisasi"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Filter Berdasarkan
                </h2>
                <button
                  onClick={handleResetFilters}
                  className="text-red-600 text-sm flex items-center gap-1 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                  Reset Filter
                </button>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <Dropdown
                  label="Lokasi"
                  value={filters.location}
                  onChange={(val) => setFilters({ ...filters, location: val })}
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
                  onChange={(val) => setFilters({ ...filters, specialty: val })}
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
                    setFilters({ ...filters, subspecialty: val })
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
                  onChange={(val) => setFilters({ ...filters, gender: val })}
                  options={["Semua", "Laki-laki", "Perempuan"]}
                  placeholder="Semua"
                />

                <Dropdown
                  label="Jadwal Ketersediaan Praktek"
                  value={filters.availability}
                  onChange={(val) =>
                    setFilters({ ...filters, availability: val })
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

              {/* Data Source Toggle */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useMockData}
                    onChange={(e) => setUseMockData(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Use Mock Data</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-700">
                <span className="font-semibold text-2xl">
                  {filteredDoctors.length}
                </span>{" "}
                Dokter ditemukan
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
