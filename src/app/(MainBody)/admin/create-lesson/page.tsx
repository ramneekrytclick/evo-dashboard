import CreateLessonContainer from "@/Components/Admin/CreateLesson";
export function generateMetadata() {
	return {
		title: "Create Lesson",
		description:
			"Add lessons to EVO courses with video, quiz, and assignment content.",
	};
}
const CreateLessonPage = () => {
	return <CreateLessonContainer />;
};

export default CreateLessonPage;
