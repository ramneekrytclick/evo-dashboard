import CourseBatchContainer from "@/Components/Admin/Batches/CourseBatches";
export function generateMetadata() {
	return {
		title: "Course Batches",
		description: "Group students and assign mentors to course batches.",
	};
}
const LessonPage = async ({
	params,
}: {
	params: Promise<{ courseId: string }>;
}) => {
	return <CourseBatchContainer id={(await params).courseId} />;
};

export default LessonPage;
