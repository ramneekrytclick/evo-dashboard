import PathPageContainer from "@/Components/Admin/Path";
export function generateMetadata() {
	return {
		title: "Learning Paths",
		description: "Create and manage structured course paths.",
	};
}
const PathsPage = () => {
	return <PathPageContainer />;
};

export default PathsPage;
