import LessonContainer from "@/Components/Admin/Course/Lesson";

const Page = async ({ params }: { params: Promise<{ lessonId: string }> }) => {
	return <LessonContainer id={(await params).lessonId} />;
};

export default Page;
