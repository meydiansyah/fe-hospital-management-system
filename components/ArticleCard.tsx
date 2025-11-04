"use client";

import Image from "next/image";

interface ArticleCardProps {
  cover: string;
  published_at: string;
  title: string;
  summary: string;
}

export default function ArticleCard({
  cover,
  published_at,
  title,
  summary,
}: ArticleCardProps) {
  return (
    <a
      href="#"
      className="flex p-px flex-col bg-gray-100 dark:bg-gray-900 group border border-gray-200 dark:border-gray-800 rounded-lg"
    >
      <div className="flex rounded-[7px] bg-gray-300 dark:bg-gray-700 overflow-hidden">
        <Image
          src={cover}
          width={600}
          height={400}
          className="rounded-[7px] aspect-[4/2.8] w-full object-cover"
          alt={title}
        />
      </div>

      <div className="flex flex-col p-5 relative space-y-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500">
          {title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
          {summary}
        </p>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          <span>{published_at}</span>
        </div>
      </div>
    </a>
  );
}
