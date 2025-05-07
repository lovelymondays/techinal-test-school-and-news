"use client";

import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";
import { SearchInput } from "@/components/atoms/SearchInput";

export default function NewsPage() {
  const {
    sources,
    currentSource,
    currentCategory,
    formattedNews,
    searchQuery,
    setSearchQuery,
    setCurrentSource,
    setCurrentCategory,
    fetchNewsSources,
    loading,
    error,
  } = useNewsStore();

  useEffect(() => {
    fetchNewsSources();
  }, []);

  const currentSourceData = sources.find(
    (source) => source.name === currentSource
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Indonesian News Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">News Sources</h2>
            <div className="space-y-2">
              {sources.map((source) => (
                <button
                  key={source.name}
                  onClick={() => setCurrentSource(source.name)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    currentSource === source.name
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500"
                  }`}
                >
                  {source.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {currentSourceData && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {currentSourceData.paths.map((path) => (
                  <button
                    key={path.name}
                    onClick={() => setCurrentCategory(path.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      currentCategory === path.name
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    {path.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search news..."
              className="max-w-2xl"
            />
          </div>

          {loading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-6">
              {formattedNews.map((item, index) => (
                <article
                  key={index}
                  className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-blue-500 mb-4">
                    {item.formattedDate}
                  </p>
                  <p className="text-blue-600 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline inline-block"
                  >
                    Read more →
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
