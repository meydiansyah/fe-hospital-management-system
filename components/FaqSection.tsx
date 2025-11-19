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
    question: "Di mana saya dapat mengetahui jadwal praktik dokter?",
    answer:
      "Anda dapat melihat jadwal praktik seluruh dokter Sentra Medika Group melalui laman berikut yang juga dapat diakses melalui Sentra Medika Mobile (mobile apps) kami.",
  },
  {
    question: "Apakah asuransi saya dapat digunakan di Sentra Medika?",
    answer:
      "Sentra Medika Hospital Group bekerja sama dengan berbagai perusahaan asuransi kesehatan. Silakan hubungi Customer Care kami di 1500-911 untuk informasi lebih lanjut mengenai asuransi yang Anda miliki.",
  },
  {
    question: "Apakah ada jam besuk pasien di Sentra Medika?",
    answer:
      "Ya, jam besuk pasien di Sentra Medika Hospital adalah pukul 11:00-13:00 WIB dan 17:00-19:00 WIB. Untuk keamanan dan kenyamanan pasien, kami membatasi jumlah pengunjung maksimal 2 orang per pasien.",
  },
  {
    question: "Bagaimana saya membuat perjanjian untuk Health Check-Up?",
    answer:
      "Anda dapat membuat perjanjian Health Check-Up melalui website kami, aplikasi Sentra Medika Mobile, atau menghubungi Customer Care di 1500-911. Tim kami akan membantu Anda memilih paket yang sesuai dengan kebutuhan.",
  },
  {
    question: "Apakah Sentra Medika memiliki layanan vaksinasi perjalanan?",
    answer:
      "Ya, Sentra Medika Hospital menyediakan layanan vaksinasi perjalanan untuk berbagai tujuan. Silakan hubungi Customer Care kami untuk jadwal dan jenis vaksin yang tersedia.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[480px_1fr] lg:gap-12 lg:px-8">
        {/* Left - Image */}
        <div className="relative h-96 w-full overflow-hidden rounded-3xl bg-slate-100 lg:h-full">
          <Image
            src="/FAQImage.png"
            alt="FAQ - Sentra Medika Hospital"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>

        {/* Right - FAQ Content */}
        <div className="flex flex-col">
          <h2 className="mb-8 text-4xl font-bold text-slate-900">FAQ</h2>

          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.question} 
                value={`item-${index + 1}`}
                className="border-b border-slate-200 pb-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8">
            <Link
              href="/visitor-guide"
              className="inline-flex items-center gap-2 font-semibold text-[#5B7CFF] transition hover:text-blue-700"
            >
              Lihat Panduan Pengunjung Rumah Sakit
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
