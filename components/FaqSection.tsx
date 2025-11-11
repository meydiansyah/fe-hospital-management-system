import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apa saja syarat registrasi menjadi pasien baru?",
    answer:
      "Pasien baru perlu menyiapkan KTP/Passpor, kartu BPJS atau asuransi (jika ada), dan nomor kontak yang dapat dihubungi.",
  },
  {
    question: "Bagaimana cara memesan layanan medical check up?",
    answer:
      "Hubungi Sentra Medika Care Center di 1500-911 atau pilih paket MCU melalui halaman Medical Check Up di website.",
  },
  {
    question: "Apakah bisa mengubah jadwal konsultasi dokter?",
    answer:
      "Perubahan jadwal dapat dilakukan maksimal 24 jam sebelum waktu konsultasi melalui layanan pelanggan atau aplikasi.",
  },
  {
    question: "Dokumen apa yang dibawa saat rawat inap?",
    answer:
      "Bawa kartu identitas, kartu BPJS/asuransi, surat rujukan (jika ada), dan hasil pemeriksaan penunjang sebelumnya.",
  },
];

export default function FaqSection() {
  return (
    <section className="mt-16 bg-gradient-to-r from-blue-50 via-[#f0f5ff] to-white py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-blue-900/10">
          <Image
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80&auto=format&fit=crop"
            alt="Handshake"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Temukan jawaban seputar layanan Sentra Medika Hospital Group. Jika
            masih membutuhkan bantuan, tim Care Center kami siap melayani Anda.
          </p>

          <Accordion
            type="single"
            collapsible
            className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-blue-50/40"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index + 1}`}>
                <AccordionTrigger className="px-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 text-sm">
            <Link
              href="/visitor-guide"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Lihat Panduan Pengunjung Rumah Sakit &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
