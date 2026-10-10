"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { Product } from "@/types";
import { toBn } from "@/lib/utils";
import Link from "next/link";
import { PackageOpen } from "lucide-react";

interface CategoryProductListProps {
  products: Product[];
}

const CategoryProductList = ({ products }: CategoryProductListProps) => {
  const [sortOption, setSortOption] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortOption) {
      case "price-asc":
        return list.sort((a, b) => Number(a.today) - Number(b.today));
      case "price-desc":
        return list.sort((a, b) => Number(b.today) - Number(a.today));
      case "change-up":
        return list.sort((a, b) => (Number(b.change?.pct) || 0) - (Number(a.change?.pct) || 0));
      case "change-down":
        return list.sort((a, b) => (Number(a.change?.pct) || 0) - (Number(b.change?.pct) || 0));
      case "default":
      default:
        return list;
    }
  }, [products, sortOption]);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <PackageOpen className="h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-xl font-bold text-gray-900">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h3>
        <p className="mt-2 text-sm text-gray-500">অন্য কোনো ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।</p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200/80 pb-4">
        <p className="text-sm font-medium text-gray-600">
          মোট <span className="font-bold text-emerald-800">{toBn(products.length)}</span>টি পণ্য পাওয়া গেছে
        </p>

        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductList;
