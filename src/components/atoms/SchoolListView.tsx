import React from "react";
import { School } from "@/store/schoolStore";
import { SchoolCard } from "./SchoolCard";

interface SchoolListViewProps {
  schools: School[];
  viewMode: "list" | "grid";
}

export const SchoolListView: React.FC<SchoolListViewProps> = ({
  schools,
  viewMode,
}) => {
  if (schools.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No schools found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }
    >
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </div>
  );
};
