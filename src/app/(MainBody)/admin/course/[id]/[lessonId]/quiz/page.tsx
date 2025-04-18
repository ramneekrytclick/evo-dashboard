import LessonQuizContainer from "@/Components/Admin/Course/Lesson/Quiz";

const Page = ({ params }: { params: { lessonId: string; id: string } }) => {
	return (
		<LessonQuizContainer
			lessonId={params.lessonId}
			courseId={params.id}
		/>
	);
};

export default Page;
