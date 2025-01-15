import LessonsPageContainer from "@/Components/Admin/Lesson"

const LessonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <LessonsPageContainer id={(await params).id}/>;
};

export default LessonPage;
