
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {product.image}
        </div>

        <div>
          <p className="text-lg font-bold leading-tight text-gray-900">
            {product.nameBn}
          </p>

          <p className="text-xs text-gray-600">
            প্রতি {unitBn[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      {/* Price + Change */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-700">
            আজকের দাম
          </p>

          <p className="text-xl font-extrabold text-gray-900">
            {toBn(product.today)}{" "}
            <span className="text-base font-semibold">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "–"}{" "}
          {toBn(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
