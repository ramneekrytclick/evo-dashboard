import CoursesUnderSubcategory from "@/Components/Admin/SubCategories/Courses";

const page = ({ params }: { params: { id: string } }) => {
	{
		return <CoursesUnderSubcategory subcategoryId={params.id} />;
	}
};

export default page;
