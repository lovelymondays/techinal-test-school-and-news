import type React from "react";
import type { School } from "@/store/schoolStore";

interface SchoolStatsProps {
  schools: School[];
  totalData: number;
  loading: boolean;
}

export const SchoolStats: React.FC<SchoolStatsProps> = ({
  schools,
  totalData,
  loading,
}) => {
  if (loading) return null;

  // Count schools by type and status
  const typeCount: Record<string, number> = {};
  const statusCount: Record<string, number> = {
    NEGERI: 0,
    SWASTA: 0,
  };

  schools.forEach((school) => {
    // Count by type
    if (school.bentuk) {
      if (!typeCount[school.bentuk]) {
        typeCount[school.bentuk] = 0;
      }
      typeCount[school.bentuk]++;
    }

    // Count by status
    if (school.status) {
      if (!statusCount[school.status]) {
        statusCount[school.status] = 0;
      }
      statusCount[school.status]++;
    }
  });

  return (
    <div className="p-5 mb-6 text-black bg-white border rounded-lg shadow-sm sm:p-6 border-lavender-100">
      <h2 className="mb-4 text-lg font-semibold text-black">
        School Statistics
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Schools */}
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="text-sm font-medium text-lavender-700">
            Total Schools
          </h3>
          <p className="text-2xl font-bold">{totalData.toLocaleString()}</p>
        </div>

        {/* School Types */}
        <div className="p-4 rounded-lg bg-purple-50">
          <h3 className="text-sm font-medium text-mint-700">School Types</h3>
          <p className="text-2xl font-bold">{Object.keys(typeCount).length}</p>
          <div className="mt-2 text-xs text-mint-800">
            {Object.entries(typeCount)
              .slice(0, 3)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between">
                  <span>{type}:</span>
                  <span>{count}</span>
                </div>
              ))}
            {Object.keys(typeCount).length > 3 && (
              <p className="text-xs italic">
                And {Object.keys(typeCount).length - 3} more types...
              </p>
            )}
          </div>
        </div>

        {/* School Status */}
        <div className="p-4 rounded-lg bg-rose-50">
          <h3 className="text-sm font-medium text-rose-700">School Status</h3>
          <div className="mt-2">
            {Object.entries(statusCount).map(([status, count]) => (
              <div key={status} className="flex justify-between">
                <span className="font-medium">{status}:</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
