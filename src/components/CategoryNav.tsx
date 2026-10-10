"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";

interface CategoryNavProps {
  categories: Category[];
}

function CategoryNavList({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 scrollbar-none">
      <Link
        href="/"
        className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
          pathname === "/"
            ? "bg-emerald-700 text-white shadow-xs"
            : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
        }`}
      >
        <span>🏠</span>
        <span>সব পণ্য</span>
      </Link>

      {categories.map((category) => {
        const isActive =
          pathname === `/category/${category.slug}` ||
          pathname.startsWith(`/category/${category.slug}/`);

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-emerald-700 font-semibold text-white shadow-xs"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}

const CategoryNav = ({ categories }: CategoryNavProps) => {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-xs">
      <Suspense
        fallback={
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 scrollbar-none">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700"
            >
              <span>🏠</span>
              <span>সব পণ্য</span>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-700"
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))}
          </div>
        }
      >
        <CategoryNavList categories={categories} />
      </Suspense>
    </nav>
  );
};

export default CategoryNav;
