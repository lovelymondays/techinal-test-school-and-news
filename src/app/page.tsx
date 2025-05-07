"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSchoolStore } from "@/store/schoolStore";
import { useNewsStore } from "@/store/newsStore";
import { fetchSchools } from "@/services/api";
import { SchoolStats } from "@/components/atoms/SchoolStats";

export default function Home() {
  const {
    schools,
    searchQuery: schoolSearchQuery,
    setSearchQuery: setSchoolSearchQuery,
    filteredSchools,
    loading: schoolsLoading,
    error: schoolsError,
    fetchSchoolData,
    totalData,
  } = useSchoolStore();

  const {
    sources,
    fetchNewsData,
    fetchNewsSources,
    formattedNews,
    loading: newsLoading,
    error: newsError,
  } = useNewsStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchSchools(),
          fetchNewsSources().then(() => fetchNewsData()),
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <main className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Schools Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Schools</h2>
            <Link
              href="/school"
              className="px-4 py-2 text-white transition-colors rounded-lg shadow-sm bg-lavender-400 hover:bg-blue-600"
            >
              View All Schools
            </Link>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-4 text-lg font-semibold text-black">
              School Statistics
            </h3>
            <p className="text-blue-600">
              Total Schools Available: {totalData.toLocaleString()}
            </p>
          </div>

          <SchoolStats
            schools={schools}
            totalData={totalData}
            loading={schoolsLoading} // ✅ fixed typo
          />

          <div className="text-center">
            <Link href="/school" className="text-blue-500 hover:underline">
              See more schools →
            </Link>
          </div>
        </section>

        {/* News Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">News</h2>
            <Link
              href="/news"
              className="px-4 py-2 text-white transition-colors rounded-lg shadow-sm bg-lavender-400 hover:bg-blue-600"
            >
              View All News
            </Link>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-black">
              Available News Sources
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {sources.map((source) => (
                <div
                  key={source.name}
                  className="p-4 bg-white rounded-lg shadow-sm"
                >
                  <h4 className="mb-2 font-semibold text-black">
                    {source.name.toUpperCase()}
                  </h4>
                  <p className="text-sm text-blue-600">
                    {source.paths.length} categories available
                  </p>
                </div>
              ))}
            </div>
          </div>

          {newsLoading ? (
            <p>Loading news...</p>
          ) : newsError ? (
            <p className="text-red-500">{newsError}</p>
          ) : (
            <div className="space-y-4">
              {formattedNews.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md"
                >
                  <h3 className="font-semibold text-black">{item.title}</h3>
                  <p className="text-sm text-blue-500">{item.formattedDate}</p>
                  <p className="mt-2 text-blue-600">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              ))}
              <div className="text-center">
                <Link href="/news" className="text-blue-500 hover:underline">
                  See more news →
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
