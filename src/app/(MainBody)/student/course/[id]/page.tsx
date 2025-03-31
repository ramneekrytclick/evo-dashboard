import LessonsPageContainer from "@/Components/Admin/Lesson";
import CourseViewPageContainer from "@/Components/Student/CourseView";

const LessonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <CourseViewPageContainer id={(await params).id} />;
};

export default LessonPage;
