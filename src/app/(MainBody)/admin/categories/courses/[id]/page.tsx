import CoursesUnderCategory from "@/Components/Admin/Categories/Courses/page";

const page = ({ params }: { params: { id: string } }) => {
	{
		return <CoursesUnderCategory categoryId={params.id} />;
	}
};

export default page;
