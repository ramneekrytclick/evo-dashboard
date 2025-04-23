import WannaBeContainer from "@/Components/Admin/WannaBe";
export function generateMetadata() {
	return {
		title: "WannaBe Interests",
		description: "Manage aspirational interest tags linked to courses.",
	};
}
const page = () => {
	return <WannaBeContainer />;
};

export default page;
