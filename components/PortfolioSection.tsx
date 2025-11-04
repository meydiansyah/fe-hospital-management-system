"use client";

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Creative Agency Landing Page",
    description:
      "A sleek and responsive landing page designed for a creative agency with smooth transitions and modern layout.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1300&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Minimalist Portfolio Website",
    description:
      "A clean portfolio built with Tailwind CSS, focused on typography and seamless mobile experience.",
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1300&q=80",
    link: "#",
  },
];

const PortfolioSection = () => {
  return (
    <section className="min-h-screen my-auto items-center flex bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl/tight sm:text-4xl/tight font-bold text-gray-900 dark:text-white">
            Take a look at our amazing works
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Explore some of our latest projects showcasing creativity and
            precision.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative aspect-[5/3.8] rounded-lg overflow-hidden group"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1300}
                height={900}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent flex flex-col justify-end p-5 space-y-4 text-gray-200">
                <h2 className="font-semibold text-white text-2xl">
                  {project.title}
                </h2>
                <p className="text-gray-300 line-clamp-2">
                  {project.description}
                </p>
                <div className="w-max">
                  <Link
                    href={project.link}
                    className="group flex items-center gap-x-3 text-gray-100 font-medium border-b border-gray-800 hover:text-white"
                  >
                    View details
                    <span className="duration-300 ease-linear group-hover:pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
