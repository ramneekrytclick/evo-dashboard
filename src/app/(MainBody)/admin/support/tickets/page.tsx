import SupportPageContainer from "@/Components/Support";
export function generateMetadata() {
	return {
		title: "Support Tickets",
		description: "Respond to user support requests and issues.",
	};
}
const SupportPage = () => {
	return <SupportPageContainer />;
};

export default SupportPage;
