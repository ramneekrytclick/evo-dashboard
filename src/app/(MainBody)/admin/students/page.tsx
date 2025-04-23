import StudentsPageContainer from "@/Components/Admin/Students";
// /admin/students/page.tsx
export function generateMetadata() {
	return {
		title: "Manage Students",
		description: "View and manage student profiles and progress.",
	};
}
const StudentsPage = () => {
	return <StudentsPageContainer />;
};

export default StudentsPage;
