import Link from "next/link";
import { getProductsByCategory, getCategories } from "@/lib/api";
import CategoryProductList from "@/components/CategoryProductlist";
import { toBn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.nameBn || slug;

  return {
    title: `${name} - বাজার দর`,
    description: `${name} ক্যাটাগরির আজকের সর্বশেষ বাজারদর ও মূল্য পরিবর্তনের তথ্য।`,
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProductsByCategory(slug),
    getCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug);

  const firstProduct = products[0];
  const categoryName =
    currentCategory?.nameBn ??
    firstProduct?.categoryNameBn ??
    slug;

  const categoryIcon =
    currentCategory?.icon ??
    firstProduct?.categoryIcon ??
    firstProduct?.image ??
    "🛒";

  return (
    <main className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              হোম
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-semibold">{categoryName}</span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>

        {/* Category Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl sm:text-4xl shadow-xs border border-emerald-100">
              {categoryIcon}
            </div>

            <div>
              <div className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 mb-1">
                ক্যাটাগরি
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-950">
                {categoryName}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                {toBn(products.length)}টি পণ্যের আজকের সর্বশেষ দাম ও বাজার পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Products + Sort */}
        <CategoryProductList products={products} />
      </div>
    </main>
  );
};

export default CategoryPage;
