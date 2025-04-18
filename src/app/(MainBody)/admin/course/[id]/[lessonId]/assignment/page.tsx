import LessonContainer from "@/Components/Admin/Course/Lesson";
import LessonAssignmentContainer from "@/Components/Admin/Course/Lesson/Assignment";

const Page = async ({ params }: { params: Promise<{ lessonId: string }> }) => {
	return <LessonAssignmentContainer lessonId={(await params).lessonId} />;
};

export default Page;
