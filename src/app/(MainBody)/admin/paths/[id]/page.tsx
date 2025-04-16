import PathDetails from "@/Components/Student/Paths/PathDetails";

const LessonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <PathDetails id={(await params).id} />;
};

export default LessonPage;
