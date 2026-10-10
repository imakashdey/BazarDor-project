import Link from "next/link";
import MarqueeText from "react-marquee-text";
import { getProducts } from "@/lib/api";
import { toBn, getUnitLabel } from "@/lib/utils";
import { Product } from "@/types";

const PriceTicker = async () => {
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 bg-gray-50/80 text-gray-900 py-1.5 overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        <div className="hidden sm:flex shrink-0 items-center gap-1.5 pr-4 border-r border-gray-300 font-bold text-xs text-emerald-800 uppercase tracking-wide">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
          <span>বাজার আপডেট:</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <MarqueeText
            className="py-1"
            duration={35}
            direction="left"
            pauseOnHover={true}
          >
            <div className="flex items-center">
              {products.map((product) => {
                const isUp = product.change?.dir === "up";
                const isDown = product.change?.dir === "down";
                const badgeColor = isUp
                  ? "text-red-600"
                  : isDown
                  ? "text-emerald-600"
                  : "text-gray-500";
                const arrow = isUp ? "▲" : isDown ? "▼" : "—";
                const pct = product.change?.pct !== undefined
                  ? toBn(Math.abs(product.change.pct))
                  : "০.০";

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="inline-flex items-center gap-2 border-r border-gray-200 px-5 text-sm transition hover:text-emerald-700 whitespace-nowrap"
                  >
                    <span className="text-base">{product.categoryIcon || product.image || "🛒"}</span>
                    <span className="font-semibold text-gray-800">{product.nameBn}</span>
                    <span className="text-gray-600">
                      {toBn(product.today)} টাকা/{getUnitLabel(product.unit)}
                    </span>
                    <span className={`inline-flex items-center gap-0.5 font-bold text-xs ${badgeColor}`}>
                      <span>{arrow}</span>
                      <span>{pct}%</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;
