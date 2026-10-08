import MarqueeText from "react-marquee-text";
import { getProducts } from "@/lib/api";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const changeStyle = {
  up: {
    icon: "▲",
    color: "text-red-600",
  },
  down: {
    icon: "▼",
    color: "text-green-600",
  },
  flat: {
    icon: "–",
    color: "text-gray-500",
  },
};

const PriceTicker = async () => {
  const products: Product[] = await getProducts();

  return (
    <div className="border-b border-gray-200 bg-white text-black">
      <div className="mx-auto flex max-w-7xl overflow-hidden">

        <MarqueeText
          className="py-3"
          duration={30}
          direction="right"
        >
          {products.map((product) => {
            const { icon, color } = changeStyle[product.change.dir];

            return (
              <div
                key={product.id}
                className="flex items-center gap-3 border-r border-gray-200 px-6"
              >
                {/* Icon */}
                <span className="text-xl">
                  {product.categoryIcon}
                </span>

                {/* Product Name */}
                <span className="font-bold">
                  {product.nameBn}
                </span>

                {/* Price */}
                <span className="text-sm text-gray-700">
                  {toBn(product.today)} টাকা/
                  {unitBn[product.unit] ?? product.unit}
                </span>

                {/* Change */}
                <span
                  className={`flex items-center gap-1 text-sm font-bold ${color}`}
                >
                  <span>{icon}</span>
                  <span>
                    {toBn(Math.abs(product.change.pct))}%
                  </span>
                </span>
              </div>
            );
          })}
        </MarqueeText>

      </div>
    </div>
  );
};

export default PriceTicker;