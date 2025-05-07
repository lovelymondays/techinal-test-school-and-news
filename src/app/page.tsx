"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSchoolStore } from "@/store/schoolStore";
import { useNewsStore } from "@/store/newsStore";
import { fetchSchools } from "@/services/api";
import { SearchInput } from "@/components/atoms/SearchInput";

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
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Schools Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Schools</h2>
            <Link
              href="/school"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All Schools
            </Link>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">School Statistics</h3>
            <p className="text-blue-600">
              Total Schools Available: {totalData.toLocaleString()}
            </p>
          </div>

          <SearchInput
            value={schoolSearchQuery}
            onChange={setSchoolSearchQuery}
            placeholder="Search schools..."
          />

          {schoolsLoading ? (
            <p>Loading schools...</p>
          ) : schoolsError ? (
            <p className="text-red-500">{schoolsError}</p>
          ) : (
            <div className="space-y-4">
              {filteredSchools.slice(0, 5).map((schools) => (
                <div
                  key={schools.id}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{schools.sekolah}</h3>
                  <p className="text-blue-600">NPSN: {schools.npsn}</p>
                  <p className="text-blue-600">{schools.alamat_jalan}</p>
                  <p className="text-sm text-blue-500 mt-2">
                    {schools.kabupaten_kota}, {schools.propinsi}
                  </p>
                </div>
              ))}
              <div className="text-center">
                <Link href="/school" className="text-blue-500 hover:underline">
                  See more schools →
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* News Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">News</h2>
            <Link
              href="/news"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All News
            </Link>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Available News Sources
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {sources.map((source) => (
                <div
                  key={source.name}
                  className="p-4 bg-white rounded-lg shadow-sm"
                >
                  <h4 className="font-semibold mb-2">
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
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-blue-500">{item.formattedDate}</p>
                  <p className="mt-2 text-blue-600">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-2 inline-block"
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
