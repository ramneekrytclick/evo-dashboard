import LessonQuizContainer from "@/Components/Admin/Course/Lesson/Quiz";
export function generateMetadata() {
	return {
		title: "Lesson Quiz",
		description: "View and manage lesson quiz.",
	};
}
const Page = ({ params }: { params: { lessonId: string; id: string } }) => {
	return (
		<LessonQuizContainer
			lessonId={params.lessonId}
			courseId={params.id}
		/>
	);
};

export default Page;
