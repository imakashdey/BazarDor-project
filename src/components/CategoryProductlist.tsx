
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryProductListProps {
  products: Product[];
}

const CategoryProductList = ({
  products,
}: CategoryProductListProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") {
      return a.today - b.today;
    }

    if (sort === "price-high") {
      return b.today - a.today;
    }

    if (sort === "increase") {
      return b.change.pct - a.change.pct;
    }

    if (sort === "decrease") {
      return a.change.pct - b.change.pct;
    }

    return 0;
  });

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>সাজান</span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-800 outline-none transition focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>

            <option value="price-low">
              দাম: কম থেকে বেশি
            </option>

            <option value="price-high">
              দাম: বেশি থেকে কম
            </option>

            <option value="increase">
              বেশি বেড়েছে
            </option>

            <option value="decrease">
              বেশি কমেছে
            </option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryProductList;

