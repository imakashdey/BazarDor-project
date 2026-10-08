import ProductCard from "./ProductCard";

interface Product {
  id: number;
  slug: string; // এটা add করো
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ProductSectionProps {
  title: string;
  accent?: "red" | "green";
  products: Product[];
}

const ProductSection = ({
  title,
  accent,
  products,
}: ProductSectionProps) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">

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