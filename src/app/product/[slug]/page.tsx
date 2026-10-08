
import Link from "next/link";
import { getProduct } from "@/lib/api";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const ProductDetailsPage = async ({
  params,
}: ProductPageProps) => {
  const { slug } = await params;

  const product: Product = await getProduct(slug);

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unit = unitBn[product.unit] ?? product.unit;

  const diff = Math.abs(product.today - product.yesterday);

  const markets = product.markets ?? [];

  const lowest = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const highest = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const average = markets.length
    ? Math.round(
        markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      )
    : product.today;

  const lowestMarket = markets.length
    ? markets.reduce((lowest, current) =>
        current.min < lowest.min ? current : lowest
      )
    : null;

  const highestMarket = markets.length
    ? markets.reduce((highest, current) =>
        current.max > highest.max ? current : highest
      )
    : null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500"
        >
          <Link
            href="/"
            className="transition hover:text-green-700 hover:underline"
          >
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700 hover:underline"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">›</span>

          <span
            aria-current="page"
            className="font-semibold text-gray-700"
          >
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-green-50 text-5xl">
                {product.image}
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">
                    {product.categoryIcon}
                  </span>

                  <span className="text-sm font-semibold text-green-700">
                    {product.categoryNameBn}
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unit}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-4xl font-extrabold text-gray-900">
                {toBn(product.today)}
                <span className="ml-2 text-xl font-semibold">
                  টাকা
                </span>
              </p>

              <div
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                  isUp
                    ? "bg-red-50 text-red-600"
                    : isDown
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "–"}{" "}
                {toBn(Math.abs(product.change.pct))}%
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              গতকাল
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {toBn(product.yesterday)}
              <span className="ml-1 text-sm font-medium">
                টাকা
              </span>
            </p>

            <p className="mt-1 text-xs text-gray-500">
              পরিবর্তন {toBn(diff)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              গত সপ্তাহ
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {toBn(product.lastWeek)}
              <span className="ml-1 text-sm font-medium">
                টাকা
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              গত মাস
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {toBn(product.lastMonth)}
              <span className="ml-1 text-sm font-medium">
                টাকা
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              বাজার
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {toBn(markets.length)}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              টি বাজারের তথ্য
            </p>
          </div>
        </section>

        {/* Market Summary */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold text-gray-900">
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-semibold text-green-700">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-3xl font-extrabold text-green-800">
                {toBn(lowest)}
                <span className="ml-1 text-sm">
                  টাকা
                </span>
              </p>

              {lowestMarket && (
                <p className="mt-2 text-xs text-green-700">
                  {lowestMarket.market} —{" "}
                  {lowestMarket.division}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-700">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-3xl font-extrabold text-red-800">
                {toBn(highest)}
                <span className="ml-1 text-sm">
                  টাকা
                </span>
              </p>

              {highestMarket && (
                <p className="mt-2 text-xs text-red-700">
                  {highestMarket.market} —{" "}
                  {highestMarket.division}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">
                গড় দাম
              </p>

              <p className="mt-2 text-3xl font-extrabold text-blue-800">
                {toBn(average)}
                <span className="ml-1 text-sm">
                  টাকা
                </span>
              </p>

              <p className="mt-2 text-xs text-blue-700">
                সব বাজারের গড়
              </p>
            </div>

          </div>
        </section>

        {/* Market Table */}
        <section className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-xl font-bold text-gray-900">
                বাজারের বিস্তারিত
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 font-bold text-gray-700">
                      বাজার
                    </th>

                    <th className="px-5 py-4 font-bold text-gray-700">
                      বিভাগ
                    </th>

                    <th className="px-5 py-4 text-right font-bold text-gray-700">
                      সর্বনিম্ন
                    </th>

                    <th className="px-5 py-4 text-right font-bold text-gray-700">
                      সর্বোচ্চ
                    </th>

                    <th className="px-5 py-4 text-right font-bold text-gray-700">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-5 py-4 font-semibold text-gray-900">
                          {market.market}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-5 py-4 text-right font-semibold text-green-700">
                          {toBn(market.min)} টাকা
                        </td>

                        <td className="px-5 py-4 text-right font-semibold text-red-600">
                          {toBn(market.max)} টাকা
                        </td>

                        <td className="px-5 py-4 text-right font-semibold text-gray-900">
                          {toBn(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetailsPage;
