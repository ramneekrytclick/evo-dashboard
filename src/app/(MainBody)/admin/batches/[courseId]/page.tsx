import CourseBatchContainer from "@/Components/Admin/Batches/CourseBatches";

const LessonPage = async ({
	params,
}: {
	params: Promise<{ courseId: string }>;
}) => {
	return <CourseBatchContainer id={(await params).courseId} />;
};

export default LessonPage;
