import SubcategoriesContainer from "@/Components/Admin/SubCategories";

const SubcategoryPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	return <SubcategoriesContainer id={(await params).id} />;
};

export default SubcategoryPage;
