import CourseLessonsPageContainer from "@/Components/Admin/Course/CourseLessons";
export function generateMetadata() {
	return {
		title: "Course Details",
		description: "View and manage course lessons.",
	};
}
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <CourseLessonsPageContainer id={(await params).id} />;
};

export default Page;
