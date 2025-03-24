import LessonsViewContainer from "@/Components/Admin/Lesson/View";

const LessonViewPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	return <LessonsViewContainer id={(await params).id} />;
};

export default LessonViewPage;
