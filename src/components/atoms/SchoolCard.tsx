import type React from "react";
import type { School } from "@/store/schoolStore";

interface SchoolCardProps {
  school: School;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <div className="p-5 text-black transition-all bg-white border rounded-lg shadow-sm sm:p-6 hover:shadow-md border-purple-50 hover:border-lavender-200">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-xl font-bold text-lavender-600">
              {school.sekolah}
            </h3>
            <p className="text-gray-900">
              <span className="font-medium">NPSN:</span> {school.npsn}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-900">
              <span className="font-medium">Type:</span> {school.bentuk}
            </p>
            <p className="text-gray-900">
              <span className="font-medium">Status:</span> {school.status}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-900">
              <span className="font-medium">Address:</span>
            </p>
            <p className="pl-4 text-gray-900">{school.alamat_jalan}</p>
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-900">
              <span className="font-medium">Province:</span> {school.propinsi}
            </p>
            <p className="text-gray-900">
              <span className="font-medium">City/Regency:</span>{" "}
              {school.kabupaten_kota}
            </p>
            <p className="text-gray-900">
              <span className="font-medium">District:</span> {school.kecamatan}
            </p>
          </div>

          {/* Coordinates */}
          <div className="space-y-2">
            <p className="text-gray-900">
              <span className="font-medium">Coordinates:</span>
            </p>
            <p className="pl-4 text-gray-900">
              Latitude: {school.lintang}
              <br />
              Longitude: {school.bujur}
            </p>
            {school.lintang && school.bujur && (
              <a
                href={`https://www.google.com/maps?q=${school.lintang},${school.bujur}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-2 text-white transition-colors bg-blue-400 rounded-lg shadow-sm hover:bg-lavender-500"
              >
                View on Map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
