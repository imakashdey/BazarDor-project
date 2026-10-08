
import { getProductsByCategory } from "@/lib/api";
import CategoryProductList from "@/components/CategoryProductlist";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const toBn = (value: number | string) =>
  String(value).replace(
    /\d/g,
    (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]
  );

const CategoryPage = async ({
  params,
}: CategoryPageProps) => {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);

  // ক্যাটাগরির নাম ও আইকন প্রোডাক্ট ডেটা থেকে নেওয়া হচ্ছে
  const first = products[0];

  const categoryName =
    first?.categoryNameBn ?? slug;

  const categoryIcon =
    first?.categoryIcon ??
    first?.image ??
    "🛒";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-4">

        {/* Category Header Card */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {categoryName}
            </h1>

            <p className="text-xs text-gray-500">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Products + Sort */}
        <CategoryProductList products={products} />

      </div>
    </main>
  );
};

export default CategoryPage;
