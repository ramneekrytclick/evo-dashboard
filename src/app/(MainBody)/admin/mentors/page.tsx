import MentorPageContainer from "@/Components/Admin/Mentors";
// /admin/mentors/page.tsx
export function generateMetadata() {
	return {
		title: "Manage Mentors",
		description: "View and manage all registered mentors.",
	};
}
const MentorPage = () => {
	return <MentorPageContainer />;
};

export default MentorPage;
