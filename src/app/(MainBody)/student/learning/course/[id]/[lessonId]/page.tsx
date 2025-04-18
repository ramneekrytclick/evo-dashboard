import LessonContainer from "@/Components/Admin/Course/Lesson";

const Page = ({ params }: { params: { id: string; lessonId: string } }) => {
	return (
		<LessonContainer
			courseId={params.id}
			lessonId={params.lessonId}
		/>
	);
};

export default Page;
