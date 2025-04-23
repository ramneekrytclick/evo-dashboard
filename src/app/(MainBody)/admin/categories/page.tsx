import CategoryContainer from "@/Components/Admin/Categories";
export function generateMetadata() {
	return {
		title: "Course Categories",
		description: "Manage categories and subcategories for EVO content.",
	};
}
const CategoryPage = () => {
	return <CategoryContainer />;
};

export default CategoryPage;
