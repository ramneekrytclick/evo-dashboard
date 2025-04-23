import SubcategoriesContainer from "@/Components/Admin/SubCategories";
export function generateMetadata() {
	return {
		title: "Subcategories",
		description: "Manage categories and subcategories for EVO content.",
	};
}
const SubcategoryPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	return <SubcategoriesContainer id={(await params).id} />;
};

export default SubcategoryPage;
