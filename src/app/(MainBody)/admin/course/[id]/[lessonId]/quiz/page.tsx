import LessonQuizContainer from "@/Components/Admin/Course/Lesson/Quiz";

const Page = async ({ params }: { params: Promise<{ lessonId: string }> }) => {
	return <LessonQuizContainer lessonId={(await params).lessonId} />;
};

export default Page;
