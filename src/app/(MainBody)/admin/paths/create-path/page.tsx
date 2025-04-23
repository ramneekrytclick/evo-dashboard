import CreatePathPageContainer from "@/Components/Admin/Path/CreatePath";
export function generateMetadata() {
	return {
		title: "Create New Path",
		description: "Create New Course Path Roadmaps",
	};
}
const CreatePathPage = () => {
	return <CreatePathPageContainer />;
};

export default CreatePathPage;
