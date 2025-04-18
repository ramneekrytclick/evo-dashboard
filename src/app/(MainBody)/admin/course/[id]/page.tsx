import CourseLessonsPageContainer from "@/Components/Admin/Course/CourseLessons";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <CourseLessonsPageContainer id={(await params).id} />;
};

export default Page;
