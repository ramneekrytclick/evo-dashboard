import PathDetails from "@/Components/Student/Paths/PathDetails";
export function generateMetadata() {
	return {
		title: "Learning Path Details",
		description: "Create and manage structured course paths.",
	};
}
const LessonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <PathDetails id={(await params).id} />;
};

export default LessonPage;
