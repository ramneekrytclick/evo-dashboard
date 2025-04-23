import PendingPageContainer from "@/Components/Admin/Pending";
export function generateMetadata() {
	return {
		title: "New User Approvals",
		description: "Review and approve pending user registrations on EVO.",
	};
}
const page = () => {
	return <PendingPageContainer />;
};

export default page;
