"use client";

import { useEffect } from "react";
import { useSchoolStore } from "@/store/schoolStore";
import { SearchInput } from "@/components/atoms/SearchInput";
import { SchoolListView } from "@/components/atoms/SchoolListView";
import { Pagination } from "@/components/atoms/Pagination";
import { PerPageSelector } from "@/components/atoms/PerPageSelector";
import { NavigationButtons } from "@/components/atoms/NavigationButtons";
// import { SchoolStats } from "@/components/atoms/SchoolStats";

export default function SchoolPage() {
  const {
    schools,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    fetchSchoolData,
    currentPage,
    totalPages,
    setCurrentPage,
    perPage,
    setPerPage,
    viewMode,
    setViewMode,
    totalData,
  } = useSchoolStore();

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
  };

  // Functions to handle pagination navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Indonesian Schools Directory</h1>

      <div className="mb-8">
        <div className="mb-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search schools by name, NPSN, address, or location..."
            className="max-w-2xl mb-2"
          />
          <p className="text-sm text-gray-500 mt-1">
            Search is live - results update as you type
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
          {/* View mode toggle */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">View as:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewModeChange("list")}
                className={`px-3 py-1 rounded ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                List
              </button>
              <button
                onClick={() => handleViewModeChange("grid")}
                className={`px-3 py-1 rounded ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Grid
              </button>
            </div>
          </div>

          {/* Items per page selector */}
          <PerPageSelector
            perPage={perPage}
            onPerPageChange={setPerPage}
            options={[10, 20, 50]}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => fetchSchoolData(currentPage, perPage)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* School statistics */}
 

          {/* School count and pagination summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="font-medium">
                Showing schools {(currentPage - 1) * perPage + 1}-
                {Math.min(currentPage * perPage, totalData)}
                of {totalData} total results
              </p>
              {searchQuery && (
                <p className="text-sm mt-1">
                  Filtered by search: "{searchQuery}"
                </p>
              )}
            </div>
          </div>

          {/* School list */}
          <SchoolListView schools={schools} viewMode={viewMode} />

          {/* Previous/Next Navigation */}
          <NavigationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            className="mt-8"
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-4"
          />
        </div>
      )}
    </main>
  );
}
