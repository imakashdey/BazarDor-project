const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}
export async function getProduct(slug: string) {
  const products = await getProducts();

  const product = products.find(
    (item: { slug: string }) => item.slug === slug
  );

  console.log("PRODUCT DATA:", product);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
export async function getProductsByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/products?category=${category}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch category products: ${res.status}`
    );
  }

  return res.json();
}