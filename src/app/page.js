

import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  const topRisers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topFallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main>
      
     <Hero />
      <ProductSection title="আজ দাম বেড়েছে" accent="red" products={topRisers} />
      <ProductSection title="আজ দাম কমেছে" accent="green" products={topFallers} />
      <ProductSection title="সব পণ্য" products={products} />
    </main>
  );
}
