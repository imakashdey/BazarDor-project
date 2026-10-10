import { getCategories } from "@/lib/api";
import CategoryNav from "@/components/CategoryNav";

const Navbar = async () => {
  const categories = await getCategories();

  return <CategoryNav categories={categories || []} />;
};

export default Navbar;