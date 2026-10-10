"use client";

import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-select" className="sr-only">
        পণ্য সাজান
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none cursor-pointer rounded-xl border border-gray-200 bg-white py-2 pl-3.5 pr-9 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs outline-none transition hover:border-emerald-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
      >
        <option value="default">সাজান: ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
        <option value="change-up">বেশি দাম বেড়েছে (▲)</option>
        <option value="change-down">বেশি দাম কমেছে (▼)</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-gray-500" />
    </div>
  );
};

export default SortDropdown;
