import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";

export const metadata = {
  title: "বাজার দর - আজকের নিত্যপণ্যের বাজার দর এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার দৈনন্দিন বাজারদর এবং মূল্য পরিবর্তনের সঠিক তথ্য।",
};

export default async function Home() {
  const products = (await getProducts()) || [];

  const topRisers = [...products]
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const topFallers = [...products]
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <main className="min-h-screen pb-16">
      <Hero />

      {topRisers.length > 0 && (
        <ProductSection
          id="আজ-দাম-বেড়েছে"
          title="আজ দাম বেড়েছে"
          subtitle="আজকে বাজারে যে পণ্যগুলোর দাম সবচেয়ে বেশি বৃদ্ধি পেয়েছে"
          accent="red"
          products={topRisers}
        />
      )}

      {topFallers.length > 0 && (
        <ProductSection
          id="আজ-দাম-কমেছে"
          title="আজ দাম কমেছে"
          subtitle="আজকে বাজারে যে পণ্যগুলোর দাম সবচেয়ে বেশি কমেছে"
          accent="green"
          products={topFallers}
        />
      )}

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার তালিকা"
        products={products}
      />
    </main>
  );
}
