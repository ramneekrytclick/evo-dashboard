import CreateCourseContainer from "@/Components/Admin/CreateCourse";
export function generateMetadata() {
	return {
		title: "Create New Course",
		description: "Create New Course",
	};
}
const CreateCoursePage = () => {
	return <CreateCourseContainer />;
};

export default CreateCoursePage;
