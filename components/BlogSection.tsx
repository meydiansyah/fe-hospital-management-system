"use client";

import Image from "next/image";
import Link from "next/link";

interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  cover: string;
  published_at: string;
  author: Author;
  title: string;
  summary: string;
}

const BlogCard = ({
  cover,
  published_at,
  author,
  title,
  summary,
}: BlogPost) => {
  return (
    <div className="flex flex-col space-y-5">
      <Image
        src={cover}
        alt={title}
        width={1300}
        height={900}
        className="w-full rounded aspect-[5/3] object-cover bg-gray-100 dark:bg-gray-900"
      />
      <Link
        href="#"
        className="mt-5 text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        {title}
      </Link>
      <p className="text-gray-700 dark:text-gray-300">{summary}</p>
      <div className="flex items-center gap-x-4">
        <Image
          src={author.avatar}
          alt={author.name}
          width={800}
          height={800}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="text-gray-800 dark:text-gray-50 font-semibold">
            {author.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {published_at}
          </p>
        </div>
      </div>
    </div>
  );
};

const posts: BlogPost[] = [
  {
    id: 1,
    cover:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1300&q=80",
    published_at: "2 days ago",
    author: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    },
    title: "The only way to write clean ReactJS code like a pro",
    summary:
      "Learn modern patterns and best practices to make your React applications scalable and maintainable.",
  },
  {
    id: 2,
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1300&q=80",
    published_at: "4 days ago",
    author: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    },
    title: "You're probably fetching data in the wrong way",
    summary:
      "A deep dive into optimized data fetching strategies for Next.js and React applications.",
  },
  {
    id: 3,
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1300&q=80",
    published_at: "1 week ago",
    author: {
      name: "Alex Carter",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    },
    title: "10 Tailwind CSS tips to boost your productivity",
    summary:
      "From responsive utilities to dark mode magic — here are practical Tailwind CSS tricks every developer should know.",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-y-8 items-center text-center md:text-left md:items-start md:justify-between">
          <div className="text-center space-y-6 max-w-2xl mx-auto md:mx-0 md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
              Our most recent articles
            </h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
              Stay up-to-date with our latest insights, tutorials, and design
              inspiration crafted by our creative team.
            </p>
          </div>
          <div>
            <Link
              href="#"
              className="px-5 py-2.5 border border-gray-200 dark:border-gray-800 text-blue-600 dark:text-gray-300 flex items-center gap-x-3 hover:text-blue-700 dark:hover:text-white transition"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
