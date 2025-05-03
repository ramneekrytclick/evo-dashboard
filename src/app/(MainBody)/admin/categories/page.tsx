import CategoryContainer from "@/Components/Admin/Categories";
import { generateSEOMetadata } from "@/utils/seo";
export const metadata = generateSEOMetadata({
	title: "Categories",
	description: "Manage categories for courses and blogs",
	pathname: "/admin/categories",
	keywords: [
		"admin",
		"categories",
		"courses",
		"subcategories",
		"evo",
		"learning",
		"dashboard",
	],
});
const CategoryPage = () => {
	return <CategoryContainer />;
};

export default CategoryPage;
