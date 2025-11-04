"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const companies = [
  {
    id: 1,
    name: "Disney Plus",
    logo: "https://cdn.devdojo.com/tails/images/disney-plus.svg",
  },
  {
    id: 2,
    name: "Google",
    logo: "https://cdn.devdojo.com/tails/images/google.svg",
  },
  {
    id: 3,
    name: "HubSpot",
    logo: "https://cdn.devdojo.com/tails/images/hubspot.svg",
  },
  {
    id: 4,
    name: "YouTube",
    logo: "https://cdn.devdojo.com/tails/images/youtube.svg",
  },
  {
    id: 5,
    name: "Slack",
    logo: "https://cdn.devdojo.com/tails/images/slack.svg",
  },
  {
    id: 6,
    name: "Shopify",
    logo: "https://cdn.devdojo.com/tails/images/shopify.svg",
  },
  {
    id: 7,
    name: "Netflix",
    logo: "https://cdn.devdojo.com/tails/images/netflix.svg",
  },
  {
    id: 8,
    name: "Amazon",
    logo: "https://cdn.devdojo.com/tails/images/amazon.svg",
  },
];

export default function LogoPartnerSection() {
  return (
    <section className="bg-white dark:bg-gray-950 py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <h2 className="text-sm font-bold tracking-wide text-center text-zinc-800 dark:text-zinc-200 uppercase mb-10">
          Trusted by top-leading companies
        </h2>

        <Marquee gradient={true} speed={40} className="flex items-center">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-center mx-10 sm:mx-14"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={48}
                className="object-contain h-10 sm:h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
