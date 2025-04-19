import LessonAssignmentContainer from "@/Components/Student/Course/Lesson/Assignment";

const Page = ({ params }: { params: { lessonId: string; id: string } }) => {
	return (
		<LessonAssignmentContainer
			lessonId={params.lessonId}
			courseId={params.id}
		/>
	);
};

export default Page;
