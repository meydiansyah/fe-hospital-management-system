"use client";

import { TechnologyCard } from "@/components/TechnologySection";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function TechnologyPage() {
  const { technologies, technologiesLoading } = useSelector(
    (state: RootState) => state.masterData
  );

  const activeTechnologies = technologies.filter((t) => t.is_active);

  if (technologiesLoading) {
    return (
      <div className="min-h-screen bg-white max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-slate-600">Memuat teknologi...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative flex  items-center py-4 sm:py-8 mt-26">
        <div className="flex flex-col w-full justify-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-gray-900">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-primary">
              Teknologi Medis Mutakhir Sentra Medika
            </h1>
          </div>
          <div className="w-full max-w-3xl">
            <p className="mt-4 text-sm leading-relaxed sm:text-base text-gray-600">
              Kami menghadirkan teknologi medis terbaru untuk menunjang
              diagnosis yang akurat dan terapi yang efektif. Dari radioterapi
              LINAC & brakiterapi, pencitraan MRI beresolusi tinggi, hingga
              prosedur LASIK modern - semua dirancang untuk memberikan perawatan
              terbaik dengan standar internasional.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 py-4 sm:py-8 px-8">
        {activeTechnologies.map((technology) => (
          <TechnologyCard key={technology.id} technology={technology} />
        ))}
      </div>
    </div>
  );
}
