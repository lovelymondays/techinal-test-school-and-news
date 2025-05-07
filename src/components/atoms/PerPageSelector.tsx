import React from "react";

interface PerPageSelectorProps {
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  options?: number[];
  className?: string;
}

export const PerPageSelector: React.FC<PerPageSelectorProps> = ({
  perPage,
  onPerPageChange,
  options = [10, 20, 50],
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <label htmlFor="perPageSelect" className="mr-2 text-sm text-gray-600">
        Show:
      </label>
      <select
        id="perPageSelect"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="ml-2 text-sm text-gray-600">schools per page</span>
    </div>
  );
};
