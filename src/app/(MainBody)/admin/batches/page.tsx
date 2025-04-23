import BatchesPageContainer from "@/Components/Admin/Batches";
export async function generateMetadata() {
	return {
		title: "Batches - Admin EVO",
		description: "Manage course batches here.",
	};
}
const BatchesPage = () => {
	return <BatchesPageContainer />;
};

export default BatchesPage;
