import PromoCodesPageContainer from "@/Components/Admin/PromoCodes";
export function generateMetadata() {
	return {
		title: "Promo Code Management",
		description: "Create and manage course and path discount codes.",
	};
}
const PromoCodesPage = () => {
	return <PromoCodesPageContainer />;
};

export default PromoCodesPage;
