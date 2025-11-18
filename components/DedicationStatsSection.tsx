"use client";

const stats = [
  { value: "3.3 K", label: "Kasus Kanker Ditangani" },
  { value: "2.5 K", label: "Tindakan Mata" },
  { value: "80+", label: "Transplantasi Ginjal & Hati" },
  { value: "1.2 K", label: "Pasien Rehabilitasi Medis" },
];

export default function DedicationStatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#041261] via-[#0024a1] to-[#0084ff] py-12 text-white lg:py-16">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -top-20 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-red-500/80 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/40 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="grid flex-1 gap-8 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="text-sm font-medium text-blue-100 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-3xl bg-white/95 p-6 text-slate-800 shadow-xl shadow-blue-900/20 sm:p-8 lg:max-w-sm">
          <p className="text-lg font-semibold text-blue-900">
            Dedikasi yang Terukur
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Setiap angka adalah kisah kesembuhan dan harapan baru bagi pasien
            kami. Tim ahli dan teknologi mutakhir memastikan layanan terbaik
            untuk setiap perjalanan penyembuhan.
          </p>
        </div>
      </div>
    </section>
  );
}

