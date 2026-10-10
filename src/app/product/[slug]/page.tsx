import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { toBn, toBnCurrency, getUnitLabel } from "@/lib/utils";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Building2, Store } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি - বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজার দর - বাজার দর`,
    description: `${product.nameBn} এর আজকের সর্বনিম্ন, সর্বোচ্চ ও গড় বাজারদর। প্রতি ${getUnitLabel(product.unit)} ${toBn(product.today)} টাকা।`,
  };
}

const ProductDetailsPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  // 1. Protected Route: Session Verification
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session) {
    redirect(`/signin?redirect=/product/${encodeURIComponent(slug)}&reason=auth_required`);
  }

  // 2. Fetch Product Data
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const unit = getUnitLabel(product.unit);
  const diff = Math.abs((product.today || 0) - (product.yesterday || 0));

  const markets = product.markets ?? [];

  const lowest = markets.length > 0
    ? Math.min(...markets.map((m) => m.min))
    : product.today;

  const highest = markets.length > 0
    ? Math.max(...markets.map((m) => m.max))
    : product.today;

  const average = markets.length > 0
    ? Math.round(
        markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
      )
    : product.today;

  const lowestMarket = markets.length > 0
    ? markets.reduce((lowest, current) => (current.min < lowest.min ? current : lowest))
    : null;

  const highestMarket = markets.length > 0
    ? markets.reduce((highest, current) => (current.max > highest.max ? current : highest))
    : null;

  return (
    <main className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              হোম
            </Link>
            <span>›</span>
            {product.category && (
              <>
                <Link
                  href={`/category/${product.category}`}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {product.categoryNameBn || product.category}
                </Link>
                <span>›</span>
              </>
            )}
            <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.nameBn}
            </span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>

        {/* Top Product Summary Header Card */}
        <section className="relative overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left: Image + Name + Category + Unit */}
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl sm:text-5xl border border-emerald-100/80 shadow-2xs">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                    <span>{product.categoryIcon}</span>
                    <span>{product.categoryNameBn || product.category}</span>
                  </span>

                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                    প্রতি {unit}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-md">
                  আজকের বাজার পরিস্থিতির সার্বিক বিবরণ এবং বিভিন্ন পাইকারি ও খুচরা বাজারের তুলনামূলক দর।
                </p>
              </div>
            </div>

            {/* Right: Today's Price & Change Badge */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5 md:text-right">
              <span className="block text-xs font-medium text-gray-500">
                আজকের নির্ধারিত গড় দর
              </span>

              <div className="mt-1 flex items-baseline md:justify-end gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-gray-950">
                  {toBnCurrency(product.today)}
                </span>
                <span className="text-sm sm:text-base font-bold text-gray-600">
                  টাকা/{unit}
                </span>
              </div>

              <div className="mt-2 flex items-center md:justify-end">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${
                    isUp
                      ? "border-red-200 bg-red-50 text-red-600"
                      : isDown
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : isDown ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"} {toBn(Math.abs(product.change?.pct || 0))}%</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Price Trend Summary Cards */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs">
            <span className="text-xs font-medium text-gray-500">গতকালকের দর</span>
            <div className="mt-2 text-xl sm:text-2xl font-black text-gray-900">
              {toBnCurrency(product.yesterday || product.today)} <span className="text-xs font-normal text-gray-500">টাকা</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-gray-500">
              পার্থক্য: {toBn(diff)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs">
            <span className="text-xs font-medium text-gray-500">গত সপ্তাহের দর</span>
            <div className="mt-2 text-xl sm:text-2xl font-black text-gray-900">
              {toBnCurrency(product.lastWeek || product.today)} <span className="text-xs font-normal text-gray-500">টাকা</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-gray-500">
              ৭ দিন আগের গড়
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs">
            <span className="text-xs font-medium text-gray-500">গত মাসের দর</span>
            <div className="mt-2 text-xl sm:text-2xl font-black text-gray-900">
              {toBnCurrency(product.lastMonth || product.today)} <span className="text-xs font-normal text-gray-500">টাকা</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-gray-500">
              ৩০ দিন আগের গড়
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs">
            <span className="text-xs font-medium text-gray-500">পর্যবেক্ষণ করা বাজার</span>
            <div className="mt-2 text-xl sm:text-2xl font-black text-emerald-800">
              {toBn(markets.length)} <span className="text-xs font-normal text-gray-500">টি</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-gray-500">
              সারাদেশের বিভিন্ন বাজার
            </p>
          </div>
        </section>

        {/* Market-based Summary Highlights */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-950">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              বিভিন্ন প্রধান বাজারের সর্বনিম্ন, সর্বোচ্চ এবং গড় মূল্যের তুলনামূলক চিত্র
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Lowest */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  সর্বনিম্ন দাম
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                  ↓
                </span>
              </div>
              <div className="mt-2 text-3xl font-black text-emerald-900">
                {toBnCurrency(lowest)}{" "}
                <span className="text-sm font-semibold text-emerald-700">টাকা</span>
              </div>
              {lowestMarket && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 pt-2 border-t border-emerald-200/60">
                  <Store className="h-3.5 w-3.5" />
                  <span>{lowestMarket.market} ({lowestMarket.division})</span>
                </div>
              )}
            </div>

            {/* Highest */}
            <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-800">
                  সর্বোচ্চ দাম
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs text-red-700">
                  ↑
                </span>
              </div>
              <div className="mt-2 text-3xl font-black text-red-900">
                {toBnCurrency(highest)}{" "}
                <span className="text-sm font-semibold text-red-700">টাকা</span>
              </div>
              {highestMarket && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-800 pt-2 border-t border-red-200/60">
                  <Store className="h-3.5 w-3.5" />
                  <span>{highestMarket.market} ({highestMarket.division})</span>
                </div>
              )}
            </div>

            {/* Average */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  গড় দাম
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-700">
                  ≈
                </span>
              </div>
              <div className="mt-2 text-3xl font-black text-blue-900">
                {toBnCurrency(average)}{" "}
                <span className="text-sm font-semibold text-blue-700">টাকা</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-800 pt-2 border-t border-blue-200/60">
                <Building2 className="h-3.5 w-3.5" />
                <span>সকল বাজারের সামগ্রিক গড়</span>
              </div>
            </div>
          </div>
        </section>

        {/* Markets Detailed Table */}
        {markets.length > 0 && (
          <section className="overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-xs">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                বাজারভিত্তিক বিস্তারিত মূল্য তালিকা
              </h3>
              <span className="text-xs font-medium text-gray-500">
                প্রতি {unit} হিসেবে
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80 text-xs font-bold text-gray-600 uppercase">
                    <th className="px-6 py-3.5">বাজারের নাম</th>
                    <th className="px-6 py-3.5">বিভাগ</th>
                    <th className="px-6 py-3.5 text-right">সর্বনিম্ন দর</th>
                    <th className="px-6 py-3.5 text-right">সর্বোচ্চ দর</th>
                    <th className="px-6 py-3.5 text-right">গড় দর</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {markets.map((m, idx) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr key={`${m.market}-${idx}`} className="transition-colors hover:bg-gray-50/60">
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {m.market}
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">
                          {m.division}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-emerald-700">
                          {toBnCurrency(m.min)} টাকা
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-red-600">
                          {toBnCurrency(m.max)} টাকা
                        </td>
                        <td className="px-6 py-4 text-right font-black text-gray-900">
                          {toBnCurrency(avg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </div>
    </main>
  );
};

export default ProductDetailsPage;
