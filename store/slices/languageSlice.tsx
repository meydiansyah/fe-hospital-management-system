import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LanguageState = {
  lang: string;
};

const initialState: LanguageState = {
  lang:
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { useTranslation } from "react-i18next";
// import { Search, MapPin, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { motion } from "framer-motion";

// // -----------------------------
// // Types
// // -----------------------------
// interface Doctor {
//   id: number;
//   name: string;
//   specialization: string;
//   subspecialization: string;
//   hospital: string;
//   image: string;
// }

// interface FilterSelectOption {
//   value: string;
//   label: string;
// }

// interface FilterSelectProps {
//   label: string;
//   value: string;
//   options: FilterSelectOption[];
//   onChange?: (value: string) => void;
// }

// interface DoctorCardProps {
//   doctor: Doctor;
// }

// // -----------------------------
// // Mock Data
// // -----------------------------
// const mockDoctors: Doctor[] = [
//   {
//     id: 1,
//     name: "dr Abdullah Shidqul Azmi, Sp.PD",
//     specialization: "Penyakit Dalam",
//     subspecialization: "Subspesialis Penyakit Dalam",
//     hospital: "Sentra Medika Cisalak",
//     image:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Andhika Rachman, dr, Sp.PD-KHOM",
//     specialization: "Penyakit Dalam",
//     subspecialization: "Subspesialis Hemotologi Oknologi Medik",
//     hospital: "Sentra Medika Cibinong",
//     image:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Christy Efiyanti, dr, SpPD",
//     specialization: "Penyakit Dalam",
//     subspecialization: "Subspesialis Penyakit Dalam",
//     hospital: "Sentra Medika Cibinong",
//     image:
//       "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
//   },
//   {
//     id: 4,
//     name: "dr Abdullah Shidqul Azmi, Sp.PD",
//     specialization: "Penyakit Dalam",
//     subspecialization: "Subspesialis Penyakit Dalam",
//     hospital: "Sentra Medika Cisalak",
//     image:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
//   },
//   {
//     id: 5,
//     name: "Christy Efiyanti, dr, SpPD",
//     specialization: "Penyakit Dalam",
//     subspecialization: "Subspesialis Penyakit Dalam",
//     hospital: "Sentra Medika Cibinong",
//     image:
//       "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
//   },
//   {
//     id: 6,
//     name: "dr Abdullah Shidqul Azmi, Sp.PD",
//     specialization: "Penyakit Dalam",
//     subspecialization: "Subspesialis Penyakit Dalam",
//     hospital: "Sentra Medika Cisalak",
//     image:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
//   },
// ];

// // -----------------------------
// // Components
// // -----------------------------
// const FilterSelect: React.FC<FilterSelectProps> = ({
//   label,
//   value,
//   options,
//   onChange,
// }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label}
//     </label>
//     <div className="relative">
//       <select
//         value={value}
//         onChange={(e) => onChange?.(e.target.value)}
//         className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
//       >
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//     </div>
//   </div>
// );

// const DoctorCard: React.FC<DoctorCardProps> = React.memo(({ doctor }) => {
//   const { t } = useTranslation();

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 25 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between p-6 hover:shadow-md transition-all"
//     >
//       <div className="flex gap-4 flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
//         <div className="relative w-24 h-24 flex-shrink-0">
//           <Image
//             src={doctor.image}
//             alt={doctor.name}
//             fill
//             className="rounded-lg object-cover"
//             sizes="96px"
//           />
//         </div>

//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-1">
//             {doctor.name}
//           </h3>
//           <p className="text-red-600 font-medium mb-1">
//             {doctor.specialization}
//           </p>
//           <p className="text-sm text-gray-600 mb-3">
//             {doctor.subspecialization}
//           </p>
//           <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
//             <MapPin className="w-4 h-4" />
//             <span>{doctor.hospital}</span>
//           </div>
//         </div>
//       </div>

//       {/* Buttons at bottom */}
//       <div className="flex gap-3 mt-6">
//         <button className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//           {t("doctor_page.view_profile")}
//         </button>
//         <button className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors">
//           {t("doctor_page.make_appointment")}
//         </button>
//       </div>
//     </motion.div>
//   );
// });
// DoctorCard.displayName = "DoctorCard";

// // -----------------------------
// // Main Page Component
// // -----------------------------
// const DoctorSearchPage: React.FC = () => {
//   const { t } = useTranslation();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({
//     location: "",
//     specialization: "",
//     subspecialization: "",
//     gender: "",
//     schedule: "",
//   });

//   const updateFilter = (key: keyof typeof filters, value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 mt-30">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {t("doctor_page.title")}
//             </h1>
//             <p className="text-gray-600">{t("doctor_page.subtitle")}</p>
//           </div>

//           {/* ShadCN Sheet Trigger (Mobile Filter) */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button className="xl:hidden bg-red-600 text-white hover:bg-red-700">
//                 {t("doctor_page.filter_title")}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className=" p-6 overflow-auto ">
//               <SheetHeader>
//                 <SheetTitle>{t("doctor_page.filter_title")}</SheetTitle>
//               </SheetHeader>

//               {/* Search */}
//               <div className="mb-6">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder={t("doctor_page.search_placeholder")}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Filters */}
//               <FilterSelect
//                 label={t("doctor_page.location")}
//                 value={filters.location}
//                 onChange={(val) => updateFilter("location", val)}
//                 options={[{ value: "", label: t("doctor_page.all_hospitals") }]}
//               />
//               <FilterSelect
//                 label={t("doctor_page.specialization")}
//                 value={filters.specialization}
//                 onChange={(val) => updateFilter("specialization", val)}
//                 options={[
//                   { value: "", label: t("doctor_page.all_specializations") },
//                 ]}
//               />
//               <FilterSelect
//                 label={t("doctor_page.subspecialization")}
//                 value={filters.subspecialization}
//                 onChange={(val) => updateFilter("subspecialization", val)}
//                 options={[
//                   { value: "", label: t("doctor_page.all_subspecializations") },
//                 ]}
//               />
//               <FilterSelect
//                 label={t("doctor_page.gender")}
//                 value={filters.gender}
//                 onChange={(val) => updateFilter("gender", val)}
//                 options={[{ value: "", label: t("doctor_page.all_genders") }]}
//               />
//               <FilterSelect
//                 label={t("doctor_page.practice_schedule")}
//                 value={filters.schedule}
//                 onChange={(val) => updateFilter("schedule", val)}
//                 options={[{ value: "", label: t("doctor_page.all_days") }]}
//               />
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col xl:flex-row gap-6">
//         {/* Filters Sidebar for xl and above */}
//         <aside className="hidden xl:block w-80 flex-shrink-0 sticky top-34">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h2 className="text-xl font-bold mb-4">
//               {t("doctor_page.filter_title")}
//             </h2>
//             <FilterSelect
//               label={t("doctor_page.location")}
//               value={filters.location}
//               onChange={(val) => updateFilter("location", val)}
//               options={[{ value: "", label: t("doctor_page.all_hospitals") }]}
//             />
//             <FilterSelect
//               label={t("doctor_page.specialization")}
//               value={filters.specialization}
//               onChange={(val) => updateFilter("specialization", val)}
//               options={[
//                 { value: "", label: t("doctor_page.all_specializations") },
//               ]}
//             />
//             <FilterSelect
//               label={t("doctor_page.subspecialization")}
//               value={filters.subspecialization}
//               onChange={(val) => updateFilter("subspecialization", val)}
//               options={[
//                 { value: "", label: t("doctor_page.all_subspecializations") },
//               ]}
//             />
//             <FilterSelect
//               label={t("doctor_page.gender")}
//               value={filters.gender}
//               onChange={(val) => updateFilter("gender", val)}
//               options={[{ value: "", label: t("doctor_page.all_genders") }]}
//             />
//             <FilterSelect
//               label={t("doctor_page.practice_schedule")}
//               value={filters.schedule}
//               onChange={(val) => updateFilter("schedule", val)}
//               options={[{ value: "", label: t("doctor_page.all_days") }]}
//             />
//           </div>
//         </aside>

//         {/* Doctor Cards */}
//         <section className="flex-1">
//           <div className="grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3 gap-6">
//             {mockDoctors.map((doctor) => (
//               <DoctorCard key={doctor.id} doctor={doctor} />
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default DoctorSearchPage;
