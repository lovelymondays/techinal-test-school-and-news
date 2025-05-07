import React from "react";
import { School } from "@/store/schoolStore";

interface SchoolCardProps {
  school: School;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">
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
            <p className="text-gray-900 pl-4">{school.alamat_jalan}</p>
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
            <p className="text-gray-900 pl-4">
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
  );
};
