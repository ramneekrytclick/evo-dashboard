import LessonContainer from "@/Components/Admin/Course/Lesson";
export function generateMetadata() {
	return {
		title: "Lesson Details",
		description: "View and manage lesson details.",
	};
}
const Page = ({ params }: { params: { id: string; lessonId: string } }) => {
	return (
		<LessonContainer
			courseId={params.id}
			lessonId={params.lessonId}
		/>
	);
};

export default Page;
