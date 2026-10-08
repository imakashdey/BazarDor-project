import Link from "next/link";
import { getCategories } from "@/lib/api";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const categories: Category[] = await getCategories();

  return (
    <nav className="border-t border-b-4 border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl  gap-6 px-4 py-3">
        

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="font-medium text-gray-700 hover:text-green-800"
          >
            {category.icon} {category.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;