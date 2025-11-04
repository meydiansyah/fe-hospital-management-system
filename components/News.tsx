"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  categories?: string[];
  hashtags?: string[];
  createdAt?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "New Hospital Wing Opens",
    excerpt:
      "Our latest wing is now open to provide better care for all patients.",
    image:
      "https://images.unsplash.com/photo-1588776814546-0c5b6f6b9b3e?auto=format&fit=crop&w=800&q=80",
    href: "/news/1",
    categories: ["Hospital", "Facility"],
    hashtags: ["#health", "#hospital"],
    createdAt: "Oct 30, 2025",
  },
  {
    id: 2,
    title: "Advanced Cardiology Treatments",
    excerpt:
      "Explore the latest cardiology treatments and technology for patients.",
    image:
      "https://images.unsplash.com/photo-1588776814546-0c5b6f6b9b3e?auto=format&fit=crop&w=800&q=80",
    href: "/news/2",
    categories: ["Cardiology"],
    hashtags: ["#cardiology", "#treatment"],
    createdAt: "Oct 25, 2025",
  },
  {
    id: 3,
    title: "Health Tips for Families",
    excerpt: "Important tips to keep your family healthy and active every day.",
    image:
      "https://images.unsplash.com/photo-1588776814546-0c5b6f6b9b3e?auto=format&fit=crop&w=800&q=80",
    href: "/news/3",
    categories: ["Wellness"],
    hashtags: ["#healthtips", "#family"],
    createdAt: "Oct 20, 2025",
  },
  {
    id: 4,
    title: "Medical Conference 2025",
    excerpt: "Updates from the biggest medical conference in 2025.",
    image:
      "https://images.unsplash.com/photo-1588776814546-0c5b6f6b9b3e?auto=format&fit=crop&w=800&q=80",
    href: "/news/4",
    categories: ["Conference"],
    hashtags: ["#medical", "#conference"],
    createdAt: "Oct 15, 2025",
  },
];

export default function NewsSection() {
  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <section className="h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl text-primary font-bold">
            Latest News & Articles
          </h2>
          <Link
            href="/news"
            className="px-4 py-2 bg-white text-primary font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            View All
          </Link>
        </div>

        {/* Main content */}
        <div className="flex flex-1 gap-20 px-20">
          {/* Featured Article */}
          <motion.div
            className="md:w-2/3 relative rounded-xl overflow-hidden bg-white text-gray-900 hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-black/20 p-6 rounded-md">
              <h3 className="text-3xl font-bold mb-2">{featured.title}</h3>
              <p className="text-sm mb-3">{featured.excerpt}</p>
              <Link
                href={featured.href}
                className="text-sm font-medium underline"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Right-side Articles */}
          <motion.div
            className="md:w-1/3 flex flex-col gap-6 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {others.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="flex h-36 rounded-2xl overflow-hidden shadow-lg bg-white text-gray-900 hover:shadow-2xl transition-shadow"
              >
                {/* Left: Thumbnail */}
                <div className="relative w-1/3 h-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right: Info */}
                <div className="flex flex-col justify-between p-4 w-2/3">
                  <h3 className="text-lg font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-600">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-1 text-xs text-gray-500 mt-1">
                    {article.categories?.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    {article.createdAt}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
