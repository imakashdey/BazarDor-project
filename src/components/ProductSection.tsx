import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductSectionProps {
  id?: string;
  title: string;
  accent?: "red" | "green";
  products: Product[];
}

const ProductSection = ({
  id,
  title,
  accent,
  products,
}: ProductSectionProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-8">
      {/* Heading */}
      <h2 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-2xl font-extrabold text-gray-900">
        {accent && (
          <span
            className={`text-base leading-none ${
              accent === "red" ? "text-red-600" : "text-green-600"
            }`}
          >
            {accent === "red" ? "▲" : "▼"}
          </span>
        )}
        {title}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;