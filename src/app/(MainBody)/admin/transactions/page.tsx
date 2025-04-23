import TransactionsContainer from "@/Components/Admin/TransactionsContainer";
export function generateMetadata() {
	return {
		title: "Transactions & Payments",
		description: "Track student payments and platform earnings.",
	};
}
const page = () => {
	return <TransactionsContainer />;
};

export default page;
