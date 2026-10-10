import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { toBn } from "@/lib/utils";

interface ProductSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  accent?: "red" | "green";
  products: Product[];
}

const ProductSection = ({
  id,
  title,
  subtitle,
  accent,
  products,
}: ProductSectionProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-24 mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Heading Header */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between border-b border-gray-200 pb-3">
        <div>
          <h2 className="flex items-center gap-2.5 text-2xl font-black text-gray-950 sm:text-3xl">
            {accent === "red" && (
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-sm font-black text-red-600">
                ▲
              </span>
            )}
            {accent === "green" && (
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-sm font-black text-emerald-700">
                ▼
              </span>
            )}
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>

        <span className="text-xs font-semibold text-gray-600">
          মোট {toBn(products.length)}টি পণ্য
        </span>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 on sm/md, 3 on lg, 4 on xl */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;