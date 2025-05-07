"use client";

import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";
import { SearchInput } from "@/components/atoms/SearchInput";
import Image from "next/image";

export default function NewsPage() {
  const {
    sources,
    currentSource,
    currentCategory,
    newsData,
    allPosts,
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

  // Filter posts based on search query
  const filterPosts = (posts: any[]) => {
    if (!searchQuery.trim()) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Indonesian News Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            {/* News Sources */}
            <div>
              <h2 className="text-lg font-semibold mb-4">News Sources</h2>
              <div className="space-y-2">
                {sources.map((source) => (
                  <button
                    key={source.name}
                    onClick={() => setCurrentSource(source.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      currentSource === source.name
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-100"
                    }`}
                  >
                    {source.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            {currentSourceData && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {currentSourceData.paths.map((path) => (
                    <button
                      key={path.name}
                      onClick={() => setCurrentCategory(path.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        currentCategory === path.name
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {path.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Search and Source Info */}
          <div className="mb-8">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search news..."
              className="max-w-2xl mb-4"
            />
            {newsData && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  {newsData.image && (
                    <img
                      src={newsData.image}
                      alt={`${currentSource} logo`}
                      className="h-12 w-auto"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold">{newsData.title}</h2>
                    <p className="text-gray-600">{newsData.description}</p>
                  </div>
                </div>
                <a
                  href={newsData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Website →
                </a>
              </div>
            )}
          </div>

          {/* News Articles */}
          {loading ? (
            <p className="text-center py-8">Loading news...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : (
            <div className="space-y-12">
              {Object.entries(allPosts).map(([category, posts]) => {
                const filteredPosts = filterPosts(posts);
                if (filteredPosts.length === 0) return null;

                return (
                  <div key={category} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold capitalize">
                        {category} News
                      </h2>
                      <span className="text-gray-500">
                        {filteredPosts.length} articles
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {filteredPosts.map((item, index) => (
                        <article
                          key={index}
                          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                        >
                          <div className="md:flex">
                            {item.thumbnail && (
                              <div className="md:w-1/3">
                                <div className="relative h-48 md:h-full">
                                  <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            )}
                            <div className="p-6 md:w-2/3">
                              <h3 className="text-xl font-semibold mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-blue-500 mb-4">
                                {item.formattedDate}
                              </p>
                              <p className="text-gray-600 mb-4">
                                {item.description}
                              </p>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                              >
                                Read Full Article
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
