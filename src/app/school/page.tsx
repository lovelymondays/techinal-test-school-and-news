"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSchoolStore } from "@/store/schoolStore";
import { SearchInput } from "@/components/atoms/SearchInput";

export default function SchoolPage() {
  const {
    groupedSchools,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    fetchSchoolData,
  } = useSchoolStore();

  useEffect(() => {
    fetchSchoolData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Indonesian Schools Directory</h1>

      <div className="mb-8">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search schools by name, NPSN, address, or location..."
          className="max-w-2xl"
        />
      </div>

      {loading ? (
        <p>Loading schools...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSchools).map(([province, schools]) => (
            <div key={province} className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{province}</h2>
              <div className="grid grid-cols-1 gap-4">
                {schools.map((school) => (
                  <div
                    key={school.id}
                    className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-blue-600 mb-2">
                            {school.sekolah}
                          </h3>
                          <p className="text-gray-600">
                            <span className="font-medium">NPSN:</span>{" "}
                            {school.npsn}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Type:</span>{" "}
                            {school.bentuk}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Status:</span>{" "}
                            {school.status}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Address:</span>
                          </p>
                          <p className="text-gray-600 pl-4">
                            {school.alamat_jalan}
                          </p>
                        </div>
                      </div>

                      {/* Location Information */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Province Code:</span>{" "}
                            {school.kode_prop}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Province:</span>{" "}
                            {school.propinsi}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">
                              City/Regency Code:
                            </span>{" "}
                            {school.kode_kab_kota}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">City/Regency:</span>{" "}
                            {school.kabupaten_kota}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">District Code:</span>{" "}
                            {school.kode_kec}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">District:</span>{" "}
                            {school.kecamatan}
                          </p>
                        </div>

                        {/* Coordinates */}
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Coordinates:</span>
                          </p>
                          <p className="text-gray-600 pl-4">
                            Latitude: {school.lintang}
                            <br />
                            Longitude: {school.bujur}
                          </p>
                          {school.lintang && school.bujur && (
                            <a
                              href={`https://www.google.com/maps?q=${school.lintang},${school.bujur}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              View on Map
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
