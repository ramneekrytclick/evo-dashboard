import TeamPageContainer from "@/Components/Admin/Team";
// /admin/team/page.tsx
export function generateMetadata() {
	return {
		title: "EVO Team Members",
		description: "View and manage internal EVO team members.",
	};
}
const page = () => {
	return <TeamPageContainer />;
};

export default page;
