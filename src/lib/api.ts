import { Product, Category } from "@/types";

const PRIMARY_API_URL = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_API_URL = "https://api.abcz.workers.dev/api/bazardor";

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  const urls = [
    envUrl,
    PRIMARY_API_URL,
    FALLBACK_API_URL,
  ].filter(Boolean) as string[];

  // Remove duplicates
  const uniqueUrls = Array.from(new Set(urls));

  let lastError: Error | null = null;

  for (const baseUrl of uniqueUrls) {
    try {
      const cleanBase = baseUrl.replace(/\/$/, "");
      const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
      const url = `${cleanBase}${cleanEndpoint}`;

      const res = await fetch(url, {
        next: { revalidate: 60 },
      });

      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw lastError || new Error(`Failed to fetch from ${endpoint}`);
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchFromApi<Category[]>("/categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    return await fetchFromApi<Product[]>("/products");
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    const product = products.find(
      (item) => item.slug === slug || String(item.id) === slug
    );

    if (product) return product;

    // Fallback direct product endpoint if slug is numeric id
    if (!isNaN(Number(slug))) {
      return await fetchFromApi<Product>(`/products/${slug}`);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const directResults = await fetchFromApi<Product[]>(`/products?category=${categorySlug}`);
    if (Array.isArray(directResults) && directResults.length > 0) {
      return directResults;
    }

    // Fallback client filter if direct endpoint returns empty or fails
    const allProducts = await getProducts();
    return allProducts.filter(
      (p) => p.category === categorySlug || p.categoryNameBn === categorySlug
    );
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    // Fallback: fetch all and filter
    try {
      const allProducts = await getProducts();
      return allProducts.filter((p) => p.category === categorySlug);
    } catch {
      return [];
    }
  }
}