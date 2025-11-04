import { t } from "i18next";
import ArticleCard from "./ArticleCard";

const posts = [
  {
    id: 1,
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    published_at: "Jun 12, 2021",
    title: "How to Structure Your React Application Like a Legend",
    summary:
      "Learn how to organize your React app architecture for scalability, readability, and maintainability.",
  },
  {
    id: 2,
    cover:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
    published_at: "Jun 12, 2021",
    title: "You're Probably Fetching Data in the Wrong Way",
    summary:
      "Explore modern data fetching patterns and how to optimize API calls for better performance.",
  },
  {
    id: 3,
    cover:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    published_at: "Jun 14, 2021",
    title: "10 Mistakes Developers Make When Using Next.js",
    summary:
      "Avoid these common pitfalls and improve your Next.js development experience.",
  },
];

export default function ArticleSection() {
  return (
    <section className="min-h-screen my-auto flex items-center">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
        {/* Header */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
            Our Most Recent Articles
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Discover insights, tutorials, and guides written by developers for
            developers.
          </p>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-t-lg">
          {posts.slice(0, 2).map((post) => (
            <ArticleCard key={post.id} {...post} />
          ))}

          {/* Newsletter Card */}
          <div className="sm:col-span-2 lg:col-span-1 p-6 sm:p-10 md:p-14 lg:p-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex flex-col space-y-6 relative overflow-hidden">
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-bl from-blue-600 to-violet-500 blur-2xl -top-7 -left-7 opacity-40"></div>
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-bl from-blue-600 to-violet-500 blur-2xl -bottom-7 -right-7 opacity-40"></div>

            <div className="lg:h-full flex flex-col items-center text-center justify-center space-y-5 mx-auto max-w-2xl">
              <h1 className="font-bold text-gray-900 dark:text-white text-3xl">
                Join other{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-blue-700 to-violet-400 dark:from-blue-300 dark:to-violet-400">
                  600 Amazing
                </span>{" "}
                developers
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Subscribe to our newsletter for the latest articles and updates.
              </p>
              <div className="w-full flex flex-col sm:items-center sm:flex-row lg:flex-col gap-y-3 gap-x-4">
                <div className="flex justify-center w-full sm:w-max lg:w-full">
                  <button className="py-3 rounded-lg px-6 bg-blue-600 dark:bg-blue-500 text-white font-medium text-base w-full flex justify-center">
                    {t("find_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
