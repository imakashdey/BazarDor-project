import Link from "next/link";
import { Product } from "@/types";
import { toBn, toBnCurrency, getUnitLabel } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct !== undefined
    ? toBn(Math.abs(product.change.pct))
    : "০.০";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
    >
      {/* Top: Icon + Name + Category/Unit */}
      <div>
        <div className="flex items-start gap-3.5">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-emerald-50/80 text-2xl transition-transform duration-200 group-hover:scale-105 border border-emerald-100/60">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-800 sm:text-lg">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs font-medium text-gray-500">
              প্রতি {getUnitLabel(product.unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Price Row + Change Badge */}
      <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <span className="block text-[11px] font-medium text-gray-500">
            আজকের দাম
          </span>
          <span className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            {toBnCurrency(product.today)}{" "}
            <span className="text-xs font-semibold text-gray-600">টাকা</span>
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border ${
            isUp
              ? "border-red-200 bg-red-50/80 text-red-600"
              : isDown
              ? "border-emerald-200 bg-emerald-50/80 text-emerald-700"
              : "border-gray-200 bg-gray-100/80 text-gray-600"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{pct}%</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
