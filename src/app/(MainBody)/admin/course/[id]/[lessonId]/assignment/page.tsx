import LessonAssignmentContainer from "@/Components/Admin/Course/Lesson/Assignment";
export function generateMetadata() {
	return {
		title: "Lesson Assignment",
		description: "View and manage lesson assignment.",
	};
}
const Page = ({ params }: { params: { lessonId: string; id: string } }) => {
	return (
		<LessonAssignmentContainer
			lessonId={params.lessonId}
			courseId={params.id}
		/>
	);
};

export default Page;
